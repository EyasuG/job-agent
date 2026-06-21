import Anthropic from "@anthropic-ai/sdk";
import { config } from "../config.js";

// OpenAI-compatible providers — all speak the same /chat/completions API, so
// one native-fetch path covers them. Anthropic is handled separately because
// it uses its own SDK and prompt-caching format.
const PROVIDERS = {
  gemini: {
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
    model: "gemini-2.0-flash",
  },
  groq: {
    baseURL: "https://api.groq.com/openai/v1",
    model: "llama-3.3-70b-versatile",
  },
  ollama: {
    baseURL: "http://localhost:11434/v1",
    model: "qwen2.5:7b",
    keyless: true, // local server needs no API key
  },
  openrouter: {
    baseURL: "https://openrouter.ai/api/v1",
    model: "meta-llama/llama-3.3-70b-instruct",
  },
};

/** Resolves the model id for the active provider (env override wins). */
function resolveModel() {
  const { provider, model, anthropicModel } = config.llm;
  if (model) return model;
  if (provider === "anthropic") return anthropicModel;
  return PROVIDERS[provider]?.model;
}

/** True if the active provider has everything it needs to run. */
export function llmConfigured() {
  const { provider, apiKey } = config.llm;
  if (provider === "anthropic") return Boolean(apiKey);
  if (PROVIDERS[provider]?.keyless) return true;
  if (!PROVIDERS[provider]) return false;
  return Boolean(apiKey);
}

/** Human-readable "provider/model" label for logging. */
export function llmLabel() {
  return `${config.llm.provider}/${resolveModel() ?? "?"}`;
}

/**
 * Sends a completion request to the active provider and returns the raw
 * assistant text.
 *
 * @param {object}  args
 * @param {string}  args.systemStable    - System instructions (cacheable prefix on Anthropic)
 * @param {string}  args.systemCacheable - Large stable context, e.g. the master resume
 * @param {string}  args.user            - The per-request content (job description)
 * @param {number} [args.maxTokens=4000]
 * @returns {Promise<string>}
 */
export async function callLLM({ systemStable, systemCacheable, user, maxTokens = 4000 }) {
  const { provider, apiKey } = config.llm;

  if (provider === "anthropic") {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: resolveModel(),
      max_tokens: maxTokens,
      // Cache the system prompt + resume so repeat calls in a run are cheaper.
      system: [
        { type: "text", text: systemStable },
        { type: "text", text: systemCacheable, cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: user }],
    });
    return message.content.find((b) => b.type === "text")?.text ?? "";
  }

  const p = PROVIDERS[provider];
  if (!p) throw new Error(`Unknown LLM_PROVIDER: "${provider}"`);

  const res = await fetch(`${p.baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(p.keyless ? {} : { Authorization: `Bearer ${apiKey}` }),
    },
    body: JSON.stringify({
      model: resolveModel(),
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: `${systemStable}\n\n${systemCacheable}` },
        { role: "user", content: user },
      ],
      // Ask for a JSON object directly; supported by Gemini, Groq, Ollama.
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${provider} request failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}
