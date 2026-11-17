// Clearance filtering. The candidate CAN pass a Public Trust background check
// (a suitability check, not a security clearance) but cannot hold Secret or
// above. So patterns are split in two:
//   - HARD: Secret and above, polygraph, DOE Q — always disqualify, even if
//     the posting also mentions Public Trust ("Public Trust or active Secret").
//   - GENERIC: ambiguous "clearance required"-style wording — disqualifies
//     only when the posting does NOT mention Public Trust (e.g. Guidehouse's
//     "Clearance Required: Ability to Obtain Public Trust" is kept).
// All matched case-insensitively against title + description.
const HARD_CLEARANCE_PATTERNS = [
  /\b(?:top[\s-]*secret|ts\s*\/\s*sci)\b/i,
  // "Secret clearance", "Secret security clearance", "Secret-level clearance".
  /\bsecret\b(?:[\s-]+(?:level|security))*[\s-]+clearance\b/i,
  /\bclearance\s*(?:level)?\s*[:\-–?]?\s*(?:active\s+)?(?:secret|top\s+secret|ts\b)/i,
  /\b(?:secret|top.secret|ts\/sci)\s+cleared\b/i,
  // Polygraph requirements. "polygraph" spelled out is always clearance-related;
  // the short "poly" is only matched with a clearance qualifier so it never
  // hits polymer/polyglot/polygon/etc.
  /\bpolygraph\b/i,
  /\bpoly(?:graph)?\s+(?:required|clearance|test|exam)\b/i,
  /\b(?:ci|fs|full[\s-]scope|lifestyle|counter[\s-]?intelligence)\s*[-]?\s*poly(?:graph)?\b/i,
  /\b(?:w\/|with|and)\s*poly(?:graph)?\b/i,
  /\b(?:doe\s+)?q[\s-]clearance\b/i,
];

const GENERIC_CLEARANCE_PATTERNS = [
  /\bsecurity\s+clearance\s+(?:is\s+)?required\b/i,
  /\brequires?\s+(?:an?\s+)?(?:active\s+)?(?:security\s+)?clearance\b/i,
  /\bmust\s+(?:have|hold|possess)\s+(?:an?\s+)?(?:active\s+)?(?:security\s+)?clearance\b/i,
  /\bclearance\s+required\b/i,
  /\bwith\s+(?:a\s+)?security\s+clearance\b/i,
  /\bactive\s+clearance\b/i,
  /\bclearance\s+eligib(?:le|ility)\b/i,
];

const PUBLIC_TRUST = /\bpublic[\s-]+trust\b/i;

// In titles, the bare word "cleared" almost always means a clearance
// requirement ("Cleared Angular Developer", "AWS Engineer - Cleared").
const TITLE_ONLY_PATTERNS = [/\bcleared\b/i];

/**
 * Returns true if the job requires a clearance the candidate can't hold
 * (Secret and above). Public Trust-only postings return false.
 */
export function requiresClearance(job) {
  const title = job.title ?? "";
  const text = `${title} ${job.description ?? ""}`;
  if (TITLE_ONLY_PATTERNS.some((re) => re.test(title))) return true;
  if (HARD_CLEARANCE_PATTERNS.some((re) => re.test(text))) return true;
  if (GENERIC_CLEARANCE_PATTERNS.some((re) => re.test(text))) return !PUBLIC_TRUST.test(text);
  return false;
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
