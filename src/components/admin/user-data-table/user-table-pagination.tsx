/**
 * ✅ FABRK COMPONENT
 * Pagination controls for user data table.
 */

'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { UserData } from './user-table-columns';

interface UserTablePaginationProps {
  table: Table<UserData>;
}

export function UserTablePagination({ table }: UserTablePaginationProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="flex items-center justify-between">
      <div className={cn('text-muted-foreground text-sm', mode.font)}>
        {selectedRows.length > 0 && (
          <span>
            {selectedRows.length} of {table.getFilteredRowModel().rows.length} row(s) selected
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className={cn('text-muted-foreground text-sm', mode.font)}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
