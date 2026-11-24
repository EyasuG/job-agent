// Clearance filtering. The candidate is targeting NON-clearance work only, so
// ANY form of clearance or government background investigation disqualifies
// a job: Secret and above, polygraph, DOE Q, Public Trust, suitability /
// background-investigation tiers, "ability to obtain a clearance", and even
// "may require a clearance depending on the contract".
// All matched case-insensitively against title + description.
const CLEARANCE_PATTERNS = [
  /\b(?:top[\s-]*secret|ts\s*\/\s*sci|sci[\s-]+eligib(?:le|ility))\b/i,
  /\b(?:interim|active|current|minimum)\s+secret\b/i,
  /\b(?:secret|top.secret|ts\/sci)\s+cleared\b/i,
  // Public Trust is a federal suitability determination — excluded too. It
  // needs a requirement context so marketing copy ("strengthen the public
  // trust") doesn't count.
  /\bpublic[\s-]+trust[\s-]+(?:clearance|position|background|investigation|eligib\w*|level|suitability|determination|required|check|security)\b/i,
  /\b(?:obtain|maintain|hold|possess|active|current|requires?|eligible\s+for|an?|moderate|high|low|tier\s*[1-5])[\s-]+(?:(?:moderate|high|low)[\s-]+(?:risk[\s-]+)?)?public[\s-]+trust\b/i,
  /\bsuitability\s+(?:determination|investigation|check|adjudication)\b/i,
  /\b(?:moderate|minimum|high[\s-]risk|tier\s*[1-5])\s+background\s+investigation\b/i,
  // Polygraph requirements. "polygraph" spelled out is always clearance-related;
  // the short "poly" is only matched with a clearance qualifier so it never
  // hits polymer/polyglot/polygon/etc.
  /\bpolygraph\b/i,
  /\bpoly(?:graph)?\s+(?:required|clearance|test|exam)\b/i,
  /\b(?:ci|fs|full[\s-]scope|lifestyle|counter[\s-]?intelligence)\s*[-]?\s*poly(?:graph)?\b/i,
  /\b(?:w\/|with|and)\s*poly(?:graph)?\b/i,
  /\/\s*poly\b/i,
  // The word "clearance" in any security sense. Non-security uses
  // ("customs clearance", "medical clearance") are excluded by lookbehind.
  /(?<!\b(?:customs|medical|height|ground|tax|credit|price|bridge|export)\s)\bclearances?\b(?!\s+(?:sale|rack|price|item)s?\b)/i,
];

// In titles, the bare word "cleared" almost always means a clearance
// requirement ("Cleared Angular Developer", "AWS Engineer - Cleared").
const TITLE_ONLY_PATTERNS = [/\bcleared\b/i];

/**
 * Returns true if the job mentions any form of security clearance, Public
 * Trust, or government background investigation.
 */
export function requiresClearance(job) {
  const title = job.title ?? "";
  const text = `${title} ${job.description ?? ""}`;
  if (TITLE_ONLY_PATTERNS.some((re) => re.test(title))) return true;
  return CLEARANCE_PATTERNS.some((re) => re.test(text));
}

// ── Region filtering ─────────────────────────────────────────────────────────

const STATE_NAMES = {
  AL: "alabama", AK: "alaska", AZ: "arizona", AR: "arkansas", CA: "california",
  CO: "colorado", CT: "connecticut", DE: "delaware", DC: "district of columbia",
  FL: "florida", GA: "georgia", HI: "hawaii", ID: "idaho", IL: "illinois",
  IN: "indiana", IA: "iowa", KS: "kansas", KY: "kentucky", LA: "louisiana",
  ME: "maine", MD: "maryland", MA: "massachusetts", MI: "michigan",
  MN: "minnesota", MS: "mississippi", MO: "missouri", MT: "montana",
  NE: "nebraska", NV: "nevada", NH: "new hampshire", NJ: "new jersey",
  NM: "new mexico", NY: "new york", NC: "north carolina", ND: "north dakota",
  OH: "ohio", OK: "oklahoma", OR: "oregon", PA: "pennsylvania",
  RI: "rhode island", SC: "south carolina", SD: "south dakota",
  TN: "tennessee", TX: "texas", UT: "utah", VT: "vermont", VA: "virginia",
  WA: "washington", WV: "west virginia", WI: "wisconsin", WY: "wyoming",
};

// Hub cities that postings often list without a state. Only unambiguous
// names (no "Arlington" — that's also Texas; no "Portland" — also Oregon).
const CITY_STATE = {
  "washington dc": "DC", "washington d.c": "DC", "d.c.": "DC",
  "new york city": "NY", nyc: "NY", manhattan: "NY", brooklyn: "NY",
  boston: "MA", cambridge: "MA", philadelphia: "PA", pittsburgh: "PA",
  baltimore: "MD", bethesda: "MD", rockville: "MD", "silver spring": "MD",
  reston: "VA", herndon: "VA", mclean: "VA", tysons: "VA", "alexandria": "VA",
  chantilly: "VA", fairfax: "VA", richmond: "VA",
  atlanta: "GA", miami: "FL", tampa: "FL", orlando: "FL", jacksonville: "FL",
  charlotte: "NC", raleigh: "NC", durham: "NC", "research triangle": "NC",
  "jersey city": "NJ", newark: "NJ", hoboken: "NJ", providence: "RI",
  hartford: "CT", stamford: "CT", wilmington: "DE",
};

/** Builds a location test for a list of state codes (names + hub cities included). */
function regionMatcher(states) {
  const codes = states.map((s) => s.toUpperCase());
  const names = codes
    .map((c) => STATE_NAMES[c])
    .filter(Boolean)
    // "virginia" must not match inside "west virginia" unless WV is listed
    .map((n) => (n === "virginia" && !codes.includes("WV") ? "(?<!west\\s)virginia" : n));
  const cities = Object.entries(CITY_STATE)
    .filter(([, st]) => codes.includes(st))
    .map(([city]) => city.replace(/\./g, "\\.?"));
  // ", VA" / "Reston VA 20190" / "VA, US" — the code as a standalone token.
  // Case-sensitive, so ordinary words ("me", "in", "or") never count.
  const code = new RegExp(
    `(?:^|[,(|·\\-/]\\s*|\\s)(?:${codes.join("|")})(?=\\s*(?:$|[,)|·\\-/]|\\d{5}|\\s+(?:US|USA|United States)\\b))`
  );
  const words = [...names, ...cities];
  const named = words.length ? new RegExp(`\\b(?:${words.join("|")})\\b`, "i") : null;
  return (text) => code.test(text) || (named ? named.test(text) : false);
}

const matcherCache = new Map();

/**
 * True when a location string falls inside the configured region (a list of
 * US state codes, e.g. the East Coast). An empty list means no region limit.
 * Remote roles with no in-region location are kept only when includeRemote.
 */
export function isInRegion(locationText = "", states = [], { includeRemote = false } = {}) {
  if (!states.length) return true;
  const key = states.join(",");
  if (!matcherCache.has(key)) matcherCache.set(key, regionMatcher(states));
  if (matcherCache.get(key)(locationText)) return true;
  // Remote roles count when wanted — unless they're limited to another country
  return (
    includeRemote &&
    /\b(?:remote|anywhere)\b/i.test(locationText) &&
    !NON_US_REMOTE.test(locationText)
  );
}

// Remote postings restricted to somewhere outside the US ("Remote - Canada")
const NON_US_REMOTE =
  /\b(?:canada|mexico|brazil|latam|latin america|europe|emea|uk|united kingdom|ireland|germany|france|spain|poland|netherlands|india|apac|asia|australia|philippines)\b/i;

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

/**
 * Why a job fails the current fetch filters, or null if it passes. Used by
 * `npm run prune` to clean already-stored jobs after the filters change.
 * Region is judged only when a location is known (older rows have none).
 */
export function filterReason(job, jobApi) {
  if (isBlockedDomain(job, jobApi.blockedDomains)) return "blocked-domain";
  if (job.location && !isInRegion(job.location, jobApi.regionStates, { includeRemote: jobApi.regionIncludeRemote }))
    return "out-of-region";
  if (isExcludedRole(job, jobApi.excludedRoles)) return "excluded-role";
  if (jobApi.excludeClearance && requiresClearance(job)) return "clearance";
  return null;
}
