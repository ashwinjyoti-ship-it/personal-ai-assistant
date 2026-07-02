import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../crypto', () => ({
  decrypt: vi.fn(async (encrypted: string) => encrypted),
}));

import { resolveOpenAiVoiceConfig, VOICE_LLM_SLOT } from '../resolve-openai-voice';
import {
  getAllowedToolNames,
  getUnifiedVoiceToolNames,
  isToolAllowed,
  resolveVoicePhase,
} from '../allowlist';
import { voiceDefaultTransactionMode } from '../policy';

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
  it('unified voice includes reads, writes, UDM, and browser tools', () => {
    const allowed = getUnifiedVoiceToolNames();
    expect(allowed.has('gmail_list')).toBe(true);
    expect(allowed.has('gmail_send')).toBe(true);
    expect(allowed.has('udm_read_page')).toBe(true);
    expect(allowed.has('udm_write_page')).toBe(true);
    expect(allowed.has('browser_task')).toBe(true);
    expect(allowed.has('create_schedule')).toBe(true);
  });

  it('getAllowedToolNames returns unified set on mobile and desktop', () => {
    const mobile = getAllowedToolNames('work', 'full', false);
    const desktop = getAllowedToolNames('work', 'full', true);
    expect(mobile).toEqual(desktop);
    expect(mobile.has('browser_task')).toBe(true);
    expect(mobile.has('udm_apply_comment')).toBe(true);
  });

  it('isToolAllowed uses unified set regardless of legacy mode arg', () => {
    expect(isToolAllowed('commute', 'udm_read_page')).toBe(true);
    expect(isToolAllowed('quick', 'gmail_send')).toBe(true);
  });

  it('resolveVoicePhase defaults to full', () => {
    expect(resolveVoicePhase('work', false)).toBe('full');
    expect(resolveVoicePhase('work', true)).toBe('full');
    expect(resolveVoicePhase('commute', false)).toBe('full');
  });
});

describe('voice policy', () => {
  it('requires confirmation for risky writes in full phase', () => {
    expect(voiceDefaultTransactionMode('gmail_send', 'full', 'work')).toBe('confirm_required');
    expect(voiceDefaultTransactionMode('udm_write_page', 'full', 'work')).toBe('confirm_required');
    expect(voiceDefaultTransactionMode('browser_task', 'full', 'work')).toBe('confirm_required');
  });

  it('executes non-risky writes in full phase', () => {
    expect(voiceDefaultTransactionMode('create_schedule', 'full', 'work')).toBe('execute');
    expect(voiceDefaultTransactionMode('store_memory', 'full', 'work')).toBe('execute');
  });

  it('dry-runs risky writes only on explicit read phase', () => {
    expect(voiceDefaultTransactionMode('gmail_send', 'read', 'work')).toBe('dry_run');
    expect(voiceDefaultTransactionMode('gmail_list', 'read', 'work')).toBeUndefined();
  });

  it('respects explicit execute', () => {
    expect(voiceDefaultTransactionMode('gmail_send', 'full', 'work', 'execute')).toBe('execute');
  });
});
