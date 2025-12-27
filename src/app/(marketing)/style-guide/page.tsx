/**
 * STYLE GUIDE / CONTACT SHEET
 *
 * Visual validation page showing all design system styles.
 * Use this to verify fonts, colors, and spacing work correctly.
 */

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { AlertCircle, Check, Info, Terminal, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Style Guide | Fabrk',
  description: 'Visual contact sheet for all design system styles',
  robots: { index: false, follow: false },
};

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Terminal className="w-4 h-4" />
            <span>DESIGN SYSTEM VALIDATION</span>
          </div>
          <h1 className="text-4xl font-headline tracking-tight">Style Guide</h1>
          <p className="text-muted-foreground mt-2 font-body">
            Contact sheet showing all design tokens and components.
            Switch themes to validate everything works.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* TYPOGRAPHY */}
        <section>
          <SectionHeader icon={<Terminal />} title="TYPOGRAPHY" />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Headlines */}
            <Card className={cn('border border-border', mode.radius)}>
              <CardHeader title="Headlines (font-headline)" />
              <CardContent className="space-y-4">
                <div>
                  <span className="text-2xs text-muted-foreground">H1</span>
                  <h1 className="text-4xl font-headline tracking-tight">THE QUICK BROWN FOX</h1>
                </div>
                <div>
                  <span className="text-2xs text-muted-foreground">H2</span>
                  <h2 className="text-3xl font-headline tracking-tight">THE QUICK BROWN FOX</h2>
                </div>
                <div>
                  <span className="text-2xs text-muted-foreground">H3</span>
                  <h3 className="text-2xl font-headline tracking-tight">The Quick Brown Fox</h3>
                </div>
                <div>
                  <span className="text-2xs text-muted-foreground">H4</span>
                  <h4 className="text-xl font-headline tracking-tight">The Quick Brown Fox</h4>
                </div>
              </CardContent>
            </Card>

            {/* Body Text */}
            <Card className={cn('border border-border', mode.radius)}>
              <CardHeader title="Body Text (font-body)" />
              <CardContent className="space-y-4">
                <div>
                  <span className="text-2xs text-muted-foreground">Large</span>
                  <p className="text-lg font-body">The quick brown fox jumps over the lazy dog.</p>
                </div>
                <div>
                  <span className="text-2xs text-muted-foreground">Base</span>
                  <p className="text-base font-body">The quick brown fox jumps over the lazy dog.</p>
                </div>
                <div>
                  <span className="text-2xs text-muted-foreground">Small</span>
                  <p className="text-sm font-body">The quick brown fox jumps over the lazy dog.</p>
                </div>
                <div>
                  <span className="text-2xs text-muted-foreground">Extra Small</span>
                  <p className="text-xs font-body">The quick brown fox jumps over the lazy dog.</p>
                </div>
                <div>
                  <span className="text-2xs text-muted-foreground">Muted</span>
                  <p className="text-sm text-muted-foreground font-body">
                    The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* COLORS */}
        <section>
          <SectionHeader icon={<Zap />} title="COLOR TOKENS" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <ColorSwatch name="background" className="bg-background" />
            <ColorSwatch name="foreground" className="bg-foreground" />
            <ColorSwatch name="card" className="bg-card" />
            <ColorSwatch name="muted" className="bg-muted" />
            <ColorSwatch name="primary" className="bg-primary" />
            <ColorSwatch name="secondary" className="bg-secondary" />
            <ColorSwatch name="accent" className="bg-accent" />
            <ColorSwatch name="destructive" className="bg-destructive" />
            <ColorSwatch name="success" className="bg-success" isDark />
            <ColorSwatch name="warning" className="bg-warning" />
            <ColorSwatch name="border" className="bg-border" />
            <ColorSwatch name="ring" className="bg-ring" />
          </div>
        </section>

        {/* BUTTONS */}
        <section>
          <SectionHeader icon={<Check />} title="BUTTONS" />
          <Card className={cn('border border-border p-6', mode.radius)}>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Check className="w-4 h-4" /></Button>
            </div>
          </Card>
        </section>

        {/* BADGES */}
        <section>
          <SectionHeader icon={<Info />} title="BADGES" />
          <Card className={cn('border border-border p-6', mode.radius)}>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="accent">Accent</Badge>
            </div>
          </Card>
        </section>

        {/* FORM ELEMENTS */}
        <section>
          <SectionHeader icon={<Terminal />} title="FORM ELEMENTS" />
          <Card className={cn('border border-border p-6', mode.radius)}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">
                    Input
                  </label>
                  <Input placeholder="Enter text..." />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">
                    Input (disabled)
                  </label>
                  <Input placeholder="Disabled input" disabled />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox id="check1" />
                  <label htmlFor="check1" className="text-sm font-body">Checkbox option</label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="check2" checked disabled />
                  <label htmlFor="check2" className="text-sm font-body text-muted-foreground">Disabled checked</label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="switch1" />
                  <label htmlFor="switch1" className="text-sm font-body">Switch toggle</label>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ALERTS */}
        <section>
          <SectionHeader icon={<AlertCircle />} title="ALERTS" />
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is an informational alert message.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>
          </div>
        </section>

        {/* PROGRESS */}
        <section>
          <SectionHeader icon={<Zap />} title="PROGRESS" />
          <Card className={cn('border border-border p-6', mode.radius)}>
            <div className="space-y-6">
              <div>
                <span className="text-xs text-muted-foreground mb-2 block">25%</span>
                <Progress value={25} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-2 block">50%</span>
                <Progress value={50} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-2 block">75%</span>
                <Progress value={75} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-2 block">100%</span>
                <Progress value={100} />
              </div>
            </div>
          </Card>
        </section>

        {/* RADIUS */}
        <section>
          <SectionHeader icon={<Terminal />} title="BORDER RADIUS" />
          <Card className={cn('border border-border p-6', mode.radius)}>
            <p className="text-sm text-muted-foreground mb-4">
              Current radius: <code className="bg-muted px-1">var(--radius)</code>
            </p>
            <div className="flex flex-wrap gap-4">
              <div className={cn('w-24 h-24 bg-primary flex items-center justify-center text-primary-foreground text-xs', mode.radius)}>
                mode.radius
              </div>
              <div className="w-24 h-24 bg-secondary flex items-center justify-center text-secondary-foreground text-xs rounded-none">
                rounded-none
              </div>
              <div className="w-24 h-24 bg-muted flex items-center justify-center text-muted-foreground text-xs rounded-sm">
                rounded-sm
              </div>
              <div className="w-24 h-24 bg-accent flex items-center justify-center text-accent-foreground text-xs rounded-lg">
                rounded-lg
              </div>
              <div className="w-24 h-24 bg-destructive flex items-center justify-center text-destructive-foreground text-xs rounded-full">
                rounded-full
              </div>
            </div>
          </Card>
        </section>

        {/* SPACING */}
        <section>
          <SectionHeader icon={<Terminal />} title="SPACING (8-Point Grid)" />
          <Card className={cn('border border-border p-6', mode.radius)}>
            <div className="space-y-4">
              {[
                { label: 'xs (4px)', class: 'w-1' },
                { label: 'sm (8px)', class: 'w-2' },
                { label: 'md (16px)', class: 'w-4' },
                { label: 'lg (24px)', class: 'w-6' },
                { label: 'xl (32px)', class: 'w-8' },
                { label: '2xl (48px)', class: 'w-12' },
                { label: '3xl (64px)', class: 'w-16' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-24">{item.label}</span>
                  <div className={cn('h-4 bg-primary', item.class)} />
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* FOOTER */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>Use the theme panel to switch themes and validate all styles adapt correctly.</p>
          <p className="mt-2">
            <code className="bg-muted px-2 py-1 text-xs">font-body</code> and{' '}
            <code className="bg-muted px-2 py-1 text-xs">font-headline</code> should update globally.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
      <span className="text-muted-foreground">{icon}</span>
      <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>
    </div>
  );
}

function ColorSwatch({
  name,
  className,
  isDark = false,
}: {
  name: string;
  className: string;
  isDark?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div
        className={cn(
          'h-16 border border-border flex items-end p-2',
          className,
          mode.radius
        )}
      >
        <span className={cn('text-2xs', isDark ? 'text-white' : 'text-foreground')}>
          {name}
        </span>
      </div>
    </div>
  );
}
