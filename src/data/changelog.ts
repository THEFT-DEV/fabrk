/**
 * Changelog Data
 *
 * Auto-generated from GitHub releases
 * Last synced: 2025-12-24T12:02:52.556Z
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
