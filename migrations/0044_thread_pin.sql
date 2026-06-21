-- Add is_pinned column to threads for pinning conversations
ALTER TABLE threads ADD COLUMN is_pinned INTEGER DEFAULT 0;

-- Update index to support pinned-first ordering
DROP INDEX IF EXISTS idx_threads_user;
CREATE INDEX idx_threads_user ON threads(user_id, is_archived, is_pinned DESC, updated_at DESC);
