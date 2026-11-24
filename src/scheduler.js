import fs from "node:fs";
import path from "node:path";
import cron from "node-cron";
import { runOnce } from "./pipeline.js";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";

// Two scheduling modes:
//   - SCAN_INTERVAL_HOURS (e.g. 10): a true fixed interval. Cron can't express
//     "every 10 hours" evenly (*/10 fires at 00, 10, 20 → a 4h gap), so instead
//     we check every few minutes whether the interval has elapsed since the
//     last scan. The last scan time is saved to disk, so restarts and sleep
//     neither skip a scan nor trigger an extra one.
//   - Otherwise CRON_SCHEDULE (cron expression) plus the RUN_ON_START catch-up.

const STATE_FILE = path.join(config.paths.data, "last-scan.json");
const CHECK_EVERY_MS = 5 * 60 * 1000;
// After a failed scan (e.g. no network), try again this soon instead of
// waiting out the full interval.
const RETRY_AFTER_FAILURE_MS = 30 * 60 * 1000;

export function startScheduler() {
  if (config.scanIntervalHours > 0) return startInterval(config.scanIntervalHours);

  logger.info(`Scheduler started with schedule: ${config.schedule}`);
  cron.schedule(config.schedule, () => {
    runOnce().catch((err) => logger.error(err.message));
  });

  // node-cron silently skips ticks that pass while the process is down or the
  // machine is asleep. Running a catch-up scan shortly after startup ensures
  // the agent never goes stale just because a scheduled mark was missed.
  if (config.runOnStart) {
    logger.info("Catch-up scan starting in 15s (RUN_ON_START=true).");
    setTimeout(() => {
      runOnce().catch((err) => logger.error(`Catch-up scan failed: ${err.message}`));
    }, 15_000);
  }
}

function startInterval(hours) {
  const intervalMs = hours * 3600 * 1000;
  let running = false;

  const tick = async () => {
    if (running) return;
    const last = readLastScan();
    if (last && Date.now() - last < intervalMs) return;
    running = true;
    writeLastScan(Date.now()); // record at start so a crash mid-scan doesn't loop
    try {
      await runOnce();
    } catch (err) {
      logger.error(
        `Scheduled scan failed: ${err.message} Retrying in ${RETRY_AFTER_FAILURE_MS / 60000} min.`
      );
      writeLastScan(Date.now() - intervalMs + RETRY_AFTER_FAILURE_MS);
    } finally {
      running = false;
    }
  };

  const last = readLastScan();
  const dueIn = last ? Math.max(0, last + intervalMs - Date.now()) : 0;
  logger.info(
    `Scheduler started: a scan every ${hours}h; next in ~${(dueIn / 3600000).toFixed(1)}h.`
  );
  // First check shortly after boot (lets the bot/web server come up), then periodically
  setTimeout(tick, 15_000);
  setInterval(tick, CHECK_EVERY_MS);
}

/** Epoch ms of the last scheduled scan, or null if none recorded. */
export function readLastScan() {
  try {
    const { lastScanAt } = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
    return Number.isFinite(lastScanAt) ? lastScanAt : null;
  } catch {
    return null;
  }
}

function writeLastScan(ms) {
  fs.mkdirSync(config.paths.data, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify({ lastScanAt: ms }), "utf8");
}
