/**
 * FABRK COMPONENT
 * Results Header - Sort controls and view toggle
 */

import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface ResultsHeaderProps {
  resultsCount: number;
  sortBy: string;
  viewMode: 'grid' | 'list';
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ResultsHeader({
  resultsCount,
  sortBy,
  viewMode,
  onSortChange,
  onViewModeChange,
}: ResultsHeaderProps) {
  return (
    <Card>
      <CardHeader code="0x03" title="RESULTS" />
      <CardContent padding="md">
        <div className="flex items-center justify-between">
          <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [SHOWING]: {resultsCount} results
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className={cn(mode.radius, mode.font, 'h-8 w-[140px] text-xs')}>
                <SlidersHorizontal className="mr-1 h-3 w-3" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={cn(mode.radius, mode.font, 'text-xs')}>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
            <div className="border-border flex border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className={cn(mode.radius, 'h-8 w-8 p-0')}
              >
                <Grid className="h-3 w-3" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className={cn(mode.radius, 'border-border h-8 w-8 border-l p-0')}
              >
                <List className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
