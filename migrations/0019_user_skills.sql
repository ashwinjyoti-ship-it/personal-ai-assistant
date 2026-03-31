-- User-defined skills: custom reusable workflows that Karna can execute
CREATE TABLE IF NOT EXISTS user_skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,                          -- URL-safe tool name (e.g. equipment_parser)
  description TEXT NOT NULL,                   -- What the skill does (shown to LLM + user)
  instructions TEXT NOT NULL,                  -- Step-by-step instructions for execution
  parameters TEXT NOT NULL DEFAULT '{}',       -- JSON schema of input parameters
  required_tools TEXT NOT NULL DEFAULT '[]',   -- JSON array of tool names used
  examples TEXT DEFAULT '[]',                  -- JSON array of {input, output} examples
  enabled INTEGER DEFAULT 1,
  usage_count INTEGER DEFAULT 0,
  last_used_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON user_skills (user_id, enabled);
