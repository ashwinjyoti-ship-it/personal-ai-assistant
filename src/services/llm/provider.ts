// Provider Abstraction Layer — Smart Rotation Model
// Supports generic LLM slots: any provider from the registry can be assigned to any slot
// Rotates between all configured slots based on daily usage, with cooldown awareness
// Backward compatible with legacy 'anthropic' / 'openai' credential keys

import type { LLMProvider, LLMMessage, LLMOptions, LLMResponse, LLMSlotValue } from '../../types';
import { LLM_PROVIDER_REGISTRY } from '../../types';

// === Cost Guard ===
// Default caps — can be overridden per user in usage_caps table
const DEFAULT_DAILY_REQUEST_CAP = 100;
const DEFAULT_DAILY_TOKEN_CAP = 500_000;

export class CostGuard {
  constructor(private db: D1Database, private userId: number) {}

  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Check if user is within daily caps
  async checkCaps(): Promise<{ allowed: boolean; reason?: string }> {
    const today = this.getToday();

    // Aggregate all provider usage for this user today
    const usage = await this.db.prepare(
      `SELECT COALESCE(SUM(tokens_used), 0) as total_tokens, COALESCE(SUM(request_count), 0) as total_requests 
       FROM provider_usage WHERE user_id = ? AND usage_date = ?`
    ).bind(this.userId, today).first<{ total_tokens: number; total_requests: number }>();

    const totalTokens = usage?.total_tokens || 0;
    const totalRequests = usage?.total_requests || 0;

    // Check custom caps first, fall back to defaults
    const tokenCap = await this.getCap('daily_tokens') || DEFAULT_DAILY_TOKEN_CAP;
    const requestCap = await this.getCap('daily_requests') || DEFAULT_DAILY_REQUEST_CAP;

    if (totalTokens >= tokenCap) {
      return { allowed: false, reason: `Daily token limit reached (${totalTokens.toLocaleString()}/${tokenCap.toLocaleString()}). Resets at midnight.` };
    }
    if (totalRequests >= requestCap) {
      return { allowed: false, reason: `Daily request limit reached (${totalRequests}/${requestCap}). Resets at midnight.` };
    }

    return { allowed: true };
  }

  private async getCap(capType: string): Promise<number | null> {
    const today = this.getToday();
    const cap = await this.db.prepare(
      `SELECT daily_limit FROM usage_caps WHERE user_id = ? AND cap_type = ? AND usage_date = ?`
    ).bind(this.userId, capType, today).first<{ daily_limit: number }>();
    return cap?.daily_limit || null;
  }

  // Get usage summary for display
  async getUsageSummary(): Promise<string> {
    const today = this.getToday();
    const usage = await this.db.prepare(
      `SELECT COALESCE(SUM(tokens_used), 0) as total_tokens, COALESCE(SUM(request_count), 0) as total_requests 
       FROM provider_usage WHERE user_id = ? AND usage_date = ?`
    ).bind(this.userId, today).first<{ total_tokens: number; total_requests: number }>();

    const tokenCap = await this.getCap('daily_tokens') || DEFAULT_DAILY_TOKEN_CAP;
    const requestCap = await this.getCap('daily_requests') || DEFAULT_DAILY_REQUEST_CAP;

    return `Today: ${(usage?.total_tokens || 0).toLocaleString()}/${tokenCap.toLocaleString()} tokens, ${usage?.total_requests || 0}/${requestCap} requests`;
  }
}

// === Error Logger ===
export async function logError(db: D1Database, userId: number | null, source: string, errorType: string, message: string, details: Record<string, unknown> = {}): Promise<void> {
  try {
    await db.prepare(
      `INSERT INTO error_log (user_id, source, error_type, message, details) VALUES (?, ?, ?, ?, ?)`
    ).bind(userId, source, errorType, message, JSON.stringify(details)).run();
  } catch (e) {
    console.error('Failed to log error:', e);
  }
}

// === Claude Provider (Anthropic API format) ===
export class ClaudeProvider implements LLMProvider {
  name: string;
  private apiKey: string;
  private model: string;
  private apiBase: string;

  constructor(apiKey: string, model = 'claude-sonnet-4-20250514', apiBase = 'https://api.anthropic.com', providerName = 'anthropic') {
    this.apiKey = apiKey;
    this.model = model;
    this.apiBase = apiBase;
    this.name = providerName;
  }

  async chat(messages: LLMMessage[], options?: LLMOptions): Promise<LLMResponse> {
    const systemMessage = messages.find(m => m.role === 'system');
    const chatMessages = messages.filter(m => m.role !== 'system');

    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature ?? 0.7,
      messages: chatMessages.map(m => ({ role: m.role, content: m.content })),
    };
    if (systemMessage) body.system = systemMessage.content;
    if (options?.tools && options.tools.length > 0) {
      body.tools = options.tools.map(t => ({
        name: t.name, description: t.description, input_schema: t.parameters,
      }));
    }

    const res = await fetch(this.apiBase + '/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(this.name + ' API error ' + res.status + ': ' + err);
    }

    const data = await res.json() as any;
    const textBlocks = data.content?.filter((b: any) => b.type === 'text') || [];
    const toolBlocks = data.content?.filter((b: any) => b.type === 'tool_use') || [];

    return {
      content: textBlocks.map((b: any) => b.text).join('\n'),
      toolCalls: toolBlocks.map((b: any) => ({
        id: b.id, name: b.name, arguments: b.input,
      })),
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
      },
    };
  }

  async streamChat(messages: LLMMessage[], options?: LLMOptions): Promise<ReadableStream> {
    const systemMessage = messages.find(m => m.role === 'system');
    const chatMessages = messages.filter(m => m.role !== 'system');

    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature ?? 0.7,
      stream: true,
      messages: chatMessages.map(m => ({ role: m.role, content: m.content })),
    };
    if (systemMessage) body.system = systemMessage.content;

    const res = await fetch(this.apiBase + '/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(this.name + ' stream error ' + res.status + ': ' + err);
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    return new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) { controller.close(); return; }
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            if (jsonStr === '[DONE]') continue;
            try {
              const event = JSON.parse(jsonStr);
              if (event.type === 'content_block_delta' && event.delta?.text) {
                controller.enqueue(new TextEncoder().encode('data: ' + JSON.stringify({ text: event.delta.text }) + '\n\n'));
              }
            } catch {}
          }
        }
      }
    });
  }
}

// === Deep Tool Schema Sanitizer ===
// Ensures full JSON Schema compliance for strict providers like Abacus AI RouteLLM.
// Recursively validates every schema node: objects must have non-empty properties,
// arrays must have items, and all nodes must have a type.
function sanitizeToolSchema(schema: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const src = schema || {};

  // Ensure type exists
  result.type = (src as any).type || 'object';

  // Handle object type
  if (result.type === 'object') {
    const srcProps = (src as any).properties;
    if (srcProps && typeof srcProps === 'object' && Object.keys(srcProps).length > 0) {
      // Recursively sanitize each property's schema
      const cleanProps: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(srcProps)) {
        if (val && typeof val === 'object') {
          cleanProps[key] = sanitizePropertySchema(val as Record<string, unknown>);
        } else {
          cleanProps[key] = val;
        }
      }
      result.properties = cleanProps;
    } else {
      // Empty or missing properties — add a no-op placeholder so strict APIs accept it
      result.properties = { _unused: { type: 'string', description: 'No parameters needed' } };
    }

    // Ensure required is always an array
    if (Array.isArray((src as any).required)) {
      result.required = (src as any).required;
    } else {
      result.required = [];
    }
  }

  // Copy description if present
  if ((src as any).description) result.description = (src as any).description;

  return result;
}

// Recursively sanitize a single property schema (handles nested objects and arrays)
function sanitizePropertySchema(schema: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...schema };

  // Ensure type exists
  if (!result.type) result.type = 'string';

  // Handle nested object properties
  if (result.type === 'object') {
    const props = result.properties;
    if (props && typeof props === 'object' && Object.keys(props).length > 0) {
      const cleanProps: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(props as Record<string, unknown>)) {
        if (val && typeof val === 'object') {
          cleanProps[key] = sanitizePropertySchema(val as Record<string, unknown>);
        } else {
          cleanProps[key] = val;
        }
      }
      result.properties = cleanProps;
    } else {
      // Object without properties — add placeholder
      result.properties = { _unused: { type: 'string', description: 'No parameters needed' } };
    }
    if (!Array.isArray(result.required)) result.required = [];
  }

  // Handle array items — ensure items schema is valid
  if (result.type === 'array' && result.items) {
    if (typeof result.items === 'object') {
      result.items = sanitizePropertySchema(result.items as Record<string, unknown>);
    }
  } else if (result.type === 'array' && !result.items) {
    // Array without items — default to string array
    result.items = { type: 'string' };
  }

  return result;
}

// === OpenAI-Compatible Provider ===
// Works with: OpenAI, Grok (xAI), DeepSeek, Google Gemini, OpenRouter, and any OpenAI-compatible API
export class OpenAICompatibleProvider implements LLMProvider {
  name: string;
  private apiKey: string;
  private model: string;
  private apiBase: string;

  constructor(apiKey: string, model: string, apiBase: string, providerName: string) {
    this.apiKey = apiKey;
    this.model = model;
    this.apiBase = apiBase.replace(/\/+$/, ''); // trim trailing slashes
    this.name = providerName;
  }

  async chat(messages: LLMMessage[], options?: LLMOptions): Promise<LLMResponse> {
    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature ?? 0.7,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    };
    // Skip tool definitions for providers that don't reliably support them.
    // Abacus AI RouteLLM returns tool calls as XML tags in text content instead of
    // proper OpenAI tool_calls format, causing parse failures. It also rejects
    // certain JSON Schema structures with "properties field not found" errors.
    // These providers work fine for text-only conversations via the fallback system.
    const isToolUnsupported = this.apiBase.includes('routellm.abacus.ai');
    
    if (options?.tools && options.tools.length > 0 && !isToolUnsupported) {
      body.tools = options.tools.map(t => ({
        type: 'function' as const,
        function: {
          name: t.name,
          description: t.description,
          parameters: sanitizeToolSchema(t.parameters || {}),
        },
      }));
    }

    const res = await fetch(this.apiBase + '/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(this.name + ' API error ' + res.status + ': ' + err);
    }

    const data = await res.json() as any;
    const choice = data.choices?.[0];

    return {
      content: choice?.message?.content || '',
      toolCalls: choice?.message?.tool_calls?.map((tc: any) => ({
        id: tc.id,
        name: tc.function.name,
        arguments: typeof tc.function.arguments === 'string' 
          ? JSON.parse(tc.function.arguments || '{}') 
          : tc.function.arguments || {},
      })),
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
      },
    };
  }

  async streamChat(messages: LLMMessage[], options?: LLMOptions): Promise<ReadableStream> {
    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature ?? 0.7,
      stream: true,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    };

    const res = await fetch(this.apiBase + '/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(this.name + ' stream error ' + res.status + ': ' + err);
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    return new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) { controller.close(); return; }
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            if (jsonStr === '[DONE]') continue;
            try {
              const event = JSON.parse(jsonStr);
              const delta = event.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(new TextEncoder().encode('data: ' + JSON.stringify({ text: delta }) + '\n\n'));
              }
            } catch {}
          }
        }
      }
    });
  }
}

// === Provider Factory: Create an LLMProvider from a registry config + API key ===
// modelOverride allows users to specify a custom model (e.g., OpenRouter: 'deepseek/deepseek-chat')
export function createProviderFromConfig(providerId: string, apiKey: string, slotLabel: string, modelOverride?: string): LLMProvider {
  const config = LLM_PROVIDER_REGISTRY[providerId];
  if (!config) {
    throw new Error(`Unknown LLM provider: ${providerId}`);
  }

  const model = modelOverride || config.defaultModel;

  if (config.apiFormat === 'anthropic') {
    return new ClaudeProvider(apiKey, model, config.apiBase, slotLabel);
  }

  // All others use OpenAI-compatible format
  return new OpenAICompatibleProvider(apiKey, model, config.apiBase, slotLabel);
}

// === Usage Tracker ===
interface ProviderUsageRecord {
  provider: string;
  tokens_used: number;
  request_count: number;
  last_error: string;
  cooldown_until: string | null;
}

export class ProviderRotation {
  constructor(private db: D1Database, private userId: number) {}

  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Get usage stats for all providers today
  async getUsageStats(): Promise<ProviderUsageRecord[]> {
    const today = this.getToday();
    const result = await this.db.prepare(
      'SELECT provider, tokens_used, request_count, last_error, cooldown_until FROM provider_usage WHERE user_id = ? AND usage_date = ?'
    ).bind(this.userId, today).all<ProviderUsageRecord>();
    return result.results || [];
  }

  // Pick the best provider: lowest daily usage, not in cooldown
  async pickProvider(availableProviders: string[]): Promise<string | null> {
    const today = this.getToday();
    const now = new Date().toISOString();
    const stats = await this.getUsageStats();

    const statsMap = new Map<string, ProviderUsageRecord>();
    for (const s of stats) statsMap.set(s.provider, s);

    // Filter out providers in cooldown
    const eligible = availableProviders.filter(p => {
      const s = statsMap.get(p);
      if (!s) return true; // Never used today — fully eligible
      if (s.cooldown_until && s.cooldown_until > now) return false; // In cooldown
      return true;
    });

    if (eligible.length === 0) return null;

    // Sort by tokens used today (ascending) — least used goes first
    eligible.sort((a, b) => {
      const aTokens = statsMap.get(a)?.tokens_used || 0;
      const bTokens = statsMap.get(b)?.tokens_used || 0;
      return aTokens - bTokens;
    });

    return eligible[0];
  }

  // Record usage after a successful call
  async recordUsage(provider: string, tokensUsed: number): Promise<void> {
    const today = this.getToday();
    await this.db.prepare(
      `INSERT INTO provider_usage (user_id, provider, tokens_used, request_count, usage_date)
       VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(user_id, provider, usage_date) DO UPDATE SET
         tokens_used = provider_usage.tokens_used + excluded.tokens_used,
         request_count = provider_usage.request_count + 1,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(this.userId, provider, tokensUsed, today).run();
  }

  // Record an error and set cooldown (e.g., 5 minutes for rate limit, 30 min for auth error)
  async recordError(provider: string, error: string, cooldownMinutes: number = 5): Promise<void> {
    const today = this.getToday();
    const cooldownUntil = new Date(Date.now() + cooldownMinutes * 60 * 1000).toISOString();
    
    await this.db.prepare(
      `INSERT INTO provider_usage (user_id, provider, tokens_used, request_count, last_error, cooldown_until, usage_date)
       VALUES (?, ?, 0, 0, ?, ?, ?)
       ON CONFLICT(user_id, provider, usage_date) DO UPDATE SET
         last_error = excluded.last_error,
         cooldown_until = excluded.cooldown_until,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(this.userId, provider, error, cooldownUntil, today).run();
  }

  // Get a formatted status string
  async getStatusText(): Promise<string> {
    const stats = await this.getUsageStats();
    if (stats.length === 0) return 'No provider usage recorded today.';
    
    const now = new Date().toISOString();
    return stats.map(s => {
      const inCooldown = s.cooldown_until && s.cooldown_until > now;
      const status = inCooldown ? '\u23f8 cooldown' : '\u25b6 active';
      return s.provider + ': ' + s.tokens_used.toLocaleString() + ' tokens / ' + s.request_count + ' requests [' + status + ']';
    }).join('\n');
  }
}

// === LLM Slot names ===
const LLM_SLOTS = ['llm_slot_1', 'llm_slot_2', 'llm_slot_3'] as const;
// Legacy credential service names that map directly to providers
const LEGACY_SERVICES = ['anthropic', 'openai'] as const;

// === Provider Factory with Smart Rotation + Cost Guard ===
// Now reads generic LLM slots (llm_slot_1, llm_slot_2, llm_slot_3) + legacy anthropic/openai keys
export async function createRotatingProvider(
  db: D1Database,
  userId: number,
  encryptionKey: string
): Promise<{ provider: LLMProvider; rotation: ProviderRotation; costGuard: CostGuard }> {
  const { decrypt } = await import('../crypto');
  const rotation = new ProviderRotation(db, userId);
  const costGuard = new CostGuard(db, userId);

  // Check cost caps before even loading providers
  const capCheck = await costGuard.checkCaps();
  if (!capCheck.allowed) {
    throw new Error(capCheck.reason || 'Daily usage limit reached.');
  }

  // Gather all available providers (ones with configured keys)
  const availableProviders: { name: string; provider: LLMProvider }[] = [];

  // --- Load generic LLM slots (new system) ---
  for (const slotName of LLM_SLOTS) {
    const cred = await db.prepare(
      'SELECT encrypted_value, label FROM credentials WHERE user_id = ? AND service = ?'
    ).bind(userId, slotName).first<{ encrypted_value: string; label: string }>();

    if (cred) {
      try {
        const decrypted = await decrypt(cred.encrypted_value, encryptionKey);
        const slotValue: LLMSlotValue = JSON.parse(decrypted);
        
        if (slotValue.provider && slotValue.apiKey) {
          const config = LLM_PROVIDER_REGISTRY[slotValue.provider];
          if (config) {
            // Use slot label (e.g. "Slot 1: Grok") as provider name for rotation tracking
            const displayName = slotValue.provider;
            const provider = createProviderFromConfig(slotValue.provider, slotValue.apiKey, displayName, slotValue.model);
            availableProviders.push({ name: displayName, provider });
          }
        }
      } catch (e) {
        console.error(`Failed to load ${slotName}:`, e);
      }
    }
  }

  // --- Load legacy keys (backward compatible) ---
  // Only load if no generic slot uses the same provider, to avoid duplicates
  const loadedProviderIds = new Set(availableProviders.map(p => p.name));

  for (const legacyService of LEGACY_SERVICES) {
    if (loadedProviderIds.has(legacyService)) continue; // Already loaded via a slot

    const cred = await db.prepare(
      'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
    ).bind(userId, legacyService).first<{ encrypted_value: string }>();

    if (cred) {
      try {
        const apiKey = await decrypt(cred.encrypted_value, encryptionKey);
        const config = LLM_PROVIDER_REGISTRY[legacyService];
        if (config) {
          const provider = createProviderFromConfig(legacyService, apiKey, legacyService);
          availableProviders.push({ name: legacyService, provider });
        }
      } catch (e) {
        console.error(`Failed to decrypt legacy ${legacyService} key`);
      }
    }
  }

  if (availableProviders.length === 0) {
    throw new Error('No LLM provider configured. Please add at least one API key in Settings \u2192 Keys.');
  }

  // Pick the best provider based on rotation logic
  const providerNames = availableProviders.map(p => p.name);
  const chosen = await rotation.pickProvider(providerNames);

  if (!chosen) {
    // All providers in cooldown — pick the one with earliest cooldown expiry
    // or just use the first available as last resort
    console.warn('All providers in cooldown, using first available');
    return { provider: availableProviders[0].provider, rotation, costGuard };
  }

  const selected = availableProviders.find(p => p.name === chosen)!;

  // Wrap provider with auto-fallback: if the chosen provider fails with auth/billing errors,
  // automatically try the next available provider instead of throwing immediately
  const fallbackProvider = createFallbackProvider(selected.provider, availableProviders, rotation);

  return { provider: fallbackProvider, rotation, costGuard };
}

// === Fallback Provider Wrapper ===
// Wraps a primary provider: if it fails with auth/billing errors (401, 403, 400 credit),
// automatically tries the next available provider from the pool
function createFallbackProvider(
  primary: LLMProvider,
  allProviders: { name: string; provider: LLMProvider }[],
  rotation: ProviderRotation
): LLMProvider {
  // Only wrap if there are multiple providers to fall back to
  if (allProviders.length <= 1) return primary;

  return {
    name: primary.name,
    async chat(messages, options) {
      // Try primary first
      try {
        return await primary.chat(messages, options);
      } catch (err: any) {
        const msg = err.message || '';
        const isAuthOrBilling = msg.includes('401') || msg.includes('403') 
          || msg.includes('authentication') || msg.includes('credit balance')
          || msg.includes('invalid') && msg.includes('key')
          || msg.includes('properties field not found');  // Abacus AI strict schema rejection
        
        if (!isAuthOrBilling) throw err; // Non-auth errors — don't fallback

        // Auth/billing error — set long cooldown and try next provider
        console.warn(`Provider ${primary.name} auth/billing error, trying fallback...`);
        await rotation.recordError(primary.name, msg, 1440); // 24-hour cooldown for auth errors

        // Try remaining providers in order
        const others = allProviders.filter(p => p.name !== primary.name);
        for (const fallback of others) {
          try {
            const result = await fallback.provider.chat(messages, options);
            // Update the wrapper name so usage is tracked to the correct provider
            this.name = fallback.name;
            return result;
          } catch (fbErr: any) {
            const fbMsg = fbErr.message || '';
            const fbIsAuth = fbMsg.includes('401') || fbMsg.includes('403')
              || fbMsg.includes('authentication') || fbMsg.includes('credit balance')
              || fbMsg.includes('properties field not found');
            if (fbIsAuth) {
              await rotation.recordError(fallback.name, fbMsg, 1440);
              continue; // Try next
            }
            throw fbErr; // Non-auth error from fallback — propagate
          }
        }
        // All providers failed with auth errors
        throw new Error(`All LLM providers failed. Primary (${primary.name}): ${msg.substring(0, 150)}. Check your API keys in Settings \u2192 Keys.`);
      }
    },
    async streamChat(messages, options) {
      return await primary.streamChat(messages, options);
    },
  };
}
