/**
 * Generate Component Tool
 * Creates Fabrk-styled component code with terminal aesthetic
 */

import { findComponent, componentCatalog } from '../data/component-catalog.js';
import { designTokens } from '../data/design-tokens.js';

interface GenerateComponentArgs {
  componentType: string;
  name: string;
  variant?: string;
  withTerminalHeader?: boolean;
}

export function generateComponent(args: GenerateComponentArgs): string {
  const { componentType, name, variant, withTerminalHeader = true } = args;

  // Find component metadata
  const component = findComponent(componentType);

  if (!component) {
    // Generate a custom component following Fabrk patterns
    return generateCustomComponent(name, withTerminalHeader);
  }

  // Generate based on component type
  switch (component.slug) {
    case 'button':
      return generateButton(name, variant);
    case 'card':
      return generateCard(name, withTerminalHeader);
    case 'input':
      return generateInput(name);
    case 'form':
      return generateForm(name);
    default:
      return generateGenericComponent(name, component, withTerminalHeader);
  }
}

function generateButton(name: string, variant?: string): string {
  const variantProp = variant ? ` variant="${variant}"` : '';
  return `// ${name} Button Component
import { Button } from '@/components/ui/button';

export function ${name}() {
  return (
    <Button${variantProp} className="rounded-none font-mono text-xs">
      > ${name.toUpperCase().replace(/([A-Z])/g, '_$1').replace(/^_/, '')}
    </Button>
  );
}`;
}

function generateCard(name: string, withHeader: boolean): string {
  const hexCode = generateHexCode(name);
  const title = name.toUpperCase().replace(/([A-Z])/g, '_$1').replace(/^_/, '');

  if (withHeader) {
    return `// ${name} Card Component
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function ${name}() {
  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardHeader code="${hexCode}" title="${title}" />
      <CardContent>
        <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
          Card content goes here
        </p>
      </CardContent>
      <CardFooter>
        <Button className={cn(mode.radius, mode.font, 'text-xs')}>
          > ACTION
        </Button>
      </CardFooter>
    </Card>
  );
}`;
  }

  return `// ${name} Card Component
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function ${name}() {
  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardContent className="p-4">
        <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
          Card content goes here
        </p>
      </CardContent>
    </Card>
  );
}`;
}

function generateInput(name: string): string {
  return `// ${name} Input Component
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function ${name}() {
  return (
    <div className="space-y-2">
      <Label className={cn(mode.font, 'text-sm')}>
        [${name.toUpperCase()}]:
      </Label>
      <Input
        placeholder="Enter value..."
        className={cn(mode.radius, mode.font, 'text-sm')}
      />
    </div>
  );
}`;
}

function generateForm(name: string): string {
  const hexCode = generateHexCode(name);
  return `// ${name} Form Component
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function ${name}() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission
    setLoading(false);
  };

  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardHeader code="${hexCode}" title="${name.toUpperCase()}" />
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-sm')}>[FIELD_1]:</Label>
            <Input
              name="field1"
              placeholder="Enter value..."
              className={cn(mode.radius, mode.font, 'text-sm')}
            />
          </div>
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-sm')}>[FIELD_2]:</Label>
            <Input
              name="field2"
              placeholder="Enter value..."
              className={cn(mode.radius, mode.font, 'text-sm')}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            loading={loading}
            className={cn(mode.radius, mode.font, 'text-xs')}
          >
            > SUBMIT
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}`;
}

function generateGenericComponent(
  name: string,
  component: (typeof componentCatalog)[0],
  withHeader: boolean
): string {
  const hexCode = generateHexCode(name);

  return `// ${name} Component (based on ${component.name})
${component.import}
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * ${component.description}
 *
 * Design Notes:
 * ${component.designNotes.map((n) => `- ${n}`).join('\n * ')}
 */
export function ${name}() {
  return (
    <div className={cn('border border-border bg-card', mode.radius)}>
      ${
        withHeader
          ? `<div className="border-b border-border px-4 py-2">
        <span className={cn('text-muted-foreground', mode.font, 'text-xs')}>
          [ [${hexCode}] ${name.toUpperCase()} ]
        </span>
      </div>`
          : ''
      }
      <div className="p-4">
        {/* Component content */}
        <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
          Content goes here
        </p>
      </div>
    </div>
  );
}`;
}

function generateCustomComponent(name: string, withHeader: boolean): string {
  const hexCode = generateHexCode(name);
  const title = name.toUpperCase().replace(/([A-Z])/g, '_$1').replace(/^_/, '');

  return `// ${name} Component (Custom)
'use client';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Custom ${name} component following Fabrk design system.
 *
 * Design Rules Applied:
 * - rounded-none (terminal aesthetic)
 * - font-mono (monospace text)
 * - Design tokens only (no hardcoded colors)
 * - Terminal header format: [ [0xXX] TITLE ]
 */
export function ${name}() {
  return (
    <div className={cn('border border-border bg-card', mode.radius)}>
      ${
        withHeader
          ? `{/* Terminal Header */}
      <div className="border-b border-border px-4 py-2">
        <span className={cn('text-muted-foreground', mode.font, 'text-xs')}>
          [ [${hexCode}] ${title} ]
        </span>
      </div>`
          : ''
      }

      {/* Content */}
      <div className="p-4">
        <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
          {/* Add your content here */}
        </p>
      </div>
    </div>
  );
}`;
}

// Generate a hex code from component name
function generateHexCode(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return '0x' + Math.abs(hash % 256).toString(16).padStart(2, '0').toUpperCase();
}
