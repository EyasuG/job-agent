# Job Agent

An AI-powered job-search agent. It fetches job postings, tailors a resume to each
one with Claude, saves a `.docx`, and notifies you on Telegram.

## Requirements

- Node.js 22.5 or newer (uses the built-in `node:sqlite` module)
- A Telegram bot token + chat ID
- A RapidAPI key for JSearch (job data source)
- An Anthropic API key (resume tailoring)

## Setup

```bash
npm install
cp .env.example .env          # then fill in your keys
cp resume/master.example.json resume/master.json   # then edit with your real resume
```

## Run

```bash
npm run once     # run a single pass (best for testing)
npm start        # start the scheduler (runs on CRON_SCHEDULE)
npm run dev      # run-once with auto-reload during development
```

## How it works

`src/pipeline.js` is the heart: fetch -> filter new -> tailor -> render -> notify.
Each stage lives in its own module so you can swap pieces independently (e.g.
replace the JSearch fetcher with a different job source).

## Notes

- `node:sqlite` prints an experimental warning; that is expected and harmless.
- The resume tailor is constrained to never invent facts — see `src/tailor/tailor.js`.
