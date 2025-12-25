'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { SignUpForm } from '@/components/ui/sign-in-form';

export default function SignUpFormPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.105]"
      category="Specialized"
      title="Sign Up Form"
      description="A complete sign-up form with name, email, password, terms acceptance, and social auth. Terminal-styled and ready to use."
      importCode={`import { SignUpForm } from "@/components/ui/sign-in-form"`}
      mainPreview={{
        preview: (
          <div className="border-border mx-auto max-w-md border p-4">
            <SignUpForm
              onSubmit={() => {}}
              signInHref="/sign-in"
              termsHref="/terms"
              privacyHref="/privacy"
            />
          </div>
        ),
        code: `<SignUpForm
  onSubmit={(data) => handleSignUp(data)}
  signInHref="/sign-in"
  termsHref="/terms"
  privacyHref="/privacy"
/>`,
      }}
      variants={[
        {
          title: 'Without Social Auth',
          description: 'Sign up form with only email/password.',
          preview: (
            <div className="border-border mx-auto max-w-md border p-4">
              <SignUpForm socialProviders={[]} />
            </div>
          ),
          code: `<SignUpForm socialProviders={[]} />`,
        },
        {
          title: 'With Error',
          description: 'Form displaying an error message.',
          preview: (
            <div className="border-border mx-auto max-w-md border p-4">
              <SignUpForm error="This email is already registered." socialProviders={[]} />
            </div>
          ),
          code: `<SignUpForm error="This email is already registered." />`,
        },
      ]}
      props={[
        {
          name: 'onSubmit',
          type: '(data: SignUpFormData) => void | Promise<void>',
          description: 'Form submission handler.',
        },
        {
          name: 'socialProviders',
          type: 'SocialProvider[]',
          description: 'Social auth provider buttons.',
        },
        {
          name: 'signInHref',
          type: 'string',
          default: '"/sign-in"',
          description: 'Sign in link URL.',
        },
        {
          name: 'termsHref',
          type: 'string',
          default: '"/terms"',
          description: 'Terms of service link URL.',
        },
        {
          name: 'privacyHref',
          type: 'string',
          default: '"/privacy"',
          description: 'Privacy policy link URL.',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          default: 'false',
          description: 'Loading/submitting state.',
        },
        {
          name: 'error',
          type: 'string',
          description: 'Error message to display.',
        },
      ]}
      accessibility={[
        'Proper form labels and associations',
        'Terms checkbox required for submission',
        'Error messages linked to inputs',
        'Keyboard navigable',
      ]}
      previous={{
        title: 'Sign In Form',
        href: '/docs/components/sign-in-form',
      }}
      next={{ title: 'Simple Icon', href: '/docs/components/simple-icon' }}
    />
  );
}
