import { describe, it, expect } from 'vitest';
import {
  THREADS_UI_VISIBLE_SQL,
  UI_VISIBLE_MESSAGE_CHANNEL_SQL,
} from '../chat-ui-filter';

describe('chat-ui-filter', () => {
  it('hides voice channel messages from chat log queries', () => {
    expect(UI_VISIBLE_MESSAGE_CHANNEL_SQL).toBe("channel != 'voice'");
  });

  it('shows empty or web-written threads only', () => {
    expect(THREADS_UI_VISIBLE_SQL).toContain("c.channel = 'web'");
    expect(THREADS_UI_VISIBLE_SQL).toContain('NOT EXISTS');
  });
});
