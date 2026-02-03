/**
 * Invite Member Dialog Component
 * Modal for sending team member invitations
 */

'use client';

import * as React from 'react';
import { Mail, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { mode, formatLabel } from '@/design-system';
import { cn } from '@/lib/utils';

interface InviteMemberDialogProps {
  organizationId: string;
  organizationName: string;
}

export function InviteMemberDialog({ organizationId, organizationName }: InviteMemberDialogProps) {
  const [inviting, setInviting] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState<'ADMIN' | 'MEMBER' | 'GUEST'>('MEMBER');

  const handleInvite = async () => {
    if (!inviteEmail) return;

    setInviting(true);
    try {
      const response = await fetch('/api/organizations/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          email: inviteEmail,
          role: inviteRole,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send invitation');
      }

      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      setInviteRole('MEMBER');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send invitation';
      toast.error(errorMessage);
    } finally {
      setInviting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('border-border border', mode.radius)}>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>Send an invitation to join {organizationName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">{formatLabel('Email Address')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className={cn('border-border border', mode.radius)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">{formatLabel('Role')}</Label>
            <Select
              value={inviteRole}
              onValueChange={(val) => setInviteRole(val as 'ADMIN' | 'MEMBER' | 'GUEST')}
            >
              <SelectTrigger id="role" className={cn('border-border border', mode.radius)}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={cn('border-border border', mode.radius)}>
                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="GUEST">Guest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleInvite} disabled={!inviteEmail || inviting}>
            {inviting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Mail className="mr-2 h-4 w-4" />
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
