/**
 * ✅ FABRK COMPONENT
 * Role Permissions - Display role permissions reference
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Users, Crown, Shield, Eye, type LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const roleIcons: Record<string, LucideIcon> = {
  owner: Crown,
  admin: Shield,
  member: Users,
  guest: Eye,
};

const rolePermissions = [
  {
    role: 'owner',
    permissions: ['Full access', 'Billing & plan', 'Delete organization'],
  },
  {
    role: 'admin',
    permissions: ['Manage members', 'Change settings', 'View analytics'],
  },
  {
    role: 'member',
    permissions: ['Create projects', 'Edit content', 'View reports'],
  },
  {
    role: 'guest',
    permissions: ['View only', 'Comment', 'Limited access'],
  },
];

export function RolePermissions() {
  return (
    <Card size="auto">
      <CardHeader code="0x04" title="PERMISSIONS" icon={<Shield className="h-4 w-4" />} />
      <CardContent>
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [ROLE PERMISSIONS]:
        </div>
        <div className={cn(mode.font, 'space-y-4 text-xs')}>
          {rolePermissions.map((item) => {
            const RoleIcon = roleIcons[item.role];
            return (
              <div key={item.role}>
                <div className="mb-1 flex items-center gap-2">
                  <RoleIcon className="text-primary h-3 w-3" />
                  <span className="font-semibold">{item.role.toUpperCase()}</span>
                </div>
                <div className="text-muted-foreground ml-4 space-y-0.5">
                  {item.permissions.map((perm, idx) => (
                    <div key={idx}>&gt; {perm}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
