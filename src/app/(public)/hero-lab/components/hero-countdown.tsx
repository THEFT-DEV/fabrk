/**
 * Hero Variation 18: COUNTDOWN
 * Hook: Urgency-driven with launch special timer
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Clock } from 'lucide-react';

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-2 justify-center">
      {[
        { value: time.hours, label: 'HRS' },
        { value: time.minutes, label: 'MIN' },
        { value: time.seconds, label: 'SEC' },
      ].map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className={cn('border px-3 py-2 text-center', mode.font, mode.radius)}>
            <div className="text-2xl font-bold text-primary">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className={cn('text-xs', mode.color.text.muted)}>{unit.label}</div>
          </div>
          {i < 2 && <span className="text-xl text-primary">:</span>}
        </div>
      ))}
    </div>
  );
}

export function HeroCountdown() {
  return (
    <Container size="lg">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Launch Badge */}
        <div className={cn('text-xs mb-4 border border-warning px-3 py-1 text-warning', mode.font, mode.radius)}>
          <Clock className="h-3 w-3 inline mr-2" />
          LAUNCH SPECIAL ENDING SOON
        </div>

        {/* Price Comparison */}
        <div className={cn('flex items-center gap-4 mb-6', mode.font)}>
          <span className={cn('text-2xl line-through', mode.color.text.muted)}>$499</span>
          <ArrowRight className={cn('h-4 w-4', mode.color.text.muted)} />
          <span className="text-4xl font-bold text-primary">$299</span>
        </div>

        {/* Countdown */}
        <CountdownTimer />

        {/* Headline */}
        <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight mt-8 mb-4', mode.font)}>
          SAVE $200 ON
          <br />
          <span className="text-primary">FABRK PREMIUM</span>
        </h1>

        <p className={cn('text-sm max-w-md mb-6', mode.font, mode.color.text.muted)}>
          Full SaaS boilerplate with auth, payments, 78 components, and 12 themes.
        </p>

        {/* CTA */}
        <PolarCheckoutButton
          className={cn(
            'bg-primary text-primary-foreground px-10 py-4 text-sm font-medium',
            mode.radius,
            mode.font
          )}
        >
          &gt; CLAIM YOUR DISCOUNT
          <ArrowRight className="ml-2 h-4 w-4" />
        </PolarCheckoutButton>

        <Button
          variant="link"
          asChild
          className={cn('mt-4 text-xs', mode.font, mode.color.text.muted)}
        >
          <Link href="/library">or explore the demo first →</Link>
        </Button>
      </div>
    </Container>
  );
}
