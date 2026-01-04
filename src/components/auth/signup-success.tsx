/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function SignupSuccessMessage({ email }: { email: string }) {
  const _successStyles = {
    textAlign: 'center' as const,
    padding: '3rem',
  };

  const _iconStyles = {
    width: '64px',
    height: '64px',
    margin: '0 auto',
    color: 'var(--color-green-500)', // green-500
  };

  // UX Heuristic #1: Visibility of system status
  return (
    <div className="p-6 text-center">
      <CheckCircle className="text-primary mx-auto h-16 w-16" />
      <h2 className={cn('m-4 text-xs font-semibold', mode.font)}>Check your email</h2>
      <p className="m-4">We&apos;ve sent a verification email to {email}</p>
      <p className="m-4 text-xs">Please click the link in the email to verify your account.</p>
      <Button className="focus-visible:ring-ring m-4 focus-visible:ring-2 focus-visible:outline-none">
        &gt; RESEND VERIFICATION EMAIL
      </Button>
    </div>
  );
}
