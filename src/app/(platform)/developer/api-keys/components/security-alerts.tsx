/**
 * Security Alerts Component
 * Displays security warnings and newly created key alerts
 */

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, Copy } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface SecurityAlertsProps {
  createdKey: string | null;
  onCopyKey: (key: string) => void;
  onDismissCreatedKey: () => void;
}

export function SecurityAlerts({
  createdKey,
  onCopyKey,
  onDismissCreatedKey,
}: SecurityAlertsProps) {
  return (
    <>
      {/* Security Warning */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Keep your API keys secure!</strong> Never share your API keys or commit them to
          version control. Treat them like passwords.
        </AlertDescription>
      </Alert>

      {/* New Key Created Modal */}
      {createdKey && (
        <Alert
          className={cn('mb-6', `${mode.color.bg.success}/10`, `${mode.color.border.success}/20`)}
        >
          <CheckCircle2 className={cn('h-4 w-4', mode.color.text.success)} />
          <AlertDescription>
            <p className={cn('mb-2 font-semibold', mode.color.text.success)}>
              API Key Created Successfully!
            </p>
            <p className={cn('mb-4 text-sm', mode.color.text.primary)}>
              Make sure to copy your API key now. You won't be able to see it again!
            </p>
            <div className="flex items-center gap-2">
              <code
                className={cn(
                  'flex-1 border p-2 text-sm break-all',
                  mode.color.bg.base,
                  mode.color.border.default,
                  mode.radius,
                  mode.font
                )}
              >
                {createdKey}
              </code>
              <Button size="sm" variant="outline" onClick={() => onCopyKey(createdKey)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="link"
              size="sm"
              className="mt-2 h-auto p-0"
              onClick={onDismissCreatedKey}
            >
              I've saved my key
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
