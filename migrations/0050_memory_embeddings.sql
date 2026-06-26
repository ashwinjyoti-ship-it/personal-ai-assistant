-- Memory Upgrade A: Vector Embeddings + Hybrid Search
-- Adds: embedding column for JSON-serialized 384-dim float vectors

ALTER TABLE memory ADD COLUMN embedding TEXT;

CREATE INDEX IF NOT EXISTS idx_memory_has_embedding ON memory(user_id) WHERE embedding IS NOT NULL;
