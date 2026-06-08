import { fetchJobs as fetchJSearch } from "./jsearch.js";
import { fetchJobs as fetchAdzuna } from "./adzuna.js";
import { logger } from "../lib/logger.js";

/**
 * Fetches jobs from all configured sources and returns a merged,
 * deduplicated (by id) array of normalized job objects.
 */
export async function fetchAllJobs() {
  const results = await Promise.allSettled([fetchJSearch(), fetchAdzuna()]);

  const jobs = [];
  const seen = new Set();

  for (const result of results) {
    if (result.status === "rejected") {
      logger.error(`Fetcher failed: ${result.reason?.message}`);
      continue;
    }
    for (const job of result.value) {
      if (!seen.has(job.id)) {
        seen.add(job.id);
        jobs.push(job);
      }
    }
  }

  logger.info(`Aggregated ${jobs.length} unique jobs across all sources.`);
  return jobs;
}
