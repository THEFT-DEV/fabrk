/**
 * Sign Up Template - Terminal console style
 */
'use client';

import Link from 'next/link';
import { Github, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// eslint-disable-next-line design-system/no-hardcoded-colors -- Template code contains Google brand colors for user reference
const templateCode = `"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, UserPlus } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="border-border bg-background w-full max-w-[380px] space-y-6 border p-6">
        {/* Header */}
        <div className="flex flex-col space-y-2 text-center">
          <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
            <UserPlus className="text-primary h-5 w-5" />
          </div>
          <h1 className={cn(mode.font, "text-2xl font-semibold tracking-tight")}>
            Create an account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your information to get started
          </p>
        </div>

        {/* Signup Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name" className={cn(mode.font, "text-xs")}>
                [FIRST NAME]:
              </Label>
              <Input
                id="first-name"
                placeholder="John"
                required
                className={cn(mode.radius, mode.font, "text-xs")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className={cn(mode.font, "text-xs")}>
                [LAST NAME]:
              </Label>
              <Input
                id="last-name"
                placeholder="Doe"
                required
                className={cn(mode.radius, mode.font, "text-xs")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={cn(mode.font, "text-xs")}>
              [EMAIL]:
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              required
              className={cn(mode.radius, mode.font, "text-xs")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className={cn(mode.font, "text-xs")}>
              [PASSWORD]:
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              required
              className={cn(mode.radius, mode.font, "text-xs")}
            />
            <p className={cn(mode.font, "text-muted-foreground text-xs")}>
              Must be at least 8 characters long
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" className={cn(mode.radius, "mt-0.5")} />
            <Label htmlFor="terms" className={cn(mode.font, "text-muted-foreground text-xs font-normal")}>
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>

          <Button className={cn(mode.radius, mode.font, "w-full text-xs")} type="submit">
            &gt; CREATE ACCOUNT
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="border-border w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social Auth */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>
        </div>

        {/* Footer */}
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="hover:text-primary underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}`;

function SignUpPreview() {
  return (
    <TemplatePreviewWrapper minHeight="700px">
      <div className="flex items-center justify-center">
        <div className="border-border bg-background w-full max-w-[380px] space-y-6 border p-6">
          {/* Header */}
          <div className="flex flex-col space-y-2 text-center">
            <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
              <UserPlus className="text-primary h-5 w-5" />
            </div>
            <h1 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>
              Create an account
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your information to get started with Fabrk
            </p>
          </div>

          {/* Signup Form */}
          <div className="grid gap-6">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className={cn(mode.font, 'text-xs')}>
                    [FIRST NAME]:
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    required
                    className={cn(mode.radius, mode.font, 'text-xs')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className={cn(mode.font, 'text-xs')}>
                    [LAST NAME]:
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    required
                    className={cn(mode.radius, mode.font, 'text-xs')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={cn(mode.font, 'text-xs')}>
                  [EMAIL]:
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                  className={cn(mode.radius, mode.font, 'text-xs')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className={cn(mode.font, 'text-xs')}>
                  [PASSWORD]:
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  className={cn(mode.radius, mode.font, 'text-xs')}
                />
                <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className={cn(mode.radius, 'mt-0.5')} />
                <Label
                  htmlFor="terms"
                  className={cn(
                    mode.font,
                    'text-muted-foreground text-xs leading-normal font-normal'
                  )}
                >
                  I agree to the{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button className={cn(mode.radius, mode.font, 'w-full text-xs')} type="submit">
                &gt; CREATE ACCOUNT
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="border-border w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                {/* eslint-disable design-system/no-hardcoded-colors -- Google brand colors are intentional */}
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {/* eslint-enable design-system/no-hardcoded-colors */}
                Google
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground px-8 text-center text-sm">
            Already have an account?{' '}
            <Link
              href="/templates/authentication/sign-in"
              className="hover:text-primary underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function SignUpTemplate() {
  return (
    <TemplateShowcasePage
      badge="SIGN UP"
      title="Sign Up"
      description="Registration page with form validation and social providers"
      templateId="sign-up"
      category={{ name: 'Authentication', href: '/library/authentication' }}
      preview={<SignUpPreview />}
      code={templateCode}
      fileStructure="app/(auth)/sign-up/page.tsx"
      features={[
        'Multi-field registration form',
        'Terms of Service checkbox',
        'Social sign-up (GitHub, Google)',
        'Password requirements hint',
        'Link to sign in page',
      ]}
    />
  );
}
