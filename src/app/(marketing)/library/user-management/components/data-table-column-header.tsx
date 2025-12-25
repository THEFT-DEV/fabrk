/**
 * Sortable column header component
 */

import { ArrowUpDown } from 'lucide-react';
import type { Column } from '@tanstack/react-table';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function DataTableColumnHeader<TData>({
  column,
  title,
}: {
  column: Column<TData, unknown>;
  title: string;
}) {
  return (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className={cn(
        mode.font,
        'text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs'
      )}
    >
      [{title.toUpperCase()}]
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );
}
