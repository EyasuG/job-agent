import { config } from "../config.js";
import { logger } from "../lib/logger.js";

const HOST = "jsearch.p.rapidapi.com";

// Fetches jobs from JSearch and returns a normalized array.
// Swap this module out to change job source without touching the rest of the app.
export async function fetchJobs() {
  const { rapidApiKey, query, location, datePosted } = config.jobApi;

  if (!rapidApiKey) {
    logger.warn("RAPIDAPI_KEY not set — returning no jobs.");
    return [];
  }

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
  return (data.data ?? []).map(normalize);
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
