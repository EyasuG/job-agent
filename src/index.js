import { startBot } from "./bot/bot.js";
import { startScheduler } from "./scheduler.js";
import { runOnce } from "./pipeline.js";
import { logger } from "./lib/logger.js";

logger.info("Job agent starting.");
startBot(runOnce);
startScheduler();
