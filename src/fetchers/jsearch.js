import { config } from "../config.js";
import { logger } from "../lib/logger.js";

const HOST = "jsearch.p.rapidapi.com";

// Fetches jobs from JSearch (one request per configured query) and returns
// a normalized array. When remote roles are wanted (REGION_INCLUDE_REMOTE),
// each query also runs once as a US remote-only search — a location-anchored
// search ("… in Washington, DC") otherwise misses most remote postings.
export async function fetchJobs() {
  const { rapidApiKey, queries, location, datePosted, regionIncludeRemote } = config.jobApi;

  if (!rapidApiKey) {
    logger.warn("RAPIDAPI_KEY not set — skipping JSearch.");
    return [];
  }

  const searches = queries.map((q) => ({ query: `${q} in ${location}` }));
  if (regionIncludeRemote) {
    searches.push(...queries.map((q) => ({ query: q, remote_jobs_only: "true", country: "us" })));
  }

  const jobs = [];
  for (const search of searches) {
    const params = new URLSearchParams({
      ...search,
      date_posted: datePosted,
      num_pages: "1",
    });

    const res = await fetch(`https://${HOST}/search?${params}`, {
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": HOST,
      },
    });

    if (!res.ok) {
      throw new Error(`JSearch request failed (${res.status})`);
    }

    const data = await res.json();
    jobs.push(...(data.data ?? []).map(normalize));
  }
  return jobs;
}

export function normalize(j) {
  return {
    id: j.job_id,
    title: j.job_title,
    company: j.employer_name,
    // Remote postings often have no city/state; label them so the region
    // filter can recognize them as remote rather than "no location"
    location: [j.job_city, j.job_state, j.job_is_remote ? "Remote" : ""].filter(Boolean).join(", "),
    url: j.job_apply_link,
    description: j.job_description ?? "",
  };
}
