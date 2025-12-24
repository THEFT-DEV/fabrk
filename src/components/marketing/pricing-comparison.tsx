/**
 * ✅ FABRK COMPONENT
 * Interactive pricing table with feature comparison checkmarks.
 *
 * @example
 * ```tsx
 * <PricingComparison plans={plans} features={features} />
 * ```
 */

'use client';

import * as React from 'react';
import { Check, X, Crown, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { mode } from '@/design-system';
export interface PricingPlan {
  id: string;
  name: string;
  price: number | 'Custom';
  interval?: 'month' | 'year';
  description: string;
  popular?: boolean;
  cta: string;
  onSelect?: () => void;
}

export interface PricingFeature {
  name: string;
  category?: string;
  plans: {
    [planId: string]: boolean | string | number;
  };
}

interface PricingComparisonProps {
  plans: PricingPlan[];
  features: PricingFeature[];
  showCategories?: boolean;
  className?: string;
}

export function PricingComparison({
  plans,
  features,
  showCategories = true,
  className,
}: PricingComparisonProps) {
  const categories = showCategories
    ? Array.from(new Set(features.map((f) => f.category).filter(Boolean)))
    : [];

  const getFeaturesByCategory = (category?: string) => {
    return features.filter((f) => f.category === category);
  };

  const renderFeatureValue = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="text-primary h-5 w-5" />
      ) : (
        <X className="text-muted-foreground h-5 w-5" />
      );
    }
    return <span className="text-foreground text-sm font-medium">{value}</span>;
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Plan Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, index) => (
          <Card
            key={plan.id}
            tone={plan.popular ? 'primary' : 'neutral'}
            interactive
            className="relative overflow-hidden"
          >
            {plan.popular && (
              <div className="bg-primary text-primary-foreground absolute top-6 -right-12 rotate-45 px-12 py-1 text-xs font-semibold">
                Popular
              </div>
            )}

            <CardHeader
              code={`0x0${index}`}
              title={plan.name.toUpperCase()}
              icon={
                <>
                  {plan.name === 'Enterprise' && <Crown className="h-4 w-4" />}
                  {plan.popular && <Zap className="h-4 w-4" />}
                </>
              }
            />

            <CardContent padding="md" className="space-y-4">
              <p className="text-muted-foreground text-sm">{plan.description}</p>

              <div className="space-y-1">
                {plan.price === 'Custom' ? (
                  <div className="text-foreground text-3xl font-bold">Custom</div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-foreground text-3xl font-bold">${plan.price}</span>
                      {plan.interval && (
                        <span className="text-muted-foreground text-sm">/{plan.interval}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant={plan.popular ? 'default' : 'outline'}
                className="w-full"
                onClick={plan.onSelect}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="border-border overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border bg-muted rounded-none border-b">
                <th className="rounded-none p-4 text-left">
                  <span className="text-foreground text-sm font-semibold">Features</span>
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} className="min-w-[120px] rounded-none p-4 text-center">
                    <span className="text-foreground text-sm font-semibold">{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showCategories ? (
                <>
                  {categories.map((category, _categoryIndex) => (
                    <React.Fragment key={category || 'uncategorized'}>
                      {/* Category Header */}
                      <tr className="border-border border-t">
                        <td colSpan={plans.length + 1} className="p-4">
                          <span className="text-foreground text-xs font-semibold tracking-wide uppercase">
                            {category || 'Other Features'}
                          </span>
                        </td>
                      </tr>
                      {/* Category Features */}
                      {getFeaturesByCategory(category).map((feature, featureIndex) => (
                        <tr
                          key={`${category}-${featureIndex}`}
                          className={cn('border-border border-t transition-colors', mode.state.hover.card)}
                        >
                          <td className="p-4">
                            <span className="text-foreground text-sm">{feature.name}</span>
                          </td>
                          {plans.map((plan) => (
                            <td key={plan.id} className="p-4 text-center">
                              {renderFeatureValue(feature.plans[plan.id])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  {features.map((feature, index) => (
                    <tr
                      key={index}
                      className="border-border hover:bg-primary/5 border-t transition-colors"
                    >
                      <td className="p-4">
                        <span className="text-foreground text-sm">{feature.name}</span>
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="p-4 text-center">
                          {renderFeatureValue(feature.plans[plan.id])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={cn('border-border bg-card border p-6 text-center', mode.radius)}>
        <h3 className={cn('text-foreground mb-2 text-sm font-bold', mode.font)}>
          NEED HELP CHOOSING?
        </h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Contact our team for personalized recommendations
        </p>
        <Button variant="outline">&gt; CONTACT SALES</Button>
      </div>
    </div>
  );
}
