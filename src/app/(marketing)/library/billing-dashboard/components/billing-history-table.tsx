/**
 * ✅ FABRK COMPONENT
 * Billing History Table - Complete payment history with download
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: string;
  description: string;
}

interface BillingHistoryTableProps {
  payments: Payment[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusText: (status: string) => { text: string; color: string };
}

export function BillingHistoryTable({
  payments,
  formatDate,
  formatCurrency,
  getStatusText,
}: BillingHistoryTableProps) {
  return (
    <>
      <Card tone="neutral">
        <CardHeader code="0x00" title="BILLING HISTORY" />

        <CardContent padding="md">
          <div className="mb-4 flex items-center justify-between">
            <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [BILLING HISTORY]: COUNT={payments.length}
            </div>
            <Button
              variant="outline"
              size="sm"
              className={cn(mode.radius, mode.font, 'h-7 text-xs')}
            >
              <Download className="mr-2 size-3" />
              &gt; EXPORT ALL
            </Button>
          </div>

          {/* Terminal Table */}
          <div className="border-border border">
            <div
              className={cn(
                mode.font,
                'border-border bg-muted/30 grid grid-cols-5 border-b px-4 py-2 text-xs'
              )}
            >
              <span className="text-muted-foreground">[DATE]</span>
              <span className="text-muted-foreground col-span-2">[DESCRIPTION]</span>
              <span className="text-muted-foreground">[AMOUNT]</span>
              <span className="text-muted-foreground">[STATUS]</span>
            </div>
            <div className="divide-border divide-y">
              {payments.map((payment) => {
                const status = getStatusText(payment.status);
                return (
                  <div
                    key={payment.id}
                    className={cn(
                      mode.font,
                      'hover:bg-muted/30 grid grid-cols-5 items-center px-4 py-4 text-xs'
                    )}
                  >
                    <span>{formatDate(payment.date)}</span>
                    <span className="text-muted-foreground col-span-2">{payment.description}</span>
                    <span>{formatCurrency(payment.amount)}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`border px-2 py-0.5 ${status.color} ${
                          payment.status === 'succeeded'
                            ? 'border-success/50'
                            : payment.status === 'failed'
                              ? 'border-destructive/50'
                              : 'border-warning/50'
                        }`}
                      >
                        {status.text}
                      </span>
                      <button className="hover:text-foreground text-muted-foreground">
                        <Download className="size-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Note */}
      <Card tone="neutral">
        <CardContent padding="md">
          <div className={cn(mode.font, 'text-xs')}>
            <span className="text-muted-foreground">[INFO]:</span> All invoices are automatically
            emailed to your registered email address. Contact support if you need assistance.
          </div>
        </CardContent>
      </Card>
    </>
  );
}
