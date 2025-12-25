/**
 * Hero Variation 30: REVIEW SCORE
 * Hook: Rating-focused with stars prominently displayed
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Star } from 'lucide-react';

export function HeroReviewScore() {
  return (
    <Container size="lg">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Rating Display */}
        <div className={cn('flex items-center gap-3 mb-4', mode.font)}>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-8 w-8 fill-warning text-warning" />
            ))}
          </div>
        </div>

        <div className={cn('text-5xl font-bold mb-2', mode.font)}>
          4.9<span className={cn('text-xl', mode.color.text.muted)}>/5</span>
        </div>

        <div className={cn('text-sm mb-8', mode.font, mode.color.text.muted)}>
          from 127 developer reviews
        </div>

        {/* Headline */}
        <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight mb-4', mode.font)}>
          DEVELOPERS LOVE
          <br />
          <span className="text-primary">FABRK</span>
        </h1>

        <p className={cn('text-sm max-w-md mb-8', mode.font, mode.color.text.muted)}>
          Join 500+ developers who rated us near-perfect.
          See why they&apos;re shipping faster.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-8 py-4 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; JOIN 500+ DEVS
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="outline"
            asChild
            className={cn('px-6 py-4 text-xs', mode.radius, mode.font)}
          >
            <Link href="/library">&gt; TRY DEMO</Link>
          </Button>
        </div>

        {/* Trust Badge */}
        <div className={cn('mt-8 text-xs border px-4 py-2', mode.font, mode.color.text.muted)}>
          LIFETIME UPDATES INCLUDED
        </div>
      </div>
    </Container>
  );
}
