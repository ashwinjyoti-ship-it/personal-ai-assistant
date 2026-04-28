-- Idempotent no-op: the state column is added by migration 0011 (table recreation)
-- on all installs. The original ALTER TABLE here caused a "duplicate column" error
-- when 0011 had already added it, which stopped subsequent migrations from running.
-- SQLite has no ALTER TABLE ADD COLUMN IF NOT EXISTS, so this is a safe no-op.
SELECT 1;
