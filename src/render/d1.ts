import { createClient, type Client } from '@libsql/client';

export type RenderD1Config = {
  accountId: string;
  databaseId: string;
  apiToken: string;
};

/** Cloudflare D1 libsql endpoint (not the REST management API). */
export function buildD1LibsqlUrl(config: Pick<RenderD1Config, 'accountId' | 'databaseId'>): string {
  return `https://${config.accountId}-${config.databaseId}.d1.d1.cloudflare.com`;
}

export function createD1Client(config: RenderD1Config): Client {
  return createClient({
    url: buildD1LibsqlUrl(config),
    authToken: config.apiToken,
  });
}
