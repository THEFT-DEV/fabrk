'use client';
/* eslint-disable react-hooks/incompatible-library */

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DataTableColumnHeader } from '@/components/ui/data-table-header';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';

type SampleData = {
  id: number;
  name: string;
  status: string;
  amount: number;
};

export default function DataTableHeaderPage() {
  const data: SampleData[] = [
    { id: 1, name: 'Project Alpha', status: 'Active', amount: 12500 },
    { id: 2, name: 'Project Beta', status: 'Pending', amount: 8300 },
    { id: 3, name: 'Project Gamma', status: 'Completed', amount: 15750 },
    { id: 4, name: 'Project Delta', status: 'Active', amount: 9200 },
  ];

  const columns: ColumnDef<SampleData>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Project Name" />,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      cell: ({ row }) => {
        const amount = row.getValue('amount') as number;
        return `$${amount.toLocaleString()}`;
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <ComponentShowcaseTemplate
      code="[UI.84]"
      category="Components"
      title="Data Table Header"
      description="Sortable table column header with visual indicators for @tanstack/react-table integration."
      importCode={`import { DataTableColumnHeader } from "@/components/ui/data-table-header"`}
      mainPreview={{
        preview: (
          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-border border-b">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-4 text-left font-medium">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-border border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        code: `import { DataTableColumnHeader } from "@/components/ui/data-table-header";
import { useReactTable, ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
  },
];

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});`,
      }}
      variants={[
        {
          title: 'Sortable Header',
          description: 'Click to toggle between ascending, descending, and unsorted',
          preview: (
            <div className="space-y-2">
              <span className="text-muted-foreground font-mono text-xs">
                [INTERACTIVE]: Click headers to sort
              </span>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="border-border border-b">
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} className="px-4 py-2 text-left font-medium">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                </table>
              </div>
            </div>
          ),
          code: `<DataTableColumnHeader
  column={column}
  title="Column Name"
/>`,
        },
        {
          title: 'Unsorted State',
          description: 'Shows arrows up-down icon when not sorted',
          preview: (
            <div className="flex items-center gap-2">
              <DataTableColumnHeader column={table.getColumn('name')!} title="Project Name" />
            </div>
          ),
          code: `// Default state shows unsorted icon
<DataTableColumnHeader column={column} title="Project Name" />`,
        },
        {
          title: 'Sorted Ascending',
          description: 'Shows up arrow when sorted A-Z or 0-9',
          preview: (
            <div className="space-y-2">
              <span className="text-muted-foreground font-mono text-xs">
                [STATE]: Ascending sort
              </span>
              <div className="flex items-center gap-2">
                <span className="text-success">&gt;</span>
                <span className="text-sm">ArrowUp icon displayed</span>
              </div>
            </div>
          ),
          code: `// When column.getIsSorted() === "asc"
// ArrowUp icon is displayed`,
        },
        {
          title: 'Sorted Descending',
          description: 'Shows down arrow when sorted Z-A or 9-0',
          preview: (
            <div className="space-y-2">
              <span className="text-muted-foreground font-mono text-xs">
                [STATE]: Descending sort
              </span>
              <div className="flex items-center gap-2">
                <span className="text-success">&gt;</span>
                <span className="text-sm">ArrowDown icon displayed</span>
              </div>
            </div>
          ),
          code: `// When column.getIsSorted() === "desc"
// ArrowDown icon is displayed`,
        },
        {
          title: 'Non-Sortable Column',
          description: 'Renders as plain text when column cannot be sorted',
          preview: <div className="font-mono text-sm">Actions</div>,
          code: `// When column.getCanSort() === false
// Renders without button or icons`,
        },
      ]}
      props={[
        {
          name: 'column',
          type: 'Column<TData, TValue>',
          default: '-',
          description: 'TanStack Table column instance',
        },
        {
          name: 'title',
          type: 'string',
          default: '-',
          description: 'Display text for the column header',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: 'Additional CSS classes for the header container',
        },
      ]}
      accessibility={[
        'Uses Button component with proper keyboard support',
        'aria-label describes current sort state and action',
        'Focus visible styles for keyboard navigation',
        'Icons have proper ARIA attributes',
        'Non-sortable columns render as plain div without button semantics',
        'Sort state changes announced to screen readers',
      ]}
      previous={{ title: 'Code Block', href: '/docs/components/code-block' }}
      next={{ title: 'Empty State', href: '/docs/components/empty-state' }}
    />
  );
}
