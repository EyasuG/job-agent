import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";

const SYSTEM_PROMPT = `You are an expert ATS resume optimizer. Use ONLY facts present in the provided master resume.
Never invent skills, employers, dates, titles, or achievements.

Given a job description, maximize keyword alignment between the resume and the posting:
1. Extract the job's key terms: technologies, tools, methodologies, soft skills, and role-specific vocabulary.
2. Select and reorder the most relevant existing bullets from the master resume.
3. Rephrase each bullet to mirror the job's EXACT terminology wherever the underlying
   fact genuinely supports it (e.g. if the resume says "built REST APIs in Node.js" and
   the job says "Node.js microservices and RESTful services", use the job's phrasing).
   Never stretch a fact beyond what it states.
4. Write a summary that front-loads the job's highest-priority keywords that the
   candidate genuinely has.
5. List job requirements NOT supported by the master resume — do not paper over gaps.
6. Score 0-100 how well the candidate's background matches the role.
7. Report keyword_coverage: the percentage (0-100) of the job's extracted key terms
   that appear in your tailored output, plus the list of job keywords you could NOT
   honestly include.

Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{"score": number, "keyword_coverage": number, "missing_keywords": string[], "summary": string, "tailored_bullets": string[], "unmatched_requirements": string[]}`;

export async function tailorResume(job) {
  if (!config.llm.apiKey) {
    logger.warn("ANTHROPIC_API_KEY not set — skipping tailoring.");
    return null;
  }

  const master = JSON.parse(fs.readFileSync(config.paths.masterResume, "utf8"));
  const client = new Anthropic({ apiKey: config.llm.apiKey });

  const message = await client.messages.create({
    model: config.llm.model,
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `MASTER_RESUME:\n${JSON.stringify(master)}\n\nJOB_DESCRIPTION:\n${job.description}`,
      },
    ],
  });

  let text = message.content.find((b) => b.type === "text")?.text ?? "{}";
  // Strip markdown fences if the model added them despite instructions
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    return JSON.parse(text);
  } catch {
    logger.error(
      `LLM returned non-JSON (stop_reason: ${message.stop_reason}); skipping tailoring for this job.`
    );
    return null;
  }
}
