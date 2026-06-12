/**
 * Tests for the zero-cost relevance prescreen (src/lib/prescreen.js).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPrescreen } from "../src/lib/prescreen.js";

const SKILLS = ["JavaScript", "React.JS", "NodeJS", "Express", "MongoDB", "Terraform", "AWS Lambda"];

test("passes a job mentioning multiple resume skills", () => {
  const matches = buildPrescreen(SKILLS);
  assert.ok(matches({ title: "Full Stack Developer", description: "We use React and Node.js with MongoDB." }));
});

test("drops a job with no skill overlap", () => {
  const matches = buildPrescreen(SKILLS);
  assert.equal(matches({ title: "Copywriter", description: "Write marketing copy and blog posts." }), false);
});

test("drops a job with only one skill hit when threshold is 2", () => {
  const matches = buildPrescreen(SKILLS, 2);
  assert.equal(matches({ title: "Data Analyst", description: "SQL dashboards; some JavaScript a plus." }), false);
});

test("respects a custom threshold of 1", () => {
  const matches = buildPrescreen(SKILLS, 1);
  assert.ok(matches({ title: "Engineer", description: "Some JavaScript needed." }));
});

test("matches skill variants — React.JS hits 'React', NodeJS hits 'Node'", () => {
  const matches = buildPrescreen(["React.JS", "NodeJS"], 2);
  assert.ok(matches({ title: "Frontend", description: "React and Node experience required." }));
});

test("title keywords count toward the threshold", () => {
  const matches = buildPrescreen(SKILLS, 2);
  assert.ok(matches({ title: "React / NodeJS Engineer", description: "" }));
});

test("handles empty skills list without throwing", () => {
  const matches = buildPrescreen([], 2);
  assert.equal(matches({ title: "Anything", description: "Anything" }), false);
});
