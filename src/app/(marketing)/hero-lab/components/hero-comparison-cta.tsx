/**
 * Hero Variation 34: COMPARISON CTA
 * Hook: Fabrk vs building from scratch
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Check, X } from 'lucide-react';

const COMPARISON = [
  { feature: 'Time to launch', scratch: '6+ weeks', fabrk: '2 days' },
  { feature: 'Auth system', scratch: 'Build yourself', fabrk: 'Included' },
  { feature: 'Payment integration', scratch: '24+ hours', fabrk: '5 minutes' },
  { feature: 'UI components', scratch: '0', fabrk: '78' },
];

export function HeroComparisonCTA() {
  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: Comparison Table */}
          <div className={cn('border', mode.font)}>
            {/* Header */}
            <div className="grid grid-cols-3 border-b">
              <div className="p-3 text-xs" />
              <div className={cn('p-3 text-xs text-center border-l', mode.color.text.muted)}>
                <X className="h-3 w-3 mx-auto mb-1 text-destructive" />
                SCRATCH
              </div>
              <div className="p-3 text-xs text-center border-l bg-primary/10">
                <Check className="h-3 w-3 mx-auto mb-1 text-success" />
                FABRK
              </div>
            </div>

            {/* Rows */}
            {COMPARISON.map((row) => (
              <div key={row.feature} className="grid grid-cols-3 border-b last:border-b-0">
                <div className={cn('p-3 text-xs', mode.color.text.muted)}>{row.feature}</div>
                <div className={cn('p-3 text-xs text-center border-l line-through opacity-50')}>
                  {row.scratch}
                </div>
                <div className={cn('p-3 text-xs text-center border-l bg-primary/10 font-bold', mode.color.text.success)}>
                  {row.fabrk}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              FABRK VS
              <br />
              <span className="text-primary">FROM SCRATCH</span>
            </h1>

            <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
              Why spend weeks building what&apos;s already been perfected?
              Get production-ready code instantly.
            </p>

            <div className="flex flex-col gap-3">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium w-fit',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; CHOOSE FABRK
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('w-fit text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/features">&gt; FULL COMPARISON</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
