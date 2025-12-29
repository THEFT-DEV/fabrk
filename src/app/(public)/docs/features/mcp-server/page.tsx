import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import { Bot, Code, Palette, Zap, FileCode, CheckCircle } from 'lucide-react';
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from '@/data/landing/stats';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'MCP Server - Fabrk Docs',
  description:
    'Connect AI tools like Claude Code and Cursor to your Fabrk project. Get design-aware code generation with terminal aesthetic.',
};

export default function MCPServerPage() {
  return (
    <FeatureGuideTemplate
      code="[0xAI]"
      category="Features"
      title="MCP Server"
      description="AI-powered development with Fabrk design system knowledge."
      overview={`The Model Context Protocol (MCP) server gives AI assistants deep knowledge of the Fabrk design system. When connected, your AI tool understands our terminal aesthetic, knows all ${COMPONENT_COUNT_STRING} components, and generates code that follows design rules automatically. No more manually correcting rounded corners or fixing color tokens.`}
      features={[
        {
          icon: Palette,
          title: `${COMPONENT_COUNT_STRING} Components`,
          description:
            'Full catalog with props, variants, and usage examples. AI knows every component.',
        },
        {
          icon: Bot,
          title: `${THEME_COUNT_STRING} Themes`,
          description: 'CRT phosphor, retro computer, handheld, and monochrome themes built-in.',
        },
        {
          icon: Code,
          title: 'Code Generation',
          description:
            'Generate components and pages that follow terminal aesthetic automatically.',
        },
        {
          icon: CheckCircle,
          title: 'Design Validation',
          description: 'Check code against design system rules before committing.',
        },
        {
          icon: Zap,
          title: 'Guided Workflows',
          description: 'Pre-configured prompts for landing pages, dashboards, and forms.',
        },
        {
          icon: FileCode,
          title: 'Page Scaffolding',
          description: 'Generate complete pages with proper structure and components.',
        },
      ]}
      setup={[
        {
          title: 'Run Setup Script',
          description:
            'The easiest way to configure MCP. Run this from your project root and follow the prompts.',
          code: `npm run mcp:setup

# The script will:
# 1. Build the MCP server if needed
# 2. Ask which AI tool you're using
# 3. Create the config file automatically

# Supported tools:
# - Claude Code (.mcp.json in project)
# - Cursor (manual config)
# - Claude Desktop (global config)`,
          language: 'bash',
        },
        {
          title: 'Manual Setup - Claude Code',
          description: 'If you prefer manual setup, create .mcp.json in your project root.',
          code: `{ 
  "mcpServers": {
    "fabrk": {
      "command": "node",
      "args": ["./mcp-servers/fabrk/dist/index.js"]
    }
  }
}`,
          language: 'json',
        },
        {
          title: 'Manual Setup - Claude Desktop',
          description:
            'For Claude Desktop, add to your global config file. Use the absolute path to your project.',
          code: `// macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
// Windows: %APPDATA%\Claude\claude_desktop_config.json

{
  "mcpServers": {
    "fabrk": {
      "command": "node",
      "args": ["/path/to/your/project/mcp-servers/fabrk/dist/index.js"]
    }
  }
}`,
          language: 'json',
        },
        {
          title: 'Restart Your AI Tool',
          description:
            'After adding the config, restart Claude Code or Claude Desktop. The MCP server will start automatically when you open your project.',
        },
      ]}
      usage={[
        {
          title: 'Generate a Component',
          description:
            'Ask your AI to generate Fabrk-styled components. The MCP provides design context automatically.',
          code: `// Example prompt:
"Generate a pricing card component with terminal header"

// The AI will create:
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export function PricingCard({ plan, price, features }: { plan: string; price: number; features: string[] }) {
  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardHeader code="0x10" title={plan.toUpperCase()} />
      <CardContent className="space-y-4">
        <div className={cn('text-3xl font-bold', mode.font)}>
          \${price}
          <span className="text-muted-foreground text-sm">/mo</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className={cn('text-muted-foreground', mode.font, 'text-xs')}>
              [OK] {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={cn(mode.radius, mode.font, 'w-full text-xs')}>
          > GET STARTED
        </Button>
      </CardFooter>
    </Card>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Scaffold a Page',
          description: 'Generate complete pages with proper structure, imports, and components.',
          code: `// Example prompt:
"Create a dashboard page with analytics cards and a data table"

// The AI will generate a full page with:
// - Proper imports from @/components/ui/
// - Terminal-styled headers [ [0xXX] TITLE ]
// - Design token colors (bg-background, text-foreground)
// - Correct spacing (8-point grid)
// - Mobile-responsive layout`,
          language: 'typescript',
        },
        {
          title: 'Validate Your Code',
          description: 'Check existing code against Fabrk design rules.',
          code: `// Example prompt:
"Validate this component: <Button className='rounded-[4px] bg-blue-500'>Submit</Button>"

// The AI will identify issues:
// ✗ Border radius should be rounded-none (terminal aesthetic)
// ✗ bg-blue-500 should be bg-primary (use design tokens)
// ✗ Button text should be "> SUBMIT" (uppercase with prefix)

// And suggest the fix:
<Button className="rounded-none bg-primary text-xs font-mono">
  > SUBMIT
</Button>`,
          language: 'tsx',
        },
      ]}
      previous={{ title: 'Webhooks', href: '/docs/features/webhooks' }}
      next={{ title: 'Analytics', href: '/docs/features/analytics' }}
    >
      {/* Available Tools Section */}
      <DocsSection title="Available Tools">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="GENERATE_COMPONENT">
            <p className="mb-4">Generate Fabrk-styled components with terminal aesthetic.</p>
            Parameters
            <ul className="mt-2 space-y-1">
              <li>• componentType (required): button, card, form, table</li>
              <li>• name (required): Component name</li>
              <li>• variant: default, destructive, outline</li>
              <li>• withTerminalHeader: Include [ [0xXX] ] header</li>
            </ul>
          </DocsCard>

          <DocsCard title="GENERATE_PAGE">
            <p className="mb-4">Scaffold complete pages using Fabrk templates.</p>
            Parameters
            <ul className="mt-2 space-y-1">
              <li>• pageType (required): landing, dashboard, settings</li>
              <li>• pageName (required): Page name</li>
              <li>• sections: hero, features, pricing, cta</li>
            </ul>
          </DocsCard>

          <DocsCard title="QUERY_COMPONENT">
            <p className="mb-4">
              Get detailed docs for any of the ${COMPONENT_COUNT_STRING} components.
            </p>
            Parameters
            <ul className="mt-2 space-y-1">
              <li>• component (required): Component name or slug</li>
              <li>• include: props, variants, examples, a11y</li>
            </ul>
          </DocsCard>

          <DocsCard title="VALIDATE_CODE">
            <p className="mb-4">Check code against design system rules.</p>
            Parameters
            <ul className="mt-2 space-y-1">
              <li>• code (required): TSX/JSX to validate</li>
              <li>• strict: Fail on warnings too</li>
            </ul>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Pre-configured Prompts */}
      <DocsSection title="Guided Workflows">
        <DocsCallout variant="info" title="Prompts are step-by-step guides">
          These prompts walk the AI through building common features. They ensure the AI follows
          Fabrk patterns consistently, even for complex multi-step tasks.
        </DocsCallout>

        <div className="mt-6 space-y-4">
          <DocsCard title="BUILD_LANDING_PAGE">
            <p className="mb-4">
              Guided workflow for building a terminal-styled landing page with hero, features,
              pricing, and CTA sections.
            </p>
            Arguments
            <ul className="mt-2 space-y-1">
              <li>• productName (required): Your product name</li>
              <li>• sections: Comma-separated list of sections</li>
            </ul>
          </DocsCard>

          <DocsCard title="ADD_DASHBOARD_FEATURE">
            <p className="mb-4">
              Add a new feature card to a dashboard. Supports analytics cards, data tables, forms,
              and settings panels.
            </p>
            Arguments
            <ul className="mt-2 space-y-1">
              <li>• featureName (required): Name of the feature</li>
              <li>• featureType: analytics, data-table, form, settings</li>
            </ul>
          </DocsCard>

          <DocsCard title="CREATE_FORM">
            <p className="mb-4">
              Build a form with Zod validation, React Hook Form, and proper terminal styling.
            </p>
            Arguments
            <ul className="mt-2 space-y-1">
              <li>• formName (required): Name for the form component</li>
              <li>• fields (required): Comma-separated field names</li>
            </ul>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Design Rules Enforced */}
      <DocsSection title="Design Rules Enforced">
        <DocsCard title="TERMINAL AESTHETIC">
          <p className="mb-4">The MCP server teaches AI these core design principles:</p>
          <div className="space-y-4">
            <div>
              <strong>1. Sharp Edges</strong>
              <p className="text-muted-foreground">
                Always use rounded-none. Never use other border radius values like sm, md, or lg.
              </p>
            </div>
            <div>
              <strong>2. Monospace Font</strong>
              <p className="text-muted-foreground">
                All text uses font-mono. Body tag has JetBrains Mono applied globally.
              </p>
            </div>
            <div>
              <strong>3. Color Tokens</strong>
              <p className="text-muted-foreground">
                Use bg-background, text-foreground, border-border. Never hex values or Tailwind
                colors.
              </p>
            </div>
            <div>
              <strong>4. Terminal Formatting</strong>
              <p className="text-muted-foreground">
                Buttons: &apos;&gt; UPPERCASE&apos;. Labels: &apos;[LABEL]:&apos;. Headers: &apos;[
                [0xXX] TITLE ]&apos;.
              </p>
            </div>
            <div>
              <strong>5. 8-Point Grid</strong>
              <p className="text-muted-foreground">
                Spacing uses 4px, 8px, 16px, 24px, 32px. Classes: p-1, p-2, p-4, p-6, p-8.
              </p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <div className="space-y-4">
          <details className={cn('border-border bg-card border', mode.radius)}>
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              MCP server not responding
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <ol className="list-decimal space-y-2 pl-4">
                <li>
                  Check the server is built:{' '}
                  <code className="bg-muted px-1">ls mcp-servers/fabrk/dist/index.js</code>
                </li>
                <li>
                  If missing, rebuild: <code className="bg-muted px-1">npm run mcp:build</code>
                </li>
                <li>Restart your AI tool completely (not just the chat)</li>
                <li>Check the .mcp.json path is correct for your project location</li>
              </ol>
            </div>
          </details>

          <details className={cn('border-border bg-card border', mode.radius)}>
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              AI generating wrong code style
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              The AI might not have loaded the MCP context. Try explicitly referencing it:
              <code className="bg-muted mt-2 block p-2">
                "Using the Fabrk MCP server, show me the design system rules"
              </code>
              This forces the AI to query the MCP resources before generating code.
            </div>
          </details>

          <details className={cn('border-border bg-card border', mode.radius)}>
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              Config file not found
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Run <code className="bg-muted px-1">npm run mcp:setup</code> to auto-generate the
              config. For Claude Desktop, make sure you're using the absolute path to your project.
            </div>
          </details>

          <details className={cn('border-border bg-card border', mode.radius)}>
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              Cursor MCP setup
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              Cursor requires manual configuration:
              <ol className="list-decimal space-y-2 pt-2 pl-4">
                <li>Open Cursor Settings (Cmd/Ctrl + ,)</li>
                <li>Search for "MCP"</li>
                <li>
                  Add server: name=fabrk, command=node, args=./mcp-servers/fabrk/dist/index.js
                </li>
              </ol>
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/design/theme-guide">
            <DocsCard title="THEME GUIDE" className="h-full transition-all">
              <p>Learn about Fabrk's 12 terminal themes and how to customize them.</p>
            </DocsCard>
          </Link>
          <Link href="/docs/components/button">
            <DocsCard title="COMPONENTS" className="h-full transition-all">
              <p>
                Browse all {COMPONENT_COUNT_STRING} components with examples and usage
                documentation.
              </p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
