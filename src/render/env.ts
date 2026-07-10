import type { Bindings } from '../types';
import { createRenderD1Database } from './d1-adapter';
import type { RenderD1Config } from './d1';
import { createRenderDocumentsBucket } from './r2-bucket';
import { scrapeOutlookInbox } from './outlookPlaywright';

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required Render env var: ${name}`);
  }
  return value;
}

export function loadRenderD1Config(): RenderD1Config {
  // Local/test override: a full libsql URL (e.g. `file:` SQLite) bypasses the
  // Cloudflare account/database/token requirement.
  const overrideUrl = process.env.RENDER_D1_LIBSQL_URL?.trim();
  if (overrideUrl) {
    return {
      url: overrideUrl,
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID?.trim() ?? '',
      databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID?.trim() ?? '',
      apiToken: process.env.CLOUDFLARE_D1_API_TOKEN?.trim() ?? '',
    };
  }

  return {
    accountId: requireEnv('CLOUDFLARE_ACCOUNT_ID'),
    databaseId: requireEnv('CLOUDFLARE_D1_DATABASE_ID'),
    apiToken: requireEnv('CLOUDFLARE_D1_API_TOKEN'),
  };
}

/** Build Cloudflare Bindings for native Render agent work (Telegram webhook, etc.). */
export function createRenderEnv(): Bindings {
  const d1 = loadRenderD1Config();

  return {
    DB: createRenderD1Database(d1),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_CSE_ID: process.env.GOOGLE_CSE_ID,
    CRON_SECRET: process.env.CRON_SECRET,
    DOCUMENTS_BUCKET: createRenderDocumentsBucket(),
    // AI and VECTORIZE are Cloudflare Worker bindings only — not available on Render.
    // search_library / Workers AI embeddings require CF or a future proxy.
    OUTLOOK_PLAYWRIGHT: scrapeOutlookInbox,
  };
}
