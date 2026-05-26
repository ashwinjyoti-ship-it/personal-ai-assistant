import type { Bindings } from '../types';
import {
  processTelegramUpdate,
  type TelegramProcessorContext,
  type TelegramProcessorEnv,
} from '../routes/channels/telegram-processor';
import { createRenderEnv } from './env';

export function toTelegramProcessorEnv(bindings: Bindings): TelegramProcessorEnv {
  return {
    GOOGLE_CLIENT_ID: bindings.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: bindings.GOOGLE_CLIENT_SECRET,
    GOOGLE_API_KEY: bindings.GOOGLE_API_KEY,
    GOOGLE_CSE_ID: bindings.GOOGLE_CSE_ID,
    DOCUMENTS_BUCKET: bindings.DOCUMENTS_BUCKET,
    AI: bindings.AI,
    VECTORIZE: bindings.VECTORIZE,
  };
}

export function buildTelegramProcessorContext(bindings: Bindings): TelegramProcessorContext {
  return {
    db: bindings.DB,
    env: toTelegramProcessorEnv(bindings),
  };
}

/** Ack fast; process update on Render (same pattern as CF waitUntil). */
export function scheduleTelegramUpdate(update: unknown, bindings?: Bindings): void {
  let ctx: TelegramProcessorContext;
  try {
    ctx = buildTelegramProcessorContext(bindings ?? createRenderEnv());
  } catch (err) {
    console.error('[render telegram] failed to build env:', err);
    return;
  }

  void processTelegramUpdate(update, ctx).catch((err) => {
    console.error('[render telegram] processTelegramUpdate failed:', err);
  });
}
