import { runOnce } from "./pipeline.js";
import { logger } from "./lib/logger.js";

runOnce().catch((err) => {
  logger.error(err.message);
  process.exit(1);
});
