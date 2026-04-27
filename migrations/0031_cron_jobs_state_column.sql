-- Ensure cron_jobs has the state column required by Action Center.
-- Migration 0011 tried to add it via table recreation, but the INSERT INTO new SELECT * FROM old
-- fails when column counts differ. This migration adds the column directly.
-- NOTE: This will fail with "duplicate column name: state" on installations where 0011 succeeded.
-- That is acceptable — D1 still records the attempt and moves on to 0032+.
-- The column will exist either way.
ALTER TABLE cron_jobs ADD COLUMN state TEXT DEFAULT 'active' CHECK(state IN ('created', 'active', 'reminding', 'paused', 'completed'));
