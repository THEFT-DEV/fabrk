import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper precedence handling
 *
 * Combines clsx for conditional classes with tailwind-merge to resolve
 * conflicting Tailwind classes (e.g., "p-4 p-2" becomes "p-2")
 *
 * @param inputs - Class names to merge (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 *
 * @example
 * ```typescript
 * cn("p-4 bg-primary", { "text-white": true })
 * // Returns: "p-4 bg-primary text-white"
 *
 * cn("p-4", "p-2") // Conflicting classes
 * // Returns: "p-2" (last one wins)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Escape HTML entities to prevent XSS attacks
 * Use this for any user-generated content rendered in HTML contexts (emails, etc.)
 *
 * @param str - The string to escape
 * @returns HTML-safe string with entities escaped
 */
export function escapeHtml(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validate IP address format (IPv4 or IPv6)
 * Used for rate limiting to prevent IP spoofing via headers
 *
 * @param ip - The IP address to validate
 * @returns true if valid IP format
 */
export function isValidIp(ip: string): boolean {
  // IPv4 pattern
  const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // IPv6 pattern (simplified - matches most common formats)
  const ipv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^(?:[0-9a-fA-F]{1,4}:){0,6}::(?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$/;
  return ipv4.test(ip) || ipv6.test(ip);
}
