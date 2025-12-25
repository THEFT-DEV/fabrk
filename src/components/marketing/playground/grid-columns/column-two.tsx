/**
 * Components Grid - Column 2: Dropdown, Skeletons, Progress, Breadcrumbs, Badges, Empty State
 */
'use client';

import {
  MoreHorizontal,
  ChevronDown,
  Edit,
  Trash2,
  Copy,
  Home,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedSolidProgress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function GridColumnTwo() {

  return (
    <div className="space-y-4">
      {/* Dropdown Menu */}
      <Card>
        <div className="p-4">
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[DROPDOWN MENU]</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full text-xs">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                &gt; ACTIONS
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs">
                <Edit className="mr-2 h-3 w-3" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs">
                <Copy className="mr-2 h-3 w-3" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive text-xs">
                <Trash2 className="mr-2 h-3 w-3" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {/* Loading Skeletons - Tighter spacing */}
      <div className={cn('space-y-4 border p-4', mode.color.border.default)}>
        <h3 className={cn('text-xs font-semibold', mode.font)}>[LOADING...]</h3>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Animated Progress Bar */}
      <Card>
        <div className="p-4">
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[PROGRESS]</h3>
          <AnimatedSolidProgress
            label="Upload"
            duration={3000}
          />
        </div>
      </Card>

      {/* Breadcrumbs - Inline, no card */}
      <div className={cn('flex items-center gap-1 border-l-2 p-4 text-xs', mode.color.border.accent, mode.color.bg.mutedSubtle)}>
        <Home className="h-3 w-3" />
        <ChevronRight className="text-muted-foreground h-3 w-3" />
        <span className="text-muted-foreground">Projects</span>
        <ChevronRight className="text-muted-foreground h-3 w-3" />
        <span className="font-medium">Dashboard</span>
      </div>

      {/* Badge Variations - Compact, no card */}
      <div className={cn('space-y-2 border p-4', mode.color.border.default, mode.color.bg.mutedLight)}>
        <h3 className={cn('text-xs font-semibold', mode.font)}>[BADGES]</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>DEFAULT</Badge>
          <Badge variant="secondary">SECONDARY</Badge>
          <Badge variant="outline">OUTLINE</Badge>
          <Badge variant="destructive">ERROR</Badge>
        </div>
      </div>

      {/* Empty State - Minimal, no card */}
      <div className={cn('border border-dashed p-8 text-center', mode.color.border.default)}>
        <FileText className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
        <h3 className={cn('mb-1 text-xs font-semibold', mode.font)}>[NO DATA]</h3>
        <p className="text-muted-foreground text-xs">No items found</p>
      </div>
    </div>
  );
}
