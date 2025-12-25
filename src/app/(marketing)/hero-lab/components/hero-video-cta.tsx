/**
 * Hero Variation 33: VIDEO CTA
 * Hook: Play button hero with video thumbnail
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Play, X } from 'lucide-react';

export function HeroVideoCTA() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: Video Thumbnail */}
          <div className="relative">
            <button
              onClick={() => setShowVideo(true)}
              className={cn('w-full border aspect-video flex items-center justify-center bg-muted/10 group', mode.state.hover.card)}
            >
              {/* Fake Video Preview */}
              <div className="absolute inset-0 p-4">
                <div className="grid grid-cols-3 gap-2 h-full opacity-30">
                  <div className="border" />
                  <div className="col-span-2 border" />
                </div>
              </div>

              {/* Play Button */}
              <div className={cn('relative z-10 border-2 border-primary p-4 group-hover:bg-primary transition-colors', mode.font)}>
                <Play className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
            </button>

            <div className={cn('mt-2 text-center text-xs', mode.font, mode.color.text.muted)}>
              WATCH: BUILD A SAAS IN 4 MINUTES
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              SEE IT IN
              <br />
              <span className="text-primary">ACTION</span>
            </h1>

            <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
              Watch a complete SaaS get built from scratch in under 4 minutes.
              Then do it yourself.
            </p>

            <div className="flex flex-col gap-3">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium w-fit',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; GET FABRK NOW
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('w-fit text-xs', mode.radius, mode.font)}
              >
                <Link href="/library">&gt; TRY LIVE DEMO</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Video Modal (simplified) */}
        {showVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90">
            <div className="relative w-full max-w-4xl p-4">
              <button
                onClick={() => setShowVideo(false)}
                className={cn('absolute -top-12 right-0 border p-2', mode.state.hover.card)}
              >
                <X className="h-4 w-4" />
              </button>
              <div className={cn('border aspect-video flex items-center justify-center bg-muted', mode.font)}>
                <span className={mode.color.text.muted}>[VIDEO PLAYER PLACEHOLDER]</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
