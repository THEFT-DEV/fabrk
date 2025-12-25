/**
 * SiteNavigation - Unified navigation for the entire site
 * Consistent global nav links across all pages
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { ThemeDropdown } from '@/components/theme/theme-dropdown';
import { MonitorEffectsDropdown } from '@/components/theme/monitor-effects-dropdown';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Global navigation links
const navLinks = [
  { label: 'FEATURES', href: '/features' },
  { label: 'PRICING', href: '/#pricing' },
  { label: 'DOCS', href: '/docs' },
  { label: 'FAQ', href: '/#faq' },
];

// Logo suffix based on section
const sectionSuffix: Record<string, string> = {
  docs: 'DOCS',
  demo: 'DEMO',
  library: 'LIBRARY',
  about: 'ABOUT',
  features: 'FEATURES',
  pricing: 'PRICING',
  contact: 'CONTACT',
  terms: 'LEGAL',
  privacy: 'LEGAL',
  cookies: 'LEGAL',
  refund: 'LEGAL',
};

export function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine suffix for logo based on current section
  const currentSection = pathname.split('/').filter(Boolean)[0] || '';
  const suffix = sectionSuffix[currentSection] || 'CONSOLE';

  return (
    <nav id="navigation" className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 w-full items-center px-4 sm:px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className={cn(mode.font, 'flex items-center gap-2 transition-opacity', mode.state.hover.linkOpacity)}
          >
            <span className="text-primary text-xs">&gt;</span>
            <span className="text-sm font-semibold tracking-tight">FABRK</span>
            <span className="text-muted-foreground hidden text-xs sm:inline">{suffix}</span>
          </Link>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Side: Nav Links + Theme + CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden items-center gap-6 md:flex"
        >
          {/* Global Nav Links */}
          <div className="flex items-center gap-1">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>[NAVIGATE]:</span>
            <div className="flex items-center">
              {navLinks.map((link) => {
                // Check if this link is active
                // Hash links (/#features, etc.) don't get highlighted - only actual page routes
                const isActive = link.href.startsWith('/#')
                  ? false
                  : link.href === '/docs'
                    ? pathname.startsWith('/docs')
                    : link.href === '/features'
                      ? pathname.startsWith('/features')
                      : pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      mode.font,
                      mode.radius,
                      'px-4 py-1 text-sm transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Separator */}
          <div className="bg-border h-6 w-px" />

          {/* Theme + Monitor Effects + CTA Buttons */}
          <div className="flex items-center gap-2">
            <ThemeDropdown />
            <MonitorEffectsDropdown />
            <Button variant="outline" asChild className={cn(mode.radius, mode.font, 'text-xs')}>
              <Link href="/library">&gt; VIEW LIBRARY</Link>
            </Button>
            <Button asChild className={cn(mode.radius, mode.font, 'text-xs')}>
              <Link href="/#pricing">&gt; GET STARTED</Link>
            </Button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 md:hidden"
        >
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(mode.radius, 'h-10 w-10')}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={cn(mode.radius, 'w-[300px] p-6')}>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="border-border mb-6 border-b pb-4">
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  [SYSTEM MENU]
                </span>
              </div>
              <nav className="flex flex-col space-y-4">
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>[NAVIGATE]:</span>
                {navLinks.map((link) => {
                  // Hash links don't get highlighted - only actual page routes
                  const isActive = link.href.startsWith('/#')
                    ? false
                    : link.href === '/docs'
                      ? pathname.startsWith('/docs')
                      : link.href === '/features'
                        ? pathname.startsWith('/features')
                        : pathname === link.href;

                  return (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          mode.font,
                          mode.radius,
                          'px-2 py-1 text-sm transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        &gt; {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <div className="border-border border-t pt-6">
                  <span className={cn(mode.font, 'text-muted-foreground mb-4 block text-xs')}>
                    [DISPLAY]:
                  </span>
                  <div className="mb-4 flex flex-col gap-2">
                    <ThemeDropdown />
                    <MonitorEffectsDropdown />
                  </div>
                </div>
                <div className="border-border border-t pt-6">
                  <span className={cn(mode.font, 'text-muted-foreground mb-4 block text-xs')}>
                    [ACTIONS]:
                  </span>
                  <SheetClose asChild>
                    <Button asChild size="sm" className={cn(mode.radius, mode.font)}>
                      <Link href="/library">&gt; VIEW LIBRARY</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className={cn(mode.radius, mode.font, 'mt-4 w-full text-xs')} asChild>
                      <Link href="/#pricing">&gt; GET STARTED</Link>
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Mobile CTA Button */}
          <Button asChild className={cn(mode.radius, mode.font, 'text-xs md:hidden')}>
            <Link href="/#pricing">&gt; START</Link>
          </Button>
        </motion.div>
      </div>
    </nav>
  );
}
