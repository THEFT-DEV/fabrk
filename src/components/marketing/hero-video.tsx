'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { COMPONENT_COUNT_STRING } from '@/data/landing/stats';

interface HeroVideoProps {
  headline?: string;
  subheadline?: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  trustBadges?: string[];
  videoSrc?: string;
  videoPoster?: string;
  overlayOpacity?: number;
}

export function HeroVideo({
  headline = 'TERMINAL-AESTHETIC NEXTJS BOILERPLATE',
  subheadline = 'Stand out from the crowd. Ship your SaaS in hours, not weeks.',
  ctaPrimary = { text: 'Get Fabrk', href: '#pricing' },
  ctaSecondary = { text: 'View Demo', href: '#demo' },
  trustBadges = [
    'TypeScript Strict',
    'PostgreSQL',
    'Next.js 15',
    `${COMPONENT_COUNT_STRING} Components`,
  ],
  videoSrc,
  videoPoster,
  overlayOpacity = 0.6,
}: HeroVideoProps) {
  const [_videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Video Background or Animated Gradient */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={videoPoster}
              className="h-full w-full object-cover"
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            {/* Dark overlay for readability */}
            <div
              className="bg-foreground/60 absolute inset-0"
              data-overlay-opacity={overlayOpacity}
            ></div>
          </>
        ) : (
          /* Animated gradient fallback */
          <div className="animate-gradient-shift from-primary via-primary/80 to-primary h-full w-full bg-gradient-to-br">
            <div className="bg-foreground/50 absolute inset-0"></div>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 px-6 py-42 sm:py-40 lg:py-48">
        <div className="mx-auto max-w-4xl text-center">
          {/* Early Access Badge */}
          <div className="mb-8">
            <span
              className={cn(
                mode.radius,
                mode.font,
                'border-foreground/30 bg-foreground/10 text-foreground inline-block border-2 px-4 py-2 text-sm backdrop-blur-sm'
              )}
            >
              [ EARLY ACCESS ] JOIN FIRST 100 CUSTOMERS
            </span>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              mode.font,
              'text-foreground mb-8 text-5xl leading-tight font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl'
            )}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              mode.font,
              'text-foreground/90 mx-auto mb-12 max-w-2xl text-sm leading-relaxed'
            )}
          >
            &gt; {subheadline}
          </p>

          {/* CTAs */}
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className={cn(
                mode.radius,
                mode.font,
                'bg-card text-foreground hover:bg-muted h-14 px-8 text-sm font-semibold transition-all hover:scale-105'
              )}
              asChild
            >
              <Link href={ctaPrimary.href}>&gt; {ctaPrimary.text.toUpperCase()}</Link>
            </Button>
            <Button
              size="lg"
              className={cn(
                mode.radius,
                mode.font,
                'border-foreground text-foreground hover:bg-card hover:text-foreground h-14 border-2 bg-transparent px-8 text-sm font-semibold transition-all'
              )}
              asChild
            >
              <Link href={ctaSecondary.href}>&gt; VIEW {ctaSecondary.text.toUpperCase()}</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className={cn(mode.font, 'mb-8 flex flex-wrap justify-center gap-4')}>
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  mode.radius,
                  'border-foreground/30 bg-foreground/10 text-foreground border-2 px-4 py-1 text-xs backdrop-blur-sm'
                )}
              >
                [{badge.toUpperCase()}]
              </span>
            ))}
          </div>

          {/* Final Sale Notice */}
          <p className={cn(mode.font, 'text-foreground/80 text-xs')}>
            ALL SALES FINAL • LIFETIME V1.X UPDATES
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <svg
            className="text-foreground/60 size-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
