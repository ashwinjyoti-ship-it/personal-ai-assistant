// Provider Abstraction Layer — Smart Rotation Model
// Rotates between providers based on daily usage, with cooldown awareness
// No explicit primary/fallback — the least-used provider gets the next request

import type { LLMProvider, LLMMessage, LLMOptions, LLMResponse } from '../../types';

// === Claude Provider ===
export class ClaudeProvider implements LLMProvider {
  name = 'anthropic';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'claude-sonnet-4-20250514') {
    this.apiKey = apiKey;
    this.model = model;
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

    const res = await fetch('https://api.anthropic.com/v1/messages', {
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
      throw new Error('Claude API error ' + res.status + ': ' + err);
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

    const res = await fetch('https://api.anthropic.com/v1/messages', {
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
      throw new Error('Claude stream error ' + res.status + ': ' + err);
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

// === OpenAI Provider ===
export class OpenAIProvider implements LLMProvider {
  name = 'openai';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'gpt-4o') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async chat(messages: LLMMessage[], options?: LLMOptions): Promise<LLMResponse> {
    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature ?? 0.7,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    };
    if (options?.tools && options.tools.length > 0) {
      body.tools = options.tools.map(t => ({
        type: 'function',
        function: { name: t.name, description: t.description, parameters: t.parameters },
      }));
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error('OpenAI API error ' + res.status + ': ' + err);
    }

    const data = await res.json() as any;
    const choice = data.choices?.[0];

    return {
      content: choice?.message?.content || '',
      toolCalls: choice?.message?.tool_calls?.map((tc: any) => ({
        id: tc.id,
        name: tc.function.name,
        arguments: JSON.parse(tc.function.arguments || '{}'),
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

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error('OpenAI stream error ' + res.status + ': ' + err);
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
      const status = inCooldown ? '⏸ cooldown' : '▶ active';
      return s.provider + ': ' + s.tokens_used.toLocaleString() + ' tokens / ' + s.request_count + ' requests [' + status + ']';
    }).join('\n');
  }
}

// === Provider Factory with Smart Rotation ===
export async function createRotatingProvider(
  db: D1Database,
  userId: number,
  encryptionKey: string
): Promise<{ provider: LLMProvider; rotation: ProviderRotation }> {
  const { decrypt } = await import('../crypto');
  const rotation = new ProviderRotation(db, userId);

  // Gather all available providers (ones with configured keys)
  const availableProviders: { name: string; provider: LLMProvider }[] = [];

  const claudeCred = await db.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(userId, 'anthropic').first<{ encrypted_value: string }>();
  
  if (claudeCred) {
    try {
      const apiKey = await decrypt(claudeCred.encrypted_value, encryptionKey);
      availableProviders.push({ name: 'anthropic', provider: new ClaudeProvider(apiKey) });
    } catch (e) {
      console.error('Failed to decrypt Claude key');
    }
  }

  const openaiCred = await db.prepare(
    'SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?'
  ).bind(userId, 'openai').first<{ encrypted_value: string }>();
  
  if (openaiCred) {
    try {
      const apiKey = await decrypt(openaiCred.encrypted_value, encryptionKey);
      availableProviders.push({ name: 'openai', provider: new OpenAIProvider(apiKey) });
    } catch (e) {
      console.error('Failed to decrypt OpenAI key');
    }
  }

  if (availableProviders.length === 0) {
    throw new Error('No LLM provider configured. Please add at least one API key in Settings → Keys.');
  }

  // Pick the best provider based on rotation logic
  const providerNames = availableProviders.map(p => p.name);
  const chosen = await rotation.pickProvider(providerNames);

  if (!chosen) {
    // All providers in cooldown — pick the one with earliest cooldown expiry
    // or just use the first available as last resort
    console.warn('All providers in cooldown, using first available');
    return { provider: availableProviders[0].provider, rotation };
  }

  const selected = availableProviders.find(p => p.name === chosen)!;
  return { provider: selected.provider, rotation };
}
