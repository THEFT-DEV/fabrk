/**
 * Hero Variation 5: TERMINAL BOOT SEQUENCE (COMPACT)
 * Hook: Developer-focused, immersive terminal experience
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';

const BOOT_SEQUENCE = [
  { text: '> INITIALIZING FABRK v1.0.0...', delay: 0, type: 'command' },
  { text: '[OK] Auth, Payments, Database loaded', delay: 400, type: 'success' },
  { text: '[OK] 78 components + 12 themes ready', delay: 800, type: 'success' },
  { text: '[READY] All systems operational', delay: 1200, type: 'success' },
  { text: '', delay: 1400, type: 'blank' },
  { text: '  FABRK PREMIUM - $299 ONE-TIME', delay: 1600, type: 'highlight' },
  { text: '', delay: 1800, type: 'blank' },
  { text: '> _', delay: 2000, type: 'cursor' },
];

export function HeroTerminalBoot() {
  const [lines, setLines] = useState<typeof BOOT_SEQUENCE>([]);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    BOOT_SEQUENCE.forEach((line, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => setShowCTA(true), 300);
        }
      }, line.delay);
    });
  }, []);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Terminal Window */}
          <Card size="auto" className="overflow-hidden">
            {/* Terminal Header */}
            <div className={cn('flex items-center gap-2 px-4 py-2 border-b bg-muted/50', mode.font)}>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
              </div>
              <span className={cn('text-xs flex-1 text-center', mode.color.text.muted)}>
                fabrk — zsh
              </span>
            </div>

            {/* Terminal Content */}
            <CardContent padding="sm" className="!p-0">
              <div className={cn('p-4 min-h-[180px] font-mono text-sm bg-background', mode.font)}>
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={cn(
                      'leading-relaxed',
                      line.type === 'command' && 'text-primary',
                      line.type === 'success' && 'text-success',
                      line.type === 'highlight' && 'text-primary font-bold text-lg',
                      line.type === 'cursor' && 'text-primary animate-pulse'
                    )}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA - appears after boot */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-4 justify-center transition-all duration-500',
              showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <PolarCheckoutButton
              className={cn(
                'bg-primary text-primary-foreground px-8 py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; INITIALIZE YOUR PROJECT
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="outline"
              asChild
              className={cn('px-6 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/library">&gt; VIEW LIVE DEMO</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
