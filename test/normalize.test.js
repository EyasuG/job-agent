/**
 * Tests for the normalization logic inside each fetcher.
 * We extract and test the normalize() shape without making any network calls.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

// ── JSearch normalization ────────────────────────────────────────────────────

function normalizeJSearch(j) {
  return {
    id: j.job_id,
    title: j.job_title,
    company: j.employer_name,
    location: [j.job_city, j.job_state].filter(Boolean).join(", "),
    url: j.job_apply_link,
    description: j.job_description ?? "",
  };
}

test("JSearch: normalizes a full record correctly", () => {
  const raw = {
    job_id: "abc123",
    job_title: "Frontend Engineer",
    employer_name: "Acme Co",
    job_city: "Washington",
    job_state: "DC",
    job_apply_link: "https://example.com/apply",
    job_description: "We build cool stuff.",
  };
  const job = normalizeJSearch(raw);
  assert.equal(job.id, "abc123");
  assert.equal(job.title, "Frontend Engineer");
  assert.equal(job.company, "Acme Co");
  assert.equal(job.location, "Washington, DC");
  assert.equal(job.url, "https://example.com/apply");
  assert.equal(job.description, "We build cool stuff.");
});

test("JSearch: omits missing city gracefully", () => {
  const raw = {
    job_id: "x",
    job_title: "Engineer",
    employer_name: "Corp",
    job_city: undefined,
    job_state: "VA",
    job_apply_link: "https://example.com",
    job_description: "",
  };
  const job = normalizeJSearch(raw);
  assert.equal(job.location, "VA");
});

test("JSearch: falls back to empty string for missing description", () => {
  const raw = {
    job_id: "y",
    job_title: "Dev",
    employer_name: "Biz",
    job_city: "Reston",
    job_state: "VA",
    job_apply_link: "https://example.com",
  };
  const job = normalizeJSearch(raw);
  assert.equal(job.description, "");
});

// ── Adzuna normalization ─────────────────────────────────────────────────────

function normalizeAdzuna(j) {
  return {
    id: `adzuna:${j.id}`,
    title: j.title ?? "",
    company: j.company?.display_name ?? "",
    location: j.location?.display_name ?? "",
    url: j.redirect_url ?? "",
    description: j.description ?? "",
  };
}

test("Adzuna: normalizes a full record correctly", () => {
  const raw = {
    id: "99887",
    title: "Node.js Developer",
    company: { display_name: "Tech LLC" },
    location: { display_name: "Bethesda, MD" },
    redirect_url: "https://adzuna.com/job/1",
    description: "Node experience required.",
  };
  const job = normalizeAdzuna(raw);
  assert.equal(job.id, "adzuna:99887");
  assert.equal(job.title, "Node.js Developer");
  assert.equal(job.company, "Tech LLC");
  assert.equal(job.location, "Bethesda, MD");
  assert.equal(job.url, "https://adzuna.com/job/1");
  assert.equal(job.description, "Node experience required.");
});

test("Adzuna: id is prefixed to prevent dedup collisions", () => {
  const job = normalizeAdzuna({ id: "123", title: "", company: {}, location: {} });
  assert.match(job.id, /^adzuna:/);
});

test("Adzuna: falls back to empty strings for missing optional fields", () => {
  const job = normalizeAdzuna({ id: "1" });
  assert.equal(job.title, "");
  assert.equal(job.company, "");
  assert.equal(job.location, "");
  assert.equal(job.url, "");
  assert.equal(job.description, "");
});

// ── SerpApi (Google Jobs) normalization ──────────────────────────────────────

function normalizeSerpApi(j) {
  const url = j.apply_options?.[0]?.link || j.share_link || "";
  return {
    id: `serpapi:${j.job_id ?? url}`,
    title: j.title ?? "",
    company: j.company_name ?? "",
    location: j.location ?? "",
    url,
    description: j.description ?? "",
  };
}

test("SerpApi: normalizes a full Google Jobs record", () => {
  const raw = {
    job_id: "abc==",
    title: "React Developer",
    company_name: "Acme",
    location: "Washington, DC",
    description: "Build React apps.",
    apply_options: [{ title: "Apply on Indeed", link: "https://indeed.com/job/1" }],
    share_link: "https://serpapi.com/share/1",
  };
  const job = normalizeSerpApi(raw);
  assert.equal(job.id, "serpapi:abc==");
  assert.equal(job.title, "React Developer");
  assert.equal(job.company, "Acme");
  assert.equal(job.location, "Washington, DC");
  assert.equal(job.url, "https://indeed.com/job/1"); // prefers apply link
  assert.equal(job.description, "Build React apps.");
});

test("SerpApi: falls back to share_link when no apply option", () => {
  const job = normalizeSerpApi({ job_id: "x", share_link: "https://serpapi.com/share/x" });
  assert.equal(job.url, "https://serpapi.com/share/x");
});

test("SerpApi: id is prefixed to prevent dedup collisions", () => {
  const job = normalizeSerpApi({ job_id: "42" });
  assert.match(job.id, /^serpapi:/);
});
