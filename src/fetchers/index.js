import { fetchJobs as fetchJSearch } from "./jsearch.js";
import { fetchJobs as fetchAdzuna } from "./adzuna.js";
import { fetchJobs as fetchRemotive } from "./remotive.js";
import { fetchJobs as fetchJooble } from "./jooble.js";
import { fetchJobs as fetchSerpApi } from "./serpapi.js";
import { requiresClearance, isBlockedDomain } from "../lib/filters.js";
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

  const { excludeClearance, blockedDomains } = config.jobApi;
  const total = jobs.length;

  // Drop low-trust aggregator domains (e.g. lensa.com)
  let kept = jobs.filter((j) => !isBlockedDomain(j, blockedDomains));
  const blocked = total - kept.length;

  // Drop clearance/poly-required roles unless disabled
  let clearanceDropped = 0;
  if (excludeClearance) {
    const before = kept.length;
    kept = kept.filter((j) => !requiresClearance(j));
    clearanceDropped = before - kept.length;
  }

  logger.info(
    `Aggregated ${total} unique jobs; ${blocked} blocked-domain, ` +
      `${clearanceDropped} clearance-required filtered out, ${kept.length} remain.`
  );
  return kept;
}
