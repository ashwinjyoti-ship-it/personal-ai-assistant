import { serve } from '@hono/node-server';
import { app as karnaApp } from '../index';
import { createRenderEnv } from './env';
import { startRenderCron } from './cron';
import { logInfo, logError } from '../utils/logger';
import type { Bindings } from '../types';

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

function healthz() {
  return json(200, {
    ok: true,
    service: 'karna-render-worker',
    mode: 'native-app',
    timestamp: new Date().toISOString(),
  });
}

const port = Number(process.env.PORT || 10000);

// Bindings are built once and reused. The D1 client opens connections lazily,
// so construction is cheap and a missing config only fails on first use.
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
      Promise.resolve(promise).catch((err) =>
        logError('render waitUntil task failed', { error: String(err) }),
      );
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
    logError('render native: failed to build env', { error: String(err) });
    return json(500, { error: 'Render environment not configured', detail: String(err) });
  }

  return karnaApp.fetch(request, bindings as any, createExecutionCtx() as any);
};

serve({ fetch, port });
logInfo('karna-render-worker listening', { port, mode: 'native-app' });

// In-process cron scheduler. Set RENDER_DISABLE_CRON=true to turn it off.
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
  logInfo('in-process cron scheduler started', { intervalSeconds: 60 });
} else {
  logInfo('cron scheduler disabled', { reason: 'RENDER_DISABLE_CRON=true' });
}
