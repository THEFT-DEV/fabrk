/**
 * Table toolbar with search, filters, and bulk actions
 */

import { Table } from '@tanstack/react-table';
import { Search, ChevronDown, UserCog, UserX, Trash2, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from './types';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface TableToolbarProps {
  table: Table<User>;
  onExportCSV?: () => void;
}

export function TableToolbar({ table, onExportCSV }: TableToolbarProps) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const hiddenColumns = table.getAllColumns().filter((column) => column.getCanHide());

  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="search users..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className={cn(mode.radius, mode.font, 'pl-10 text-xs')}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
              [COLUMNS] <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={cn(mode.radius, mode.font, 'border-border border text-xs')}
          >
            {hiddenColumns.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className={cn(mode.radius, 'focus:bg-primary focus:text-primary-foreground')}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id.toUpperCase()}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <>
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              SELECTED: {selectedCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              className={cn(mode.radius, mode.font, 'h-7 text-xs')}
            >
              <UserCog className="mr-1 h-3 w-3" />
              &gt; ROLE
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(mode.radius, mode.font, 'h-7 text-xs')}
            >
              <UserX className="mr-1 h-3 w-3" />
              &gt; SUSPEND
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className={cn(mode.radius, mode.font, 'h-7 text-xs')}
            >
              <Trash2 className="mr-1 h-3 w-3" />
              &gt; DELETE
            </Button>
          </>
        )}

        {/* Export CSV */}
        {onExportCSV && (
          <Button
            onClick={onExportCSV}
            variant="outline"
            size="sm"
            className={cn(mode.radius, mode.font, 'h-7 text-xs')}
          >
            <Download className="mr-2 h-3 w-3" />
            &gt; EXPORT CSV
          </Button>
        )}
      </div>
    </div>
  );
}
