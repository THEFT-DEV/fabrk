/**
 * Hero Variation 9: THEME SHOWCASE (COMPACT)
 * Hook: Visual variety with live theme switching
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Check, Palette } from 'lucide-react';

const THEMES = [
  { name: 'GREEN', primary: '#4ade80' },
  { name: 'AMBER', primary: '#fbbf24' },
  { name: 'RED', primary: '#f87171' },
  { name: 'BLUE', primary: '#60a5fa' },
  { name: 'PURPLE', primary: '#a78bfa' },
  { name: 'GAMEBOY', primary: '#9bbc0f' },
];

export function HeroThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % THEMES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* LEFT: Theme Grid */}
          <div className="space-y-4">
            <div className={cn('flex items-center gap-4', mode.font)}>
              <div
                className="h-4 w-4 animate-pulse transition-colors duration-500"
                style={{ backgroundColor: THEMES[activeTheme].primary }}
              />
              <span className="text-xs">
                ACTIVE: <span className="font-bold">{THEMES[activeTheme].name}</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {THEMES.map((theme, i) => (
                <button
                  key={theme.name}
                  onClick={() => setActiveTheme(i)}
                  className={cn(
                    'border p-3 text-left transition-all',
                    mode.font,
                    i === activeTheme ? 'border-primary ring-1 ring-primary' : mode.state.hover.card
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span className="text-xs font-bold">{theme.name}</span>
                    {i === activeTheme && <Check className="h-3 w-3 text-primary ml-auto" />}
                  </div>
                </button>
              ))}
            </div>

            <div className={cn('text-xs text-center', mode.font, mode.color.text.muted)}>
              +6 MORE THEMES INCLUDED
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <div className={cn('flex items-center gap-2', mode.font)}>
              <Palette className={cn('h-4 w-4', mode.color.text.primary)} />
              <span className={cn('text-xs', mode.color.text.muted)}>DESIGN SYSTEM</span>
            </div>

            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight leading-tight', mode.font)}>
              12 THEMES
              <br />
              <span className="text-primary">ZERO DESIGN</span>
              <br />
              <span className="text-primary">DECISIONS</span>
            </h1>

            <p className={cn('text-sm max-w-md leading-relaxed', mode.font, mode.color.text.muted)}>
              Every theme is built on OKLCH color science for perfect contrast
              and accessibility. Switch with one click.
            </p>

            {/* Features */}
            <div className={cn('space-y-2 text-xs', mode.font)}>
              {['OKLCH color system', 'WCAG 2.1 AA compliant', 'Dark mode included'].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-success" />
                  <span>{f}</span>
                </div>
              ))}
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
                &gt; GET ALL 12 THEMES
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/themes">&gt; EXPLORE THEMES</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
