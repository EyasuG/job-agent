import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import { config } from "../../config.js";
import { getJob } from "../../store/db.js";

export const resumeRouter = Router();

// GET /api/resume/master — returns master.json contents
resumeRouter.get("/master", (_req, res) => {
  if (!fs.existsSync(config.paths.masterResume)) {
    return res.status(404).json({ error: "master.json not found" });
  }
  const data = JSON.parse(fs.readFileSync(config.paths.masterResume, "utf8"));
  res.json(data);
});

// PUT /api/resume/master — overwrites master.json atomically
resumeRouter.put("/master", (req, res) => {
  const incoming = req.body;
  if (!incoming || typeof incoming !== "object") {
    return res.status(400).json({ error: "Body must be a JSON object" });
  }

  // Atomic write: write to a temp file then rename, so a crash never corrupts master.json
  const tmpPath = config.paths.masterResume + ".tmp";
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(incoming, null, 2), "utf8");
    fs.renameSync(tmpPath, config.paths.masterResume);
    res.json({ ok: true });
  } catch (err) {
    fs.rmSync(tmpPath, { force: true });
    res.status(500).json({ error: err.message });
  }
});

// GET /api/resume/:jobId/download — streams the .docx file
resumeRouter.get("/:jobId/download", (req, res) => {
  const job = getJob(req.params.jobId);
  if (!job) return res.status(404).json({ error: "Job not found" });
  if (!job.resume_path || !fs.existsSync(job.resume_path)) {
    return res.status(404).json({ error: "Resume file not found" });
  }
  const filename = path.basename(job.resume_path);
  res.download(job.resume_path, filename);
});
