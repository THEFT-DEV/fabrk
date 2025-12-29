/**
 * Empty States Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { Inbox, Plus } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Inbox, Plus } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function EmptyStatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-lg text-center">
        {/* Icon */}
        <div className="border-border bg-muted/30 mx-auto flex h-16 w-16 items-center justify-center border">
          <Inbox className="text-muted-foreground h-8 w-8" />
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className={cn(mode.font, "mb-1 text-sm font-semibold")}>
            No Data Yet
          </h3>
          <p className={cn(mode.font, "text-muted-foreground text-xs")}>
            Start by adding your first item to see it appear here.
          </p>
        </div>

        {/* Terminal Output */}
        <Card className="mt-4">
          <CardHeader code="0x00" title="OUTPUT" />
          <CardContent>
            <div className="space-y-0.5 text-xs">
              <div className="text-success">$ query --table=items</div>
              <div>RESULT: 0 rows returned</div>
              <div>STATUS: empty dataset</div>
            </div>
          </CardContent>
        </Card>

        {/* Action */}
        <div className="mt-4 flex items-center justify-center">
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
            <Plus className="mr-1 h-3 w-3" />
            &gt; ADD FIRST ITEM
          </Button>
        </div>
      </div>
    </div>
  );
}`;

function EmptyStatesPreview() {
  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="mx-auto flex min-h-[600px] max-w-lg items-center justify-center text-center">
        <div>
          {/* Icon */}
          <div className="border-border bg-muted/30 mx-auto flex h-16 w-16 items-center justify-center border">
            <Inbox className="text-muted-foreground h-8 w-8" />
          </div>

          {/* Title & Description */}
          <div className="mt-4">
            <h3 className={cn(mode.font, 'mb-1 text-sm font-semibold')}>No Data Yet</h3>
            <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
              Start by adding your first item to see it appear here.
            </p>
          </div>

          {/* Terminal Output */}
          <Card className="mt-4">
            <CardHeader code="0x00" title="OUTPUT" />
            <CardContent>
              <div className="space-y-0.5 text-xs">
                <div className="text-success">$ query --table=items</div>
                <div>RESULT: 0 rows returned</div>
                <div>STATUS: empty dataset</div>
              </div>
            </CardContent>
          </Card>

          {/* Action */}
          <div className="mt-4 flex items-center justify-center">
            <Button className={cn(mode.radius, mode.font, 'text-xs')}>
              <Plus className="mr-1 h-3 w-3" />
              &gt; ADD FIRST ITEM
            </Button>
          </div>
        </div>
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function EmptyStatesTemplate() {
  return (
    <TemplateShowcasePage
      badge="EMPTY STATES"
      title="Empty States"
      description="Helpful empty state patterns for various scenarios"
      templateId="empty-states"
      category={{ name: 'Patterns', href: '/library/patterns' }}
      preview={<EmptyStatesPreview />}
      code={templateCode}
      fileStructure="components/empty-state.tsx"
      features={[
        'Common empty state patterns',
        'Terminal-style status output',
        'Contextual action buttons',
        'Error state differentiation',
        'First-time user guidance',
        'Search result fallback',
      ]}
    />
  );
}
