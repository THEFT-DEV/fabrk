/**
 * FABRK COMPONENT
 * Navigation Controls - Back/Next buttons
 */

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface NavigationControlsProps {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
}

export function NavigationControls({ currentStep, onBack, onNext }: NavigationControlsProps) {
  return (
    <div className="border-border flex items-center justify-between border-t px-6 py-4">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 1}
        className={cn(mode.radius, mode.font, 'text-xs')}
      >
        <ArrowLeft className="mr-1 h-3 w-3" />
        BACK
      </Button>
      <Button onClick={onNext} className={cn(mode.radius, mode.font, 'text-xs')}>
        {currentStep === 4 ? 'COMPLETE' : 'NEXT'}
        <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
    </div>
  );
}
