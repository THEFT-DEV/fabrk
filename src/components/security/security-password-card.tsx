'use client';

/**
 * Password Card
 * Part of SecuritySettings split
 */

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Key } from 'lucide-react';

export function SecurityPasswordCard() {
  return (
    <Card tone="neutral">
      <CardHeader code="0x04" title="PASSWORD" icon={<Key className="h-4 w-4" />} />
      <CardContent>
        <p className={cn(mode.font, 'text-muted-foreground', 'mb-4', 'text-xs')}>
          Change your password regularly to keep your account secure
        </p>
        <Button variant="outline">&gt; CHANGE PASSWORD</Button>
      </CardContent>
    </Card>
  );
}
