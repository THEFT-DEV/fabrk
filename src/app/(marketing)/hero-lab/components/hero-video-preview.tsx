/**
 * Hero Variation 14: VIDEO PREVIEW
 * Hook: Compact hero with embedded preview/video placeholder
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Play, ExternalLink } from 'lucide-react';

export function HeroVideoPreview() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh]">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left: Copy (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              [SAAS BOILERPLATE]
            </div>

            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight leading-tight', mode.font)}>
              SEE IT.
              <br />
              <span className="text-primary">BUILD IT.</span>
              <br />
              SHIP IT.
            </h1>

            <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
              Watch a full SaaS get built in 4 minutes.
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
                &gt; GET FABRK
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <div className={cn('flex gap-4 text-xs', mode.font, mode.color.text.muted)}>
                <span>78 COMPONENTS</span>
                <span>•</span>
                <span>12 THEMES</span>
              </div>
            </div>
          </div>

          {/* Right: Preview (3 cols) */}
          <div className="lg:col-span-3">
            <Link
              href="/library"
              className="block relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Preview Container */}
              <div className={cn('border overflow-hidden transition-all', isHovered && 'border-primary')}>
                {/* Browser Chrome */}
                <div className={cn('flex items-center gap-2 px-3 py-2 border-b bg-muted/50', mode.font)}>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-danger/50" />
                    <div className="h-2 w-2 rounded-full bg-warning/50" />
                    <div className="h-2 w-2 rounded-full bg-success/50" />
                  </div>
                  <div className={cn('flex-1 text-center text-xs', mode.color.text.muted)}>
                    localhost:3000/dashboard
                  </div>
                  <ExternalLink className={cn('h-3 w-3', mode.color.text.muted)} />
                </div>

                {/* Preview Content */}
                <div className="relative aspect-video bg-background p-4">
                  {/* Simulated Dashboard */}
                  <div className="grid grid-cols-3 gap-2 h-full">
                    {/* Sidebar */}
                    <div className="col-span-1 border p-2 space-y-2">
                      <div className={cn('h-4 w-full bg-primary/20', mode.radius)} />
                      <div className={cn('h-3 w-3/4 bg-muted', mode.radius)} />
                      <div className={cn('h-3 w-2/3 bg-muted', mode.radius)} />
                      <div className={cn('h-3 w-3/4 bg-muted', mode.radius)} />
                    </div>
                    {/* Main */}
                    <div className="col-span-2 space-y-2">
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border p-2">
                            <div className={cn('h-2 w-1/2 bg-muted mb-1', mode.radius)} />
                            <div className={cn('h-4 w-full bg-primary/30', mode.radius)} />
                          </div>
                        ))}
                      </div>
                      {/* Chart */}
                      <div className="border p-2 flex-1">
                        <div className={cn('h-2 w-1/4 bg-muted mb-2', mode.radius)} />
                        <div className="flex items-end gap-1 h-16">
                          {[40, 65, 45, 80, 55, 70, 60, 75].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-primary/50"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Play Overlay */}
                  <div
                    className={cn(
                      'absolute inset-0 flex items-center justify-center bg-background/80 transition-opacity',
                      isHovered ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    <div className={cn('border-2 border-primary p-4', mode.font)}>
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className={cn('mt-2 text-center text-xs', mode.font, mode.color.text.muted)}>
                CLICK TO EXPLORE LIVE DEMO →
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
