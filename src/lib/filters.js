// Patterns that indicate a job requires an active security clearance.
// Matched case-insensitively against title + description.
const CLEARANCE_PATTERNS = [
  /\b(?:active\s+)?(?:top\s+secret|ts\/sci|ts\s*\/\s*sci)\b/i,
  /\bsecret\s+clearance\b/i,
  /\bsecurity\s+clearance\s+(?:is\s+)?required\b/i,
  /\brequires?\s+(?:an?\s+)?(?:active\s+)?(?:security\s+)?clearance\b/i,
  /\bmust\s+(?:have|hold|possess)\s+(?:an?\s+)?(?:active\s+)?(?:security\s+)?clearance\b/i,
  /\bclearance\s*[:?]?\s*(?:active\s+)?(?:secret|top\s+secret|ts\/sci)\b/i,
  // Polygraph requirements (candidate does not qualify). "polygraph" spelled
  // out is always clearance-related; the short "poly" is only matched with a
  // clearance qualifier so it never hits polymer/polyglot/polygon/etc.
  /\bpolygraph\b/i,
  /\bpoly(?:graph)?\s+(?:required|clearance|test|exam)\b/i,
  /\b(?:ci|fs|full[\s-]scope|lifestyle|counter[\s-]?intelligence)\s*[-]?\s*poly(?:graph)?\b/i,
  /\b(?:w\/|with|and)\s*poly(?:graph)?\b/i,
  /\bts\/sci\s*\/\s*poly\b/i,
  /\bpublic\s+trust\s+clearance\s+required\b/i,
  /\b(?:secret|top.secret|ts\/sci)\s+cleared\b/i,
  /\bclearance\s+required\b/i,
  /\bwith\s+(?:a\s+)?security\s+clearance\b/i,
  /\bactive\s+clearance\b/i,
  /\bclearance\s+eligib(?:le|ility)\b/i,
];

// In titles, the bare word "cleared" almost always means a clearance
// requirement ("Cleared Angular Developer", "AWS Engineer - Cleared").
const TITLE_ONLY_PATTERNS = [/\bcleared\b/i];

/** Returns true if the job title or description indicates a clearance requirement. */
export function requiresClearance(job) {
  const title = job.title ?? "";
  const text = `${title} ${job.description ?? ""}`;
  return (
    CLEARANCE_PATTERNS.some((re) => re.test(text)) ||
    TITLE_ONLY_PATTERNS.some((re) => re.test(title))
  );
}
