---
title: 'MCP Server: AI-Assisted Development for Fabrk'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'mcp-server-ai-development'
description: 'Fabrk includes an MCP server that gives AI tools (Claude Code, Cursor) deep knowledge of the codebase. Generate components, pages, and features with context.'
publishedAt: '2026-01-23T10:00:00.000Z'
---

**Give your AI tools superpowers with MCP.**

---

## What is MCP?

Model Context Protocol (MCP) is a standard for giving AI tools structured context about your codebase. Instead of AI guessing your patterns or repeatedly asking about your architecture, MCP provides:

- **Component library documentation** - All 62+ components with props and examples
- **Design system rules** - Tokens, spacing, typography constraints
- **Code patterns** - Authentication, API routes, database queries
- **Project structure** - Directory conventions, naming standards
- **Theme information** - All 18 themes with color tokens

MCP bridges the gap between "AI that can code" and "AI that understands your codebase."

---

## Why Use MCP?

### Without MCP

```
User: Create a stats card component

AI: *guesses at structure*
    *uses hardcoded colors*
    *doesn't know about mode.radius*
    *creates a component that doesn't match the codebase*
```

### With MCP

```
User: Create a stats card component

AI: *queries list_components*
    *queries get_design_rules*
    *queries get_component('Card')*

AI: Uses Card, Badge from existing UI library
    Applies mode.radius, mode.font
    Uses UPPERCASE labels with brackets
    Returns production-ready terminal-styled component
```

---

## Fabrk's MCP Server

Fabrk includes a pre-built MCP server:

```
mcp-servers/fabrk/
├── src/
│   ├── index.ts           # Server entry point
│   ├── tools.ts           # Tool definitions
│   ├── resources.ts       # Resource handlers
│   └── knowledge/         # Codebase knowledge
│       ├── components.ts  # Component documentation
│       ├── design.ts      # Design system rules
│       ├── patterns.ts    # Code patterns
│       └── themes.ts      # Theme information
├── package.json
├── tsconfig.json
└── README.md
```

---

## Installation

### Step 1: Build the MCP Server

```bash
cd mcp-servers/fabrk
npm install
npm run build
```

### Step 2: Configure Claude Code

Add to your Claude Code configuration:

```json
// ~/.claude/config.json
{
  "mcpServers": {
    "fabrk": {
      "command": "node",
      "args": ["/path/to/project/mcp-servers/fabrk/dist/index.js"],
      "cwd": "/path/to/project"
    }
  }
}
```

### Step 3: Configure Cursor (Alternative)

```json
// .cursor/mcp.json
{
  "mcpServers": {
    "fabrk": {
      "command": "node",
      "args": ["./mcp-servers/fabrk/dist/index.js"]
    }
  }
}
```

### Step 4: Verify Connection

In your AI tool, ask:
```
What components are available in this project?
```

If MCP is working, the AI will query the `list_components` tool and return accurate information.

---

## Available Tools

The MCP server provides these tools to AI assistants:

### list_components

Lists all available UI components with categories:

```typescript
// Tool definition
{
  name: 'list_components',
  description: 'List all available UI components in the Fabrk design system',
  inputSchema: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        enum: ['form', 'layout', 'feedback', 'navigation', 'overlay', 'data', 'chart'],
        description: 'Filter by component category',
      },
    },
  },
}

// Example output
{
  components: [
    { name: 'Button', category: 'form', path: '@/components/ui/button' },
    { name: 'Input', category: 'form', path: '@/components/ui/input' },
    { name: 'Card', category: 'layout', path: '@/components/ui/card' },
    // ... 62+ components
  ],
  totalCount: 62,
}
```

### get_component

Get detailed information about a specific component:

```typescript
// Tool definition
{
  name: 'get_component',
  description: 'Get detailed information about a specific component',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Component name (e.g., "Button", "Card")',
      },
    },
    required: ['name'],
  },
}

// Example output for Button
{
  name: 'Button',
  path: '@/components/ui/button',
  description: 'Interactive button component with multiple variants',
  props: {
    variant: {
      type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
      default: "'default'",
      description: 'Visual style variant',
    },
    size: {
      type: "'default' | 'sm' | 'lg' | 'icon'",
      default: "'default'",
      description: 'Button size',
    },
    asChild: {
      type: 'boolean',
      default: 'false',
      description: 'Merge props onto child element',
    },
  },
  examples: [
    {
      title: 'Primary button',
      code: '<Button className={cn(mode.radius)}>> SUBMIT</Button>',
    },
    {
      title: 'Destructive button',
      code: '<Button variant="destructive" className={cn(mode.radius)}>> DELETE</Button>',
    },
  ],
}
```

### list_themes

List all 18 available themes:

```typescript
// Example output
{
  themes: [
    {
      name: 'default',
      description: 'Clean terminal theme',
      radius: 'rounded',
      primaryHue: 145,
    },
    {
      name: 'matrix',
      description: 'Green on black terminal',
      radius: 'sharp',
      primaryHue: 140,
    },
    {
      name: 'dracula',
      description: 'Purple accents',
      radius: 'rounded',
      primaryHue: 300,
    },
    // ... 18 themes total
  ],
}
```

### get_design_rules

Get design system rules and constraints:

```typescript
// Example output
{
  rules: [
    {
      category: 'colors',
      rule: 'Never use hardcoded colors',
      examples: {
        correct: 'bg-primary text-primary-foreground',
        incorrect: 'bg-purple-500 text-white',
      },
    },
    {
      category: 'radius',
      rule: 'Use mode.radius for elements with full borders',
      examples: {
        correct: '<Card className={cn("border border-border", mode.radius)}>',
        incorrect: '<Card className="border border-border rounded-lg">',
      },
    },
    {
      category: 'typography',
      rule: 'Use UPPERCASE for labels and buttons',
      examples: {
        correct: '[ STATUS ] and > SUBMIT',
        incorrect: '[ status ] and > Submit',
      },
    },
  ],
}
```

### generate_page

Generate a new page with proper structure:

```typescript
// Tool definition
{
  name: 'generate_page',
  description: 'Generate a new page following Fabrk conventions',
  inputSchema: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'Page path (e.g., "/dashboard/analytics")',
      },
      title: {
        type: 'string',
        description: 'Page title',
      },
      description: {
        type: 'string',
        description: 'Page description for metadata',
      },
      authenticated: {
        type: 'boolean',
        description: 'Whether page requires authentication',
        default: true,
      },
    },
    required: ['path', 'title'],
  },
}

// Example output
{
  files: [
    {
      path: 'src/app/(platform)/dashboard/analytics/page.tsx',
      content: `import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Analytics | Your App',
  description: 'View your analytics dashboard',
};

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <span className="text-xs text-muted-foreground">[ DASHBOARD ]</span>
        <h1 className="text-2xl font-semibold">ANALYTICS</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats cards here */}
      </div>
    </div>
  );
}`,
    },
  ],
}
```

### get_api_pattern

Get API route patterns and examples:

```typescript
// Example output
{
  patterns: {
    authenticated: `import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Your logic here
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}`,
    webhook: `import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const headersList = headers();
  const signature = headersList.get('x-signature');

  // Verify webhook signature
  if (!verifySignature(signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = await request.json();

  // Handle webhook event
  switch (payload.type) {
    case 'event.type':
      // Handle event
      break;
  }

  return NextResponse.json({ received: true });
}`,
  },
}
```

---

## How AI Uses MCP

When you ask AI to build something, here's the flow:

### 1. User Request

```
Create a dashboard stats card showing monthly revenue with a trend indicator
```

### 2. AI Queries MCP

```typescript
// Query 1: What components exist?
await mcp.call('list_components', { category: 'layout' });
// Returns: Card, Tabs, Accordion, etc.

// Query 2: Get Card component details
await mcp.call('get_component', { name: 'Card' });
// Returns: Props, examples, usage patterns

// Query 3: What are the design rules?
await mcp.call('get_design_rules');
// Returns: Color tokens, mode.radius, typography rules

// Query 4: Get Badge component for trend indicator
await mcp.call('get_component', { name: 'Badge' });
// Returns: Badge props and styling
```

### 3. AI Generates Code

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface RevenueCardProps {
  revenue: number;
  previousRevenue: number;
}

export function RevenueCard({ revenue, previousRevenue }: RevenueCardProps) {
  const trend = ((revenue - previousRevenue) / previousRevenue) * 100;
  const isPositive = trend > 0;

  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardHeader className="pb-2">
        <span className="text-xs text-muted-foreground">[ REVENUE ]</span>
        <CardTitle className="text-sm font-medium">MONTHLY REVENUE</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          ${revenue.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            className={cn(
              isPositive
                ? 'bg-success/10 text-success border-success/50'
                : 'bg-destructive/10 text-destructive border-destructive/50'
            )}
          >
            {isPositive ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {Math.abs(trend).toFixed(1)}%
          </Badge>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
```

The AI knew to:
- Use existing Card and Badge components
- Apply `mode.radius` for theme-aware borders
- Use `cn()` for conditional classes
- Follow bracket notation for labels (`[ REVENUE ]`)
- Use design tokens (`text-primary`, `bg-success/10`)
- Make it TypeScript with proper props

---

## Knowledge Base

The MCP server includes comprehensive knowledge about:

### Components (62+)

Every UI component is documented:

```typescript
// knowledge/components.ts
export const components = {
  Button: {
    path: '@/components/ui/button',
    category: 'form',
    description: 'Interactive button with variants',
    props: { /* ... */ },
    examples: [ /* ... */ ],
  },
  Card: {
    path: '@/components/ui/card',
    category: 'layout',
    description: 'Container component with header, content, footer',
    subcomponents: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
    props: { /* ... */ },
    examples: [ /* ... */ ],
  },
  // ... 60+ more components
};
```

### Design System

Complete design system rules:

```typescript
// knowledge/design.ts
export const designRules = {
  colors: {
    rule: 'Use design tokens, never hardcoded colors',
    allowed: [
      'bg-background', 'bg-card', 'bg-muted', 'bg-primary',
      'text-foreground', 'text-muted-foreground', 'text-primary',
      'border-border', 'border-primary',
    ],
    banned: [
      'bg-white', 'bg-black', 'bg-gray-*', 'text-gray-*',
      '#hexvalues', 'rgb(*)', 'hsl(*)',
    ],
  },
  radius: {
    rule: 'Use mode.radius for full-border elements',
    apply: ['Card', 'Button', 'Input', 'Dialog', 'Alert'],
    skip: ['Table cells', 'Partial borders', 'Switch (always rounded-full)'],
  },
  typography: {
    rule: 'Monospace font globally, UPPERCASE for labels',
    patterns: {
      labels: '[ LABEL ] with brackets',
      buttons: '> SUBMIT with chevron prefix',
      headings: 'UPPERCASE',
      body: 'Sentence case',
    },
  },
  spacing: {
    rule: '8-point grid system',
    scale: {
      xs: 'p-1 (4px)',
      sm: 'p-2 (8px)',
      md: 'p-4 (16px)',
      lg: 'p-6 (24px)',
      xl: 'p-8 (32px)',
    },
  },
};
```

### Code Patterns

Common code patterns:

```typescript
// knowledge/patterns.ts
export const patterns = {
  authentication: {
    serverComponent: `const session = await auth();
if (!session?.user) redirect('/login');`,
    apiRoute: `const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}`,
    clientCheck: `const { data: session } = useSession();
if (!session) return <LoginPrompt />;`,
  },
  errorHandling: {
    apiRoute: `try {
  // Logic
  return NextResponse.json({ data }, { status: 200 });
} catch (error) {
  console.error('Description:', error);
  return NextResponse.json({ error: 'Message' }, { status: 500 });
}`,
  },
  database: {
    query: `const data = await prisma.model.findMany({
  where: { userId: session.user.id },
  orderBy: { createdAt: 'desc' },
});`,
    create: `const item = await prisma.model.create({
  data: { ...input, userId: session.user.id },
});`,
  },
};
```

### Architecture

Project structure knowledge:

```typescript
// knowledge/architecture.ts
export const architecture = {
  directories: {
    'src/app/(public)': 'Public pages (landing, pricing)',
    'src/app/(platform)': 'Authenticated app pages',
    'src/app/(auth)': 'Auth pages (login, register)',
    'src/app/api': 'API routes',
    'src/components/ui': 'UI primitives (62 components)',
    'src/components/charts': 'Chart components (8)',
    'src/lib': 'Business logic, utilities',
    'src/hooks': 'Custom React hooks',
  },
  conventions: {
    pages: 'Use route groups for organization',
    components: 'Feature components in src/components/{feature}/',
    api: 'RESTful routes with proper error handling',
  },
};
```

---

## Custom Tools

Add project-specific tools:

```typescript
// mcp-servers/fabrk/src/tools.ts

export const customTools = [
  {
    name: 'generate_api_route',
    description: 'Generate a new API route with authentication and error handling',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Route path (e.g., "/api/users")' },
        methods: {
          type: 'array',
          items: { enum: ['GET', 'POST', 'PATCH', 'DELETE'] },
          description: 'HTTP methods to implement',
        },
        authenticated: { type: 'boolean', default: true },
        rateLimit: { type: 'string', enum: ['auth', 'api', 'strict'] },
      },
      required: ['path', 'methods'],
    },
    handler: async ({ path, methods, authenticated, rateLimit }) => {
      // Generate route code based on parameters
      return { code: generatedCode };
    },
  },

  {
    name: 'generate_form',
    description: 'Generate a form component with validation',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Form component name' },
        fields: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { enum: ['text', 'email', 'password', 'number', 'select', 'textarea'] },
              required: { type: 'boolean' },
              validation: { type: 'string' },
            },
          },
        },
        onSubmit: { type: 'string', description: 'API endpoint or action' },
      },
      required: ['name', 'fields'],
    },
    handler: async ({ name, fields, onSubmit }) => {
      // Generate form with react-hook-form and zod validation
      return { code: generatedFormCode };
    },
  },
];
```

---

## Benefits

### Consistency

AI always uses correct patterns:
- Imports from the right paths
- Uses existing components instead of creating new ones
- Follows design rules automatically
- Applies proper TypeScript types

### Speed

AI doesn't need to explore the codebase:
- Component props are pre-documented
- Examples are provided for common use cases
- Patterns are defined for standard operations
- No back-and-forth questions about architecture

### Quality

Generated code matches your standards:
- Proper TypeScript with full types
- Correct styling with design tokens
- Consistent architecture following conventions
- Accessible by default (components are pre-tested)

### Maintainability

Code follows established patterns:
- New team members can use AI to learn patterns
- Generated code looks like hand-written code
- Consistent style across the entire codebase
- Easy to review and modify

---

## Supported AI Tools

The MCP server works with:

| Tool | Integration | Notes |
|------|-------------|-------|
| Claude Code | Native MCP | Full support |
| Cursor | MCP config | Via .cursor/mcp.json |
| Continue | MCP support | Via config |
| Cody | Limited | Resource-only |
| Any MCP client | Full | Standard protocol |

---

## Example Workflow

### 1. Start a Session

```
User: I need to build a user settings page with profile info and password change
```

### 2. AI Plans Using MCP

```
Let me check what components and patterns are available...

[Calls list_components]
[Calls get_design_rules]
[Calls get_api_pattern]

I'll create:
- Settings page at /dashboard/settings
- ProfileForm component using existing Input, Button
- PasswordForm component with validation
- API routes for profile update and password change
```

### 3. AI Generates Code

The AI produces multiple files:
- `src/app/(platform)/dashboard/settings/page.tsx`
- `src/components/settings/profile-form.tsx`
- `src/components/settings/password-form.tsx`
- `src/app/api/user/profile/route.ts`
- `src/app/api/user/password/route.ts`

All following Fabrk conventions:
- Using existing UI components
- Applying mode.radius and design tokens
- Proper authentication checks
- TypeScript with Zod validation

### 4. Result

Production-ready code that:
- Matches the existing codebase style
- Uses established patterns
- Works with all 18 themes
- Includes proper error handling

---

## Configuration Options

Customize MCP server behavior:

```typescript
// mcp-servers/fabrk/src/config.ts
export const config = {
  // Include component documentation
  includeComponents: true,

  // Include design system rules
  includeDesignSystem: true,

  // Include code patterns
  includePatterns: true,

  // Include example code
  includeExamples: true,

  // Include theme information
  includeThemes: true,

  // Custom knowledge directories
  knowledgePaths: [
    './knowledge',
    '../../docs', // Include project docs
  ],

  // Component scanning
  componentPaths: [
    '../../src/components/ui',
    '../../src/components/charts',
  ],
};
```

---

## Troubleshooting

### MCP Not Connecting

```bash
# Verify the server builds
cd mcp-servers/fabrk
npm run build

# Test manually
node dist/index.js

# Check Claude Code logs
cat ~/.claude/logs/mcp.log
```

### Tools Not Appearing

Ensure your config file is correct:
```json
{
  "mcpServers": {
    "fabrk": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

### Knowledge Out of Date

Rebuild after adding components:
```bash
cd mcp-servers/fabrk
npm run build
```

---

## Getting Started

1. **Build**: `cd mcp-servers/fabrk && npm run build`
2. **Configure**: Add to your AI tool's MCP config
3. **Verify**: Ask "What components are available?"
4. **Use**: Start building with context-aware AI

Better AI assistance through context.
