import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SingleFlight } from '../singleFlight';

describe('SingleFlight', () => {
  beforeEach(() => vi.useRealTimers());

  it('shares one active operation between duplicate requests', async () => {
    let finish!: (value: string) => void;
    const work = vi.fn(() => new Promise<string>((resolve) => { finish = resolve; }));
    const flights = new SingleFlight<string>(() => 0);

    const first = flights.run('outlook:1', work);
    const duplicate = flights.run('outlook:1', work);

    expect(work).toHaveBeenCalledTimes(1);
    expect(duplicate).toBe(first);
    finish('mail');
    await expect(Promise.all([first, duplicate])).resolves.toEqual(['mail', 'mail']);
  });

  it('does not combine different users or Outlook targets', async () => {
    const work = vi.fn(async () => 'done');
    const flights = new SingleFlight<string>(() => 0);

    await Promise.all([
      flights.run('1:inbox', work),
      flights.run('1:calendar', work),
      flights.run('2:inbox', work),
    ]);

    expect(work).toHaveBeenCalledTimes(3);
  });

  it('uses the result-specific cooldown and retries after it expires', async () => {
    vi.useFakeTimers();
    const work = vi.fn(async () => 'failed');
    const flights = new SingleFlight<string>(() => 60_000);

    await flights.run('1:inbox', work);
    await flights.run('1:inbox', work);
    expect(work).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(60_001);
    await flights.run('1:inbox', work);
    expect(work).toHaveBeenCalledTimes(2);
  });

  it('does not cache rejected work and permits a retry', async () => {
    const work = vi.fn()
      .mockRejectedValueOnce(new Error('crashed'))
      .mockResolvedValueOnce('recovered');
    const flights = new SingleFlight<string>(() => 60_000);

    await expect(flights.run('1:inbox', work)).rejects.toThrow('crashed');
    await expect(flights.run('1:inbox', work)).resolves.toBe('recovered');
    expect(work).toHaveBeenCalledTimes(2);
  });
});
