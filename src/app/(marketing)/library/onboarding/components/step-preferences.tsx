/**
 * FABRK COMPONENT
 * Step Preferences - Notification preferences
 */

import { Checkbox } from '@/components/ui/checkbox';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface StepPreferencesProps {
  emailUpdates: boolean;
  productTips: boolean;
  onEmailUpdatesChange: (checked: boolean) => void;
  onProductTipsChange: (checked: boolean) => void;
}

export function StepPreferences({
  emailUpdates,
  productTips,
  onEmailUpdatesChange,
  onProductTipsChange,
}: StepPreferencesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={cn(mode.font, 'mb-1 text-xl font-semibold')}>Preferences</h2>
        <p className={cn(mode.font, 'text-muted-foreground text-xs')}>Customize your experience</p>
      </div>

      <div className="space-y-4">
        <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
          [NOTIFICATION SETTINGS]:
        </div>

        <div className="space-y-4">
          <div className="border-border flex items-center justify-between border p-4">
            <div>
              <div className={cn(mode.font, 'text-sm')}>Email Updates</div>
              <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                Product news and announcements
              </div>
            </div>
            <Checkbox
              checked={emailUpdates}
              onCheckedChange={(checked) => onEmailUpdatesChange(checked as boolean)}
            />
          </div>

          <div className="border-border flex items-center justify-between border p-4">
            <div>
              <div className={cn(mode.font, 'text-sm')}>Product Tips</div>
              <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                Helpful tips to get the most out of Fabrk
              </div>
            </div>
            <Checkbox
              checked={productTips}
              onCheckedChange={(checked) => onProductTipsChange(checked as boolean)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
