---
title: 'Testing with Vitest and Playwright: Ship with Confidence'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'testing-vitest-playwright'
description: 'Fabrk includes Vitest for unit tests and Playwright for end-to-end testing. Test your SaaS thoroughly before shipping.'
publishedAt: '2026-01-17T10:00:00.000Z'
---

**Test early. Test often. Ship confidently.**

---

## [ TESTING PHILOSOPHY ]

Before diving into tools and configurations, let's establish a solid testing philosophy. A well-tested SaaS application isn't just about code coverage percentages—it's about confidence in your deployments and the ability to refactor fearlessly.

### THE TEST PYRAMID

The test pyramid is a mental model for balancing different types of tests:

```
         /\
        /  \        E2E Tests (Few)
       /----\       - Slow, expensive, flaky
      /      \      - Test critical user journeys
     /--------\     Integration Tests (Some)
    /          \    - Test component interactions
   /------------\   - Test API endpoints
  /              \  Unit Tests (Many)
 /________________\ - Fast, cheap, reliable
                    - Test pure functions
```

**Unit Tests (70%):**
- Test individual functions and utilities
- Test React hooks in isolation
- Fast execution (milliseconds)
- High confidence for business logic

**Integration Tests (20%):**
- Test component interactions
- Test API route handlers
- Test database operations
- Medium execution time (seconds)

**E2E Tests (10%):**
- Test complete user journeys
- Test across the full stack
- Slow execution (minutes)
- High confidence for critical paths

### WHEN TO USE EACH TEST TYPE

| Scenario | Test Type | Reasoning |
|----------|-----------|-----------|
| Pure utility function | Unit | Fast, isolated, deterministic |
| React component rendering | Unit | Test UI output in isolation |
| Form validation logic | Unit | Business rules need thorough testing |
| API route handler | Integration | Tests request/response cycle |
| Database queries | Integration | Needs real DB interaction |
| User sign-up flow | E2E | Critical path, tests full stack |
| Payment checkout | E2E | Cannot risk bugs in payments |
| Component with context | Integration | Needs provider setup |

---

## [ TESTING STACK ]

Fabrk includes a comprehensive testing toolkit:

- **Vitest** - Fast unit and integration tests with native ESM support
- **Playwright** - Cross-browser E2E tests with excellent DX
- **Testing Library** - React component tests focused on user behavior
- **MSW** - Mock Service Worker for API mocking
- **axe-core** - Accessibility testing automation

---

## [ RUNNING TESTS ]

```bash
# Unit tests
npm test

# Unit tests in watch mode
npm run test:watch

# Unit tests with coverage
npm run test:coverage

# End-to-end tests
npm run test:e2e

# E2E with UI mode (interactive)
npm run test:e2e:ui

# E2E specific browser
npm run test:e2e -- --project=chromium

# Accessibility tests
npm run test:a11y

# All tests
npm run test:all
```

---

## [ VITEST CONFIGURATION DEEP DIVE ]

Here's a comprehensive Vitest configuration with detailed explanations:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  // Vite plugins for test environment
  plugins: [
    // Enable React JSX transformation
    react(),
    // Resolve TypeScript path aliases (@/...)
    tsconfigPaths(),
  ],

  test: {
    // Test environment - jsdom simulates browser APIs
    // Options: 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime'
    environment: 'jsdom',

    // Enable global test APIs (describe, it, expect)
    // Without this, you'd need to import from 'vitest' in every file
    globals: true,

    // Files to run before each test file
    // Use for global mocks, polyfills, and test utilities
    setupFiles: ['./tests/setup.ts'],

    // File patterns to include as tests
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],

    // File patterns to exclude from tests
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**', // E2E tests use Playwright
      '**/.{idea,git,cache,output,temp}/**',
    ],

    // Coverage configuration
    coverage: {
      // v8 is faster than istanbul for native coverage
      provider: 'v8',

      // Output formats
      reporter: ['text', 'text-summary', 'html', 'lcov', 'json'],

      // Files to include in coverage
      include: ['src/**/*.{ts,tsx}'],

      // Files to exclude from coverage
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/index.ts', // Re-export files
        'src/types/**', // Type definitions
        'src/**/*.stories.tsx', // Storybook stories
      ],

      // Coverage thresholds - CI will fail below these
      thresholds: {
        global: {
          statements: 70,
          branches: 65,
          functions: 70,
          lines: 70,
        },
        // Per-file thresholds (stricter for critical files)
        'src/lib/auth.ts': {
          statements: 90,
          branches: 85,
        },
        'src/lib/payments/**': {
          statements: 85,
          branches: 80,
        },
      },

      // Fail if coverage drops below thresholds
      check: true,
    },

    // Reporter configuration
    reporters: ['default', 'html'],

    // Output directory for reports
    outputFile: {
      html: './coverage/test-report.html',
      json: './coverage/test-results.json',
    },

    // Timeout for each test (ms)
    testTimeout: 10000,

    // Timeout for hooks (beforeEach, afterEach, etc.)
    hookTimeout: 10000,

    // Run tests in parallel (per file)
    pool: 'threads',
    poolOptions: {
      threads: {
        // Use half of available CPUs
        minThreads: 1,
        maxThreads: 4,
      },
    },

    // Retry failed tests (useful in CI)
    retry: process.env.CI ? 2 : 0,

    // Fail fast - stop on first failure
    bail: process.env.CI ? 1 : 0,

    // Mock configuration
    mockReset: true, // Reset mocks before each test
    clearMocks: true, // Clear mock call history
    restoreMocks: true, // Restore original implementations

    // Dependency optimization
    deps: {
      // Inline dependencies for faster resolution
      inline: [
        /@testing-library/,
        /next/,
      ],
    },

    // Type checking in tests (slower but catches issues)
    typecheck: {
      enabled: false, // Enable for stricter checks
      checker: 'tsc',
    },
  },

  // Path resolution (mirrors tsconfig)
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/tests': resolve(__dirname, './tests'),
    },
  },

  // Environment variables for tests
  define: {
    'process.env.NODE_ENV': '"test"',
  },
});
```

---

## [ TEST SETUP FILE ]

The setup file runs before each test file. Use it for global configuration, mocks, and utilities.

```typescript
// tests/setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';
import { server } from './mocks/server';

// ============================================
// GLOBAL MOCKS
// ============================================

// Mock next/navigation - required for components using routing
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// Mock next/image - avoids issues with image optimization in tests
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock next/link - simplifies link testing
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

// Mock next/headers - server component headers
vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    has: vi.fn(),
    getAll: vi.fn(() => []),
  }),
  headers: () => new Headers(),
}));

// Mock IntersectionObserver - for lazy loading components
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver - for responsive components
const mockResizeObserver = vi.fn();
mockResizeObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.ResizeObserver = mockResizeObserver;

// Mock matchMedia - for responsive hooks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo - prevents errors in tests
window.scrollTo = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', { value: localStorageMock });

// ============================================
// MSW SERVER SETUP
// ============================================

// Start MSW server before all tests
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn', // Warn about unhandled requests
  });
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => {
  server.close();
});

// ============================================
// CLEANUP
// ============================================

// Clean up after each test (unmount React components)
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// ============================================
// CUSTOM MATCHERS
// ============================================

// Add custom matchers for common assertions
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

// ============================================
// TYPE DECLARATIONS
// ============================================

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toBeWithinRange(floor: number, ceiling: number): void;
  }
  interface AsymmetricMatchersContaining {
    toBeWithinRange(floor: number, ceiling: number): void;
  }
}

// ============================================
// TEST UTILITIES
// ============================================

// Re-export common utilities for convenience
export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
export { vi } from 'vitest';
```

---

## [ UNIT TESTING PATTERNS ]

### TESTING PURE FUNCTIONS

Pure functions are the easiest to test—same input always produces same output.

```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  truncate,
  slugify,
  capitalize,
  debounce,
  deepMerge,
  isValidEmail,
  generateId,
  parseQueryString,
  formatRelativeTime,
} from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000)).toBe('$10.00');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('handles negative amounts', () => {
    expect(formatCurrency(-500)).toBe('-$5.00');
  });

  it('formats with custom currency', () => {
    expect(formatCurrency(1000, 'EUR')).toBe('€10.00');
  });

  it('handles large numbers', () => {
    expect(formatCurrency(100000000)).toBe('$1,000,000.00');
  });

  it('rounds to two decimal places', () => {
    expect(formatCurrency(1234)).toBe('$12.34');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('returns short strings unchanged', () => {
    expect(truncate('Hi', 5)).toBe('Hi');
  });

  it('handles exact length strings', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('uses custom suffix', () => {
    expect(truncate('Hello World', 5, '…')).toBe('Hello…');
  });

  it('handles empty strings', () => {
    expect(truncate('', 5)).toBe('');
  });
});

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello! World?')).toBe('hello-world');
  });

  it('handles multiple spaces', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('converts to lowercase', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
  });

  it('handles unicode characters', () => {
    expect(slugify('Héllo Wörld')).toBe('hello-world');
  });
});

describe('isValidEmail', () => {
  it.each([
    ['test@example.com', true],
    ['user.name@domain.co.uk', true],
    ['user+tag@domain.com', true],
    ['invalid-email', false],
    ['@domain.com', false],
    ['user@', false],
    ['', false],
    ['user@domain', false],
  ])('validates %s as %s', (email, expected) => {
    expect(isValidEmail(email)).toBe(expected);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('only calls once for rapid invocations', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to debounced function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('arg1', 'arg2');
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('deepMerge', () => {
  it('merges flat objects', () => {
    const a = { foo: 1 };
    const b = { bar: 2 };
    expect(deepMerge(a, b)).toEqual({ foo: 1, bar: 2 });
  });

  it('merges nested objects', () => {
    const a = { user: { name: 'John' } };
    const b = { user: { age: 30 } };
    expect(deepMerge(a, b)).toEqual({
      user: { name: 'John', age: 30 },
    });
  });

  it('overwrites primitive values', () => {
    const a = { value: 1 };
    const b = { value: 2 };
    expect(deepMerge(a, b)).toEqual({ value: 2 });
  });

  it('handles arrays', () => {
    const a = { items: [1, 2] };
    const b = { items: [3, 4] };
    expect(deepMerge(a, b)).toEqual({ items: [3, 4] });
  });
});

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats seconds ago', () => {
    const date = new Date('2024-01-15T11:59:30Z');
    expect(formatRelativeTime(date)).toBe('30 seconds ago');
  });

  it('formats minutes ago', () => {
    const date = new Date('2024-01-15T11:55:00Z');
    expect(formatRelativeTime(date)).toBe('5 minutes ago');
  });

  it('formats hours ago', () => {
    const date = new Date('2024-01-15T09:00:00Z');
    expect(formatRelativeTime(date)).toBe('3 hours ago');
  });

  it('formats days ago', () => {
    const date = new Date('2024-01-13T12:00:00Z');
    expect(formatRelativeTime(date)).toBe('2 days ago');
  });
});
```

---

## [ TESTING REACT HOOKS ]

Custom hooks require special testing utilities from Testing Library.

```typescript
// src/hooks/use-local-storage.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default')
    );

    expect(result.current[0]).toBe('default');
  });

  it('returns stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default')
    );

    expect(result.current[0]).toBe('stored');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  it('handles function updates', () => {
    const { result } = renderHook(() =>
      useLocalStorage('count', 0)
    );

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('handles complex objects', () => {
    const initialValue = { name: 'John', age: 30 };

    const { result } = renderHook(() =>
      useLocalStorage('user', initialValue)
    );

    act(() => {
      result.current[1]({ name: 'Jane', age: 25 });
    });

    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 });
  });

  it('handles JSON parse errors gracefully', () => {
    localStorage.setItem('test-key', 'invalid-json');

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default')
    );

    // Should fall back to default value
    expect(result.current[0]).toBe('default');
  });

  it('removes value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));

    const { result } = renderHook(() =>
      useLocalStorage<string | null>('test-key', null)
    );

    act(() => {
      result.current[1](null);
    });

    expect(localStorage.getItem('test-key')).toBe('null');
  });
});

// src/hooks/use-debounce.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));

    expect(result.current).toBe('initial');
  });

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: 'updated', delay: 500 });

    // Value should not update immediately
    expect(result.current).toBe('initial');

    // Advance time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now value should update
    expect(result.current).toBe('updated');
  });

  it('cancels previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: 'update1', delay: 500 });
    act(() => vi.advanceTimersByTime(200));

    rerender({ value: 'update2', delay: 500 });
    act(() => vi.advanceTimersByTime(200));

    rerender({ value: 'update3', delay: 500 });
    act(() => vi.advanceTimersByTime(500));

    // Only the last value should be set
    expect(result.current).toBe('update3');
  });
});

// src/hooks/use-async.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAsync } from '@/hooks/use-async';

describe('useAsync', () => {
  it('handles successful async operation', async () => {
    const asyncFn = vi.fn().mockResolvedValue({ data: 'success' });

    const { result } = renderHook(() => useAsync(asyncFn));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual({ data: 'success' });
    expect(result.current.error).toBeNull();
  });

  it('handles failed async operation', async () => {
    const error = new Error('Failed');
    const asyncFn = vi.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useAsync(asyncFn));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(error);
  });

  it('provides execute function for manual trigger', async () => {
    const asyncFn = vi.fn().mockResolvedValue('result');

    const { result } = renderHook(() =>
      useAsync(asyncFn, { immediate: false })
    );

    expect(result.current.isLoading).toBe(false);
    expect(asyncFn).not.toHaveBeenCalled();

    result.current.execute();

    await waitFor(() => {
      expect(result.current.data).toBe('result');
    });
  });
});
```

---

## [ COMPONENT TESTING PATTERNS ]

### TESTING WITH USER EVENTS AND ASYNC OPERATIONS

```typescript
// src/components/auth/sign-in-form.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignInForm } from '@/components/auth/sign-in-form';

// Mock the signIn function
const mockSignIn = vi.fn();
vi.mock('next-auth/react', () => ({
  signIn: (...args: unknown[]) => mockSignIn(...args),
}));

// Mock useRouter
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('SignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignIn.mockResolvedValue({ ok: true });
  });

  it('renders email and password inputs', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty submission', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      });
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    // Delay the response to test loading state
    mockSignIn.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<SignInForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled();
    });
  });

  it('shows error message on failed sign in', async () => {
    const user = userEvent.setup();
    mockSignIn.mockResolvedValue({ ok: false, error: 'Invalid credentials' });

    render(<SignInForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('redirects to dashboard on successful sign in', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('disables form inputs while submitting', async () => {
    const user = userEvent.setup();
    mockSignIn.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<SignInForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
  });
});
```

### TESTING COMPONENTS WITH CONTEXT

```typescript
// src/components/billing/subscription-card.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubscriptionCard } from '@/components/billing/subscription-card';
import { SubscriptionProvider } from '@/contexts/subscription-context';

// Test wrapper with context
const renderWithProvider = (
  ui: React.ReactElement,
  { subscription = null, ...options } = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <SubscriptionProvider initialSubscription={subscription}>
      {children}
    </SubscriptionProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

describe('SubscriptionCard', () => {
  it('shows free plan when no subscription', () => {
    renderWithProvider(<SubscriptionCard />);

    expect(screen.getByText(/free plan/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upgrade/i })).toBeInTheDocument();
  });

  it('shows active subscription details', () => {
    const subscription = {
      id: 'sub_123',
      plan: 'pro',
      status: 'active',
      currentPeriodEnd: new Date('2024-02-15'),
    };

    renderWithProvider(<SubscriptionCard />, { subscription });

    expect(screen.getByText(/pro plan/i)).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /manage/i })).toBeInTheDocument();
  });

  it('shows renewal date for active subscription', () => {
    const subscription = {
      id: 'sub_123',
      plan: 'pro',
      status: 'active',
      currentPeriodEnd: new Date('2024-02-15'),
    };

    renderWithProvider(<SubscriptionCard />, { subscription });

    expect(screen.getByText(/renews on/i)).toBeInTheDocument();
    expect(screen.getByText(/feb 15, 2024/i)).toBeInTheDocument();
  });

  it('shows cancellation notice for canceled subscription', () => {
    const subscription = {
      id: 'sub_123',
      plan: 'pro',
      status: 'canceled',
      cancelAt: new Date('2024-02-15'),
    };

    renderWithProvider(<SubscriptionCard />, { subscription });

    expect(screen.getByText(/canceled/i)).toBeInTheDocument();
    expect(screen.getByText(/access until feb 15/i)).toBeInTheDocument();
  });
});
```

---

## [ TESTING WITH MSW ]

Mock Service Worker intercepts network requests at the service worker level, providing realistic API mocking.

### SETTING UP MSW HANDLERS

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';

// Base URL for API routes
const API_BASE = 'http://localhost:3000/api';

// Mock data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
];

const mockSubscription = {
  id: 'sub_123',
  plan: 'pro',
  status: 'active',
  currentPeriodEnd: '2024-02-15T00:00:00Z',
};

export const handlers = [
  // ============================================
  // AUTH HANDLERS
  // ============================================

  http.get(`${API_BASE}/auth/session`, () => {
    return HttpResponse.json({
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    });
  }),

  http.post(`${API_BASE}/auth/signin`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string };

    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({ ok: true });
    }

    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.post(`${API_BASE}/auth/signout`, () => {
    return HttpResponse.json({ ok: true });
  }),

  // ============================================
  // USER HANDLERS
  // ============================================

  http.get(`${API_BASE}/users`, () => {
    return HttpResponse.json({ users: mockUsers });
  }),

  http.get(`${API_BASE}/users/:id`, ({ params }) => {
    const user = mockUsers.find((u) => u.id === params.id);

    if (!user) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ user });
  }),

  http.post(`${API_BASE}/users`, async ({ request }) => {
    const body = await request.json() as { name: string; email: string };
    const newUser = {
      id: String(mockUsers.length + 1),
      ...body,
      role: 'user',
    };

    return HttpResponse.json({ user: newUser }, { status: 201 });
  }),

  http.patch(`${API_BASE}/users/:id`, async ({ params, request }) => {
    const body = await request.json() as Partial<typeof mockUsers[0]>;
    const userIndex = mockUsers.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = { ...mockUsers[userIndex], ...body };
    return HttpResponse.json({ user: updatedUser });
  }),

  http.delete(`${API_BASE}/users/:id`, ({ params }) => {
    const userIndex = mockUsers.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),

  // ============================================
  // SUBSCRIPTION HANDLERS
  // ============================================

  http.get(`${API_BASE}/subscription`, () => {
    return HttpResponse.json({ subscription: mockSubscription });
  }),

  http.post(`${API_BASE}/subscription/checkout`, async () => {
    // Simulate network delay
    await delay(100);

    return HttpResponse.json({
      checkoutUrl: 'https://checkout.stripe.com/session_123',
    });
  }),

  http.post(`${API_BASE}/subscription/portal`, async () => {
    await delay(100);

    return HttpResponse.json({
      portalUrl: 'https://billing.stripe.com/session_456',
    });
  }),

  // ============================================
  // ERROR HANDLERS (for testing error states)
  // ============================================

  http.get(`${API_BASE}/error/500`, () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }),

  http.get(`${API_BASE}/error/network`, () => {
    return HttpResponse.error();
  }),

  http.get(`${API_BASE}/slow`, async () => {
    await delay(5000); // 5 second delay
    return HttpResponse.json({ data: 'slow response' });
  }),
];

// ============================================
// HANDLER OVERRIDES FOR SPECIFIC TESTS
// ============================================

export const errorHandlers = {
  authError: http.get(`${API_BASE}/auth/session`, () => {
    return HttpResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }),

  serverError: http.get(`${API_BASE}/users`, () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }),

  networkError: http.get(`${API_BASE}/users`, () => {
    return HttpResponse.error();
  }),
};
```

### MSW SERVER SETUP

```typescript
// tests/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Create server instance with default handlers
export const server = setupServer(...handlers);
```

### USING MSW IN TESTS

```typescript
// src/components/users/user-list.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { server } from '@/tests/mocks/server';
import { errorHandlers } from '@/tests/mocks/handlers';
import { UserList } from '@/components/users/user-list';

describe('UserList', () => {
  it('renders loading state initially', () => {
    render(<UserList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders users after fetch', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('handles server error gracefully', async () => {
    // Override handler for this test only
    server.use(errorHandlers.serverError);

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
    });
  });

  it('handles network error gracefully', async () => {
    server.use(errorHandlers.networkError);

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it('shows empty state when no users', async () => {
    server.use(
      http.get('/api/users', () => {
        return HttpResponse.json({ users: [] });
      })
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/no users found/i)).toBeInTheDocument();
    });
  });
});
```

---

## [ API ROUTE TESTING ]

Test Next.js API route handlers with mocked dependencies.

```typescript
// src/app/api/users/route.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST, DELETE } from './route';

// Mock auth
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

// Mock Prisma client
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const mockAuth = auth as unknown as ReturnType<typeof vi.fn>;
const mockPrisma = prisma as unknown as {
  user: {
    findMany: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

describe('GET /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 for unauthenticated requests', async () => {
    mockAuth.mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  it('returns users for authenticated requests', async () => {
    mockAuth.mockResolvedValue({
      user: { id: '1', role: 'admin' },
    });

    mockPrisma.user.findMany.mockResolvedValue([
      { id: '1', name: 'John', email: 'john@example.com' },
      { id: '2', name: 'Jane', email: 'jane@example.com' },
    ]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.users).toHaveLength(2);
    expect(data.users[0].name).toBe('John');
  });

  it('handles database errors', async () => {
    mockAuth.mockResolvedValue({
      user: { id: '1', role: 'admin' },
    });

    mockPrisma.user.findMany.mockRejectedValue(new Error('Database error'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Internal server error');
  });
});

describe('POST /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a new user', async () => {
    mockAuth.mockResolvedValue({
      user: { id: '1', role: 'admin' },
    });

    mockPrisma.user.create.mockResolvedValue({
      id: '3',
      name: 'New User',
      email: 'new@example.com',
    });

    const request = new NextRequest('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'New User',
        email: 'new@example.com',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.user.name).toBe('New User');
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'New User',
        email: 'new@example.com',
      },
    });
  });

  it('validates required fields', async () => {
    mockAuth.mockResolvedValue({
      user: { id: '1', role: 'admin' },
    });

    const request = new NextRequest('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'User' }), // Missing email
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('email');
  });

  it('returns 403 for non-admin users', async () => {
    mockAuth.mockResolvedValue({
      user: { id: '2', role: 'user' },
    });

    const request = new NextRequest('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'New User',
        email: 'new@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toBe('Forbidden');
  });
});

describe('DELETE /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deletes a user', async () => {
    mockAuth.mockResolvedValue({
      user: { id: '1', role: 'admin' },
    });

    mockPrisma.user.delete.mockResolvedValue({ id: '2' });

    const request = new NextRequest('http://localhost/api/users?id=2', {
      method: 'DELETE',
    });

    const response = await DELETE(request);

    expect(response.status).toBe(204);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: { id: '2' },
    });
  });

  it('returns 404 for non-existent user', async () => {
    mockAuth.mockResolvedValue({
      user: { id: '1', role: 'admin' },
    });

    mockPrisma.user.delete.mockRejectedValue({ code: 'P2025' });

    const request = new NextRequest('http://localhost/api/users?id=999', {
      method: 'DELETE',
    });

    const response = await DELETE(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('User not found');
  });
});
```

---

## [ DATABASE TESTING ]

### TEST DATABASE SETUP

```typescript
// tests/db/setup.ts
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

// Use a separate test database
const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db';

// Create test Prisma client
export const testPrisma = new PrismaClient({
  datasources: {
    db: { url: TEST_DATABASE_URL },
  },
});

// Reset database before tests
export async function resetDatabase() {
  // Reset with Prisma migrations
  execSync('npx prisma migrate reset --force --skip-seed', {
    env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
  });
}

// Clean specific tables
export async function cleanTables(tables: string[]) {
  for (const table of tables) {
    await testPrisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
  }
}

// Seed test data
export async function seedTestData() {
  // Create test users
  await testPrisma.user.createMany({
    data: [
      {
        id: 'test-user-1',
        email: 'admin@test.com',
        name: 'Test Admin',
        role: 'admin',
      },
      {
        id: 'test-user-2',
        email: 'user@test.com',
        name: 'Test User',
        role: 'user',
      },
    ],
  });

  // Create test organization
  await testPrisma.organization.create({
    data: {
      id: 'test-org-1',
      name: 'Test Organization',
      slug: 'test-org',
      ownerId: 'test-user-1',
    },
  });
}

// Cleanup after all tests
export async function disconnectDatabase() {
  await testPrisma.$disconnect();
}
```

### DATABASE INTEGRATION TESTS

```typescript
// tests/db/user.integration.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import {
  testPrisma,
  resetDatabase,
  cleanTables,
  seedTestData,
  disconnectDatabase,
} from './setup';

describe('User Database Operations', () => {
  beforeAll(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  beforeEach(async () => {
    await cleanTables(['User', 'Organization']);
    await seedTestData();
  });

  describe('findMany', () => {
    it('returns all users', async () => {
      const users = await testPrisma.user.findMany();

      expect(users).toHaveLength(2);
      expect(users.map((u) => u.email)).toContain('admin@test.com');
    });

    it('filters by role', async () => {
      const admins = await testPrisma.user.findMany({
        where: { role: 'admin' },
      });

      expect(admins).toHaveLength(1);
      expect(admins[0].email).toBe('admin@test.com');
    });
  });

  describe('create', () => {
    it('creates a new user', async () => {
      const user = await testPrisma.user.create({
        data: {
          email: 'new@test.com',
          name: 'New User',
          role: 'user',
        },
      });

      expect(user.id).toBeDefined();
      expect(user.email).toBe('new@test.com');
    });

    it('enforces unique email constraint', async () => {
      await expect(
        testPrisma.user.create({
          data: {
            email: 'admin@test.com', // Already exists
            name: 'Duplicate',
            role: 'user',
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('updates user name', async () => {
      const updated = await testPrisma.user.update({
        where: { id: 'test-user-1' },
        data: { name: 'Updated Name' },
      });

      expect(updated.name).toBe('Updated Name');
    });
  });

  describe('delete', () => {
    it('deletes user', async () => {
      await testPrisma.user.delete({
        where: { id: 'test-user-2' },
      });

      const users = await testPrisma.user.findMany();
      expect(users).toHaveLength(1);
    });

    it('cascades to related records', async () => {
      // Delete admin (org owner)
      await testPrisma.user.delete({
        where: { id: 'test-user-1' },
      });

      // Organization should also be deleted (cascade)
      const orgs = await testPrisma.organization.findMany();
      expect(orgs).toHaveLength(0);
    });
  });
});
```

---

## [ MOCKING STRATEGIES ]

### vi.mock - MODULE MOCKING

```typescript
// Module-level mock (hoisted to top)
vi.mock('@/lib/stripe', () => ({
  stripe: {
    customers: {
      create: vi.fn().mockResolvedValue({ id: 'cus_123' }),
      retrieve: vi.fn().mockResolvedValue({ id: 'cus_123', email: 'test@example.com' }),
    },
    subscriptions: {
      create: vi.fn().mockResolvedValue({ id: 'sub_123', status: 'active' }),
      cancel: vi.fn().mockResolvedValue({ id: 'sub_123', status: 'canceled' }),
    },
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/...' }),
      },
    },
  },
}));

// Factory pattern for dynamic mocks
vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn(),
}));

// Import the mocked module
import { sendEmail } from '@/lib/email';

// Now you can control the mock in tests
it('sends welcome email', async () => {
  (sendEmail as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true });

  await createUser({ email: 'new@example.com' });

  expect(sendEmail).toHaveBeenCalledWith({
    to: 'new@example.com',
    template: 'welcome',
  });
});
```

### vi.spyOn - SPYING ON METHODS

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('spyOn examples', () => {
  it('spies on object methods', () => {
    const user = {
      getName: () => 'John',
      getAge: () => 30,
    };

    const spy = vi.spyOn(user, 'getName');

    user.getName();
    user.getName();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(user.getName()).toBe('John'); // Original implementation preserved
  });

  it('spies and replaces implementation', () => {
    const user = {
      getName: () => 'John',
    };

    vi.spyOn(user, 'getName').mockReturnValue('Jane');

    expect(user.getName()).toBe('Jane');
  });

  it('spies on console.log', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    console.log('test message');

    expect(consoleSpy).toHaveBeenCalledWith('test message');

    consoleSpy.mockRestore();
  });

  it('spies on Date.now', () => {
    const dateSpy = vi.spyOn(Date, 'now').mockReturnValue(1704067200000);

    expect(Date.now()).toBe(1704067200000);

    dateSpy.mockRestore();
  });
});
```

### MANUAL MOCKS

```typescript
// __mocks__/next-auth/react.ts
import { vi } from 'vitest';

export const signIn = vi.fn().mockResolvedValue({ ok: true });
export const signOut = vi.fn().mockResolvedValue({ ok: true });
export const useSession = vi.fn().mockReturnValue({
  data: {
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    },
    expires: new Date(Date.now() + 86400000).toISOString(),
  },
  status: 'authenticated',
});
export const getServerSession = vi.fn().mockResolvedValue({
  user: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  },
});

// __mocks__/@prisma/client.ts
import { vi } from 'vitest';

export const PrismaClient = vi.fn().mockImplementation(() => ({
  user: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  organization: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  $connect: vi.fn(),
  $disconnect: vi.fn(),
}));
```

---

## [ TESTING AUTHENTICATION FLOWS ]

### MOCKING NEXTAUTH SESSIONS

```typescript
// tests/utils/auth-helpers.ts
import { vi } from 'vitest';
import type { Session } from 'next-auth';

// Default test user
export const testUser = {
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  image: null,
  role: 'user' as const,
};

// Default test admin
export const testAdmin = {
  id: 'test-admin-id',
  name: 'Test Admin',
  email: 'admin@example.com',
  image: null,
  role: 'admin' as const,
};

// Create mock session
export function createMockSession(user = testUser): Session {
  return {
    user,
    expires: new Date(Date.now() + 86400000).toISOString(),
  };
}

// Mock authenticated session
export function mockAuthenticatedSession(user = testUser) {
  const { auth } = vi.mocked(await import('@/lib/auth'));
  auth.mockResolvedValue(createMockSession(user));
}

// Mock unauthenticated session
export function mockUnauthenticatedSession() {
  const { auth } = vi.mocked(await import('@/lib/auth'));
  auth.mockResolvedValue(null);
}

// Mock admin session
export function mockAdminSession() {
  mockAuthenticatedSession(testAdmin);
}

// ============================================
// USAGE IN TESTS
// ============================================

// In test file
import { mockAuthenticatedSession, mockUnauthenticatedSession, testUser } from '@/tests/utils/auth-helpers';

describe('Protected Component', () => {
  it('renders for authenticated users', async () => {
    mockAuthenticatedSession();

    render(<ProtectedComponent />);

    expect(screen.getByText(`Welcome, ${testUser.name}`)).toBeInTheDocument();
  });

  it('redirects unauthenticated users', async () => {
    mockUnauthenticatedSession();

    render(<ProtectedComponent />);

    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
```

### TESTING AUTH COMPONENTS

```typescript
// src/components/auth/auth-guard.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthGuard } from '@/components/auth/auth-guard';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

import { useSession } from 'next-auth/react';

const mockUseSession = useSession as ReturnType<typeof vi.fn>;

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state while checking session', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders children for authenticated users', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1' } },
      status: 'authenticated',
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects unauthenticated users to login', async () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('redirects to custom path when specified', async () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <AuthGuard redirectTo="/auth/signin">
        <div>Protected Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/auth/signin');
    });
  });

  it('checks for required role', async () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', role: 'user' } },
      status: 'authenticated',
    });

    render(
      <AuthGuard requiredRole="admin">
        <div>Admin Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/unauthorized');
    });
  });
});
```

---

## [ SNAPSHOT TESTING ]

### WHEN TO USE SNAPSHOTS

Snapshots are useful for:
- Detecting unintended UI changes
- Testing complex rendered output
- Verifying serializable data structures

Avoid snapshots for:
- Frequently changing components
- Components with dynamic data
- Testing behavior (use assertions instead)

```typescript
// src/components/ui/card.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

describe('Card Snapshots', () => {
  it('matches basic card snapshot', () => {
    const { container } = render(
      <Card>
        <CardContent>Basic card content</CardContent>
      </Card>
    );

    expect(container).toMatchSnapshot();
  });

  it('matches full card snapshot', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <h3>Card Title</h3>
          <p>Card description</p>
        </CardHeader>
        <CardContent>
          <p>Main content here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(container).toMatchSnapshot();
  });

  it('matches card with variants', () => {
    const { container } = render(
      <Card variant="destructive">
        <CardContent>Error state</CardContent>
      </Card>
    );

    expect(container).toMatchSnapshot();
  });
});

// Inline snapshots (stored in test file)
describe('Utility Snapshots', () => {
  it('formats date correctly', () => {
    const result = formatDate(new Date('2024-01-15'));
    expect(result).toMatchInlineSnapshot('"January 15, 2024"');
  });

  it('generates expected config', () => {
    const config = generateConfig({ env: 'production' });
    expect(config).toMatchInlineSnapshot(`
      {
        "debug": false,
        "env": "production",
        "logLevel": "error",
      }
    `);
  });
});
```

### UPDATING SNAPSHOTS

```bash
# Update all snapshots
npm test -- -u

# Update snapshots for specific file
npm test -- card.test.tsx -u

# Interactive mode (approve each update)
npm test -- --watch
# Then press 'u' to update failing snapshots
```

---

## [ COVERAGE REPORTING ]

### COVERAGE CONFIGURATION

```typescript
// vitest.config.ts (coverage section)
coverage: {
  // v8 provider (recommended for speed)
  provider: 'v8',

  // Output formats
  reporter: [
    'text',         // Console output
    'text-summary', // Summary in console
    'html',         // HTML report in ./coverage
    'lcov',         // For CI integration
    'json',         // JSON data
    'cobertura',    // XML for CI tools
  ],

  // Files to include
  include: ['src/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [
    'src/**/*.d.ts',
    'src/**/*.test.{ts,tsx}',
    'src/**/*.spec.{ts,tsx}',
    'src/**/index.ts',
    'src/types/**',
    'src/**/*.stories.tsx',
  ],

  // Thresholds
  thresholds: {
    global: {
      statements: 70,
      branches: 65,
      functions: 70,
      lines: 70,
    },
    // Per-path thresholds
    'src/lib/auth.ts': {
      statements: 90,
    },
  },

  // Clean coverage directory before run
  clean: true,

  // Generate coverage even if tests fail
  reportOnFailure: true,
},
```

### VIEWING COVERAGE

```bash
# Generate coverage report
npm test -- --coverage

# Open HTML report
open coverage/index.html

# Coverage summary in terminal
npm test -- --coverage --coverage.reporter=text-summary
```

---

## [ PLAYWRIGHT CONFIGURATION DEEP DIVE ]

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ============================================
  // TEST CONFIGURATION
  // ============================================

  // Test directory
  testDir: './e2e',

  // Test file pattern
  testMatch: '**/*.spec.ts',

  // Run tests in parallel (within files)
  fullyParallel: true,

  // Fail fast - stop all tests on first failure
  forbidOnly: !!process.env.CI,

  // Retry failed tests
  retries: process.env.CI ? 2 : 0,

  // Number of parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['list'],                                    // Console list
    ['html', { outputFolder: 'playwright-report' }], // HTML report
    ['json', { outputFile: 'test-results.json' }],   // JSON results
    ['junit', { outputFile: 'junit-results.xml' }],  // JUnit for CI
  ],

  // Global timeout (per test)
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // ============================================
  // GLOBAL TEST OPTIONS
  // ============================================

  use: {
    // Base URL for all tests
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video recording
    video: 'retain-on-failure',

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,

    // Browser context options
    contextOptions: {
      strictSelectors: true,
    },

    // Action timeout
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  // ============================================
  // PROJECT CONFIGURATION (BROWSERS)
  // ============================================

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },

    // Tablet
    {
      name: 'tablet',
      use: { ...devices['iPad Pro 11'] },
    },

    // Branded browsers
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  // ============================================
  // WEB SERVER
  // ============================================

  webServer: {
    // Command to start the server
    command: 'npm run dev',

    // URL to wait for
    url: 'http://localhost:3000',

    // Reuse existing server (faster in development)
    reuseExistingServer: !process.env.CI,

    // Timeout for server startup
    timeout: 120000,

    // Output server logs
    stdout: 'pipe',
    stderr: 'pipe',

    // Environment variables
    env: {
      NODE_ENV: 'test',
    },
  },

  // ============================================
  // OUTPUT DIRECTORIES
  // ============================================

  // Test artifacts
  outputDir: 'test-results',

  // Snapshot directory
  snapshotDir: './e2e/__snapshots__',
});
```

---

## [ E2E TEST ORGANIZATION ]

### PAGE OBJECT PATTERN

```typescript
// e2e/pages/base.page.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loadingIndicator = page.locator('[data-testid="loading"]');
  }

  async waitForLoad() {
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }

  async getToastMessage(): Promise<string> {
    const toast = this.page.locator('[data-testid="toast"]');
    await toast.waitFor({ state: 'visible' });
    return (await toast.textContent()) || '';
  }

  async closeToast() {
    await this.page.locator('[data-testid="toast-close"]').click();
  }
}

// e2e/pages/login.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly googleButton: Locator;
  readonly githubButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.forgotPasswordLink = page.locator('a:has-text("Forgot password")');
    this.googleButton = page.locator('button:has-text("Google")');
    this.githubButton = page.locator('button:has-text("GitHub")');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorText(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent()) || '';
  }
}

// e2e/pages/dashboard.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly statsCards: Locator;
  readonly userMenu: Locator;
  readonly signOutButton: Locator;
  readonly sidebar: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1');
    this.statsCards = page.locator('[data-testid="stats-card"]');
    this.userMenu = page.locator('[data-testid="user-menu"]');
    this.signOutButton = page.locator('button:has-text("Sign Out")');
    this.sidebar = page.locator('[data-testid="sidebar"]');
    this.searchInput = page.locator('[data-testid="search"]');
  }

  async goto() {
    await this.page.goto('/dashboard');
    await this.waitForLoad();
  }

  async getStatValue(statName: string): Promise<string> {
    const stat = this.page.locator(`[data-testid="stat-${statName}"]`);
    return (await stat.textContent()) || '';
  }

  async openUserMenu() {
    await this.userMenu.click();
  }

  async signOut() {
    await this.openUserMenu();
    await this.signOutButton.click();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async navigateTo(menuItem: string) {
    await this.sidebar.locator(`a:has-text("${menuItem}")`).click();
    await this.waitForLoad();
  }
}

// e2e/pages/settings.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class SettingsPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly saveButton: Locator;
  readonly avatarUpload: Locator;
  readonly deleteAccountButton: Locator;
  readonly tabs: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('[name="name"]');
    this.emailInput = page.locator('[name="email"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.avatarUpload = page.locator('input[type="file"]');
    this.deleteAccountButton = page.locator('button:has-text("Delete Account")');
    this.tabs = page.locator('[role="tablist"]');
  }

  async goto() {
    await this.page.goto('/settings');
    await this.waitForLoad();
  }

  async updateProfile(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.saveButton.click();
  }

  async switchTab(tabName: string) {
    await this.tabs.locator(`button:has-text("${tabName}")`).click();
  }

  async uploadAvatar(filePath: string) {
    await this.avatarUpload.setInputFiles(filePath);
  }
}
```

### FIXTURES

```typescript
// e2e/fixtures.ts
import { test as base, Page } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';
import { SettingsPage } from './pages/settings.page';

// Declare fixture types
type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  settingsPage: SettingsPage;
  authenticatedPage: Page;
};

// Extend base test with fixtures
export const test = base.extend<Fixtures>({
  // Page object fixtures
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },

  // Pre-authenticated page fixture
  authenticatedPage: async ({ page }, use) => {
    // Load saved authentication state
    await page.context().addCookies([
      {
        name: 'next-auth.session-token',
        value: process.env.TEST_SESSION_TOKEN || 'test-session-token',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await use(page);
  },
});

export { expect } from '@playwright/test';
```

### USING FIXTURES IN TESTS

```typescript
// e2e/dashboard.spec.ts
import { test, expect } from './fixtures';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('displays stats cards', async ({ dashboardPage }) => {
    const cards = dashboardPage.statsCards;
    await expect(cards).toHaveCount(4);
  });

  test('shows user name in menu', async ({ dashboardPage }) => {
    await dashboardPage.openUserMenu();
    await expect(dashboardPage.page.locator('text=Test User')).toBeVisible();
  });

  test('can sign out', async ({ dashboardPage, loginPage }) => {
    await dashboardPage.signOut();
    await expect(loginPage.page).toHaveURL('/login');
  });

  test('search filters results', async ({ dashboardPage }) => {
    await dashboardPage.search('test query');
    // Assert filtered results
  });
});
```

---

## [ AUTHENTICATION IN E2E ]

### STORAGE STATE

```typescript
// e2e/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');
const adminAuthFile = path.join(__dirname, '.auth/admin.json');

// Setup for regular user
setup('authenticate as user', async ({ page }) => {
  await page.goto('/login');

  await page.fill('[name="email"]', process.env.TEST_USER_EMAIL || 'user@test.com');
  await page.fill('[name="password"]', process.env.TEST_USER_PASSWORD || 'password123');
  await page.click('button[type="submit"]');

  // Wait for redirect to dashboard
  await page.waitForURL('/dashboard');

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});

// Setup for admin user
setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');

  await page.fill('[name="email"]', process.env.TEST_ADMIN_EMAIL || 'admin@test.com');
  await page.fill('[name="password"]', process.env.TEST_ADMIN_PASSWORD || 'adminpass');
  await page.click('button[type="submit"]');

  await page.waitForURL('/dashboard');

  await page.context().storageState({ path: adminAuthFile });
});
```

### USING AUTH STATE IN TESTS

```typescript
// playwright.config.ts - projects section
projects: [
  // Setup project - runs first
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
  },

  // Tests requiring user auth
  {
    name: 'chromium-user',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'e2e/.auth/user.json',
    },
    dependencies: ['setup'],
  },

  // Tests requiring admin auth
  {
    name: 'chromium-admin',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'e2e/.auth/admin.json',
    },
    dependencies: ['setup'],
  },

  // Tests without auth
  {
    name: 'chromium-guest',
    use: { ...devices['Desktop Chrome'] },
    testMatch: /.*\.guest\.spec\.ts/,
  },
],
```

### AUTH HELPERS

```typescript
// e2e/helpers/auth.ts
import { Page, BrowserContext } from '@playwright/test';

export async function loginAsUser(page: Page) {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@test.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
}

export async function loginAsAdmin(page: Page) {
  await page.goto('/login');
  await page.fill('[name="email"]', 'admin@test.com');
  await page.fill('[name="password"]', 'adminpass');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
}

export async function logout(page: Page) {
  await page.click('[data-testid="user-menu"]');
  await page.click('button:has-text("Sign Out")');
  await page.waitForURL('/login');
}

export async function setAuthCookies(context: BrowserContext, sessionToken: string) {
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    },
  ]);
}

export async function clearAuth(context: BrowserContext) {
  await context.clearCookies();
}
```

---

## [ VISUAL REGRESSION TESTING ]

```typescript
// e2e/visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  // Full page screenshots
  test('homepage matches snapshot', async ({ page }) => {
    await page.goto('/');

    // Wait for all images and fonts to load
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled', // Disable CSS animations
    });
  });

  // Component screenshots
  test('hero section matches snapshot', async ({ page }) => {
    await page.goto('/');

    const hero = page.locator('[data-testid="hero-section"]');

    await expect(hero).toHaveScreenshot('hero-section.png');
  });

  // Multiple viewports
  test('responsive design', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1440, height: 900, name: 'desktop' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`, {
        fullPage: true,
      });
    }
  });

  // Theme testing
  test('dark mode matches snapshot', async ({ page }) => {
    await page.goto('/');

    // Toggle dark mode
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500); // Wait for transition

    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
    });
  });

  // Compare with custom threshold
  test('pricing page with threshold', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('pricing.png', {
      maxDiffPixels: 100, // Allow small differences
    });
  });

  // Mask dynamic content
  test('dashboard with masked dynamic content', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('dashboard.png', {
      mask: [
        page.locator('[data-testid="current-date"]'),
        page.locator('[data-testid="random-avatar"]'),
      ],
    });
  });
});
```

---

## [ ACCESSIBILITY TESTING ]

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  // Basic page scan
  test('homepage has no violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });

  // WCAG AA compliance
  test('login page meets WCAG AA', async ({ page }) => {
    await page.goto('/login');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  // Test specific component
  test('navigation is accessible', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .include('[data-testid="navigation"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  // Exclude known issues
  test('dashboard accessibility (with exclusions)', async ({ page }) => {
    await page.goto('/dashboard');

    const results = await new AxeBuilder({ page })
      .exclude('[data-testid="third-party-widget"]') // Exclude third-party content
      .disableRules(['color-contrast']) // Disable specific rules if needed
      .analyze();

    expect(results.violations).toEqual([]);
  });

  // Test form accessibility
  test('sign up form is accessible', async ({ page }) => {
    await page.goto('/register');

    const results = await new AxeBuilder({ page })
      .include('form')
      .analyze();

    // Log violations for debugging
    if (results.violations.length > 0) {
      console.log('Violations:', JSON.stringify(results.violations, null, 2));
    }

    expect(results.violations).toEqual([]);
  });

  // Keyboard navigation test
  test('can navigate with keyboard', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Continue tabbing
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
    }

    // Verify focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  // Focus trap test (for modals)
  test('modal traps focus', async ({ page }) => {
    await page.goto('/dashboard');

    // Open modal
    await page.click('button:has-text("Open Modal")');

    // Tab through modal
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.closest('[role="dialog"]') !== null;
      });
      expect(activeElement).toBe(true);
    }

    // Escape closes modal
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  // Screen reader text test
  test('images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  // ARIA labels test
  test('interactive elements have accessible names', async ({ page }) => {
    await page.goto('/dashboard');

    // All buttons should have accessible names
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const name = await button.evaluate((el) => {
        return el.getAttribute('aria-label') ||
               el.textContent?.trim() ||
               el.getAttribute('title');
      });
      expect(name).toBeTruthy();
    }
  });
});
```

---

## [ MOBILE TESTING ]

```typescript
// e2e/mobile.spec.ts
import { test, expect, devices } from '@playwright/test';

// Use mobile device preset
test.use({ ...devices['iPhone 12'] });

test.describe('Mobile Experience', () => {
  test('mobile navigation works', async ({ page }) => {
    await page.goto('/');

    // Desktop nav should be hidden
    await expect(page.locator('[data-testid="desktop-nav"]')).not.toBeVisible();

    // Mobile menu button should be visible
    const menuButton = page.locator('[data-testid="mobile-menu-button"]');
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();

    // Navigate to a page
    await page.click('a:has-text("Pricing")');
    await expect(page).toHaveURL('/pricing');
  });

  test('touch gestures work', async ({ page }) => {
    await page.goto('/gallery');

    // Swipe gesture
    const gallery = page.locator('[data-testid="gallery"]');
    await gallery.dispatchEvent('touchstart', {
      touches: [{ clientX: 300, clientY: 200 }],
    });
    await gallery.dispatchEvent('touchmove', {
      touches: [{ clientX: 100, clientY: 200 }],
    });
    await gallery.dispatchEvent('touchend');

    // Verify slide changed
    await expect(page.locator('[data-testid="slide-2"]')).toBeVisible();
  });

  test('form inputs are properly sized', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.locator('[name="email"]');
    const box = await emailInput.boundingBox();

    // Minimum touch target size (44x44 pixels)
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(200);
  });

  test('no horizontal scroll', async ({ page }) => {
    await page.goto('/');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });
});

// Test multiple devices
const mobileDevices = [
  devices['iPhone 12'],
  devices['iPhone SE'],
  devices['Pixel 5'],
  devices['Galaxy S9+'],
];

for (const device of mobileDevices) {
  test.describe(`${device.name}`, () => {
    test.use(device);

    test('renders correctly', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();
    });
  });
}
```

---

## [ PERFORMANCE TESTING ]

```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('page load performance', async ({ page }) => {
    // Start measuring
    await page.goto('/');

    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        // Time to first byte
        ttfb: navigation.responseStart - navigation.requestStart,
        // DOM content loaded
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        // Full page load
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
        // DOM interactive
        domInteractive: navigation.domInteractive - navigation.fetchStart,
      };
    });

    // Assert reasonable performance
    expect(metrics.ttfb).toBeLessThan(200); // 200ms TTFB
    expect(metrics.domContentLoaded).toBeLessThan(1000); // 1s DOMContentLoaded
    expect(metrics.loadComplete).toBeLessThan(3000); // 3s full load
  });

  test('largest contentful paint', async ({ page }) => {
    await page.goto('/');

    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      });
    });

    // LCP should be under 2.5 seconds (good)
    expect(lcp).toBeLessThan(2500);
  });

  test('cumulative layout shift', async ({ page }) => {
    await page.goto('/');

    // Wait for page to stabilize
    await page.waitForTimeout(2000);

    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as PerformanceEntry & { hadRecentInput: boolean }).hadRecentInput) {
              clsValue += (entry as PerformanceEntry & { value: number }).value;
            }
          }
          resolve(clsValue);
        }).observe({ type: 'layout-shift', buffered: true });

        // Resolve after timeout if no shifts
        setTimeout(() => resolve(clsValue), 1000);
      });
    });

    // CLS should be under 0.1 (good)
    expect(cls).toBeLessThan(0.1);
  });

  test('bundle size check', async ({ page }) => {
    const resources: { name: string; size: number }[] = [];

    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/_next/static/')) {
        const body = await response.body();
        resources.push({
          name: url.split('/').pop() || url,
          size: body.length,
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Calculate total JS size
    const jsSize = resources
      .filter((r) => r.name.endsWith('.js'))
      .reduce((sum, r) => sum + r.size, 0);

    // Total JS should be under 500KB (compressed)
    expect(jsSize).toBeLessThan(500 * 1024);
  });

  test('time to interactive', async ({ page }) => {
    const start = Date.now();

    await page.goto('/');

    // Wait for a button to be clickable
    await page.click('button:has-text("Get Started")');

    const tti = Date.now() - start;

    // TTI should be under 3 seconds
    expect(tti).toBeLessThan(3000);
  });
});
```

---

## [ TEST DATA FACTORIES ]

```typescript
// tests/factories/index.ts
import { faker } from '@faker-js/faker';

// ============================================
// USER FACTORY
// ============================================

interface UserOverrides {
  id?: string;
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
  createdAt?: Date;
}

export function createUser(overrides: UserOverrides = {}) {
  return {
    id: overrides.id ?? faker.string.uuid(),
    name: overrides.name ?? faker.person.fullName(),
    email: overrides.email ?? faker.internet.email(),
    role: overrides.role ?? 'user',
    image: faker.image.avatar(),
    createdAt: overrides.createdAt ?? faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

export function createUsers(count: number, overrides: UserOverrides = {}) {
  return Array.from({ length: count }, () => createUser(overrides));
}

// ============================================
// ORGANIZATION FACTORY
// ============================================

interface OrganizationOverrides {
  id?: string;
  name?: string;
  slug?: string;
  ownerId?: string;
}

export function createOrganization(overrides: OrganizationOverrides = {}) {
  const name = overrides.name ?? faker.company.name();
  return {
    id: overrides.id ?? faker.string.uuid(),
    name,
    slug: overrides.slug ?? faker.helpers.slugify(name).toLowerCase(),
    ownerId: overrides.ownerId ?? faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

// ============================================
// SUBSCRIPTION FACTORY
// ============================================

type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';
type PlanType = 'free' | 'starter' | 'pro' | 'enterprise';

interface SubscriptionOverrides {
  id?: string;
  userId?: string;
  plan?: PlanType;
  status?: SubscriptionStatus;
  currentPeriodEnd?: Date;
}

export function createSubscription(overrides: SubscriptionOverrides = {}) {
  return {
    id: overrides.id ?? `sub_${faker.string.alphanumeric(14)}`,
    userId: overrides.userId ?? faker.string.uuid(),
    plan: overrides.plan ?? 'pro',
    status: overrides.status ?? 'active',
    priceId: `price_${faker.string.alphanumeric(14)}`,
    currentPeriodStart: faker.date.past(),
    currentPeriodEnd: overrides.currentPeriodEnd ?? faker.date.future(),
    cancelAtPeriodEnd: false,
    createdAt: faker.date.past(),
  };
}

// ============================================
// API KEY FACTORY
// ============================================

interface ApiKeyOverrides {
  id?: string;
  userId?: string;
  name?: string;
}

export function createApiKey(overrides: ApiKeyOverrides = {}) {
  return {
    id: overrides.id ?? faker.string.uuid(),
    userId: overrides.userId ?? faker.string.uuid(),
    name: overrides.name ?? `${faker.word.adjective()}-key`,
    key: `sk_${faker.string.alphanumeric(32)}`,
    lastUsedAt: faker.date.recent(),
    createdAt: faker.date.past(),
  };
}

// ============================================
// INVOICE FACTORY
// ============================================

interface InvoiceOverrides {
  id?: string;
  userId?: string;
  amount?: number;
  status?: 'paid' | 'pending' | 'failed';
}

export function createInvoice(overrides: InvoiceOverrides = {}) {
  return {
    id: overrides.id ?? `inv_${faker.string.alphanumeric(14)}`,
    userId: overrides.userId ?? faker.string.uuid(),
    amount: overrides.amount ?? faker.number.int({ min: 1000, max: 50000 }),
    currency: 'usd',
    status: overrides.status ?? 'paid',
    pdfUrl: faker.internet.url(),
    createdAt: faker.date.past(),
    paidAt: faker.date.recent(),
  };
}

// ============================================
// NOTIFICATION FACTORY
// ============================================

interface NotificationOverrides {
  id?: string;
  userId?: string;
  type?: string;
  read?: boolean;
}

export function createNotification(overrides: NotificationOverrides = {}) {
  const types = ['info', 'warning', 'success', 'error'];
  return {
    id: overrides.id ?? faker.string.uuid(),
    userId: overrides.userId ?? faker.string.uuid(),
    type: overrides.type ?? faker.helpers.arrayElement(types),
    title: faker.lorem.sentence(3),
    message: faker.lorem.sentence(),
    read: overrides.read ?? false,
    createdAt: faker.date.recent(),
  };
}

// ============================================
// BUILDER PATTERN
// ============================================

export class UserBuilder {
  private user: ReturnType<typeof createUser>;

  constructor() {
    this.user = createUser();
  }

  withId(id: string) {
    this.user.id = id;
    return this;
  }

  withName(name: string) {
    this.user.name = name;
    return this;
  }

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  asAdmin() {
    this.user.role = 'admin';
    return this;
  }

  build() {
    return this.user;
  }
}

// Usage
// const adminUser = new UserBuilder()
//   .withName('Admin User')
//   .asAdmin()
//   .build();
```

---

## [ CI/CD INTEGRATION ]

### GITHUB ACTIONS WORKFLOW

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '22'
  DATABASE_URL: postgresql://test:test@localhost:5432/test_db

jobs:
  # ============================================
  # UNIT AND INTEGRATION TESTS
  # ============================================
  unit-tests:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma client
        run: npx prisma generate

      - name: Run database migrations
        run: npx prisma migrate deploy

      - name: Run unit tests
        run: npm test -- --coverage --reporter=json --outputFile=test-results.json

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true
          token: ${{ secrets.CODECOV_TOKEN }}

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: unit-test-results
          path: |
            test-results.json
            coverage/

  # ============================================
  # E2E TESTS
  # ============================================
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: unit-tests

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Generate Prisma client
        run: npx prisma generate

      - name: Run database migrations
        run: npx prisma migrate deploy

      - name: Seed test data
        run: npm run db:seed

      - name: Build application
        run: npm run build

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          CI: true
          BASE_URL: http://localhost:3000
          TEST_USER_EMAIL: user@test.com
          TEST_USER_PASSWORD: password123

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload test artifacts
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: e2e-artifacts
          path: |
            test-results/
            playwright-report/

  # ============================================
  # ACCESSIBILITY TESTS
  # ============================================
  a11y-tests:
    name: Accessibility Tests
    runs-on: ubuntu-latest
    needs: unit-tests

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Build application
        run: npm run build

      - name: Run accessibility tests
        run: npm run test:a11y

      - name: Upload a11y report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: a11y-report
          path: a11y-report/

  # ============================================
  # VISUAL REGRESSION TESTS
  # ============================================
  visual-tests:
    name: Visual Regression Tests
    runs-on: ubuntu-latest
    needs: unit-tests

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Build application
        run: npm run build

      - name: Run visual tests
        run: npx playwright test --project=chromium e2e/visual.spec.ts

      - name: Upload visual diff
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: visual-diff
          path: test-results/

  # ============================================
  # PERFORMANCE TESTS
  # ============================================
  performance-tests:
    name: Performance Tests
    runs-on: ubuntu-latest
    needs: e2e-tests
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Upload Lighthouse report
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-report
          path: .lighthouseci/
```

### LIGHTHOUSE CI CONFIGURATION

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready on',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/login',
        'http://localhost:3000/pricing',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

---

## [ DEBUGGING TESTS ]

### VS CODE DEBUGGER CONFIGURATION

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Vitest Tests",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Vitest File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "--testNamePattern", "${selectedText}", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    },
    {
      "name": "Debug Playwright Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
      "args": ["test", "--debug"],
      "console": "integratedTerminal"
    }
  ]
}
```

### PLAYWRIGHT UI MODE

```bash
# Interactive UI mode for debugging
npx playwright test --ui

# Debug mode (pauses on each action)
npx playwright test --debug

# Debug specific test
npx playwright test e2e/auth.spec.ts --debug

# Show browser during tests
npx playwright test --headed

# Slow motion (see each step)
npx playwright test --headed --slow-mo=500
```

### DEBUGGING TIPS

```typescript
// Add breakpoints in tests
test('debug example', async ({ page }) => {
  await page.goto('/');

  // Pause execution - opens Playwright Inspector
  await page.pause();

  // Continue debugging...
  await page.click('button');
});

// Console logging
test('with logging', async ({ page }) => {
  // Log page console messages
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  // Log network requests
  page.on('request', (request) => console.log('REQUEST:', request.url()));
  page.on('response', (response) =>
    console.log('RESPONSE:', response.status(), response.url())
  );

  await page.goto('/');
});

// Screenshot on failure
test('screenshot on fail', async ({ page }) => {
  try {
    await page.goto('/');
    await page.click('button:has-text("Non-existent")');
  } catch (error) {
    await page.screenshot({ path: 'debug-screenshot.png' });
    throw error;
  }
});

// Record video
test.use({
  video: 'on', // Always record
  // video: 'retain-on-failure', // Only keep on failure
});

test('with video', async ({ page }) => {
  await page.goto('/');
  await page.click('button');
});
```

---

## [ TESTING BEST PRACTICES ]

### AAA PATTERN

Arrange-Act-Assert is the standard pattern for writing clear tests:

```typescript
describe('UserService', () => {
  it('creates a new user', async () => {
    // Arrange - Set up test data and mocks
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
    };
    mockPrisma.user.create.mockResolvedValue({
      id: '1',
      ...userData,
    });

    // Act - Perform the action being tested
    const result = await userService.createUser(userData);

    // Assert - Verify the results
    expect(result.id).toBe('1');
    expect(result.email).toBe('test@example.com');
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: userData,
    });
  });
});
```

### NAMING CONVENTIONS

```typescript
// Describe blocks: noun (what you're testing)
describe('UserService', () => {
  describe('createUser', () => {
    // It blocks: should + expected behavior
    it('should create a user with valid data', () => {});
    it('should throw error for duplicate email', () => {});
    it('should hash password before storing', () => {});
  });
});

// Alternative: Given-When-Then
describe('UserService', () => {
  describe('given valid user data', () => {
    describe('when createUser is called', () => {
      it('then creates the user', () => {});
      it('then sends welcome email', () => {});
    });
  });

  describe('given duplicate email', () => {
    describe('when createUser is called', () => {
      it('then throws DuplicateEmailError', () => {});
    });
  });
});
```

### TEST ISOLATION

```typescript
describe('isolated tests', () => {
  // Each test gets fresh mocks
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Reset any shared state
  afterEach(() => {
    localStorage.clear();
  });

  // Tests should not depend on each other
  it('test A', () => {
    localStorage.setItem('key', 'value');
    // ...
  });

  it('test B', () => {
    // Should not see 'key' from test A
    expect(localStorage.getItem('key')).toBeNull();
  });
});
```

### MEANINGFUL ASSERTIONS

```typescript
// BAD - unclear what failed
it('user is valid', () => {
  expect(isValid(user)).toBe(true);
});

// GOOD - clear failure messages
it('user with email is valid', () => {
  const user = { email: 'test@example.com', name: 'Test' };
  const result = validateUser(user);

  expect(result.valid).toBe(true);
  expect(result.errors).toEqual([]);
});

// BETTER - custom error message
it('validates user email format', () => {
  const user = { email: 'invalid', name: 'Test' };
  const result = validateUser(user);

  expect(result.valid).toBe(false);
  expect(result.errors).toContainEqual(
    expect.objectContaining({
      field: 'email',
      message: expect.stringContaining('invalid'),
    })
  );
});
```

### TEST COVERAGE STRATEGY

Focus on:
1. **Business logic** - High coverage for core functionality
2. **Edge cases** - Empty inputs, null values, errors
3. **User flows** - Critical paths through the application
4. **Error handling** - Ensure errors are caught and handled

Skip testing:
1. Third-party libraries (trust their tests)
2. Pure configuration files
3. Type definitions
4. Trivial getters/setters

```typescript
// Focus tests on behavior, not implementation
// BAD - tests implementation
it('calls prisma.user.findUnique', async () => {
  await getUser('1');
  expect(prisma.user.findUnique).toHaveBeenCalled();
});

// GOOD - tests behavior
it('returns user by id', async () => {
  mockPrisma.user.findUnique.mockResolvedValue({
    id: '1',
    name: 'John',
  });

  const user = await getUser('1');

  expect(user.name).toBe('John');
});

it('returns null for non-existent user', async () => {
  mockPrisma.user.findUnique.mockResolvedValue(null);

  const user = await getUser('999');

  expect(user).toBeNull();
});
```

---

## [ SUMMARY ]

Testing is not just about catching bugs. It is about building confidence in your code and enabling fearless refactoring. With this comprehensive testing setup:

- **Vitest** provides fast, reliable unit and integration tests
- **Playwright** enables thorough E2E testing across browsers
- **MSW** makes API mocking realistic and maintainable
- **axe-core** ensures accessibility compliance
- **CI/CD integration** catches issues before they reach production

Key takeaways:

1. Follow the test pyramid - more unit tests, fewer E2E tests
2. Test behavior, not implementation
3. Use meaningful assertions with clear error messages
4. Keep tests isolated and independent
5. Automate everything in CI/CD

**Ship with confidence.**

