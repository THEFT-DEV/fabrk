/**
 * Changelog Data
 *
 * Auto-generated from GitHub releases
 * Last synced: 2025-12-15T19:07:11.463Z
 *
 * Run `npm run sync:changelog` to update
 */

import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from '@/data/landing/stats';

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
    version: '1.0.0',
    date: '2025-12-15',
    title: 'INITIAL_RELEASE',
    changes: [
      {
        type: 'added',
        description: `${COMPONENT_COUNT_STRING} production-ready UI components`,
      },
      {
        type: 'added',
        description: `${THEME_COUNT_STRING} terminal color themes`,
      },
      {
        type: 'added',
        description: 'Multi-provider payments (Stripe, Polar, Lemonsqueezy)',
      },
      {
        type: 'added',
        description: 'NextAuth v5 authentication',
      },
      {
        type: 'added',
        description: 'Full TypeScript support',
      },
    ],
  },
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
