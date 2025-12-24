'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to send reset email');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="border-border bg-background w-full space-y-6 border p-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
            <CheckCircle2 className="text-success h-5 w-5" />
          </div>
          <h1 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>
            CHECK YOUR EMAIL
          </h1>
        </div>

        <Alert className={cn('border-success bg-success/10', mode.radius, mode.font)}>
          <CheckCircle2 className="text-success size-4" />
          <AlertDescription className="text-xs">
            [SUCCESS]: If an account exists with <strong>{email}</strong>, you will receive a
            password reset link shortly. Please check your inbox.
          </AlertDescription>
        </Alert>

        <div className="space-y-4 text-center">
          <p className="text-muted-foreground text-xs">
            The reset link will expire in 1 hour for security reasons.
          </p>
          <p className="text-muted-foreground text-xs">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className={cn(mode.radius, mode.font, 'flex-1 text-xs')}
            >
              &gt; RESEND
            </Button>
            <Button
              asChild
              variant="default"
              className={cn(mode.radius, mode.font, 'flex-1 text-xs')}
            >
              <Link href="/login">&gt; BACK TO LOGIN</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-border bg-background w-full space-y-6 border p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
          <Mail className="text-primary h-5 w-5" />
        </div>
        <h1 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>FORGOT PASSWORD</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email address and we'll send you a password reset link
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className={cn(mode.radius, mode.font)}>
          <AlertCircle className="size-4" />
          <AlertDescription className="text-xs">[ERROR]: {error}</AlertDescription>
        </Alert>
      )}

      {/* Forgot Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className={cn(mode.font, 'text-xs')}>
            [EMAIL]:
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            className={cn(mode.radius, mode.font, 'text-xs')}
          />
        </div>

        <Button
          className={cn(mode.radius, mode.font, 'w-full text-xs')}
          type="submit"
          disabled={loading}
        >
          {loading ? '> SENDING...' : '> SEND RESET LINK'}
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
