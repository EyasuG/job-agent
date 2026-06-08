import { startScheduler } from "./scheduler.js";
import { logger } from "./lib/logger.js";

logger.info("Job agent starting.");
startScheduler();
