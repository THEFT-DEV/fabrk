'use client';

import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Plus, RefreshCw, Wrench, Shield, Rss } from 'lucide-react';
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from '@/data/landing/stats';

// Mock changelog data for preview
const mockChangelog = [
  {
    version: '1.0.0',
    date: '2025-12-15',
    title: 'INITIAL_RELEASE',
    changes: [
      { type: 'added' as const, description: `${COMPONENT_COUNT_STRING} production-ready UI components` },
      { type: 'added' as const, description: `${THEME_COUNT_STRING} terminal color themes` },
      {
        type: 'added' as const,
        description: 'Multi-provider payments (Stripe, Polar, Lemonsqueezy)',
      },
      { type: 'changed' as const, description: 'Upgraded to Next.js 16 with React 19' },
      { type: 'fixed' as const, description: 'Mobile navigation z-index issues' },
      { type: 'security' as const, description: 'Updated auth dependencies' },
    ],
  },
  {
    version: '0.9.0',
    date: '2025-12-01',
    title: 'BETA_RELEASE',
    changes: [
      { type: 'added' as const, description: 'Initial component library' },
      { type: 'added' as const, description: 'Terminal theme system' },
    ],
  },
];

const CHANGE_TYPE_CONFIG = {
  added: { label: 'ADDED', icon: Plus, className: 'text-success' },
  changed: { label: 'CHANGED', icon: RefreshCw, className: 'text-warning' },
  fixed: { label: 'FIXED', icon: Wrench, className: 'text-info' },
  security: { label: 'SECURITY', icon: Shield, className: 'text-primary' },
};

export function ChangelogPreview() {
  return (
    <div className="bg-background min-h-[600px] p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Hero */}
        <div className="border-border border-b pb-6">
          <div className="mb-4">
            <Badge code="0x00" label="CHANGELOG" meta="VERSION HISTORY" />
          </div>
          <h1 className={cn('mb-2 text-lg font-bold', mode.font)}>VERSION HISTORY</h1>
          <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
            Track every update, improvement, and fix. All changes are documented here.
          </p>
          <a
            href="#"
            className={cn(
              'text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs transition-colors',
              mode.font
            )}
          >
            <Rss className="h-3 w-3" />
            [RSS FEED]
          </a>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {mockChangelog.map((entry, index) => (
            <Card key={entry.version} size="auto">
              <CardHeader
                code={`0x${(index + 1).toString(16).toUpperCase().padStart(2, '0')}`}
                title={`v${entry.version} - ${entry.title}`}
                meta={entry.date}
              />
              <CardContent padding="md">
                <div className="space-y-4">
                  {(Object.keys(CHANGE_TYPE_CONFIG) as Array<keyof typeof CHANGE_TYPE_CONFIG>).map(
                    (type) => {
                      const changes = entry.changes.filter((c) => c.type === type);
                      if (changes.length === 0) return null;

                      const config = CHANGE_TYPE_CONFIG[type];
                      const Icon = config.icon;

                      return (
                        <div key={type}>
                          <div className={cn('mb-2 flex items-center gap-2', config.className)}>
                            <Icon className="h-3 w-3" />
                            <span className={cn('text-xs font-medium', mode.font)}>
                              [{config.label}]
                            </span>
                          </div>
                          <ul className="space-y-1 pl-5">
                            {changes.map((change, i) => (
                              <li
                                key={i}
                                className={cn('text-muted-foreground text-xs', mode.font)}
                              >
                                <span className="text-muted-foreground/50 mr-2">-</span>
                                {change.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="border-border border-t pt-6">
          <p className={cn('text-muted-foreground text-xs', mode.font)}>[EOF] - End of changelog</p>
        </div>
      </div>
    </div>
  );
}
