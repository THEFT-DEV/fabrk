# Content Security Policy (CSP) Nonce System

## Overview

Fabrk implements a production-grade CSP nonce system that eliminates the need for `'unsafe-inline'` in the `script-src` directive. This significantly improves security by preventing unauthorized inline script execution while maintaining full Next.js compatibility.

## How It Works

### 1. Nonce Generation (Per Request)

The middleware generates a unique cryptographically secure nonce for each request:

```typescript
// src/lib/security/csp-nonce.ts
export function generateNonce(): string {
  return randomBytes(16).toString("base64"); // 128-bit entropy
}
```

**Security Properties:**
- 128-bit entropy (16 bytes)
- Base64 encoding for CSP compatibility
- Unique per request (prevents replay attacks)
- Cryptographically secure random generation

### 2. Middleware Injection

The middleware injects the nonce into both:
1. Custom header (`x-nonce`) for retrieval by components
2. Content-Security-Policy header (replaces `'unsafe-inline'`)

```typescript
// src/middleware.ts
const nonce = generateNonce();
response.headers.set("x-nonce", nonce);

// Update CSP header
const csp = response.headers.get("Content-Security-Policy");
const updatedCsp = csp.replace(
  /script-src ([^;]*)'unsafe-inline'([^;]*);/,
  `script-src $1'nonce-${nonce}'$2;`
);
```

### 3. Component Usage

**Server Components (Recommended):**

```typescript
import { NonceScript } from "@/components/security/nonce-script";

export async function MyServerComponent() {
  return (
    <NonceScript type="application/ld+json">
      {JSON.stringify({ "@context": "https://schema.org", ... })}
    </NonceScript>
  );
}
```

**Client Components (Fallback):**

```typescript
"use client";
import { ClientSchemaScript } from "@/components/security/client-schema-script";

export function MyClientComponent() {
  const schema = generateFAQSchema(faqs);
  return <ClientSchemaScript schema={schema} />;
}
```

**Important:** Client components cannot use CSP nonce (no access to headers). Use server components when possible for full CSP compliance.

## Components

### NonceScript (Server Component)

**File:** `src/components/security/nonce-script.tsx`

Renders inline scripts with CSP nonce for server-rendered contexts.

**Props:**
```typescript
interface NonceScriptProps {
  children: string;      // Script content
  type?: string;         // Script type (default: "text/javascript")
  id?: string;           // Optional script ID
  async?: boolean;       // Async loading
  defer?: boolean;       // Defer loading
}
```

**Usage:**
```typescript
<NonceScript type="application/ld+json">
  {JSON.stringify(schema)}
</NonceScript>
```

### ClientSchemaScript (Client Component)

**File:** `src/components/security/client-schema-script.tsx`

Client-side schema script injection for "use client" components.

**Props:**
```typescript
interface ClientSchemaScriptProps {
  schema: object | object[];  // JSON-LD schema
  id?: string;                 // Optional ID prefix
}
```

**Usage:**
```typescript
"use client";
import { ClientSchemaScript } from "@/components/security/client-schema-script";

export function FAQSection({ faqs }) {
  const schema = generateFAQSchema(faqs);
  return <ClientSchemaScript schema={schema} />;
}
```

**Limitations:**
- Cannot use CSP nonce (client-side only)
- Scripts injected via DOM manipulation
- Use server components when possible

## Security Benefits

### Before (Unsafe)

```http
Content-Security-Policy: script-src 'self' 'unsafe-inline' https://js.stripe.com;
```

**Risk:** Any inline script can execute, including injected malicious scripts.

### After (Secure)

```http
Content-Security-Policy: script-src 'self' 'nonce-a8f9d3c2b1e4...' https://js.stripe.com;
```

**Protection:** Only scripts with matching nonce can execute.

### Attack Prevention

✅ **Prevents XSS via inline scripts**
- Injected `<script>` tags without valid nonce are blocked
- Attackers cannot guess the nonce (128-bit entropy, changes per request)

✅ **Prevents event handler injection**
- `onclick="malicious()"` attributes are blocked
- No inline event handlers allowed

✅ **Prevents `javascript:` URIs**
- `<a href="javascript:alert(1)">` is blocked
- CSP blocks execution in URI context

## Implementation Checklist

When adding inline scripts to your application:

### ✅ Server Components (Preferred)

1. Import `NonceScript`
2. Use async component
3. Pass script content as children

```typescript
import { NonceScript } from "@/components/security/nonce-script";

export async function MyPage() {
  return (
    <NonceScript type="application/ld+json">
      {JSON.stringify(schema)}
    </NonceScript>
  );
}
```

### ⚠️ Client Components (When Necessary)

1. Import `ClientSchemaScript`
2. Use for JSON-LD schemas only
3. Consider refactoring to server component

```typescript
"use client";
import { ClientSchemaScript } from "@/components/security/client-schema-script";

export function MyComponent() {
  return <ClientSchemaScript schema={schema} />;
}
```

## Testing

### Manual Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser DevTools → Network tab**

3. **Inspect response headers:**
   ```http
   Content-Security-Policy: script-src 'self' 'nonce-xyz...'
   x-nonce: xyz...
   ```

4. **Verify no CSP violations in Console**

### Automated Testing

```bash
npm run test -- src/lib/security/csp-nonce.test.ts
```

**Test Coverage:**
- ✅ Nonce generation (base64 format)
- ✅ Uniqueness (1000 nonces, all unique)
- ✅ Consistent length (24 characters)
- ✅ Header name retrieval

## Production Deployment

### Vercel

CSP nonce system works automatically on Vercel. No additional configuration needed.

### Self-Hosted

Ensure your reverse proxy preserves CSP headers:

**Nginx:**
```nginx
proxy_pass_header Content-Security-Policy;
proxy_pass_header x-nonce;
```

**Cloudflare:**
CSP headers are preserved by default.

## Troubleshooting

### CSP Violations in Browser Console

**Error:**
```
Refused to execute inline script because it violates CSP directive 'script-src'
```

**Solution:**
1. Use `NonceScript` for server components
2. Use `ClientSchemaScript` for client components
3. Avoid direct `<script>` tags

### Nonce Not Found

**Error:**
```
getNonce() returns empty string
```

**Solution:**
1. Ensure component is server-rendered
2. Check middleware is running
3. Verify route is not excluded in middleware config

### Client Component Errors

**Error:**
```
async/await is not yet supported in Client Components
```

**Solution:**
Replace `SchemaScript` with `ClientSchemaScript` in client components:

```typescript
// ❌ Wrong (server component in client context)
import { SchemaScript } from "@/components/seo/schema-script";

// ✅ Correct (client-compatible version)
import { ClientSchemaScript } from "@/components/security/client-schema-script";
```

## Related Files

- `src/lib/security/csp-nonce.ts` - Nonce generation and retrieval
- `src/lib/security/csp-nonce.test.ts` - Test suite
- `src/components/security/nonce-script.tsx` - Server component
- `src/components/security/client-schema-script.tsx` - Client component
- `src/middleware.ts` - CSP injection logic
- `next.config.ts` - Base CSP configuration

## Future Enhancements

### Strict Dynamic CSP

For even stronger security, consider migrating to `strict-dynamic`:

```typescript
"script-src 'self' 'strict-dynamic' 'nonce-{NONCE}'"
```

**Benefits:**
- Allows dynamically loaded scripts from trusted sources
- Simplifies third-party script integration
- Better compatibility with modern frameworks

**Trade-offs:**
- Requires all scripts to be loaded via nonce or hash
- May break legacy scripts

### Hash-Based CSP

For static scripts that don't change:

```typescript
// Generate hash
const hash = crypto.createHash('sha256')
  .update(scriptContent)
  .digest('base64');

// Add to CSP
"script-src 'sha256-${hash}'"
```

**Use Cases:**
- Static initialization scripts
- Configuration objects
- Third-party widgets

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [OWASP: Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
