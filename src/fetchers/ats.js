import pLimit from "p-limit";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";
import { isNationwide, isInRegion } from "../lib/filters.js";

// Pulls jobs straight from employers' applicant-tracking systems (ATS).
// Greenhouse, Lever, Ashby and SmartRecruiters each publish a free, unauthenticated JSON feed
// of a company's open roles — the same data that powers the company's own
// careers page. Compared with aggregators this gives us:
//   - full job descriptions (better tailoring than truncated snippets)
//   - direct apply links on the employer's own board (no redirect middlemen)
//   - only live postings (closed roles drop out of the feed)
//
// Feeds are per company, so the target list comes from ATS_BOARDS
// ("provider:slug,provider:slug"). Each board's roles are then filtered
// locally by JOB_QUERIES, US location, and the JOB_DATE_POSTED window.

const PROVIDERS = {
  greenhouse: {
    url: (slug) => `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`,
    list: (data) => data.jobs ?? [],
    normalize: normalizeGreenhouse,
  },
  lever: {
    url: (slug) => `https://api.lever.co/v0/postings/${slug}?mode=json`,
    list: (data) => (Array.isArray(data) ? data : []),
    normalize: normalizeLever,
  },
  ashby: {
    url: (slug) => `https://api.ashbyhq.com/posting-api/job-board/${slug}`,
    list: (data) => data.jobs ?? [],
    normalize: normalizeAshby,
  },
  // SmartRecruiters' list endpoint has no descriptions and boards can hold
  // thousands of global roles, so it gets a custom fetch: page through US
  // postings, keep titles matching JOB_QUERIES, then fetch details for those.
  smartrecruiters: {
    fetchBoard: fetchSmartRecruitersBoard,
  },
};

const SR_API = "https://api.smartrecruiters.com/v1/companies";
const SR_PAGE_SIZE = 100;
const SR_MAX_PAGES = 10; // caps a huge board (e.g. 5k-role enterprises) at 1,000 roles

// Boards are fetched a few at a time; some feeds are several MB.
const limit = pLimit(5);

/** Fetches every configured ATS board and returns normalized, filtered jobs. */
export async function fetchJobs() {
  const { atsBoards, queries, location, datePosted, regionStates, regionIncludeRemote } =
    config.jobApi;

  if (!atsBoards.length) {
    logger.warn("ATS_BOARDS is empty — skipping employer ATS feeds.");
    return [];
  }

  const since = postedSince(datePosted);
  const results = await Promise.allSettled(
    atsBoards.map((board) => limit(() => fetchBoard(board)))
  );

  // Every board failing means the network is down/filtered, not that no one
  // is hiring — report it so the scan counts as failed and is retried soon.
  if (results.every((r) => r.status === "rejected")) {
    throw new Error(`all ${atsBoards.length} ATS boards failed (${results[0].reason?.message})`);
  }

  const jobs = [];
  results.forEach((result, i) => {
    // One bad slug (renamed company, moved ATS) shouldn't sink the others
    if (result.status === "rejected") {
      logger.warn(`ATS board ${atsBoards[i].provider}:${atsBoards[i].slug} failed: ${result.reason?.message}`);
      return;
    }
    for (const job of result.value) {
      if (!matchesQueries(job.title, queries)) continue;
      if (!matchesLocation(job, regionStates.length ? "United States" : location)) continue;
      if (since && job.postedAt && job.postedAt < since) continue;
      if (regionStates.length) {
        const opts = { includeRemote: regionIncludeRemote };
        // Multi-office postings: check every listed office, and surface the
        // full list when the primary office is outside the region so the
        // aggregator's region filter (which reads `location`) keeps it too.
        if (!isInRegion(job.locationText ?? job.location, regionStates, opts)) continue;
        if (!isInRegion(job.location, regionStates, opts)) job.location = job.locationText;
      }
      jobs.push(stripInternal(job));
    }
  });

  logger.info(`ATS feeds: ${jobs.length} matching jobs across ${atsBoards.length} boards.`);
  return jobs;
}

async function fetchBoard({ provider, slug }) {
  const p = PROVIDERS[provider];
  if (!p) throw new Error(`unknown ATS provider "${provider}"`);
  if (p.fetchBoard) return p.fetchBoard(slug);

  const res = await fetch(p.url(slug));
  if (!res.ok) throw new Error(`request failed (${res.status})`);

  const data = await res.json();
  return p.list(data).map((j) => p.normalize(j, slug));
}

/**
 * SmartRecruiters: list US postings page by page, pre-filter by title so we
 * only fetch details (one request each) for roles we might actually keep.
 */
async function fetchSmartRecruitersBoard(slug) {
  const { queries } = config.jobApi;
  const base = `${SR_API}/${encodeURIComponent(slug)}/postings`;

  const summaries = [];
  for (let page = 0; page < SR_MAX_PAGES; page++) {
    const res = await fetch(`${base}?country=us&limit=${SR_PAGE_SIZE}&offset=${page * SR_PAGE_SIZE}`);
    if (!res.ok) throw new Error(`request failed (${res.status})`);
    const data = await res.json();
    const content = data.content ?? [];
    summaries.push(...content);
    if (content.length < SR_PAGE_SIZE || summaries.length >= (data.totalFound ?? 0)) break;
  }
  // An unknown slug returns 200 with zero results rather than a 404
  if (!summaries.length) logger.warn(`ATS board smartrecruiters:${slug} returned no US postings.`);

  const wanted = summaries.filter((s) => matchesQueries(s.name, queries));
  const detailLimit = pLimit(5);
  const details = await Promise.allSettled(
    wanted.map((s) =>
      detailLimit(async () => {
        const res = await fetch(`${base}/${s.id}`);
        if (!res.ok) throw new Error(`detail ${s.id} failed (${res.status})`);
        return res.json();
      })
    )
  );
  // Fall back to the summary (no description) if a detail request fails
  return details.map((d, i) => normalizeSmartRecruiters(d.status === "fulfilled" ? d.value : wanted[i], slug));
}

// ── Normalizers ──────────────────────────────────────────────────────────────
// Each returns the standard job shape plus two internal fields used only for
// filtering: `postedAt` (Date) and `usHint` (true/false/undefined when the
// provider gives a structured country signal). Both are stripped before return.

export function normalizeGreenhouse(j, slug) {
  const offices = (j.offices ?? []).map((o) => o.location || o.name).filter(Boolean);
  return {
    id: `greenhouse:${slug}:${j.id}`,
    title: j.title ?? "",
    company: j.company_name || prettifySlug(slug),
    location: j.location?.name ?? "",
    url: j.absolute_url ?? "",
    // Greenhouse double-encodes: the HTML itself is entity-escaped
    description: htmlToText(decodeEntities(j.content ?? "")),
    postedAt: parseDate(j.first_published ?? j.updated_at),
    locationText: [j.location?.name, ...offices].filter(Boolean).join(" | "),
  };
}

export function normalizeLever(j, slug) {
  // Lever splits the posting into an intro, bulleted lists, and a closing
  const lists = (j.lists ?? [])
    .map((l) => `${l.text}: ${htmlToText(l.content ?? "")}`)
    .join("\n");
  const locations = j.categories?.allLocations ?? [j.categories?.location];
  return {
    id: `lever:${slug}:${j.id}`,
    title: j.text ?? "",
    company: prettifySlug(slug),
    location: [j.categories?.location, j.workplaceType].filter(Boolean).join(" · "),
    url: j.hostedUrl ?? "",
    description: [j.descriptionPlain, lists, j.additionalPlain].filter(Boolean).join("\n").trim(),
    postedAt: parseDate(j.createdAt),
    usHint: j.country ? j.country.toUpperCase() === "US" : undefined,
    locationText: locations.filter(Boolean).join(" | "),
  };
}

export function normalizeAshby(j, slug) {
  const country = j.address?.postalAddress?.addressCountry ?? "";
  const secondary = (j.secondaryLocations ?? []).map((l) => l.location).filter(Boolean);
  return {
    id: `ashby:${slug}:${j.id}`,
    title: j.title ?? "",
    company: prettifySlug(slug),
    location: [j.location, j.isRemote ? "Remote" : ""].filter(Boolean).join(" · "),
    url: j.jobUrl ?? "",
    description: (j.descriptionPlain ?? htmlToText(j.descriptionHtml ?? "")).trim(),
    postedAt: parseDate(j.publishedAt),
    usHint: country ? US_TEXT.test(country) : undefined,
    locationText: [j.location, country, ...secondary].filter(Boolean).join(" | "),
  };
}

export function normalizeSmartRecruiters(j, slug) {
  const loc = j.location ?? {};
  const place = [loc.city, loc.region].filter(Boolean).join(", ");
  const workplace = loc.remote ? "Remote" : loc.hybrid ? "Hybrid" : "";
  const sections = j.jobAd?.sections ?? {};
  const description = ["jobDescription", "qualifications", "additionalInformation"]
    .map((k) => sections[k]?.text)
    .filter(Boolean)
    .map(htmlToText)
    .join("\n");
  return {
    id: `smartrecruiters:${slug}:${j.id}`,
    title: j.name ?? "",
    company: j.company?.name || prettifySlug(slug),
    location: [place, workplace].filter(Boolean).join(" · "),
    url: j.postingUrl || `https://jobs.smartrecruiters.com/${slug}/${j.id}`,
    description,
    postedAt: parseDate(j.releasedDate),
    usHint: loc.country ? loc.country.toLowerCase() === "us" : undefined,
    locationText: [loc.fullLocation, place, workplace].filter(Boolean).join(" | "),
  };
}

function stripInternal({ postedAt, usHint, locationText, ...job }) {
  return job;
}

// ── Filters ──────────────────────────────────────────────────────────────────

// Generic words that don't distinguish one role family from another. A query
// like "full stack developer" is reduced to its core ("full stack") so it
// also matches "Senior Fullstack Engineer" or "Full-Stack Software Engineer".
const GENERIC = new Set(["developer", "engineer", "engineering", "software", "dev", "swe"]);

/** Canonical lowercase form: joins "fullstack"/"full-stack" etc. into spaced words. */
function canonical(text) {
  return ` ${String(text)
    .toLowerCase()
    .replace(/full[\s-]?stack/g, "full stack")
    .replace(/front[\s-]?end/g, "front end")
    .replace(/back[\s-]?end/g, "back end")
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim()} `;
}

/**
 * True when the title contains every core word of at least one query — and,
 * if that query named an engineering role, some engineering word too (so
 * "forward deployed engineer" skips "Forward Deployed Strategist").
 */
export function matchesQueries(title, queries = []) {
  if (!queries.length) return true;
  const t = canonical(title);
  const has = (w) => t.includes(` ${w} `);
  return queries.some((q) => {
    const words = canonical(q).trim().split(" ").filter(Boolean);
    const core = words.filter((w) => !GENERIC.has(w));
    if (!core.length) return words.every(has);
    const needsRole = core.length < words.length;
    return core.every(has) && (!needsRole || [...GENERIC].some(has));
  });
}

const US_STATES =
  "AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
const US_TEXT = new RegExp(
  [
    "\\bunited states\\b",
    "\\bu\\.?s\\.?a?\\b",
    "\\bamericas\\b",
    "\\bnorth america\\b",
    `,\\s*(?:${US_STATES})\\b`,
    // Major tech hubs often listed without a state
    "\\b(?:san francisco|new york|nyc|seattle|austin|boston|chicago|los angeles|denver|atlanta|washington,? d\\.?c)\\b",
  ].join("|"),
  "i"
);
// Location-free remote postings ("Remote", "Anywhere") are kept for review
const UNRESTRICTED = /^\s*(?:remote|anywhere|worldwide|global)\s*$/i;

/**
 * True when a job fits the configured JOB_LOCATION. Nationwide searches keep
 * anything in the US (onsite, hybrid, remote); a named place keeps jobs whose
 * location mentions it, plus US-eligible remote roles.
 */
export function matchesLocation(job, location = "United States") {
  const text = job.locationText ?? job.location ?? "";
  // A structured non-US country beats a bare "Remote" label
  const isUs =
    job.usHint === true ||
    US_TEXT.test(text) ||
    (job.usHint !== false && UNRESTRICTED.test(text));
  if (isNationwide(location)) return isUs;
  const place = location.toLowerCase();
  return text.toLowerCase().includes(place) || (isUs && /remote/i.test(text));
}

const WINDOW_DAYS = { today: 1, "3days": 3, week: 7, month: 30 };

/** Earliest posting date to keep for a JOB_DATE_POSTED value; null = no limit. */
export function postedSince(datePosted, now = Date.now()) {
  const days = WINDOW_DAYS[datePosted];
  return days ? new Date(now - days * 24 * 60 * 60 * 1000) : null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseDate(value) {
  if (value == null) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function prettifySlug(slug) {
  return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", "#39": "'", nbsp: " " };

export function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, e) => ENTITIES[e]);
}

/** Strips tags (keeping block breaks as newlines) and collapses whitespace. */
export function htmlToText(html) {
  return decodeEntities(
    html
      .replace(/<(?:br|\/p|\/div|\/li|\/h\d)[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}
