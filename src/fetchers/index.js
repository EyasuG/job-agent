import { fetchJobs as fetchJSearch } from "./jsearch.js";
import { fetchJobs as fetchAdzuna } from "./adzuna.js";
import { fetchJobs as fetchRemotive } from "./remotive.js";
import { fetchJobs as fetchJooble } from "./jooble.js";
import { fetchJobs as fetchSerpApi } from "./serpapi.js";
import { requiresClearance } from "../lib/filters.js";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";

/**
 * Fetches jobs from all configured sources and returns a merged,
 * deduplicated (by id) array of normalized job objects. Jobs that
 * require a security clearance are filtered out when EXCLUDE_CLEARANCE
 * is enabled (default).
 */
export async function fetchAllJobs() {
  const results = await Promise.allSettled([
    fetchJSearch(),
    fetchAdzuna(),
    fetchRemotive(),
    fetchJooble(),
    fetchSerpApi(),
  ]);

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

  if (!config.jobApi.excludeClearance) {
    logger.info(`Aggregated ${jobs.length} unique jobs across all sources.`);
    return jobs;
  }

  const open = jobs.filter((j) => !requiresClearance(j));
  const dropped = jobs.length - open.length;
  logger.info(
    `Aggregated ${jobs.length} unique jobs; ${dropped} clearance-required filtered out, ${open.length} remain.`
  );
  return open;
}
