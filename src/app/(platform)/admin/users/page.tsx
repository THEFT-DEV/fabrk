/**
 * Admin Users Management
 * View and manage all users with full admin controls
 */

import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UserManagementTable } from '@/components/admin/user-management-table';
import { Users } from 'lucide-react';

async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
    include: {
      _count: {
        select: {
          sessions: true,
        },
      },
    },
  });

  return users;
}

async function UsersTableWrapper() {
  const users = await getUsers();
  return <UserManagementTable initialUsers={users} />;
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage and monitor all user accounts</p>
        </div>
      </div>

      <Card>
        <CardHeader
          code="0x00"
          title="ALL USERS"
          icon={<Users className="h-4 w-4" />}
          meta="View and manage all registered users with full admin controls (showing last 100)"
        />
        <CardContent>
          <Suspense
            fallback={
              <div className="flex h-48 items-center justify-center">
                <div className="text-muted-foreground">Loading users...</div>
              </div>
            }
          >
            <UsersTableWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
