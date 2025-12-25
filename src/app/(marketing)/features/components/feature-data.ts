/**
 * ✅ FABRK COMPONENT
 * Feature Data - All feature categories and stats
 * Production-ready ✓
 */

import {
  Lock,
  CreditCard,
  Database,
  Zap,
  Users,
  Settings,
  Code,
  Mail,
  Layers,
  Palette,
  FileCode,
  TestTube,
  BookOpen,
  Globe,
  Coins,
  Bot,
} from 'lucide-react';

// Dynamic counts from source of truth
import { COUNT_STRINGS } from '@/data/counts';
const TEMPLATE_COUNT_STRING = COUNT_STRINGS.templates;
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from '@/data/landing/stats';

// Core feature categories with detailed information
export const FEATURE_CATEGORIES = [
  {
    id: 'authentication',
    icon: Lock,
    title: 'Authentication & Security',
    tagline: 'Enterprise-grade auth out of the box',
    description:
      'Complete authentication system with NextAuth v5. Email/password, OAuth providers, magic links, 2FA, session management, and password reset - all production-ready.',
    features: [
      'Email/password with bcrypt hashing',
      'Google OAuth integration',
      'Magic link passwordless auth',
      'Two-factor authentication (TOTP)',
      'Session management & versioning',
      'Password reset with email',
      'Email verification flow',
      'Remember me functionality',
    ],
    stats: { label: 'Auth flows', value: '8+' },
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Multi-Provider Payments',
    tagline: 'Monetize from day one',
    description:
      'Full payment integration with Stripe, Polar, and Lemonsqueezy. One-time payments, subscriptions, customer portal, invoicing, webhook handling, and idempotency built-in.',
    features: [
      'Stripe integration (primary)',
      'Polar.sh integration',
      'Lemonsqueezy integration',
      'One-time & recurring payments',
      'Customer billing portal',
      'Webhook event handling',
      'Idempotent checkout sessions',
      'Payment history tracking',
    ],
    stats: { label: 'Payment providers', value: '3' },
  },
  {
    id: 'database',
    icon: Database,
    title: 'Database & ORM',
    tagline: 'Type-safe data layer',
    description:
      'PostgreSQL with Prisma ORM. 24 pre-built models for users, organizations, payments, webhooks, and more. Type-safe queries with full migration support.',
    features: [
      'PostgreSQL database',
      'Prisma ORM with migrations',
      '24 data models included',
      'Type-safe queries',
      'Relationship management',
      'Database seeding scripts',
      'Prisma Studio GUI',
      'Connection pooling ready',
    ],
    stats: { label: 'Data models', value: '24' },
  },
  {
    id: 'multitenancy',
    icon: Users,
    title: 'Multi-Tenancy & RBAC',
    tagline: 'Built for teams',
    description:
      'Complete organization/workspace system with role-based access control. Owner, Admin, Member, Guest roles with granular permissions and data isolation.',
    features: [
      'Organization workspaces',
      '4 role levels (Owner/Admin/Member/Guest)',
      'Role-based permissions',
      'Member invitation system',
      'Per-organization data isolation',
      'Permission checking middleware',
      'Team member management UI',
      'Organization settings',
    ],
    stats: { label: 'Role levels', value: '4' },
  },
  {
    id: 'realtime',
    icon: Zap,
    title: 'Real-Time Features',
    tagline: 'Live updates everywhere',
    description:
      'Pusher integration for real-time notifications, activity feeds, and presence tracking. WebSocket connections managed automatically.',
    features: [
      'Real-time notifications',
      'Live activity feeds',
      'User presence tracking',
      'Channel authorization',
      'Online status indicators',
      'Notification center UI',
      'Event broadcasting',
      'Private channels',
    ],
    stats: { label: 'Real-time events', value: '10+' },
  },
  {
    id: 'api',
    icon: Code,
    title: 'API Keys & Webhooks',
    tagline: 'Developer-friendly integrations',
    description:
      'Secure API key system with permission levels. Production-grade webhooks with HMAC signing, automatic retries, and delivery tracking.',
    features: [
      'Cryptographic API keys',
      '3 permission levels (read/write/admin)',
      '8 notification event types',
      'HMAC-SHA256 signatures',
      'Automatic retry with backoff',
      'Delivery history tracking',
      'Webhook subscription UI',
      'Event filtering',
    ],
    stats: { label: 'Notification types', value: '8' },
  },
  {
    id: 'admin',
    icon: Settings,
    title: 'Admin Dashboard',
    tagline: 'Complete back-office',
    description:
      'Full admin interface with user management, analytics, system health, and debugging tools. User impersonation, audit logs, and feature flags included.',
    features: [
      'User management table',
      'Organization overview',
      'Revenue analytics charts',
      'System health monitoring',
      'User impersonation',
      'Audit log viewer',
      'Feature flag management',
      'Activity dashboard',
    ],
    stats: { label: 'Admin tools', value: '8+' },
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email System',
    tagline: 'Transactional emails that work',
    description:
      'Resend integration with React Email templates. Email queue with automatic retries, status tracking, and batch sending for marketing.',
    features: [
      'Resend API integration',
      'React Email templates',
      'Email queue system',
      'Automatic retry logic',
      'Delivery status tracking',
      'Welcome email sequences',
      'Template variables',
      'Batch sending support',
    ],
    stats: { label: 'Email templates', value: '5+' },
  },
  {
    id: 'ai-credits',
    icon: Coins,
    title: 'AI Credits System',
    tagline: 'Token-based AI billing',
    description:
      'Complete credit/token billing system for AI features. Track usage per endpoint, monthly allowances by tier, purchase packs, and detailed transaction history.',
    features: [
      'Credit balance tracking',
      'Per-endpoint usage metering',
      'Tier-based monthly allowances',
      'Credit purchase packs',
      'Transaction history',
      'Usage analytics dashboard',
      'Automatic refill on subscription',
      'Insufficient credits handling',
    ],
    stats: { label: 'Transaction types', value: '5' },
  },
  {
    id: 'mcp-server',
    icon: Bot,
    title: 'MCP Server (AI Dev Tool)',
    tagline: 'AI-assisted component generation',
    description:
      'Model Context Protocol server for AI coding assistants. Query component catalog, generate components with Fabrk styling, and validate code against design system rules.',
    features: [
      `${COMPONENT_COUNT_STRING} component catalog`,
      'AI-assisted scaffolding',
      'Design system validation',
      'Props & variants documentation',
      'Accessibility guidelines',
      'Claude Code integration',
      'Cursor IDE support',
      'Terminal aesthetic enforcement',
    ],
    stats: { label: 'Components', value: COMPONENT_COUNT_STRING },
  },
];

// Component library stats
export const COMPONENT_STATS = [
  {
    icon: Layers,
    label: 'UI Components',
    value: COMPONENT_COUNT_STRING,
    description: 'Production-ready components',
  },
  {
    icon: Palette,
    label: 'Color Themes',
    value: THEME_COUNT_STRING,
    description: 'Terminal themes included',
  },
  {
    icon: FileCode,
    label: 'Page Templates',
    value: TEMPLATE_COUNT_STRING,
    description: 'Copy-paste ready pages',
  },
  {
    icon: TestTube,
    label: 'Tests',
    value: '40+',
    description: 'Vitest & Playwright',
  },
  {
    icon: BookOpen,
    label: 'Documentation',
    value: '50+',
    description: 'Comprehensive guides',
  },
  { icon: Globe, label: 'Languages', value: '6', description: 'i18n ready' },
];

// Tech stack
export const TECH_STACK = [
  { name: 'Next.js 16', description: 'App Router, React 19', icon: Globe },
  { name: 'TypeScript', description: 'Strict mode, 100% typed', icon: Code },
  { name: 'Tailwind CSS 4', description: 'Latest with OKLCH', icon: Palette },
  { name: 'Prisma', description: 'Type-safe ORM', icon: Database },
  { name: 'NextAuth v5', description: 'Modern auth', icon: Lock },
  { name: 'Stripe', description: 'Payments & billing', icon: CreditCard },
  { name: 'Resend', description: 'Email delivery', icon: Mail },
  { name: 'Pusher', description: 'Real-time WebSockets', icon: Zap },
];
