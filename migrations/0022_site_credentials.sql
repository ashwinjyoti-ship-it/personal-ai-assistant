-- Secret Vault: store encrypted site login credentials
-- Each entry holds a JSON blob { username, password, notes? } encrypted with the user's PIN.
CREATE TABLE IF NOT EXISTS site_credentials (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL,
  name        TEXT    NOT NULL,          -- user-chosen label, e.g. "LinkedIn", "Bank"
  encrypted_blob TEXT NOT NULL,          -- AES-GCM encrypted JSON: { username, password, notes? }
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, name)
);
