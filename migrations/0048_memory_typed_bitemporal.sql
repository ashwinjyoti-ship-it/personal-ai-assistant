-- Memory Upgrade B: Typed Memories + Bi-Temporal Tracking
-- Adds: episodic + semantic types, occurred_at, valid_until, source, entities columns
-- Widens the CHECK constraint on `type` to include the two new cognitive types

-- Step 1: Add new columns (all nullable for backward compatibility)
ALTER TABLE memory ADD COLUMN occurred_at DATETIME;
ALTER TABLE memory ADD COLUMN valid_until DATETIME;
ALTER TABLE memory ADD COLUMN source TEXT DEFAULT 'user';
ALTER TABLE memory ADD COLUMN entities TEXT DEFAULT '[]';

-- Step 2: Widen the type CHECK constraint to include episodic + semantic
-- SQLite does not support ALTER CONSTRAINT, so we use the standard 12-step table rebuild.
-- All existing columns (including tier, due_date, status added in earlier migrations) are preserved.

CREATE TABLE memory_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN (
    'summary', 'fact', 'preference', 'decision', 'context', 'task',
    'episodic', 'semantic'
  )),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  importance INTEGER DEFAULT 5,
  tier TEXT DEFAULT 'long_term' CHECK(tier IN ('working', 'long_term')),
  due_date DATETIME DEFAULT NULL,
  status TEXT DEFAULT 'open' CHECK(status IN ('open', 'done')),
  occurred_at DATETIME,
  valid_until DATETIME,
  source TEXT DEFAULT 'user',
  entities TEXT DEFAULT '[]',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO memory_new (
  id, user_id, type, title, content, importance,
  tier, due_date, status,
  occurred_at, valid_until, source, entities,
  created_at, updated_at
)
SELECT
  id, user_id, type, title, content, importance,
  tier, due_date, status,
  occurred_at, valid_until, source, entities,
  created_at, updated_at
FROM memory;

DROP TABLE memory;
ALTER TABLE memory_new RENAME TO memory;

-- Step 3: Indexes for new query patterns (time-range and point-in-time retrieval)
CREATE INDEX idx_memory_occurred ON memory(user_id, occurred_at);
CREATE INDEX idx_memory_valid ON memory(user_id, valid_until);
CREATE INDEX idx_memory_type_occurred ON memory(user_id, type, occurred_at);

-- Re-create indexes that existed before the table rebuild
CREATE INDEX IF NOT EXISTS idx_memory_tasks ON memory(user_id, type, status);
