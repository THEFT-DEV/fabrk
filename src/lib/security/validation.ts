/**
 * Input Validation & Sanitization
 * Protect against injection attacks, XSS, and malformed data
 *
 * Uses Zod for type-safe validation
 */

import { z } from 'zod';

/**
 * Common validation schemas
 */
export const ValidationSchemas = {
  // Email validation
  email: z.string().email('Invalid email address').toLowerCase().trim(),

  // Password validation (strong password)
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),

  // Name validation
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim()
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  // Username validation
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .toLowerCase()
    .trim()
    .regex(
      /^[a-z0-9_-]+$/,
      'Username can only contain lowercase letters, numbers, underscores, and hyphens'
    ),

  // URL validation
  url: z.string().url('Invalid URL').trim(),

  // Phone number (basic, customize for your region)
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),

  // UUID validation
  uuid: z.string().uuid('Invalid UUID'),

  // Positive integer
  positiveInt: z.number().int().positive('Must be a positive integer'),

  // Boolean
  boolean: z.boolean(),

  // Date (ISO 8601)
  isoDate: z.string().datetime('Invalid ISO 8601 date'),

  // Pagination
  pagination: z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10),
  }),

  // Search query
  searchQuery: z.string().min(1).max(200).trim(),

  // File upload
  fileUpload: z.object({
    name: z.string().max(255),
    size: z.number().max(10 * 1024 * 1024), // 10MB max
    type: z.enum([
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
    ]),
  }),
};

/**
 * Sanitize string input
 * Remove potential XSS vectors
 */
export function sanitizeString(input: string): string {
  // Use global regex replacements and check for dangerous URL schemes
  let sanitized = input.trim();

  // Remove angle brackets (XSS)
  sanitized = sanitized.replace(/[<>]/g, '');

  // Remove ALL dangerous URL schemes (not just javascript:)
  // This handles: javascript:, data:, vbscript:, file:, about:
  const dangerousSchemes = /\b(javascript|data|vbscript|file|about):/gi;
  while (dangerousSchemes.test(sanitized)) {
    sanitized = sanitized.replace(dangerousSchemes, '');
  }

  // Remove event handlers (onload=, onclick=, etc.)
  const eventHandlers = /on\w+\s*=/gi;
  while (eventHandlers.test(sanitized)) {
    sanitized = sanitized.replace(eventHandlers, '');
  }

  return sanitized;
}

/**
 * Sanitize HTML
 * Allow only safe tags and attributes
 */
export function sanitizeHTML(html: string): string {
  // For production, use a library like DOMPurify
  // This is a basic implementation
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'];
  const _allowedAttributes = { a: ['href', 'title'] };

  // Simple tag whitelist (use DOMPurify in production)
  return html.replace(/<(\w+)([^>]*)>/g, (match, tag, _attrs) => {
    if (!allowedTags.includes(tag.toLowerCase())) {
      return '';
    }
    return match;
  });
}

/**
 * Validate and sanitize email
 */
export function validateEmail(email: string): {
  valid: boolean;
  email?: string;
  error?: string;
} {
  try {
    const validated = ValidationSchemas.email.parse(email);
    return { valid: true, email: validated };
  } catch (error: unknown) {
    const errorMessage = error instanceof z.ZodError ? error.issues[0]?.message : 'Invalid email';
    return { valid: false, error: errorMessage };
  }
}

/**
 * Validate and sanitize password
 */
export function validatePassword(password: string): {
  valid: boolean;
  password?: string;
  errors?: string[];
} {
  try {
    const validated = ValidationSchemas.password.parse(password);
    return { valid: true, password: validated };
  } catch (error: unknown) {
    const errors =
      error instanceof z.ZodError ? error.issues.map((e) => e.message) : ['Invalid password'];
    return { valid: false, errors };
  }
}

/**
 * Validate pagination parameters
 */
export function validatePagination(params: { page?: number; limit?: number }): {
  page: number;
  limit: number;
} {
  const result = ValidationSchemas.pagination.parse(params);
  return result;
}

/**
 * Detect SQL injection attempts
 */
export function detectSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\bUNION\b.*\bSELECT\b)/i,
    /(\bSELECT\b.*\bFROM\b)/i,
    /(\bINSERT\b.*\bINTO\b)/i,
    /(\bUPDATE\b.*\bSET\b)/i,
    /(\bDELETE\b.*\bFROM\b)/i,
    /(\bDROP\b.*\bTABLE\b)/i,
    /(\bEXEC\b|\bEXECUTE\b)/i,
    /(--|\#|\/\*)/,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
  ];

  return sqlPatterns.some((pattern) => pattern.test(input));
}

/**
 * Detect common XSS attack patterns
 *
 * Note: This is for early detection/blocking, NOT for HTML sanitization.
 * For sanitizing user-generated HTML content, use DOMPurify (isomorphic-dompurify).
 * Regex cannot reliably parse HTML - this only catches obvious attack patterns.
 */
export function detectXSS(input: string): boolean {
  const xssPatterns = [
    // Common script injection patterns (not comprehensive - use sanitizer for HTML)
    /<script\b/gi,
    // Dangerous URL schemes
    /\b(javascript|data|vbscript|file|about):/gi,
    // Event handlers
    /on\w+\s*=/gi,
    // Dangerous HTML tags
    /<\s*iframe[\s\S]*?>/gi,
    /<\s*object[\s\S]*?>/gi,
    /<\s*embed[\s\S]*?>/gi,
    /<\s*link[\s\S]*?>/gi,
    /<\s*meta[\s\S]*?>/gi,
    // Dangerous functions
    /\beval\s*\(/gi,
    /\bexpression\s*\(/gi,
    /\bsetTimeout\s*\(/gi,
    /\bsetInterval\s*\(/gi,
  ];

  return xssPatterns.some((pattern) => pattern.test(input));
}

/**
 * Detect path traversal attempts
 */
export function detectPathTraversal(input: string): boolean {
  const patterns = [/\.\.\//, /\.\.\\/, /%2e%2e%2f/i, /%2e%2e%5c/i];

  return patterns.some((pattern) => pattern.test(input));
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: { name: string; size: number; type: string }): {
  valid: boolean;
  error?: string;
} {
  // Check file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  // Check file type
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
  ];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not allowed' };
  }

  // Check file extension
  const ext = file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'txt'];

  if (!ext || !allowedExtensions.includes(ext)) {
    return { valid: false, error: 'File extension not allowed' };
  }

  // Check for double extensions (potential bypass)
  const parts = file.name.split('.');
  if (parts.length > 2) {
    return { valid: false, error: 'File name cannot have multiple extensions' };
  }

  return { valid: true };
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace invalid chars
    .replace(/\.{2,}/g, '.') // Remove double dots
    .substring(0, 255); // Limit length
}

/**
 * Validate JSON
 */
export function validateJSON(input: string): {
  valid: boolean;
  data?: unknown;
  error?: string;
} {
  try {
    const data = JSON.parse(input);
    return { valid: true, data };
  } catch {
    return { valid: false, error: 'Invalid JSON' };
  }
}

/**
 * Create custom validation schema
 */
export function createSchema<T extends z.ZodType>(schema: T) {
  return {
    parse: (data: unknown) => schema.parse(data),
    safeParse: (data: unknown) => schema.safeParse(data),
    validate: (data: unknown): { valid: boolean; data?: z.infer<T>; errors?: string[] } => {
      const result = schema.safeParse(data);
      if (result.success) {
        return { valid: true, data: result.data };
      }
      return {
        valid: false,
        errors: result.error.issues.map((e) => e.message),
      };
    },
  };
}

/**
 * API request validation wrapper
 */
export async function validateRequest<T>(
  data: unknown,
  schema: z.ZodType<T>
): Promise<{ success: boolean; data?: T; errors?: Record<string, string> }> {
  try {
    const validated = await schema.parseAsync(data);
    return { success: true, data: validated };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _error: 'Validation failed' } };
  }
}
