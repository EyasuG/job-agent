import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { config } from "../config.js";

fs.mkdirSync(config.paths.data, { recursive: true });
const db = new DatabaseSync(path.join(config.paths.data, "jobs.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS seen_jobs (
    id        TEXT PRIMARY KEY,
    title     TEXT,
    company   TEXT,
    url       TEXT,
    seen_at   TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const selectStmt = db.prepare("SELECT 1 FROM seen_jobs WHERE id = ?");
const insertStmt = db.prepare(
  "INSERT OR IGNORE INTO seen_jobs (id, title, company, url) VALUES (?, ?, ?, ?)"
);

export function isNew(jobId) {
  return selectStmt.get(jobId) === undefined;
}

export function markSeen(job) {
  insertStmt.run(job.id, job.title, job.company, job.url);
}
