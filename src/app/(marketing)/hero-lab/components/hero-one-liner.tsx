/**
 * Hero Variation 19: ONE LINER
 * Hook: Ultra-minimal - single sentence and CTA
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';

export function HeroOneLiner() {
  return (
    <Container size="lg">
      <div className="py-20 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Single Line */}
        <h1 className={cn('text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 max-w-4xl', mode.font)}>
          SHIP YOUR SAAS IN DAYS,
          <br />
          <span className="text-primary">NOT MONTHS.</span>
        </h1>

        {/* Primary CTA - Extra Large */}
        <PolarCheckoutButton
          className={cn(
            'bg-primary text-primary-foreground px-16 py-5 text-lg font-bold',
            mode.radius,
            mode.font
          )}
        >
          &gt; $299
          <ArrowRight className="ml-3 h-5 w-5" />
        </PolarCheckoutButton>

        {/* Secondary */}
        <Button
          variant="link"
          asChild
          className={cn('mt-6 text-sm', mode.font, mode.color.text.muted)}
        >
          <Link href="/library">see live demo →</Link>
        </Button>
      </div>
    </Container>
  );
}
