/**
 * ✅ FABRK COMPONENT
 * Documentation Structure Data
 * Production-ready ✓
 */

import { Rocket, Code, Book, Settings } from 'lucide-react';
import { COMPONENT_COUNT_STRING } from '@/data/landing/stats';

// Documentation structure
export const docsStructure = [
  {
    section: 'Getting Started',
    icon: Rocket,
    pages: [
      { id: 'intro', title: 'Introduction', badge: null },
      { id: 'installation', title: 'Installation', badge: null },
      { id: 'quick-start', title: 'Quick Start', badge: 'Popular' },
      { id: 'env-setup', title: 'Environment Setup', badge: null },
    ],
  },
  {
    section: 'Core Features',
    icon: Code,
    pages: [
      { id: 'auth', title: 'Authentication', badge: null },
      { id: 'database', title: 'Database & Prisma', badge: null },
      { id: 'payments', title: 'Stripe Payments', badge: null },
      { id: 'emails', title: 'Email System', badge: null },
    ],
  },
  {
    section: 'Components',
    icon: Book,
    pages: [
      { id: 'ui-components', title: 'UI Components', badge: null },
      { id: 'forms', title: 'Forms & Validation', badge: null },
      { id: 'tables', title: 'Data Tables', badge: null },
      { id: 'layouts', title: 'Page Layouts', badge: null },
    ],
  },
  {
    section: 'Configuration',
    icon: Settings,
    pages: [
      { id: 'config', title: 'Central Config', badge: null },
      { id: 'styling', title: 'Styling & Themes', badge: null },
      { id: 'deployment', title: 'Deployment', badge: null },
    ],
  },
];

// Sample documentation content
export const docContent = {
  'quick-start': {
    title: 'Quick Start Guide',
    description: 'Get up and running with Fabrk in 5 minutes',
    lastUpdated: 'November 10, 2024',
    content: `
Welcome to Fabrk! This guide will help you get started in minutes.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ installed
- A PostgreSQL database (local or hosted)
- Stripe account (for payments)
- Resend account (for emails)

## Installation

First, clone the repository and install dependencies:


\`\`\`bash
git clone https://github.com/fabrk/fabrk.git
cd fabrk
npm install
\`\`\`

## Environment Setup

Copy the example environment file:


\`\`\`bash
cp .env.example .env.local
\`\`\`

Then update <code>.env.local</code> with your credentials:


\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/fabrk"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Resend)
RESEND_API_KEY="re_..."
\`\`\`

## Database Setup

Push the Prisma schema to your database:


\`\`\`bash
npm run db:push
\`\`\`

## Start Development Server

Run the development server:


\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your app!

## Next Steps

Now that you're set up, explore these guides:

- [Authentication Setup](/docs/auth) - Configure OAuth providers
- [Stripe Integration](/docs/payments) - Set up payments
- [Email Templates](/docs/emails) - Customize transactional emails
- [UI Components](/docs/ui-components) - Browse ${COMPONENT_COUNT_STRING} components

## Need Help?

- [Full Documentation](/docs)
- [GitHub Discussions](https://github.com/your-org/your-repo/discussions)
- [Report Issues](https://github.com/your-org/your-repo/issues)
    `,
  },
};
