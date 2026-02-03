# Complete Security Implementation Guide

This guide covers all security features implemented in Fabrk to protect against modern threats.

## Table of Contents

1. [Security Overview](#security-overview)
2. [Rate Limiting](#rate-limiting)
3. [Input Validation](#input-validation)
4. [Security Headers](#security-headers)
5. [Bot Protection](#bot-protection)
6. [Audit Logging](#audit-logging)
7. [GDPR Compliance](#gdpr-compliance)
8. [Implementation Examples](#implementation-examples)
9. [Security Checklist](#security-checklist)
10. [Incident Response](#incident-response)

---

## Security Overview

Fabrk implements defense-in-depth security covering all OWASP Top 10 vulnerabilities:

| Threat | Protection | Implementation |
|--------|------------|----------------|
| **Broken Access Control** | Role-based auth, session validation | NextAuth + middleware |
| **Cryptographic Failures** | Bcrypt passwords, JWT sessions | 12-round bcrypt, signed JWTs |
| **Injection** | Input validation, parameterized queries | Zod validation, Prisma ORM |
| **Insecure Design** | Security headers, CSP | Comprehensive headers |
| **Security Misconfiguration** | Secure defaults, error handling | Production-ready config |
| **Vulnerable Components** | Dependabot, security audits | Automated updates |
| **Authentication Failures** | Strong passwords, rate limiting | 8+ chars, complexity, 2FA ready |
| **Data Integrity Failures** | Webhook signatures, audit logs | HMAC verification, tamper detection |
| **Logging Failures** | Comprehensive audit logging | Security event tracking |
| **SSRF** | URL validation, whitelist | Input sanitization |

---

## Rate Limiting

### Overview

Protect against DDoS, brute-force, and API abuse with configurable rate limiting.

### Features

- **In-memory rate limiting** (development)
- **Distributed rate limiting** (production with Upstash Redis)
- **Sliding window algorithm**
- **Per-route configuration**
- **IP-based and user-based limits**
- **Automatic cleanup**

### Pre-configured Limiters

```typescript
import { RateLimiters, rateLimit } from "@/lib/security";

// Very strict - auth endpoints (5 requests / 15 min)
const authLimiter = rateLimit(RateLimiters.auth);

// Strict - sensitive operations (10 requests / min)
const strictLimiter = rateLimit(RateLimiters.strict);

// Moderate - API endpoints (60 requests / min)
const apiLimiter = rateLimit(RateLimiters.api);

// Lenient - public endpoints (100 requests / min)
const publicLimiter = rateLimit(RateLimiters.public);
```

### Implementation

#### API Route Protection

```typescript
// src/app/api/auth/login/route.ts
import { rateLimit, RateLimiters } from "@/lib/security";

export async function POST(req: Request) {
  // Check rate limit
  const limitResult = await rateLimit(RateLimiters.auth)(req);
  if (limitResult) return limitResult; // Returns 429 if exceeded

  // Process login...
}
```

#### Middleware Protection

```typescript
// src/middleware.ts
import { checkRateLimit, getClientIdentifier } from "@/lib/security";

export async function middleware(req: NextRequest) {
  const identifier = getClientIdentifier(req);

  const result = await checkRateLimit(identifier, {
    interval: 60 * 1000, // 1 minute
    maxRequests: 100,
  });

  if (!result.success) {
    return new NextResponse("Too many requests", {
      status: 429,
      headers: {
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
        "Retry-After": Math.ceil((result.reset - Date.now()) / 1000).toString(),
      },
    });
  }

  return NextResponse.next();
}
```

#### Production Setup (Upstash Redis)

```bash
# .env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

```bash
npm install @upstash/redis @upstash/ratelimit
```

---

## Input Validation

### Overview

Prevent injection attacks (SQL, XSS, path traversal) with comprehensive input validation.

### Features

- **Zod schema validation**
- **Pre-built validation schemas**
- **XSS detection**
- **SQL injection detection**
- **Path traversal detection**
- **File upload validation**
- **PII detection**

### Common Schemas

```typescript
import { ValidationSchemas } from "@/lib/security";

// Email
const email = ValidationSchemas.email.parse("user@example.com");

// Password (strong)
const password = ValidationSchemas.password.parse("SecureP@ss123");

// Name
const name = ValidationSchemas.name.parse("John Doe");

// URL
const url = ValidationSchemas.url.parse("https://example.com");

// Phone
const phone = ValidationSchemas.phone.parse("+15551234567");

// Pagination
const { page, limit } = ValidationSchemas.pagination.parse({
  page: 1,
  limit: 10,
});
```

### API Request Validation

```typescript
import { z } from "zod";
import { validateRequest } from "@/lib/security";

const registerSchema = z.object({
  name: ValidationSchemas.name,
  email: ValidationSchemas.email,
  password: ValidationSchemas.password,
});

export async function POST(req: Request) {
  const body = await req.json();

  const result = await validateRequest(body, registerSchema);

  if (!result.success) {
    return Response.json({ errors: result.errors }, { status: 400 });
  }

  const { name, email, password } = result.data;
  // Process registration...
}
```

### Sanitization

```typescript
import { sanitizeString, sanitizeHTML, sanitizeFilename } from "@/lib/security";

// Remove XSS vectors
const clean = sanitizeString("<script>alert('xss')</script>"); // ""

// Allow only safe HTML tags
const safeHTML = sanitizeHTML("<p>Hello</p><script>bad()</script>"); // "<p>Hello</p>"

// Safe filename
const filename = sanitizeFilename("../../etc/passwd"); // "__etc_passwd"
```

### Attack Detection

```typescript
import { detectXSS, detectSQLInjection, detectPathTraversal } from "@/lib/security";

// Detect attacks
if (detectXSS(userInput)) {
  // Log and block
  await AuditLog.xssAttempt(userId, ip, userInput);
  return Response.json({ error: "Invalid input" }, { status: 400 });
}

if (detectSQLInjection(userInput)) {
  await AuditLog.sqlInjectionAttempt(userId, ip, userInput);
  return Response.json({ error: "Invalid input" }, { status: 400 });
}
```

---

## Security Headers

### Overview

Implement comprehensive security headers to protect against clickjacking, XSS, and other attacks.

### Headers Implemented

- **Content Security Policy (CSP)** - Prevents XSS
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME sniffing
- **Strict-Transport-Security (HSTS)** - Enforces HTTPS
- **Referrer-Policy** - Controls referrer information
- **Permissions-Policy** - Controls browser features
- **X-XSS-Protection** - Legacy browser XSS protection

### Implementation

#### Next.js Configuration

```typescript
// next.config.ts
import { securityHeaders } from "./src/lib/security/headers";

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(process.env.NODE_ENV === "development"),
      },
    ];
  },
};

export default nextConfig;
```

#### Middleware

```typescript
// src/middleware.ts
import { securityHeadersMiddleware } from "@/lib/security";

export function middleware(req: NextRequest) {
  return securityHeadersMiddleware(req);
}
```

### Content Security Policy

The CSP is automatically configured for common use cases:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https: blob:;
font-src 'self' data: https://fonts.gstatic.com;
connect-src 'self' https://api.stripe.com https://www.google-analytics.com;
frame-src 'self' https://js.stripe.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
```

### CORS Configuration

```typescript
import { applyCORSHeaders } from "@/lib/security";

export async function GET(req: Request) {
  const response = Response.json({ data: "..." });

  return applyCORSHeaders(response, {
    origin: ["https://app.example.com"],
    methods: ["GET", "POST"],
    credentials: true,
  });
}
```

---

## Bot Protection

### Overview

Detect and block malicious bots while allowing legitimate crawlers.

### Features

- **User agent analysis**
- **Good bot detection** (search engines, AI crawlers)
- **Bad bot detection** (scrapers, spam bots)
- **Honeypot fields**
- **Submission timing verification**
- **CAPTCHA integration** (hCaptcha, reCAPTCHA, Turnstile)
- **Device fingerprinting**

### Bot Detection

```typescript
import { detectBot, shouldAllowBot } from "@/lib/security";

export async function POST(req: Request) {
  const detection = detectBot(req);

  if (!shouldAllowBot(detection)) {
    await AuditLog.botDetected(
      req.headers.get("x-forwarded-for") || "",
      req.headers.get("user-agent") || "",
      detection.botType
    );

    return Response.json({ error: "Access denied" }, { status: 403 });
  }

  // Process request...
}
```

### Honeypot Protection

```typescript
import { verifyHoneypot } from "@/lib/security";

export async function POST(req: Request) {
  const { email, password, _honeypot } = await req.json();

  // Bots will fill the honeypot field
  if (!verifyHoneypot(_honeypot)) {
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }

  // Process form...
}
```

**Frontend:**

```tsx
<form>
  <input type="email" name="email" required />
  <input type="password" name="password" required />

  {/* Honeypot - hidden from users */}
  <input
    type="text"
    name="_honeypot"
    style={{ position: "absolute", left: "-9999px" }}
    tabIndex={-1}
    autoComplete="off"
  />

  <button type="submit">Sign Up</button>
</form>
```

### Timing Verification

```typescript
import { verifySubmissionTiming } from "@/lib/security";

export async function POST(req: Request) {
  const { formLoadTime } = await req.json();

  const timing = verifySubmissionTiming(formLoadTime, 2); // Min 2 seconds

  if (!timing.valid) {
    console.warn("Bot detected:", timing.reason);
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }

  // Process form...
}
```

### CAPTCHA Integration

#### hCaptcha

```typescript
import { verifyHCaptcha } from "@/lib/security";

export async function POST(req: Request) {
  const { captchaToken } = await req.json();

  const verification = await verifyHCaptcha(captchaToken);

  if (!verification.success) {
    return Response.json(
      { error: "CAPTCHA verification failed" },
      { status: 400 }
    );
  }

  // Process request...
}
```

```bash
# .env
HCAPTCHA_SECRET_KEY=your_secret_key
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_site_key
```

#### reCAPTCHA v3

```typescript
import { verifyRecaptcha } from "@/lib/security";

const verification = await verifyRecaptcha(token, "login");

if (!verification.success || (verification.score && verification.score < 0.5)) {
  return Response.json({ error: "Verification failed" }, { status: 400 });
}
```

#### Cloudflare Turnstile

```typescript
import { verifyTurnstile } from "@/lib/security";

const verification = await verifyTurnstile(token);

if (!verification.success) {
  return Response.json({ error: "Verification failed" }, { status: 400 });
}
```

---

## Audit Logging

### Overview

Track all security-relevant events for compliance and incident response.

### Features

- **30+ event types**
- **Tamper-proof logs** (SHA-256 hashing)
- **User activity tracking**
- **Security event detection**
- **GDPR compliance**
- **Incident investigation support**

### Event Types

- **Authentication:** login, logout, failed attempts, suspicious logins
- **Authorization:** role changes, access denied
- **Data Access:** read, create, update, delete, export
- **Payments:** initiated, completed, failed, refunded
- **Admin:** user deletion, config changes, feature flags
- **Security:** rate limits, bot detection, attack attempts
- **GDPR:** data export, deletion, consent
- **System:** errors, config changes, backups

### Quick Logging

```typescript
import { AuditLog } from "@/lib/security";

// Authentication
await AuditLog.login(userId, email, ip);
await AuditLog.failedLogin(email, ip);
await AuditLog.suspiciousLogin(userId, email, "Login from new country", ip);

// Data access
await AuditLog.dataExport(userId, email, "user_profile");
await AuditLog.dataDelete(userId, email, "user_account");

// Security events
await AuditLog.rateLimitExceeded(ip, "/api/auth/login");
await AuditLog.botDetected(ip, userAgent, "bad");
await AuditLog.xssAttempt(userId, ip, payload);
await AuditLog.sqlInjectionAttempt(userId, ip, query);

// GDPR
await AuditLog.gdprDataExported(userId, email);
await AuditLog.gdprDataDeleted(userId, email);

// Admin
await AuditLog.userDeleted(adminId, targetUserId, targetEmail);
await AuditLog.configChanged(adminId, "feature_flag", oldValue, newValue);
```

### Custom Events

```typescript
import { logAuditEvent } from "@/lib/security";

await logAuditEvent({
  eventType: "data.update",
  userId: "user123",
  userEmail: "user@example.com",
  ipAddress: "1.2.3.4",
  resource: "profile",
  action: "Updated profile picture",
  result: "success",
  severity: "low",
  metadata: { field: "avatar", oldValue: "old.jpg", newValue: "new.jpg" },
});
```

### Querying Logs

```typescript
import { queryAuditLogs, getSecuritySummary } from "@/lib/security";

// Get all logs for user
const userLogs = queryAuditLogs({
  userId: "user123",
  limit: 100,
});

// Get security events
const securityEvents = queryAuditLogs({
  eventType: "security.bot_detected",
  startDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24h
});

// Get security summary
const summary = getSecuritySummary(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
console.log(summary.criticalEvents);
```

---

## GDPR Compliance

### Overview

Tools to comply with GDPR requirements (Right to Access, Right to Erasure, etc.).

### Features

- **Right to Access** (data export)
- **Right to Erasure** (data deletion/anonymization)
- **Right to Rectification**
- **Consent management**
- **Data retention policies**
- **PII detection and redaction**
- **Privacy policy template**

### Data Export

```typescript
import { exportUserData } from "@/lib/security";

// Export all user data
const exportData = await exportUserData(userId, userEmail);

// Send as download
return Response.json(exportData, {
  headers: {
    "Content-Type": "application/json",
    "Content-Disposition": `attachment; filename="user-data-${userId}.json"`,
  },
});
```

### Data Deletion

```typescript
import { deleteUserData, anonymizeUserData } from "@/lib/security";

// Delete user data
const result = await deleteUserData(userId, userEmail, {
  keepAuditLogs: true, // Required for compliance
  keepPaymentRecords: true, // Required for tax/legal
  anonymize: true, // Anonymize instead of hard delete
});

console.log("Deleted records:", result.deletedRecords);

// Or just anonymize
await anonymizeUserData(userId);
```

### Consent Management

```typescript
import { recordConsent, hasConsent, revokeConsent } from "@/lib/security";

// Record consent
await recordConsent({
  userId,
  consentType: "marketing_emails",
  consentGiven: true,
  ipAddress: req.ip,
  userAgent: req.headers.get("user-agent"),
});

// Check consent
const hasMarketingConsent = await hasConsent(userId, "marketing_emails");

// Revoke consent
await revokeConsent(userId, "marketing_emails");
```

### PII Detection

```typescript
import { detectPII, redactPII } from "@/lib/security";

const text = "Contact me at john@example.com or call 555-123-4567";

const detection = detectPII(text);
console.log(detection);
// { hasPII: true, types: ["email", "phone"] }

const redacted = redactPII(text);
console.log(redacted);
// "Contact me at [EMAIL REDACTED] or call [PHONE REDACTED]"
```

---

## Implementation Examples

### Secure API Route Template

```typescript
// src/app/api/secure-endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  rateLimit,
  RateLimiters,
  validateRequest,
  detectXSS,
  detectSQLInjection,
  AuditLog,
} from "@/lib/security";
import { auth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  data: z.string().max(1000),
});

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const limitResult = await rateLimit(RateLimiters.api)(req);
  if (limitResult) return limitResult;

  // 2. Authentication
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. Parse and validate input
  const body = await req.json();
  const validation = await validateRequest(body, schema);

  if (!validation.success) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  const { data } = validation.data;

  // 4. Attack detection
  if (detectXSS(data) || detectSQLInjection(data)) {
    await AuditLog.suspiciousActivity(
      session.user.id,
      session.user.email,
      req.headers.get("x-forwarded-for") || ""
    );
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // 5. Process request
  try {
    // Business logic here...

    // 6. Audit log
    await AuditLog.dataCreate(session.user.id, session.user.email, "resource");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

### Secure Form Component

```tsx
"use client";

import { useState } from "react";
import { verifyHCaptcha } from "@/lib/security";

export function SecureForm() {
  const [formLoadTime] = useState(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        message: formData.get("message"),
        _honeypot: formData.get("_honeypot"),
        formLoadTime,
        captchaToken: formData.get("h-captcha-response"),
      }),
    });

    // Handle response...
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" required />
      <textarea name="message" required />

      {/* Honeypot */}
      <input
        type="text"
        name="_honeypot"
        style={{ position: "absolute", left: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* hCaptcha */}
      <div
        className="h-captcha"
        data-sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Security Checklist

### Pre-Launch

- [ ] All API routes have rate limiting
- [ ] All forms have input validation
- [ ] All forms have CAPTCHA or honeypot
- [ ] Security headers configured
- [ ] CSP configured for your domains
- [ ] Audit logging enabled
- [ ] Error messages don't leak sensitive info
- [ ] Secrets not in code (use env vars)
- [ ] HTTPS enforced (HSTS enabled)
- [ ] Database connections encrypted
- [ ] File uploads validated
- [ ] CORS configured correctly
- [ ] Bot detection enabled
- [ ] Webhook signatures verified

### Post-Launch

- [ ] Monitor audit logs daily
- [ ] Review rate limit violations
- [ ] Check for attack attempts
- [ ] Update dependencies weekly
- [ ] Run security audits monthly
- [ ] Test incident response quarterly
- [ ] Review access controls monthly
- [ ] Rotate secrets quarterly
- [ ] Update privacy policy as needed
- [ ] Backup audit logs

### Compliance

- [ ] Privacy policy published
- [ ] Cookie policy published
- [ ] Terms of service published
- [ ] GDPR data export working
- [ ] GDPR data deletion working
- [ ] Consent management implemented
- [ ] Data retention policies set
- [ ] PII redaction in logs
- [ ] Security incident response plan
- [ ] Data breach notification plan

---

## Incident Response

### Detection

Monitor for:
- Spike in failed login attempts
- Rate limit violations
- XSS/SQL injection attempts
- Unusual data exports
- Multiple bot detections
- GDPR deletion requests
- Suspicious admin actions

### Response Steps

1. **Identify the incident**
   - Check audit logs
   - Review security summary
   - Identify affected users/data

2. **Contain the incident**
   - Block malicious IPs
   - Revoke compromised sessions
   - Disable affected features
   - Enable stricter rate limits

3. **Investigate**
   - Review full audit trail
   - Identify attack vector
   - Assess damage
   - Document findings

4. **Remediate**
   - Patch vulnerabilities
   - Reset compromised credentials
   - Notify affected users
   - Update security measures

5. **Report**
   - Internal incident report
   - User notifications (if PII affected)
   - Regulatory notifications (if required)
   - Update security documentation

### Emergency Contacts

```typescript
// src/lib/security/emergency.ts
export const EMERGENCY_CONTACTS = {
  security_team: "security@fabrk.dev",
  cto: "cto@fabrk.dev",
  legal: "legal@fabrk.dev",
  dpo: "dpo@fabrk.dev", // Data Protection Officer
};
```

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GDPR Official Text](https://gdpr.eu/tag/gdpr/)
- [NextAuth Security](https://next-auth.js.org/configuration/options#security)
- [Stripe Security](https://stripe.com/docs/security)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

---

**Last Updated:** January 2025
**Review Schedule:** Quarterly or after security incidents
