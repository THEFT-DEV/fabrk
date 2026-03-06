/**
 * Test Utilities
 * Helper functions for testing
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { vi, expect } from 'vitest';

// Mock session data
export const mockSession = {
  user: {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    role: 'USER',
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

export const mockAdminSession = {
  user: {
    id: 'admin-user-id',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'ADMIN',
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

interface ProvidersProps {
  children: ReactNode;
  session?: Session | null;
}

function Providers({ children, session }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  session?: Session | null;
}

export function renderWithProviders(ui: ReactElement, options?: CustomRenderOptions) {
  const { session, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => <Providers session={session}>{children}</Providers>,
    ...renderOptions,
  });
}

export function mockApiResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function mockFetch(response: unknown, status = 200) {
  global.fetch = vi.fn(() => Promise.resolve(mockApiResponse(response, status)));
}

// Wait for async updates
export function waitForAsync() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// Create mock Prisma client
export function createMockPrisma() {
  return {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    payment: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
      aggregate: vi.fn(),
    },
    session: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    // Add more models as needed
  };
}

// Mock Stripe
export function createMockStripe() {
  return {
    checkout: {
      sessions: {
        create: vi.fn(),
        retrieve: vi.fn(),
      },
    },
    customers: {
      create: vi.fn(),
      retrieve: vi.fn(),
      update: vi.fn(),
    },
    paymentIntents: {
      create: vi.fn(),
      retrieve: vi.fn(),
    },
    webhooks: {
      constructEvent: vi.fn(),
    },
  };
}

// Create test user
export function createTestUser(overrides = {}) {
  return {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: null,
    role: 'USER',
    tier: 'FREE',
    customerId: null,
    verifyToken: null,
    resetToken: null,
    resetExpires: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

// Create test payment
export function createTestPayment(overrides = {}) {
  return {
    id: 'test-payment-id',
    stripeId: 'pi_test_123',
    userId: 'test-user-id',
    amount: 9900,
    status: 'succeeded',
    productId: 'price_test_123',
    createdAt: new Date(),
    ...overrides,
  };
}

export function expectApiResponse(response: Response, expectedData: unknown) {
  expect(response.status).toBe(200);
  return response.json().then((data) => {
    expect(data).toEqual(expectedData);
  });
}

// Assert error response
export function expectErrorResponse(
  response: Response,
  expectedStatus: number,
  expectedMessage?: string
) {
  expect(response.status).toBe(expectedStatus);
  if (expectedMessage) {
    return response.json().then((data) => {
      expect(data.error).toBe(expectedMessage);
    });
  }
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
