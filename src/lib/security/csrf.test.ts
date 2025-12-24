/**
 * CSRF Protection Unit Tests
 * Tests CSRF token generation, validation, and middleware
 */

import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import {
  generateCsrfToken,
  validateCsrfToken,
  getCsrfTokenFromCookie,
  getCsrfTokenFromHeader,
  validateCsrfMiddleware,
} from './csrf';

// Helper to create mock NextRequest
function createMockRequest(
  method: string,
  options: {
    cookieToken?: string;
    headerToken?: string;
  } = {}
): NextRequest {
  const url = 'https://example.com/api/test';
  const headers = new Headers();

  if (options.headerToken) {
    headers.set('x-csrf-token', options.headerToken);
  }

  const req = new NextRequest(url, {
    method,
    headers,
  });

  // Mock cookies
  if (options.cookieToken) {
    Object.defineProperty(req, 'cookies', {
      value: {
        get: (name: string) => {
          if (name === 'csrf_token' && options.cookieToken) {
            return { value: options.cookieToken };
          }
          return undefined;
        },
      },
    });
  } else {
    Object.defineProperty(req, 'cookies', {
      value: {
        get: () => undefined,
      },
    });
  }

  return req;
}

describe('CSRF Protection', () => {
  describe('generateCsrfToken', () => {
    it('should generate a token of sufficient length', () => {
      const token = generateCsrfToken();
      // base64url encoded 32 bytes = ~43 characters
      expect(token.length).toBeGreaterThanOrEqual(32);
    });

    it('should generate unique tokens', () => {
      const tokens = new Set<string>();
      for (let i = 0; i < 100; i++) {
        tokens.add(generateCsrfToken());
      }
      expect(tokens.size).toBe(100);
    });

    it('should generate URL-safe tokens (base64url)', () => {
      const token = generateCsrfToken();
      // base64url should not contain +, /, or =
      expect(token).not.toMatch(/[+/=]/);
    });
  });

  describe('validateCsrfToken', () => {
    it('should accept valid token', () => {
      const token = generateCsrfToken();
      expect(validateCsrfToken(token)).toBe(true);
    });

    it('should reject null token', () => {
      expect(validateCsrfToken(null as unknown as string)).toBe(false);
    });

    it('should reject undefined token', () => {
      expect(validateCsrfToken(undefined as unknown as string)).toBe(false);
    });

    it('should reject empty string', () => {
      expect(validateCsrfToken('')).toBe(false);
    });

    it('should reject short tokens', () => {
      expect(validateCsrfToken('short')).toBe(false);
      expect(validateCsrfToken('0123456789012345')).toBe(false); // 16 chars
      expect(validateCsrfToken('01234567890123456789012345678901')).toBe(true); // 32 chars
    });

    it('should reject non-string values', () => {
      expect(validateCsrfToken(123 as unknown as string)).toBe(false);
      expect(validateCsrfToken({} as unknown as string)).toBe(false);
      expect(validateCsrfToken([] as unknown as string)).toBe(false);
    });
  });

  describe('getCsrfTokenFromCookie', () => {
    it('should return token from cookie', () => {
      const token = generateCsrfToken();
      const req = createMockRequest('POST', { cookieToken: token });
      expect(getCsrfTokenFromCookie(req)).toBe(token);
    });

    it('should return null when cookie is missing', () => {
      const req = createMockRequest('POST', {});
      expect(getCsrfTokenFromCookie(req)).toBe(null);
    });
  });

  describe('getCsrfTokenFromHeader', () => {
    it('should return token from header', () => {
      const token = generateCsrfToken();
      const req = createMockRequest('POST', { headerToken: token });
      expect(getCsrfTokenFromHeader(req)).toBe(token);
    });

    it('should return null when header is missing', () => {
      const req = createMockRequest('POST', {});
      expect(getCsrfTokenFromHeader(req)).toBe(null);
    });
  });

  describe('validateCsrfMiddleware', () => {
    it('should pass for GET requests', () => {
      const req = createMockRequest('GET', {});
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(true);
    });

    it('should pass for HEAD requests', () => {
      const req = createMockRequest('HEAD', {});
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(true);
    });

    it('should pass for OPTIONS requests', () => {
      const req = createMockRequest('OPTIONS', {});
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(true);
    });

    it('should fail POST without cookie token', () => {
      const token = generateCsrfToken();
      const req = createMockRequest('POST', { headerToken: token });
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('cookie');
    });

    it('should fail POST without header token', () => {
      const token = generateCsrfToken();
      const req = createMockRequest('POST', { cookieToken: token });
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('header');
    });

    it('should fail POST when tokens do not match', () => {
      const cookieToken = generateCsrfToken();
      const headerToken = generateCsrfToken();
      const req = createMockRequest('POST', {
        cookieToken,
        headerToken,
      });
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('do not match');
    });

    it('should pass POST when tokens match', () => {
      const token = generateCsrfToken();
      const req = createMockRequest('POST', {
        cookieToken: token,
        headerToken: token,
      });
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(true);
    });

    it('should fail POST with invalid token format', () => {
      const shortToken = 'tooshort';
      const req = createMockRequest('POST', {
        cookieToken: shortToken,
        headerToken: shortToken,
      });
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid');
    });

    it('should fail PUT without valid tokens', () => {
      const req = createMockRequest('PUT', {});
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(false);
    });

    it('should fail DELETE without valid tokens', () => {
      const req = createMockRequest('DELETE', {});
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(false);
    });

    it('should fail PATCH without valid tokens', () => {
      const req = createMockRequest('PATCH', {});
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(false);
    });

    it('should pass PUT with valid matching tokens', () => {
      const token = generateCsrfToken();
      const req = createMockRequest('PUT', {
        cookieToken: token,
        headerToken: token,
      });
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(true);
    });

    it('should handle case-insensitive method check', () => {
      const req = createMockRequest('get', {}); // lowercase
      const result = validateCsrfMiddleware(req);
      expect(result.valid).toBe(true);
    });
  });
});
