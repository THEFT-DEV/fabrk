/**
 * ✅ FABRK COMPONENT
 * BenefitCard - Terminal-style feature card with gold accents
 * Displays auth/billing/multi-tenancy benefits with stats band
 * Production-ready ✓
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface BenefitCardProps {
  icon: React.ComponentType<{ className?: string }>;
  module: string;
  code: string;
  benefit: string;
  description: string;
  timeSaved: string;
  costSaved: string;
  features: readonly string[];
  index: number;
  ctaLabel?: string;
  ctaHref?: string;
}

export function BenefitCard({
  icon: Icon,
  module,
  code,
  benefit,
  description,
  timeSaved,
  costSaved,
  features,
  index,
  ctaLabel,
  ctaHref,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full"
    >
      <div
        className={cn(
          'relative flex h-full flex-col border',
          mode.color.bg.surface,
          mode.color.border.default,
          mode.radius,
          'group transition-colors',
          mode.state.hover.card
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'flex h-[44px] shrink-0 items-center justify-between border-b px-4',
            mode.color.border.default
          )}
        >
          <span className={cn('text-[11px] tracking-wide', mode.font, mode.color.text.muted)}>
            [{code}] {module}
          </span>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Icon className="size-4 text-warning" />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col p-6 pb-0">
          {/* Benefit Statement - max 2 lines */}
          <h3
            className={cn(
              'text-sm font-bold leading-tight uppercase tracking-wide line-clamp-2 min-h-[2.5rem]',
              mode.font,
              'text-foreground'
            )}
          >
            {benefit}
          </h3>

          {/* Description - fixed height for consistency */}
          <p className={cn('text-sm leading-relaxed mt-3 line-clamp-3 min-h-[3.75rem]', mode.font, mode.color.text.muted)}>
            {description}
          </p>
        </div>

        {/* Stats Band */}
        <div className={cn('border-y py-4 px-6 flex gap-4 mt-4', mode.color.border.default, mode.color.bg.base)}>
          <div className="flex-1 flex flex-col gap-1">
            <p
              className={cn(
                'text-[11px] uppercase tracking-[0.05em] font-medium',
                mode.font,
                mode.color.text.muted
              )}
            >
              TIME SAVED
            </p>
            <p className={cn('text-xl font-bold leading-none tracking-tight', mode.font, mode.color.text.accent)}>
              {timeSaved}
            </p>
          </div>
          <div className={cn('w-px', mode.color.bg.muted)} />
          <div className="flex-1 flex flex-col gap-1 pl-2">
            <p
              className={cn(
                'text-[11px] uppercase tracking-[0.05em] font-medium',
                mode.font,
                mode.color.text.muted
              )}
            >
              COST SAVED
            </p>
            <p className={cn('text-xl font-bold leading-none tracking-tight', mode.font, mode.color.text.accent)}>
              {costSaved}
            </p>
          </div>
        </div>

        {/* Features List - always show 3 items for consistency */}
        <div className="p-6 flex flex-col gap-2">
          <p
            className={cn(
              'text-[11px] font-bold uppercase tracking-wider mb-1',
              mode.font,
              mode.color.text.muted
            )}
          >
            [INCLUDES]:
          </p>
          <ul className="flex flex-col gap-2">
            {features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 group/item">
                <span className="font-bold text-sm mt-[1px] text-warning">✓</span>
                <span
                  className={cn(
                    'text-sm group-hover/item:text-foreground transition-colors line-clamp-1',
                    mode.font,
                    mode.color.text.muted
                  )}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        {ctaLabel && ctaHref && (
          <div className="p-6 pt-0 mt-auto">
            <Link
              href={ctaHref}
              className={cn(
                'flex items-center justify-center gap-2 w-full h-10 border text-xs font-medium',
                'bg-transparent transition-all duration-200',
                mode.color.border.default,
                mode.color.text.muted,
                mode.radius,
                mode.font,
                mode.state.hover.borderWarning,
                mode.state.hover.textWarning
              )}
            >
              &gt; {ctaLabel}
              <span className="text-sm">→</span>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
