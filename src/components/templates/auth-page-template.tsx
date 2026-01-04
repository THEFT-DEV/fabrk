/**
 * Auth Page Template
 *
 * Reusable template for all authentication pages (sign-in, sign-up, forgot-password, 2FA).
 * Provides consistent layout with terminal-style formatting.
 *
 * @example
 * ```tsx
 * <AuthPageTemplate
 *   title="Welcome back"
 *   description="Enter your email to sign in"
 *   fields={[
 *     { name: "email", label: "EMAIL", type: "email", placeholder: "name@example.com" },
 *     { name: "password", label: "PASSWORD", type: "password", placeholder: "••••••••" },
 *   ]}
 *   submitLabel="SIGN IN"
 *   socialAuth
 *   rememberMe
 *   forgotPasswordLink
 *   alternateLink={{ label: "Don't have an account? Sign up", href: "/auth/signup" }}
 * />
 * ```
 */

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Github, Lock } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export interface AuthField {
  /** Field name for form submission */
  name: string;
  /** Label text (will be formatted as [LABEL]:) */
  label: string;
  /** Input type */
  type: 'text' | 'email' | 'password';
  /** Placeholder text */
  placeholder?: string;
  /** Whether field is required */
  required?: boolean;
  /** Auto-complete hint */
  autoComplete?: string;
}

export interface AuthPageTemplateProps {
  // Required
  /** Page title displayed in the card */
  title: string;
  /** Description text below the title */
  description: string;
  /** Form fields configuration */
  fields: AuthField[];
  /** Submit button label (will be formatted as > LABEL) */
  submitLabel: string;

  // Optional features
  /** Show social auth buttons (Google, GitHub) */
  socialAuth?: boolean;
  /** Show "Remember me" checkbox */
  rememberMe?: boolean;
  /** Show forgot password link */
  forgotPasswordLink?: boolean;
  /** Href for forgot password link */
  forgotPasswordHref?: string;

  // Links
  /** Alternate action link (e.g., "Don't have an account? Sign up") */
  alternateLink?: {
    label: string;
    linkText: string;
    href: string;
  };

  // Form handling
  /** Form action URL or server action */
  action?: string | ((formData: FormData) => void);
  /** Form submission method */
  method?: 'get' | 'post';
  /** Loading state */
  loading?: boolean;
  /** Error message to display */
  error?: string;

  // Customization
  /** Icon to display above the title */
  icon?: React.ReactNode;
  /** Additional content below the form */
  children?: React.ReactNode;
  /** Additional className for the outer container */
  className?: string;
}

// =============================================================================
// SOCIAL AUTH ICONS
// =============================================================================

/* eslint-disable design-system/no-hardcoded-colors -- Google brand colors required per guidelines */
function GoogleIcon({ className }: { className?: string }) {
  // https://developers.google.com/identity/branding-guidelines
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        className="fill-[#4285F4]"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        className="fill-[#34A853]"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        className="fill-[#FBBC05]"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        className="fill-[#EA4335]"
      />
    </svg>
  );
}
/* eslint-enable design-system/no-hardcoded-colors */

// =============================================================================
// COMPONENT
// =============================================================================

export function AuthPageTemplate({
  title,
  description,
  fields,
  submitLabel,
  socialAuth = false,
  rememberMe = false,
  forgotPasswordLink = false,
  forgotPasswordHref = '/auth/forgot-password',
  alternateLink,
  action,
  method = 'post',
  loading = false,
  error,
  icon,
  children,
  className,
}: AuthPageTemplateProps) {
  return (
    <div
      className={cn('flex min-h-screen flex-col items-center justify-center p-4 sm:p-8', className)}
    >
      <div
        className={cn(
          'border-border bg-background w-full max-w-sm space-y-6 border p-6',
          mode.radius
        )}
      >
        {/* Header with Icon */}
        <div className="flex flex-col space-y-2 text-center">
          {/* Icon */}
          <div
            className={cn(
              'border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border',
              mode.radius
            )}
          >
            {icon || <Lock className="text-primary h-5 w-5" />}
          </div>

          {/* Title */}
          <h1 className={cn('text-2xl font-semibold tracking-tight', mode.font)}>{title}</h1>

          {/* Description */}
          <p className={cn('text-muted-foreground text-sm', mode.font)}>{description}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={cn(
              'border-destructive bg-destructive/10 text-destructive border p-4 text-xs',
              mode.radius,
              mode.font
            )}
          >
            [ERROR]: {error}
          </div>
        )}

        {/* Form */}
        <form action={action} method={method} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={field.name} className={cn('text-xs', mode.font)}>
                  [{field.label}]:
                </Label>
                {/* Show forgot password link on password field if enabled */}
                {forgotPasswordLink && field.type === 'password' && index === fields.length - 1 && (
                  <Link
                    href={forgotPasswordHref}
                    className={cn('text-primary text-xs hover:underline', mode.font)}
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              {field.type === 'password' ? (
                <InputPassword
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={field.autoComplete || 'current-password'}
                  disabled={loading}
                />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={loading}
                />
              )}
            </div>
          ))}

          {/* Remember Me */}
          {rememberMe && (
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" name="remember" disabled={loading} />
              <Label
                htmlFor="remember"
                className={cn('text-muted-foreground text-xs font-normal', mode.font)}
              >
                Remember me for 30 days
              </Label>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading} loading={loading}>
            &gt; {submitLabel.toUpperCase()}
          </Button>
        </form>

        {/* Social Auth */}
        {socialAuth && (
          <>
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="border-border w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={cn('bg-background text-muted-foreground px-2', mode.font)}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" disabled={loading}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" type="button" disabled={loading}>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </>
        )}

        {/* Custom Content */}
        {children}

        {/* Alternate Link */}
        {alternateLink && (
          <p className={cn('text-muted-foreground text-center text-sm', mode.font)}>
            {alternateLink.label}{' '}
            <Link
              href={alternateLink.href}
              className="hover:text-primary underline underline-offset-4"
            >
              {alternateLink.linkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthPageTemplate;
