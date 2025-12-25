/**
 * Hero Variation 10: SPEED RUN (COMPACT)
 * Hook: Show the actual workflow with timestamps
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Play, Check, Terminal } from 'lucide-react';

const STEPS = [
  { time: '0:00', title: 'DOWNLOAD', command: '> Payment confirmed' },
  { time: '1:00', title: 'INSTALL', command: '$ npm install' },
  { time: '2:00', title: 'CONFIGURE', command: '$ npm run setup' },
  { time: '4:00', title: 'DEPLOY', command: '$ vercel --prod' },
];

function TimelineStep({
  step,
  index,
  activeIndex,
}: {
  step: typeof STEPS[0];
  index: number;
  activeIndex: number;
}) {
  const isActive = index === activeIndex;
  const isComplete = index < activeIndex;
  const isPending = index > activeIndex;

  return (
    <div
      className={cn(
        'flex items-center gap-3 transition-all duration-300',
        isPending && 'opacity-40'
      )}
    >
      <div
        className={cn(
          'h-6 w-6 border flex items-center justify-center shrink-0 transition-colors',
          isComplete && 'bg-success border-success',
          isActive && 'border-primary animate-pulse'
        )}
      >
        {isComplete ? (
          <Check className="h-3 w-3 text-success-foreground" />
        ) : (
          <span className={cn('text-xs', mode.font, isActive && 'text-primary')}>{index + 1}</span>
        )}
      </div>

      <div className="flex-1">
        <div className={cn('flex items-center gap-2 text-xs', mode.font)}>
          <span className={isActive ? 'text-primary' : mode.color.text.muted}>[{step.time}]</span>
          <span className={cn('font-bold', isActive && 'text-primary')}>{step.title}</span>
        </div>
        <code className={cn('text-xs', mode.font, mode.color.text.muted)}>{step.command}</code>
      </div>
    </div>
  );
}

export function HeroSpeedRun() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= STEPS.length) {
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setActiveStep(0);
    setIsRunning(true);
  };

  return (
    <Container size="2xl">
      <div className="py-8 max-h-[70vh] flex flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* LEFT: Timeline */}
          <div className="space-y-4">
            <div className={cn('flex items-center gap-2', mode.font)}>
              <Terminal className={cn('h-4 w-4', mode.color.text.primary)} />
              <span className={cn('text-xs', mode.color.text.muted)}>SPEED RUN</span>
            </div>

            {/* Play or Timeline */}
            {!isRunning && activeStep === 0 ? (
              <button
                onClick={handleStart}
                className={cn(
                  'w-full border-2 border-dashed border-primary p-6 flex items-center justify-center gap-3 transition-colors',
                  mode.state.hover.card,
                  mode.font
                )}
              >
                <Play className="h-6 w-6 text-primary" />
                <span className="font-bold text-primary">START SPEED RUN</span>
              </button>
            ) : (
              <div className="space-y-3">
                {STEPS.map((step, i) => (
                  <TimelineStep key={step.time} step={step} index={i} activeIndex={activeStep} />
                ))}
              </div>
            )}

            {activeStep >= STEPS.length && (
              <div className={cn('border border-success p-4 text-center', mode.font)}>
                <Check className="h-6 w-6 text-success mx-auto mb-2" />
                <div className="font-bold">DEPLOYED IN 4 MINUTES</div>
                <Button onClick={handleStart} variant="ghost" className="mt-2 text-xs">
                  REPLAY
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT: Copy */}
          <div className="space-y-6">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight leading-tight', mode.font)}>
              FROM ZERO TO
              <br />
              <span className="text-primary">DEPLOYED</span>
              <br />
              IN 4 MINUTES
            </h1>

            <p className={cn('text-sm leading-relaxed', mode.font, mode.color.text.muted)}>
              Watch the full journey from purchase to production.
              No tutorials, no config hell, no wasted weekends.
            </p>

            {/* CTA */}
            <div className="space-y-3">
              <PolarCheckoutButton
                className={cn(
                  'w-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; START YOUR SPEED RUN
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('w-full px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/getting-started">&gt; READ THE DOCS</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
