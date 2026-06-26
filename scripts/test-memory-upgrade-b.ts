#!/usr/bin/env npx tsx
/**
 * Memory Upgrade B smoke test — Typed Memories + Bi-Temporal Tracking
 * Usage: npx tsx scripts/test-memory-upgrade-b.ts
 *
 * Requires: local D1 with migration 0048 applied (npm run db:migrate:local)
 */
import { globSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@libsql/client';
import { MemoryService } from '../src/services/memory';

function findLocalDb(): string {
  const files = globSync('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite');
  if (!files.length) throw new Error('Local D1 sqlite not found — run npm run db:migrate:local first');
  return resolve(files[0]);
}

// Minimal D1Database shim backed by libsql for local testing
function makeD1(dbPath: string): D1Database {
  const client = createClient({ url: `file:${dbPath}` });

  const prepare = (sql: string) => {
    let boundArgs: unknown[] = [];
    const stmt = {
      bind: (...args: unknown[]) => { boundArgs = args; return stmt; },
      run: async () => {
        const r = await client.execute({ sql, args: boundArgs as never[] });
        return { meta: { last_row_id: r.lastInsertRowid } };
      },
      first: async <T>() => {
        const r = await client.execute({ sql, args: boundArgs as never[] });
        return (r.rows[0] ?? null) as T | null;
      },
      all: async <T>() => {
        const r = await client.execute({ sql, args: boundArgs as never[] });
        return { results: r.rows as unknown as T[] };
      },
    };
    return stmt;
  };

  return { prepare } as unknown as D1Database;
}

async function main() {
  const db = makeD1(findLocalDb());
  const memory = new MemoryService(db);

  const failures: string[] = [];
  const TEST_USER = 999_998; // ephemeral test user id — cleaned up after

  // Seed a fake user row so FK constraint passes
  await (db as any).prepare(
    `INSERT OR IGNORE INTO users (id, username, name, pin_hash, created_at, updated_at)
     VALUES (?, 'upgrade_b_test', 'Test User', 'x', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
  ).bind(TEST_USER).run();

  // ── Test 1: New memory types accepted ────────────────────────────────────
  try {
    const id1 = await memory.storeTyped({
      userId: TEST_USER,
      type: 'episodic',
      title: 'Hamilton June 15',
      content: '8x Shure URX',
      occurredAt: '2026-06-15T19:00:00Z',
    });
    const id2 = await memory.storeTyped({
      userId: TEST_USER,
      type: 'semantic',
      title: 'Hamilton schedule',
      content: 'Thursdays at 8pm',
    });
    if (id1 > 0 && id2 > 0) {
      console.log('Test 1 — New memory types accepted: OK');
    } else {
      failures.push('Test 1 FAIL: storeTyped returned unexpected ids');
    }
  } catch (e) {
    failures.push(`Test 1 FAIL: ${e}`);
  }

  // ── Test 2: Bi-temporal columns persisted correctly ──────────────────────
  try {
    const rows = await memory.findByType(TEST_USER, 'episodic');
    const row = rows.find(r => r.title === 'Hamilton June 15');
    if (!row) {
      failures.push('Test 2 FAIL: episodic row not found');
    } else if (row.occurred_at !== '2026-06-15T19:00:00Z') {
      failures.push(`Test 2 FAIL: occurred_at = ${row.occurred_at}`);
    } else if (row.valid_until !== null && row.valid_until !== undefined) {
      failures.push(`Test 2 FAIL: valid_until should be null, got ${row.valid_until}`);
    } else if (row.source !== 'user') {
      failures.push(`Test 2 FAIL: source = ${row.source}`);
    } else {
      console.log('Test 2 — Bi-temporal columns persisted: OK');
    }
  } catch (e) {
    failures.push(`Test 2 FAIL: ${e}`);
  }

  // ── Test 3: Supersede behavior ───────────────────────────────────────────
  try {
    await memory.storeTyped({
      userId: TEST_USER,
      type: 'semantic',
      title: 'Hamilton venue',
      content: 'Pantages Theatre',
    });
    // Short sleep so timestamps differ
    await new Promise(r => setTimeout(r, 10));
    await memory.storeTyped({
      userId: TEST_USER,
      type: 'semantic',
      title: 'Hamilton venue',
      content: 'Dolby Theatre',
    });

    // Active fact = only Dolby
    const active = await memory.findByType(TEST_USER, 'semantic', { limit: 50 });
    const activeVenue = active.filter(r => r.title === 'Hamilton venue');
    if (activeVenue.length !== 1) {
      failures.push(`Test 3 FAIL: expected 1 active venue, got ${activeVenue.length}`);
    } else if (activeVenue[0].content !== 'Dolby Theatre') {
      failures.push(`Test 3 FAIL: active venue content = ${activeVenue[0].content}`);
    } else {
      // History (via recallAt far future) should return both
      const all = await memory.recallAt(TEST_USER, '2099-01-01T00:00:00Z', 'Hamilton venue', 50);
      const venueAll = all.filter(r => r.title === 'Hamilton venue');
      const pantages = venueAll.find(r => r.content === 'Pantages Theatre');
      if (!pantages) {
        failures.push('Test 3 FAIL: old Pantages record not found in history');
      } else if (!pantages.valid_until) {
        failures.push('Test 3 FAIL: old Pantages record has no valid_until set');
      } else {
        console.log('Test 3 — Supersede behavior: OK');
      }
    }
  } catch (e) {
    failures.push(`Test 3 FAIL: ${e}`);
  }

  // ── Test 4: Point-in-time recall ─────────────────────────────────────────
  try {
    await memory.storeTyped({
      userId: TEST_USER,
      type: 'episodic',
      title: 'Show A',
      content: 'Jan event',
      occurredAt: '2026-01-15T00:00:00Z',
    });
    await memory.storeTyped({
      userId: TEST_USER,
      type: 'episodic',
      title: 'Show B',
      content: 'Mar event',
      occurredAt: '2026-03-15T00:00:00Z',
    });
    await memory.storeTyped({
      userId: TEST_USER,
      type: 'episodic',
      title: 'Show C',
      content: 'May event',
      occurredAt: '2026-05-15T00:00:00Z',
    });
    const inFeb = await memory.recallAt(TEST_USER, '2026-02-15T00:00:00Z', 'event');
    const titles = inFeb.map(r => r.title);
    if (!titles.includes('Show A')) {
      failures.push(`Test 4 FAIL: Show A missing from Feb recall. Got: ${titles.join(', ')}`);
    } else if (titles.includes('Show B') || titles.includes('Show C')) {
      failures.push(`Test 4 FAIL: Future shows leaked into Feb recall. Got: ${titles.join(', ')}`);
    } else {
      console.log('Test 4 — Point-in-time recall: OK');
    }
  } catch (e) {
    failures.push(`Test 4 FAIL: ${e}`);
  }

  // ── Test 5: No regression — existing store() still works ─────────────────
  try {
    await memory.store(TEST_USER, 'fact', 'legacy', 'this is an old-style fact', 7, 'working');
    const all = await memory.getAll(TEST_USER);
    const legacy = all.find(m => m.title === 'legacy');
    if (!legacy) {
      failures.push('Test 5 FAIL: legacy fact not found');
    } else if (legacy.type !== 'fact') {
      failures.push(`Test 5 FAIL: type = ${legacy.type}`);
    } else if (legacy.occurred_at !== null && legacy.occurred_at !== undefined) {
      failures.push(`Test 5 FAIL: occurred_at should be null, got ${legacy.occurred_at}`);
    } else {
      console.log('Test 5 — Existing store() backwards compat: OK');
    }
  } catch (e) {
    failures.push(`Test 5 FAIL: ${e}`);
  }

  // ── Test 6: findByType time range filter ─────────────────────────────────
  try {
    const q1 = await memory.findByType(TEST_USER, 'episodic', {
      from: '2026-02-01T00:00:00Z',
      to: '2026-04-30T00:00:00Z',
    });
    const titles = q1.map(r => r.title);
    if (!titles.includes('Show B')) {
      failures.push(`Test 6 FAIL: Show B missing from range. Got: ${titles.join(', ')}`);
    } else if (titles.includes('Show A') || titles.includes('Show C')) {
      failures.push(`Test 6 FAIL: out-of-range shows included. Got: ${titles.join(', ')}`);
    } else {
      console.log('Test 6 — findByType time range filter: OK');
    }
  } catch (e) {
    failures.push(`Test 6 FAIL: ${e}`);
  }

  // ── Cleanup ───────────────────────────────────────────────────────────────
  await (db as any).prepare(`DELETE FROM memory WHERE user_id = ?`).bind(TEST_USER).run();
  await (db as any).prepare(`DELETE FROM users WHERE id = ?`).bind(TEST_USER).run();

  // ── Summary ───────────────────────────────────────────────────────────────
  if (failures.length === 0) {
    console.log('\nAll Upgrade B tests passed ✓');
    process.exit(0);
  } else {
    console.error('\nFailures:');
    for (const f of failures) console.error(' ', f);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
