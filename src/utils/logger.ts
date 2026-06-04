/**
 * Minimal structured logger.
 *
 * Emits one JSON object per line (a.k.a. "structured" / JSONL logging) so that
 * log aggregators (Cloudflare Logpush, Render logs, Datadog, etc.) can parse,
 * filter and index fields instead of scraping free-form strings.
 *
 * Each entry has the shape:
 *   { "timestamp": "<ISO-8601>", "level": "info", "message": "...", ...context }
 *
 * Usage:
 *   import { logInfo, logError } from '../utils/logger';
 *   logInfo('tool executed', { tool: 'gmail_send', userId: 7, latencyMs: 120 });
 *   logError('tool failed', { tool: 'gmail_send', error: String(err) });
 *
 * Adoption is intentionally gradual — existing `console.*` calls keep working,
 * and modules can migrate to these helpers over time.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogContext = Record<string, unknown>;

/**
 * Serialize a log entry to a single JSON line. Falls back to a safe payload if
 * the context contains a circular reference or otherwise can't be stringified,
 * so logging can never throw and break the calling code path.
 */
function formatEntry(level: LogLevel, message: string, context?: LogContext): string {
  const entry: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };
  if (context && Object.keys(context).length > 0) {
    Object.assign(entry, context);
  }
  try {
    return JSON.stringify(entry);
  } catch {
    return JSON.stringify({
      timestamp: entry.timestamp,
      level,
      message,
      context: '[unserializable context]',
    });
  }
}

function emit(level: LogLevel, message: string, context?: LogContext): void {
  const line = formatEntry(level, message, context);
  // Route to the matching console method so log levels are preserved by the
  // host runtime (Workers / Node / Render all map these to stdout/stderr).
  switch (level) {
    case 'error':
      console.error(line);
      break;
    case 'warn':
      console.warn(line);
      break;
    case 'debug':
      // console.debug is widely supported; fall back handled by the runtime.
      console.debug(line);
      break;
    default:
      console.log(line);
  }
}

export function logDebug(message: string, context?: LogContext): void {
  emit('debug', message, context);
}

export function logInfo(message: string, context?: LogContext): void {
  emit('info', message, context);
}

export function logWarn(message: string, context?: LogContext): void {
  emit('warn', message, context);
}

export function logError(message: string, context?: LogContext): void {
  emit('error', message, context);
}
