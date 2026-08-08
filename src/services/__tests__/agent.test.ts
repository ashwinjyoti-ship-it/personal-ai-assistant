import { describe, it, expect, vi } from 'vitest';
import {
  neutraliseNarrationFinal,
  buildSystemPrompt,
  cleanOrphanedUserMessage,
  expandThreadContext,
  buildAssistantMetadata,
  parseConversationMetadata,
  isOutlookReadOnlyBrowserTask,
  isOutlookCalendarBrowserTask,
  requestedOutlookEmailCount,
  executeToolWithLogging,
} from '../agent';
import type { LLMMessage, UserRecord, ConversationRecord } from '../../types';

// ─────────────────────────────────────────────────────────────────────────────
// Shared fixtures
// ─────────────────────────────────────────────────────────────────────────────

const NARRATION_REPLACEMENT =
  '(My previous response was cut off before completing. Starting fresh.)';

const ORPHAN_PLACEHOLDER = '(Previous request did not complete. Please try again.)';

const baseUser: UserRecord = {
  id: 1,
  username: 'test',
  name: 'Test User',
  pin_hash: '',
  personality_prompt: '',
  telegram_chat_id: '',
  timezone: 'UTC',
  assistant_name: 'Karna',
  created_at: '',
  updated_at: '',
};

// ─────────────────────────────────────────────────────────────────────────────
// neutraliseNarrationFinal
// ─────────────────────────────────────────────────────────────────────────────

describe('neutraliseNarrationFinal', () => {
  // ── Guard cases ─────────────────────────────────────────────────────────────

  it('no-ops on empty array', () => {
    const msgs: LLMMessage[] = [];
    neutraliseNarrationFinal(msgs);
    expect(msgs).toHaveLength(0);
  });

  it('no-ops when only system and user messages exist (no assistant)', () => {
    const msgs: LLMMessage[] = [
      { role: 'system', content: 'You are helpful.' },
      { role: 'user', content: 'Hello' },
    ];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe('You are helpful.');
    expect(msgs[1].content).toBe('Hello');
  });

  it('no-ops when only a single user message exists', () => {
    const msgs: LLMMessage[] = [{ role: 'user', content: 'Hi' }];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe('Hi');
  });

  // ── Pattern matching (all trigger phrases) ──────────────────────────────────

  it.each([
    ['now let me', 'Now let me read the Vue.js homepage.'],
    ['let me (with space)', 'Let me check your calendar for today.'],
    ["i'll", "I'll save this to your Drive now."],
    ['i will', 'I will create the schedule for you.'],
    ["i'm going to", "I'm going to search for that information."],
    ["let's", "Let's write the essay first."],
    ['to do this', 'To do this I need to open the spreadsheet.'],
  ])('neutralises narration starting with "%s"', (_label, content) => {
    const msgs: LLMMessage[] = [
      { role: 'user', content: 'Do something' },
      { role: 'assistant', content },
    ];
    neutraliseNarrationFinal(msgs);
    expect(msgs[1].content).toBe(NARRATION_REPLACEMENT);
  });

  it('is case-insensitive — "NOW LET ME ..." is neutralised', () => {
    const msgs: LLMMessage[] = [
      { role: 'assistant', content: 'NOW LET ME fetch your emails.' },
    ];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe(NARRATION_REPLACEMENT);
  });

  it('is case-insensitive — mixed case "LeT Me ..." is neutralised', () => {
    const msgs: LLMMessage[] = [{ role: 'assistant', content: 'LeT Me look that up.' }];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe(NARRATION_REPLACEMENT);
  });

  // ── Length boundary (< 300) ─────────────────────────────────────────────────

  it('neutralises content of exactly 299 chars (< 300)', () => {
    const content = 'Let me ' + 'x'.repeat(292); // 7 + 292 = 299
    expect(content.length).toBe(299);
    const msgs: LLMMessage[] = [{ role: 'assistant', content }];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe(NARRATION_REPLACEMENT);
  });

  it('does NOT neutralise content of exactly 300 chars (not < 300)', () => {
    const content = 'Let me ' + 'x'.repeat(293); // 7 + 293 = 300
    expect(content.length).toBe(300);
    const msgs: LLMMessage[] = [{ role: 'assistant', content }];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe(content);
  });

  it('does NOT neutralise long narration (>300 chars)', () => {
    const content = 'Let me explain: ' + 'word '.repeat(80); // far over 300
    const msgs: LLMMessage[] = [{ role: 'assistant', content }];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe(content);
  });

  // ── Non-narration content ───────────────────────────────────────────────────

  it('does NOT neutralise a normal short assistant reply', () => {
    const msgs: LLMMessage[] = [{ role: 'assistant', content: 'Yes, 2+2 is 4.' }];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe('Yes, 2+2 is 4.');
  });

  it('does NOT neutralise a reply that contains trigger phrase but does not start with it', () => {
    const msgs: LLMMessage[] = [
      { role: 'assistant', content: 'Sure! Now let me know if you need anything else.' },
    ];
    neutraliseNarrationFinal(msgs);
    // "Sure! Now let me..." — trim() is "Sure! Now let me...", does not start with pattern
    expect(msgs[0].content).toBe('Sure! Now let me know if you need anything else.');
  });

  // ── Non-string content (tool calls stored as arrays) ───────────────────────

  it('does NOT crash or neutralise when content is a non-string (array)', () => {
    const msgs = [
      {
        role: 'assistant' as const,
        content: [{ type: 'tool_use', id: 'tu_1', name: 'web_search' }] as unknown as string,
      },
    ];
    neutraliseNarrationFinal(msgs);
    expect(Array.isArray(msgs[0].content)).toBe(true);
  });

  // ── Only the LAST assistant message is affected ─────────────────────────────

  it('affects only the last assistant message, not earlier ones', () => {
    const msgs: LLMMessage[] = [
      { role: 'assistant', content: 'Let me start with step one.' }, // earlier — matched but not last
      { role: 'user', content: 'Continue' },
      { role: 'assistant', content: 'Let me now do step two.' }, // LAST
    ];
    neutraliseNarrationFinal(msgs);
    expect(msgs[2].content).toBe(NARRATION_REPLACEMENT); // last replaced
    expect(msgs[0].content).toBe('Let me start with step one.'); // earlier untouched
  });

  it('finds the last assistant even when the current (last) message is from user', () => {
    // Typical call site: history ends with narration, then current user request appended
    const msgs: LLMMessage[] = [
      { role: 'assistant', content: "I'll write the essay now." }, // stale narration
      { role: 'user', content: "What's 2+2?" }, // current request (last)
    ];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe(NARRATION_REPLACEMENT); // narration replaced
    expect(msgs[1].content).toBe("What's 2+2?"); // current user message untouched
  });

  it('does not affect a non-narration assistant message sandwiched between user messages', () => {
    const msgs: LLMMessage[] = [
      { role: 'user', content: 'Question' },
      { role: 'assistant', content: 'The answer is 42.' }, // complete, non-narration
      { role: 'user', content: 'Follow-up' },
    ];
    neutraliseNarrationFinal(msgs);
    expect(msgs[1].content).toBe('The answer is 42.');
  });

  // ── Leading whitespace (trim behaviour) ────────────────────────────────────

  it('matches after trim — leading whitespace does not block detection', () => {
    const msgs: LLMMessage[] = [{ role: 'assistant', content: '   Let me check.' }];
    neutraliseNarrationFinal(msgs);
    expect(msgs[0].content).toBe(NARRATION_REPLACEMENT);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// buildSystemPrompt — channel-specific behaviour
// ─────────────────────────────────────────────────────────────────────────────

describe('buildSystemPrompt', () => {
  // ── Fix 5: Telegram constraints ────────────────────────────────────────────

  it('includes TELEGRAM CONSTRAINTS block when channel is "telegram"', () => {
    const prompt = buildSystemPrompt(baseUser, '', 'telegram');
    expect(prompt).toContain('TELEGRAM CONSTRAINTS');
  });

  it('includes essay/save-to-Drive constraint in Telegram block', () => {
    const prompt = buildSystemPrompt(baseUser, '', 'telegram');
    expect(prompt).toContain('Essays / save to Drive');
    expect(prompt).toContain('full');
    expect(prompt).not.toContain('under 400 words');
  });

  it('includes research+save constraint in Telegram block', () => {
    const prompt = buildSystemPrompt(baseUser, '', 'telegram');
    expect(prompt).toContain('Research + save');
  });

  it('includes reminders constraint in Telegram block', () => {
    const prompt = buildSystemPrompt(baseUser, '', 'telegram');
    expect(prompt).toContain('Reminders');
  });

  it('includes no-narration constraint in Telegram block', () => {
    const prompt = buildSystemPrompt(baseUser, '', 'telegram');
    expect(prompt).toContain('No narration');
  });

  it('Telegram reminder rule explicitly mentions create_schedule as mandatory', () => {
    const prompt = buildSystemPrompt(baseUser, '', 'telegram');
    expect(prompt).toContain('MUST call create_schedule');
  });

  it('does NOT include TELEGRAM CONSTRAINTS when channel is "web"', () => {
    const prompt = buildSystemPrompt(baseUser, '', 'web');
    expect(prompt).not.toContain('TELEGRAM CONSTRAINTS');
  });

  it('does NOT include TELEGRAM CONSTRAINTS when channel is undefined', () => {
    const prompt = buildSystemPrompt(baseUser, '');
    expect(prompt).not.toContain('TELEGRAM CONSTRAINTS');
  });

  it('does NOT include TELEGRAM CONSTRAINTS for uppercase "TELEGRAM" (strict equality)', () => {
    // The guard is `channel === 'telegram'` — uppercase must not trigger it
    const prompt = buildSystemPrompt(baseUser, '', 'TELEGRAM');
    expect(prompt).not.toContain('TELEGRAM CONSTRAINTS');
  });

  // ── Fix 6: Universal reminder rule (all channels) ──────────────────────────

  it('includes "NEVER say I\'ve set a reminder" rule regardless of channel', () => {
    for (const ch of [undefined, 'web', 'telegram'] as const) {
      const prompt = buildSystemPrompt(baseUser, '', ch);
      expect(prompt).toContain("NEVER say \"I've set a reminder\"");
    }
  });

  // ── Personalisation ────────────────────────────────────────────────────────

  it('uses assistant_name from user record', () => {
    const custom = { ...baseUser, assistant_name: 'Jarvis' };
    const prompt = buildSystemPrompt(custom, '');
    expect(prompt).toContain('Jarvis');
    expect(prompt).not.toContain('Karna');
  });

  it('falls back to "Karna" when assistant_name is empty', () => {
    // The code does: (user as any).assistant_name || 'Karna'
    const custom = { ...baseUser, assistant_name: '' };
    const prompt = buildSystemPrompt(custom, '');
    expect(prompt).toContain('Karna');
  });

  it('injects memory context into the prompt', () => {
    const prompt = buildSystemPrompt(baseUser, 'User prefers dark mode');
    expect(prompt).toContain('User prefers dark mode');
  });

  it('includes user name and timezone in the prompt', () => {
    const custom = { ...baseUser, name: 'Alice', timezone: 'Asia/Kolkata' };
    const prompt = buildSystemPrompt(custom, '');
    expect(prompt).toContain('Alice');
    expect(prompt).toContain('Asia/Kolkata');
  });

  it('includes UDM markdown formatting rules in the system prompt', () => {
    const prompt = buildSystemPrompt(baseUser, '');
    expect(prompt).toContain('UDM Markdown Formatting');
    expect(prompt).toContain('blank line');
    expect(prompt).toContain('Never use `---`');
    expect(prompt).toContain('Always preserve the page title');
  });

  it('includes UDM formatting constraint in Telegram block', () => {
    const prompt = buildSystemPrompt(baseUser, '', 'telegram');
    expect(prompt).toContain('UDM formatting');
    expect(prompt).toContain('Never use `---` for spacing');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// cleanOrphanedUserMessage
// ─────────────────────────────────────────────────────────────────────────────

describe('cleanOrphanedUserMessage', () => {
  const userId = 1;
  const channel = 'web';

  const makeMsg = (
    role: ConversationRecord['role'],
    content = 'x',
  ): ConversationRecord => ({
    id: 1,
    user_id: userId,
    channel,
    role,
    content,
    metadata: '{}',
    token_estimate: content.length,
    created_at: new Date().toISOString(),
  });

  const mockMemory = () =>
    ({ storeMessage: vi.fn().mockResolvedValue(undefined) }) as any;

  // ── Guard cases ─────────────────────────────────────────────────────────────

  it('no-ops on empty history — storeMessage not called', async () => {
    const memory = mockMemory();
    const msgs: ConversationRecord[] = [];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, undefined);
    expect(memory.storeMessage).not.toHaveBeenCalled();
    expect(msgs).toHaveLength(0);
  });

  it('no-ops when last message is assistant', async () => {
    const memory = mockMemory();
    const msgs = [makeMsg('user'), makeMsg('assistant')];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, undefined);
    expect(memory.storeMessage).not.toHaveBeenCalled();
    expect(msgs).toHaveLength(2);
  });

  it('no-ops when last message is system', async () => {
    const memory = mockMemory();
    const msgs = [makeMsg('system')];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, undefined);
    expect(memory.storeMessage).not.toHaveBeenCalled();
    expect(msgs).toHaveLength(1);
  });

  // ── Orphan insertion ────────────────────────────────────────────────────────

  it('inserts placeholder assistant message when last message is user', async () => {
    const memory = mockMemory();
    const msgs = [makeMsg('assistant'), makeMsg('user')];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, undefined);
    expect(memory.storeMessage).toHaveBeenCalledOnce();
    expect(msgs).toHaveLength(3);
    const inserted = msgs[2];
    expect(inserted.role).toBe('assistant');
    expect(inserted.content).toBe(ORPHAN_PLACEHOLDER);
    expect(inserted.id).toBe(-1);
  });

  it('sets token_estimate on the inserted placeholder to content length', async () => {
    const memory = mockMemory();
    const msgs = [makeMsg('user')];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, undefined);
    const inserted = msgs[1];
    expect(inserted.token_estimate).toBe(ORPHAN_PLACEHOLDER.length);
  });

  it('passes threadId=undefined correctly to storeMessage', async () => {
    const memory = mockMemory();
    const msgs = [makeMsg('user')];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, undefined);
    expect(memory.storeMessage).toHaveBeenCalledWith(
      userId, channel, 'assistant', ORPHAN_PLACEHOLDER, '{}', undefined,
    );
  });

  it('passes a numeric threadId through to storeMessage', async () => {
    const memory = mockMemory();
    const msgs = [makeMsg('user')];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, 42);
    expect(memory.storeMessage).toHaveBeenCalledWith(
      userId, channel, 'assistant', ORPHAN_PLACEHOLDER, '{}', 42,
    );
  });

  it('works when there is only a single user message (no prior assistant)', async () => {
    const memory = mockMemory();
    const msgs = [makeMsg('user', 'Hello')];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, undefined);
    expect(msgs).toHaveLength(2);
    expect(msgs[1].role).toBe('assistant');
  });

  it('preserves existing messages when inserting the placeholder', async () => {
    const memory = mockMemory();
    const msgs = [
      makeMsg('assistant', 'Previous reply'),
      makeMsg('user', 'Unanswered question'),
    ];
    await cleanOrphanedUserMessage(memory, msgs, userId, channel, undefined);
    expect(msgs[0].content).toBe('Previous reply');
    expect(msgs[1].content).toBe('Unanswered question');
    expect(msgs[2].content).toBe(ORPHAN_PLACEHOLDER);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Research context persistence helpers
// ─────────────────────────────────────────────────────────────────────────────

describe('research context helpers', () => {
  const makeMsg = (
    role: ConversationRecord['role'],
    content: string,
    metadata = '{}',
  ): ConversationRecord => ({
    id: 1,
    user_id: 1,
    channel: 'web',
    role,
    content,
    metadata,
    token_estimate: content.length,
    created_at: new Date().toISOString(),
  });

  it('buildAssistantMetadata stores research query and report', () => {
    const meta = JSON.parse(buildAssistantMetadata(['research'], {
      query: 'pencil vs pen',
      report: 'Pencils are erasable.',
    }));
    expect(meta.tools).toEqual(['research']);
    expect(meta.research_query).toBe('pencil vs pen');
    expect(meta.research_report).toBe('Pencils are erasable.');
  });

  it('expandThreadContext injects persisted research before assistant message', () => {
    const metadata = buildAssistantMetadata(['research'], {
      query: 'pencil vs pen',
      report: 'Detailed findings about pencils and pens.',
    });
    const expanded = expandThreadContext([
      makeMsg('user', 'Research pencil vs pen'),
      makeMsg('assistant', 'Pencils win for sketching.', metadata),
    ]);
    expect(expanded).toHaveLength(3);
    expect(expanded[0].role).toBe('user');
    expect(expanded[0].content).toBe('Research pencil vs pen');
    expect(expanded[1].role).toBe('user');
    expect(expanded[1].content).toContain('[Tool Result for research]:');
    expect(expanded[1].content).toContain('Detailed findings');
    expect(expanded[2].role).toBe('assistant');
    expect(expanded[2].content).toBe('Pencils win for sketching.');
  });

  it('parseConversationMetadata returns empty object for invalid JSON', () => {
    expect(parseConversationMetadata('not-json')).toEqual({});
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// isOutlookReadOnlyBrowserTask
// ─────────────────────────────────────────────────────────────────────────────

describe('isOutlookReadOnlyBrowserTask', () => {
  // Real production task text (2026-07-12) that was wrongly diverted to
  // Browser Use: "sender" tripped the old `send\w*` pattern.
  it('accepts a plain inbox-read task that mentions "sender"', () => {
    expect(isOutlookReadOnlyBrowserTask(
      'Outlook',
      'Go to Outlook.com, log in using the saved credentials, navigate to the inbox, and extract the latest 5 emails with their sender, subject, date, and a brief summary of the content.',
    )).toBe(true);
  });

  it('accepts an inbox read with the vault credential suffix appended', () => {
    expect(isOutlookReadOnlyBrowserTask(
      'Outlook',
      'Check the Outlook inbox and list the latest emails.\n\nWhen prompted to log in, use username {username} and password {password}.',
    )).toBe(true);
  });

  it('does not treat "marketing" as the action verb "mark"', () => {
    expect(isOutlookReadOnlyBrowserTask(
      'Outlook',
      'Open the Outlook inbox and show the latest email from the marketing team.',
    )).toBe(true);
  });

  it('rejects tasks with real action verbs (send, reply, delete)', () => {
    expect(isOutlookReadOnlyBrowserTask('Outlook', 'Log into Outlook and send an email to Bob.')).toBe(false);
    expect(isOutlookReadOnlyBrowserTask('Outlook', 'Reply to the latest email in my Outlook inbox.')).toBe(false);
    expect(isOutlookReadOnlyBrowserTask('Outlook', 'Delete the newsletter emails in Outlook.')).toBe(false);
  });

  // Real production task text (2026-07-11): Sent Items + search/find must fall
  // through to Browser Use — the scraper can only read the inbox.
  it('rejects a Sent Items search task', () => {
    expect(isOutlookReadOnlyBrowserTask(
      'Outlook',
      'Go to Outlook.com, log in using the saved credentials, navigate to the Sent Items folder, sort or search to find emails sent to any recipient with "marketing" in their name or email address, identify the most recent one by date.',
    )).toBe(false);
  });

  it('rejects non-Outlook sites regardless of task text', () => {
    expect(isOutlookReadOnlyBrowserTask('Gmail', 'Check the inbox and list the latest emails.')).toBe(false);
    expect(isOutlookReadOnlyBrowserTask('', 'Check the inbox.')).toBe(false);
  });

  it('accepts Microsoft/Office 365 site-name variants', () => {
    expect(isOutlookReadOnlyBrowserTask('Microsoft 365', 'Check the inbox.')).toBe(true);
    expect(isOutlookReadOnlyBrowserTask('office365', 'Check the inbox.')).toBe(true);
  });

  it('accepts an email-labelled vault entry when the task names Outlook', () => {
    expect(isOutlookReadOnlyBrowserTask(
      'ajyoti@ncpamumbai.com',
      'Check Outlook and list the latest emails.',
    )).toBe(true);
  });

  it('accepts an Outlook summary request as read-only', () => {
    expect(isOutlookReadOnlyBrowserTask(
      'Outlook',
      'Check my Outlook and list a 3 line summary of the latest 3 mails.',
    )).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// isOutlookCalendarBrowserTask
// ─────────────────────────────────────────────────────────────────────────────

describe('isOutlookCalendarBrowserTask', () => {
  it('routes a meetings question to the calendar target', () => {
    expect(isOutlookCalendarBrowserTask(
      'Outlook',
      'Do I have any meetings in my Outlook calendar today?',
    )).toBe(true);
  });

  it('routes appointment/event phrasing to the calendar target', () => {
    expect(isOutlookCalendarBrowserTask('Outlook', 'Check my Outlook calendar for today\'s appointments.')).toBe(true);
    expect(isOutlookCalendarBrowserTask('Outlook', 'What events are on my Outlook calendar?')).toBe(true);
  });

  it('keeps plain inbox reads on the inbox target', () => {
    expect(isOutlookCalendarBrowserTask('Outlook', 'List my latest 5 Outlook emails.')).toBe(false);
  });

  it('rejects scheduling actions (not read-only)', () => {
    expect(isOutlookCalendarBrowserTask('Outlook', 'Schedule a meeting with Bob tomorrow at 10.')).toBe(false);
  });

  it('rejects non-Outlook calendars', () => {
    expect(isOutlookCalendarBrowserTask('', 'Do I have meetings on my Google calendar today?')).toBe(false);
  });
});

describe('requestedOutlookEmailCount', () => {
  it('reads numeric and worded limits in either common order', () => {
    expect(requestedOutlookEmailCount('List the latest 5 Outlook emails')).toBe(5);
    expect(requestedOutlookEmailCount('Show my three recent mails')).toBe(3);
    expect(requestedOutlookEmailCount('Get 7 latest messages from Outlook')).toBe(7);
  });

  it('defaults to ten and clamps oversized requests', () => {
    expect(requestedOutlookEmailCount('Check my latest Outlook emails')).toBe(10);
    expect(requestedOutlookEmailCount('List the latest 25 Outlook emails')).toBe(10);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// executeToolWithLogging — approval gates disabled + idempotency soft-fails
// ─────────────────────────────────────────────────────────────────────────────
// Approval gates (Approve / Send now cards) are currently OFF so gmail_send
// and other irreversible tools execute immediately. Soft-fail / HELD rows from
// older builds must still never poison the idempotency cache.
describe('executeToolWithLogging — approval gates disabled', () => {
  function makeFakeDb() {
    const toolExecLog: any[] = [];
    const pendingActions: any[] = [];
    const db: any = {
      prepare(sql: string) {
        if (sql.includes('SELECT tool_result FROM tool_execution_log')) {
          return {
            bind: (userId: number, toolName: string, idempotencyKey: string) => ({
              first: async () => {
                const hit = toolExecLog.find(
                  (r) => r.user_id === userId && r.tool_name === toolName &&
                    r.idempotency_key === idempotencyKey && r.success === 1
                );
                return hit ? { tool_result: hit.tool_result } : null;
              },
            }),
          };
        }
        if (sql.includes('SELECT id FROM pending_actions')) {
          return {
            bind: (userId: number, toolName: string, argsJson: string) => ({
              first: async () => {
                const hit = pendingActions.find(
                  (args) => args[1] === userId && args[3] === toolName && args[4] === argsJson
                );
                return hit ? { id: hit[0] } : null;
              },
            }),
          };
        }
        if (sql.includes('INSERT INTO pending_actions')) {
          return { bind: (...args: any[]) => ({ run: async () => { pendingActions.push(args); return { success: true }; } }) };
        }
        if (sql.includes('INSERT INTO tool_execution_log')) {
          return {
            bind: (...args: any[]) => ({
              run: async () => {
                const [user_id, , , tool_name, , tool_result, success] = args;
                toolExecLog.push({ user_id, tool_name, tool_result, success, idempotency_key: args[args.length - 1] });
                return { success: true };
              },
            }),
          };
        }
        return { bind: () => ({ run: async () => ({ success: true }), first: async () => null, all: async () => ({ results: [] }) }) };
      },
    };
    return { db, toolExecLog, pendingActions };
  }

  const emailArgs = { to: 'someone@example.com', subject: 'Hi', body: 'Hello there' };

  it('does not hold gmail_send for approval when gates are disabled', async () => {
    const { db, pendingActions } = makeFakeDb();
    const result = await executeToolWithLogging(
      'gmail_send', emailArgs, db, 1, { agentType: 'full', channel: 'web', threadId: 42 }
    );
    expect(result).not.toMatch(/^HELD FOR APPROVAL/);
    expect(pendingActions).toHaveLength(0);
  });

  it('isIrreversibleTool returns false while gates are off', async () => {
    const { isIrreversibleTool, APPROVAL_GATES_ENABLED } = await import('../toolTiers');
    expect(APPROVAL_GATES_ENABLED).toBe(false);
    expect(isIrreversibleTool('gmail_send')).toBe(false);
    expect(isIrreversibleTool('delete_memory')).toBe(false);
  });

  it('ignores poisoned success=1 HELD rows left by older builds', async () => {
    const { db, toolExecLog } = makeFakeDb();
    const idempotencyKey = `1:gmail_send:${JSON.stringify(emailArgs)}`;
    toolExecLog.push({
      user_id: 1,
      tool_name: 'gmail_send',
      tool_result: 'HELD FOR APPROVAL [old]: waiting for approval',
      success: 1,
      idempotency_key: idempotencyKey,
    });

    const result = await executeToolWithLogging(
      'gmail_send', emailArgs, db, 1, { agentType: 'full', channel: 'web', threadId: 42 }
    );
    expect(result).not.toMatch(/^HELD FOR APPROVAL/);
    expect(result).not.toBe(toolExecLog[0].tool_result);
  });

  it('ignores poisoned success=1 soft-fail rows (Google disconnected)', async () => {
    const { db, toolExecLog } = makeFakeDb();
    const idempotencyKey = `1:gmail_send:${JSON.stringify(emailArgs)}`;
    toolExecLog.push({
      user_id: 1,
      tool_name: 'gmail_send',
      tool_result: 'Google account not connected. Please go to Settings → Keys → Google Workspace and connect your account.',
      success: 1,
      idempotency_key: idempotencyKey,
    });

    const result = await executeToolWithLogging(
      'gmail_send', emailArgs, db, 1, { agentType: 'full', channel: 'web', threadId: 42 }
    );
    // Must not replay the soft-fail from cache — should attempt real execution.
    expect(result).not.toBe(toolExecLog[0].tool_result);
  });
});

describe('approvalGate helpers', () => {
  it('detects non-executable cached results', async () => {
    const { isNonExecutableToolResult, looksLikeApprovalConfirmation } = await import('../approvalGate');
    expect(isNonExecutableToolResult('HELD FOR APPROVAL [x]: nope')).toBe(true);
    expect(isNonExecutableToolResult('POLICY BLOCKED (write): needs execute')).toBe(true);
    expect(isNonExecutableToolResult('Email sent successfully to a@b.com')).toBe(false);
    expect(looksLikeApprovalConfirmation('yes')).toBe(true);
    expect(looksLikeApprovalConfirmation('Send it')).toBe(true);
    expect(looksLikeApprovalConfirmation('please rewrite the email body')).toBe(false);
  });

  it('only treats real send success as a completed side effect', async () => {
    const {
      isSuccessfulSideEffectResult,
      isFailedSideEffectResult,
    } = await import('../approvalGate');
    expect(isSuccessfulSideEffectResult('gmail_send', 'Email sent successfully to a@b.com. Subject: "Hi"')).toBe(true);
    expect(isSuccessfulSideEffectResult('gmail_send', 'Google account not connected. Please reconnect.')).toBe(false);
    expect(isSuccessfulSideEffectResult('gmail_send', 'HELD FOR APPROVAL [x]: waiting')).toBe(false);
    expect(isSuccessfulSideEffectResult('gmail_draft', 'Draft created. To: a@b.com')).toBe(true);
    expect(isFailedSideEffectResult('Google account not connected. Please reconnect.')).toBe(true);
    expect(isFailedSideEffectResult('Email sent successfully to a@b.com')).toBe(false);
  });
});
