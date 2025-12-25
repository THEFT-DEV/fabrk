/**
 * Feature Item Component
 * Single feature with icon, title and description
 */

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface FeatureItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <Icon className={cn('size-8', mode.color.text.accent)} />
      </div>
      <div>
        <span
          className={cn(mode.font, mode.color.text.primary, 'text-sm leading-snug font-semibold')}
        >
          ├─ {title}
        </span>
        <span className={cn(mode.font, mode.color.text.muted, 'ml-2 text-sm leading-relaxed')}>
          {description}
        </span>
      </div>
    </div>
  );
}

export type { FeatureItemProps };
