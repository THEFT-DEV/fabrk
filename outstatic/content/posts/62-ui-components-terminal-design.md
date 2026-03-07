---
title: '62 UI Components: A Complete Terminal Design System'
status: 'published'
author:
  name: 'Fabrk Team'
slug: '62-ui-components-terminal-design'
description: 'Fabrk includes 62 pre-built UI components styled for terminal aesthetics. From buttons to data tables, everything is ready to use.'
publishedAt: '2026-01-31T10:00:00.000Z'
---

**62+ components. 18 themes. Zero design debt.**

---

## The Component Problem

Building UI from scratch is slow. Inconsistent. Error-prone.

Every SaaS ends up with:
- Slightly different button styles
- Inconsistent spacing
- Accessibility gaps
- Design debt that compounds over time

Fabrk solves this with 62 pre-built components that follow a unified terminal design system.

---

## Component Philosophy

Before diving into the components, understand the philosophy:

1. **Composition over configuration** - Small, focused components that combine
2. **Theme-aware by default** - Every component respects the active theme
3. **Accessibility built-in** - WCAG 2.2 AA compliance across all 18 themes
4. **Terminal aesthetics** - Monospace typography, bracket notation, chevron prefixes

---

## Component Categories

### Form Controls (62+ components)

The foundation of any SaaS application:

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputSearch } from '@/components/ui/input-search';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { DatePicker } from '@/components/ui/date-picker';
import { TimePicker } from '@/components/ui/time-picker';
import { FileUpload } from '@/components/ui/file-upload';
import { InputOTP } from '@/components/ui/input-otp';
import { Toggle } from '@/components/ui/toggle';
```

#### Button Variants

The Button component is the most used. Here are all variants:

```tsx
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Primary action
<Button className={cn(mode.radius)}>> SUBMIT</Button>

// Secondary action
<Button variant="secondary" className={cn(mode.radius)}>> CANCEL</Button>

// Destructive action
<Button variant="destructive" className={cn(mode.radius)}>> DELETE</Button>

// Outline style
<Button variant="outline" className={cn(mode.radius)}>> VIEW</Button>

// Ghost (no background)
<Button variant="ghost" className={cn(mode.radius)}>> SKIP</Button>

// Link style
<Button variant="link">> LEARN MORE</Button>

// Icon button
<Button variant="outline" size="icon" className={cn(mode.radius)}>
  <Settings className="h-4 w-4" />
</Button>

// Loading state
<Button disabled className={cn(mode.radius)}>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  PROCESSING...
</Button>
```

#### Input Components

```tsx
import { Input } from '@/components/ui/input';
import { InputSearch } from '@/components/ui/input-search';
import { Label } from '@/components/ui/label';

// Basic input with label
<div className="space-y-2">
  <Label htmlFor="email" className="text-xs text-muted-foreground">
    EMAIL
  </Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    className={cn('font-mono', mode.radius)}
  />
</div>

// Search input with icon
<InputSearch
  placeholder="Search users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className={cn(mode.radius)}
/>

// Password input with toggle
<div className="relative">
  <Input
    type={showPassword ? 'text' : 'password'}
    placeholder="Enter password"
    className={cn(mode.radius, 'pr-10')}
  />
  <Button
    variant="ghost"
    size="icon"
    className="absolute right-0 top-0"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
  </Button>
</div>
```

#### Select Component

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select value={plan} onValueChange={setPlan}>
  <SelectTrigger className={cn('w-[200px]', mode.radius)}>
    <SelectValue placeholder="Select plan" />
  </SelectTrigger>
  <SelectContent className={cn(mode.radius)}>
    <SelectItem value="free">FREE</SelectItem>
    <SelectItem value="pro">PRO - $29/mo</SelectItem>
    <SelectItem value="enterprise">ENTERPRISE</SelectItem>
  </SelectContent>
</Select>
```

---

### Layout Components (8 components)

Structure your pages:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
```

#### Card Pattern

The Card is the primary container:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

<Card className={cn('border border-border', mode.radius)}>
  <CardHeader>
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">[ ANALYTICS ]</span>
      <Badge variant="outline">LIVE</Badge>
    </div>
    <CardTitle className="text-xl font-semibold">
      MONTHLY REVENUE
    </CardTitle>
    <CardDescription>
      Track your recurring revenue over time
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-4xl font-bold text-primary">
      $12,450
    </div>
    <p className="text-xs text-muted-foreground mt-1">
      +12% from last month
    </p>
  </CardContent>
  <CardFooter className="border-t border-border pt-4">
    <Button variant="outline" className={cn('w-full', mode.radius)}>
      > VIEW DETAILS
    </Button>
  </CardFooter>
</Card>
```

#### Tabs Pattern

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs defaultValue="overview" className="w-full">
  <TabsList className={cn('w-full grid grid-cols-3', mode.radius)}>
    <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
    <TabsTrigger value="analytics">ANALYTICS</TabsTrigger>
    <TabsTrigger value="settings">SETTINGS</TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className="mt-4">
    <Card className={cn('border border-border', mode.radius)}>
      <CardContent className="pt-6">
        Overview content here
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="analytics" className="mt-4">
    Analytics content here
  </TabsContent>
  <TabsContent value="settings" className="mt-4">
    Settings content here
  </TabsContent>
</Tabs>
```

---

### Feedback Components (8 components)

Communicate with users:

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Toast, Toaster, useToast } from '@/components/ui/toast';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
```

#### Alert Patterns

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

// Success alert
<Alert className={cn('border-success/50 bg-success/10', mode.radius)}>
  <CheckCircle className="h-4 w-4 text-success" />
  <AlertTitle className="text-success">SUCCESS</AlertTitle>
  <AlertDescription>
    Your changes have been saved.
  </AlertDescription>
</Alert>

// Error alert
<Alert variant="destructive" className={cn(mode.radius)}>
  <XCircle className="h-4 w-4" />
  <AlertTitle>ERROR</AlertTitle>
  <AlertDescription>
    Failed to save changes. Please try again.
  </AlertDescription>
</Alert>

// Warning alert
<Alert className={cn('border-yellow-62/62 bg-yellow-62/62', mode.radius)}>
  <AlertTriangle className="h-4 w-4 text-yellow-500" />
  <AlertTitle className="text-yellow-500">WARNING</AlertTitle>
  <AlertDescription>
    Your trial expires in 3 days.
  </AlertDescription>
</Alert>

// Info alert
<Alert className={cn(mode.radius)}>
  <Info className="h-4 w-4" />
  <AlertTitle>NOTE</AlertTitle>
  <AlertDescription>
    This feature is in beta.
  </AlertDescription>
</Alert>
```

#### Badge Variants

```tsx
import { Badge } from '@/components/ui/badge';

// Status badges
<Badge variant="default">ACTIVE</Badge>
<Badge variant="secondary">PENDING</Badge>
<Badge variant="destructive">ERROR</Badge>
<Badge variant="outline">DRAFT</Badge>

// Custom status badges
<Badge className="bg-success/10 text-success border-success/50">
  [ONLINE]
</Badge>
<Badge className="bg-yellow-62/62 text-yellow-500 border-yellow-62/62">
  [PROCESSING]
</Badge>
```

#### Loading States

```tsx
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Progress } from '@/components/ui/progress';

// Card skeleton
<Card className={cn('border border-border', mode.radius)}>
  <CardHeader>
    <Skeleton className="h-4 w-[100px]" />
    <Skeleton className="h-6 w-[200px]" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-10 w-[150px]" />
    <Skeleton className="h-4 w-[100px] mt-2" />
  </CardContent>
</Card>

// Inline spinner
<div className="flex items-center gap-2">
  <Spinner className="h-4 w-4" />
  <span className="text-sm text-muted-foreground">Loading...</span>
</div>

// Progress bar
<div className="space-y-2">
  <div className="flex justify-between text-xs">
    <span>Uploading...</span>
    <span>67%</span>
  </div>
  <Progress value={67} className={cn('h-2', mode.radius)} />
</div>
```

---

### Navigation Components (6 components)

Help users move around:

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
```

#### Breadcrumb Pattern

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/dashboard" className="text-xs text-muted-foreground hover:text-primary">
      [ DASHBOARD ]
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator>/</BreadcrumbSeparator>
  <BreadcrumbItem>
    <BreadcrumbLink href="/dashboard/settings" className="text-xs text-muted-foreground hover:text-primary">
      [ SETTINGS ]
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator>/</BreadcrumbSeparator>
  <BreadcrumbItem>
    <span className="text-xs text-foreground">[ BILLING ]</span>
  </BreadcrumbItem>
</Breadcrumb>
```

#### Dropdown Menu Pattern

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Copy, Trash } from 'lucide-react';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" className={cn(mode.radius)}>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className={cn(mode.radius)}>
    <DropdownMenuItem className="text-xs">
      <Edit className="mr-2 h-4 w-4" />
      EDIT
    </DropdownMenuItem>
    <DropdownMenuItem className="text-xs">
      <Copy className="mr-2 h-4 w-4" />
      DUPLICATE
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-xs text-destructive">
      <Trash className="mr-2 h-4 w-4" />
      DELETE
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Overlay Components (5 components)

Modal interactions:

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
```

#### Dialog Pattern

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button className={cn(mode.radius)}>> CREATE PROJECT</Button>
  </DialogTrigger>
  <DialogContent className={cn('sm:max-w-[425px]', mode.radius)}>
    <DialogHeader>
      <span className="text-xs text-muted-foreground">[ NEW PROJECT ]</span>
      <DialogTitle className="text-xl">CREATE PROJECT</DialogTitle>
      <DialogDescription>
        Add a new project to your workspace.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-xs">NAME</Label>
        <Input id="name" placeholder="My Project" className={cn(mode.radius)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-xs">DESCRIPTION</Label>
        <Textarea id="description" placeholder="Project description..." className={cn(mode.radius)} />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline" className={cn(mode.radius)}>> CANCEL</Button>
      <Button className={cn(mode.radius)}>> CREATE</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Confirmation Dialog

```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive" className={cn(mode.radius)}>> DELETE</Button>
  </AlertDialogTrigger>
  <AlertDialogContent className={cn(mode.radius)}>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-destructive">
        CONFIRM DELETION
      </AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the
        project and all associated data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className={cn(mode.radius)}>> CANCEL</AlertDialogCancel>
      <AlertDialogAction className={cn('bg-destructive', mode.radius)}>
        > DELETE
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### Data Display Components (6 components)

Show information:

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { DataTable } from '@/components/ui/data-table';
import { Label } from '@/components/ui/label';
```

#### Data Table Pattern

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

<div className={cn('border border-border overflow-hidden', mode.radius)}>
  <Table>
    <TableHeader>
      <TableRow className="border-b border-border bg-muted/50">
        <TableHead className="text-xs font-medium text-muted-foreground">
          NAME
        </TableHead>
        <TableHead className="text-xs font-medium text-muted-foreground">
          STATUS
        </TableHead>
        <TableHead className="text-xs font-medium text-muted-foreground">
          CREATED
        </TableHead>
        <TableHead className="text-xs font-medium text-muted-foreground text-right">
          ACTIONS
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id} className="border-b border-border hover:bg-muted/50">
          <TableCell className="font-medium">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              {user.name}
            </div>
          </TableCell>
          <TableCell>
            <Badge variant={user.active ? 'default' : 'secondary'}>
              {user.active ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
          </TableCell>
          <TableCell className="text-muted-foreground">
            {formatDate(user.createdAt)}
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              {/* ... menu items */}
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
```

---

## Charts (8 Additional Components)

Beyond UI primitives, Fabrk includes 8 chart components built on Recharts:

```tsx
import { BarChart } from '@/components/charts/bar-chart';
import { LineChart } from '@/components/charts/line-chart';
import { AreaChart } from '@/components/charts/area-chart';
import { PieChart } from '@/components/charts/pie-chart';
import { DonutChart } from '@/components/charts/donut-chart';
import { FunnelChart } from '@/components/charts/funnel-chart';
import { Gauge } from '@/components/charts/gauge';
import { Sparkline } from '@/components/charts/sparkline';
```

All charts follow the terminal design system with OKLCH colors and monospace labels.

```tsx
import { BarChart } from '@/components/charts/bar-chart';

const data = [
  { month: 'Jan', revenue: 4000, users: 240 },
  { month: 'Feb', revenue: 3000, users: 198 },
  { month: 'Mar', revenue: 5000, users: 300 },
  { month: 'Apr', revenue: 4500, users: 278 },
];

<Card className={cn('border border-border', mode.radius)}>
  <CardHeader>
    <span className="text-xs text-muted-foreground">[ REVENUE ]</span>
    <CardTitle>MONTHLY REVENUE</CardTitle>
  </CardHeader>
  <CardContent>
    <BarChart
      data={data}
      index="month"
      categories={['revenue']}
      colors={['primary']}
      valueFormatter={(value) => `$${value.toLocaleString()}`}
      className="h-[300px]"
    />
  </CardContent>
</Card>
```

---

## The mode Object

All components use the `mode` object for theme-aware styling:

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// mode.radius - Dynamic border radius (sharp in some themes, rounded in others)
<Card className={cn('border border-border', mode.radius)}>

// mode.font - Monospace font
<span className={mode.font}>Terminal text</span>

// mode.color.bg.* - Background tokens
<div className={mode.color.bg.primary}>Primary background</div>

// mode.color.text.* - Text color tokens
<span className={mode.color.text.muted}>Muted text</span>

// mode.color.border.* - Border color tokens
<div className={mode.color.border.default}>Border</div>

// mode.spacing.* - Spacing tokens
<div className={mode.spacing.md}>16px padding</div>
```

---

## Design Tokens

Every component uses design tokens, never hardcoded colors:

```tsx
// CORRECT - uses design tokens
<Button className="bg-primary text-primary-foreground" />
<div className="bg-card border-border" />
<span className="text-muted-foreground" />

// WRONG - hardcoded colors break themes
<Button className="bg-purple-500 text-white" />
<div className="bg-gray-900 border-gray-700" />
<span className="text-gray-500" />
```

---

## Terminal Styling Conventions

Components follow terminal conventions:

| Element | Convention | Example |
|---------|------------|---------|
| Labels | UPPERCASE in brackets | `[ STATUS ]` |
| Buttons | UPPERCASE with prefix | `> SUBMIT` |
| Typography | Monospace via `mode.font` | `font-mono` |
| Borders | Dynamic radius via `mode.radius` | `rounded-dynamic` |
| Headers | UPPERCASE | `DASHBOARD` |
| Body text | Sentence case | "Welcome to your dashboard." |

---

## Accessibility

All 62+ components are:

- **WCAG 2.2 AA compliant** - Tested across all 18 themes
- **Keyboard navigable** - Tab, Enter, Space, Arrow keys
- **Screen reader compatible** - Proper ARIA attributes
- **Focus-visible styled** - Clear focus indicators

Accessibility is built-in, not bolted on.

---

## Rule #1

**Never build UI from scratch.**

Before creating any element, check `src/components/ui/` first. The component you need probably exists.

```bash
# List all available components
ls src/components/ui/
ls src/components/charts/
```

---

## Customization

Need to modify a component? Extend, don't replace:

```tsx
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
}

export function PrimaryButton({ className, loading, children, ...props }: PrimaryButtonProps) {
  return (
    <Button
      className={cn('bg-primary text-primary-foreground', mode.radius, className)}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          LOADING...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
```

The base components remain untouched.

---

## Component Composition

Build complex UIs by composing simple components:

```tsx
// A complete user management card
export function UserCard({ user }: { user: User }) {
  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-sm">{user.name}</CardTitle>
          <CardDescription className="text-xs">{user.email}</CardDescription>
        </div>
        <Badge variant={user.active ? 'default' : 'secondary'}>
          {user.active ? 'ACTIVE' : 'INACTIVE'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{user.projects}</div>
            <div className="text-xs text-muted-foreground">PROJECTS</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{user.tasks}</div>
            <div className="text-xs text-muted-foreground">TASKS</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{user.hours}h</div>
            <div className="text-xs text-muted-foreground">LOGGED</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-4 gap-2">
        <Button variant="outline" size="sm" className={cn('flex-1', mode.radius)}>
          > MESSAGE
        </Button>
        <Button size="sm" className={cn('flex-1', mode.radius)}>
          > VIEW PROFILE
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## Getting Started

1. **Browse available components** in `src/components/ui/`
2. **Import what you need** from the component library
3. **Apply `mode.radius` and `mode.font`** for terminal styling
4. **Use design tokens** for colors - never hardcode
5. **Compose components** to build complex UIs

62+ components. Zero decisions. Ship faster.
