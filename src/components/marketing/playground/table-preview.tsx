/**
 * Table Preview - User management table demo for hero playground
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
import { Card } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { BrowserFrame } from './browser-frame';
import { LeftNavigation } from './left-navigation';

// User Management components
import { columns } from '@/app/(marketing)/library/user-management/components/user-table-columns';
import { mockUsers } from '@/app/(marketing)/library/user-management/components/types';
import { DataTable as UserDataTable } from '@/app/(marketing)/library/user-management/components/data-table';
import { PaginationControls } from '@/app/(marketing)/library/user-management/components/pagination-controls';
import { StatsCards } from '@/app/(marketing)/library/user-management/components/stats-cards';
import { TableToolbar } from '@/app/(marketing)/library/user-management/components/table-toolbar';

export function TablePreview() {
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
    <BrowserFrame>
      <LeftNavigation activeSection="table" />
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className={cn(mode.font, 'text-2xl font-semibold')}>User Management</h1>
            <Button className={cn(mode.radius, mode.font, 'text-xs')}>
              <UserPlus className="mr-2 h-4 w-4" />
              &gt; ADD USER
            </Button>
          </div>

          {/* Stats Cards */}
          <StatsCards users={mockUsers} />

          {/* Main Table Card */}
          <Card>
            <div className="p-4">
              {/* Toolbar */}
              <TableToolbar table={table} onExportCSV={exportToCSV} />

              {/* Terminal Table */}
              <UserDataTable table={table} />

              {/* Pagination */}
              <PaginationControls table={table} />
            </div>
          </Card>
        </div>
      </div>
    </BrowserFrame>
  );
}
