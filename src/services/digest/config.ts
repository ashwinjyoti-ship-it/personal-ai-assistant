// Digest config: load / parse / validate / persist the per-(user, kind) config.
//
// Defaults live in ONE place here (getDefaultDigestConfigs); the route layer
// and the migration's seeding both go through these defaults so they can't
// drift apart the way the old briefing_preferences defaults did.

import type {
  DigestConfig,
  DigestConfigRecord,
  DigestKind,
  DeliveryChannel,
  SectionKey,
} from '../../types';

const VALID_KINDS: DigestKind[] = ['morning', 'evening', 'weekly', 'email'];
const VALID_SECTIONS: SectionKey[] = [
  'calendar_today',
  'calendar_tomorrow',
  'gmail_summary',
  'outlook_summary',
  'tasks_due',
  'news_ai',
  'cron_jobs_today',
  'cron_completed',
  'cron_missed',
  'action_items_open',
  'documents_recent',
];
const VALID_CHANNELS: DeliveryChannel[] = ['ntfy', 'web', 'telegram'];

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DEFAULT_NEWS_TOPICS = ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'];

/** Ordered default section set for each kind. */
export function defaultSections(kind: DigestKind): SectionKey[] {
  switch (kind) {
    case 'morning':
      return ['calendar_today', 'gmail_summary', 'cron_jobs_today', 'action_items_open'];
    case 'evening':
      return ['calendar_tomorrow', 'gmail_summary', 'tasks_due', 'news_ai'];
    case 'weekly':
      return [
        'cron_completed',
        'cron_missed',
        'action_items_open',
        'documents_recent',
        'gmail_summary',
      ];
    case 'email':
      return ['gmail_summary', 'outlook_summary'];
  }
}

/** The full default config for one kind. */
export function getDefaultDigestConfig(kind: DigestKind): DigestConfig {
  switch (kind) {
    case 'morning':
      return {
        kind,
        enabled: true,
        scheduleTime: '08:00',
        scheduleWeekday: null,
        sections: defaultSections('morning'),
        notifyChannels: ['ntfy', 'web'],
        newsTopics: DEFAULT_NEWS_TOPICS,
      };
    case 'evening':
      return {
        kind,
        enabled: true,
        scheduleTime: '20:00',
        scheduleWeekday: null,
        sections: defaultSections('evening'),
        notifyChannels: ['ntfy', 'web'],
        newsTopics: DEFAULT_NEWS_TOPICS,
      };
    case 'weekly':
      return {
        kind,
        enabled: true,
        scheduleTime: '20:00',
        scheduleWeekday: 'Sunday',
        sections: defaultSections('weekly'),
        notifyChannels: ['ntfy', 'web'],
        newsTopics: DEFAULT_NEWS_TOPICS,
      };
    case 'email':
      // Email digests are off by default — Outlook fetch costs a browser-use run.
      return {
        kind,
        enabled: false,
        scheduleTime: '12:00',
        scheduleWeekday: null,
        sections: defaultSections('email'),
        notifyChannels: ['ntfy', 'web'],
        newsTopics: DEFAULT_NEWS_TOPICS,
      };
  }
}

/** Defaults for all four kinds (used to seed a brand-new user). */
export function getDefaultDigestConfigs(): DigestConfig[] {
  return VALID_KINDS.map(getDefaultDigestConfig);
}

function parseJsonArray<T>(raw: string, valid: readonly T[]): T[] {
  try {
    const arr = JSON.parse(raw) as unknown[];
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (v): v is T => typeof v === 'string' && (valid as readonly string[]).includes(v as string),
    ) as T[];
  } catch {
    return [];
  }
}

/** Parse a DigestConfigRecord (DB row) into the app-facing DigestConfig. */
export function parseDigestConfig(row: DigestConfigRecord): DigestConfig {
  const base = getDefaultDigestConfig(row.kind);
  const sections = parseJsonArray<SectionKey>(row.sections_json, VALID_SECTIONS);
  const channels = parseJsonArray<DeliveryChannel>(row.notify_channels_json, VALID_CHANNELS);

  let newsTopics = DEFAULT_NEWS_TOPICS;
  if (row.news_topics != null) {
    newsTopics = row.news_topics
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (newsTopics.length === 0) newsTopics = DEFAULT_NEWS_TOPICS;
  }

  return {
    kind: row.kind,
    enabled: row.enabled !== 0,
    scheduleTime: /^\d{2}:\d{2}$/.test(row.schedule_time) ? row.schedule_time : base.scheduleTime,
    scheduleWeekday:
      row.schedule_weekday && WEEKDAYS.includes(row.schedule_weekday)
        ? row.schedule_weekday
        : base.scheduleWeekday,
    sections: sections.length > 0 ? sections : base.sections,
    notifyChannels: channels.length > 0 ? channels : base.notifyChannels,
    newsTopics,
  };
}

/** Validate a partial config update from the API. Returns a list of errors. */
export function validateDigestConfigUpdate(input: {
  enabled?: boolean;
  scheduleTime?: string;
  scheduleWeekday?: string | null;
  sections?: SectionKey[];
  notifyChannels?: DeliveryChannel[];
  newsTopics?: string[];
}): string[] {
  const errors: string[] = [];

  if (input.scheduleTime !== undefined) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(input.scheduleTime)) {
      errors.push('scheduleTime must be HH:MM (e.g. 20:00)');
    }
  }

  if (input.scheduleWeekday !== undefined && input.scheduleWeekday !== null) {
    if (!WEEKDAYS.includes(input.scheduleWeekday)) {
      errors.push(`scheduleWeekday must be one of: ${WEEKDAYS.join(', ')}`);
    }
  }

  if (input.sections !== undefined) {
    const bad = input.sections.filter((s) => !VALID_SECTIONS.includes(s));
    if (bad.length > 0) errors.push(`unknown section(s): ${bad.join(', ')}`);
  }

  if (input.notifyChannels !== undefined) {
    const bad = input.notifyChannels.filter((c) => !VALID_CHANNELS.includes(c));
    if (bad.length > 0) errors.push(`unknown channel(s): ${bad.join(', ')}`);
    if (input.notifyChannels.length === 0) errors.push('at least one delivery channel is required');
  }

  if (input.newsTopics !== undefined) {
    if (input.newsTopics.length > 5) errors.push('maximum 5 news topics allowed');
    if (input.newsTopics.some((t) => t.length > 50))
      errors.push('each news topic must be 50 chars or less');
  }

  return errors;
}

// === DB access ===

/** Load all four configs for a user, filling any missing kind with defaults. */
export async function getDigestConfigs(db: D1Database, userId: number): Promise<DigestConfig[]> {
  const rows = await db
    .prepare('SELECT * FROM digest_configs WHERE user_id = ? ORDER BY kind ASC')
    .bind(userId)
    .all<DigestConfigRecord>();

  const byKind = new Map<DigestKind, DigestConfig>();
  for (const r of rows.results || []) {
    byKind.set(r.kind, parseDigestConfig(r));
  }

  // Ensure every kind exists (defaults written back to DB lazily below).
  const out: DigestConfig[] = [];
  for (const kind of VALID_KINDS) {
    const cfg = byKind.get(kind);
    if (cfg) {
      out.push(cfg);
    } else {
      const def = getDefaultDigestConfig(kind);
      await ensureDigestConfig(db, userId, def);
      out.push(def);
    }
  }
  return out;
}

/** Load a single kind's config (or its default, seeded if missing). */
export async function getDigestConfig(
  db: D1Database,
  userId: number,
  kind: DigestKind,
): Promise<DigestConfig> {
  const row = await db
    .prepare('SELECT * FROM digest_configs WHERE user_id = ? AND kind = ?')
    .bind(userId, kind)
    .first<DigestConfigRecord>();
  if (row) return parseDigestConfig(row);

  const def = getDefaultDigestConfig(kind);
  await ensureDigestConfig(db, userId, def);
  return def;
}

/** Insert a default config row if one doesn't already exist (idempotent). */
export async function ensureDigestConfig(
  db: D1Database,
  userId: number,
  cfg: DigestConfig,
): Promise<void> {
  await db
    .prepare(
      `INSERT OR IGNORE INTO digest_configs
        (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      userId,
      cfg.kind,
      cfg.enabled ? 1 : 0,
      cfg.scheduleTime,
      cfg.scheduleWeekday,
      JSON.stringify(cfg.sections),
      JSON.stringify(cfg.notifyChannels),
      cfg.newsTopics.join(', '),
    )
    .run();
}

/** Persist a full config update (upsert). */
export async function upsertDigestConfig(
  db: D1Database,
  userId: number,
  kind: DigestKind,
  cfg: DigestConfig,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO digest_configs
        (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, kind) DO UPDATE SET
         enabled = excluded.enabled,
         schedule_time = excluded.schedule_time,
         schedule_weekday = excluded.schedule_weekday,
         sections_json = excluded.sections_json,
         notify_channels_json = excluded.notify_channels_json,
         news_topics = excluded.news_topics,
         updated_at = CURRENT_TIMESTAMP`,
    )
    .bind(
      userId,
      kind,
      cfg.enabled ? 1 : 0,
      cfg.scheduleTime,
      cfg.scheduleWeekday,
      JSON.stringify(cfg.sections),
      JSON.stringify(cfg.notifyChannels),
      cfg.newsTopics.join(', '),
    )
    .run();
}
