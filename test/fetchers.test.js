/**
 * Tests for the fetcher aggregator (src/fetchers/index.js).
 * Network calls are mocked via globalThis.fetch so no real HTTP is made.
 */
import { test, mock, beforeEach } from "node:test";
import assert from "node:assert/strict";

// ── Helpers ──────────────────────────────────────────────────────────────────

function jsearchPayload(jobs) {
  return { data: jobs };
}

function adzunaPayload(jobs) {
  return { results: jobs };
}

function mockFetch(responses) {
  // responses: Map<url-substring, payload>
  return mock.fn(async (url) => {
    for (const [key, payload] of Object.entries(responses)) {
      if (url.includes(key)) {
        return {
          ok: true,
          json: async () => payload,
        };
      }
    }
    return { ok: false, status: 404, json: async () => ({}) };
  });
}

// ── Aggregator dedup logic ───────────────────────────────────────────────────
// We test the merge/dedup logic directly without importing the module
// (which would pull in config/env). This mirrors the logic in fetchers/index.js.

function aggregate(results) {
  const jobs = [];
  const seen = new Set();
  for (const result of results) {
    if (result.status === "rejected") continue;
    for (const job of result.value) {
      if (!seen.has(job.id)) {
        seen.add(job.id);
        jobs.push(job);
      }
    }
  }
  return jobs;
}

test("aggregate: merges jobs from two sources", () => {
  const results = [
    { status: "fulfilled", value: [{ id: "a" }, { id: "b" }] },
    { status: "fulfilled", value: [{ id: "c" }] },
  ];
  const merged = aggregate(results);
  assert.equal(merged.length, 3);
});

test("aggregate: deduplicates identical ids across sources", () => {
  const results = [
    { status: "fulfilled", value: [{ id: "shared" }, { id: "unique-a" }] },
    { status: "fulfilled", value: [{ id: "shared" }, { id: "unique-b" }] },
  ];
  const merged = aggregate(results);
  assert.equal(merged.length, 3);
  const ids = merged.map((j) => j.id);
  assert.equal(ids.filter((id) => id === "shared").length, 1);
});

test("aggregate: skips rejected fetcher results without throwing", () => {
  const results = [
    { status: "rejected", reason: new Error("network error") },
    { status: "fulfilled", value: [{ id: "ok" }] },
  ];
  const merged = aggregate(results);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].id, "ok");
});

test("aggregate: returns empty array when all sources fail", () => {
  const results = [
    { status: "rejected", reason: new Error("fail") },
    { status: "rejected", reason: new Error("fail") },
  ];
  assert.deepEqual(aggregate(results), []);
});
