/**
 * ✅ FABRK COMPONENT
 * Account Tab Content
 * Production-ready ✓
 */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Shield } from 'lucide-react';
import { CodeWindow } from './code-window';
import { SectionHeader } from './section-header';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function AccountTab() {
  return (
    <div className="mt-6 space-y-6">
      {/* Profile Information */}
      <CodeWindow filename="profile.json">
        <div className="p-4">
          <SectionHeader
            icon={User}
            title="PROFILE INFORMATION"
            description="Update your personal details and profile settings"
          />
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullname" className={cn(mode.radius, mode.font, 'text-xs')}>
                  [FULL NAME]:
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  className={cn(mode.radius, mode.font, 'text-xs')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className={cn(mode.radius, mode.font, 'text-xs')}>
                  [EMAIL]:
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={cn(mode.radius, mode.font, 'text-xs')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className={cn(mode.radius, mode.font, 'text-xs')}>
                  [COMPANY]:
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your company name"
                  className={cn(mode.radius, mode.font, 'text-xs')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobtitle" className={cn(mode.radius, mode.font, 'text-xs')}>
                  [JOB TITLE]:
                </Label>
                <Input
                  id="jobtitle"
                  type="text"
                  placeholder="Software Engineer"
                  className={cn(mode.radius, mode.font, 'text-xs')}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className={cn(mode.radius, mode.font, 'text-xs')}>
                [BIO]:
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                rows={4}
                className={cn(mode.radius, mode.font, 'text-xs')}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                &gt; CANCEL
              </Button>
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>&gt; SAVE CHANGES</Button>
            </div>
          </div>
        </div>
      </CodeWindow>

      {/* Account Security */}
      <CodeWindow filename="security.config">
        <div className="p-4">
          <SectionHeader
            icon={Shield}
            title="ACCOUNT SECURITY"
            description="Manage password and authentication methods"
          />
          <div className="space-y-4">
            <div
              className={cn(
                mode.font,
                'border-border flex items-center justify-between border p-4 text-xs'
              )}
            >
              <div>
                <div>[PASSWORD]:</div>
                <div className="text-muted-foreground">Last changed 3 months ago</div>
              </div>
              <Button variant="outline" className={cn(mode.radius, mode.font, 'w-24 text-xs')}>
                &gt; CHANGE
              </Button>
            </div>
            <div
              className={cn(
                mode.font,
                'border-border flex items-center justify-between border p-4 text-xs'
              )}
            >
              <div>
                <div>[TWO FACTOR AUTH]:</div>
                <div className="text-muted-foreground">Add an extra layer of security</div>
              </div>
              <Button variant="outline" className={cn(mode.radius, mode.font, 'w-24 text-xs')}>
                &gt; ENABLE
              </Button>
            </div>
            <div
              className={cn(
                mode.font,
                'border-border flex items-center justify-between border p-4 text-xs'
              )}
            >
              <div>
                <div>[ACTIVE SESSIONS]:</div>
                <div className="text-muted-foreground">Manage devices and sessions</div>
              </div>
              <Button variant="outline" className={cn(mode.radius, mode.font, 'w-24 text-xs')}>
                &gt; VIEW
              </Button>
            </div>
          </div>
        </div>
      </CodeWindow>
    </div>
  );
}
