/**
 * Hero Variation 7: FEATURE CHECKLIST (COMPACT)
 * Hook: Completeness flex with animated checkmarks
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Check, Square } from 'lucide-react';

const FEATURES = [
  { name: 'AUTH', items: ['NextAuth v5', 'OAuth providers', 'Magic links'] },
  { name: 'PAYMENTS', items: ['Stripe', 'Polar.sh', 'Webhooks'] },
  { name: 'UI', items: ['78 components', '12 themes', 'OKLCH colors'] },
];

function FeatureItem({ text, delay }: { text: string; delay: number }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChecked(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs transition-all duration-300',
        mode.font,
        checked ? 'opacity-100' : 'opacity-40'
      )}
    >
      <div
        className={cn(
          'h-3 w-3 border flex items-center justify-center transition-colors',
          checked ? 'border-success bg-success/20' : 'border-muted'
        )}
      >
        {checked ? (
          <Check className="h-2 w-2 text-success" />
        ) : (
          <Square className="h-2 w-2 text-muted" />
        )}
      </div>
      <span className={checked ? '' : 'line-through'}>{text}</span>
    </div>
  );
}

export function HeroFeatureChecklist() {
  const [totalChecked, setTotalChecked] = useState(0);
  const totalFeatures = FEATURES.reduce((acc, g) => acc + g.items.length, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalChecked((prev) => (prev < totalFeatures ? prev + 1 : prev));
    }, 150);
    return () => clearInterval(interval);
  }, [totalFeatures]);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* LEFT: Feature Grid */}
          <div className="space-y-4">
            <div className={cn('flex items-center justify-between', mode.font)}>
              <span className={cn('text-xs', mode.color.text.muted)}>[FEATURES INCLUDED]</span>
              <span className={cn('text-sm font-bold', mode.color.text.success)}>
                {totalChecked}/{totalFeatures}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {FEATURES.map((group, groupIndex) => (
                <div key={group.name} className="border p-3 space-y-2">
                  <div className={cn('text-xs font-bold', mode.font, mode.color.text.accent)}>
                    {group.name}
                  </div>
                  {group.items.map((item, itemIndex) => (
                    <FeatureItem
                      key={item}
                      text={item}
                      delay={(groupIndex * 3 + itemIndex) * 150}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Time Saved */}
            <div className={cn('border p-3', mode.font)}>
              <div className="flex items-center justify-between text-xs">
                <span className={mode.color.text.muted}>TOTAL DEV TIME SAVED</span>
                <span className="font-bold text-success">232 HOURS</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              EVERYTHING YOU NEED
              <br />
              <span className="text-primary">NOTHING YOU DON&apos;T</span>
            </h1>

            <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
              Every feature has been battle-tested in production.
              No bloat, no unused code, no guesswork.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; GET THE FULL STACK
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/features">&gt; VIEW ALL FEATURES</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
