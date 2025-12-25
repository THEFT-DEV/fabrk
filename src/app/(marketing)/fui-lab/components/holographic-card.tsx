 
/**
 * HolographicCard - FUI-style card with corner brackets and data labels
 * Inspired by film interfaces (Oblivion, Blade Runner, Alien)
 */

import { cn } from '@/lib/utils';

interface HolographicCardProps {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
  showCornerBrackets?: boolean;
  showGrid?: boolean;
  cornerData?: {
    topLeft?: string;
    topRight?: string;
    bottomLeft?: string;
    bottomRight?: string;
  };
}

export function HolographicCard({
  children,
  accentColor = 'var(--primary)',
  className = '',
  showCornerBrackets = true,
  showGrid = true,
  cornerData = {},
}: HolographicCardProps) {
  return (
    <div
      className={cn('relative border bg-card/80 backdrop-blur-sm', className)}
      style={{ borderColor: `color-mix(in oklch, ${accentColor} 30%, transparent)` }}
    >
      {/* Corner brackets */}
      {showCornerBrackets && (
        <>
          <div
            className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2"
            style={{ borderColor: accentColor }}
          />
          <div
            className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2"
            style={{ borderColor: accentColor }}
          />
          <div
            className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2"
            style={{ borderColor: accentColor }}
          />
          <div
            className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2"
            style={{ borderColor: accentColor }}
          />
        </>
      )}

      {/* Corner data labels */}
      {cornerData.topLeft && (
        <div
          className="absolute top-2 left-3 text-[9px] font-mono tracking-widest uppercase"
          style={{ color: accentColor, opacity: 0.7 }}
        >
          {cornerData.topLeft}
        </div>
      )}
      {cornerData.topRight && (
        <div
          className="absolute top-2 right-3 text-[9px] font-mono tracking-widest uppercase"
          style={{ color: accentColor, opacity: 0.7 }}
        >
          {cornerData.topRight}
        </div>
      )}
      {cornerData.bottomLeft && (
        <div
          className="absolute bottom-2 left-3 text-[9px] font-mono tracking-widest uppercase"
          style={{ color: accentColor, opacity: 0.7 }}
        >
          {cornerData.bottomLeft}
        </div>
      )}
      {cornerData.bottomRight && (
        <div
          className="absolute bottom-2 right-3 text-[9px] font-mono tracking-widest uppercase"
          style={{ color: accentColor, opacity: 0.7 }}
        >
          {cornerData.bottomRight}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Grid overlay */}
      {showGrid && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fui-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke={accentColor} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fui-grid)" />
          </svg>
        </div>
      )}
    </div>
  );
}

/**
 * FUIPanel - Simple panel with just corner brackets, no extras
 */
interface FUIPanelProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function FUIPanel({ children, className = '', label }: FUIPanelProps) {
  return (
    <div className={cn('relative border border-border', className)}>
      {/* Corner brackets using primary color */}
      <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-primary" />
      <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-primary" />
      <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
      <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />

      {/* Optional label */}
      {label && (
        <div className="absolute -top-2.5 left-4 px-1 bg-background text-[9px] font-mono tracking-widest uppercase text-muted-foreground">
          {label}
        </div>
      )}

      {children}
    </div>
  );
}

/**
 * FUIHeader - Technical header bar with status indicators
 */
interface FUIHeaderProps {
  title: string;
  code?: string;
  status?: 'active' | 'standby' | 'alert';
  className?: string;
}

export function FUIHeader({ title, code, status = 'active', className = '' }: FUIHeaderProps) {
  const statusColors = {
    active: 'bg-green-500',
    standby: 'bg-yellow-500',
    alert: 'bg-red-500',
  };

  return (
    <div className={cn('flex items-center justify-between border-b border-border px-3 py-1.5', className)}>
      <div className="flex items-center gap-2">
        {code && <span className="text-[9px] font-mono text-muted-foreground tracking-wider">[{code}]</span>}
        <span className="text-[11px] font-mono uppercase tracking-wider">{title}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className={cn('w-1.5 h-1.5 rounded-full', statusColors[status])} />
        <span className="text-[8px] font-mono text-muted-foreground uppercase">{status}</span>
      </div>
    </div>
  );
}

/**
 * FUIDataRow - Technical data display row
 */
interface FUIDataRowProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
}

export function FUIDataRow({ label, value, unit, className = '' }: FUIDataRowProps) {
  return (
    <div className={cn('flex items-center justify-between py-1 border-b border-border/50', className)}>
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-[11px] font-mono font-medium">{value}</span>
        {unit && <span className="text-[8px] font-mono text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}
