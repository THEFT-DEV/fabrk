/**
 * Email stats cards component
 */

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function EmailStats() {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>
          [TOTAL TEMPLATES]:
        </div>
        <div className="text-4xl font-semibold">5</div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[CATEGORIES]:</div>
        <div className="text-4xl font-semibold">3</div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[EMAIL PROVIDER]:</div>
        <div className="text-4xl font-semibold">Resend</div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>[COMPATIBILITY]:</div>
        <div className="text-4xl font-semibold">100%</div>
      </div>
    </div>
  );
}
