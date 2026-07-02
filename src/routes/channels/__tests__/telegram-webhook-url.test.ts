import { describe, it, expect } from 'vitest';
import { resolveTelegramWebhookUrl } from '../telegram';

describe('resolveTelegramWebhookUrl', () => {
  it('prefers TELEGRAM_WEBHOOK_BASE_URL over API_BASE_URL', () => {
    expect(
      resolveTelegramWebhookUrl({
        TELEGRAM_WEBHOOK_BASE_URL: 'https://render.example.com',
        API_BASE_URL: 'https://pages.example.com',
      } as any),
    ).toBe('https://render.example.com/api/telegram/webhook');
  });

  it('falls back to API_BASE_URL', () => {
    expect(
      resolveTelegramWebhookUrl({
        API_BASE_URL: 'https://karna-background-worker.onrender.com',
      } as any),
    ).toBe('https://karna-background-worker.onrender.com/api/telegram/webhook');
  });

  it('falls back to request origin when env vars unset', () => {
    expect(resolveTelegramWebhookUrl({} as any, 'https://localhost:3000')).toBe(
      'https://localhost:3000/api/telegram/webhook',
    );
  });

  it('strips trailing slashes from base', () => {
    expect(
      resolveTelegramWebhookUrl({
        API_BASE_URL: 'https://render.example.com/',
      } as any),
    ).toBe('https://render.example.com/api/telegram/webhook');
  });
});
