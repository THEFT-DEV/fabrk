/**
 * Hero Variation 13: STATS WALL
 * Hook: Bold numbers that speak for themselves - ultra compact
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

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let count = 0;

    const timer = setInterval(() => {
      count += increment;
      if (count >= value) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(count));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{current.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { value: 78, suffix: '', label: 'COMPONENTS' },
  { value: 232, suffix: 'h', label: 'SAVED' },
  { value: 12, suffix: '', label: 'THEMES' },
  { value: 42, suffix: 'K', label: 'VALUE' },
];

export function HeroStatsWall() {
  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col">
        {/* Stats Grid - Hero Element */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={cn('border p-6 text-center', mode.font)}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className={cn('text-xs mt-2', mode.color.text.muted)}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Center Content */}
        <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
          <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
            THE NUMBERS DON&apos;T LIE.
            <br />
            <span className="text-primary">SHIP FASTER WITH FABRK.</span>
          </h1>

          <p className={cn('text-sm max-w-lg mx-auto', mode.font, mode.color.text.muted)}>
            Production-ready SaaS boilerplate with everything you need.
            One payment. Lifetime access. No subscriptions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PolarCheckoutButton
              className={cn(
                'bg-primary text-primary-foreground px-8 py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; GET FABRK NOW
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="outline"
              asChild
              className={cn('px-6 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/library">&gt; SEE IT IN ACTION</Link>
            </Button>
          </div>
        </div>

        {/* Trust Bar */}
        <div className={cn('flex justify-center items-center gap-6 pt-6 border-t text-xs', mode.font, mode.color.text.muted)}>
          <span>500+ DEVELOPERS</span>
          <span>•</span>
          <span>4.9/5 RATING</span>
          <span>•</span>
          <span>LIFETIME UPDATES</span>
        </div>
      </div>
    </Container>
  );
}
