/**
 * ✅ FABRK COMPONENT
 * Card component for displaying organization info (logo, name, member count, plan badge).
 *
 * @example
 * ```tsx
 * <OrgCard
 *   name="Acme Corp"
 *   memberCount={12}
 *   plan="Pro"
 *   onSelect={() => {}}
 * />
 * ```
 */

'use client';

import * as React from 'react';
import { Users, Crown, CheckCircle2, MoreVertical, Settings, LogOut } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export interface OrgCardProps {
  id?: string;
  name: string;
  logo?: string;
  memberCount: number;
  plan: 'Free' | 'Starter' | 'Pro' | 'Enterprise';
  role?: 'Owner' | 'Admin' | 'Member';
  isActive?: boolean;
  onSelect?: () => void;
  onSettings?: () => void;
  onLeave?: () => void;
  className?: string;
}

const getPlanColors = (plan: 'Free' | 'Starter' | 'Pro' | 'Enterprise') => {
  switch (plan) {
    case 'Free':
      return cn(mode.color.bg.muted, mode.color.text.muted);
    case 'Starter':
      return cn('bg-primary/10 border-primary/20', mode.color.text.accent);
    case 'Pro':
      return cn(mode.color.bg.accent, mode.color.text.inverse);
    case 'Enterprise':
      return cn('bg-gradient-to-r from-primary to-accent', mode.color.text.inverse);
  }
};

export function OrgCard({
  id: _id,
  name,
  logo,
  memberCount,
  plan,
  role = 'Member',
  isActive = false,
  onSelect,
  onSettings,
  onLeave,
  className,
}: OrgCardProps) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card
      interactive
      tone={isActive ? 'primary' : 'neutral'}
      className={cn('group relative cursor-pointer', className)}
      onClick={onSelect}
    >
      <CardContent padding="lg">
        {/* Active indicator */}
        {isActive && (
          <div
            className={cn(
              'absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center',
              mode.color.bg.accent,
              mode.radius
            )}
          >
            <CheckCircle2 className={cn('h-4 w-4', mode.color.text.inverse)} />
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          {/* Left side - Logo & Info */}
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <Avatar className={cn('h-12 w-12 border', mode.color.border.default, mode.radius)}>
              {logo ? (
                <AvatarImage src={logo} alt={name} />
              ) : (
                <AvatarFallback
                  className={cn(
                    mode.font,
                    'text-sm font-bold',
                    mode.color.bg.accent,
                    mode.color.text.inverse
                  )}
                >
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="min-w-0 flex-1 space-y-2">
              <div className="space-y-1">
                <h3 className={cn('truncate text-sm font-semibold', mode.color.text.primary)}>
                  {name}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(mode.font, 'text-xs font-medium', getPlanColors(plan))}
                  >
                    {plan}
                  </Badge>
                  {role === 'Owner' && (
                    <Badge variant="outline" className="text-xs font-medium">
                      <Crown className="mr-1 h-3 w-3" />
                      {role}
                    </Badge>
                  )}
                </div>
              </div>

              <div className={cn('flex items-center gap-2 text-sm', mode.color.text.muted)}>
                <Users className="h-4 w-4" />
                <span>
                  {memberCount} member{memberCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              {onSettings && (
                <>
                  <DropdownMenuItem onClick={onSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {onLeave && role !== 'Owner' && (
                <DropdownMenuItem
                  onClick={onLeave}
                  className={cn(mode.color.text.danger, `focus:${mode.color.text.danger}`)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Leave org
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
