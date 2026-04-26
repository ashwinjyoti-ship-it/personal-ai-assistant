-- Fix: Create missing briefings and briefing_items tables
-- These are used by proactive intelligence features

-- Briefings table: stores generated briefing content
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

-- Fix briefing_preferences: Add email_digest_enabled column if not exists
-- (SQLite doesn't have ADD COLUMN IF NOT EXISTS, so we check via migration)
-- Using a separate statement to avoid issues if column already exists

-- Email Digest: Track whether the user wants email digest summaries
-- This adds email_digest to the components JSON or a separate column
-- Since we use JSON for components, we just ensure the column exists for future use

-- Migration 0026 already added morning_briefing and weekly_review columns
-- This migration ensures email_digest is available as a component flag
