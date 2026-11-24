import { fetchJobs as fetchJSearch } from "./jsearch.js";
import { fetchJobs as fetchAdzuna } from "./adzuna.js";
import { fetchJobs as fetchRemotive } from "./remotive.js";
import { fetchJobs as fetchAts } from "./ats.js";
import { fetchJobs as fetchSerpApi } from "./serpapi.js";
import { requiresClearance, isBlockedDomain, isExcludedRole, isInRegion } from "../lib/filters.js";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";

/**
 * Fetches jobs from all configured sources and returns a merged,
 * deduplicated (by id) array of normalized job objects. Jobs outside the
 * JOB_REGION_STATES region are dropped, and jobs mentioning any form of
 * clearance are filtered out when EXCLUDE_CLEARANCE is enabled (default).
 */
export async function fetchAllJobs() {
  const results = await Promise.allSettled([
    fetchJSearch(),
    fetchAdzuna(),
    fetchRemotive(),
    fetchAts(),
    fetchSerpApi(),
  ]);

  // If nothing came back and at least one source errored, treat the scan as
  // failed (e.g. offline, or a network filter blocking HTTPS) rather than as
  // "no new jobs", so the scheduler retries soon instead of waiting a full interval.
  const failed = results.filter((r) => r.status === "rejected");
  const gotJobs = results.some((r) => r.status === "fulfilled" && r.value.length > 0);
  if (failed.length && !gotJobs) {
    for (const r of failed) logger.error(`Fetcher failed: ${r.reason?.message}`);
    throw new Error(`No job source could be reached (${failed.length} failed).`);
  }

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

  const { excludeClearance, blockedDomains, excludedRoles, regionStates, regionIncludeRemote } =
    config.jobApi;
  const total = jobs.length;

  // Drop low-trust aggregator domains (e.g. lensa.com)
  let kept = jobs.filter((j) => !isBlockedDomain(j, blockedDomains));
  const blocked = total - kept.length;

  // Drop jobs located outside the target region (e.g. East Coast + DC)
  let regionDropped = 0;
  if (regionStates.length) {
    const before = kept.length;
    kept = kept.filter((j) =>
      isInRegion(j.location, regionStates, { includeRemote: regionIncludeRemote })
    );
    regionDropped = before - kept.length;
  }

  // Drop role families the candidate isn't targeting (e.g. DevOps/SRE)
  let roleDropped = 0;
  {
    const before = kept.length;
    kept = kept.filter((j) => !isExcludedRole(j, excludedRoles));
    roleDropped = before - kept.length;
  }

  // Drop clearance/poly-required roles unless disabled
  let clearanceDropped = 0;
  if (excludeClearance) {
    const before = kept.length;
    kept = kept.filter((j) => !requiresClearance(j));
    clearanceDropped = before - kept.length;
  }

  logger.info(
    `Aggregated ${total} unique jobs; ${blocked} blocked-domain, ${regionDropped} out-of-region, ` +
      `${roleDropped} excluded-role, ${clearanceDropped} clearance-required ` +
      `filtered out, ${kept.length} remain.`
  );
  return kept;
}
