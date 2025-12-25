/**
 * FABRK COMPONENT
 * Pricing Cards Grid - Terminal-styled pricing cards
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge: string | null;
  features: string[];
  cta: string;
  ctaVariant: 'outline' | 'default';
}

interface PricingCardsProps {
  plans: Plan[];
  isYearly: boolean;
}

export function PricingCards({ plans, isYearly }: PricingCardsProps) {
  // Card size variants: small (left), large (middle/featured), medium (right)
  const getCardSize = (idx: number) => {
    switch (idx) {
      case 0:
        return 'small'; // Starter - smaller
      case 1:
        return 'large'; // Pro/Popular - larger (featured)
      case 2:
        return 'medium'; // Enterprise - medium
      default:
        return 'medium';
    }
  };

  const sizeStyles = {
    small: {
      wrapper: 'pt-8', // Push down to align bottom
      card: '',
      price: 'text-3xl',
    },
    medium: {
      wrapper: 'pt-4', // Slight push down
      card: '',
      price: 'text-4xl',
    },
    large: {
      wrapper: '', // No push - tallest card
      card: 'scale-[1.02] relative z-10', // Slight scale up for prominence
      price: 'text-5xl',
    },
  };

  return (
    <div className="grid items-end gap-6 md:grid-cols-3">
      {plans.map((plan, idx) => {
        const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
        const period = isYearly ? '/year' : '/month';
        const size = getCardSize(idx);
        const styles = sizeStyles[size];

        return (
          <div key={plan.id} className={styles.wrapper}>
            <Card tone={plan.badge ? 'primary' : 'neutral'} className={styles.card}>
              {/* Card Header */}
              <CardHeader code={`0x0${idx}`} title={plan.name} meta={plan.badge || undefined} />

              <CardContent padding="md">
                {/* Price */}
                <div className={cn('mb-4 font-semibold', styles.price)}>
                  ${price}
                  <span className="text-muted-foreground text-sm font-normal">{period}</span>
                </div>

                {/* Features */}
                <div className="border-border mb-4 flex-1 border-t pt-4">
                  <div className={cn(mode.font, 'text-muted-foreground mb-2 text-xs')}>
                    [FEATURES]:
                  </div>
                  <div className="space-y-1">
                    {plan.features.map((feature, featureIdx) => (
                      <div
                        key={featureIdx}
                        className={cn(mode.font, 'flex items-center gap-2 text-xs')}
                      >
                        <span className="text-success">&gt;</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={plan.ctaVariant}
                  className={cn(mode.radius, mode.font, 'w-full text-xs')}
                >
                  &gt; {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
