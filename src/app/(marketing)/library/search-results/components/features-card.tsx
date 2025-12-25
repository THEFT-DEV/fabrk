/**
 * FABRK COMPONENT
 * Features Card - Template features documentation
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function FeaturesCard() {
  return (
    <Card>
      <CardHeader code="0x01" title="FEATURES" />
      <CardContent padding="md">
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [TEMPLATE FEATURES]:
        </div>
        <div className={cn(mode.font, 'space-y-2 text-xs')}>
          <div>
            <span className="text-success">&gt;</span> Search bar with query display
          </div>
          <div>
            <span className="text-success">&gt;</span> Category filter sidebar
          </div>
          <div>
            <span className="text-success">&gt;</span> Tag checkboxes with multi-select
          </div>
          <div>
            <span className="text-success">&gt;</span> Sort dropdown (relevance, newest, rating)
          </div>
          <div>
            <span className="text-success">&gt;</span> Grid/list view toggle
          </div>
          <div>
            <span className="text-success">&gt;</span> Result cards with ratings
          </div>
          <div>
            <span className="text-success">&gt;</span> Pagination controls
          </div>
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mt-4 text-xs')}>
          [NOTE]: Connect to your search backend (Algolia, Elasticsearch, etc.) for real results.
        </div>
      </CardContent>
    </Card>
  );
}
