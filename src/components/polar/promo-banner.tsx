'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { PRICING } from '@/data/landing/pricing';

interface DiscountUsage {
  used: number;
  total: number | null;
  remaining: number | null;
  _error?: boolean;
}

export function PromoBanner() {
  const [usage, setUsage] = useState<DiscountUsage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsage() {
      try {
        const response = await fetch('/api/polar/discount-usage');
        if (response.ok) {
          const data = await response.json();
          if (!data._error) {
            setUsage(data);
          }
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }

    fetchUsage();
    const interval = setInterval(fetchUsage, 30000);
    return () => clearInterval(interval);
  }, []);

  // Don't show if loading, error, or no remaining spots
  if (loading || !usage || !usage.total || usage.remaining === 0) {
    return null;
  }

  const isUrgent = usage.remaining !== null && usage.remaining <= 20;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          'border px-4 py-3 mb-8',
          isUrgent ? 'border-destructive bg-destructive/10' : 'border-primary bg-primary/10',
          mode.radius
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Promo message */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'text-xs font-bold px-2 py-0.5',
                isUrgent ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground',
                mode.radius
              )}
            >
              {isUrgent ? 'ALMOST GONE' : 'EARLY BIRD'}
            </span>
            <span className={cn('text-sm', mode.font)}>
              ${PRICING.promo.amount} OFF auto-applied at checkout
            </span>
          </div>

          {/* Right: Counter + Price */}
          <div className="flex items-center gap-4">
            {/* Final price callout */}
            <span className={cn('text-sm', mode.font)}>
              <span className="text-muted-foreground line-through">{PRICING.display.regular}</span>
              {' '}
              <span className="font-bold text-primary">{PRICING.display.current}</span>
            </span>

            {/* Counter */}
            <div
              className={cn(
                'flex items-center gap-2 border px-3 py-1.5',
                mode.color.border.default,
                mode.radius
              )}
            >
              <span
                className={cn(
                  'text-lg font-bold tabular-nums',
                  isUrgent ? 'text-destructive' : 'text-primary',
                  mode.font
                )}
              >
                {usage.remaining}
              </span>
              <span className={cn('text-xs', mode.color.text.muted, mode.font)}>
                / {usage.total} LEFT
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
