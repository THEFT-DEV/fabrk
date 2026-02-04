'use client';

/**
 * Sign-In and Sign-Up Forms
 * Authentication forms with email/password and social OAuth support
 */

import * as React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  SocialProvider,
  defaultSocialProviders,
  SocialAuthDivider,
  SocialAuthButtons,
  AuthErrorMessage,
} from './social-auth';

// Re-export types for consumers
export type { SocialProvider };

// =============================================================================
// SIGN IN FORM
// =============================================================================

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInFormProps {
  /** Form submission handler */
  onSubmit?: (data: SignInFormData) => void | Promise<void>;
  /** Social auth providers */
  socialProviders?: SocialProvider[];
  /** Forgot password link URL */
  forgotPasswordHref?: string;
  /** Sign up link URL */
  signUpHref?: string;
  /** Show remember me checkbox */
  showRememberMe?: boolean;
  /** Initial email value */
  defaultEmail?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error message to display */
  error?: string;
  /** Additional className */
  className?: string;
}

export function SignInForm({
  onSubmit,
  socialProviders = defaultSocialProviders,
  forgotPasswordHref = '/forgot-password',
  signUpHref = '/sign-up',
  showRememberMe = true,
  defaultEmail = '',
  isLoading = false,
  error,
  className,
}: SignInFormProps) {
  const [email, setEmail] = React.useState(defaultEmail);
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loadingProvider, setLoadingProvider] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit?.({ email, password, rememberMe });
  };

  const handleSocialAuth = async (provider: SocialProvider) => {
    setLoadingProvider(provider.id);
    try {
      await provider.onClick?.();
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Error Message */}
      {error && <AuthErrorMessage error={error} />}

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className={cn(mode.font, 'text-xs')}>
            [EMAIL]:
          </Label>
          <Input
            id="signin-email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password" className={cn(mode.font, 'text-xs')}>
              [PASSWORD]:
            </Label>
            {forgotPasswordHref && (
              <Link
                href={forgotPasswordHref}
                className={cn('text-primary text-xs hover:underline', mode.font)}
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        {showRememberMe && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="signin-remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              disabled={isLoading}
              className={mode.radius}
            />
            <Label
              htmlFor="signin-remember"
              className={cn(mode.font, 'text-muted-foreground text-xs font-normal')}
            >
              Remember me for 30 days
            </Label>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              SIGNING_IN...
            </>
          ) : (
            '&gt; SIGN IN'
          )}
        </Button>
      </form>

      {/* Social Auth */}
      {socialProviders.length > 0 && (
        <>
          <SocialAuthDivider />
          <SocialAuthButtons
            providers={socialProviders}
            isLoading={isLoading}
            loadingProvider={loadingProvider}
            onAuth={handleSocialAuth}
          />
        </>
      )}

      {/* Sign Up Link */}
      {signUpHref && (
        <p className={cn('text-muted-foreground text-center text-xs', mode.font)}>
          Don&apos;t have an account?{' '}
          <Link
            href={signUpHref}
            className={cn('hover:text-primary underline underline-offset-4', mode.font)}
          >
            Sign up
          </Link>
        </p>
      )}
    </div>
  );
}

// Re-export SignUpForm for backwards compatibility
export { SignUpForm } from './sign-up-form';
export type { SignUpFormData, SignUpFormProps } from './sign-up-form';
