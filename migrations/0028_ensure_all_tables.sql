-- Fix: Ensure critical tables exist for file uploads and document library
-- This migration recreates tables that may have been dropped or missed

-- Uploaded files: stores file metadata and extracted text
-- NOTE: migration 0010 (v4_cleanup) dropped this, then 0020 and 0023 recreated it.
-- If those migrations didn't run in the right order, the table may be missing.
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

-- Document Library: stores document metadata and summaries
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

-- Briefings: stores generated briefings
CREATE TABLE IF NOT EXISTS briefings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  briefing_type TEXT NOT NULL DEFAULT 'evening' CHECK(briefing_type IN ('evening', 'morning', 'weekly')),
  content_json TEXT NOT NULL DEFAULT '{}',
  channel TEXT DEFAULT 'all',
  delivered_telegram INTEGER DEFAULT 0,
  delivered_web INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_briefings_user ON briefings(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_briefings_user_type ON briefings(user_id, briefing_type, created_at);

-- Briefing items: individual checklist items within a briefing
CREATE TABLE IF NOT EXISTS briefing_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  briefing_id INTEGER NOT NULL REFERENCES briefings(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('calendar', 'email', 'task', 'news', 'custom')),
  item_key TEXT NOT NULL,
  text TEXT NOT NULL,
  metadata TEXT DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  checked INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_briefing_items_briefing ON briefing_items(briefing_id, sort_order);

-- Memory suggestions: proposed memories from conversations
CREATE TABLE IF NOT EXISTS memory_suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('fact', 'preference', 'decision', 'context', 'task')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  importance INTEGER DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'rejected')),
  source_message_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  decided_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_memory_suggestions_user_status ON memory_suggestions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_memory_suggestions_user_created ON memory_suggestions(user_id, created_at);

-- Briefing seen news: deduplication
CREATE TABLE IF NOT EXISTS briefing_seen_news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  seen_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, url),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_seen_news_user ON briefing_seen_news(user_id, seen_at);
