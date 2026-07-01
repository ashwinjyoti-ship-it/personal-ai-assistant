-- Auth security log: records reset-pin attempts (success, mismatch, rate-limited)
-- so future "did someone reset my PIN?" questions are answerable from data instead of guesswork.
CREATE TABLE IF NOT EXISTS auth_security_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,     -- reset_pin_success, reset_pin_mismatch, reset_pin_blocked
  username TEXT,
  ip TEXT,
  detail TEXT,                  -- e.g. number of credentials cleared
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_auth_security_log_username ON auth_security_log(username);
CREATE INDEX IF NOT EXISTS idx_auth_security_log_created ON auth_security_log(created_at);
