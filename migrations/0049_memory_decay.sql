-- Memory Upgrade C: Active Decay + Compaction
-- Adds: decay_score, last_accessed_at columns to memory table

ALTER TABLE memory ADD COLUMN decay_score REAL DEFAULT 1.0;
ALTER TABLE memory ADD COLUMN last_accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Backfill last_accessed_at for existing rows: use updated_at as a proxy
UPDATE memory SET last_accessed_at = updated_at WHERE last_accessed_at IS NULL;

-- Index for decay-based queries (find below-threshold memories efficiently)
CREATE INDEX idx_memory_decay ON memory(user_id, decay_score);
CREATE INDEX idx_memory_last_accessed ON memory(user_id, last_accessed_at);
