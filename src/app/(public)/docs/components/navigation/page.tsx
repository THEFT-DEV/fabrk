'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Simplified Navigation Demo for docs
function NavigationDemo() {
  return (
    <nav className={cn('border-border bg-background w-full border', mode.radius)}>
      <div className="flex h-14 items-center px-4">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 font-mono">
          <span className="text-primary text-xs">&gt;</span>
          <span className="text-xs font-semibold">FABRK</span>
          <span className="text-muted-foreground text-xs">CONSOLE</span>
        </Link>

        <div className="flex-1" />

        {/* Desktop Nav */}
        <div className="hidden items-center gap-4 md:flex">
          <span className="text-muted-foreground font-mono text-xs">[NAVIGATE]:</span>
          <Link href="#" className="text-muted-foreground hover:text-foreground font-mono text-xs">
            FEATURES
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground font-mono text-xs">
            PRICING
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground font-mono text-xs">
            DOCS
          </Link>
          <div className="bg-border h-4 w-px" />
          <Button size="sm" className="font-mono text-xs">
            &gt; GET STARTED
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(mode.radius)}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={cn('w-[280px]', mode.radius)}>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 pt-8">
                <span className="text-muted-foreground font-mono text-xs">[NAVIGATE]:</span>
                <Link href="#" className="font-mono text-sm">
                  &gt; FEATURES
                </Link>
                <Link href="#" className="font-mono text-sm">
                  &gt; PRICING
                </Link>
                <Link href="#" className="font-mono text-sm">
                  &gt; DOCS
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default function NavigationPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.01]"
      title="Navigation"
      description="Responsive navigation component with terminal-style branding, desktop links, and mobile sheet menu."
      mainPreview={{
        preview: <NavigationDemo />,
        code: `import { Navigation } from "@/components/marketing/navigation";

export default function LandingPage() {
  return (
    <div>
      <Navigation />
      {/* Page content */}
    </div>
  );
}`,
      }}
      variants={[
        {
          title: 'Mobile Menu Open',
          description: 'Sheet-based mobile navigation',
          preview: (
            <div className={cn('border-border bg-card w-full border p-4', mode.radius)}>
              <div className="text-muted-foreground mb-4 font-mono text-xs">[SYSTEM MENU]</div>
              <div className="flex flex-col gap-4">
                <span className="text-muted-foreground font-mono text-xs">[NAVIGATE]:</span>
                <Link href="#" className="text-foreground hover:text-primary font-mono text-sm">
                  &gt; FEATURES
                </Link>
                <Link href="#" className="text-foreground hover:text-primary font-mono text-sm">
                  &gt; PRICING
                </Link>
                <Link href="#" className="text-foreground hover:text-primary font-mono text-sm">
                  &gt; DOCS
                </Link>
                <Link href="#" className="text-foreground hover:text-primary font-mono text-sm">
                  &gt; FAQ
                </Link>
                <div className="border-border border-t pt-4">
                  <Button className="w-full font-mono text-xs">&gt; GET STARTED</Button>
                </div>
              </div>
            </div>
          ),
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Open navigation menu">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="right">
    <nav className="flex flex-col gap-4">
      <Link href="#features">FEATURES</Link>
      <Link href="#pricing">PRICING</Link>
      <Link href="/docs">DOCS</Link>
    </nav>
  </SheetContent>
</Sheet>`,
        },
      ]}
      props={[
        {
          name: 'navLinks',
          type: '{ label: string; href: string }[]',
          description: 'Array of navigation links to display',
          default: 'Built-in links',
        },
      ]}
      accessibility={[
        'Mobile menu button has aria-label for screen readers',
        'Sheet has proper focus management when opened',
        'All links are keyboard accessible',
        'Skip to content link available for keyboard users',
      ]}
      previous={{ title: 'Overview', href: '/docs/components/overview' }}
      next={{ title: 'Hero', href: '/docs/components/hero' }}
    />
  );
}
