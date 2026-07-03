import fs from "node:fs";
import path from "node:path";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";

const BASE = "https://serpapi.com/search.json";
const USAGE_FILE = path.join(config.paths.data, "serpapi-usage.json");

// Fetches jobs from Google Jobs via SerpApi (one search per configured query)
// and returns a normalized array. Google Jobs aggregates Indeed, ZipRecruiter,
// LinkedIn and others, so this is the closest legitimate source to those boards.
//
// A monthly budget guard (SERPAPI_MONTHLY_LIMIT) stops calls once the free-tier
// quota is nearly used, so we never overshoot the 250/mo free plan.
export async function fetchJobs() {
  const { serpApiKey, serpApiMonthlyLimit, queries, location } = config.jobApi;

  if (!serpApiKey) {
    logger.warn("SERPAPI_KEY not set — skipping SerpApi.");
    return [];
  }

  const usage = readUsage();
  const jobs = [];

  for (const query of queries) {
    if (usage.count >= serpApiMonthlyLimit) {
      logger.warn(
        `SerpApi monthly budget reached (${usage.count}/${serpApiMonthlyLimit}) — skipping remaining queries.`
      );
      break;
    }

    const params = new URLSearchParams({
      engine: "google_jobs",
      q: `${query} ${location}`,
      api_key: serpApiKey,
    });

    const res = await fetch(`${BASE}?${params}`);
    // Count the search whether or not parsing succeeds — SerpApi bills on request.
    usage.count += 1;
    writeUsage(usage);

    if (!res.ok) {
      throw new Error(`SerpApi request failed (${res.status})`);
    }

    const data = await res.json();
    jobs.push(...(data.jobs_results ?? []).map(normalize));
  }

  logger.info(`SerpApi: ${usage.count}/${serpApiMonthlyLimit} searches used this month.`);
  return jobs;
}

function normalize(j) {
  // Prefer a direct apply link; fall back to the SerpApi share link.
  const url = j.apply_options?.[0]?.link || j.share_link || "";
  return {
    id: `serpapi:${j.job_id ?? url}`,
    title: j.title ?? "",
    company: j.company_name ?? "",
    location: j.location ?? "",
    url,
    description: j.description ?? "",
  };
}

// ── Monthly usage tracking ────────────────────────────────────────────────────

function currentMonth() {
  return new Date().toISOString().slice(0, 7); // "YYYY-MM"
}

function readUsage() {
  try {
    const saved = JSON.parse(fs.readFileSync(USAGE_FILE, "utf8"));
    if (saved.month === currentMonth()) return saved;
  } catch {
    /* missing or unreadable — start fresh */
  }
  return { month: currentMonth(), count: 0 };
}

function writeUsage(usage) {
  fs.mkdirSync(config.paths.data, { recursive: true });
  fs.writeFileSync(USAGE_FILE, JSON.stringify(usage), "utf8");
}
