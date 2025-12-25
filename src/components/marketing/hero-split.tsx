'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { COMPONENT_COUNT_STRING } from '@/data/landing/stats';

interface HeroSplitProps {
  headline?: string;
  subheadline?: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  trustBadges?: string[];
  imagePosition?: 'left' | 'right';
}

export function HeroSplit({
  headline = 'TERMINAL-AESTHETIC NEXTJS BOILERPLATE',
  subheadline = '> STAND OUT // Ship your SaaS in hours, not weeks',
  ctaPrimary = { text: '> GET FABRK', href: '#pricing' },
  ctaSecondary = { text: '> VIEW DOCS', href: '/docs' },
  trustBadges = [
    'TYPESCRIPT STRICT',
    'POSTGRESQL PRISMA',
    'NEXTJS 15',
    `${COMPONENT_COUNT_STRING} COMPONENTS`,
  ],
  imagePosition = 'right',
}: HeroSplitProps) {
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1';
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2';

  return (
    <section className="bg-background relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content Side */}
          <div className={`${contentOrder} flex flex-col justify-center`}>
            {/* Early Access Badge */}
            <div className="mb-6">
              <Card className="inline-block">
                <CardContent
                  padding="sm"
                  className={cn('text-muted-foreground text-xs', mode.font)}
                >
                  [EARLY ACCESS] JOIN FIRST 100 LAUNCH CUSTOMERS
                </CardContent>
              </Card>
            </div>

            {/* Headline */}
            <h1
              className={cn(
                mode.font,
                'text-foreground mb-6 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl'
              )}
            >
              {headline}
            </h1>

            {/* Subheadline */}
            <p className={cn(mode.font, 'text-muted-foreground mb-8 text-sm leading-relaxed')}>
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className={cn(
                  mode.radius,
                  mode.font,
                  'bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 text-xs font-semibold transition-all'
                )}
                asChild
              >
                <Link href={ctaPrimary.href}>{ctaPrimary.text}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  mode.radius,
                  mode.font,
                  'border-foreground text-foreground hover:bg-foreground hover:text-background h-12 border-2 px-6 text-xs font-semibold transition-all'
                )}
                asChild
              >
                <Link href={ctaSecondary.href}>{ctaSecondary.text}</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <Card key={badge} className="inline-block">
                  <CardContent
                    padding="sm"
                    className={cn('text-muted-foreground px-2 py-1 text-xs', mode.font)}
                  >
                    [{badge}]
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Final Sale Notice */}
            <p className={cn(mode.font, 'text-muted-foreground mt-6 text-xs')}>
              {'// All sales final • Lifetime v1.x updates'}
            </p>
          </div>

          {/* Image/Visual Side */}
          <div className={`${imageOrder} relative`}>
            <div className={cn(mode.radius, 'border-foreground bg-muted relative border-2')}>
              {/* Dashboard Mockup */}
              <div className="aspect-4/3 p-6">
                <div
                  className={cn(mode.radius, 'border-border/20 bg-card h-full w-full border-2 p-4')}
                >
                  {/* Header */}
                  <div className="border-foreground/10 mb-4 flex items-center justify-between border-b-2 pb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(mode.radius, 'border-foreground bg-primary h-8 w-8 border-2')}
                      ></div>
                      <div>
                        <div className={cn(mode.radius, 'bg-foreground/20 h-3 w-24')}></div>
                        <div className={cn(mode.radius, 'bg-foreground/10 mt-1 h-2 w-16')}></div>
                      </div>
                    </div>
                    <div
                      className={cn(mode.radius, 'border-foreground bg-muted h-8 w-8 border-2')}
                    ></div>
                  </div>

                  {/* Stats Cards */}
                  <div className="mb-4 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(mode.radius, 'border-foreground bg-card border p-2')}
                      >
                        <div className={cn(mode.radius, 'bg-foreground/10 mb-2 h-2 w-12')}></div>
                        <div className={cn(mode.radius, 'bg-primary/20 h-4 w-8')}></div>
                      </div>
                    ))}
                  </div>

                  {/* Data Table Preview */}
                  <div className={cn(mode.radius, 'border-foreground bg-card border-2')}>
                    <div className="border-foreground/10 border-b-2 p-2">
                      <div className={cn(mode.radius, 'bg-foreground/20 h-3 w-20')}></div>
                    </div>
                    <div className="space-y-2 p-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-2">
                          <div className={cn(mode.radius, 'bg-foreground/5 h-3 w-full')}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* File Count Badge */}
              <div
                className={cn(
                  mode.radius,
                  mode.font,
                  'border-foreground bg-primary absolute -right-4 -bottom-4 border-2 px-6 py-4'
                )}
              >
                <p className="text-primary-foreground text-xs font-semibold">[TERMINAL_UI]</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div
              className={cn(mode.radius, 'bg-primary/10 absolute top-8 -left-8 -z-10 h-32 w-32')}
            ></div>
            <div
              className={cn(
                mode.radius,
                'bg-accent/10 absolute -right-8 -bottom-8 -z-10 h-24 w-24'
              )}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
