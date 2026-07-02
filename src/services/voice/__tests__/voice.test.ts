import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../crypto', () => ({
  decrypt: vi.fn(async (encrypted: string) => encrypted),
}));

import { resolveOpenAiVoiceConfig, VOICE_LLM_SLOT } from '../resolve-openai-voice';
import { getAllowedToolNames, isToolAllowed, resolveVoicePhase } from '../allowlist';
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
  it('work read mode includes UDM reads but not writes', () => {
    const allowed = getAllowedToolNames('work', 'read');
    expect(allowed.has('udm_read_page')).toBe(true);
    expect(allowed.has('udm_search')).toBe(true);
    expect(allowed.has('udm_write_page')).toBe(false);
  });

  it('work full mode on desktop includes UDM writes', () => {
    const allowed = getAllowedToolNames('work', 'full', true);
    expect(allowed.has('udm_write_page')).toBe(true);
    expect(allowed.has('udm_apply_comment')).toBe(true);
  });

  it('commute excludes UDM tools', () => {
    expect(isToolAllowed('commute', 'udm_read_page')).toBe(false);
    expect(isToolAllowed('commute', 'udm_write_page')).toBe(false);
  });

  it('quick mode excludes UDM tools', () => {
    expect(isToolAllowed('quick', 'udm_read_page')).toBe(false);
  });

  it('work read mode excludes writes', () => {
    const allowed = getAllowedToolNames('work', 'read');
    expect(allowed.has('gmail_list')).toBe(true);
    expect(allowed.has('gmail_send')).toBe(false);
  });

  it('work full mode on desktop includes writes', () => {
    const allowed = getAllowedToolNames('work', 'full', true);
    expect(allowed.has('gmail_send')).toBe(true);
  });

  it('quick mode allows create_schedule', () => {
    expect(isToolAllowed('quick', 'create_schedule')).toBe(true);
    expect(isToolAllowed('quick', 'gmail_list')).toBe(false);
  });

  it('commute is read-only', () => {
    expect(isToolAllowed('commute', 'read_sheet')).toBe(true);
    expect(isToolAllowed('commute', 'write_sheet')).toBe(false);
  });

  it('operator on desktop includes browser tools', () => {
    const allowed = getAllowedToolNames('operator', 'full', true);
    expect(allowed.has('browser_task')).toBe(true);
    expect(allowed.has('vault_lookup')).toBe(true);
  });

  it('operator on mobile falls back to read-only', () => {
    const allowed = getAllowedToolNames('operator', 'full', false);
    expect(allowed.has('browser_task')).toBe(false);
    expect(allowed.has('gmail_list')).toBe(true);
  });

  it('resolveVoicePhase uses full on desktop work', () => {
    expect(resolveVoicePhase('work', true)).toBe('full');
    expect(resolveVoicePhase('work', false)).toBe('read');
    expect(resolveVoicePhase('operator', true)).toBe('full');
  });
});

describe('voice policy', () => {
  it('requires confirmation for UDM writes in full work mode', () => {
    expect(voiceDefaultTransactionMode('udm_write_page', 'full', 'work')).toBe('confirm_required');
    expect(voiceDefaultTransactionMode('udm_apply_comment', 'full', 'work')).toBe('confirm_required');
  });

  it('requires confirmation for risky writes in full work mode', () => {
    expect(voiceDefaultTransactionMode('gmail_send', 'full', 'work')).toBe('confirm_required');
  });

  it('dry-runs on read phase', () => {
    expect(voiceDefaultTransactionMode('gmail_send', 'read', 'work')).toBe('dry_run');
  });

  it('respects explicit execute', () => {
    expect(voiceDefaultTransactionMode('gmail_send', 'full', 'work', 'execute')).toBe('execute');
  });
});
