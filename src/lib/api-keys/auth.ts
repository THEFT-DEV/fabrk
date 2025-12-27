import { prisma } from '@/lib/prisma';
import { hashApiKey } from './hasher';
import { isValidApiKeyFormat } from './generator';
import { logger } from '@/lib/logger';

/**
 * API Key Authentication
 * Middleware and utilities for API key validation
 */

export interface ValidatedApiKey {
  id: string;
  organizationId: string;
  userId: string;
  name: string;
  permissions: string[];
  expiresAt: Date | null;
}

/**
 * Validate an API key and return key details
 * @param key - API key to validate
 * @returns Validated API key details or null if invalid
 */
export async function validateApiKey(key: string): Promise<ValidatedApiKey | null> {
  try {
    // Basic format validation
    if (!isValidApiKeyFormat(key)) {
      return null;
    }

    // Hash the key for database lookup
    const keyHash = hashApiKey(key);

    // Find the API key
    const apiKey = await prisma.apiKey.findUnique({
      where: { keyHash },
      select: {
        id: true,
        organizationId: true,
        userId: true,
        name: true,
        permissions: true,
        expiresAt: true,
      },
    });

    if (!apiKey) {
      return null;
    }

    // Check if key is expired
    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      return null;
    }

    // Track usage (async, don't wait)
    trackApiKeyUsage(apiKey.id).catch((err) => logger.error('Failed to track API key usage', err));

    return apiKey;
  } catch (error: unknown) {
    logger.error('Error validating API key', error);
    return null;
  }
}

/**
 * Get permissions for an API key
 * @param key - API key
 * @returns Array of permissions or null if invalid
 */
export async function getApiKeyPermissions(key: string): Promise<string[] | null> {
  const validatedKey = await validateApiKey(key);
  return validatedKey ? validatedKey.permissions : null;
}

/**
 * Check if an API key has a specific permission
 * @param key - API key
 * @param permission - Permission to check (e.g., 'read', 'write', 'admin')
 * @returns True if key has permission
 */
export async function checkPermission(key: string, permission: string): Promise<boolean> {
  const permissions = await getApiKeyPermissions(key);
  return permissions ? permissions.includes(permission) : false;
}

/**
 * Track API key usage (update lastUsedAt timestamp)
 * @param keyId - API key ID
 */
export async function trackApiKeyUsage(keyId: string): Promise<void> {
  await prisma.apiKey.update({
    where: { id: keyId },
    data: { lastUsedAt: new Date() },
  });
}

/**
 * Extract API key from Authorization header
 * @param authHeader - Authorization header value
 * @returns API key or null
 */
export function extractApiKeyFromHeader(authHeader: string | null): string | null {
  if (!authHeader) {
    return null;
  }

  // Check for Bearer token format
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}
