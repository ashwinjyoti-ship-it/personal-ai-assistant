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
| External APIs | Google Workspace, Telegram Bot |
| Encryption | Web Crypto API (AES-GCM) for credential storage |

---

## Repository Structure

```
personal-ai-assistant/
├── src/
│   ├── index.tsx                   # App entry point, route registration
│   ├── frontend.ts                 # Embedded SPA (HTML + JS + CSS)
│   ├── types/index.ts              # Shared TypeScript types (LLMOptions, LLMProvider, etc.)
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
│       ├── agent.ts                # Core LLM agent runner (~4,000 lines)
│       ├── router.ts               # Intent classifier + 3-tier dispatch
│       ├── memory.ts               # Two-tier memory management
│       ├── google.ts               # Google OAuth 2.0 + token management
│       ├── gmail.ts                # Gmail API service layer
│       ├── google-apis.ts          # Public Google APIs (Places, Directions, etc.)
│       ├── briefing.ts             # Evening briefing generation
│       ├── research.ts             # Web research
│       ├── crypto.ts               # AES-GCM encryption helpers
│       ├── llm/provider.ts         # Multi-provider LLM abstraction + failover
│       └── __tests__/agent.test.ts # Unit tests
├── migrations/                     # D1 SQL migrations (numbered 0001–0018)
├── cron-worker/                    # Separate Cloudflare Worker
│   ├── worker.js                   # Three-phase cron: dispatch → agent tasks → proactive
│   └── wrangler.json
├── public/                         # PWA assets (manifest.json, icons), CSS
├── wrangler.jsonc                  # Cloudflare Pages config, D1 binding, secrets
├── vite.config.ts                  # Vite build config (Hono plugin)
└── .github/workflows/deploy.yml   # CI/CD: auto-deploy to Pages on push to main
```

---

## Core Services

### `src/services/agent.ts` — Agent Runner
Central piece. Exposes `runAgentRouted()` as the main entry point, which applies a **3-tier dispatch** before falling back to the full agentic loop:

- **Tier 1** — Deterministic dispatch: intent + all params present in message → calls tool directly via `executeToolWithLogging()`, no LLM involved
- **Tier 2** — Context dispatch: intent clear, params resolved from recent conversation (regex over message history) → same direct dispatch
- **Tier 3** — Full agentic loop: LLM → tool calls → results → repeat (max 10 turns); `tool_choice: required` forced on turn 0 for high-confidence workspace requests
- **Hallucination enforcement**: post-loop guard catches 14 mutation tools where the LLM claims completion without calling the tool (`ACTION_CLAIM_RULES` + streaming equivalent)
- Server-side date injection, workspace write validation, `RESEARCH_TIMEOUT_MS = 20_000`

### `src/services/router.ts` — Intent Router
Fast keyword-based classifier (<5ms, ~80% accuracy):
- `classifyIntentFast()` → `'conversation'` (no tools) or `'multi'` (full agent) with confidence score
- `detectDeterministicOp(text)` → Tier 1: matches 6 zero-param or URL-present operations (drive_delete_file, drive_list, drive_search, gmail_unread_count, list_calendar_events, list_schedules)
- `detectTierTwoOp(text, context)` → Tier 2: intent clear in message, URL/params extracted from recent conversation (drive_delete_file, drive_organise)

### `src/services/llm/provider.ts` — LLM Provider
Abstracts over all providers with automatic failover. Supports `toolChoice: 'required'` (Anthropic: `tool_choice: {type:'any'}`, OpenAI-compatible: `tool_choice: 'required'`). Per-user credential vaults.

### `src/services/memory.ts` — Memory
Two-tier: **working memory** (current session, high-importance entries injected into every prompt) and **long-term memory** (compacted summaries, facts, preferences).

### `src/services/google.ts` + `gmail.ts` — Google Integration
OAuth 2.0 flow, token refresh, full Workspace API: Sheets, Docs, Calendar, Drive, Gmail.

### `src/services/briefing.ts` — Proactive Briefings
Evening briefings combining calendar events, Gmail digest, tasks, and news. Delivered via Telegram. Includes news deduplication.

---

## Request Dispatch Flow

```
POST /api/chat/send
  ↓
runAgentRouted()
  ├─ classifyIntentFast() → 'conversation' → runConversationAgent() [single LLM call, no tools]
  └─ 'multi'
       ├─ detectDeterministicOp()  → match → dispatchToolDirectly() [Tier 1, no LLM]
       ├─ detectTierTwoOp()        → match → dispatchToolDirectly() [Tier 2, no LLM]
       └─ runAgent() [Tier 3: full agentic loop + toolChoice forcing + hallucination enforcement]
```

---

## Hallucination Enforcement (`ACTION_CLAIM_RULES`)

Post-loop guard in both `runAgent` and `runAgentStreaming`. Detects when the LLM narrates a completed action without calling the required tool, then forces the tool call in a follow-up turn.

**14 rules (applied to Tier 3 only — Tiers 1 & 2 are hallucination-proof by design):**

| Tools enforced | Trigger phrase examples |
|----------------|------------------------|
| `create_schedule`, `update_schedule` | "reminder set", "scheduled for", "set for 9am" |
| `gmail_send` | "email sent", "I've sent", "message sent" |
| `store_memory` | "I've remembered", "saved to memory", "noted that" |
| `append_sheet`, `write_sheet` | "added row", "updated the sheet", "appended to spreadsheet" |
| `create_calendar_event` | "event created", "added to calendar" |
| `drive_delete_file` | "moved to trash", "file deleted/trashed" |
| `drive_organise` | "moved the file to", "renamed the doc" |
| `create_doc` | "created a Google Doc" |
| `append_to_doc` | "appended to the doc", "added content to document" |
| `create_sheet` | "created a spreadsheet" |
| `gmail_draft` | "drafted an email", "draft is ready" |
| `gmail_modify` | "archived the email", "marked as read/starred" |
| `delete_schedule` | "deleted the reminder/task" |
| `toggle_schedule` | "disabled/paused the reminder" |

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
| `tool_execution_log` | Tool call audit trail (records Tier 1/2 direct dispatches as `agentType: 'direct'`) |
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

A separate Cloudflare Worker (`cron-worker/worker.js`) fires every minute:
1. **Job dispatch** — find due cron jobs, mark active, prevent overlap via lock
2. **Agent tasks** — execute each scheduled job via `/api/system/cron/run-task/:id`
3. **Proactive** — trigger briefings, meeting reminders, trigger evaluation

Auth uses a shared `CRON_SECRET`. **Cron.org is redundant** — do not configure. Any Cron.org jobs pointing at `/api/proactive/cron/*` will return 401 and generate failure emails.

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
- `dist/` is gitignored but currently tracked — CI rebuilds it fresh on every deploy

---

## Google Drive Tools

Five Drive tools in `src/services/agent.ts`:

| Tool | Purpose |
|------|---------|
| `drive_list` | List files in Drive with optional search query |
| `drive_search` | Full-text search across Drive |
| `drive_read_file` | Read file content: Docs (text/plain), Sheets (CSV → JSON rows), PDFs (Anthropic doc API), other (plain text) |
| `drive_delete_file` | Move file to trash by URL or ID (recoverable 30 days) |
| `drive_organise` | Move to named folder and/or rename; creates folder if missing |

All accept any Drive/Docs URL format or bare file IDs. `drive_read_file` returns Sheet rows as a JSON array for direct pass-through to `write_sheet`/`append_sheet`.

---

## Agent Behaviour — Scheduling Rules

In `buildSystemPrompt()`:
- **Reminder content rule**: Call `create_schedule` immediately with user's exact words. Never ask about purpose. Only permitted clarification: time completely absent with no sensible default.
- **Time transparency rule**: When no time specified, pick a sensible default (9 AM next workday) and state it: "Reminder set for [date + time]. Reply 'change time' to adjust."

---

## Agent Behaviour — Memory Tools

| Tool | Purpose |
|------|---------|
| `store_memory` | Permanent rules, preferences, resource IDs (importance 1–10; ≥7 → working memory, injected every prompt) |
| `search_memory` | Search entries; results include `[id:N]` prefix |
| `delete_memory` | Remove by ID — must call `search_memory` first |
| `update_memory` | Replace content by ID |

`store_memory` is for permanent rules only. One-off tasks go to `create_schedule`.

---

## Agent Behaviour — Resumable Google Writes

All Google write tools save a JSON payload to working memory (importance 9) when Google is disconnected, enabling resumption without re-doing upstream work.

| Tool | Memory title |
|------|-------------|
| `create_doc` | `Pending Google Doc save: "{title}"` |
| `append_to_doc` | `Pending append to doc: "{document_id}"` |
| `create_sheet` | `Pending spreadsheet create: "{title}"` |
| `write_sheet` | `Pending sheet write: {id} — {range}` |
| `append_sheet` | `Pending sheet append: {id} — {range}` |
| `gmail_send` | `Pending email: "{subject}"` |
| `gmail_draft` | `Pending draft: "{subject}"` |
| `create_calendar_event` | `Pending calendar event: "{summary}"` |

On retry phrases ("try again", "send the pending email"), agent calls `search_memory` → parses payload → calls tool → `delete_memory` on success.

**Multi-tab sheet progress**: after each `write_sheet`, agent stores `Sheet progress: {spreadsheet_id}` in memory. On failure mid-sequence, retry skips already-written tabs.

**Research caching**: successful `research` calls store a 600-char summary to long-term memory (`Research: {query}`, importance 6).

---

## Agent Behaviour — Personality & Settings

- Personality hardcoded in `buildSystemPrompt()` as `DEFAULT_PERSONALITY`. Not user-editable via UI.
- Core principles: directness, no preamble, admit uncertainty, no simulated emotions, user autonomy.
- **Role** field in Settings is injected into every system prompt for professional context.
- **Assistant Name** defaults to "Karna" but is user-configurable.

---

## Agent Behaviour — Streaming Persistence

In `runAgentStreaming()`: assistant message stored in D1 **before** SSE chunks are yielded. Ensures persistence if Cloudflare worker is killed mid-stream.

---

## File Storage — R2 Integration

R2 bucket `karna-documents` bound as `DOCUMENTS_BUCKET` in `wrangler.jsonc`.

- **Upload**: raw bytes → R2 (UUID key); D1 `uploaded_files.file_data` stores sentinel `'r2'`. Falls back to base64 in D1 if bucket unbound.
- **Parse**: `parse_document` reads `file_data`; if `'r2'`, fetches from R2 by UUID → base64 → normal extraction path.
- `parse_document` and `drive_read_file` results capped at 20,000 chars; all other tools at 8,000.

---

## UI

- **Theme**: Paper & Circuit (`public/static/karna.css`). Assistant replies in Courier Prime (typewriter font), 15px/1.75 line-height.
- **PWA**: installable on iOS via Safari "Add to Home Screen". `public/manifest.json` + icons. No service worker.
- **Notifications**: bell icon with individual dismiss + "Mark all done" (DELETE /api/chat/notifications/all registered before /:id to prevent Hono capturing "all" as id param).
- **Google Disconnected Banner**: amber banner shown when Google OAuth disconnected. Polled every 5 minutes.
- **Attachment button**: bottom-left of textarea (flex sibling in input-wrap, not absolutely positioned).
