import Anthropic from "@anthropic-ai/sdk";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";

// OpenAI-compatible providers — all speak the same /chat/completions API, so
// one native-fetch path covers them. Anthropic is handled separately because
// it uses its own SDK and prompt-caching format.
const PROVIDERS = {
  gemini: {
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
    model: "gemini-2.5-flash", // gemini-2.0-flash was retired by Google
    envKey: "GEMINI_API_KEY",
  },
  groq: {
    baseURL: "https://api.groq.com/openai/v1",
    // llama-3.3-70b-versatile was decommissioned by Groq (404). gpt-oss-120b
    // is Groq's current flagship free-tier open model (131k ctx, JSON mode).
    model: "openai/gpt-oss-120b",
    envKey: "GROQ_API_KEY",
  },
  ollama: {
    baseURL: "http://localhost:11434/v1",
    // llama3.2:3b (~3GB) fits reliably on an 8GB Mac; qwen2.5:7b needs ~6GB
    // and crashes the runner under memory pressure on this hardware.
    model: "llama3.2:3b",
    keyless: true, // local server needs no API key
  },
  openrouter: {
    baseURL: "https://openrouter.ai/api/v1",
    model: "meta-llama/llama-3.3-70b-instruct",
    envKey: "OPENROUTER_API_KEY",
  },
  anthropic: {
    model: "claude-sonnet-4-6",
    envKey: "ANTHROPIC_API_KEY",
  },
};

/** The ordered list of providers to try: primary first, then fallbacks. */
function providerChain() {
  const chain = [config.llm.provider, ...config.llm.fallbacks];
  return chain.filter((p, i) => p && chain.indexOf(p) === i); // dedupe, keep order
}

/** Resolves the API key for a provider (explicit override wins). */
function keyFor(provider) {
  if (config.llm.apiKeyOverride) return config.llm.apiKeyOverride;
  const envKey = PROVIDERS[provider]?.envKey;
  return envKey ? (process.env[envKey] ?? "") : "";
}

/** True if a provider has everything it needs to run. */
function usable(provider) {
  const p = PROVIDERS[provider];
  if (!p) return false;
  if (p.keyless) return true;
  return Boolean(keyFor(provider));
}

/** Resolves the model id; LLM_MODEL applies only to the primary provider. */
function resolveModel(provider) {
  if (provider === config.llm.provider && config.llm.model) return config.llm.model;
  if (provider === "anthropic") return config.llm.anthropicModel;
  return PROVIDERS[provider]?.model;
}

/** True if at least one provider in the chain is usable. */
export function llmConfigured() {
  return providerChain().some(usable);
}

/** Human-readable chain for logging, e.g. "groq/gpt-oss-120b → ollama/llama3.2:3b". */
export function llmLabel() {
  const usableChain = providerChain().filter(usable);
  if (!usableChain.length) return "none";
  return usableChain.map((p) => `${p}/${resolveModel(p)}`).join(" → ");
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Per-provider rate limiter. Each provider has a "next allowed start" time;
// concurrent callers (the pipeline runs 3-at-a-time) reserve successive slots
// spaced by the provider's minIntervalMs, so free-tier per-minute caps aren't
// exceeded even under concurrency. A failed call still consumes its slot, which
// conveniently paces retries after a 429 too.
const nextAllowed = {};
async function rateGate(provider) {
  const interval = config.llm.minIntervalMs?.[provider] ?? 0;
  if (interval <= 0) return;
  const now = Date.now();
  const start = Math.max(now, nextAllowed[provider] ?? 0);
  nextAllowed[provider] = start + interval;
  const wait = start - now;
  if (wait > 0) await sleep(wait);
}

/** Single-provider call. Returns the raw assistant text or throws. */
async function callProvider(provider, { systemStable, systemCacheable, user, maxTokens }) {
  await rateGate(provider);
  if (provider === "anthropic") {
    const client = new Anthropic({ apiKey: keyFor(provider) });
    const message = await client.messages.create({
      model: resolveModel(provider),
      max_tokens: maxTokens,
      system: [
        { type: "text", text: systemStable },
        { type: "text", text: systemCacheable, cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: user }],
    });
    return message.content.find((b) => b.type === "text")?.text ?? "";
  }

  const p = PROVIDERS[provider];
  const res = await fetch(`${p.baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(p.keyless ? {} : { Authorization: `Bearer ${keyFor(provider)}` }),
    },
    body: JSON.stringify({
      model: resolveModel(provider),
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: `${systemStable}\n\n${systemCacheable}` },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      // Reasoning models "think" by default, consuming the output-token budget
      // and truncating the JSON. Gemini 2.5 supports disabling it outright;
      // Groq's gpt-oss accepts low/medium/high, so cap it at "low".
      ...(provider === "gemini" ? { reasoning_effort: "none" } : {}),
      ...(provider === "groq" ? { reasoning_effort: "low" } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${provider} (${res.status}): ${body.slice(0, 160)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/**
 * Sends a completion request, trying each provider in the chain until one
 * succeeds. Returns the raw assistant text; throws only if every provider fails.
 */
export async function callLLM({ systemStable, systemCacheable, user, maxTokens = 4000 }) {
  const chain = providerChain().filter(usable);
  if (!chain.length) throw new Error("No usable LLM provider configured.");

  let lastError;
  for (const provider of chain) {
    try {
      return await callProvider(provider, { systemStable, systemCacheable, user, maxTokens });
    } catch (err) {
      lastError = err;
      // Only log fallback if there's another provider to try.
      if (provider !== chain[chain.length - 1]) {
        logger.warn(`LLM provider ${provider} failed (${err.message}); trying next...`);
      }
    }
  }
  throw lastError;
}
