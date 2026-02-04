'use client';

/**
 * Sign-Up Form
 * Registration form with email/password and social OAuth support
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

// =============================================================================
// TYPES
// =============================================================================

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  // SECURITY: Honeypot fields - hidden from users, bots will fill them
  website: string;
  _gotcha: string;
}

export interface SignUpFormProps {
  /** Form submission handler */
  onSubmit?: (data: SignUpFormData) => void | Promise<void>;
  /** Social auth providers */
  socialProviders?: SocialProvider[];
  /** Sign in link URL */
  signInHref?: string;
  /** Terms of service URL */
  termsHref?: string;
  /** Privacy policy URL */
  privacyHref?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error message to display */
  error?: string;
  /** Additional className */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SignUpForm({
  onSubmit,
  socialProviders = defaultSocialProviders,
  signInHref = '/sign-in',
  termsHref = '/terms',
  privacyHref = '/privacy',
  isLoading = false,
  error,
  className,
}: SignUpFormProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [loadingProvider, setLoadingProvider] = React.useState<string | null>(null);
  // SECURITY: Honeypot fields
  const [website, setWebsite] = React.useState('');
  const [gotcha, setGotcha] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit?.({ name, email, password, acceptTerms, website, _gotcha: gotcha });
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

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SECURITY: Honeypot fields - hidden from users, bots will fill them */}
        <div
          className="pointer-events-none absolute -translate-x-full scale-0 opacity-0"
          aria-hidden="true"
        >
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="text"
            name="_gotcha"
            value={gotcha}
            onChange={(e) => setGotcha(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-name" className={cn(mode.font, 'text-xs')}>
            [NAME]:
          </Label>
          <Input
            id="signup-name"
            placeholder="John Doe"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email" className={cn(mode.font, 'text-xs')}>
            [EMAIL]:
          </Label>
          <Input
            id="signup-email"
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
          <Label htmlFor="signup-password" className={cn(mode.font, 'text-xs')}>
            [PASSWORD]:
          </Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="signup-terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            disabled={isLoading}
            className={cn(mode.radius, 'mt-0.5')}
          />
          <Label
            htmlFor="signup-terms"
            className={cn(mode.font, 'text-muted-foreground text-xs leading-relaxed font-normal')}
          >
            I agree to the{' '}
            <Link href={termsHref} className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href={privacyHref} className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || !acceptTerms}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              CREATING_ACCOUNT...
            </>
          ) : (
            '&gt; CREATE ACCOUNT'
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

      {/* Sign In Link */}
      {signInHref && (
        <p className={cn('text-muted-foreground text-center text-xs', mode.font)}>
          Already have an account?{' '}
          <Link
            href={signInHref}
            className={cn('hover:text-primary underline underline-offset-4', mode.font)}
          >
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
