-- Briefing Preferences: Configurable settings for user briefings
-- Allows users to customize their briefing time, components, news topics, and notification channels

CREATE TABLE IF NOT EXISTS briefing_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  briefing_time TEXT DEFAULT '20:00',  -- HH:MM format in user's timezone
  components TEXT NOT NULL DEFAULT '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}',  -- JSON
  news_topics TEXT DEFAULT 'AI, LLM, Tools, Agentic Workflows, AI Features',  -- Comma-separated topics, max 5
  notification_channels TEXT NOT NULL DEFAULT '{"telegram":true,"web":true}',  -- JSON
  proactive_level TEXT DEFAULT 'moderate' CHECK(proactive_level IN ('conservative', 'moderate', 'aggressive')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_briefing_prefs_user ON briefing_preferences(user_id);

-- Initialize default preferences for existing users
INSERT OR IGNORE INTO briefing_preferences (user_id, briefing_time, components, news_topics, notification_channels, proactive_level)
SELECT 
  id,
  '20:00',
  '{"google_calendar":true,"outlook_calendar":true,"gmail":true,"outlook_email":true,"tasks":true,"news":true,"weather":false}',
  'AI, LLM, Tools, Agentic Workflows, AI Features',
  '{"telegram":true,"web":true}',
  'moderate'
FROM users;
