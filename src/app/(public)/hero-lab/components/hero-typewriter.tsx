/**
 * Hero Variation 16: TYPEWRITER
 * Hook: Animated typing headline with rotating benefits
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

// All the things a SaaS boilerplate needs
const ROTATING_WORDS = [
  // Auth & Users
  'AUTH',
  'SSO',
  '2FA',
  'USER PROFILES',
  'TEAMS',
  'ORGANIZATIONS',
  'MULTI-TENANCY',
  // Payments
  'PAYMENTS',
  'SUBSCRIPTIONS',
  'BILLING',
  'INVOICES',
  // AI Features
  'AI CHAT',
  'AI AGENTS',
  'LLM INTEGRATION',
  'EMBEDDINGS',
  // Core Features
  'DASHBOARDS',
  'ANALYTICS',
  'ADMIN PANELS',
  // Communication
  'EMAILS',
  'NOTIFICATIONS',
  'WEBHOOKS',
  // Infrastructure
  'API ROUTES',
  'RATE LIMITING',
  'FILE UPLOADS',
  'CRON JOBS',
];

export function HeroTypewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = ROTATING_WORDS[wordIndex];
    const delay = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < word.length) {
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === word.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % ROTATING_WORDS.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  const currentWord = ROTATING_WORDS[wordIndex].slice(0, charIndex);

  return (
    <Container size="lg">
      <div className="py-16 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* Typed Headline */}
        <h1 className={cn('text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6', mode.font)}>
          BUILD{' '}
          <span className="text-primary inline-block min-w-[280px] sm:min-w-[320px] text-left">
            {currentWord}
            <span className="animate-pulse">_</span>
          </span>
          <br />
          IN MINUTES
        </h1>

        <p className={cn('text-sm max-w-md mb-8', mode.font, mode.color.text.muted)}>
          Stop writing boilerplate. Start shipping features.
          78 components. 12 themes. One purchase.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-8 py-4 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; GET FABRK NOW
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="outline"
            asChild
            className={cn('px-6 py-4 text-xs', mode.radius, mode.font)}
          >
            <Link href="/library">&gt; VIEW DEMO</Link>
          </Button>
        </div>

        {/* Trust Line */}
        <div className={cn('mt-8 text-xs', mode.font, mode.color.text.muted)}>
          500+ developers • 4.9/5 rating • Lifetime updates
        </div>
      </div>
    </Container>
  );
}
