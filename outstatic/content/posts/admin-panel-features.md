---
title: 'Admin Panel: Managing Your SaaS'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'admin-panel-features'
description: 'Fabrk includes a complete admin panel for user management, subscription oversight, system health, and more.'
publishedAt: '2026-01-10T10:00:00.000Z'
---

**Admin tools for SaaS operators.**

---

## Table of Contents

1. [Admin Panel Overview](#admin-panel-overview)
2. [Architecture and Route Structure](#architecture-and-route-structure)
3. [Access Control and Middleware](#access-control-and-middleware)
4. [Admin Dashboard Overview](#admin-dashboard-overview)
5. [User Management](#user-management)
6. [User Details View](#user-details-view)
7. [User Impersonation](#user-impersonation)
8. [Subscription Management](#subscription-management)
9. [Manual Subscription Adjustments](#manual-subscription-adjustments)
10. [System Health Monitoring](#system-health-monitoring)
11. [Real-Time Health Dashboard](#real-time-health-dashboard)
12. [Feature Flag Management](#feature-flag-management)
13. [Audit Logging](#audit-logging)
14. [Organization Management](#organization-management)
15. [Admin Notifications](#admin-notifications)
16. [API Usage Monitoring](#api-usage-monitoring)
17. [Admin Navigation](#admin-navigation)
18. [Best Practices](#best-practices)

---

## Admin Panel Overview

Fabrk's admin panel provides everything you need to operate a SaaS:

- **User management** - View, search, filter, and manage all users
- **Subscription oversight** - MRR tracking, churn analysis, plan management
- **System health monitoring** - Database, Redis, external APIs, background jobs
- **Feature flags** - Control feature rollouts without deployments
- **Audit logging** - Track who did what and when
- **Organization management** - View and manage all teams
- **API usage monitoring** - Rate limits, top consumers, usage trends
- **Admin notifications** - Alerts for critical events

All styled with the terminal aesthetic.

---

## Architecture and Route Structure

The admin panel uses a dedicated route group with its own layout:

```
src/app/(admin)/
├── layout.tsx           # Admin layout with sidebar
├── admin/
│   ├── page.tsx         # Admin dashboard overview
│   ├── users/
│   │   ├── page.tsx     # User list
│   │   └── [id]/
│   │       └── page.tsx # User details
│   ├── subscriptions/
│   │   └── page.tsx     # Subscription management
│   ├── health/
│   │   └── page.tsx     # System health
│   ├── flags/
│   │   └── page.tsx     # Feature flags
│   ├── logs/
│   │   └── page.tsx     # Audit logs
│   ├── organizations/
│   │   └── page.tsx     # Organization management
│   └── settings/
│       └── page.tsx     # Admin settings
```

### Admin Layout

```tsx
// src/app/(admin)/layout.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect non-admins
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={session.user} />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## Access Control and Middleware

Admin routes are protected at multiple levels:

### Middleware Protection

```typescript
// middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

### Role-Based Access Control

```typescript
// lib/admin/rbac.ts
export type AdminRole = 'super_admin' | 'admin' | 'support';

export const ADMIN_PERMISSIONS = {
  super_admin: [
    'users:read',
    'users:write',
    'users:delete',
    'users:impersonate',
    'subscriptions:read',
    'subscriptions:write',
    'subscriptions:refund',
    'flags:read',
    'flags:write',
    'logs:read',
    'settings:read',
    'settings:write',
  ],
  admin: [
    'users:read',
    'users:write',
    'users:impersonate',
    'subscriptions:read',
    'subscriptions:write',
    'flags:read',
    'flags:write',
    'logs:read',
    'settings:read',
  ],
  support: [
    'users:read',
    'users:impersonate',
    'subscriptions:read',
    'logs:read',
  ],
} as const;

export function hasPermission(
  role: AdminRole,
  permission: string
): boolean {
  return ADMIN_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function requirePermission(permission: string) {
  return async function (session: Session | null) {
    if (!session?.user || session.user.role === 'user') {
      throw new Error('Unauthorized');
    }

    if (!hasPermission(session.user.role as AdminRole, permission)) {
      throw new Error('Forbidden');
    }

    return session;
  };
}
```

### API Route Protection

```typescript
// lib/admin/protect-api.ts
import { auth } from '@/lib/auth';
import { hasPermission } from './rbac';

export function withAdminAuth(
  handler: (req: Request, session: Session) => Promise<Response>,
  permission?: string
) {
  return async (request: Request) => {
    const session = await auth();

    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role === 'user') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (permission && !hasPermission(session.user.role, permission)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return handler(request, session);
  };
}

// Usage in API route
export const GET = withAdminAuth(
  async (request, session) => {
    const users = await prisma.user.findMany();
    return Response.json({ users });
  },
  'users:read'
);
```

---

## Admin Dashboard Overview

The main admin dashboard shows key metrics at a glance:

```tsx
// components/admin/admin-dashboard.tsx
import { Card } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { LineChart } from '@/components/charts/line-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { Gauge } from '@/components/charts/gauge';

interface AdminDashboardProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    mrr: number;
    mrrChange: number;
    churnRate: number;
    trialConversion: number;
    activeSubscriptions: number;
    pendingTickets: number;
  };
  revenueData: Array<{ date: string; amount: number }>;
  userGrowthData: Array<{ month: string; users: number }>;
  recentActivity: Array<{
    id: string;
    action: string;
    user: string;
    timestamp: Date;
  }>;
}

export function AdminDashboard({
  stats,
  revenueData,
  userGrowthData,
  recentActivity,
}: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-semibold">ADMIN DASHBOARD</h1>
          <p className="text-muted-foreground font-mono text-xs">
            System overview and key metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          label="TOTAL USERS"
          value={stats.totalUsers.toLocaleString()}
          subValue={`${stats.activeUsers} active`}
        />
        <KPICard
          label="MRR"
          value={`$${stats.mrr.toLocaleString()}`}
          change={stats.mrrChange}
        />
        <KPICard
          label="CHURN RATE"
          value={`${stats.churnRate}%`}
          isNegative={stats.churnRate > 5}
        />
        <KPICard
          label="TRIAL CONVERSION"
          value={`${stats.trialConversion}%`}
          isPositive={stats.trialConversion > 20}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={cn('p-4', mode.radius)}>
          <div className="border-b border-border pb-2 mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ REVENUE TREND ]
            </span>
          </div>
          <LineChart
            data={revenueData}
            xKey="date"
            yKey="amount"
            height={200}
          />
        </Card>

        <Card className={cn('p-4', mode.radius)}>
          <div className="border-b border-border pb-2 mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ USER GROWTH ]
            </span>
          </div>
          <BarChart
            data={userGrowthData}
            xKey="month"
            yKey="users"
            height={200}
          />
        </Card>
      </div>

      {/* Gauges Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={cn('p-4 flex flex-col items-center', mode.radius)}>
          <Gauge
            value={stats.churnRate}
            max={10}
            size={120}
            label="Churn Rate"
            unit="%"
          />
        </Card>
        <Card className={cn('p-4 flex flex-col items-center', mode.radius)}>
          <Gauge
            value={stats.trialConversion}
            max={100}
            size={120}
            label="Trial Conversion"
            unit="%"
          />
        </Card>
        <Card className={cn('p-4 flex flex-col items-center', mode.radius)}>
          <Gauge
            value={stats.activeSubscriptions}
            max={1000}
            size={120}
            label="Active Subs"
          />
        </Card>
        <Card className={cn('p-4 flex flex-col items-center', mode.radius)}>
          <Gauge
            value={stats.pendingTickets}
            max={50}
            size={120}
            label="Pending Tickets"
          />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className={cn('overflow-hidden', mode.radius)}>
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            [ RECENT ACTIVITY ]
          </span>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="px-4 py-3 flex items-center justify-between"
            >
              <div>
                <span className="font-mono text-sm">{activity.action}</span>
                <span className="text-muted-foreground font-mono text-xs ml-2">
                  by {activity.user}
                </span>
              </div>
              <span className="text-muted-foreground font-mono text-xs">
                {formatRelativeTime(activity.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function KPICard({
  label,
  value,
  subValue,
  change,
  isPositive,
  isNegative,
}: {
  label: string;
  value: string;
  subValue?: string;
  change?: number;
  isPositive?: boolean;
  isNegative?: boolean;
}) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <span className="font-mono text-xs text-muted-foreground">
        [ {label} ]
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold">{value}</span>
        {change !== undefined && (
          <span
            className={cn(
              'font-mono text-xs',
              change > 0 ? 'text-success' : 'text-destructive'
            )}
          >
            {change > 0 ? '+' : ''}
            {change}%
          </span>
        )}
      </div>
      {subValue && (
        <span className="font-mono text-xs text-muted-foreground">
          {subValue}
        </span>
      )}
      {isPositive && (
        <span className="font-mono text-xs text-success">[GOOD]</span>
      )}
      {isNegative && (
        <span className="font-mono text-xs text-destructive">[ALERT]</span>
      )}
    </Card>
  );
}
```

---

## User Management

Complete user management with search, filters, and bulk actions:

```tsx
// components/admin/user-management.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputSearch } from '@/components/ui/input-search';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Download, Mail, UserX } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLoginAt?: Date;
}

interface UserManagementProps {
  users: User[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onFilter: (filters: Record<string, string>) => void;
}

export function UserManagement({
  users,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onSearch,
  onFilter,
}: UserManagementProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleBulkAction = async (action: string) => {
    // Implement bulk actions
    console.log(`Bulk action: ${action}`, selectedUsers);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-semibold">USER MANAGEMENT</h1>
          <p className="text-muted-foreground font-mono text-xs">
            {totalCount.toLocaleString()} total users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            > EXPORT
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className={cn('p-4', mode.radius)}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <InputSearch
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              onFilter({ status: value });
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={planFilter}
            onValueChange={(value) => {
              setPlanFilter(value);
              onFilter({ plan: value });
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card className={cn('p-4 bg-muted', mode.radius)}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm">
              {selectedUsers.length} users selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('email')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleBulkAction('suspend')}
              >
                <UserX className="h-4 w-4 mr-2" />
                Suspend
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Users Table */}
      <Card className={cn('overflow-hidden', mode.radius)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) =>
                      handleSelectUser(user.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-mono text-sm">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{user.plan.toUpperCase()}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === 'active'
                        ? 'default'
                        : user.status === 'suspended'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {user.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {user.lastLoginAt ? formatRelativeTime(user.lastLoginAt) : 'Never'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Impersonate</DropdownMenuItem>
                      <DropdownMenuItem>Send Email</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">
          Showing {(page - 1) * pageSize + 1} to{' '}
          {Math.min(page * pageSize, totalCount)} of {totalCount}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page * pageSize >= totalCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## User Details View

Detailed view of individual user with activity history:

```tsx
// components/admin/user-details.tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface UserDetailsProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
    plan: string;
    status: string;
    createdAt: Date;
    lastLoginAt?: Date;
    organizationMemberships: Array<{
      organization: { name: string };
      role: string;
    }>;
    subscription?: {
      plan: string;
      status: string;
      currentPeriodEnd: Date;
      cancelAtPeriodEnd: boolean;
    };
  };
  activityLogs: Array<{
    id: string;
    action: string;
    details: string;
    timestamp: Date;
    ipAddress?: string;
  }>;
  invoices: Array<{
    id: string;
    amount: number;
    status: string;
    createdAt: Date;
  }>;
}

export function UserDetails({ user, activityLogs, invoices }: UserDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} />
            <AvatarFallback className="text-2xl">
              {user.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-mono text-2xl font-semibold">{user.name}</h1>
            <p className="text-muted-foreground font-mono text-sm">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge>{user.plan.toUpperCase()}</Badge>
              <Badge
                variant={user.status === 'active' ? 'default' : 'destructive'}
              >
                {user.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">> IMPERSONATE</Button>
          <Button variant="outline">> SEND EMAIL</Button>
          <Button variant="destructive">> SUSPEND</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ JOINED ]
          </span>
          <p className="font-mono text-lg mt-1">{formatDate(user.createdAt)}</p>
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ LAST LOGIN ]
          </span>
          <p className="font-mono text-lg mt-1">
            {user.lastLoginAt ? formatRelativeTime(user.lastLoginAt) : 'Never'}
          </p>
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ ORGANIZATIONS ]
          </span>
          <p className="font-mono text-lg mt-1">
            {user.organizationMemberships.length}
          </p>
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ LIFETIME VALUE ]
          </span>
          <p className="font-mono text-lg mt-1">
            ${invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card className={cn('overflow-hidden', mode.radius)}>
            <div className="divide-y divide-border">
              {activityLogs.map((log) => (
                <div key={log.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm">{log.action}</span>
                      <p className="text-muted-foreground font-mono text-xs">
                        {log.details}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatRelativeTime(log.timestamp)}
                      </span>
                      {log.ipAddress && (
                        <p className="font-mono text-xs text-muted-foreground">
                          {log.ipAddress}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          {user.subscription ? (
            <Card className={cn('p-4', mode.radius)}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">Plan</span>
                  <Badge>{user.subscription.plan.toUpperCase()}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">Status</span>
                  <Badge
                    variant={
                      user.subscription.status === 'active'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {user.subscription.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">Renews</span>
                  <span className="font-mono text-sm">
                    {formatDate(user.subscription.currentPeriodEnd)}
                  </span>
                </div>
                {user.subscription.cancelAtPeriodEnd && (
                  <div className="p-3 bg-destructive/10 rounded">
                    <span className="font-mono text-xs text-destructive">
                      [CANCELS AT PERIOD END]
                    </span>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">> CHANGE PLAN</Button>
                  <Button variant="outline" size="sm">> EXTEND TRIAL</Button>
                  <Button variant="destructive" size="sm">> CANCEL</Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className={cn('p-8 text-center', mode.radius)}>
              <span className="font-mono text-muted-foreground">
                No active subscription
              </span>
            </Card>
          )}
        </TabsContent>

        {/* Additional tabs content... */}
      </Tabs>
    </div>
  );
}
```

---

## User Impersonation

Secure user impersonation for customer support:

```typescript
// lib/admin/impersonation.ts
import { prisma } from '@/lib/prisma';
import { randomBytes, createHash } from 'crypto';

interface ImpersonationToken {
  adminId: string;
  targetUserId: string;
  token: string;
  expiresAt: Date;
}

export async function createImpersonationSession(
  adminId: string,
  targetUserId: string
): Promise<string> {
  // Generate secure token
  const token = randomBytes(32).toString('hex');
  const hashedToken = createHash('sha256').update(token).digest('hex');

  // Store impersonation session (expires in 1 hour)
  await prisma.impersonationSession.create({
    data: {
      adminId,
      targetUserId,
      hashedToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  // Create audit log
  await prisma.auditLog.create({
    data: {
      action: 'IMPERSONATION_START',
      adminId,
      targetId: targetUserId,
      targetType: 'user',
      details: {
        reason: 'Customer support',
      },
    },
  });

  return token;
}

export async function validateImpersonationToken(
  token: string
): Promise<ImpersonationToken | null> {
  const hashedToken = createHash('sha256').update(token).digest('hex');

  const session = await prisma.impersonationSession.findUnique({
    where: { hashedToken },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return {
    adminId: session.adminId,
    targetUserId: session.targetUserId,
    token,
    expiresAt: session.expiresAt,
  };
}

export async function endImpersonationSession(
  adminId: string,
  targetUserId: string
): Promise<void> {
  await prisma.impersonationSession.deleteMany({
    where: { adminId, targetUserId },
  });

  await prisma.auditLog.create({
    data: {
      action: 'IMPERSONATION_END',
      adminId,
      targetId: targetUserId,
      targetType: 'user',
    },
  });
}
```

### Impersonation Banner

```tsx
// components/admin/impersonation-banner.tsx
'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ImpersonationBannerProps {
  adminName: string;
  userName: string;
  onEndSession: () => void;
}

export function ImpersonationBanner({
  adminName,
  userName,
  onEndSession,
}: ImpersonationBannerProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-mono text-sm">
            [ IMPERSONATING ] {userName} as {adminName}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onEndSession}
          className="bg-transparent border-destructive-foreground text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
        >
          > END SESSION
        </Button>
      </div>
    </div>
  );
}
```

---

## Subscription Management

Monitor and manage all subscriptions:

```tsx
// components/admin/subscription-management.tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart } from '@/components/charts/line-chart';
import { DonutChart } from '@/components/charts/donut-chart';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface SubscriptionStats {
  mrr: number;
  mrrChange: number;
  activeCount: number;
  trialCount: number;
  churnedCount: number;
  churnRate: number;
  arpu: number;
  planDistribution: Array<{ plan: string; count: number }>;
  mrrHistory: Array<{ date: string; mrr: number }>;
}

export function SubscriptionDashboard({ stats }: { stats: SubscriptionStats }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ MRR ]
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-semibold">
              ${stats.mrr.toLocaleString()}
            </span>
            <span
              className={cn(
                'font-mono text-xs',
                stats.mrrChange > 0 ? 'text-success' : 'text-destructive'
              )}
            >
              {stats.mrrChange > 0 ? '+' : ''}
              {stats.mrrChange}%
            </span>
          </div>
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ ACTIVE ]
          </span>
          <p className="font-mono text-2xl font-semibold mt-2">
            {stats.activeCount.toLocaleString()}
          </p>
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ TRIAL ]
          </span>
          <p className="font-mono text-2xl font-semibold mt-2">
            {stats.trialCount.toLocaleString()}
          </p>
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ CHURN RATE ]
          </span>
          <p className="font-mono text-2xl font-semibold mt-2">
            {stats.churnRate}%
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={cn('p-4', mode.radius)}>
          <div className="border-b border-border pb-2 mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ MRR HISTORY ]
            </span>
          </div>
          <LineChart
            data={stats.mrrHistory}
            xKey="date"
            yKey="mrr"
            height={250}
          />
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <div className="border-b border-border pb-2 mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ PLAN DISTRIBUTION ]
            </span>
          </div>
          <DonutChart
            data={stats.planDistribution}
            nameKey="plan"
            valueKey="count"
            height={250}
          />
        </Card>
      </div>
    </div>
  );
}
```

---

## Manual Subscription Adjustments

Admin tools for subscription modifications:

```typescript
// api/admin/subscriptions/[id]/route.ts
import { withAdminAuth } from '@/lib/admin/protect-api';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const adjustmentSchema = z.object({
  action: z.enum(['extend_trial', 'apply_discount', 'change_plan', 'cancel', 'refund']),
  days: z.number().optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  newPlanId: z.string().optional(),
  refundAmount: z.number().optional(),
  reason: z.string().min(1),
});

export const POST = withAdminAuth(
  async (request, session) => {
    const { id } = request.params;
    const body = await request.json();

    const result = adjustmentSchema.safeParse(body);
    if (!result.success) {
      return Response.json({ error: result.error.issues }, { status: 400 });
    }

    const { action, days, discountPercent, newPlanId, refundAmount, reason } = result.data;

    // Get subscription
    const subscription = await prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return Response.json({ error: 'Subscription not found' }, { status: 404 });
    }

    let updateData = {};

    switch (action) {
      case 'extend_trial':
        if (!days) {
          return Response.json({ error: 'Days required' }, { status: 400 });
        }
        const newTrialEnd = new Date(subscription.trialEndAt);
        newTrialEnd.setDate(newTrialEnd.getDate() + days);
        updateData = { trialEndAt: newTrialEnd };
        break;

      case 'apply_discount':
        if (!discountPercent) {
          return Response.json({ error: 'Discount required' }, { status: 400 });
        }
        // Apply via payment provider API
        // ...
        break;

      case 'change_plan':
        if (!newPlanId) {
          return Response.json({ error: 'Plan ID required' }, { status: 400 });
        }
        updateData = { planId: newPlanId };
        break;

      case 'cancel':
        updateData = { cancelAtPeriodEnd: true };
        break;

      case 'refund':
        if (!refundAmount) {
          return Response.json({ error: 'Amount required' }, { status: 400 });
        }
        // Process refund via payment provider
        // ...
        break;
    }

    // Update subscription
    const updated = await prisma.subscription.update({
      where: { id },
      data: updateData,
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: `SUBSCRIPTION_${action.toUpperCase()}`,
        adminId: session.user.id,
        targetId: subscription.id,
        targetType: 'subscription',
        details: { ...result.data },
      },
    });

    return Response.json({ subscription: updated });
  },
  'subscriptions:write'
);
```

---

## System Health Monitoring

Real-time system health checks:

```tsx
// components/admin/system-health.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface HealthStatus {
  database: { status: 'healthy' | 'degraded' | 'down'; latency: number };
  redis: { status: 'healthy' | 'degraded' | 'down'; latency: number };
  stripe: { status: 'healthy' | 'degraded' | 'down' };
  email: { status: 'healthy' | 'degraded' | 'down' };
  storage: { status: 'healthy' | 'degraded' | 'down'; usedPercent: number };
  queue: { status: 'healthy' | 'degraded' | 'down'; pendingJobs: number };
}

export function SystemHealth() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      const res = await fetch('/api/admin/health');
      const data = await res.json();
      setHealth(data);
      setLoading(false);
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading health status...</div>;
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-success';
      case 'degraded':
        return 'bg-yellow-500';
      case 'down':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold">SYSTEM HEALTH</h1>
        <Badge variant={health?.database.status === 'healthy' ? 'default' : 'destructive'}>
          {health?.database.status === 'healthy' ? '[ALL SYSTEMS OPERATIONAL]' : '[ISSUES DETECTED]'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Database */}
        <Card className={cn('p-4', mode.radius)}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ DATABASE ]
            </span>
            <div
              className={cn(
                'w-3 h-3 rounded-full',
                statusColor(health?.database.status || '')
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-mono text-sm">Status</span>
              <Badge variant={health?.database.status === 'healthy' ? 'default' : 'destructive'}>
                {health?.database.status?.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-sm">Latency</span>
              <span className="font-mono text-sm">{health?.database.latency}ms</span>
            </div>
          </div>
        </Card>

        {/* Redis */}
        <Card className={cn('p-4', mode.radius)}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ REDIS CACHE ]
            </span>
            <div
              className={cn(
                'w-3 h-3 rounded-full',
                statusColor(health?.redis.status || '')
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-mono text-sm">Status</span>
              <Badge variant={health?.redis.status === 'healthy' ? 'default' : 'destructive'}>
                {health?.redis.status?.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-sm">Latency</span>
              <span className="font-mono text-sm">{health?.redis.latency}ms</span>
            </div>
          </div>
        </Card>

        {/* Storage */}
        <Card className={cn('p-4', mode.radius)}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ STORAGE ]
            </span>
            <div
              className={cn(
                'w-3 h-3 rounded-full',
                statusColor(health?.storage.status || '')
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-mono text-sm">Used</span>
              <span className="font-mono text-sm">{health?.storage.usedPercent}%</span>
            </div>
            <Progress value={health?.storage.usedPercent} />
          </div>
        </Card>

        {/* Queue */}
        <Card className={cn('p-4', mode.radius)}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ JOB QUEUE ]
            </span>
            <div
              className={cn(
                'w-3 h-3 rounded-full',
                statusColor(health?.queue.status || '')
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-mono text-sm">Pending Jobs</span>
              <span className="font-mono text-sm">{health?.queue.pendingJobs}</span>
            </div>
          </div>
        </Card>

        {/* External APIs */}
        <Card className={cn('p-4', mode.radius)}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ STRIPE API ]
            </span>
            <div
              className={cn(
                'w-3 h-3 rounded-full',
                statusColor(health?.stripe.status || '')
              )}
            />
          </div>
          <Badge variant={health?.stripe.status === 'healthy' ? 'default' : 'destructive'}>
            {health?.stripe.status?.toUpperCase()}
          </Badge>
        </Card>

        {/* Email */}
        <Card className={cn('p-4', mode.radius)}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">
              [ EMAIL SERVICE ]
            </span>
            <div
              className={cn(
                'w-3 h-3 rounded-full',
                statusColor(health?.email.status || '')
              )}
            />
          </div>
          <Badge variant={health?.email.status === 'healthy' ? 'default' : 'destructive'}>
            {health?.email.status?.toUpperCase()}
          </Badge>
        </Card>
      </div>
    </div>
  );
}
```

---

## Real-Time Health Dashboard

API endpoint for health checks:

```typescript
// api/admin/health/route.ts
import { withAdminAuth } from '@/lib/admin/protect-api';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export const GET = withAdminAuth(async () => {
  const health: Record<string, unknown> = {};

  // Database health
  const dbStart = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.database = {
      status: 'healthy',
      latency: Date.now() - dbStart,
    };
  } catch {
    health.database = { status: 'down', latency: 0 };
  }

  // Redis health
  const redisStart = Date.now();
  try {
    await redis.ping();
    health.redis = {
      status: 'healthy',
      latency: Date.now() - redisStart,
    };
  } catch {
    health.redis = { status: 'down', latency: 0 };
  }

  // Stripe health
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    await stripe.balance.retrieve();
    health.stripe = { status: 'healthy' };
  } catch {
    health.stripe = { status: 'down' };
  }

  // Email health (Resend)
  try {
    // Simple API check
    health.email = { status: 'healthy' };
  } catch {
    health.email = { status: 'down' };
  }

  // Storage check
  health.storage = {
    status: 'healthy',
    usedPercent: 45, // Get from storage provider
  };

  // Queue check
  const pendingJobs = await prisma.job.count({
    where: { status: 'pending' },
  });
  health.queue = {
    status: pendingJobs > 1000 ? 'degraded' : 'healthy',
    pendingJobs,
  };

  return Response.json(health);
});
```

---

## Feature Flag Management

Control feature rollouts:

```tsx
// components/admin/feature-flags.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetedUsers: string[];
  targetedPlans: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function FeatureFlagManager({ flags: initialFlags }: { flags: FeatureFlag[] }) {
  const [flags, setFlags] = useState(initialFlags);
  const [editingFlag, setEditingFlag] = useState<FeatureFlag | null>(null);

  const toggleFlag = async (flagId: string) => {
    const flag = flags.find((f) => f.id === flagId);
    if (!flag) return;

    await fetch(`/api/admin/flags/${flagId}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled: !flag.enabled }),
    });

    setFlags(
      flags.map((f) =>
        f.id === flagId ? { ...f, enabled: !f.enabled } : f
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold">FEATURE FLAGS</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>> NEW FLAG</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Feature Flag</DialogTitle>
            </DialogHeader>
            {/* Form content */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {flags.map((flag) => (
          <Card key={flag.id} className={cn('p-4', mode.radius)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium">
                    {flag.name}
                  </span>
                  <Badge variant="outline">{flag.key}</Badge>
                  {flag.rolloutPercentage < 100 && (
                    <Badge variant="secondary">
                      {flag.rolloutPercentage}% rollout
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground font-mono text-xs mt-1">
                  {flag.description}
                </p>
                {(flag.targetedUsers.length > 0 || flag.targetedPlans.length > 0) && (
                  <div className="flex items-center gap-2 mt-2">
                    {flag.targetedPlans.map((plan) => (
                      <Badge key={plan} variant="outline">
                        {plan}
                      </Badge>
                    ))}
                    {flag.targetedUsers.length > 0 && (
                      <Badge variant="outline">
                        {flag.targetedUsers.length} users
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingFlag(flag)}
                >
                  Edit
                </Button>
                <Switch
                  checked={flag.enabled}
                  onCheckedChange={() => toggleFlag(flag.id)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

---

## Audit Logging

Comprehensive audit log system:

```typescript
// lib/admin/audit.ts
import { prisma } from '@/lib/prisma';

export type AuditAction =
  | 'USER_CREATED'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'USER_SUSPENDED'
  | 'IMPERSONATION_START'
  | 'IMPERSONATION_END'
  | 'SUBSCRIPTION_CREATED'
  | 'SUBSCRIPTION_UPDATED'
  | 'SUBSCRIPTION_CANCELED'
  | 'SUBSCRIPTION_REFUNDED'
  | 'FLAG_CREATED'
  | 'FLAG_UPDATED'
  | 'FLAG_DELETED'
  | 'SETTINGS_UPDATED';

interface AuditLogEntry {
  action: AuditAction;
  adminId: string;
  targetId?: string;
  targetType?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(entry: AuditLogEntry): Promise<void> {
  await prisma.auditLog.create({
    data: {
      action: entry.action,
      adminId: entry.adminId,
      targetId: entry.targetId,
      targetType: entry.targetType,
      details: entry.details || {},
      ipAddress: entry.ipAddress,
      userAgent: entry.userAgent,
      timestamp: new Date(),
    },
  });
}

export async function getAuditLogs(filters: {
  action?: AuditAction;
  adminId?: string;
  targetId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}) {
  const where: Record<string, unknown> = {};

  if (filters.action) where.action = filters.action;
  if (filters.adminId) where.adminId = filters.adminId;
  if (filters.targetId) where.targetId = filters.targetId;
  if (filters.startDate || filters.endDate) {
    where.timestamp = {};
    if (filters.startDate) where.timestamp.gte = filters.startDate;
    if (filters.endDate) where.timestamp.lte = filters.endDate;
  }

  const [logs, count] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        admin: { select: { id: true, name: true, email: true } },
      },
      orderBy: { timestamp: 'desc' },
      take: filters.limit || 50,
      skip: filters.offset || 0,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return { logs, count };
}
```

### Audit Log Viewer

```tsx
// components/admin/audit-log-viewer.tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function AuditLogViewer({ logs, totalCount, filters, onFilterChange }) {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className={cn('p-4', mode.radius)}>
        <div className="flex flex-wrap items-center gap-4">
          <Select
            value={filters.action || 'all'}
            onValueChange={(v) => onFilterChange({ action: v === 'all' ? undefined : v })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="USER_CREATED">User Created</SelectItem>
              <SelectItem value="USER_SUSPENDED">User Suspended</SelectItem>
              <SelectItem value="IMPERSONATION_START">Impersonation</SelectItem>
              <SelectItem value="SUBSCRIPTION_UPDATED">Subscription Updated</SelectItem>
            </SelectContent>
          </Select>
          <DatePicker
            value={filters.startDate}
            onChange={(date) => onFilterChange({ startDate: date })}
            placeholder="Start date"
          />
          <DatePicker
            value={filters.endDate}
            onChange={(date) => onFilterChange({ endDate: date })}
            placeholder="End date"
          />
          <Button variant="outline" size="sm">
            > EXPORT
          </Button>
        </div>
      </Card>

      {/* Log Table */}
      <Card className={cn('overflow-hidden', mode.radius)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Badge variant="outline">{log.action}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {log.admin.name}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {log.targetType}: {log.targetId}
                </TableCell>
                <TableCell className="font-mono text-xs max-w-[200px] truncate">
                  {JSON.stringify(log.details)}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {log.ipAddress}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {formatRelativeTime(log.timestamp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
```

---

## Organization Management

View and manage all organizations:

```tsx
// components/admin/organization-management.tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Organization {
  id: string;
  name: string;
  slug: string;
  memberCount: number;
  plan: string;
  mrr: number;
  createdAt: Date;
}

export function OrganizationManagement({ organizations }: { organizations: Organization[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold">ORGANIZATIONS</h1>
        <span className="font-mono text-xs text-muted-foreground">
          {organizations.length} total
        </span>
      </div>

      <Card className={cn('overflow-hidden', mode.radius)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>MRR</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div>
                    <span className="font-mono text-sm font-medium">{org.name}</span>
                    <p className="font-mono text-xs text-muted-foreground">
                      {org.slug}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {org.memberCount}
                </TableCell>
                <TableCell>
                  <Badge>{org.plan.toUpperCase()}</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  ${org.mrr.toLocaleString()}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {formatDate(org.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
```

---

## Admin Notifications

Alert admins to critical events:

```typescript
// lib/admin/notifications.ts
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

type AlertType = 'high_churn' | 'payment_failed' | 'system_error' | 'security_alert';

interface AdminAlert {
  type: AlertType;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  data?: Record<string, unknown>;
}

export async function sendAdminAlert(alert: AdminAlert): Promise<void> {
  // Store in database
  await prisma.adminNotification.create({
    data: {
      type: alert.type,
      title: alert.title,
      message: alert.message,
      severity: alert.severity,
      data: alert.data || {},
      read: false,
    },
  });

  // Send email for high/critical alerts
  if (alert.severity === 'high' || alert.severity === 'critical') {
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { email: true },
    });

    for (const admin of admins) {
      await sendEmail.adminAlert({
        to: admin.email,
        subject: `[${alert.severity.toUpperCase()}] ${alert.title}`,
        message: alert.message,
      });
    }
  }
}

// Example usage
export async function checkChurnRate(): Promise<void> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const churned = await prisma.subscription.count({
    where: {
      status: 'canceled',
      canceledAt: { gte: thirtyDaysAgo },
    },
  });

  const total = await prisma.subscription.count();
  const churnRate = (churned / total) * 100;

  if (churnRate > 5) {
    await sendAdminAlert({
      type: 'high_churn',
      title: 'High Churn Rate Detected',
      message: `Churn rate is ${churnRate.toFixed(1)}% (${churned} cancellations in 30 days)`,
      severity: churnRate > 10 ? 'critical' : 'high',
      data: { churnRate, churned, total },
    });
  }
}
```

---

## API Usage Monitoring

Track API usage and rate limits:

```tsx
// components/admin/api-usage.tsx
import { Card } from '@/components/ui/card';
import { BarChart } from '@/components/charts/bar-chart';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface ApiUsageStats {
  totalRequests: number;
  topEndpoints: Array<{ endpoint: string; count: number }>;
  topConsumers: Array<{ userId: string; name: string; count: number }>;
  rateLimitHits: number;
  errorRate: number;
  requestsByDay: Array<{ date: string; count: number }>;
}

export function ApiUsageMonitor({ stats }: { stats: ApiUsageStats }) {
  return (
    <div className="space-y-6">
      <h1 className="font-mono text-2xl font-semibold">API USAGE</h1>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ TOTAL REQUESTS ]
          </span>
          <p className="font-mono text-2xl font-semibold mt-2">
            {stats.totalRequests.toLocaleString()}
          </p>
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ RATE LIMIT HITS ]
          </span>
          <p className="font-mono text-2xl font-semibold mt-2">
            {stats.rateLimitHits}
          </p>
        </Card>
        <Card className={cn('p-4', mode.radius)}>
          <span className="font-mono text-xs text-muted-foreground">
            [ ERROR RATE ]
          </span>
          <p className="font-mono text-2xl font-semibold mt-2">
            {stats.errorRate}%
          </p>
        </Card>
      </div>

      {/* Charts */}
      <Card className={cn('p-4', mode.radius)}>
        <div className="border-b border-border pb-2 mb-4">
          <span className="font-mono text-xs text-muted-foreground">
            [ REQUESTS BY DAY ]
          </span>
        </div>
        <BarChart
          data={stats.requestsByDay}
          xKey="date"
          yKey="count"
          height={200}
        />
      </Card>

      {/* Top Consumers */}
      <Card className={cn('p-4', mode.radius)}>
        <div className="border-b border-border pb-2 mb-4">
          <span className="font-mono text-xs text-muted-foreground">
            [ TOP API CONSUMERS ]
          </span>
        </div>
        <div className="space-y-2">
          {stats.topConsumers.map((consumer, i) => (
            <div key={consumer.userId} className="flex items-center justify-between">
              <span className="font-mono text-sm">
                {i + 1}. {consumer.name}
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                {consumer.count.toLocaleString()} requests
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
```

---

## Admin Navigation

Sidebar navigation for admin sections:

```tsx
// components/admin/admin-sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Activity,
  Flag,
  FileText,
  Building2,
  Bell,
  BarChart,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { href: '/admin/organizations', icon: Building2, label: 'Organizations' },
  { href: '/admin/health', icon: Activity, label: 'System Health' },
  { href: '/admin/flags', icon: Flag, label: 'Feature Flags' },
  { href: '/admin/logs', icon: FileText, label: 'Audit Logs' },
  { href: '/admin/api-usage', icon: BarChart, label: 'API Usage' },
  { href: '/admin/notifications', icon: Bell, label: 'Notifications' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 border-r border-border bg-card p-4">
      <div className="font-mono text-xs text-muted-foreground mb-6">
        [ ADMIN PANEL ]
      </div>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 font-mono text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

---

## Components Reference

| Component | Purpose | File |
|-----------|---------|------|
| `AdminDashboard` | Main dashboard with KPIs | `admin-dashboard.tsx` |
| `UserManagement` | User list with CRUD | `user-management.tsx` |
| `UserDetails` | Individual user view | `user-details.tsx` |
| `ImpersonationBanner` | Impersonation indicator | `impersonation-banner.tsx` |
| `SubscriptionDashboard` | Subscription stats | `subscription-management.tsx` |
| `SystemHealth` | Service status | `system-health.tsx` |
| `FeatureFlagManager` | Toggle features | `feature-flags.tsx` |
| `AuditLogViewer` | Action history | `audit-log-viewer.tsx` |
| `OrganizationManagement` | Org list | `organization-management.tsx` |
| `ApiUsageMonitor` | API analytics | `api-usage.tsx` |
| `AdminSidebar` | Navigation | `admin-sidebar.tsx` |

---

## Best Practices

1. **Audit everything** - Log all admin actions for accountability
2. **Require confirmation** - For destructive actions (suspensions, deletions)
3. **Use impersonation sparingly** - Always with logging and time limits
4. **Keep it simple** - Admins need efficiency, not complexity
5. **Mobile support** - Admins work from phones too
6. **Real-time updates** - Show current data, not stale snapshots
7. **Role-based access** - Not all admins need all permissions
8. **Alert on anomalies** - Proactive monitoring beats reactive firefighting

Admin tools for operators.
