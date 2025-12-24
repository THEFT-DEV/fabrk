/**
 * AI Credits Preview Component
 * Terminal-style credit balance with animated usage bars
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { PreviewHeader } from './preview-header';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Animated counter for credits
function CreditCounter({ value, delay = 0 }: { value: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let current = 0;
      const increment = value / 20;
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// Usage bar data (static to avoid hydration)
const usageBars = [
  { day: 'M', height: 45 },
  { day: 'T', height: 30 },
  { day: 'W', height: 65 },
  { day: 'T', height: 40 },
  { day: 'F', height: 80 },
  { day: 'S', height: 25 },
  { day: 'S', height: 15 },
];

export function CreditsPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Card ref={ref} className="w-full max-w-md">
      <PreviewHeader title="usage dashboard.exe" animated />

      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}
        >
          [AI_CREDITS]:
        </motion.div>

        {/* Balance Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className={cn(
            mode.radius,
            'border-border bg-background mb-4 flex items-center justify-between border p-4'
          )}
        >
          <div>
            <span className={cn(mode.font, 'block text-xs')}>BALANCE</span>
            <motion.span
              className={cn(mode.font, 'text-muted-foreground text-xs')}
              whileHover={{ color: 'var(--color-primary)', x: 2 }}
            >
              &gt; BUY CREDITS
            </motion.span>
          </div>
          <div className="text-right">
            <span className={cn(mode.font, 'text-success block text-2xl font-semibold')}>
              <CreditCounter value={847} delay={0.5} />
            </span>
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>credits</span>
          </div>
        </motion.div>

        {/* Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className={cn(mode.radius, 'border-border bg-background border p-4')}
        >
          <div className={cn(mode.font, 'mb-4 flex justify-between text-xs')}>
            <span className="text-muted-foreground">WEEKLY USAGE</span>
            <span>
              <CreditCounter value={153} delay={0.8} /> used
            </span>
          </div>

          {/* Mini Bar Chart */}
          <div className="mb-4 flex h-16 items-end justify-between gap-1">
            {usageBars.map((bar, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${bar.height}%` } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                className="bg-primary/80 flex-1"
              />
            ))}
          </div>

          <div className="flex justify-between">
            {usageBars.map((bar, i) => (
              <span
                key={i}
                className={cn(mode.font, 'text-muted-foreground flex-1 text-center text-xs')}
              >
                {bar.day}
              </span>
            ))}
          </div>

          {/* Recent Transaction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="border-border mt-4 border-t pt-4"
          >
            <div className={cn(mode.font, 'flex justify-between text-xs')}>
              <span className="text-muted-foreground">Form generation</span>
              <span className="text-destructive">-10</span>
            </div>
            <div className={cn(mode.font, 'flex justify-between text-xs')}>
              <span className="text-muted-foreground">Code generation</span>
              <span className="text-destructive">-20</span>
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
