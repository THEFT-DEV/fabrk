/**
 * FABRK COMPONENT
 * Features Card - Template features and usage notes
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function FeaturesCard() {
  return (
    <Card tone="neutral">
      <CardHeader code="0x00" title="FEATURES" />
      <CardContent padding="md">
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [TEMPLATE FEATURES]:
        </div>
        <div className={cn(mode.font, 'space-y-2 text-xs')}>
          <div>
            <span className="text-success">&gt;</span> 3-tier pricing cards with terminal styling
          </div>
          <div>
            <span className="text-success">&gt;</span> Monthly/yearly toggle with savings badge
          </div>
          <div>
            <span className="text-success">&gt;</span> Feature comparison table
          </div>
          <div>
            <span className="text-success">&gt;</span> Expandable FAQ accordion
          </div>
          <div>
            <span className="text-success">&gt;</span> Popular plan highlight
          </div>
          <div>
            <span className="text-success">&gt;</span> Responsive grid layout
          </div>
          <div>
            <span className="text-success">&gt;</span> Design token colors (no hardcoded values)
          </div>
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mt-4 text-xs')}>
          [NOTE]: Connect to your payment provider (Stripe/Polar.sh) for live checkout.
        </div>
      </CardContent>
    </Card>
  );
}
