-- Proactive Intelligence: Briefings, Triggers, Patterns
-- Enables evening briefings, interactive checklists, custom triggers, meeting reminders

-- Proactive triggers (custom user-defined triggers)
CREATE TABLE IF NOT EXISTS proactive_triggers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('email_content', 'calendar_event', 'time_based', 'custom')),
  conditions TEXT NOT NULL DEFAULT '{}',  -- JSON: {keywords:[], regex:null, time:null, calendar_pattern:null}
  actions TEXT NOT NULL DEFAULT '{}',     -- JSON: {notify:true, log:true, telegram:true, custom_action:null}
  enabled INTEGER DEFAULT 1,
  last_triggered DATETIME,
  trigger_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_triggers_user ON proactive_triggers(user_id, enabled);
CREATE INDEX IF NOT EXISTS idx_triggers_type ON proactive_triggers(type, enabled);

-- Briefings (evening briefing instances)
CREATE TABLE IF NOT EXISTS briefings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  briefing_type TEXT DEFAULT 'evening' CHECK(briefing_type IN ('evening', 'morning', 'custom')),
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  content_json TEXT NOT NULL DEFAULT '{}',  -- Full briefing data: {calendar:[], emails:{}, tasks:[], news:[], summary:""}
  channel TEXT DEFAULT 'all',               -- 'web', 'telegram', 'all'
  delivered_web INTEGER DEFAULT 0,
  delivered_telegram INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_briefings_user ON briefings(user_id, sent_at DESC);

-- Briefing items (individual checklist items within a briefing)
CREATE TABLE IF NOT EXISTS briefing_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  briefing_id INTEGER NOT NULL,
  item_type TEXT NOT NULL CHECK(item_type IN ('calendar', 'email', 'task', 'news', 'custom')),
  item_key TEXT NOT NULL DEFAULT '',        -- Unique key for this item (e.g., event_id, email_id)
  item_text TEXT NOT NULL,
  item_metadata TEXT DEFAULT '{}',          -- JSON with extra details
  checked INTEGER DEFAULT 0,
  checked_at DATETIME,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (briefing_id) REFERENCES briefings(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_briefing_items ON briefing_items(briefing_id, checked);

-- Pattern data (user behavior patterns for smart suggestions)
CREATE TABLE IF NOT EXISTS pattern_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  pattern_type TEXT NOT NULL CHECK(pattern_type IN ('usage', 'schedule', 'email', 'calendar', 'preference')),
  data_json TEXT NOT NULL DEFAULT '{}',     -- JSON with pattern data
  confidence REAL DEFAULT 0.5,              -- 0.0 to 1.0 confidence score
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, pattern_type)
);

CREATE INDEX IF NOT EXISTS idx_pattern_user ON pattern_data(user_id, pattern_type);

-- Meeting reminders tracking (to avoid duplicate reminders)
CREATE TABLE IF NOT EXISTS meeting_reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  event_id TEXT NOT NULL,                   -- Calendar event ID
  event_source TEXT DEFAULT 'google',       -- 'google' or 'outlook'
  reminder_type TEXT DEFAULT '30min',       -- '30min', '15min', '5min'
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, event_id, event_source, reminder_type)
);

CREATE INDEX IF NOT EXISTS idx_reminders_user ON meeting_reminders(user_id, sent_at);
