import { startBot } from "./bot/bot.js";
import { startScheduler } from "./scheduler.js";
import { startWebServer } from "./web/server.js";
import { runOnce } from "./pipeline.js";
import { logger } from "./lib/logger.js";

// Last-resort guard: a stray rejected promise (e.g. a network call nobody
// awaited) is logged instead of taking down the scheduler, bot, and dashboard.
process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled rejection: ${reason?.stack ?? reason}`);
});

logger.info("Job agent starting.");
startBot(runOnce);
startScheduler();
startWebServer(runOnce);
