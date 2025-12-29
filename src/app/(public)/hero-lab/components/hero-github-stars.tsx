/**
 * Hero Variation 28: GITHUB STARS
 * Hook: Open source credibility with star count
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Star, GitBranch, GitFork } from 'lucide-react';

function AnimatedStars({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{value.toLocaleString()}</span>;
}

const CONTRIBUTORS = ['JC', 'SM', 'AK', 'RW', 'TL'];

export function HeroGithubStars() {
  return (
    <Container size="lg">
      <div className="py-12 max-h-[70vh] flex flex-col items-center justify-center text-center">
        {/* GitHub Stats */}
        <div className={cn('flex items-center gap-8 mb-8', mode.font)}>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-warning fill-warning" />
            <span className="text-3xl font-bold">
              <AnimatedStars target={1247} />
            </span>
            <span className={cn('text-xs', mode.color.text.muted)}>STARS</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className={cn('h-5 w-5', mode.color.text.muted)} />
            <span className="text-xl font-bold">342</span>
            <span className={cn('text-xs', mode.color.text.muted)}>FORKS</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight mb-4', mode.font)}>
          OPEN SOURCE
          <br />
          <span className="text-primary">PROVEN QUALITY</span>
        </h1>

        <p className={cn('text-sm max-w-md mb-6', mode.font, mode.color.text.muted)}>
          Thousands of developers have reviewed, starred, and shipped with Fabrk.
        </p>

        {/* Contributors */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex -space-x-2">
            {CONTRIBUTORS.map((initials) => (
              <Avatar key={initials} className={cn('h-8 w-8 border-2 border-background', mode.radius)}>
                <AvatarFallback className={cn(mode.font, 'text-xs')}>{initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className={cn('text-xs ml-2', mode.font, mode.color.text.muted)}>
            +50 contributors
          </span>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-8 py-4 text-sm font-medium',
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
            className={cn('px-6 py-4 text-xs', mode.radius, mode.font)}
          >
            <Link href="https://github.com/fabrk/fabrk">
              <GitBranch className="h-4 w-4 mr-2" />
              VIEW ON GITHUB
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
