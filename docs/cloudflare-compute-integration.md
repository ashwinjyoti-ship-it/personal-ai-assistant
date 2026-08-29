# Cloudflare Compute Integration — Design Note

**Status**: proposal / not implemented
**Date**: 2026-08-07
**Trigger**: [Cloudflare Computer — Give Your Agent a Computer](https://www.youtube.com/watch?v=nG6MXUNsfbU) (Full Stack), and the
[`@cloudflare/computer` announcement](https://blog.cloudflare.com/cloudflare-computer/).

---

## 1. The observation

Karna already lives on Cloudflare for **state** — D1, R2, Vectorize, Workers AI, Pages (`wrangler.jsonc`).
It rents its **compute** from two other vendors:

| Concern | Runs on | Why it left Cloudflare |
|---|---|---|
| Full Hono API, agent loop | Render web service (`src/render/server.ts`) | Workers wall-clock/CPU anxiety around multi-minute agent turns |
| Playwright (Outlook scraper, recipes, page watch) | Render Docker image (`Dockerfile`, `mcr.microsoft.com/playwright`) | Can't run Chromium in a Worker isolate |
| Cron | Render in-process scheduler (`src/render/cron.ts`) | Explicitly: *"the Cloudflare Workers time limits that made cron flaky"* |
| Open-ended browser agent | Browser Use Cloud (`src/services/browser.ts`) | No first-party equivalent existed |

The cost of that split is visible all over the repo:

- `src/render/d1-adapter.ts` + `d1.ts` (218 lines) exist **only** to reach D1 over the HTTP REST API
  because Render has no native binding. Every query is a round trip to Cloudflare and back.
- `src/services/browser.ts` is ~400 lines, of which a large fraction is vendor workaround:
  `reapActiveBrowserSessions`, `isSessionLimitError`, the `/status`-output-is-unreliable
  fallback chain (`/status` → full `TaskView` → last step's `extracted_content`), the
  `BROWSER_TIMEOUT` sentinel + `pending_browser_tasks` resumption dance.
- `src/services/docx.ts` hand-parses ZIP local file headers with `DecompressionStream` to pull
  text out of a `.docx`. That is a `python-docx` one-liner **if the agent has a filesystem and a shell.**
- Two sets of env vars, two deploy targets, two failure modes (see the orphaned-background-worker
  war story in `src/render/server.ts:66-94`).

Cloudflare shipped compute primitives during Agents Week 2026 that address every row of that table.
This note is about which ones actually fit Karna, in what order, and what each one costs us.

---

## 2. What the three products actually are

They get conflated constantly. They are not the same thing.

### `@cloudflare/computer` — the one in the video

A **SQLite-backed virtual filesystem living on a Durable Object**, plus *pluggable execution backends*
that all operate on that same filesystem:

- **Isolate backend** — `just-bash` translates shell commands into JavaScript, runs in a Dynamic Worker
  with direct FS access via bindings. Fast, cheap, no container.
- **Container backend** — full Linux userland (npm, node, binaries on `$PATH`), filesystem mounted via
  FUSE, changes sync back to the shared workspace.

Both implement one `exec(string, options)` interface. The model picks the backend per command from the
tool description. Cloudflare's stated goal: *"provide an agent with a runtime where a container is
required for less than 10% of its work."*

The important part for us is the **unified, persistent, per-agent filesystem**. Not the shell.

### Sandboxes (`@cloudflare/sandbox`) — GA

A real container per sandbox: shell + PTY over WebSocket, persistent filesystem with inotify watching,
background processes with preview URLs, sleep/wake with state resumption, R2-backed snapshots
(*"booting a sandbox, cloning axios, and npm installing takes 30 seconds. Restoring from a backup takes
two seconds."*), a Jupyter-style stateful code interpreter, and a programmable egress proxy that injects
credentials at the network layer so the agent never sees the raw secret.

No desktop GUI, no browser inside it. Billed on active CPU, not wall-clock idle.

### Browser Run (formerly Browser Rendering)

Headless Chromium as a Worker binding, driven by Puppeteer, Playwright, or **Stagehand**.
Limits that matter to us: **120 concurrent browsers on paid**, 60s inactivity default,
`keep_alive` up to **10 minutes**, session reuse via reconnect.

---

## 3. Why `@cloudflare/computer` fits Karna specifically

Karna is *already* a per-user stateful agent. It has:

- per-user memory (working + long-term, `src/services/memory.ts`)
- per-user threads and conversation state
- per-user encrypted credential vault
- per-user `browser_sessions` rows keyed to sites

What it does **not** have is a per-user *place to put files and run things*. Every one of Karna's
~80 tools is a bespoke TypeScript function that does exactly one thing to one SaaS API. There is no
`exec`. So anything that needs actual computation — reconcile two CSVs, convert a weird file, chart a
spreadsheet, run a scraper the user described, diff two contracts numerically — either gets done in the
LLM's head (where the anti-fabrication layer in `ARCHITECTURE_ITERATIONS.md` correctly distrusts it) or
requires a developer to ship a new tool.

`@cloudflare/computer`'s `Workspace` is a Durable Object. Karna's natural DO key is `user_id`. That gives
every user a persistent home directory that survives across turns, threads, and days — which slots into
the existing memory model rather than fighting it.

**This is the single highest-leverage change in this document.** Everything below is consolidation;
this one is a new capability.

---

## 4. The constraint nobody mentions

Containers and Durable Objects require **Workers**, not Pages Functions. Karna's `wrangler.jsonc`
declares `pages_build_output_dir: "./dist"` — it's a Pages project. And the agent loop that would call
these tools runs on **Render**, which has no Cloudflare bindings at all.

So there is no version of this where we just `npm install @cloudflare/computer` into the existing app.
The realistic shape is a **third deployable**:

```
  SPA (Pages)  ──API_BASE_URL──►  Render (Hono app, agent loop)
                                       │
                                       │ authenticated HTTP RPC (shared secret)
                                       ▼
                                  karna-computer (Worker)
                                       ├─ KarnaWorkspace (Durable Object + Workspace)
                                       ├─ Container binding (heavy exec)
                                       └─ BROWSER binding (Browser Run)
```

Render stays the orchestrator. The Worker owns the compute primitives. This is additive and reversible —
if it doesn't pay off, delete the Worker and the four tools that call it.

Phase 3 (§8) is where that seam gets collapsed, and it should only happen if phases 0–2 earn it.

---

## 5. Phase 0 — Workspace tools (highest value, lowest risk)

### New Worker: `workers/computer/`

```jsonc
// workers/computer/wrangler.jsonc
{
  "name": "karna-computer",
  "main": "src/index.ts",
  "compatibility_date": "2026-02-15",
  "compatibility_flags": ["nodejs_compat"],
  "durable_objects": {
    "bindings": [{ "name": "WORKSPACE", "class_name": "KarnaWorkspace" }]
  },
  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["KarnaWorkspace"] }],
  "containers": [
    { "class_name": "KarnaWorkspace", "image": "./Dockerfile", "instance_type": "lite", "max_instances": 5 }
  ],
  "d1_databases": [{ "binding": "DB", "database_name": "karna-production", "database_id": "047e293b-5d55-452c-a901-5c029cb07ad9" }],
  "r2_buckets": [{ "binding": "DOCUMENTS_BUCKET", "bucket_name": "karna-documents" }]
}
```

Note the Worker gets **native** D1 and R2 bindings — the same D1 instance Render currently reaches over
REST. Anything moved into this Worker stops paying the `d1-adapter.ts` tax.

### The Durable Object

```ts
import { Workspace } from '@cloudflare/computer';
import { CloudflareContainerBackend, withWorkspaceContainer } from '@cloudflare/computer/backends/container';
import { DurableObject } from 'cloudflare:workers';

export class KarnaWorkspace extends withWorkspaceContainer(DurableObject) {
  workspace = new Workspace({
    storage: this.ctx.storage,
    backends: [
      new CloudflareContainerBackend({
        container: () => this,
        workspace: { binding: 'WORKSPACE', id: this.ctx.id.toString() },
      }),
    ],
  });
}
```

One DO instance per `user_id`. `this.ctx.storage` is what makes the filesystem survive between turns.

### Four new agent tools

Added to the registry in `src/services/agent.ts` alongside the existing ~80:

| Tool | Purpose |
|---|---|
| `workspace_write` | Write a file into the user's workspace |
| `workspace_read` | Read a file back |
| `workspace_ls` | List a directory |
| `workspace_exec` | Run a shell command; `backend: "isolate" \| "container"` |

`workspace_exec` **must** go into `IRREVERSIBLE_TOOLS` in `src/services/toolTiers.ts`. It is arbitrary
code execution on the user's data. It already fails closed today (unknown tools default to irreversible),
but relying on the default here would be sloppy — add it explicitly with a `gateConsequence` string that
shows the command being run.

### What this unlocks immediately

- **Document work stops being hand-rolled.** `src/services/docx.ts`'s ZIP parser and
  `document-generation.ts`'s markdown subset become `pandoc`/`python-docx` calls on the container backend.
  The R2 `DOCUMENTS_BUCKET` binding is right there.
- **`create_skill` gets teeth.** `src/services/skills.ts` skills are currently prompt-shaped. With a
  workspace they can be *scripts* — authored once, stored in the user's FS, re-run deterministically.
  Same argument the repo already makes for `browserRecipes.ts` ("constraining the vocabulary is what
  makes self-authoring safe"), except the vocabulary is now a real language and the sandbox is the
  constraint instead of the DSL.
- **Real data work.** Pull a sheet via the existing `read_sheet`, write it to `/workspace/data.csv`,
  run pandas, write the result back. Grounded in a file the user can inspect — which is exactly what the
  citation-first / anti-fabrication posture in `ARCHITECTURE_ITERATIONS.md` §2 is asking for.

### Cost of doing nothing here

Every future "can Karna just…" request that involves computation continues to require a hand-written
TypeScript tool and a deploy.

---

## 6. Phase 1 — Browser Run replaces the Playwright half of Render

`src/render/playwrightCore.ts` (553 lines), `outlookPlaywright.ts` (700 lines), `browserRecipe.ts`,
and `pageWatch.ts` are already Playwright. Browser Run speaks Playwright. This is close to a
transport swap:

```ts
import { launch, connect, sessions } from '@cloudflare/playwright';

// Reuse a live session if one exists — same intent as the browser_sessions D1 table.
const existing = (await sessions(env.BROWSER)).find(s => !s.connectionId);
const browser = existing
  ? await connect(env.BROWSER, existing.sessionId)
  : await launch(env.BROWSER, { keep_alive: 600_000 }); // 10 min max
```

The existing `browser_sessions` table (migration `0057`) already stores exactly the session-reuse state
this needs. `keep_alive` max of 10 minutes lines up with `TIMEOUT_LIMITS_AUDIT.md`'s conclusion that
5 minutes is the right default with headroom to 10.

**Deleting the `Dockerfile` and its `mcr.microsoft.com/playwright:v1.61.1-jammy` base** also kills the
version-pin coupling that file warns about ("the image tag's version must match the `playwright` version
pinned in package.json exactly").

### Be honest about what this does *not* replace

Browser Use gives us a **natural-language browser agent**. Browser Run gives us a **headless browser**.
Those are different products.

- Deterministic flows — Outlook scraping, `browserRecipes.ts` step DSL, `pageWatch`, the
  `buildBlueDartTrackingTask` courier flow — port cleanly and get *cheaper and faster* (the browser is
  in the same datacenter as the Worker instead of a round trip to Browser Use's cloud).
- The open-ended `browser_task` tool does **not** port for free. To replace it we'd either drive a
  screenshot → LLM → action loop ourselves, or use **Stagehand**, which Browser Run supports and which
  is exactly the natural-language layer we'd be missing.

Recommendation: port the deterministic paths first, keep the Browser Use key configured, and only cut
`browser_task` over once Stagehand has been measured against real Outlook/Blue Dart tasks. The failure
mode we must not regress is the one `INVESTIGATION_BROWSER_TASKS.md` is proud of — failing gracefully
instead of hallucinating tracking data.

---

## 7. Phase 2 — cron and long-running turns

Two things pushed cron off Cloudflare, per the comment in `src/render/cron.ts`: Workers time limits,
and the CF-cron → Pages → proxy → Render hop chain.

The hop chain disappears once the compute is on Workers. The time limit concern is worth re-examining:
Workers bill **CPU** time, not wall clock, and a Karna agent turn is overwhelmingly I/O — LLM calls,
Google APIs, D1. Paid Workers allow CPU limits up to 5 minutes, and Durable Object **alarms** let a
long job checkpoint and continue rather than needing one unbroken execution.

The `pending_browser_tasks` pattern already in the codebase is a hand-rolled version of exactly what
DO alarms do natively.

So: Workers Cron Triggers + a scheduler DO with alarms, replacing `startRenderCron`. The endpoints and
the 90s/dedup double-fire guards stay identical, exactly as they did during the last cutover.

---

## 8. Phase 3 — retire Render (only if 0–2 land well)

After phases 0–2, Render is hosting a Hono app that could run on Workers, reaching D1 over REST that a
Worker binds natively. At that point:

- Delete `src/render/d1-adapter.ts`, `d1.ts`, `r2-bucket.ts`, `r2.ts`, `env.ts`, `server.ts`
- Delete `Dockerfile`, `render.yaml`, `ecosystem.config.cjs`
- One deploy target, one set of secrets, one place to look when something breaks
- Telegram webhook points at the Worker instead of `karna-background-worker.onrender.com`

This is the payoff, but it is **not** the reason to start. Start for §5.

---

## 9. Recommendation

Do **Phase 0 only**, as a spike, behind a feature flag on one user.

It's the only phase that adds a capability Karna doesn't have rather than relocating one it does. It's
additive (a new Worker, four new tools), reversible (delete the Worker), and it de-risks everything
after it — if the Render → Worker RPC seam is unpleasant, we learn that on four tools instead of on a
whole-platform migration.

Phases 1–3 are consolidation. They're real savings (one vendor bill, one deploy target, ~1,500 lines of
adapter and vendor-workaround code) but they don't make Karna do anything new, and Karna's browser
automation is currently *working*. Don't spend the risk budget there first.

### Open questions before writing code

1. Sandbox/Container pricing at Karna's volume — Cloudflare publishes active-CPU billing but not a
   number we can plug in. Needs a real quote or a metered spike.
2. Does `@cloudflare/computer`'s isolate backend cover enough of Karna's actual shell needs to hit
   Cloudflare's "<10% container" target, or does document conversion push everything to the container?
3. Stagehand's reliability on authenticated, anti-bot-protected sites (Outlook, Blue Dart) vs.
   Browser Use's. This decides whether Phase 1 is a swap or a rewrite.
4. Does the DO-per-user workspace need a size cap and an eviction policy? Nothing in Karna currently
   bounds per-user storage.

---

## Sources

- [Your agent needs a computer, not a container — introducing @cloudflare/computer](https://blog.cloudflare.com/cloudflare-computer/)
- [Agents have their own computers with Sandboxes GA](https://blog.cloudflare.com/sandbox-ga/)
- [Cloudflare Sandbox SDK docs](https://developers.cloudflare.com/sandbox/)
- [Sandbox · Cloudflare Agents docs](https://developers.cloudflare.com/agents/tools/sandbox/)
- [Browser Run limits](https://developers.cloudflare.com/browser-run/limits/)
- [Browser Run — Playwright](https://developers.cloudflare.com/browser-run/playwright/)
- [Sandboxing AI agents, 100x faster (Dynamic Workers)](https://blog.cloudflare.com/dynamic-workers/)
- [Agents Week 2026 in review](https://blog.cloudflare.com/agents-week-in-review/)
