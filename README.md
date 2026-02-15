# Karna — Personal AI Assistant

## Project Overview
- **Name**: Karna
- **Goal**: A cloud-based personal AI assistant with memory, personality, scheduling, browser automation, and multi-channel communication
- **Architecture**: Cloudbot patterns — Adapter Pattern, Provider Abstraction, Lane-Based Concurrency, Agentic Loop
- **Platform**: Cloudflare Pages + D1 Database
- **GitHub**: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant

## Current Features

### Phase 1 — Core
- Chat interface (dark theme, minimalist)
- Multi-user PIN authentication
- LLM provider abstraction (Claude primary, OpenAI fallback)
- Encrypted credential vault (AES-GCM, per-user, per-service)
- Conversation memory and persistence
- Two-tier memory (working + long-term with compaction)
- Natural language schedule/reminder creation
- Cron job engine with heartbeat monitoring
- Telegram bot webhook adapter
- Settings panel (profile, credentials, schedules, memory, errors)

### Phase 1.5 — Guardrails
- Daily cost guard (100 requests / 500K tokens per provider)
- Cron overlap lock (D1 flag, 30-min stale cleanup)
- Task state machine (created → active → reminding → paused → completed)
- Centralized error logging with UI viewer
- System prompt token budgets (~2K personality, ~2K memory, ~1K tools)
- `update_schedule_state` tool for marking reminders done via chat

### Phase 2 — Google Workspace
- **JWT Auth**: RS256 signing via Web Crypto API (zero Node.js dependencies)
- **Google Sheets**: read, write, append, create, get metadata
- **Google Calendar**: list events, create events, update events, delete events
- **Google Docs**: create, read, append text, share
- Token caching with 1-hour expiry
- Service account validation endpoint

### Phase 3 — Browser Automation
- **Steel.dev** — managed headless browser sessions (ACTIVE/EXPIRED/ERROR states in D1)
- **Browser Use Cloud** — AI-driven navigation via REST API (Workers-compatible)
- Gmail: `check_gmail`, `compose_gmail_draft`, `search_gmail`
- Outlook: `check_outlook_mail`, `compose_email_draft`, `check_outlook_calendar`
- General: `browse_web` (any website via natural language instruction)
- Session reuse by purpose (gmail, outlook, general) with 15-min timeout
- Key validation endpoints for Steel and Browser Use

## API Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/check` | GET | Check if users exist |
| `/api/auth/setup` | POST | First-time user registration |
| `/api/auth/login` | POST | PIN-based login |
| `/api/auth/me` | GET | Validate current session |
| `/api/chat/send` | POST | Send message, get AI response |
| `/api/chat/history` | GET | Conversation history |
| `/api/settings/profile` | GET/PUT | Profile management |
| `/api/settings/credentials` | GET/PUT/DELETE | Credential vault |
| `/api/settings/credentials/validate` | POST | Key validation (Anthropic, OpenAI, Steel, Browser Use, Google SA) |
| `/api/settings/memory` | GET/POST/DELETE | Memory management |
| `/api/settings/schedules` | GET/PUT/DELETE | Schedule management |
| `/api/settings/errors` | GET/DELETE | Error log viewer |
| `/api/system/health` | GET | Health check |
| `/api/system/status` | GET | System status |
| `/api/system/cron/execute` | POST | Cron execution |
| `/api/telegram/webhook` | POST | Telegram webhook |

## Data Architecture
- **D1 Tables**: users, sessions, credentials, conversations, memory, cron_jobs, cron_execution_log, provider_usage, error_log, browser_sessions, browser_task_log, heartbeat_log
- **Encryption**: AES-GCM via Web Crypto API
- **Auth**: PIN + SHA-256, 7-day session tokens

## LLM Agent Tools
| Tool | Description |
|------|-------------|
| `create_schedule` | Create recurring reminders/tasks |
| `list_schedules` | View tasks with state badges |
| `toggle_schedule` | Enable/disable tasks |
| `update_schedule_state` | Mark tasks done via chat |
| `delete_schedule` | Remove tasks |
| `store_memory` | Remember facts/preferences/decisions |
| `search_memory` | Search long-term memory |
| `get_system_status` | System health overview |
| `read_sheet` | Read data from a Google Sheet |
| `write_sheet` | Write/update data in a Google Sheet |
| `append_sheet` | Append rows to a Google Sheet |
| `create_sheet` | Create a new Google Spreadsheet |
| `list_calendar_events` | List upcoming Google Calendar events |
| `create_calendar_event` | Create a Google Calendar event |
| `create_doc` | Create a new Google Document |
| `read_doc` | Read a Google Document's content |
| `check_gmail` | Read Gmail inbox (Steel + Browser Use) |
| `compose_gmail_draft` | Draft Gmail emails |
| `search_gmail` | Search Gmail by query |
| `check_outlook_mail` | Read Outlook inbox |
| `compose_email_draft` | Draft Outlook emails |
| `check_outlook_calendar` | View calendar events |
| `browse_web` | Any web task via natural language |

## Credential Services
| Service | Purpose |
|---------|---------|
| `anthropic` | Claude API key (primary LLM) |
| `openai` | OpenAI API key (fallback LLM) |
| `telegram_bot_token` | Telegram bot for mobile access |
| `google_service_account` | Google Docs/Sheets/Calendar API |
| `outlook_email` | Outlook login email |
| `outlook_password` | Outlook login password |
| `steel_api_key` | Steel.dev browser sessions |
| `browser_use_api_key` | Browser Use Cloud AI navigation |

## Key Persistence
- Credentials are encrypted and stored in D1 (`.wrangler/state/v3/d1/` locally)
- Builds (`npm run build`) only touch `dist/` — D1 data is untouched
- PM2 restarts preserve all data
- Cloudflare deployment: D1 is a separate service, independent of code deploys

## Google Account Notes
- **Service account** (theprolificpoppin): Powers Sheets, Calendar, Docs APIs via JWT
- **Gmail** (ashwinjyoti@gmail.com): Accessed via browser automation (Steel + Browser Use), not API
- Share your Google Sheets/Calendar with the service account email to grant access
- Gmail access requires first-time sign-in through Steel session viewer
- **Required**: Enable Sheets, Calendar, Docs, Drive APIs in Google Cloud Console (project 508922597225)

## Upcoming
- **Phase 4**: Cron-driven mail checking, daily briefings, automated workflows
- **Deployment**: Cloudflare Pages production deployment
- **Telegram**: Webhook setup once deployed to stable URL

## Getting Started
1. Visit the app URL
2. Create profile (username + PIN)
3. Settings → Keys → Add API keys (Anthropic/OpenAI, Steel, Browser Use)
4. Start chatting — "Check my Gmail", "Remind me to call John at 5pm", etc.

## Tech Stack
- Hono + TypeScript + Cloudflare Pages + D1
- Steel.dev + Browser Use Cloud (browser automation)
- Web Crypto API (encryption)
- Custom dark-theme CSS

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Development (local sandbox)
- **Version**: 2.0.0
- **Last Updated**: 2026-02-15
