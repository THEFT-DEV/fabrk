/**
 * FABRK COMPONENT
 * Search Bar - Terminal console style search input
 */

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  resultsCount: number;
}

export function SearchBar({ searchQuery, onSearchChange, resultsCount }: SearchBarProps) {
  return (
    <Card>
      <CardHeader code="0x02" title="SEARCH" icon={<Search className="h-3 w-3" />} />
      <CardContent padding="md">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search components, templates, hooks..."
              className={cn(mode.font, 'pl-8 text-sm')}
            />
          </div>
          <Button className={cn(mode.font, 'text-xs')}>&gt; SEARCH</Button>
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mt-2 text-xs')}>
          [QUERY]: &quot;{searchQuery}&quot; | RESULTS: {resultsCount} | TIME: 0.042s
        </div>
      </CardContent>
    </Card>
  );
}
