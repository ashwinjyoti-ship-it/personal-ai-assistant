// Page watches: "watch this URL and tell me when it changes".
//
// Platform-neutral pieces only — table DDL, text normalisation, hashing, and
// change summarisation. The actual browser snapshot lives in
// src/render/pageWatch.ts (Playwright, Render-only) and is exposed through
// the optional PAGE_SNAPSHOT binding; the cron route in routes/system.ts
// drives the checks. This file must stay importable from the Cloudflare
// Workers bundle, so no playwright imports.

// The deploy pipeline does not apply D1 migrations remotely, so the table is
// created on demand (idempotent) by every code path that touches it. The
// matching migration (0058) exists for local dev parity.
export const PAGE_WATCHES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS page_watches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  css_selector TEXT,
  check_interval_minutes INTEGER NOT NULL DEFAULT 30,
  last_hash TEXT,
  last_snapshot TEXT,
  last_checked_at DATETIME,
  last_changed_at DATETIME,
  last_error TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

export async function ensurePageWatchesTable(db: D1Database): Promise<void> {
  await db.prepare(PAGE_WATCHES_TABLE_SQL).run();
}

export interface PageWatchRow {
  id: number;
  user_id: number;
  name: string;
  url: string;
  css_selector: string | null;
  check_interval_minutes: number;
  last_hash: string | null;
  last_snapshot: string | null;
  last_checked_at: string | null;
  last_changed_at: string | null;
  last_error: string | null;
  enabled: number;
}

/** Collapse whitespace so cosmetic reflows don't register as changes. */
export function normalizeSnapshotText(raw: string): string {
  return raw
    .replace(/[ \t\r]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Human-readable summary of what changed between two snapshots: lines that
 * appeared and lines that disappeared (order-insensitive, first few of each).
 * Not a real diff — it's for a phone notification, not a code review.
 */
export function summarizeSnapshotChange(oldText: string, newText: string): string {
  const oldLines = new Set(oldText.split('\n').map((l) => l.trim()).filter(Boolean));
  const newLines = newText.split('\n').map((l) => l.trim()).filter(Boolean);
  const newSet = new Set(newLines);

  const added = newLines.filter((l) => !oldLines.has(l));
  const removed = [...oldLines].filter((l) => !newSet.has(l));

  const clip = (lines: string[], max: number) => {
    const shown = lines.slice(0, max).map((l) => (l.length > 120 ? `${l.slice(0, 120)}…` : l));
    const more = lines.length - shown.length;
    return shown.join('\n') + (more > 0 ? `\n(+${more} more)` : '');
  };

  const parts: string[] = [];
  if (added.length > 0) parts.push(`New:\n${clip(added, 5)}`);
  if (removed.length > 0) parts.push(`Gone:\n${clip(removed, 3)}`);
  // Same lines, different order/whitespace — still a change (hash differs).
  return parts.join('\n\n') || 'Content was rearranged (no lines added or removed).';
}
