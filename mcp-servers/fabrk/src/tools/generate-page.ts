/**
 * Generate Page Tool
 * Scaffolds complete pages using Fabrk templates
 */

interface GeneratePageArgs {
  pageType: 'landing' | 'dashboard' | 'settings' | 'auth' | 'docs';
  pageName: string;
  sections?: string[];
}

export function generatePage(args: GeneratePageArgs): string {
  const { pageType, pageName, sections = [] } = args;

  switch (pageType) {
    case 'landing':
      return generateLandingPage(pageName, sections);
    case 'dashboard':
      return generateDashboardPage(pageName, sections);
    case 'settings':
      return generateSettingsPage(pageName);
    case 'auth':
      return generateAuthPage(pageName);
    case 'docs':
      return generateDocsPage(pageName);
    default:
      return generateGenericPage(pageName);
  }
}

function generateLandingPage(name: string, sections: string[]): string {
  const defaultSections = sections.length ? sections : ['hero', 'features', 'pricing', 'cta'];

  const sectionComponents = defaultSections
    .map((s) => {
      switch (s.toLowerCase()) {
        case 'hero':
          return `      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className={cn(mode.radius, mode.font, 'text-xs mb-4')}>
            [NOW_LIVE]
          </Badge>
          <h1 className={cn('text-4xl md:text-6xl font-bold mb-6', mode.font)}>
            ${name.toUpperCase()}
          </h1>
          <p className={cn('text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8', mode.font)}>
            Your product description goes here. Make it compelling.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className={cn(mode.radius, mode.font, 'text-xs')}>
              > GET_STARTED
            </Button>
            <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
              > LEARN_MORE
            </Button>
          </div>
        </div>
      </section>`;
        case 'features':
          return `      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', mode.font)}>
              [FEATURES]
            </h2>
            <p className={cn('text-muted-foreground', mode.font)}>
              Everything you need to build fast
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className={cn('border border-border', mode.radius)}>
                <CardHeader code={\`0x0\${i}\`} title={\`FEATURE_\${i}\`} />
                <CardContent>
                  <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
                    Feature description goes here.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>`;
        case 'pricing':
          return `      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', mode.font)}>
              [PRICING]
            </h2>
            <p className={cn('text-muted-foreground', mode.font)}>
              Simple, transparent pricing
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Add pricing cards here */}
          </div>
        </div>
      </section>`;
        case 'cta':
          return `      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', mode.font)}>
            READY_TO_START?
          </h2>
          <p className={cn('mb-8 opacity-90', mode.font)}>
            Join thousands of developers shipping faster
          </p>
          <Button variant="secondary" className={cn(mode.radius, mode.font, 'text-xs')}>
            > GET_STARTED_NOW
          </Button>
        </div>
      </section>`;
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join('\n\n');

  return `// ${name} Landing Page
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export const metadata = {
  title: '${name} - Fabrk',
  description: '${name} landing page built with Fabrk',
};

export default function ${name}Page() {
  return (
    <main className="min-h-screen">
${sectionComponents}
    </main>
  );
}`;
}

function generateDashboardPage(name: string, sections: string[]): string {
  return `// ${name} Dashboard Page
'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export default function ${name}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className={cn('text-2xl font-bold mb-2', mode.font)}>
          [${name.toUpperCase()}]
        </h1>
        <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
          Dashboard description
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { code: '0x01', title: 'TOTAL_USERS', value: '1,234' },
          { code: '0x02', title: 'ACTIVE_NOW', value: '56' },
          { code: '0x03', title: 'REVENUE', value: '$12.5K' },
          { code: '0x04', title: 'GROWTH', value: '+23%' },
        ].map((stat) => (
          <Card key={stat.code} className={cn('border border-border', mode.radius)}>
            <CardHeader code={stat.code} title={stat.title} />
            <CardContent>
              <p className={cn('text-2xl font-bold', mode.font)}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className={cn('border border-border', mode.radius)}>
          <CardHeader code="0x10" title="RECENT_ACTIVITY" />
          <CardContent>
            <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
              Activity list goes here
            </p>
          </CardContent>
        </Card>

        <Card className={cn('border border-border', mode.radius)}>
          <CardHeader code="0x11" title="QUICK_ACTIONS" />
          <CardContent className="space-y-2">
            <Button className={cn('w-full', mode.radius, mode.font, 'text-xs')}>
              > ACTION_1
            </Button>
            <Button variant="outline" className={cn('w-full', mode.radius, mode.font, 'text-xs')}>
              > ACTION_2
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}`;
}

function generateSettingsPage(name: string): string {
  return `// ${name} Settings Page
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export default function ${name}Page() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className={cn('text-2xl font-bold mb-2', mode.font)}>
          [${name.toUpperCase()}]
        </h1>
        <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
          Manage your settings
        </p>
      </div>

      {/* Profile Settings */}
      <Card className={cn('border border-border mb-6', mode.radius)}>
        <CardHeader code="0x01" title="PROFILE" />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-sm')}>[NAME]:</Label>
            <Input
              placeholder="Your name"
              className={cn(mode.radius, mode.font, 'text-sm')}
            />
          </div>
          <div className="space-y-2">
            <Label className={cn(mode.font, 'text-sm')}>[EMAIL]:</Label>
            <Input
              type="email"
              placeholder="your@email.com"
              className={cn(mode.radius, mode.font, 'text-sm')}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button loading={loading} className={cn(mode.radius, mode.font, 'text-xs')}>
            > SAVE_CHANGES
          </Button>
        </CardFooter>
      </Card>

      {/* Notification Settings */}
      <Card className={cn('border border-border', mode.radius)}>
        <CardHeader code="0x02" title="NOTIFICATIONS" />
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className={cn(mode.font, 'text-sm')}>[EMAIL_NOTIFICATIONS]:</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label className={cn(mode.font, 'text-sm')}>[PUSH_NOTIFICATIONS]:</Label>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`;
}

function generateAuthPage(name: string): string {
  const isSignIn = name.toLowerCase().includes('sign') && name.toLowerCase().includes('in');
  const isSignUp = name.toLowerCase().includes('sign') && name.toLowerCase().includes('up');

  return `// ${name} Auth Page
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export default function ${name}Page() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle authentication
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className={cn('w-full max-w-md border border-border', mode.radius)}>
        <CardHeader code="0xAA" title="${isSignIn ? 'SIGN_IN' : isSignUp ? 'CREATE_ACCOUNT' : 'AUTHENTICATE'}" />
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            ${
              isSignUp
                ? `<div className="space-y-2">
              <Label className={cn(mode.font, 'text-sm')}>[NAME]:</Label>
              <Input
                name="name"
                placeholder="Your name"
                className={cn(mode.radius, mode.font, 'text-sm')}
              />
            </div>`
                : ''
            }
            <div className="space-y-2">
              <Label className={cn(mode.font, 'text-sm')}>[EMAIL]:</Label>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                className={cn(mode.radius, mode.font, 'text-sm')}
              />
            </div>
            <div className="space-y-2">
              <Label className={cn(mode.font, 'text-sm')}>[PASSWORD]:</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                className={cn(mode.radius, mode.font, 'text-sm')}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button
              type="submit"
              loading={loading}
              className={cn('w-full', mode.radius, mode.font, 'text-xs')}
            >
              > ${isSignIn ? 'SIGN_IN' : isSignUp ? 'CREATE_ACCOUNT' : 'SUBMIT'}
            </Button>
            <p className={cn('text-muted-foreground text-center', mode.font, 'text-xs')}>
              ${
                isSignIn
                  ? `Don't have an account? <Link href="/sign-up" className="text-primary hover:underline">Create one</Link>`
                  : `Already have an account? <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link>`
              }
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}`;
}

function generateDocsPage(name: string): string {
  return `// ${name} Documentation Page
import { DocsCard, DocsSection, DocsHeader } from '@/components/docs';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export const metadata = {
  title: '${name} - Fabrk Docs',
  description: 'Documentation for ${name}',
};

export default function ${name}Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <DocsHeader
        code="[0x00]"
        category="Documentation"
        title="${name.toUpperCase()}"
        description="> Documentation for ${name}"
      />

      <DocsSection title="[OVERVIEW]">
        <DocsCard title="INTRODUCTION">
          <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
            Introduction content goes here.
          </p>
        </DocsCard>
      </DocsSection>

      <DocsSection title="[USAGE]">
        <DocsCard title="BASIC_USAGE">
          <pre className={cn('bg-muted p-4 overflow-x-auto', mode.radius)}>
            <code className={cn(mode.font, 'text-sm')}>
              {/* Code example */}
            </code>
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="[API]">
        <DocsCard title="PROPS">
          {/* Props table */}
        </DocsCard>
      </DocsSection>
    </div>
  );
}`;
}

function generateGenericPage(name: string): string {
  return `// ${name} Page
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export const metadata = {
  title: '${name} - Fabrk',
  description: '${name} page',
};

export default function ${name}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={cn('text-2xl font-bold mb-4', mode.font)}>
        [${name.toUpperCase()}]
      </h1>
      <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
        Page content goes here
      </p>
    </div>
  );
}`;
}
