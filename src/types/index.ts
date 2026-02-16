// === Cloudflare Bindings ===
export type Bindings = {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: {
    user?: UserRecord;
    sessionId?: string;
  };
};

// === Database Records ===
export interface UserRecord {
  id: number;
  username: string;
  name: string;
  pin_hash: string;
  role: string;
  personality_prompt: string;
  telegram_chat_id: string;
  timezone: string;
  assistant_name: string;
  created_at: string;
  updated_at: string;
}

export interface SessionRecord {
  id: string;
  user_id: number;
  channel: string;
  expires_at: string;
  created_at: string;
}

export interface CredentialRecord {
  id: number;
  user_id: number;
  service: string;
  label: string;
  encrypted_value: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationRecord {
  id: number;
  user_id: number;
  channel: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  metadata: string;
  token_estimate: number;
  created_at: string;
}

export interface MemoryRecord {
  id: number;
  user_id: number;
  type: 'summary' | 'fact' | 'preference' | 'decision' | 'context';
  tier: 'working' | 'long_term';
  title: string;
  content: string;
  importance: number;
  created_at: string;
  updated_at: string;
}

export interface CronJobRecord {
  id: number;
  user_id: number;
  name: string;
  description: string;
  schedule_type: 'interval' | 'daily' | 'cron';
  schedule_value: string;
  action_type: string;
  action_config: string;
  enabled: number;
  state: 'created' | 'active' | 'reminding' | 'paused' | 'completed';
  last_run: string | null;
  next_run: string | null;
  notify_channel: string;
  created_at: string;
  updated_at: string;
}

// === Channel Adapter Types ===
export interface NormalizedMessage {
  userId: number;
  username: string;
  channel: 'web' | 'telegram';
  text: string;
  sessionId: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AssistantResponse {
  text: string;
  widgets?: Widget[];
  channel: string;
}

export interface Widget {
  type: 'schedule' | 'memory' | 'status' | 'list' | 'card';
  data: Record<string, unknown>;
}

// === LLM Types ===
export interface LLMProvider {
  name: string;
  chat(messages: LLMMessage[], options?: LLMOptions): Promise<LLMResponse>;
  streamChat(messages: LLMMessage[], options?: LLMOptions): Promise<ReadableStream>;
}

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
}

export interface LLMOptions {
  temperature?: number;
  maxTokens?: number;
  tools?: LLMTool[];
}

export interface LLMTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface LLMResponse {
  content: string;
  toolCalls?: ToolCall[];
  usage?: { promptTokens: number; completionTokens: number };
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

// === Credential Services ===
export type ServiceName = 
  | 'anthropic' 
  | 'openai' 
  | 'telegram_bot_token'
  | 'google_oauth_tokens'     // OAuth 2.0 refresh_token + user info (per-user)
  | 'outlook_email'
  | 'outlook_password'
  | 'outlook_email_2'         // Second Outlook account (e.g., personal vs work)
  | 'outlook_password_2'
  | 'steel_api_key'
  | 'browser_use_api_key';

// === Error Log ===
export interface ErrorLogRecord {
  id: number;
  user_id: number | null;
  source: string;
  error_type: string;
  message: string;
  details: string;
  acknowledged: number;
  created_at: string;
}

// === Cron Execution Log ===
export interface CronExecutionLogRecord {
  id: number;
  job_id: number;
  user_id: number;
  status: 'running' | 'completed' | 'failed' | 'skipped';
  idempotency_key: string | null;
  started_at: string;
  completed_at: string | null;
  result: string;
  error: string;
}

// === Browser Session ===
export interface BrowserSessionRecord {
  id: number;
  user_id: number;
  steel_session_id: string;
  profile_id: string | null;
  purpose: string;
  status: 'active' | 'expired' | 'error' | 'released';
  last_used: string;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

// === Usage Caps ===
export interface UsageCapRecord {
  id: number;
  user_id: number;
  cap_type: string;
  daily_limit: number;
  current_usage: number;
  usage_date: string;
  created_at: string;
  updated_at: string;
}
