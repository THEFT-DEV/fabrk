/**
 * Generic Use Cases Example
 *
 * Replace with your actual target personas and use cases.
 * These are format examples showing the expected structure.
 */

import { User, Users, Building2, Code } from 'lucide-react';

export const USE_CASES_EXAMPLE = [
  {
    id: 'solo-founder',
    persona: 'Solo Founders',
    icon: User,
    tagline: 'Ship your MVP in days, not months',
    painPoint: 'Need to validate ideas quickly without a team or technical co-founder',
    solution:
      'Pre-built authentication, payments, and database setup lets you focus on your unique features',
    features: [
      'Complete auth system',
      'Payment processing ready',
      'Admin dashboard included',
    ],
    cta: 'Start Building',
  },
  {
    id: 'dev-team',
    persona: 'Development Teams',
    icon: Users,
    tagline: 'Accelerate development with battle-tested code',
    painPoint:
      'Tired of rebuilding the same features for every project, wasting sprint cycles',
    solution:
      'Production-ready boilerplate with modern best practices saves weeks of development time',
    features: [
      'TypeScript strict mode',
      'Comprehensive test coverage',
      'CI/CD workflows included',
    ],
    cta: 'See Templates',
  },
  {
    id: 'agency',
    persona: 'Agencies',
    icon: Building2,
    tagline: 'Deliver client projects faster and more profitably',
    painPoint:
      'Client projects have tight deadlines but require robust, scalable solutions',
    solution:
      'White-label ready template with professional code quality and documentation',
    features: [
      'Easy rebrand and customization',
      'Commercial license included',
      'Multi-tenant architecture',
    ],
    cta: 'View Pricing',
  },
  {
    id: 'indie-hacker',
    persona: 'Indie Hackers',
    icon: Code,
    tagline: 'Launch multiple products without starting from scratch',
    painPoint:
      'Building side projects while working full-time means every hour counts',
    solution:
      'Copy-paste ready components and templates let you ship faster than competitors',
    features: [
      'Modern tech stack',
      'SEO optimized out of the box',
      'One-click deployment',
    ],
    cta: 'Get Started',
  },
] as const;
