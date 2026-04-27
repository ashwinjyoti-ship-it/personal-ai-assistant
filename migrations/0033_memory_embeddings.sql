-- Add embedding support for semantic search in memory
ALTER TABLE memory ADD COLUMN embedding TEXT;

-- Index to speed up memory retrieval for semantic search (user-scoped)
CREATE INDEX IF NOT EXISTS idx_memory_user_tier ON memory(user_id, tier);
