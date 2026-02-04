# Security Best Practices

Complete security hardening guide for production deployment of your Fabrk SaaS.

---

## Table of Contents

1. [Security Philosophy](#security-philosophy)
2. [Authentication Security](#authentication-security)
3. [Authorization & Access Control](#authorization--access-control)
4. [Data Protection](#data-protection)
5. [API Security](#api-security)
6. [Input Validation](#input-validation)
7. [Secrets Management](#secrets-management)
8. [Stripe Security](#stripe-security)
9. [Database Security](#database-security)
10. [Deployment Security](#deployment-security)
11. [Monitoring & Incident Response](#monitoring--incident-response)
12. [Security Checklist](#security-checklist)

---

## Security Philosophy

**Defense in depth:** Multiple layers of security, not one single point of failure.

**Principle of least privilege:** Users and systems have only the permissions they need.

**Security by default:** Secure defaults, explicit opt-in for less secure options.

**Fail securely:** When errors occur, fail in a way that maintains security.

---

## Authentication Security

### Password Security

**Current implementation (✅ Secure):**

```typescript
// src/app/api/auth/register/route.ts
import bcrypt from "bcryptjs";

const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds
```

**Why 12 rounds?**
- 10 rounds: 10ms to hash (fast for attackers)
- 12 rounds: 150ms to hash (good balance)
- 14 rounds: 2+ seconds (too slow for UX)

**Password requirements:**

```typescript
// Enforce strong passwords
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordRegex.test(password)) {
  return NextResponse.json(
    {
      error:
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
    },
    { status: 400 }
  );
}
```

**Recommendations:**
- ✅ Minimum 8 characters (current)
- ✅ Mix of uppercase, lowercase, numbers, symbols
- ✅ Check against common passwords (optional: use zxcvbn library)
- ✅ Rate limit password attempts (5 failed attempts = 15-minute lockout)

### Session Security

**Current implementation (✅ Secure):**

```typescript
// src/lib/auth.ts
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true, // ✅ Not accessible via JavaScript
        sameSite: "lax", // ✅ CSRF protection
        path: "/",
        secure: process.env.NODE_ENV === "production", // ✅ HTTPS only in production
      },
    },
  },
});
```

**Session hardening:**

```typescript
// Add IP address and user agent to session
callbacks: {
  async jwt({ token, user, account }) {
    if (user) {
      token.userId = user.id;
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    if (token) {
      session.user.id = token.userId;
      session.user.role = token.role;
    }
    return session;
  },
},
```

**Recommendations:**
- ✅ HttpOnly cookies (prevents XSS)
- ✅ Secure flag (HTTPS only)
- ✅ SameSite=lax (CSRF protection)
- ⚠️ Consider shorter session duration for sensitive data (7 days)
- ⚠️ Consider session fingerprinting (IP + user agent)

### Multi-Factor Authentication (Optional Enhancement)

**Add MFA with authenticator app:**

```bash
npm install @simplewebauthn/server @simplewebauthn/browser
```

```typescript
// src/app/api/auth/mfa/setup/route.ts
import { generateRegistrationOptions } from "@simplewebauthn/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const options = await generateRegistrationOptions({
    rpName: "Fabrk",
    rpID: "fabrk.dev",
    userID: session.user.id,
    userName: session.user.email,
  });

  // Store challenge in session
  return NextResponse.json(options);
}
```

**When to add MFA:**
- High-value accounts (enterprise tier)
- Admin accounts
- Payment management
- Data export

---

## Authorization & Access Control

### Role-Based Access Control (RBAC)

**Current roles:**

```prisma
// prisma/schema.prisma
enum Role {
  USER
  ADMIN
}

model User {
  id       String @id @default(cuid())
  role     Role   @default(USER)
  // ...
}
```

**Protect admin routes:**

```typescript
// src/app/admin/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return <div>Admin Dashboard</div>;
}
```

**Protect API routes:**

```typescript
// src/app/api/admin/users/route.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

### Resource Ownership

**Ensure users can only access their own data:**

```typescript
// ❌ Bad: Anyone can access any user's payments
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const payments = await prisma.payment.findMany({
    where: { userId },
  });

  return NextResponse.json(payments);
}

// ✅ Good: Only authenticated user can access their own payments
export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payments = await prisma.payment.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(payments);
}
```

---

## Data Protection

### Sensitive Data in Database

**Never store:**
- ❌ Plain-text passwords (use bcrypt)
- ❌ Credit card numbers (use Stripe)
- ❌ Social security numbers (unless required, then encrypt)
- ❌ API keys in database (use environment variables)

**Encrypt at rest:**

```typescript
// For sensitive fields, encrypt before storing
import crypto from "crypto";

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedData: string): string {
  const [ivHex, authTagHex, encrypted] = encryptedData.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
```

**Usage:**

```typescript
// Store encrypted data
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    sensitiveData: encrypt("sensitive value"),
  },
});

// Retrieve and decrypt
const user = await prisma.user.findUnique({ where: { id: userId } });
const decrypted = decrypt(user.sensitiveData);
```

### GDPR Compliance

**User data rights:**

1. **Right to access:** Users can export their data

```typescript
// src/app/api/user/export/route.ts
export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      payments: true,
      sessions: true,
    },
  });

  return NextResponse.json(userData);
}
```

2. **Right to deletion:** Users can delete their account

```typescript
// src/app/api/user/delete/route.ts
export async function DELETE() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Delete all user data (cascading delete)
  await prisma.user.delete({
    where: { id: session.user.id },
  });

  return NextResponse.json({ message: "Account deleted successfully" });
}
```

3. **Data minimization:** Only collect necessary data

---

## API Security

### Rate Limiting

**Prevent brute force attacks:**

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Global rate limit (100 requests per minute per IP)
export const globalRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 m"),
});

// Auth rate limit (5 requests per 15 minutes per IP)
export const authRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15 m"),
});

// Stripe rate limit (10 requests per minute per IP)
export const stripeRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});
```

**Apply in middleware or route:**

```typescript
// src/app/api/auth/register/route.ts
import { authRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  const { success } = await authRateLimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Continue with registration logic
}
```

### CORS Protection

**Restrict API access to your domain:**

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigins = ["https://fabrk.dev", "https://www.fabrk.dev"];

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
```

### CSRF Protection

**Already implemented via NextAuth:**

- Cookies set with `SameSite=lax`
- NextAuth uses CSRF tokens automatically

**For custom forms:**

```typescript
// src/lib/csrf.ts
import { randomBytes } from "crypto";

export function generateCSRFToken(): string {
  return randomBytes(32).toString("hex");
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken;
}
```

---

## Input Validation

### Sanitize All User Input

**Never trust user input:**

```typescript
// ❌ Bad: Directly insert user input into database
const user = await prisma.user.create({
  data: {
    name: req.body.name, // Could be malicious
    email: req.body.email,
  },
});

// ✅ Good: Validate and sanitize
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(100),
});

const validation = registerSchema.safeParse(req.body);
if (!validation.success) {
  return NextResponse.json({ error: "Invalid input" }, { status: 400 });
}

const { name, email, password } = validation.data;
```

### SQL Injection Protection

**Prisma prevents SQL injection:**

```typescript
// ✅ Safe: Prisma uses parameterized queries
const user = await prisma.user.findUnique({
  where: { email: userInput }, // Safe
});

// ❌ Dangerous: Raw SQL with user input
const user = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${userInput}`; // Vulnerable!

// ✅ Safe: Use Prisma's query builder or parameterized raw queries
const user = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${Prisma.sql`${userInput}`}`;
```

### XSS Protection

**Sanitize HTML output:**

```bash
npm install dompurify isomorphic-dompurify
```

```typescript
import DOMPurify from "isomorphic-dompurify";

// ❌ Bad: Directly render user HTML
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Good: Sanitize first
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

**React automatically escapes:**

```tsx
// ✅ Safe: React escapes by default
<div>{userInput}</div> // Even if userInput contains <script>, it's escaped
```

---

## Secrets Management

### Environment Variables

**Never commit secrets:**

```env
# ❌ DON'T commit .env.local to Git
.env.local

# ✅ Commit .env.example with placeholders
.env.example
```

**Rotate secrets regularly:**

```bash
# Regenerate NextAuth secret every 90 days
openssl rand -base64 32

# Update in production (Vercel)
vercel env add NEXTAUTH_SECRET production
```

**Use secret management service (production):**

- Vercel Environment Variables (encrypted at rest)
- AWS Secrets Manager
- HashiCorp Vault
- 1Password or Bitwarden (team)

### API Key Security

**Never expose API keys in client:**

```tsx
// ❌ Bad: Exposes secret key in client bundle
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // Exposed!

// ✅ Good: Only in server components or API routes
// Server Component (safe)
export default async function ServerComponent() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // Safe
}

// Client Component (only use public keys)
"use client";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!); // Safe
```

---

## Stripe Security

### Webhook Signature Verification

**Always verify webhook signatures:**

```typescript
// ✅ Current implementation (secure)
import Stripe from "stripe";

const sig = req.headers.get("stripe-signature");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

try {
  const event = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret);
  // Process event
} catch (err) {
  console.error("Webhook signature verification failed:", err);
  return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
}
```

**Why this matters:**
- Without verification, attackers can fake webhooks
- Could fake payment completions
- Could drain your inventory

### Idempotency

**Prevent duplicate charges:**

```typescript
// ✅ Current implementation (secure)
// Check for existing checkout session
const existingSession = await prisma.checkoutSession.findUnique({
  where: {
    userId_priceId: {
      userId: session.user.id,
      priceId,
    },
  },
});

if (existingSession && existingSession.expiresAt > new Date()) {
  // Return existing session (prevents duplicate)
  return NextResponse.json({ sessionId: existingSession.sessionId });
}
```

### PCI Compliance

**Never handle card data directly:**

- ✅ Use Stripe Checkout (hosted payment page)
- ✅ Use Stripe Elements (tokenized in browser)
- ❌ Never store card numbers in your database
- ❌ Never log card data

---

## Database Security

### Connection Security

**Use SSL for database connections:**

```env
# PostgreSQL with SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# Verify SSL certificate
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=verify-full"
```

### Backup & Recovery

**Automated backups:**

- **Vercel Postgres:** Daily automated backups (7-day retention)
- **Supabase:** Point-in-time recovery (PITR)
- **AWS RDS:** Automated backups (configurable retention)

**Manual backup:**

```bash
# Backup database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore database
psql $DATABASE_URL < backup-20250106.sql
```

**Test restores quarterly.**

### Database Access Control

**Principle of least privilege:**

```sql
-- Create read-only user for analytics
CREATE USER analytics_user WITH PASSWORD 'secure_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_user;

-- Create read-write user for app
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
```

---

## Deployment Security

### HTTPS Enforcement

**Enforce HTTPS in production:**

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Redirect HTTP to HTTPS in production
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get("host")}${request.nextUrl.pathname}`,
      301
    );
  }

  return NextResponse.next();
}
```

### Security Headers

**Add security headers:**

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Content Security Policy (CSP)

**Prevent XSS attacks:**

```typescript
// next.config.ts
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  connect-src 'self' https://api.stripe.com;
  frame-src 'self' https://js.stripe.com https://checkout.stripe.com;
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};
```

### Dependency Security

**Audit dependencies regularly:**

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force
```

**Use Dependabot (GitHub):**
- Automatically creates PRs for dependency updates
- Includes security advisories

**Update dependencies quarterly:**

```bash
# Update to latest versions
npm update

# Check outdated packages
npm outdated

# Update major versions manually
npm install package-name@latest
```

---

## Monitoring & Incident Response

### Security Monitoring

**Monitor for suspicious activity:**

1. **Failed login attempts:**
   ```typescript
   // Log failed logins
   if (!user || !validPassword) {
     await logSecurityEvent("failed_login", { email, ip });
   }
   ```

2. **Unusual access patterns:**
   - Login from new country/IP
   - Multiple accounts from same IP
   - Rapid API requests

3. **Data access:**
   - Admin viewing sensitive data
   - Bulk data exports
   - Database query errors (SQL injection attempts)

### Incident Response Plan

**When security incident occurs:**

1. **Immediate (0-15 minutes):**
   - Assess severity (data breach, unauthorized access, DDoS)
   - Contain threat (disable compromised accounts, block IPs)
   - Document timeline

2. **Short-term (15 minutes - 24 hours):**
   - Investigate root cause
   - Patch vulnerability
   - Reset compromised credentials
   - Notify affected users (if data breach)

3. **Long-term (1-7 days):**
   - Write post-mortem
   - Implement preventive measures
   - Update security policies
   - Train team on lessons learned

### Security Contacts

**Prepare contact list:**
- Security lead (you)
- Infrastructure provider (Vercel support)
- Database provider (Vercel/Supabase support)
- Legal counsel (if data breach)
- PR/Communications (if public incident)

---

## Security Checklist

### Pre-Launch
- [ ] All passwords hashed with bcrypt (12+ rounds)
- [ ] Session cookies: httpOnly, secure, sameSite=lax
- [ ] Rate limiting enabled on all auth routes
- [ ] Input validation on all API routes (Zod)
- [ ] HTTPS enforced in production
- [ ] Security headers configured
- [ ] Stripe webhook signature verification
- [ ] No secrets in Git repository
- [ ] Environment variables set in Vercel
- [ ] Database connection uses SSL

### Post-Launch
- [ ] Monitor failed login attempts daily
- [ ] Review access logs weekly
- [ ] Run `npm audit` weekly
- [ ] Update dependencies monthly
- [ ] Rotate secrets quarterly (90 days)
- [ ] Test backups quarterly
- [ ] Review permissions quarterly
- [ ] Security training for team (if applicable)

### Ongoing
- [ ] Respond to security advisories within 48 hours
- [ ] Keep Next.js and dependencies up to date
- [ ] Monitor Stripe webhooks for anomalies
- [ ] Check for unusual database activity
- [ ] Document security incidents

---

## Additional Resources

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Next.js Security:** https://nextjs.org/docs/app/building-your-application/configuring/security
- **Stripe Security:** https://stripe.com/docs/security/guide
- **Prisma Security:** https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#sql-injection

---

**Security is not a one-time task. It's an ongoing practice. Stay vigilant. 🔒**

**Questions? Email support@fabrk.dev.**
