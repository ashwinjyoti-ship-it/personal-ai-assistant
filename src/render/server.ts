import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { scheduleTelegramUpdate } from './telegram-webhook';
import { app as karnaApp } from '../index';
import { createRenderEnv } from './env';
import { startRenderCron } from './cron';
import type { Bindings } from '../types';

// Phase A: when RENDER_RUN_NATIVE_APP=true, Render serves the entire Karna API
// natively (auth, chat, settings, telegram, etc.) against remote D1/R2 instead of
// proxying back to Cloudflare. Defaults to the legacy proxy behaviour so existing
// deployments are unchanged until the flag is flipped (fully reversible).
const RUN_NATIVE_APP = process.env.RENDER_RUN_NATIVE_APP === 'true';

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

function healthz() {
  return json(200, {
    ok: true,
    service: 'karna-render-worker',
    mode: RUN_NATIVE_APP ? 'native-app' : 'proxy',
    timestamp: new Date().toISOString(),
  });
}

const port = Number(process.env.PORT || 10000);

if (RUN_NATIVE_APP) {
  // --- Native mode: run the full Hono app on Render ---
  // Bindings are built once and reused. The libsql/D1 client opens connections
  // lazily, so construction is cheap and a missing config only fails on first use.
  let cachedBindings: Bindings | null = null;
  function getBindings(): Bindings {
    if (!cachedBindings) cachedBindings = createRenderEnv();
    return cachedBindings;
  }

  // Node has no Workers execution context. Background work (e.g. the Telegram
  // webhook's processing) keeps running on the event loop after the response is
  // sent, so waitUntil just needs to swallow rejections.
  function createExecutionCtx() {
    return {
      waitUntil(promise: Promise<unknown>) {
        Promise.resolve(promise).catch((err) => console.error('[render waitUntil]', err));
      },
      passThroughOnException() {},
    };
  }

  const fetch = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    if (url.pathname === '/healthz') return healthz();

    let bindings: Bindings;
    try {
      bindings = getBindings();
    } catch (err) {
      console.error('[render native] failed to build env:', err);
      return json(500, { error: 'Render environment not configured', detail: String(err) });
    }

    return karnaApp.fetch(request, bindings as any, createExecutionCtx() as any);
  };

  serve({ fetch, port });
  console.log(`[render] karna-render-worker listening on :${port} (native-app mode)`);

  // In-process cron scheduler (replaces the Cloudflare cron worker). Enabled by
  // default in native mode; set RENDER_DISABLE_CRON=true to turn it off.
  if (process.env.RENDER_DISABLE_CRON !== 'true') {
    const cronSecret = process.env.CRON_SECRET || 'karna-cron-default-v1';
    const cronCall = (path: string): Promise<Response> => {
      const request = new Request(`http://render.internal${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Cron-Secret': cronSecret },
      });
      return Promise.resolve(karnaApp.fetch(request, getBindings() as any, createExecutionCtx() as any));
    };
    startRenderCron(cronCall);
    console.log('[render] in-process cron scheduler started (every 60s)');
  } else {
    console.log('[render] cron scheduler disabled (RENDER_DISABLE_CRON=true)');
  }
} else {
  // --- Legacy proxy mode: reverse-proxy /api/* to Cloudflare, native Telegram webhook ---
  const app = new Hono();

  function isPublicPath(path: string, method: string): boolean {
    if (path === '/healthz') return true;
    // Telegram Bot API calls Render directly — no x-render-api-secret
    if (path === '/api/telegram/webhook' && method === 'POST') return true;
    return false;
  }

  app.use('*', async (c, next) => {
    if (isPublicPath(c.req.path, c.req.method)) return next();
    const secret = c.req.header('x-render-api-secret');
    if (!secret || secret !== process.env.RENDER_API_SECRET) {
      return json(401, { error: 'Unauthorized' });
    }
    await next();
  });

  app.get('/healthz', () => healthz());

  // Native Telegram webhook (Phase 3) — not proxied to Cloudflare
  app.post('/api/telegram/webhook', async (c) => {
    let update: unknown;
    try {
      update = await c.req.json();
    } catch {
      return c.json({ ok: true });
    }

    scheduleTelegramUpdate(update);
    return c.json({ ok: true });
  });

  app.all('/api/*', async (c) => {
    const legacyBase = process.env.LEGACY_API_BASE_URL;
    if (!legacyBase) {
      return json(500, { error: 'LEGACY_API_BASE_URL is not configured on Render' });
    }

    const incoming = new URL(c.req.url);
    const target = new URL(incoming.pathname + incoming.search, legacyBase);

    const headers = new Headers(c.req.header());
    headers.delete('host');
    headers.delete('x-render-api-secret');
    // Tell Cloudflare this request came from Render so it skips re-proxying (prevents infinite loop).
    headers.set('x-via-render-worker', 'true');

    const method = c.req.method.toUpperCase();
    const shouldAck = process.env.ASYNC_ACK_ROUTES === 'true' &&
      (incoming.pathname === '/api/chat/send' || incoming.pathname === '/api/telegram/webhook');

    if (shouldAck && method === 'POST') {
      fetch(target.toString(), {
        method,
        headers,
        body: await c.req.arrayBuffer(),
      }).catch((err) => console.error('Async forward failed', err));

      return c.json({ status: 'processing', routed_to: 'legacy' }, 202);
    }

    const upstream = await fetch(target.toString(), {
      method,
      headers,
      body: method === 'GET' || method === 'HEAD' ? undefined : await c.req.arrayBuffer(),
    });

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set('x-karna-runtime', 'render-proxy');
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  });

  serve({ fetch: app.fetch, port });
  console.log(`[render] karna-render-worker listening on :${port} (proxy mode)`);
}
