/**
 * Fabrk Component Catalog
 * Metadata for all 77 UI components
 */

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface ComponentVariant {
  name: string;
  value: string;
  description: string;
  example: string;
}

export interface ComponentMetadata {
  name: string;
  slug: string;
  category: 'form' | 'display' | 'navigation' | 'data' | 'chart' | 'feedback' | 'layout';
  description: string;
  import: string;
  props: ComponentProp[];
  variants?: ComponentVariant[];
  examples: { title: string; code: string }[];
  accessibility: string[];
  designNotes: string[];
}

export const componentCatalog: ComponentMetadata[] = [
  // ============================================================
  // FORM COMPONENTS
  // ============================================================
  {
    name: 'Button',
    slug: 'button',
    category: 'form',
    description: 'Interactive button with loading state and terminal styling',
    import: "import { Button } from '@/components/ui/button'",
    props: [
      {
        name: 'variant',
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        required: false,
        default: '"default"',
        description: 'Visual style variant',
      },
      {
        name: 'size',
        type: '"default" | "sm" | "lg" | "xl" | "icon"',
        required: false,
        default: '"default"',
        description: 'Button size',
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        description: 'Show loading spinner',
      },
      {
        name: 'loadingText',
        type: 'string',
        required: false,
        default: '"> LOADING..."',
        description: 'Text shown during loading',
      },
      {
        name: 'asChild',
        type: 'boolean',
        required: false,
        description: 'Render as child component (for links)',
      },
    ],
    variants: [
      {
        name: 'default',
        value: 'default',
        description: 'Primary purple CTA',
        example: '<Button>> GET_STARTED</Button>',
      },
      {
        name: 'destructive',
        value: 'destructive',
        description: 'Red danger action',
        example: '<Button variant="destructive">> DELETE</Button>',
      },
      {
        name: 'outline',
        value: 'outline',
        description: 'Bordered button',
        example: '<Button variant="outline">> CANCEL</Button>',
      },
      {
        name: 'ghost',
        value: 'ghost',
        description: 'Minimal button',
        example: '<Button variant="ghost">> LEARN_MORE</Button>',
      },
    ],
    examples: [
      { title: 'Basic', code: '<Button>> CLICK_ME</Button>' },
      { title: 'Loading', code: '<Button loading loadingText="> SAVING...">> SAVE</Button>' },
      { title: 'With Icon', code: '<Button><Plus className="mr-2 h-4 w-4" /> ADD_ITEM</Button>' },
    ],
    accessibility: [
      'Supports aria-busy during loading state',
      'Min touch target 44px on mobile (WCAG 2.1 AA)',
      'Focus visible ring for keyboard navigation',
    ],
    designNotes: [
      'Always prefix button text with "> "',
      'Use UPPERCASE for button labels',
      'Use rounded-none (terminal aesthetic)',
    ],
  },

  {
    name: 'Input',
    slug: 'input',
    category: 'form',
    description: 'Text input with validation states',
    import: "import { Input } from '@/components/ui/input'",
    props: [
      { name: 'type', type: 'string', required: false, default: '"text"', description: 'Input type' },
      { name: 'error', type: 'boolean', required: false, description: 'Show error state' },
      { name: 'success', type: 'boolean', required: false, description: 'Show success state' },
      { name: 'disabled', type: 'boolean', required: false, description: 'Disable input' },
    ],
    examples: [
      { title: 'Basic', code: '<Input placeholder="Enter text..." />' },
      { title: 'With Error', code: '<Input error placeholder="Invalid input" />' },
    ],
    accessibility: ['Supports aria-invalid for error state', 'Associates with label via htmlFor'],
    designNotes: ['Use rounded-none', 'Use font-mono', 'Border uses border-border token'],
  },

  {
    name: 'Select',
    slug: 'select',
    category: 'form',
    description: 'Dropdown select component',
    import:
      "import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'",
    props: [
      { name: 'value', type: 'string', required: false, description: 'Selected value' },
      { name: 'onValueChange', type: '(value: string) => void', required: false, description: 'Change handler' },
      { name: 'disabled', type: 'boolean', required: false, description: 'Disable select' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>`,
      },
    ],
    accessibility: ['Full keyboard navigation', 'ARIA listbox pattern'],
    designNotes: ['Use rounded-none on trigger and content', 'Font-mono throughout'],
  },

  {
    name: 'Checkbox',
    slug: 'checkbox',
    category: 'form',
    description: 'Checkbox input component',
    import: "import { Checkbox } from '@/components/ui/checkbox'",
    props: [
      { name: 'checked', type: 'boolean', required: false, description: 'Checked state' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', required: false, description: 'Change handler' },
      { name: 'disabled', type: 'boolean', required: false, description: 'Disable checkbox' },
    ],
    examples: [
      {
        title: 'With Label',
        code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="font-mono text-sm">Accept terms</label>
</div>`,
      },
    ],
    accessibility: ['Supports aria-checked', 'Associates with label'],
    designNotes: ['Use rounded-none', 'Check icon uses primary color'],
  },

  {
    name: 'Switch',
    slug: 'switch',
    category: 'form',
    description: 'Toggle switch component',
    import: "import { Switch } from '@/components/ui/switch'",
    props: [
      { name: 'checked', type: 'boolean', required: false, description: 'Checked state' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', required: false, description: 'Change handler' },
      { name: 'disabled', type: 'boolean', required: false, description: 'Disable switch' },
    ],
    examples: [
      {
        title: 'With Label',
        code: `<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <label htmlFor="notifications" className="font-mono text-sm">Enable notifications</label>
</div>`,
      },
    ],
    accessibility: ['Supports aria-checked', 'Keyboard toggle with Space'],
    designNotes: ['Rounded track (exception to rounded-none rule)', 'Primary color when checked'],
  },

  {
    name: 'Textarea',
    slug: 'textarea',
    category: 'form',
    description: 'Multi-line text input',
    import: "import { Textarea } from '@/components/ui/textarea'",
    props: [
      { name: 'rows', type: 'number', required: false, default: '3', description: 'Number of rows' },
      { name: 'error', type: 'boolean', required: false, description: 'Show error state' },
    ],
    examples: [{ title: 'Basic', code: '<Textarea placeholder="Enter message..." rows={4} />' }],
    accessibility: ['Supports aria-invalid for error state'],
    designNotes: ['Use rounded-none', 'Use font-mono', 'Resize handle visible'],
  },

  // ============================================================
  // DISPLAY COMPONENTS
  // ============================================================
  {
    name: 'Card',
    slug: 'card',
    category: 'display',
    description: 'Container component with terminal header',
    import: "import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'",
    props: [
      { name: 'code', type: 'string', required: false, description: 'Hex code for header (e.g., "0x00")' },
      { name: 'title', type: 'string', required: false, description: 'Header title (uppercase)' },
    ],
    examples: [
      {
        title: 'With Header',
        code: `<Card>
  <CardHeader code="0x00" title="SECTION_TITLE" />
  <CardContent>
    <p className="font-mono text-sm">Content goes here</p>
  </CardContent>
</Card>`,
      },
    ],
    accessibility: ['Semantic structure with header/content/footer'],
    designNotes: [
      'Use rounded-none',
      'Header format: [ [0xXX] TITLE ]',
      'Border uses border-border token',
    ],
  },

  {
    name: 'Badge',
    slug: 'badge',
    category: 'display',
    description: 'Status badge component',
    import: "import { Badge } from '@/components/ui/badge'",
    props: [
      {
        name: 'variant',
        type: '"default" | "secondary" | "destructive" | "outline"',
        required: false,
        default: '"default"',
        description: 'Badge variant',
      },
    ],
    variants: [
      { name: 'default', value: 'default', description: 'Primary badge', example: '<Badge>[ACTIVE]</Badge>' },
      {
        name: 'destructive',
        value: 'destructive',
        description: 'Error badge',
        example: '<Badge variant="destructive">[ERROR]</Badge>',
      },
      {
        name: 'outline',
        value: 'outline',
        description: 'Bordered badge',
        example: '<Badge variant="outline">[PENDING]</Badge>',
      },
    ],
    examples: [{ title: 'Status Badge', code: '<Badge variant="outline">[STATUS]</Badge>' }],
    accessibility: ['Use aria-label if badge contains only icon'],
    designNotes: ['Use UPPERCASE text in brackets', 'Use rounded-none', 'Font-mono, text-xs'],
  },

  {
    name: 'Avatar',
    slug: 'avatar',
    category: 'display',
    description: 'User avatar with fallback',
    import: "import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'",
    props: [
      { name: 'src', type: 'string', required: false, description: 'Image source URL' },
      { name: 'alt', type: 'string', required: false, description: 'Alt text for image' },
    ],
    examples: [
      {
        title: 'With Fallback',
        code: `<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
      },
    ],
    accessibility: ['Alt text required for images', 'Fallback shows initials'],
    designNotes: ['Rounded-full (exception for avatars)', 'Fallback uses muted background'],
  },

  {
    name: 'Alert',
    slug: 'alert',
    category: 'display',
    description: 'Alert message component',
    import: "import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'",
    props: [
      {
        name: 'variant',
        type: '"default" | "destructive" | "success" | "warning"',
        required: false,
        default: '"default"',
        description: 'Alert variant',
      },
    ],
    examples: [
      {
        title: 'Error Alert',
        code: `<Alert variant="destructive">
  <AlertTitle>[ERROR]</AlertTitle>
  <AlertDescription>Something went wrong</AlertDescription>
</Alert>`,
      },
    ],
    accessibility: ['Use role="alert" for important messages'],
    designNotes: ['Use rounded-none', 'Title in brackets uppercase'],
  },

  {
    name: 'Skeleton',
    slug: 'skeleton',
    category: 'display',
    description: 'Loading placeholder',
    import: "import { Skeleton } from '@/components/ui/skeleton'",
    props: [
      { name: 'className', type: 'string', required: false, description: 'Size/shape classes' },
    ],
    examples: [
      { title: 'Text Skeleton', code: '<Skeleton className="h-4 w-[200px]" />' },
      { title: 'Circle Skeleton', code: '<Skeleton className="h-12 w-12 rounded-full" />' },
    ],
    accessibility: ['Use aria-busy on parent container'],
    designNotes: ['Use rounded-none for rectangles', 'Animate pulse'],
  },

  {
    name: 'Progress',
    slug: 'progress',
    category: 'display',
    description: 'Progress bar component',
    import: "import { Progress } from '@/components/ui/progress'",
    props: [
      { name: 'value', type: 'number', required: false, default: '0', description: 'Progress value (0-100)' },
    ],
    examples: [{ title: 'Basic', code: '<Progress value={60} />' }],
    accessibility: ['Uses role="progressbar"', 'aria-valuenow, aria-valuemin, aria-valuemax'],
    designNotes: ['Use rounded-none', 'Primary color for filled portion'],
  },

  // ============================================================
  // NAVIGATION COMPONENTS
  // ============================================================
  {
    name: 'Tabs',
    slug: 'tabs',
    category: 'navigation',
    description: 'Tab navigation component',
    import: "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'",
    props: [
      { name: 'defaultValue', type: 'string', required: false, description: 'Default active tab' },
      { name: 'value', type: 'string', required: false, description: 'Controlled active tab' },
      { name: 'onValueChange', type: '(value: string) => void', required: false, description: 'Change handler' },
    ],
    examples: [
      {
        title: 'Basic Tabs',
        code: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">[TAB_1]</TabsTrigger>
    <TabsTrigger value="tab2">[TAB_2]</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
      },
    ],
    accessibility: ['Full keyboard navigation', 'ARIA tablist pattern'],
    designNotes: ['Use rounded-none', 'Tab labels in brackets uppercase'],
  },

  {
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    category: 'navigation',
    description: 'Breadcrumb navigation',
    import:
      "import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'",
    props: [],
    examples: [
      {
        title: 'Basic',
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    ],
    accessibility: ['Uses nav with aria-label="breadcrumb"'],
    designNotes: ['Use / or > as separator', 'Font-mono throughout'],
  },

  {
    name: 'Pagination',
    slug: 'pagination',
    category: 'navigation',
    description: 'Pagination controls',
    import:
      "import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination'",
    props: [],
    examples: [
      {
        title: 'Basic',
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      },
    ],
    accessibility: ['Uses nav with aria-label="pagination"'],
    designNotes: ['Use rounded-none on buttons', 'Font-mono for page numbers'],
  },

  // ============================================================
  // DATA COMPONENTS
  // ============================================================
  {
    name: 'Table',
    slug: 'table',
    category: 'data',
    description: 'HTML table component',
    import:
      "import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'",
    props: [],
    examples: [
      {
        title: 'Basic Table',
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NAME</TableHead>
      <TableHead>STATUS</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item 1</TableCell>
      <TableCell>[ACTIVE]</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
    ],
    accessibility: ['Semantic table structure', 'Use scope on headers'],
    designNotes: ['Font-mono throughout', 'Headers uppercase', 'Border-border for lines'],
  },

  {
    name: 'DataTable',
    slug: 'data-table',
    category: 'data',
    description: 'Advanced data table with sorting, filtering, pagination',
    import: "import { DataTable } from '@/components/ui/data-table'",
    props: [
      { name: 'columns', type: 'ColumnDef[]', required: true, description: 'Column definitions' },
      { name: 'data', type: 'T[]', required: true, description: 'Table data' },
      { name: 'searchKey', type: 'string', required: false, description: 'Column key for search' },
    ],
    examples: [
      {
        title: 'With Search',
        code: `<DataTable
  columns={columns}
  data={users}
  searchKey="email"
/>`,
      },
    ],
    accessibility: ['Sortable columns have aria-sort', 'Keyboard navigation'],
    designNotes: ['Uses TanStack Table', 'Terminal styling throughout'],
  },

  // ============================================================
  // CHART COMPONENTS
  // ============================================================
  {
    name: 'BarChart',
    slug: 'bar-chart',
    category: 'chart',
    description: 'Bar chart visualization',
    import: "import { BarChart } from '@/components/ui/bar-chart'",
    props: [
      { name: 'data', type: 'BarChartDataPoint[]', required: true, description: 'Chart data' },
      { name: 'xAxisKey', type: 'string', required: true, description: 'X-axis data key' },
      { name: 'series', type: 'BarChartSeries[]', required: true, description: 'Data series config' },
      { name: 'height', type: 'number', required: false, default: '300', description: 'Chart height' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<BarChart
  data={[
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 200 },
  ]}
  xAxisKey="month"
  series={[{ dataKey: 'value', name: 'Revenue' }]}
/>`,
      },
    ],
    accessibility: ['Includes chart description for screen readers'],
    designNotes: ['Uses theme chart colors', 'Font-mono for labels'],
  },

  {
    name: 'LineChart',
    slug: 'line-chart',
    category: 'chart',
    description: 'Line chart visualization',
    import: "import { LineChart } from '@/components/ui/line-chart'",
    props: [
      { name: 'data', type: 'LineChartDataPoint[]', required: true, description: 'Chart data' },
      { name: 'xAxisKey', type: 'string', required: true, description: 'X-axis data key' },
      { name: 'series', type: 'LineChartSeries[]', required: true, description: 'Data series config' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<LineChart
  data={[
    { month: 'Jan', users: 100 },
    { month: 'Feb', users: 150 },
  ]}
  xAxisKey="month"
  series={[{ dataKey: 'users', name: 'Active Users' }]}
/>`,
      },
    ],
    accessibility: ['Includes chart description for screen readers'],
    designNotes: ['Uses theme chart colors', 'Font-mono for labels'],
  },

  {
    name: 'DonutChart',
    slug: 'donut-chart',
    category: 'chart',
    description: 'Donut/pie chart visualization',
    import: "import { DonutChart } from '@/components/ui/donut-chart'",
    props: [
      { name: 'data', type: 'DonutChartDataPoint[]', required: true, description: 'Chart data' },
      { name: 'dataKey', type: 'string', required: true, description: 'Value data key' },
      { name: 'nameKey', type: 'string', required: true, description: 'Label data key' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<DonutChart
  data={[
    { name: 'Desktop', value: 60 },
    { name: 'Mobile', value: 40 },
  ]}
  dataKey="value"
  nameKey="name"
/>`,
      },
    ],
    accessibility: ['Includes legend for accessibility'],
    designNotes: ['Uses theme chart colors', 'Center hole for donut style'],
  },

  // ============================================================
  // FEEDBACK COMPONENTS
  // ============================================================
  {
    name: 'Dialog',
    slug: 'dialog',
    category: 'feedback',
    description: 'Modal dialog component',
    import:
      "import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'",
    props: [
      { name: 'open', type: 'boolean', required: false, description: 'Controlled open state' },
      { name: 'onOpenChange', type: '(open: boolean) => void', required: false, description: 'Open change handler' },
    ],
    examples: [
      {
        title: 'Basic Dialog',
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button>> OPEN_DIALOG</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>[DIALOG_TITLE]</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>> CONFIRM</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
    accessibility: ['Focus trapped inside dialog', 'ESC closes dialog', 'aria-modal="true"'],
    designNotes: ['Use rounded-none', 'Title in brackets uppercase', 'Overlay darkens background'],
  },

  {
    name: 'Sheet',
    slug: 'sheet',
    category: 'feedback',
    description: 'Side sheet/drawer component',
    import:
      "import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'",
    props: [
      { name: 'side', type: '"top" | "bottom" | "left" | "right"', required: false, default: '"right"', description: 'Sheet position' },
    ],
    examples: [
      {
        title: 'Right Sheet',
        code: `<Sheet>
  <SheetTrigger asChild>
    <Button>> OPEN_MENU</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>[MENU]</SheetTitle>
    </SheetHeader>
    {/* Content */}
  </SheetContent>
</Sheet>`,
      },
    ],
    accessibility: ['Focus trapped', 'ESC closes sheet'],
    designNotes: ['Use rounded-none', 'Slides in from specified side'],
  },

  {
    name: 'Toast',
    slug: 'toast',
    category: 'feedback',
    description: 'Toast notification',
    import: "import { toast } from '@/components/ui/toast'",
    props: [
      { name: 'title', type: 'string', required: false, description: 'Toast title' },
      { name: 'description', type: 'string', required: false, description: 'Toast description' },
      { name: 'variant', type: '"default" | "destructive"', required: false, description: 'Toast variant' },
    ],
    examples: [
      {
        title: 'Success Toast',
        code: `toast({
  title: "[SUCCESS]",
  description: "Operation completed",
})`,
      },
      {
        title: 'Error Toast',
        code: `toast({
  title: "[ERROR]",
  description: "Something went wrong",
  variant: "destructive",
})`,
      },
    ],
    accessibility: ['Uses role="alert"', 'Auto-dismisses'],
    designNotes: ['Title in brackets uppercase', 'Use rounded-none'],
  },

  {
    name: 'Tooltip',
    slug: 'tooltip',
    category: 'feedback',
    description: 'Tooltip overlay',
    import:
      "import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'",
    props: [
      { name: 'delayDuration', type: 'number', required: false, default: '400', description: 'Delay before showing' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Helpful information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
    ],
    accessibility: ['Uses aria-describedby', 'Keyboard accessible'],
    designNotes: ['Use rounded-none', 'Font-mono, text-xs'],
  },

  // ============================================================
  // LAYOUT COMPONENTS
  // ============================================================
  {
    name: 'Separator',
    slug: 'separator',
    category: 'layout',
    description: 'Visual separator/divider',
    import: "import { Separator } from '@/components/ui/separator'",
    props: [
      { name: 'orientation', type: '"horizontal" | "vertical"', required: false, default: '"horizontal"', description: 'Separator direction' },
    ],
    examples: [
      { title: 'Horizontal', code: '<Separator />' },
      { title: 'Vertical', code: '<Separator orientation="vertical" className="h-4" />' },
    ],
    accessibility: ['Uses role="separator"'],
    designNotes: ['Uses border-border color', '1px width'],
  },

  {
    name: 'ScrollArea',
    slug: 'scroll-area',
    category: 'layout',
    description: 'Custom scrollbar area',
    import: "import { ScrollArea } from '@/components/ui/scroll-area'",
    props: [
      { name: 'className', type: 'string', required: false, description: 'Container classes' },
    ],
    examples: [
      {
        title: 'Vertical Scroll',
        code: `<ScrollArea className="h-[200px]">
  {/* Long content */}
</ScrollArea>`,
      },
    ],
    accessibility: ['Keyboard scrollable', 'Touch scrollable'],
    designNotes: ['Custom scrollbar styling', 'Minimal scrollbar width'],
  },

  {
    name: 'Accordion',
    slug: 'accordion',
    category: 'layout',
    description: 'Collapsible accordion sections',
    import:
      "import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'",
    props: [
      { name: 'type', type: '"single" | "multiple"', required: false, default: '"single"', description: 'Single or multiple open' },
      { name: 'collapsible', type: 'boolean', required: false, description: 'Allow all closed' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>[SECTION_1]</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
    ],
    accessibility: ['Full keyboard navigation', 'ARIA expanded state'],
    designNotes: ['Trigger text in brackets', 'Chevron rotates on expand'],
  },
];

// Helper to find component by slug or name
export function findComponent(query: string): ComponentMetadata | undefined {
  const normalized = query.toLowerCase().replace(/[-_\s]/g, '');
  return componentCatalog.find(
    (c) =>
      c.slug === query ||
      c.name.toLowerCase() === query.toLowerCase() ||
      c.name.toLowerCase().replace(/[-_\s]/g, '') === normalized
  );
}

// Get components by category
export function getComponentsByCategory(category: ComponentMetadata['category']): ComponentMetadata[] {
  return componentCatalog.filter((c) => c.category === category);
}
