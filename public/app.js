// ── Tab navigation ────────────────────────────────────────────────────────────

const tabLinks  = document.querySelectorAll(".tab-link");
const tabPanels = document.querySelectorAll(".tab-panel");

tabLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.tab;

    tabLinks.forEach((l) => l.classList.remove("active"));
    tabPanels.forEach((p) => p.classList.add("hidden"));

    link.classList.add("active");
    document.getElementById(`tab-${target}`).classList.remove("hidden");

    if (target === "jobs")   loadJobs();
    if (target === "saved")  loadSaved();
    if (target === "resume") loadResume();
    if (target === "status") loadStatus();
  });
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreHtml(score) {
  if (score == null) return `<span class="score-none">—</span>`;
  const cls = score >= 70 ? "score-high" : score >= 40 ? "score-mid" : "score-low";
  return `<span class="${cls}">${score}/100</span>`;
}

function statusBadge(status) {
  const cls = `badge badge-${status ?? "new"}`;
  return `<span class="${cls}">${status ?? "new"}</span>`;
}

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

async function patchStatus(id, status, onDone) {
  await fetch(`/api/jobs/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  onDone();
}

// ── Jobs table ────────────────────────────────────────────────────────────────

let allJobs = [];

async function loadJobs() {
  const res  = await fetch("/api/jobs");
  allJobs    = await res.json();
  renderJobs(allJobs);
}

function renderJobs(jobs) {
  const tbody = document.getElementById("jobs-body");
  if (!jobs.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="muted">No jobs yet — run a scan first.</td></tr>`;
    return;
  }
  tbody.innerHTML = jobs.map((j) => `
    <tr>
      <td><a href="${j.url}" target="_blank" rel="noopener">${j.title}</a></td>
      <td>${j.company}</td>
      <td>${scoreHtml(j.score)}</td>
      <td>${fmtDate(j.seen_at)}</td>
      <td>${statusBadge(j.status)}</td>
      <td>${j.resume_path
        ? `<a href="/api/resume/${encodeURIComponent(j.id)}/download">⬇ Download</a>`
        : `<span class="muted">—</span>`}
      </td>
      <td>
        <div style="display:flex;gap:0.4rem">
          <button class="outline" style="font-size:0.75rem;padding:0.2rem 0.5rem"
            onclick="patchStatus(${JSON.stringify(j.id)}, 'saved', loadJobs)">Save</button>
          <button class="outline secondary" style="font-size:0.75rem;padding:0.2rem 0.5rem"
            onclick="patchStatus(${JSON.stringify(j.id)}, 'skipped', loadJobs)">Skip</button>
        </div>
      </td>
    </tr>
  `).join("");
}

// Live search filter
document.getElementById("jobs-search").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderJobs(allJobs.filter((j) =>
    j.title?.toLowerCase().includes(q) || j.company?.toLowerCase().includes(q)
  ));
});

// ── Saved jobs ────────────────────────────────────────────────────────────────

async function loadSaved() {
  const res   = await fetch("/api/jobs?status=saved");
  const saved = await res.json();
  const tbody = document.getElementById("saved-body");

  if (!saved.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="muted">No saved jobs yet.</td></tr>`;
    return;
  }
  tbody.innerHTML = saved.map((j) => `
    <tr>
      <td><a href="${j.url}" target="_blank" rel="noopener">${j.title}</a></td>
      <td>${j.company}</td>
      <td>${scoreHtml(j.score)}</td>
      <td>${fmtDate(j.seen_at)}</td>
      <td>${j.resume_path
        ? `<a href="/api/resume/${encodeURIComponent(j.id)}/download">⬇ Download</a>`
        : `<span class="muted">—</span>`}
      </td>
      <td>
        <button class="outline secondary" style="font-size:0.75rem;padding:0.2rem 0.5rem"
          onclick="patchStatus(${JSON.stringify(j.id)}, 'new', loadSaved)">Unsave</button>
      </td>
    </tr>
  `).join("");
}

// ── Resume editor ─────────────────────────────────────────────────────────────

async function loadResume() {
  const res  = await fetch("/api/resume/master");
  const data = await res.json();
  document.getElementById("resume-editor").value = JSON.stringify(data, null, 2);
  document.getElementById("resume-status").textContent = "";
}

document.getElementById("resume-save-btn").addEventListener("click", async () => {
  const statusEl = document.getElementById("resume-status");
  const raw = document.getElementById("resume-editor").value;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    statusEl.textContent = "❌ Invalid JSON — fix errors before saving.";
    statusEl.style.color = "#dc2626";
    return;
  }

  const res = await fetch("/api/resume/master", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  if (res.ok) {
    statusEl.textContent = "✅ Saved!";
    statusEl.style.color = "#2d9e5f";
  } else {
    const err = await res.json();
    statusEl.textContent = `❌ ${err.error}`;
    statusEl.style.color = "#dc2626";
  }
  setTimeout(() => { statusEl.textContent = ""; }, 3000);
});

// ── Status / Run Now ──────────────────────────────────────────────────────────

async function loadStatus() {
  const res  = await fetch("/api/agent/status");
  const data = await res.json();

  document.getElementById("stat-total").textContent   = data.total ?? "—";
  document.getElementById("stat-new").textContent     = data.newCount ?? "—";
  document.getElementById("stat-running").textContent = data.running ? "🟡 Running" : "🟢 Idle";
  document.getElementById("stat-last").textContent    = data.lastRunAt
    ? new Date(data.lastRunAt).toLocaleTimeString()
    : "Not yet";
}

document.getElementById("run-now-btn").addEventListener("click", async () => {
  const btn      = document.getElementById("run-now-btn");
  const statusEl = document.getElementById("run-status");

  btn.disabled = true;
  btn.textContent = "Starting…";
  statusEl.textContent = "";

  const res = await fetch("/api/agent/run", { method: "POST" });

  if (res.status === 409) {
    statusEl.textContent = "⚠️ A scan is already running.";
  } else if (res.ok) {
    statusEl.textContent = "✅ Scan started — results will appear when complete.";
    // Poll status every 3s until the run finishes
    const poll = setInterval(async () => {
      const s = await fetch("/api/agent/status").then((r) => r.json());
      document.getElementById("stat-running").textContent = s.running ? "🟡 Running" : "🟢 Idle";
      if (!s.running) {
        clearInterval(poll);
        loadStatus();
        statusEl.textContent = "✅ Scan complete.";
      }
    }, 3000);
  } else {
    statusEl.textContent = "❌ Failed to start scan.";
  }

  btn.disabled    = false;
  btn.textContent = "🔍 Run Scan Now";
});

// ── Boot ──────────────────────────────────────────────────────────────────────

loadJobs(); // load the default tab on page open
