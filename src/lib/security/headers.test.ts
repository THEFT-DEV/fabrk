/**
 * Security Headers Unit Tests
 * Tests for CSP generation and security headers
 */

import { describe, it, expect } from 'vitest';
import { generateCSP, securityHeaders, isAllowedOrigin, generateNonce } from './headers';

describe('generateCSP', () => {
  it('should generate valid CSP string', () => {
    const csp = generateCSP();

    expect(csp).toContain('default-src');
    expect(csp).toContain('script-src');
    expect(csp).toContain('style-src');
    expect(csp).toContain('img-src');
    expect(csp).toContain('font-src');
    expect(csp).toContain('connect-src');
  });

  it('should include self directive for default-src', () => {
    const csp = generateCSP();

    expect(csp).toContain("default-src 'self'");
  });

  it('should include unsafe-eval in development mode', () => {
    const csp = generateCSP({ isDevelopment: true });

    expect(csp).toContain("'unsafe-eval'");
  });

  it('should not include unsafe-eval in production mode', () => {
    const csp = generateCSP({ isDevelopment: false });

    expect(csp).not.toContain("'unsafe-eval'");
  });

  it('should include nonce when provided', () => {
    const nonce = 'abc123';
    const csp = generateCSP({ nonce });

    expect(csp).toContain(`'nonce-${nonce}'`);
  });

  it('should use unsafe-inline when no nonce provided', () => {
    const csp = generateCSP();

    expect(csp).toContain("'unsafe-inline'");
  });

  it('should include WebSocket for development HMR', () => {
    const csp = generateCSP({ isDevelopment: true });

    expect(csp).toContain('ws:');
    expect(csp).toContain('wss:');
  });

  it('should not include WebSocket in production', () => {
    const csp = generateCSP({ isDevelopment: false });

    expect(csp).not.toContain('ws:');
    expect(csp).not.toContain('wss:');
  });

  it('should include upgrade-insecure-requests in production', () => {
    const csp = generateCSP({ isDevelopment: false });

    expect(csp).toContain('upgrade-insecure-requests');
  });

  it('should include Stripe domains', () => {
    const csp = generateCSP();

    expect(csp).toContain('https://api.stripe.com');
    expect(csp).toContain('https://js.stripe.com');
  });

  it('should include Google Analytics domains', () => {
    const csp = generateCSP();

    expect(csp).toContain('https://www.google-analytics.com');
    expect(csp).toContain('https://www.googletagmanager.com');
  });

  it('should prevent clickjacking with frame-ancestors', () => {
    const csp = generateCSP();

    expect(csp).toContain("frame-ancestors 'none'");
  });

  it('should disable object-src for security', () => {
    const csp = generateCSP();

    expect(csp).toContain("object-src 'none'");
  });
});

describe('securityHeaders', () => {
  it('should return array of header objects', () => {
    const headers = securityHeaders();

    expect(Array.isArray(headers)).toBe(true);
    expect(headers.length).toBeGreaterThan(0);

    headers.forEach((header) => {
      expect(header).toHaveProperty('key');
      expect(header).toHaveProperty('value');
    });
  });

  it('should include X-Frame-Options', () => {
    const headers = securityHeaders();
    const xFrameOptions = headers.find((h) => h.key === 'X-Frame-Options');

    expect(xFrameOptions).toBeDefined();
    expect(xFrameOptions?.value).toBe('DENY');
  });

  it('should include X-Content-Type-Options', () => {
    const headers = securityHeaders();
    const xContentType = headers.find((h) => h.key === 'X-Content-Type-Options');

    expect(xContentType).toBeDefined();
    expect(xContentType?.value).toBe('nosniff');
  });

  it('should include Strict-Transport-Security', () => {
    const headers = securityHeaders();
    const hsts = headers.find((h) => h.key === 'Strict-Transport-Security');

    expect(hsts).toBeDefined();
    expect(hsts?.value).toContain('max-age=');
    expect(hsts?.value).toContain('includeSubDomains');
    expect(hsts?.value).toContain('preload');
  });

  it('should include Referrer-Policy', () => {
    const headers = securityHeaders();
    const referrerPolicy = headers.find((h) => h.key === 'Referrer-Policy');

    expect(referrerPolicy).toBeDefined();
    expect(referrerPolicy?.value).toBe('strict-origin-when-cross-origin');
  });

  it('should include Permissions-Policy', () => {
    const headers = securityHeaders();
    const permissionsPolicy = headers.find((h) => h.key === 'Permissions-Policy');

    expect(permissionsPolicy).toBeDefined();
    expect(permissionsPolicy?.value).toContain('camera=()');
    expect(permissionsPolicy?.value).toContain('microphone=()');
    expect(permissionsPolicy?.value).toContain('geolocation=()');
  });

  it('should disable FLoC', () => {
    const headers = securityHeaders();
    const permissionsPolicy = headers.find((h) => h.key === 'Permissions-Policy');

    expect(permissionsPolicy?.value).toContain('interest-cohort=()');
  });

  it('should include CSP header', () => {
    const headers = securityHeaders();
    const csp = headers.find((h) => h.key === 'Content-Security-Policy');

    expect(csp).toBeDefined();
    expect(csp?.value).toContain('default-src');
  });

  it('should include X-XSS-Protection for legacy browsers', () => {
    const headers = securityHeaders();
    const xssProtection = headers.find((h) => h.key === 'X-XSS-Protection');

    expect(xssProtection).toBeDefined();
    expect(xssProtection?.value).toBe('1; mode=block');
  });

  it('should include X-Permitted-Cross-Domain-Policies', () => {
    const headers = securityHeaders();
    const crossDomain = headers.find((h) => h.key === 'X-Permitted-Cross-Domain-Policies');

    expect(crossDomain).toBeDefined();
    expect(crossDomain?.value).toBe('none');
  });
});

describe('isAllowedOrigin', () => {
  it('should return true for allowed origin', () => {
    const allowedOrigins = ['https://example.com', 'https://test.com'];

    expect(isAllowedOrigin('https://example.com', allowedOrigins)).toBe(true);
    expect(isAllowedOrigin('https://test.com', allowedOrigins)).toBe(true);
  });

  it('should return false for disallowed origin', () => {
    const allowedOrigins = ['https://example.com'];

    expect(isAllowedOrigin('https://malicious.com', allowedOrigins)).toBe(false);
  });

  it('should handle wildcard origin', () => {
    const allowedOrigins = ['*'];

    expect(isAllowedOrigin('https://any-domain.com', allowedOrigins)).toBe(true);
    expect(isAllowedOrigin('https://malicious.com', allowedOrigins)).toBe(true);
  });

  it('should be case-sensitive', () => {
    const allowedOrigins = ['https://example.com'];

    expect(isAllowedOrigin('https://EXAMPLE.COM', allowedOrigins)).toBe(false);
  });

  it('should handle empty allowed origins', () => {
    expect(isAllowedOrigin('https://example.com', [])).toBe(false);
  });
});

describe('generateNonce', () => {
  it('should generate a base64 string', () => {
    const nonce = generateNonce();

    // Base64 pattern (may include + / = characters, but we use base64 encoding of UUID)
    expect(nonce).toMatch(/^[A-Za-z0-9+/=_-]+$/);
  });

  it('should generate unique nonces', () => {
    const nonces = new Set<string>();
    for (let i = 0; i < 100; i++) {
      nonces.add(generateNonce());
    }
    expect(nonces.size).toBe(100);
  });

  it('should generate non-empty string', () => {
    const nonce = generateNonce();

    expect(nonce).toBeTruthy();
    expect(nonce.length).toBeGreaterThan(0);
  });
});
