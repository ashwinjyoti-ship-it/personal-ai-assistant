# Karna — Personal AI Assistant

## Cursor Cloud specific instructions

### Overview

Karna is a serverless personal AI assistant on Cloudflare Pages (Hono + TypeScript + Vite + D1). See `README.md` for full feature list and API routes.

### Local development without Cloudflare auth

The main `wrangler.jsonc` includes `ai` and `vectorize` bindings that require remote Cloudflare authentication. For local-only development (no Cloudflare account needed), use `wrangler-local.jsonc` which excludes remote-only bindings:

```bash
# 1. Build the app
npm run build

# 2. Swap config to local-only version
cp wrangler.jsonc wrangler.jsonc.bak && cp wrangler-local.jsonc wrangler.jsonc

# 3. Apply DB migrations + seed (first time or after reset)
npm run db:migrate:local
npm run db:seed

# 4. Start local dev server on port 3000
npx wrangler pages dev dist --local --ip 0.0.0.0 --port 3000

# 5. When done, restore original config
cp wrangler.jsonc.bak wrangler.jsonc && rm wrangler.jsonc.bak
```

The `npm run dev` command (Vite dev server) also requires Cloudflare auth because the `@hono/vite-dev-server/cloudflare` adapter calls `getPlatformProxy()` which starts a remote proxy session for the AI binding.

### Key gotchas

- **Config swap required**: Always swap to `wrangler-local.jsonc` before starting the local dev server, and restore `wrangler.jsonc` before committing.
- **Wrangler auto-reloads**: If you modify `wrangler.jsonc` while `wrangler pages dev` is running, it restarts and may fail if it picks up the original config with remote bindings.
- **Build before `pages dev`**: The `dev:sandbox` / `pages dev` command serves from `dist/`, so you must run `npm run build` before starting it.
- **TypeScript errors**: Pre-existing TS errors exist (missing `@types/node` for Render worker files, untyped function calls). These do not block builds or tests — Vite builds without type checking.

### Commands reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Build | `npm run build` |
| Tests | `npm test` (vitest) |
| Digest tests | `npm test -- src/services/__tests__/digest.test.ts` |
| DB migrate (local) | `npm run db:migrate:local` |
| DB seed | `npm run db:seed` |
| DB reset | `npm run db:reset` |
| TypeScript check | `npx tsc --noEmit` |

### LLM API keys

Chat functionality requires at least one LLM provider API key. For local dev, create a `.dev.vars` file with keys like `GOOGLE_API_KEY`, `ANTHROPIC_API_KEY`, etc. The app works for auth, threads, dashboard, and settings without LLM keys — only chat send requires them.

### Unified digests

Current proactive summaries use `/api/digests` and `src/services/digest/*` for morning, evening, weekly, and email digests. Migration `0045_digests.sql` is required for the `digest_configs`, `digests`, and `digest_items` tables; `npm run db:migrate:local` applies it locally. See [docs/digests.md](docs/digests.md) for API routes, cron behavior, defaults, and local curl checks.

### Telegram on Render (in progress)

Phase 0–3 notes and env checklist: [docs/telegram-render-phase0-notes.md](docs/telegram-render-phase0-notes.md). Render native Telegram: `POST /api/telegram/webhook` in `src/render/server.ts` uses `createRenderEnv()` + `processTelegramUpdate` from `telegram-processor.ts`. D1: `src/render/d1-adapter.ts`; R2 shim: `src/render/r2-bucket.ts`. Phase 4+ handles CF proxy removal (Tier 3) once Telegram webhook is on Render.

### Full backend on Render (Phase A)

Plan + env-var checklist: [docs/render-full-migration.md](docs/render-full-migration.md). When `RENDER_RUN_NATIVE_APP=true`, `src/render/server.ts` mounts the full Hono app exported from `src/index.tsx` (per-request bindings via `createRenderEnv()`) instead of proxying — runs against remote D1/R2. Default (unset) keeps legacy proxy mode, so it's reversible. For local tests, set `RENDER_D1_LIBSQL_URL=file:<path>` and run `npm run render:worker` (no Cloudflare auth needed).
