#!/usr/bin/env npx tsx
/**
 * Federation test suite — Karna ↔ Eddy
 * Tests 1-2: pure function tests (always run)
 * Tests 3-5: require EDDY_BASE_URL env var
 * Tests 6-7: require local D1
 */

import { globSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@libsql/client';
import { detectSoundDomain } from '../src/services/router';
import { eddyHealth, eddyRecall } from '../src/services/eddy-client';
import { answerWithFederation } from '../src/services/federation';
import { MemoryService } from '../src/services/memory';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) { console.log(`  ✅ ${message}`); passed++; }
  else { console.error(`  ❌ ${message}`); failed++; }
}

// ─── Test 1: detectSoundDomain ─────────────────────────────────────────────
console.log('\nTest 1: detectSoundDomain classifies sound queries');
assert(detectSoundDomain('What mics did we use on Hamilton?'), 'Hamilton with "mic" = sound domain');
assert(detectSoundDomain('Which wireless did we have at the Pantages?'), 'Pantages = sound domain');
assert(detectSoundDomain('Did we use Shure on Wicked?'), 'Shure = sound domain');
assert(!detectSoundDomain('What time is my meeting tomorrow?'), 'Calendar query = not sound domain');
assert(!detectSoundDomain('Send an email to John'), 'Email query = not sound domain');

// ─── Test 2: eddy-client gracefully fails when no URL ─────────────────────
console.log('\nTest 2: eddy-client graceful degradation (no EDDY_BASE_URL)');
const origUrl = process.env.EDDY_BASE_URL;
delete process.env.EDDY_BASE_URL;
const noUrlResult = await eddyRecall({ query: 'Hamilton' });
assert(!noUrlResult.success, 'Returns failure when EDDY_BASE_URL not set');
assert(noUrlResult.source === 'eddy:config', `source = eddy:config (got ${noUrlResult.source})`);
const noUrlHealth = await eddyHealth();
assert(!noUrlHealth, 'eddyHealth returns false when no URL');
if (origUrl) process.env.EDDY_BASE_URL = origUrl;

// ─── Tests 3-5: require EDDY_BASE_URL ─────────────────────────────────────
const eddyUrl = process.env.EDDY_BASE_URL;
if (!eddyUrl) {
  console.log('\n⚠️  Skipping Eddy live tests — EDDY_BASE_URL not set');
} else {
  console.log(`\nTest 3: Eddy health check (${eddyUrl})`);
  const healthy = await eddyHealth();
  assert(healthy, `Eddy is reachable at ${eddyUrl}/api/health`);

  console.log('\nTest 4: Eddy recall returns structured data');
  const recallResult = await eddyRecall({ query: 'Hamilton' });
  if (recallResult.success) {
    assert(typeof recallResult.showName === 'string', `showName is string (got ${recallResult.showName})`);
    assert(Array.isArray(recallResult.gear), 'gear is array');
    console.log(`  ℹ️  Found: ${recallResult.showName} with ${recallResult.gear?.length ?? 0} gear items`);
  } else {
    console.log(`  ⚠️  No Hamilton job in Eddy (${recallResult.error}) — trying any query`);
    const anyResult = await eddyRecall({ query: 'show' });
    assert(typeof anyResult === 'object', 'recall returns object');
  }

  // ─── Test 5: requires local D1 ──────────────────────────────────────────
  function findLocalDb(): string | null {
    try {
      const files = globSync('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite');
      return files.length ? resolve(files[0]) : null;
    } catch { return null; }
  }

  const dbPath = process.env.RENDER_D1_LIBSQL_URL?.replace('file:', '') ?? findLocalDb();
  if (!dbPath) {
    console.log('\n⚠️  Skipping federation memory tests — local D1 not found');
  } else {
    const client = createClient({ url: `file:${dbPath}` });
    const prepare = (sql: string) => {
      let boundArgs: unknown[] = [];
      const stmt = {
        bind: (...args: unknown[]) => { boundArgs = args; return stmt; },
        run: async () => { const r = await client.execute({ sql, args: boundArgs as never[] }); return { meta: { last_row_id: r.lastInsertRowid } }; },
        first: async <T>() => { const r = await client.execute({ sql, args: boundArgs as never[] }); return (r.rows[0] ?? null) as T | null; },
        all: async <T>() => { const r = await client.execute({ sql, args: boundArgs as never[] }); return { results: r.rows as unknown as T[] }; },
      };
      return stmt;
    };
    const db = { prepare } as unknown as D1Database;
    const memory = new MemoryService(db);
    const testUser = await (db as any).prepare('SELECT id FROM users LIMIT 1').first<{id:number}>();

    if (!testUser) {
      console.log('\n⚠️  Skipping federation DB tests — no users in DB');
    } else {
      const userId = testUser.id;

      console.log('\nTest 5: Federation saves Eddy result to memory (low confidence path)');
      const fedResult = await answerWithFederation(memory, userId, 'What wireless gear on Cats last year?');
      if (fedResult.source === 'eddy') {
        assert(fedResult.memorySaved, 'Memory saved after Eddy call');
        assert(typeof fedResult.answer === 'string' && fedResult.answer.length > 0, 'Answer is non-empty');
        console.log(`  ℹ️  Eddy returned: ${fedResult.eddyResponse?.showName ?? 'no show'}`);
      } else if (fedResult.source === 'uncertain') {
        console.log(`  ℹ️  Eddy had no match (source=uncertain) — this is valid if Cats doesn't exist in Eddy`);
        assert(typeof fedResult.answer === 'string', 'Answer is string on uncertain path');
      } else {
        console.log(`  ℹ️  Memory already had an answer (source=${fedResult.source})`);
        assert(typeof fedResult.answer === 'string', 'Answer is string on memory path');
      }

      console.log('\nTest 6: Seeded memory answers without calling Eddy');
      await memory.storeTyped({
        userId,
        type: 'episodic',
        title: 'Wicked gear',
        content: '6x Shure URX wireless mics used on Wicked at the Pantages',
        occurredAt: '2026-03-15',
        source: 'tool:eddy',
        entities: ['Wicked', 'Shure URX', 'Pantages'],
        tier: 'long_term',
      });
      const fedMem = await answerWithFederation(memory, userId, 'What mics did we use on Wicked?');
      assert(fedMem.source === 'memory', `Should answer from memory (got ${fedMem.source})`);
      assert(!fedMem.eddyResponse, 'Eddy should NOT be called when memory has answer');
      console.log(`  ℹ️  Memory path answer: ${fedMem.answer.slice(0, 60)}...`);
    }
  }
}

// ─── Test 7: Prior test suites still pass ─────────────────────────────────
console.log('\nTest 7: Upgrade E tests still pass (regression check)');
try {
  const { execSync } = await import('child_process');
  execSync('npx tsx scripts/test-memory-upgrade-e.ts', { stdio: 'pipe' });
  assert(true, 'test-memory-upgrade-e.ts passes');
} catch {
  assert(false, 'test-memory-upgrade-e.ts FAILED — regression detected');
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
