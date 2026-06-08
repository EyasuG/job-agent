import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import fs from "node:fs";
import path from "node:path";
import { config } from "../config.js";

export async function renderResume(job, tailored) {
  fs.mkdirSync(config.paths.output, { recursive: true });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: "Tailored Resume", heading: HeadingLevel.TITLE }),
          new Paragraph({ text: `For: ${job.title} — ${job.company}` }),
          new Paragraph({ text: tailored.summary ?? "", spacing: { after: 200 } }),
          new Paragraph({ text: "Relevant Experience", heading: HeadingLevel.HEADING_1 }),
          ...(tailored.tailored_bullets ?? []).map(
            (b) => new Paragraph({ text: b, bullet: { level: 0 } })
          ),
        ],
      },
    ],
  });

  const safe = `${job.company}-${job.title}`
    .replace(/[^a-z0-9]+/gi, "_")
    .slice(0, 60);
  const outPath = path.join(config.paths.output, `resume_${safe}.docx`);
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  return outPath;
}
