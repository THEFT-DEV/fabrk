/**
 * Included Features Data - Checklist of table-stakes features
 * Used by: WhatsIncludedSection (uses BenefitCard component)
 * Moves commodity features (Auth/Billing/Multi-tenancy) from hero to "included" list
 */

import { Server, Code, Palette } from 'lucide-react';
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from './stats';

export const INCLUDED_FEATURES = [
  {
    id: 'infrastructure',
    icon: Server,
    module: 'INFRASTRUCTURE',
    code: '0x50',
    benefit: 'RAPIDLY BUILD YOUR SAAS FOUNDATION',
    description:
      'Integrated authentication, diverse payment gateways, robust database, and seamless email. Reduce setup from weeks to hours.',
    timeSaved: '~1 DAY',
    costSaved: 'MINIMAL',
    features: [
      'NEXTAUTH V5 (GOOGLE OAUTH, MAGIC LINKS, EMAIL/PASSWORD)',
      'STRIPE, LEMON SQUEEZY, POLAR.SH PAYMENT PROCESSING',
      'MULTI-TENANCY (ORGANIZATIONS, TEAMS, PERMISSIONS)',
      'PRISMA ORM WITH POSTGRESQL DATABASE',
      'RESEND EMAIL INTEGRATION (TRANSACTIONAL + MARKETING)',
    ],
  },
  {
    id: 'development',
    icon: Code,
    module: 'DEVELOPMENT',
    code: '0x51',
    benefit: 'SHIP WITH CONFIDENCE',
    description:
      'Production-grade tooling with strict TypeScript, automated linting, and quality enforcement. No technical debt from day one.',
    timeSaved: '100%',
    costSaved: 'STRICT',
    features: [
      'TYPESCRIPT STRICT MODE WITH FULL TYPE SAFETY',
      'ESLINT + PRETTIER PRE-COMMIT HOOKS',
      '58-FILE DESIGN SYSTEM AUDIT ENFORCEMENT',
      'ENVIRONMENT VARIABLE VALIDATION (ZOD)',
      'GIT HOOKS FOR QUALITY CONTROL',
    ],
  },
  {
    id: 'ui',
    icon: Palette,
    module: 'UI LIBRARY',
    code: '0x52',
    benefit: 'COMPLETE COMPONENT LIBRARY',
    description:
      'Terminal-inspired design system with accessible, responsive components. Theme-ready out of the box with dark mode support.',
    timeSaved: COMPONENT_COUNT_STRING,
    costSaved: THEME_COUNT_STRING,
    features: [
      `${COMPONENT_COUNT_STRING} PRODUCTION-READY UI COMPONENTS`,
      `${THEME_COUNT_STRING} TERMINAL-INSPIRED THEMES`,
      'WCAG 2.1 AA ACCESSIBILITY COMPLIANCE',
      'FULLY RESPONSIVE MOBILE DESIGN',
      'DARK MODE SUPPORT',
    ],
  },
] as const;
