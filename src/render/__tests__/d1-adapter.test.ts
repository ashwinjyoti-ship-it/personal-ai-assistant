import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRenderD1Database } from '../d1-adapter';
import { buildD1LibsqlUrl } from '../d1';

const mockExecute = vi.fn();
const mockBatch = vi.fn();

vi.mock('../d1', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../d1')>();
  return {
    ...actual,
    createD1Client: () => ({
      execute: mockExecute,
      batch: mockBatch,
    }),
  };
});

describe('buildD1LibsqlUrl', () => {
  it('uses account-database libsql host', () => {
    expect(
      buildD1LibsqlUrl({ accountId: 'acct', databaseId: 'db-id' })
    ).toBe('https://acct-db-id.d1.d1.cloudflare.com');
  });
});

describe('createRenderD1Database (mocked libsql)', () => {
  beforeEach(() => {
    mockExecute.mockReset();
    mockBatch.mockReset();
  });

  it('prepare().bind().first() returns first row', async () => {
    mockExecute.mockResolvedValueOnce({
      rows: [{ id: 1n, name: 'Ada' }],
      rowsAffected: 0,
    });

    const db = createRenderD1Database({
      accountId: 'a',
      databaseId: 'b',
      apiToken: 'token',
    });

    const row = await db
      .prepare('SELECT id, name FROM users WHERE id = ?')
      .bind(1)
      .first<{ id: number; name: string }>();

    expect(mockExecute).toHaveBeenCalledWith({
      sql: 'SELECT id, name FROM users WHERE id = ?',
      args: [1],
    });
    expect(row).toEqual({ id: 1, name: 'Ada' });
  });

  it('prepare().bind().all() returns Workers D1 shape', async () => {
    mockExecute.mockResolvedValueOnce({
      rows: [{ n: 1 }, { n: 2 }],
      rowsAffected: 0,
    });

    const db = createRenderD1Database({
      accountId: 'a',
      databaseId: 'b',
      apiToken: 'token',
    });

    const result = await db.prepare('SELECT n FROM t').bind().all<{ n: number }>();

    expect(result).toEqual({
      results: [{ n: 1 }, { n: 2 }],
      success: true,
      meta: { changes: 0 },
    });
  });

  it('prepare().bind().run() reports changes', async () => {
    mockExecute.mockResolvedValueOnce({
      rows: [],
      rowsAffected: 3,
    });

    const db = createRenderD1Database({
      accountId: 'a',
      databaseId: 'b',
      apiToken: 'token',
    });

    const result = await db
      .prepare('UPDATE users SET name = ? WHERE id = ?')
      .bind('Bob', 2)
      .run();

    expect(result).toEqual({
      success: true,
      meta: { changes: 3 },
    });
  });

  it('batch() runs statements in one libsql write transaction', async () => {
    mockBatch.mockResolvedValueOnce([
      { rows: [], rowsAffected: 1 },
      { rows: [], rowsAffected: 1 },
    ]);

    const db = createRenderD1Database({
      accountId: 'a',
      databaseId: 'b',
      apiToken: 'token',
    });

    const insert = db.prepare(
      'INSERT INTO document_chunks (user_id, document_id, chunk_index, text, vector_id) VALUES (?, ?, ?, ?, ?)'
    );

    const results = await db.batch([
      insert.bind(1, 10, 0, 'chunk-a', 'vec-0'),
      insert.bind(1, 10, 1, 'chunk-b', 'vec-1'),
    ]);

    expect(mockBatch).toHaveBeenCalledWith(
      [
        {
          sql: 'INSERT INTO document_chunks (user_id, document_id, chunk_index, text, vector_id) VALUES (?, ?, ?, ?, ?)',
          args: [1, 10, 0, 'chunk-a', 'vec-0'],
        },
        {
          sql: 'INSERT INTO document_chunks (user_id, document_id, chunk_index, text, vector_id) VALUES (?, ?, ?, ?, ?)',
          args: [1, 10, 1, 'chunk-b', 'vec-1'],
        },
      ],
      'write'
    );
    expect(mockExecute).not.toHaveBeenCalled();
    expect(results).toEqual([
      { success: true, meta: { changes: 1 } },
      { success: true, meta: { changes: 1 } },
    ]);
  });
});

const hasD1Token = Boolean(process.env.CLOUDFLARE_D1_API_TOKEN?.trim());

describe.skipIf(!hasD1Token)('createRenderD1Database (live D1)', () => {
  it('SELECT 1', async () => {
    const db = createRenderD1Database({
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID!,
      apiToken: process.env.CLOUDFLARE_D1_API_TOKEN!,
    });

    const row = await db.prepare('SELECT 1 AS one').first<{ one: number }>();
    expect(row?.one).toBe(1);
  });

  it('reads users LIMIT 1 when table exists', async () => {
    const db = createRenderD1Database({
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID!,
      apiToken: process.env.CLOUDFLARE_D1_API_TOKEN!,
    });

    const result = await db.prepare('SELECT id FROM users LIMIT 1').all<{ id: number }>();
    expect(result.success).toBe(true);
    expect(Array.isArray(result.results)).toBe(true);
  });
});
