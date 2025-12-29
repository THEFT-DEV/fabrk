/**
 * Hero Variation 26: LOGO BAR
 * Hook: Company logos strip - "Trusted by developers at"
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';

const LOGOS = [
  { name: 'VERCEL', width: 80 },
  { name: 'STRIPE', width: 70 },
  { name: 'GITHUB', width: 75 },
  { name: 'NOTION', width: 75 },
  { name: 'LINEAR', width: 65 },
];

export function HeroLogoBar() {
  return (
    <Container size="lg">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Headline */}
        <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight mb-4', mode.font)}>
          BUILD LIKE THE
          <br />
          <span className="text-primary">BEST TEAMS</span>
        </h1>

        <p className={cn('text-sm max-w-md mb-8', mode.font, mode.color.text.muted)}>
          The same patterns used by the best SaaS companies.
          Now available in your codebase.
        </p>

        {/* Logo Bar */}
        <div className={cn('flex items-center justify-center gap-8 mb-8 flex-wrap', mode.font)}>
          <span className={cn('text-xs', mode.color.text.muted)}>TRUSTED BY DEVS AT</span>
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className={cn('text-sm font-bold tracking-wider', mode.color.text.muted)}
              style={{ width: logo.width }}
            >
              {logo.name}
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
            &gt; JOIN THEM
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="outline"
            asChild
            className={cn('px-6 py-4 text-xs', mode.radius, mode.font)}
          >
            <Link href="/library">&gt; SEE DEMO</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
