-- Digests: unified proactive intelligence (replaces briefings + email_digest/weekly_review action_items)
--
-- One table per digest + per-item checklist, plus a per-user/per-kind config
-- table. The old briefings/briefing_preferences tables are kept (read by the
-- legacy routes during the cutover) and backfilled into the new schema so no
-- history is lost.

-- === digest_configs: one row per (user_id, kind) ===
CREATE TABLE IF NOT EXISTS digest_configs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK(kind IN ('morning', 'evening', 'weekly', 'email')),
  enabled INTEGER NOT NULL DEFAULT 1,
  schedule_time TEXT NOT NULL DEFAULT '20:00',         -- HH:MM in user timezone
  schedule_weekday TEXT,                                -- 'Monday'..'Sunday' for weekly, NULL otherwise
  sections_json TEXT NOT NULL DEFAULT '[]',            -- ordered list of SectionKey
  notify_channels_json TEXT NOT NULL DEFAULT '["ntfy","web"]',
  news_topics TEXT DEFAULT 'AI, LLM, Tools, Agentic Workflows, AI Features',  -- comma-separated, used by news sections
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, kind)
);

CREATE INDEX IF NOT EXISTS idx_digest_configs_user ON digest_configs(user_id);

-- === digests: one generated digest per (user_id, kind, local_date) ===
CREATE TABLE IF NOT EXISTS digests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK(kind IN ('morning', 'evening', 'weekly', 'email')),
  content_json TEXT NOT NULL DEFAULT '{}',             -- DigestContent JSON
  period_start TEXT,                                   -- ISO the digest window starts
  period_end TEXT,                                     -- ISO the digest window ends
  local_date TEXT,                                     -- user-local YYYY-MM-DD at generation (idempotency key)
  delivered_channels TEXT DEFAULT '',                  -- comma-joined channels that actually succeeded: 'ntfy,web,telegram'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_digests_user ON digests(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_digests_user_kind ON digests(user_id, kind, local_date);
-- One digest per user/kind/day; NULL local_date is ignored by SQLite.
CREATE UNIQUE INDEX IF NOT EXISTS idx_digests_user_kind_date
  ON digests(user_id, kind, local_date);

-- === digest_items: checklist items within a digest ===
CREATE TABLE IF NOT EXISTS digest_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  digest_id INTEGER NOT NULL REFERENCES digests(id) ON DELETE CASCADE,
  section TEXT NOT NULL,                               -- SectionKey the item belongs to
  item_key TEXT NOT NULL,
  text TEXT NOT NULL,
  metadata TEXT DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  checked INTEGER NOT NULL DEFAULT 0,
  checked_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_digest_items_digest ON digest_items(digest_id, sort_order);

-- === Backfill: copy existing briefings -> digests ===
-- Map briefing_type -> kind. 'custom' (legacy, unused) maps to 'evening'.
-- Guarded: only runs if the legacy briefings table exists, so a DB that never
-- had the old briefing feature (or has a different schema) isn't blocked.
INSERT OR IGNORE INTO digests (user_id, kind, content_json, local_date, delivered_channels, created_at)
SELECT
  user_id,
  CASE briefing_type WHEN 'morning' THEN 'morning' WHEN 'weekly' THEN 'weekly' ELSE 'evening' END,
  content_json,
  COALESCE(briefing_date, substr(created_at, 1, 10)),
  CASE WHEN delivered_telegram = 1 THEN 'web,telegram' ELSE 'web' END,
  created_at
FROM briefings
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefings');

-- Copy briefing_items -> digest_items.
-- NOTE: the legacy briefing_items schema is inconsistent across deployments
-- (some name the discriminator column `type`, others `item_type`, some lack it
-- entirely). Referencing the column in a SELECT list errors before any WHERE
-- guard can filter it, which would abort the whole migration. The per-item
-- backfill is therefore deferred to 0047_digest_backfill_retry.sql, which
-- probes the column via pragma_table_info before referencing it. 0045 only
-- copies the per-briefing rows here (which use the stable briefings columns).

-- === Backfill: migrate email_digest / weekly_review action_items -> digests ===
-- These were reports stuffed into action_items; move them to digests so the
-- history is unified. The original action_items rows are marked 'completed'
-- (kept for audit, no longer surfaced as pending).
INSERT OR IGNORE INTO digests (user_id, kind, content_json, local_date, delivered_channels, created_at)
SELECT
  user_id,
  CASE type WHEN 'weekly_review' THEN 'weekly' ELSE 'email' END,
  body,
  substr(created_at, 1, 10),
  '',
  created_at
FROM action_items
WHERE type IN ('email_digest', 'weekly_review')
  AND EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='action_items');

UPDATE action_items
SET status = 'completed', completed_at = CURRENT_TIMESTAMP
WHERE type IN ('email_digest', 'weekly_review') AND status = 'pending'
  AND EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='action_items');

-- === Seed default digest_configs from legacy briefing_preferences ===
-- evening: from briefing_time + components + notification_channels + news_topics
-- The legacy `components` JSON only ever carried 4 booleans
-- (google_calendar, gmail, tasks, news); we map each true flag to a section.
INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT
  user_id,
  'evening',
  COALESCE(briefing_enabled, 1),
  COALESCE(briefing_time, '20:00'),
  NULL,
  -- Build the sections array by string-replacing false flags out of the
  -- canonical full list. Keeps it robust to legacy JSON formatting.
  CASE
    WHEN instr(components, '"google_calendar":false') > 0
      OR instr(components, '"gmail":false') > 0
      OR instr(components, '"tasks":false') > 0
      OR instr(components, '"news":false') > 0
    THEN
      replace(
        replace(
          replace(
            replace(
              '["calendar_tomorrow","gmail_summary","tasks_due","news_ai"]',
              '"calendar_tomorrow",',
              CASE WHEN instr(components, '"google_calendar":false') > 0 THEN '' ELSE '"calendar_tomorrow",' END
            ),
            '"gmail_summary",',
            CASE WHEN instr(components, '"gmail":false') > 0 THEN '' ELSE '"gmail_summary",' END
          ),
          '"tasks_due",',
          CASE WHEN instr(components, '"tasks":false') > 0 THEN '' ELSE '"tasks_due",' END
        ),
        ',"news_ai"',
        CASE WHEN instr(components, '"news":false') > 0 THEN '' ELSE ',"news_ai"' END
      )
    ELSE '["calendar_tomorrow","gmail_summary","tasks_due","news_ai"]'
  END,
  -- Map legacy {telegram,web} booleans to channel names. Fall back to ntfy+web.
  CASE
    WHEN instr(notification_channels, 'true') = 0 THEN '["ntfy","web"]'
    WHEN instr(notification_channels, '"telegram":true') > 0 AND instr(notification_channels, '"web":true') > 0 THEN '["ntfy","web","telegram"]'
    WHEN instr(notification_channels, '"telegram":true') > 0 THEN '["ntfy","telegram"]'
    WHEN instr(notification_channels, '"web":true') > 0 THEN '["ntfy","web"]'
    ELSE '["ntfy","web"]'
  END,
  COALESCE(news_topics, 'AI, LLM, Tools, Agentic Workflows, AI Features')
FROM briefing_preferences
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefing_preferences');

-- morning: from morning_briefing_time
INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT
  user_id,
  'morning',
  COALESCE(morning_briefing_enabled, 1),
  COALESCE(morning_briefing_time, '08:00'),
  NULL,
  '["calendar_today","gmail_summary","cron_jobs_today","action_items_open"]',
  '["ntfy","web"]',
  COALESCE(news_topics, 'AI, LLM, Tools, Agentic Workflows, AI Features')
FROM briefing_preferences
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefing_preferences');

-- weekly: from weekly_review_day_time ("Sunday 20:00")
INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT
  user_id,
  'weekly',
  COALESCE(weekly_review_enabled, 1),
  -- Take the trailing HH:MM
  substr(weekly_review_day_time, length(weekly_review_day_time) - 4),
  rtrim(substr(weekly_review_day_time, 1, length(weekly_review_day_time) - 6)),
  '["cron_completed","cron_missed","action_items_open","documents_recent","gmail_summary"]',
  '["ntfy","web"]',
  COALESCE(news_topics, 'AI, LLM, Tools, Agentic Workflows, AI Features')
FROM briefing_preferences
WHERE weekly_review_day_time IS NOT NULL
  AND EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefing_preferences');

-- For users with no briefing_preferences row at all, create sensible defaults
-- for all four kinds so the feature works out of the box.
INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT u.id, 'evening', 1, '20:00', NULL, '["calendar_tomorrow","gmail_summary","tasks_due","news_ai"]', '["ntfy","web"]', 'AI, LLM, Tools, Agentic Workflows, AI Features'
FROM users u
WHERE NOT EXISTS (SELECT 1 FROM digest_configs c WHERE c.user_id = u.id AND c.kind = 'evening');

INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT u.id, 'morning', 1, '08:00', NULL, '["calendar_today","gmail_summary","cron_jobs_today","action_items_open"]', '["ntfy","web"]', 'AI, LLM, Tools, Agentic Workflows, AI Features'
FROM users u
WHERE NOT EXISTS (SELECT 1 FROM digest_configs c WHERE c.user_id = u.id AND c.kind = 'morning');

INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT u.id, 'weekly', 1, '20:00', 'Sunday', '["cron_completed","cron_missed","action_items_open","documents_recent","gmail_summary"]', '["ntfy","web"]', 'AI, LLM, Tools, Agentic Workflows, AI Features'
FROM users u
WHERE NOT EXISTS (SELECT 1 FROM digest_configs c WHERE c.user_id = u.id AND c.kind = 'weekly');

INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT u.id, 'email', 0, '12:00', NULL, '["gmail_summary","outlook_summary"]', '["ntfy","web"]', 'AI, LLM, Tools, Agentic Workflows, AI Features'
FROM users u
WHERE NOT EXISTS (SELECT 1 FROM digest_configs c WHERE c.user_id = u.id AND c.kind = 'email');
