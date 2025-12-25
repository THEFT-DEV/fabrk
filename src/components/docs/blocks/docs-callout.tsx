/**
 * DocsCallout - Warning, info, tip callout boxes
 */

import { AlertTriangle, Info, Lightbulb, AlertCircle } from 'lucide-react';
import { docsTypography } from '../typography';
import { cn } from '@/lib/utils';

type CalloutVariant = 'info' | 'warning' | 'tip' | 'danger';

interface DocsCalloutProps {
  /** Type of callout */
  variant?: CalloutVariant;
  /** Callout title (optional) */
  title?: string;
  /** Callout content */
  children: React.ReactNode;
  /** Optional className */
  className?: string;
}

const variantConfig: Record<
  CalloutVariant,
  {
    icon: typeof Info;
    borderColor: string;
    bgColor: string;
    iconColor: string;
    label: string;
    hexCode: string;
  }
> = {
  info: {
    icon: Info,
    borderColor: 'border-primary/50',
    bgColor: 'bg-primary/5',
    iconColor: 'text-primary',
    label: 'INFO',
    hexCode: '00',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-warning/50',
    bgColor: 'bg-warning/5',
    iconColor: 'text-warning',
    label: 'WARNING',
    hexCode: '01',
  },
  tip: {
    icon: Lightbulb,
    borderColor: 'border-success/50',
    bgColor: 'bg-success/5',
    iconColor: 'text-success',
    label: 'TIP',
    hexCode: '02',
  },
  danger: {
    icon: AlertCircle,
    borderColor: 'border-destructive/50',
    bgColor: 'bg-destructive/5',
    iconColor: 'text-destructive',
    label: 'DANGER',
    hexCode: '03',
  },
};

export function DocsCallout({ variant = 'info', title, children, className }: DocsCalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn('border-border bg-card border', className)}>
      {/* Terminal Header */}
      <div className={cn('border-border border-b px-4 py-2', config.bgColor)}>
        <span className={cn('font-mono text-xs', config.iconColor)}>
          [ [0x{config.hexCode}] {config.label} ]
        </span>
      </div>
      <div className={cn('p-4', config.bgColor)}>
        <div className="flex items-start gap-4">
          <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', config.iconColor)} aria-hidden="true" />
          <div className="space-y-1">
            {title && <p className={`font-semibold uppercase ${docsTypography.h4}`}>{title}</p>}
            <div className={docsTypography.body}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
