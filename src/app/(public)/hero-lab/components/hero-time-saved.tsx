/**
 * Hero Variation 1: TIME SAVED (COMPACT)
 * Hook: Show literal time comparison with animated counter
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function HeroTimeSaved() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container size="lg">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center text-center">
        {/* Big Counter */}
        <div className="space-y-2 mb-6">
          <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
            [DEVELOPER HOURS SAVED]
          </div>
          <div className={cn('text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight', mode.font)}>
            {mounted ? <AnimatedCounter target={232} /> : '0'}
            <span className={cn('text-xl ml-2', mode.color.text.muted)}>HRS</span>
          </div>
        </div>

        {/* Comparison */}
        <div className={cn('inline-flex justify-center gap-8 p-4 border mx-auto mb-6', mode.font, mode.radius)}>
          <div className="text-center">
            <div className={cn('text-xs', mode.color.text.muted)}>[FROM SCRATCH]</div>
            <div className="text-xl font-bold line-through opacity-50">6 WEEKS</div>
          </div>
          <div className="border-l" />
          <div className="text-center">
            <div className={cn('text-xs', mode.color.text.muted)}>[WITH FABRK]</div>
            <div className={cn('text-xl font-bold', mode.color.text.success)}>2 DAYS</div>
          </div>
        </div>

        {/* Headline */}
        <h1 className={cn('text-2xl sm:text-3xl font-bold tracking-tight mb-4', mode.font)}>
          STOP REBUILDING. <span className="text-primary">START SHIPPING.</span>
        </h1>

        <p className={cn('text-sm max-w-md mx-auto mb-6', mode.font, mode.color.text.muted)}>
          Every SaaS needs auth, payments, and dashboards. We built it once, perfectly.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; SAVE 232 HOURS NOW
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="ghost"
            asChild
            className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
          >
            <Link href="/docs">&gt; SEE WHAT&apos;S INCLUDED</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
