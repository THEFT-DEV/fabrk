# API Reference

Complete API documentation for Fabrk's backend routes.

---

## Table of Contents

1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Auth API Routes](#auth-api-routes)
4. [Stripe API Routes](#stripe-api-routes)
5. [Webhook Routes](#webhook-routes)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Testing](#testing)

---

## API Overview

### Base URL

```
Development: http://localhost:3000/api
Production:  https://fabrk.dev/api
```

### Authentication

All protected routes require a valid session cookie from NextAuth.

**Session cookie:** `next-auth.session-token` (httpOnly, secure)

### Response Format

**Success:**
```json
{
  "data": { ... },
  "message": "Success message"
}
```

**Error:**
```json
{
  "error": "Error message"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request (validation error) |
| 401  | Unauthorized (not logged in) |
| 403  | Forbidden (logged in but no permission) |
| 404  | Not Found |
| 409  | Conflict (duplicate resource) |
| 429  | Too Many Requests (rate limited) |
| 500  | Internal Server Error |

---

## Authentication

### Session Management

**Get current session:**

```typescript
import { auth } from "@/lib/auth";

const session = await auth();
// session.user = { id, name, email, role }
```

**Protect API routes:**

```typescript
// src/app/api/protected/route.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Protected logic
  return NextResponse.json({ data: "Protected data" });
}
```

---

## Auth API Routes

### POST /api/auth/register

Register a new user.

**Request:**

```typescript
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (Success):**

```json
{
  "message": "Registration successful. Please check your email to verify your account."
}
```

**Response (Error - User Exists):**

```json
{
  "error": "User with this email already exists"
}
```

**Status Codes:**
- 201: User created
- 400: Validation error
- 409: User already exists
- 500: Server error

**Validation Rules:**
- `name`: Required, min 2 characters
- `email`: Required, valid email format
- `password`: Required, min 8 characters

**Side Effects:**
- Creates user in database
- Sends verification email
- Creates verification token (24-hour expiry)

---

### POST /api/auth/verify-email

Verify user's email address.

**Request:**

```typescript
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "abc123xyz..."
}
```

**Response (Success):**

```json
{
  "message": "Email verified successfully. You can now log in."
}
```

**Response (Error - Invalid Token):**

```json
{
  "error": "Invalid or expired verification token"
}
```

**Status Codes:**
- 200: Email verified
- 400: Missing token
- 401: Invalid or expired token
- 500: Server error

**Side Effects:**
- Sets `user.emailVerified` to current timestamp
- Deletes verification token

---

### POST /api/auth/forgot-password

Request password reset.

**Request:**

```typescript
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response (Success):**

```json
{
  "message": "If an account exists with this email, you will receive a password reset link."
}
```

**Status Codes:**
- 200: Always returns success (security: don't reveal if email exists)
- 400: Invalid email format
- 500: Server error

**Side Effects:**
- Generates reset token (1-hour expiry)
- Sends reset email (if user exists)

---

### POST /api/auth/reset-password

Reset password with token.

**Request:**

```typescript
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "xyz789...",
  "password": "NewSecurePass123!"
}
```

**Response (Success):**

```json
{
  "message": "Password reset successful. You can now log in with your new password."
}
```

**Response (Error - Invalid Token):**

```json
{
  "error": "Invalid or expired reset token"
}
```

**Status Codes:**
- 200: Password reset
- 400: Validation error
- 401: Invalid or expired token
- 500: Server error

**Side Effects:**
- Updates user password (bcrypt hashed)
- Clears reset token
- Invalidates all existing sessions

---

### POST /api/auth/resend-verification

Resend verification email.

**Request:**

```typescript
POST /api/auth/resend-verification
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response (Success):**

```json
{
  "message": "Verification email sent. Please check your inbox."
}
```

**Response (Error - Already Verified):**

```json
{
  "error": "Email is already verified"
}
```

**Status Codes:**
- 200: Email sent
- 400: User not found or already verified
- 429: Rate limited (max 3 emails per hour)
- 500: Server error

**Side Effects:**
- Generates new verification token
- Sends verification email

---

### POST /api/auth/signin

Sign in with credentials (handled by NextAuth).

**Endpoint:** `/api/auth/signin`

**Managed by NextAuth.** Use the built-in sign-in page or custom form.

**Custom form example:**

```tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert("Invalid credentials");
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

---

### POST /api/auth/signout

Sign out current user (handled by NextAuth).

**Endpoint:** `/api/auth/signout`

**Usage:**

```tsx
"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })}>
      Sign Out
    </button>
  );
}
```

---

## Stripe API Routes

### POST /api/stripe/checkout

Create Stripe checkout session.

**Request:**

```typescript
POST /api/stripe/checkout
Content-Type: application/json
Cookie: next-auth.session-token=...

{
  "priceId": "price_1234567890"
}
```

**Response (Success):**

```json
{
  "sessionId": "cs_test_1234567890",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

**Response (Error - Unauthorized):**

```json
{
  "error": "Please sign in to continue"
}
```

**Status Codes:**
- 200: Session created
- 400: Invalid price ID
- 401: Not authenticated
- 500: Server error

**Side Effects:**
- Creates Stripe checkout session
- Stores session ID in `CheckoutSession` table (prevents duplicates)
- Session expires in 24 hours

**Usage Example:**

```tsx
"use client";

async function handleCheckout() {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL,
    }),
  });

  const { url } = await res.json();
  window.location.href = url; // Redirect to Stripe
}
```

---

### POST /api/stripe/portal

Create Stripe customer portal session.

**Request:**

```typescript
POST /api/stripe/portal
Cookie: next-auth.session-token=...
```

**Response (Success):**

```json
{
  "url": "https://billing.stripe.com/session/..."
}
```

**Response (Error - No Customer):**

```json
{
  "error": "No Stripe customer found. Please make a purchase first."
}
```

**Status Codes:**
- 200: Portal session created
- 401: Not authenticated
- 404: No Stripe customer ID
- 500: Server error

**Usage Example:**

```tsx
"use client";

async function openCustomerPortal() {
  const res = await fetch("/api/stripe/portal", {
    method: "POST",
  });

  const { url } = await res.json();
  window.location.href = url; // Redirect to Stripe portal
}
```

---

### GET /api/stripe/verify

Verify payment status.

**Request:**

```typescript
GET /api/stripe/verify?sessionId=cs_test_...
Cookie: next-auth.session-token=...
```

**Response (Success - Payment Complete):**

```json
{
  "status": "complete",
  "payment": {
    "id": "pay_1234567890",
    "amount": 7900,
    "status": "succeeded"
  }
}
```

**Response (Pending):**

```json
{
  "status": "pending"
}
```

**Status Codes:**
- 200: Status retrieved
- 400: Missing session ID
- 401: Not authenticated
- 500: Server error

---

## Webhook Routes

### POST /api/webhooks/stripe

Stripe webhook handler.

**Request:**

```typescript
POST /api/webhooks/stripe
Stripe-Signature: t=...,v1=...
Content-Type: application/json

{
  "type": "checkout.session.completed",
  "data": { ... }
}
```

**Response (Success):**

```json
{
  "received": true
}
```

**Response (Error - Invalid Signature):**

```json
{
  "error": "Invalid signature"
}
```

**Status Codes:**
- 200: Webhook processed
- 400: Invalid signature or payload
- 500: Server error

**Supported Events:**

1. **checkout.session.completed**
   - Triggers when checkout completes
   - Creates `Payment` record
   - Updates `User.customerId`
   - Sends welcome email

2. **payment_intent.succeeded**
   - Triggers when payment succeeds
   - Updates payment status to "succeeded"

3. **payment_intent.payment_failed**
   - Triggers when payment fails
   - Updates payment status to "failed"
   - Logs error for investigation

**Idempotency:**

Webhooks are deduplicated using the `WebhookEvent` table. Each event ID is stored, and duplicate events are ignored.

**Testing Locally:**

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Listen to webhooks
npm run stripe:listen

# Terminal 3: Trigger test event
stripe trigger checkout.session.completed
```

**Configure in Production:**

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://fabrk.dev/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook signing secret
5. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

---

## Error Handling

### Standard Error Response

All errors return this format:

```json
{
  "error": "Human-readable error message"
}
```

### Error Types

**Validation Errors (400):**

```json
{
  "error": "Invalid email format"
}
```

**Authentication Errors (401):**

```json
{
  "error": "Please sign in to continue"
}
```

**Authorization Errors (403):**

```json
{
  "error": "You don't have permission to access this resource"
}
```

**Not Found Errors (404):**

```json
{
  "error": "Resource not found"
}
```

**Conflict Errors (409):**

```json
{
  "error": "User with this email already exists"
}
```

**Server Errors (500):**

```json
{
  "error": "An unexpected error occurred. Please try again."
}
```

### Error Logging

All errors are logged to console (or Sentry if configured):

```typescript
try {
  // API logic
} catch (error) {
  console.error("Error in /api/route:", error);
  return NextResponse.json(
    { error: "An unexpected error occurred" },
    { status: 500 }
  );
}
```

---

## Rate Limiting

**Rate limits (per IP):**

| Endpoint | Limit | Window |
|----------|-------|--------|
| /api/auth/register | 5 requests | 15 minutes |
| /api/auth/resend-verification | 3 requests | 1 hour |
| /api/auth/forgot-password | 3 requests | 1 hour |
| /api/stripe/checkout | 10 requests | 1 minute |
| All other routes | 100 requests | 1 minute |

**Rate limit response (429):**

```json
{
  "error": "Too many requests. Please try again later."
}
```

**Implementation (Optional - Add in Production):**

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});

// Usage in route:
const { success } = await ratelimit.limit(ip);
if (!success) {
  return NextResponse.json(
    { error: "Too many requests" },
    { status: 429 }
  );
}
```

---

## Testing

### Testing with cURL

**Register user:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

**Create checkout session (requires session cookie):**

```bash
curl -X POST http://localhost:3000/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "priceId": "price_1234567890"
  }'
```

### Testing with Postman

1. Import collection (or create manually)
2. Set base URL: `http://localhost:3000/api`
3. For authenticated routes:
   - Sign in via browser
   - Copy `next-auth.session-token` cookie
   - Add to Postman request headers

### Integration Tests

**Example test (src/app/api/auth/register/route.test.ts):**

```typescript
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("POST /api/auth/register", () => {
  it("registers a new user", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "SecurePass123!",
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.message).toContain("Registration successful");
  });

  it("returns error for existing user", async () => {
    // First registration
    await POST(/* ... */);

    // Duplicate registration
    const req = new NextRequest(/* ... */);
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(409);
    expect(data.error).toContain("already exists");
  });
});
```

**Run tests:**

```bash
npm install vitest @vitejs/plugin-react
npm run test
```

---

## API Quick Reference

**Authentication:**
```
POST   /api/auth/register             Register new user
POST   /api/auth/verify-email         Verify email
POST   /api/auth/forgot-password      Request password reset
POST   /api/auth/reset-password       Reset password
POST   /api/auth/resend-verification  Resend verification email
POST   /api/auth/signin               Sign in (NextAuth)
POST   /api/auth/signout              Sign out (NextAuth)
```

**Stripe:**
```
POST   /api/stripe/checkout           Create checkout session
POST   /api/stripe/portal             Create customer portal
GET    /api/stripe/verify             Verify payment status
```

**Webhooks:**
```
POST   /api/webhooks/stripe           Stripe webhook handler
```

---

## Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_STARTER="price_..."
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="price_..."
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="price_..."

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@fabrk.dev"

# Optional: Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

---

## Additional Resources

- **NextAuth Docs:** https://next-auth.js.org/
- **Stripe Docs:** https://stripe.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

**Questions? Email support@fabrk.dev.**

**API Reference complete. Happy building! 🚀**
