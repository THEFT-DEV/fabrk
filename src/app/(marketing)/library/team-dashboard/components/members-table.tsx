/**
 * ✅ FABRK COMPONENT
 * Members Table - Team members list with actions
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Users, Crown, Shield, Eye, MoreHorizontal, Trash2, type LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedAt: string;
  lastActive: string;
}

interface MembersTableProps {
  members: Member[];
}

const roleIcons: Record<string, LucideIcon> = {
  owner: Crown,
  admin: Shield,
  member: Users,
  guest: Eye,
};

export function MembersTable({ members }: MembersTableProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const handleRoleChange = (memberId: string, newRole: string) => {
    toast.success(`Changed member role to ${newRole}`);
  };

  const handleRemoveMember = () => {
    if (memberToRemove) {
      toast.success(`Member removed successfully`);
      setRemoveDialogOpen(false);
      setMemberToRemove(null);
    }
  };

  return (
    <Card size="auto">
      <CardHeader code="0x05" title="TEAM MEMBERS" icon={<Users className="h-4 w-4" />} />
      <CardContent>
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [TEAM MEMBERS]: COUNT={members.length}
        </div>
        <div className="border-border overflow-x-auto border">
          <table className="w-full">
            <thead>
              <tr
                className={cn(mode.font, 'border-border bg-muted/30 rounded-none border-b text-xs')}
              >
                <th className="text-muted-foreground rounded-none px-4 py-2 text-left">[MEMBER]</th>
                <th className="text-muted-foreground rounded-none px-4 py-2 text-left">[ROLE]</th>
                <th className="text-muted-foreground rounded-none px-4 py-2 text-left">
                  [LAST ACTIVE]
                </th>
                <th className="text-muted-foreground rounded-none px-4 py-2 text-left">
                  [ACTIONS]
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {members.map((member) => {
                const RoleIcon = roleIcons[member.role];
                return (
                  <tr key={member.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            mode.font,
                            'border-border bg-muted flex h-8 w-8 items-center justify-center border text-xs'
                          )}
                        >
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className={cn(mode.font, 'text-xs font-semibold')}>{member.name}</p>
                          <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          mode.font,
                          'border-border inline-flex items-center gap-1 border px-2 py-0.5 text-xs'
                        )}
                      >
                        <RoleIcon className="h-3 w-3" />
                        {member.role.toUpperCase()}
                      </span>
                    </td>
                    <td className={cn(mode.font, 'text-muted-foreground px-4 py-4 text-xs')}>
                      {member.lastActive}
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(mode.radius, mode.font, 'text-xs')}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className={cn(mode.radius, mode.font, 'border-border border text-xs')}
                        >
                          <DropdownMenuLabel>[ACTIONS]:</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {member.role !== 'owner' && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(member.id, 'admin')}
                              >
                                &gt; SET ROLE: ADMIN
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(member.id, 'member')}
                              >
                                &gt; SET ROLE: MEMBER
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(member.id, 'guest')}
                              >
                                &gt; SET ROLE: GUEST
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialog
                                open={removeDialogOpen}
                                onOpenChange={setRemoveDialogOpen}
                              >
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault();
                                      setMemberToRemove(member.id);
                                      setRemoveDialogOpen(true);
                                    }}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    &gt; REMOVE MEMBER
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogTitle className={cn(mode.font)}>
                                    [CONFIRM REMOVAL]
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className={cn(mode.font, 'text-xs')}>
                                    WARNING: This action will remove the member from the team. They
                                    will lose all access.
                                  </AlertDialogDescription>
                                  <div className="flex justify-end gap-4">
                                    <AlertDialogCancel className={cn(mode.font, 'text-xs')}>
                                      &gt; CANCEL
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={handleRemoveMember}
                                      className={cn(
                                        mode.font,
                                        'bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs'
                                      )}
                                    >
                                      &gt; CONFIRM REMOVE
                                    </AlertDialogAction>
                                  </div>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                          {member.role === 'owner' && (
                            <DropdownMenuItem disabled>[LOCKED]: OWNER ROLE</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
