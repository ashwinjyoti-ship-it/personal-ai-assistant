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
| DB migrate (local) | `npm run db:migrate:local` |
| DB seed | `npm run db:seed` |
| DB reset | `npm run db:reset` |
| TypeScript check | `npx tsc --noEmit` |

### LLM API keys

Chat functionality requires at least one LLM provider API key. For local dev, create a `.dev.vars` file with keys like `GOOGLE_API_KEY`, `ANTHROPIC_API_KEY`, etc. The app works for auth, threads, dashboard, and settings without LLM keys — only chat send requires them.

### Telegram on Render (in progress)

Phase 0–1 notes and env checklist: [docs/telegram-render-phase0-notes.md](docs/telegram-render-phase0-notes.md). Render D1 uses `createRenderEnv()` / `src/render/d1-adapter.ts` (not mounted on `server.ts` until later phases).
