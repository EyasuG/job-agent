import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { config } from "../config.js";
import { jobToken } from "../lib/token.js";

fs.mkdirSync(config.paths.data, { recursive: true });
const db = new DatabaseSync(path.join(config.paths.data, "jobs.db"));

// ── Schema ────────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS seen_jobs (
    id          TEXT PRIMARY KEY,
    title       TEXT,
    company     TEXT,
    url         TEXT,
    seen_at     TEXT DEFAULT CURRENT_TIMESTAMP,
    score       INTEGER,
    resume_path TEXT,
    status      TEXT DEFAULT 'new',
    description TEXT,
    token       TEXT
  );
`);

// Additive migrations for existing databases that pre-date the new columns
for (const col of [
  "ALTER TABLE seen_jobs ADD COLUMN score       INTEGER",
  "ALTER TABLE seen_jobs ADD COLUMN resume_path TEXT",
  "ALTER TABLE seen_jobs ADD COLUMN status      TEXT DEFAULT 'new'",
  "ALTER TABLE seen_jobs ADD COLUMN description TEXT",
  "ALTER TABLE seen_jobs ADD COLUMN token       TEXT",
]) {
  try { db.exec(col); } catch { /* column already exists — ignore */ }
}
try { db.exec("CREATE INDEX IF NOT EXISTS idx_token ON seen_jobs(token)"); } catch { /* ignore */ }

// ── Prepared statements ───────────────────────────────────────────────────────

const stmtSelect   = db.prepare("SELECT 1 FROM seen_jobs WHERE id = ?");
const stmtInsert   = db.prepare(
  "INSERT OR IGNORE INTO seen_jobs (id, title, company, url, token) VALUES (?, ?, ?, ?, ?)"
);
const stmtUpdate   = db.prepare(
  "UPDATE seen_jobs SET score = ?, resume_path = ?, description = ? WHERE id = ?"
);
const stmtStatus   = db.prepare(
  "UPDATE seen_jobs SET status = ? WHERE id = ?"
);
const stmtAll      = db.prepare(
  "SELECT * FROM seen_jobs ORDER BY seen_at DESC"
);
const stmtFilter   = db.prepare(
  "SELECT * FROM seen_jobs WHERE status = ? ORDER BY seen_at DESC"
);
const stmtOne      = db.prepare("SELECT * FROM seen_jobs WHERE id = ?");
const stmtByToken  = db.prepare("SELECT * FROM seen_jobs WHERE token = ?");
const stmtTop      = db.prepare(
  "SELECT * FROM seen_jobs WHERE score IS NOT NULL AND status != 'skipped' " +
  "ORDER BY score DESC, seen_at DESC LIMIT ?"
);
const stmtCount    = db.prepare("SELECT COUNT(*) as total FROM seen_jobs");
const stmtCountNew = db.prepare(
  "SELECT COUNT(*) as total FROM seen_jobs WHERE status = 'new'"
);

// ── Exports ───────────────────────────────────────────────────────────────────

/** Returns true if this job id has never been seen before. */
export function isNew(jobId) {
  return stmtSelect.get(jobId) === undefined;
}

/** Inserts the job into the seen table (no-op if already there). */
export function markSeen(job) {
  stmtInsert.run(job.id, job.title, job.company, job.url, jobToken(job.id));
}

/** Stores the score, resume path, and description after tailoring. */
export function updateJobDetails(id, score, resumePath, description) {
  stmtUpdate.run(score ?? null, resumePath ?? null, description ?? null, id);
}

/** Updates the user-facing status (new | saved | skipped). */
export function updateJobStatus(id, status) {
  stmtStatus.run(status, id);
}

/** Returns all jobs, optionally filtered by status. */
export function getAllJobs(status) {
  return status ? stmtFilter.all(status) : stmtAll.all();
}

/** Returns a single job row by id. */
export function getJob(id) {
  return stmtOne.get(id) ?? null;
}

/** Returns a single job row by its short callback token. */
export function getJobByToken(token) {
  return stmtByToken.get(token) ?? null;
}

/** Returns the highest-scoring non-skipped jobs (for /top and digests). */
export function getTopJobs(limit = 5) {
  return stmtTop.all(limit);
}

/** Returns total job count and count of new (unactioned) jobs. */
export function getJobCounts() {
  return {
    total: stmtCount.get().total,
    newCount: stmtCountNew.get().total,
  };
}
