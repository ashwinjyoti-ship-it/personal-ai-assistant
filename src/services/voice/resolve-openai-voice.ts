import type { LLMSlotValue } from '../../types';
import { decrypt } from '../crypto';

export const VOICE_LLM_SLOT = 'llm_slot_2' as const;
export const DEFAULT_REALTIME_MODEL = 'gpt-realtime-2';

export interface OpenAiVoiceConfig {
  apiKey: string;
  model: string;
}

function slotApiKey(slot: LLMSlotValue): string | undefined {
  return slot.apiKey?.trim() || (slot as { api_key?: string }).api_key?.trim();
}

/**
 * Resolve OpenAI Realtime credentials from llm_slot_2 only (user request).
 * Slot 2 must be provider openai with a non-empty API key.
 */
export async function resolveOpenAiVoiceConfig(
  db: D1Database,
  userId: number,
  pinHash: string,
): Promise<OpenAiVoiceConfig | null> {
  const cred = await db
    .prepare('SELECT encrypted_value FROM credentials WHERE user_id = ? AND service = ?')
    .bind(userId, VOICE_LLM_SLOT)
    .first<{ encrypted_value: string }>();

  if (!cred) return null;

  try {
    const decrypted = await decrypt(cred.encrypted_value, pinHash);
    const slot: LLMSlotValue = JSON.parse(decrypted);
    const apiKey = slotApiKey(slot);
    if (slot.provider?.trim().toLowerCase() !== 'openai' || !apiKey) return null;
    const model = slot.model?.trim() || DEFAULT_REALTIME_MODEL;
    return { apiKey, model };
  } catch (e) {
    console.error('[voice] Failed to load llm_slot_2:', e);
    return null;
  }
}

export function voiceConfigErrorMessage(): string {
  return 'Add an OpenAI API key in Settings → Keys → Slot 2 (LLM slot 2). Voice uses that slot exclusively.';
}
