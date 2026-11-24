# Job-Agent — Continuation Handoff

> Drop this file into the job-agent project so the next Claude session (or you) can pick up
> exactly where things stand. It captures the architecture, current state, open threads, and
> the hard-won gotchas that aren't obvious from the code.

---

## What this project is

A Node.js (v22+, ES modules) **AI job-search agent** for a MERN / full-stack developer
targeting **Forward Deployed Engineer / Full-Stack / Front-End** roles — **DMV + East Coast,
plus US remote**, **non-clearance in any form (Public Trust excluded too)**, **DevOps excluded**.

Each run: fetch jobs from multiple sources → dedup → filter → prescreen against the resume →
tailor a resume (and, on demand, a cover letter) with a **free LLM provider chain** → deliver
to a **Telegram bot** with inline buttons. Runs every 12 hours (`SCAN_INTERVAL_HOURS`), with the
last scan time persisted so restarts don't trigger extra scans. There's also an Express web dashboard.

**Standing rules (do not break):**
- **No resume fabrication** — tailoring uses ONLY facts in `resume/master.json`.
- **No LinkedIn scraping.**
- **No auto-applying** — the agent surfaces and drafts; the human reviews and submits.
- **Cover letters must NOT mention** citizenship, nationality, immigration, visa, residency,
  or clearance-eligibility (enforced by a prompt rule + a scrub safety net in
  `src/tailor/coverletter.js`).
- **Secrets live in `.env`** (gitignored). Never commit `.env`, `data/`, or `output/`.

---

## Tech stack

| Area | Choice |
|---|---|
| Runtime | Node.js 22+, ES modules, native `fetch`/`FormData`/`Blob`, `node:sqlite`, `node:test` |
| Telegram | `telegraf` v4 — **but documents upload via native fetch**, not Telegraf (see gotchas) |
| Resume render | `docx` library → `.docx` attachments |
| Web dashboard | Express 5 (note wildcard route syntax `/{*splat}`), Pico CSS |
| LLM | OpenAI-compatible providers (Groq, Gemini, Ollama, OpenRouter) + Anthropic SDK, with a fallback chain |
| Scheduling | `node-cron` + `RUN_ON_START` catch-up; deployed via macOS `launchd` |
| Concurrency | `p-limit` (tailor 3 jobs at a time) |

---

## Repo layout (key files)

```
src/
  config.js            Central config, all env parsing (ATS_BOARDS, queries, filters, llm, paths)
  pipeline.js          runOnce(): fetch → prescreen → tailor → render → notify → persist
  scheduler.js         cron + RUN_ON_START catch-up (~15s after boot)
  fetchers/
    index.js           fetchAllJobs(): aggregates all sources, dedups, applies filters
    jsearch.js         RapidAPI JSearch (multi-query)
    adzuna.js          Adzuna (uses isNationwide() to decide whether to pass `where`)
    remotive.js        Remotive — isUsEligible() keeps US/Worldwide/Americas, drops EU/Brazil-only
    serpapi.js         Google Jobs — budget-paced (monthly cap + min interval), tracks data/serpapi-usage.json
    ats.js             *** Greenhouse + Lever + Ashby + SmartRecruiters direct-from-ATS fetcher ***
  lib/
    filters.js         requiresClearance(), isInRegion(), isBlockedDomain(), isExcludedRole(), isNationwide()
    token.js           jobToken(id) = sha256 hex sliced to 16 chars (Telegram callback_data 64-byte limit)
    logger.js
  prune.js             npm run prune: remove stored jobs failing current filters (dry run unless --apply)
  store/db.js          SQLite (stores location since 2026-11-24): isNew, markSeen, deleteJob, updateJobDetails/Status, getJob(ByToken), getTopJobs, counts
  tailor/
    llm.js             Provider abstraction + fallback chain + per-provider rate gate
    tailor.js          tailorResume(job) — per-role, facts-only, targets 90-97% keyword coverage
    render.js          renderResume() — per-role bullets keyed by company, per-role Tech line
    applykit.js        generateApplyKit() / renderApplyKit() — pre-filled ATS answer sheet
    coverletter.js     generateCoverLetter() / renderCoverLetter() — one-page, facts-only, scrubbed
  bot/bot.js           Telegram bot: notifications, ⭐ TOP MATCH alerts, Cover Letter / Apply Kit buttons
resume/master.json     The real resume (single source of truth for tailoring)
test/                  node:test suites (filters, normalize, dedup, prescreen, fetchers)
deploy/                launchd installer + DEPLOYMENT.md
.claude/launch.json    wires `npx serve` preview to the in-app browser
```

---

## Current state (as of this handoff)

- **ATS-direct fetching is already built** on branch **`feat/ats-job-feeds`**:
  `src/fetchers/ats.js` is a complete fetcher for **Greenhouse, Lever, and Ashby**, driven by
  the `ATS_BOARDS` env var (`provider:slug` pairs). Config parsing lives in
  `src/config.js` (`jobApi.atsBoards`, with a `DEFAULT_ATS_BOARDS` fallback).
- **`.env` already has a curated `ATS_BOARDS` list** (civic-tech + product companies:
  oddball, bellese, excella, navapbc, skylighthq, codeforamerica, govdash, opengov, civicplus,
  accenturefederalservices, appian, idme, alarmcom, aledade, mapbox, temporal, netlify, dscout,
  writer, langchain, sanity, hex, linear, supabase, vercel, ramp, stripe, anthropic, cohere).
- **LLM chain is free-tier**: `LLM_PROVIDER=groq` → fallbacks `gemini,ollama`. No paid provider
  in the chain, so runs and cover letters incur no API charges. (Groq model
  `openai/gpt-oss-120b`, Gemini `gemini-2.5-flash` with `reasoning_effort:"none"`, Ollama
  `llama3.2:3b`.)
- **Region**: `JOB_REGION_STATES` (DC,MD,VA,DE,PA,NJ,NY,CT,RI,MA,VT,NH,ME,NC,SC,GA,FL) filters
  every source; `REGION_INCLUDE_REMOTE=true` keeps US remote roles (not ones limited to another country) and
  adds remote-only JSearch queries; search sources are
  anchored on `JOB_LOCATION="Washington, DC"`.
- **Filters**: clearance in any form (Secret+, polygraph, Public Trust, suitability /
  background-investigation tiers, "may require a clearance"), blocked domains
  (lensa.com, jobleads.com, recruit.net), excluded roles (devops/sre/platform/infra).
- **Schedule**: every 12 hours via `SCAN_INTERVAL_HOURS=12` (true interval; last scan time in
  `data/last-scan.json`, so restarts/sleep don't add or skip scans). `CRON_SCHEDULE` is the
  fallback when it's unset.

### Verified (2026-11-23)
`ats.js` is wired into `fetchAllJobs()`; 91 tests pass. `feat/ats-job-feeds` is **not yet
merged** into `jobReady` (the main branch — there is no `main`).

### Public ATS endpoints (free, keyless) used by `ats.js`
- Greenhouse: `https://boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true`
- Lever: `https://api.lever.co/v0/postings/{slug}?mode=json`
- Ashby: `https://api.ashbyhq.com/posting-api/job-board/{slug}?includeCompensation=true`
- SmartRecruiters: `https://api.smartrecruiters.com/v1/companies/{slug}/postings?country=us` (list has no
  descriptions → title pre-filter, then one detail request per kept role; slug is case-sensitive;
  unknown slug returns 200 with 0 results, logged as a warning; capped at 1,000 roles/board)

Every fetcher returns the normalized shape `{ id, title, company, location, url, description }`
so dedup, all filters, and tailoring apply unchanged. For ATS feeds `url` is the direct
company apply page — first-source, no aggregator.

---

## Open threads / possible next steps

1. **Merge `feat/ats-job-feeds` → `jobReady`** (open a PR) and delete the branch.
2. ~~SmartRecruiters~~ — done. ~~ATS location filtering~~ — done (`matchesLocation`, structured
   country beats a bare "Remote"). ~~ATS keyword relevance~~ — done (`matchesQueries` on titles).
3. **Tighten `matchesQueries`** — "engineering" counts as the role word, so non-engineer titles
   like "Technical Program Manager, Forward Deployed Engineering" still pass the FDE query.

---

## Gotchas (these cost real time — don't rediscover them)

- **Telegram document upload**: Telegraf's bundled legacy node-fetch throws
  `ECONNRESET` / socket hang up on Node 22+. Upload `.docx` via **native fetch + FormData + Blob**
  (`sendDocumentNative()` in `bot/bot.js`), not Telegraf's `sendDocument`.
- **Gemini 2.5-flash truncates JSON** — it's a "thinking" model that spends the output budget
  reasoning. Fixed with `reasoning_effort:"none"` (Groq gpt-oss accepts low/medium/high → use `"low"`).
- **Express 5 wildcard** — `app.get("*")` crashes; use `app.get("/{*splat}")`.
- **launchd `EX_CONFIG(78)`** — caused by the `com.apple.macl` TCC xattr stamped on log files
  when Terminal writes them, which blocks launchd from opening them. The installer `rm`s the
  tainted logs before each `bootstrap`. See `deploy/DEPLOYMENT.md`.
- **TLS-intercepting networks** (e.g. a ContentKeeper web filter) make every HTTPS call fail
  with `SELF_SIGNED_CERT_IN_CHAIN`. The bot now retries with backoff (30s → 15min) instead of
  crashing the process; a scan where every source fails throws, and the scheduler retries in
  30 min. Don't disable TLS verification — switch networks. Logs redact bot tokens.
- **node-cron skips missed ticks during sleep** → `RUN_ON_START` does a catch-up scan on boot.
- **Ollama 7B crashes on 8GB Macs** — use `llama3.2:3b`, not `qwen2.5:7b`.
- **Adzuna env name** — code reads `ADZUNA_APP_KEY` (not `ADZUNA_API_KEY`); `content_type` goes
  in the header, not the query string.
- **Telegram callback_data 64-byte limit** — jobs are referenced by `jobToken(id)` (16-char
  sha256), resolved via `getJobByToken()`.
- **SerpApi free tier is 250/mo** — paced by `SERPAPI_MONTHLY_LIMIT` (240) + a min interval
  (24h), tracked in `data/serpapi-usage.json`. Other sources run every scan.

---

## Running it

```bash
# install
npm install

# run once (dry/real depending on env)
node src/run-once.js

# start the scheduler (cron + catch-up)
node src/scheduler.js

# web dashboard
node src/web/server.js     # then http://localhost:3000

# preview (wired to in-app browser via .claude/launch.json)
npx serve -p 4321 .

# tests
node --test
```

### Required `.env` keys
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, plus whichever job sources you use
(`RAPIDAPI_KEY`, `ADZUNA_APP_ID`/`ADZUNA_APP_KEY`, `SERPAPI_KEY`),
LLM keys (`GROQ_API_KEY`, `GEMINI_API_KEY`), and tuning vars
(`LLM_PROVIDER`, `LLM_FALLBACKS`, `JOB_QUERIES`, `JOB_LOCATION`, `JOB_REGION_STATES`, `REGION_INCLUDE_REMOTE`, `BLOCKED_DOMAINS`,
`EXCLUDED_ROLES`, `ATS_BOARDS`, `CRON_SCHEDULE`, `MIN_MATCH_SCORE`, `NOTIFY_MATCH_SCORE`,
`TOP_MATCH_SCORE`). `.env` is gitignored — keep it that way.

---

## Conventions

- Branch naming: `feat/<short-desc>` or `fix/<short-desc>`, off `jobReady`.
- Commit style: `type(scope): description` (e.g. `feat(ats): add smartrecruiters source`).
- New normalized fetchers must return `{ id, title, company, location, url, description }`
  and be registered in `src/fetchers/index.js` with matching `node:test` coverage.
