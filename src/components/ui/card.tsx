/**
 * Card - Core card primitives for the codebase
 * One shell, content is composition. Variants control tone, size, and interactivity.
 *
 * Design System Integration:
 * - Imports from @/design-system for static mode (server components)
 * - Radius from visual mode config (mode.radius applies the correct value)
 * - Spacing follows 8-point grid
 *
 * Size Guide:
 * - "auto": Natural height, use for standalone cards, notes, badges
 * - "full": h-full for equal-height grids (default)
 *
 * @example
 * ```tsx
 * // Grid card (equal heights)
 * <Card tone="primary" interactive>
 *   <CardHeader code="0x00" title="TITLE" icon={<Icon />} />
 *   <CardContent>Any content here</CardContent>
 * </Card>
 *
 * // Standalone card (natural height)
 * <Card size="auto">
 *   <CardContent>Note content</CardContent>
 * </Card>
 * ```
 */

import * as React from 'react';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Card - Core card component
 * One shell, content is composition. Variants control tone, size, and interactivity.
 */
export type CardTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
export type CardSize = 'auto' | 'full';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Color tone for border */
  tone?: CardTone;
  /** Size behavior: "auto" = natural height, "full" = h-full for grids */
  size?: CardSize;
  /** Enable hover/focus states for interactive cards */
  interactive?: boolean;
  /** Semantic HTML element */
  as?: 'div' | 'article' | 'section';
};

const toneStyles: Record<CardTone, string> = {
  neutral: mode.color.border.default,
  primary: mode.color.border.accent,
  success: mode.color.border.success,
  warning: mode.color.border.warning,
  danger: mode.color.border.danger,
};

const sizeStyles: Record<CardSize, string> = {
  auto: '', // Natural height
  full: 'h-full', // Equal height for grids
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      tone = 'neutral',
      size = 'full',
      interactive = false,
      as: Component = 'div',
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref}
      data-slot="card"
      className={cn(
        // Base styles - ONE card shell + CRT scanlines in Terminal mode
        'crt-scanlines relative flex flex-col border overflow-hidden',
        mode.color.bg.surface,
        mode.radius,

        // Tone (border color)
        toneStyles[tone],

        // Size behavior
        sizeStyles[size],

        // Interactive states
        interactive && cn('group transition-colors', mode.state.hover.card),

        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

/**
 * CardHeader - Header with terminal pattern [ [0xXX] TITLE ]
 * Auto-generates hex code from title if not provided
 */
export type CardHeaderProps = {
  /** Hex code displayed in brackets (e.g., "0x00", "0x01"). Auto-generates from title if not provided. */
  code?: string;
  /** Title displayed after the hex code in UPPERCASE_SNAKE_CASE */
  title: string;
  /** Optional icon displayed on the right side of header */
  icon?: React.ReactNode;
  /** Optional metadata displayed on right (e.g., "8 items") */
  meta?: React.ReactNode;
  /** Optional className for additional styling */
  className?: string;
};

// Generate deterministic hex code from string (consistent but varied)
function generateHexFromTitle(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return (
    '0x' +
    Math.abs(hash % 256)
      .toString(16)
      .toUpperCase()
      .padStart(2, '0')
  );
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ code, title, icon, meta, className }, ref) => {
    const hexCode = code ?? generateHexFromTitle(title);
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          'flex items-center justify-between border-b px-4 py-2',
          mode.color.border.default,
          'last:border-b-0', // Remove bottom border when CardHeader is last child (no CardContent)
          className
        )}
      >
        <span className={cn(mode.color.text.muted, mode.typography.caption, mode.font)}>
          [{hexCode}] {title}
        </span>
        {(icon || meta) && (
          <span className="flex items-center gap-2">
            {meta && (
              <span className={cn(mode.color.text.muted, mode.typography.caption, mode.font)}>
                {meta}
              </span>
            )}
            {icon}
          </span>
        )}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

/**
 * CardContent - Content area with configurable padding
 */
export type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
};

const paddingStyles = {
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn('flex-1', paddingStyles[padding], className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

/**
 * CardFooter - Footer area for actions
 */
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(
        'flex items-center gap-2 border-t px-4 py-2',
        mode.color.border.default,
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// Export core components
export { Card, CardHeader, CardContent, CardFooter };

// Re-export marketing components for backwards compatibility
// TODO: Update imports to use '@/components/ui/terminal-card' directly
export {
  Stat,
  StatGroup,
  StyledLabel,
  FeatureItem,
  FeatureList,
  InfoNote,
  Badge,
  PageBadge,
  TemplatePageHeader,
  FeaturesCard,
  MetricCard,
  FeatureCard,
} from './terminal-card';

// Re-export types
export type {
  StatProps,
  StatGroupProps,
  StyledLabelProps,
  FeatureItemProps,
  FeatureListProps,
  InfoNoteProps,
  BadgeProps,
  PageBadgeProps,
  TemplatePageHeaderProps,
  FeaturesCardProps,
  MetricCardProps,
  FeatureCardProps,
} from './terminal-card';
