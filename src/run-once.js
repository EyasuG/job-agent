import { startBot, getBot } from "./bot/bot.js";
import { runOnce } from "./pipeline.js";
import { logger } from "./lib/logger.js";

// Initialize the bot so sendJobNotification works, then run the pipeline
// once and shut down cleanly.
startBot(() => {}); // no on-demand handler needed for a one-shot run

runOnce()
  .catch((err) => {
    logger.error(err.message);
    process.exit(1);
  })
  .finally(() => {
    getBot().stop("run-once complete");
    process.exit(0);
  });
