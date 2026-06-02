import { createClient, type Client } from '@libsql/client';

export type RenderD1Config = {
  accountId: string;
  databaseId: string;
  apiToken: string;
  /**
   * Optional explicit libsql URL. When set it overrides the derived Cloudflare D1
   * host — used for local development/tests against a `file:` SQLite database
   * (e.g. `RENDER_D1_LIBSQL_URL=file:./.render-local.sqlite`).
   */
  url?: string;
};

/** Cloudflare D1 libsql endpoint (not the REST management API). */
export function buildD1LibsqlUrl(config: Pick<RenderD1Config, 'accountId' | 'databaseId'>): string {
  return `https://${config.accountId}-${config.databaseId}.d1.d1.cloudflare.com`;
}

export function createD1Client(config: RenderD1Config): Client {
  const url = config.url?.trim() || buildD1LibsqlUrl(config);
  // Local file-backed databases are unauthenticated; only attach the auth token
  // for the remote Cloudflare D1 HTTP endpoint.
  if (url.startsWith('file:')) {
    return createClient({ url });
  }
  return createClient({ url, authToken: config.apiToken });
}
