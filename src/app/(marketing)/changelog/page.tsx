/**
 * Changelog Page
 * Version history and release notes - Terminal style with sidebar nav
 */

import { Metadata } from 'next';
import { Rss } from 'lucide-react';
import { CHANGELOG } from '@/data/changelog';
import { Badge } from '@/components/ui/card';
import { ChangelogEntry } from '@/components/changelog';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export const metadata: Metadata = {
  title: 'Changelog | Fabrk',
  description: 'Version history and release notes for Fabrk SaaS boilerplate.',
  alternates: {
    types: {
      'application/rss+xml': '/changelog/rss',
    },
  },
};

export default function ChangelogPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-border mb-12 border-b pb-8">
        <div className="mb-4">
          <Badge code="0x00" label="CHANGELOG" meta="VERSION HISTORY" />
        </div>
        <h1 className={cn('mb-2 text-lg font-bold', mode.font)}>VERSION HISTORY</h1>
        <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
          Track every update, improvement, and fix. All changes are documented here.
        </p>
        <a
          href="/changelog/rss"
          className={cn(
            'text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs transition-colors',
            mode.font
          )}
          title="Subscribe to RSS feed"
        >
          <Rss className="h-3 w-3" />
          [RSS FEED]
        </a>
      </div>

      {/* Changelog Entries */}
      <div className="space-y-12">
        {CHANGELOG.map((entry, index) => (
          <section key={entry.version} className="scroll-mt-20">
            {/* Hidden h2 for TOC - visually hidden but accessible */}
            <h2 id={`v${entry.version}`} className={cn('mb-4 text-sm font-semibold', mode.font)}>
              v{entry.version} - {entry.title}
            </h2>
            <ChangelogEntry entry={entry} index={index} />
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-border mt-16 border-t pt-8">
        <p className={cn('text-muted-foreground text-xs', mode.font)}>[EOF] - End of changelog</p>
      </div>
    </>
  );
}
