'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';

export default function InputPasswordPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.03]"
      category="Components"
      title="Input Password"
      description="A password input with visibility toggle."
      importCode={`import { InputPassword } from "@/components/ui/input-password"`}
      mainPreview={{
        preview: <InputPassword placeholder="Enter password..." />,
        code: `<InputPassword placeholder="Enter password..." />`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'Password input with visibility toggle button.',
          preview: <InputPassword placeholder="Password" />,
          code: `<InputPassword placeholder="Password" />`,
        },
        {
          title: 'With Label',
          description: 'Password input with an associated label.',
          preview: (
            <div className="grid gap-2">
              <Label htmlFor="password">{formatLabel('Password')}</Label>
              <InputPassword id="password" placeholder="Enter your password" />
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="password">{formatLabel("Password")}</Label>
  <InputPassword id="password" placeholder="Enter your password" />
</div>`,
        },
        {
          title: 'Without Toggle',
          description: 'Password input without the visibility toggle.',
          preview: <InputPassword placeholder="Hidden password" showToggle={false} />,
          code: `<InputPassword placeholder="Hidden password" showToggle={false} />`,
        },
        {
          title: 'Disabled',
          description: 'Disabled password input.',
          preview: <InputPassword disabled placeholder="Disabled" />,
          code: `<InputPassword disabled placeholder="Disabled" />`,
        },
      ]}
      props={[
        {
          name: 'showToggle',
          type: 'boolean',
          default: 'true',
          description: 'Show the visibility toggle button.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the input and toggle button.',
        },
      ]}
      accessibility={[
        'Toggle button has aria-label for screen readers',
        'Toggle button is excluded from tab order (tabIndex=-1)',
        'Uses native input element for password managers',
      ]}
      previous={{ title: 'Input', href: '/docs/components/input' }}
      next={{ title: 'Textarea', href: '/docs/components/textarea' }}
    />
  );
}
