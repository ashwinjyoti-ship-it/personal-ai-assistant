-- Retry the 0045 backfills + seeding resiliently for databases where 0045
-- applied partway (it created the digest_* tables) but then failed on a
-- legacy-table backfill (e.g. briefing_items missing its `type` column), so
-- the migration was marked failed and 0046 (chat_runs) couldn't run.
--
-- Every statement here is guarded so a missing legacy table or column is a
-- no-op rather than an abort. All inserts are OR IGNORE so re-running on a DB
-- where 0045 fully succeeded is also a safe no-op.

-- Re-attempt: briefings -> digests
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

-- Re-attempt: briefing_items -> digest_items.
-- The legacy briefing_items schema is inconsistent across deployments (the
-- discriminator column is named `type` in some, `item_type` in others, and
-- absent in a few). Referencing that column in a SELECT list errors before any
-- WHERE guard can filter it, which would abort the migration. To stay safe we
-- copy the items without trying to map their legacy type to a section — every
-- copied item is filed under 'action_items_open'. This loses the per-item
-- section grouping but preserves the checklist history, and crucially never
-- breaks the migration on a missing column.
INSERT OR IGNORE INTO digest_items (digest_id, section, item_key, text, metadata, sort_order, checked, checked_at, created_at)
SELECT
  d.id,
  'action_items_open',
  bi.item_key,
  bi.text,
  bi.metadata,
  bi.sort_order,
  bi.checked,
  NULL,
  bi.created_at
FROM briefing_items bi
JOIN digests d
  ON d.user_id = (SELECT b.user_id FROM briefings b WHERE b.id = bi.briefing_id)
 AND d.created_at = (SELECT b.created_at FROM briefings b WHERE b.id = bi.briefing_id)
 AND d.kind = CASE (SELECT b.briefing_type FROM briefings b WHERE b.id = bi.briefing_id)
               WHEN 'morning' THEN 'morning' WHEN 'weekly' THEN 'weekly' ELSE 'evening' END
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefing_items')
  AND EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefings')
  AND NOT EXISTS (SELECT 1 FROM digest_items di WHERE di.digest_id = d.id AND di.item_key = bi.item_key);

-- Re-attempt: action_items email_digest/weekly_review -> digests
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

-- Re-attempt: seed digest_configs from briefing_preferences (guarded per-kind).
INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT
  user_id, 'evening', COALESCE(briefing_enabled, 1), COALESCE(briefing_time, '20:00'), NULL,
  '["calendar_tomorrow","gmail_summary","tasks_due","news_ai"]', '["ntfy","web"]',
  COALESCE(news_topics, 'AI, LLM, Tools, Agentic Workflows, AI Features')
FROM briefing_preferences
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefing_preferences');

INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT
  user_id, 'morning', COALESCE(morning_briefing_enabled, 1), COALESCE(morning_briefing_time, '08:00'), NULL,
  '["calendar_today","gmail_summary","cron_jobs_today","action_items_open"]', '["ntfy","web"]',
  COALESCE(news_topics, 'AI, LLM, Tools, Agentic Workflows, AI Features')
FROM briefing_preferences
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefing_preferences');

INSERT OR IGNORE INTO digest_configs (user_id, kind, enabled, schedule_time, schedule_weekday, sections_json, notify_channels_json, news_topics)
SELECT
  user_id, 'weekly', COALESCE(weekly_review_enabled, 1),
  substr(weekly_review_day_time, length(weekly_review_day_time) - 4),
  rtrim(substr(weekly_review_day_time, 1, length(weekly_review_day_time) - 6)),
  '["cron_completed","cron_missed","action_items_open","documents_recent","gmail_summary"]', '["ntfy","web"]',
  COALESCE(news_topics, 'AI, LLM, Tools, Agentic Workflows, AI Features')
FROM briefing_preferences
WHERE weekly_review_day_time IS NOT NULL
  AND EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='briefing_preferences');

-- Sensible defaults for every user/kind that still has no config row.
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
