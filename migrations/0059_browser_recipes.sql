-- Browser recipes: LLM-authored, user-approved browser automations in a small
-- step DSL (services/browserRecipes.ts), executed by Playwright on Render.
-- Like page_watches, runtime code creates this table on demand because the
-- deploy pipeline never applies migrations to production D1; this file keeps
-- local dev (`npm run db:migrate:local`) in sync.
CREATE TABLE IF NOT EXISTS browser_recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  steps_json TEXT NOT NULL,
  site_name TEXT,
  last_run_at DATETIME,
  last_status TEXT,
  last_error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, name)
);
