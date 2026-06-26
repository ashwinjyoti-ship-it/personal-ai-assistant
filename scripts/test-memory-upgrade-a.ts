#!/usr/bin/env npx tsx
/**
 * Memory Upgrade A smoke test — Vectors + Hybrid Search
 * Usage: npx tsx scripts/test-memory-upgrade-a.ts
 *
 * Requires: local D1 with migrations 0048–0050 applied (npm run db:migrate:local)
 * Tests 1–6 additionally require CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_D1_API_TOKEN
 * (embedding tests call the CF Workers AI REST API).
 */
import { globSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@libsql/client';
import { MemoryService } from '../src/services/memory';
import { cosineSimilarity, embed, EMBEDDING_DIM } from '../src/services/memory-embeddings';
import { keywordOverlap } from '../src/services/retrieval';

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

const TEST_USER = 999_996;

async function seedUser(db: D1Database) {
  await (db as any).prepare(
    `INSERT OR IGNORE INTO users (id, username, name, pin_hash, created_at, updated_at)
     VALUES (?, 'upgrade_a_test', 'Test User A', 'x', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
  ).bind(TEST_USER).run();
}

async function cleanup(db: D1Database) {
  await (db as any).prepare(`DELETE FROM memory WHERE user_id = ?`).bind(TEST_USER).run();
  await (db as any).prepare(`DELETE FROM users WHERE id = ?`).bind(TEST_USER).run();
}

const hasCfCreds = Boolean(
  process.env.CLOUDFLARE_ACCOUNT_ID?.trim() && process.env.CLOUDFLARE_D1_API_TOKEN?.trim()
);

async function main() {
  const db = makeD1(findLocalDb());
  const memory = new MemoryService(db);
  const failures: string[] = [];
  const skipped: string[] = [];

  await seedUser(db);

  if (!hasCfCreds) {
    console.log('NOTE: CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_D1_API_TOKEN not set.');
    console.log('      Tests 1–6 (embedding tests) will be skipped.');
    console.log('      Tests 7–8 (pure functions + regression) run regardless.\n');
  }

  // ── Test 1: Embedding generation ───────────────────────────────────────────
  if (!hasCfCreds) {
    skipped.push('Test 1 SKIPPED: CF credentials not configured');
  } else {
    try {
      const vec = await embed('Hamilton the musical');
      if (!vec) {
        failures.push('Test 1 FAIL: embed() returned null with credentials set');
      } else if (vec.length !== EMBEDDING_DIM) {
        failures.push(`Test 1 FAIL: expected dim ${EMBEDDING_DIM}, got ${vec.length}`);
      } else if (!vec.every(v => typeof v === 'number')) {
        failures.push('Test 1 FAIL: some values are not numbers');
      } else {
        console.log(`Test 1 — Embedding generation: OK (dim=${vec.length})`);
      }
    } catch (e) {
      failures.push(`Test 1 FAIL: ${e}`);
    }
  }

  // ── Test 2: Semantic similarity ─────────────────────────────────────────────
  if (!hasCfCreds) {
    skipped.push('Test 2 SKIPPED: CF credentials not configured');
  } else {
    try {
      const a = await embed('Shure wireless microphone URX');
      const b = await embed('URX radio mic for wireless');
      const c = await embed('completely unrelated topic like quantum physics');
      if (!a || !b || !c) {
        failures.push('Test 2 FAIL: embed returned null');
      } else {
        const simAB = cosineSimilarity(a, b);
        const simAC = cosineSimilarity(a, c);
        if (simAB <= 0.5) {
          failures.push(`Test 2 FAIL: simAB=${simAB.toFixed(4)} <= 0.5 (expected related)`);
        } else if (simAB <= simAC) {
          failures.push(`Test 2 FAIL: simAB=${simAB.toFixed(4)} not > simAC=${simAC.toFixed(4)}`);
        } else {
          console.log(`Test 2 — Semantic similarity: OK (simAB=${simAB.toFixed(4)}, simAC=${simAC.toFixed(4)})`);
        }
      }
    } catch (e) {
      failures.push(`Test 2 FAIL: ${e}`);
    }
  }

  // ── Test 3: H-town finds Hamilton ──────────────────────────────────────────
  if (!hasCfCreds) {
    skipped.push('Test 3 SKIPPED: CF credentials not configured');
  } else {
    try {
      await memory.storeTyped({
        userId: TEST_USER,
        type: 'semantic',
        title: 'Hamilton venue',
        content: 'Lin-Manuel Miranda show at Pantages Theatre',
      });
      await new Promise(r => setTimeout(r, 200));

      const results = await memory.searchHybrid(TEST_USER, 'H-town Broadway musical');
      const hamiltonResult = results.find(r => r.memory.title.includes('Hamilton'));

      if (!hamiltonResult) {
        failures.push(`Test 3 FAIL: Hamilton not found in results (got ${results.length} results)`);
      } else if (hamiltonResult.vectorScore <= 0.3) {
        failures.push(`Test 3 FAIL: vectorScore=${hamiltonResult.vectorScore.toFixed(4)} <= 0.3`);
      } else {
        console.log(`Test 3 — H-town finds Hamilton: OK (vectorScore=${hamiltonResult.vectorScore.toFixed(4)}, rank=${results.indexOf(hamiltonResult) + 1})`);
      }
    } catch (e) {
      failures.push(`Test 3 FAIL: ${e}`);
    }
  }

  // ── Test 4: Keyword match wins on exact strings ─────────────────────────────
  if (!hasCfCreds) {
    skipped.push('Test 4 SKIPPED: CF credentials not configured');
  } else {
    try {
      await memory.storeTyped({
        userId: TEST_USER, type: 'fact', title: 'Shure URX-200',
        content: '8 channels of wireless',
      });
      await memory.storeTyped({
        userId: TEST_USER, type: 'fact', title: 'Audio Technica wireless',
        content: '8 channels of wireless',
      });

      const results = await memory.searchHybrid(TEST_USER, 'URX-200');
      if (results.length === 0) {
        failures.push('Test 4 FAIL: no results returned');
      } else if (!results[0].memory.title.includes('URX-200')) {
        failures.push(`Test 4 FAIL: top result is "${results[0].memory.title}", expected Shure URX-200`);
      } else if (results[0].keywordScore < 0.3) {
        failures.push(`Test 4 FAIL: keywordScore=${results[0].keywordScore.toFixed(4)} too low`);
      } else {
        console.log(`Test 4 — Keyword match wins: OK (top="${results[0].memory.title}", kw=${results[0].keywordScore.toFixed(4)})`);
      }
    } catch (e) {
      failures.push(`Test 4 FAIL: ${e}`);
    }
  }

  // ── Test 5: Decay weighting affects ranking ─────────────────────────────────
  if (!hasCfCreds) {
    skipped.push('Test 5 SKIPPED: CF credentials not configured');
  } else {
    try {
      await memory.storeTyped({
        userId: TEST_USER, type: 'episodic', title: 'Event A', content: 'show last night',
      });
      await memory.storeTyped({
        userId: TEST_USER, type: 'episodic', title: 'Event B', content: 'show last night',
      });
      await (db as any).prepare(
        `UPDATE memory SET decay_score = 0.05, last_accessed_at = datetime('now', '-180 days')
         WHERE user_id = ? AND title = 'Event B'`
      ).bind(TEST_USER).run();

      const results = await memory.searchHybrid(TEST_USER, 'show last night');
      const eventA = results.find(r => r.memory.title === 'Event A');
      const eventB = results.find(r => r.memory.title === 'Event B');

      if (!eventA || !eventB) {
        failures.push(`Test 5 FAIL: missing Event A or B in results`);
      } else {
        const idxA = results.indexOf(eventA);
        const idxB = results.indexOf(eventB);
        if (idxA > idxB) {
          failures.push(`Test 5 FAIL: Event A (${idxA}) ranked below Event B (${idxB})`);
        } else {
          console.log(`Test 5 — Decay weighting: OK (A rank=${idxA + 1}, B rank=${idxB + 1})`);
        }
      }
    } catch (e) {
      failures.push(`Test 5 FAIL: ${e}`);
    }
  }

  // ── Test 6: Backfill works ──────────────────────────────────────────────────
  if (!hasCfCreds) {
    skipped.push('Test 6 SKIPPED: CF credentials not configured');
  } else {
    try {
      // Store 3 memories, then clear their embeddings
      for (let i = 1; i <= 3; i++) {
        await memory.storeTyped({
          userId: TEST_USER, type: 'fact', title: `backfill-${i}`, content: `content ${i}`,
        });
      }
      await (db as any).prepare(`UPDATE memory SET embedding = NULL WHERE user_id = ?`).bind(TEST_USER).run();

      const count = await memory.backfillEmbeddings(TEST_USER, 10);
      if (count < 3) {
        failures.push(`Test 6 FAIL: backfillEmbeddings returned ${count}, expected >= 3`);
      } else {
        const row = await (db as any).prepare(
          `SELECT COUNT(*) as cnt FROM memory WHERE user_id = ? AND embedding IS NOT NULL`
        ).bind(TEST_USER).first<{ cnt: number }>();
        if (!row || row.cnt < 3) {
          failures.push(`Test 6 FAIL: only ${row?.cnt ?? 0} rows have embeddings after backfill`);
        } else {
          console.log(`Test 6 — Backfill: OK (processed=${count}, embedded=${row.cnt})`);
        }
      }
    } catch (e) {
      failures.push(`Test 6 FAIL: ${e}`);
    }
  }

  // ── Test 7: Pure functions ──────────────────────────────────────────────────
  try {
    // cosineSimilarity: identical vectors → ~1.0
    const v = [0.1, 0.2, 0.3];
    const selfSim = cosineSimilarity(v, v);
    if (selfSim < 0.999) {
      failures.push(`Test 7a FAIL: self-similarity=${selfSim.toFixed(6)}, expected ~1.0`);
    } else {
      console.log(`Test 7a — cosineSimilarity(self): OK (${selfSim.toFixed(6)})`);
    }

    // Orthogonal → 0
    const orthSim = cosineSimilarity([1, 0, 0], [0, 1, 0]);
    if (Math.abs(orthSim) > 1e-9) {
      failures.push(`Test 7b FAIL: orthogonal similarity=${orthSim}, expected 0`);
    } else {
      console.log(`Test 7b — cosineSimilarity(orthogonal): OK (${orthSim})`);
    }

    // keywordOverlap
    const overlap = keywordOverlap('Hamilton venue', 'Hamilton is at the Pantages venue');
    if (overlap <= 0.5) {
      failures.push(`Test 7c FAIL: keywordOverlap=${overlap.toFixed(4)}, expected > 0.5`);
    } else {
      console.log(`Test 7c — keywordOverlap: OK (${overlap.toFixed(4)})`);
    }

    // Zero vector → 0
    const zeroSim = cosineSimilarity([0, 0, 0], [1, 2, 3]);
    if (zeroSim !== 0) {
      failures.push(`Test 7d FAIL: zero-vector similarity=${zeroSim}, expected 0`);
    } else {
      console.log(`Test 7d — cosineSimilarity(zero): OK (${zeroSim})`);
    }
  } catch (e) {
    failures.push(`Test 7 FAIL: ${e}`);
  }

  // ── Test 8: TypeScript types compile (runtime sanity) ──────────────────────
  try {
    // Verify MemoryService has the new methods
    const methodsExist =
      typeof memory.searchHybrid === 'function' &&
      typeof memory.searchSemantic === 'function' &&
      typeof memory.backfillEmbeddings === 'function';
    if (!methodsExist) {
      failures.push('Test 8 FAIL: one or more new methods missing from MemoryService');
    } else {
      console.log('Test 8 — MemoryService API shape: OK');
    }
  } catch (e) {
    failures.push(`Test 8 FAIL: ${e}`);
  }

  // ── Cleanup ────────────────────────────────────────────────────────────────
  await cleanup(db);

  // ── Summary ────────────────────────────────────────────────────────────────
  if (skipped.length > 0) {
    console.log('\nSkipped (need CF credentials):');
    for (const s of skipped) console.log(' ', s);
  }

  if (failures.length === 0) {
    console.log('\nAll Upgrade A tests passed ✓');
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
