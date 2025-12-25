/**
 * FABRK COMPONENT
 * Features Card - Template documentation
 */

'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function FeaturesCard() {
  return (
    <Card tone="neutral">
      <CardHeader code="0x00" title="TEMPLATE FEATURES" />
      <CardContent padding="md">
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [TEMPLATE FEATURES]:
        </div>
        <div className={cn(mode.font, 'space-y-2 text-xs')}>
          <div>
            <span className="text-success">&gt;</span> User info card with avatar
          </div>
          <div>
            <span className="text-success">&gt;</span> Stats display (projects, contributions,
            followers)
          </div>
          <div>
            <span className="text-success">&gt;</span> Achievement badges
          </div>
          <div>
            <span className="text-success">&gt;</span> Activity feed with timestamps
          </div>
          <div>
            <span className="text-success">&gt;</span> Projects tab with star counts
          </div>
          <div>
            <span className="text-success">&gt;</span> Edit profile and settings actions
          </div>
          <div>
            <span className="text-success">&gt;</span> Responsive layout
          </div>
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mt-4 text-xs')}>
          [NOTE]: Connect to your user service to populate real data and upload avatars.
        </div>
      </CardContent>
    </Card>
  );
}
