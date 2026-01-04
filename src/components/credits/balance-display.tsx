'use client';

/**
 * Credit Balance Display Component
 * Shows current credit balance with tier info
 */

import { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface BalanceData {
  balance: number;
  monthlyAllowance: number;
  tier: string;
}

interface BalanceDisplayProps {
  className?: string;
  compact?: boolean;
}

export function BalanceDisplay({ className, compact = false }: BalanceDisplayProps) {
  const [data, setData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch('/api/credits/balance');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
  }, []);

  if (loading) {
    return (
      <div className={cn('flex items-center gap-2', mode.font, className)}>
        <Coins className="h-4 w-4" />
        <span className={cn('text-xs', mode.color.text.muted)}>...</span>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const percentage = Math.round((data.balance / data.monthlyAllowance) * 100);

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', mode.font, className)}>
        <Coins className="h-4 w-4" />
        <span className="text-xs font-semibold">{data.balance}</span>
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', mode.font, className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          <span className="text-xs">[CREDITS]:</span>
        </div>
        <span className="text-xs font-semibold">
          {data.balance} / {data.monthlyAllowance}
        </span>
      </div>
      <div className={cn('h-1.5 w-full', mode.color.bg.muted, mode.radius)}>
        <div
          className={cn(
            'h-full transition-all',
            mode.radius,
            percentage > 50
              ? mode.color.bg.accent
              : percentage > 20
                ? mode.color.bg.warning
                : mode.color.bg.danger
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className={cn('text-xs uppercase', mode.color.text.muted)}>{data.tier} tier</div>
    </div>
  );
}
