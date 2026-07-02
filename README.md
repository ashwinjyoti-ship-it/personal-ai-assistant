# Karna — Personal AI Assistant

## Project Overview
- **Name**: Karna
- **Version**: 4.2.1
- **Goal**: A serverless personal AI assistant with memory, scheduling, Google Workspace integration, tool enforcement, and multi-channel communication
- **Architecture**: Sub-agent router with intent classification, tool enforcement loops, and anti-fabrication integrity layer
- **Platform**: Cloudflare Pages + D1 Database
- **Production**: https://karna-5xs.pages.dev
- **GitHub**: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant

## Current Features

### Core
- Chat interface (dark theme, minimalist, mobile-responsive)
- Multi-user PIN authentication with forgot-credentials recovery
- LLM provider rotation (Anthropic, OpenAI, Grok, DeepSeek, Gemini, OpenRouter, Abacus AI — auto-rotate with cost guards and credit alerts). Anthropic/OpenRouter default to Claude Sonnet 5.
- Encrypted credential vault (AES-GCM, per-user, per-service)
- Two-tier memory (working + long-term with compaction)
- Natural language schedule/reminder creation
- Cron job engine with heartbeat monitoring
- Telegram bot (text + voice notes, webhook-based)

### Google Workspace (OAuth 2.0)
- **Google Sheets**: read, write (auto-clears stale columns), append, create
- **Google Calendar**: list events, create events with attendees
- **Google Docs**: create, read, append text
- **Google Drive**: list files, search files
- **Gmail**: list, read, search, send (CC/BCC), draft (CC), modify, unread count

### Sub-Agent Router
Intent classification via keyword heuristics (~80%, <5ms) with LLM fallback. Routes to focused sub-agents: scheduler, workspace, research, memory, conversation, or multi (full agent fallback). The `research` tool searches with Exa and synthesizes on Claude Sonnet 5, auto-escalating to Opus 4.8 only if Sonnet fails.

### Integrity Layer (v4.1.0+)
- **Tool enforcement loop**: 5-turn mini agentic loop forces LLM to execute tools when it narrates instead
- **Workspace write enforcement**: Detects read-without-write on fix/update requests
- **Scheduler enforcement**: Detects missing `create_schedule` with programmatic fallback parser
- **Fake [TOOLS_USED:] stripping**: Only system-verified tool tags stored
- **Auto-pad column cleanup**: `write_sheet` clears 4 extra columns beyond written data
- **Server-side date injection**: Prevents hallucinated dates in sheet entries
- **Mandatory recipient lookup**: `gmail_search` required before drafting/sending
- **Verify-after-write rule**: Workspace agent must `read_sheet` after any `write_sheet`

### Browser Automation
- Browser Use Cloud for Outlook and general web browsing
- Session reuse with 15-min timeout

### Additional
- Conversation threads with sidebar (Today/Yesterday/Older)
- Dashboard: status cards, usage stats, export
- Google Public APIs: Places, Directions, Translate, YouTube, Geocode
- Unified digests for morning, evening, weekly, and email summaries. See [docs/digests.md](docs/digests.md).

## API Routes

### Auth
| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/check` | GET | Check if users exist |
| `/api/auth/setup` | POST | First-time user registration |
| `/api/auth/login` | POST | PIN-based login |
| `/api/auth/me` | GET | Validate current session |
| `/api/auth/reset-pin` | POST | PIN recovery |

### Chat & Threads
| Route | Method | Description |
|-------|--------|-------------|
| `/api/chat/send` | POST | Send message with thread_id |
| `/api/chat/threads` | GET/POST | List or create threads |
| `/api/chat/threads/:id` | PUT/DELETE | Update or delete thread |
| `/api/chat/threads/:id/messages` | GET | Get messages for a thread |
| `/api/chat/dashboard` | GET | Dashboard data |

### Settings
| Route | Method | Description |
|-------|--------|-------------|
| `/api/settings/profile` | GET/PUT | Profile management |
| `/api/settings/credentials` | GET/PUT/DELETE | Credential vault |
| `/api/settings/memory` | GET/POST/DELETE | Memory management |
| `/api/settings/schedules` | GET/PUT/DELETE | Schedule management |
| `/api/settings/google/*` | Various | Google OAuth status, auth URL, disconnect, test |

### Telegram
| Route | Method | Description |
|-------|--------|-------------|
| `/api/telegram/webhook` | POST | Telegram webhook receiver |
| `/api/telegram/setup-webhook` | POST | Register webhook URL |

### Digests
| Route | Method | Description |
|-------|--------|-------------|
| `/api/digests` | GET | List recent morning/evening/weekly/email digests |
| `/api/digests/:id` | GET/DELETE | Read or delete a digest |
| `/api/digests/generate` | POST | Manual generation without notification delivery |
| `/api/digests/:id/items/:itemId/toggle` | POST | Toggle a digest checklist item |
| `/api/digests/:id/resend` | POST | Re-deliver a stored digest |
| `/api/digests/configs` | GET/PUT | Read all configs or update one via `?kind=` |
| `/api/digests/configs/reset` | POST | Reset one config via `?kind=` |
| `/api/digests/cron/tick` | POST | Cron entry point for all due digests (`X-Cron-Secret`) |
| `/api/digests/cron/meeting-reminders` | POST | Cron entry point for calendar reminders (`X-Cron-Secret`) |

## Data Architecture
- **D1 Tables**: users, sessions, credentials, conversations, threads, memory, cron_jobs, cron_execution_log, notifications, error_log, digest_configs, digests, digest_items, tool_execution_log
- **Encryption**: AES-GCM via Web Crypto API
- **Auth**: PIN + SHA-256, 30-day session tokens

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Tech Stack**: Hono + TypeScript + Vite + Cloudflare D1
- **Version**: 4.2.1
- **Last Updated**: 2026-07-01

## Split Architecture (Cloudflare Pages + Render Worker)

Karna now supports a split runtime model:

- Cloudflare Pages/Workers is the lightweight gateway (fast auth/session checks, thread listing, settings reads, Telegram webhook ACK).
- Render Background Worker is the long-running backend (chat orchestration, heavy tool chains, browser automation, cron, digest pipelines).
- Cloudflare D1 remains the system database.
- Cloudflare R2 remains the object/document store.

### Required environment variables

#### Cloudflare Pages / Worker
- `ENABLE_RENDER_PROXY=true`
- `RENDER_BACKEND_URL`
- `RENDER_API_SECRET`
- `RENDER_PROXY_TIMEOUT_MS=8000` (short API routes: auth, settings, etc.)
- Optional `RENDER_PROXY_TIMEOUT_MS_LONG=310000` — only if you want to override the built-in default for `/api/chat` and `/api/telegram` (defaults to **310000** when unset, so you do **not** need this var on Cloudflare)
- Existing app secrets (Google, Telegram, LLM provider keys, etc.)

#### Render Background Worker

**Proxy mode (today):**
- `RENDER_API_SECRET`
- `LEGACY_API_BASE_URL` (current Cloudflare API base, e.g. `https://karna-5xs.pages.dev`)
- `ASYNC_ACK_ROUTES=true` (optional immediate 202 for chat send + telegram webhook)

**Full backend on Render (Phase A — `RENDER_RUN_NATIVE_APP=true`):**
- Render serves the **entire** Karna API natively (`auth`, `chat`, `settings`, `system`, `telegram`, etc.) by mounting the same Hono app exported from `src/index.tsx`, with Cloudflare-compatible bindings injected per request via `createRenderEnv()` (`src/render/server.ts`).
- Runs against **remote Cloudflare D1** (libsql adapter) and **R2** (S3 shim) — no data migration; Cloudflare stays the database/storage layer.
- Must run as a Render **web service** (public URL), not a background worker.
- Default (`RENDER_RUN_NATIVE_APP` unset/`false`) keeps the legacy proxy behaviour, so the switch is fully reversible.
- Local/CI testing: set `RENDER_D1_LIBSQL_URL=file:./local.sqlite` to point the D1 adapter at a local SQLite file.
- Still Cloudflare-only: `AI` + `VECTORIZE` (document semantic search / `search_library`). See [docs/render-full-migration.md](docs/render-full-migration.md).

**Native Telegram on Render (Phase 3+):**
- `POST /api/telegram/webhook` is handled on Render (`src/render/server.ts`) — responds `{ ok: true }` immediately and runs `processTelegramUpdate` in the background
- Telegram calls this URL **without** `x-render-api-secret` (public webhook path)
- `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_D1_API_TOKEN` — remote D1 via libsql HTTP (not the REST management API)
- D1 libsql URL: `https://{CLOUDFLARE_ACCOUNT_ID}-{CLOUDFLARE_D1_DATABASE_ID}.d1.d1.cloudflare.com` (see `src/render/d1.ts`)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_API_KEY`, `GOOGLE_CSE_ID` — mirror Cloudflare Pages secrets (OAuth, search, `create_doc`, etc.)
- `CLOUDFLARE_R2_ACCOUNT_ID`, `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`, `CLOUDFLARE_R2_BUCKET_NAME` — optional; enables `DOCUMENTS_BUCKET` for `parse_document` on large uploads
- **`AI` and `VECTORIZE` are not available on Render** (Cloudflare Worker bindings only). `search_library` and Workers AI embeddings still require the CF path or a future proxy.

**Until Phase 4 cutover:** keep registering the Telegram webhook on Cloudflare Pages unless you intentionally point Bot API at your Render host.

Other app secrets as needed (Telegram, LLM APIs, Browser Use). See [docs/telegram-render-phase0-notes.md](docs/telegram-render-phase0-notes.md).

### Cloudflare behavior in split mode

When `ENABLE_RENDER_PROXY=true`, `RENDER_BACKEND_URL`, and `RENDER_API_SECRET` are configured, `/api/*` routes are proxied to Render through a shared-secret header (`x-render-api-secret`).

### Render behavior

Render exposes:
- `GET /healthz`
- `POST /api/telegram/webhook` (native Telegram processing when webhook URL points at Render)
- other heavy API surfaces under `/api/*` (proxied to Cloudflare unless native)

Use `render.yaml` in this repo as the baseline deployment descriptor.
