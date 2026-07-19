-- Page watches: user-registered URLs that the Render cron re-snapshots on an
-- interval (via Playwright) and diffs; a change fires a notification.
-- NOTE: production D1 never has migrations applied by the deploy pipeline, so
-- runtime code creates this table on demand (services/pageWatch.ts) with the
-- exact same DDL. This file keeps local dev (`npm run db:migrate:local`) in sync.
CREATE TABLE IF NOT EXISTS page_watches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  css_selector TEXT,
  check_interval_minutes INTEGER NOT NULL DEFAULT 30,
  last_hash TEXT,
  last_snapshot TEXT,
  last_checked_at DATETIME,
  last_changed_at DATETIME,
  last_error TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
