# Karna — Personal AI Assistant

## Project Overview
- **Name**: Karna
- **Version**: 4.2.0
- **Goal**: A serverless personal AI assistant with memory, scheduling, Google Workspace integration, tool enforcement, and multi-channel communication
- **Architecture**: Sub-agent router with intent classification, tool enforcement loops, and anti-fabrication integrity layer
- **Platform**: Cloudflare Pages + D1 Database
- **Production**: https://karna-5xs.pages.dev
- **GitHub**: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant

## Current Features

### Core
- Chat interface (dark theme, minimalist, mobile-responsive)
- Multi-user PIN authentication with forgot-credentials recovery
- LLM provider rotation (Anthropic, OpenAI, Grok, DeepSeek, Gemini, OpenRouter, Abacus AI — auto-rotate with cost guards and credit alerts)
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
Intent classification via keyword heuristics (~80%, <5ms) with LLM fallback. Routes to focused sub-agents: scheduler, workspace, research, memory, conversation, or multi (full agent fallback).

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
- Steel.dev + Browser Use Cloud for Outlook and general web browsing
- Session reuse with 15-min timeout

### Additional
- Conversation threads with sidebar (Today/Yesterday/Older)
- Dashboard: status cards, usage stats, export
- Google Public APIs: Places, Directions, Translate, YouTube, Geocode
- Evening briefings (calendar, Gmail, tasks, news) via Telegram
- Self-building feature system (propose → approve → implement)

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

## Data Architecture
- **D1 Tables**: users, sessions, credentials, conversations, threads, memory, cron_jobs, cron_execution_log, notifications, error_log, briefings, briefing_preferences, tool_execution_log
- **Encryption**: AES-GCM via Web Crypto API
- **Auth**: PIN + SHA-256, 30-day session tokens

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Tech Stack**: Hono + TypeScript + Vite + Cloudflare D1
- **Version**: 4.2.0
- **Last Updated**: 2026-03-08

## Split Architecture (Cloudflare Pages + Render Worker)

Karna now supports a split runtime model:

- Cloudflare Pages/Workers is the lightweight gateway (fast auth/session checks, thread listing, settings reads, Telegram webhook ACK).
- Render Background Worker is the long-running backend (chat orchestration, heavy tool chains, browser automation, cron, briefing pipelines).
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
- `RENDER_API_SECRET`
- `LEGACY_API_BASE_URL` (current Cloudflare API base, e.g. `https://karna-5xs.pages.dev`)
- `ASYNC_ACK_ROUTES=true` (optional immediate 202 for chat send + telegram webhook)
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_D1_DATABASE_ID`
- `CLOUDFLARE_D1_API_TOKEN`
- `CLOUDFLARE_R2_ACCOUNT_ID`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_BUCKET_NAME`
- Existing app secrets (Google OAuth, Telegram, LLM APIs, Steel.dev, Browser Use)

### Cloudflare behavior in split mode

When `ENABLE_RENDER_PROXY=true`, `RENDER_BACKEND_URL`, and `RENDER_API_SECRET` are configured, `/api/*` routes are proxied to Render through a shared-secret header (`x-render-api-secret`).

### Render behavior

Render exposes:
- `GET /healthz`
- heavy API surfaces under `/api/*`

Use `render.yaml` in this repo as the baseline deployment descriptor.
