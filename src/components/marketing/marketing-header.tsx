import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Marketing Page Header Component
 *
 * Reusable header for marketing pages with terminal styling
 */
export interface MarketingPageHeaderProps {
  /** Terminal code prefix (e.g., "0x00") */
  code?: string;
  /** Badge text after the code */
  badge?: string;
  /** Main title (will be converted to UPPERCASE_SNAKE_CASE) */
  title: string;
  /** Description text */
  description?: string;
  /** Optional className */
  className?: string;
}

export function MarketingPageHeader({
  code = '0x00',
  badge,
  title,
  description,
  className,
}: MarketingPageHeaderProps) {
  return (
    <section className={cn('border-border border-b px-6 py-16 lg:py-20', className)}>
      <div className="mx-auto max-w-4xl text-center">
        {/* Terminal Badge */}
        <div className="border-border bg-card mb-4 inline-block border px-4 py-1">
          <span className={cn('text-muted-foreground text-xs', mode.font)}>
            [ [{code}] {title.toUpperCase()} ]{badge ? ` ${badge}` : ''}
          </span>
        </div>

        {/* Title */}
        <h1 className={cn('mb-4 text-4xl font-semibold tracking-tight', mode.font)}>
          {title.toUpperCase()}
        </h1>

        {/* Description */}
        {description && (
          <p className={cn('text-muted-foreground mx-auto max-w-2xl text-sm', mode.font)}>
            &gt; {description.toUpperCase()}
          </p>
        )}
      </div>
    </section>
  );
}
