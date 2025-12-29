/**
 * Hero Variation 27: SINGLE TESTIMONIAL
 * Hook: One powerful quote with avatar
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Quote } from 'lucide-react';

export function HeroSingleTestimonial() {
  return (
    <Container size="lg">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Quote Icon */}
        <Quote className={cn('h-8 w-8 mb-6', mode.color.text.primary)} />

        {/* Testimonial */}
        <blockquote className={cn('text-2xl sm:text-3xl font-bold tracking-tight mb-6 max-w-3xl', mode.font)}>
          &quot;Shipped my MVP in 3 days instead of 3 months.
          <span className="text-primary"> The terminal aesthetic is exactly what I wanted.</span>&quot;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4 mb-8">
          <Avatar className={cn('h-12 w-12', mode.radius)}>
            <AvatarFallback className={cn(mode.font)}>AC</AvatarFallback>
          </Avatar>
          <div className={cn('text-left', mode.font)}>
            <div className="font-bold">ALEX CHEN</div>
            <div className={cn('text-xs', mode.color.text.muted)}>Founder @ LaunchFast</div>
          </div>
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
            &gt; GET THE SAME RESULTS
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
      </div>
    </Container>
  );
}
