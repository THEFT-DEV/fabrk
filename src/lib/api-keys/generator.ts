import crypto from 'crypto';
import { hashApiKey } from './hasher';

/**
 * API Key Generator
 * Generates cryptographically secure API keys with prefixes
 */

export interface GeneratedApiKey {
  key: string; // Full key (e.g., "sk_live_abc123...")
  prefix: string; // First 12 chars for display (e.g., "sk_live_abc1")
  hash: string; // SHA-256 hash for storage
}

/**
 * Generate a new API key with prefix
 * @param environment - 'live' or 'test'
 * @returns Generated API key with prefix and hash
 */
export function generateApiKey(environment: 'live' | 'test' = 'live'): GeneratedApiKey {
  // Generate 32 random bytes (256 bits)
  const randomBytes = crypto.randomBytes(32);

  // Convert to base64url (URL-safe base64)
  const randomString = randomBytes
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  // Create full key with prefix
  const prefix = environment === 'live' ? 'sk_live_' : 'sk_test_';
  const key = `${prefix}${randomString}`;

  // Extract display prefix (first 12 chars)
  const displayPrefix = key.substring(0, 12);

  // Hash the full key for storage
  const hash = hashApiKey(key);

  return {
    key,
    prefix: displayPrefix,
    hash,
  };
}

/**
 * Validate API key format
 * @param key - API key to validate
 * @returns True if key format is valid
 */
export function isValidApiKeyFormat(key: string): boolean {
  // Must start with sk_live_ or sk_test_
  if (!key.startsWith('sk_live_') && !key.startsWith('sk_test_')) {
    return false;
  }

  // Must be at least 50 characters (prefix + 32 bytes base64)
  if (key.length < 50) {
    return false;
  }

  // Must only contain base64url characters after prefix
  const afterPrefix = key.substring(8);
  const base64urlPattern = /^[A-Za-z0-9_-]+$/;
  return base64urlPattern.test(afterPrefix);
}
