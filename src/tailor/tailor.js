import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";

const SYSTEM_PROMPT = `You tailor resumes. Use ONLY facts present in the provided master resume.
Never invent skills, employers, dates, titles, or achievements.
Given a job description:
1. Select and reorder the most relevant existing bullets.
2. Rephrase them using the job's terminology WITHOUT changing their meaning.
3. List job requirements that are NOT supported by the master resume.
4. Score how well the candidate's background matches the role on a scale of 0-100,
   where 100 means every requirement is met and 0 means no overlap at all.
Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{"score": number, "summary": string, "tailored_bullets": string[], "unmatched_requirements": string[]}`;

export async function tailorResume(job) {
  if (!config.llm.apiKey) {
    logger.warn("ANTHROPIC_API_KEY not set — skipping tailoring.");
    return null;
  }

  const master = JSON.parse(fs.readFileSync(config.paths.masterResume, "utf8"));
  const client = new Anthropic({ apiKey: config.llm.apiKey });

  const message = await client.messages.create({
    model: config.llm.model,
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `MASTER_RESUME:\n${JSON.stringify(master)}\n\nJOB_DESCRIPTION:\n${job.description}`,
      },
    ],
  });

  const text = message.content.find((b) => b.type === "text")?.text ?? "{}";
  try {
    return JSON.parse(text);
  } catch {
    logger.error("LLM returned non-JSON; skipping tailoring for this job.");
    return null;
  }
}
