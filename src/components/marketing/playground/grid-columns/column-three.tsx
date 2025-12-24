/**
 * Components Grid - Column 3: Radio Groups, Switches, Mini Table, Filter Chips, Date/Time
 */
'use client';

import { useState } from 'react';
import { Clock, Calendar, X, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function GridColumnThree() {
  const [switchEnabled, setSwitchEnabled] = useState(true);

  return (
    <div className="space-y-4">
      {/* Radio Group - Border only, no card */}
      <div className={cn('border-2 p-4', mode.color.border.accentSubtle, mode.color.bg.primarySubtle)}>
        <h3 className={cn('mb-4 text-xs font-semibold', mode.font, mode.color.text.accent)}>[RADIO GROUP]</h3>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="option-1" />
            <Label htmlFor="option-1" className="text-xs">
              Option 1
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="option-2" />
            <Label htmlFor="option-2" className="text-xs">
              Option 2
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Switches - Terminal style with border */}
      <div className={cn('border p-4', mode.color.border.default, mode.color.bg.surface)}>
        <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[SWITCHES]</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications-switch" className="text-xs">Enable notifications</Label>
            <Switch id="notifications-switch" aria-label="Enable notifications" checked={switchEnabled} onCheckedChange={setSwitchEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="darkmode-switch" className="text-xs">Dark mode</Label>
            <Switch id="darkmode-switch" aria-label="Dark mode" defaultChecked />
          </div>
        </div>
      </div>

      {/* Mini Data Table - Dense with separators */}
      <div className={cn('divide-y border', mode.color.border.default, mode.color.bg.surface)}>
        <div className={cn('p-4', mode.color.bg.mutedMedium)}>
          <h3 className={cn('text-xs font-semibold', mode.font)}>[DATA TABLE]</h3>
        </div>
        <div className="space-y-0">
          {[
            { metric: 'Users', value: '1,234', change: '+12%' },
            { metric: 'Revenue', value: '$45.2K', change: '+8%' },
          ].map((row, i) => (
            <div
              key={i}
              className={cn('flex items-center justify-between border-b p-4 text-xs last:border-b-0', mode.color.border.default)}
            >
              <span>{row.metric}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{row.value}</span>
                <span className="text-success">{row.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Chips - Terminal card style */}
      <div className={cn('border p-4', mode.color.border.default, mode.color.bg.surface)}>
        <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[ACTIVE FILTERS]</h3>
        <div className="flex flex-wrap gap-2">
          {['Status: Active', 'Role: Admin'].map((filter, i) => (
            <Badge key={i} variant="secondary" className="gap-1">
              {filter}
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          ))}
        </div>
      </div>

      {/* Date & Time - Outline style */}
      <div className={cn('border-2 border-dashed p-4', mode.color.border.mutedSubtle)}>
        <h3 className={cn('text-muted-foreground mb-4 text-xs font-semibold', mode.font)}>
          [TIMESTAMPS]
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span>Last updated: 2 min ago</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span>Created: Dec 11, 2025</span>
          </div>
        </div>
      </div>

      {/* Live Stats Card */}
      <div className={cn('space-y-3 border p-4', mode.color.border.default, mode.color.bg.surface)}>
        <div className="flex items-center justify-between">
          <h3 className={cn('text-xs font-semibold', mode.font)}>[LIVE STATS]</h3>
          <div className={cn('flex items-center gap-1 px-2 py-0.5', mode.color.bg.successSubtle)}>
            <span className="bg-success h-1.5 w-1.5 animate-pulse rounded-full" />
            <span className={cn('text-success text-xs', mode.font)}>LIVE</span>
          </div>
        </div>

        {/* Revenue */}
        <div className={cn('space-y-1 border-l-2 pl-3', mode.color.border.default, mode.color.border.accent)}>
          <div className={cn('text-muted-foreground text-xs', mode.font)}>MRR</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">$12,450</span>
            <span className={cn('text-success flex items-center text-xs', mode.font)}>
              <ArrowUpRight className="h-3 w-3" />
              15.3%
            </span>
          </div>
        </div>

        {/* Active Users */}
        <div className={cn('space-y-1 border-l-2 pl-3', mode.color.border.default, 'border-l-accent')}>
          <div className={cn('text-muted-foreground text-xs', mode.font)}>ACTIVE USERS</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">847</span>
            <span className={cn('text-success flex items-center text-xs', mode.font)}>
              <TrendingUp className="h-3 w-3" />
              +23
            </span>
          </div>
        </div>

        {/* Conversion rate */}
        <div className={cn('flex items-center justify-between border-t pt-3 text-xs', mode.color.border.default)}>
          <span className={cn('text-muted-foreground', mode.font)}>Conversion</span>
          <span className="font-mono font-semibold">4.2%</span>
        </div>
      </div>
    </div>
  );
}
