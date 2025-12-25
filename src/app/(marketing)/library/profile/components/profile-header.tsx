/**
 * FABRK COMPONENT
 * Profile Header - Avatar, info, and stats section
 */

'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Edit, MapPin } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface UserStats {
  projects: number;
  contributions: number;
  followers: number;
  following: number;
}

interface User {
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  role: string;
  stats: UserStats;
}

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card tone="neutral">
      <CardHeader code="0x02" title="USER PROFILE" />
      <CardContent padding="lg">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <Avatar
              className={cn(
                mode.radius,
                'h-32 w-32 border-2 shadow-none',
                mode.color.border.default
              )}
            >
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback
                className={cn(mode.radius, mode.font, 'text-2xl', mode.color.bg.muted)}
              >
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info Section */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Name + Buttons row */}
            <div className="flex items-center justify-between gap-4">
              <h2
                className={cn(
                  mode.font,
                  'text-2xl font-semibold tracking-tight',
                  mode.color.text.primary
                )}
              >
                {user.name}
              </h2>
              <div className="flex gap-2">
                <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                  <Edit className="mr-1 h-3 w-3" />
                  &gt; EDIT PROFILE
                </Button>
                <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                  &gt; PUBLIC VIEW
                </Button>
              </div>
            </div>

            {/* Location */}
            <div
              className={cn(mode.font, 'flex items-center gap-1 text-sm', mode.color.text.muted)}
            >
              <MapPin className="h-3 w-3" />
              {user.location}
            </div>

            {/* Bio */}
            <p className={cn(mode.font, 'text-sm', mode.color.text.muted)}>{user.bio}</p>
          </div>
        </div>

        {/* Stats - bottom row in boxes */}
        <div className={cn('mt-6 flex border-t pt-6', mode.color.border.default)}>
          {Object.entries(user.stats).map(([key, value], index) => (
            <div
              key={key}
              className={cn(
                'border px-4 py-2 text-center',
                mode.color.border.default,
                index > 0 && 'border-l-0'
              )}
            >
              <div className={cn('text-xl font-semibold', mode.color.text.primary)}>{value}</div>
              <div className={cn(mode.font, 'text-xs uppercase', mode.color.text.muted)}>{key}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
