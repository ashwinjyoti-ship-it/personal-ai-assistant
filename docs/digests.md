# Unified Digests

Karna's digest subsystem is the current proactive-intelligence path for morning,
evening, weekly, and email summaries. It replaces the older briefing-specific
cron endpoints with one configuration model, one history UI, and one cron tick.

## User-facing workflow

- Sidebar: **Digests** shows generated digest history, details, and checklist
  items.
- Settings: **Settings -> Digests** edits each digest kind's schedule, enabled
  state, sections, notification channels, and news topics.
- Manual generation uses `POST /api/digests/generate`; it stores a digest but
  does not deliver notifications. Cron-generated digests deliver to configured
  channels.

## Digest kinds and defaults

| Kind | Default | Enabled | Default sections |
|------|---------|---------|------------------|
| `morning` | Daily 08:00 | Yes | `calendar_today`, `gmail_summary`, `cron_jobs_today`, `action_items_open` |
| `evening` | Daily 20:00 | Yes | `calendar_tomorrow`, `gmail_summary`, `tasks_due`, `news_ai` |
| `weekly` | Sunday 20:00 | Yes | `cron_completed`, `cron_missed`, `action_items_open`, `documents_recent`, `gmail_summary` |
| `email` | Daily 12:00 | No | `gmail_summary`, `outlook_summary` |

Default delivery channels are `ntfy` and `web`. `telegram` is optional and
requires the user's Telegram chat ID plus stored bot credentials. Email digests
are disabled by default because the Outlook section can require a Browser Use
run.

News topics are limited by validation to at most five topics, 50 characters each.

## Scheduling and idempotency

- Schedules use the user's `users.timezone`; users without a timezone default to
  `Asia/Kolkata`.
- A digest is due at `scheduleTime` and remains eligible for a five-minute
  catch-up window.
- Weekly digests also require `scheduleWeekday` to match the user's local day.
- The database enforces one digest per `(user_id, kind, local_date)`. Use
  `force: true` only to skip the due/pre-check path during manual generation.
  It does not replace an already stored digest for the same user/kind/local date;
  delete the existing digest first if a fresh stored row is required.

## API surface

Authenticated user routes require `Authorization: Bearer <sessionId>`.

| Method | Route | Purpose |
|--------|-------|---------|
| `GET` | `/api/digests?kind=&limit=` | List recent digests; `limit` is capped at 100 |
| `GET` | `/api/digests/:id` | Get one digest and its checklist items |
| `POST` | `/api/digests/generate` | Generate `{ kind, force? }` without delivery |
| `POST` | `/api/digests/:id/items/:itemId/toggle` | Toggle one checklist item |
| `POST` | `/api/digests/:id/resend` | Re-deliver an existing digest to configured channels |
| `DELETE` | `/api/digests/:id` | Delete one digest |
| `GET` | `/api/digests/configs` | Return four configs plus the section catalogue |
| `PUT` | `/api/digests/configs?kind=...` | Update one config |
| `POST` | `/api/digests/configs/reset?kind=...` | Reset one config to defaults |

Cron routes require `X-Cron-Secret` matching `CRON_SECRET`.

| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `/api/digests/cron/tick` | Evaluate all users and generate every due digest |
| `POST` | `/api/digests/cron/meeting-reminders` | Send Google Calendar reminders for events starting soon |

## Runtime codepaths

- Routes: `src/routes/digests.ts`
- Core generation: `src/services/digest/index.ts`
- Config validation/defaults: `src/services/digest/config.ts`
- Schedule checks: `src/services/digest/schedule.ts`
- Delivery: `src/services/digest/deliver.ts`
- Frontend: `src/frontend/digests.ts`, `src/frontend/settings.ts`
- Schema/backfill: `migrations/0045_digests.sql`
- Render scheduler: `src/render/cron.ts`

## Section prerequisites

- Calendar and Gmail sections require Google OAuth credentials for the user.
- Outlook summary uses Browser Use plus stored site credentials.
- Telegram delivery requires Telegram settings; `web` delivery writes in-app
  notifications.
- `search_library`/Vectorize remains Cloudflare-only and is not part of Render's
  native digest execution path.

## Local checks

```bash
npm run db:migrate:local
npm test -- src/services/__tests__/digest.test.ts
```

To exercise cron locally against a running server:

```bash
curl -X POST http://localhost:3000/api/digests/cron/tick \
  -H "X-Cron-Secret: ${CRON_SECRET}"
```

## Legacy notes

`src/routes/proactive.ts` and `src/services/briefing.ts` still exist for
backward compatibility during cutover. Render cron now calls the digest cron
routes, and new UI surfaces should use `/api/digests`.
