/**
 * CORS Configuration for API Routes
 *
 * Provides CORS headers for public API endpoints (/api/v1/*).
 * Internal API routes should NOT use this to prevent CSRF attacks.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Allowed origins for CORS (customize based on your needs)
const ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS?.split(',') ?? [
  'http://localhost:3000',
  'http://localhost:3001',
];

// Allowed HTTP methods
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

// Allowed headers
const ALLOWED_HEADERS = ['Content-Type', 'Authorization', 'X-Requested-With', 'X-API-Key'];

// Max age for preflight cache (24 hours)
const MAX_AGE = 86400;

/**
 * Get CORS headers for a request
 */
export function getCorsHeaders(request: NextRequest): Headers {
  const origin = request.headers.get('origin');
  const headers = new Headers();

  // Check if origin is allowed
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  } else if (ALLOWED_ORIGINS.includes('*')) {
    headers.set('Access-Control-Allow-Origin', '*');
  }

  headers.set('Access-Control-Allow-Methods', ALLOWED_METHODS.join(', '));
  headers.set('Access-Control-Allow-Headers', ALLOWED_HEADERS.join(', '));
  headers.set('Access-Control-Max-Age', MAX_AGE.toString());
  headers.set('Access-Control-Allow-Credentials', 'true');

  return headers;
}

/**
 * Handle CORS preflight (OPTIONS) request
 */
export function handleCorsPreFlight(request: NextRequest): NextResponse {
  const headers = getCorsHeaders(request);
  return new NextResponse(null, { status: 204, headers });
}

/**
 * Add CORS headers to an existing response
 */
export function withCors(request: NextRequest, response: NextResponse): NextResponse {
  const corsHeaders = getCorsHeaders(request);

  corsHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * CORS wrapper for API route handlers
 *
 * Usage:
 * ```ts
 * import { withCorsHandler } from '@/lib/security/cors';
 *
 * export const GET = withCorsHandler(async (request) => {
 *   return NextResponse.json({ data: 'hello' });
 * });
 *
 * export const OPTIONS = withCorsHandler();
 * ```
 */
export function withCorsHandler(
  handler?: (request: NextRequest) => Promise<NextResponse> | NextResponse
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return handleCorsPreFlight(request);
    }

    // If no handler provided, return preflight response
    if (!handler) {
      return handleCorsPreFlight(request);
    }

    // Execute handler and add CORS headers
    const response = await handler(request);
    return withCors(request, response);
  };
}

/**
 * Check if the request origin is allowed
 */
export function isOriginAllowed(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Same-origin requests don't have origin header
  return ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes('*');
}
