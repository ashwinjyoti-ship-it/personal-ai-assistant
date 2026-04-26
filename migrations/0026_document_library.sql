-- Document Library: Parsed and summarized documents with extracted insights

CREATE TABLE IF NOT EXISTS document_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_id TEXT,
  drive_file_id TEXT,
  source TEXT NOT NULL DEFAULT 'upload' CHECK(source IN ('upload', 'drive')),
  name TEXT NOT NULL,
  mime_type TEXT,
  size INTEGER DEFAULT 0,
  summary TEXT,
  key_points TEXT,
  action_items_json TEXT,
  status TEXT NOT NULL DEFAULT 'uploaded' CHECK(status IN ('uploaded', 'parsed', 'summarized', 'failed')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_document_library_user_status ON document_library(user_id, status);
CREATE INDEX IF NOT EXISTS idx_document_library_file_id ON document_library(file_id);

-- Morning briefing and weekly review preferences
ALTER TABLE briefing_preferences ADD COLUMN morning_briefing_enabled INTEGER DEFAULT 1;
ALTER TABLE briefing_preferences ADD COLUMN morning_briefing_time TEXT DEFAULT '08:00';
ALTER TABLE briefing_preferences ADD COLUMN weekly_review_enabled INTEGER DEFAULT 1;
ALTER TABLE briefing_preferences ADD COLUMN weekly_review_day_time TEXT DEFAULT 'Sunday 20:00';
