# The Successor — design note

**Status**: proposal / exploratory
**Date**: 2026-08-08
**Working title**: **Margin** (rename it; the name should be yours)

> A personal tool, built for the pleasure of building and using it. Not for a market,
> not for scale, not for anyone else's flows.

---

## 0. Assumptions I made

You didn't pick when I asked, so I chose. Overturn any of these and the plan changes:

1. **Trunk = fork Tandem.** It's the only Workers-native repo, and it already owns the one
   mechanism worth keeping.
2. **Surface = the document, in a browser.** Poppin becomes an optional cockpit, not the home.
3. **Salvage from Karna** = router + memory, Google/Gmail, digests, and capture-only Telegram/voice.

---

## 1. The finding

The three repos are **one product that got built three times**, each time from a different corner,
each time independently reinventing the same three primitives.

| | Karna | Tandem (UDM) | Poppin |
|---|---|---|---|
| Lines (src) | 40,503 | 18,554 | 7,481 |
| Is | the brain | the substrate | the hands + the human |
| Runs on | Pages + Render + Browser Use | Workers + D1 + DOs | Electron, local-first |

They already touch. `src/services/udm.ts` (777 lines) points at `https://ash-doc.pages.dev`
with an API key out of Karna's credential vault. **19 of Karna's 80 tools are `udm_*`** — a
quarter of the entire tool surface is already aimed at the doc substrate. That integration
wasn't a side quest. It was the app trying to become itself.

### The convergent evolution is the tell

**Approval gates, built twice.** Karna has `IRREVERSIBLE_TOOLS` in `src/services/toolTiers.ts`
plus `approvalGate.ts` — a set of tool names, a `gateConsequence()` string, a `SAFE_SUBSTITUTES`
map (`gmail_send` → `gmail_draft`). Poppin has a prose list in its development guide:
*"authentication boundaries, final form submission, sending, publishing, downloads/uploads,
purchases, destructive actions, Git push/PR/merge."* Same concept. Two vocabularies. Zero shared code.

**Browser automation, built twice — and Poppin's is better.** Karna rents Browser Use Cloud and
pays for it in `src/services/browser.ts`: session reaping, concurrency-limit detection, a
three-deep fallback chain because `/status` doesn't reliably return output, a `BROWSER_TIMEOUT`
sentinel feeding a `pending_browser_tasks` table. Poppin's `BrowserAgentEngine` gives tasks their
own visible Agent Tabs in the real session, with sanitized semantic snapshots, stale-ref rejection,
per-step logs, and **pause/takeover** — you can grab the wheel. Karna's headless approach
structurally cannot offer that. When Karna hits a captcha it returns
`"manual verification needed"` and gives up. Poppin hands you the tab.

**Storage of things-you-care-about, built twice.** Karna: `notes`, `memory`, `skills`, `digests`,
`threads` — five D1 table families. Tandem: pages, databases, canvas. These are the same thing
wearing different schemas.

---

## 2. The crown jewel

Tandem's comment loop, from `docs/CODING_AGENTS.md`:

```http
GET  /api/pages/{pageId}/agent-comments?status=open   → { agent_prompt, selection_quote, selection_meta }
POST /api/comments/{commentId}/apply                  → { new_text }   (surgical, auto-resolves)
PATCH /api/comments/{commentId}                       → { status: "resolved" }
```

You highlight text. You write what you want. The agent gets `agent_prompt` — your instruction
*fused with the exact text it's about* — makes a surgical replacement, and marks it resolved.

Look at what that gets you for free, none of which a chat box can give you:

- **Addressable.** The instruction lives *at* the thing it's about. No "which paragraph did you mean."
- **Stateful.** `open` / `resolved`. The doc itself is the queue. CODING_AGENTS.md is emphatic
  about this — *"Never skip step 3 — otherwise the same instruction appears every run."*
- **Surgical.** `old_text` / `new_text`, not a full-page rewrite. The diff is small enough to trust.
- **Auditable.** The document is the log. Nothing to reconcile.

Now hold that against Karna's integrity layer. Karna has a **tool enforcement loop** (5 turns of
forcing the model to actually call the tool it narrated), **fake `[TOOLS_USED:]` stripping**,
**workspace write enforcement**, a **programmatic fallback scheduler parser**, **server-side date
injection**. That is an entire subsystem built to answer one question: *did the thing actually happen?*

In a document, that question answers itself. The page either changed or it didn't.

**That's the whole thesis.** Not "an AI assistant with 80 tools." An app where the document is the
control plane — queue, log, memory, and output, all the same artifact.

---

## 3. What dies

Being specific here is most of the value. From Karna's 40,503 lines:

| Dies | Why |
|---|---|
| `src/routes/chat.ts` (1,121 lines), threads, Today/Yesterday/Older sidebar | The chat box is the thing we're leaving |
| `src/services/agent.ts` (7,154 lines) | Replaced by the Agent SDK loop + skills |
| The whole integrity layer | It was scaffolding around weak tool-calling. The ground moved. |
| `src/services/browser.ts` + Browser Use bill | Browser Run + WebMCP |
| `src/render/*` — `d1-adapter`, `server`, `cron`, `env`, `r2-bucket` | Workers-native bindings |
| `Dockerfile`, `render.yaml`, `ecosystem.config.cjs` | One deploy target |
| The flat 80-tool registry | Skills, loaded on demand |

**The honest learning in that table**: Karna's most distinctive engineering — the anti-fabrication
layer — was compensation for models that narrated instead of acting. You built it well and it
worked. It is also now largely obsolete, because the tool loop got good. Building sophisticated
scaffolding around a model weakness is a bet that the weakness persists. It usually doesn't.

Design the new one so the *substrate* enforces truth (the page changed or it didn't), not so a
5-turn enforcement loop badgers the model into honesty.

---

## 4. What's new since Karna was built

Genuinely new primitives, not repackaging:

- **[Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk)** — the
  loop, permission system, subagents, and hooks that power Claude Code, as a library. This is
  `agent.ts`'s replacement, and it's ~7,000 lines you no longer maintain.
- **Agent Skills** — a folder with a `SKILL.md`, loaded on demand by progressive disclosure, costing
  nothing until needed. Karna's `create_skill` produced prompt blobs; Karna's 80 tools all load
  every turn. Skills fix both. *The SDK is the loop, MCP is what it can do, Skills are what it knows.*
- **[`@cloudflare/computer`](https://blog.cloudflare.com/cloudflare-computer/)** — a SQLite-backed
  filesystem on a Durable Object, with isolate *and* container execution over the same FS.
  Per-user, persistent. (See `docs/cloudflare-compute-integration.md`.)
- **[Browser Run](https://developers.cloudflare.com/browser-run/limits/)** — headless Chromium as a
  Worker binding. 120 concurrent on paid, `keep_alive` to 10 min, Playwright/Stagehand.
- **[WebMCP](https://blog.cloudflare.com/webmcp/)** — the interesting one. Shipping experimentally in
  Chrome 146 as `document.modelContext`; sites expose *typed tools* instead of forcing
  screenshot→analyze→click loops. Cloudflare's dev preview (Aug 6, 2026) adds it to any site behind
  their proxy with one switch, no origin changes.

WebMCP deserves a beat, because it's aimed squarely at the hardest problem in all three repos.
Poppin hand-rolled "sanitized semantic snapshots and bounded batches" to give Codex something better
than pixels. Karna pays a vendor to run a vision loop over a remote browser. **WebMCP is that problem
being solved at the platform layer.** Poppin's `BrowserAgentEngine` becomes a WebMCP client, and its
best idea — visible tabs with pause/takeover — survives while the brittle part underneath gets deleted.

---

## 5. The architecture

```
                    ┌─────────────────────────────────────────┐
                    │  Margin — one Cloudflare Worker         │
                    │                                         │
   iPad / phone ───►│  Tandem substrate (forked)              │
   browser PWA      │    pages · databases · canvas · search  │
                    │    comments = the agent queue           │
                    │    CollabRoom DO (realtime)             │
                    │                                         │
                    │  Agent runtime                          │
                    │    Claude Agent SDK loop                │
                    │    Skills/ (progressive disclosure)     │
                    │    MCP clients → Google, Gmail, GitHub  │
                    │                                         │
   Poppin ─────────►│  Workspace DO (@cloudflare/computer)    │
   (optional        │    per-user FS · isolate + container    │
    cockpit)        │                                         │
                    │  Browser Run + WebMCP                   │
                    │                                         │
                    │  D1 · R2 · Vectorize · Cron Triggers    │
                    └─────────────────────────────────────────┘
```

One Worker. One deploy. One set of secrets. Poppin talks to the same REST API it already
speaks (`X-API-Key`), so the desktop cockpit is genuinely optional rather than a second app.

### The one idea worth stealing from Poppin

*"The prompt bar is the only task-entry surface; do not build a separate chat transcript."*

That constraint is the reason Poppin feels calm and Karna feels like a chat app with tools bolted
on. Carry it over verbatim. **No transcript.** Instructions are comments, results are page edits,
history is version history.

---

## 6. Build order

Sized for evenings, ordered so the first hit of joy lands early.

**Weekend 1 — the loop, end to end.** Fork Tandem. Stand up an Agent SDK worker with exactly three
tools: `read_page`, `edit_section`, `resolve_comment`. Poll `agent-comments?status=open`, act, resolve.
Nothing else. **You'll be able to highlight a sentence in your own doc, write "tighten this," and
watch it change.** That's the app. Everything after is surface area.

**Weekend 2 — memory that lives in pages.** Port Karna's `memory.ts` (two-tier, compaction, decay,
embeddings — it's the best engineering in the repo) but make long-term memory *a Tandem page you can
open and edit*. The killer feature of doc-as-substrate: you can fix a wrong memory by editing a
paragraph. Vectorize is already bound.

**Weekend 3 — Google, as MCP.** Port the OAuth and the Sheets/Calendar/Docs/Drive/Gmail surface,
but behind an MCP server instead of 25 registry entries. Keep the guardrails you learned the hard
way: mandatory recipient lookup before send, verify-after-write, `gmail_send` → `gmail_draft` as the
safe substitute.

**Weekend 4 — digests become living pages.** Not a message pushed at you at 7am. A page that
rewrites itself and is *there* when you open it. The cron fires an agent turn that edits the page.

**Weekend 5 — the workspace.** `@cloudflare/computer` DO keyed by user. `exec` gated behind the
approval model. Now the agent can actually compute — and `src/services/docx.ts`'s hand-rolled ZIP
parser dies of natural causes.

**Weekend 6+ — browsing, if you still want it.** Browser Run + WebMCP where sites support it.
Poppin as the cockpit for watching it happen. Do this last: it's the most fun to demo and the least
load-bearing for daily use.

---

## 7. Unify the approval model on day one

Both apps have one. Neither has a good one. Build it *once*, in the substrate, before there are two
callers again:

- Every action declares a blast radius. Karna's `isIrreversibleTool()` already fails closed on
  unknown tools — keep that instinct.
- Every gate offers a **safe substitute** where one exists. `SAFE_SUBSTITUTES` (send → draft) is the
  best idea in `toolTiers.ts` and it's currently one entry long. Generalize it: publish → preview,
  push → PR, delete → archive.
- Every gate renders **in the document**, as a block you approve inline. Not a modal, not a Telegram
  button. Consistent with everything else.

Poppin's list of critical actions is the better *taxonomy*; Karna's `toolTiers.ts` is the better
*mechanism*. Take both.

---

## 8. Honest caveats

- I read all three repos' structure, docs, configs, and the load-bearing files (`udm.ts`,
  `browser.ts`, `toolTiers.ts`, Tandem's agent routes and CODING_AGENTS.md, Poppin's development
  guide). I did **not** read all 66,000 lines. Karna's `agent.ts` in particular I sampled.
- "Abort Karna" is a real cost. It has working Google OAuth, a working Telegram bot, and
  encryption/vault code that's tedious to rewrite. The plan above ports rather than rewrites those
  three specifically, for that reason.
- The Agent SDK will not be a drop-in for a 7,154-line hand-rolled agent. Expect the router's
  intent-classification behaviour to shift, and expect to miss some of the enforcement layer before
  you're glad it's gone.
- WebMCP is a developer preview against an experimental Chrome API. Treat weekend 6 as speculative.

---

## 9. Why this is worth doing

You have three good ideas sitting in three repos that can't see each other:

- an agent with real memory and real guardrails, trapped in a chat box
- a document substrate where instructions are already executable, with no agent living in it
- a browser that knows how to let a human watch and take over, wired to the wrong brain

The new app isn't a fourth idea. It's the first time those three are in the same process.

---

## Sources

- [Your agent needs a computer, not a container — `@cloudflare/computer`](https://blog.cloudflare.com/cloudflare-computer/)
- [Give any website a WebMCP interface](https://blog.cloudflare.com/webmcp/)
- [WebMCP · Browser Run docs](https://developers.cloudflare.com/browser-run/features/webmcp/)
- [Browser Run limits](https://developers.cloudflare.com/browser-run/limits/)
- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk)
- [Agents have their own computers with Sandboxes GA](https://blog.cloudflare.com/sandbox-ga/)
- Repos: [poppin-browser](https://github.com/ashwinjyoti-ship-it/poppin-browser) ·
  [unified-doc-management](https://github.com/ashwinjyoti-ship-it/unified-doc-management)
