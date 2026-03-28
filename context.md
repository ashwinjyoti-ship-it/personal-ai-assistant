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
├── public/static/                  # CSS + image assets
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
- **Dev branch:** `claude/understand-build-context-ykpvs`
