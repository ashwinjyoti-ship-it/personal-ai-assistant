// Pure-function Ebbinghaus-style decay calculator.
// No DB access, no side effects — easy to unit test in isolation.

export const HALF_LIFE_DAYS: Record<string, number> = {
  episodic: 30,
  semantic: 365,
  procedural: 180,
  summary: 90,
  fact: 365,
  preference: 180,
  decision: 365,
  context: 30,
  task: 60,
};

const DEFAULT_HALF_LIFE = 90;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Returns the number of days between `when` and `asOf` (default: now).
 * Never returns a negative value.
 */
export function daysSince(when: string | Date, asOf?: Date): number {
  const fromMs = typeof when === 'string' ? new Date(when).getTime() : when.getTime();
  const toMs = (asOf ?? new Date()).getTime();
  return Math.max(0, (toMs - fromMs) / MS_PER_DAY);
}

/**
 * Ebbinghaus-style decay score in [0, 1].
 *
 * Formula: e^(-days / half_life) * (importance / 10)
 *
 * - A freshly accessed memory with importance 10 scores 1.0.
 * - After one half-life with importance 10 it scores ~0.5.
 * - Importance acts as a permanent ceiling: importance 5 tops out at 0.5.
 */
export function decayScore(
  type: string,
  importance: number,
  lastAccessedAt: string | Date,
  asOf?: Date
): number {
  const halfLife = HALF_LIFE_DAYS[type] ?? DEFAULT_HALF_LIFE;
  const days = daysSince(lastAccessedAt, asOf);
  const raw = Math.exp(-days / halfLife) * (importance / 10);
  // Clamp to [0, 1] to handle edge cases (importance > 10 in legacy data)
  return Math.min(1, Math.max(0, raw));
}
