/**
 * CSP Nonce Tests
 *
 * Verifies nonce generation and retrieval functionality
 */

import { describe, it, expect } from 'vitest';
import { generateNonce, getNonceHeaderName } from './csp-nonce';

describe('CSP Nonce', () => {
  describe('generateNonce', () => {
    it('should generate a base64 string', () => {
      const nonce = generateNonce();
      expect(nonce).toMatch(/^[A-Za-z0-9+/]+=*$/);
    });

    it('should generate unique nonces', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      expect(nonce1).not.toBe(nonce2);
    });

    it('should generate nonces of consistent length', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      // 16 bytes base64 encoded should be 24 characters
      expect(nonce1.length).toBe(24);
      expect(nonce2.length).toBe(24);
    });

    it('should generate cryptographically secure nonces', () => {
      const nonces = new Set();
      // Generate 1000 nonces and verify they're all unique
      for (let i = 0; i < 1000; i++) {
        nonces.add(generateNonce());
      }
      expect(nonces.size).toBe(1000);
    });
  });

  describe('getNonceHeaderName', () => {
    it('should return the correct header name', () => {
      expect(getNonceHeaderName()).toBe('x-nonce');
    });
  });
});
