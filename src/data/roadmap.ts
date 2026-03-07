/**
 * Roadmap Data
 *
 * Product roadmap and planned features
 * Last updated: 2026-03-07
 */

export type RoadmapStatus = 'shipped' | 'in_progress' | 'building' | 'planned' | 'exploring';

export interface RoadmapItem {
  status: RoadmapStatus;
  title: string;
  description: string;
  version?: string;
}

export interface RoadmapSection {
  phase: string;
  date: string;
  title: string;
  items: RoadmapItem[];
}

export const ROADMAP: RoadmapSection[] = [
  {
    phase: '1.3',
    date: 'January 2026',
    title: 'RECENTLY SHIPPED',
    items: [
      {
        status: 'shipped',
        title: 'Component Architecture Cleanup',
        description:
          'Moved business logic out of /ui/, created /charts/ directory, split card.tsx from 890 to 250 lines',
        version: 'v1.3.1',
      },
      {
        status: 'shipped',
        title: 'Security Hardening',
        description:
          'HMAC-signed cookies, email verification flow, XSS prevention, atomic password reset tokens',
        version: 'v1.3.0',
      },
      {
        status: 'shipped',
        title: 'M3 Typography System',
        description: 'Material Design 3 typography tokens with responsive scaling under 600px',
        version: 'v1.2.0',
      },
      {
        status: 'shipped',
        title: 'WCAG AA Compliance',
        description: 'All 18 themes pass accessibility audit with proper contrast ratios',
        version: 'v1.1.0',
      },
    ],
  },
  {
    phase: '1.4',
    date: 'March 2026',
    title: 'RECENTLY SHIPPED',
    items: [
      {
        status: 'shipped',
        title: 'Internationalization (i18n)',
        description:
          'Cookie-based locale detection with next-intl, 6 languages, locale switcher in nav',
        version: 'v1.4.0',
      },
      {
        status: 'shipped',
        title: 'Proxy Architecture',
        description: 'Split proxy.ts into 8 focused modules, fixed double rate-limit bug',
        version: 'v1.4.0',
      },
      {
        status: 'shipped',
        title: 'Compare Pages',
        description: '40+ feature comparison table across 8 categories at /compare',
        version: 'v1.4.0',
      },
      {
        status: 'shipped',
        title: 'Code Quality Sweep',
        description: 'Zod boundary validation, type safety improvements, dead code removal',
        version: 'v1.4.0',
      },
    ],
  },
];
