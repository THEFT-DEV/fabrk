/**
 * Generic Included Features Example
 *
 * Replace with your actual feature list.
 * These are format examples showing the expected structure.
 */

import {
  Database,
  Code,
  Palette,
  Shield,
  Zap,
  Mail,
  CreditCard,
  Users,
  FileText,
  Settings,
} from 'lucide-react';

export const INCLUDED_FEATURES_EXAMPLE = [
  {
    id: 'infrastructure',
    category: 'Infrastructure',
    icon: Database,
    description: 'Production-ready backend services',
    features: [
      'PostgreSQL database with Prisma ORM',
      'Redis caching for performance',
      'Email service integration (Resend/SendGrid)',
      'File storage (S3 compatible)',
      'Environment configuration',
    ],
  },
  {
    id: 'development',
    category: 'Development',
    icon: Code,
    description: 'Modern development workflow',
    features: [
      'TypeScript with strict mode',
      'ESLint and Prettier configured',
      'Git hooks with Husky',
      'Hot reload development server',
      'Production build optimization',
    ],
  },
  {
    id: 'ui-components',
    category: 'UI Components',
    icon: Palette,
    description: 'Beautiful, accessible components',
    features: [
      '50+ pre-built components',
      'Radix UI primitives',
      'Tailwind CSS styling',
      'Dark mode support',
      'Responsive design',
    ],
  },
  {
    id: 'authentication',
    category: 'Authentication',
    icon: Shield,
    description: 'Secure user authentication',
    features: [
      'Email/password authentication',
      'OAuth providers (Google, GitHub)',
      'Magic link login',
      'Session management',
      'Role-based access control',
    ],
  },
  {
    id: 'performance',
    category: 'Performance',
    icon: Zap,
    description: 'Fast and optimized',
    features: [
      'Server-side rendering',
      'Static site generation',
      'Image optimization',
      'Code splitting',
      'CDN integration',
    ],
  },
  {
    id: 'email',
    category: 'Email',
    icon: Mail,
    description: 'Transactional email templates',
    features: [
      'Welcome email',
      'Password reset',
      'Email verification',
      'Receipt notifications',
      'Custom templates',
    ],
  },
  {
    id: 'payments',
    category: 'Payments',
    icon: CreditCard,
    description: 'Payment processing ready',
    features: [
      'Stripe integration',
      'Subscription management',
      'One-time payments',
      'Webhook handling',
      'Invoice generation',
    ],
  },
  {
    id: 'multi-tenancy',
    category: 'Multi-Tenancy',
    icon: Users,
    description: 'Team and organization support',
    features: [
      'Organization management',
      'Team member invitations',
      'Role permissions',
      'Usage tracking per organization',
      'Billing per organization',
    ],
  },
  {
    id: 'documentation',
    category: 'Documentation',
    icon: FileText,
    description: 'Comprehensive guides',
    features: [
      'Getting started guide',
      'API documentation',
      'Component documentation',
      'Deployment guides',
      'Troubleshooting tips',
    ],
  },
  {
    id: 'admin',
    category: 'Admin Dashboard',
    icon: Settings,
    description: 'Manage your application',
    features: [
      'User management',
      'Analytics dashboard',
      'Feature flags',
      'System settings',
      'Audit logs',
    ],
  },
] as const;
