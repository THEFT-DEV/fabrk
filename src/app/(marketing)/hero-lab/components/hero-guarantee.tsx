/**
 * Hero Variation 35: LIFETIME VALUE
 * Hook: Emphasize lifetime updates and full source code ownership
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Infinity, Check } from 'lucide-react';

export function HeroGuarantee() {
  return (
    <Container size="lg">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Shield Badge */}
        <div className={cn('border-2 border-success p-6 mb-8', mode.font)}>
          <Infinity className="h-12 w-12 text-success mx-auto mb-3" />
          <div className="text-2xl font-bold text-success">LIFETIME UPDATES</div>
          <div className={cn('text-xs mt-1', mode.color.text.muted)}>
            Full source code, forever yours
          </div>
        </div>

        {/* Headline */}
        <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight mb-4', mode.font)}>
          BUY ONCE
          <br />
          <span className="text-primary">BUILD FOREVER</span>
        </h1>

        <p className={cn('text-sm max-w-md mb-6', mode.font, mode.color.text.muted)}>
          Full source code ownership. Every future update included.
          No subscriptions. No recurring fees.
        </p>

        {/* Trust Points */}
        <div className={cn('flex flex-wrap justify-center gap-4 mb-8', mode.font)}>
          {['INSTANT ACCESS', 'LIFETIME UPDATES', 'DISCORD SUPPORT'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs">
              <Check className="h-3 w-3 text-success" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <PolarCheckoutButton
          className={cn(
            'bg-primary text-primary-foreground px-12 py-4 text-base font-bold',
            mode.radius,
            mode.font
          )}
        >
          &gt; GET LIFETIME ACCESS
          <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$199</span>
          <ArrowRight className="ml-3 h-5 w-5" />
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
