import { createHash } from "node:crypto";

// Telegram callback_data is capped at 64 bytes, but some job IDs (notably
// Google Jobs / SerpApi base64 ids) run to hundreds of chars. We reference
// jobs in inline buttons by a short, stable hash of their id instead.
export function jobToken(id) {
  return createHash("sha256").update(String(id)).digest("hex").slice(0, 16);
}
