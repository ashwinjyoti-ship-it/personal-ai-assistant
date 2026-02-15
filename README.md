# Karna — Personal AI Assistant

## Project Overview
- **Name**: Karna
- **Goal**: A cloud-based personal AI assistant with memory, personality, scheduling, and multi-channel communication
- **Architecture**: Based on Cloudbot architecture patterns — Adapter Pattern, Provider Abstraction, Lane-Based Concurrency, Agentic Loop
- **Platform**: Cloudflare Pages + D1 Database

## Phase 1 Features (Current)
- Chat interface with seamless minimalist design (dark theme, borderless flow)
- Multi-user support with PIN authentication
- LLM integration with provider abstraction (Claude primary, OpenAI fallback)
- Encrypted credential vault (per-user, per-service)
- Conversation memory and persistence
- Memory system (facts, preferences, decisions, context)
- Natural language schedule creation via chat
- Cron job execution engine with heartbeat monitoring
- Settings panel (profile, credentials, schedules, memory viewer)
- Telegram bot webhook adapter (ready for connection)
- Channel adapter pattern for normalized message handling

## Architecture

### API Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/check` | GET | Check if users exist |
| `/api/auth/setup` | POST | First-time user registration |
| `/api/auth/login` | POST | PIN-based login |
| `/api/auth/me` | GET | Validate current session |
| `/api/chat/send` | POST | Send message, get AI response |
| `/api/chat/history` | GET | Get conversation history |
| `/api/settings/profile` | GET/PUT | User profile management |
| `/api/settings/credentials` | GET/PUT/DELETE | Credential vault |
| `/api/settings/memory` | GET/POST/DELETE | Memory management |
| `/api/settings/schedules` | GET/PUT/DELETE | Schedule management |
| `/api/system/health` | GET | Health check |
| `/api/system/status` | GET | System status dashboard |
| `/api/system/cron/execute` | POST | Manual cron execution |
| `/api/telegram/webhook` | POST | Telegram bot webhook |

### Data Architecture
- **D1 Database**: users, sessions, credentials, conversations, memory, cron_jobs, heartbeat_log
- **Encryption**: AES-GCM via Web Crypto API for credential storage
- **Auth**: PIN-based with SHA-256 hashing, session tokens (7-day expiry)

### LLM Tools (available to the agent)
- `create_schedule` — Create recurring tasks via natural language
- `list_schedules` — View active/paused tasks
- `toggle_schedule` — Enable/disable tasks
- `delete_schedule` — Remove tasks
- `store_memory` — Remember facts, preferences, decisions
- `search_memory` — Search stored memories
- `get_system_status` — System health overview

## Upcoming Phases
- **Phase 2**: Google Drive/Docs/Sheets/Calendar API integration
- **Phase 3**: Browser automation for Outlook (Browserbase + semantic snapshots)
- **Phase 4**: Full automation — cron-driven mail checking, daily briefings, smart reminders

## Tech Stack
- Hono + TypeScript
- Cloudflare Pages + D1 + Workers
- Tailwind-inspired custom CSS (dark theme)
- Web Crypto API for encryption

## Getting Started
1. Visit the app URL
2. Create your profile (username + PIN)
3. Go to Settings (gear icon) → Credentials → Add your Anthropic or OpenAI API key
4. Start chatting with Karna

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Development (local sandbox)
- **Last Updated**: 2026-02-15
