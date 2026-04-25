-- Action Items: Trackable tasks and reminders generated from conversations or scheduled

CREATE TABLE IF NOT EXISTS action_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('reminder', 'pending_google', 'pending_email', 'browser_task', 'document_summary', 'memory_suggestion', 'email_digest', 'weekly_review', 'manual')),
  title TEXT NOT NULL,
  body TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'running', 'failed', 'completed', 'cancelled', 'needs_approval')),
  priority TEXT DEFAULT 'normal' CHECK(priority IN ('low', 'normal', 'high', 'urgent')),
  source TEXT,
  source_id TEXT,
  action_payload TEXT,
  due_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_action_items_user_status ON action_items(user_id, status);
CREATE INDEX IF NOT EXISTS idx_action_items_user_type ON action_items(user_id, type);
CREATE INDEX IF NOT EXISTS idx_action_items_due_at ON action_items(due_at);
