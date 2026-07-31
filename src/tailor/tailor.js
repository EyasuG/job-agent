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
2. TAILOR EACH ROLE IN PLACE. For every role in the master resume, rewrite THAT role's own
   bullets and keep them under THAT SAME company. Never move an accomplishment from one
   employer to another, and never merge roles.
3. PRESERVE EACH ROLE'S FULL TECHNICAL RICHNESS. Rewrite to emphasize the technologies and
   responsibilities that match the job, but keep every substantive accomplishment of the
   role. Critically: if a role's master bullets list front-end frameworks/languages (React,
   Angular, Bootstrap, CSS, etc.), those MUST appear in that role's tailored bullets — never
   collapse a front-end/full-stack role down to a minor detail like version control. Lead
   each role with its most job-relevant bullet; keep the role's tech stack visible.
4. Rephrase bullets to mirror the job's EXACT terminology wherever the underlying fact
   genuinely supports it (e.g. resume "built REST APIs in Node.js" + job "RESTful services"
   -> use the job's phrasing). Never stretch a fact beyond what it states.
5. CREDIT TRANSFERABLE EQUIVALENTS with honest bridging language — Terraform satisfies
   "infrastructure as code"; PCF/UCD satisfy "CI/CD pipelines"; Okta SSO satisfies
   "identity/access management"; AWS Lambda + API Gateway satisfy "serverless". Do NOT
   claim a named tool the resume lacks; list literal missing tools under missing_keywords.
6. Target keyword_coverage of 90-97% when the resume's facts genuinely support it.
7. Write a summary that front-loads the job's highest-priority keywords the candidate has.
8. List job requirements NOT supported by the resume — do not paper over gaps.
9. Score 0-100 how well the candidate matches, crediting transferable equivalents (rule 5).

"roles" MUST contain one entry per master-resume role, using the EXACT company name from
the resume, with that role's tailored bullets.

Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{"score": number, "keyword_coverage": number, "missing_keywords": string[], "summary": string, "roles": [{"company": string, "bullets": string[]}], "unmatched_requirements": string[]}`;

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
