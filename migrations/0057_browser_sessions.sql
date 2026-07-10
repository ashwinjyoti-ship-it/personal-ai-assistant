-- Browser Sessions: persisted Playwright storageState (cookies + origins) for
-- scripted browser automation (e.g. Outlook OWA login), so repeat runs skip
-- re-authentication instead of hitting the login flow every time.
-- Encrypted the same way as site_credentials: AES-GCM blob keyed by the
-- user's pin_hash.
CREATE TABLE IF NOT EXISTS browser_sessions (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER NOT NULL,
  provider       TEXT    NOT NULL,          -- e.g. "outlook"
  encrypted_state TEXT   NOT NULL,          -- AES-GCM encrypted Playwright storageState JSON
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, provider)
);
