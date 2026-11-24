/**
 * Tests for the clearance filter (src/lib/filters.js).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { requiresClearance, isBlockedDomain, isExcludedRole, isNationwide, isInRegion, filterReason } from "../src/lib/filters.js";

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

// Clearance in ANY form disqualifies — including Public Trust and
// "may require a clearance" hedges.
test("flags 'Clearance Required: Ability to Obtain Public Trust'", () => {
  assert.ok(requiresClearance({ title: "Copilot Studio Solution Engineer", description: "Clearance Required: Ability to Obtain Public Trust" }));
});

test("flags 'Public Trust clearance required'", () => {
  assert.ok(requiresClearance({ title: "Front End Engineer", description: "A Public Trust clearance required for this VA contract." }));
});

test("flags bare 'Public Trust' with no word 'clearance'", () => {
  assert.ok(requiresClearance({ title: "Engineer II", description: "Candidates must be able to obtain a Public Trust." }));
});

test("does NOT flag 'the public trust' in marketing copy", () => {
  assert.equal(
    requiresClearance({ title: "Sr Software Engineer - Full Stack", description: "Helping governments operate efficiently and strengthen the public trust." }),
    false
  );
});

test("flags 'Moderate Risk Public Trust' and 'Public Trust position'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Requires a Moderate Risk Public Trust." }));
  assert.ok(requiresClearance({ title: "Dev", description: "This is a Public Trust position." }));
});

test("flags 'may require a background check or clearance depending on the contract'", () => {
  assert.ok(requiresClearance({ title: "Software Engineer", description: "This role may require a background check or clearance depending on the contract." }));
});

test("flags 'ability to obtain a security clearance'", () => {
  assert.ok(requiresClearance({ title: "Full Stack Developer", description: "U.S. citizen with the ability to obtain a security clearance." }));
});

test("flags 'clearance eligible' and 'Interim Secret'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Must be clearance eligible." }));
  assert.ok(requiresClearance({ title: "Dev", description: "Interim Secret acceptable to start." }));
});

test("flags background-investigation tiers and suitability checks", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Must pass a Tier 2 background investigation." }));
  assert.ok(requiresClearance({ title: "Dev", description: "Subject to a CBP suitability determination." }));
});

test("does NOT flag a plain background check or 'secrets management'", () => {
  assert.equal(
    requiresClearance({ title: "Backend Engineer", description: "Offer contingent on a background check. Experience with secrets management (Vault)." }),
    false
  );
});

test("does NOT flag 'medical clearance' or 'clearance sale'", () => {
  assert.equal(
    requiresClearance({ title: "Frontend Dev", description: "Built the clearance sale page; integrated medical clearance forms." }),
    false
  );
});

test("flags 'minimum Secret security clearance'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Ability to obtain a minimum Secret security clearance." }));
});

test("flags 'Secret-level clearance'", () => {
  assert.ok(requiresClearance({ title: "Senior SWE", description: "Must hold an active Secret-level clearance." }));
});

test("flags 'Public Trust or active Secret'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Public Trust or an active Secret clearance." }));
});

test("flags generic 'security clearance required' with no Public Trust context", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Security clearance required." }));
});

test("flags 'Clearance: Secret'", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Clearance: Secret" }));
});

test("flags DOE Q clearance", () => {
  assert.ok(requiresClearance({ title: "Dev", description: "Active DOE Q clearance required." }));
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

// ── Nationwide location sentinel ─────────────────────────────────────────────
test("treats United States / USA / nationwide / remote / anywhere as nationwide", () => {
  for (const v of ["United States", "united states", "USA", "U.S.A.", "us", "nationwide", "Remote", "anywhere", "  USA  "]) {
    assert.ok(isNationwide(v), `expected nationwide: ${v}`);
  }
});
test("treats a specific city/region as NOT nationwide", () => {
  for (const v of ["Washington, DC", "New York", "Austin, TX", ""]) {
    assert.equal(isNationwide(v), false, `expected not nationwide: ${v}`);
  }
});

// ── Region (East Coast + DMV) ────────────────────────────────────────────────

const EAST = "DC,MD,VA,DE,PA,NJ,NY,CT,RI,MA,VT,NH,ME,NC,SC,GA,FL".split(",");

test("isInRegion: keeps DMV and East Coast locations", () => {
  for (const loc of [
    "Washington, DC", "Arlington, VA", "Reston, VA 20190", "Bethesda, MD",
    "Fairfax County, Virginia", "New York, NY", "Hybrid - New York", "Boston",
    "Atlanta, GA, US", "Remote · New York, NY", "Raleigh, North Carolina",
  ]) assert.ok(isInRegion(loc, EAST), loc);
});

test("isInRegion: drops West/Central, West Virginia, abroad, and bare Washington", () => {
  for (const loc of [
    "Seattle, WA", "San Francisco, CA", "Austin, TX | Remote", "Arlington, TX",
    "Charleston, West Virginia", "Washington", "Dublin, Ireland", "",
  ]) assert.equal(isInRegion(loc, EAST), false, loc);
});

test("isInRegion: lowercase words are not mistaken for state codes", () => {
  assert.equal(isInRegion("work from home, me included", ["ME"]), false);
});

test("isInRegion: unanchored remote is dropped unless includeRemote", () => {
  assert.equal(isInRegion("Remote - US", EAST), false);
  assert.ok(isInRegion("Remote - US", EAST, { includeRemote: true }));
  assert.ok(isInRegion("Remote", EAST, { includeRemote: true }));
  assert.ok(isInRegion("Austin, TX | Remote", EAST, { includeRemote: true }));
});

test("isInRegion: remote limited to another country is still dropped", () => {
  assert.equal(isInRegion("Remote - Canada", EAST, { includeRemote: true }), false);
  assert.equal(isInRegion("Remote (Europe)", EAST, { includeRemote: true }), false);
});

test("isInRegion: empty state list means no region limit", () => {
  assert.ok(isInRegion("Seattle, WA", []));
});

// ── filterReason (used by npm run prune) ─────────────────────────────────────

const API = {
  blockedDomains: ["lensa.com"], regionStates: EAST, regionIncludeRemote: false,
  excludedRoles: ["devops"], excludeClearance: true,
};

test("filterReason: passes an in-region, clean job", () => {
  assert.equal(filterReason({ title: "Frontend Engineer", location: "Arlington, VA", url: "https://x.com" }, API), null);
});

test("filterReason: names the failing filter", () => {
  assert.equal(filterReason({ title: "Dev", location: "Austin, TX" }, API), "out-of-region");
  assert.equal(filterReason({ title: "DevOps Engineer", location: "Washington, DC" }, API), "excluded-role");
  assert.equal(filterReason({ title: "Dev", location: "Washington, DC", description: "Public Trust required." }, API), "clearance");
  assert.equal(filterReason({ title: "Dev", url: "https://www.lensa.com/j/1" }, API), "blocked-domain");
});

test("filterReason: keeps US remote when remote is included", () => {
  assert.equal(filterReason({ title: "Frontend Engineer", location: "Remote" }, { ...API, regionIncludeRemote: true }), null);
  assert.equal(filterReason({ title: "Frontend Engineer", location: "Remote" }, API), "out-of-region");
});

test("filterReason: unknown location (older rows) is not judged on region", () => {
  assert.equal(filterReason({ title: "Frontend Engineer", location: null }, API), null);
});
