/**
 * FABRK COMPONENT
 * Step Welcome - First step of onboarding flow
 */

import { Sparkles } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function StepWelcome() {
  return (
    <div className="space-y-6 text-center">
      <div className="border-primary bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center border">
        <Sparkles className="text-primary h-8 w-8" />
      </div>
      <div>
        <h2 className={cn(mode.font, 'mb-2 text-2xl font-semibold tracking-tight')}>
          Welcome to Fabrk
        </h2>
        <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
          Let's get you set up in just a few steps. This will only take about 2 minutes.
        </p>
      </div>
      <div className="border-border border p-4 text-left">
        <div className={cn(mode.font, 'text-muted-foreground mb-2 text-xs')}>
          [WHAT YOULL SET UP]:
        </div>
        <div className={cn(mode.font, 'space-y-2 text-xs')}>
          <div>
            <span className="text-success">&gt;</span> Your profile information
          </div>
          <div>
            <span className="text-success">&gt;</span> Workspace configuration
          </div>
          <div>
            <span className="text-success">&gt;</span> Notification preferences
          </div>
        </div>
      </div>
    </div>
  );
}
