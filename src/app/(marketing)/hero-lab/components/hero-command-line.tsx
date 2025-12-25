/**
 * Hero Variation 11: COMMAND LINE
 * Hook: Single terminal command - ultra compact, above fold
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Copy, Check } from 'lucide-react';

export function HeroCommandLine() {
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullCommand = 'npx create-fabrk@latest my-saas';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullCommand.length) {
        setTypedText(fullCommand.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container size="2xl">
      <div className="flex flex-col items-center text-center space-y-6 py-8 max-h-[70vh]">
        {/* Badge */}
        <div className={cn('text-xs border px-3 py-1', mode.font, mode.color.text.muted)}>
          78 COMPONENTS • 12 THEMES • $299 ONE-TIME
        </div>

        {/* Headline */}
        <h1 className={cn('text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight', mode.font)}>
          ONE COMMAND.
          <br />
          <span className="text-primary">FULL SAAS.</span>
        </h1>

        {/* Terminal Command */}
        <div className={cn('w-full max-w-xl border bg-muted/30', mode.font)}>
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-danger/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
            </div>
            <span className={cn('text-xs', mode.color.text.muted)}>terminal</span>
            <button
              onClick={handleCopy}
              className={cn('text-xs flex items-center gap-1', mode.state.hover.linkOpacity)}
            >
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="text-success">$</span>
              <span>{typedText}</span>
              <span className="animate-pulse">▊</span>
            </div>
          </div>
        </div>

        {/* Subtext */}
        <p className={cn('text-sm max-w-md', mode.font, mode.color.text.muted)}>
          Auth, payments, dashboard, 78 components—production-ready in 4 minutes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-8 py-3 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; GET FABRK
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="outline"
            asChild
            className={cn('px-6 py-3 text-xs', mode.radius, mode.font)}
          >
            <Link href="/library">&gt; LIVE DEMO</Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className={cn('flex items-center gap-8 text-xs pt-4', mode.font, mode.color.text.muted)}>
          <span>232 HOURS SAVED</span>
          <span>•</span>
          <span>500+ DEVS</span>
          <span>•</span>
          <span>LIFETIME UPDATES</span>
        </div>
      </div>
    </Container>
  );
}
