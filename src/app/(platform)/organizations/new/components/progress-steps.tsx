/**
 * Progress Steps Component
 * Visual indicator for multi-step wizard progress
 */

import * as React from 'react';
import { Check } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressSteps({ currentStep, totalSteps }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
        <React.Fragment key={s}>
          <div
            className={cn(
              `border-border flex h-10 w-10 items-center justify-center`,
              mode.radius,
              `border font-semibold transition-all ${
                currentStep >= s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground'
              }`
            )}
          >
            {currentStep > s ? <Check className="h-5 w-5" /> : s}
          </div>
          {s < totalSteps && (
            <div
              className={`h-0.5 w-12 transition-all ${
                currentStep > s ? 'bg-primary' : 'bg-border'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
