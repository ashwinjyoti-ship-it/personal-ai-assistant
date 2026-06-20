-- Notes: user-saved reference content from manual entry, research, or chat

CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  tags TEXT DEFAULT '',
  source TEXT DEFAULT 'manual'
    CHECK(source IN ('manual', 'research', 'chat')),
  source_query TEXT DEFAULT '',
  is_pinned INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notes_user
  ON notes(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notes_pinned
  ON notes(user_id, is_pinned, updated_at DESC);
