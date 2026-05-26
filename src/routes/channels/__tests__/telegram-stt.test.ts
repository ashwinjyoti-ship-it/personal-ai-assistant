import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../services/crypto', () => ({
  decrypt: vi.fn(async (encrypted: string) => encrypted),
}));

import { resolveTelegramSttConfig } from '../telegram-stt';

function mockDb(creds: Record<string, string | undefined>) {
  return {
    prepare(sql: string) {
      const isLegacy = sql.includes('service = ?') && !sql.includes('llm_slot');
      return {
        bind(_userId: number, service?: string) {
          return {
            async first<T>(): Promise<T | null> {
              const key = service ?? '';
              const encrypted = creds[key];
              if (!encrypted) return null;
              return { encrypted_value: encrypted } as T;
            },
          };
        },
      };
    },
  } as D1Database;
}

describe('resolveTelegramSttConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uses OpenAI from llm_slot_2 when slot_1 is anthropic', async () => {
    const db = mockDb({
      llm_slot_1: JSON.stringify({ provider: 'anthropic', apiKey: 'sk-ant' }),
      llm_slot_2: JSON.stringify({ provider: 'openai', apiKey: 'sk-openai' }),
    });

    const stt = await resolveTelegramSttConfig(db, 1, 'pin');
    expect(stt).toEqual({
      url: 'https://api.openai.com/v1/audio/transcriptions',
      apiKey: 'sk-openai',
      model: 'whisper-1',
    });
  });

  it('prefers first slot with openai in order', async () => {
    const db = mockDb({
      llm_slot_1: JSON.stringify({ provider: 'openai', apiKey: 'sk-first' }),
      llm_slot_2: JSON.stringify({ provider: 'openai', apiKey: 'sk-second' }),
    });

    const stt = await resolveTelegramSttConfig(db, 1, 'pin');
    expect(stt?.apiKey).toBe('sk-first');
  });

  it('falls back to legacy openai when no slot has STT provider', async () => {
    const db = mockDb({
      llm_slot_1: JSON.stringify({ provider: 'anthropic', apiKey: 'sk-ant' }),
      openai: 'sk-legacy-openai',
    });

    const stt = await resolveTelegramSttConfig(db, 1, 'pin');
    expect(stt?.apiKey).toBe('sk-legacy-openai');
    expect(stt?.model).toBe('whisper-1');
  });

  it('supports groq in slot with whisper-large-v3', async () => {
    const db = mockDb({
      llm_slot_1: JSON.stringify({ provider: 'groq', apiKey: 'gsk_groq' }),
    });

    const stt = await resolveTelegramSttConfig(db, 1, 'pin');
    expect(stt?.url).toContain('groq.com');
    expect(stt?.model).toBe('whisper-large-v3');
  });

  it('returns null when no openai or groq configured', async () => {
    const db = mockDb({
      llm_slot_1: JSON.stringify({ provider: 'gemini', apiKey: 'g-key' }),
    });

    const stt = await resolveTelegramSttConfig(db, 1, 'pin');
    expect(stt).toBeNull();
  });

  it('accepts api_key alias in slot JSON', async () => {
    const db = mockDb({
      llm_slot_1: JSON.stringify({ provider: 'openai', api_key: 'sk-alias' }),
    });

    const stt = await resolveTelegramSttConfig(db, 1, 'pin');
    expect(stt?.apiKey).toBe('sk-alias');
  });
});
