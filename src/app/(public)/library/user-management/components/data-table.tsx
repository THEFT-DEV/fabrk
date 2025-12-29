/**
 * Data table component with terminal styling
 */

import { Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { User } from './types';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface DataTableProps {
  table: Table<User>;
}

// Column flex values - relative proportions that stay within bounds
const columnFlex: Record<string, string> = {
  select: '0 0 40px',
  name: '1 1 20%',
  email: '1 1 25%',
  role: '0 0 120px',
  status: '0 0 100px',
  actions: '0 0 50px',
};

export function DataTable({ table }: DataTableProps) {
  return (
    <div className={cn('border-border overflow-hidden border', mode.radius)}>
      {/* Table Header */}
      <div className="border-border bg-muted/50 border-b">
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="flex items-center px-4 py-4">
            {headerGroup.headers.map((header) => {
              const columnId = header.column.id;
              return (
                <div
                  key={header.id}
                  className="min-w-0 font-medium"
                  style={{ flex: columnFlex[columnId] || '1 1 0%' }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="divide-border divide-y">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <div
              key={row.id}
              className={cn(
                'hover:bg-muted/40 flex items-center px-4 py-4 transition-colors',
                index % 2 === 0 ? 'bg-background' : 'bg-muted/20',
                row.getIsSelected() && 'bg-primary/10 hover:bg-primary/15'
              )}
            >
              {row.getVisibleCells().map((cell) => {
                const columnId = cell.column.id;
                return (
                  <div
                    key={cell.id}
                    className="min-w-0"
                    style={{ flex: columnFlex[columnId] || '1 1 0%' }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [NO RESULTS]: Query returned 0 users
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
