/**
 * Terminal Background - Grid pattern with subtle scan lines
 * Clean, minimal terminal aesthetic
 *
 * Uses foreground color which automatically adapts:
 * - Light dots on dark themes
 * - Dark dots on light themes
 */
'use client';

export function TerminalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot Grid Pattern - uses foreground color for automatic contrast */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(var(--foreground) / var(--bg-dot-opacity, 0.15)) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
