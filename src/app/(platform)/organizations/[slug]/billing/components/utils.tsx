/**
 * Utility functions for billing badges and status display
 */

import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, Zap } from 'lucide-react';

export function getStatusBadge(status: string) {
  switch (status) {
    case 'active':
      return (
        <Badge className="gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Active
        </Badge>
      );
    case 'trialing':
      return (
        <Badge variant="secondary" className="gap-1">
          <Zap className="h-3 w-3" />
          Trial
        </Badge>
      );
    case 'past_due':
      return (
        <Badge variant="accent" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Past Due
        </Badge>
      );
    case 'canceled':
      return (
        <Badge variant="outline" className="gap-1">
          <XCircle className="h-3 w-3" />
          Canceled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export function getInvoiceStatusBadge(status: string) {
  switch (status) {
    case 'paid':
      return (
        <Badge variant="default" className="w-24 justify-center font-semibold">
          Paid
        </Badge>
      );
    case 'open':
      return (
        <Badge variant="secondary" className="w-24 justify-center font-semibold">
          Open
        </Badge>
      );
    case 'void':
      return (
        <Badge variant="outline" className="w-24 justify-center font-semibold">
          Void
        </Badge>
      );
    case 'uncollectible':
      return (
        <Badge variant="accent" className="w-24 justify-center font-semibold">
          Uncollectible
        </Badge>
      );
    default:
      return <Badge className="w-24 justify-center font-semibold">{status}</Badge>;
  }
}
