# Troubleshooting Guide

Common issues and solutions when working with Fabrk.

---

## Table of Contents

1. [Development Server Issues](#development-server-issues)
2. [Database Issues](#database-issues)
3. [Authentication Issues](#authentication-issues)
4. [Stripe Integration Issues](#stripe-integration-issues)
5. [Email Issues](#email-issues)
6. [Deployment Issues](#deployment-issues)
7. [Build Errors](#build-errors)
8. [Performance Issues](#performance-issues)
9. [Environment Variable Issues](#environment-variable-issues)
10. [Quick Diagnostics](#quick-diagnostics)

---

## Development Server Issues

### Issue: npm run dev fails with "Port 3000 already in use"

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

---

### Issue: Turbopack fails to start

**Error:**
```
Error: Turbopack failed to start
```

**Solution:**

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Restart dev server
npm run dev
```

---

### Issue: Hot Module Replacement (HMR) not working

**Symptoms:** Changes to files don't refresh the browser

**Solution:**

```bash
# 1. Restart dev server
# 2. Clear browser cache
# 3. Check if using WSL (Windows Subsystem for Linux)

# For WSL, add to next.config.ts:
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};
```

---

## Database Issues

### Issue: Prisma Client not generated

**Error:**
```
Cannot find module '@prisma/client'
```

**Solution:**

```bash
# Generate Prisma Client
npx prisma generate

# If still fails, reinstall
npm install @prisma/client

# Generate again
npx prisma generate
```

---

### Issue: Database connection fails

**Error:**
```
PrismaClientInitializationError: Can't reach database server
```

**Solutions:**

**1. Check DATABASE_URL:**

```bash
# .env.local
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

**2. Verify database is running:**

```bash
# For local PostgreSQL
brew services list | grep postgresql
# Or
sudo service postgresql status
```

**3. Test connection:**

```bash
psql $DATABASE_URL
```

**4. For remote database (Vercel Postgres, Supabase):**

- Check if IP is whitelisted
- Verify SSL mode: `?sslmode=require`
- Check credentials in provider dashboard

---

### Issue: Prisma migration fails

**Error:**
```
Error: P3009: Failed to migrate
```

**Solution:**

```bash
# Reset database (⚠️ Deletes all data)
npx prisma migrate reset

# Or push schema without migration
npx prisma db push
```

---

### Issue: Slow database queries

**Symptoms:** API routes timing out, slow page loads

**Solution:**

**1. Check for N+1 queries:**

```typescript
// ❌ Bad: N+1 query
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { userId: user.id } });
}

// ✅ Good: Single query with include
const users = await prisma.user.findMany({
  include: { posts: true },
});
```

**2. Add indexes:**

```prisma
// prisma/schema.prisma
model User {
  id    String @id
  email String @unique

  @@index([email]) // Add index
}
```

```bash
npm run db:push
```

**3. Enable query logging:**

```typescript
// src/lib/prisma.ts
const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});
```

---

## Authentication Issues

### Issue: "Unauthorized" after successful login

**Symptoms:** User logged in but session not found

**Solutions:**

**1. Check NextAuth configuration:**

```typescript
// src/lib/auth.ts
import { auth } from "@/lib/auth";

// Ensure auth() is called correctly
const session = await auth();
```

**2. Check cookie settings:**

```typescript
// For localhost development
cookies: {
  sessionToken: {
    options: {
      secure: false, // Set to false for localhost
    },
  },
},
```

**3. Clear cookies and try again:**

```javascript
// In browser console
document.cookie.split(";").forEach((c) => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
```

---

### Issue: Email verification link expired

**Error:**
```
Invalid or expired verification token
```

**Solution:**

```bash
# Resend verification email
POST /api/auth/resend-verification
{
  "email": "user@example.com"
}
```

**Or manually update user in database:**

```sql
-- Mark user as verified
UPDATE "User" SET "emailVerified" = NOW() WHERE email = 'user@example.com';
```

---

### Issue: Password reset not working

**Symptoms:** Reset email not received or link invalid

**Solutions:**

**1. Check email service (Resend):**

```bash
# Verify RESEND_API_KEY is set
echo $RESEND_API_KEY

# Check Resend logs: https://resend.com/logs
```

**2. Check token expiry:**

```typescript
// Tokens expire after 1 hour
// Regenerate token:
POST /api/auth/forgot-password
{
  "email": "user@example.com"
}
```

**3. Check spam folder**

---

### Issue: OAuth (Google) not working

**Error:**
```
OAuthAccountNotLinked
```

**Solutions:**

**1. Verify Google OAuth credentials:**

```env
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

**2. Check authorized redirect URIs in Google Console:**

```
http://localhost:3000/api/auth/callback/google (dev)
https://fabrk.dev/api/auth/callback/google (production)
```

**3. Clear existing account with same email:**

```sql
-- Delete conflicting account
DELETE FROM "Account" WHERE "userId" = 'user-id';
```

---

## Stripe Integration Issues

### Issue: Stripe webhook not firing locally

**Symptoms:** Checkout completes but no database record created

**Solution:**

**1. Install Stripe CLI:**

```bash
brew install stripe/stripe-cli/stripe
# Or download: https://stripe.com/docs/stripe-cli
```

**2. Login to Stripe:**

```bash
stripe login
```

**3. Listen to webhooks:**

```bash
npm run stripe:listen
# Or: stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**4. Copy webhook secret to .env.local:**

```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**5. Restart dev server**

---

### Issue: Stripe checkout session creation fails

**Error:**
```
Invalid price ID
```

**Solutions:**

**1. Verify price ID in Stripe Dashboard:**

- Go to Stripe Dashboard → Products
- Copy Price ID (starts with `price_`)
- Update `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="price_1234567890"
```

**2. Check Stripe mode (test vs live):**

```env
# Test mode keys start with:
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Live mode keys start with:
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

---

### Issue: Webhook signature verification fails

**Error:**
```
Webhook signature verification failed
```

**Solutions:**

**1. Check webhook secret matches:**

```bash
# Local: Copy from `stripe listen` output
# Production: Copy from Stripe Dashboard → Webhooks
```

**2. Verify raw body is passed to webhook:**

```typescript
// next.config.ts - bodyParser should be disabled for webhooks
export const config = {
  api: {
    bodyParser: false, // Important!
  },
};
```

**3. Check webhook endpoint URL:**

```
Local: http://localhost:3000/api/webhooks/stripe
Production: https://fabrk.dev/api/webhooks/stripe
```

---

### Issue: Duplicate checkout sessions

**Symptoms:** User charged twice when refreshing checkout page

**Solution:**

Already handled by `CheckoutSession` table. If still occurring:

```typescript
// Check implementation in src/app/api/stripe/checkout/route.ts
const existingSession = await prisma.checkoutSession.findUnique({
  where: {
    userId_priceId: { userId, priceId },
  },
});

if (existingSession && existingSession.expiresAt > new Date()) {
  return NextResponse.json({ sessionId: existingSession.sessionId });
}
```

---

## Email Issues

### Issue: Emails not sending

**Symptoms:** Registration works but no verification email

**Solutions:**

**1. Check Resend API key:**

```bash
echo $RESEND_API_KEY
# Should output: re_...
```

**2. Verify domain in Resend:**

- Go to [resend.com/domains](https://resend.com/domains)
- Add domain: `fabrk.dev`
- Add DNS records (SPF, DKIM, DMARC)
- Verify domain status: ✅ Verified

**3. Check email logs in Resend:**

- Go to [resend.com/emails](https://resend.com/emails)
- Check for failed sends
- View error messages

**4. Test email sending:**

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "noreply@fabrk.dev",
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

---

### Issue: Emails going to spam

**Solutions:**

**1. Verify DNS records:**

```bash
# Check SPF record
dig TXT fabrk.dev | grep spf

# Check DKIM record
dig TXT resend._domainkey.fabrk.dev

# Check DMARC record
dig TXT _dmarc.fabrk.dev
```

**2. Use verified "From" address:**

```env
EMAIL_FROM="noreply@fabrk.dev" # Must be verified domain
```

**3. Improve email content:**

- Avoid spam trigger words ("free", "act now", "limited time")
- Include plain text version
- Add unsubscribe link
- Don't send from `@gmail.com` or free email

---

## Deployment Issues

### Issue: Vercel build fails

**Error:**
```
Error: Build failed with exit code 1
```

**Solutions:**

**1. Check build logs in Vercel dashboard**

**2. Test build locally:**

```bash
npm run build
```

**3. Common fixes:**

```bash
# Clear Next.js cache
rm -rf .next

# Update dependencies
npm install

# Fix TypeScript errors
npm run type-check

# Fix ESLint errors
npm run lint
```

---

### Issue: Environment variables not set in production

**Symptoms:** App works locally but fails in production

**Solution:**

**1. Add environment variables in Vercel:**

- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Add all variables from `.env.local`
- Select environments: Production, Preview, Development
- Redeploy

**2. Verify variables are set:**

```bash
vercel env ls
```

**3. Don't use `process.env.VARIABLE` in client components:**

```tsx
// ❌ Won't work in client components
"use client";
const apiKey = process.env.STRIPE_SECRET_KEY; // undefined

// ✅ Use NEXT_PUBLIC_ prefix for client-side variables
const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY; // works
```

---

### Issue: Database not accessible from Vercel

**Error:**
```
Can't reach database server
```

**Solutions:**

**1. Verify DATABASE_URL in Vercel:**

- Must include `?sslmode=require` for remote databases

**2. Whitelist Vercel IPs (if using self-hosted DB):**

- Vercel uses dynamic IPs
- Consider using Vercel Postgres instead

**3. Test connection from Vercel:**

```typescript
// Add /api/test-db route
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "Database connected" });
  } catch (error) {
    return NextResponse.json({ status: "Database error", error: error.message });
  }
}
```

---

### Issue: CORS errors in production

**Error:**
```
Access to fetch at 'https://api.fabrk.dev' from origin 'https://fabrk.dev' has been blocked by CORS
```

**Solution:**

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://fabrk.dev" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};
```

---

## Build Errors

### Issue: TypeScript errors during build

**Error:**
```
Type error: Property 'X' does not exist on type 'Y'
```

**Solution:**

```bash
# Check TypeScript errors
npm run type-check

# Common fixes:

# 1. Regenerate Prisma Client
npx prisma generate

# 2. Clear TypeScript cache
rm -rf .next tsconfig.tsbuildinfo

# 3. Check imports
# Make sure you're importing from correct paths

# 4. Check type definitions
# Verify all custom types are properly defined
```

---

### Issue: Module not found error

**Error:**
```
Module not found: Can't resolve '@/components/...'
```

**Solution:**

```bash
# 1. Check tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# 2. Restart TypeScript server (VS Code)
# Cmd+Shift+P → "TypeScript: Restart TS Server"

# 3. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: Dynamic import errors

**Error:**
```
Error: Element type is invalid: expected a string but got: object
```

**Solution:**

```tsx
// ❌ Wrong
import dynamic from "next/dynamic";
const Component = dynamic(() => import("./component"));

// ✅ Correct
const Component = dynamic(() => import("./component").then((mod) => mod.Component));

// Or with default export
const Component = dynamic(() => import("./component"));
```

---

## Performance Issues

### Issue: Slow page loads

**Symptoms:** Pages take >5 seconds to load

**Diagnostics:**

```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse https://fabrk.dev --view

# Check bundle size
npm run build
# Look for large chunks
```

**Solutions:**

**1. Optimize images:**

```tsx
// Use Next.js Image component
import Image from "next/image";

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority // For above-fold images
/>
```

**2. Lazy load heavy components:**

```tsx
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  ssr: false,
  loading: () => <div>Loading chart...</div>,
});
```

**3. Check database query performance:**

```typescript
// Enable query logging
const prisma = new PrismaClient({
  log: ["query"],
});

// Look for slow queries (>100ms)
```

---

### Issue: High memory usage

**Symptoms:** Vercel function timeouts, out-of-memory errors

**Solution:**

```typescript
// 1. Limit data fetched from database
const users = await prisma.user.findMany({
  take: 100, // Limit to 100
  select: { id: true, name: true }, // Select only needed fields
});

// 2. Use pagination
const users = await prisma.user.findMany({
  skip: (page - 1) * 20,
  take: 20,
});

// 3. Use streaming for large responses
import { ReadableStream } from "stream/web";

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const users = await prisma.user.findMany();
      for (const user of users) {
        controller.enqueue(JSON.stringify(user) + "\n");
      }
      controller.close();
    },
  });

  return new Response(stream);
}
```

---

## Environment Variable Issues

### Issue: Environment variables undefined

**Symptoms:** `process.env.VARIABLE` returns `undefined`

**Solutions:**

**1. Check file name:**

```bash
# Must be named exactly:
.env.local (not .env or env.local)
```

**2. Restart dev server:**

```bash
# Environment variables loaded on server start
npm run dev
```

**3. Check variable prefix:**

```env
# Server-side only (API routes, Server Components)
SECRET_KEY="abc123"

# Client-side (accessible in browser)
NEXT_PUBLIC_API_KEY="abc123"
```

**4. Verify in code:**

```typescript
// API route or Server Component
console.log("Server-side:", process.env.SECRET_KEY); // Works

// Client Component
"use client";
console.log("Client-side:", process.env.SECRET_KEY); // undefined
console.log("Client-side:", process.env.NEXT_PUBLIC_API_KEY); // Works
```

---

## Quick Diagnostics

### Run All Checks

```bash
# 1. Check Node version
node -v
# Should be: v18.17.0 or higher

# 2. Check npm version
npm -v
# Should be: 9.0.0 or higher

# 3. Check dependencies
npm list --depth=0

# 4. Check TypeScript
npm run type-check

# 5. Check ESLint
npm run lint

# 6. Check build
npm run build

# 7. Check database connection
npx prisma db push --preview-feature

# 8. Check environment variables
cat .env.local | grep -v "^#" | grep -v "^$"
```

---

### Common Fix Sequence

**When in doubt, try this sequence:**

```bash
# 1. Clear caches
rm -rf .next node_modules package-lock.json

# 2. Reinstall dependencies
npm install

# 3. Regenerate Prisma Client
npx prisma generate

# 4. Push database schema
npm run db:push

# 5. Start dev server
npm run dev
```

---

## Getting Help

If you've tried the solutions above and still have issues:

### 1. Check existing documentation

- `docs/QUICK-START.md`
- `docs/DEPLOYMENT.md`
- `docs/API-REFERENCE.md`
- `docs/CLAUDE.md` (architecture reference)

### 2. Search email

- Search for your error message
- Check #help channel

### 3. Create a support request

**Include:**
- Error message (full stack trace)
- Steps to reproduce
- What you've tried
- Environment (local, preview, production)
- Node version, npm version
- Relevant code snippets

**Email:** support@fabrk.dev

**Response time:** Within 24 hours

---

**Most issues can be resolved by clearing caches and restarting. When in doubt, clear everything and start fresh. 🔧**
