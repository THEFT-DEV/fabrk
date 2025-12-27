# Release Notes - v1.1.0

**Release Date:** November 2025
**Branch:** `qa-cleanup` → `main`

---

## Overview

Version 1.1.0 introduces three major security and billing features:

1. **Two-Factor Authentication (2FA)** - TOTP-based MFA with QR code setup
2. **Trial Period System** - Stripe subscription trial checkout flow
3. **Cloud Storage** - S3/R2 auto-detection with local fallback

This release also includes important improvements to cookie consent handling, CSRF protection, and comprehensive test coverage.

---

## New Features

### Two-Factor Authentication (2FA)

Full TOTP (Time-based One-Time Password) implementation for enhanced account security.

**Capabilities:**
- QR code setup modal for authenticator apps (Google Authenticator, Authy, etc.)
- Manual secret key entry option
- 6-digit verification code input (OTP)
- 10 backup codes for account recovery (XXXX-XXXX format)
- Enable/disable toggle with confirmation dialog
- Security settings page integration

**Technical Details:**
- RFC 6238 compliant TOTP algorithm
- SHA-256 hashed backup codes
- Timing-safe comparison for security
- Audit logging for MFA events

**Files Added/Modified:**
- `src/lib/auth/mfa.ts` - Core MFA logic
- `src/app/api/user/2fa/setup/route.ts` - Setup endpoint
- `src/app/api/user/2fa/verify/route.ts` - Verification endpoint
- `src/components/security/security-settings.tsx` - UI component

---

### Trial Period System

Stripe-integrated trial checkout flow with configurable trial duration.

**Capabilities:**
- Configurable trial days (`config.features.trialDays`)
- Trial banner showing days remaining
- Urgency states as expiration approaches
- Prevents duplicate trials per user
- Automatic upgrade CTA when trial expires

**Technical Details:**
- Stripe subscription mode with `trial_period_days`
- Rate-limited checkout endpoint
- Database tracking of `trialEndsAt`

**Files Added/Modified:**
- `src/lib/trial/index.ts` - Trial utilities
- `src/app/api/stripe/trial/route.ts` - Trial checkout endpoint
- `src/components/billing/trial-banner.tsx` - Trial status banner

---

### Cloud Storage

Automatic storage provider detection with graceful fallback.

**Capabilities:**
- Auto-detection priority: Cloudflare R2 → AWS S3 → Local storage
- Transparent fallback if cloud unavailable
- File validation (size, MIME type)
- Signed URLs for private files
- Image optimization (optional, requires sharp)

**Technical Details:**
- Dynamic AWS SDK loading
- Database record for all uploads
- Organization-level file access control

**Files Modified:**
- `src/lib/storage/uploads.ts` - Storage system

---

## Improvements

### Cookie Consent Hydration Fix

Resolved hydration mismatch issues in the cookie consent component.

**Changes:**
- Combined state pattern using `useRef` for hydration tracking
- Single initialization to prevent double calls
- Keyboard accessibility for modal backdrop (Escape key)
- Improved code organization with helper functions

**Files Modified:**
- `src/components/cookie-consent.tsx`

---

### CSRF Edge Runtime Support

CSRF protection now works in Edge Runtime environments.

**Changes:**
- Uses `crypto.getRandomValues()` for Edge compatibility
- Double-submit cookie pattern implementation
- Higher-order function for protected routes

**Files Added:**
- `src/lib/security/csrf.ts`

---

### NextAuth Route Handler

Fixed missing NextAuth route handler that caused session errors.

**Files Added:**
- `src/app/api/auth/[...nextauth]/route.ts`

---

## Test Coverage Added

### Unit Tests (New)

| Test File | Coverage |
|-----------|----------|
| `src/lib/auth/mfa.test.ts` | TOTP generation, verification, backup codes |
| `src/lib/trial/index.test.ts` | Trial status, access checks, date formatting |
| `src/lib/storage/uploads.test.ts` | Storage provider detection, file validation |
| `src/lib/security/csrf.test.ts` | Token generation, validation, middleware |

### E2E Tests (New)

| Test File | Scenarios |
|-----------|-----------|
| `tests/e2e/2fa.spec.ts` | 2FA setup flow, QR code, backup codes |
| `tests/e2e/cookie-consent.spec.ts` | Banner, modal, persistence, hydration |
| `tests/e2e/trial.spec.ts` | Pricing, checkout, banner states |
| `tests/e2e/file-upload.spec.ts` | Upload success, validation errors |

---

## Breaking Changes

None. This release is fully backward compatible with v1.0.x.

---

## Migration Guide

No migration steps required. Simply pull the latest changes and run:

```bash
npm install
npm run db:push  # If using new database fields
```

---

## Configuration

### 2FA (Optional)

No additional configuration required. 2FA is opt-in per user via security settings.

### Trial Period

Configure in `src/config.js`:

```javascript
features: {
  trialPeriod: true,
  trialDays: 14,  // Number of trial days
}
```

### Cloud Storage

Set environment variables based on your provider:

**Cloudflare R2:**
```env
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET=...
CLOUDFLARE_R2_ENDPOINT=...
CLOUDFLARE_R2_PUBLIC_URL=...
```

**AWS S3:**
```env
AWS_S3_ACCESS_KEY_ID=...
AWS_S3_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...
AWS_S3_REGION=...
```

If neither is configured, local storage is used automatically.

---

## Known Issues

None reported.

---

## Contributors

- Claude (Anthropic) - Implementation assistance
- Jason Poindexter - Project lead

---

## What's Next (v1.2.0)

- Command palette (Cmd+K)
- Rich text editor integration
- Advanced analytics dashboard
- Webhook retry improvements
