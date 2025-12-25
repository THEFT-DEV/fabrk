/**
 * ✅ FABRK COMPONENT
 * Invite Section - Invite new team members
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function InviteSection() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
    setInviteEmail('');
  };

  return (
    <Card size="auto">
      <CardHeader code="0x00" title="INVITE MEMBER" />
      <CardContent>
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [INVITE TEAM MEMBER]:
        </div>
        <div className="flex gap-4">
          <Input
            type="email"
            placeholder="email@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className={cn(mode.radius, mode.font, 'flex-1 text-xs')}
          />
          <Select value={inviteRole} onValueChange={setInviteRole}>
            <SelectTrigger className={cn(mode.radius, mode.font, 'w-32 text-xs')}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={cn(mode.radius)}>
              <SelectItem
                value="admin"
                className={cn(
                  mode.radius,
                  mode.font,
                  'focus:bg-primary focus:text-primary-foreground text-xs'
                )}
              >
                ADMIN
              </SelectItem>
              <SelectItem
                value="member"
                className={cn(
                  mode.radius,
                  mode.font,
                  'focus:bg-primary focus:text-primary-foreground text-xs'
                )}
              >
                MEMBER
              </SelectItem>
              <SelectItem
                value="guest"
                className={cn(
                  mode.radius,
                  mode.font,
                  'focus:bg-primary focus:text-primary-foreground text-xs'
                )}
              >
                GUEST
              </SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleInvite} className={cn(mode.radius, mode.font, 'text-xs')}>
            <Send className="mr-2 h-4 w-4" />
            &gt; SEND INVITE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
