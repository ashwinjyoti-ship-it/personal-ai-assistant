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

## Split Architecture (Cloudflare Pages + Render)

- **Cloudflare Pages** serves the frontend and Google OAuth callback.
- **Render web service** runs the full API (chat, Telegram, cron, browser automation, digests).
- **Cloudflare D1 / R2** remain the database and object store.

### Cloudflare Pages

- `API_BASE_URL` = `https://karna-background-worker.onrender.com` — SPA calls Render directly
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — OAuth callback on CF origin
- Remove legacy proxy vars if present: `ENABLE_RENDER_PROXY`, `RENDER_BACKEND_URL`, `RENDER_API_SECRET`

### Render

See `render.yaml` and [docs/render-full-migration.md](docs/render-full-migration.md). Core: D1 creds, Google OAuth, optional R2, `CRON_SECRET`.

Telegram webhook: `https://karna-background-worker.onrender.com/api/telegram/webhook` (Settings → Telegram).

Local testing: `RENDER_D1_LIBSQL_URL=file:./local.sqlite` + `npm run render:worker`.

Voice (`/api/voice`): runs on Render; browser calls it via `API_BASE_URL`. See [docs/voice-realtime-plan.md](docs/voice-realtime-plan.md).
