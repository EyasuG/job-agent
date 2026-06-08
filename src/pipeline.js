import { fetchJobs } from "./fetchers/jsearch.js";
import { isNew, markSeen } from "./store/db.js";
import { tailorResume } from "./tailor/tailor.js";
import { renderResume } from "./tailor/render.js";
import { sendJobNotification } from "./bot/bot.js";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";

export async function runOnce() {
  logger.info("Fetching jobs...");
  const jobs = await fetchJobs();
  const fresh = jobs.filter((j) => j.id && isNew(j.id));
  logger.info(`Found ${jobs.length} jobs, ${fresh.length} new.`);

  for (const job of fresh) {
    try {
      const tailored = await tailorResume(job);

      if (tailored) {
        const score = tailored.score ?? 0;
        if (score < config.llm.minMatchScore) {
          logger.info(`Skipping ${job.title} @ ${job.company} — score ${score} below threshold.`);
          markSeen(job); // don't show it again
          continue;
        }
      }

      const resumePath = tailored ? await renderResume(job, tailored) : null;
      await sendJobNotification(job, tailored, resumePath);
      markSeen(job);
      logger.info(`Notified: ${job.title} @ ${job.company} (score: ${tailored?.score ?? "n/a"})`);
    } catch (err) {
      logger.error(`Failed on job ${job.id}: ${err.message}`);
    }
  }

  logger.info("Run complete.");
}
