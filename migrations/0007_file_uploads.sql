-- File uploads table for storing uploaded files temporarily
-- Files are base64-encoded and stored in D1 (max 5MB per file)
-- Used for document parsing and Google Drive uploads

CREATE TABLE IF NOT EXISTS uploaded_files (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'application/octet-stream',
  size INTEGER NOT NULL DEFAULT 0,
  data_base64 TEXT NOT NULL,
  text_preview TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_uploaded_files_user ON uploaded_files(user_id);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_created ON uploaded_files(created_at);
