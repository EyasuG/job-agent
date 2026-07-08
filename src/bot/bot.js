import fs from "node:fs";
import { Telegraf } from "telegraf";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";
import { updateJobStatus, getJobByToken, getTopJobs } from "../store/db.js";
import { jobToken } from "../lib/token.js";
import { generateApplyKit, renderApplyKit } from "../tailor/applykit.js";

let bot = null;

/**
 * Returns the singleton Telegraf bot instance.
 * Call startBot() before using this.
 */
export function getBot() {
  if (!bot) throw new Error("Bot not initialized. Call startBot() first.");
  return bot;
}

/**
 * Sends a job notification with inline action buttons.
 *
 * @param {object} job        - Normalized job object { id, title, company, location, url }
 * @param {object|null} tailored - Tailor result (may be null if tailoring failed)
 * @param {string|null} resumePath - Path to the rendered .docx (may be null)
 */
export async function sendJobNotification(job, tailored, resumePath) {
  const { chatId } = config.telegram;

  const score = tailored?.score;
  const coverage = tailored?.keyword_coverage;
  const isTop = score != null && score >= config.topMatchScore;

  let scoreBar = score != null ? ` — Match: ${score}/100` : "";
  if (coverage != null) scoreBar += ` — Keywords: ${coverage}%`;

  let text = "";
  if (isTop) text += `⭐ *TOP MATCH* ⭐\n`;
  text += `*${escMd(job.title)}*\n${escMd(job.company)} — ${escMd(job.location)}${escMd(scoreBar)}`;

  if (tailored?.unmatched_requirements?.length) {
    text += `\n\n_Gaps:_ ${tailored.unmatched_requirements.map(escMd).join(", ")}`;
  }

  const tok = jobToken(job.id);
  const keyboard = {
    inline_keyboard: [
      [
        { text: "🔗 Open Job", url: job.url },
        { text: "💾 Save", callback_data: `save:${tok}` },
        { text: "⏭ Skip", callback_data: `skip:${tok}` },
      ],
      [{ text: "📋 Apply Kit", callback_data: `kit:${tok}` }],
    ],
  };

  // If a tailored resume was rendered, attach the actual .docx so it can be
  // downloaded straight from the chat. Telegram captions cap at 1024 chars,
  // which the job summary above stays well within.
  if (resumePath && fs.existsSync(resumePath)) {
    try {
      await sendDocumentNative(chatId, resumePath, friendlyFilename(job), text, keyboard);
      return;
    } catch (err) {
      // Fall through to a plain message with the path if the upload fails.
      logger.error(`Resume upload failed for ${job.title}: ${err.message}`);
      text += `\n\n_Resume saved at:_ \`${escMd(resumePath)}\``;
    }
  }

  // Fallback: no resume file (or upload failed) — send the summary as text.
  await getBot().telegram.sendMessage(chatId, text, {
    parse_mode: "MarkdownV2",
    reply_markup: keyboard,
    disable_web_page_preview: true,
  });
}

const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/**
 * Uploads a document via the raw Telegram Bot API using native fetch/FormData.
 * Telegraf v4 bundles a legacy node-fetch whose streaming multipart upload
 * resets the socket on Node 22+, so we bypass it for file uploads only.
 */
async function sendDocumentNative(chatId, filePath, filename, caption, keyboard) {
  const buf = fs.readFileSync(filePath);
  const form = new FormData();
  form.append("chat_id", String(chatId));
  form.append("caption", caption);
  form.append("parse_mode", "MarkdownV2");
  form.append("reply_markup", JSON.stringify(keyboard));
  form.append("document", new Blob([buf], { type: DOCX_MIME }), filename);

  const res = await fetch(
    `https://api.telegram.org/bot${config.telegram.token}/sendDocument`,
    { method: "POST", body: form }
  );
  const data = await res.json();
  if (!data.ok) throw new Error(data.description || `HTTP ${res.status}`);
  return data;
}

/** Builds a readable download filename like "Resume - Acme - React Dev.docx". */
function friendlyFilename(job, kind = "Resume") {
  const clean = (s) => String(s ?? "").replace(/[^a-z0-9 .-]/gi, "").trim().slice(0, 40);
  const name = `${kind} - ${clean(job.company)} - ${clean(job.title)}`.replace(/\s+/g, " ").trim();
  return `${name || kind}.docx`;
}

/**
 * Generates and delivers an application kit (.docx) for a job to Telegram.
 * Runs on demand when the user taps the "Apply Kit" button.
 */
async function deliverApplyKit(chatId, job) {
  try {
    const kit = await generateApplyKit(job);
    if (!kit) {
      await getBot().telegram.sendMessage(chatId, "❌ Couldn't generate the apply kit — try again shortly.");
      return;
    }
    const kitPath = await renderApplyKit(job, kit);
    const caption = `📋 *Apply Kit* — ${escMd(job.title)} @ ${escMd(job.company)}\n_Bracketed \\[…\\] fields need your confirmation before submitting\\._`;
    const keyboard = { inline_keyboard: [[{ text: "🔗 Open Application", url: job.url }]] };
    await sendDocumentNative(chatId, kitPath, friendlyFilename(job, "Apply Kit"), caption, keyboard);
    logger.info(`Apply kit delivered: ${job.title} @ ${job.company}`);
  } catch (err) {
    logger.error(`Apply-kit delivery failed for ${job.title}: ${err.message}`);
    await getBot().telegram.sendMessage(chatId, "❌ Apply kit failed to send.");
  }
}

/**
 * Starts the Telegraf bot: registers command and callback handlers, then
 * launches polling. Returns the bot instance.
 *
 * @param {function} runPipeline - async function to trigger a pipeline run on demand
 */
export function startBot(runPipeline) {
  const { token, chatId } = config.telegram;
  bot = new Telegraf(token);

  // /start — greeting
  bot.command("start", (ctx) => {
    ctx.reply(
      "👋 Job Agent is running\\!\n\n" +
        "Commands:\n" +
        "/run — trigger a job scan now\n" +
        "/top — show your highest\\-scoring matches\n" +
        "/status — show agent status\n\n" +
        "On each job: 💾 Save, ⏭ Skip, or 📋 Apply Kit \\(pre\\-filled ATS answers\\)\\.",
      { parse_mode: "MarkdownV2" }
    );
  });

  // /status — confirm the agent is alive
  bot.command("status", (ctx) => {
    ctx.reply("✅ Agent is online and scheduled\\.", { parse_mode: "MarkdownV2" });
  });

  // /top — list the highest-scoring jobs seen so far
  bot.command("top", async (ctx) => {
    if (String(ctx.chat.id) !== String(chatId)) return;
    const jobs = getTopJobs(5);
    if (!jobs.length) {
      await ctx.reply("No scored jobs yet — run /run first\\.", { parse_mode: "MarkdownV2" });
      return;
    }
    let msg = "⭐ *Top matches*\n\n";
    for (const j of jobs) {
      msg += `*${escMd(j.title)}* — ${escMd(String(j.score))}/100\n` +
             `${escMd(j.company)}\n[Open](${j.url})\n\n`;
    }
    await ctx.reply(msg, { parse_mode: "MarkdownV2", disable_web_page_preview: true });
  });

  // /run — manual pipeline trigger (only allowed from the configured chat)
  bot.command("run", async (ctx) => {
    if (String(ctx.chat.id) !== String(chatId)) return; // ignore other chats
    await ctx.reply("🔍 Starting job scan\\.\\.\\.", { parse_mode: "MarkdownV2" });
    try {
      await runPipeline();
      await ctx.reply("✅ Scan complete\\.", { parse_mode: "MarkdownV2" });
    } catch (err) {
      logger.error(`Manual run failed: ${err.message}`);
      await ctx.reply(`❌ Scan failed: ${escMd(err.message)}`, { parse_mode: "MarkdownV2" });
    }
  });

  // Inline button callbacks. callback_data is "<action>:<token>"; the token is
  // a short hash of the job id (Telegram caps callback_data at 64 bytes).
  bot.on("callback_query", async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (!data) return;
    const [action, tok] = data.split(":");
    const job = tok ? getJobByToken(tok) : null;

    if (action === "save") {
      if (job) updateJobStatus(job.id, "saved");
      await ctx.answerCbQuery(job ? "Saved! ✅" : "Job not found.");
    } else if (action === "skip") {
      if (job) updateJobStatus(job.id, "skipped");
      await ctx.answerCbQuery(job ? "Skipped." : "Job not found.");
    } else if (action === "kit") {
      await ctx.answerCbQuery(job ? "Generating your apply kit… 📋" : "Job not found.");
      if (job) await deliverApplyKit(chatId, job);
    } else {
      await ctx.answerCbQuery();
    }
  });

  bot.catch((err) => {
    logger.error(`Telegraf error: ${err.message}`);
  });

  // launch() uses long-polling by default — no webhook setup needed
  bot.launch();
  logger.info("Telegram bot started (long-polling).");

  // Graceful shutdown
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  return bot;
}

/** Escape special MarkdownV2 characters. */
function escMd(str) {
  return String(str ?? "").replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}
