/**
 * DocsCard - Terminal-style card wrapper for documentation content
 * Matches the landing page card aesthetic with [ [0xXX] TITLE ] format
 * Auto-generates hex code from title if none provided
 */

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Generate deterministic hex code from string (consistent but varied)
function generateHexFromTitle(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash % 256)
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');
}

interface DocsCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional className for custom styling */
  className?: string;
  /** Hex code like "01", "0A" - will be formatted as 0x01, 0x0A. Auto-generates from title if not provided. */
  code?: string;
  /** Terminal header title */
  title?: string;
  /** Enable hover state (default: true) */
  interactive?: boolean;
}

export function DocsCard({ children, className, code, title, interactive = true }: DocsCardProps) {
  const hasHeader = code !== undefined || title;
  const headerTitle = title?.toUpperCase() || 'INFO';

  // Generate hex code from title if not provided
  const hexCode = code
    ? code.replace(/^\[0x/, '').replace(/\]$/, '')
    : generateHexFromTitle(headerTitle);

  return (
    <div className={cn('border-border bg-card border transition-colors', interactive && mode.state.hover.card, className)}>
      {hasHeader && (
        <div className="border-border border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-xs">
            [ [0x{hexCode}] {headerTitle} ]
          </span>
        </div>
      )}
      <div className="text-muted-foreground p-4 font-mono text-xs">{children}</div>
    </div>
  );
}
