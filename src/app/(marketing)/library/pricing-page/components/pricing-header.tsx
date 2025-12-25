/**
 * FABRK COMPONENT
 * Pricing Header - Title, description, and billing toggle
 */

import { Badge } from '@/components/ui/badge';
import { TemplatePageHeader } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface PricingHeaderProps {
  isYearly: boolean;
  onToggleBilling: (isYearly: boolean) => void;
}

export function PricingHeader({ isYearly, onToggleBilling }: PricingHeaderProps) {
  return (
    <div className="space-y-4">
      <TemplatePageHeader
        badge="PRICING PAGE"
        title="Simple, Transparent Pricing"
        description="Choose the plan that fits your needs. All plans include a 14-day free trial."
      />

      {/* Billing Toggle - Terminal Style */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className={cn(mode.font, 'border-border inline-flex border text-xs')}>
          <button
            onClick={() => onToggleBilling(false)}
            className={`px-4 py-2 transition-colors ${
              !isYearly
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            [MONTHLY]
          </button>
          <button
            onClick={() => onToggleBilling(true)}
            className={`border-border border-l px-4 py-2 transition-colors ${
              isYearly
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            [YEARLY]
          </button>
        </div>
        {isYearly && (
          <Badge variant="secondary" className={cn(mode.radius, mode.font, 'text-xs')}>
            SAVE 17%
          </Badge>
        )}
      </div>
    </div>
  );
}
