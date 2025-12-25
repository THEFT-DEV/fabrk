'use client';

/**
 * Transaction Table Component
 * Displays credit transaction history
 */

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowDown, ArrowUp, RefreshCw, Gift, Undo2 } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string | null;
  endpoint: string | null;
  createdAt: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  className?: string;
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'USAGE':
      return <ArrowDown className={cn('h-3 w-3', mode.color.text.danger)} />;
    case 'SUBSCRIPTION_REFILL':
      return <RefreshCw className={cn('h-3 w-3', mode.color.text.success)} />;
    case 'PURCHASE':
      return <ArrowUp className={cn('h-3 w-3', mode.color.text.success)} />;
    case 'BONUS':
      return <Gift className={cn('h-3 w-3', mode.color.text.accent)} />;
    case 'REFUND':
      return <Undo2 className={cn('h-3 w-3', mode.color.text.warning)} />;
    default:
      return null;
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TransactionTable({ transactions, className }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className={cn('py-8 text-center text-sm', mode.color.text.muted, mode.font, className)}>
        No transactions yet
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', mode.font, className)}>
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className={cn(
            'flex items-center justify-between border-b py-2 last:border-0',
            mode.color.border.default,
            mode.font
          )}
        >
          <div className="flex items-center gap-4">
            {getTypeIcon(tx.type)}
            <div>
              <div className="text-xs font-medium">
                {tx.description || tx.type.replace('_', ' ')}
              </div>
              {tx.endpoint && (
                <div className={cn('text-xs', mode.color.text.muted)}>{tx.endpoint}</div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div
              className={cn(
                'text-xs font-semibold',
                tx.amount < 0 ? mode.color.text.danger : mode.color.text.success
              )}
            >
              {tx.amount > 0 ? '+' : ''}
              {tx.amount}
            </div>
            <div className={cn('text-xs', mode.color.text.muted)}>{formatDate(tx.createdAt)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
