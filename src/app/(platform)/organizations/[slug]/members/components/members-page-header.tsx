/**
 * Members Page Header Component
 * Displays page title and invite button
 */

'use client';

import { Users } from 'lucide-react';
import { InviteMemberDialog } from './invite-member-dialog';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface MembersPageHeaderProps {
  organizationId: string;
  organizationName: string;
  isOwnerOrAdmin: boolean;
}

export function MembersPageHeader({
  organizationId,
  organizationName,
  isOwnerOrAdmin,
}: MembersPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={cn('border-border bg-primary border p-2', mode.radius)}>
          <Users className="text-primary-foreground h-6 w-6" />
        </div>
        <div>
          <h1 className="text-4xl font-semibold">Team Members</h1>
          <p className="text-muted-foreground">Manage members and roles for {organizationName}</p>
        </div>
      </div>

      {isOwnerOrAdmin && (
        <InviteMemberDialog organizationId={organizationId} organizationName={organizationName} />
      )}
    </div>
  );
}
