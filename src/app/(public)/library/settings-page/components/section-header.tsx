/**
 * ✅ FABRK COMPONENT
 * Section Header
 * Production-ready ✓
 */

import { type LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgClass?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
  iconBgClass = 'bg-primary/10',
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <div
        className={`border-border flex h-10 w-10 items-center justify-center border ${iconBgClass}`}
      >
        <Icon className="text-primary h-5 w-5" />
      </div>
      <div>
        <h2 className={cn(mode.font, 'text-muted-foreground text-xs')}>[{title}]:</h2>
        <p className={cn(mode.font, 'text-muted-foreground text-xs')}>{description}</p>
      </div>
    </div>
  );
}
