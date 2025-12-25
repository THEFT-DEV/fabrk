/**
 * Hero Variation 15: MINIMAL CTA
 * Hook: Ultra-focused conversion - maximum impact, minimum elements
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';

export function HeroMinimalCTA() {
  return (
    <Container size="lg">
      <div className="py-16 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Price Tag */}
        <div className={cn('text-xs border px-4 py-2 mb-8', mode.font)}>
          <span className={mode.color.text.muted}>ONE-TIME PAYMENT:</span>
          <span className="ml-2 font-bold text-primary">$299</span>
        </div>

        {/* Single Headline */}
        <h1 className={cn('text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6', mode.font)}>
          SHIP YOUR SAAS
          <br />
          <span className="text-primary">THIS WEEKEND</span>
        </h1>

        {/* Single Line Value Prop */}
        <p className={cn('text-sm sm:text-base mb-8 max-w-xl', mode.font, mode.color.text.muted)}>
          Auth. Payments. 78 Components. 12 Themes. Production-ready.
        </p>

        {/* Primary CTA - Large */}
        <PolarCheckoutButton
          className={cn(
            'bg-primary text-primary-foreground px-12 py-4 text-base font-bold',
            mode.radius,
            mode.font
          )}
        >
          &gt; GET FABRK NOW
          <ArrowRight className="ml-3 h-5 w-5" />
        </PolarCheckoutButton>

        {/* Secondary Link */}
        <Button
          variant="link"
          asChild
          className={cn('mt-4 text-xs', mode.font, mode.color.text.muted)}
        >
          <Link href="/library">or explore the live demo first →</Link>
        </Button>

        {/* Trust Line */}
        <div className={cn('mt-12 text-xs', mode.font, mode.color.text.muted)}>
          500+ developers • 4.9/5 rating • Lifetime updates
        </div>
      </div>
    </Container>
  );
}
