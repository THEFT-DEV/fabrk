/**
 * User Management Template Page
 */
'use client';

import { useState, useCallback } from 'react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { columns } from './components/user-table-columns';
import { mockUsers } from './components/types';
import { StatsCards } from './components/stats-cards';
import { TableToolbar } from './components/table-toolbar';
import { DataTable } from './components/data-table';
import { PaginationControls } from './components/pagination-controls';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function UserManagement() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: mockUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={cn(mode.font, "text-2xl font-semibold")}>
          User Management
        </h1>
        <Button className={cn(mode.radius, mode.font, "text-xs")}>
          <UserPlus className="mr-2 h-4 w-4" />
          &gt; ADD USER
        </Button>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader code="0x00" title="USERS DATABASE" />
        <div className="p-4">
          {/* Search and filters */}
          <Input
            placeholder="Search users..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className={cn(mode.radius, mode.font, "mb-4 max-w-sm text-xs")}
          />

          {/* Table */}
          <DataTable columns={columns} data={table.getRowModel().rows} />

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={cn(mode.radius, mode.font, "text-xs")}
            >
              &lt; PREV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={cn(mode.radius, mode.font, "text-xs")}
            >
              &gt; NEXT
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}`;

function UserManagementPreview() {
  const [sorting, setSorting] = useState<SortingState>(() => []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => ({}));
  const [rowSelection, setRowSelection] = useState(() => ({}));

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table API design is incompatible with React Compiler but works correctly
  const table = useReactTable({
    data: mockUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToCSV = useCallback(() => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Plan'];
    const csvData = mockUsers.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.plan,
    ]);

    const csv = [headers.join(','), ...csvData.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }, []);

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={cn(mode.font, 'text-2xl font-semibold', mode.color.text.primary)}>
            User Management
          </h1>
          <Button className={cn(mode.radius, mode.font, 'text-xs')}>
            <UserPlus className="mr-2 h-4 w-4" />
            &gt; ADD USER
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards users={mockUsers} />

        {/* Main Table Card */}
        <Card>
          <CardHeader code="0x00" title="USERS_DATABASE" />
          <div className="p-4">
            <TableToolbar table={table} onExportCSV={exportToCSV} />
            <DataTable table={table} />
            <PaginationControls table={table} />
          </div>
        </Card>
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function UserManagementTemplate() {
  return (
    <TemplateShowcasePage
      badge="USER MANAGEMENT"
      title="User Management"
      description="Manage users, roles, and permissions with TanStack Table"
      templateId="user-management"
      category={{ name: 'Admin Panels', href: '/library/admin-panels' }}
      preview={<UserManagementPreview />}
      code={templateCode}
      fileStructure="app/admin/users/page.tsx"
      features={[
        'TanStack Table integration',
        'Sorting, filtering, pagination',
        'CSV export functionality',
        'User stats dashboard',
        'Role-based status badges',
        'Responsive table layout',
      ]}
    />
  );
}
