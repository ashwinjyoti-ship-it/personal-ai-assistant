import type { LLMSlotValue } from '../../types';
import { decrypt } from '../../services/crypto';

/** Same slot order as createRotatingProvider in provider.ts */
const LLM_SLOTS = ['llm_slot_1', 'llm_slot_2', 'llm_slot_3'] as const;

/** Legacy credential rows that map directly to STT backends */
const LEGACY_STT_SERVICES = ['openai', 'groq'] as const;

export interface TelegramSttConfig {
  url: string;
  apiKey: string;
  model: string;
}

function sttFromProvider(provider: string, apiKey: string): TelegramSttConfig | null {
  const key = apiKey?.trim();
  if (!key) return null;

  const id = provider.trim().toLowerCase();
  if (id === 'openai') {
    return {
      url: 'https://api.openai.com/v1/audio/transcriptions',
      apiKey: key,
      model: 'whisper-1',
    };
  }
  if (id === 'groq') {
    return {
      url: 'https://api.groq.com/openai/v1/audio/transcriptions',
      apiKey: key,
      model: 'whisper-large-v3',
    };
  }
  return null;
}

function slotApiKey(slot: LLMSlotValue): string | undefined {
  return slot.apiKey?.trim() || (slot as { api_key?: string }).api_key?.trim();
}

/**
 * Resolve Whisper STT credentials using the same slot walk as createRotatingProvider:
 * llm_slot_1 → llm_slot_2 → llm_slot_3, then legacy openai / groq rows only.
 */
export async function resolveTelegramSttConfig(
  db: D1Database,
  userId: number,
  pinHash: string,
): Promise<TelegramSttConfig | null> {
  for (const slotName of LLM_SLOTS) {
    const cred = await db
      .prepare('SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?')
      .bind(userId, slotName)
      .first<{ encrypted_value: string }>();

    if (!cred) continue;

    try {
      const decrypted = await decrypt(cred.encrypted_value, pinHash);
      const slot: LLMSlotValue = JSON.parse(decrypted);
      const apiKey = slotApiKey(slot);
      if (slot.provider && apiKey) {
        const stt = sttFromProvider(slot.provider, apiKey);
        if (stt) return stt;
      }
    } catch (e) {
      console.error(`[telegram stt] Failed to load ${slotName}:`, e);
    }
  }

  for (const legacyService of LEGACY_STT_SERVICES) {
    const cred = await db
      .prepare('SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?')
      .bind(userId, legacyService)
      .first<{ encrypted_value: string }>();

    if (!cred) continue;

    try {
      const apiKey = await decrypt(cred.encrypted_value, pinHash);
      const stt = sttFromProvider(legacyService, apiKey);
      if (stt) return stt;
    } catch (e) {
      console.error(`[telegram stt] Failed to load legacy ${legacyService}:`, e);
    }
  }

  return null;
}
