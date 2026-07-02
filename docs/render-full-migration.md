# Moving Karna's backend to Render (frontend stays on Cloudflare)

> **Status (2026-07)**: Phases A–D and Tier 3 proxy removal are complete. Render runs the full API; Cloudflare Pages serves the frontend. Browser and Telegram call Render directly via `API_BASE_URL`. Legacy proxy env vars (`ENABLE_RENDER_PROXY`, `RENDER_API_SECRET`, etc.) can be deleted from both dashboards.

Goal: **everything runs on Render**, and **Cloudflare only serves the web UI** (plus
keeps the database, file storage, and AI search services, which Render talks to over
the network).

This is done in safe, reversible phases. Each phase is its own PR. You can stop after
any phase, and you can always roll back by flipping one switch.

---

## The big reassurance about environment variables

You do **not** need to copy most of your secrets. Here's why:

- **All your AI provider keys, your Telegram bot token, and your Google login tokens
  live encrypted inside the database** (the `credentials` table), not in environment
  variables. Render reads the same database, so it gets all of those automatically.
- The web app keeps working for login, threads, settings, and dashboard even with **no**
  provider keys set as environment variables.

So the only environment variables Render needs are a **short list of connection
settings** — and only a few of them are actually secret.

### The full list Render needs (native mode)

| Variable | Secret? | What it is / where to get it |
|---|---|---|
| `RENDER_RUN_NATIVE_APP` | no | Set to `true` to turn on full-backend mode. |
| `CLOUDFLARE_ACCOUNT_ID` | no | Your Cloudflare account ID (Cloudflare dashboard → right sidebar). |
| `CLOUDFLARE_D1_DATABASE_ID` | no | The D1 database ID — already in `wrangler.jsonc` (`047e293b-...`). |
| `CLOUDFLARE_D1_API_TOKEN` | **yes** | A Cloudflare API token with **D1 read/write**. Create at Cloudflare → My Profile → API Tokens. |
| `GOOGLE_CLIENT_ID` | no | Same value already set on Cloudflare Pages (Google OAuth). |
| `GOOGLE_CLIENT_SECRET` | **yes** | Same value already on Cloudflare Pages. |
| `GOOGLE_API_KEY` | **yes** | Optional — search/places/translate. Same as Pages. |
| `GOOGLE_CSE_ID` | no | Optional — custom search engine ID. Same as Pages. |
| `CLOUDFLARE_R2_ACCOUNT_ID` | no | Optional — only for document uploads. |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | **yes** | Optional — R2 S3 access key. |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | **yes** | Optional — R2 S3 secret. |
| `CLOUDFLARE_R2_BUCKET_NAME` | no | Optional — `karna-documents`. |
| `CRON_SECRET` | **yes** | Optional until Phase C; shared secret for scheduled jobs. |

**Setting them is easy here:** this workspace has a connected **Render integration**, so
once you point me at your Render workspace I can set the non-secret values for you and add
placeholders for the secret ones — you only paste the few genuinely secret tokens (or add
them in the Render dashboard). I never need to see secrets you don't want to share.

> Cloudflare hides secret *values* once saved (you can't read them back), so the handful of
> truly secret tokens above must be re-entered on Render. That's the only manual copying.

---

## Phases

| Phase | What it does | Risk | Reversible? |
|---|---|---|---|
| **A** ✅ | Make Render *able* to run the whole app (flag off by default). Nothing changes for you yet. | None | n/a — off by default |
| **B** | Point the web UI's API calls at Render. | Low | Yes — point UI back at Cloudflare |
| **C** | Move the once-a-minute cron (briefings, reminders) to Render. | Low | Yes |
| **D** | Flip the Telegram webhook to Render; keep one tiny Cloudflare endpoint for document search (option a). Cloudflare is now frontend-only. | Medium | Yes — repoint webhook |

### Phase A (this PR) — done

- `src/index.tsx` now exports the Hono `app`.
- `src/render/server.ts` mounts that app natively when `RENDER_RUN_NATIVE_APP=true`,
  injecting bindings per request; otherwise it behaves exactly as the old proxy.
- `render.yaml` is now a **web service** with `healthCheckPath: /healthz`.
- `RENDER_D1_LIBSQL_URL` lets the D1 adapter point at a local SQLite file for testing.

Verified end-to-end on the Node runtime against a real SQLite database through the same
`src/render/d1-adapter.ts` path: health check, frontend HTML, `auth/check`, `auth/setup`,
`auth/login`, `auth/me`, thread create/list, dashboard, and the native Telegram webhook.

### What stays on Cloudflare regardless

- The **web UI** (the frontend).
- The **D1 database** and **R2 file storage** (Render reaches them over the network).
- **Document semantic search** (`search_library`) — it uses Cloudflare-only `AI` +
  `VECTORIZE`. Phase D keeps a small Cloudflare endpoint alive just for this (option a).
  Everything else (chat, Gmail, Calendar, research, reminders, Telegram, document upload)
  runs on Render.

### Rollback at any time

Set `RENDER_RUN_NATIVE_APP=false` (back to proxy mode) and/or point the Telegram webhook
and the web UI back at the Cloudflare Pages URL.
