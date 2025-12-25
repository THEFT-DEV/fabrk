'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { FormError, commonErrors } from '@/components/ui/form-error';
import { useState } from 'react';

export default function FormErrorPage() {
  const [retryCount, setRetryCount] = useState(0);

  return (
    <ComponentShowcaseTemplate
      code="[UI.41]"
      category="Components"
      title="Form Error"
      description="User-friendly error messages following the What/Why/How pattern. Helps users recognize, diagnose, and recover from errors."
      importCode={`import { FormError, commonErrors } from "@/components/ui/form-error"`}
      mainPreview={{
        preview: (
          <FormError
            what="Unable to save your changes"
            why="The server is temporarily unavailable."
            how="Please wait a moment and try again."
          />
        ),
        code: `<FormError
  what="Unable to save your changes"
  why="The server is temporarily unavailable."
  how="Please wait a moment and try again."
/>`,
      }}
      variants={[
        {
          title: 'With Retry Action',
          description: 'Error message with retry button.',
          preview: (
            <FormError
              what="Failed to load data"
              why="Network connection was interrupted."
              how="Check your internet connection and try again."
              onRetry={() => setRetryCount(retryCount + 1)}
            />
          ),
          code: `<FormError
  what="Failed to load data"
  why="Network connection was interrupted."
  how="Check your internet connection and try again."
  onRetry={() => handleRetry()}
/>`,
        },
        {
          title: 'With Help Link',
          description: 'Error with link to documentation.',
          preview: (
            <FormError
              what="Payment processing failed"
              why="Your card was declined by the payment processor."
              how="Verify your card details or try a different payment method."
              helpLink="https://example.com/help/payments"
            />
          ),
          code: `<FormError
  what="Payment processing failed"
  why="Your card was declined by the payment processor."
  how="Verify your card details or try a different payment method."
  helpLink="https://example.com/help/payments"
/>`,
        },
        {
          title: 'Network Error (Common Pattern)',
          description: 'Pre-configured network error message.',
          preview: <FormError {...commonErrors.network} />,
          code: `import { FormError, commonErrors } from "@/components/ui/form-error";

<FormError {...commonErrors.network} />`,
        },
        {
          title: 'Validation Error - Email',
          description: 'Pre-configured email validation error.',
          preview: <FormError {...commonErrors.validation.email} />,
          code: `<FormError {...commonErrors.validation.email} />`,
        },
        {
          title: 'Validation Error - Password',
          description: 'Pre-configured password validation error.',
          preview: <FormError {...commonErrors.validation.password} />,
          code: `<FormError {...commonErrors.validation.password} />`,
        },
        {
          title: 'Auth Error - Session Expired',
          description: 'Pre-configured session expiration error.',
          preview: <FormError {...commonErrors.auth.sessionExpired} />,
          code: `<FormError {...commonErrors.auth.sessionExpired} />`,
        },
        {
          title: 'Upload Error - File Too Large',
          description: 'Pre-configured file size error.',
          preview: <FormError {...commonErrors.upload.tooLarge} />,
          code: `<FormError {...commonErrors.upload.tooLarge} />`,
        },
        {
          title: 'Payment Error - Declined',
          description: 'Pre-configured payment declined error.',
          preview: (
            <FormError
              {...commonErrors.payment.declined}
              onRetry={() => setRetryCount(retryCount + 1)}
              helpLink="https://example.com/help/payments"
            />
          ),
          code: `<FormError
  {...commonErrors.payment.declined}
  onRetry={() => handleRetry()}
  helpLink="https://example.com/help/payments"
/>`,
        },
        {
          title: 'Error Formula Pattern',
          description: 'The What/Why/How formula for clear error messages.',
          preview: (
            <div className="space-y-4 p-4 font-mono text-sm">
              <div className="border-border flex items-center border-b pb-2">
                <span className="text-muted-foreground text-xs">
                  [ ERROR FORMULA ] error-formula.md
                </span>
              </div>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-primary font-semibold">[WHAT]:</div>
                  <div className="text-muted-foreground pl-4">
                    What went wrong? (Clear, specific)
                  </div>
                </div>
                <div>
                  <div className="text-warning font-semibold">[WHY]:</div>
                  <div className="text-muted-foreground pl-4">Why did it happen? (Root cause)</div>
                </div>
                <div>
                  <div className="text-success font-semibold">[HOW]:</div>
                  <div className="text-muted-foreground pl-4">
                    How to fix it? (Actionable steps)
                  </div>
                </div>
              </div>
            </div>
          ),
          code: `// UX Heuristic #9: Help Users Recognize, Diagnose, and Recover from Errors
//
// Error Message Formula:
// 1. WHAT went wrong (clear, specific)
// 2. WHY it happened (root cause)
// 3. HOW to fix it (actionable steps)
// 4. ACTION to resolve (optional button)

<FormError
  what="What went wrong"
  why="Why it happened"
  how="How to fix it"
  onRetry={handleRetry}
  helpLink="/docs/help"
/>`,
        },
      ]}
      props={[
        {
          name: 'what',
          type: 'string',
          default: '"Something went wrong"',
          description: 'What went wrong (clear, specific description).',
        },
        {
          name: 'why',
          type: 'string',
          default: '-',
          description: 'Why it happened (root cause explanation).',
        },
        {
          name: 'how',
          type: 'string',
          default: '-',
          description: 'How to fix it (actionable steps for recovery).',
        },
        {
          name: 'onRetry',
          type: '() => void',
          default: '-',
          description: 'Callback function for retry button.',
        },
        {
          name: 'helpLink',
          type: 'string',
          default: '-',
          description: 'URL to help documentation.',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: 'Additional CSS classes.',
        },
      ]}
      accessibility={[
        'Uses role=alert to announce errors to screen readers',
        'aria-live=polite ensures error is announced without interrupting',
        'Clear visual hierarchy with icon and structured content',
        'Actionable buttons with clear labels (Try Again, Learn More)',
        'Color is not the only indicator (uses icon and text)',
        'Links open in new tab with rel=noopener noreferrer for security',
      ]}
      previous={{ title: 'Form', href: '/docs/components/form' }}
      next={{ title: 'Gauge', href: '/docs/components/gauge' }}
    />
  );
}
