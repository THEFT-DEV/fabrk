/**
 * Hero Variation 4: COMPONENT GALLERY (COMPACT)
 * Hook: Visual overwhelm of what's included
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Check, Bell, User, CreditCard, BarChart3, Table2, Calendar, Settings } from 'lucide-react';

const COMPONENTS = [
  { name: 'Button', icon: Check },
  { name: 'Card', icon: CreditCard },
  { name: 'Table', icon: Table2 },
  { name: 'Chart', icon: BarChart3 },
  { name: 'Calendar', icon: Calendar },
  { name: 'Dialog', icon: Settings },
  { name: 'Toast', icon: Bell },
  { name: 'Avatar', icon: User },
];

function MiniComponent({ name, icon: Icon, index }: { name: string; icon: React.ComponentType<{ className?: string }>; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={cn(
        'group border p-2 transition-all duration-300 hover:border-primary',
        mode.state.hover.card,
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn('h-3 w-3', mode.color.text.muted, 'group-hover:text-primary')} />
        <span className={cn('text-xs', mode.font)}>{name}</span>
      </div>
    </div>
  );
}

export function HeroComponentGallery() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => (c < 78 ? c + 2 : c));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* LEFT: Component Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className={cn('text-xs', mode.font, mode.color.text.muted)}>[COMPONENT LIBRARY]</div>
              <div className={cn('text-xs', mode.font)}>
                <span className="text-primary font-bold">{count}</span>
                <span className={mode.color.text.muted}>/78 LOADED</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COMPONENTS.map((comp, i) => (
                <MiniComponent key={comp.name} {...comp} index={i} />
              ))}
              <div className={cn('border border-dashed p-2 flex items-center justify-center', mode.color.text.muted)}>
                <span className={cn('text-xs', mode.font)}>+70 MORE</span>
              </div>
            </div>

            {/* Price Comparison */}
            <div className={cn('border p-3 space-y-2', mode.font)}>
              <div className="flex items-center justify-between text-xs">
                <span className={mode.color.text.muted}>78 COMPONENTS @ $50/EA</span>
                <span className="line-through opacity-50">$3,900</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between">
                <span className="font-bold text-sm">FABRK TOTAL</span>
                <span className={cn('text-xl font-bold', mode.color.text.success)}>$299</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight leading-tight', mode.font)}>
              78 COMPONENTS
              <br />
              <span className="text-primary">$299</span>
              <br />
              <span className={cn('text-lg', mode.color.text.muted)}>DO THE MATH.</span>
            </h1>

            <p className={cn('text-sm leading-relaxed', mode.font, mode.color.text.muted)}>
              Every component you&apos;ll ever need, designed with terminal aesthetics
              and built for production. Stop building buttons. Start building products.
            </p>

            {/* CTA */}
            <div className="space-y-3">
              <PolarCheckoutButton
                className={cn(
                  'w-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; GET ALL 78 COMPONENTS
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('w-full px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/components">&gt; BROWSE COMPONENT DOCS</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
