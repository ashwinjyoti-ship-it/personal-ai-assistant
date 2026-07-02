import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../crypto', () => ({
  decrypt: vi.fn(async (encrypted: string) => encrypted),
}));

import { resolveOpenAiVoiceConfig, VOICE_LLM_SLOT } from '../resolve-openai-voice';
import { getAllowedToolNames, isToolAllowed } from '../allowlist';

function mockDb(creds: Record<string, string | undefined>) {
  return {
    prepare(sql: string) {
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

describe('resolveOpenAiVoiceConfig', () => {
  beforeEach(() => vi.clearAllMocks());

  it('reads only llm_slot_2', async () => {
    const db = mockDb({
      llm_slot_1: JSON.stringify({ provider: 'openai', apiKey: 'sk-slot1' }),
      llm_slot_2: JSON.stringify({ provider: 'openai', apiKey: 'sk-slot2' }),
    });
    const cfg = await resolveOpenAiVoiceConfig(db, 1, 'pin');
    expect(cfg).toEqual({ apiKey: 'sk-slot2', model: 'gpt-realtime-2' });
  });

  it('returns null when slot 2 is not openai', async () => {
    const db = mockDb({
      [VOICE_LLM_SLOT]: JSON.stringify({ provider: 'anthropic', apiKey: 'sk-ant' }),
    });
    expect(await resolveOpenAiVoiceConfig(db, 1, 'pin')).toBeNull();
  });

  it('returns null when slot 2 missing', async () => {
    const db = mockDb({});
    expect(await resolveOpenAiVoiceConfig(db, 1, 'pin')).toBeNull();
  });
});

describe('voice allowlist', () => {
  it('work read mode excludes writes', () => {
    const allowed = getAllowedToolNames('work', 'read');
    expect(allowed.has('gmail_list')).toBe(true);
    expect(allowed.has('gmail_send')).toBe(false);
  });

  it('quick mode allows create_schedule', () => {
    expect(isToolAllowed('quick', 'create_schedule')).toBe(true);
    expect(isToolAllowed('quick', 'gmail_list')).toBe(false);
  });

  it('commute is read-only', () => {
    expect(isToolAllowed('commute', 'read_sheet')).toBe(true);
    expect(isToolAllowed('commute', 'write_sheet')).toBe(false);
  });
});
