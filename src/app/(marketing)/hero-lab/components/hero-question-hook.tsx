/**
 * Hero Variation 17: QUESTION HOOK
 * Hook: Question-based headline that resonates with pain points
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Check } from 'lucide-react';

export function HeroQuestionHook() {
  return (
    <Container size="lg">
      <div className="py-16 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Question */}
        <div className={cn('text-xs mb-4 border px-3 py-1', mode.font, mode.color.text.muted)}>
          STILL WRITING BOILERPLATE IN 2025?
        </div>

        {/* Answer */}
        <h1 className={cn('text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6', mode.font)}>
          <span className={mode.color.text.muted}>THERE&apos;S A</span>
          <br />
          <span className="text-primary">BETTER WAY</span>
        </h1>

        {/* Quick Benefits */}
        <div className={cn('flex flex-wrap justify-center gap-4 mb-8', mode.font)}>
          {['AUTH INCLUDED', 'PAYMENTS INCLUDED', 'UI INCLUDED'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs">
              <Check className="h-3 w-3 text-success" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-8 py-4 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; STOP WASTING TIME
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="outline"
            asChild
            className={cn('px-6 py-4 text-xs', mode.radius, mode.font)}
          >
            <Link href="/docs">&gt; LEARN MORE</Link>
          </Button>
        </div>

        {/* Counter-question */}
        <div className={cn('mt-8 text-xs', mode.font, mode.color.text.muted)}>
          Why rebuild what&apos;s already been perfected?
        </div>
      </div>
    </Container>
  );
}
