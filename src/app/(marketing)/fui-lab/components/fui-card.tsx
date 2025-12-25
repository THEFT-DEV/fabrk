/* eslint-disable design-system/no-hardcoded-colors -- FUI Lab is an experimental playground with custom styling */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface FuiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  meta?: string;
  footer?: React.ReactNode;
  variant?: 'wireframe' | 'solid' | 'heavy';
}

/**
 * High-end FUI Card component
 * Implements complex technical decorations, coordinates, and multi-layered borders.
 */
export const FuiCard = React.forwardRef<HTMLDivElement, FuiCardProps>(
  ({ className, title, meta, children, variant = 'solid', ...props }, ref) => {
    // Fixed aesthetic ID for purity
    const staticId = '0xFA22BC';

    return (
      <div
        ref={ref}
        className={cn(
          'relative p-6 group transition-all duration-500',
          className
        )}
        data-slot="fui-card"
        data-variant={variant}
        {...props}
      >
        {/* EXTERNAL DECORATIONS */}
        {/* Corner Brackets - Complex Multi-stage */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-accent/40 group-hover:border-accent transition-colors pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 4px, 4px 4px, 4px 100%, 0 100%)' }} />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-accent/40 group-hover:border-accent transition-colors pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, calc(100% - 4px) 100%, calc(100% - 4px) 4px, 0 4px)' }} />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-accent/40 group-hover:border-accent transition-colors pointer-events-none" style={{ clipPath: 'polygon(0 0, 4px 0, 4px calc(100% - 4px), 100% calc(100% - 4px), 100% 100%, 0 100%)' }} />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-accent/40 group-hover:border-accent transition-colors pointer-events-none" style={{ clipPath: 'polygon(calc(100% - 4px) 0, 100% 0, 100% 100%, 0 100%, 0 calc(100% - 4px), calc(100% - 4px) calc(100% - 4px))' }} />

        {/* Technical Ticks */}
        <div className="absolute top-1/2 -left-2 w-3 h-12 border-l-2 border-y-2 border-accent/40 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 -right-2 w-3 h-12 border-r-2 border-y-2 border-accent/40 -translate-y-1/2 pointer-events-none" />

        {/* Coordinates/Metadata */}
        <div className="absolute -top-1 left-12 px-3 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-[0.3em] pointer-events-none skew-x-[-20deg]">
          {meta || `REF_${staticId}`}
        </div>

        {/* MAIN SHELL */}
        <div className={cn(
          'relative border-2 border-accent/40 flex flex-col transition-all duration-300',
          variant === 'solid' ? 'bg-background/95 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'bg-accent/5 backdrop-blur-md',
          'shadow-[inset_0_0_20px_rgba(var(--accent),0.1)]'
        )}>
          {/* Top Structural Header */}
          <div className="h-8 border-b-2 border-accent/40 flex items-center bg-accent/10 relative overflow-hidden">
            <div className="w-2 h-full bg-accent animate-pulse mr-3" />
            <span className={cn('text-[11px] font-black text-accent uppercase tracking-[0.25em]', mode.font)}>
              {title || 'SYSTEM_TERMINAL'}
            </span>
            <div className="ml-auto flex h-full border-l-2 border-accent/40">
              <div className="px-3 flex items-center bg-accent/20 text-[9px] font-bold text-accent">
                NODE_01
              </div>
            </div>
            {/* Header 'Greeble' - angled cut-out */}
            <div className="absolute top-0 right-20 w-8 h-2 bg-accent/40 skew-x-[45deg]" />
          </div>

          {/* Inner Content Area */}
          <div className="p-6 relative flex-1">
            {/* Scanline Effect Layer */}
            { }
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            
            {/* Sub-header decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            {children}
          </div>

          {/* Bottom Data Bar */}
          <div className="h-6 border-t-2 border-accent/40 flex items-center px-4 bg-accent/5 overflow-hidden">
            <div className="flex gap-4 opacity-40">
              <div className="w-8 h-1 bg-accent" />
              <div className="w-4 h-1 bg-accent" />
              <div className="w-12 h-1 bg-accent" />
            </div>
            <div className="ml-auto text-[8px] font-mono text-accent/60 tracking-tighter">
              CRC_CHECK: OK [0xFA22]
            </div>
          </div>
        </div>

        {/* Floating Side Tags */}
        <div className="absolute top-20 -left-8 flex flex-col gap-1 pointer-events-none">
          <div className="px-1 py-0.5 bg-accent/80 text-background text-[7px] font-black uppercase">Active</div>
          <div className="w-4 h-px bg-accent/40" />
        </div>

        {/* GLOW OVERLAY (Mouse Hover) */}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl -z-10" />
      </div>
    );
  }
);

FuiCard.displayName = 'FuiCard';
