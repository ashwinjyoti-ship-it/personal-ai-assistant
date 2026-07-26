// Scripted Outlook OWA login + inbox scrape (Playwright on Render). Defined
// as an inline function shape (not imported from src/render/*) so this file —
// which is reachable from src/index.tsx and gets bundled for Cloudflare Pages —
// never references the `playwright`-dependent module directly.
export type OutlookPlaywrightFn = (input: {
  db: D1Database;
  userId: number;
  pinHash: string;
  username: string;
  password: string;
  target?: 'inbox' | 'calendar';
  /** Number of inbox rows requested by the user (1-10). */
  maxEmails?: number;
}) => Promise<{
  status: 'completed' | 'failed';
  emails?: Array<{ sender: string; subject: string; date: string; snippet: string }>;
  events?: string[];
  error?: string;
}>;

// Execute a stored browser recipe (step DSL) via Playwright on Render.
// Inline shape for the same bundling reason as OutlookPlaywrightFn.
export type BrowserRecipeFn = (input: {
  steps: unknown[];
  secrets?: { username: string; password: string };
  userId?: number;
}) => Promise<{
  status: 'completed' | 'failed';
  outputs?: Record<string, string | string[]>;
  trace?: string[];
  error?: string;
}>;

// Generic page text snapshot via Playwright on Render (page-watch cron).
// Inline shape for the same bundling reason as OutlookPlaywrightFn.
// 'skipped' means the container's single browser slot was in use by
// user-facing work; the watch is left untouched and retried next tick.
export type PageSnapshotFn = (input: {
  url: string;
  selector?: string | null;
}) => Promise<{
  status: 'completed' | 'failed' | 'skipped';
  text?: string;
  error?: string;
}>;

// === Cloudflare Bindings ===
export type Bindings = {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_API_KEY?: string;       // Google API key for Places, Translate, YouTube
  GOOGLE_CSE_ID?: string;        // Google Custom Search Engine ID (optional)
  CRON_SECRET?: string;          // Shared secret for cron worker → pages auth
  DOCUMENTS_BUCKET?: R2Bucket;   // R2 bucket for document storage (optional)
  AI?: Ai;                       // Cloudflare AI Workers (embedding generation)
  VECTORIZE?: VectorizeIndex;    // Cloudflare Vectorize (vector similarity search)
  // Phase B/D: Cloudflare Pages injects the Render backend URL into the SPA so the
  // browser and Telegram webhook registration call Render directly.
  API_BASE_URL?: string;
  TELEGRAM_WEBHOOK_BASE_URL?: string;
  EDDY_BASE_URL?: string;  // Eddy (NCPA Sound Department) API base URL
  OUTLOOK_PLAYWRIGHT?: OutlookPlaywrightFn; // Render-only capability — not available on Cloudflare
  PAGE_SNAPSHOT?: PageSnapshotFn; // Render-only capability — not available on Cloudflare
  BROWSER_RECIPE?: BrowserRecipeFn; // Render-only capability — not available on Cloudflare
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

// Row returned by the auth middleware query `SELECT s.*, u.* FROM sessions s JOIN users u`.
// Combines session columns with the joined user columns the middleware reads.
export interface SessionUserRow {
  id: string;
  user_id: number;
  expires_at: string;
  username: string;
  name: string;
  pin_hash: string;
  personality_prompt: string;
  telegram_chat_id: string;
  timezone: string;
  assistant_name: string;
  created_at: string;
  updated_at: string;
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
  type: 'summary' | 'fact' | 'preference' | 'decision' | 'context' | 'task' | 'episodic' | 'semantic';
  tier: 'working' | 'long_term';
  title: string;
  content: string;
  importance: number;
  due_date?: string | null;
  status?: 'open' | 'done';
  occurred_at?: string | null;
  valid_until?: string | null;
  source?: string;
  entities?: string;
  decay_score?: number;
  last_accessed_at?: string | null;
  embedding?: string | null;
  created_at: string;
  updated_at: string;
}

export interface TypedMemoryInput {
  userId: number;
  type: 'episodic' | 'semantic';
  title: string;
  content: string;
  importance?: number;
  occurredAt?: string | null;
  validUntil?: string | null;
  source?: string;
  entities?: string[];
  tier?: 'working' | 'long_term';
}

export type SignalIntent = 'question' | 'command' | 'statement' | 'tool_call' | 'reflection' | 'greeting' | 'meta';

export interface Signal {
  id?: number;
  user_id: number;
  conversation_id: number;
  role: 'user' | 'assistant';
  intent: SignalIntent;
  entities: string[];
  topic: string;
  importance: number;
  emotional_tone?: 'neutral' | 'frustrated' | 'excited' | 'uncertain';
  raw_ref: string;
  occurred_at: string;
  created_at: string;
}

// === Memory Confidence (Upgrade E) ===

export interface ConfidenceResult {
  memory: MemoryRecord;
  confidence: number;
  breakdown: {
    retrieval_similarity: number;
    decay_score: number;
    source_trust: number;
    corroboration_count: number;
    corroboration_normalized: number;
  };
  reasoning: string;
  tier: 'high' | 'medium' | 'low';
}

export interface ConfidenceSearchOpts {
  limit?: number;
  type?: string;
  minConfidence?: number;
  returnAllAboveMin?: boolean;
}

export interface ConfidenceSearchResult {
  results: ConfidenceResult[];
  overallConfidence: 'high' | 'medium' | 'low';
  systemPromptSuffix: string;
  unmetQuery?: string;
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
  channel: 'web' | 'telegram' | 'cron' | 'voice';
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
  // Optional tool calls emitted on an assistant turn (used by the enforcement loop
  // to preserve a tool-call turn in history while maintaining role alternation).
  toolCalls?: ToolCall[];
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
  usage?: {
    promptTokens: number;
    completionTokens: number;
    cacheReadTokens?: number;
    cacheCreationTokens?: number;
  };
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
    defaultModel: 'claude-sonnet-5',
    keyPlaceholder: 'sk-ant-api03-...',
    modelHint: 'claude-sonnet-5, claude-haiku-4-5',
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
    defaultModel: 'anthropic/claude-sonnet-5',
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
  | 'exa_api_key'              // Exa AI-optimized web search & content retrieval for research
  | 'ntfy_url'                 // Ntfy push notification endpoint URL
  | 'ntfy_token'               // Ntfy bearer token (optional, private topics)
  | 'browser_use_api_key'    // Browser Use Cloud key for browser automation
  | 'unified-doc-management'; // Unified Docs API key (ash-doc.pages.dev)

// === Notes ===
export interface NoteRecord {
  id: number;
  user_id: number;
  title: string;
  content: string;
  tags: string;
  source: 'manual' | 'research' | 'chat';
  source_query: string;
  is_pinned: number;
  created_at: string;
  updated_at: string;
}

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

// === SSE Streaming Types ===
export type SSEEventType =
  | 'thinking'          // Agent is processing
  | 'tool_start'        // Tool execution started
  | 'tool_end'          // Tool execution completed
  | 'chunk'             // Text content chunk
  | 'done'              // Response complete
  | 'error'             // Error occurred
  | 'browser_ack'       // Immediate acknowledgment when a browser task starts
  | 'browser_progress'   // Progress update during a long-running browser task
  | 'research_ack'       // Immediate acknowledgment when research tool starts
  | 'research_progress'; // Heartbeat progress update during a long-running research call

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
    message?: string;        // For 'browser_ack', 'browser_progress', 'research_ack', 'research_progress' events
    startedAt?: string;      // For 'browser_ack' events
    elapsed_s?: number;      // For 'browser_progress' and 'research_progress' events
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
  source: 'upload' | 'drive' | 'memory_migration';
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

// === Digests (unified proactive intelligence) ===
//
// Replaces the four ad-hoc proactive products (evening briefing, morning
// briefing, email digest, weekly review) with one parameterised model.

export type DigestKind = 'morning' | 'evening' | 'weekly' | 'email';

// Pluggable section keys. Each has a fetcher in src/services/digest/sections/.
export type SectionKey =
  | 'calendar_today'
  | 'calendar_tomorrow'
  | 'gmail_summary'
  | 'outlook_summary'
  | 'tasks_due'
  | 'news_ai'
  | 'cron_jobs_today'
  | 'cron_completed'
  | 'cron_missed'
  | 'action_items_open'
  | 'documents_recent';

export type DeliveryChannel = 'ntfy' | 'web' | 'telegram';

// One row per (user_id, kind) in digest_configs.
export interface DigestConfigRecord {
  id: number;
  user_id: number;
  kind: DigestKind;
  enabled: number;
  schedule_time: string;             // HH:MM in user timezone
  schedule_weekday: string | null;  // 'Monday'..'Sunday' for weekly, else null
  sections_json: string;            // JSON: SectionKey[]
  notify_channels_json: string;     // JSON: DeliveryChannel[]
  news_topics: string;              // comma-separated
  created_at: string;
  updated_at: string;
}

// Parsed, app-facing shape of a DigestConfigRecord.
export interface DigestConfig {
  kind: DigestKind;
  enabled: boolean;
  scheduleTime: string;
  scheduleWeekday: string | null;
  sections: SectionKey[];
  notifyChannels: DeliveryChannel[];
  newsTopics: string[];
}

// One generated digest row in `digests`.
export interface DigestRecord {
  id: number;
  user_id: number;
  kind: DigestKind;
  content_json: string;
  period_start: string | null;
  period_end: string | null;
  local_date: string | null;
  delivered_channels: string;
  created_at: string;
}

export interface DigestItemRecord {
  id: number;
  digest_id: number;
  section: SectionKey;
  item_key: string;
  text: string;
  metadata: string;            // JSON
  checked: number;
  checked_at: string | null;
  sort_order: number;
  created_at: string;
}

// The unified content contract every digest generator returns.
export interface DigestContent {
  generatedAt: string;
  period: { start: string; end: string };
  sections: DigestSection[];
  highlights: string[];   // 1-3 plain bullets used as the notification preview
}

export interface DigestSection {
  key: SectionKey;
  title: string;
  summary: string;        // one-line summary, may be empty
  items: DigestSectionItem[];
}

export interface DigestSectionItem {
  key: string;
  text: string;
  metadata: Record<string, unknown>;
}

// Checklist item as written to digest_items (carries the section for grouping).
export interface DigestItem {
  section: SectionKey;
  key: string;
  text: string;
  metadata: Record<string, unknown>;
  sortOrder: number;
}
