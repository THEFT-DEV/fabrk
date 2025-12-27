/**
 * NonceScript Component
 *
 * Server component that renders inline scripts with CSP nonce
 * Eliminates need for 'unsafe-inline' in Content-Security-Policy
 *
 * Usage:
 * ```tsx
 * <NonceScript type="application/ld+json">
 *   {JSON.stringify(schema)}
 * </NonceScript>
 * ```
 *
 * Security Benefits:
 * - Per-request unique nonce prevents replay attacks
 * - Allows inline scripts without 'unsafe-inline'
 * - Compatible with strict CSP policies
 */

import { getNonce } from '@/lib/security/csp-nonce';

export interface NonceScriptProps {
  children: string;
  type?: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
}

/**
 * Render inline script with CSP nonce
 *
 * This is a Server Component that must be used in server-rendered contexts
 * The nonce is retrieved from the request headers (set by middleware)
 */
export async function NonceScript({
  children,
  type = 'text/javascript',
  id,
  async,
  defer,
}: NonceScriptProps) {
  const nonce = await getNonce();

  return (
    <script
      nonce={nonce}
      type={type}
      id={id}
      async={async}
      defer={defer}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
