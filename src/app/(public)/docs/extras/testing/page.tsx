import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { TestTube, Play, Accessibility, Workflow } from 'lucide-react';

export const metadata = {
  title: 'Testing Guide - Fabrk Docs',
  description:
    'Test your Fabrk app with Vitest and Playwright. 130+ tests included for unit, E2E, and accessibility testing.',
};

export default function TestingGuidePage() {
  return (
    <FeatureGuideTemplate
      code="[0xB0]"
      category="Extras"
      title="Testing Guide"
      description="Comprehensive testing with Vitest for unit tests and Playwright for E2E tests."
      overview="130+ tests included. Vitest for unit tests, Playwright for E2E, and axe-core for accessibility."
      features={[
        {
          icon: TestTube,
          title: 'Vitest',
          description: 'Fast unit testing with JSX.',
        },
        {
          icon: Play,
          title: 'Playwright',
          description: 'Cross-browser E2E tests.',
        },
        {
          icon: Accessibility,
          title: 'a11y Tests',
          description: 'Accessibility with axe-core.',
        },
        {
          icon: Workflow,
          title: 'CI Integration',
          description: 'GitHub Actions workflow.',
        },
      ]}
      setup={[
        {
          title: 'Run Unit Tests',
          description: 'Execute all Vitest unit tests',
          code: `npm test`,
          language: 'bash',
        },
        {
          title: 'Run E2E Tests',
          description: 'Execute Playwright tests',
          code: `npm run test:e2e`,
          language: 'bash',
        },
        {
          title: 'Run All Tests',
          description: 'Execute both unit and E2E tests',
          code: `npm run test:all`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Running Tests',
          description: 'Available test commands',
          code: `# Unit tests (Vitest)
npm test                 # Run all unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI

# E2E tests (Playwright)
npm run test:e2e         # Run all E2E tests
npm run test:e2e:ui      # Open Playwright UI
npm run test:e2e:headed  # Run with visible browser

# Accessibility tests
npm run test:a11y        # Run accessibility tests

# All tests
npm run test:all         # Run Vitest + Playwright`,
          language: 'bash',
        },
        {
          title: 'Writing Unit Tests',
          description: 'Test components, hooks, and utilities',
          code: `// tests/unit/components/button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});`,
          language: 'tsx',
        },
        {
          title: 'Testing Custom Hooks',
          description: 'Example hook test with timer mocking',
          code: `// tests/unit/hooks/use-debounce.test.ts
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "@/hooks/use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });
});`,
          language: 'typescript',
        },
        {
          title: 'Playwright E2E Tests',
          description: 'Test complete user flows',
          code: `// tests/e2e/auth.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("user can sign up", async ({ page }) => {
    await page.goto("/signup");

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "SecurePass123!");
    await page.fill('input[name="name"]', "Test User");

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard|verify/);
  });

  test("user can sign in", async ({ page }) => {
    await page.goto("/signin");

    await page.fill('input[name="email"]', "existing@example.com");
    await page.fill('input[name="password"]', "password123");

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/dashboard");
  });
});`,
          language: 'typescript',
        },
        {
          title: 'Accessibility Testing',
          description: 'Test for a11y violations',
          code: `// tests/accessibility/home.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
  test("home page has no a11y violations", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
});`,
          language: 'typescript',
        },
        {
          title: 'CI Integration',
          description: 'GitHub Actions workflow for automated testing',
          code: `# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e`,
          language: 'yaml',
        },
      ]}
      previous={{ title: 'Theming', href: '/docs/extras/theming' }}
      next={{ title: 'Launch Checklist', href: '/docs/launch/checklist' }}
    >
      {/* Test Coverage */}
      <DocsSection title="Test Coverage">
        <DocsCard title="COVERAGE">
          <div className="space-y-1">
            <div>├─ 130+ total tests</div>
            <div>├─ Unit tests with Vitest</div>
            <div>├─ E2E tests with Playwright</div>
            <div>└─ Accessibility tests with axe-core</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Best Practices */}
      <DocsSection title="Testing Best Practices">
        <DocsCard title="BEST PRACTICES">
          <div className="space-y-1">
            <div>
              ├─ <strong>Test behavior, not implementation</strong> - Focus on user experience
            </div>
            <div>
              ├─ <strong>Use data-testid sparingly</strong> - Prefer semantic queries
            </div>
            <div>
              ├─ <strong>Mock external services</strong> - Don't hit real APIs in unit tests
            </div>
            <div>
              ├─ <strong>Keep tests isolated</strong> - Each test should be independent
            </div>
            <div>
              ├─ <strong>Use meaningful assertions</strong> - Test what matters
            </div>
            <div>
              └─ <strong>Write tests that fail first</strong> - TDD when appropriate
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/deployment/vercel"
            title="Deploy to Vercel"
            description="Deploy your tested app to production"
          />
          <DocsLinkCard
            href="/docs/security/validation"
            title="Schema Validation"
            description="Validate inputs for better tests"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
