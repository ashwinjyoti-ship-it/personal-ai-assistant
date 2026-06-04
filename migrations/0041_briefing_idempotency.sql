-- Briefing idempotency: prevent duplicate briefings for the same user/day.
--
-- The briefing cron endpoints match on a multi-minute catch-up window (see
-- shouldRunBriefing), so the same user can match on several consecutive ticks.
-- To guarantee at-most-once delivery per day we record the user-local calendar
-- date (YYYY-MM-DD) on each briefing and enforce uniqueness per
-- (user_id, briefing_type, briefing_date).

ALTER TABLE briefings ADD COLUMN briefing_date TEXT;  -- user-local YYYY-MM-DD at generation time

-- Backfill existing rows from created_at (UTC date is good enough for history).
UPDATE briefings
SET briefing_date = substr(created_at, 1, 10)
WHERE briefing_date IS NULL;

-- Enforce at-most-once per user/type/day. Rows with NULL briefing_date are
-- ignored by SQLite's unique index (NULLs are considered distinct), so legacy
-- rows that could not be backfilled never block inserts.
CREATE UNIQUE INDEX IF NOT EXISTS idx_briefings_user_type_date
  ON briefings(user_id, briefing_type, briefing_date);
