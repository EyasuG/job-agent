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
launchctl unload ~/Library/LaunchAgents/com.jobagent.plist

# Start
launchctl load -w ~/Library/LaunchAgents/com.jobagent.plist

# Uninstall completely
launchctl unload ~/Library/LaunchAgents/com.jobagent.plist
rm ~/Library/LaunchAgents/com.jobagent.plist
```

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
| `MIN_MATCH_SCORE` | ❌ | Default 50. Lower = more noise, higher = fewer alerts |
| `CRON_SCHEDULE` | ❌ | Default `0 */4 * * *` (every 4 hours) |
