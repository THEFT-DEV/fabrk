/**
 * ✅ FABRK COMPONENT
 * Toolbar for user data table with search, bulk actions, and column visibility.
 */

'use client';

import { Table } from '@tanstack/react-table';
import { ChevronDown, Search, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { UserData } from './user-table-columns';

interface UserTableToolbarProps {
  table: Table<UserData>;
  onBulkDelete?: (userIds: string[]) => void;
  onRowSelectionChange: (selection: {}) => void;
}

export function UserTableToolbar({
  table,
  onBulkDelete,
  onRowSelectionChange,
}: UserTableToolbarProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search users..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="pl-8"
          />
        </div>
        {selectedRows.length > 0 && onBulkDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              const ids = selectedRows.map((row) => row.original.id);
              onBulkDelete(ids);
              onRowSelectionChange({});
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete {selectedRows.length} user
            {selectedRows.length > 1 ? 's' : ''}
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
