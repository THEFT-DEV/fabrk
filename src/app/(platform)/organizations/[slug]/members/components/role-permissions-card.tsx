/**
 * Role Permissions Card Component
 * Displays information about different role permissions
 */

'use client';

import { Crown, Shield, UserCheck, UserX, Info } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function RolePermissionsCard() {
  return (
    <Card>
      <CardHeader code="0x02" title="ROLE PERMISSIONS" icon={<Info className="h-4 w-4" />} />
      <CardContent padding="lg">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cn('border-border bg-card border p-4', mode.radius)}>
            <div className="mb-2 flex items-center gap-2">
              <Crown className="text-primary h-5 w-5" />
              <Badge variant="default">OWNER</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Full control over organization, including deletion and ownership transfer.
            </p>
          </div>
          <div className={cn('border-border bg-card border p-4', mode.radius)}>
            <div className="mb-2 flex items-center gap-2">
              <Shield className="text-primary h-5 w-5" />
              <Badge variant="secondary">ADMIN</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Can manage members, settings, and billing. Cannot delete organization.
            </p>
          </div>
          <div className={cn('border-border bg-card border p-4', mode.radius)}>
            <div className="mb-2 flex items-center gap-2">
              <UserCheck className="text-primary h-5 w-5" />
              <Badge variant="outline">MEMBER</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Standard access to organization resources and features.
            </p>
          </div>
          <div className={cn('border-border bg-card border p-4', mode.radius)}>
            <div className="mb-2 flex items-center gap-2">
              <UserX className="text-primary h-5 w-5" />
              <Badge variant="outline">GUEST</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Limited read-only access to specific resources.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
