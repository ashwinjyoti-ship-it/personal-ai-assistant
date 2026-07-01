#!/usr/bin/env npx tsx
/** Quick research path test using local Exa credential + mock LLM */
import { createRenderD1Database } from '../src/render/d1-adapter';
import { decrypt } from '../src/services/crypto';
import { conductResearch } from '../src/services/research';
import { globSync } from 'node:fs';
import { resolve } from 'node:path';

const dbPath = resolve(globSync('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite')[0]);
const db = createRenderD1Database({ accountId: 'l', databaseId: 'l', apiToken: '', url: `file:${dbPath}` });

const user = await db.prepare('SELECT pin_hash FROM users WHERE id = 1').bind().first<{ pin_hash: string }>();
const cred = await db.prepare(
  'SELECT encrypted_value FROM credentials WHERE user_id = 1 AND service = ?'
).bind('exa_api_key').first<{ encrypted_value: string }>();

if (!user || !cred) {
  console.error('Missing user or exa credential');
  process.exit(1);
}

const exaKey = await decrypt(cred.encrypted_value, user.pin_hash);

const mockProvider = {
  chat: async () => ({ content: 'Mock research report about Cloudflare Workers edge computing.' }),
};

const result = await conductResearch('What is Cloudflare Workers?', mockProvider as any, {
  depth: 'quick',
  exaKey,
});

if (result.error) {
  console.error('Research failed:', result.error);
  process.exit(1);
}

console.log('Research Exa fallback path: OK');
console.log('Pages read:', result.pagesRead);
console.log('Sources:', result.sources.length);
console.log('Report preview:', result.report.slice(0, 120) + '...');
