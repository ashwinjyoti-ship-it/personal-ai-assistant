import { createClient } from '@libsql/client';

export type RenderD1Config = {
  accountId: string;
  databaseId: string;
  apiToken: string;
  /**
   * Optional explicit libsql URL. When set (e.g. `file:./.render-local.sqlite`)
   * the adapter talks to a local SQLite database via @libsql/client instead of
   * the Cloudflare D1 REST API — used for local development and tests.
   */
  url?: string;
};

/** Normalized result shape shared by the REST and libsql backends. */
export interface RenderD1ExecResult {
  rows: Record<string, unknown>[];
  rowsAffected: number;
  lastInsertRowid?: number | bigint | null;
}

export interface RenderD1Client {
  execute(stmt: { sql: string; args: unknown[] }): Promise<RenderD1ExecResult>;
  batch(stmts: { sql: string; args: unknown[] }[], mode?: 'write' | 'read'): Promise<RenderD1ExecResult[]>;
}

/**
 * @deprecated Cloudflare D1 has no public libsql endpoint. Kept only so existing
 * imports/tests resolve; the REST API ({@link buildD1QueryUrl}) is used instead.
 */
export function buildD1LibsqlUrl(config: Pick<RenderD1Config, 'accountId' | 'databaseId'>): string {
  return `https://${config.accountId}-${config.databaseId}.d1.d1.cloudflare.com`;
}

/** Cloudflare D1 HTTP query endpoint (REST API). */
export function buildD1QueryUrl(config: Pick<RenderD1Config, 'accountId' | 'databaseId'>): string {
  return `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/d1/database/${config.databaseId}/query`;
}

async function d1RestQuery(config: RenderD1Config, sql: string, args: unknown[]): Promise<RenderD1ExecResult> {
  const res = await fetch(buildD1QueryUrl(config), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params: args ?? [] }),
  });

  let json: any;
  try {
    json = await res.json();
  } catch {
    throw new Error(`D1 query failed: HTTP ${res.status} (non-JSON response)`);
  }

  if (!res.ok || !json?.success) {
    const msg =
      (json?.errors || []).map((e: any) => e?.message || JSON.stringify(e)).join('; ') ||
      `HTTP ${res.status}`;
    throw new Error(`D1 query failed: ${msg}`);
  }

  const first = Array.isArray(json.result) ? json.result[0] : json.result;
  const meta = first?.meta ?? {};
  return {
    rows: (first?.results ?? []) as Record<string, unknown>[],
    rowsAffected: meta.changes ?? meta.rows_written ?? 0,
    lastInsertRowid: meta.last_row_id ?? null,
  };
}

export function createD1Client(config: RenderD1Config): RenderD1Client {
  const url = config.url?.trim();

  // Local/test backend: a libsql URL (typically file:) talks to SQLite directly.
  if (url) {
    const isFile = url.startsWith('file:');
    const libsql = createClient(isFile ? { url } : { url, authToken: config.apiToken });
    return {
      async execute(stmt) {
        const r = await libsql.execute({ sql: stmt.sql, args: (stmt.args ?? []) as any });
        return {
          rows: r.rows as unknown as Record<string, unknown>[],
          rowsAffected: r.rowsAffected ?? 0,
          lastInsertRowid: r.lastInsertRowid ?? null,
        };
      },
      async batch(stmts, mode = 'write') {
        const r = await libsql.batch(
          stmts.map((s) => ({ sql: s.sql, args: (s.args ?? []) as any })),
          mode,
        );
        return r.map((x) => ({
          rows: x.rows as unknown as Record<string, unknown>[],
          rowsAffected: x.rowsAffected ?? 0,
          lastInsertRowid: x.lastInsertRowid ?? null,
        }));
      },
    };
  }

  // Production backend: Cloudflare D1 REST API.
  return {
    execute(stmt) {
      return d1RestQuery(config, stmt.sql, stmt.args ?? []);
    },
    async batch(stmts) {
      // D1's REST endpoint runs one statement per request; execute sequentially.
      const out: RenderD1ExecResult[] = [];
      for (const s of stmts) {
        out.push(await d1RestQuery(config, s.sql, s.args ?? []));
      }
      return out;
    },
  };
}
