const ts = () => new Date().toISOString();

// Telegram bot tokens appear in request URLs ("…/bot123:ABC/getMe"), so any
// network error from the bot could leak one into the logs. Redact them.
const TOKEN = /bot\d+:[\w-]+/g;
export const redact = (s) => String(s).replace(TOKEN, "bot<token>");
const clean = (args) => args.map((a) => (typeof a === "string" ? redact(a) : a));

export const logger = {
  info: (...args) => console.log(`[${ts()}] INFO `, ...clean(args)),
  warn: (...args) => console.warn(`[${ts()}] WARN `, ...clean(args)),
  error: (...args) => console.error(`[${ts()}] ERROR`, ...clean(args)),
};
