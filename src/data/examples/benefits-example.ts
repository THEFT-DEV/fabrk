/**
 * Generic Benefits Example
 *
 * Replace with your product's unique value propositions.
 * Focus on outcomes, not features.
 */

import { Zap, Shield, Rocket, Code, Users, TrendingUp } from 'lucide-react';

export const BENEFITS_EXAMPLE = [
  {
    id: 'fast-setup',
    icon: Zap,
    code: '0x01',
    title: 'Launch in Days, Not Months',
    benefit: 'Ship your product 10x faster',
    description:
      'Pre-built authentication, payments, and database schemas. Focus on your unique features instead of rebuilding the same infrastructure.',
    timeSaved: '100+ HRS',
    features: [
      'Authentication & Authorization',
      'Payment Processing',
      'Database Schema',
      'Email Templates',
      'Admin Dashboard',
    ],
  },
  {
    id: 'production-ready',
    icon: Shield,
    code: '0x02',
    title: 'Production-Ready from Day One',
    benefit: 'Built for scale, not prototypes',
    description:
      'Enterprise-grade security, performance optimization, and error handling. Tested patterns used by thousands of production apps.',
    features: [
      'Security Best Practices',
      'Performance Optimized',
      'Error Handling',
      'Monitoring & Logging',
      'Automated Testing',
    ],
  },
  {
    id: 'full-stack',
    icon: Code,
    code: '0x03',
    title: 'Complete Full-Stack Solution',
    benefit: 'Everything you need in one package',
    description:
      'Frontend, backend, database, payments, and deployment. No need to stitch together 20 different tools and libraries.',
    features: [
      'Modern Tech Stack',
      'Type-Safe APIs',
      'Database Migrations',
      'File Upload',
      'Real-time Updates',
    ],
  },
  {
    id: 'scalable',
    icon: Rocket,
    code: '0x04',
    title: 'Built to Scale',
    benefit: 'From MVP to millions of users',
    description:
      'Architecture patterns that scale. Start simple and grow without rewriting your entire codebase.',
    features: [
      'Horizontal Scaling',
      'Caching Strategy',
      'Background Jobs',
      'Rate Limiting',
      'Multi-tenancy',
    ],
  },
  {
    id: 'team-ready',
    icon: Users,
    code: '0x05',
    title: 'Team Collaboration Built-In',
    benefit: 'Work together seamlessly',
    description:
      'Role-based access, team management, and collaboration features out of the box. No additional setup required.',
    features: [
      'User Roles & Permissions',
      'Team Management',
      'Activity Logs',
      'Invitation System',
      'Workspace Sharing',
    ],
  },
  {
    id: 'analytics',
    icon: TrendingUp,
    code: '0x06',
    title: 'Analytics & Insights',
    benefit: 'Make data-driven decisions',
    description:
      'Track user behavior, conversions, and business metrics. Understand what drives growth for your product.',
    features: [
      'User Analytics',
      'Conversion Tracking',
      'Custom Events',
      'Revenue Metrics',
      'Retention Reports',
    ],
  },
] as const;
