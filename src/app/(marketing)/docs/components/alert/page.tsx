'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

export default function AlertPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.15]"
      category="Components"
      title="Alert"
      description="Displays a callout for user attention with title and description."
      importCode={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`}
      mainPreview={{
        preview: (
          <Alert>
            <Info className="h-5 w-5" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the cli.</AlertDescription>
          </Alert>
        ),
        code: `<Alert>
  <Info className="h-5 w-5" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'The default alert variant with primary colors.',
          preview: (
            <Alert>
              <Info className="h-5 w-5" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is a default alert message with important information.
              </AlertDescription>
            </Alert>
          ),
          code: `<Alert>
  <Info className="h-5 w-5" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    This is a default alert message with important information.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Destructive',
          description: 'A destructive alert for errors and warnings.',
          preview: (
            <Alert variant="destructive">
              <XCircle className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
            </Alert>
          ),
          code: `<Alert variant="destructive">
  <XCircle className="h-5 w-5" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Success',
          description: 'A success alert for positive feedback.',
          preview: (
            <Alert variant="success">
              <CheckCircle2 className="h-5 w-5" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            </Alert>
          ),
          code: `<Alert variant="success">
  <CheckCircle2 className="h-5 w-5" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Without Icon',
          description: 'Alert without an icon for simpler messaging.',
          preview: (
            <Alert>
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>This alert does not include an icon.</AlertDescription>
            </Alert>
          ),
          code: `<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>
    This alert does not include an icon.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Title Only',
          description: 'Alert with only a title, no description.',
          preview: (
            <Alert>
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Important: Maintenance scheduled for tonight</AlertTitle>
            </Alert>
          ),
          code: `<Alert>
  <AlertCircle className="h-5 w-5" />
  <AlertTitle>Important: Maintenance scheduled for tonight</AlertTitle>
</Alert>`,
        },
      ]}
      props={[
        {
          name: 'variant',
          type: '"default" | "destructive" | "success"',
          default: '"default"',
          description: 'The visual style of the alert.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to the alert.',
        },
      ]}
      accessibility={[
        "Uses role='alert' for screen reader announcements",
        "Icons have aria-hidden='true' to avoid redundant announcements",
        'Grid layout ensures proper reading order',
        'Title uses font-semibold for visual hierarchy',
        'Color is not the only means of conveying information',
      ]}
      previous={{ title: 'Avatar', href: '/docs/components/avatar' }}
      next={{ title: 'Progress', href: '/docs/components/progress' }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Alert when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Displaying persistent, important information (errors, warnings, tips)
                </li>
                <li className="text-xs">• User needs to be aware of system state changes</li>
                <li className="text-xs">
                  • Information stays visible until user dismisses or takes action
                </li>
                <li className="text-xs">
                  • Context-specific messages within a page section (form validation summary)
                </li>
                <li className="text-xs">
                  • Important announcements that don&apos;t require immediate action
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">• Temporary feedback for actions (use Toast instead)</li>
                <li className="text-xs">
                  • User must confirm before proceeding (use Alert Dialog)
                </li>
                <li className="text-xs">
                  • Field-level validation errors (use Form Error component)
                </li>
                <li className="text-xs">
                  • Full-page blocking messages (use Dialog or dedicated error page)
                </li>
                <li className="text-xs">
                  • Time-sensitive information that auto-dismisses (use Toast)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Variant Selection:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • <strong>default</strong>: General information, tips, updates
                </li>
                <li className="text-xs">
                  • <strong>destructive</strong>: Errors, critical warnings, failed operations
                </li>
                <li className="text-xs">
                  • <strong>success</strong>: Successful operations, confirmations
                </li>
                <li className="text-xs">
                  • Always include an icon matching the variant for quick recognition
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
