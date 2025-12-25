/**
 * ✅ FABRK COMPONENT
 * Resources Card Component
 * Under 150 lines ✓
 * Production ready ✓
 */

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ExternalLink, Github, Package } from 'lucide-react';
import { ResourcesCardProps } from './purchase-status-types';

export function ResourcesCard({ hasAccess }: ResourcesCardProps) {
  return (
    <Card tone="neutral">
      <CardHeader
        code="0x03"
        title="RESOURCES AND SUPPORT"
        icon={<Package className="h-4 w-4" />}
      />
      <CardContent padding="md" className="space-y-4">
        <Button
          variant="outline"
          className="focus-visible:ring-ring w-full justify-start focus-visible:ring-2 focus-visible:outline-none"
          disabled={!hasAccess}
          asChild
        >
          <a href="https://github.com/fabrk/boilerplate" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            &gt; GITHUB REPOSITORY
            {hasAccess && <ExternalLink className="ml-auto h-4 w-4" />}
          </a>
        </Button>

        <Button
          variant="outline"
          className="focus-visible:ring-ring w-full justify-start focus-visible:ring-2 focus-visible:outline-none"
          disabled={!hasAccess}
          asChild
        >
          <a href="/docs" target="_blank" rel="noopener noreferrer">
            <Package className="mr-2 h-4 w-4" />
            &gt; DOCUMENTATION
            {hasAccess && <ExternalLink className="ml-auto h-4 w-4" />}
          </a>
        </Button>

        {!hasAccess && (
          <p className="text-muted-foreground text-xs">
            [NOTE]: Purchase Fabrk to unlock all resources
          </p>
        )}
      </CardContent>
    </Card>
  );
}
