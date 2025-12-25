/**
 * Terminal Header Component
 * Reusable window header with terminal-style title
 */
'use client';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface PreviewHeaderProps {
  title: string;
  animated?: boolean;
}

export function PreviewHeader({ title }: PreviewHeaderProps) {
  return (
    <div className="border-border flex items-center gap-2 border-b px-4 py-2">
      <span className={cn(mode.font, 'text-muted-foreground text-xs')}>[ {title} ]</span>
    </div>
  );
}
