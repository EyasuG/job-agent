import fs from "node:fs";
import path from "node:path";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { config } from "../config.js";
import { callLLM } from "./llm.js";
import { logger } from "../lib/logger.js";

const FONT = "Calibri";
const NAVY = "1F3864";
const MUTED = "555555";

const SYSTEM_PROMPT = `You write concise, precise, professional one-page cover letters. Use ONLY facts
present in the candidate's resume — never invent employers, titles, dates, skills, or
certifications. If the job requires a skill the resume lacks (e.g. Python, C#), do NOT claim
it; emphasize genuinely relevant experience and honest transferable strengths instead.

CRITICAL: Do NOT state or imply citizenship, nationality, immigration, visa, residency, or
security/clearance-eligibility status of ANY kind. Never write a sentence about being a
citizen or about obtaining a clearance. Focus purely on skills, experience, and fit.

Tailor tightly to THIS posting: name the role, mirror its key terminology, and map the
candidate's real accomplishments to its stated needs. Warm, specific, professional tone.
Body = 3 short paragraphs, ~280-300 words, fitting on one page.

Respond with ONLY valid JSON: {"greeting": string, "paragraphs": string[], "closing": string}`;

// Defense-in-depth: strip any sentence that slips through mentioning
// citizenship/clearance status, regardless of the model's compliance.
const FORBIDDEN = /\b(citizen|citizenship|nationalit|immigration|visa|green card|permanent resident|residency|clearance|public trust)\b/i;
function scrubParagraph(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => !FORBIDDEN.test(s))
    .join(" ")
    .trim();
}

/** Generates cover-letter content for a job via the LLM. Returns parsed object or null. */
export async function generateCoverLetter(job) {
  const master = fs.readFileSync(config.paths.masterResume, "utf8");
  const description = (job.description ?? "").slice(0, 6000);

  let text;
  try {
    text = await callLLM({
      systemStable: SYSTEM_PROMPT,
      systemCacheable: `CANDIDATE_RESUME:\n${master}`,
      user: `JOB: ${job.title} at ${job.company}${job.location ? ` (${job.location})` : ""}\n${description}`,
      maxTokens: 2000,
    });
  } catch (err) {
    logger.error(`Cover-letter LLM call failed: ${err.message}`);
    return null;
  }

  text = (text || "{}").replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  let letter;
  try {
    letter = JSON.parse(text);
  } catch {
    logger.error("Cover letter returned non-JSON.");
    return null;
  }

  letter.paragraphs = (letter.paragraphs || []).map(scrubParagraph).filter(Boolean);
  return letter;
}

/** Renders the cover letter to a one-page .docx and returns its path. */
export async function renderCoverLetter(job, letter) {
  fs.mkdirSync(config.paths.output, { recursive: true });
  const master = JSON.parse(fs.readFileSync(config.paths.masterResume, "utf8"));
  const c = master.contact || {};
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const P = (runs, opts = {}) => new Paragraph({ children: runs, spacing: { after: 200, line: 276 }, ...opts });
  const R = (t, o = {}) => new TextRun({ text: t, font: FONT, size: 22, ...o });

  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 40 },
      children: [new TextRun({ text: master.name, bold: true, font: FONT, size: 34, color: NAVY })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 300 },
      children: [new TextRun({
        text: [c.email, c.phone, c.location, c.linkedin].filter(Boolean).join("  |  "),
        font: FONT, size: 18, color: MUTED,
      })],
    }),
    P([R(today)]),
    P([R(`Hiring Team\n${job.company}${job.location ? `\n${job.location}` : ""}`)]),
    P([R(letter.greeting || "Dear Hiring Manager,")]),
    ...(letter.paragraphs || []).map((p) => P([R(p)])),
    P([R(letter.closing || "Sincerely,")], { spacing: { after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: master.name, bold: true, font: FONT, size: 22 })] }),
  ];

  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: 22 } } } },
    sections: [{ properties: { page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } }, children }],
  });

  const safe = `${job.company}-${job.title}`.replace(/[^a-z0-9]+/gi, "_").slice(0, 60);
  const outPath = path.join(config.paths.output, `cover_letter_${safe}.docx`);
  fs.writeFileSync(outPath, await Packer.toBuffer(doc));
  return outPath;
}
