-- Idempotency support for tool execution.
--
-- Adds a dedicated, indexed `idempotency_key` column to tool_execution_log so
-- that side-effecting tool calls (gmail_send, append_sheet, create_calendar_event,
-- ...) can be de-duplicated: before re-executing a side-effecting tool we look
-- for a recent successful row with the same key and return its cached result
-- instead of firing the side effect again.
--
-- The key is `${userId}:${toolName}:${JSON.stringify(args)}` and was previously
-- only embedded inside the tool_args JSON blob; promoting it to its own column
-- makes the lookup an exact, indexed match.
ALTER TABLE tool_execution_log ADD COLUMN idempotency_key TEXT;

CREATE INDEX IF NOT EXISTS idx_tool_log_idempotency
  ON tool_execution_log(idempotency_key, success, created_at);
