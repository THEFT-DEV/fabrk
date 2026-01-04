/**
 * URL Utilities
 * Functions for working with URLs and query parameters
 */

/**
 * Parse query string to object
 * @example parseQueryString("?foo=bar&baz=qux") // { foo: "bar", baz: "qux" }
 */
export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

/**
 * Build query string from object
 * @example buildQueryString({ foo: "bar", baz: "qux" }) // "foo=bar&baz=qux"
 */
export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

/**
 * Add query parameters to URL
 * @example addQueryParams("https://example.com", { foo: "bar" })
 * // "https://example.com?foo=bar"
 */
export function addQueryParams(url: string, params: Record<string, unknown>): string {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      urlObj.searchParams.set(key, String(value));
    }
  });
  return urlObj.toString();
}

/**
 * Remove query parameters from URL
 * @example removeQueryParams("https://example.com?foo=bar&baz=qux", ["foo"])
 * // "https://example.com?baz=qux"
 */
export function removeQueryParams(url: string, keys: string[]): string {
  const urlObj = new URL(url);
  keys.forEach((key) => urlObj.searchParams.delete(key));
  return urlObj.toString();
}

/**
 * Get query parameter value
 */
export function getQueryParam(url: string, key: string): string | null {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(key);
}

/**
 * Get domain from URL
 * @example getDomain("https://subdomain.example.com/path") // "example.com"
 */
export function getDomain(url: string): string {
  const urlObj = new URL(url);
  const parts = urlObj.hostname.split('.');
  return parts.slice(-2).join('.');
}

/**
 * Get subdomain from URL
 * @example getSubdomain("https://api.example.com") // "api"
 */
export function getSubdomain(url: string): string | null {
  const urlObj = new URL(url);
  const parts = urlObj.hostname.split('.');
  return parts.length > 2 ? parts[0] : null;
}

/**
 * Check if URL is external
 */
export function isExternalUrl(url: string, currentDomain: string): boolean {
  try {
    const urlObj = new URL(url);
    return !urlObj.hostname.includes(currentDomain);
  } catch {
    return false;
  }
}

/**
 * Sanitize URL by removing sensitive query params
 */
export function sanitizeUrl(
  url: string,
  sensitiveParams: string[] = ['token', 'api_key', 'secret', 'password']
): string {
  return removeQueryParams(url, sensitiveParams);
}

/**
 * Get path from URL
 * @example getPath("https://example.com/foo/bar?baz=qux") // "/foo/bar"
 */
export function getPath(url: string): string {
  const urlObj = new URL(url);
  return urlObj.pathname;
}

/**
 * Join URL paths safely
 * @example joinPaths("https://example.com/", "/api", "users") // "https://example.com/api/users"
 */
export function joinPaths(...parts: string[]): string {
  return parts
    .map((part, index) => {
      if (index === 0) return part.replace(/\/$/, '');
      return part.replace(/^\//, '').replace(/\/$/, '');
    })
    .filter(Boolean)
    .join('/');
}
