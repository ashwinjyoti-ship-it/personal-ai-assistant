// Digest service entrypoint: generate / fetch / toggle / list digests.
//
// generateDigest is the one function every kind goes through. It:
//   1. loads the config for the kind
//   2. computes the period window (today / tomorrow / last-7-days)
//   3. runs the enabled section fetchers in parallel
//   4. builds DigestContent + highlights + checklist items
//   5. stores the digest row + items (per-day idempotency via unique index)
//   6. delivers to configured channels and records what actually succeeded

import type {
  DigestConfig,
  DigestContent,
  DigestItem,
  DigestKind,
  DigestRecord,
  DigestSection,
  UserRecord,
} from '../../types';
import { getDigestConfig } from './config';
import { getSectionFetcher } from './sections';
import { getUserLocalDate, digestExistsForDate } from './schedule';
import { deliverDigest } from './deliver';
import type { SectionContext } from './sections/types';

export interface DigestEnv {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  OUTLOOK_PLAYWRIGHT?: import('../../types').OutlookPlaywrightFn;
}

/**
 * Compute the period window (inclusive ISO start/end) for a kind, in the
 * user's timezone. We work in user-local wall-clock components then convert back
 * to UTC ISO strings, so the window is correct regardless of the host's own
 * timezone (the old code's `new Date(toLocaleString(...))` trick leaked the
 * host offset into the result).
 */
export function periodWindowFor(
  kind: DigestKind,
  timezone: string,
  now: Date = new Date(),
): { start: string; end: string } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone || 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value || '0';
  const userYear = Number(get('year'));
  const userMonth = Number(get('month'));
  const userDay = Number(get('day'));

  // Build user-local midnight as if it were UTC, then offset by the tz delta.
  // We compute the offset by comparing the user-local "now" assembled from
  // the parts against the actual now — the difference is the tz offset (in ms).
  const userNowAsLocal = Date.UTC(
    userYear,
    userMonth - 1,
    userDay,
    Number(get('hour')),
    Number(get('minute')),
    Number(get('second')),
  );
  const offsetMs = userNowAsLocal - now.getTime();

  const userMidnightLocal = Date.UTC(userYear, userMonth - 1, userDay, 0, 0, 0, 0);
  const userEndOfDayLocal = Date.UTC(userYear, userMonth - 1, userDay, 23, 59, 59, 999);

  if (kind === 'weekly') {
    const start = userMidnightLocal - 6 * 24 * 60 * 60 * 1000;
    return {
      start: new Date(start - offsetMs).toISOString(),
      end: new Date(userEndOfDayLocal - offsetMs).toISOString(),
    };
  }

  // morning / evening / email: the current user-local day.
  return {
    start: new Date(userMidnightLocal - offsetMs).toISOString(),
    end: new Date(userEndOfDayLocal - offsetMs).toISOString(),
  };
}

/** Build highlights (1-3 plain bullets) from the generated sections. */
function buildHighlights(sections: DigestSection[]): string[] {
  const out: string[] = [];
  for (const s of sections) {
    if (out.length >= 3) break;
    // Skip sections with no real signal.
    if (
      !s.summary ||
      s.summary === 'Nothing scheduled' ||
      s.summary === 'All clear' ||
      s.summary === 'None' ||
      s.summary === 'Inbox clear'
    ) {
      continue;
    }
    out.push(`${s.title}: ${s.summary}`);
  }
  return out;
}

export interface GenerateDigestResult {
  digestId: number;
  content: DigestContent;
  items: DigestItem[];
  /** Comma-joined channel names that actually succeeded (matches the DB column). */
  deliveredChannels: string;
  skipped: boolean;
}

/**
 * Generate (and deliver) a digest for a user + kind. Idempotent: if a digest
 * already exists for (user, kind, local_date) it is returned without
 * re-generating or re-delivering.
 */
export async function generateDigest(
  db: D1Database,
  user: UserRecord,
  kind: DigestKind,
  env: DigestEnv,
  opts?: { force?: boolean; deliver?: boolean },
): Promise<GenerateDigestResult> {
  const timezone = user.timezone || 'Asia/Kolkata';
  const cfg = await getDigestConfig(db, user.id, kind);
  const now = new Date();
  const localDate = getUserLocalDate(timezone, now);

  // Idempotency guard (also enforced by the DB unique index, but check first
  // to avoid burning Gmail/Calendar/news quota on a duplicate tick).
  if (!opts?.force) {
    const exists = await digestExistsForDate(db, user.id, kind, localDate);
    if (exists) {
      const existing = await getDigestByDate(db, user.id, kind, localDate);
      if (existing) {
        return {
          digestId: existing.digest.id,
          content: existing.digest.content,
          items: [],
          deliveredChannels: existing.digest.delivered_channels || '',
          skipped: true,
        };
      }
    }
  }

  const { start, end } = periodWindowFor(kind, timezone, now);

  const ctx: SectionContext = {
    db,
    userId: user.id,
    pinHash: user.pin_hash,
    timezone,
    kind,
    periodStart: start,
    periodEnd: end,
    newsTopics: cfg.newsTopics,
    env,
  };

  // Run enabled section fetchers in parallel; order preserved from config.
  const sections = await Promise.all(
    cfg.sections.map(async (key) => {
      const fetcher = getSectionFetcher(key);
      if (!fetcher) return null;
      try {
        return await fetcher.fetch(ctx);
      } catch (err: any) {
        console.error(`[digest:${kind}] section ${key} failed:`, err?.message);
        return null;
      }
    }),
  );

  const content: DigestContent = {
    generatedAt: now.toISOString(),
    period: { start, end },
    sections: sections.filter((s): s is DigestSection => s !== null),
    highlights: [],
  };
  content.highlights = buildHighlights(content.sections);

  // Build checklist items (only sections with actionable items contribute).
  const items: DigestItem[] = [];
  let order = 0;
  for (const section of content.sections) {
    for (const item of section.items) {
      items.push({
        section: section.key,
        key: item.key,
        text: item.text,
        metadata: item.metadata,
        sortOrder: order++,
      });
    }
  }

  // Store. The unique index on (user_id, kind, local_date) is the final
  // idempotency guard; INSERT OR IGNORE means a concurrent tick is a no-op.
  const insertRes = await db
    .prepare(
      `INSERT OR IGNORE INTO digests (user_id, kind, content_json, period_start, period_end, local_date)
       VALUES (?, ?, ?, ?, ?, ?) RETURNING id`,
    )
    .bind(user.id, kind, JSON.stringify(content), start, end, localDate)
    .first<{ id: number }>();

  let digestId = insertRes?.id || 0;
  let deliveredChannels = '';

  if (digestId === 0) {
    // A concurrent tick inserted first — load that one instead.
    const existing = await getDigestByDate(db, user.id, kind, localDate);
    if (existing) {
      digestId = existing.digest.id;
      deliveredChannels = existing.digest.delivered_channels || '';
    }
  } else {
    // Store checklist items.
    for (const item of items) {
      await db
        .prepare(
          `INSERT INTO digest_items (digest_id, section, item_key, text, metadata, sort_order)
           VALUES (?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          digestId,
          item.section,
          item.key,
          item.text,
          JSON.stringify(item.metadata),
          item.sortOrder,
        )
        .run();
    }

    // Deliver.
    if (opts?.deliver !== false) {
      const result = await deliverDigest(db, content, items, digestId, {
        userId: user.id,
        pinHash: user.pin_hash,
        telegramChatId: user.telegram_chat_id,
        kind,
        scheduleTime: cfg.scheduleTime,
        channels: cfg.notifyChannels,
      });
      deliveredChannels = result.deliveredChannels.join(',');
      await db
        .prepare('UPDATE digests SET delivered_channels = ? WHERE id = ?')
        .bind(deliveredChannels, digestId)
        .run();
    }
  }

  return {
    digestId,
    content,
    items,
    deliveredChannels,
    skipped: digestId !== 0 && items.length === 0 && !opts?.force,
  };
}

export interface StoredDigest {
  digest: {
    id: number;
    user_id: number;
    kind: DigestKind;
    content: DigestContent;
    period_start: string | null;
    period_end: string | null;
    local_date: string | null;
    delivered_channels: string;
    created_at: string;
  };
  items: Array<{
    id: number;
    section: string;
    item_key: string;
    text: string;
    metadata: Record<string, unknown>;
    checked: number;
    checked_at: string | null;
    sort_order: number;
  }>;
}

async function hydrateDigest(row: DigestRecord, db: D1Database): Promise<StoredDigest> {
  const itemsRes = await db
    .prepare('SELECT * FROM digest_items WHERE digest_id = ? ORDER BY sort_order ASC')
    .bind(row.id)
    .all<any>();

  return {
    digest: {
      id: row.id,
      user_id: row.user_id,
      kind: row.kind,
      content: JSON.parse(row.content_json || '{}'),
      period_start: row.period_start,
      period_end: row.period_end,
      local_date: row.local_date,
      delivered_channels: row.delivered_channels || '',
      created_at: row.created_at,
    },
    items: (itemsRes.results || []).map((i) => ({
      id: i.id,
      section: i.section,
      item_key: i.item_key,
      text: i.text,
      metadata: JSON.parse(i.metadata || '{}'),
      checked: i.checked,
      checked_at: i.checked_at,
      sort_order: i.sort_order,
    })),
  };
}

/** Get a digest by id (ownership-checked). */
export async function getDigest(
  db: D1Database,
  userId: number,
  digestId: number,
): Promise<StoredDigest | null> {
  const row = await db
    .prepare('SELECT * FROM digests WHERE id = ? AND user_id = ?')
    .bind(digestId, userId)
    .first<DigestRecord>();
  if (!row) return null;
  return hydrateDigest(row, db);
}

/** Get a digest by (user, kind, local_date) — used by the idempotency path. */
export async function getDigestByDate(
  db: D1Database,
  userId: number,
  kind: DigestKind,
  localDate: string,
): Promise<StoredDigest | null> {
  const row = await db
    .prepare('SELECT * FROM digests WHERE user_id = ? AND kind = ? AND local_date = ? LIMIT 1')
    .bind(userId, kind, localDate)
    .first<DigestRecord>();
  if (!row) return null;
  return hydrateDigest(row, db);
}

/** Toggle a digest item's checkbox (ownership-checked). */
export async function toggleDigestItem(
  db: D1Database,
  userId: number,
  digestId: number,
  itemId: number,
): Promise<{ checked: boolean } | null> {
  const digest = await db
    .prepare('SELECT id FROM digests WHERE id = ? AND user_id = ?')
    .bind(digestId, userId)
    .first<{ id: number }>();
  if (!digest) return null;

  const item = await db
    .prepare('SELECT checked FROM digest_items WHERE id = ? AND digest_id = ?')
    .bind(itemId, digestId)
    .first<{ checked: number }>();
  if (!item) return null;

  const newChecked = item.checked ? 0 : 1;
  await db
    .prepare(
      `UPDATE digest_items
       SET checked = ?, checked_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END
       WHERE id = ? AND digest_id = ?`,
    )
    .bind(newChecked, newChecked, itemId, digestId)
    .run();

  return { checked: newChecked === 1 };
}

/** List recent digests for a user (optionally filtered by kind). */
export async function getRecentDigests(
  db: D1Database,
  userId: number,
  limit = 20,
  kind?: DigestKind,
): Promise<Array<StoredDigest['digest']>> {
  let sql = `SELECT * FROM digests WHERE user_id = ?`;
  const binds: any[] = [userId];
  if (kind) {
    sql += ` AND kind = ?`;
    binds.push(kind);
  }
  sql += ` ORDER BY created_at DESC LIMIT ?`;
  binds.push(limit);

  const rows = await db
    .prepare(sql)
    .bind(...binds)
    .all<DigestRecord>();
  return (rows.results || []).map((r) => ({
    id: r.id,
    user_id: r.user_id,
    kind: r.kind,
    content: JSON.parse(r.content_json || '{}'),
    period_start: r.period_start,
    period_end: r.period_end,
    local_date: r.local_date,
    delivered_channels: r.delivered_channels || '',
    created_at: r.created_at,
  }));
}

/** Delete a digest (ownership-checked). */
export async function deleteDigest(
  db: D1Database,
  userId: number,
  digestId: number,
): Promise<void> {
  await db.prepare('DELETE FROM digests WHERE id = ? AND user_id = ?').bind(digestId, userId).run();
}

// Re-export config helpers for the route layer.
export {
  getDigestConfig,
  getDigestConfigs,
  upsertDigestConfig,
  validateDigestConfigUpdate,
  getDefaultDigestConfigs,
} from './config';
export { shouldRunDigest, getAllDueCandidates, getUserLocalDate } from './schedule';
export type { DigestConfig };
