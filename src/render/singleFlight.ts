/**
 * Coalesce duplicate, expensive work in one Node process and briefly cache
 * its result. Render only has enough memory for one OWA Chromium; making a
 * second request queue behind the first wastes the caller's timeout and can
 * immediately relaunch Chromium after a failed run, before the instance has
 * recovered its memory.
 */
export class SingleFlight<T> {
  private readonly running = new Map<string, Promise<T>>();
  private readonly recent = new Map<string, { value: T; expiresAt: number }>();

  constructor(private readonly ttlFor: (value: T) => number) {}

  run(key: string, work: () => Promise<T>): Promise<T> {
    const cached = this.recent.get(key);
    if (cached) {
      if (cached.expiresAt > Date.now()) return Promise.resolve(cached.value);
      this.recent.delete(key);
    }

    const existing = this.running.get(key);
    if (existing) return existing;

    const promise = work().then((value) => {
      const ttlMs = this.ttlFor(value);
      if (ttlMs > 0) this.recent.set(key, { value, expiresAt: Date.now() + ttlMs });
      return value;
    }).finally(() => {
      // Do not delete a newer run if test/reset or future invalidation logic
      // replaced this key while the old promise was settling.
      if (this.running.get(key) === promise) this.running.delete(key);
    });

    this.running.set(key, promise);
    return promise;
  }

  clear(): void {
    this.running.clear();
    this.recent.clear();
  }
}
