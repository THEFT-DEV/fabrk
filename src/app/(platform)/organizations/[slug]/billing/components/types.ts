/**
 * Shared TypeScript types for billing components
 */

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: string;
  customerId: string | null;
  subscriptionId: string | null;
  role: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  plan: {
    name: string;
    amount: number;
    interval: 'month' | 'year';
  };
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  created: string;
  invoicePdf: string | null;
}

export interface Usage {
  users: { current: number; limit: number };
  storage: { current: number; limit: number };
  apiCalls: { current: number; limit: number };
}
