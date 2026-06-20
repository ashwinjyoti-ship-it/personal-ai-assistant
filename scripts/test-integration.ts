#!/usr/bin/env npx tsx
/**
 * Local integration smoke test for notes, notifications, and notify service.
 * Usage: npx tsx scripts/test-integration.ts
 */
import { createRenderD1Database } from '../src/render/d1-adapter';
import { sendNotification } from '../src/services/notify';
import { decrypt } from '../src/services/crypto';
import { globSync } from 'node:fs';
import { resolve } from 'node:path';

const SESSION = process.env.KARNA_SESSION || '7d3de410-95f6-42c1-adcf-b2a809eabc21';
const BASE = process.env.KARNA_BASE || 'http://127.0.0.1:3000';

function findLocalDb() {
  const files = globSync('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite');
  if (!files.length) throw new Error('Local D1 sqlite not found — run db:migrate:local first');
  return resolve(files[0]);
}

async function api(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${SESSION}`,
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let json: unknown;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, json };
}

async function main() {
  const failures: string[] = [];

  const create = await api('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Smoke', content: 'Smoke test note', tags: 'smoke' }),
  });
  const createJson = create.json as { note?: { id: number } };
  if (create.status !== 200 || !createJson?.note?.id) {
    failures.push(`Notes create failed: ${create.status} ${JSON.stringify(create.json)}`);
  } else {
    const id = createJson.note.id;
    const search = await api('/api/notes/search?q=Smoke');
    const searchJson = search.json as { notes?: unknown[] };
    if (search.status !== 200 || !searchJson?.notes?.length) {
      failures.push('Notes search failed');
    }
    await api(`/api/notes/${id}`, { method: 'DELETE' });
    console.log('Notes API: OK');
  }

  const dbPath = findLocalDb();
  const db = createRenderD1Database({
    accountId: 'local',
    databaseId: 'local',
    apiToken: '',
    url: `file:${dbPath}`,
  });

  const user = await db.prepare('SELECT id, pin_hash FROM users WHERE id = 1').bind().first<{ id: number; pin_hash: string }>();
  if (!user) {
    failures.push('No user id=1 in local DB');
  } else {
    const countBefore = await db.prepare(
      'SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ?'
    ).bind(user.id).first<{ cnt: number }>();

    const result = await sendNotification(db, user.id, 'Integration Test', 'Notify smoke test', {
      pinHash: user.pin_hash,
      tags: ['bell', 'test'],
    });

    const countAfter = await db.prepare(
      'SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ?'
    ).bind(user.id).first<{ cnt: number }>();

    if ((countAfter?.cnt || 0) <= (countBefore?.cnt || 0)) {
      failures.push('sendNotification did not insert in-app notification');
    }
    console.log('sendNotification:', result, `(notifications: ${countBefore?.cnt} → ${countAfter?.cnt})`);

    const notifApi = await api('/api/chat/notifications/count');
    if (notifApi.status !== 200) {
      failures.push(`Notifications count API failed: ${notifApi.status}`);
    } else {
      console.log('Notifications count API:', notifApi.json);
    }
  }

  const tavilyCred = await db.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = 1 AND service = ?'
  ).bind('tavily_api_key').first<{ encrypted_value: string }>();
  const ntfyCred = await db.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = 1 AND service = ?'
  ).bind('ntfy_url').first<{ encrypted_value: string }>();

  console.log('Credentials:', {
    tavily: tavilyCred ? 'configured' : 'missing',
    ntfy: ntfyCred ? 'configured' : 'missing',
  });

  if (tavilyCred && user?.pin_hash) {
    try {
      const key = await decrypt(tavilyCred.encrypted_value, user.pin_hash);
      const tavilyRes = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: key, query: 'Cloudflare Workers', max_results: 2, search_depth: 'basic' }),
      });
      if (!tavilyRes.ok) failures.push(`Tavily live test failed: HTTP ${tavilyRes.status}`);
      else console.log('Tavily live test: OK');
    } catch (err: any) {
      failures.push(`Tavily live test error: ${err.message}`);
    }
  }

  if (ntfyCred && user?.pin_hash) {
    try {
      const url = await decrypt(ntfyCred.encrypted_value, user.pin_hash);
      const ntfyRes = await fetch(url.trim(), {
        method: 'POST',
        headers: { Title: 'Karna Test', Tags: 'bell,test', 'Content-Type': 'text/plain' },
        body: 'Integration test from scripts/test-integration.ts',
      });
      if (!ntfyRes.ok) failures.push(`Ntfy live test failed: HTTP ${ntfyRes.status}`);
      else console.log('Ntfy live test: OK');
    } catch (err: any) {
      failures.push(`Ntfy live test error: ${err.message}`);
    }
  }

  if (failures.length) {
    console.error('\nFAILURES:');
    failures.forEach(f => console.error(' -', f));
    process.exit(1);
  }
  console.log('\nAll integration checks passed.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
