// Removes already-stored jobs that fail the CURRENT fetch filters (region,
// clearance, excluded roles, blocked domains). Run it after changing those
// filters so the dashboard matches what new scans would keep.
//
//   npm run prune            dry run: report what would be removed
//   npm run prune -- --apply back up the DB, move resumes aside, delete rows
//
// Saved jobs are never removed. Rows from before locations were stored have
// no location, so region is only judged where a location is known. Removed
// jobs won't return: new scans filter jobs before they're ever stored.
import fs from "node:fs";
import path from "node:path";
import { config } from "./config.js";
import { getAllJobs, deleteJob } from "./store/db.js";
import { filterReason } from "./lib/filters.js";
import { logger } from "./lib/logger.js";

const apply = process.argv.includes("--apply");

const flagged = [];
for (const job of getAllJobs()) {
  if (job.status === "saved") continue;
  const reason = filterReason(job, config.jobApi);
  if (reason) flagged.push({ job, reason });
}

const byReason = Object.groupBy(flagged, (f) => f.reason);
for (const [reason, items] of Object.entries(byReason)) {
  logger.info(`${reason}: ${items.length}`);
  for (const { job } of items.slice(0, 5)) logger.info(`  e.g. ${job.company} | ${job.title}${job.location ? ` | ${job.location}` : ""}`);
}

if (!flagged.length) {
  logger.info("Nothing to prune — stored jobs all pass the current filters.");
} else if (!apply) {
  logger.info(`Dry run: ${flagged.length} jobs would be removed. Re-run with --apply to remove them.`);
} else {
  const stamp = new Date().toISOString().slice(0, 10);
  const dbFile = path.join(config.paths.data, "jobs.db");
  const backup = path.join(config.paths.data, `jobs.db.bak-${stamp}-${Date.now()}`);
  fs.copyFileSync(dbFile, backup);

  // Resumes are moved aside rather than deleted, in case a removal was wrong
  const holdDir = path.join(config.paths.output, `_removed-${stamp}`);
  let moved = 0;
  for (const { job } of flagged) {
    if (job.resume_path && fs.existsSync(job.resume_path)) {
      fs.mkdirSync(holdDir, { recursive: true });
      fs.renameSync(job.resume_path, path.join(holdDir, path.basename(job.resume_path)));
      moved++;
    }
    deleteJob(job.id);
  }
  logger.info(`Removed ${flagged.length} jobs; moved ${moved} resumes to ${holdDir}. DB backup: ${backup}`);
}
