/**
 * Hero Variation 23: TERMINAL ONLY
 * Hook: Full-width terminal with npx create-fabrk
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';

const OUTPUT_LINES = [
  { text: '$ npx create-fabrk my-saas', delay: 0, type: 'command' },
  { text: '', delay: 300, type: 'blank' },
  { text: 'Creating new Fabrk project...', delay: 500, type: 'info' },
  { text: '✓ Cloned template', delay: 1000, type: 'success' },
  { text: '✓ Installed dependencies', delay: 1500, type: 'success' },
  { text: '✓ Generated .env.local', delay: 2000, type: 'success' },
  { text: '', delay: 2300, type: 'blank' },
  { text: 'Done! Run: cd my-saas && npm run dev', delay: 2500, type: 'success' },
];

export function HeroTerminalOnly() {
  const [lines, setLines] = useState<typeof OUTPUT_LINES>([]);

  useEffect(() => {
    OUTPUT_LINES.forEach((line, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, line.delay);
    });
  }, []);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        {/* Terminal */}
        <div className={cn('border overflow-hidden max-w-3xl mx-auto w-full mb-8', mode.radius)}>
          {/* Terminal Header */}
          <div className={cn('flex items-center gap-2 px-4 py-2 border-b bg-muted/50', mode.font)}>
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
            </div>
            <span className={cn('text-xs flex-1 text-center', mode.color.text.muted)}>
              Terminal
            </span>
          </div>

          {/* Terminal Content */}
          <div className={cn('p-4 min-h-[200px] bg-background', mode.font)}>
            {lines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  'text-sm leading-relaxed',
                  line.type === 'command' && 'text-primary font-bold',
                  line.type === 'success' && 'text-success',
                  line.type === 'info' && mode.color.text.muted
                )}
              >
                {line.text}
              </div>
            ))}
            {lines.length === OUTPUT_LINES.length && (
              <div className="text-primary animate-pulse mt-2">$ _</div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className={cn('text-2xl font-bold', mode.font)}>
            ONE COMMAND. <span className="text-primary">FULL SAAS.</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PolarCheckoutButton
              className={cn(
                'bg-primary text-primary-foreground px-8 py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; GET ACCESS
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="outline"
              asChild
              className={cn('px-6 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/docs/getting-started">&gt; VIEW DOCS</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
