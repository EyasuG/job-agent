import fs from "node:fs";
import path from "node:path";
import {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle,
} from "docx";
import { config } from "../config.js";
import { callLLM } from "./llm.js";
import { logger } from "../lib/logger.js";

const FONT = "Calibri";
const NAVY = "1F3864";
const MUTED = "555555";

const SYSTEM_PROMPT = `You prepare an application "answer kit" that helps a candidate fill out an
ATS / company job application quickly. Use ONLY facts present in the candidate's resume.
NEVER invent employers, titles, dates, skills, certifications, salary, work authorization,
or availability. For any common application field that the resume does NOT establish
(work authorization, sponsorship needs, desired salary, start date, relocation), set the
answer to a clearly-marked placeholder like "[Please confirm]" — do not guess.

Draft concise, honest answers to the open-ended questions using the candidate's real
experience mapped to this specific job.

Respond with ONLY valid JSON in exactly this shape:
{
  "relevant_years": string,
  "top_skills": string[],
  "screening": [{"q": string, "a": string}],
  "why_role": string,
  "key_qualifications": string
}`;

/**
 * Generates the application-kit content for a job via the LLM.
 * Returns the parsed kit object, or null on failure.
 */
export async function generateApplyKit(job) {
  const master = fs.readFileSync(config.paths.masterResume, "utf8");
  const description = (job.description ?? "").slice(0, 6000);

  let text;
  try {
    text = await callLLM({
      systemStable: SYSTEM_PROMPT,
      systemCacheable: `CANDIDATE_RESUME:\n${master}`,
      user: `JOB: ${job.title} at ${job.company}\n${description}`,
      maxTokens: 3000,
    });
  } catch (err) {
    logger.error(`Apply-kit LLM call failed: ${err.message}`);
    return null;
  }

  text = (text || "{}").replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    return JSON.parse(text);
  } catch {
    logger.error("Apply-kit returned non-JSON.");
    return null;
  }
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function heading(text) {
  return new Paragraph({
    spacing: { before: 220, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, font: FONT, size: 22, color: NAVY })],
  });
}

function field(label, value) {
  const isPlaceholder = /^\[.*\]$/.test(String(value).trim());
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: `${label}:  `, bold: true, font: FONT, size: 20 }),
      new TextRun({ text: String(value ?? ""), font: FONT, size: 20, italics: isPlaceholder, color: isPlaceholder ? MUTED : "000000" }),
    ],
  });
}

function para(text) {
  return new Paragraph({ spacing: { after: 120, line: 264 }, children: [new TextRun({ text, font: FONT, size: 20 })] });
}

/** Renders the application kit to a .docx and returns its path. */
export async function renderApplyKit(job, kit) {
  fs.mkdirSync(config.paths.output, { recursive: true });
  const master = JSON.parse(fs.readFileSync(config.paths.masterResume, "utf8"));
  const c = master.contact || {};
  const recent = master.experience?.[0];

  const children = [
    new Paragraph({
      children: [new TextRun({ text: "Application Kit", bold: true, font: FONT, size: 32, color: NAVY })],
    }),
    new Paragraph({
      spacing: { after: 160 },
      children: [new TextRun({ text: `${job.title} — ${job.company}`, font: FONT, size: 22, color: MUTED })],
    }),

    heading("Applicant Information"),
    field("Full Name", master.name),
    field("Email", c.email),
    field("Phone", c.phone),
    field("Location", c.location),
    field("LinkedIn", c.linkedin),
    recent ? field("Most Recent Role", `${recent.role} — ${recent.company}`) : null,
    field("Relevant Experience", kit.relevant_years || ""),

    heading("Top Skills for This Role"),
    new Paragraph({
      spacing: { after: 120 },
      children: [new TextRun({ text: (kit.top_skills || []).join("  ·  "), font: FONT, size: 20 })],
    }),

    heading("Common Screening Questions"),
    ...(kit.screening || []).flatMap((s) => [
      new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: `Q: ${s.q}`, bold: true, font: FONT, size: 20 })] }),
      (() => {
        const ph = /^\[.*\]$/.test(String(s.a).trim());
        return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: `A: ${s.a}`, font: FONT, size: 20, italics: ph, color: ph ? MUTED : "000000" })] });
      })(),
    ]),

    heading("Why This Role"),
    para(kit.why_role || ""),

    heading("Key Qualifications"),
    para(kit.key_qualifications || ""),

    heading("Apply"),
    new Paragraph({ children: [new TextRun({ text: job.url || "", font: FONT, size: 20, color: "0563C1", underline: {} })] }),
    new Paragraph({
      spacing: { before: 120 },
      children: [new TextRun({ text: "Placeholders in [brackets] need your confirmation before submitting.", font: FONT, size: 16, italics: true, color: MUTED })],
    }),
  ].filter(Boolean);

  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children }],
  });

  const safe = `${job.company}-${job.title}`.replace(/[^a-z0-9]+/gi, "_").slice(0, 60);
  const outPath = path.join(config.paths.output, `applykit_${safe}.docx`);
  fs.writeFileSync(outPath, await Packer.toBuffer(doc));
  return outPath;
}
