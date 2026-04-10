# Karna — Build Context

## What It Is
Karna is a serverless personal AI assistant built on Cloudflare infrastructure. It combines conversational AI, deep Google Workspace integration, proactive scheduling, and multi-channel communication into a single deployable unit.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Hosting | Cloudflare Pages |
| Database | Cloudflare D1 (SQLite) |
| Scheduled jobs | Cloudflare Workers (separate cron-worker) |
| HTTP framework | Hono 4.x (TypeScript) |
| Frontend | Vanilla JS/HTML embedded SPA (`src/frontend.ts`) |
| Build | Vite + Wrangler |
| LLM providers | Anthropic, OpenAI, Grok, DeepSeek, Gemini, OpenRouter, Abacus |
| External APIs | Google Workspace, Telegram Bot, Browser Use Cloud |
| Encryption | Web Crypto API (AES-GCM) for credential storage |

---

## Repository Structure

```
personal-ai-assistant/
├── src/
│   ├── index.tsx                   # App entry point, route registration
│   ├── frontend.ts                 # Embedded SPA (HTML + JS + CSS)
│   ├── types/index.ts              # Shared TypeScript types
│   ├── routes/
│   │   ├── auth.ts                 # PIN auth, registration, session management
│   │   ├── chat.ts                 # Chat API, thread management, streaming SSE
│   │   ├── settings.ts             # Profile, credentials, memory, schedules, Google OAuth
│   │   ├── system.ts               # Health, heartbeat, cron execution, state machine
│   │   ├── proactive.ts            # Briefings, meeting reminders, trigger evaluation
│   │   └── channels/
│   │       ├── telegram.ts         # Telegram webhook handler
│   │       └── adapter.ts          # Channel message normalization
│   └── services/
│       ├── agent.ts                # Core LLM agent runner (~2,800 lines)
│       ├── router.ts               # Intent classifier + sub-agent routing
│       ├── memory.ts               # Two-tier memory management
│       ├── google.ts               # Google OAuth 2.0 + token management
│       ├── gmail.ts                # Gmail API service layer
│       ├── google-apis.ts          # Public Google APIs (Places, Directions, etc.)
│       ├── briefing.ts             # Evening briefing generation
│       ├── research.ts             # Web research
│       ├── browser.ts              # Browser Use Cloud REST client
│       ├── crypto.ts               # AES-GCM encryption helpers
│       ├── llm/provider.ts         # Multi-provider LLM abstraction + failover
│       └── __tests__/agent.test.ts # Unit tests
├── migrations/                     # 22 D1 SQL migrations (numbered 0001–0022)
├── cron-worker/                    # Separate Cloudflare Worker
│   ├── worker.js                   # Three-phase cron: dispatch → agent tasks → proactive
│   └── wrangler.json
├── public/
│   ├── static/                     # CSS + image assets
│   ├── manifest.json               # PWA web app manifest
│   ├── icon-192.png                # PWA home screen icon (192×192)
│   └── icon-512.png                # PWA home screen icon (512×512)
├── wrangler.jsonc                  # Cloudflare Pages config, D1 binding, secrets
├── vite.config.ts                  # Vite build config (Hono plugin)
├── tsconfig.json                   # TypeScript: ESNext, strict, Hono JSX
├── package.json
└── .github/workflows/deploy.yml   # CI/CD: auto-deploy to Pages on push to main
```

---

## Core Services

### `src/services/agent.ts` — Agent Runner
The central piece. Runs a multi-turn agentic loop:
- Calls LLM → receives tool calls → executes tools (in parallel via `Promise.all`) → feeds results back → repeats until final response
- Tool enforcement layer: 5-turn mini-loop forces tool execution when LLM tries to narrate instead of act
- Post-write verification (e.g. read_sheet after write_sheet)
- Server-side date injection to prevent hallucinations
- Workspace write validation
- `RESEARCH_TIMEOUT_MS = 20000` (20s cap on research calls)

### `src/services/router.ts` — Intent Router
Fast keyword-based classifier (~80% accuracy, <5ms) routes requests to sub-agents:
- **Scheduler Agent** — reminders, recurring tasks, one-time events
- **Workspace Agent** — Google Sheets, Docs, Calendar, Drive, Gmail
- **Research Agent** — web search, fact-checking, news
- **Conversation Agent** — general chat
- Falls back to LLM classification when keywords are ambiguous

### `src/services/llm/provider.ts` — LLM Provider
Abstracts over all LLM providers with automatic failover. Supports per-user credential vaults so users can supply their own API keys.

### `src/services/memory.ts` — Memory
Two-tier system:
- **Working memory** — current session context
- **Long-term memory** — compacted summaries, facts, preferences, decisions, tasks

### `src/services/browser.ts` — Browser Use Cloud Client
Thin REST client over `https://api.browser-use.com/api/v2`. Uses raw `fetch()` for Cloudflare Worker compatibility (the `browser-use-sdk` npm package targets Node.js and is not used at runtime).
- `runBrowserTask(task, apiKey, opts?)` — POST /tasks, poll /tasks/{id}/status every 4s, return on `finished`/`stopped` or 55s timeout
- `getBrowserTaskStatus(taskId, apiKey)` — single poll for a previously started task

### `src/services/google.ts` + `gmail.ts` — Google Integration
OAuth 2.0 flow, token refresh, and full Workspace API coverage: Sheets, Docs, Calendar, Drive, Gmail (list/read/search/send/draft/forward/labels).

### `src/services/briefing.ts` — Proactive Briefings
Generates evening briefings combining calendar events, Gmail digest, tasks, and news. Delivered via Telegram. Includes news deduplication.

---

## Database Schema (Key Tables)

| Table | Purpose |
|-------|---------|
| `users` | Username, PIN hash, timezone, personality, Telegram chat ID |
| `sessions` | Auth tokens, 30-day expiry |
| `conversations` | Message history per user/channel |
| `threads` | Conversation grouping with title, archive flag |
| `memory` | Two-tier memory (working/long-term), typed entries |
| `credentials` | AES-GCM encrypted API keys/tokens per user per service |
| `cron_jobs` | Scheduled tasks with interval/daily/weekly/once types |
| `cron_execution_log` | Execution history + state machine |
| `briefings` | Generated briefing snapshots |
| `briefing_preferences` | Per-user briefing config |
| `briefing_seen_news` | News deduplication |
| `site_credentials` | AES-GCM encrypted site login credentials (username/password) for browser automation |
| `tool_execution_log` | Tool call audit trail |
| `error_log` | Categorized error tracking |
| `heartbeat_log` | System health metrics |

---

## API Surface

```
# Auth
GET    /api/auth/check
POST   /api/auth/setup
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/reset-pin
GET    /auth/google/callback

# Chat
POST   /api/chat/send
GET    /api/chat/threads
POST   /api/chat/threads
PUT    /api/chat/threads/:id
DELETE /api/chat/threads/:id
GET    /api/chat/threads/:id/messages
GET    /api/chat/dashboard

# Settings
GET/PUT    /api/settings/profile
GET/PUT    /api/settings/credentials
GET/POST/DELETE /api/settings/memory
GET/PUT/DELETE  /api/settings/schedules
GET        /api/settings/google/*
GET/PUT    /api/settings/site-vault
DELETE     /api/settings/site-vault/:id

# System
GET    /api/system/health
POST   /api/system/heartbeat
GET    /api/system/status
POST   /api/system/cron/execute
POST   /api/system/cron/run-task/:id

# Proactive
POST   /api/proactive/cron/evening-briefing
POST   /api/proactive/cron/evaluate-triggers
POST   /api/proactive/cron/meeting-reminders

# Telegram
POST   /api/telegram/webhook
POST   /api/telegram/setup-webhook
```

---

## Cron Architecture

A separate Cloudflare Worker (`cron-worker/worker.js`) fires every minute and runs three phases:
1. **Job dispatch** — find due cron jobs, mark active, prevent overlap via lock
2. **Agent tasks** — execute each scheduled job via `/api/system/cron/run-task/:id`
3. **Proactive** — trigger briefings, meeting reminders, trigger evaluation

Auth between cron-worker and main app uses a shared `CRON_SECRET`.

---

## Development

```bash
npm run dev              # Local Vite dev server
npm run dev:sandbox      # Local with D1 emulation (Wrangler)
npm run build            # Production build for Cloudflare Pages
npm run deploy           # Deploy to Cloudflare Pages
npm run db:migrate:local # Apply DB migrations locally
npm run test             # Run unit tests (Vitest)
```

**Environment variables** (via `wrangler secret put` or `.dev.vars`):
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GOOGLE_API_KEY` / `GOOGLE_CSE_ID`
- `CRON_SECRET`

---

## Deployment

- **Production URL:** https://karna-5xs.pages.dev
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys on push to `main`

---

## PWA / iOS Home Screen

Karna is installable as a full-screen PWA on iOS via Safari "Add to Home Screen".

**Files added:**
- `public/manifest.json` — Web App Manifest (name, icons, display: fullscreen, black theme)
- `public/icon-192.png` — 192×192 black/white "K" icon
- `public/icon-512.png` — 512×512 black/white "K" icon

**Meta tags in `src/frontend.ts`:**
```html
<meta name="theme-color" content="#000000">
<link rel="manifest" href="/manifest.json">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Karna">
```

**No service worker** — offline caching not useful for this app.

**To test on iOS:**
1. Open https://karna-5xs.pages.dev in Safari
2. Tap Share icon → "Add to Home Screen"
3. App launches fullscreen with black status bar

---

## Design System — Typography

Theme: **Paper & Circuit** (`public/static/karna.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | Cormorant Garamond, Georgia, serif | UI headings, section titles |
| `--font-body` | Inter, system sans-serif | General UI, labels, buttons |
| `--font-mono` | DM Mono, JetBrains Mono | Code blocks, inline code |
| `--font-typewriter` | Courier Prime, Courier New, monospace | Assistant reply text |

Assistant replies (`.msg-assistant`) use **Courier Prime** — a screen-optimised typewriter font that pairs naturally with the warm parchment aesthetic. Text is rendered at `15px / 1.75` line-height with solid `#1a1410` ink color for maximum contrast.

---

## Agent Behaviour — Scheduling Rules

Documented in `src/services/agent.ts` → `buildSystemPrompt()`:

- **Reminder content rule**: When the user says "remind me to X" or "set a reminder for X", the agent calls `create_schedule` immediately using the user's exact words as `action_description`. It never asks questions about reminder content or purpose. The only permitted clarification is if the time/date is completely absent and no default makes sense.
- **Time transparency rule**: When no time is specified, the agent picks a sensible default (9 AM next workday for tasks) and states it explicitly: "Reminder set for [date + time]. Reply 'change time' to adjust."

---

## Agent Behaviour — Memory Tools

Four memory tools available to the agent (`src/services/agent.ts`):

| Tool | Purpose |
|------|---------|
| `store_memory` | Save a permanent rule, preference, or reference (importance 1–10; importance ≥7 goes to working memory, injected into every prompt) |
| `search_memory` | Search stored entries; results include `[id:N]` prefix for use with delete/update |
| `delete_memory` | Remove an entry by ID — agent must call `search_memory` first to confirm ID |
| `update_memory` | Replace content of an existing entry by ID |

`store_memory` is for permanent rules only (writing style, standing instructions, frequently-used resource IDs). One-off tasks and reminders go to `create_schedule`, not memory.

---

## Agent Behaviour — Personality

Karna's personality is hardcoded in `buildSystemPrompt()` in `src/services/agent.ts` as `DEFAULT_PERSONALITY`. It is not user-editable via Settings (the `personality_prompt` DB column is retained but unused by the UI).

Core principles: directness, no preamble, admit uncertainty, no simulated emotions, user autonomy. Communication style: match user tone, default to brevity, flag ambiguity, avoid jargon.

---

## Settings — Profile Fields

| Field | Purpose |
|-------|---------|
| Name | Display name |
| Role | Professional context injected into every system prompt (e.g. "Founder", "Software Engineer"). Helps Karna tailor responses. |
| Assistant Name | What the assistant calls itself (default: Karna) |
| Telegram Chat ID | For proactive notifications and briefing delivery |
| Timezone | Used for scheduling defaults and time-aware responses |

---

## Agent Behaviour — Streaming Persistence

In `src/services/agent.ts` → `runAgentStreaming()`:

- Assistant message is stored in D1 **before** SSE chunks are yielded to the client. This ensures the reply is persisted even if the Cloudflare worker is killed after streaming begins (e.g. timeout on long tool-heavy requests like skill creation).
- The storage order: `storeMessage` → chunk loop → hallucination guard → `done` event.
- Same early-persist pattern applied to the fallback path (max turns exhausted).

---

## Notifications (Bell Icon)

- Individual **ok** button — deletes that single notification immediately
- **Mark all done** — shows `window.confirm` then calls `DELETE /api/chat/notifications/all` to delete every notification for the user
- Route ordering note: `DELETE /notifications/all` is registered **before** `DELETE /notifications/:id` in `src/routes/chat.ts` to prevent Hono capturing "all" as an id param

---

## File Storage — R2 Integration

Cloudflare R2 bucket `karna-documents` (account `cf39f049784caf415803b1a54fea336c`, region ENAM) is bound as `DOCUMENTS_BUCKET` in `wrangler.jsonc`.

**Upload flow (`src/routes/chat.ts` → `POST /api/chat/upload`):**
- If `DOCUMENTS_BUCKET` is bound: raw bytes go to R2 under the file's UUID key; D1 `uploaded_files.file_data` stores the sentinel string `'r2'`. No size limit enforced by app (100 MB cap in code).
- If `DOCUMENTS_BUCKET` is not bound: falls back to base64 in D1 (700 KB raw file limit).

**Parse flow (`src/services/agent.ts` → `parse_document` case):**
- Reads `file_data` from D1; if value is `'r2'`, fetches the object from R2 by file UUID, converts to base64, then continues the normal PDF/text extraction path.

**Error UX:** file-too-large error now instructs user to paste a Google Drive link as a workaround.

---

## Google Drive Management Tools

Five Drive tools available to the agent (`src/services/agent.ts`):

| Tool | Purpose |
|------|---------|
| `drive_list` | List files in Drive, optionally filtered by folder or query |
| `drive_search` | Full-text search across Drive |
| `drive_read_file` | Read file content (Docs, Sheets, PDFs, text) |
| `drive_delete_file` | Move a file to trash by URL or file ID (recoverable for 30 days) |
| `drive_organise` | Move a file to a named folder and/or rename it; creates folder if it doesn't exist. Reuses internal `moveFileToFolder()` helper. |

All tools accept Google Drive URLs (`/file/d/`, `/document/d/`, `/spreadsheets/d/`) or bare file IDs.

---

## Google Drive File Reading — `drive_read_file` Tool

New tool added to the agent (`src/services/agent.ts`):

| File type | Method |
|-----------|--------|
| Google Docs | Export via Drive API as `text/plain` |
| Google Sheets | Export as `text/csv` → parsed into `string[][]` JSON by `parseCsvToRows()` (RFC 4180 compliant) |
| Google Presentations | Export as `text/plain` |
| PDFs | Download raw bytes → extract via Anthropic document API (`pdfs-2024-09-25` beta) |
| Other | Download and return as plain text |

Accepts any Drive/Docs URL format: `/file/d/`, `/document/d/`, `/spreadsheets/d/`, `/presentation/d/`, `?id=`, bare file ID.

**Sheet return format:** rows are embedded as a JSON array in the tool result so the LLM can pass them directly to `write_sheet`/`append_sheet` without re-parsing.

System prompt updated: if user pastes a Drive link, use `drive_read_file` directly — no upload needed.

---

## Agent Behaviour — Multi-Step Completion Rule

Added to `Response Style` in `buildSystemPrompt()`:

> **Every multi-step action MUST end with an explicit completion reply.** Never silently finish. Success: confirm what was done + include relevant links. Failure: state what failed, what completed before it, and what the user should do next. Applies to all workflows: sheets, docs, email, calendar, reminders, Drive, research, etc.

---

## Agent Behaviour — Sheet Population from Documents

System prompt additions in the Document Parsing section:

- **Multi-tab sheets**: if a document has multiple sections (e.g. Audio, Backline, Networking), create one tab per section and call `write_sheet` for EVERY tab before replying — do not stop after the first.
- **Drive → Sheet**: `drive_read_file` on a Google Sheet returns rows as a JSON array; pass directly as `values` to `write_sheet` — do not re-parse.
- **Drive → PDF**: extracted text returned; identify structured sections, then write each to its tab.

---

## Error Handling — 429 Rate Limit Consistency

Previously: streaming path (desktop) showed raw Anthropic error text; non-streaming path (mobile) showed a generic fallback message.

Fix: both `/send` and `/stream` error handlers now detect `'429'`, `'rate limit'`, and `'Too Many Requests'` and return a consistent message: *"Rate limit reached — the AI provider is temporarily throttling requests. Please wait a moment and try again."* Streaming path converts the raw error before yielding the SSE error event.

---

## UI — Attachment Button Position

Clip (📎) button moved from `input-actions` (right of textarea, adjacent to Send) to **bottom-left corner of the textarea** (absolute positioned at `bottom:4px left:4px` inside a `position:relative` wrapper). Textarea gets `padding-bottom:40px` to prevent typed text hiding behind the button.

---

## Document Merge — Bug Fixes

Three bugs fixed that caused the agent to "die halfway" when merging 2 uploaded documents into a Google Doc:

**1. `create_doc` partial-success error (`src/services/agent.ts`)**
Previously, `createDocument` and `appendText` shared a single try/catch. If the document was created successfully but `appendText` failed (network, content issue), the error said "Failed to create document" — hiding the doc URL and leaving an orphaned empty file in Drive. Fix: split into two independent try/catch blocks. If `appendText` fails, returns a partial-success message with the doc URL and instructions to use `append_to_doc`.

**2. Tool result cap too low for document tools (`src/services/agent.ts` — both streaming and non-streaming paths)**
All tool results were uniformly capped at 8000 chars. `parse_document` on a long PDF would truncate content, causing merged documents to be incomplete. Fix: `parse_document` and `drive_read_file` results are now capped at 20000 chars; all other tools remain at 8000.

**3. `appendText` invalid insert index for empty docs (`src/services/google.ts`)**
`appendText` computed `insertIndex = lastElement.endIndex - 1`. For an edge-case empty document this could yield 0, which the Google Docs API rejects (valid range starts at 1). Fix: `Math.max(1, ...)` guard ensures the index is always ≥ 1.

---

## Agent Behaviour — Resumable Google Writes (Temp Memory)

All Google write tools save their pending payload to working memory (importance 9) when Google is not connected, so the operation can be resumed without re-doing expensive upstream work (document parsing, research, etc.).

### Tools covered and memory entry titles

| Tool | Memory title | Payload fields |
|------|-------------|----------------|
| `create_doc` | `Pending Google Doc save: "{title}"` | tool, title, content, folder_name |
| `append_to_doc` | `Pending append to doc: "{document_id}"` | tool, document_id, content |
| `create_sheet` | `Pending spreadsheet create: "{title}"` | tool, title, sheet_names, folder_name |
| `write_sheet` | `Pending sheet write: {id} — {range}` | tool, spreadsheet_id, range, values (capped 15k chars) |
| `append_sheet` | `Pending sheet append: {id} — {range}` | tool, spreadsheet_id, range, values |
| `gmail_send` | `Pending email: "{subject}"` | tool, to, subject, body, cc |
| `gmail_draft` | `Pending draft: "{subject}"` | tool, to, subject, body, cc |
| `create_calendar_event` | `Pending calendar event: "{summary}"` | tool, summary, start/end_datetime, description, location, attendees, calendar_id |

Importance 9 → working tier → injected into every subsequent prompt, survives `trimLargeHistoryMessages()` (12,000 char trim threshold). `memory.store()` deduplicates by `(user_id, type, title)` — repeated failures update the existing entry, no duplicates.

### Research caching

After a successful `research` tool call, a 600-char summary of the report is stored to long-term memory (importance 6, title `Research: {query}`). This allows the agent to reference research findings in follow-up turns even after the full result has been trimmed from conversation history.

### Recovery (system prompt instruction)

On user retry phrases ("try again", "send the pending email", "create the pending event", etc.) the agent:
1. Calls `search_memory` with the relevant prefix (`'Pending Google Doc'`, `'Pending email'`, `'Pending calendar event'`, `'Pending sheet'`, `'Research:'`)
2. Parses the JSON payload
3. Calls the original tool with recovered args
4. Calls `delete_memory [id:N]` to clean up after success

### Multi-tab sheet progress tracking (system prompt instruction)

When writing a multi-tab spreadsheet, after each successful `write_sheet` the agent calls `store_memory` to record which tabs are done (title: `Sheet progress: {spreadsheet_id}`). On failure mid-sequence, the retry reads this progress entry and skips already-written tabs to avoid duplicate data.

---

## Agent Behaviour — Tool Call Placeholder in Message History

When the LLM makes tool calls without emitting text content, both `runAgent` and `runAgentStreaming` push a placeholder assistant message to maintain the required user/assistant alternation pattern. This placeholder now includes the tool name **and key arguments** (excluding large fields like `content`, `values`, `body`):

```
[calling: create_doc(title="Essay on X", folder_name="writings")]
```

This prevents the LLM from repeating tool calls it already made — it can see what it called and with what arguments. Previously the placeholder was just `[calling: create_doc]` with no args, causing the LLM to re-call `create_doc` on subsequent turns (resulting in duplicate documents).

`create_doc` is additionally marked **single-use per request** in the system prompt: once it returns a document ID and URL, reply immediately — never call it again for the same request.

`toolsCalledList` is declared and populated in both `runAgent` (line ~3025) and `runAgentStreaming` (declared after `const messages = [...]`). Previously it was missing from `runAgentStreaming`, causing a latent `ReferenceError` in the hallucination guard after the loop.

---

## Agent Behaviour — Folder Move Failure Clarity

When `create_doc` or `create_sheet` successfully creates a file but `moveFileToFolder()` fails (folder not found, API error), the error message now explicitly states the file **is saved** to Drive root:

```
Note: document saved to Drive root — could not place in folder "writings": <error>
```

Previously: `Could not move to folder "writings": <error>` — which the LLM misread as a full save failure and retried, creating duplicates.

---

## Cron Architecture — Cron.org Not Needed

The cron-worker handles all three proactive phases (briefing, meeting reminders, trigger evaluation) every minute via Cloudflare Cron Triggers. **Cron.org is redundant** and should not be configured. If Cron.org jobs exist, they will return 401 Unauthorized (missing `X-Cron-Secret` header) and generate failure emails. Delete any Cron.org jobs pointing at `/api/proactive/cron/*`.

---

## UI — Google Disconnected Warning Banner

`src/frontend.ts` includes a persistent amber banner (fixed bottom, dismissible) shown when `/api/settings/google/status` returns `{ connected: false, oauth_client_configured: true }`.

- **`checkGoogleConnectionBanner()`** — fetches status, creates/removes the banner element (`id="googleDisconnectedBanner"`)
- Called on page load from `renderMain()` and polled every 5 minutes via `setInterval`
- Also called immediately on explicit connect (dismisses banner) and disconnect (shows banner) — no waiting for next poll
- "Connect in Settings →" link navigates to `state.settingsSection = 'credentials'` (API Keys section containing the Google OAuth block)
- Dismiss X removes the element; reappears on next poll if still disconnected
- Not shown when `oauth_client_configured: false` (deployments without Google OAuth configured)

---

## Cloud Browser — Browser Use Cloud Integration

Karna can run real browser automation tasks via the [Browser Use Cloud](https://cloud.browser-use.com) API.
The agent describes a task in plain English; Browser Use Cloud runs a headless Chromium session with an AI
agent that navigates, clicks, fills forms, and returns structured output.

### Service: `src/services/browser.ts`

Thin REST client over `https://api.browser-use.com/api/v2`. Uses raw `fetch()` (not the `browser-use-sdk`
npm package) for guaranteed Cloudflare Worker compatibility.

| Function | Purpose |
|----------|---------|
| `runBrowserTask(task, apiKey, opts?)` | Create a task and poll until done or 55s timeout. `opts.secrets` passes credentials to Browser Use. |
| `getBrowserTaskStatus(taskId, apiKey)` | Single poll — check status of a running/timed-out task by ID |

**API contract:**
- Auth: `X-Browser-Use-API-Key: <key>` header (not `Authorization: Bearer`)
- Create: `POST /tasks` → `{ id, sessionId }`
- Poll: `GET /tasks/{id}/status` → `{ id, status, output, finishedAt }`
- Status values: `created | started | finished | stopped`
- `finished` → success; `stopped` → failure (output contains Browser Use's error reason)

### Agent Tools

| Tool | Purpose |
|------|---------|
| `browser_task` | Run a full browser workflow in one call. Optional `site_name` parameter looks up saved vault credentials and injects them as secrets. Returns output on success; stores task ID in working memory (importance 9) on timeout. |
| `browser_task_status` | Check a timed-out task's current status by task ID. Cleans up memory on completion. |

**System prompt rules:**
- `browser_task` must contain the ENTIRE multi-step workflow — never split across multiple calls
- All news/article results must use `[Title](URL)` markdown format

### Credentials

API key stored in the credentials vault under service name `browser_use_api_key`. No DB migration needed —
the existing `credentials` table handles it generically. User adds it in **Settings → API Keys → Browser Automation**.

### Async / Timeout Pattern

Browser tasks can take 30–120 seconds. Karna polls every 4s against a 55s deadline. On timeout: task ID →
working memory (importance 9) → user prompted to follow up. `browser_task_status` polls once and returns
current state, cleaning up the memory entry on completion.

---

## Secret Vault

A dedicated encrypted store for site login credentials used by browser automation.

### Database

`site_credentials` table (migration `0022_site_credentials.sql`):
- `(user_id, name)` unique — name is the user-chosen label (e.g. "LinkedIn", "MyBank")
- `encrypted_blob` — AES-GCM JSON: `{ username, password, notes? }`, same encryption as the credentials table
- Migration uses `CREATE TABLE IF NOT EXISTS` so GET /site-vault won't crash if not yet applied (catches the error, returns `{ entries: [] }`)

### API

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/settings/site-vault` | List all vault entries (id, name, created_at, updated_at) — no decryption |
| `PUT` | `/api/settings/site-vault` | Add or update an entry (upserts by name). Body: `{ name, username, password, notes?, pin }` |
| `DELETE` | `/api/settings/site-vault/:id` | Delete entry by id (scoped to user) |

All routes protected by global `settings.use('/*', requireAuth)`.

### Usage with Browser Automation

When calling `browser_task`, the agent passes `site_name` matching a vault entry label. The tool case:
1. Looks up `site_credentials WHERE user_id = ? AND name = ? COLLATE NOCASE`
2. Decrypts the blob with the user's PIN hash
3. Passes `{ username, password }` as `secrets` to `runBrowserTask`
4. Browser Use injects them as `{username}` / `{password}` placeholders in the task text

### UI

Secret Vault section rendered in **Settings → API Keys** tab (below API key sections). Supports add/edit and delete per entry. PIN required for both add and display.

### Production Deployment

Apply the migration before the vault UI is fully usable:
```bash
wrangler d1 migrations apply karna-db --remote
```
