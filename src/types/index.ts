// === Cloudflare Bindings ===
export type Bindings = {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_API_KEY?: string;       // Google API key for Places, Translate, YouTube
  GOOGLE_CSE_ID?: string;        // Google Custom Search Engine ID (optional)
  CRON_SECRET?: string;          // Shared secret for cron worker → pages auth
  DOCUMENTS_BUCKET?: R2Bucket;   // R2 bucket for document storage (optional)
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
  thread_id?: number | null;
  created_at: string;
}

export interface MemoryRecord {
  id: number;
  user_id: number;
  type: 'summary' | 'fact' | 'preference' | 'decision' | 'context' | 'task';
  tier: 'working' | 'long_term';
  title: string;
  content: string;
  importance: number;
  due_date?: string | null;
  status?: 'open' | 'done';
  created_at: string;
  updated_at: string;
}

export interface CronJobRecord {
  id: number;
  user_id: number;
  name: string;
  description: string;
  schedule_type: 'interval' | 'daily' | 'cron' | 'once';
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
  toolChoice?: 'auto' | 'required'; // Force tool use on a given turn (Phase C)
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

// === LLM Provider Registry ===
// All supported LLM providers — easily extensible
export interface LLMProviderConfig {
  id: string;           // e.g. 'anthropic', 'openai', 'grok', 'deepseek', 'gemini'
  label: string;        // Display name: 'Anthropic Claude', 'xAI Grok', etc.
  apiBase: string;      // Base URL for API calls
  apiFormat: 'anthropic' | 'openai-compatible'; // API format type
  defaultModel: string; // Default model to use
  keyPlaceholder: string; // e.g. 'sk-ant-api03-...'
  modelHint: string;    // Hint text for the model override field
  validatePath?: string;  // Endpoint path to test key validity
}

export const LLM_PROVIDER_REGISTRY: Record<string, LLMProviderConfig> = {
  anthropic: {
    id: 'anthropic',
    label: 'Anthropic Claude',
    apiBase: 'https://api.anthropic.com',
    apiFormat: 'anthropic',
    defaultModel: 'claude-sonnet-4-20250514',
    keyPlaceholder: 'sk-ant-api03-...',
    modelHint: 'claude-sonnet-4-20250514, claude-haiku-4-20250514',
    validatePath: '/v1/messages',
  },
  openai: {
    id: 'openai',
    label: 'OpenAI GPT',
    apiBase: 'https://api.openai.com',
    apiFormat: 'openai-compatible',
    defaultModel: 'gpt-4o',
    keyPlaceholder: 'sk-...',
    modelHint: 'gpt-4o, gpt-4o-mini, o3-mini',
    validatePath: '/v1/models',
  },
  grok: {
    id: 'grok',
    label: 'xAI Grok',
    apiBase: 'https://api.x.ai',
    apiFormat: 'openai-compatible',
    defaultModel: 'grok-3-mini',
    keyPlaceholder: 'xai-...',
    modelHint: 'grok-3-mini, grok-3',
    validatePath: '/v1/models',
  },
  deepseek: {
    id: 'deepseek',
    label: 'DeepSeek',
    apiBase: 'https://api.deepseek.com',
    apiFormat: 'openai-compatible',
    defaultModel: 'deepseek-chat',
    keyPlaceholder: 'sk-...',
    modelHint: 'deepseek-chat, deepseek-reasoner',
    validatePath: '/v1/models',
  },
  gemini: {
    id: 'gemini',
    label: 'Google Gemini',
    apiBase: 'https://generativelanguage.googleapis.com/v1beta/openai',
    apiFormat: 'openai-compatible',
    defaultModel: 'gemini-2.0-flash',
    keyPlaceholder: 'AIzaSy...',
    modelHint: 'gemini-2.0-flash, gemini-2.5-pro-preview',
    validatePath: '/models',
  },
  openrouter: {
    id: 'openrouter',
    label: 'OpenRouter',
    apiBase: 'https://openrouter.ai/api',
    apiFormat: 'openai-compatible',
    defaultModel: 'anthropic/claude-sonnet-4',
    keyPlaceholder: 'sk-or-...',
    modelHint: 'e.g. deepseek/deepseek-chat, meta-llama/llama-3.1-70b',
    validatePath: '/v1/models',
  },
  abacus: {
    id: 'abacus',
    label: 'Abacus AI (RouteLLM)',
    apiBase: 'https://routellm.abacus.ai',
    apiFormat: 'openai-compatible',
    defaultModel: 'route-llm',
    keyPlaceholder: 'Your Abacus API key',
    modelHint: 'route-llm (auto), grok-4, deepseek-v3.2, claude-4-5-sonnet, gemini-3-flash',
    validatePath: '/v1/models',
  },
};

// === Credential Services ===
export type ServiceName =
  | 'anthropic'                // legacy — kept for backward compat
  | 'openai'                   // legacy — kept for backward compat
  | 'llm_slot_1'               // Generic LLM slot 1 (stores JSON: {provider, apiKey})
  | 'llm_slot_2'               // Generic LLM slot 2
  | 'llm_slot_3'               // Generic LLM slot 3
  | 'telegram_bot_token'
  | 'google_oauth_tokens'      // OAuth 2.0 refresh_token + user info (per-user)
  | 'google_api_key'           // Google API key for Maps, Places, Translate, YouTube
  | 'perplexity_api_key'      // Perplexity AI key for fast research/search
  | 'browser_use_api_key';   // Browser Use Cloud key for browser automation

// Generic LLM slot value structure (stored encrypted as JSON)
export interface LLMSlotValue {
  provider: string;   // key into LLM_PROVIDER_REGISTRY
  apiKey: string;     // the actual API key
  model?: string;     // optional model override (e.g. for OpenRouter: 'deepseek/deepseek-chat')
}

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

// === SSE Streaming Types ===
export type SSEEventType = 
  | 'thinking'        // Agent is processing
  | 'tool_start'      // Tool execution started
  | 'tool_end'        // Tool execution completed
  | 'chunk'           // Text content chunk
  | 'done'            // Response complete
  | 'error';          // Error occurred

export interface SSEEvent {
  type: SSEEventType;
  data: {
    text?: string;           // For 'chunk' events
    tool?: string;           // For 'tool_start' and 'tool_end' events
    toolArgs?: Record<string, unknown>;  // For 'tool_start' events
    toolResult?: string;     // For 'tool_end' events
    error?: string;          // For 'error' events
    threadId?: number;       // Thread ID for this conversation
    provider?: string;       // LLM provider used
    tokenCount?: number;     // Token usage info
  };
}

// === Context Management Types ===
export interface ContextWindow {
  maxTokens: number;
  usedTokens: number;
  messages: LLMMessage[];
  wasTruncated: boolean;
}

// === Proactive Intelligence Types ===
export interface ProactiveTriggerRecord {
  id: number;
  user_id: number;
  name: string;
  type: 'email_content' | 'calendar_event' | 'time_based' | 'custom';
  conditions: string; // JSON
  actions: string;    // JSON
  enabled: number;
  last_triggered: string | null;
  trigger_count: number;
  created_at: string;
  updated_at: string;
}

export interface BriefingRecord {
  id: number;
  user_id: number;
  briefing_type: 'evening' | 'morning' | 'custom';
  sent_at: string;
  content_json: string; // JSON
  channel: string;
  delivered_web: number;
  delivered_telegram: number;
  created_at: string;
}

export interface BriefingItemRecord {
  id: number;
  briefing_id: number;
  item_type: 'calendar' | 'email' | 'task' | 'news' | 'custom';
  item_key: string;
  item_text: string;
  item_metadata: string; // JSON
  checked: number;
  checked_at: string | null;
  sort_order: number;
  created_at: string;
}

export interface PatternDataRecord {
  id: number;
  user_id: number;
  pattern_type: 'usage' | 'schedule' | 'email' | 'calendar' | 'preference';
  data_json: string; // JSON
  confidence: number;
  updated_at: string;
  created_at: string;
}

export interface MeetingReminderRecord {
  id: number;
  user_id: number;
  event_id: string;
  event_source: 'google';
  reminder_type: string;
  sent_at: string;
}

export interface ActionItemRecord {
  id: number;
  user_id: number;
  type: 'reminder' | 'pending_google' | 'pending_email' | 'browser_task' | 'document_summary' | 'memory_suggestion' | 'email_digest' | 'weekly_review' | 'manual';
  title: string;
  body: string;
  status: 'pending' | 'running' | 'failed' | 'completed' | 'cancelled' | 'needs_approval';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  source: string;
  source_id: string;
  action_payload: string;
  due_at: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface MemorySuggestionRecord {
  id: number;
  user_id: number;
  type: 'fact' | 'preference' | 'decision' | 'context' | 'task';
  title: string;
  content: string;
  importance: number;
  status: 'pending' | 'accepted' | 'rejected';
  source_message_id: number | null;
  created_at: string;
  decided_at: string | null;
}

export interface DocumentLibraryRecord {
  id: number;
  user_id: number;
  file_id: string | null;
  drive_file_id: string | null;
  source: 'upload' | 'drive';
  name: string;
  mime_type: string;
  size: number;
  summary: string;
  key_points: string;
  action_items_json: string;
  status: 'uploaded' | 'parsed' | 'summarized' | 'failed';
  created_at: string;
  updated_at: string;
}

// === Briefing Preferences Types ===
export interface BriefingComponentsConfig {
  google_calendar: boolean;
  gmail: boolean;
  tasks: boolean;
  news: boolean;
  // Outlook removed in v4
  outlook_calendar?: boolean;
  outlook_email?: boolean;
  weather?: boolean;
  morning_briefing?: boolean;
  weekly_review?: boolean;
  email_digest?: boolean;
}

export interface NotificationChannelsConfig {
  telegram: boolean;
  web: boolean;
}

export type ProactiveLevel = 'conservative' | 'moderate' | 'aggressive';

export interface BriefingPreferencesRecord {
  id: number;
  user_id: number;
  briefing_time: string;           // HH:MM format
  components: string;              // JSON string of BriefingComponentsConfig
  news_topics: string;             // Comma-separated topics
  notification_channels: string;   // JSON string of NotificationChannelsConfig
  proactive_level: ProactiveLevel;
  morning_briefing_enabled: number;
  morning_briefing_time: string;
  weekly_review_enabled: number;
  weekly_review_day_time: string;
  created_at: string;
  updated_at: string;
}

export interface BriefingPreferences {
  briefingTime: string;
  components: BriefingComponentsConfig;
  newsTopics: string[];
  notificationChannels: NotificationChannelsConfig;
  proactiveLevel: ProactiveLevel;
}

export const DEFAULT_BRIEFING_PREFERENCES: BriefingPreferences = {
  briefingTime: '20:00',
  components: {
    google_calendar: true,
    gmail: true,
    tasks: true,
    news: true,
  },
  newsTopics: ['AI', 'LLM', 'Tools', 'Agentic Workflows', 'AI Features'],
  notificationChannels: {
    telegram: true,
    web: true,
  },
  proactiveLevel: 'moderate',
};
