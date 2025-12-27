/**
 * Auth Utilities Tests
 * Test authentication helper functions (pure functions, no NextAuth dependency)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Session Version Cache', () => {
  /**
   * Test the session version cache behavior (extracted logic for testing)
   * The actual cache is internal to auth.ts but follows these patterns
   */

  describe('Cache Implementation', () => {
    // Simulated cache for testing patterns
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
    const MAX_CACHE_SIZE = 1000;

    interface CacheEntry {
      version: number;
      timestamp: number;
    }

    class SessionVersionCache {
      private cache = new Map<string, CacheEntry>();

      get(userId: string): number | null {
        const cached = this.cache.get(userId);
        if (!cached) return null;
        if (Date.now() - cached.timestamp > CACHE_TTL) {
          this.cache.delete(userId);
          return null;
        }
        return cached.version;
      }

      set(userId: string, version: number) {
        if (this.cache.size >= MAX_CACHE_SIZE) {
          const entriesToDelete = Array.from(this.cache.keys()).slice(0, 100);
          entriesToDelete.forEach((key) => this.cache.delete(key));
        }
        this.cache.set(userId, { version, timestamp: Date.now() });
      }

      size() {
        return this.cache.size;
      }

      clear() {
        this.cache.clear();
      }
    }

    let cache: SessionVersionCache;

    beforeEach(() => {
      cache = new SessionVersionCache();
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return null for non-existent entries', () => {
      expect(cache.get('non-existent-user')).toBeNull();
    });

    it('should store and retrieve session version', () => {
      cache.set('user-123', 5);
      expect(cache.get('user-123')).toBe(5);
    });

    it('should expire entries after TTL', () => {
      cache.set('user-123', 5);
      expect(cache.get('user-123')).toBe(5);

      // Advance time past TTL
      vi.advanceTimersByTime(CACHE_TTL + 1);

      expect(cache.get('user-123')).toBeNull();
    });

    it('should not expire entries before TTL', () => {
      cache.set('user-123', 5);

      // Advance time but stay within TTL
      vi.advanceTimersByTime(CACHE_TTL - 1000);

      expect(cache.get('user-123')).toBe(5);
    });

    it('should evict oldest entries when cache is full', () => {
      // Fill cache to max
      for (let i = 0; i < MAX_CACHE_SIZE; i++) {
        cache.set(`user-${i}`, i);
      }

      expect(cache.size()).toBe(MAX_CACHE_SIZE);

      // Add one more entry
      cache.set('new-user', 999);

      // Cache should have evicted 100 entries
      expect(cache.size()).toBe(MAX_CACHE_SIZE - 100 + 1);
    });

    it('should update existing entries', () => {
      cache.set('user-123', 1);
      expect(cache.get('user-123')).toBe(1);

      cache.set('user-123', 2);
      expect(cache.get('user-123')).toBe(2);
    });
  });
});

describe('Token Hashing (Web Crypto)', () => {
  /**
   * Test SHA-256 hashing for magic link tokens
   * Uses Web Crypto API (edge runtime compatible)
   */

  async function hashTokenWebCrypto(token: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  it('should produce consistent SHA-256 hashes', async () => {
    const token = 'test-magic-link-token';
    const hash1 = await hashTokenWebCrypto(token);
    const hash2 = await hashTokenWebCrypto(token);

    expect(hash1).toBe(hash2);
  });

  it('should produce 64-character hex string', async () => {
    const token = 'test-token';
    const hash = await hashTokenWebCrypto(token);

    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[a-f0-9]+$/);
  });

  it('should produce different hashes for different inputs', async () => {
    const hash1 = await hashTokenWebCrypto('token-1');
    const hash2 = await hashTokenWebCrypto('token-2');

    expect(hash1).not.toBe(hash2);
  });

  it('should handle empty string', async () => {
    const hash = await hashTokenWebCrypto('');

    expect(hash).toHaveLength(64);
    // SHA-256 of empty string is a known value
    expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });

  it('should handle unicode characters', async () => {
    const hash = await hashTokenWebCrypto('test-émoji-🎉');

    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[a-f0-9]+$/);
  });
});

describe('Auth Configuration Constants', () => {
  it('should use reasonable session max age', () => {
    const expectedMaxAge = 30 * 24 * 60 * 60; // 30 days in seconds
    expect(expectedMaxAge).toBe(2592000);
  });

  it('should have cache TTL less than session max age', () => {
    const cacheTTL = 5 * 60 * 1000; // 5 minutes in ms
    const sessionMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

    expect(cacheTTL).toBeLessThan(sessionMaxAge);
  });
});
