'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface UseCaseCardProps {
  icon: LucideIcon;
  persona: string;
  painPoint: string;
  solution: string;
  features: readonly string[];
  index: number;
}

/**
 * UseCaseCard Component
 * Terminal-style card with gold accents for target personas
 * Used in Use Cases section to show who benefits from Fabrk
 */
export function UseCaseCard({
  icon: Icon,
  persona,
  painPoint,
  solution,
  features,
  index,
}: UseCaseCardProps) {
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
            [0x{(40 + index).toString(16).toUpperCase()}] {persona}
          </span>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Icon className="size-4 text-warning" />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col p-6 pb-0">
          {/* Pain Point - max 2 lines */}
          <p
            className={cn(
              'text-[11px] font-bold uppercase tracking-wider mb-1',
              mode.font,
              mode.color.text.muted
            )}
          >
            [PROBLEM]:
          </p>
          <p
            className={cn(
              'text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]',
              mode.font,
              mode.color.text.muted
            )}
          >
            {painPoint}
          </p>
        </div>

        {/* Solution Band */}
        <div className="border-y border-border bg-background py-4 px-6 mt-4">
          <p
            className={cn(
              'text-[11px] uppercase tracking-[0.05em] font-medium mb-1',
              mode.font,
              mode.color.text.muted
            )}
          >
            [SOLUTION]:
          </p>
          <p
            className={cn(
              'text-sm font-bold leading-tight text-warning line-clamp-3 min-h-[3.75rem]',
              mode.font
            )}
          >
            {solution}
          </p>
        </div>

        {/* Features List - always show 3 items */}
        <div className="p-6 flex flex-col gap-2">
          <p
            className={cn(
              'text-[11px] font-bold uppercase tracking-wider mb-1',
              mode.font,
              mode.color.text.muted
            )}
          >
            [KEY FEATURES]:
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
      </div>
    </motion.div>
  );
}
