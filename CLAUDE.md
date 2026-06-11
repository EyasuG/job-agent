# CLAUDE.md — Project Brief for Claude Code

> Read this file fully before making changes. It defines the project's goal,
> architecture, constraints, and conventions. Keep it updated as the project evolves.

## 1. What this project is

A personal, single-user **AI job-search agent** that runs on a schedule and:

1. **Fetches** recent job postings matching the user's criteria.
2. **Deduplicates** against jobs already seen (so the user is only alerted to new ones).
3. **Tailors** the user's resume to each new posting using the Anthropic API.
4. **Renders** the tailored resume to a `.docx` file.
5. **Notifies** the user on Telegram with the job, a link, and the resume path.

The user is a JavaScript engineer reskilling to re-enter the workforce, targeting the
US DMV (DC / Maryland / Virginia) area. This is a learning project as much as a tool —
prefer clear, well-commented, idiomatic code over clever abstractions.

## 2. Hard constraints (do not violate)

- **No resume fabrication.** The tailoring step must only select, reorder, and rephrase
  facts already present in `resume/master.json`. It must never invent skills, employers,
  dates, titles, or achievements. The system prompt in `src/tailor/tailor.js` enforces
  this; preserve that intent in any change. When in doubt, surface gaps as
  `unmatched_requirements` rather than filling them in.
- **No LinkedIn scraping / Voyager API.** LinkedIn's job data is gated behind partner
  APIs and scraping violates their ToS (and risks account bans). Use legitimate
  aggregator APIs (currently JSearch via RapidAPI) as the job source.
- **No auto-applying.** This tool surfaces and drafts; the human reviews and applies.
  Do not add functionality that submits applications automatically.
- **Secrets stay in `.env`.** Never hardcode keys. Never commit `.env`, `data/`, or `output/`.

## 3. Tech stack

- Runtime: **Node.js 22.5+**, ES modules (`"type": "module"`).
- State store: built-in **`node:sqlite`** (no native dependency).
- Job source: **JSearch** (RapidAPI) via native `fetch`.
- Resume tailoring: **`@anthropic-ai/sdk`**.
- Document rendering: **`docx`**.
- Scheduling: **`node-cron`**.
- Concurrency control (when needed): **`p-limit`** (already installed).
- Notifications: **Telegram Bot API** via native `fetch`.

## 4. Directory map

```
src/
  config.js          # env loading + validation + path resolution (single source of truth)
  index.js           # entry: starts bot + scheduler + web dashboard (npm start)
  run-once.js        # entry: runs a single pipeline pass (npm run once)
  scheduler.js       # node-cron wrapper around the pipeline
  pipeline.js        # orchestrates fetch -> dedup -> tailor -> render -> notify (p-limit concurrency)
  bot/
    bot.js           # Telegraf bot: /start /status /run + inline Save/Skip buttons
  fetchers/
    index.js         # aggregator: runs all sources, merges, dedups, clearance-filters
    jsearch.js       # JSearch via RapidAPI (multi-query)
    adzuna.js        # Adzuna (multi-query)
    remotive.js      # Remotive remote jobs (free, no key; US-eligible only)
    jooble.js        # Jooble (POST API; skips until JOOBLE_API_KEY is set)
  store/
    db.js            # node:sqlite store: dedup + score/resume_path/status/description
  tailor/
    tailor.js        # Claude ATS keyword optimizer; returns score, keyword_coverage, bullets, gaps
    render.js        # styled .docx: header, summary, experience, skills, education
  notify/
    telegram.js      # legacy plain sendMessage(text)
  web/
    server.js        # Express app: static files + API routes
    api/             # jobs.js, resume.js, agent.js route modules
  lib/
    logger.js        # timestamped logger
    filters.js       # requiresClearance() — security-clearance job filter
public/              # dashboard frontend (vanilla JS + Pico CSS)
test/                # node:test suites (npm test)
deploy/              # launchd plist + installer, systemd unit, DEPLOYMENT.md
resume/master.json   # user's real resume (gitignored; example provided)
data/                # sqlite db (gitignored)
output/              # generated resumes (gitignored)
logs/                # launchd log output (gitignored)
```

## 5. The normalized job object

Every fetcher must return objects of this shape so the rest of the pipeline is
source-agnostic:

```js
{ id, title, company, location, url, description }
```

If you add a new job source, normalize to this shape inside that fetcher.

## 6. Conventions

- ES modules only; always include the `.js` extension in relative imports.
- Read all configuration through `config.js`; do not call `process.env` elsewhere.
- Each pipeline stage is its own module with a single clear export.
- Log via `logger`, not bare `console.*`.
- Fail loudly on missing required config; degrade gracefully (warn + skip) on missing
  optional config (e.g. no API key -> skip that stage, don't crash the run).
- Keep functions small and pure where practical; side effects (DB, network, files) are
  isolated to their own modules.

## 7. Current status

Everything below is built, tested end-to-end with live APIs, and pushed to
github.com/EyasuG/job-agent (branch `jobReady`):

- **Pipeline**: fetch → clearance filter → dedup → Claude tailor (ATS keyword
  optimization with score + keyword_coverage) → styled .docx → Telegram notify,
  processed 3-at-a-time with p-limit. Failed tailoring is retried next run.
- **Job sources** (4): JSearch + Adzuna (live), Remotive (live, US-eligible only),
  Jooble (activates when JOOBLE_API_KEY is set). Multi-query via JOB_QUERIES
  (currently "javascript developer,devops engineer").
- **Curation**: clearance-required jobs filtered out (EXCLUDE_CLEARANCE=true);
  jobs below MIN_MATCH_SCORE are silently skipped and marked seen.
- **Telegram bot** (telegraf): /start /status /run commands; Save/Skip inline
  buttons persist status to the DB shared with the dashboard.
- **Web dashboard** (Express + vanilla JS, port 3000): jobs table with search and
  score badges, saved-jobs view, master.json editor, status page with Run Now.
- **Tests**: 35 passing (`npm test`, node:test) — normalization, dedup,
  aggregation, clearance + US-eligibility filters.
- **Deployment**: launchd installer (deploy/install-launchd.sh) and systemd unit
  documented in deploy/DEPLOYMENT.md.

**Biggest open gap: `resume/master.json` still contains placeholder experience.**
Match scores stay low (8–42) until the user's real work history is added; the
LinkedIn basic export only had the profile summary, so experience/education/skills
must come from the full LinkedIn archive or be entered manually.

## 8. Roadmap (suggested next tasks)

1. **Fill in master.json with real experience** — highest leverage; unblocks
   meaningful match scores and the 95%+ keyword-fit goal.
2. **Jooble activation** — paste JOOBLE_API_KEY into .env once the key request
   is approved (no code change needed).
3. **Dashboard auth** — the Express server is unauthenticated; add a simple
   token/basic-auth gate before exposing it beyond localhost.
4. **Job detail view** — dashboard modal showing stored description,
   missing_keywords, and unmatched_requirements per job.
5. **Application tracker** — extend status beyond saved/skipped
   (applied / interviewing / rejected / offer) in DB, bot, and dashboard.
6. **Resume PDF export** — render or convert to PDF alongside .docx.
7. **Run history** — persist pipeline runs (time, fetched, notified) and chart
   them on the Status tab.

## 9. How to work in this repo

- Test a single pass with `npm run once` before touching the scheduler.
- When changing the job source, only edit the relevant `fetchers/*` module and keep the
  normalized shape intact.
- Update this file's "Current status" and "Roadmap" sections as you complete tasks.
