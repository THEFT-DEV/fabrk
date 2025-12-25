/**
 * Hero Variation 25: FLOATING CARDS
 * Hook: Animated floating dashboard cards
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, TrendingUp, Users, DollarSign, BarChart } from 'lucide-react';

const CARDS = [
  { icon: DollarSign, label: 'REVENUE', value: '$12,847', change: '+23%', color: 'text-success' },
  { icon: Users, label: 'USERS', value: '1,234', change: '+12%', color: 'text-primary' },
  { icon: TrendingUp, label: 'GROWTH', value: '+34%', change: 'MoM', color: 'text-warning' },
  { icon: BarChart, label: 'VIEWS', value: '45.2K', change: '+8%', color: 'text-accent' },
];

export function HeroFloatingCards() {
  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: Floating Cards */}
          <div className="relative h-[300px]">
            {CARDS.map((card, i) => (
              <div
                key={card.label}
                className={cn(
                  'absolute border bg-background p-4 shadow-sm transition-transform',
                  mode.font,
                  'hover:scale-105 hover:border-primary'
                )}
                style={{
                  top: `${(i % 2) * 120 + 20}px`,
                  left: `${(i % 2) * 40 + (Math.floor(i / 2) * 180)}px`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <card.icon className={cn('h-4 w-4 mb-2', card.color)} />
                <div className={cn('text-xs', mode.color.text.muted)}>{card.label}</div>
                <div className="text-xl font-bold">{card.value}</div>
                <div className={cn('text-xs', card.color)}>{card.change}</div>
              </div>
            ))}
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              YOUR DASHBOARD
              <br />
              <span className="text-primary">ALREADY BUILT</span>
            </h1>

            <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
              Analytics, charts, stats—everything you need to visualize your SaaS.
              Copy, paste, customize.
            </p>

            <div className="flex flex-col gap-3">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium w-fit',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; GET THE DASHBOARD
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('w-fit text-xs', mode.radius, mode.font)}
              >
                <Link href="/library/dashboard">&gt; PREVIEW LIVE</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </Container>
  );
}
