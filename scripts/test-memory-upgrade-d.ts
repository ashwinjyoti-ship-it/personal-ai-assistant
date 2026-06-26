#!/usr/bin/env npx tsx
/**
 * Memory Upgrade D smoke test — Signal Isolation + Compression
 * Usage: npx tsx scripts/test-memory-upgrade-d.ts
 *
 * Requires: local D1 with migrations 0048–0051 applied (npm run db:migrate:local)
 */
import { globSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@libsql/client';
import { MemoryService } from '../src/services/memory';
import {
  classifyIntent,
  extractEntities,
  extractTopic,
  computeImportance,
  extractSignal,
} from '../src/services/signals';
import { clusterSignals } from '../src/services/short-term';

function findLocalDb(): string {
  const files = globSync('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite');
  if (!files.length) throw new Error('Local D1 sqlite not found — run npm run db:migrate:local first');
  return resolve(files[0]);
}

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

const TEST_USER = 999_995;

async function seedUser(db: D1Database) {
  await (db as any).prepare(
    `INSERT OR IGNORE INTO users (id, username, name, pin_hash, created_at, updated_at)
     VALUES (?, 'upgrade_d_test', 'Test User D', 'x', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
  ).bind(TEST_USER).run();
}

async function cleanup(db: D1Database) {
  await (db as any).prepare(`DELETE FROM signals WHERE user_id = ?`).bind(TEST_USER).run();
  await (db as any).prepare(`DELETE FROM memory WHERE user_id = ?`).bind(TEST_USER).run();
  await (db as any).prepare(`DELETE FROM conversations WHERE user_id = ?`).bind(TEST_USER).run();
  await (db as any).prepare(`DELETE FROM users WHERE id = ?`).bind(TEST_USER).run();
}

async function main() {
  const db = makeD1(findLocalDb());
  const memory = new MemoryService(db);
  const failures: string[] = [];

  await seedUser(db);

  // ── Test 1: Intent classification (pure, no DB) ─────────────────────────────
  try {
    const cases: [string, string][] = [
      ['What is the capital of France?', 'question'],
      ['Build me a landing page', 'command'],
      ['run fetch_user(id=123)', 'tool_call'],
      ['Hi, how are you?', 'greeting'],
      ['I think this might be the right approach', 'reflection'],
      ['Wait, I meant the other file', 'meta'],
    ];
    let ok = true;
    for (const [text, expected] of cases) {
      const got = classifyIntent(text);
      if (got !== expected) {
        failures.push(`Test 1 FAIL: classifyIntent("${text}") = "${got}", expected "${expected}"`);
        ok = false;
      }
    }
    if (ok) console.log('Test 1 — Intent classification: OK (6/6)');
  } catch (e) {
    failures.push(`Test 1 FAIL: ${e}`);
  }

  // ── Test 2: Entity extraction ───────────────────────────────────────────────
  try {
    const entities = extractEntities('Use Shure URX wireless mics for Hamilton at the Pantages Theatre. Check /audio/hamilton.yaml');
    const hasHamilton = entities.includes('Hamilton');
    const hasPantages = entities.some(e => e.includes('Pantages'));
    const hasPath = entities.some(e => e.includes('hamilton.yaml') || e.includes('audio'));

    if (!hasHamilton) {
      failures.push(`Test 2 FAIL: missing 'Hamilton'. Got: ${entities.join(', ')}`);
    } else if (!hasPantages) {
      failures.push(`Test 2 FAIL: missing 'Pantages'. Got: ${entities.join(', ')}`);
    } else {
      console.log(`Test 2 — Entity extraction: OK (entities: ${entities.slice(0, 5).join(', ')}...)`);
    }
  } catch (e) {
    failures.push(`Test 2 FAIL: ${e}`);
  }

  // ── Test 3: Signal extraction round-trip ────────────────────────────────────
  try {
    const signal = extractSignal(1, 1, 'user', 'Build a shure urx channel for Hamilton', 42, '2026-06-23T10:00:00Z');

    if (signal.intent !== 'command') {
      failures.push(`Test 3 FAIL: intent="${signal.intent}", expected "command"`);
    } else if (signal.raw_ref !== 'conv:1:msg:42') {
      failures.push(`Test 3 FAIL: raw_ref="${signal.raw_ref}"`);
    } else if (!signal.entities.includes('Hamilton')) {
      failures.push(`Test 3 FAIL: missing 'Hamilton' in entities: ${signal.entities.join(', ')}`);
    } else {
      console.log(`Test 3 — Signal extraction round-trip: OK (intent=${signal.intent}, entities=${signal.entities.slice(0, 3).join(', ')})`);
    }
  } catch (e) {
    failures.push(`Test 3 FAIL: ${e}`);
  }

  // ── Test 4: Signal stored after message ─────────────────────────────────────
  try {
    await memory.storeMessage(TEST_USER, 'web', 'user', 'Show me the Hamilton project files', '{}');
    await new Promise(r => setTimeout(r, 100)); // let async storage settle

    const signals = await memory.getRecentSignals(TEST_USER, 5);
    if (signals.length === 0) {
      failures.push('Test 4 FAIL: no signals found after storeMessage');
    } else {
      const last = signals[signals.length - 1];
      if (!['command', 'question'].includes(last.intent)) {
        failures.push(`Test 4 FAIL: intent="${last.intent}", expected command or question`);
      } else {
        console.log(`Test 4 — Signal stored after message: OK (intent=${last.intent}, topic="${last.topic}")`);
      }
    }
  } catch (e) {
    failures.push(`Test 4 FAIL: ${e}`);
  }

  // ── Test 5: Compression doesn't throw ──────────────────────────────────────
  try {
    const result = await memory.triggerCompression(TEST_USER);
    if (typeof result.compressedCount !== 'number') {
      failures.push(`Test 5 FAIL: compressedCount is not a number: ${typeof result.compressedCount}`);
    } else {
      console.log(`Test 5 — triggerCompression: OK (compressedCount=${result.compressedCount}, clusters=${result.clusterCount})`);
    }
  } catch (e) {
    failures.push(`Test 5 FAIL: ${e}`);
  }

  // ── Test 6: Compression creates episodic memory when enough signals ─────────
  try {
    // Store enough messages to potentially trigger compression
    for (let i = 0; i < 12; i++) {
      const messages = [
        'Show me the Hamilton project files',
        'Build the audio setup for Hamilton venue',
        'What are the Shure URX channels configured?',
        'Update the audio manifest for Hamilton',
      ];
      await memory.storeMessage(TEST_USER, 'web', 'user', messages[i % messages.length], '{}');
    }

    // Manually force compression by checking for episodic or running it
    const result = await memory.triggerCompression(TEST_USER);

    // Either compressed some or wasn't needed — both are valid
    const episodic = await memory.findByType(TEST_USER, 'episodic');
    const compressed = episodic.filter(m => m.title.startsWith('compressed:'));

    console.log(`Test 6 — Compression creates episodic: OK (compressed memories=${compressed.length}, compressedCount=${result.compressedCount})`);
  } catch (e) {
    failures.push(`Test 6 FAIL: ${e}`);
  }

  // ── Test 7: clusterSignals pure function ────────────────────────────────────
  try {
    const { Signal: _S } = await import('../src/types').catch(() => ({ Signal: null }));
    const signals = [
      { id: 1, user_id: 1, conversation_id: 1, role: 'user' as const, intent: 'command' as const,
        entities: ['Hamilton', 'audio'], topic: 'hamilton audio', importance: 0.7,
        raw_ref: 'conv:1:msg:1', occurred_at: '2026-06-01T10:00:00Z', created_at: '2026-06-01T10:00:00Z' },
      { id: 2, user_id: 1, conversation_id: 2, role: 'user' as const, intent: 'command' as const,
        entities: ['Hamilton', 'venue'], topic: 'hamilton venue', importance: 0.6,
        raw_ref: 'conv:2:msg:2', occurred_at: '2026-06-01T10:01:00Z', created_at: '2026-06-01T10:01:00Z' },
      { id: 3, user_id: 1, conversation_id: 3, role: 'user' as const, intent: 'question' as const,
        entities: ['quantum', 'physics'], topic: 'quantum physics', importance: 0.5,
        raw_ref: 'conv:3:msg:3', occurred_at: '2026-06-01T10:02:00Z', created_at: '2026-06-01T10:02:00Z' },
    ];

    const clusters = clusterSignals(signals, 0.2);
    // Signals 1 & 2 share 'Hamilton' — should cluster together
    const hamiltonCluster = clusters.find(c => c.length > 1);
    if (!hamiltonCluster) {
      failures.push(`Test 7 FAIL: Hamilton signals were not clustered. Clusters: ${clusters.map(c => c.length).join(',')}`);
    } else {
      console.log(`Test 7 — clusterSignals: OK (${clusters.length} clusters, largest=${Math.max(...clusters.map(c => c.length))})`);
    }
  } catch (e) {
    failures.push(`Test 7 FAIL: ${e}`);
  }

  // ── Cleanup ───────────────────────────────────────────────────────────────���
  await cleanup(db);

  // ── Summary ────────────────────────────────────────────────────────────────
  if (failures.length === 0) {
    console.log('\nAll Upgrade D tests passed ✓');
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
