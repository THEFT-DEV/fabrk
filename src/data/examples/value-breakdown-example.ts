/**
 * Generic Value Breakdown Example
 *
 * Replace with your actual pricing and value calculation.
 * These are format examples showing the expected structure.
 */

export const VALUE_ITEMS_EXAMPLE = [
  {
    id: 'auth',
    item: 'Authentication System',
    description: 'Email, OAuth, session management, password reset',
    value: 4000,
    hours: 40,
  },
  {
    id: 'payments',
    item: 'Payment Processing',
    description: 'Stripe integration, subscriptions, webhooks',
    value: 3200,
    hours: 32,
  },
  {
    id: 'database',
    item: 'Database Setup',
    description: 'Schema, migrations, ORM, seed data',
    value: 2400,
    hours: 24,
  },
  {
    id: 'ui',
    item: 'UI Component Library',
    description: '50+ components, design system, accessibility',
    value: 6000,
    hours: 60,
  },
  {
    id: 'email',
    item: 'Email System',
    description: 'Templates, delivery, tracking',
    value: 1600,
    hours: 16,
  },
  {
    id: 'admin',
    item: 'Admin Dashboard',
    description: 'User management, analytics, settings',
    value: 4800,
    hours: 48,
  },
  {
    id: 'testing',
    item: 'Testing Infrastructure',
    description: 'Unit, integration, E2E tests, CI/CD',
    value: 3200,
    hours: 32,
  },
  {
    id: 'deployment',
    item: 'Deployment Configuration',
    description: 'Production setup, monitoring, CDN',
    value: 1600,
    hours: 16,
  },
  {
    id: 'docs',
    item: 'Documentation',
    description: 'Setup guides, API docs, deployment guides',
    value: 2400,
    hours: 24,
  },
  {
    id: 'security',
    item: 'Security Implementation',
    description: 'CSRF, rate limiting, CSP, headers',
    value: 2000,
    hours: 20,
  },
] as const;

export const VALUE_TOTALS_EXAMPLE = {
  subtotal: 31200, // Sum of all value items
  hourlyRate: 100, // Example hourly rate
  totalHours: 312, // Sum of all hours
  discount: 21200, // How much they save vs building themselves
  yourPrice: 10000, // Example product price
  savingsPercent: 68, // (discount / subtotal) * 100
} as const;

// Receipt-style breakdown
export const VALUE_RECEIPT_EXAMPLE = {
  lineItems: VALUE_ITEMS_EXAMPLE,
  subtotal: 31200,
  discountLabel: 'Your Savings (68% off)',
  discountAmount: -21200,
  total: 10000,
  currency: 'USD',
  displayTotal: '$10,000',
  note: 'One-time payment. Lifetime access. No recurring fees.',
} as const;

// Comparison format
export const VALUE_COMPARISON_EXAMPLE = {
  buildYourself: {
    label: 'Build Yourself',
    cost: 31200,
    time: '312 hours (~2 months)',
    maintenance: 'Ongoing',
    risk: 'High (bugs, security)',
  },
  useBoilerplate: {
    label: 'Use This Boilerplate',
    cost: 10000,
    time: 'Ship in days',
    maintenance: 'Updates included',
    risk: 'Low (battle-tested)',
  },
  savings: {
    money: 21200,
    time: '312 hours',
    percent: 68,
  },
} as const;
