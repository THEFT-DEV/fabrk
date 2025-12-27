/**
 * ✅ FABRK COMPONENT
 * SectionHeader - Reusable badge + title + description pattern
 * Used 8× across landing page sections
 * Production-ready ✓
 */

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge: string;
  code: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  badge,
  code,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const containerClass = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={cn('mb-16 max-w-3xl', containerClass, alignClass)}>
      {/* Badge - matches CardHeader/Card Badge styling with solid background */}
      <div
        className={cn(
          'mb-6 inline-block border px-4 py-1',
          mode.color.border.default,
          mode.color.bg.surface,
          mode.radius
        )}
      >
        <span className={cn(mode.color.text.muted, mode.typography.caption, mode.font)}>
          [ [{code}] {badge} ]
        </span>
      </div>

      <h2
        className={cn(
          'mb-6 text-4xl leading-tight font-semibold tracking-tight lg:text-5xl',
          mode.font
        )}
      >
        {title}
      </h2>

      <p className={cn('text-sm leading-relaxed', mode.color.text.muted)}>{description}</p>
    </div>
  );
}
