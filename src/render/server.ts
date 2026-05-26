import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { scheduleTelegramUpdate } from './telegram-webhook';

const app = new Hono();

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

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

app.get('/healthz', (c) => c.json({ ok: true, service: 'karna-render-worker', timestamp: new Date().toISOString() }));

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

const port = Number(process.env.PORT || 10000);
serve({ fetch: app.fetch, port });
