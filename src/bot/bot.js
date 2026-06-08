import { Telegraf } from "telegraf";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";

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

  let text = `*${escMd(job.title)}*\n${escMd(job.company)} — ${escMd(job.location)}`;

  if (tailored?.unmatched_requirements?.length) {
    text += `\n\n_Gaps:_ ${tailored.unmatched_requirements.map(escMd).join(", ")}`;
  }

  if (resumePath) {
    text += `\n\n_Resume:_ \`${resumePath}\``;
  }

  const keyboard = {
    inline_keyboard: [
      [
        { text: "🔗 Open Job", url: job.url },
        { text: "💾 Save", callback_data: `save:${job.id}` },
        { text: "⏭ Skip", callback_data: `skip:${job.id}` },
      ],
    ],
  };

  await getBot().telegram.sendMessage(chatId, text, {
    parse_mode: "MarkdownV2",
    reply_markup: keyboard,
    disable_web_page_preview: true,
  });
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
        "/status — show agent status",
      { parse_mode: "MarkdownV2" }
    );
  });

  // /status — confirm the agent is alive
  bot.command("status", (ctx) => {
    ctx.reply("✅ Agent is online and scheduled\\.", { parse_mode: "MarkdownV2" });
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

  // Inline button callbacks
  bot.on("callback_query", async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (!data) return;

    if (data.startsWith("save:")) {
      await ctx.answerCbQuery("Saved! ✅");
      // Future: persist to a saved-jobs table
    } else if (data.startsWith("skip:")) {
      await ctx.answerCbQuery("Skipped.");
      // The job is already marked seen in the pipeline; this is just UX acknowledgement
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
