// Digest scheduling: one time-gating rule for all kinds.
//
// Replaces the two inconsistent schedulers in the old code:
//   - shouldRunBriefing (catch-up window + per-day guard — the correct one)
//   - shouldRunWeeklyReview (exact-minute match, no catch-up → silent skips)
// Both weekly review and email digest now use the catch-up window pattern,
// so a single missed cron tick no longer means a skipped digest.

import { parseDigestConfig } from './config';
import type { DigestConfig, DigestConfigRecord, DigestKind } from '../../types';

/** User-local calendar date as YYYY-MM-DD (idempotency key). */
export function getUserLocalDate(timezone: string, now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone || 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Should this config fire now?
 *
 * Fires on the target minute and for up to `windowMinutes` afterwards (a
 * catch-up window that tolerates a single missed/drifted cron tick). For
 * weekly digests, also requires the user-local weekday to match.
 *
 * Duplicate sends are prevented separately by the per-user/kind/day
 * idempotency guard enforced by the unique index on digests, so widening
 * the window is safe.
 */
export function shouldRunDigest(
  cfg: Pick<DigestConfig, 'scheduleTime' | 'scheduleWeekday'> & { kind: DigestKind },
  timezone: string,
  now: Date = new Date(),
  windowMinutes = 5,
): boolean {
  const userNow = new Date(now.toLocaleString('en-US', { timeZone: timezone || 'Asia/Kolkata' }));
  const userHour = userNow.getHours();
  const userMinute = userNow.getMinutes();

  const [targetHour, targetMinute] = cfg.scheduleTime.split(':').map(Number);
  if (!Number.isFinite(targetHour) || !Number.isFinite(targetMinute)) return false;

  // Weekly: weekday must match (user-local long weekday name).
  if (cfg.scheduleWeekday) {
    const userDay = userNow.toLocaleDateString('en-US', { weekday: 'long' });
    if (userDay !== cfg.scheduleWeekday) return false;
  }

  const currentMinutes = userHour * 60 + userMinute;
  const targetMinutes = targetHour * 60 + targetMinute;

  const delta = currentMinutes - targetMinutes;
  return delta >= 0 && delta < windowMinutes;
}

export interface UserSchedule {
  userId: number;
  timezone: string;
  config: DigestConfig;
}

/**
 * Load every user's enabled digest configs (joined with timezone) for the cron
 * tick to evaluate. Returns one row per (user, kind).
 */
export async function getAllDueCandidates(db: D1Database): Promise<UserSchedule[]> {
  const rows = await db
    .prepare(
      `SELECT c.id, c.user_id, c.kind, c.enabled, c.schedule_time, c.schedule_weekday,
              c.sections_json, c.notify_channels_json, c.news_topics,
              c.created_at, c.updated_at,
              COALESCE(u.timezone, 'Asia/Kolkata') as timezone
       FROM digest_configs c
       JOIN users u ON u.id = c.user_id
       WHERE c.enabled = 1`,
    )
    .all<DigestConfigRecord & { timezone: string }>();

  const out: UserSchedule[] = [];
  for (const r of rows.results || []) {
    const config = parseDigestConfig(r);
    out.push({ userId: r.user_id, timezone: r.timezone || 'Asia/Kolkata', config });
  }
  return out;
}

/** Check whether a digest already exists for (user, kind, local_date) — idempotency guard. */
export async function digestExistsForDate(
  db: D1Database,
  userId: number,
  kind: DigestKind,
  localDate: string,
): Promise<boolean> {
  const row = await db
    .prepare('SELECT 1 FROM digests WHERE user_id = ? AND kind = ? AND local_date = ? LIMIT 1')
    .bind(userId, kind, localDate)
    .first();
  return !!row;
}

export { WEEKDAYS };
