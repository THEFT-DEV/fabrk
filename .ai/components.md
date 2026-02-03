# Component Inventory

> AI: Before creating ANY UI element, check this list. Use existing components.

## How to Read This Document

Each component includes:
- **Import**: How to import it
- **When to Use**: Correct use cases
- **When NOT to Use**: Common mistakes
- **Example**: Correct usage

---

## Buttons

### Button

**Import:**
```tsx
import { Button } from "@/components/ui/button"
```

**When to Use:**
- Any clickable action
- Form submissions
- Navigation that looks like an action

**When NOT to Use:**
- Navigation links (use `Link` from next/link with `asChild`)
- Don't build custom buttons with `<button>` or `<div>`

**Variants:**
- `default` - Primary actions (save, submit, confirm)
- `secondary` - Secondary actions (cancel, back)
- `destructive` - Dangerous actions (delete, remove)
- `outline` - Tertiary actions, less emphasis
- `ghost` - Minimal actions, icon buttons
- `link` - Text-only actions

**Sizes:**
- `default` - Standard size
- `sm` - Compact UI, tables
- `lg` - Hero sections, CTAs
- `icon` - Icon-only buttons

**Example:**
```tsx
// Primary action (terminal style with > prefix)
<Button>&gt; SAVE CHANGES</Button>

// Secondary action
<Button variant="secondary">&gt; CANCEL</Button>

// Destructive action
<Button variant="destructive">&gt; DELETE ACCOUNT</Button>

// With icon
<Button>
  <PlusIcon className="mr-2 size-4" />
  &gt; ADD ITEM
</Button>

// Icon only
<Button variant="ghost" size="icon" aria-label="Settings">
  <SettingsIcon className="size-4" />
</Button>

// Loading state
<Button disabled>
  <TerminalSpinner className="mr-2" />
  SAVING...
</Button>

// As Link
<Button asChild>
  <Link href="/dashboard">&gt; GO TO DASHBOARD</Link>
</Button>
```

**WRONG:**
```tsx
// Don't do this
<button className="px-4 py-2 bg-green-500 text-white rounded">
  Save
</button>
```

---

## Form Components

### Input

**Import:**
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
```

**When to Use:**
- Text input fields
- Email, password, number inputs (use specialized variants)
- Search fields (use InputSearch)

**When NOT to Use:**
- Multi-line text (use `Textarea`)
- Selection from options (use `Select`)
- Password fields (use `InputPassword`)
- Search fields (use `InputSearch`)

**Example:**
```tsx
<div className="space-y-2">
  <Label htmlFor="email">EMAIL</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
  />
</div>
```

**WRONG:**
```tsx
<input
  type="email"
  className="w-full px-3 py-2 border border-gray-300 rounded"
/>
```

---

### InputSearch

**Import:**
```tsx
import { InputSearch } from "@/components/ui/input-search"
```

**When to Use:**
- Search functionality
- Filtering lists

**Example:**
```tsx
<InputSearch
  placeholder="SEARCH..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

---

### InputPassword

**Import:**
```tsx
import { InputPassword } from "@/components/ui/input-password"
```

**When to Use:**
- Password fields with show/hide toggle

**Example:**
```tsx
<InputPassword
  id="password"
  placeholder="Enter password"
/>
```

---

### InputNumber

**Import:**
```tsx
import { InputNumber } from "@/components/ui/input-number"
```

**When to Use:**
- Numeric inputs with increment/decrement controls

---

### Select

**Import:**
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

**When to Use:**
- Choosing from a list of options
- Dropdown menus for forms

**When NOT to Use:**
- Don't use native `<select>`
- Don't build custom dropdowns

**Example:**
```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="SELECT OPTION" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">APPLE</SelectItem>
    <SelectItem value="banana">BANANA</SelectItem>
    <SelectItem value="orange">ORANGE</SelectItem>
  </SelectContent>
</Select>
```

---

### Checkbox

**Import:**
```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

**Example:**
```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

---

### Switch

**Import:**
```tsx
import { Switch } from "@/components/ui/switch"
```

**When to Use:**
- Toggle settings on/off
- Binary choices with immediate effect

**Example:**
```tsx
<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

---

### Textarea

**Import:**
```tsx
import { Textarea } from "@/components/ui/textarea"
```

**When to Use:**
- Multi-line text input
- Comments, descriptions, messages

**Example:**
```tsx
<Textarea placeholder="Type your message here..." />
```

---

### Form (with react-hook-form)

**Import:**
```tsx
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
```

**Example:**
```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: { email: "" },
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>EMAIL</FormLabel>
          <FormControl>
            <Input placeholder="you@example.com" {...field} />
          </FormControl>
          <FormDescription>
            We'll never share your email.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">&gt; SUBMIT</Button>
  </form>
</Form>
```

---

## Layout Components

### Card

**Import:**
```tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
} from "@/components/ui/card"
```

**When to Use:**
- Grouping related content
- Dashboard widgets
- Feature highlights
- Form containers

**Structure:**
```tsx
<Card className={cn("border border-border", mode.radius)}>
  <CardHeader code="0x01" title="CARD_TITLE" />
  <CardContent padding="md">
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

**With Badge:**
```tsx
<Badge code="0x00" label="STATUS" meta="ADDITIONAL_INFO" />
```

**WRONG:**
```tsx
<div className="rounded-lg border bg-white p-6 shadow">
  <h3 className="text-lg font-semibold">Title</h3>
</div>
```

---

### Container

**Import:**
```tsx
import { Container } from "@/components/ui/container"
```

**When to Use:**
- Wrapping page content
- Centering content with max-width

**Example:**
```tsx
<Container>
  <h1>PAGE TITLE</h1>
  <p>Page content...</p>
</Container>
```

---

## Feedback Components

### Toast

**Import:**
```tsx
import { useToast } from "@/hooks/use-toast"
```

**When to Use:**
- Success confirmations
- Error notifications
- Non-blocking feedback

**Example:**
```tsx
const { toast } = useToast()

// Success
toast({
  title: "SUCCESS",
  description: "Your changes have been saved.",
})

// Error
toast({
  variant: "destructive",
  title: "ERROR",
  description: "Something went wrong.",
})
```

**WRONG:**
```tsx
alert("Success!")
{showSuccess && <div className="bg-green-100 p-4">Success!</div>}
```

---

### Alert

**Import:**
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
```

**When to Use:**
- Inline notifications
- Form errors
- Page-level messages

**Variants:**
- `default` - Informational
- `destructive` - Errors

**Example:**
```tsx
<Alert>
  <AlertTitle>HEADS UP</AlertTitle>
  <AlertDescription>
    You can add components using the CLI.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>ERROR</AlertTitle>
  <AlertDescription>
    Your session has expired.
  </AlertDescription>
</Alert>
```

---

### Dialog / Modal

**Import:**
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
```

**When to Use:**
- Confirmation dialogs
- Forms that overlay the page
- Critical information

**Example:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>&gt; OPEN DIALOG</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>CONFIRM ACTION</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary">&gt; CANCEL</Button>
      <Button>&gt; CONFIRM</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### AlertDialog

**Import:**
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

**When to Use:**
- Destructive confirmations
- Actions that cannot be undone

**Example:**
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">&gt; DELETE</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>ARE YOU SURE?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive">&gt; DELETE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## Data Display

### Table

**Import:**
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
```

**Example:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>NAME</TableHead>
      <TableHead>EMAIL</TableHead>
      <TableHead>STATUS</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>
        <Badge variant="success">ACTIVE</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### Badge

**Import:**
```tsx
import { Badge } from "@/components/ui/badge"
```

**When to Use:**
- Status indicators
- Tags, labels
- Counts

**Variants:**
- `default` - Neutral
- `secondary` - Muted
- `destructive` - Error/negative
- `outline` - Subtle
- `success` - Positive

**Example:**
```tsx
<Badge>NEW</Badge>
<Badge variant="secondary">DRAFT</Badge>
<Badge variant="destructive">OVERDUE</Badge>
<Badge variant="success">ACTIVE</Badge>
```

---

### Avatar

**Import:**
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
```

**Example:**
```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

### Skeleton

**Import:**
```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

**When to Use:**
- Loading states
- Content placeholders

**Example:**
```tsx
<div className="space-y-4">
  <Skeleton className="h-8 w-[200px]" />
  <Skeleton className="h-4 w-[300px]" />
  <Skeleton className="h-4 w-[250px]" />
</div>
```

---

### EmptyState

**Import:**
```tsx
import { EmptyState } from "@/components/ui/empty-state"
```

**When to Use:**
- No data to display
- First-time user experience

---

## Navigation

### Tabs

**Import:**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

**Example:**
```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">ACCOUNT</TabsTrigger>
    <TabsTrigger value="password">PASSWORD</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings...</TabsContent>
  <TabsContent value="password">Password settings...</TabsContent>
</Tabs>
```

---

### StyledTabs (Terminal Style)

**Import:**
```tsx
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs"
```

**When to Use:**
- Terminal-styled tabbed interfaces
- Code preview/code toggle

**Example:**
```tsx
<StyledTabs
  code="0x00"
  title="SECTION_TITLE"
  tabs={[
    { id: 'preview', label: '[PREVIEW]' },
    { id: 'code', label: '[CODE]' },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
>
  <StyledTabsContent value="preview">
    Preview content...
  </StyledTabsContent>
  <StyledTabsContent value="code">
    Code content...
  </StyledTabsContent>
</StyledTabs>
```

---

### DropdownMenu

**Import:**
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
```

**Example:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontalIcon className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>ACTIONS</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>EDIT</DropdownMenuItem>
    <DropdownMenuItem>DUPLICATE</DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">DELETE</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Breadcrumb

**Import:**
```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
```

**Example:**
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">HOME</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">DOCS</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>COMPONENTS</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

## Charts (`@/components/charts/`)

### BarChart

```tsx
import { BarChart } from "@/components/charts/bar-chart"

<BarChart
  data={data}
  index="month"
  categories={["revenue", "expenses"]}
/>
```

### LineChart

```tsx
import { LineChart } from "@/components/charts/line-chart"

<LineChart
  data={data}
  index="date"
  categories={["users", "sessions"]}
/>
```

### AreaChart

```tsx
import { AreaChart } from "@/components/charts/area-chart"
```

### DonutChart

```tsx
import { DonutChart } from "@/components/charts/donut-chart"
```

### PieChart

```tsx
import { PieChart } from "@/components/charts/pie-chart"
```

### FunnelChart

```tsx
import { FunnelChart } from "@/components/charts/funnel-chart"
```

### Gauge

```tsx
import { Gauge } from "@/components/charts/gauge"
```

### Sparkline

```tsx
import { Sparkline } from "@/components/charts/sparkline"
```

---

## Loading States

### TerminalSpinner

**Import:**
```tsx
import { TerminalSpinner } from "@/components/ui/terminal-spinner"
```

**Example:**
```tsx
<TerminalSpinner />
<TerminalSpinner className="size-6" />
```

### Loading

**Import:**
```tsx
import { Loading } from "@/components/ui/loading"
```

### Typewriter

**Import:**
```tsx
import { Typewriter } from "@/components/ui/typewriter"
```

**When to Use:**
- Terminal-style typing animation
- Loading messages

---

## Utility Components

### Tooltip

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Popover

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
```

### Sheet (Side Panel)

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
```

### Separator

```tsx
import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />
```

### Progress

```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={66} />
```

### ScrollArea

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
```

### CodeBlock

```tsx
import { CodeBlock } from "@/components/ui/code-block"

<CodeBlock code={codeString} language="tsx" />
```
