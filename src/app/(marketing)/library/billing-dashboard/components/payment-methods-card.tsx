/**
 * ✅ FABRK COMPONENT
 * Payment Methods Card - Displays and manages payment methods
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CreditCard, Plus } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface PaymentMethodsCardProps {
  paymentMethods: PaymentMethod[];
}

export function PaymentMethodsCard({ paymentMethods }: PaymentMethodsCardProps) {
  return (
    <Card tone="neutral">
      <CardHeader code="0x02" title="PAYMENT METHODS" icon={<CreditCard className="size-4" />} />
      <CardContent padding="md">
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="border-border flex items-center justify-between border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="border-border bg-muted flex size-8 items-center justify-center border">
                  <CreditCard className="size-4" />
                </div>
                <div className={cn(mode.radius, mode.font, 'text-xs')}>
                  <div>
                    {method.brand} **** {method.last4}
                  </div>
                  <div className="text-muted-foreground">
                    [EXP]: {method.expMonth}/{method.expYear}
                  </div>
                </div>
              </div>
              {method.isDefault && (
                <span
                  className={cn(
                    mode.font,
                    'border-primary/50 text-primary border px-2 py-0.5 text-xs'
                  )}
                >
                  DEFAULT
                </span>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className={cn(mode.radius, mode.font, 'mt-4 w-full text-xs')}
        >
          <Plus className="mr-2 size-3" />
          &gt; ADD PAYMENT METHOD
        </Button>
      </CardContent>
    </Card>
  );
}
