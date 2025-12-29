/**
 * Hero Variation 3: BEFORE/AFTER CODE (COMPACT)
 * Hook: Show the dramatic simplification
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
import { ArrowRight, Minus } from 'lucide-react';

const BEFORE_CODE = `// auth.ts - 200+ lines
import { NextAuthOptions } from 'next-auth'
// ... 50 imports, 150 lines of config
export const authOptions = { /* ... */ }`;

const AFTER_CODE = `import { Auth } from "@fabrk"
<Auth /> // Done.`;

export function HeroBeforeAfter() {
  const [showAfter, setShowAfter] = useState(false);
  const [linesDeleted, setLinesDeleted] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowAfter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showAfter) {
      let count = 0;
      const interval = setInterval(() => {
        count += 200;
        if (count >= 9847) {
          setLinesDeleted(9847);
          clearInterval(interval);
        } else {
          setLinesDeleted(count);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [showAfter]);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="space-y-6">
          {/* Headline + Counter */}
          <div className="text-center space-y-3">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              DELETE <span className={cn('text-danger', showAfter && 'line-through')}>10,000</span> LINES.{' '}
              <span className="text-primary">KEEP THE FEATURES.</span>
            </h1>
            <div className={cn('inline-flex items-center gap-3 border px-4 py-2', mode.font, mode.radius)}>
              <Minus className={cn('h-4 w-4', mode.color.text.danger)} />
              <span className={cn('text-xl font-bold', mode.color.text.danger)}>
                {linesDeleted.toLocaleString()}
              </span>
              <span className={cn('text-xs', mode.color.text.muted)}>LINES DELETED</span>
            </div>
          </div>

          {/* Code Comparison */}
          <div className="grid gap-4 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* BEFORE */}
            <Card size="auto" className={cn(showAfter && 'opacity-40 transition-opacity')}>
              <CardHeader code="DEL" title="WITHOUT FABRK" />
              <CardContent padding="sm" className="!p-0">
                <pre className={cn('p-3 text-xs overflow-x-auto', mode.font)}>
                  <code className={cn(mode.color.text.muted, showAfter && 'line-through')}>
                    {BEFORE_CODE}
                  </code>
                </pre>
                <div className={cn('px-3 py-2 border-t text-xs', mode.font, mode.color.text.muted)}>
                  47 files | 9,847 lines | 6 weeks
                </div>
              </CardContent>
            </Card>

            {/* AFTER */}
            <Card size="auto">
              <CardHeader code="ADD" title="WITH FABRK" />
              <CardContent padding="sm" className="!p-0">
                <pre className={cn('p-3 text-xs', mode.font)}>
                  <code>
                    <span className={mode.color.text.accent}>import</span>
                    <span>{' { Auth } '}</span>
                    <span className={mode.color.text.accent}>from</span>
                    <span className={mode.color.text.success}>{' "@fabrk"\n'}</span>
                    <span className={mode.color.text.accent}>{'<Auth />'}</span>
                    <span className={mode.color.text.muted}>{' // Done.'}</span>
                  </code>
                </pre>
                <div className={cn('px-3 py-2 border-t text-xs', mode.font, mode.color.text.success)}>
                  2 lines | 2 minutes
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PolarCheckoutButton
              className={cn(
                'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; DELETE THE BOILERPLATE
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="ghost"
              asChild
              className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/docs/getting-started">&gt; SEE FULL CODEBASE</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
