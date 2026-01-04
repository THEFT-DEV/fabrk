/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

import { Button } from '@/components/ui/button';
import { ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function TokenExpired() {
  const _styles = {
    textAlign: 'center' as const,
    padding: '3rem',
  };

  return (
    <div className="p-6 text-center">
      <X className="m-4 size-full" />
      <h2 className={cn('text-muted-foreground m-4 text-xs font-semibold', mode.font)}>Link Expired</h2>
      <p className="m-4">This password reset link has expired or is invalid.</p>
      <Link href="/forgot-password">
        <Button className="focus-visible:ring-ring m-4 focus-visible:ring-2 focus-visible:outline-none">
          &gt; REQUEST NEW LINK
        </Button>
      </Link>
    </div>
  );
}

export function ResetSuccess() {
  const router = useRouter();
  const _styles = {
    textAlign: 'center' as const,
    padding: '3rem',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/sign-in');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  // UX Heuristic #1: Visibility of system status
  return (
    <div className="p-6 text-center">
      <ShieldCheck className="m-4 size-full" />
      <h2 className={cn('text-muted-foreground m-4 text-xs font-semibold', mode.font)}>
        Password Reset Successfully
      </h2>
      <p className="m-4">
        Your password has been reset. You can now sign in with your new password.
      </p>
      <p className="text-muted-foreground m-4 text-xs">Redirecting to sign in...</p>
      <Link href="/sign-in">
        <Button className="focus-visible:ring-ring m-4 focus-visible:ring-2 focus-visible:outline-none">
          &gt; GO TO SIGN IN
        </Button>
      </Link>
    </div>
  );
}
