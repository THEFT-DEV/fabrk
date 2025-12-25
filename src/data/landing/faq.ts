/**
 * FAQ Data - Frequently asked questions
 * Centralized FAQ data used by FAQSection component
 */

import { COMPONENT_COUNT_STRING } from './stats';

export const FAQ_QUESTIONS = [
  {
    id: 'what-is-fabrk',
    question: 'What is Fabrk?',
    answer: `Fabrk is a production-ready Next.js 16 SaaS boilerplate with ${COMPONENT_COUNT_STRING} components, authentication, billing, multi-tenancy, and a unique terminal-inspired design system. It's designed to help you ship your SaaS in days, not months.`,
  },
  {
    id: 'license',
    question: 'What does the commercial license include?',
    answer:
      'The commercial license includes unlimited projects, unlimited clients, lifetime updates, and no recurring fees. Build and sell as many SaaS products as you need—no limits.',
  },
  {
    id: 'updates',
    question: 'How do updates work?',
    answer:
      'You get lifetime access to all future updates via GitHub. We continuously improve Fabrk with new components, features, and Next.js upgrades. No subscription required.',
  },
  {
    id: 'support',
    question: 'What kind of support do you provide?',
    answer:
      'Email support with 48-hour response time. Comprehensive documentation and setup guides included. We help with setup, deployment, and customization questions.',
  },
  {
    id: 'refunds',
    question: 'Do you offer refunds?',
    answer:
      'Due to the nature of digital products, all sales are final. However, we offer a detailed demo and documentation so you can evaluate Fabrk before purchasing.',
  },
  {
    id: 'tech-stack',
    question: 'What technologies are included?',
    answer:
      'Next.js 16 (App Router), React 19, TypeScript, NextAuth v5, Stripe/Lemon Squeezy/Polar.sh, Prisma, PostgreSQL, Tailwind CSS 4, Radix UI, Framer Motion, and more. Production-ready full stack.',
  },
  {
    id: 'customization',
    question: 'Can I customize the design?',
    answer:
      'Absolutely! Fabrk includes 12 terminal-inspired themes plus a theme generator for custom colors. All components are fully customizable with a centralized design system.',
  },
  {
    id: 'deployment',
    question: 'How do I deploy Fabrk?',
    answer:
      'Fabrk works with any hosting provider (Vercel, Railway, AWS, etc.). We include deployment guides and environment setup instructions for popular platforms.',
  },
] as const;
