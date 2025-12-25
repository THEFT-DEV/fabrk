/**
 * Implementation note card showing template features
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function FeaturesNote() {
  return (
    <Card>
      <CardHeader code="0x00" title="FEATURES" />
      <CardContent>
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [TEMPLATE FEATURES]:
        </div>
        <div className={cn(mode.font, 'space-y-2 text-xs')}>
          <div>
            <span className="text-success">&gt;</span> TanStack Table v8 with sorting, filtering,
            pagination
          </div>
          <div>
            <span className="text-success">&gt;</span> Bulk actions (select multiple users)
          </div>
          <div>
            <span className="text-success">&gt;</span> Column visibility toggle
          </div>
          <div>
            <span className="text-success">&gt;</span> Search by name/email
          </div>
          <div>
            <span className="text-success">&gt;</span> Export to CSV functionality
          </div>
          <div>
            <span className="text-success">&gt;</span> Role badges (Admin, User, Guest)
          </div>
          <div>
            <span className="text-success">&gt;</span> Status indicators (Active, Inactive,
            Suspended)
          </div>
          <div>
            <span className="text-success">&gt;</span> Row actions menu (Edit, Suspend, Delete)
          </div>
          <div>
            <span className="text-success">&gt;</span> Stats cards (Total, Active, Admins,
            Enterprise)
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal console aesthetic
          </div>
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mt-4 text-xs')}>
          [NOTE]: Replace mockUsers with your API data. Add API routes for edit/delete/suspend
          actions.
        </div>
      </CardContent>
    </Card>
  );
}
