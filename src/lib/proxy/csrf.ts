/**
 * Edge CSRF Token Management
 *
 * Generates CSRF tokens using the Web Crypto API (edge-compatible).
 * The full CSRF validation logic lives in src/lib/security/csrf.ts;
 * this module only handles token generation and cookie presence checks.
 */

const CSRF_COOKIE_NAME = 'csrf_token';
const TOKEN_BYTE_LENGTH = 32;
const MIN_TOKEN_LENGTH = 32;

export { CSRF_COOKIE_NAME };

/**
 * Generate a URL-safe base64 CSRF token using Web Crypto API.
 */
export function generateEdgeCsrfToken(): string {
  const bytes = new Uint8Array(TOKEN_BYTE_LENGTH);
  crypto.getRandomValues(bytes);
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Check if an existing CSRF cookie value is present and reasonably valid.
 */
export function hasCsrfCookie(token: string | undefined): boolean {
  return !!token && token.length >= MIN_TOKEN_LENGTH;
}
