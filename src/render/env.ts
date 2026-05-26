import type { Bindings } from '../types';
import { createRenderD1Database } from './d1-adapter';
import type { RenderD1Config } from './d1';

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required Render env var: ${name}`);
  }
  return value;
}

export function loadRenderD1Config(): RenderD1Config {
  return {
    accountId: requireEnv('CLOUDFLARE_ACCOUNT_ID'),
    databaseId: requireEnv('CLOUDFLARE_D1_DATABASE_ID'),
    apiToken: requireEnv('CLOUDFLARE_D1_API_TOKEN'),
  };
}

/** Build Cloudflare Bindings for native Render agent work (not wired into server.ts in Phase 1). */
export function createRenderEnv(): Bindings {
  const d1 = loadRenderD1Config();

  return {
    DB: createRenderD1Database(d1),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_CSE_ID: process.env.GOOGLE_CSE_ID,
    // DOCUMENTS_BUCKET, AI, VECTORIZE — Phase 3+
  };
}
