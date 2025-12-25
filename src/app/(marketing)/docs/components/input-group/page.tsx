'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Search, Mail, DollarSign, Lock, Eye, EyeOff, X, Send } from 'lucide-react';
import { useState } from 'react';

function PasswordToggleExample() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <Lock className="size-4" />
      </InputGroupAddon>
      <InputGroupInput type={showPassword ? 'text' : 'password'} placeholder="Enter password" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export default function InputGroupPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <ComponentShowcaseTemplate
      code="[UI.43]"
      category="Components"
      title="Input Group"
      description="Add icons, buttons, and text addons to inputs. Supports inline and block layouts for flexible compositions."
      importCode={`import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"`}
      mainPreview={{
        preview: (
          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
        ),
        code: `<InputGroup>
  <InputGroupAddon>
    <Search className="size-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>`,
      }}
      variants={[
        {
          title: 'With Trailing Icon',
          description: 'Icon positioned at the end of input.',
          preview: (
            <InputGroup>
              <InputGroupInput type="email" placeholder="you@example.com" />
              <InputGroupAddon align="inline-end">
                <Mail className="size-4" />
              </InputGroupAddon>
            </InputGroup>
          ),
          code: `<InputGroup>
  <InputGroupInput type="email" placeholder="you@example.com" />
  <InputGroupAddon align="inline-end">
    <Mail className="size-4" />
  </InputGroupAddon>
</InputGroup>`,
        },
        {
          title: 'With Text Addon',
          description: 'Text prefix for input context.',
          preview: (
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>
                  <DollarSign className="size-4" />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput type="number" placeholder="0.00" />
            </InputGroup>
          ),
          code: `<InputGroup>
  <InputGroupAddon>
    <InputGroupText>
      <DollarSign className="size-4" />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="number" placeholder="0.00" />
</InputGroup>`,
        },
        {
          title: 'With Button',
          description: 'Action button integrated with input.',
          preview: (
            <InputGroup>
              <InputGroupInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
              />
              {searchValue && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-xs" onClick={() => setSearchValue('')}>
                    <X className="size-4" />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
          ),
          code: `const [value, setValue] = useState("");

<InputGroup>
  <InputGroupInput
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Search..."
  />
  {value && (
    <InputGroupAddon align="inline-end">
      <InputGroupButton size="icon-xs" onClick={() => setValue("")}>
        <X className="size-4" />
      </InputGroupButton>
    </InputGroupAddon>
  )}
</InputGroup>`,
        },
        {
          title: 'Password Toggle',
          description: 'Password input with show/hide toggle.',
          preview: <PasswordToggleExample />,
          code: `const [showPassword, setShowPassword] = useState(false);

<InputGroup>
  <InputGroupAddon align="inline-start">
    <Lock className="size-4" />
  </InputGroupAddon>
  <InputGroupInput
    type={showPassword ? "text" : "password"}
    placeholder="Enter password"
  />
  <InputGroupAddon align="inline-end">
    <InputGroupButton
      size="icon-xs"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
        },
        {
          title: 'With Separator',
          description: 'Multiple addons separated visually.',
          preview: (
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupSeparator />
              <InputGroupInput placeholder="Search files..." />
              <InputGroupSeparator />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="xs" variant="ghost">
                  Search
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          ),
          code: `<InputGroup>
  <InputGroupAddon>
    <Search className="size-4" />
  </InputGroupAddon>
  <InputGroupSeparator />
  <InputGroupInput placeholder="Search files..." />
  <InputGroupSeparator />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs" variant="ghost">
      Search
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
        },
        {
          title: 'Block Layout - Top',
          description: 'Addon positioned above the input.',
          preview: (
            <InputGroup>
              <InputGroupAddon align="block-start">
                <InputGroupText>Email Address</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput type="email" placeholder="you@example.com" />
            </InputGroup>
          ),
          code: `<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText>Email Address</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="email" placeholder="you@example.com" />
</InputGroup>`,
        },
        {
          title: 'Block Layout - Bottom',
          description: 'Addon positioned below the input.',
          preview: (
            <InputGroup>
              <InputGroupInput type="text" placeholder="Username" />
              <InputGroupAddon align="block-end">
                <InputGroupText className="text-xs">
                  This will be your public username
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          ),
          code: `<InputGroup>
  <InputGroupInput type="text" placeholder="Username" />
  <InputGroupAddon align="block-end">
    <InputGroupText className="text-xs">
      This will be your public username
    </InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
        },
        {
          title: 'With Textarea',
          description: 'Multi-line text input with send button.',
          preview: (
            <InputGroup>
              <InputGroupTextarea placeholder="Type your message..." rows={3} />
              <InputGroupAddon align="block-end">
                <InputGroupButton size="sm" variant="default">
                  <Send className="size-3" />
                  Send
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          ),
          code: `<InputGroup>
  <InputGroupTextarea placeholder="Type your message..." rows={3} />
  <InputGroupAddon align="block-end">
    <InputGroupButton size="sm" variant="default">
      <Send className="size-3" />
      Send
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
        },
      ]}
      props={[
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant for the input group.',
        },
        {
          name: 'align',
          type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
          default: '"inline-start"',
          description: 'Position of the addon relative to input.',
        },
        {
          name: 'variant',
          type: 'ButtonVariant',
          default: '"ghost"',
          description: 'Button variant for InputGroupButton.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'Render InputGroupText as child element.',
        },
        {
          name: 'orientation',
          type: '"vertical" | "horizontal"',
          default: '"vertical"',
          description: 'Separator orientation.',
        },
      ]}
      accessibility={[
        'Input maintains focus when clicking on addons',
        'Keyboard navigation works for all interactive elements',
        'Buttons have appropriate size targets for touch devices',
        'Icons have proper sizing and do not interfere with text',
        'Focus visible styles applied to interactive elements',
        'Disabled state prevents all interactions',
        'ARIA attributes properly managed on input element',
      ]}
      previous={{ title: 'Input', href: '/docs/components/input' }}
      next={{ title: 'Input Number', href: '/docs/components/input-number' }}
    />
  );
}
