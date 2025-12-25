'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { SignInForm, SignUpForm } from '@/components/ui/sign-in-form';

export default function SignInFormPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.74]"
      category="Components"
      title="Sign In Form"
      description="Complete authentication forms with email/password and social providers."
      importCode={`import { SignInForm, SignUpForm } from "@/components/ui/sign-in-form"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-sm">
            <SignInForm onSubmit={(data) => void data} socialProviders={[]} />
          </div>
        ),
        code: `<SignInForm
  onSubmit={(data) => handleSignIn(data)}
  forgotPasswordHref="/forgot-password"
  signUpHref="/sign-up"
/>`,
      }}
      variants={[
        {
          title: 'Sign In Form',
          description: 'Standard sign in with email/password.',
          preview: (
            <div className="w-full max-w-sm">
              <SignInForm socialProviders={[]} />
            </div>
          ),
          code: `<SignInForm
  onSubmit={(data) => handleSignIn(data)}
/>`,
        },
        {
          title: 'Sign Up Form',
          description: 'Registration form with terms acceptance.',
          preview: (
            <div className="w-full max-w-sm">
              <SignUpForm socialProviders={[]} />
            </div>
          ),
          code: `<SignUpForm
  onSubmit={(data) => handleSignUp(data)}
  termsHref="/terms"
  privacyHref="/privacy"
/>`,
        },
        {
          title: 'With Error',
          description: 'Form displaying an error message.',
          preview: (
            <div className="w-full max-w-sm">
              <SignInForm socialProviders={[]} error="Invalid email or password" />
            </div>
          ),
          code: `<SignInForm
  error="Invalid email or password"
  onSubmit={handleSignIn}
/>`,
        },
        {
          title: 'Loading State',
          description: 'Form in loading/submitting state.',
          preview: (
            <div className="w-full max-w-sm">
              <SignInForm socialProviders={[]} isLoading />
            </div>
          ),
          code: `<SignInForm isLoading />`,
        },
      ]}
      props={[
        {
          name: 'onSubmit',
          type: '(data: SignInFormData) => void | Promise<void>',
          description: 'Form submission handler.',
        },
        {
          name: 'socialProviders',
          type: 'SocialProvider[]',
          default: '[GitHub, Google]',
          description: 'Social auth providers to display.',
        },
        {
          name: 'forgotPasswordHref',
          type: 'string',
          default: '"/forgot-password"',
          description: 'URL for forgot password link.',
        },
        {
          name: 'signUpHref',
          type: 'string',
          default: '"/sign-up"',
          description: 'URL for sign up link.',
        },
        {
          name: 'showRememberMe',
          type: 'boolean',
          default: 'true',
          description: 'Show remember me checkbox.',
        },
        {
          name: 'defaultEmail',
          type: 'string',
          description: 'Pre-fill email field.',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          default: 'false',
          description: 'Show loading state.',
        },
        {
          name: 'error',
          type: 'string',
          description: 'Error message to display.',
        },
      ]}
      accessibility={[
        'Form inputs have associated labels with htmlFor',
        'Error messages use terminal [ERROR] format',
        'Loading states disable inputs and show spinner',
        'Social auth buttons have provider names as labels',
        'Keyboard navigation supported throughout',
        'Focus visible rings for all interactive elements',
      ]}
      previous={{ title: 'Plan Selector', href: '/docs/components/plan-selector' }}
      next={{ title: 'Sign Up Form', href: '/docs/components/sign-up-form' }}
    >
      <DocsSection title="Form Data Types">
        <DocsCard title="SIGN IN DATA">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}`}
          </pre>
        </DocsCard>
        <DocsCard title="SIGN UP DATA">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Social Providers">
        <DocsCard title="CUSTOM PROVIDERS">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`const providers: SocialProvider[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: <Github className="h-4 w-4" />,
    onClick: () => signIn('github'),
  },
  {
    id: 'google',
    name: 'Google',
    icon: <GoogleIcon />,
    onClick: () => signIn('google'),
  },
];

<SignInForm socialProviders={providers} />`}
          </pre>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
