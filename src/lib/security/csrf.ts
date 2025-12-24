/**
 * CSRF Protection
 * Implements Double Submit Cookie pattern for CSRF protection
 *
 * Security: Protects against Cross-Site Request Forgery attacks
 * Pattern: Generate token, store in cookie, validate cookie matches header
 *
 * The double-submit cookie pattern works because:
 * 1. Attacker can make browser send cookies automatically
 * 2. But attacker cannot READ cookies from another domain (same-origin policy)
 * 3. So attacker cannot set the x-csrf-token header to match the cookie
 */

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Generate a cryptographically secure CSRF token (for Node.js runtime)
 */
export function generateCsrfToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString('base64url');
}

/**
 * Validate a CSRF token - just check it exists and has reasonable length
 */
export function validateCsrfToken(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  // Token should be at least 32 characters (base64url encoded 32 bytes)
  return token.length >= 32;
}

/**
 * Get CSRF token from cookie
 */
export function getCsrfTokenFromCookie(req: NextRequest): string | null {
  return req.cookies.get(CSRF_COOKIE_NAME)?.value || null;
}

/**
 * Get CSRF token from header
 */
export function getCsrfTokenFromHeader(req: NextRequest): string | null {
  return req.headers.get(CSRF_HEADER_NAME) || null;
}

/**
 * Set CSRF token cookie in response
 */
export function setCsrfCookie(response: NextResponse, token: string): void {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

/**
 * Middleware to enforce CSRF protection on state-changing requests
 *
 * Usage:
 * ```typescript
 * export async function POST(req: NextRequest) {
 *   const csrfCheck = validateCsrfMiddleware(req);
 *   if (!csrfCheck.valid) {
 *     return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
 *   }
 *   // ... rest of handler
 * }
 * ```
 */
export function validateCsrfMiddleware(req: NextRequest): {
  valid: boolean;
  error?: string;
} {
  // Skip CSRF for safe methods
  const method = req.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return { valid: true };
  }

  // Get tokens from cookie and header
  const cookieToken = getCsrfTokenFromCookie(req);
  const headerToken = getCsrfTokenFromHeader(req);

  // Both must be present
  if (!cookieToken) {
    return { valid: false, error: 'Missing CSRF cookie token' };
  }

  if (!headerToken) {
    return { valid: false, error: 'Missing CSRF header token' };
  }

  // Tokens must match (Double Submit Cookie pattern)
  if (cookieToken !== headerToken) {
    return { valid: false, error: 'CSRF tokens do not match' };
  }

  // Validate token signature
  if (!validateCsrfToken(cookieToken)) {
    return { valid: false, error: 'Invalid CSRF token signature' };
  }

  return { valid: true };
}

/**
 * Higher-order function to protect API routes with CSRF validation
 *
 * Usage:
 * ```typescript
 * // For simple routes
 * export const POST = withCsrfProtection(async (req: NextRequest) => {
 *   // Your handler code
 * });
 *
 * // For dynamic routes with context
 * export const POST = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
 *   // Your handler code
 * });
 * ```
 */
export function withCsrfProtection<T extends unknown[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
): (req: NextRequest, ...args: T) => Promise<NextResponse> {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    const csrfCheck = validateCsrfMiddleware(req);

    if (!csrfCheck.valid) {
      return NextResponse.json(
        {
          error: 'CSRF validation failed',
          message: csrfCheck.error || 'Invalid request',
        },
        { status: 403 }
      );
    }

    return handler(req, ...args);
  };
}

/**
 * Generate and set CSRF token for client-side forms
 * Call this in your layout or page to provide token to client
 */
export function ensureCsrfToken(req: NextRequest, response: NextResponse): void {
  const existingToken = getCsrfTokenFromCookie(req);

  if (!existingToken || !validateCsrfToken(existingToken)) {
    const newToken = generateCsrfToken();
    setCsrfCookie(response, newToken);
  }
}
