import pLimit from "p-limit";
import { fetchAllJobs } from "./fetchers/index.js";
import { isNew, markSeen, updateJobDetails } from "./store/db.js";
import { tailorResume } from "./tailor/tailor.js";
import { renderResume } from "./tailor/render.js";
import { sendJobNotification } from "./bot/bot.js";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";

// Cap concurrent Claude API calls to avoid rate-limit errors
const CONCURRENCY = 3;

async function processJob(job) {
  const tailored = await tailorResume(job);

  // If an API key is configured but tailoring failed (parse error, truncation),
  // leave the job unseen so it gets retried on the next run instead of
  // notifying without a score.
  if (!tailored && config.llm.apiKey) {
    logger.warn(`Tailoring failed for ${job.title} @ ${job.company} — will retry next run.`);
    return;
  }

  if (tailored) {
    const score = tailored.score ?? 0;
    if (score < config.llm.minMatchScore) {
      logger.info(`Skipping ${job.title} @ ${job.company} — score ${score} below threshold.`);
      markSeen(job);
      return;
    }
  }

  const resumePath = tailored ? await renderResume(job, tailored) : null;
  await sendJobNotification(job, tailored, resumePath);
  markSeen(job);
  updateJobDetails(job.id, tailored?.score ?? null, resumePath, job.description ?? null);
  logger.info(`Notified: ${job.title} @ ${job.company} (score: ${tailored?.score ?? "n/a"})`);
}

export async function runOnce() {
  logger.info("Fetching jobs...");
  const jobs = await fetchAllJobs();
  const fresh = jobs.filter((j) => j.id && isNew(j.id));
  logger.info(`Found ${jobs.length} jobs, ${fresh.length} new.`);

  const limit = pLimit(CONCURRENCY);

  await Promise.all(
    fresh.map((job) =>
      limit(() =>
        processJob(job).catch((err) =>
          logger.error(`Failed on job ${job.id}: ${err.message}`)
        )
      )
    )
  );

  logger.info("Run complete.");
}
