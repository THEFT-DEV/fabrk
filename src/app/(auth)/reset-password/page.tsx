'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Invalid or missing reset token. Please request a new password reset.');
      return;
    }
    setToken(tokenParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login?success=password_reset');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="border-border bg-background w-full space-y-6 border p-6">
        <Alert variant="destructive" className={cn(mode.radius, mode.font)}>
          <AlertCircle className="size-4" />
          <AlertDescription className="text-xs">
            [ERROR]: Invalid or missing reset token. Please request a new password reset.
          </AlertDescription>
        </Alert>
        <Link href="/login" className="text-primary text-xs hover:underline">
          &gt; BACK TO LOGIN
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="border-border bg-background w-full space-y-6 border p-6">
        <Alert className={cn('border-success bg-success/10', mode.radius, mode.font)}>
          <CheckCircle2 className="text-success size-4" />
          <AlertDescription className="text-xs">
            [SUCCESS]: Password reset successful! Redirecting to login...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="border-border bg-background w-full space-y-6 border p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
          <KeyRound className="text-primary h-5 w-5" />
        </div>
        <h1 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>RESET PASSWORD</h1>
        <p className="text-muted-foreground text-sm">Enter your new password below</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className={cn(mode.radius, mode.font)}>
          <AlertCircle className="size-4" />
          <AlertDescription className="text-xs">[ERROR]: {error}</AlertDescription>
        </Alert>
      )}

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password" className={cn(mode.font, 'text-xs')}>
            [NEW PASSWORD]:
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            minLength={8}
            autoComplete="new-password"
            className={cn(mode.radius, mode.font, 'text-xs')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm" className={cn(mode.font, 'text-xs')}>
            [CONFIRM PASSWORD]:
          </Label>
          <Input
            id="confirm"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
            minLength={8}
            autoComplete="new-password"
            className={cn(mode.radius, mode.font, 'text-xs')}
          />
        </div>

        <Button
          className={cn(mode.radius, mode.font, 'w-full text-xs')}
          type="submit"
          disabled={loading}
        >
          {loading ? '> RESETTING...' : '> RESET PASSWORD'}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-muted-foreground text-center text-sm">
        Remember your password?{' '}
        <Link href="/login" className="hover:text-primary underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="border-border bg-background w-full space-y-6 border p-6">
          <p className="text-muted-foreground text-center text-sm">Loading...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
