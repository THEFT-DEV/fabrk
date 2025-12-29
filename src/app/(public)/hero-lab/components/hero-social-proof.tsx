/**
 * Hero Variation 6: SOCIAL PROOF STACK (COMPACT)
 * Hook: Trust through numbers and testimonials
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Star, GitBranch, Users, Download } from 'lucide-react';

function AnimatedStat({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroSocialProof() {
  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* LEFT: Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className={cn('border p-4 text-center', mode.font, mode.radius)}>
              <GitBranch className={cn('h-5 w-5 mx-auto mb-2', mode.color.text.primary)} />
              <div className="text-2xl font-bold">
                <AnimatedStat target={1247} />
              </div>
              <div className={cn('text-xs', mode.color.text.muted)}>GITHUB STARS</div>
            </div>

            <div className={cn('border p-4 text-center', mode.font, mode.radius)}>
              <Users className={cn('h-5 w-5 mx-auto mb-2', mode.color.text.primary)} />
              <div className="text-2xl font-bold">
                <AnimatedStat target={500} suffix="+" />
              </div>
              <div className={cn('text-xs', mode.color.text.muted)}>DEVELOPERS</div>
            </div>

            <div className={cn('border p-4 text-center', mode.font, mode.radius)}>
              <Download className={cn('h-5 w-5 mx-auto mb-2', mode.color.text.primary)} />
              <div className="text-2xl font-bold">
                <AnimatedStat target={2834} />
              </div>
              <div className={cn('text-xs', mode.color.text.muted)}>DOWNLOADS</div>
            </div>

            <div className={cn('border p-4 text-center', mode.font, mode.radius)}>
              <Star className={cn('h-5 w-5 mx-auto mb-2', mode.color.text.warning)} />
              <div className="text-2xl font-bold">4.9</div>
              <div className={cn('text-xs', mode.color.text.muted)}>AVG RATING</div>
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <div className={cn('flex items-center gap-2', mode.font)}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
              <span className={cn('text-xs ml-2', mode.color.text.muted)}>4.9/5 from 127 reviews</span>
            </div>

            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight leading-tight', mode.font)}>
              TRUSTED BY
              <br />
              <span className="text-primary">500+ DEVELOPERS</span>
            </h1>

            <p className={cn('text-sm max-w-md leading-relaxed', mode.font, mode.color.text.muted)}>
              Join hundreds of developers who&apos;ve shipped faster with Fabrk.
              From solo founders to funded startups.
            </p>

            {/* Trust Badges */}
            <div className={cn('flex flex-wrap gap-2', mode.font)}>
              {['PRODUCTION TESTED', 'DISCORD SUPPORT', 'LIFETIME UPDATES'].map(
                (badge) => (
                  <span
                    key={badge}
                    className={cn('text-xs border px-2 py-1', mode.color.text.muted, mode.radius)}
                  >
                    {badge}
                  </span>
                )
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; JOIN 500+ DEVELOPERS
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="https://github.com/fabrk/fabrk">&gt; VIEW ON GITHUB</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
