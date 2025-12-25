'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default function TwoFactorPage() {
  return (
    <div className="border-border bg-background w-full space-y-6 border p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
          <ShieldCheck className="text-primary h-5 w-5" />
        </div>
        <h1 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>
          Two-factor authentication
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      {/* Verification Form */}
      <form className="space-y-4">
        <div className="flex justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button className={cn(mode.radius, mode.font, 'w-full text-xs')} type="submit">
          &gt; VERIFY
        </Button>
      </form>

      {/* Resend code */}
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Didn&apos;t receive the code?{' '}
          <Button variant="link" className="text-primary h-auto p-0">
            Resend
          </Button>
        </p>
      </div>

      {/* Back to sign in */}
      <div className="text-center text-sm">
        <Link
          href="/login"
          className="text-muted-foreground hover:text-primary inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
