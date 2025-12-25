/**
 * Testimonials Data - Customer quotes for Social Proof section
 * Note: These are example testimonials for demonstration purposes.
 * Replace with real customer feedback when available.
 */

import { COMPONENT_COUNT_STRING } from './stats';

export const TESTIMONIALS = [
  {
    id: 'example-1',
    quote:
      '[EXAMPLE]: Shipped my SaaS in 3 days instead of 3 months. The terminal UI is incredibly unique.',
    author: '[EXAMPLE] Customer Name',
    role: 'Solo Founder',
    avatar: '/avatars/placeholder-1.jpg',
    rating: 5,
  },
  {
    id: 'example-2',
    quote:
      "[EXAMPLE]: Best Next.js boilerplate I've used. Auth and billing work perfectly from day one.",
    author: '[EXAMPLE] Customer Name',
    role: 'CTO, Tech Company',
    avatar: '/avatars/placeholder-2.jpg',
    rating: 5,
  },
  {
    id: 'example-3',
    quote:
      '[EXAMPLE]: The multi-tenancy features saved us months of development. Worth every penny.',
    author: '[EXAMPLE] Customer Name',
    role: 'Lead Developer',
    avatar: '/avatars/placeholder-3.jpg',
    rating: 5,
  },
  {
    id: 'example-4',
    quote: `[EXAMPLE]: ${COMPONENT_COUNT_STRING} components that actually work. No more fighting with shadcn compatibility issues.`,
    author: '[EXAMPLE] Customer Name',
    role: 'Full-Stack Developer',
    avatar: '/avatars/placeholder-4.jpg',
    rating: 5,
  },
  {
    id: 'example-5',
    quote:
      '[EXAMPLE]: Finally, a boilerplate that respects your time. Terminal aesthetic is a nice touch.',
    author: '[EXAMPLE] Customer Name',
    role: 'Indie Hacker',
    avatar: '/avatars/placeholder-5.jpg',
    rating: 5,
  },
  {
    id: 'example-6',
    quote:
      '[EXAMPLE]: The accessibility is top-notch. WCAG 2.1 AA compliance out of the box is solid.',
    author: '[EXAMPLE] Customer Name',
    role: 'Agency Owner',
    avatar: '/avatars/placeholder-6.jpg',
    rating: 5,
  },
] as const;
