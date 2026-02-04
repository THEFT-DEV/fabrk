/**
 * Changelog Data
 *
 * Auto-generated from GitHub releases
 * Last synced: 2026-02-03T19:36:31.407Z
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
    version: "1.3.0",
    date: "2026-02-03",
    title: "AI-NATIVE_DESIGN_SYSTEM",
    changes: [
      {
        type: 'added',
        description: "**CONTEXT.md** - Master context file to paste into AI conversations"
      },
      {
        type: 'added',
        description: "**tokens.md** - Complete design token reference"
      },
      {
        type: 'added',
        description: "**rules.md** - 15 non-negotiable design rules"
      },
      {
        type: 'added',
        description: "**components.md** - 40+ component inventory with examples"
      },
      {
        type: 'added',
        description: "**patterns.md** - 15 common UI patterns with full code"
      },
      {
        type: 'added',
        description: "**prompts/** - Ready-to-use prompt templates for common tasks"
      },
      {
        type: 'added',
        description: "**examples/** - Before/after code examples"
      },
      {
        type: 'added',
        description: "Hardcoded colors (hex, rgb, Tailwind palette)"
      },
      {
        type: 'added',
        description: "Arbitrary Tailwind values"
      },
      {
        type: 'added',
        description: "Tailwind color classes instead of semantic tokens"
      },
      {
        type: 'added',
        description: "**Pre-commit hook** - Runs design-lint before every commit"
      },
      {
        type: 'added',
        description: "**CI/CD** - PR checks include design-lint validation"
      },
      {
        type: 'added',
        description: "**MCP Server** - Enhanced validate-code tool with 6 new rules"
      },
      {
        type: 'added',
        description: "Fixed duplicate H1 issue in blog posts"
      },
      {
        type: 'added',
        description: "MDX headings now properly shift down one level (h1→h2, h2→h3, etc.)"
      },
      {
        type: 'added',
        description: "Ensures proper SEO heading hierarchy"
      }
    ]
  },
  {
    version: "1.2.0",
    date: "2026-01-04",
    title: "M3_TYPOGRAPHY_SYSTEM",
    changes: [
      {
        type: 'added',
        description: "**M3 Type Scale** - Complete typography tokens following M3 conventions"
      },
      {
        type: 'added',
        description: "`display-xl/l/m/s` - Hero sections (88px → 36px)"
      },
      {
        type: 'added',
        description: "`headline-l/m/s` - Page titles (32px → 24px)"
      },
      {
        type: 'added',
        description: "`title-l/m/s` - Section headers (22px → 14px)"
      },
      {
        type: 'added',
        description: "`body-l/m/s` - Running text (16px → 12px)"
      },
      {
        type: 'added',
        description: "`label-l/m/s` - UI components (14px → 11px)"
      },
      {
        type: 'added',
        description: "`code-l/m/s` - Terminal output (16px → 12px)"
      },
      {
        type: 'added',
        description: "**Display XL** - New 88px/96px size for hero content"
      },
      {
        type: 'added',
        description: "**Responsive Scaling** - Automatic size reduction on screens < 600px"
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
    title: "FONT_PAIRINGS_&_ACCESSIBILITY",
    changes: [
      {
        type: 'added',
        description: "**Bidirectional Font Pairings** - 34 display/body font combinations for headlines and content"
      },
      {
        type: 'added',
        description: "**6 FUI (Futuristic UI) Themes** - Blueprint, Cyberpunk, Navigator, Phosphor, Holographic, Infrared"
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
        type: 'changed',
        description: "Code comment contrast fixed for readability in dark themes"
      },
      {
        type: 'changed',
        description: "Chart color duplicates removed from `:root` theme"
      },
      {
        type: 'fixed',
        description: "Blueprint theme border: 45% → 55% for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Cyberpunk theme border: 25% → 38% for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Navigator theme border: 30% → 36% for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Phosphor theme border: 25% → 35% for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Holographic theme border: 35% → 40% for WCAG 3:1"
      },
      {
        type: 'fixed',
        description: "Red theme code comments: 40% → 50% for readability"
      },
      {
        type: 'fixed',
        description: "Infrared theme code comments: 35% → 28% for contrast"
      }
    ]
  },
  {
    version: "1.0.1",
    date: "2025-12-25",
    title: "DYNAMIC_RADIUS_SYSTEM",
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
    title: "INITIAL_RELEASE",
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
