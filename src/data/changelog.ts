/**
 * Changelog Data
 *
 * Auto-generated from GitHub releases
 * Last synced: 2025-12-25T19:31:18.791Z
 *
 * Run `npm run sync:changelog` to update
 */

export type ChangeType = 'added' | 'changed' | 'fixed' | 'removed' | 'security' | 'deprecated';

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  url?: string;
  changes: {
    type: ChangeType;
    description: string;
  }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.2.0",
    date: "2026-01-04",
    title: "M3 TYPOGRAPHY SYSTEM",
    changes: [
      {
        type: 'added',
        description: "**M3 Type Scale** - Complete Material Design 3 typography tokens (display, headline, title, body, label)"
      },
      {
        type: 'added',
        description: "**Size Variants** - All categories now have l/m/s sizes (e.g., `text-headline-l`, `text-body-m`)"
      },
      {
        type: 'added',
        description: "**Display XL** - New 88px/96px display size for hero sections"
      },
      {
        type: 'added',
        description: "**Code Typography** - Dedicated code-l/m/s tokens for terminal output"
      },
      {
        type: 'changed',
        description: "Line-heights now use fixed pixel values per M3 spec (not ratios)"
      },
      {
        type: 'changed',
        description: "Font weights aligned to M3 standards (500 for display/headline)"
      },
      {
        type: 'changed',
        description: "Responsive scaling for screens under 600px width"
      },
      {
        type: 'changed',
        description: "Design system primitives updated with M3-aligned font sizes"
      },
      {
        type: 'fixed',
        description: "Letter-spacing values corrected per M3 specification"
      }
    ]
  },
  {
    version: "1.1.0",
    date: "2025-12-27",
    title: "FONT PAIRINGS AND ACCESSIBILITY",
    changes: [
      {
        type: 'added',
        description: "**Bidirectional Font Pairings** - 34 display/body font combinations for headlines and content"
      },
      {
        type: 'added',
        description: "**6 FUI Themes** - Blueprint, Cyberpunk, Navigator, Phosphor, Holographic, Infrared"
      },
      {
        type: 'added',
        description: "**Code Syntax Highlighting** - Complete `--code-*` variables for all 18 themes"
      },
      {
        type: 'added',
        description: "**Extended Chart Colors** - `chart-6` through `chart-9` added to all themes"
      },
      {
        type: 'added',
        description: "**Style Guide Template** - Comprehensive design system reference in `/library`"
      },
      {
        type: 'changed',
        description: "All 18 themes now pass WCAG AA accessibility audit"
      },
      {
        type: 'changed',
        description: "FUI theme border contrast improved (3:1 minimum for UI components)"
      },
      {
        type: 'fixed',
        description: "Blueprint theme border contrast (45% → 55%) for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Cyberpunk theme border contrast (25% → 38%) for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Navigator theme border contrast (30% → 36%) for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Phosphor theme border contrast (25% → 35%) for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Red/Infrared theme code comment contrast for readability"
      }
    ]
  },
  {
    version: "1.0.1",
    date: "2025-12-25",
    title: "DYNAMIC RADIUS SYSTEM",
    changes: [
      {
        type: 'changed',
        description: "**Dynamic Border Radius System** - Components now use `mode.radius` which maps to CSS `var(--radius)`, allowing themes to control border radius dynamically"
      },
      {
        type: 'changed',
        description: "All 78+ UI components updated to use `mode.radius` instead of hardcoded `rounded-none`"
      },
      {
        type: 'changed',
        description: "Design system documentation comprehensively updated across 18+ files"
      },
      {
        type: 'fixed',
        description: "Calendar component layout and centering issues"
      },
      {
        type: 'fixed',
        description: "ScrollArea radius applied to correct element (outer container)"
      },
      {
        type: 'fixed',
        description: "InputOTP spacing when rounded"
      },
      {
        type: 'fixed',
        description: "Progress bar height and radius support"
      },
      {
        type: 'fixed',
        description: "Table headers no longer break when themes use rounded corners"
      },
      {
        type: 'removed',
        description: "Sticky CTA bar from landing pages (component retained for optional use)"
      }
    ]
  },
  {
    version: "1.0.0",
    date: "2025-12-24",
    title: "INITIAL RELEASE",
    changes: [
      {
        type: 'added',
        description: "78+ production-ready UI components"
      },
      {
        type: 'added',
        description: "12 terminal color themes"
      },
      {
        type: 'added',
        description: "Multi-provider payments (Stripe, Polar, Lemonsqueezy)"
      },
      {
        type: 'added',
        description: "NextAuth v5 authentication with session management"
      },
      {
        type: 'added',
        description: "Full TypeScript support"
      },
      {
        type: 'added',
        description: "Prisma 7 with PostgreSQL"
      },
      {
        type: 'added',
        description: "Resend email integration"
      },
      {
        type: 'added',
        description: "Terminal-first design system"
      },
      {
        type: 'added',
        description: "Internationalization support (6 languages)"
      },
      {
        type: 'added',
        description: "PostHog analytics integration"
      },
      {
        type: 'added',
        description: "Comprehensive test suite (Vitest + Playwright)"
      },
      {
        type: 'added',
        description: "Security middleware with rate limiting and bot detection"
      },
      {
        type: 'added',
        description: "Audit logging for sensitive operations"
      },
      {
        type: 'security',
        description: "Global rate limiting on all API routes"
      },
      {
        type: 'security',
        description: "Bot detection on authentication routes"
      },
      {
        type: 'security',
        description: "User enumeration prevention"
      },
      {
        type: 'security',
        description: "CSRF protection"
      },
      {
        type: 'security',
        description: "Session versioning for security events"
      }
    ]
  }
];

export function getChangelogByType(type?: ChangeType): ChangelogEntry[] {
  if (!type) return CHANGELOG;
  return CHANGELOG.map((entry) => ({
    ...entry,
    changes: entry.changes.filter((c) => c.type === type),
  })).filter((entry) => entry.changes.length > 0);
}

export function getLatestVersion(): string {
  return CHANGELOG[0]?.version ?? '0.0.0';
}
