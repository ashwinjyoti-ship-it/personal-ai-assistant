-- Fix: "no such table: document_library" upload errors.
-- Migration 0030 recreates document_library via DROP + RENAME (document_library_v2).
-- If 0030 was interrupted, never applied to a remote DB, or the rename half failed,
-- the table can be missing entirely. This migration ensures document_library exists
-- with the latest schema (extracted_text column, 'memory_migration' source allowed).

-- Clean up any orphan v2 table left behind by a partially-applied 0030.
DROP TABLE IF EXISTS document_library_v2;

CREATE TABLE IF NOT EXISTS document_library (
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

CREATE INDEX IF NOT EXISTS idx_document_library_user_status ON document_library(user_id, status);
CREATE INDEX IF NOT EXISTS idx_document_library_file_id ON document_library(file_id);
CREATE INDEX IF NOT EXISTS idx_document_library_user_name ON document_library(user_id, name);
