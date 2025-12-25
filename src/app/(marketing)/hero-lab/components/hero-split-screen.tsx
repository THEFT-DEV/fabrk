/**
 * Hero Variation 24: SPLIT SCREEN
 * Hook: 50/50 code vs rendered output
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Code, Eye } from 'lucide-react';

const CODE = `<Card>
  <Badge>ACTIVE</Badge>
  <Progress value={75} />
  <Button>Submit</Button>
</Card>`;

export function HeroSplitScreen() {
  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        {/* Split View */}
        <div className="grid lg:grid-cols-2 gap-0 border max-w-4xl mx-auto mb-8">
          {/* Left: Code */}
          <div className="border-r">
            <div className={cn('px-4 py-2 border-b bg-muted/30 flex items-center gap-2', mode.font)}>
              <Code className={cn('h-3 w-3', mode.color.text.muted)} />
              <span className="text-xs">CODE</span>
            </div>
            <div className="p-4 bg-background">
              <pre className={cn('text-xs leading-relaxed', mode.font)}>
                <code>
                  {CODE.split('\n').map((line, i) => (
                    <div key={i}>
                      <span className="text-primary">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          {/* Right: Preview */}
          <div>
            <div className={cn('px-4 py-2 border-b bg-muted/30 flex items-center gap-2', mode.font)}>
              <Eye className={cn('h-3 w-3', mode.color.text.muted)} />
              <span className="text-xs">PREVIEW</span>
            </div>
            <div className="p-4 bg-background">
              <Card size="auto">
                <CardContent padding="md" className="space-y-3">
                  <Badge>ACTIVE</Badge>
                  <Progress value={75} />
                  <Button size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
                    Submit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Copy + CTA */}
        <div className="text-center space-y-4">
          <h1 className={cn('text-3xl font-bold', mode.font)}>
            CODE IT. <span className="text-primary">SEE IT.</span>
          </h1>
          <p className={cn('text-sm max-w-md mx-auto', mode.font, mode.color.text.muted)}>
            78 components that look exactly like they should.
            Terminal aesthetic. Production-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PolarCheckoutButton
              className={cn(
                'bg-primary text-primary-foreground px-8 py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; GET ALL COMPONENTS
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="outline"
              asChild
              className={cn('px-6 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/library">&gt; BROWSE LIBRARY</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
