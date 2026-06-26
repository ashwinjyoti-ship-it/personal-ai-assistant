#!/usr/bin/env npx tsx
/**
 * Memory Upgrade C smoke test — Active Decay + Compaction
 * Usage: npx tsx scripts/test-memory-upgrade-c.ts
 *
 * Requires: local D1 with migrations 0048 + 0049 applied (npm run db:migrate:local)
 */
import { globSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@libsql/client';
import { MemoryService } from '../src/services/memory';
import { decayScore, daysSince, HALF_LIFE_DAYS } from '../src/services/decay';

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

const TEST_USER = 999_997;

async function seedUser(db: D1Database) {
  await (db as any).prepare(
    `INSERT OR IGNORE INTO users (id, username, name, pin_hash, created_at, updated_at)
     VALUES (?, 'upgrade_c_test', 'Test User C', 'x', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
  ).bind(TEST_USER).run();
}

async function cleanup(db: D1Database) {
  await (db as any).prepare(`DELETE FROM memory WHERE user_id = ?`).bind(TEST_USER).run();
  await (db as any).prepare(`DELETE FROM users WHERE id = ?`).bind(TEST_USER).run();
}

async function main() {
  const db = makeD1(findLocalDb());
  const memory = new MemoryService(db);
  const failures: string[] = [];

  await seedUser(db);

  // ── Test 1: Pure decay function (no DB) ────────────────────────────────────
  try {
    // 30-day-old episodic memory (importance 5)
    // Formula: e^(-30/30) * (5/10) = e^(-1) * 0.5 ≈ 0.1839
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const score = decayScore('episodic', 5, thirtyDaysAgo);
    const expected = 0.184;
    if (Math.abs(score - expected) > 0.02) {
      failures.push(`Test 1 FAIL: decayScore = ${score.toFixed(4)}, expected ~${expected}`);
    } else {
      console.log(`Test 1 — Pure decay function: OK (score=${score.toFixed(4)})`);
    }

    // At exactly half_life_days with importance 10: e^(-1) * 1.0 ≈ 0.3679
    const halfLifeScore = decayScore('semantic', 10, new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
    const expectedHalfLife = Math.exp(-1); // ≈ 0.3679
    if (Math.abs(halfLifeScore - expectedHalfLife) > 0.02) {
      failures.push(`Test 1b FAIL: half-life score = ${halfLifeScore.toFixed(4)}, expected ~${expectedHalfLife.toFixed(4)}`);
    } else {
      console.log(`Test 1b — Half-life check: OK (score=${halfLifeScore.toFixed(4)})`);
    }

    // daysSince sanity check
    const days = daysSince(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    if (Math.abs(days - 7) > 0.1) {
      failures.push(`Test 1c FAIL: daysSince = ${days.toFixed(2)}, expected ~7`);
    } else {
      console.log(`Test 1c — daysSince: OK (${days.toFixed(2)} days)`);
    }
  } catch (e) {
    failures.push(`Test 1 FAIL: ${e}`);
  }

  // ── Test 2: Decay applied to retrieval ranking ──────────────────────────────
  try {
    // Store 3 memories — manually set last_accessed_at after insert
    await memory.store(TEST_USER, 'fact', 'decay-fresh', 'search target content', 5, 'long_term');
    await memory.store(TEST_USER, 'fact', 'decay-60d', 'search target content', 5, 'long_term');
    await memory.store(TEST_USER, 'fact', 'decay-365d', 'search target content', 5, 'long_term');

    // Backdate last_accessed_at on two of them
    await (db as any).prepare(
      `UPDATE memory SET last_accessed_at = datetime('now', '-60 days'), decay_score = 0.6
       WHERE user_id = ? AND title = 'decay-60d'`
    ).bind(TEST_USER).run();
    await (db as any).prepare(
      `UPDATE memory SET last_accessed_at = datetime('now', '-365 days'), decay_score = 0.05
       WHERE user_id = ? AND title = 'decay-365d'`
    ).bind(TEST_USER).run();
    // fresh one: decay_score stays at 1.0

    const results = await memory.search(TEST_USER, 'search target content', 10);
    const relevant = results.filter(r => ['decay-fresh', 'decay-60d', 'decay-365d'].includes(r.title));

    if (relevant.length < 3) {
      failures.push(`Test 2 FAIL: only ${relevant.length} of 3 memories found`);
    } else {
      const titles = relevant.map(r => r.title);
      const freshIdx = titles.indexOf('decay-fresh');
      const oldIdx = titles.indexOf('decay-365d');
      if (freshIdx > oldIdx) {
        failures.push(`Test 2 FAIL: fresh (${freshIdx}) ranked below old (${oldIdx}). Order: ${titles.join(', ')}`);
      } else {
        console.log(`Test 2 — Decay-weighted retrieval ranking: OK (order: ${titles.join(' > ')})`);
      }
    }
  } catch (e) {
    failures.push(`Test 2 FAIL: ${e}`);
  }

  // ── Test 3: Compaction collapses low-score memories ────────────────────────
  try {
    // Insert 5 episodic memories with decay_score forced to 0.05
    for (let i = 1; i <= 5; i++) {
      await memory.store(TEST_USER, 'episodic', `compact-ep-${i}`, `Old episodic event ${i}`, 3, 'long_term');
    }
    await (db as any).prepare(
      `UPDATE memory SET decay_score = 0.05
       WHERE user_id = ? AND title LIKE 'compact-ep-%'`
    ).bind(TEST_USER).run();

    const result = await memory.compactLowScoreMemories(TEST_USER, 0.1);

    if (result.compactedCount < 5) {
      failures.push(`Test 3 FAIL: compactedCount = ${result.compactedCount}, expected >= 5`);
    } else if (result.summaryIds.length === 0) {
      failures.push('Test 3 FAIL: no summaryIds returned');
    } else {
      // Verify originals are superseded
      const originals = await (db as any).prepare(
        `SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND title LIKE 'compact-ep-%' AND valid_until IS NULL`
      ).bind(TEST_USER).first<{ cnt: number }>();
      if ((originals?.cnt || 0) > 0) {
        failures.push(`Test 3 FAIL: ${originals?.cnt} originals still have valid_until = NULL`);
      } else {
        // Verify summary exists
        const summary = await (db as any).prepare(
          `SELECT * FROM memory WHERE user_id = ? AND type = 'summary' AND source = 'compaction' AND valid_until IS NULL`
        ).bind(TEST_USER).first<{ content: string }>();
        if (!summary) {
          failures.push('Test 3 FAIL: compaction summary not found');
        } else {
          console.log(`Test 3 — Compaction: OK (compacted=${result.compactedCount}, summaries=${result.summaryIds.length})`);
        }
      }
    }
  } catch (e) {
    failures.push(`Test 3 FAIL: ${e}`);
  }

  // ── Test 4: Touch updates last_accessed_at ──────────────────────────────────
  try {
    await memory.store(TEST_USER, 'fact', 'touch-test', 'touch me please', 7, 'long_term');
    // Backdate last_accessed_at to 100 days ago
    await (db as any).prepare(
      `UPDATE memory SET last_accessed_at = datetime('now', '-100 days')
       WHERE user_id = ? AND title = 'touch-test'`
    ).bind(TEST_USER).run();

    const before = await (db as any).prepare(
      `SELECT last_accessed_at FROM memory WHERE user_id = ? AND title = 'touch-test'`
    ).bind(TEST_USER).first<{ last_accessed_at: string }>();

    // Trigger touch via search
    await memory.search(TEST_USER, 'touch me please', 5);

    const after = await (db as any).prepare(
      `SELECT last_accessed_at FROM memory WHERE user_id = ? AND title = 'touch-test'`
    ).bind(TEST_USER).first<{ last_accessed_at: string }>();

    if (!after?.last_accessed_at || after.last_accessed_at === before?.last_accessed_at) {
      failures.push(`Test 4 FAIL: last_accessed_at did not update. Before: ${before?.last_accessed_at}, After: ${after?.last_accessed_at}`);
    } else {
      console.log('Test 4 — Touch updates last_accessed_at: OK');
    }
  } catch (e) {
    failures.push(`Test 4 FAIL: ${e}`);
  }

  // ── Test 5: getByDecayScore returns high-signal memories ───────────────────
  try {
    // Insert 5 memories with specific decay scores
    const scores = [0.05, 0.2, 0.5, 0.8, 1.0];
    for (const score of scores) {
      await memory.store(TEST_USER, 'fact', `score-${score}`, `content for ${score}`, 5, 'long_term');
      await (db as any).prepare(
        `UPDATE memory SET decay_score = ? WHERE user_id = ? AND title = ?`
      ).bind(score, TEST_USER, `score-${score}`).run();
    }

    const high = await memory.getByDecayScore(TEST_USER, 0.5);
    const highTitles = high.map(r => r.title).filter(t => t.startsWith('score-'));

    if (!highTitles.includes('score-0.5') || !highTitles.includes('score-0.8') || !highTitles.includes('score-1')) {
      failures.push(`Test 5 FAIL: missing high-score memories. Got: ${highTitles.join(', ')}`);
    } else if (highTitles.includes('score-0.05') || highTitles.includes('score-0.2')) {
      failures.push(`Test 5 FAIL: low-score memories leaked through. Got: ${highTitles.join(', ')}`);
    } else {
      // Verify ordering (decay_score DESC)
      const decayScores = high.filter(r => r.title.startsWith('score-')).map(r => r.decay_score ?? 0);
      const isSorted = decayScores.every((s, i) => i === 0 || s <= decayScores[i - 1]);
      if (!isSorted) {
        failures.push(`Test 5 FAIL: not sorted DESC. Scores: ${decayScores.join(', ')}`);
      } else {
        console.log(`Test 5 — getByDecayScore: OK (${highTitles.length} high-signal memories)`);
      }
    }
  } catch (e) {
    failures.push(`Test 5 FAIL: ${e}`);
  }

  // ── Test 6: recomputeDecayScores works ─────────────────────────────────────
  try {
    // Store a fresh memory, then manually set decay_score to 0 and last_accessed_at to now
    await memory.store(TEST_USER, 'preference', 'recompute-test', 'recompute me', 10, 'long_term');
    await (db as any).prepare(
      `UPDATE memory SET decay_score = 0, last_accessed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND title = 'recompute-test'`
    ).bind(TEST_USER).run();

    const count = await memory.recomputeDecayScores(TEST_USER);
    if (count === 0) {
      failures.push('Test 6 FAIL: recomputeDecayScores returned 0');
    } else {
      const updated = await (db as any).prepare(
        `SELECT decay_score FROM memory WHERE user_id = ? AND title = 'recompute-test'`
      ).bind(TEST_USER).first<{ decay_score: number }>();
      // Preference accessed now with importance 10 → score should be ~1.0
      if (!updated || updated.decay_score < 0.9) {
        failures.push(`Test 6 FAIL: decay_score after recompute = ${updated?.decay_score}, expected ~1.0`);
      } else {
        console.log(`Test 6 — recomputeDecayScores: OK (score=${updated.decay_score.toFixed(4)}, rows=${count})`);
      }
    }
  } catch (e) {
    failures.push(`Test 6 FAIL: ${e}`);
  }

  // ── Cleanup ────────────────────────────────────────────────────────────────
  await cleanup(db);

  // ── Summary ────────────────────────────────────────────────────────────────
  if (failures.length === 0) {
    console.log('\nAll Upgrade C tests passed ✓');
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
