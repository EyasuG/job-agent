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
    adzunaApiKey: optional("ADZUNA_APP_KEY", ""),
    joobleApiKey: optional("JOOBLE_API_KEY", ""),
    // Comma-separated list of search queries; each fetcher runs all of them
    queries: optional("JOB_QUERIES", "javascript developer,devops engineer")
      .split(",")
      .map((q) => q.trim())
      .filter(Boolean),
    location: optional("JOB_LOCATION", "Washington, DC"),
    datePosted: optional("JOB_DATE_POSTED", "week"),
    // Skip jobs that require a security clearance
    excludeClearance: optional("EXCLUDE_CLEARANCE", "true") === "true",
  },
  llm: {
    // Primary AI backend: gemini | groq | ollama | openrouter | anthropic
    provider: optional("LLM_PROVIDER", "gemini").toLowerCase(),
    // Ordered fallback providers tried if the primary fails or rate-limits.
    fallbacks: optional("LLM_FALLBACKS", "")
      .split(",")
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean),
    // Optional override key applied to whichever provider runs; normally blank
    // so each provider uses its own GEMINI_API_KEY/GROQ_API_KEY/etc.
    apiKeyOverride: optional("LLM_API_KEY", ""),
    // Override the provider's default model (empty = use provider default)
    model: optional("LLM_MODEL", ""),
    // Model used only when provider === "anthropic"
    anthropicModel: optional("ANTHROPIC_MODEL", "claude-sonnet-4-6"),
    minMatchScore: parseInt(optional("MIN_MATCH_SCORE", "50"), 10),
    // Minimum resume-skill hits in a posting before it's worth an API call
    prescreenMinMatches: parseInt(optional("PRESCREEN_MIN_MATCHES", "2"), 10),
  },
  web: {
    port: parseInt(optional("WEB_PORT", "3000"), 10),
  },
  schedule: optional("CRON_SCHEDULE", "0 */4 * * *"),
  // Run a catch-up scan shortly after startup (covers ticks missed while
  // the process was down or the machine was asleep)
  runOnStart: optional("RUN_ON_START", "true") === "true",
  paths: {
    root,
    data: path.join(root, "data"),
    output: path.join(root, "output"),
    masterResume: path.join(root, "resume", "master.json"),
  },
};
