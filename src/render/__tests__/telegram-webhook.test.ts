import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../routes/channels/telegram-processor', () => ({
  processTelegramUpdate: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../env', () => ({
  createRenderEnv: vi.fn(() => ({
    DB: {} as D1Database,
    GOOGLE_CLIENT_ID: 'cid',
    GOOGLE_CLIENT_SECRET: 'secret',
  })),
}));

import { processTelegramUpdate } from '../../routes/channels/telegram-processor';
import { createRenderEnv } from '../env';
import { buildTelegramProcessorContext, scheduleTelegramUpdate } from '../telegram-webhook';

describe('scheduleTelegramUpdate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('builds processor context from bindings', () => {
    const bindings = {
      DB: {} as D1Database,
      GOOGLE_CLIENT_ID: 'a',
      GOOGLE_CLIENT_SECRET: 'b',
      GOOGLE_API_KEY: 'key',
      GOOGLE_CSE_ID: 'cse',
    };
    const ctx = buildTelegramProcessorContext(bindings);
    expect(ctx.db).toBe(bindings.DB);
    expect(ctx.env.GOOGLE_API_KEY).toBe('key');
    expect(ctx.env.GOOGLE_CSE_ID).toBe('cse');
  });

  it('schedules processTelegramUpdate without awaiting', async () => {
    const update = { update_id: 1, message: { text: 'hi' } };
    scheduleTelegramUpdate(update);

    await vi.waitFor(() => {
      expect(processTelegramUpdate).toHaveBeenCalledWith(update, expect.objectContaining({ db: expect.anything() }));
    });
    expect(createRenderEnv).toHaveBeenCalled();
  });

  it('logs and skips when createRenderEnv throws', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(createRenderEnv).mockImplementationOnce(() => {
      throw new Error('Missing D1');
    });

    scheduleTelegramUpdate({ update_id: 2 });
    expect(processTelegramUpdate).not.toHaveBeenCalled();
    expect(errSpy).toHaveBeenCalled();
    errSpy.mockRestore();
  });
});
