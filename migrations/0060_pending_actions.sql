-- Approval gates: irreversible tools held until the user decides
CREATE TABLE IF NOT EXISTS pending_actions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  thread_id INTEGER,
  message_id INTEGER,
  tool_name TEXT NOT NULL,
  args_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | rejected | substituted
  channel TEXT DEFAULT 'web',
  consequence TEXT,
  created_at INTEGER NOT NULL,
  resolved_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_pending_actions_user_status
  ON pending_actions(user_id, status);

CREATE INDEX IF NOT EXISTS idx_pending_actions_thread
  ON pending_actions(thread_id, status);
