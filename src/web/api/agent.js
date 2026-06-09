import { Router } from "express";
import { getJobCounts } from "../../store/db.js";
import { logger } from "../../lib/logger.js";

// Shared state — tracks whether a pipeline run is in progress
let running = false;
let lastRunAt = null;

export function agentRouter(runOnce) {
  const router = Router();

  // GET /api/agent/status
  router.get("/status", (_req, res) => {
    const counts = getJobCounts();
    res.json({
      running,
      lastRunAt,
      ...counts,
    });
  });

  // POST /api/agent/run — triggers a pipeline scan (non-blocking)
  router.post("/run", async (req, res) => {
    if (running) {
      return res.status(409).json({ error: "A scan is already in progress" });
    }

    res.status(202).json({ ok: true, message: "Scan started" });

    // Run asynchronously after responding so the client isn't left waiting
    running = true;
    try {
      await runOnce();
      lastRunAt = new Date().toISOString();
      logger.info("Manual scan via dashboard complete.");
    } catch (err) {
      logger.error(`Dashboard-triggered scan failed: ${err.message}`);
    } finally {
      running = false;
    }
  });

  return router;
}
