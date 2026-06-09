import { config } from "../config.js";
import { logger } from "../lib/logger.js";

const BASE = "https://api.adzuna.com/v1/api/jobs/us/search/1";

// Fetches jobs from Adzuna and returns a normalized array.
export async function fetchJobs() {
  const { adzunaAppId, adzunaApiKey, query, location } = config.jobApi;

  if (!adzunaAppId || !adzunaApiKey) {
    logger.warn("ADZUNA_APP_ID or ADZUNA_APP_KEY not set — skipping Adzuna.");
    return [];
  }

  const params = new URLSearchParams({
    app_id: adzunaAppId,
    app_key: adzunaApiKey,
    what: query,
    where: location,
    results_per_page: "20",
    sort_by: "date",
  });

  const res = await fetch(`${BASE}?${params}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Adzuna request failed (${res.status})`);
  }

  const data = await res.json();
  return (data.results ?? []).map(normalize);
}

function normalize(j) {
  return {
    // Prefix source so IDs never collide with JSearch IDs in the dedup store
    id: `adzuna:${j.id}`,
    title: j.title ?? "",
    company: j.company?.display_name ?? "",
    location: j.location?.display_name ?? "",
    url: j.redirect_url ?? "",
    description: j.description ?? "",
  };
}
