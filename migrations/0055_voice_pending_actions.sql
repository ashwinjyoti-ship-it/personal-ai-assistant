-- Voice: commute-mode queued write actions (Phase 3)
CREATE TABLE IF NOT EXISTS voice_pending_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  thread_id INTEGER,
  session_id TEXT,
  tool_name TEXT NOT NULL,
  tool_args TEXT NOT NULL,
  summary TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_voice_pending_user_status
  ON voice_pending_actions(user_id, status);
