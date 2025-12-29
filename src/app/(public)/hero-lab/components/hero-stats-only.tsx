/**
 * Hero Variation 29: STATS ONLY
 * Hook: Just numbers, no explanation needed
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
  { value: 500, suffix: '+', label: 'DEVS' },
];

export function HeroStatsOnly() {
  return (
    <Container size="2xl">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center">
        {/* Big Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full max-w-4xl">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={cn('border p-6 text-center', mode.font, mode.radius)}
            >
              <div className="text-5xl sm:text-6xl font-bold text-primary">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className={cn('text-xs mt-2', mode.color.text.muted)}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Minimal Headline */}
        <h1 className={cn('text-2xl font-bold tracking-tight mb-6 text-center', mode.font)}>
          THE NUMBERS SPEAK.
        </h1>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-8 py-4 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; GET FABRK
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="outline"
            asChild
            className={cn('px-6 py-4 text-xs', mode.radius, mode.font)}
          >
            <Link href="/library">&gt; SEE DEMO</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
