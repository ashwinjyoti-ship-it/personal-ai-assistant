-- Uploaded files: stores base64-encoded file content for document parsing
CREATE TABLE IF NOT EXISTS uploaded_files (
  id TEXT PRIMARY KEY,                         -- UUID
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,                     -- MIME type (application/pdf, etc.)
  file_data TEXT NOT NULL,                     -- base64-encoded content
  file_size INTEGER DEFAULT 0,                 -- Original file size in bytes
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_user ON uploaded_files (user_id, created_at);
