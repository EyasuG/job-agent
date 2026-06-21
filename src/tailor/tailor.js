import fs from "node:fs";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";
import { callLLM, llmConfigured } from "./llm.js";

// Job descriptions can run 20k+ chars of boilerplate (benefits, EEO text).
// The requirements are nearly always in the first part — truncating saves
// input tokens without hurting tailoring quality.
const MAX_DESCRIPTION_CHARS = 6000;

const SYSTEM_PROMPT = `You are an expert ATS resume optimizer. Use ONLY facts present in the provided master resume.
Never invent skills, employers, dates, titles, or achievements.

Given a job description, maximize keyword alignment between the resume and the posting:
1. Extract the job's key terms: technologies, tools, methodologies, soft skills, and role-specific vocabulary.
2. Select and reorder the most relevant existing bullets from the master resume.
3. Rephrase each bullet to mirror the job's EXACT terminology wherever the underlying
   fact genuinely supports it (e.g. if the resume says "built REST APIs in Node.js" and
   the job says "Node.js microservices and RESTful services", use the job's phrasing).
   Never stretch a fact beyond what it states.
4. CREDIT TRANSFERABLE EQUIVALENTS: when the resume demonstrates a directly equivalent
   technology or practice, count it as a match and phrase it bridgingly — e.g.
   Terraform experience satisfies "infrastructure as code"; PCF/UCD deployments satisfy
   "CI/CD pipelines"; Okta SSO satisfies "identity and access management"; AWS Lambda +
   API Gateway satisfies "serverless architecture"; Express APIs satisfy "microservices
   experience" only if described as services, not monolith work. Do NOT claim the named
   tool itself if the resume lacks it — bridge honestly ("infrastructure as code with
   Terraform"), and still list the literal tool under missing_keywords when absent.
5. Target keyword_coverage of 90-97% whenever the resume's facts genuinely support it;
   prioritize working the job's terms into the summary and bullets over generic phrasing.
6. Write a summary that front-loads the job's highest-priority keywords that the
   candidate genuinely has.
7. List job requirements NOT supported by the master resume — do not paper over gaps.
8. Score 0-100 how well the candidate's background matches the role, crediting
   transferable equivalents per rule 4.

Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{"score": number, "keyword_coverage": number, "missing_keywords": string[], "summary": string, "tailored_bullets": string[], "unmatched_requirements": string[]}`;

export async function tailorResume(job) {
  if (!llmConfigured()) {
    logger.warn("No LLM provider configured — skipping tailoring.");
    return null;
  }

  const master = fs.readFileSync(config.paths.masterResume, "utf8");
  const description = (job.description ?? "").slice(0, MAX_DESCRIPTION_CHARS);

  let text;
  try {
    // System prompt + master resume are identical for every job in a run.
    // On Anthropic they're sent as a cacheable prefix; other providers just
    // receive them as the system message.
    text = await callLLM({
      systemStable: SYSTEM_PROMPT,
      systemCacheable: `MASTER_RESUME:\n${master}`,
      user: `JOB_DESCRIPTION:\n${description}`,
      maxTokens: 4000,
    });
  } catch (err) {
    logger.error(`LLM call failed for ${job.title}: ${err.message}`);
    return null;
  }

  // Strip markdown fences if the model added them despite instructions
  text = (text || "{}").replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    return JSON.parse(text);
  } catch {
    logger.error("LLM returned non-JSON; skipping tailoring for this job.");
    return null;
  }
}
