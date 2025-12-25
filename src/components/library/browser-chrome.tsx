/**
 * Browser Chrome - macOS-style window frame for template previews
 * Wraps previews to look like real application screenshots
 */
'use client';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface BrowserChromeProps {
  children: React.ReactNode;
  title?: string;
  url?: string;
  className?: string;
}

export function BrowserChrome({ children, title, url, className }: BrowserChromeProps) {
  return (
    <div className={cn('bg-background overflow-hidden border', mode.radius, className)}>
      {/* macOS Window Header */}
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        {/* Traffic Lights */}
        {/* eslint-disable design-system/no-hardcoded-colors -- macOS window control colors are intentional */}
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#FF5F57]" />
          <div className="size-3 rounded-full bg-[#FFBD2E]" />
          <div className="size-3 rounded-full bg-[#28CA42]" />
        </div>
        {/* eslint-enable design-system/no-hardcoded-colors */}

        {/* Title/URL */}
        {(title || url) && (
          <div className={cn('flex-1 text-center text-xs', mode.font, mode.color.text.muted)}>
            {title || url}
          </div>
        )}

        {/* Spacer for symmetry */}
        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <div className="bg-background">{children}</div>
    </div>
  );
}
