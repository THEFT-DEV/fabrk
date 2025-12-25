/**
 * Hero Variation 8: PRICING BREAKDOWN (COMPACT)
 * Hook: Value calculator showing ROI
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Clock, DollarSign } from 'lucide-react';

const COST_ITEMS = [
  { name: 'Auth System', hours: 40 },
  { name: 'Payments', hours: 24 },
  { name: 'UI Library', hours: 120 },
  { name: 'Design System', hours: 48 },
];

function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
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

  return (
    <span>
      {prefix}
      {current.toLocaleString()}
    </span>
  );
}

export function HeroPricingBreakdown() {
  const totalHours = COST_ITEMS.reduce((acc, item) => acc + item.hours, 0);
  const rate = 150;
  const totalDIYCost = totalHours * rate;
  const savings = totalDIYCost - 299;

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* LEFT: Calculator */}
          <Card size="auto">
            <CardHeader code="CALC" title="BUILD VS BUY" />
            <CardContent padding="md">
              <div className={cn('space-y-2 text-xs', mode.font)}>
                {COST_ITEMS.map((item) => (
                  <div key={item.name} className="flex justify-between">
                    <span className={mode.color.text.muted}>{item.name}</span>
                    <span>${(item.hours * rate).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>DIY TOTAL ({totalHours}h @ ${rate}/h)</span>
                  <span>${totalDIYCost.toLocaleString()}</span>
                </div>
                <div className={cn('flex justify-between font-bold', mode.color.text.success)}>
                  <span>FABRK</span>
                  <span>$299</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: Copy + Savings */}
          <div className="space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              BUILD IT YOURSELF?
              <br />
              <span className="text-destructive line-through">
                <AnimatedNumber value={totalDIYCost} prefix="$" />
              </span>
            </h1>

            <div className="grid grid-cols-2 gap-4">
              <div className={cn('border p-4 text-center', mode.font)}>
                <Clock className={cn('h-5 w-5 mx-auto mb-2', mode.color.text.primary)} />
                <div className="text-xl font-bold">
                  <AnimatedNumber value={totalHours} />h
                </div>
                <div className={cn('text-xs', mode.color.text.muted)}>TIME SAVED</div>
              </div>

              <div className={cn('border p-4 text-center', mode.font)}>
                <DollarSign className={cn('h-5 w-5 mx-auto mb-2', mode.color.text.success)} />
                <div className={cn('text-xl font-bold', mode.color.text.success)}>
                  <AnimatedNumber value={savings} prefix="$" />
                </div>
                <div className={cn('text-xs', mode.color.text.muted)}>YOU SAVE</div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <PolarCheckoutButton
                className={cn(
                  'w-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; SAVE ${savings.toLocaleString()} NOW
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('w-full px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/pricing">&gt; SEE WHAT&apos;S INCLUDED</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
