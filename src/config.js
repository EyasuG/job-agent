import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function optional(name, fallback) {
  return process.env[name] ?? fallback;
}

export const config = {
  telegram: {
    token: required("TELEGRAM_BOT_TOKEN"),
    chatId: required("TELEGRAM_CHAT_ID"),
  },
  jobApi: {
    rapidApiKey: optional("RAPIDAPI_KEY", ""),
    adzunaAppId: optional("ADZUNA_APP_ID", ""),
    adzunaApiKey: optional("ADZUNA_API_KEY", ""),
    query: optional("JOB_QUERY", "javascript developer"),
    location: optional("JOB_LOCATION", "Washington, DC"),
    datePosted: optional("JOB_DATE_POSTED", "week"),
  },
  llm: {
    apiKey: optional("ANTHROPIC_API_KEY", ""),
    model: optional("ANTHROPIC_MODEL", "claude-sonnet-4-6"),
    minMatchScore: parseInt(optional("MIN_MATCH_SCORE", "50"), 10),
  },
  schedule: optional("CRON_SCHEDULE", "0 */4 * * *"),
  paths: {
    root,
    data: path.join(root, "data"),
    output: path.join(root, "output"),
    masterResume: path.join(root, "resume", "master.json"),
  },
};
