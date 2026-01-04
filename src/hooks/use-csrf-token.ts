/**
 * React Hook for CSRF Token
 * Provides CSRF token for client-side API requests
 */

'use client';

import { useState } from 'react';

/**
 * Get CSRF token from cookie (client-side)
 */
function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const csrfCookie = cookies.find((c) => c.trim().startsWith('csrf_token='));

  if (!csrfCookie) return null;

  return csrfCookie.split('=')[1];
}

/**
 * Hook to get CSRF token for API requests
 *
 * Usage:
 * ```typescript
 * const csrfToken = useCsrfToken();
 *
 * fetch("/api/endpoint", {
 *   method: "POST",
 *   headers: {
 *     "x-csrf-token": csrfToken,
 *     "Content-Type": "application/json",
 *   },
 *   body: JSON.stringify(data),
 * });
 * ```
 */
export function useCsrfToken(): string | null {
  const [token] = useState<string | null>(() => getCsrfToken());

  return token;
}

/**
 * Helper to create fetch options with CSRF token
 *
 * Usage:
 * ```typescript
 * const fetchWithCsrf = useCsrfFetch();
 *
 * fetchWithCsrf("/api/endpoint", {
 *   method: "POST",
 *   body: JSON.stringify(data),
 * });
 * ```
 */
export function useCsrfFetch() {
  const csrfToken = useCsrfToken();

  return (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);

    // Add CSRF token for state-changing requests
    const method = options.method?.toUpperCase() || 'GET';
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && csrfToken) {
      headers.set('x-csrf-token', csrfToken);
    }

    // Add Content-Type if not set and body exists
    if (options.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };
}
