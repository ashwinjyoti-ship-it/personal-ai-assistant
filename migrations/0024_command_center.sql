-- Command Center bundle: action items, memory suggestions, document library,
-- richer notifications, and proactive briefing preferences.

CREATE TABLE IF NOT EXISTS action_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'manual',
  title TEXT NOT NULL,
  body TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'normal',
  source TEXT DEFAULT '',
  source_id TEXT DEFAULT '',
  action_payload TEXT DEFAULT '{}',
  due_at DATETIME,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_action_items_user_status ON action_items(user_id, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_action_items_due ON action_items(user_id, due_at);

CREATE TABLE IF NOT EXISTS memory_suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'fact',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  importance INTEGER DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'pending',
  source_message_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  decided_at DATETIME
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_memory_suggestions_dedupe
  ON memory_suggestions(user_id, type, title, content);
CREATE INDEX IF NOT EXISTS idx_memory_suggestions_user_status
  ON memory_suggestions(user_id, status, created_at DESC);

CREATE TABLE IF NOT EXISTS document_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_id TEXT REFERENCES uploaded_files(id) ON DELETE SET NULL,
  drive_file_id TEXT,
  source TEXT NOT NULL DEFAULT 'upload',
  name TEXT NOT NULL,
  mime_type TEXT DEFAULT '',
  size INTEGER DEFAULT 0,
  summary TEXT DEFAULT '',
  key_points TEXT DEFAULT '[]',
  action_items_json TEXT DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'uploaded',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_document_library_file
  ON document_library(user_id, file_id);
CREATE INDEX IF NOT EXISTS idx_document_library_user
  ON document_library(user_id, updated_at DESC);

ALTER TABLE notifications ADD COLUMN priority TEXT DEFAULT 'normal';
ALTER TABLE notifications ADD COLUMN status TEXT DEFAULT 'open';
ALTER TABLE notifications ADD COLUMN due_at DATETIME;
ALTER TABLE notifications ADD COLUMN action_payload TEXT DEFAULT '{}';

ALTER TABLE briefing_preferences ADD COLUMN morning_enabled INTEGER DEFAULT 1;
ALTER TABLE briefing_preferences ADD COLUMN morning_time TEXT DEFAULT '08:00';
ALTER TABLE briefing_preferences ADD COLUMN email_digest_enabled INTEGER DEFAULT 1;
ALTER TABLE briefing_preferences ADD COLUMN weekly_review_enabled INTEGER DEFAULT 1;
ALTER TABLE briefing_preferences ADD COLUMN weekly_review_day INTEGER DEFAULT 1;
ALTER TABLE briefing_preferences ADD COLUMN weekly_review_time TEXT DEFAULT '09:00';
ALTER TABLE briefing_preferences ADD COLUMN last_morning_briefing_date TEXT;
ALTER TABLE briefing_preferences ADD COLUMN last_email_digest_date TEXT;
ALTER TABLE briefing_preferences ADD COLUMN last_weekly_review_date TEXT;
