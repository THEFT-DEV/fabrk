/**
 * ✅ FABRK COMPONENT
 * Plan Cards - Displays available subscription plans
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Plan {
  name: string;
  price: number;
  features: string[];
  current: boolean;
}

interface PlanCardsProps {
  plans: Plan[];
}

export function PlanCards({ plans }: PlanCardsProps) {
  return (
    <>
      {/* Alert */}
      <div className={cn(mode.font, 'border-warning bg-warning/10 mb-6 border p-4 text-xs')}>
        <span className="text-warning-foreground font-semibold">[WARNING]:</span>{' '}
        <span className="text-foreground">
          Changing your plan will take effect at the next billing cycle
        </span>
      </div>

      {/* Plan Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <Card
            key={plan.name}
            tone={plan.current ? 'primary' : 'neutral'}
            className="flex flex-col"
          >
            <CardHeader code={`0x0${idx}`} title={`${plan.name.toUpperCase()} PLAN`} />
            <CardContent padding="md" className="flex flex-1 flex-col">
              <div className="mb-4 flex items-center justify-between">
                <div className={cn(mode.font, 'text-muted-foreground text-xs')}>[{plan.name}]:</div>
                {plan.current && (
                  <span
                    className={cn(
                      mode.font,
                      'border-primary/50 text-primary border px-2 py-0.5 text-xs'
                    )}
                  >
                    CURRENT
                  </span>
                )}
              </div>

              <div className="mb-4 text-4xl font-semibold">
                ${plan.price}
                <span className="text-muted-foreground text-sm font-normal">/mo</span>
              </div>

              <div className="border-border mb-4 flex-1 border-t pt-4">
                <div className={cn(mode.font, 'text-muted-foreground mb-2 text-xs')}>
                  [FEATURES]:
                </div>
                <div className="space-y-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className={cn(mode.font, 'flex items-center gap-2 text-xs')}>
                      <span className="text-success">&gt;</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className={cn(mode.radius, mode.font, 'w-full text-xs')}
                variant={plan.current ? 'outline' : 'default'}
                disabled={plan.current}
              >
                {plan.current ? 'CURRENT PLAN' : `> SELECT ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Plan */}
      <Card tone="neutral">
        <CardContent padding="md">
          <div className={cn(mode.font, 'text-muted-foreground mb-2 text-xs')}>[CUSTOM PLAN]:</div>
          <div className="flex items-center justify-between">
            <div>
              <div className={cn(mode.font, 'text-sm')}>Need a custom plan?</div>
              <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                Contact our sales team for custom pricing and features
              </div>
            </div>
            <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
              &gt; CONTACT SALES
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
