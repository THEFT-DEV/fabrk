/**
 * API Documentation Component
 * Displays API usage examples and security best practices
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Code, AlertTriangle } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface ApiDocumentationProps {
  organizationId: string | null;
}

export function ApiDocumentation({ organizationId }: ApiDocumentationProps) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader code="0xF0" title="GETTING STARTED" icon={<Code className="h-4 w-4" />} />
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <p>Include your API key in the Authorization header:</p>
          <code
            className={cn('bg-muted border-border block rounded border p-4 text-xs', mode.font)}
          >
            Authorization: Bearer YOUR_API_KEY
          </code>
          <div className="pt-2">
            <p className="mb-2 font-semibold">Example (cURL):</p>
            <code
              className={cn(
                'bg-muted border-border block rounded border p-4 text-xs whitespace-pre-wrap',
                mode.font
              )}
            >
              {`curl https://yourdomain.com/api/v1/organizations/${organizationId || '{org_id}'} \\
  -H "Authorization: Bearer sk_live_..."`}
            </code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          code="0xF1"
          title="SECURITY BEST PRACTICES"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <CardContent className="text-muted-foreground text-sm">
          <ul className="list-inside list-disc space-y-1">
            <li>Never commit API keys to version control</li>
            <li>Rotate keys regularly</li>
            <li>Use environment variables</li>
            <li>Revoke unused keys immediately</li>
            <li>Monitor API usage for anomalies</li>
            <li>Use read-only keys when possible</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
