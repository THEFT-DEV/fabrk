'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface VerificationNoticeProps {
  email: string;
}

/**
 * Email Verification Notice
 * Displays a banner when user's email is not verified
 * Includes action to resend verification email
 */
export function VerificationNotice({ email }: VerificationNoticeProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleResend = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/send-verification-email', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('[SUCCESS]: Verification email sent! Check your inbox.');
      } else {
        setMessage(`[ERROR]: ${data.error || 'Failed to send email'}`);
      }
    } catch {
      setMessage('[ERROR]: Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Alert
      variant="destructive"
      className={cn('border-warning bg-warning/10', mode.radius, mode.font)}
    >
      <AlertTriangle className="size-4" />
      <AlertTitle className={cn('font-semibold', mode.font)}>
        [WARNING] EMAIL_NOT_VERIFIED
      </AlertTitle>
      <AlertDescription className={cn('mt-2 space-y-4', mode.font)}>
        <p className="text-xs">
          Please verify your email address: <strong>{email}</strong>
        </p>
        <p className="text-xs">Some features may be limited until verification is complete.</p>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleResend}
            disabled={loading}
            size="sm"
            variant="outline"
            className={cn('text-xs', mode.radius, mode.font)}
          >
            {loading ? '> SENDING...' : '> RESEND_VERIFICATION'}
          </Button>
          {message && (
            <span
              className={cn(
                'text-xs',
                message.startsWith('[SUCCESS]') ? 'text-success' : 'text-destructive'
              )}
            >
              {message}
            </span>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
