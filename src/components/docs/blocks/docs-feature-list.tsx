/**
 * DocsFeatureList - Terminal-style feature cards
 * Matches the home page FeaturesShowcase design
 */

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional module code like "AUTH", "BILLING" */
  module?: string;
  /** Optional status like "SECURE", "ACTIVE" */
  status?: string;
}

interface DocsFeatureListProps {
  /** Array of features to display */
  features: Feature[];
  /** Number of columns (2, 3, or 4) */
  columns?: 2 | 3 | 4;
  /** Starting hex index for module codes */
  startIndex?: number;
}

export function DocsFeatureList({ features, columns = 3, startIndex = 1 }: DocsFeatureListProps) {
  const gridCols =
    columns === 2
      ? 'md:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-4 ${gridCols}`}>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const hexCode = (startIndex + index).toString(16).toUpperCase().padStart(2, '0');
        const moduleCode =
          feature.module ||
          feature.title
            .toUpperCase()
            .replace(/[\s-]+/g, '_')
            .slice(0, 12);
        const status = feature.status || 'READY';

        return (
          <div
            key={index}
            className={cn('group border-border bg-card border transition-colors', mode.state.hover.card)}
          >
            {/* Module Header */}
            <div className="border-border flex items-center justify-between border-b px-4 py-2">
              <span className="text-muted-foreground font-mono text-xs">
                [ [0x{hexCode}] {moduleCode} ]
              </span>
              <Icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Status */}
              <div className="mb-4 font-mono text-xs">
                <span className="text-muted-foreground">STATUS: </span>
                <span className="text-success">{status}</span>
              </div>

              {/* Description */}
              <div className="font-mono text-xs">
                <span className="text-muted-foreground">DESC: </span>
                <span className="text-foreground">{feature.description}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
