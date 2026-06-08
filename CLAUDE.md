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
  index.js           # entry: starts the scheduler (npm start)
  run-once.js        # entry: runs a single pipeline pass (npm run once)
  scheduler.js       # node-cron wrapper around the pipeline
  pipeline.js        # orchestrates fetch -> dedup -> tailor -> render -> notify
  fetchers/
    jsearch.js       # job source client; returns NORMALIZED job objects
  store/
    db.js            # node:sqlite dedup store (isNew / markSeen)
  tailor/
    tailor.js        # Claude call; returns { summary, tailored_bullets, unmatched_requirements }
    render.js        # writes a .docx from the tailored result
  notify/
    telegram.js      # sendMessage(text)
  lib/
    logger.js        # timestamped logger
resume/master.json   # user's real resume (gitignored; example provided)
data/                # sqlite db (gitignored)
output/              # generated resumes (gitignored)
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

Working foundation is in place: config, logging, Telegram notifier, dedup store,
JSearch fetcher, Claude tailor, docx renderer, pipeline, scheduler. The Telegram
channel has been tested end-to-end.

## 8. Roadmap (suggested next tasks)

In rough priority order. Pick up where the user directs.

1. **Validate the full pipeline** with a real RapidAPI key and a real `master.json`;
   confirm a tailored `.docx` is produced and the Telegram message links it.
2. **Telegram interactivity** (migrate to `telegraf`): inline buttons to "skip",
   "save", or "open" a job; let the user trigger a run on demand with a command.
3. **Better resume rendering**: contact header, sections, consistent styling; consider
   a template so output looks like a finished resume, not a draft.
4. **Match scoring**: have the tailor return a 0–100 relevance score and filter or sort
   notifications by it to cut noise.
5. **Multiple job sources**: add an Adzuna or Google-Jobs (SerpApi) fetcher behind the
   same normalized interface; merge + dedup across sources.
6. **Concurrency**: tailor several new jobs in parallel with `p-limit` (cap to respect
   API rate limits).
7. **Tests**: unit-test normalization and dedup; mock the network boundaries.
8. **Deployment**: document running as a `launchd` service on macOS or on a small VPS.

## 9. How to work in this repo

- Test a single pass with `npm run once` before touching the scheduler.
- When changing the job source, only edit the relevant `fetchers/*` module and keep the
  normalized shape intact.
- Update this file's "Current status" and "Roadmap" sections as you complete tasks.
