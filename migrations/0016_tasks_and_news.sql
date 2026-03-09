-- v5.0: Tasks in memory + news deduplication

-- SQLite doesn't support ALTER TABLE MODIFY for CHECK constraints.
-- We handle the new 'task' type by dropping the CHECK constraint via recreation.
-- Instead we use a trigger-less approach: just allow the new type via app-level validation.
-- SQLite CHECK constraints on existing tables require table recreation — we do it safely:

-- Step 1: Create new memory table with updated CHECK constraint
CREATE TABLE IF NOT EXISTS memory_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('summary', 'fact', 'preference', 'decision', 'context', 'task')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  importance INTEGER DEFAULT 5,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  tier TEXT DEFAULT 'long_term' CHECK(tier IN ('working', 'long_term')),
  due_date DATETIME DEFAULT NULL,
  status TEXT DEFAULT 'open' CHECK(status IN ('open', 'done')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Step 2: Copy all existing data
INSERT INTO memory_new (id, user_id, type, title, content, importance, created_at, updated_at, tier)
SELECT id, user_id, type, title, content, importance, created_at, updated_at, tier FROM memory;

-- Step 3: Drop old table, rename new
DROP TABLE memory;
ALTER TABLE memory_new RENAME TO memory;

-- Step 4: Recreate indexes
CREATE INDEX IF NOT EXISTS idx_memory_user_type ON memory(user_id, type);
CREATE INDEX IF NOT EXISTS idx_memory_tasks ON memory(user_id, type, status);

-- News deduplication table
CREATE TABLE IF NOT EXISTS briefing_seen_news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  seen_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, url),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_seen_news_user ON briefing_seen_news(user_id, seen_at);
