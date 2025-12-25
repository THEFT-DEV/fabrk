/**
 * Hero Variation 20: PROBLEM/SOLUTION
 * Hook: Pain→Relief comparison side by side
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, X, Check } from 'lucide-react';

export function HeroProblemSolution() {
  return (
    <Container size="2xl">
      <div className="py-12 max-h-[70vh] flex flex-col justify-center">
        {/* Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Problem */}
          <div className={cn('border border-destructive/30 p-6', mode.font)}>
            <div className={cn('text-xs mb-4', mode.color.text.danger)}>
              <X className="h-3 w-3 inline mr-2" />
              THE OLD WAY
            </div>
            <div className="text-4xl font-bold line-through opacity-50 mb-2">6 WEEKS</div>
            <div className={cn('text-sm', mode.color.text.muted)}>
              Writing auth from scratch. Wiring up Stripe. Building components.
              Testing edge cases. Debugging OAuth flows.
            </div>
          </div>

          {/* Solution */}
          <div className={cn('border border-success p-6', mode.font)}>
            <div className={cn('text-xs mb-4', mode.color.text.success)}>
              <Check className="h-3 w-3 inline mr-2" />
              THE FABRK WAY
            </div>
            <div className="text-4xl font-bold text-primary mb-2">2 DAYS</div>
            <div className={cn('text-sm', mode.color.text.muted)}>
              Clone. Configure. Deploy. Focus on what makes your product unique
              while we handle the infrastructure.
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
            SAME FEATURES.{' '}
            <span className="text-primary">90% LESS WORK.</span>
          </h1>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-8 py-4 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; CHOOSE THE FASTER WAY
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="outline"
            asChild
            className={cn('px-6 py-4 text-xs', mode.radius, mode.font)}
          >
            <Link href="/docs/getting-started">&gt; SEE THE CODEBASE</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
