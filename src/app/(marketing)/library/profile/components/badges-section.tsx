/**
 * FABRK COMPONENT
 * Badges Section - User achievements display
 */

'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface BadgesSectionProps {
  badges: Badge[];
}

export function BadgesSection({ badges }: BadgesSectionProps) {
  return (
    <Card tone="neutral">
      <CardHeader code="0x01" title="BADGES" />
      <CardContent padding="md">
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [ACHIEVEMENTS]: {badges.length} BADGES EARNED
        </div>
        <div className="flex flex-wrap gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="border-border bg-muted/30 flex items-center gap-2 border px-4 py-2"
              >
                <Icon className={`h-4 w-4 text-${badge.color}`} />
                <span className={cn(mode.font, 'text-xs')}>{badge.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
