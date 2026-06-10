import { config } from "../config.js";

const BASE = "https://remotive.com/api/remote-jobs";

// Fetches remote software-dev jobs from Remotive (free, no API key) and
// returns a normalized array. Remotive is remote-only, so location is
// always "Remote".
export async function fetchJobs() {
  const { queries } = config.jobApi;

  const jobs = [];
  for (const query of queries) {
    const params = new URLSearchParams({
      category: "software-dev",
      search: query,
      limit: "20",
    });

    const res = await fetch(`${BASE}?${params}`);

    if (!res.ok) {
      throw new Error(`Remotive request failed (${res.status})`);
    }

    const data = await res.json();
    jobs.push(...(data.jobs ?? []).map(normalize));
  }
  return jobs;
}

function normalize(j) {
  return {
    id: `remotive:${j.id}`,
    title: j.title ?? "",
    company: j.company_name ?? "",
    location: j.candidate_required_location
      ? `Remote (${j.candidate_required_location})`
      : "Remote",
    url: j.url ?? "",
    // Remotive descriptions are HTML — strip tags so the tailor gets clean text
    description: (j.description ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  };
}
