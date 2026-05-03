-- Phase 2: Skill confidence tracking — self-improving flywheel
-- confidence_score: rolling success rate (0.0–1.0) updated each time the skill's pattern fires
ALTER TABLE user_skills ADD COLUMN confidence_score REAL NOT NULL DEFAULT 1.0;

-- Track per-invocation outcome so confidence can be recomputed from raw data
ALTER TABLE skill_patterns ADD COLUMN succeeded INTEGER NOT NULL DEFAULT 1;
