-- Fix uploaded_files schema conflict between 0007 (old columns) and 0020 (new columns).
-- Migration 0007 created the table with old columns (name, mime_type, data_base64, size),
-- making 0020's CREATE TABLE IF NOT EXISTS a no-op. The code references new columns
-- (file_name, file_type, file_data, file_size, extracted_text) causing all upload queries to fail.
-- Uploaded files are a temporary buffer (document parsing only), so data loss is acceptable.
DROP TABLE IF EXISTS uploaded_files;
CREATE TABLE uploaded_files (
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
