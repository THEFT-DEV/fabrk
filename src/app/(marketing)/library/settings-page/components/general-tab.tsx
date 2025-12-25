/**
 * ✅ FABRK COMPONENT
 * General Tab Content
 * Production-ready ✓
 */

import { AppearanceForm } from '@/components/settings/appearance-form';
import { Button } from '@/components/ui/button';
import { Shield, CreditCard, Bell, Download, Palette, Settings } from 'lucide-react';
import { CodeWindow } from './code-window';
import { SectionHeader } from './section-header';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function GeneralTab() {
  return (
    <div className="mt-6 space-y-6">
      {/* Appearance Section */}
      <CodeWindow filename="appearance.config">
        <div className="p-4">
          <SectionHeader
            icon={Palette}
            title="APPEARANCE"
            description="Customize the look and feel of the application"
          />
          <AppearanceForm />
        </div>
      </CodeWindow>

      {/* Quick Actions */}
      <CodeWindow filename="quick_actions.tsx">
        <div className="p-4">
          <SectionHeader
            icon={Settings}
            title="QUICK ACTIONS"
            description="Frequently used settings and shortcuts"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, 'justify-start text-xs')}
            >
              <Shield className="mr-2 h-4 w-4" />
              &gt; SECURITY SETTINGS
            </Button>
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, 'justify-start text-xs')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              &gt; BILLING SETTINGS
            </Button>
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, 'justify-start text-xs')}
            >
              <Bell className="mr-2 h-4 w-4" />
              &gt; NOTIFICATION PREFS
            </Button>
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, 'justify-start text-xs')}
            >
              <Download className="mr-2 h-4 w-4" />
              &gt; EXPORT MY DATA
            </Button>
          </div>
        </div>
      </CodeWindow>
    </div>
  );
}
