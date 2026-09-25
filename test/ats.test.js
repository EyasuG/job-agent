/**
 * Tests for the employer ATS fetcher (src/fetchers/ats.js): per-provider
 * normalization plus the query, location, and date-window filters.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeGreenhouse,
  normalizeLever,
  normalizeAshby,
  matchesQueries,
  matchesLocation,
  postedSince,
  htmlToText,
} from "../src/fetchers/ats.js";

const QUERIES = ["forward deployed engineer", "full stack developer", "front end developer"];

// ── Normalization ────────────────────────────────────────────────────────────

test("Greenhouse: decodes double-escaped HTML content into plain text", () => {
  const job = normalizeGreenhouse(
    {
      id: 123,
      title: "Software Engineer, Frontend",
      company_name: "Vercel",
      location: { name: "San Francisco, CA" },
      absolute_url: "https://job-boards.greenhouse.io/vercel/jobs/123",
      content: "&lt;p&gt;Build &amp;amp; ship &lt;strong&gt;React&lt;/strong&gt;&lt;/p&gt;",
      first_published: "2026-09-01T00:00:00Z",
    },
    "vercel"
  );
  assert.equal(job.id, "greenhouse:vercel:123");
  assert.equal(job.company, "Vercel");
  assert.equal(job.url, "https://job-boards.greenhouse.io/vercel/jobs/123");
  assert.equal(job.description, "Build & ship React");
  assert.ok(job.postedAt instanceof Date);
});

test("Lever: combines description, lists, and closing; uses country hint", () => {
  const job = normalizeLever(
    {
      id: "abc",
      text: "Forward Deployed Engineer",
      categories: { location: "New York, NY", allLocations: ["New York, NY"] },
      workplaceType: "onsite",
      hostedUrl: "https://jobs.lever.co/palantir/abc",
      descriptionPlain: "Intro.",
      lists: [{ text: "What you'll do", content: "<li>Ship</li><li>Deploy</li>" }],
      additionalPlain: "Benefits.",
      createdAt: 1786469891368,
      country: "US",
    },
    "palantir"
  );
  assert.equal(job.id, "lever:palantir:abc");
  assert.equal(job.company, "Palantir");
  assert.match(job.description, /Intro\.\nWhat you'll do: Ship\nDeploy\nBenefits\./);
  assert.equal(job.usHint, true);
});

test("Ashby: prettifies slug and reads structured country", () => {
  const job = normalizeAshby(
    {
      id: "u1",
      title: "Senior Fullstack Engineer",
      location: "Europe",
      isRemote: true,
      jobUrl: "https://jobs.ashbyhq.com/linear/u1",
      descriptionPlain: "Build Linear.",
      publishedAt: "2021-04-27T20:13:45.158+00:00",
      address: { postalAddress: { addressCountry: "European Union" } },
    },
    "linear"
  );
  assert.equal(job.company, "Linear");
  assert.equal(job.location, "Europe · Remote");
  assert.equal(job.usHint, false);
});

test("htmlToText: keeps block breaks and collapses whitespace", () => {
  assert.equal(htmlToText("<p>One</p>  <p>Two&nbsp;three</p>"), "One\nTwo three");
});

// ── Query matching ───────────────────────────────────────────────────────────

test("matchesQueries: matches spelling variants of role families", () => {
  assert.ok(matchesQueries("Senior Fullstack Engineer", QUERIES));
  assert.ok(matchesQueries("Full-Stack Software Engineer", QUERIES));
  assert.ok(matchesQueries("Software Engineer, Front End", QUERIES));
  assert.ok(matchesQueries("Frontend Engineer (React)", QUERIES));
  assert.ok(matchesQueries("Forward Deployed Engineer - Federal", QUERIES));
});

test("matchesQueries: rejects unrelated roles", () => {
  assert.ok(!matchesQueries("Account Executive, Commercial", QUERIES));
  assert.ok(!matchesQueries("Backend Engineer", QUERIES));
  assert.ok(!matchesQueries("Forward Deployed Strategist", QUERIES)); // not an engineering role
});

test("matchesQueries: an all-generic query requires every word", () => {
  assert.ok(matchesQueries("Software Engineer II", ["software engineer"]));
  assert.ok(!matchesQueries("Data Engineer", ["software engineer"]));
});

// ── Location ─────────────────────────────────────────────────────────────────

test("matchesLocation: nationwide keeps US onsite/hybrid/remote, drops abroad", () => {
  const us = (locationText, usHint) => matchesLocation({ locationText, usHint }, "United States");
  assert.ok(us("San Francisco, CA"));
  assert.ok(us("Hybrid - New York"));
  assert.ok(us("Remote - US"));
  assert.ok(us("Remote"));
  assert.ok(us("Anywhere", undefined));
  assert.ok(!us("Hybrid - London"));
  assert.ok(!us("Remote - Canada"));
  assert.ok(!us("Remote", false)); // structured country says non-US
  assert.ok(us("Singapore", true)); // structured country says US
});

test("matchesLocation: a named city keeps that city plus US remote", () => {
  const sea = (locationText) => matchesLocation({ locationText }, "Seattle");
  assert.ok(sea("Seattle, WA"));
  assert.ok(sea("Remote - US"));
  assert.ok(!sea("Austin, TX"));
});

// ── Date window ──────────────────────────────────────────────────────────────

test("postedSince: maps JOB_DATE_POSTED to a cutoff date", () => {
  const now = Date.parse("2026-09-25T00:00:00Z");
  assert.equal(postedSince("month", now).toISOString(), "2026-08-26T00:00:00.000Z");
  assert.equal(postedSince("week", now).toISOString(), "2026-09-18T00:00:00.000Z");
  assert.equal(postedSince("all", now), null);
});
