# Fabrk Browser Automation Testing Guide

## Overview

Fabrk includes a **lightweight browser automation testing suite** built on Chrome DevTools Protocol tools (98% more token-efficient than MCP servers). This guide covers how to use these tools to create comprehensive E2E tests for critical business flows.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture](#architecture)
3. [Running Tests](#running-tests)
4. [Test Suites](#test-suites)
5. [Writing Custom Tests](#writing-custom-tests)
6. [Utilities & Helpers](#utilities--helpers)
7. [Best Practices](#best-practices)
8. [CI/CD Integration](#cicd-integration)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

```bash
# 1. Install browser automation tool dependencies
cd agent-tools/browser-tools
npm install

# 2. Ensure dev server is running
npm run dev

# 3. Verify Chrome is installed (required for automation)
```

### Run All E2E Tests

```bash
# From project root
npm run test:e2e

# Run specific test suite
npm run test:e2e -- tests/e2e/auth
npm run test:e2e -- tests/e2e/payment
npm run test:e2e -- tests/e2e/visual
npm run test:e2e -- tests/e2e/security

# Run single test file
npm run test:e2e -- tests/e2e/auth/email-verification.test.ts
```

### View Screenshots

All test screenshots are automatically saved to:

```
tests/screenshots/
├── landing/          # Landing page screenshots
│   ├── mobile/       # Mobile viewport screenshots
│   └── comparison/   # Hero section comparisons
└── *.png            # Individual test screenshots
```

---

## Architecture

### Token Efficiency

**Why these tools?** 98% more token-efficient than traditional MCP servers:

| Method | Tokens | Tools | Efficiency |
|--------|--------|-------|------------|
| MCP Servers | 13,000-18,000 | 21-26 | Baseline |
| **Browser Tools** | **225** | **7** | **98% savings** |

### Directory Structure

```
tests/
├── e2e/
│   ├── auth/              # Authentication tests
│   │   └── email-verification.test.ts
│   ├── payment/           # Stripe payment tests
│   │   └── stripe-checkout.test.ts
│   ├── visual/            # Visual regression tests
│   │   └── landing-pages.test.ts
│   └── security/          # Security header tests
│       └── headers.test.ts
├── utils/
│   ├── browser.ts         # Browser automation wrapper
│   └── stripe-test.ts     # Stripe test utilities
├── screenshots/           # Generated screenshots
└── README.md

agent-tools/browser-tools/
├── browser-start.js       # Launch Chrome
├── browser-nav.js         # Navigate to URLs
├── browser-eval.js        # Execute JavaScript
├── browser-screenshot.js  # Capture screenshots
├── browser-cookies.js     # Manage cookies
├── browser-pick.js        # Select elements
└── browser-hn-scraper.js  # Example scraper
```

### Core Tools

| Tool | Purpose | Example Usage |
|------|---------|---------------|
| `browser-start.js` | Launch Chrome with debugging | `node browser-start.js --profile` |
| `browser-nav.js` | Navigate to URL | `node browser-nav.js http://localhost:3000` |
| `browser-eval.js` | Execute JavaScript | `node browser-eval.js "document.title"` |
| `browser-screenshot.js` | Take screenshot | `node browser-screenshot.js` |
| `browser-cookies.js` | View/manage cookies | `node browser-cookies.js` |
| `browser-pick.js` | Interactive element selector | `node browser-pick.js` |

---

## Running Tests

### Development Mode

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run E2E tests
npm run test:e2e
```

### Watch Mode

```bash
# Re-run tests on file changes
npm run test:e2e -- --watch
```

### Run with Verbose Output

```bash
npm run test:e2e -- --reporter=verbose
```

### Filter Tests

```bash
# Run tests matching pattern
npm run test:e2e -- --grep "email verification"

# Run specific suite
npm run test:e2e tests/e2e/auth/

# Skip slow visual tests
npm run test:e2e -- --grep "visual" --invert
```

---

## Test Suites

### 1. Authentication Tests (`tests/e2e/auth/`)

**Purpose**: Verify authentication flows work correctly

**Tests**:
- ✓ Registration generates verification token
- ✓ Valid token verifies email
- ✓ Used token is rejected
- ✓ Expired token shows error message
- ✓ Resend verification generates new token
- ✓ Missing token parameter shows error

**Run**:
```bash
npm run test:e2e -- tests/e2e/auth/email-verification.test.ts
```

**What it tests**:
- Complete registration flow
- Email verification token generation
- Token expiry (24-hour window)
- Token reuse prevention
- Error handling for invalid/expired tokens

### 2. Payment Tests (`tests/e2e/payment/`)

**Purpose**: Ensure Stripe payment flows work end-to-end

**Tests**:
- ✓ Creates checkout session for all tiers
- ✓ Redirects to Stripe Checkout
- ✓ Completes payment with test card
- ✓ Prevents duplicate sessions (idempotency)
- ✓ Handles checkout cancellation
- ✓ Rejects invalid price IDs
- ✓ Verifies 24-hour session expiry
- ✓ Handles concurrent requests

**Run**:
```bash
npm run test:e2e -- tests/e2e/payment/stripe-checkout.test.ts
```

**What it tests**:
- Stripe Checkout session creation
- Payment form rendering
- Idempotency (duplicate payment prevention)
- Checkout cancellation flow
- All pricing tiers (Starter, Professional, Enterprise)
- Concurrent checkout requests

### 3. Visual Regression Tests (`tests/e2e/visual/`)

**Purpose**: Catch layout breaks and visual regressions

**Tests**:
- ✓ Renders all 4 landing page variations
- ✓ Validates key elements present
- ✓ Checks SEO meta tags
- ✓ Measures page load times (<5s)
- ✓ Verifies single H1 tag (SEO)
- ✓ Cross-variation consistency
- ✓ Mobile viewport testing

**Run**:
```bash
npm run test:e2e -- tests/e2e/visual/landing-pages.test.ts
```

**Landing Pages Tested**:
1. Neo-Brutalism (default) - `/`
2. Modern Minimal - `/variations/modern`
3. SaaS Professional - `/variations/saas`
4. Startup Bold - `/variations/startup`

**Screenshots Generated**:
- Full-page captures for each variation
- Hero section comparisons
- Mobile viewport screenshots

### 4. Security Tests (`tests/e2e/security/`)

**Purpose**: Validate security headers and configurations

**Tests**:
- ✓ Content Security Policy (CSP)
- ✓ X-Frame-Options (clickjacking prevention)
- ✓ X-Content-Type-Options (MIME sniffing)
- ✓ Referrer-Policy
- ✓ Strict-Transport-Security (HSTS)
- ✓ Permissions-Policy
- ✓ CORS configuration
- ✓ Cookie security flags (HttpOnly, Secure, SameSite)

**Run**:
```bash
npm run test:e2e -- tests/e2e/security/headers.test.ts
```

**Security Report**:
Generates comprehensive security summary showing which headers are properly configured.

---

## Writing Custom Tests

### Basic Test Structure

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { withBrowser, Browser } from '../../utils/browser';
import { prisma } from '../../../src/lib/prisma';

const BASE_URL = 'http://localhost:3000';

describe('Feature Name E2E', () => {
  const testEmail = `test-${Date.now()}@example.com`;

  beforeAll(async () => {
    // Setup: Clean test data
    await prisma.user.deleteMany({ where: { email: testEmail } });
  });

  afterAll(async () => {
    // Teardown: Clean up
    await prisma.user.deleteMany({ where: { email: testEmail } });
  });

  it('should complete the flow', async () => {
    await withBrowser(async (browser: Browser) => {
      // 1. Navigate
      await browser.navigate(`${BASE_URL}/page`);

      // 2. Interact
      await browser.type('#email', testEmail);
      await browser.click('button[type="submit"]');

      // 3. Wait & Assert
      await browser.waitForSelector('.success-message', 10000);
      const message = await browser.getText('.success-message');
      expect(message).toContain('success');

      // 4. Screenshot
      const screenshot = await browser.screenshot();
      console.log('Screenshot:', screenshot);
    });
  });
});
```

---

## Utilities & Helpers

### Browser Wrapper (`tests/utils/browser.ts`)

High-level TypeScript API for browser automation:

```typescript
import { withBrowser, Browser } from '../utils/browser';

// Automatic cleanup
await withBrowser(async (browser: Browser) => {
  await browser.navigate('http://localhost:3000');
  await browser.type('#email', 'test@example.com');
  await browser.click('button[type="submit"]');
  const url = await browser.getUrl();
});
```

**Available Methods**:

| Method | Description | Example |
|--------|-------------|---------|
| `start(options)` | Launch browser | `await browser.start({ profile: true })` |
| `navigate(url)` | Go to URL | `await browser.navigate('http://localhost:3000')` |
| `eval<T>(script)` | Execute JS | `await browser.eval('document.title')` |
| `screenshot()` | Capture screen | `await browser.screenshot()` |
| `type(selector, text)` | Fill input | `await browser.type('#email', 'test@example.com')` |
| `click(selector)` | Click element | `await browser.click('button')` |
| `waitForSelector(selector, timeout)` | Wait for element | `await browser.waitForSelector('.message', 5000)` |
| `getText(selector)` | Get text content | `await browser.getText('.title')` |
| `getUrl()` | Get current URL | `await browser.getUrl()` |
| `exists(selector)` | Check element | `await browser.exists('.error')` |
| `getCookies()` | Get all cookies | `await browser.getCookies()` |
| `close()` | Clean up | `await browser.close()` |

### Stripe Test Utilities (`tests/utils/stripe-test.ts`)

```typescript
import {
  STRIPE_TEST_CARDS,
  DEFAULT_TEST_CARD,
  getStripePriceIds,
  isStripeCheckoutUrl,
  isSuccessUrl,
} from '../utils/stripe-test';

// Test cards
const card = STRIPE_TEST_CARDS.VISA; // 4242424242424242

// Get price IDs from environment
const prices = getStripePriceIds();
console.log(prices.starter, prices.professional, prices.enterprise);

// Verify Stripe URL
const isStripe = isStripeCheckoutUrl('https://checkout.stripe.com/...');
```

**Available Test Cards**:
- `VISA`: `4242424242424242` (success)
- `VISA_DEBIT`: `4000056655665556` (success)
- `MASTERCARD`: `5555555555554444` (success)
- `AMEX`: `378282246310005` (success)
- `CARD_DECLINED`: `4000000000000002` (decline)
- `INSUFFICIENT_FUNDS`: `4000000000009995` (decline)
- `REQUIRE_3DS`: `4000002500003155` (requires 3D Secure)

---

## Best Practices

### 1. Use Unique Test Data

```typescript
// ✓ GOOD: Unique per test run
const testEmail = `test-${Date.now()}@example.com`;

// ✗ BAD: Hard-coded (causes conflicts)
const testEmail = 'test@example.com';
```

### 2. Always Clean Up

```typescript
afterAll(async () => {
  // Clean up test data
  await prisma.user.deleteMany({ where: { email: testEmail } });
  await prisma.payment.deleteMany({ where: { userId: user.id } });
});
```

### 3. Wait for Elements

```typescript
// ✓ GOOD: Wait for element to appear
await browser.waitForSelector('.message', 5000);
const message = await browser.getText('.message');

// ✗ BAD: Assume element exists immediately
const message = await browser.getText('.message'); // May fail
```

### 4. Take Screenshots for Debugging

```typescript
// Capture screenshot
const screenshot = await browser.screenshot();
console.log('Screenshot saved:', screenshot);

// Copy to organized location
fs.copyFileSync(screenshot, 'tests/screenshots/feature-test.png');
```

### 5. Use Stable Selectors

```typescript
// ✓ GOOD: Data attributes (stable)
<button data-testid="submit-button">Submit</button>
await browser.click('[data-testid="submit-button"]');

// ✗ BAD: Class names (fragile)
await browser.click('.btn-primary-lg-rounded-shadow');
```

### 6. Test Edge Cases

```typescript
it('should handle expired tokens', async () => {
  const expiredToken = await createExpiredToken();
  await browser.navigate(`/verify?token=${expiredToken}`);

  const error = await browser.getText('.error-message');
  expect(error).toContain('expired');
});
```

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/e2e-tests.yml`:

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  e2e:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          npm install
          cd agent-tools/browser-tools && npm install

      - name: Install Chrome
        run: |
          sudo apt-get update
          sudo apt-get install -y google-chrome-stable

      - name: Run E2E tests
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
        run: npm run test:e2e

      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: test-screenshots
          path: tests/screenshots/
```

---

## Troubleshooting

### Chrome Not Starting

**Error**: `Failed to start browser: ECONNREFUSED`

**Solution**:
```bash
# Kill existing Chrome processes
pkill -f "chrome.*--remote-debugging-port=9222"

# Restart
node agent-tools/browser-tools/browser-start.js
```

### Element Not Found

**Error**: `Element .selector not found after 5000ms`

**Solutions**:
1. Increase timeout: `waitForSelector('.selector', 10000)`
2. Verify selector in DevTools
3. Add explicit wait: `await new Promise(r => setTimeout(r, 2000))`
4. Use data-testid attributes

### Test Database Conflicts

**Error**: `Unique constraint failed on email`

**Solution**: Use unique test data
```typescript
const testEmail = `test-${Date.now()}@example.com`;

beforeAll(async () => {
  await prisma.user.deleteMany({ where: { email: testEmail } });
});
```

### Stripe Checkout Timeouts

**Error**: `Timeout waiting for Stripe checkout`

**Solutions**:
1. Extend timeout: `it('test', async () => { ... }, 60000)`
2. Verify Stripe keys in `.env.local`
3. Check STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY

### Screenshots Not Saving

**Solution**: Create directory first
```typescript
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'tests', 'screenshots');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
```

---

## Performance Tips

### Run Tests in Parallel

```bash
# Parallel (faster)
npm run test:e2e -- --threads

# Serial (more stable)
npm run test:e2e -- --no-threads
```

### Skip Slow Visual Tests

```bash
npm run test:e2e -- --grep "visual" --invert
```

### Reuse Browser Sessions

```typescript
const browser = new Browser();

beforeAll(async () => {
  await browser.start({ profile: true });
});

afterAll(async () => {
  await browser.close();
});
```

---

## Resources

- [Browser Tools Documentation](../agent-tools/README.md)
- [Why Not MCP?](./advanced/when-you-dont-need-mcp.md)
- [Stripe Testing Docs](https://stripe.com/docs/testing)
- [Vitest Docs](https://vitest.dev/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

---

## Summary

This testing suite provides:
- ✅ **98% token efficiency** vs MCP servers
- ✅ **4 complete test suites** (auth, payment, visual, security)
- ✅ **Easy-to-use TypeScript API** (Browser wrapper)
- ✅ **Stripe test utilities** with test cards
- ✅ **Screenshot capture** for debugging
- ✅ **CI/CD ready** with GitHub Actions examples

Start testing critical flows today to ship with confidence! 🧪

---

**Questions?** Check [CLAUDE.md](../CLAUDE.md) for project guidance
**Found a bug?** Open an issue in the repository
**Want to contribute?** Submit a PR with new test cases

**Last Updated**: 2025-01-12
