/**
 * FABRK COMPONENT
 * Popover Example - Contextual floating content
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info, X } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function PopoverExample() {
  return (
    <Card>
      <CardHeader code="0x00" title="POPOVER" />
      <div className="p-6">
        <div className="mb-4">
          <h3 className={cn(mode.font, 'mb-1 font-semibold')}>Popover</h3>
          <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
            Contextual floating content triggered by click
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              <Info className="mr-1 h-3 w-3" />
              &gt; MORE INFO
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn(mode.radius, 'border-border w-80')}>
            <div className="space-y-4">
              <div className={cn(mode.font, 'text-muted-foreground text-xs')}>[INFO]:</div>
              <div className={cn(mode.font, 'text-sm')}>
                This popover displays contextual information without blocking the page. Great for
                help text, quick actions, or mini forms.
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className={cn(mode.radius, mode.font, 'h-7 text-xs')}>
                  &gt; LEARN MORE
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(mode.radius, mode.font, 'h-7 text-xs')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className={cn(mode.font, 'text-muted-foreground mt-4 text-xs')}>
          [USE CASE]: Tooltips, quick actions, filter dropdowns
        </div>
      </div>
    </Card>
  );
}
