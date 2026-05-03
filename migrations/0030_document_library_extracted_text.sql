-- Add extracted_text column to document_library and expand source CHECK to allow 'memory_migration'
-- Recreate table to update the CHECK constraint (SQLite cannot ALTER constraints)

CREATE TABLE document_library_v2 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_id TEXT,
  drive_file_id TEXT,
  source TEXT NOT NULL DEFAULT 'upload' CHECK(source IN ('upload', 'drive', 'memory_migration')),
  name TEXT NOT NULL,
  mime_type TEXT,
  size INTEGER DEFAULT 0,
  summary TEXT,
  key_points TEXT,
  action_items_json TEXT,
  status TEXT NOT NULL DEFAULT 'uploaded' CHECK(status IN ('uploaded', 'parsed', 'summarized', 'failed')),
  extracted_text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO document_library_v2
  (id, user_id, file_id, drive_file_id, source, name, mime_type, size, summary, key_points, action_items_json, status, created_at, updated_at)
  SELECT id, user_id, file_id, drive_file_id, source, name, mime_type, size, summary, key_points, action_items_json, status, created_at, updated_at
  FROM document_library;

DROP TABLE IF EXISTS document_library;
ALTER TABLE document_library_v2 RENAME TO document_library;

CREATE INDEX IF NOT EXISTS idx_document_library_user_status ON document_library(user_id, status);
CREATE INDEX IF NOT EXISTS idx_document_library_file_id ON document_library(file_id);
CREATE INDEX IF NOT EXISTS idx_document_library_user_name ON document_library(user_id, name);
