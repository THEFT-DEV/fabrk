/**
 * API Error Handler
 * Standardized error handling for API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { logger } from '@/lib/logger';

// Custom error classes
export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = 'Validation failed') {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409, 'CONFLICT');
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

// Error response interface
interface ErrorResponse {
  error: string;
  code?: string;
  details?: Record<string, unknown> | unknown[] | string;
  timestamp?: string;
}

/**
 * Format error response
 */
function formatErrorResponse(error: Error): ErrorResponse {
  const timestamp = new Date().toISOString();

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return {
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
      timestamp,
    };
  }

  // Handle custom API errors
  if (error instanceof ApiError) {
    return {
      error: error.message,
      code: error.code,
      timestamp,
    };
  }

  // Handle generic errors (don't expose internal details in production)
  if (process.env.NODE_ENV === 'production') {
    return {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      timestamp,
    };
  }

  // In development, include error details
  return {
    error: error.message || 'Internal server error',
    code: 'INTERNAL_ERROR',
    details: error.stack,
    timestamp,
  };
}

/**
 * Error handler middleware wrapper
 */
export function withErrorHandler<T extends unknown[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      return await handler(req, ...args);
    } catch (error: unknown) {
      // Log error
      logger.error('API Error:', error);

      // Format error response
      const errorResponse = formatErrorResponse(error as Error);

      // Determine status code
      let statusCode = 500;
      if (error instanceof ApiError) {
        statusCode = error.statusCode;
      } else if (error instanceof ZodError) {
        statusCode = 400;
      }

      return NextResponse.json(errorResponse, { status: statusCode });
    }
  };
}

/**
 * Async error handler for use in try-catch blocks
 */
export function handleError(error: unknown): NextResponse {
  logger.error('API Error:', error);

  const errorResponse = formatErrorResponse(error as Error);

  let statusCode = 500;
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
  } else if (error instanceof ZodError) {
    statusCode = 400;
  }

  return NextResponse.json(errorResponse, { status: statusCode });
}
