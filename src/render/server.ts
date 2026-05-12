import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.use('*', async (c, next) => {
  const secret = c.req.header('x-render-api-secret');
  if (!secret || secret !== process.env.RENDER_API_SECRET) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  await next();
});

app.get('/healthz', (c) => c.json({ ok: true, service: 'karna-render-worker' }));

app.post('/api/chat/send', async (c) => c.json({ status: 'processing' }, 202));
app.get('/api/chat/threads', async (c) => c.json({ status: 'proxy-target-ready' }));
app.get('/api/chat/threads/:id/messages', async (c) => c.json({ status: 'proxy-target-ready' }));
app.post('/api/telegram/webhook', async (c) => c.json({ accepted: true }, 202));
app.post('/api/system/cron/run', async (c) => c.json({ accepted: true }, 202));

const port = Number(process.env.PORT || 10000);
serve({ fetch: app.fetch, port });
