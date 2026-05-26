import type { Client } from '@libsql/client';
import { createD1Client, type RenderD1Config } from './d1';

const RENDER_D1_STMT = Symbol('renderD1Statement');

type RenderD1BoundStatement = D1PreparedStatement & {
  [RENDER_D1_STMT]: { sql: string; args: unknown[] };
};

function normalizeValue(value: unknown): unknown {
  if (typeof value === 'bigint') return Number(value);
  return value;
}

function normalizeRow<T>(row: Record<string, unknown>): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    out[key] = normalizeValue(value);
  }
  return out as T;
}

function createBoundStatement(client: Client, sql: string, args: unknown[] = []): RenderD1BoundStatement {
  const meta = { sql, args };

  const statement: RenderD1BoundStatement = {
    [RENDER_D1_STMT]: meta,
    bind(...values: unknown[]) {
      return createBoundStatement(client, sql, values);
    },
    async first<T = Record<string, unknown>>(): Promise<T | null> {
      const result = await client.execute({ sql, args });
      const row = result.rows[0];
      if (!row) return null;
      return normalizeRow<T>(row as Record<string, unknown>);
    },
    async all<T = Record<string, unknown>>(): Promise<D1Result<T>> {
      const result = await client.execute({ sql, args });
      return {
        results: result.rows.map((row) => normalizeRow<T>(row as Record<string, unknown>)),
        success: true,
        meta: result.rowsAffected != null ? { changes: result.rowsAffected } : undefined,
      };
    },
    async run(): Promise<D1Result> {
      const result = await client.execute({ sql, args });
      return {
        success: true,
        meta: { changes: result.rowsAffected ?? 0 },
      };
    },
  };

  return statement;
}

function getStatementMeta(stmt: D1PreparedStatement): { sql: string; args: unknown[] } {
  const meta = (stmt as RenderD1BoundStatement)[RENDER_D1_STMT];
  if (!meta) {
    throw new Error('D1 batch only supports statements from the Render D1 adapter');
  }
  return meta;
}

export function createRenderD1Database(config: RenderD1Config): D1Database {
  const client = createD1Client(config);

  return {
    prepare(sql: string) {
      return createBoundStatement(client, sql);
    },
    async batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]> {
      if (statements.length === 0) return [];
      const batchStatements = statements.map((stmt) => {
        const { sql, args } = getStatementMeta(stmt);
        return { sql, args };
      });
      const results = await client.batch(batchStatements, 'write');
      return results.map(
        (result) =>
          ({
            success: true,
            meta: { changes: result.rowsAffected ?? 0 },
          }) as D1Result<T>
      );
    },
    async exec() {
      throw new Error('exec() is not implemented for Render D1 adapter');
    },
    async dump() {
      throw new Error('dump() is not implemented for Render D1 adapter');
    },
  };
}
