/**
 * Pagination controls component
 */

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { User } from './types';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface PaginationControlsProps {
  table: Table<User>;
}

export function PaginationControls({ table }: PaginationControlsProps) {
  return (
    <div className={cn(mode.font, 'mt-4 flex items-center justify-between text-xs')}>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">ROWS PER PAGE:</span>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className={cn(mode.radius, mode.font, 'h-7 w-[70px] text-xs')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={cn(mode.radius, mode.font, 'min-w-[70px] text-xs')}>
            {[10, 25, 50, 100].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                className={cn(mode.radius, 'focus:bg-primary focus:text-primary-foreground')}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">
          PAGE: {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn(mode.radius, mode.font, 'h-7 text-xs')}
          >
            &lt; PREV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cn(mode.radius, mode.font, 'h-7 text-xs')}
          >
            NEXT &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
