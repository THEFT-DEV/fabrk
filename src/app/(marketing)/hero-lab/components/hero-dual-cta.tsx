/**
 * Hero Variation 31: DUAL CTA
 * Hook: Two clear paths - Buy vs Try
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Eye } from 'lucide-react';

export function HeroDualCTA() {
  return (
    <Container size="lg">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Headline */}
        <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight mb-4', mode.font)}>
          READY TO
          <br />
          <span className="text-primary">SHIP FASTER?</span>
        </h1>

        <p className={cn('text-sm max-w-md mb-8', mode.font, mode.color.text.muted)}>
          Full SaaS boilerplate with auth, payments, 78 components, and 12 themes.
          One purchase. Lifetime access.
        </p>

        {/* Dual CTA */}
        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-lg">
          {/* Primary: Buy */}
          <div className={cn('border-2 border-primary p-6 text-center', mode.font)}>
            <div className={cn('text-xs mb-2', mode.color.text.muted)}>FULL ACCESS</div>
            <div className="text-3xl font-bold text-primary mb-4">$299</div>
            <PolarCheckoutButton
              className={cn(
                'w-full bg-primary text-primary-foreground py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; GET FABRK
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <div className={cn('text-xs mt-3', mode.color.text.muted)}>
              Instant download • Lifetime updates
            </div>
          </div>

          {/* Secondary: Try */}
          <div className={cn('border p-6 text-center', mode.font)}>
            <div className={cn('text-xs mb-2', mode.color.text.muted)}>EXPLORE FIRST</div>
            <div className="text-3xl font-bold mb-4">FREE</div>
            <Button
              variant="outline"
              asChild
              className={cn('w-full py-3 text-sm', mode.radius, mode.font)}
            >
              <Link href="/library">
                <Eye className="mr-2 h-4 w-4" />
                VIEW DEMO
              </Link>
            </Button>
            <div className={cn('text-xs mt-3', mode.color.text.muted)}>
              No signup required
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
