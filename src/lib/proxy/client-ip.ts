/**
 * Client IP Extraction
 *
 * Extracts and validates client IP addresses from request headers.
 * Validates format to prevent header injection attacks.
 */

import type { NextRequest } from 'next/server';

const IPV4_PATTERN =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const IPV6_PATTERN =
  /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$/;

function isValidIp(ip: string): boolean {
  return IPV4_PATTERN.test(ip) || IPV6_PATTERN.test(ip);
}

/**
 * Extract validated client IP from request headers.
 * Priority: Cloudflare > X-Forwarded-For (first valid) > X-Real-IP > 'unknown'
 */
export function extractClientIp(request: NextRequest): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp && isValidIp(cfIp.trim())) return cfIp.trim();

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstValidIp = forwarded
      .split(',')
      .map((ip) => ip.trim())
      .find(isValidIp);
    if (firstValidIp) return firstValidIp;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp && isValidIp(realIp.trim())) return realIp.trim();

  return 'unknown';
}
