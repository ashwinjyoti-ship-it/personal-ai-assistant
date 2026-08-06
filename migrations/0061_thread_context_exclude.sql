-- Per-thread context exclusions for the Context panel (Phase 4)
ALTER TABLE threads ADD COLUMN context_exclude TEXT DEFAULT '[]';
