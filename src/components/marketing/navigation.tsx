/**
 * ✅ FABRK COMPONENT
 * Navigation - Terminal console style with [NAVIGATE] labels
 * Production-ready ✓
 */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeDropdown } from '@/components/theme/theme-dropdown';
import { MonitorEffectsDropdown } from '@/components/theme/monitor-effects-dropdown';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Logo } from '@/components/shared/logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: 'FEATURES', href: '#features' },
    { label: 'PRICING', href: '#pricing' },
    { label: 'DOCS', href: '/docs' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="flex h-16 w-full items-center px-4 sm:px-6">
          {/* Mobile Menu Trigger - Left side */}
          <Button
            variant="ghost"
            size="icon"
            className={cn('mr-2 h-10 w-10 md:hidden', mode.radius)}
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo with Terminal Style */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/"
              className={cn(
                'flex items-center gap-2 transition-opacity',
                mode.state.hover.linkOpacity,
                mode.font
              )}
            >
              <Logo />
            </Link>
          </motion.div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop Navigation Links + Theme Controls + CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden items-center gap-6 md:flex"
          >
            {/* Navigation Links with [NAVIGATE]: prefix */}
            <div className="flex items-center gap-1">
              <span className={cn('text-muted-foreground text-xs', mode.font)}>[NAVIGATE]:</span>
              <div className="flex items-center">
                {navLinks.map((link, _index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-muted-foreground hover:text-foreground px-4 py-1 text-sm transition-colors',
                      mode.font
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="bg-border h-6 w-px" />

            {/* Theme + Monitor Effects + CTA Buttons */}
            <div className="flex items-center gap-2">
              <ThemeDropdown />
              <MonitorEffectsDropdown />
              <Button variant="outline" asChild className={cn('text-xs', mode.radius, mode.font)}>
                <Link href="/demo">&gt; VIEW DEMO</Link>
              </Button>
              <Button asChild className={cn('text-xs', mode.radius, mode.font)}>
                <Link href="#pricing" className="scroll-smooth">
                  &gt; GET STARTED
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Mobile CTA Button */}
          <Button asChild className={cn('text-xs md:hidden', mode.radius, mode.font)}>
            <Link href="#pricing" className="scroll-smooth">
              &gt; START
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu - Full screen overlay with terminal styling */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            role="button"
            tabIndex={0}
            className="bg-background/80 absolute inset-0 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            aria-label="Close menu"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={cn(
              'absolute inset-y-0 left-0 w-[300px] border-r',
              mode.color.bg.base,
              mode.color.border.default
            )}
          >
            {/* Terminal Header */}
            <div
              className={cn(
                'flex items-center justify-between border-b p-4',
                mode.color.border.default
              )}
            >
              <span className={cn('text-xs', mode.color.text.muted, mode.font)}>
                [ [0x00] SYSTEM_MENU ]
              </span>
              <Button
                variant="ghost"
                size="icon"
                className={cn('h-8 w-8', mode.radius)}
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation Section */}
            <div className={cn('border-b p-4', mode.color.border.default)}>
              <span className={cn('mb-3 block text-xs', mode.color.text.muted, mode.font)}>
                [NAVIGATE]:
              </span>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-3 py-2 text-sm transition-colors',
                      'hover:bg-muted',
                      mode.color.text.primary,
                      mode.font
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    &gt; {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Display Section */}
            <div className={cn('border-b p-4', mode.color.border.default)}>
              <span className={cn('mb-3 block text-xs', mode.color.text.muted, mode.font)}>
                [DISPLAY]:
              </span>
              <div className="flex flex-wrap gap-2">
                <ThemeDropdown />
                <MonitorEffectsDropdown />
              </div>
            </div>

            {/* Actions Section */}
            <div className="p-4">
              <span className={cn('mb-3 block text-xs', mode.color.text.muted, mode.font)}>
                [ACTIONS]:
              </span>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className={cn('w-full text-xs', mode.radius, mode.font)}
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/library">&gt; VIEW LIBRARY</Link>
                </Button>
                <Button
                  className={cn('w-full text-xs', mode.radius, mode.font)}
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="#pricing">&gt; GET STARTED</Link>
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div
              className={cn(
                'absolute right-0 bottom-0 left-0 border-t p-4',
                mode.color.border.default
              )}
            >
              <span className={cn('text-xs', mode.color.text.muted, mode.font)}>
                [EOF] FABRK v2.0
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
