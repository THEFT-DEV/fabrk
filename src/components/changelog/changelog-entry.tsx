/**
 * ChangelogEntry Component
 * Displays a single changelog release in terminal style
 *
 * Usage:
 *   <ChangelogEntry entry={CHANGELOG[0]} />
 *   <ChangelogEntry entry={entry} index={0} />
 *   <ChangelogEntry entry={entry} compact />
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Plus, RefreshCw, Wrench, Trash2, Shield, AlertTriangle } from 'lucide-react';
import { type ChangelogEntry as ChangelogEntryType, type ChangeType } from '@/data/changelog';

const CHANGE_TYPE_CONFIG: Record<
  ChangeType,
  { label: string; icon: typeof Plus; className: string }
> = {
  added: { label: 'ADDED', icon: Plus, className: 'text-success' },
  changed: { label: 'CHANGED', icon: RefreshCw, className: 'text-warning' },
  fixed: { label: 'FIXED', icon: Wrench, className: 'text-info' },
  removed: { label: 'REMOVED', icon: Trash2, className: 'text-destructive' },
  security: { label: 'SECURITY', icon: Shield, className: 'text-primary' },
  deprecated: { label: 'DEPRECATED', icon: AlertTriangle, className: 'text-muted-foreground' },
};

interface ChangelogEntryProps {
  /** Changelog entry data */
  entry: ChangelogEntryType;
  /** Optional index for hex code generation */
  index?: number;
  /** Compact mode - hide GitHub link and reduce spacing */
  compact?: boolean;
  /** Additional class name */
  className?: string;
}

export function ChangelogEntry({
  entry,
  index = 0,
  compact = false,
  className,
}: ChangelogEntryProps) {
  const hexCode = `0x${(index + 1).toString(16).toUpperCase().padStart(2, '0')}`;

  return (
    <Card size="auto" className={className}>
      <CardHeader code={hexCode} title={`v${entry.version} - ${entry.title}`} meta={entry.date} />
      <CardContent padding={compact ? 'sm' : 'md'}>
        <div className={cn('space-y-4', compact && 'space-y-2')}>
          {/* Group changes by type */}
          {(Object.keys(CHANGE_TYPE_CONFIG) as ChangeType[]).map((type) => {
            const changes = entry.changes.filter((c) => c.type === type);
            if (changes.length === 0) return null;

            const config = CHANGE_TYPE_CONFIG[type];
            const Icon = config.icon;

            return (
              <div key={type}>
                <div className={cn('mb-2 flex items-center gap-2', config.className)}>
                  <Icon className="h-3 w-3" />
                  <span className={cn('text-xs font-medium', mode.font)}>[{config.label}]</span>
                </div>
                <ul className={cn('space-y-1 pl-5', compact && 'space-y-0.5')}>
                  {changes.map((change, i) => (
                    <li key={i} className={cn('text-muted-foreground text-xs', mode.font)}>
                      <span className="text-muted-foreground/50 mr-2">-</span>
                      {change.description}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* GitHub link if available and not compact */}
        {!compact && entry.url && (
          <div className="border-border mt-6 border-t pt-4">
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'text-muted-foreground hover:text-primary text-xs transition-colors',
                mode.font
              )}
            >
              {'>'} VIEW ON GITHUB
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
