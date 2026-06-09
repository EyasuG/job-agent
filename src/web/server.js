import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";
import { jobsRouter } from "./api/jobs.js";
import { resumeRouter } from "./api/resume.js";
import { agentRouter } from "./api/agent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../../public");

export function startWebServer(runOnce) {
  const app = express();

  // ── Middleware ───────────────────────────────────────────────────────────────
  app.use(express.json());
  app.use(express.static(PUBLIC_DIR));

  // ── API routes ───────────────────────────────────────────────────────────────
  app.use("/api/jobs",   jobsRouter);
  app.use("/api/resume", resumeRouter);
  app.use("/api/agent",  agentRouter(runOnce));

  // Health check
  app.get("/api/ping", (_req, res) => res.json({ ok: true }));

  // SPA fallback — serve index.html for any non-API route (Express 5 wildcard syntax)
  app.get("/{*splat}", (_req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, "index.html"));
  });

  // ── Start ────────────────────────────────────────────────────────────────────
  const { port } = config.web;
  app.listen(port, () => {
    logger.info(`Dashboard running → http://localhost:${port}`);
  });

  return app;
}
