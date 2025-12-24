# Testing Guide

Comprehensive guide to setting up and running tests for Fabrk.

---

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Quick Start](#quick-start)
3. [Unit Testing (Vitest)](#unit-testing-vitest)
4. [Integration Testing](#integration-testing)
5. [E2E Testing (Playwright)](#e2e-testing-playwright)
6. [API Testing](#api-testing)
7. [Testing Best Practices](#testing-best-practices)
8. [CI/CD Integration](#cicd-integration)

---

## Testing Philosophy

**Test what matters:**
- ✅ Critical business logic (auth, payments, data mutations)
- ✅ User flows (sign up, checkout, dashboard)
- ✅ Edge cases (error handling, validation)
- ❌ Don't test implementation details
- ❌ Don't test third-party libraries

**Testing pyramid:**
```
       /\
      /E2E\     (Few - slow, expensive)
     /------\
    / Integ  \  (Some - moderate speed)
   /----------\
  /   Unit     \ (Many - fast, cheap)
 /--------------\
```

**Current state:** Fabrk includes 2 example tests. You should add comprehensive test coverage based on your needs.

---

## Quick Start

**Install test dependencies:**

```bash
# For unit/integration tests (Vitest)
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom

# For E2E tests (Playwright)
npm install -D @playwright/test

# For API testing
npm install -D supertest @types/supertest
```

**Run tests:**

```bash
# Unit/integration tests
npm test

# E2E tests
npm run test:e2e

# Watch mode (development)
npm test -- --watch
```

---

## Unit Testing (Vitest)

### Why Vitest?

- ⚡ **Fast** - Instant hot module reload
- 🔄 **Compatible** - Jest-compatible API
- 🎯 **Vite-native** - Works seamlessly with Next.js
- 📦 **ESM support** - Native ES modules

### Setup

**1. Install dependencies:**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

**2. Create `vitest.config.ts`:**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**3. Create `tests/setup.ts`:**

```typescript
import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

**4. Update `package.json`:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Example: Component Test

**Test a Button component:**

```tsx
// src/components/ui/button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant classes correctly", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    const button = container.querySelector("button");

    expect(button).toHaveClass("bg-red-600");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });
});
```

### Example: Utility Function Test

**Test a utility function:**

```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    const result = cn("px-4 py-2", "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const result = cn("px-4", isActive && "bg-blue-500");
    expect(result).toContain("bg-blue-500");
  });

  it("overrides conflicting Tailwind classes", () => {
    const result = cn("px-4", "px-8");
    expect(result).toBe("px-8");
  });
});
```

---

## Integration Testing

### Testing API Routes

**Example: Test registration endpoint:**

```typescript
// src/app/api/auth/register/route.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { POST } from "./route";
import { prisma } from "@/lib/prisma";

describe("POST /api/auth/register", () => {
  beforeEach(async () => {
    // Clear test data
    await prisma.user.deleteMany({
      where: { email: { contains: "test" } },
    });
  });

  afterEach(async () => {
    // Cleanup
    await prisma.user.deleteMany({
      where: { email: { contains: "test" } },
    });
  });

  it("creates a new user", async () => {
    const request = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "SecurePass123!",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toContain("successful");

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { email: "test@example.com" },
    });

    expect(user).toBeTruthy();
    expect(user?.name).toBe("Test User");
    expect(user?.emailVerified).toBeNull(); // Not verified yet
  });

  it("returns error for duplicate email", async () => {
    // Create user first
    await prisma.user.create({
      data: {
        name: "Existing User",
        email: "existing@example.com",
        password: "hashed",
      },
    });

    const request = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "existing@example.com",
        password: "SecurePass123!",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toContain("already exists");
  });

  it("validates email format", async () => {
    const request = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "invalid-email",
        password: "SecurePass123!",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("Invalid");
  });
});
```

### Testing with Mocks

**Mock Stripe API:**

```typescript
// tests/mocks/stripe.ts
import { vi } from "vitest";

export const mockStripe = {
  checkout: {
    sessions: {
      create: vi.fn().mockResolvedValue({
        id: "cs_test_123",
        url: "https://checkout.stripe.com/pay/cs_test_123",
      }),
    },
  },
  webhooks: {
    constructEvent: vi.fn().mockReturnValue({
      id: "evt_test_123",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          customer: "cus_test_123",
          metadata: {
            userId: "user-123",
          },
        },
      },
    }),
  },
};

// Use in tests
vi.mock("stripe", () => ({
  default: vi.fn(() => mockStripe),
}));
```

---

## E2E Testing (Playwright)

### Why Playwright?

- 🎭 **Cross-browser** - Test Chrome, Firefox, Safari
- 📸 **Screenshots** - Auto-capture failures
- 🎥 **Video recording** - Record test runs
- 🔄 **Auto-wait** - Smart waiting for elements

### Setup

**1. Install Playwright:**

```bash
npm install -D @playwright/test
npx playwright install
```

**2. Create `playwright.config.ts`:**

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

**3. Update `package.json`:**

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  }
}
```

### Example: E2E User Flow

**Test complete sign-up flow:**

```typescript
// tests/e2e/auth/signup.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Sign Up Flow", () => {
  test("user can sign up successfully", async ({ page }) => {
    // Navigate to sign up page
    await page.goto("/register");

    // Fill in form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[name="password"]', "SecurePass123!");

    // Submit form
    await page.click('button[type="submit"]');

    // Verify success message
    await expect(page.locator("text=successful")).toBeVisible();

    // Verify redirected to verification page
    await expect(page).toHaveURL(/\/verify-email/);
  });

  test("shows validation errors for invalid inputs", async ({ page }) => {
    await page.goto("/register");

    // Submit empty form
    await page.click('button[type="submit"]');

    // Check for validation errors
    await expect(page.locator("text=required")).toBeVisible();
  });

  test("prevents duplicate email registration", async ({ page }) => {
    const email = `existing-${Date.now()}@example.com`;

    // Register first time
    await page.goto("/register");
    await page.fill('input[name="name"]', "First User");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "SecurePass123!");
    await page.click('button[type="submit"]');

    // Try to register again with same email
    await page.goto("/register");
    await page.fill('input[name="name"]', "Second User");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "SecurePass123!");
    await page.click('button[type="submit"]');

    // Verify error message
    await expect(page.locator("text=already exists")).toBeVisible();
  });
});
```

**Test checkout flow:**

```typescript
// tests/e2e/checkout/checkout.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Checkout Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Log in first
    await page.goto("/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard");
  });

  test("user can start checkout", async ({ page }) => {
    // Navigate to pricing
    await page.goto("/");
    await page.click('text=Pricing');

    // Click "Buy Now" for Professional plan
    await page.click('button:has-text("Buy Now"):has-text("Professional")');

    // Verify redirected to Stripe
    await page.waitForURL(/checkout.stripe.com/);
    await expect(page).toHaveURL(/checkout.stripe.com/);
  });

  test("displays correct price for each tier", async ({ page }) => {
    await page.goto("/");

    // Check Starter tier
    const starterPrice = page.locator('text=$49').first();
    await expect(starterPrice).toBeVisible();

    // Check Professional tier
    const proPrice = page.locator('text=$99').first();
    await expect(proPrice).toBeVisible();

    // Check Enterprise tier
    const enterprisePrice = page.locator('text=$299').first();
    await expect(enterprisePrice).toBeVisible();
  });
});
```

---

## API Testing

### Using Supertest

**Install:**

```bash
npm install -D supertest @types/supertest
```

**Example test:**

```typescript
// tests/api/health.test.ts
import { describe, it, expect } from "vitest";
import request from "supertest";

const BASE_URL = "http://localhost:3000";

describe("API Health", () => {
  it("GET /api/health returns 200", async () => {
    const response = await request(BASE_URL).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.database).toBe("connected");
  });
});
```

---

## Testing Best Practices

### 1. Test Naming

```typescript
// ✅ Good: Descriptive test names
describe("User Registration", () => {
  it("creates a new user with valid inputs", () => {});
  it("returns 400 error when email is invalid", () => {});
  it("returns 409 error when email already exists", () => {});
});

// ❌ Bad: Vague test names
describe("Register", () => {
  it("works", () => {});
  it("fails", () => {});
});
```

### 2. Arrange-Act-Assert Pattern

```typescript
it("calculates total correctly", () => {
  // Arrange: Set up test data
  const items = [{ price: 10 }, { price: 20 }, { price: 30 }];

  // Act: Execute the function
  const total = calculateTotal(items);

  // Assert: Verify the result
  expect(total).toBe(60);
});
```

### 3. Test Isolation

```typescript
// ✅ Good: Each test is independent
describe("User CRUD", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("creates user", async () => {
    const user = await createUser({ name: "Test" });
    expect(user.name).toBe("Test");
  });

  it("deletes user", async () => {
    const user = await createUser({ name: "Test" });
    await deleteUser(user.id);
    const deleted = await prisma.user.findUnique({ where: { id: user.id } });
    expect(deleted).toBeNull();
  });
});
```

### 4. Mock External Dependencies

```typescript
// ✅ Good: Mock Stripe API
vi.mock("stripe", () => ({
  default: vi.fn(() => ({
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({ id: "cs_test", url: "https://..." }),
      },
    },
  })),
}));

// ❌ Bad: Make real API calls in tests
// This is slow, flaky, and might cost money!
```

---

## CI/CD Integration

Tests run automatically on every push via GitHub Actions (see `.github/workflows/ci.yml`).

**Local pre-commit testing:**

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run tests before commit
npm test
npm run type-check
npm run lint
```

---

## Testing Checklist

### Before Launch
- [ ] All critical paths tested (auth, checkout, payments)
- [ ] Error handling tested
- [ ] Edge cases covered
- [ ] E2E tests for main user flows
- [ ] API endpoints tested
- [ ] Mobile responsive tests

### Ongoing
- [ ] Add tests for new features
- [ ] Update tests when changing features
- [ ] Run tests before deploying
- [ ] Monitor test coverage (aim for >70%)

---

## Recommended Test Coverage

**Essential (must test):**
- Authentication (register, login, verify, reset)
- Payments (checkout, webhooks)
- Critical API routes
- Main user flows (E2E)

**Important (should test):**
- Form validation
- Error handling
- Database operations
- Authorization (roles, permissions)

**Nice-to-have (optional):**
- UI components
- Utility functions
- Styling/layout

**Don't test:**
- Third-party libraries
- Implementation details
- Generated code (Prisma Client)

---

**Testing gives you confidence to ship fast. Start with critical paths, add coverage over time. 🧪**

**Questions? Email support@fabrk.dev.**
