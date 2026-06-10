import { config } from "../config.js";
import { logger } from "../lib/logger.js";

const HOST = "jsearch.p.rapidapi.com";

// Fetches jobs from JSearch (one request per configured query) and returns
// a normalized array.
export async function fetchJobs() {
  const { rapidApiKey, queries, location, datePosted } = config.jobApi;

  if (!rapidApiKey) {
    logger.warn("RAPIDAPI_KEY not set — skipping JSearch.");
    return [];
  }

  const jobs = [];
  for (const query of queries) {
    const params = new URLSearchParams({
      query: `${query} in ${location}`,
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

function normalize(j) {
  return {
    id: j.job_id,
    title: j.job_title,
    company: j.employer_name,
    location: [j.job_city, j.job_state].filter(Boolean).join(", "),
    url: j.job_apply_link,
    description: j.job_description ?? "",
  };
}
