#!/usr/bin/env bash
# Installs the job-agent as a launchd user agent on macOS.
# Run once from the project root:  bash deploy/install-launchd.sh

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NODE_BIN="$(command -v node)"
PLIST_NAME="com.jobagent"
PLIST_DEST="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"
LOG_DIR="$PROJECT_DIR/logs"

# ── Preflight checks ─────────────────────────────────────────────────────────

if [ ! -f "$PROJECT_DIR/.env" ]; then
  echo "ERROR: .env file not found at $PROJECT_DIR/.env"
  echo "  Copy .env.example → .env and fill in your secrets first."
  exit 1
fi

if [ ! -f "$PROJECT_DIR/resume/master.json" ]; then
  echo "ERROR: resume/master.json not found."
  echo "  Copy resume/master.example.json → resume/master.json and fill in your details."
  exit 1
fi

# ── Build the plist ──────────────────────────────────────────────────────────

mkdir -p "$LOG_DIR"

# Read .env and build <dict> entries for EnvironmentVariables
ENV_ENTRIES=""
while IFS= read -r line || [ -n "$line" ]; do
  # Skip comments and blank lines
  [[ "$line" =~ ^#.*$ ]] && continue
  [[ -z "$line" ]] && continue
  KEY="${line%%=*}"
  VALUE="${line#*=}"
  # Strip inline comments from value
  VALUE="${VALUE%%#*}"
  VALUE="${VALUE%"${VALUE##*[![:space:]]}"}" # rtrim
  ENV_ENTRIES="${ENV_ENTRIES}    <key>${KEY}</key>\n    <string>${VALUE}</string>\n"
done < "$PROJECT_DIR/.env"

sed \
  -e "s|NODE_PATH_PLACEHOLDER|${NODE_BIN}|g" \
  -e "s|PROJECT_PATH_PLACEHOLDER|${PROJECT_DIR}|g" \
  "$PROJECT_DIR/deploy/com.jobagent.plist" \
  > /tmp/${PLIST_NAME}.plist

# Inject the .env vars into the EnvironmentVariables dict
python3 - <<PYEOF
import plistlib, pathlib

path = pathlib.Path("/tmp/${PLIST_NAME}.plist")
with open(path, "rb") as f:
    data = plistlib.load(f)

env = data.get("EnvironmentVariables", {})

import subprocess, shlex
result = subprocess.run(
    ["bash", "-c", "set -a && source '${PROJECT_DIR}/.env' && set +a && env"],
    capture_output=True, text=True
)
for line in result.stdout.splitlines():
    if "=" in line:
        k, _, v = line.partition("=")
        # Only include keys from .env (skip system vars)
        env[k] = v

data["EnvironmentVariables"] = env
with open(path, "wb") as f:
    plistlib.dump(data, f)
PYEOF

cp /tmp/${PLIST_NAME}.plist "$PLIST_DEST"

# ── Load the agent ───────────────────────────────────────────────────────────

# Remove any TCC-tainted log files. When a Terminal-launched process (which
# holds Desktop/Documents access) writes to these files, macOS stamps them with
# a `com.apple.macl` extended attribute that then blocks the launchd-spawned
# process from opening them — launchd reports EX_CONFIG (78) and never starts.
# Deleting them lets launchd create clean files it owns.
rm -f "$LOG_DIR/agent.log" "$LOG_DIR/agent.error.log"

GUI_DOMAIN="gui/$(id -u)"

# Tear down any prior registration in BOTH the legacy and modern domains;
# mixing `load` and `bootstrap` for the same label leaves it in a broken state.
launchctl bootout "$GUI_DOMAIN/$PLIST_NAME" 2>/dev/null || true
launchctl unload "$PLIST_DEST" 2>/dev/null || true
sleep 1

# Modern loader (bootstrap); fall back to legacy load on older macOS.
launchctl bootstrap "$GUI_DOMAIN" "$PLIST_DEST" 2>/dev/null || launchctl load -w "$PLIST_DEST"

echo ""
echo "✅  job-agent installed and started."
echo ""
echo "Useful commands:"
echo "  View logs:    tail -f $LOG_DIR/agent.log"
echo "  Error logs:   tail -f $LOG_DIR/agent.error.log"
echo "  Stop agent:   launchctl bootout gui/\$(id -u)/$PLIST_NAME"
echo "  Start agent:  launchctl bootstrap gui/\$(id -u) $PLIST_DEST"
echo "  Uninstall:    launchctl bootout gui/\$(id -u)/$PLIST_NAME && rm $PLIST_DEST"
