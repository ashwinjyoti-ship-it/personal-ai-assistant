// Digest formatting: one DigestContent -> text / inline keyboard / highlights.
//
// Every kind uses the same formatter; there are no per-kind text templates any
// more (the old code had three separate format*ForTelegram functions).

import type { DigestContent, DigestItem, DigestKind } from '../../types';

const KIND_EMOJI: Record<DigestKind, string> = {
  morning: '☀️',
  evening: '🗓',
  weekly: '📊',
  email: '📧',
};

const KIND_TITLE: Record<DigestKind, string> = {
  morning: 'Morning Briefing',
  evening: 'Evening Brief',
  weekly: 'Weekly Review',
  email: 'Email Digest',
};

function periodLabel(content: DigestContent): string {
  const start = new Date(content.period.start);
  const end = new Date(content.period.end);
  const startStr = start.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const endStr = end.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  if (startStr === endStr) return startStr;
  return `${startStr} – ${endStr}`;
}

/** Pretty HH:MM -> h:MM AM/PM, matching the old briefing header style. */
function prettyTime(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(':');
  const h = parseInt(hStr, 10);
  const m = mStr || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m} ${ampm}`;
}

export interface FormatOptions {
  kind: DigestKind;
  scheduleTime: string;
}

/** Format the full digest text for notifications (Ntfy / Telegram body). */
export function formatDigestText(content: DigestContent, opts: FormatOptions): string {
  const lines: string[] = [];
  lines.push(
    `${KIND_EMOJI[opts.kind]} ${KIND_TITLE[opts.kind]} — ${prettyTime(opts.scheduleTime)} · ${periodLabel(content)}`,
  );
  lines.push('');

  if (content.highlights.length > 0) {
    for (const h of content.highlights) lines.push(`▸ ${h}`);
    lines.push('');
  }

  for (const section of content.sections) {
    lines.push(`${section.title}: ${section.summary}`);
    for (const item of section.items.slice(0, 5)) {
      lines.push(`   • ${item.text.substring(0, 90)}${item.text.length > 90 ? '…' : ''}`);
    }
    lines.push('');
  }

  return lines.join('\n').trimEnd();
}

/** Format the short preview used as the notification title/subtitle. */
export function formatDigestPreview(content: DigestContent, opts: FormatOptions): string {
  const base = `${KIND_EMOJI[opts.kind]} ${KIND_TITLE[opts.kind]} · ${periodLabel(content)}`;
  if (content.highlights.length > 0) {
    return `${base} — ${content.highlights[0]}`;
  }
  return base;
}

/** Build the Telegram inline keyboard from digest items (one button per item). */
export function buildDigestKeyboard(
  items: DigestItem[],
  digestId: number,
): Array<Array<{ text: string; callback_data: string }>> {
  const keyboard: Array<Array<{ text: string; callback_data: string }>> = [];
  for (const item of items.slice(0, 10)) {
    keyboard.push([
      {
        text: `☐ ${item.text.substring(0, 40)}${item.text.length > 40 ? '...' : ''}`,
        callback_data: `digest_toggle:${item.key}:${digestId}`,
      },
    ]);
  }
  return keyboard;
}
