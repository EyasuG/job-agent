import cron from "node-cron";
import { runOnce } from "./pipeline.js";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";

export function startScheduler() {
  logger.info(`Scheduler started with schedule: ${config.schedule}`);
  cron.schedule(config.schedule, () => {
    runOnce().catch((err) => logger.error(err.message));
  });
}
