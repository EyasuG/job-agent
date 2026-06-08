import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  TabStopType,
  TabStopPosition,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import { config } from "../config.js";

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT = "Calibri";
const COLOR_HEADING = "1F3864"; // dark navy
const COLOR_MUTED = "555555";
const SIZE_NAME = 36; // half-points → 18 pt
const SIZE_TITLE = 24; // 12 pt
const SIZE_BODY = 20; // 10 pt
const SIZE_SECTION = 22; // 11 pt
const SPACE_AFTER_PARA = 80;
const SPACE_AFTER_SECTION = 160;

// ── Helpers ──────────────────────────────────────────────────────────────────

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SIZE_BODY, ...opts });
}

function sectionDivider() {
  return new Paragraph({
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_HEADING },
    },
    spacing: { after: 80 },
  });
}

function sectionHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        color: COLOR_HEADING,
        font: FONT,
        size: SIZE_SECTION,
      }),
    ],
    spacing: { before: 200, after: 60 },
  });
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    children: [run(text)],
    spacing: { after: SPACE_AFTER_PARA },
  });
}

// ── Section builders ─────────────────────────────────────────────────────────

function buildHeader(master) {
  const contact = master.contact ?? {};
  const parts = [
    contact.email,
    contact.phone,
    contact.location,
    contact.linkedin,
  ].filter(Boolean);

  return [
    // Name
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: master.name ?? "Your Name",
          bold: true,
          font: FONT,
          size: SIZE_NAME,
          color: COLOR_HEADING,
        }),
      ],
      spacing: { after: 60 },
    }),
    // Professional title
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: master.title ?? "",
          font: FONT,
          size: SIZE_TITLE,
          color: COLOR_MUTED,
          italics: true,
        }),
      ],
      spacing: { after: 80 },
    }),
    // Contact line
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: parts.join("  |  "),
          font: FONT,
          size: SIZE_BODY,
          color: COLOR_MUTED,
        }),
      ],
      spacing: { after: 160 },
    }),
  ];
}

function buildSummary(tailoredSummary, masterSummary) {
  const text = tailoredSummary || masterSummary || "";
  if (!text) return [];
  return [
    sectionHeading("Professional Summary"),
    sectionDivider(),
    new Paragraph({
      children: [run(text)],
      spacing: { after: SPACE_AFTER_SECTION },
    }),
  ];
}

function buildExperience(master, tailoredBullets) {
  const experience = master.experience ?? [];
  if (!experience.length) return [];

  // Pool of tailored bullets to distribute across roles (most relevant first)
  const bulletPool = [...(tailoredBullets ?? [])];

  const paragraphs = [sectionHeading("Experience"), sectionDivider()];

  for (const role of experience) {
    const dateRange = [role.start, role.end ?? "Present"].filter(Boolean).join(" – ");

    // Role header: Company (bold) with date range right-aligned via tab stop
    paragraphs.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: role.company ?? "", bold: true, font: FONT, size: SIZE_BODY }),
          new TextRun({ text: "\t", font: FONT, size: SIZE_BODY }),
          new TextRun({ text: dateRange, font: FONT, size: SIZE_BODY, color: COLOR_MUTED }),
        ],
        spacing: { after: 40 },
      })
    );

    // Job title (italic)
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: role.role ?? "", italics: true, font: FONT, size: SIZE_BODY }),
        ],
        spacing: { after: 60 },
      })
    );

    // Bullets: prefer tailored ones from the pool, fall back to master bullets
    const roleBullets = bulletPool.length > 0 ? bulletPool.splice(0, 4) : (role.bullets ?? []);
    for (const b of roleBullets) {
      paragraphs.push(bullet(b));
    }

    paragraphs.push(new Paragraph({ spacing: { after: SPACE_AFTER_SECTION } }));
  }

  return paragraphs;
}

function buildSkills(master) {
  const skills = master.skills ?? [];
  if (!skills.length) return [];
  return [
    sectionHeading("Skills"),
    sectionDivider(),
    new Paragraph({
      children: [run(skills.join("  ·  "))],
      spacing: { after: SPACE_AFTER_SECTION },
    }),
  ];
}

function buildEducation(master) {
  const education = master.education ?? [];
  if (!education.length) return [];

  const paragraphs = [sectionHeading("Education"), sectionDivider()];
  for (const ed of education) {
    const dateRange = [ed.start, ed.end ?? ""].filter(Boolean).join(" – ");
    paragraphs.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: ed.institution ?? "", bold: true, font: FONT, size: SIZE_BODY }),
          new TextRun({ text: "\t", font: FONT, size: SIZE_BODY }),
          new TextRun({ text: dateRange, font: FONT, size: SIZE_BODY, color: COLOR_MUTED }),
        ],
        spacing: { after: 40 },
      })
    );
    if (ed.degree) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: ed.degree, italics: true, font: FONT, size: SIZE_BODY })],
          spacing: { after: SPACE_AFTER_SECTION },
        })
      );
    }
  }
  return paragraphs;
}

// ── Main export ──────────────────────────────────────────────────────────────

export async function renderResume(job, tailored) {
  fs.mkdirSync(config.paths.output, { recursive: true });

  const master = fs.existsSync(config.paths.masterResume)
    ? JSON.parse(fs.readFileSync(config.paths.masterResume, "utf8"))
    : {};

  const children = [
    ...buildHeader(master),
    ...buildSummary(tailored?.summary, master.summary),
    ...buildExperience(master, tailored?.tailored_bullets),
    ...buildSkills(master),
    ...buildEducation(master),
  ];

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: FONT, size: SIZE_BODY },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 900, right: 900 }, // 0.625" sides
          },
        },
        children,
      },
    ],
  });

  const safe = `${job.company}-${job.title}`
    .replace(/[^a-z0-9]+/gi, "_")
    .slice(0, 60);
  const outPath = path.join(config.paths.output, `resume_${safe}.docx`);
  fs.writeFileSync(outPath, await Packer.toBuffer(doc));
  return outPath;
}
