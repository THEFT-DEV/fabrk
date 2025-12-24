import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cache } from './cache';

describe('SimpleCache', () => {
  beforeEach(() => {
    cache.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should set and get a value', async () => {
    await cache.set('key1', 'value1', 60);
    const value = await cache.get('key1');
    expect(value).toBe('value1');
  });

  it('should return null for missing key', async () => {
    const value = await cache.get('missing');
    expect(value).toBeNull();
  });

  it('should expire values', async () => {
    await cache.set('key1', 'value1', 10); // 10 seconds TTL

    // Advance time by 5 seconds
    vi.advanceTimersByTime(5000);
    expect(await cache.get('key1')).toBe('value1');

    // Advance time by another 6 seconds (total 11s)
    vi.advanceTimersByTime(6000);
    expect(await cache.get('key1')).toBeNull();
  });

  it('should delete a value', async () => {
    await cache.set('key1', 'value1', 60);
    await cache.delete('key1');
    expect(await cache.get('key1')).toBeNull();
  });

  it('should clear all values', async () => {
    await cache.set('key1', 'value1', 60);
    await cache.set('key2', 'value2', 60);
    await cache.clear();
    expect(await cache.get('key1')).toBeNull();
    expect(await cache.get('key2')).toBeNull();
  });
});
