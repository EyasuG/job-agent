/**
 * Tests for the clearance filter (src/lib/filters.js).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { requiresClearance } from "../src/lib/filters.js";

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
