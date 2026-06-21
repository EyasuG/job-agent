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

// Maps a provider to its conventional env var so all keys can coexist in .env.
function providerKey(provider) {
  const byProvider = {
    gemini: "GEMINI_API_KEY",
    groq: "GROQ_API_KEY",
    openrouter: "OPENROUTER_API_KEY",
    anthropic: "ANTHROPIC_API_KEY",
    ollama: "", // local, no key
  };
  const envName = byProvider[provider];
  return envName ? optional(envName, "") : "";
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
    // Which AI backend to use: gemini | groq | ollama | openrouter | anthropic
    provider: optional("LLM_PROVIDER", "gemini").toLowerCase(),
    // Key resolution: explicit LLM_API_KEY wins, otherwise fall back to the
    // provider-specific key, so all keys can live in .env and you switch
    // providers by changing LLM_PROVIDER alone.
    apiKey:
      optional("LLM_API_KEY", "") ||
      providerKey(optional("LLM_PROVIDER", "gemini").toLowerCase()),
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
