/**
 * Tests for the dedup store (isNew / markSeen).
 * Uses an in-memory SQLite database so no files are created on disk.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";

function createStore() {
  const db = new DatabaseSync(":memory:");
  db.exec(`
    CREATE TABLE seen_jobs (
      id      TEXT PRIMARY KEY,
      title   TEXT,
      company TEXT,
      url     TEXT,
      seen_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  const select = db.prepare("SELECT 1 FROM seen_jobs WHERE id = ?");
  const insert = db.prepare(
    "INSERT OR IGNORE INTO seen_jobs (id, title, company, url) VALUES (?, ?, ?, ?)"
  );
  return {
    isNew: (id) => select.get(id) === undefined,
    markSeen: (job) => insert.run(job.id, job.title, job.company, job.url),
  };
}

test("isNew returns true for an unseen job", () => {
  const store = createStore();
  assert.ok(store.isNew("job-1"));
});

test("isNew returns false after markSeen", () => {
  const store = createStore();
  const job = { id: "job-2", title: "Engineer", company: "Acme", url: "https://example.com" };
  store.markSeen(job);
  assert.equal(store.isNew("job-2"), false);
});

test("markSeen is idempotent — no error on duplicate insert", () => {
  const store = createStore();
  const job = { id: "job-3", title: "Dev", company: "Corp", url: "https://example.com" };
  assert.doesNotThrow(() => {
    store.markSeen(job);
    store.markSeen(job);
  });
});

test("different jobs are tracked independently", () => {
  const store = createStore();
  const jobA = { id: "a", title: "A", company: "X", url: "https://a.com" };
  const jobB = { id: "b", title: "B", company: "Y", url: "https://b.com" };
  store.markSeen(jobA);
  assert.equal(store.isNew("a"), false);
  assert.ok(store.isNew("b"));
});

test("Adzuna-prefixed ids are treated as distinct from plain ids", () => {
  const store = createStore();
  const plain = { id: "42", title: "Dev", company: "X", url: "https://x.com" };
  store.markSeen(plain);
  assert.ok(store.isNew("adzuna:42")); // different id — should still be new
});
