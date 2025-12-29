/**
 * FABRK COMPONENT
 * Progress Section - Progress bar with step indicators
 */

import { LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  name: string;
  icon: LucideIcon;
}

interface ProgressSectionProps {
  currentStep: number;
  steps: Step[];
  progress: number;
}

export function ProgressSection({ currentStep, steps, progress }: ProgressSectionProps) {
  return (
    <div className="border-border border-b p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
          [PROGRESS]: STEP {currentStep}/{steps.length}
        </span>
        <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
          {Math.round(progress)}%
        </span>
      </div>
      {/* Full-width visual progress bar */}
      <div className="bg-muted relative h-2 w-full overflow-hidden">
        <div
          className="bg-primary absolute top-0 left-0 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="mt-4 flex items-center justify-between">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-1">
              <div
                className={cn(`flex h-8 w-8 items-center justify-center border ${
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isCompleted
                      ? 'border-success bg-success/10 text-success'
                      : 'border-border text-muted-foreground'
                }`, mode.radius)}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`font-mono text-xs ${
                  isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
