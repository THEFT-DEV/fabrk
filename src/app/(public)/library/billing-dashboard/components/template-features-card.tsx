/**
 * ✅ FABRK COMPONENT
 * Template Features Card - Documents template capabilities
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function TemplateFeaturesCard() {
  return (
    <Card tone="neutral">
      <CardHeader code="0x00" title="FEATURES" />
      <CardContent padding="md">
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [TEMPLATE FEATURES]:
        </div>
        <div className={cn(mode.font, 'space-y-2 text-xs')}>
          <div>
            <span className="text-success">&gt;</span> 3-tab navigation (Overview, Plans & Pricing,
            Billing History)
          </div>
          <div>
            <span className="text-success">&gt;</span> Current subscription card with plan details
            and features
          </div>
          <div>
            <span className="text-success">&gt;</span> Usage metrics with progress bars (team,
            storage, API calls)
          </div>
          <div>
            <span className="text-success">&gt;</span> Payment methods management (add, remove, set
            default)
          </div>
          <div>
            <span className="text-success">&gt;</span> Recent invoices preview with download buttons
          </div>
          <div>
            <span className="text-success">&gt;</span> Plan comparison cards (Free, Pro, Enterprise)
          </div>
          <div>
            <span className="text-success">&gt;</span> Complete billing history table with status
            badges
          </div>
          <div>
            <span className="text-success">&gt;</span> Stripe integration ready
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal console aesthetic
          </div>
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mt-4 text-xs')}>
          [NOTE]: Connect to Stripe API for live data.
        </div>
      </CardContent>
    </Card>
  );
}
