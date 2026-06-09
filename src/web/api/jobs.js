import { Router } from "express";
import { getAllJobs, getJob, updateJobStatus } from "../../store/db.js";

export const jobsRouter = Router();

// GET /api/jobs?status=saved
jobsRouter.get("/", (req, res) => {
  const { status } = req.query;
  const jobs = getAllJobs(status || undefined);
  res.json(jobs);
});

// GET /api/jobs/:id
jobsRouter.get("/:id", (req, res) => {
  const job = getJob(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

// PATCH /api/jobs/:id/status  — body: { status: "saved" | "skipped" | "new" }
jobsRouter.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  const allowed = ["new", "saved", "skipped"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${allowed.join(", ")}` });
  }
  const job = getJob(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  updateJobStatus(req.params.id, status);
  res.json({ ok: true, id: req.params.id, status });
});
