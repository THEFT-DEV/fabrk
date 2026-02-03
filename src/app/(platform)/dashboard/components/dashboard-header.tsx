/**
 * Dashboard Header Component
 * Displays welcome message and user avatar
 */

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface DashboardHeaderProps {
  userName?: string | null;
  userImage?: string | null;
  userInitials: string;
}

export function DashboardHeader({ userName, userImage, userInitials }: DashboardHeaderProps) {
  const firstName = userName?.split(' ')[0] || 'User';

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className={cn(mode.font, 'text-4xl', 'font-semibold', 'tracking-tight')}>
          Welcome back, {firstName}!
        </h1>
        <p className={cn(mode.font, 'text-muted-foreground', 'text-sm')}>
          Here's what's happening with your account today.
        </p>
      </div>
      <Avatar className="h-12 w-12">
        <AvatarImage src={userImage || ''} alt="User profile" />
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
