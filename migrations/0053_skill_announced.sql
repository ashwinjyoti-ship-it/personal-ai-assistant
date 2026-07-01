-- Track whether a newly auto-learned skill has been conversationally
-- announced to the user yet (surfaced in a chat reply, not just the
-- Settings notification bell).
ALTER TABLE user_skills ADD COLUMN announced INTEGER NOT NULL DEFAULT 0;
