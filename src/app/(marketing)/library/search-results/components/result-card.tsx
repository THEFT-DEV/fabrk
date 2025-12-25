/**
 * FABRK COMPONENT
 * Result Card - Individual search result display
 */

import { Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Result {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  updated: string;
}

interface ResultCardProps {
  result: Result;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="border-border bg-card hover:bg-muted/30 border transition-colors">
      <div className="border-border flex items-center border-b px-4 py-2">
        <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
          [ RESULT ] result_{result.id}.tsx
        </span>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className={cn(mode.font, 'text-sm font-semibold')}>{result.title}</h3>
          <div className={cn(mode.font, 'text-warning flex items-center gap-1 text-xs')}>
            <Star className="h-3 w-3 fill-current" />
            {result.rating}
          </div>
        </div>
        <p className={cn(mode.font, 'text-muted-foreground mb-4 text-sm')}>{result.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {result.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className={cn(mode.font, 'border-border text-xs')}>
                {tag}
              </Badge>
            ))}
          </div>
          <div className={cn(mode.font, 'text-muted-foreground flex items-center gap-1 text-xs')}>
            <Clock className="h-3 w-3" />
            {result.updated}
          </div>
        </div>
      </div>
    </div>
  );
}
