# Karna — Personal AI Assistant

## Project Overview
- **Name**: Karna
- **Version**: 3.1.0
- **Goal**: A cloud-based personal AI assistant with memory, personality, scheduling, Gmail/Drive API, browser automation, self-building capabilities, and multi-channel communication
- **Architecture**: Cloudbot patterns — Adapter Pattern, Provider Abstraction, Lane-Based Concurrency, Agentic Loop
- **Platform**: Cloudflare Pages + D1 Database
- **Production**: https://karna-5xs.pages.dev
- **GitHub**: https://github.com/ashwinjyoti-ship-it/personal-ai-assistant

## Current Features

### Phase 1 — Core
- Chat interface (dark theme, minimalist, mobile-responsive)
- Multi-user PIN authentication with forgot-credentials recovery
- LLM provider rotation (Claude + OpenAI auto-rotate with cost guards)
- Encrypted credential vault (AES-GCM, per-user, per-service)
- Two-tier memory (working + long-term with compaction)
- Natural language schedule/reminder creation
- Cron job engine with heartbeat monitoring
- Telegram bot webhook adapter with /start, /help, /status, /new commands

### Phase 2 — Google Workspace (OAuth 2.0)
- **Google Sheets**: read, write, append, create spreadsheets
- **Google Calendar**: list events, create events
- **Google Docs**: create, read, append text
- **Google Drive**: list files, search files
- **Gmail API** (native, no browser needed): list, read, search, send, draft, unread count
- OAuth 2.0 with encrypted refresh token storage and auto-refresh
- Token caching with 1-hour expiry

### Phase 3 — Browser Automation
- **Steel.dev** — managed headless browser sessions
- **Browser Use Cloud** — AI-driven navigation via REST API
- Outlook: check mail, compose drafts, check calendar (primary + secondary accounts)
- Gmail (fallback): check inbox, compose drafts, search
- General: browse any website via natural language instruction
- Session reuse with 15-min timeout

### Phase 3.5 — Threads, Dashboard, Export
- **Conversation Threads**: Start fresh conversations, browse past ones by topic
- **Thread Sidebar**: Grouped by Today/Yesterday/Older, archive, delete, rename
- **Dashboard**: Status cards (conversations, tasks, memories, API usage, errors)
- **Chat Export**: Download any thread as text file
- **Thread-Aware Chat**: Messages scoped to active thread, auto-create threads
- **Toast Notifications**: Visual feedback for actions
- **Google Public APIs**: Places (New API), Directions, Translate, YouTube, Geocode
- **Clickable Links**: YouTube ▶, Maps 📍, Sheets/Docs icons, auto-linkification

### Phase 4 — Telegram, Mobile, Self-building (NEW in v3.1)
- **Telegram Bot (finalized)**: /start, /help, /status, /new commands, typing indicators, long-message splitting, Markdown fallback to plain text, webhook setup UI in Settings
- **Mobile-first Responsive**: iOS safe-area support (notch, home bar), touch-friendly targets (44px min), scrollable tabs, visual viewport keyboard handling, full-width overlays on mobile
- **Self-building Feature System**: Karna can propose its own improvements via `suggest_feature` tool. Feature requests tracked in DB with status workflow (proposed → approved → in_progress → implemented). Users review in Settings → Features tab.
- **Webhook Management UI**: Setup, check status, and remove Telegram webhooks from Settings → Telegram tab

## API Routes

### Auth
| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/check` | GET | Check if users exist |
| `/api/auth/setup` | POST | First-time user registration |
| `/api/auth/login` | POST | PIN-based login |
| `/api/auth/me` | GET | Validate current session |
| `/api/auth/reset-pin` | POST | PIN recovery (clears credentials) |
| `/api/auth/users/hints` | GET | Account hints for recovery |

### Chat & Threads
| Route | Method | Description |
|-------|--------|-------------|
| `/api/chat/send` | POST | Send message with thread_id |
| `/api/chat/threads` | GET | List all threads |
| `/api/chat/threads` | POST | Create new thread |
| `/api/chat/threads/:id` | PUT | Update thread (rename, archive) |
| `/api/chat/threads/:id` | DELETE | Delete thread and messages |
| `/api/chat/threads/:id/messages` | GET | Get messages for a thread |
| `/api/chat/history` | GET | Legacy conversation history |
| `/api/chat/dashboard` | GET | Dashboard data (counts, usage, recent) |
| `/api/chat/providers` | GET | Provider rotation stats |

### Settings
| Route | Method | Description |
|-------|--------|-------------|
| `/api/settings/profile` | GET/PUT | Profile management |
| `/api/settings/credentials` | GET/PUT/DELETE | Credential vault |
| `/api/settings/credentials/validate` | POST | Key validation |
| `/api/settings/memory` | GET/POST/DELETE | Memory management |
| `/api/settings/schedules` | GET/PUT/DELETE | Schedule management |
| `/api/settings/errors` | GET/DELETE | Error log viewer |
| `/api/settings/features` | GET/POST | Feature requests (self-building) |
| `/api/settings/features/:id` | PUT/DELETE | Update/delete feature requests |
| `/api/settings/google/status` | GET | Google OAuth connection status |
| `/api/settings/google/auth-url` | GET | Get Google consent URL |
| `/api/settings/google/disconnect` | POST | Revoke Google tokens |
| `/api/settings/google/test` | POST | Test Google connection |

### Telegram
| Route | Method | Description |
|-------|--------|-------------|
| `/api/telegram/webhook` | POST | Telegram webhook receiver |
| `/api/telegram/setup-webhook` | POST | Register webhook URL with Telegram |
| `/api/telegram/webhook-status` | GET | Check webhook configuration |

## LLM Agent Tools (35 tools)

### Scheduling & Memory
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

### Google Workspace (OAuth)
| Tool | Description |
|------|-------------|
| `read_sheet` / `write_sheet` / `append_sheet` | Google Sheets operations |
| `create_sheet` | Create new spreadsheet |
| `list_calendar_events` | Upcoming Google Calendar events |
| `create_calendar_event` | Create calendar event |
| `create_doc` / `read_doc` | Google Docs operations |

### Gmail API (PREFERRED — fast, reliable)
| Tool | Description |
|------|-------------|
| `gmail_list` | List recent inbox messages |
| `gmail_read` | Read full message body |
| `gmail_search` | Search with Gmail query syntax |
| `gmail_send` | Send email (confirms with user first) |
| `gmail_draft` | Create draft (saved, not sent) |
| `gmail_unread_count` | Quick unread count |

### Google Drive
| Tool | Description |
|------|-------------|
| `drive_list` | Browse Drive files |
| `drive_search` | Search files by name/content |

### Google Public APIs (API Key)
| Tool | Description |
|------|-------------|
| `search_places` | Find places/businesses |
| `get_place_details` | Phone, hours, reviews |
| `get_directions` | Step-by-step navigation |
| `get_travel_time` | Quick distance/time check |
| `translate_text` | Translate between 100+ languages |
| `search_youtube` | Find videos/tutorials |
| `geocode_address` | Address to coordinates |

### Self-building (NEW)
| Tool | Description |
|------|-------------|
| `suggest_feature` | Karna proposes improvements to itself |
| `list_feature_requests` | View all feature proposals and their status |
| `update_feature_request` | Update feature status/notes |

### Browser Automation (Steel + Browser Use)
| Tool | Description |
|------|-------------|
| `check_outlook_mail` | Read Outlook inbox |
| `compose_email_draft` | Draft Outlook emails |
| `check_outlook_calendar` | View Outlook calendar |
| `check_gmail` / `compose_gmail_draft` / `search_gmail` | Gmail via browser (fallback) |
| `browse_web` | Any web task via natural language |

## Data Architecture
- **D1 Tables**: users, sessions, credentials, conversations, memory, cron_jobs, cron_execution_log, provider_usage, error_log, browser_sessions, browser_task_log, heartbeat_log, threads, notifications, invite_codes, feature_requests
- **Encryption**: AES-GCM via Web Crypto API
- **Auth**: PIN + SHA-256, 7-day session tokens

## Telegram Setup Guide
1. Open Telegram, search for @BotFather, send `/newbot`
2. Choose a name and username for your bot
3. Copy the bot token to **Settings → Keys → Telegram Bot Token**
4. Send a message to your bot, then note your Chat ID (shown by /start command)
5. Set Chat ID in **Settings → Profile → Telegram Chat ID**
6. Go to **Settings → Telegram** tab, click **Set Webhook**
7. You're connected! Try sending `/help` to your bot

## Getting Started
1. Visit https://karna-5xs.pages.dev
2. Create profile (username + PIN)
3. Settings → Keys → Add Anthropic/OpenAI API key
4. Settings → Keys → Connect Google Account (OAuth for Sheets, Calendar, Docs, Drive, Gmail)
5. Settings → Keys → Add Google API Key (for Maps, Places, YouTube, Translate)
6. Start chatting: "Check my Gmail", "What's on my calendar today?", "Find audio stores near NCPA"

## Tech Stack
- Hono + TypeScript + Cloudflare Pages + D1
- Google OAuth 2.0 (Sheets, Calendar, Docs, Drive, Gmail)
- Gmail REST API (native, no browser needed)
- Steel.dev + Browser Use Cloud (Outlook & web automation)
- Telegram Bot API with webhook
- Web Crypto API (AES-GCM encryption)
- Custom dark-theme CSS (mobile-responsive, iOS safe-area)

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: ✅ Active
- **Version**: 3.1.0
- **Last Updated**: 2026-02-16
