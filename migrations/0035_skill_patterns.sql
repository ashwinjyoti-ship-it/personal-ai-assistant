-- Skill pattern tracking for auto-skill generation (Phase 1 of self-improving flywheel)
-- Records tool sequences after multi-tool tasks; triggers auto-skill creation at threshold.
CREATE TABLE IF NOT EXISTS skill_patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tool_signature TEXT NOT NULL,        -- Sorted unique tool names joined by comma (fingerprint)
  user_message_sample TEXT NOT NULL,   -- Truncated user message that triggered this workflow
  tool_sequence TEXT NOT NULL,         -- JSON array of tools in call order (may repeat)
  turn_count INTEGER DEFAULT 1,        -- LLM turns consumed by this task
  auto_skill_id INTEGER REFERENCES user_skills(id) ON DELETE SET NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_skill_patterns_user_sig ON skill_patterns (user_id, tool_signature);

-- Extend user_skills with auto-generation metadata
ALTER TABLE user_skills ADD COLUMN is_auto INTEGER NOT NULL DEFAULT 0;
ALTER TABLE user_skills ADD COLUMN refinement_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE user_skills ADD COLUMN source TEXT NOT NULL DEFAULT 'user'; -- 'user' | 'auto'
