#!/usr/bin/env npx tsx
/**
 * Test suite for Upgrade E: Meta-Cognitive Confidence + Anti-Hallucination Surface
 * Tests 1-5: pure functions (always run)
 * Tests 6-7: DB integration (require local D1)
 */

import { globSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@libsql/client';
import {
  getSourceTrust,
  computeRetrievalSimilarity,
  computeConfidence,
  confidenceSystemPromptSuffix,
  WEIGHT_RETRIEVAL,
  WEIGHT_DECAY,
} from '../src/services/confidence';
import { buildConfidenceContext, generateUncertaintyResponse } from '../src/services/confidence-queries';
import type { HybridResult } from '../src/services/retrieval';
import type { MemoryRecord } from '../src/types';
import { MemoryService } from '../src/services/memory';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ ${message}`);
    failed++;
  }
}

function assertClose(actual: number, expected: number, tolerance: number, message: string) {
  assert(Math.abs(actual - expected) <= tolerance, `${message} (got ${actual.toFixed(4)}, expected ~${expected})`);
}

function makeMemory(overrides: Partial<MemoryRecord> = {}): MemoryRecord {
  return {
    id: 1, user_id: 1, type: 'fact', tier: 'long_term',
    title: 'Test', content: 'Test content', importance: 5,
    entities: '[]', decay_score: 1.0,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    ...overrides,
  };
}

function makeHybrid(overrides: Partial<HybridResult> = {}): HybridResult {
  return {
    memory: makeMemory(),
    vectorScore: 0.5,
    keywordScore: 0.5,
    decayScore: 0.5,
    finalScore: 0.5,
    ...overrides,
  };
}

// ─── Test 1: Source trust values ───────────────────────────────────────────
console.log('\nTest 1: Source trust values');
assert(getSourceTrust('user') === 1.00, 'user = 1.00');
assert(getSourceTrust('tool:eddy') === 0.85, 'tool:eddy = 0.85');
assert(getSourceTrust('inferred:compression') === 0.70, 'inferred:compression = 0.70');
assert(getSourceTrust('inferred') === 0.50, 'inferred = 0.50');
assert(getSourceTrust(undefined) === 0.70, 'undefined = 0.70 (default)');
assert(getSourceTrust('randomunknown') === 0.70, 'unknown = 0.70 (default)');

// ─── Test 2: Retrieval similarity formula ──────────────────────────────────
console.log('\nTest 2: Retrieval similarity formula');
const hr2 = makeHybrid({ vectorScore: 0.9, keywordScore: 0.5 });
const sim = computeRetrievalSimilarity(hr2);
// 0.9 * 0.55 + 0.5 * 0.25 = 0.495 + 0.125 = 0.62
assertClose(sim, 0.62, 0.01, 'sim = 0.9*0.55 + 0.5*0.25 = 0.62');
assert(WEIGHT_RETRIEVAL === 0.40, 'WEIGHT_RETRIEVAL = 0.40');
assert(WEIGHT_DECAY === 0.25, 'WEIGHT_DECAY = 0.25');

// ─── Test 3: Confidence tiers ──────────────────────────────────────────────
console.log('\nTest 3: Confidence tiers');
const hr3 = makeHybrid({
  memory: makeMemory({ source: 'user', entities: '["Hamilton"]' }),
  vectorScore: 0.9, keywordScore: 0.8, decayScore: 0.9,
});
const cr3 = computeConfidence(hr3, []);
// retrieval_sim = 0.9*0.55 + 0.8*0.25 = 0.495 + 0.2 = 0.695
// confidence = 0.40*0.695 + 0.25*0.9 + 0.20*1.0 + 0.15*0 = 0.278 + 0.225 + 0.20 = 0.703
assert(cr3.tier === 'medium', `tier should be medium (got ${cr3.tier}, confidence=${cr3.confidence.toFixed(3)})`);
assert(cr3.confidence > 0.7, `confidence > 0.7 (got ${cr3.confidence.toFixed(3)})`);
assert(cr3.confidence < 0.8, `confidence < 0.8 (got ${cr3.confidence.toFixed(3)})`);

// ─── Test 4: Corroboration counting ───────────────────────────────────────
console.log('\nTest 4: Corroboration counting');
const mainMem = makeMemory({ id: 1, entities: '["Hamilton"]', source: 'user' });
const corrMem = makeMemory({ id: 2, entities: '["Hamilton","Shure"]', source: 'user' });
const nonCorrMem = makeMemory({ id: 3, entities: '["unrelated"]', source: 'user' });

const hr4 = makeHybrid({ memory: mainMem, vectorScore: 0.5, keywordScore: 0.5, decayScore: 0.5 });
const cr4 = computeConfidence(hr4, [corrMem, nonCorrMem]);
assert(cr4.breakdown.corroboration_count === 1, `corroboration_count = 1 (got ${cr4.breakdown.corroboration_count})`);
assertClose(cr4.breakdown.corroboration_normalized, 0.2, 0.01, 'corroboration_normalized = 0.2');

// ─── Test 5: Low confidence triggers uncertainty ───────────────────────────
console.log('\nTest 5: Low confidence + uncertainty surface');
const suffix = confidenceSystemPromptSuffix('low');
assert(suffix.includes('low'), 'suffix contains "low"');
assert(suffix.includes("don't have reliable"), 'suffix contains uncertainty text');

const response = generateUncertaintyResponse('Hamilton venue');
assert(response.includes('Hamilton venue'), 'response echoes query');
assert(response.includes('web'), 'response mentions web search');

// ─── Test 6: buildConfidenceContext formatting ─────────────────────────────
console.log('\nTest 6: buildConfidenceContext formatting');
const crForContext = computeConfidence(
  makeHybrid({ memory: makeMemory({ source: 'user', entities: '[]' }), vectorScore: 0.8, keywordScore: 0.6, decayScore: 0.9 }),
  []
);
const ctx = buildConfidenceContext([crForContext]);
assert(ctx.length > 0, 'context is non-empty');
assert(ctx.includes('%'), 'context includes confidence percentage');
assert(['HIGH', 'MEDIUM', 'LOW'].some(t => ctx.includes(t)), 'context includes tier label');

// ─── DB Integration tests ──────────────────────────────────────────────────
function findLocalDb(): string | null {
  try {
    const files = globSync('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite');
    return files.length ? resolve(files[0]) : null;
  } catch { return null; }
}

const dbPath = process.env.RENDER_D1_LIBSQL_URL?.replace('file:', '') ?? findLocalDb();

if (!dbPath) {
  console.log('\n⚠️  Skipping DB integration tests — local D1 not found');
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

  // Ensure test user exists
  const testUser = await (db as any).prepare('SELECT id FROM users LIMIT 1').first<{id:number}>();
  if (!testUser) {
    console.log('\n⚠️  Skipping DB integration tests — no users in DB');
  } else {
    const userId = testUser.id;

    console.log('\nTest 7: searchWithConfidence returns structured results');
    const result = await memory.searchWithConfidence(userId, 'Hamilton', { limit: 3 });
    assert(Array.isArray(result.results), 'results is array');
    assert(['high', 'medium', 'low'].includes(result.overallConfidence), `overallConfidence is valid tier (${result.overallConfidence})`);
    assert(typeof result.systemPromptSuffix === 'string', 'systemPromptSuffix is string');
    if (result.results.length > 0) {
      assert('confidence' in result.results[0], 'result has confidence');
      assert('breakdown' in result.results[0], 'result has breakdown');
      assert('tier' in result.results[0], 'result has tier');
      assert('reasoning' in result.results[0], 'result has reasoning');
      assert(['high', 'medium', 'low'].includes(result.results[0].tier), `tier is valid (${result.results[0].tier})`);
    }

    console.log('\nTest 8: memory_confidence_history table exists');
    const tableCheck = await (db as any).prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='memory_confidence_history'`
    ).first<{name:string}>();
    assert(tableCheck?.name === 'memory_confidence_history', 'memory_confidence_history table exists');
  }
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
