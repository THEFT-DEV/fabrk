# Common UI Patterns

> AI: When asked to build these patterns, follow these exact implementations.

---

## Pattern 1: Page Header

```tsx
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<div className="space-y-2">
  <h1 className={cn("text-3xl font-semibold tracking-tight", mode.font)}>
    PAGE TITLE
  </h1>
  <p className={cn(mode.color.text.muted, mode.typography.body.m)}>
    Page description goes here.
  </p>
</div>
```

---

## Pattern 2: Page with Header and Actions

```tsx
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<div className="space-y-6">
  <div className="flex items-center justify-between">
    <div className="space-y-1">
      <h1 className={cn("text-3xl font-semibold tracking-tight", mode.font)}>
        USERS
      </h1>
      <p className={cn(mode.color.text.muted, mode.typography.body.m)}>
        Manage your team members.
      </p>
    </div>
    <Button>
      <PlusIcon className="mr-2 size-4" />
      &gt; ADD USER
    </Button>
  </div>

  {/* Page content */}
</div>
```

---

## Pattern 3: Empty State

```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InboxIcon, PlusIcon } from "lucide-react"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<Card className={cn("border border-border", mode.radius)}>
  <CardContent className="flex flex-col items-center justify-center py-12">
    <div className={cn("bg-muted p-3", mode.radius)}>
      <InboxIcon className={cn("size-6", mode.color.text.muted)} />
    </div>
    <h3 className={cn("mt-4 text-lg font-semibold", mode.font)}>
      NO ITEMS YET
    </h3>
    <p className={cn("mt-2 text-center", mode.typography.body.s, mode.color.text.muted)}>
      Get started by creating your first item.
    </p>
    <Button className="mt-4">
      <PlusIcon className="mr-2 size-4" />
      &gt; CREATE ITEM
    </Button>
  </CardContent>
</Card>
```

---

## Pattern 4: Settings Section

```tsx
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<div className="space-y-6">
  <div>
    <h3 className={cn("text-lg font-medium", mode.font)}>NOTIFICATIONS</h3>
    <p className={cn(mode.typography.body.s, mode.color.text.muted)}>
      Configure how you receive notifications.
    </p>
  </div>
  <Separator />
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>EMAIL NOTIFICATIONS</Label>
        <p className={cn(mode.typography.body.s, mode.color.text.muted)}>
          Receive emails about your account activity.
        </p>
      </div>
      <Switch />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>PUSH NOTIFICATIONS</Label>
        <p className={cn(mode.typography.body.s, mode.color.text.muted)}>
          Receive push notifications on your device.
        </p>
      </div>
      <Switch />
    </div>
  </div>
</div>
```

---

## Pattern 5: Form Section

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<Card className={cn("border border-border", mode.radius)}>
  <CardHeader code="0x01" title="PROFILE" />
  <CardContent padding="md">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NAME</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EMAIL</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="secondary">&gt; CANCEL</Button>
    <Button type="submit">&gt; SAVE CHANGES</Button>
  </CardFooter>
</Card>
```

---

## Pattern 6: Data Table with Actions

```tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<Card className={cn("border border-border", mode.radius)}>
  <CardHeader code="0x01" title="USERS" />
  <CardContent padding="none">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NAME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>ROLE</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="secondary">{user.role.toUpperCase()}</Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>EDIT</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    DELETE
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

---

## Pattern 7: Confirmation Dialog

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
import { Button } from "@/components/ui/button"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">&gt; DELETE</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>ARE YOU ABSOLUTELY SURE?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        &gt; DELETE
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## Pattern 8: Loading States

```tsx
import { TerminalSpinner } from "@/components/ui/terminal-spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

// Full page loading
<div className="flex h-[50vh] items-center justify-center">
  <TerminalSpinner className="size-8" />
</div>

// Button loading
<Button disabled>
  <TerminalSpinner className="mr-2" />
  LOADING...
</Button>

// Skeleton loading
<div className="space-y-4">
  <Skeleton className="h-8 w-[200px]" />
  <Skeleton className="h-4 w-[300px]" />
  <Skeleton className="h-4 w-[250px]" />
</div>

// Card skeleton
<Card className={cn("border border-border", mode.radius)}>
  <CardHeader>
    <Skeleton className="h-6 w-[150px]" />
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
  </CardContent>
</Card>
```

---

## Pattern 9: Error State

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

<Alert variant="destructive">
  <AlertCircleIcon className="size-4" />
  <AlertTitle>ERROR</AlertTitle>
  <AlertDescription>
    {error.message}
  </AlertDescription>
</Alert>
```

---

## Pattern 10: Stats/Metrics Cards

```tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { DollarSignIcon, UsersIcon, ActivityIcon } from "lucide-react"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<div className="grid gap-4 md:grid-cols-3">
  <Card className={cn("border border-border", mode.radius)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <span className={cn(mode.typography.label.m, "font-medium")}>
        TOTAL REVENUE
      </span>
      <DollarSignIcon className={cn("size-4", mode.color.text.muted)} />
    </CardHeader>
    <CardContent>
      <div className={cn("text-2xl font-bold", mode.font)}>$45,231.89</div>
      <p className={cn(mode.typography.body.s, mode.color.text.muted)}>
        +20.1% from last month
      </p>
    </CardContent>
  </Card>

  <Card className={cn("border border-border", mode.radius)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <span className={cn(mode.typography.label.m, "font-medium")}>
        ACTIVE USERS
      </span>
      <UsersIcon className={cn("size-4", mode.color.text.muted)} />
    </CardHeader>
    <CardContent>
      <div className={cn("text-2xl font-bold", mode.font)}>+2,350</div>
      <p className={cn(mode.typography.body.s, mode.color.text.muted)}>
        +180 since last hour
      </p>
    </CardContent>
  </Card>

  <Card className={cn("border border-border", mode.radius)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <span className={cn(mode.typography.label.m, "font-medium")}>
        ACTIVE NOW
      </span>
      <ActivityIcon className={cn("size-4", mode.color.text.muted)} />
    </CardHeader>
    <CardContent>
      <div className={cn("text-2xl font-bold", mode.font)}>+573</div>
      <p className={cn(mode.typography.body.s, mode.color.text.muted)}>
        +201 since last hour
      </p>
    </CardContent>
  </Card>
</div>
```

---

## Pattern 11: Terminal Card with Code Display

```tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<Card className={cn("border border-border", mode.radius)}>
  <CardHeader code="0x01" title="EXAMPLE_CODE" />
  <CardContent padding="none">
    <CodeBlock
      code={`import { Button } from "@/components/ui/button"

export function Example() {
  return <Button>Click me</Button>
}`}
      language="tsx"
    />
  </CardContent>
</Card>
```

---

## Pattern 12: Tabbed Content

```tsx
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

const [activeTab, setActiveTab] = useState('preview')

<StyledTabs
  code="0x00"
  title="TEMPLATE_PREVIEW"
  tabs={[
    { id: 'preview', label: '[PREVIEW]' },
    { id: 'code', label: '[CODE]' },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
>
  <StyledTabsContent value="preview">
    <Card className={cn("border border-border", mode.radius)}>
      <CardHeader code="0x01" title="LIVE_PREVIEW" />
      <CardContent padding="md">
        Preview content here...
      </CardContent>
    </Card>
  </StyledTabsContent>

  <StyledTabsContent value="code">
    <Card className={cn("border border-border", mode.radius)}>
      <CardHeader code="0x01" title="SOURCE_CODE" />
      <CardContent padding="none">
        <CodeBlock code={codeString} language="tsx" />
      </CardContent>
    </Card>
  </StyledTabsContent>
</StyledTabs>
```

---

## Pattern 13: Feature List

```tsx
import { Card, CardHeader, CardContent, FeatureList, FeatureItem } from "@/components/ui/card"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<Card className={cn("border border-border", mode.radius)}>
  <CardHeader code="0x02" title="FEATURES" />
  <CardContent padding="md">
    <FeatureList>
      <FeatureItem>Authentication with multiple providers</FeatureItem>
      <FeatureItem>Role-based access control</FeatureItem>
      <FeatureItem>Multi-tenancy support</FeatureItem>
      <FeatureItem>Webhook management</FeatureItem>
    </FeatureList>
  </CardContent>
</Card>
```

---

## Pattern 14: Breadcrumb Navigation

```tsx
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs">
  <Link
    href="/library"
    className={cn(
      "transition-colors",
      mode.color.text.muted,
      "hover:text-foreground",
      mode.font
    )}
  >
    Library
  </Link>
  <ChevronRight className={cn("size-3", mode.color.text.muted)} />
  <Link
    href="/library/dashboards"
    className={cn(
      "transition-colors",
      mode.color.text.muted,
      "hover:text-foreground",
      mode.font
    )}
  >
    Dashboards
  </Link>
  <ChevronRight className={cn("size-3", mode.color.text.muted)} />
  <span className={cn("text-foreground", mode.font)}>Analytics</span>
</nav>
```

---

## Pattern 15: Search with Filters

```tsx
import { InputSearch } from "@/components/ui/input-search"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FilterIcon } from "lucide-react"
import { mode } from "@/design-system"
import { cn } from "@/lib/utils"

<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="flex flex-1 gap-4">
    <InputSearch
      placeholder="SEARCH..."
      className="max-w-sm"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <Select value={filter} onValueChange={setFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="FILTER BY STATUS" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">ALL</SelectItem>
        <SelectItem value="active">ACTIVE</SelectItem>
        <SelectItem value="inactive">INACTIVE</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <Button variant="outline">
    <FilterIcon className="mr-2 size-4" />
    &gt; MORE FILTERS
  </Button>
</div>
```
