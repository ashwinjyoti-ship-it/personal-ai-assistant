import { createClient } from '@libsql/client';

export type RenderD1Config = {
  accountId: string;
  databaseId: string;
  apiToken: string;
};

export function createD1Client(config: RenderD1Config) {
  const url = `https://${config.accountId}.cloudflare.com/client/v4/accounts/${config.accountId}/d1/database/${config.databaseId}`;
  return createClient({
    url,
    authToken: config.apiToken,
  });
}
