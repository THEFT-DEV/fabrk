'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DemoVideoModal } from './demo-video-modal';
import dynamicCounts from '@/data/dynamic-counts.json';

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

  return (
    <section className="sticky top-0 z-10 min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <Container size="lg" className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <Link
            href="/changelog"
            className={cn(
              'group inline-flex items-center gap-2 border border-border bg-background px-4 py-1.5 mb-10 text-sm transition-all hover:border-primary',
              mode.radius,
              mode.font
            )}
          >
            <span className={mode.color.text.muted}>v1.3.1</span>
            <span className="text-border">|</span>
            <span className={mode.color.text.muted}>JUST UPDATED</span>
            <ArrowRight className={cn('h-3 w-3 transition-transform group-hover:translate-x-0.5', mode.color.text.muted)} />
          </Link>

          <div className={cn('mb-10', mode.font)}>
            <div className={cn('inline-block border border-border bg-background px-4 py-1.5 mb-6', mode.radius)}>
              <span className={cn('text-sm', mode.color.text.muted)}>BUILD</span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-foreground min-h-headline whitespace-nowrap">
              {displayText}
              <span className="inline-block w-cursor-lg h-cursor bg-primary animate-blink align-baseline -mb-cursor" />
            </h1>
            <div className={cn('inline-block border border-border bg-background px-4 py-1.5 mt-6', mode.radius)}>
              <span className={cn('text-sm', mode.color.text.muted)}>IN MINUTES, NOT MONTHS</span>
            </div>
          </div>

          <p className={cn('text-sm max-w-lg mb-10 leading-relaxed', mode.font, mode.color.text.muted)}>
            Production-ready SaaS boilerplate with auth, payments, and {dynamicCounts.counts.uiComponents} components.
            Stop writing infrastructure. Ship faster.
          </p>

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
            <DemoVideoModal className={cn('px-8 py-3 text-sm', mode.radius, mode.font)} />
          </div>

          <div className={cn('flex items-center gap-4 sm:gap-6 text-xs', mode.font, mode.color.text.muted)}>
            <span>{dynamicCounts.counts.uiComponents} COMPONENTS</span>
            <span className="text-border">|</span>
            <span>{dynamicCounts.counts.themes} THEMES</span>
            <span className="text-border">|</span>
            <span>LIFETIME UPDATES</span>
          </div>

        </div>
      </Container>
    </section>
  );
}
