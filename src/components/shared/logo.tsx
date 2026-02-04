/**
 * ✅ FABRK LOGO COMPONENT
 * Brand logo with clean styling
 * Shared across header and footers
 * Production-ready ✓
 */

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 20, className = '' }: LogoProps = {}) {
  // Calculate proportional height (28:40 ratio from original)
  const height = (size / 28) * 40;

  return (
    <div
      className={cn(
        'border-foreground bg-primary inline-flex items-center gap-2 border-2 px-2 py-1 transition-all hover:-translate-y-0.5',
        mode.radius
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={height}
        viewBox="0 0 28 40"
        fill="none"
        className={`${className} text-primary-foreground block flex-shrink-0`}
        aria-label="Fabrk Logo"
      >
        {/* F - Sharp geometric shapes */}
        {/* Top horizontal bar */}
        <rect x="0" y="0" width="24" height="7" fill="currentColor" />
        {/* Vertical bar */}
        <rect x="0" y="0" width="7" height="30" fill="currentColor" />
        {/* Middle horizontal bar */}
        <rect x="0" y="12" width="18" height="6" fill="currentColor" />
        {/* Bottom angled piece - made blocky */}
        <polygon points="0,30 7,30 7,40 0,40" fill="currentColor" />
        <polygon points="7,33 14,33 14,40 7,40" fill="currentColor" />
      </svg>
      <span className="text-primary-foreground text-sm leading-none font-bold tracking-tight uppercase">
        Fabrk
      </span>
    </div>
  );
}
