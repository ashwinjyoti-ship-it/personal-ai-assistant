-- Memory Suggestions: Proposed memories extracted from conversations for user approval

CREATE TABLE IF NOT EXISTS memory_suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('fact', 'preference', 'decision', 'context', 'task')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  importance INTEGER DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'rejected')),
  source_message_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  decided_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_memory_suggestions_user_status ON memory_suggestions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_memory_suggestions_user_created ON memory_suggestions(user_id, created_at);
