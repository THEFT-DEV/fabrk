'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TablePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.25]"
      category="Data Display"
      title="Table"
      description="A semantic table component with header, body, footer, and caption support for displaying structured data."
      importCode={`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";`}
      mainPreview={{
        preview: (
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV003</TableCell>
                <TableCell>Unpaid</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell className="text-right">$350.00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$750.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ),
        code: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    {/* More rows... */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
      }}
      variants={[
        {
          title: 'Simple Table',
          description: 'Basic table without caption or footer',
          preview: (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>User</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>bob@example.com</TableCell>
                  <TableCell>Editor</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
        },
        {
          title: 'Selected Rows',
          description: 'Highlight specific rows using data-state',
          preview: (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Laptop</TableCell>
                  <TableCell>$999</TableCell>
                  <TableCell>15</TableCell>
                </TableRow>
                <TableRow data-state="selected">
                  <TableCell>Keyboard</TableCell>
                  <TableCell>$79</TableCell>
                  <TableCell>42</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mouse</TableCell>
                  <TableCell>$29</TableCell>
                  <TableCell>103</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Stock</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell>Keyboard</TableCell>
      <TableCell>$79</TableCell>
      <TableCell>42</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
        },
        {
          title: 'Responsive Table',
          description: 'Scrollable table container for mobile',
          preview: (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#ORD-001</TableCell>
                  <TableCell>Alice Cooper</TableCell>
                  <TableCell>Premium Plan</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="text-right">$99.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#ORD-002</TableCell>
                  <TableCell>Bob Dylan</TableCell>
                  <TableCell>Starter Plan</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Processing</TableCell>
                  <TableCell className="text-right">$98.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead>Product</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* Rows with horizontal scroll on mobile */}
  </TableBody>
</Table>`,
        },
      ]}
      props={[
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ]}
      accessibility={[
        'Uses semantic HTML table elements (table, thead, tbody, tfoot)',
        "TableHead elements have scope='col' by default for screen readers",
        'TableCaption provides accessible description of table content',
        'Responsive wrapper prevents horizontal overflow on mobile',
        'Hover states on rows improve visual feedback',
        'Selected rows use data-state attribute for styling',
      ]}
      previous={{ title: 'Tooltip', href: '/docs/components/tooltip' }}
      next={{ title: 'Empty State', href: '/docs/components/empty-state' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Table when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Displaying structured data with multiple columns (invoices, orders, user lists)
                </li>
                <li className="text-xs">
                  • User needs to compare values across rows or scan columns vertically
                </li>
                <li className="text-xs">
                  • Data has clear column headers and consistent row structure
                </li>
                <li className="text-xs">
                  • Sorting, filtering, or pagination would improve data browsing
                </li>
                <li className="text-xs">
                  • 10+ rows of data that benefit from tabular organization
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Small amounts of data (1-5 items, use Card or List instead)
                </li>
                <li className="text-xs">
                  • Data doesn&apos;t have consistent columns (use Card grid or List)
                </li>
                <li className="text-xs">
                  • Content is primarily text paragraphs or narrative (use typography)
                </li>
                <li className="text-xs">
                  • Mobile-first design with narrow viewport (tables scroll poorly, consider Card
                  layout)
                </li>
                <li className="text-xs">
                  • Complex nested data (use Tree view or collapsible structure)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Use TableCaption to describe table content for screen readers
                </li>
                <li className="text-xs">
                  • Right-align numeric columns (amounts, quantities) with
                  className=&quot;text-right&quot;
                </li>
                <li className="text-xs">
                  • Use font-medium on first column for hierarchy (IDs, names)
                </li>
                <li className="text-xs">• Add TableFooter for totals or summary rows</li>
                <li className="text-xs">
                  • Use data-state=&quot;selected&quot; for highlighting active rows
                </li>
                <li className="text-xs">
                  • Wrap in responsive container for horizontal scroll on mobile
                </li>
                <li className="text-xs">• Limit visible rows and add pagination for 50+ items</li>
                <li className="text-xs">
                  • Use consistent column widths (w-[100px] for narrow columns)
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
