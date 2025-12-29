/**
 * FABRK COMPONENT
 * Step Complete - Completion summary
 */

import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface FormData {
  fullName: string;
  role: string;
  workspaceName: string;
  teamSize: string;
}

interface StepCompleteProps {
  formData: FormData;
}

export function StepComplete({ formData }: StepCompleteProps) {
  return (
    <div className="space-y-6 text-center">
      <div className={cn('border-success bg-success/10 mx-auto flex h-16 w-16 items-center justify-center border', mode.radius)}>
        <CheckCircle2 className="text-success h-8 w-8" />
      </div>
      <div>
        <h2 className={cn(mode.font, 'mb-2 text-2xl font-semibold tracking-tight')}>
          You're All Set!
        </h2>
        <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
          Your account is ready. Let's start building something amazing.
        </p>
      </div>

      <div className={cn('border-border border p-4 text-left', mode.radius)}>
        <div className={cn(mode.font, 'text-muted-foreground mb-2 text-xs')}>
          [ACCOUNT SUMMARY]:
        </div>
        <div className={cn(mode.font, 'space-y-2 text-xs')}>
          <div>
            <span className="text-muted-foreground">NAME:</span> {formData.fullName || 'Not set'}
          </div>
          <div>
            <span className="text-muted-foreground">ROLE:</span> {formData.role || 'Not set'}
          </div>
          <div>
            <span className="text-muted-foreground">WORKSPACE:</span>{' '}
            {formData.workspaceName || 'Not set'}
          </div>
          <div>
            <span className="text-muted-foreground">TEAM SIZE:</span>{' '}
            {formData.teamSize || 'Not set'}
          </div>
        </div>
      </div>

      <Button className={cn(mode.radius, mode.font, 'text-xs')}>&gt; GO TO DASHBOARD</Button>
    </div>
  );
}
