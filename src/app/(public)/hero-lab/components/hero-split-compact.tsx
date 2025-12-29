/**
 * Hero Variation 12: SPLIT COMPACT
 * Hook: Tight before/after comparison - stays above fold
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, X, Check } from 'lucide-react';

export function HeroSplitCompact() {
  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh]">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Headline + CTA */}
          <div className="space-y-6">
            <div className={cn('text-xs border px-2 py-1 w-fit', mode.font, mode.color.text.success, mode.radius)}>
              <span className="inline-block h-1.5 w-1.5 bg-success animate-pulse mr-2" />
              SHIP IN DAYS, NOT MONTHS
            </div>

            <h1 className={cn('text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight', mode.font)}>
              STOP WRITING
              <br />
              <span className="text-primary">BOILERPLATE</span>
            </h1>

            <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
              Auth, payments, and 78 UI components. Pre-built, tested, ready to customize.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; GET FABRK
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs">&gt; EXPLORE DOCS</Link>
              </Button>
            </div>
          </div>

          {/* Right: Compact Comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* WITHOUT */}
            <div className={cn('border p-4 space-y-3', mode.font, mode.radius)}>
              <div className="flex items-center gap-2 text-xs">
                <X className="h-4 w-4 text-danger" />
                <span className="font-bold">WITHOUT FABRK</span>
              </div>
              <div className={cn('space-y-2 text-xs', mode.color.text.muted)}>
                <div className="flex justify-between">
                  <span>Auth system</span>
                  <span>40h</span>
                </div>
                <div className="flex justify-between">
                  <span>Payments</span>
                  <span>24h</span>
                </div>
                <div className="flex justify-between">
                  <span>Components</span>
                  <span>120h</span>
                </div>
                <div className="flex justify-between">
                  <span>Testing</span>
                  <span>32h</span>
                </div>
              </div>
              <div className="border-t pt-2 flex justify-between text-xs">
                <span className="font-bold">TOTAL</span>
                <span className="text-danger font-bold">6 WEEKS</span>
              </div>
            </div>

            {/* WITH */}
            <div className={cn('border border-success p-4 space-y-3', mode.font, mode.radius)}>
              <div className="flex items-center gap-2 text-xs">
                <Check className="h-4 w-4 text-success" />
                <span className="font-bold text-success">WITH FABRK</span>
              </div>
              <div className={cn('space-y-2 text-xs')}>
                <div className="flex justify-between">
                  <span>Auth system</span>
                  <span className="text-success">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Payments</span>
                  <span className="text-success">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Components</span>
                  <span className="text-success">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Testing</span>
                  <span className="text-success">✓</span>
                </div>
              </div>
              <div className="border-t border-success pt-2 flex justify-between text-xs">
                <span className="font-bold">TOTAL</span>
                <span className="text-success font-bold">2 DAYS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className={cn('flex justify-center gap-8 mt-8 pt-6 border-t text-xs', mode.font, mode.color.text.muted)}>
          <span><strong className="text-foreground">78</strong> COMPONENTS</span>
          <span><strong className="text-foreground">48+</strong> TEMPLATES</span>
          <span><strong className="text-foreground">12</strong> THEMES</span>
          <span><strong className="text-foreground">$42K</strong> VALUE</span>
        </div>
      </div>
    </Container>
  );
}
