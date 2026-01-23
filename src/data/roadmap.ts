/**
 * Roadmap Data
 *
 * Product roadmap and planned features
 * Last updated: 2026-01-22
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
    date: 'Q1 2026',
    title: 'IN PROGRESS',
    items: [
      {
        status: 'building',
        title: 'OKLCH Color Migration',
        description: 'Replacing remaining hex colors with OKLCH design tokens for full theme consistency',
      },
    ],
  },
];
