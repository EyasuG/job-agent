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

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Returns true if the job TITLE contains any excluded role keyword — used to
 * drop role families the candidate isn't targeting (e.g. DevOps/SRE) while
 * keeping Forward Deployed / Full-Stack / Front-End roles. Matched on the title
 * only (with word boundaries) so a frontend job that merely mentions
 * "collaborate with the DevOps team" in its description is not dropped.
 */
export function isExcludedRole(job, keywords = []) {
  if (!keywords.length) return false;
  const title = job.title ?? "";
  return keywords.some((k) => new RegExp(`\\b${escapeRegex(k)}\\b`, "i").test(title));
}

// Sentinel location values that mean "search the whole US, not a specific
// city/region". Used to widen the net to nationwide (hybrid + remote + onsite).
const NATIONWIDE = /^\s*(?:united\s+states|u\.?s\.?a?\.?|nationwide|anywhere|remote)\s*$/i;

/** True when the configured location means nationwide rather than a specific place. */
export function isNationwide(location = "") {
  return NATIONWIDE.test(location);
}

/**
 * Returns true if the job's apply URL is hosted on (or under) any domain in
 * the blocklist — used to prune low-trust aggregators like lensa.com. Matches
 * the exact domain and any subdomain (jobs.lensa.com), and is defensive
 * against unparseable URLs (falls back to a substring check).
 */
export function isBlockedDomain(job, blockedDomains = []) {
  if (!blockedDomains.length || !job.url) return false;
  let host;
  try {
    host = new URL(job.url).hostname.toLowerCase();
  } catch {
    const url = String(job.url).toLowerCase();
    return blockedDomains.some((d) => url.includes(d));
  }
  return blockedDomains.some((d) => host === d || host.endsWith(`.${d}`));
}
