-- Tool Execution Log: records every tool call for auditing, debugging, and metrics
CREATE TABLE IF NOT EXISTS tool_execution_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  agent_type TEXT,                 -- scheduler, workspace, research, memory, conversation, full
  provider_name TEXT,              -- which LLM provider was active
  tool_name TEXT NOT NULL,         -- e.g. create_schedule, gmail_list, web_search
  tool_args TEXT DEFAULT '{}',     -- JSON of arguments passed
  tool_result TEXT DEFAULT '',     -- truncated result (first 500 chars)
  success INTEGER DEFAULT 1,      -- 1 = success, 0 = error
  error_message TEXT,              -- error message if failed
  latency_ms INTEGER DEFAULT 0,   -- execution time in milliseconds
  was_enforcement_retry INTEGER DEFAULT 0,  -- 1 if this came from tool-call enforcement retry
  channel TEXT DEFAULT 'web',     -- web, telegram, cron, system
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tool_log_user ON tool_execution_log(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_log_tool ON tool_execution_log(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_log_created ON tool_execution_log(created_at);
CREATE INDEX IF NOT EXISTS idx_tool_log_success ON tool_execution_log(success);
