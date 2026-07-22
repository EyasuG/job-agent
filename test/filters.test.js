/**
 * Tests for the clearance filter (src/lib/filters.js).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { requiresClearance, isBlockedDomain, isExcludedRole } from "../src/lib/filters.js";

test("flags 'Top Secret' in title", () => {
  assert.ok(requiresClearance({ title: "Senior Software Developer (Top Secret Cleared)", description: "" }));
});

test("flags 'TS/SCI' in description", () => {
  assert.ok(requiresClearance({ title: "Engineer", description: "Active TS/SCI required for this role." }));
});

test("flags 'secret clearance' in description", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Candidates must have a Secret clearance." }));
});

test("flags 'must hold an active security clearance'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Applicant must hold an active security clearance." }));
});

test("flags polygraph requirement", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "CI poly required." }));
});

// ── Polygraph-specific coverage (candidate does not qualify) ──────────────────
test("flags spelled-out 'polygraph'", () => {
  assert.ok(requiresClearance({ title: "Engineer", description: "Must pass a polygraph." }));
});
test("flags 'Full Scope Poly'", () => {
  assert.ok(requiresClearance({ title: "Full Scope Poly Developer", description: "" }));
});
test("flags 'Lifestyle Poly'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Requires TS/SCI with Lifestyle Poly." }));
});
test("flags 'FS Poly'", () => {
  assert.ok(requiresClearance({ title: "Cloud Engineer - FS Poly", description: "" }));
});
test("flags 'Counterintelligence Polygraph'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Active TS/SCI and Counterintelligence Polygraph." }));
});
test("flags 'TS/SCI w/ Poly'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "TS/SCI w/ Poly needed." }));
});
test("flags 'TS/SCI/Poly'", () => {
  assert.ok(requiresClearance({ title: "Engineer TS/SCI/Poly", description: "" }));
});
test("does NOT false-match 'Polymer' / 'polyglot' / 'polygon'", () => {
  assert.equal(requiresClearance({ title: "Frontend Dev", description: "Experience with Polymer, LitElement, and Web Components." }), false);
  assert.equal(requiresClearance({ title: "Polyglot Engineer", description: "Comfortable in a polyglot stack; polygon rendering a plus." }), false);
});

test("does NOT flag a plain JavaScript job", () => {
  assert.equal(
    requiresClearance({ title: "Frontend Developer", description: "React, Node.js, REST APIs. Hybrid in DC." }),
    false
  );
});

test("does NOT flag 'clearance' in unrelated contexts", () => {
  assert.equal(
    requiresClearance({ title: "Web Developer", description: "Experience with customs clearance software a plus." }),
    false
  );
});

test("handles missing description gracefully", () => {
  assert.equal(requiresClearance({ title: "DevOps Engineer" }), false);
});

test("flags 'Clearance Required' in title", () => {
  assert.ok(requiresClearance({ title: "Cloud Platform Engineer - Clearance Required", description: "" }));
});

test("flags 'with Security Clearance' in title", () => {
  assert.ok(requiresClearance({ title: "Site Reliability Engineer with Security Clearance", description: "" }));
});

test("flags bare 'Cleared' in title", () => {
  assert.ok(requiresClearance({ title: "AWS Cloud Security Engineer - Cleared", description: "" }));
});

test("does NOT flag 'cleared' in description prose", () => {
  assert.equal(
    requiresClearance({ title: "Backend Developer", description: "Once the backlog is cleared, the team focuses on new features." }),
    false
  );
});

// ── Remotive US-eligibility filter ───────────────────────────────────────────

import { isUsEligible } from "../src/fetchers/remotive.js";

test("keeps USA-only jobs", () => {
  assert.ok(isUsEligible({ candidate_required_location: "USA Only" }));
});

test("keeps United States jobs", () => {
  assert.ok(isUsEligible({ candidate_required_location: "United States" }));
});

test("keeps Worldwide jobs", () => {
  assert.ok(isUsEligible({ candidate_required_location: "Worldwide" }));
});

test("keeps Americas multi-region jobs", () => {
  assert.ok(isUsEligible({ candidate_required_location: "Americas, Europe, Israel" }));
});

test("keeps jobs with no location restriction", () => {
  assert.ok(isUsEligible({ candidate_required_location: "" }));
  assert.ok(isUsEligible({}));
});

test("drops Brazil-only jobs", () => {
  assert.equal(isUsEligible({ candidate_required_location: "Brazil" }), false);
});

test("drops Europe-only jobs", () => {
  assert.equal(isUsEligible({ candidate_required_location: "Europe" }), false);
});

test("keeps mixed 'Canada, USA' jobs", () => {
  assert.ok(isUsEligible({ candidate_required_location: "Canada, USA" }));
});

// ── Blocked-domain filter ─────────────────────────────────────────────────────
const BLOCK = ["lensa.com", "jobleads.com"];

test("blocks an exact blocked domain", () => {
  assert.ok(isBlockedDomain({ url: "https://lensa.com/job/123" }, BLOCK));
});
test("blocks a subdomain of a blocked domain", () => {
  assert.ok(isBlockedDomain({ url: "https://jobs.lensa.com/apply/9" }, BLOCK));
});
test("does NOT block a non-listed domain", () => {
  assert.equal(isBlockedDomain({ url: "https://www.indeed.com/viewjob?jk=1" }, BLOCK), false);
});
test("does NOT block a lookalike domain (notlensa.com)", () => {
  assert.equal(isBlockedDomain({ url: "https://notlensa.com/job/1" }, BLOCK), false);
});
test("handles missing url and empty blocklist", () => {
  assert.equal(isBlockedDomain({ url: "" }, BLOCK), false);
  assert.equal(isBlockedDomain({ url: "https://lensa.com/x" }, []), false);
});
test("falls back to substring match for unparseable urls", () => {
  assert.ok(isBlockedDomain({ url: "lensa.com/job/no-scheme" }, BLOCK));
});

// ── Excluded-role filter (target FDE/full-stack/front-end, drop DevOps) ────────
const EXCLUDED = ["devops", "site reliability", "sre", "platform engineer", "infrastructure engineer"];

test("drops a DevOps Engineer title", () => {
  assert.ok(isExcludedRole({ title: "Senior DevOps Engineer" }, EXCLUDED));
});
test("drops SRE and Site Reliability titles", () => {
  assert.ok(isExcludedRole({ title: "SRE II" }, EXCLUDED));
  assert.ok(isExcludedRole({ title: "Site Reliability Engineer" }, EXCLUDED));
});
test("drops Platform / Infrastructure Engineer titles", () => {
  assert.ok(isExcludedRole({ title: "Platform Engineer" }, EXCLUDED));
  assert.ok(isExcludedRole({ title: "Infrastructure Engineer" }, EXCLUDED));
});
test("KEEPS Forward Deployed / Full-Stack / Front-End titles", () => {
  assert.equal(isExcludedRole({ title: "Forward Deployed Engineer" }, EXCLUDED), false);
  assert.equal(isExcludedRole({ title: "Full Stack Developer" }, EXCLUDED), false);
  assert.equal(isExcludedRole({ title: "Front End Developer (React)" }, EXCLUDED), false);
});
test("does NOT drop a frontend job that merely mentions devops in the description", () => {
  assert.equal(isExcludedRole({ title: "React Engineer", description: "Work with the DevOps team on CI/CD." }, EXCLUDED), false);
});
test("empty excluded list keeps everything", () => {
  assert.equal(isExcludedRole({ title: "DevOps Engineer" }, []), false);
});
test("drops '-ing' role variants (Infrastructure/Platform Engineering)", () => {
  const ex = ["infrastructure engineering", "platform engineering"];
  assert.ok(isExcludedRole({ title: "Director, Core Infrastructure Engineering" }, ex));
  assert.ok(isExcludedRole({ title: "Platform Engineering Lead" }, ex));
});
