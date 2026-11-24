/**
 * Tests for log redaction (src/lib/logger.js): Telegram bot tokens must never
 * reach the logs, since network errors embed them in request URLs.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { redact } from "../src/lib/logger.js";

test("redact: scrubs a bot token from a Telegram request URL", () => {
  const msg = "request to https://api.telegram.org/bot123456:AAH-x_Yz9/getMe failed, reason: self-signed certificate";
  assert.equal(redact(msg), "request to https://api.telegram.org/bot<token>/getMe failed, reason: self-signed certificate");
});

test("redact: leaves ordinary text alone", () => {
  assert.equal(redact("Aggregated 78 unique jobs; robot 12 remain"), "Aggregated 78 unique jobs; robot 12 remain");
});
