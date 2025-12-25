/**
 * ✅ FABRK COMPONENT
 * Dashboard Header - Title and settings button
 */

import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { TemplatePageHeader } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <TemplatePageHeader
        badge="TEAM DASHBOARD"
        title="Team Dashboard"
        description="Manage team members, roles, and permissions"
      />
      <Button className={cn(mode.radius, mode.font, 'text-xs')}>
        <Settings className="mr-2 h-4 w-4" />
        &gt; ORG SETTINGS
      </Button>
    </div>
  );
}
