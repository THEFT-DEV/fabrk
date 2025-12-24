/**
 * Success Step Component
 * Step 3: Confirmation screen after organization creation
 */

import * as React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface SuccessStepProps {
  onComplete: () => void;
}

export function SuccessStep({ onComplete }: SuccessStepProps) {
  return (
    <Card tone="success">
      <CardHeader code="0x00" title="SUCCESS" icon={<Check className="h-4 w-4" />} />
      <CardContent padding="lg">
        <div className="flex flex-col items-center justify-center">
          <div className="border-border bg-success rounded-none border p-4">
            <Check className="text-success-foreground h-8 w-8" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">All Set!</h3>
          <p className="text-muted-foreground mt-2 text-center">
            Your organization has been created and invitations sent.
          </p>
          <Button onClick={onComplete} className="mt-6">
            &gt; GO TO DASHBOARD
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
