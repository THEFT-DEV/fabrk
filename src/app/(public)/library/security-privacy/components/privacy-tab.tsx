/**
 * Privacy Tab Component - Profile privacy and cookie preferences
 */

import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { User, Cookie } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface PrivacySettings {
  profileVisibility: boolean;
  activityTracking: boolean;
  searchIndexing: boolean;
  cookiesEssential: boolean;
  cookiesAnalytics: boolean;
  cookiesMarketing: boolean;
}

interface PrivacyTabProps {
  privacy: PrivacySettings;
  onToggle: (key: keyof PrivacySettings) => void;
}

export function PrivacyTab({ privacy, onToggle }: PrivacyTabProps) {
  return (
    <div className="space-y-6">
      {/* Profile Privacy */}
      <Card tone="neutral">
        <CardHeader code="0x02" title="PROFILE PRIVACY" icon={<User className="h-4 w-4" />} />
        <CardContent padding="md">
          <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
            [PROFILE ACTIVITY]:
          </div>
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            {[
              {
                key: 'profileVisibility' as const,
                label: 'PROFILE VISIBILITY',
                desc: 'Allow your profile to be visible to other users',
              },
              {
                key: 'activityTracking' as const,
                label: 'ACTIVITY TRACKING',
                desc: 'Track my activity to improve experience',
              },
              {
                key: 'searchIndexing' as const,
                label: 'SEARCH INDEXING',
                desc: 'Allow search engines to index your profile',
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className={cn('border-border flex items-center justify-between border p-4', mode.radius)}
              >
                <div>
                  <div>[{setting.label}]:</div>
                  <div className="text-muted-foreground">{setting.desc}</div>
                </div>
                <Switch
                  checked={privacy[setting.key]}
                  onCheckedChange={() => onToggle(setting.key)}
                  className={cn(
                    mode.radius,
                    'h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:rounded-none [&>span]:data-[state=checked]:translate-x-4'
                  )}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cookie Preferences */}
      <Card tone="neutral">
        <CardHeader code="0x03" title="COOKIES" icon={<Cookie className="h-4 w-4" />} />
        <CardContent padding="md">
          <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
            [COOKIE PREFERENCES]:
          </div>
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            {[
              {
                key: 'cookiesEssential' as const,
                label: 'ESSENTIAL',
                desc: 'Required for the site to function (cannot be disabled)',
                disabled: true,
              },
              {
                key: 'cookiesAnalytics' as const,
                label: 'ANALYTICS',
                desc: 'Help us understand how you use the site',
                disabled: false,
              },
              {
                key: 'cookiesMarketing' as const,
                label: 'MARKETING',
                desc: 'Used to show relevant ads',
                disabled: false,
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className={cn('border-border flex items-center justify-between border p-4', mode.radius)}
              >
                <div>
                  <div>[{setting.label}]:</div>
                  <div className="text-muted-foreground">{setting.desc}</div>
                </div>
                <Switch
                  checked={privacy[setting.key]}
                  onCheckedChange={() => onToggle(setting.key)}
                  disabled={setting.disabled}
                  className={cn(
                    mode.radius,
                    'h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:rounded-none [&>span]:data-[state=checked]:translate-x-4'
                  )}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
