// Provider Abstraction Layer — Multi-Provider Rotation
// Supports generic LLM slots: any provider from the registry can be assigned to any slot
// Auto-fallback if a provider fails — tries next available provider
// Backward compatible with legacy 'anthropic' / 'openai' credential keys

import type { LLMProvider, LLMMessage, LLMOptions, LLMResponse, LLMSlotValue } from '../../types';
import { LLM_PROVIDER_REGISTRY } from '../../types';

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
    // Abacus AI RouteLLM returns tool calls as XML tags in text content instead of
    // proper OpenAI tool_calls format, causing parse failures. It also rejects
    // certain JSON Schema structures with "properties field not found" errors.
    // When tools are needed, throw a specific error so the fallback wrapper
    // routes to a tool-capable provider instead of silently dropping tools.
    const isToolUnsupported = this.apiBase.includes('routellm.abacus.ai');
    
    if (options?.tools && options.tools.length > 0 && isToolUnsupported) {
      throw new Error('TOOLS_UNSUPPORTED: Provider ' + this.name + ' does not support tool calling. Needs fallback to tool-capable provider.');
    }

    if (options?.tools && options.tools.length > 0) {
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

// === Provider Rotation Tracker (in-memory, no DB) ===
// Tracks provider errors in memory to support per-session fallback logic

export class ProviderRotation {
  private errorLog: Map<string, { error: string; cooldownUntil: number }> = new Map();
  private usageLog: Map<string, { tokens: number; requests: number }> = new Map();

  // Pick the first available provider not in cooldown
  async pickProvider(availableProviders: string[]): Promise<string | null> {
    const now = Date.now();
    const eligible = availableProviders.filter(p => {
      const entry = this.errorLog.get(p);
      if (!entry) return true;
      return entry.cooldownUntil <= now;
    });
    return eligible.length > 0 ? eligible[0] : null;
  }

  // Record usage after a successful call (in-memory only)
  async recordUsage(provider: string, tokensUsed: number): Promise<void> {
    const existing = this.usageLog.get(provider) || { tokens: 0, requests: 0 };
    this.usageLog.set(provider, { tokens: existing.tokens + tokensUsed, requests: existing.requests + 1 });
  }

  // Record an error and set cooldown
  async recordError(provider: string, error: string, cooldownMinutes: number = 5): Promise<void> {
    this.errorLog.set(provider, {
      error,
      cooldownUntil: Date.now() + cooldownMinutes * 60 * 1000,
    });
  }
}

// === LLM Slot names ===
const LLM_SLOTS = ['llm_slot_1', 'llm_slot_2', 'llm_slot_3'] as const;
// Legacy credential service names that map directly to providers
const LEGACY_SERVICES = ['anthropic', 'openai'] as const;

// === Provider Factory with Rotation + Auto-Fallback ===
// Reads generic LLM slots (llm_slot_1, llm_slot_2, llm_slot_3) + legacy anthropic/openai keys
export async function createRotatingProvider(
  db: D1Database,
  userId: number,
  encryptionKey: string
): Promise<{ provider: LLMProvider; rotation: ProviderRotation }> {
  const { decrypt } = await import('../crypto');
  const rotation = new ProviderRotation();

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

  // Pick first available provider not in cooldown
  const providerNames = availableProviders.map(p => p.name);
  const chosen = await rotation.pickProvider(providerNames);

  if (!chosen) {
    // All providers in cooldown — use first available as last resort
    console.warn('All providers in cooldown, using first available');
    return { provider: availableProviders[0].provider, rotation };
  }

  const selected = availableProviders.find(p => p.name === chosen)!;

  // Wrap provider with auto-fallback: if the chosen provider fails with auth/billing errors,
  // automatically try the next available provider instead of throwing immediately
  const fallbackProvider = createFallbackProvider(selected.provider, availableProviders, rotation);

  return { provider: fallbackProvider, rotation };
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
          || msg.includes('properties field not found')  // Abacus AI strict schema rejection
          || msg.includes('TOOLS_UNSUPPORTED');  // Provider can't handle tool calls — must fallback
        
        if (!isAuthOrBilling) throw err; // Non-auth errors — don't fallback

        // Auth/billing/tools-unsupported error — set cooldown and try next provider
        // Use short cooldown for tools-unsupported (provider is fine for non-tool requests)
        const isToolIssue = msg.includes('TOOLS_UNSUPPORTED');
        console.warn(`Provider ${primary.name} ${isToolIssue ? 'tools unsupported' : 'auth/billing error'}, trying fallback...`);
        await rotation.recordError(primary.name, msg, isToolIssue ? 1 : 1440); // 1 min for tools, 24h for auth

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
              || fbMsg.includes('properties field not found')
              || fbMsg.includes('TOOLS_UNSUPPORTED');
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
