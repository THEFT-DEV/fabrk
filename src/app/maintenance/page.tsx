import { Wrench, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Maintenance Mode',
  description: "We're currently performing scheduled maintenance.",
  robots: 'noindex, nofollow',
};

/**
 * Maintenance Mode Page
 * Display this page during scheduled maintenance windows
 *
 * To enable maintenance mode:
 * 1. Set MAINTENANCE_MODE=true in environment variables
 * 2. Or use middleware to redirect all traffic to /maintenance
 */
export default function MaintenancePage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Maintenance Icon */}
        <div className="mb-8 flex justify-center">
          <div className={cn('bg-warning/20 p-6', mode.radius)}>
            <Wrench className="text-warning size-16" />
          </div>
        </div>

        {/* Message */}
        <h1 className={cn('text-foreground mb-4 text-4xl font-semibold', mode.font)}>
          SCHEDULED MAINTENANCE
        </h1>
        <p className={cn('text-muted-foreground mb-6 text-sm', mode.font)}>
          We're currently performing scheduled maintenance to improve your experience. We'll be back
          shortly!
        </p>

        {/* Estimated Time */}
        <div
          className={cn('bg-warning/10 mb-8 inline-flex items-center gap-2 px-6 py-4', mode.radius)}
        >
          <Clock className="text-warning size-5" />
          <span className={cn('text-warning text-xs font-medium', mode.font)}>
            [ESTIMATED DOWNTIME]: 30 minutes
          </span>
        </div>

        {/* Status Updates */}
        <div className="mb-8">
          <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
            [STATUS UPDATES]: For real-time updates, check our status page:
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://status.yourapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn('text-primary text-xs font-semibold hover:underline', mode.font)}
            >
              STATUS PAGE
            </a>
          </div>
        </div>

        {/* What We're Doing */}
        <Card size="auto" className="text-left">
          <CardHeader code="0x00" title="CURRENT TASKS" icon={<Wrench className="size-4" />} />
          <CardContent padding="md">
            <ul className={cn('text-muted-foreground space-y-2 text-xs', mode.font)}>
              <li className="flex items-start gap-4">
                <span className="text-primary flex-shrink-0">├─</span>
                <span className="text-foreground">
                  Database optimization for faster performance
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary flex-shrink-0">├─</span>
                <span className="text-foreground">Security updates and patches</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary flex-shrink-0">└─</span>
                <span className="text-foreground">New features deployment</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="border-border mt-12 border-t pt-8">
          <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
            [HELP]: Need urgent assistance?
          </p>
          <a
            href="mailto:support@fabrk.dev"
            className={cn('text-primary text-xs font-semibold hover:underline', mode.font)}
          >
            support@fabrk.dev
          </a>
        </div>
      </div>
    </div>
  );
}
