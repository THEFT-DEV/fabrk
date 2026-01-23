/**
 * RoadmapEntry Component
 * Displays a single roadmap phase in terminal style
 * Matches the ChangelogEntry design pattern
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { type RoadmapSection, type RoadmapStatus } from '@/data/roadmap';

const STATUS_CONFIG: Record<RoadmapStatus, { label: string; className: string }> = {
  shipped: { label: 'SHIPPED', className: 'text-success' },
  in_progress: { label: 'IN PROGRESS', className: 'text-primary' },
  building: { label: 'BUILDING', className: 'text-warning' },
  planned: { label: 'PLANNED', className: 'text-info' },
  exploring: { label: 'EXPLORING', className: 'text-muted-foreground' },
};

interface RoadmapEntryProps {
  /** Roadmap section data */
  section: RoadmapSection;
  /** Index for hex code generation */
  index?: number;
  /** Additional class name */
  className?: string;
}

export function RoadmapEntry({ section, index = 0, className }: RoadmapEntryProps) {
  const hexCode = `0x${(index + 1).toString(16).toUpperCase().padStart(2, '0')}`;

  return (
    <Card size="auto" className={className}>
      <CardHeader code={hexCode} title={`${section.phase} - ${section.title}`} meta={section.date} />
      <CardContent>
        <div className="space-y-4">
          {/* Group items by status */}
          {(['shipped', 'in_progress', 'building', 'planned', 'exploring'] as RoadmapStatus[]).map((status) => {
            const items = section.items.filter((item) => item.status === status);
            if (items.length === 0) return null;

            const config = STATUS_CONFIG[status];

            return (
              <div key={status}>
                <div className={cn('mb-2', config.className)}>
                  <span className={cn('text-xs font-medium', mode.font)}>[{config.label}]</span>
                </div>
                <ul className="space-y-1 pl-5">
                  {items.map((item, i) => (
                    <li key={i} className={cn('text-muted-foreground text-xs', mode.font)}>
                      <span className="text-muted-foreground/50 mr-2">-</span>
                      <strong className="text-foreground">{item.title}</strong>
                      {item.version && <span className="text-primary ml-1">({item.version})</span>}
                      {' - '}
                      {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
