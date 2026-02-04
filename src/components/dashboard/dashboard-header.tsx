/**
 * FABRK COMPONENT
 * Dashboard Header Component
 * Shared header for all dashboard pages with org switcher
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, CreditCard, Code, LogOut, User, Shield, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OrgSwitcher } from '@/components/organization/org-switcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mode } from '@/design-system';
export function DashboardHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Mock user data for showcase (no authentication required)
  const mockUser = {
    name: 'Demo User',
    email: 'demo@fabrk.dev',
    image: null,
    role: 'USER',
  };

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/billing', label: 'Billing', icon: CreditCard },
    { href: '/developer/api-keys', label: 'API Keys', icon: Code },
  ];

  const userInitials = mockUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const isAdmin = false; // No admin for showcase

  return (
    <header className="border-border bg-background sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo size={28} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                'hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors',
                pathname.startsWith('/admin') ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
        </nav>

        {/* Right Section: Org Switcher + Notifications + User Menu */}
        <div className="flex items-center gap-4">
          {/* Organization Switcher */}
          <div className="hidden lg:block">
            <OrgSwitcher />
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn('relative h-10 w-10', mode.radius)}
                aria-label="User menu"
              >
                <Avatar className="border-border h-10 w-10 border">
                  <AvatarImage src={mockUser.image || ''} alt={mockUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={cn('border-border w-56 border', mode.radius)}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">{mockUser.name}</p>
                  <p className="text-muted-foreground text-xs leading-none">{mockUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="text-primary cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="text-muted-foreground cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle mobile menu">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 py-6">
                {/* Mobile Org Switcher */}
                <div>
                  <p className="text-muted-foreground mb-2 text-sm font-medium">Organization</p>
                  <OrgSwitcher className="w-full" />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">Navigation</p>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'border-border flex items-center gap-4 border px-4 py-4 text-sm font-medium transition-all',
                          mode.radius,
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card hover:bg-primary hover:text-primary-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'border-border flex items-center gap-4 border px-4 py-4 text-sm font-medium transition-all',
                        mode.radius,
                        pathname.startsWith('/admin')
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card hover:bg-primary hover:text-primary-foreground'
                      )}
                    >
                      <Shield className="h-5 w-5" />
                      Admin
                    </Link>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
