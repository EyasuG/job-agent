import cron from "node-cron";
import { runOnce } from "./pipeline.js";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";

export function startScheduler() {
  logger.info(`Scheduler started with schedule: ${config.schedule}`);
  cron.schedule(config.schedule, () => {
    runOnce().catch((err) => logger.error(err.message));
  });

  // node-cron silently skips ticks that pass while the process is down or the
  // machine is asleep. Running a catch-up scan shortly after startup ensures
  // the agent never goes stale just because a 4-hour mark was missed.
  if (config.runOnStart) {
    logger.info("Catch-up scan starting in 15s (RUN_ON_START=true).");
    setTimeout(() => {
      runOnce().catch((err) => logger.error(`Catch-up scan failed: ${err.message}`));
    }, 15_000);
  }
}
