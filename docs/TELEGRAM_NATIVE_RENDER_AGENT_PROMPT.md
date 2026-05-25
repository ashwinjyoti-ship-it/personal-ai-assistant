# Agent prompt: Move Telegram webhook to native Render (phased)

Copy everything below the line into a **new Cursor Cloud Agent** session tomorrow. The repo is **Karna** (`personal-ai-assistant`) — Hono + TypeScript on Cloudflare Pages, with an optional Render proxy (`src/render/server.ts`).

---

## Goal

Run **Telegram message processing on Render (Node)** instead of inside **Cloudflare Workers `waitUntil`**, so long agent runs (research, `create_doc`, browser tasks) are not limited by Worker CPU/wall-clock constraints.

**Do not change** web chat SSE unless explicitly needed for shared code paths. Scope this work to **Telegram** first.

## Current architecture (must read first)

1. **Telegram webhook**: `src/routes/channels/telegram.ts` — `POST /api/telegram/webhook`
   - Returns `{ ok: true }` immediately via `c.executionCtx.waitUntil(processUpdate())`
   - `processUpdate()` calls `runAgentRouted()` from `src/services/agent.ts`

2. **Render today**: `src/render/server.ts` only **proxies** `/api/*` to `LEGACY_API_BASE_URL` (Cloudflare Pages). It does **not** run the agent.
   - Optional `ASYNC_ACK_ROUTES=true` returns 202 and fire-and-forgets to Cloudflare

3. **Split proxy**: `src/index.tsx` — when `ENABLE_RENDER_PROXY=true`, routes under `RENDER_PROXY_ROUTES` (includes `/api/telegram`) forward to Render. Long routes (`/api/chat`, `/api/telegram`) default to **310s**; short routes use `RENDER_PROXY_TIMEOUT_MS` (e.g. 8000). `RENDER_PROXY_TIMEOUT_MS_LONG` is optional.

4. **Database**: Production uses **Cloudflare D1**. Render has stub `src/render/d1.ts` (`@libsql/client` + D1 HTTP URL) but it is **not wired** into the agent. The agent expects `D1Database` (`prepare().bind().first()` API).

5. **Recent fixes (may already be on `main`)**: Research/web search DDG POST, Perplexity model handling, essay→Drive Telegram prompts, timeout relaxations — branch `cursor/telegram-essay-drive-fix-6d31` / PR #211. Confirm with `git log` before starting.

## Success criteria (end state)

- Telegram Bot API webhook URL points to **Render** (e.g. `https://<render-service>.onrender.com/api/telegram/webhook`)
- Incoming Telegram updates are processed **entirely on Render** (no `waitUntil` on Workers for Telegram)
- User receives replies via Telegram Bot API (same behavior as today)
- Long tasks (research, browser, `create_doc`) complete without Worker timeout errors
- Cloudflare Pages still serves web UI + other `/api/*` routes (unless you intentionally move more later)
- Settings → Telegram “Set Webhook” (or docs) updated for Render URL
- No double-processing (webhook must not hit both CF and Render)

## Constraints

- Reuse existing logic: `normalizeTelegramMessage`, `formatResponse`, `runAgentRouted`, `sendTelegramMessage`, callback handlers — **extract, don’t rewrite**
- Minimize scope per phase; commit and push after each phase
- Branch naming: `cursor/telegram-native-render-<suffix>` (use Cloud Agent suffix rules if applicable)
- Do **not** swap `wrangler.jsonc` for local-only config in commits
- Test with `npm test` after substantive changes

---

## Phase 0 — Discovery (read-only, ~30 min)

**Tasks:**

1. Read: `src/routes/channels/telegram.ts`, `src/render/server.ts`, `src/index.tsx` (`proxyToRender`, `RENDER_PROXY_ROUTES`), `src/render/d1.ts`, `render.yaml`, `README.md` split-architecture section, `AGENTS.md`
2. List all `env` bindings the Telegram path needs: `DB`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_API_KEY`, `GOOGLE_CSE_ID`, `DOCUMENTS_BUCKET`, `AI`, `VECTORIZE`, credentials decryption (`pin_hash`)
3. Confirm how Render gets secrets today (`RENDER_API_SECRET`, `LEGACY_API_BASE_URL`, D1/R2 vars in `render.yaml`)
4. Document current webhook URL flow (where user registers webhook in Settings)

**Deliverable:** Short comment in PR or `docs/telegram-render-phase0-notes.md` with diagram and env checklist. **No code changes** unless a one-line doc fix.

---

## Phase 1 — D1 (and minimal platform) adapter for Render

**Problem:** `runAgentRouted` / `MemoryService` / telegram routes use Cloudflare `D1Database`. Render needs a compatible layer.

**Tasks:**

1. Implement a **D1-compatible adapter** for Render (wrap `@libsql/client` in `src/render/d1.ts` or new `src/render/d1-adapter.ts`) exposing at minimum:
   - `prepare(sql).bind(...args).first() / .all() / .run()`
   - Match semantics used by telegram + agent (grep for `.prepare(` in hot paths)
2. Add `createRenderEnv(): AppEnv['Bindings']` (or equivalent) that builds `DB` from `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_D1_API_TOKEN`
3. Unit test: simple `SELECT 1` or read `users` limit 1 against D1 from Node (skip if no tokens in CI; mock otherwise)
4. Document required Render env vars in `README.md`

**Deliverable:** Adapter merged; agent code unchanged; tests pass.

**Do not** mount Telegram yet.

---

## Phase 2 — Extract shared Telegram processor

**Tasks:**

1. Create `src/routes/channels/telegram-processor.ts` (name flexible) exporting:
   - `processTelegramUpdate(update, ctx)` where `ctx` includes: `db`, `env` (Google keys, buckets, AI bindings as needed), same behavior as current inline `processUpdate` in `telegram.ts`
2. Refactor `src/routes/channels/telegram.ts` to call the shared processor (Cloudflare path unchanged behavior)
3. Ensure `TELEGRAM_TIMEOUT_MS`, typing indicator, ack message, `sendTelegramMessage`, callback queries still work
4. Run `npm test`

**Deliverable:** Zero user-visible change on Cloudflare; processor is importable from Render.

---

## Phase 3 — Native webhook on Render

**Tasks:**

1. Extend `src/render/server.ts` (or `src/render/telegram-server.ts` mounted from server):
   - `POST /api/telegram/webhook` — parse body, invoke `processTelegramUpdate` with Render `db` + env
   - **Do not** forward this path to `LEGACY_API_BASE_URL` when handling natively
   - Return `{ ok: true }` quickly; run processing in background (Node: `waitUntil` pattern via `void processTelegramUpdate(...).catch(...)` or top-level await with reasonable server timeout — Render allows long requests; still respond to Telegram within ~5s if possible using early ack + background work, same as today)
2. Auth: Telegram webhook is verified by Telegram IP/token in body — keep same security model as CF (bot token in DB). Optional: shared secret header between CF and Render is **not** required for Telegram→Render direct calls.
3. Wire R2 if `parse_document` / attachments need `DOCUMENTS_BUCKET` — use `src/render/r2.ts` if present or add minimal S3-compatible client
4. For `AI` / `VECTORIZE`: pass through if env set; document if still CF-only
5. Health check still `GET /healthz`

**Deliverable:** Render can process a synthetic webhook payload end-to-end in dev (document manual test steps).

---

## Phase 4 — Stop double routing (Cloudflare)

**Tasks:**

1. When native Render Telegram is enabled (env flag e.g. `TELEGRAM_ON_RENDER=true` on CF **or** remove `/api/telegram` from `RENDER_PROXY_ROUTES` proxy list):
   - Cloudflare `telegram.ts` route should return **410/404 with message** OR proxy pass-through disabled so updates are **only** handled on Render
   - Preferred: **Remove `/api/telegram` from proxy list** in `src/index.tsx` and document that Telegram webhook must use Render URL
2. Update Settings UI `setupTelegramWebhook()` in `src/frontend/settings.ts` to use configurable webhook base:
   - e.g. env `TELEGRAM_WEBHOOK_BASE_URL` on Pages for UI, defaulting to `window.location.origin` for CF-only mode
   - When Render mode: show Render URL from config
3. Update `POST /api/telegram/setup-webhook` to accept optional `webhook_url` override (may already exist)

**Deliverable:** Only one active webhook target; docs clear.

---

## Phase 5 — Deploy, cutover, verify

**Tasks:**

1. Deploy Render service with all secrets (mirror Cloudflare: Google, LLM keys in D1 credentials, Telegram bot token in D1, D1/R2 tokens, etc.)
2. Register webhook: `https://<render-host>/api/telegram/webhook`
3. Manual tests:
   - `/start`, `/help`
   - Short chat message
   - Research query (confirm Perplexity/DDG path)
   - Write essay + save to Google Drive (`create_doc`)
   - Optional: browser task if configured
4. Monitor `error_log` table for `source=telegram`
5. Open PR with summary + rollback plan (point webhook back to CF URL)

**Deliverable:** PR merged; user-facing checklist in PR description.

---

## Phase 6 (optional) — Cleanup

- Remove `ASYNC_ACK_ROUTES` for telegram from Render proxy if unused
- Reduce `waitUntil` telegram code path on CF to stub or 404
- Native Render Telegram only: increase timeouts if still capped for Telegram channel unnecessarily

---

## Known pitfalls (avoid)

| Pitfall | Mitigation |
|--------|------------|
| Webhook registered on both CF and Render | Single URL; disable CF handler |
| D1 API mismatch | Adapter tests with real queries used by telegram |
| Missing `GOOGLE_*` on Render | Pass same env vars as CF Pages |
| `decrypt` needs `pin_hash` from user row | Same DB; same crypto module |
| Render cold start | Accept or upgrade plan; send “On it…” ack early |
| `AI` / `VECTORIZE` bindings only on CF | Document limitation or proxy those calls |
| Local dev still uses CF | Document `npm run render:worker` + ngrok to Render |

---

## Files likely touched

- `src/render/server.ts`
- `src/render/d1.ts` (or new adapter)
- `src/routes/channels/telegram.ts`
- `src/routes/channels/telegram-processor.ts` (new)
- `src/routes/channels/adapter.ts`
- `src/index.tsx` (proxy routes)
- `src/frontend/settings.ts` (webhook URL)
- `render.yaml`, `README.md`, `AGENTS.md`
- Tests under `src/services/__tests__/`

---

## Rollback plan

1. Set Telegram webhook back to Cloudflare Pages URL: `https://<pages>/api/telegram/webhook`
2. Re-enable `/api/telegram` in `RENDER_PROXY_ROUTES` if removed
3. Redeploy Pages

---

## Suggested first message to the new agent

```
Implement Telegram native Render handling for Karna using the phased plan in docs/TELEGRAM_NATIVE_RENDER_AGENT_PROMPT.md.

Start with Phase 0 (discovery notes only), then Phase 1 unless notes reveal blockers.

Branch: cursor/telegram-native-render-<suffix>
Base: main (confirm PR #211 research/telegram fixes are merged first)

Do not implement web chat on Render in this task.
```

---

*Generated for handoff — adjust Render hostnames and env names to match your deployment.*
