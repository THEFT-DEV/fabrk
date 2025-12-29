/**
 * Hero Variation 21: BROWSER MOCKUP
 * Hook: Fake browser with dashboard preview
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, ExternalLink } from 'lucide-react';

export function HeroBrowserMockup() {
  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* LEFT: Copy (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              THIS IS YOUR
              <br />
              <span className="text-primary">NEXT SAAS</span>
            </h1>

            <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
              A complete dashboard, ready to customize.
              Auth, billing, analytics—all wired up.
            </p>

            <div className="flex flex-col gap-3">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium w-fit',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; GET THIS NOW
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

          {/* RIGHT: Browser (3 cols) */}
          <div className="lg:col-span-3">
            <div className={cn('border overflow-hidden', mode.radius)}>
              {/* Browser Chrome */}
              <div className={cn('flex items-center gap-2 px-3 py-2 border-b bg-muted/50', mode.font)}>
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-destructive/50" />
                  <div className="h-2 w-2 rounded-full bg-warning/50" />
                  <div className="h-2 w-2 rounded-full bg-success/50" />
                </div>
                <div className={cn('flex-1 text-center text-xs', mode.color.text.muted)}>
                  yoursaas.com/dashboard
                </div>
                <ExternalLink className={cn('h-3 w-3', mode.color.text.muted)} />
              </div>

              {/* Dashboard Preview */}
              <div className="p-4 bg-background">
                <div className="grid grid-cols-4 gap-3">
                  {/* Sidebar */}
                  <div className={cn('border p-2 space-y-2', mode.radius)}>
                    <div className={cn('h-4 w-full bg-primary/20', mode.radius)} />
                    <div className={cn('h-3 w-3/4 bg-muted', mode.radius)} />
                    <div className={cn('h-3 w-2/3 bg-muted', mode.radius)} />
                  </div>
                  {/* Main */}
                  <div className="col-span-3 space-y-3">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      {['$12,847', '1,234', '+23%'].map((v, i) => (
                        <div key={i} className={cn('border p-2 text-center', mode.radius)}>
                          <div className={cn('text-sm font-bold', mode.font)}>{v}</div>
                        </div>
                      ))}
                    </div>
                    {/* Chart */}
                    <div className={cn('border p-3', mode.radius)}>
                      <div className="flex items-end gap-1 h-12">
                        {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
