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
│       ├── crypto.ts               # AES-GCM encryption helpers
│       ├── llm/provider.ts         # Multi-provider LLM abstraction + failover
│       └── __tests__/agent.test.ts # Unit tests
├── migrations/                     # 17 D1 SQL migrations (numbered 0001–0018)
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
- **Dev branch:** `claude/fix-mobile-desktop-sync-TjZdj`

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
