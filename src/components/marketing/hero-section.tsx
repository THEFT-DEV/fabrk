/**
 * Hero Section - Full Screen with ASCII Background
 * Large animated ASCII art backdrop
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
import { FuiBackground } from './fui-background';

const ROTATING_WORDS = [
  'AUTH',
  'PAYMENTS',
  'DASHBOARDS',
  'AI CHAT',
  'TEAMS',
  'ANALYTICS',
  'BILLING',
  'WEBHOOKS',
];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const word = ROTATING_WORDS[wordIndex];
    let delay = 80;

    if (phase === 'typing') {
      if (displayText.length < word.length) {
        delay = 80;
      } else {
        // Use setTimeout to avoid synchronous setState in effect
        const phaseTimer = setTimeout(() => setPhase('pausing'), 0);
        return () => clearTimeout(phaseTimer);
      }
    } else if (phase === 'pausing') {
      delay = 1500;
    } else if (phase === 'deleting') {
      delay = 40;
    }

    const timer = setTimeout(() => {
      if (phase === 'typing') {
        setDisplayText(word.slice(0, displayText.length + 1));
      } else if (phase === 'pausing') {
        setPhase('deleting');
      } else if (phase === 'deleting') {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
          setPhase('typing');
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, phase, wordIndex]);

  const currentWord = displayText;

  return (
    <section className="sticky top-0 z-10 min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* FUI Background */}
      <FuiBackground />

      <Container size="lg" className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main Headline */}
          <div className={cn('mb-10', mode.font)}>
            <div className="inline-block border border-border bg-background px-4 py-1.5 mb-6">
              <span className={cn('text-sm', mode.color.text.muted)}>BUILD</span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-foreground min-h-[1.2em] whitespace-nowrap">
              {currentWord}
              <span className="inline-block w-[0.55em] h-[1em] bg-primary animate-blink align-baseline -mb-[0.1em]" />
            </h1>
            <div className="inline-block border border-border bg-background px-4 py-1.5 mt-6">
              <span className={cn('text-sm', mode.color.text.muted)}>IN MINUTES, NOT MONTHS</span>
            </div>
          </div>

          {/* Description */}
          <p className={cn('text-sm max-w-lg mb-10 leading-relaxed', mode.font, mode.color.text.muted)}>
            Production-ready SaaS boilerplate with auth, payments, and 78 components.
            Stop writing infrastructure. Ship faster.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <PolarCheckoutButton
              className={cn(
                'bg-primary text-primary-foreground px-8 py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; GET FABRK
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$199</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="outline"
              asChild
              className={cn('px-8 py-3 text-sm', mode.radius, mode.font)}
            >
              <Link href="/library">&gt; VIEW DEMO</Link>
            </Button>
          </div>

          {/* Stats Bar */}
          <div className={cn('flex items-center gap-4 sm:gap-6 text-xs', mode.font, mode.color.text.muted)}>
            <span>78 COMPONENTS</span>
            <span className="text-border">|</span>
            <span>12 THEMES</span>
            <span className="text-border">|</span>
            <span>LIFETIME UPDATES</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
