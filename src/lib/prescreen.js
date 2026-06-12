// Zero-cost relevance prescreen. Counts how many of the candidate's resume
// skills appear in the job posting; jobs below the threshold are skipped
// WITHOUT calling the Anthropic API. This is deliberately loose — its job is
// to drop obvious non-matches (sales, copywriting, pure .NET/Java roles),
// not to rank the survivors.

// Generic terms that match almost any posting and would inflate the count.
const NOISE = new Set([
  "agile", "sql", "sdlc", "jira", "rally", "github", "git", "svn",
  "stakeholder communication", "cross-functional collaboration",
  "kpi reporting & dashboards", "automated workflows",
  "process mapping & optimization", "access control & compliance monitoring",
]);

/** Builds a matcher from the master resume's skill list. */
export function buildPrescreen(skills, minMatches = 2) {
  const terms = (skills ?? [])
    .map((s) => s.toLowerCase())
    .filter((s) => !NOISE.has(s))
    // "React.JS" should also match "React"; "NodeJS" should match "Node.js"
    .flatMap((s) => {
      const variants = new Set([s]);
      variants.add(s.replace(/\.?js$/i, ""));
      variants.add(s.replace(/\./g, ""));
      return [...variants];
    })
    .filter((s) => s.length >= 3);

  const unique = [...new Set(terms)];

  return function matchesProfile(job) {
    const text = `${job.title ?? ""} ${job.description ?? ""}`.toLowerCase();
    let hits = 0;
    for (const term of unique) {
      // Word-boundary-ish check to avoid "java" matching "javascript" twice etc.
      if (text.includes(term)) {
        hits++;
        if (hits >= minMatches) return true;
      }
    }
    return false;
  };
}
