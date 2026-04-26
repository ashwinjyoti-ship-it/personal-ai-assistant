-- Ensure uploaded_files and document_library tables exist.
-- Defensive re-creation in case prior migrations (0020/0023/0028) did not apply cleanly.

CREATE TABLE IF NOT EXISTS uploaded_files (
  id           TEXT    PRIMARY KEY,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name    TEXT    NOT NULL,
  file_type    TEXT    NOT NULL,
  file_data    TEXT    NOT NULL,
  file_size    INTEGER DEFAULT 0,
  extracted_text TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_user ON uploaded_files (user_id, created_at);

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

-- Ensure action_items table exists (required for Action Center)
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
