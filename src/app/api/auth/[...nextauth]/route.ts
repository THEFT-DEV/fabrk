/**
 * NextAuth.js API Route Handler
 * Handles all authentication requests: /api/auth/*
 *
 * This catch-all route handles:
 * - /api/auth/session - Get current session
 * - /api/auth/signin - Sign in page/action
 * - /api/auth/signout - Sign out action
 * - /api/auth/callback/* - OAuth callbacks
 * - /api/auth/csrf - CSRF token
 *
 * Rate Limiting:
 * - POST requests limited to 10 attempts/hour per IP
 * - Prevents brute force attacks on sign-in
 */

import { handlers } from '@/lib/auth';
import { checkAuthRateLimit } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Extract IP address from request headers
 * Tries x-forwarded-for first (proxy), falls back to x-real-ip
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

/**
 * Wrap GET handler (no rate limiting needed for session checks)
 */
export async function GET(request: NextRequest) {
  return handlers.GET(request);
}

/**
 * Wrap POST handler with rate limiting
 * Rate limit: 10 attempts/hour per IP address
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const identifier = `auth:${ip}`;

  // Check rate limit
  const { success, remaining, reset } = await checkAuthRateLimit(identifier);

  if (!success) {
    const resetDate = new Date(reset);
    return NextResponse.json(
      {
        error: 'Too many authentication attempts. Please try again later.',
        retryAfter: resetDate.toISOString(),
      },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  }

  // Rate limit passed, proceed with NextAuth handler
  return handlers.POST(request);
}
