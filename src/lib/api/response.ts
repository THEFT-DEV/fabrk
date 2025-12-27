/**
 * API Response Utilities
 * Standardized response helpers for API routes
 */

import { NextResponse } from 'next/server';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
}

/**
 * Success response helper
 */
export function successResponse<T = unknown>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Created response (201)
 */
export function createdResponse<T = unknown>(
  data: T,
  message: string = 'Resource created successfully'
): NextResponse {
  return successResponse(data, message, 201);
}

/**
 * No content response (204)
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

/**
 * Error response helper
 */
export function errorResponse(error: string, status: number = 500, code?: string): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error,
      code,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Validation error response (400)
 */
export function validationError(
  message: string = 'Validation failed',
  details?: Record<string, unknown> | unknown[]
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: 'VALIDATION_ERROR',
      details,
      timestamp: new Date().toISOString(),
    },
    { status: 400 }
  );
}

/**
 * Not found response (404)
 */
export function notFoundResponse(message: string = 'Resource not found'): NextResponse {
  return errorResponse(message, 404, 'NOT_FOUND');
}

/**
 * Unauthorized response (401)
 */
export function unauthorizedResponse(message: string = 'Unauthorized'): NextResponse {
  return errorResponse(message, 401, 'UNAUTHORIZED');
}

/**
 * Forbidden response (403)
 */
export function forbiddenResponse(message: string = 'Forbidden'): NextResponse {
  return errorResponse(message, 403, 'FORBIDDEN');
}

/**
 * Conflict response (409)
 */
export function conflictResponse(message: string = 'Resource conflict'): NextResponse {
  return errorResponse(message, 409, 'CONFLICT');
}

/**
 * Rate limit response (429)
 */
export function rateLimitResponse(
  message: string = 'Too many requests',
  retryAfter?: number
): NextResponse {
  const headers: HeadersInit = {};
  if (retryAfter) {
    headers['Retry-After'] = retryAfter.toString();
  }

  return NextResponse.json(
    {
      success: false,
      error: message,
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter,
      timestamp: new Date().toISOString(),
    },
    { status: 429, headers }
  );
}
