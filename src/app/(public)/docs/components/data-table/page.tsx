'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

// Sample data type
type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

// Sample data
const payments: Payment[] = [
  { id: 'INV001', amount: 316, status: 'success', email: 'user1@example.com' },
  { id: 'INV002', amount: 242, status: 'pending', email: 'user2@example.com' },
  { id: 'INV003', amount: 837, status: 'processing', email: 'user3@example.com' },
  { id: 'INV004', amount: 874, status: 'success', email: 'user4@example.com' },
  { id: 'INV005', amount: 721, status: 'failed', email: 'user5@example.com' },
];

// Column definitions
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'Invoice',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant =
        status === 'success'
          ? 'default'
          : status === 'pending'
            ? 'secondary'
            : status === 'processing'
              ? 'outline'
              : 'destructive';
      return <Badge variant={variant}>{status.toUpperCase()}</Badge>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return formatted;
    },
  },
];

export default function DataTablePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.62]"
      title="Data Table"
      description="Full-featured data table built on TanStack Table with sorting, filtering, pagination, and row selection. Terminal-styled with alternating row colors."
      importCode={`import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";`}
      mainPreview={{
        preview: (
          <DataTable columns={columns} data={payments} searchKey="email" searchPlaceholder="Search emails..." />
        ),
        code: `// Define your data type
type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

// Define columns
const columns: ColumnDef<Payment>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "amount", header: "Amount" },
];

// Use the component
<DataTable
  columns={columns}
  data={payments}
  searchKey="email"
  searchPlaceholder="Search emails..."
/>`,
      }}
      variants={[
        {
          title: 'With Row Click Handler',
          description: 'Handle row clicks for navigation or details',
          preview: (
            <DataTable
              columns={columns}
              data={payments.slice(0, 3)}
              onRowClick={(row) => alert(`Clicked: ${row.id}`)}
            />
          ),
          code: `<DataTable
  columns={columns}
  data={payments}
  onRowClick={(row) => console.log("Clicked:", row)}
/>`,
        },
        {
          title: 'Custom Cell Rendering',
          description: 'Format cells with custom components',
          preview: (
            <DataTable columns={columns} data={payments.slice(0, 3)} />
          ),
          code: `const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge variant="default">{status}</Badge>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  },
];`,
        },
      ]}
    >
      <DocsSection title="Features">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="SORTING">
            <p className="text-muted-foreground text-sm">
              Click column headers to sort. Click again to reverse. Sorting state is managed automatically.
            </p>
          </DocsCard>
          <DocsCard title="FILTERING">
            <p className="text-muted-foreground text-sm">
              Use the searchKey prop to enable filtering on a specific column. The toolbar appears automatically.
            </p>
          </DocsCard>
          <DocsCard title="PAGINATION">
            <p className="text-muted-foreground text-sm">
              Built-in pagination with page size selector and navigation. Handles large datasets efficiently.
            </p>
          </DocsCard>
          <DocsCard title="ROW SELECTION">
            <p className="text-muted-foreground text-sm">
              Optional row selection with visual feedback. Access selected rows via table state.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      <DocsSection title="Props Reference">
        <DocsCard title="DATATABLE PROPS">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Prop</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">columns</td>
                  <td className="p-2 font-mono">ColumnDef[]</td>
                  <td className="p-2">Column definitions from TanStack Table</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">data</td>
                  <td className="p-2 font-mono">TData[]</td>
                  <td className="p-2">Array of data to display</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">searchKey</td>
                  <td className="p-2 font-mono">string</td>
                  <td className="p-2">Column key to filter on</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">searchPlaceholder</td>
                  <td className="p-2 font-mono">string</td>
                  <td className="p-2">Placeholder for search input</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">onRowClick</td>
                  <td className="p-2 font-mono">(row: TData) =&gt; void</td>
                  <td className="p-2">Handler for row clicks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Related Components">
        <DocsCard title="SUB-COMPONENTS">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Component</th>
                  <th className="p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">DataTableColumnHeader</td>
                  <td className="p-2">Sortable column header with dropdown</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">DataTablePagination</td>
                  <td className="p-2">Pagination controls with page size</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">DataTableToolbar</td>
                  <td className="p-2">Search input and column visibility</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
