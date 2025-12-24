/**
 * Use Cases Data - Target personas with pain points and solutions
 */

import { User, Users, Building2 } from 'lucide-react';

export const USE_CASES = [
  {
    id: 'solo-founders',
    persona: 'SOLO FOUNDERS',
    icon: User,
    painPoint: 'You waste months building auth and billing from scratch.',
    solution: 'Launch your MVP in days—production infrastructure included.',
    features: ['NextAuth v5', 'Stripe + Lemon Squeezy', 'Email templates', 'Admin dashboard'],
  },
  {
    id: 'dev-teams',
    persona: 'DEV TEAMS',
    icon: Users,
    painPoint: 'Your team rebuilds the same SaaS features for every project.',
    solution: 'Standardize on Fabrk and 10× your team velocity today.',
    features: ['Multi-tenancy', 'Team management', 'Role-based access', 'Audit logs'],
  },
  {
    id: 'agencies',
    persona: 'AGENCIES',
    icon: Building2,
    painPoint: 'Client projects drain profit margins on repetitive boilerplate.',
    solution: 'Deliver faster, pocket the savings, and scale effortlessly.',
    features: ['White-label ready', 'Client billing', 'Custom domains', 'Brand customization'],
  },
] as const;
