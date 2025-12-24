/**
 * Browser Frame - Chrome-style browser wrapper for playground demos
 */
'use client';

import { ChevronRight, RotateCw, Lock, MoreHorizontal } from 'lucide-react';

interface BrowserFrameProps {
  children: React.ReactNode;
}

export function BrowserFrame({ children }: BrowserFrameProps) {
  return (
    <div className="border-border bg-card overflow-hidden border">
      {/* Browser Chrome */}
      <div className="border-border bg-muted/50 flex items-center gap-4 border-b px-4 py-2">
        {/* Window Controls */}
        <div className="flex gap-2">
          <div className="bg-destructive/60 h-3 w-3 rounded-full" />
          <div className="bg-warning/60 h-3 w-3 rounded-full" />
          <div className="bg-success/60 h-3 w-3 rounded-full" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button className="hover:bg-muted rounded-none p-1" aria-label="Go back">
            <ChevronRight className="text-muted-foreground h-4 w-4 rotate-180" />
          </button>
          <button className="hover:bg-muted rounded-none p-1" aria-label="Go forward">
            <ChevronRight className="text-muted-foreground h-4 w-4" />
          </button>
          <button className="hover:bg-muted rounded-none p-1" aria-label="Refresh">
            <RotateCw className="text-muted-foreground h-4 w-4" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="border-border bg-background flex flex-1 items-center gap-2 border px-4 py-2">
          <Lock className="text-success h-3.5 w-3.5" />
          <span className="text-foreground flex-1 text-xs">https://app.fabrk.dev/dashboard</span>
        </div>

        {/* Menu Button */}
        <button className="hover:bg-muted rounded-none p-1" aria-label="Menu">
          <MoreHorizontal className="text-muted-foreground h-4 w-4" />
        </button>
      </div>
      {/* Browser Content */}
      <div className="flex min-h-[600px]">{children}</div>
    </div>
  );
}
