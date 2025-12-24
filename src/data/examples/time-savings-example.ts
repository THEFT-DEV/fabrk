/**
 * Generic Time Savings Example
 *
 * Replace with realistic time estimates for your product.
 * These are format examples showing the expected structure.
 */

export const TIME_BREAKDOWN_EXAMPLE = [
  {
    id: 'auth',
    task: 'Authentication System',
    hours: 40,
    description:
      'Email/password auth, OAuth providers, session management, password reset',
    activities: [
      'OAuth integration (Google, GitHub)',
      'Session management with JWT',
      'Password reset flow',
      'Email verification',
      'Protected routes',
    ],
  },
  {
    id: 'payments',
    task: 'Payment Processing',
    hours: 32,
    description:
      'Stripe integration, subscription logic, webhook handling, billing portal',
    activities: [
      'Stripe API integration',
      'Subscription plan management',
      'Webhook event handling',
      'Customer portal',
      'Invoice generation',
    ],
  },
  {
    id: 'database',
    task: 'Database Setup',
    hours: 24,
    description:
      'Schema design, migrations, ORM configuration, seed data',
    activities: [
      'Database schema design',
      'Prisma ORM setup',
      'Migration system',
      'Seed data scripts',
      'Query optimization',
    ],
  },
  {
    id: 'ui-components',
    task: 'UI Component Library',
    hours: 60,
    description:
      'Design system, reusable components, accessibility, responsive design',
    activities: [
      'Design system tokens',
      'Primitive components',
      'Composite components',
      'Accessibility compliance',
      'Responsive layouts',
    ],
  },
  {
    id: 'email',
    task: 'Email System',
    hours: 16,
    description:
      'Email service integration, template design, delivery tracking',
    activities: [
      'Email service setup (Resend)',
      'Transactional templates',
      'Email sending logic',
      'Delivery tracking',
      'Unsubscribe handling',
    ],
  },
  {
    id: 'admin',
    task: 'Admin Dashboard',
    hours: 48,
    description: 'User management, analytics, settings, feature flags',
    activities: [
      'User management interface',
      'Analytics dashboard',
      'System settings',
      'Feature flag system',
      'Audit log viewer',
    ],
  },
  {
    id: 'testing',
    task: 'Testing Infrastructure',
    hours: 32,
    description: 'Unit tests, integration tests, E2E tests, CI/CD',
    activities: [
      'Test framework setup',
      'Unit test coverage',
      'Integration tests',
      'E2E test suite',
      'CI/CD pipelines',
    ],
  },
  {
    id: 'deployment',
    task: 'Deployment Setup',
    hours: 16,
    description:
      'Production configuration, environment setup, monitoring',
    activities: [
      'Production environment',
      'Environment variables',
      'Database provisioning',
      'CDN configuration',
      'Error monitoring',
    ],
  },
  {
    id: 'docs',
    task: 'Documentation',
    hours: 24,
    description:
      'Setup guides, API docs, component docs, deployment guides',
    activities: [
      'Getting started guide',
      'API reference docs',
      'Component documentation',
      'Deployment guides',
      'Troubleshooting guides',
    ],
  },
  {
    id: 'security',
    task: 'Security Implementation',
    hours: 20,
    description: 'CSRF protection, rate limiting, input validation, CSP',
    activities: [
      'CSRF protection',
      'Rate limiting',
      'Input validation',
      'Content Security Policy',
      'Security headers',
    ],
  },
] as const;

// Summary calculations
export const TIME_SAVINGS_SUMMARY_EXAMPLE = {
  totalHours: 312,
  totalWeeks: 7.8, // 40-hour weeks
  totalMonths: 1.95, // ~2 months
  hourlyRate: 100, // Example rate
  totalValue: 31200, // totalHours * hourlyRate
  breakdown: {
    development: 204, // Auth + Payments + Database + UI + Email
    infrastructure: 48, // Testing + Deployment
    documentation: 24,
    security: 20,
    admin: 48,
  },
} as const;
