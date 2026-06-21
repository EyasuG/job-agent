import fs from "node:fs";
import pLimit from "p-limit";
import { fetchAllJobs } from "./fetchers/index.js";
import { buildPrescreen } from "./lib/prescreen.js";
import { isNew, markSeen, updateJobDetails } from "./store/db.js";
import { tailorResume } from "./tailor/tailor.js";
import { llmConfigured, llmLabel } from "./tailor/llm.js";
import { renderResume } from "./tailor/render.js";
import { sendJobNotification } from "./bot/bot.js";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";

// Cap concurrent Claude API calls to avoid rate-limit errors
const CONCURRENCY = 3;

async function processJob(job) {
  const tailored = await tailorResume(job);

  // If an LLM is configured but tailoring failed (parse error, truncation),
  // leave the job unseen so it gets retried on the next run instead of
  // notifying without a score.
  if (!tailored && llmConfigured()) {
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
  logger.info(`Fetching jobs... (LLM: ${llmConfigured() ? llmLabel() : "none"})`);
  const jobs = await fetchAllJobs();
  const fresh = jobs.filter((j) => j.id && isNew(j.id));
  logger.info(`Found ${jobs.length} jobs, ${fresh.length} new.`);

  // Free relevance prescreen: drop jobs sharing too few skills with the
  // resume before spending any Anthropic tokens on them.
  let candidates = fresh;
  try {
    const master = JSON.parse(fs.readFileSync(config.paths.masterResume, "utf8"));
    const matchesProfile = buildPrescreen(master.skills, config.llm.prescreenMinMatches);
    candidates = fresh.filter((job) => {
      if (matchesProfile(job)) return true;
      markSeen(job); // permanently irrelevant — never reconsider
      return false;
    });
    logger.info(
      `Prescreen: ${fresh.length - candidates.length} irrelevant jobs dropped without API calls, ${candidates.length} to tailor.`
    );
  } catch (err) {
    logger.warn(`Prescreen skipped (${err.message}) — tailoring all new jobs.`);
  }

  const limit = pLimit(CONCURRENCY);

  await Promise.all(
    candidates.map((job) =>
      limit(() =>
        processJob(job).catch((err) =>
          logger.error(`Failed on job ${job.id}: ${err.message}`)
        )
      )
    )
  );

  logger.info("Run complete.");
}
