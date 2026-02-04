'use client';

/**
 * Component Contact Sheet - UI Components Visual Audit
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { SolidProgress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { InputPassword } from '@/components/ui/input-password';
import { InputSearch } from '@/components/ui/input-search';
import { InputNumber } from '@/components/ui/input-number';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { CodeBlock } from '@/components/ui/code-block';
import { LoadingSpinner } from '@/components/ui/loading';
import { TerminalSpinner } from '@/components/ui/terminal-spinner';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { KpiCard } from '@/components/ui/kpi-card';
import { StatCard } from '@/components/ui/stat-card';
import { Gauge } from '@/components/charts/gauge';
import { NotificationBadge } from '@/components/ui/notification-badge';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { TypeWriter } from '@/components/ui/typewriter';
import { SimpleIcon } from '@/components/ui/simple-icon';
import { siGithub, siGoogle } from 'simple-icons';
import { Sparkline } from '@/components/charts/sparkline';
import { AlertCircle, Info, ChevronDown, Search, Bell } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={cn('border-border border p-4', mode.radius)}>
      <h2 className={cn('text-sm font-bold mb-3 uppercase', mode.font)}>[{title}]</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default function ContactSheetPage() {
  return (
    <TooltipProvider>
      <div className="container py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">COMPONENT CONTACT SHEET</h1>
          <p className={cn('text-muted-foreground text-sm', mode.font)}>
            Switch themes to check radius consistency
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Section title="BUTTON">
            <div className="flex flex-wrap gap-1">
              <Button size="sm">Default</Button>
              <Button size="sm" variant="secondary">Sec</Button>
              <Button size="sm" variant="outline">Out</Button>
              <Button size="sm" variant="ghost">Ghost</Button>
              <Button size="sm" variant="destructive">Del</Button>
            </div>
          </Section>

          <Section title="BADGE">
            <div className="flex flex-wrap gap-1">
              <Badge>Default</Badge>
              <Badge variant="secondary">Sec</Badge>
              <Badge variant="outline">Out</Badge>
            </div>
          </Section>

          <Section title="INPUT">
            <Input placeholder="Input" className="h-8" />
          </Section>

          <Section title="INPUT-PASSWORD">
            <InputPassword placeholder="Password" className="h-8" />
          </Section>

          <Section title="INPUT-SEARCH">
            <InputSearch placeholder="Search" className="h-8" />
          </Section>

          <Section title="INPUT-NUMBER">
            <InputNumber placeholder="Number" className="h-8" />
          </Section>

          <Section title="INPUT-GROUP">
            <InputGroup>
              <InputGroupAddon>$</InputGroupAddon>
              <InputGroupInput placeholder="Amount" />
            </InputGroup>
          </Section>

          <Section title="INPUT-OTP">
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </Section>

          <Section title="TEXTAREA">
            <Textarea placeholder="Message" className="h-16" />
          </Section>

          <Section title="SELECT">
            <Select>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </Section>

          <Section title="CHECKBOX">
            <div className="flex items-center gap-2">
              <Checkbox id="c1" />
              <Label htmlFor="c1" className="text-sm">Check</Label>
            </div>
          </Section>

          <Section title="SWITCH">
            <div className="flex items-center gap-2">
              <Switch id="s1" />
              <Label htmlFor="s1" className="text-sm">Toggle</Label>
            </div>
          </Section>

          <Section title="RADIO-GROUP">
            <RadioGroup defaultValue="1" className="flex gap-4">
              <div className="flex items-center gap-1">
                <RadioGroupItem value="1" id="r1" />
                <Label htmlFor="r1" className="text-sm">A</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="2" id="r2" />
                <Label htmlFor="r2" className="text-sm">B</Label>
              </div>
            </RadioGroup>
          </Section>

          <Section title="SLIDER">
            <Slider defaultValue={[50]} max={100} />
          </Section>

          <Section title="CARD">
            <Card>
              <CardHeader code="0x01" title="CARD" />
              <CardContent className="py-2">Content</CardContent>
            </Card>
          </Section>

          <Section title="ALERT">
            <Alert className="py-2">
              <Info className="h-4 w-4" />
              <AlertTitle className="text-sm">Info</AlertTitle>
            </Alert>
          </Section>

          <Section title="ALERT-DESTRUCTIVE">
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-sm">Error</AlertTitle>
            </Alert>
          </Section>

          <Section title="PROGRESS">
            <SolidProgress value={60} showPercentage={false} />
          </Section>

          <Section title="TABS">
            <Tabs defaultValue="t1">
              <TabsList className="h-8">
                <TabsTrigger value="t1" className="text-xs">Tab 1</TabsTrigger>
                <TabsTrigger value="t2" className="text-xs">Tab 2</TabsTrigger>
              </TabsList>
            </Tabs>
          </Section>

          <Section title="AVATAR">
            <div className="flex gap-2">
              <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">JD</AvatarFallback></Avatar>
              <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">AB</AvatarFallback></Avatar>
            </div>
          </Section>

          <Section title="TABLE">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-8 text-xs">Name</TableHead>
                  <TableHead className="h-8 text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="py-1 text-xs">John</TableCell>
                  <TableCell className="py-1 text-xs">Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          <Section title="PAGINATION">
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </Section>

          <Section title="ACCORDION">
            <Accordion type="single" collapsible>
              <AccordionItem value="a1">
                <AccordionTrigger className="text-sm py-2">Question?</AccordionTrigger>
                <AccordionContent className="text-xs">Answer</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Section title="DIALOG">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">Open</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog</DialogTitle>
                  <DialogDescription>Content</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </Section>

          <Section title="ALERT-DIALOG">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline">Open</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction>Yes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Section>

          <Section title="SHEET">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline">Open</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </Section>

          <Section title="POPOVER">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">Open</Button>
              </PopoverTrigger>
              <PopoverContent className="w-40">Content</PopoverContent>
            </Popover>
          </Section>

          <Section title="TOOLTIP">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline">Hover</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip</TooltipContent>
            </Tooltip>
          </Section>

          <Section title="DROPDOWN-MENU">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">Menu <ChevronDown className="ml-1 h-3 w-3" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Item 1</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Item 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>

          <Section title="COMMAND">
            <Command className="border h-24">
              <CommandInput placeholder="Search..." className="h-8" />
              <CommandList>
                <CommandEmpty>None</CommandEmpty>
                <CommandGroup>
                  <CommandItem>Item</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Section>

          <Section title="CALENDAR">
            <Calendar mode="single" className="border text-xs" />
          </Section>

          <Section title="BREADCRUMB">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#" className="text-xs">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-xs">Page</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Section>

          <Section title="SKELETON">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </Section>

          <Section title="SEPARATOR">
            <div className="text-xs">Above</div>
            <Separator />
            <div className="text-xs">Below</div>
          </Section>

          <Section title="CODE-BLOCK">
            <CodeBlock code="const x = 1;" language="ts" />
          </Section>

          <Section title="EMPTY-STATE">
            <EmptyState icon={Search} title="None" description="Empty" />
          </Section>

          <Section title="LOADING">
            <LoadingSpinner />
          </Section>

          <Section title="TERMINAL-SPINNER">
            <TerminalSpinner />
          </Section>

          <Section title="TYPEWRITER">
            <TypeWriter text="Hello World" />
          </Section>

          <Section title="SIMPLE-ICON">
            <div className="flex gap-2">
              <SimpleIcon path={siGithub.path} className="h-5 w-5" />
              <SimpleIcon path={siGoogle.path} className="h-5 w-5" />
            </div>
          </Section>

          <Section title="KPI-CARD">
            <KpiCard title="Revenue" value="$1,234" trend="up" />
          </Section>

          <Section title="STAT-CARD">
            <StatCard title="Users" value="123" subtitle="Total" />
          </Section>

          <Section title="GAUGE">
            <Gauge value={75} max={100} label="Score" />
          </Section>

          <Section title="NOTIFICATION-BADGE">
            <NotificationBadge count={5}>
              <Bell className="h-5 w-5" />
            </NotificationBadge>
          </Section>

          <Section title="SPARKLINE">
            <Sparkline data={[10, 20, 15, 30, 25]} />
          </Section>

          <Section title="SCROLL-AREA">
            <ScrollArea className="h-16 border p-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <p key={i} className="text-xs">Item {i + 1}</p>
              ))}
            </ScrollArea>
          </Section>

          <Section title="CONTAINER">
            <Container size="sm" className="border p-2 text-xs">
              Container
            </Container>
          </Section>
        </div>
      </div>
    </TooltipProvider>
  );
}
