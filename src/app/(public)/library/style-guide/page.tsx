'use client';

/**
 * COMPLETE STYLE GUIDE / CONTACT SHEET
 *
 * 100% coverage of the design system.
 * Use this to validate fonts, colors, spacing, and all components.
 */

// UI Components
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CodeBlock } from '@/components/ui/code-block';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { InputSearch } from '@/components/ui/input-search';
import { InputPassword } from '@/components/ui/input-password';
import { InputNumber } from '@/components/ui/input-number';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { TerminalSpinner } from '@/components/ui/terminal-spinner';
import { TypeWriter } from '@/components/ui/typewriter';
import { StatCard } from '@/components/ui/stat-card';
import { KpiCard } from '@/components/ui/kpi-card';

// Design System
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Icons
import {
  AlertCircle, FileText, Info, MoreHorizontal, Search,
  Settings, Terminal, User, TrendingUp, Activity, Database
} from 'lucide-react';

export default function StyleGuidePage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Terminal className="w-3 h-3" />
                  <span>DESIGN SYSTEM</span>
                </div>
                <h1 className="text-2xl font-headline tracking-tight">Style Guide</h1>
              </div>
              <Badge variant="outline">77 Components</Badge>
            </div>
          </div>
        </header>

        <Tabs defaultValue="typography" className="w-full">
          <div className="max-w-7xl mx-auto px-4">
              <TabsList className="h-auto p-0 bg-transparent gap-0">
                {['Typography', 'Colors', 'Spacing', 'Forms', 'Buttons', 'Cards', 'Navigation', 'Feedback', 'Overlays', 'Data', 'Effects'].map((section) => (
                  <TabsTrigger
                    key={section}
                    value={section.toLowerCase()}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                  >
                    {section}
                  </TabsTrigger>
                ))}
              </TabsList>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* TYPOGRAPHY */}
            <TabsContent value="typography" className="mt-0 space-y-6">
              <SectionHeader title="TYPOGRAPHY" count={12} />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Headlines */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Headlines (font-headline)" />
                <CardContent className="space-y-3">
                  <TypographyRow label="H1 - 4xl" className="text-4xl font-headline tracking-tight">
                    THE QUICK BROWN FOX
                  </TypographyRow>
                  <TypographyRow label="H2 - 3xl" className="text-3xl font-headline tracking-tight">
                    THE QUICK BROWN FOX
                  </TypographyRow>
                  <TypographyRow label="H3 - 2xl" className="text-2xl font-headline tracking-tight">
                    The Quick Brown Fox
                  </TypographyRow>
                  <TypographyRow label="H4 - xl" className="text-xl font-headline tracking-tight">
                    The Quick Brown Fox
                  </TypographyRow>
                  <TypographyRow label="H5 - lg" className="text-lg font-headline tracking-tight">
                    The Quick Brown Fox
                  </TypographyRow>
                </CardContent>
              </Card>

              {/* Body Text */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Body Text (font-body)" />
                <CardContent className="space-y-3">
                  <TypographyRow label="Large" className="text-lg font-body">
                    The quick brown fox jumps over the lazy dog.
                  </TypographyRow>
                  <TypographyRow label="Base" className="text-base font-body">
                    The quick brown fox jumps over the lazy dog.
                  </TypographyRow>
                  <TypographyRow label="Small" className="text-sm font-body">
                    The quick brown fox jumps over the lazy dog.
                  </TypographyRow>
                  <TypographyRow label="XS" className="text-xs font-body">
                    The quick brown fox jumps over the lazy dog.
                  </TypographyRow>
                  <TypographyRow label="2XS" className="text-2xs font-body">
                    The quick brown fox jumps over the lazy dog.
                  </TypographyRow>
                  <TypographyRow label="Muted" className="text-sm text-muted-foreground font-body">
                    The quick brown fox jumps over the lazy dog.
                  </TypographyRow>
                </CardContent>
              </Card>

              {/* Code & Mono */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Code & Monospace" />
                <CardContent className="space-y-3">
                  <TypographyRow label="Inline code">
                    <code className="bg-muted px-1.5 py-0.5 text-sm font-mono">const x = 42;</code>
                  </TypographyRow>
                  <TypographyRow label="Code block">
                    <CodeBlock code={`function hello() {\n  console.log("Hello, World!");\n}`} language="javascript" />
                  </TypographyRow>
                </CardContent>
              </Card>

              {/* Links & Lists */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Links & Lists" />
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-2xs text-muted-foreground block mb-1">Links</span>
                    <a href="#" className="text-primary hover:underline">Primary link</a>
                    <span className="mx-2 text-muted-foreground">|</span>
                    <a href="#" className="text-muted-foreground hover:text-foreground">Muted link</a>
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground block mb-1">Unordered List</span>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>First item in list</li>
                      <li>Second item in list</li>
                      <li>Third item in list</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground block mb-1">Ordered List</span>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Step one</li>
                      <li>Step two</li>
                      <li>Step three</li>
                    </ol>
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground block mb-1">Blockquote</span>
                    <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
                      &quot;The best code is no code at all.&quot;
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* COLORS */}
            <TabsContent value="colors" className="mt-0 space-y-6">
            <SectionHeader title="COLOR TOKENS" count={16} />

            <div className="space-y-6">
              {/* Background Colors */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Backgrounds" />
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    <ColorSwatch name="background" className="bg-background" border />
                    <ColorSwatch name="foreground" className="bg-foreground" dark />
                    <ColorSwatch name="card" className="bg-card" border />
                    <ColorSwatch name="muted" className="bg-muted" />
                    <ColorSwatch name="accent" className="bg-accent" />
                    <ColorSwatch name="popover" className="bg-popover" border />
                  </div>
                </CardContent>
              </Card>

              {/* Semantic Colors */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Semantic Colors" />
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    <ColorSwatch name="primary" className="bg-primary" dark />
                    <ColorSwatch name="secondary" className="bg-secondary" />
                    <ColorSwatch name="destructive" className="bg-destructive" dark />
                    <ColorSwatch name="success" className="bg-success" dark />
                    <ColorSwatch name="warning" className="bg-warning" />
                    <ColorSwatch name="info" className="bg-info" dark />
                  </div>
                </CardContent>
              </Card>

              {/* Border & Ring */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Borders & Focus" />
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <ColorSwatch name="border" className="bg-border" />
                    <ColorSwatch name="input" className="bg-input" />
                    <ColorSwatch name="ring" className="bg-ring" dark />
                    <div className="h-16 border-2 border-ring flex items-center justify-center text-xs">
                      Focus ring
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Text Colors */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Text Colors" />
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-foreground">text-foreground - Primary text</p>
                    <p className="text-muted-foreground">text-muted-foreground - Secondary text</p>
                    <p className="text-primary">text-primary - Accent text</p>
                    <p className="text-destructive">text-destructive - Error text</p>
                    <p className="text-success">text-success - Success text</p>
                    <p className="text-warning">text-warning - Warning text</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* SPACING */}
            <TabsContent value="spacing" className="mt-0 space-y-6">
            <SectionHeader title="SPACING (8-Point Grid)" count={8} />

            <Card className={cn('border border-border', mode.radius)}>
              <CardHeader title="Spacing Scale" />
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: '1 (4px)', class: 'w-1', px: '4px' },
                    { label: '2 (8px)', class: 'w-2', px: '8px' },
                    { label: '3 (12px)', class: 'w-3', px: '12px' },
                    { label: '4 (16px)', class: 'w-4', px: '16px' },
                    { label: '6 (24px)', class: 'w-6', px: '24px' },
                    { label: '8 (32px)', class: 'w-8', px: '32px' },
                    { label: '12 (48px)', class: 'w-12', px: '48px' },
                    { label: '16 (64px)', class: 'w-16', px: '64px' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground w-20 font-mono">{item.label}</span>
                      <div className={cn('h-4 bg-primary', item.class)} />
                      <span className="text-2xs text-muted-foreground">{item.px}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Gap Examples */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Gap Examples" />
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-2xs text-muted-foreground mb-2 block">gap-1</span>
                    <div className="flex gap-1">
                      {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 bg-primary" />)}
                    </div>
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground mb-2 block">gap-2</span>
                    <div className="flex gap-2">
                      {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 bg-primary" />)}
                    </div>
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground mb-2 block">gap-4</span>
                    <div className="flex gap-4">
                      {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 bg-primary" />)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Border Radius */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Border Radius" />
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-4">
                    Current: <code className="bg-muted px-1">var(--radius)</code>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className={cn('w-16 h-16 bg-primary flex items-center justify-center text-primary-foreground text-2xs', mode.radius)}>
                      dynamic
                    </div>
                    <div className="w-16 h-16 bg-secondary flex items-center justify-center text-secondary-foreground text-2xs rounded-none">
                      none
                    </div>
                    <div className="w-16 h-16 bg-muted flex items-center justify-center text-muted-foreground text-2xs rounded-sm">
                      sm
                    </div>
                    <div className="w-16 h-16 bg-accent flex items-center justify-center text-accent-foreground text-2xs rounded-md">
                      md
                    </div>
                    <div className="w-16 h-16 bg-muted flex items-center justify-center text-muted-foreground text-2xs rounded-lg">
                      lg
                    </div>
                    <div className="w-16 h-16 bg-primary flex items-center justify-center text-primary-foreground text-2xs rounded-full">
                      full
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* FORMS */}
            <TabsContent value="forms" className="mt-0 space-y-6">
            <SectionHeader title="FORM CONTROLS" count={12} />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Text Inputs */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Text Inputs" />
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="input-default" className="mb-2 block">Default Input</Label>
                    <Input id="input-default" placeholder="Enter text..." />
                  </div>
                  <div>
                    <Label htmlFor="input-disabled" className="mb-2 block">Disabled</Label>
                    <Input id="input-disabled" placeholder="Disabled input" disabled />
                  </div>
                  <div>
                    <Label htmlFor="input-error" className="mb-2 block">With Error</Label>
                    <Input id="input-error" placeholder="Invalid input" className="border-destructive" />
                    <p className="text-destructive text-xs mt-1">This field is required</p>
                  </div>
                  <div>
                    <Label className="mb-2 block">Search Input</Label>
                    <InputSearch placeholder="Search..." />
                  </div>
                  <div>
                    <Label className="mb-2 block">Password Input</Label>
                    <InputPassword placeholder="Enter password..." />
                  </div>
                  <div>
                    <Label className="mb-2 block">Number Input</Label>
                    <InputNumber placeholder="0" />
                  </div>
                </CardContent>
              </Card>

              {/* More Inputs */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Other Inputs" />
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Textarea</Label>
                    <Textarea placeholder="Enter long text..." rows={3} />
                  </div>
                  <div>
                    <Label className="mb-2 block">OTP Input</Label>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div>
                    <Label className="mb-2 block">Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Option 1</SelectItem>
                        <SelectItem value="2">Option 2</SelectItem>
                        <SelectItem value="3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Slider</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </CardContent>
              </Card>

              {/* Checkboxes & Radios */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Checkboxes & Radio" />
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Checkbox id="check1" />
                      <Label htmlFor="check1">Unchecked</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="check2" defaultChecked />
                      <Label htmlFor="check2">Checked</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="check3" disabled />
                      <Label htmlFor="check3" className="text-muted-foreground">Disabled</Label>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="mb-2 block">Radio Group</Label>
                    <RadioGroup defaultValue="option1">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="option1" id="r1" />
                        <Label htmlFor="r1">Option 1</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="option2" id="r2" />
                        <Label htmlFor="r2">Option 2</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="option3" id="r3" />
                        <Label htmlFor="r3">Option 3</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Switches & Toggles */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Switches" />
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Default switch</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Checked switch</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground">Disabled switch</Label>
                    <Switch disabled />
                  </div>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* BUTTONS */}
            <TabsContent value="buttons" className="mt-0 space-y-6">
            <SectionHeader title="BUTTONS & BADGES" count={14} />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Button Variants */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Button Variants" />
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Button Sizes */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Button Sizes" />
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Settings className="w-4 h-4" /></Button>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    <Button className="w-full">Full Width Button</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Badge Variants" />
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="accent">Accent</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Badge Sizes */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Badge Sizes" />
                <CardContent>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* CARDS */}
            <TabsContent value="cards" className="mt-0 space-y-6">
            <SectionHeader title="CARDS & LAYOUT" count={6} />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Basic Card */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Basic Card" />
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cards contain content and actions about a single subject.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline">Action</Button>
                </CardFooter>
              </Card>

              {/* Card with Meta */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Card with Meta" meta="3 items" />
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Headers can include metadata on the right side.
                  </p>
                </CardContent>
              </Card>

              {/* Card with Icon */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Card with Icon" icon={<Settings className="w-4 h-4" />} />
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Headers can include icons too.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Separator */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Separator" />
                <CardContent className="space-y-4">
                  <p className="text-sm">Content above separator</p>
                  <Separator />
                  <p className="text-sm">Content below separator</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Left</span>
                    <Separator orientation="vertical" className="h-6" />
                    <span className="text-sm">Right</span>
                  </div>
                </CardContent>
              </Card>

              {/* Scroll Area */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Scroll Area" />
                <CardContent>
                  <ScrollArea className="h-32 border border-border p-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <p key={i} className="text-sm py-1">Scrollable item {i + 1}</p>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* NAVIGATION */}
            <TabsContent value="navigation" className="mt-0 space-y-6">
            <SectionHeader title="NAVIGATION" count={6} />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Tabs */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Tabs" />
                <CardContent>
                  <Tabs defaultValue="tab1">
                    <TabsList>
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="mt-4">
                      <p className="text-sm text-muted-foreground">Content for tab 1</p>
                    </TabsContent>
                    <TabsContent value="tab2" className="mt-4">
                      <p className="text-sm text-muted-foreground">Content for tab 2</p>
                    </TabsContent>
                    <TabsContent value="tab3" className="mt-4">
                      <p className="text-sm text-muted-foreground">Content for tab 3</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Breadcrumb */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Breadcrumb" />
                <CardContent>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Components</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </CardContent>
              </Card>

              {/* Pagination */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Pagination" />
                <CardContent>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </Card>

              {/* Accordion */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Accordion" />
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles that match the design system.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* FEEDBACK */}
            <TabsContent value="feedback" className="mt-0 space-y-6">
            <SectionHeader title="FEEDBACK & STATUS" count={10} />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Alerts */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Alerts" />
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>This is an informational message.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong.</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Progress" />
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-xs text-muted-foreground mb-2 block">25%</span>
                    <Progress value={25} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground mb-2 block">50%</span>
                    <Progress value={50} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground mb-2 block">100%</span>
                    <Progress value={100} />
                  </div>
                </CardContent>
              </Card>

              {/* Loading States */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Loading States" />
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <TerminalSpinner />
                    <span className="text-sm">Terminal Spinner</span>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-xs text-muted-foreground mb-2 block">Typewriter</span>
                    <TypeWriter text="Loading system..." />
                  </div>
                </CardContent>
              </Card>

              {/* Skeleton */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Skeleton" />
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>

              {/* Empty State */}
              <Card className={cn('border border-border lg:col-span-2', mode.radius)}>
                <CardHeader title="Empty State" />
                <CardContent>
                  <EmptyState
                    icon={FileText}
                    title="No results found"
                    description="Try adjusting your search or filters."
                  />
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* OVERLAYS */}
            <TabsContent value="overlays" className="mt-0 space-y-6">
            <SectionHeader title="OVERLAYS & POPUPS" count={8} />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Dialog */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Dialog" />
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a dialog description with some helpful information.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm">Dialog content goes here.</p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Alert Dialog */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Alert Dialog" />
                <CardContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>

              {/* Sheet */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Sheet" />
                <CardContent>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>
                          Slide-over panel for secondary content.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <p className="text-sm">Sheet content goes here.</p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              </Card>

              {/* Popover */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Popover" />
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <p className="text-sm">Popover content here.</p>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              {/* Tooltip */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Tooltip" />
                <CardContent>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tooltip content</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Dropdown Menu */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Dropdown Menu" />
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>

              {/* Command */}
              <Card className={cn('border border-border lg:col-span-3', mode.radius)}>
                <CardHeader title="Command Palette" />
                <CardContent>
                  <Command className="border border-border">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem><Search className="mr-2 h-4 w-4" /> Search</CommandItem>
                        <CommandItem><Settings className="mr-2 h-4 w-4" /> Settings</CommandItem>
                        <CommandItem><User className="mr-2 h-4 w-4" /> Profile</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            {/* DATA */}
            <TabsContent value="data" className="mt-0 space-y-6">
            <SectionHeader title="DATA DISPLAY" count={8} />

            <div className="space-y-6">
              {/* Table */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Table" />
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">John Doe</TableCell>
                        <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Jane Smith</TableCell>
                        <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                        <TableCell>jane@example.com</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bob Wilson</TableCell>
                        <TableCell><Badge variant="destructive">Inactive</Badge></TableCell>
                        <TableCell>bob@example.com</TableCell>
                        <TableCell className="text-right">$350.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Avatar */}
                <Card className={cn('border border-border', mode.radius)}>
                  <CardHeader title="Avatar" />
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                    </div>
                  </CardContent>
                </Card>

                {/* Calendar */}
                <Card className={cn('border border-border lg:col-span-2', mode.radius)}>
                  <CardHeader title="Calendar" />
                  <CardContent>
                    <Calendar mode="single" className="w-fit" />
                  </CardContent>
                </Card>
              </div>

              {/* Stat Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Revenue"
                  value="$45,231"
                  change={20}
                  trend="up"
                  icon={<TrendingUp className="w-4 h-4" />}
                />
                <StatCard
                  title="Subscriptions"
                  value="+2,350"
                  change={180}
                  trend="up"
                  icon={<Activity className="w-4 h-4" />}
                />
                <StatCard
                  title="Active Users"
                  value="12,234"
                  change={19}
                  trend="up"
                  icon={<User className="w-4 h-4" />}
                />
                <StatCard
                  title="Database Size"
                  value="2.4 GB"
                  change={5}
                  trend="up"
                  icon={<Database className="w-4 h-4" />}
                />
              </div>

              {/* KPI Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <KpiCard
                  title="Conversion Rate"
                  value="3.2%"
                  change={12}
                  trend="up"
                />
                <KpiCard
                  title="Bounce Rate"
                  value="42%"
                  change={-8}
                  trend="down"
                />
                <KpiCard
                  title="Session Duration"
                  value="4m 32s"
                  change={5}
                  trend="up"
                />
              </div>
            </div>
            </TabsContent>

            {/* EFFECTS */}
            <TabsContent value="effects" className="mt-0 space-y-6">
            <SectionHeader title="EFFECTS & STATES" count={6} />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Focus States */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Focus States" />
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-2">Tab through these to see focus rings:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button>Focusable Button</Button>
                    <Input placeholder="Focusable input" className="w-48" />
                    <a href="#" className="text-primary underline">Focusable link</a>
                  </div>
                </CardContent>
              </Card>

              {/* Hover States */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Hover States" />
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-2">Hover over these elements:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Hover me</Button>
                    <Button variant="ghost">Hover me</Button>
                    <Badge variant="secondary">Hover me</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Disabled States */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="Disabled States" />
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled</Button>
                    <Input disabled placeholder="Disabled" className="w-32" />
                    <Checkbox disabled />
                    <Switch disabled />
                  </div>
                </CardContent>
              </Card>

              {/* CRT Effects */}
              <Card className={cn('border border-border', mode.radius)}>
                <CardHeader title="CRT Effects" />
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enable CRT effects in theme panel to see scanlines and glow.
                  </p>
                  <div className="p-4 bg-card border border-border crt-scanlines">
                    <p className="text-sm">This box has CRT scanlines applied.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold uppercase tracking-wide">{title}</h2>
      </div>
      <Badge variant="outline" size="sm">{count} items</Badge>
    </div>
  );
}

function TypographyRow({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="text-2xs text-muted-foreground block mb-0.5">{label}</span>
      <div className={className}>{children}</div>
    </div>
  );
}

function ColorSwatch({ name, className, dark = false, border = false }: { name: string; className: string; dark?: boolean; border?: boolean }) {
  return (
    <div className={cn('h-16 flex items-end p-2', className, mode.radius, border && 'border border-border')}>
      <span className={cn('text-2xs', dark ? 'text-white' : 'text-foreground')}>{name}</span>
    </div>
  );
}
