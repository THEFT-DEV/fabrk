/**
 * ✅ FABRK COMPONENT
 * Advanced data table for admin user management with sorting, filtering, pagination, and bulk actions.
 *
 * @example
 * ```tsx
 * <UserDataTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
 * ```
 */

'use client';

import * as React from 'react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Users } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { createUserColumns, UserData } from './user-table-columns';
import { UserTableToolbar } from './user-table-toolbar';
import { UserTablePagination } from './user-table-pagination';

import { mode } from '@/design-system';
// Re-export UserData type for external usage
export type { UserData };

interface UserDataTableProps {
  users: UserData[];
  onEdit?: (user: UserData) => void;
  onDelete?: (userId: string) => void;
  onBulkDelete?: (userIds: string[]) => void;
  className?: string;
}

export function UserDataTable({
  users,
  onEdit,
  onDelete,
  onBulkDelete,
  className,
}: UserDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => createUserColumns({ onEdit, onDelete }), [onEdit, onDelete]);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table API design is incompatible with React Compiler but works correctly
  const table = useReactTable({
    data: users,
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
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      <UserTableToolbar
        table={table}
        onBulkDelete={onBulkDelete}
        onRowSelectionChange={setRowSelection}
      />

      {/* Table */}
      <div className={cn('border-border border', mode.radius)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border border-b">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-foreground font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-border border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
                    <Users className="h-8 w-8" />
                    <p>No users found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <UserTablePagination table={table} />
    </div>
  );
}
