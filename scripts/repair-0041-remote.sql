-- One-time repair for production D1 when 0041 failed on duplicate briefings.
-- Safe to run if briefing_date column already exists (partial 0041 apply).
-- Run: npx wrangler d1 execute karna-production --remote --file=./scripts/repair-0041-remote.sql

-- Ensure dates are backfilled
UPDATE briefings
SET briefing_date = substr(created_at, 1, 10)
WHERE briefing_date IS NULL;

-- Remove duplicates (keep oldest row per user / type / day)
DELETE FROM briefings
WHERE briefing_date IS NOT NULL
  AND id NOT IN (
    SELECT MIN(id)
    FROM briefings
    WHERE briefing_date IS NOT NULL
    GROUP BY user_id, briefing_type, briefing_date
  );

-- Create the unique index (may already exist on retry)
CREATE UNIQUE INDEX IF NOT EXISTS idx_briefings_user_type_date
  ON briefings(user_id, briefing_type, briefing_date);

-- Mark 0041 complete so wrangler continues to 0042 / 0043 (Notes)
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0041_briefing_idempotency.sql');
