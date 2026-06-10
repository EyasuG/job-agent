import { config } from "../config.js";
import { logger } from "../lib/logger.js";

const BASE = "https://jooble.org/api";

// Fetches jobs from Jooble (one POST per configured query) and returns a
// normalized array. Requires JOOBLE_API_KEY — request one at
// https://jooble.org/api/about (free).
export async function fetchJobs() {
  const { joobleApiKey, queries, location } = config.jobApi;

  if (!joobleApiKey) {
    logger.warn("JOOBLE_API_KEY not set — skipping Jooble.");
    return [];
  }

  const jobs = [];
  for (const query of queries) {
    const res = await fetch(`${BASE}/${joobleApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords: query, location }),
    });

    if (!res.ok) {
      throw new Error(`Jooble request failed (${res.status})`);
    }

    const data = await res.json();
    jobs.push(...(data.jobs ?? []).map(normalize));
  }
  return jobs;
}

function normalize(j) {
  return {
    id: `jooble:${j.id}`,
    title: j.title ?? "",
    company: j.company ?? "",
    location: j.location ?? "",
    url: j.link ?? "",
    // Jooble snippets contain HTML — strip tags for the tailor
    description: (j.snippet ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  };
}
