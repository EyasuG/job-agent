# Deployment Guide

Two options: run locally on your Mac (launchd) or on a Linux VPS (systemd).
Both keep the agent alive across restarts and route logs to a file.

---

## Option A — macOS (launchd) — recommended for local use

### Prerequisites
- Node.js installed via Homebrew (`brew install node`)
- `.env` file created from `.env.example` with all secrets filled in
- `resume/master.json` created from `resume/master.example.json`

### Install

Run once from the project root:

```bash
bash deploy/install-launchd.sh
```

The script:
1. Reads your `.env` and injects all variables into the launchd plist
2. Installs the plist to `~/Library/LaunchAgents/com.jobagent.plist`
3. Loads and starts the agent immediately

### Manage

```bash
# Live logs
tail -f logs/agent.log
tail -f logs/agent.error.log

# Stop
launchctl bootout gui/$(id -u)/com.jobagent

# Start
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.jobagent.plist

# Uninstall completely
launchctl bootout gui/$(id -u)/com.jobagent
rm ~/Library/LaunchAgents/com.jobagent.plist
```

> **macOS gotcha — `EX_CONFIG (78)` / agent won't start.** If `launchctl print
> gui/$(id -u)/com.jobagent` shows `last exit code = 78` and nothing is logged,
> the log files picked up a TCC `com.apple.macl` xattr (from a Terminal-run
> process writing to them) that blocks the launchd process from opening them.
> Fix: `rm logs/agent.log logs/agent.error.log` and re-run the installer so
> launchd recreates clean files. Avoid running `npm run dev`/`npm start` and the
> launchd service at the same time — two pollers also conflict on Telegram and
> port 3000.

### Re-deploy after code changes

```bash
git pull
npm install           # in case dependencies changed
bash deploy/install-launchd.sh   # reloads the agent
```

---

## Option B — Linux VPS (systemd)

Tested on Ubuntu 22.04 / Debian 12. A $4/month Hetzner or DigitalOcean instance is enough.

### 1. Server setup

```bash
# On the VPS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Clone the repo
git clone https://github.com/EyasuG/job-agent.git
cd job-agent
npm install --omit=dev

# Create secrets
cp .env.example .env
nano .env                        # fill in all keys

# Create your resume
cp resume/master.example.json resume/master.json
nano resume/master.json          # fill in your real details
```

### 2. Install the service

> **`.env` formatting for systemd.** systemd's `EnvironmentFile` only treats a
> `#` at the *start* of a line as a comment and does not run a shell, so keep
> comments on their own lines (never inline after a value) and wrap any value
> containing spaces in double quotes — e.g. `JOB_QUERIES="forward deployed
> engineer,full stack developer,front end developer"`, `CRON_SCHEDULE="0 */4 * *
> *"`. The shipped `.env.example` already follows this; copy its style when
> adding keys. (The Node app and the macOS installer parse the file more
> leniently, but this style is safe for all three.)

Edit `deploy/job-agent.service` and replace `YOUR_LINUX_USER` with your actual username, then:

```bash
sudo cp deploy/job-agent.service /etc/systemd/system/job-agent.service
sudo systemctl daemon-reload
sudo systemctl enable job-agent
sudo systemctl start job-agent
```

### 3. Manage

```bash
# Status
sudo systemctl status job-agent

# Live logs
sudo journalctl -u job-agent -f

# Stop / Start / Restart
sudo systemctl stop job-agent
sudo systemctl start job-agent
sudo systemctl restart job-agent
```

### 4. Re-deploy after code changes

```bash
cd ~/job-agent
git pull
npm install --omit=dev
sudo systemctl restart job-agent
```

---

## Environment variable reference

See `.env.example` for the full list. The required ones to get started:

| Variable | Required | Description |
|----------|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | ✅ | From @BotFather |
| `TELEGRAM_CHAT_ID` | ✅ | Your Telegram user ID |
| `RAPIDAPI_KEY` | one of these | JSearch job source |
| `ADZUNA_APP_ID` + `ADZUNA_API_KEY` | one of these | Adzuna job source |
| `ANTHROPIC_API_KEY` | ✅ | Resume tailoring |
| `MIN_MATCH_SCORE` | ❌ | Default 50. Record floor — jobs below this are discarded and never stored |
| `NOTIFY_MATCH_SCORE` | ❌ | Notify gate — only jobs at/above this send a Telegram alert; scores in `[MIN_MATCH_SCORE, this)` are stored silently for dashboard review. Defaults to `MIN_MATCH_SCORE` |
| `JOB_LOCATION` | ❌ | Default `United States` (nationwide: onsite + hybrid + remote); name a city/region to narrow |
| `CRON_SCHEDULE` | ❌ | Default `0 */4 * * *` (every 4 hours) |
