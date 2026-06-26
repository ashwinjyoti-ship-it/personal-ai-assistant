#!/usr/bin/env npx tsx
/**
 * One-time backfill: generate embeddings for all memories that don't have one.
 * Run after deploying migration 0050_memory_embeddings.sql.
 *
 * Usage:
 *   CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_D1_API_TOKEN=... \
 *   RENDER_D1_LIBSQL_URL=file:... npx tsx scripts/backfill-embeddings.ts
 *
 * Or on Render (with env vars already set):
 *   npx tsx scripts/backfill-embeddings.ts
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
  const dbPath = process.env.RENDER_D1_LIBSQL_URL?.replace('file:', '') ?? findLocalDb();
  const db = makeD1(dbPath);
  const memory = new MemoryService(db);

  // Get all user IDs
  const usersResult = await (db as any).prepare('SELECT id FROM users').all<{ id: number }>();
  const users: number[] = (usersResult.results ?? []).map((r: any) => r.id);

  console.log(`Backfilling embeddings for ${users.length} users...`);

  let totalProcessed = 0;
  for (const userId of users) {
    let userTotal = 0;
    while (true) {
      const count = await memory.backfillEmbeddings(userId, 20);
      if (count === 0) break;
      userTotal += count;
      totalProcessed += count;
      process.stdout.write(`  user ${userId}: ${userTotal} processed...\r`);
      // Small delay to avoid hammering the CF API
      await new Promise(r => setTimeout(r, 200));
    }
    if (userTotal > 0) console.log(`  user ${userId}: ${userTotal} memories embedded`);
  }

  console.log(`\nBackfill complete. Total: ${totalProcessed} memories embedded.`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
