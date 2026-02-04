/**
 * ✅ FABRK COMPONENT
 * License Card Component
 * Under 150 lines ✓
 * Production ready ✓
 */

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Copy, Key } from 'lucide-react';
import { LicenseCardProps } from './purchase-status-types';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
export function LicenseCard({ licenseKey, onCopyLicense, copiedLicense }: LicenseCardProps) {
  if (!licenseKey) return null;

  return (
    <Card tone="neutral">
      <CardHeader code="0x02" title="LICENSE KEY" icon={<Key className="h-4 w-4" />} />
      <CardContent padding="md">
        <div className="space-y-4">
          <div className={cn('bg-muted p-6 text-sm', mode.font, mode.radius)}>
            {licenseKey}
          </div>
          <Button
            variant="outline"
            onClick={onCopyLicense}
            className="focus-visible:ring-ring w-full focus-visible:ring-2 focus-visible:outline-none"
          >
            {copiedLicense ? (
              <>&gt; COPIED TO CLIPBOARD</>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                &gt; COPY LICENSE KEY
              </>
            )}
          </Button>
          <p className="text-muted-foreground text-xs">
            [NOTE]: Keep this key safe. You&apos;ll need it for future updates and support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
