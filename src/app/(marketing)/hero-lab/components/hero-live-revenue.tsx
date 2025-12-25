/**
 * Hero Variation 2: LIVE REVENUE (COMPACT)
 * Hook: Real SaaS metrics in action
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, DollarSign, Users, TrendingUp } from 'lucide-react';

function AnimatedRevenue({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        const increment = Math.random() * 100 + 50;
        return v + increment > target ? target : v + increment;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [target]);

  return <span>${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>;
}

export function HeroLiveRevenue() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* LEFT: Dashboard Preview */}
          <Card size="auto">
            <CardHeader code="LIVE" title="DASHBOARD PREVIEW" />
            <CardContent padding="md">
              <div className="space-y-4">
                {/* Revenue */}
                <div className="text-center py-4 border-b">
                  <div className={cn('text-xs mb-1', mode.font, mode.color.text.muted)}>MRR</div>
                  <div className={cn('text-4xl font-bold', mode.font)}>
                    {mounted ? <AnimatedRevenue target={12847} /> : '$0'}
                  </div>
                  <div className={cn('text-xs mt-1', mode.font, mode.color.text.success)}>+23.5%</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Users, label: 'USERS', value: '847' },
                    { icon: DollarSign, label: 'ARPU', value: '$15' },
                    { icon: TrendingUp, label: 'GROWTH', value: '+23%' },
                  ].map((stat) => (
                    <div key={stat.label} className={cn('text-center text-xs', mode.font)}>
                      <stat.icon className={cn('h-4 w-4 mx-auto mb-1', mode.color.text.muted)} />
                      <div className={mode.color.text.muted}>{stat.label}</div>
                      <div className="font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <div className={cn('text-xs px-2 py-1 border w-fit', mode.font, mode.color.text.success)}>
              <span className="h-1.5 w-1.5 inline-block bg-success animate-pulse mr-2" />
              LIVE DEMO DATA
            </div>

            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight leading-tight', mode.font)}>
              YOUR SAAS
              <br />
              <span className="text-primary">IN 48 HOURS</span>
            </h1>

            <p className={cn('text-sm max-w-md leading-relaxed', mode.font, mode.color.text.muted)}>
              This dashboard could be yours by Wednesday. Real-time analytics, Stripe webhooks,
              user management—all wired up and ready to ship.
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
                &gt; START BUILDING
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="/library">&gt; VIEW LIVE DEMOS</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
