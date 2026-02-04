/* eslint-disable ai/no-hardcoded-colors, ai/no-arbitrary-tailwind, design-system/no-hardcoded-colors -- Documentation page showing examples of violations */
import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';

export const metadata = {
  title: 'Design System Rules - AI Development | Fabrk Docs',
  description: 'Design rules that AI-generated code must follow.',
};

export default function DesignSystemPage() {
  return (
    <FeatureGuideTemplate
      code="[0xDSN]"
      category="AI Development"
      title="Design System Rules"
      description="Rules that AI-generated code must follow for design consistency."
      overview="AI assistants often generate code with hardcoded colors, arbitrary values, and custom components. These rules ensure AI follows your design system."
      setup={[
        {
          title: 'Run Design Lint',
          description: 'Check for design system violations.',
          code: `# Full scan
npm run design:lint

# Specific path
npm run design:lint src/components/

# JSON output (for CI)
npm run design:lint:ci`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Color Tokens',
          description: 'Use semantic tokens, never hardcoded colors.',
          code: `// CORRECT - semantic tokens
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">
<div className="border-border">
<div className="text-destructive">

// WRONG - hardcoded colors
<div className="bg-green-500 text-white">
<div className="#10b981">
<div style={{ backgroundColor: 'rgb(16, 185, 129)' }}>`,
          language: 'tsx',
        },
        {
          title: 'Spacing Scale',
          description: 'Use 8-point grid values.',
          code: `// CORRECT - scale values
<div className="p-4">     {/* 16px */}
<div className="gap-6">   {/* 24px */}
<div className="mt-8">    {/* 32px */}

// WRONG - arbitrary values
<div className="p-[13px]">
<div className="gap-[22px]">
<div className="mt-[30px]">`,
          language: 'tsx',
        },
        {
          title: 'Border Radius',
          description: 'Use mode.radius for dynamic radius.',
          code: `import { mode } from '@/design-system';

// CORRECT - uses CSS variable
<div className={cn("border", mode.radius)}>

// CORRECT - standard Tailwind
<div className="rounded-lg">
<div className="rounded-full">  {/* For pills/avatars */}

// WRONG - arbitrary values
<div className="rounded-[10px]">`,
          language: 'tsx',
        },
        {
          title: 'System Components',
          description: 'Use existing components, never build from scratch.',
          code: `// CORRECT - system components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

<Button>Click me</Button>
<Card>Content</Card>
<Input placeholder="Enter text" />

// WRONG - custom elements
<button className="bg-blue-500 px-4 py-2 rounded">Click</button>
<div className="border rounded-lg p-4 shadow">Content</div>
<input className="border px-3 py-2 rounded" />`,
          language: 'tsx',
        },
      ]}
      previous={{ title: 'Cost Tracking', href: '/docs/guides/ai-development/cost-tracking' }}
      next={{ title: 'Type Safety', href: '/docs/guides/ai-development/type-safety' }}
    >
      <DocsSection title="Available Color Tokens">
        <DocsCard title="SEMANTIC COLORS">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Token</th>
                  <th className="p-2 text-left">Usage</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">primary / primary-foreground</td>
                  <td className="p-2">Primary brand color</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">secondary / secondary-foreground</td>
                  <td className="p-2">Secondary actions</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">muted / muted-foreground</td>
                  <td className="p-2">Subtle backgrounds/text</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">accent / accent-foreground</td>
                  <td className="p-2">Highlights</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">destructive / destructive-foreground</td>
                  <td className="p-2">Errors, delete actions</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">background / foreground</td>
                  <td className="p-2">Page background/text</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">card / card-foreground</td>
                  <td className="p-2">Card backgrounds/text</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">border / input / ring</td>
                  <td className="p-2">Borders and focus</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Spacing Scale">
        <DocsCard title="8-POINT GRID">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Class</th>
                  <th className="p-2 text-left">Value</th>
                  <th className="p-2 text-left">Pixels</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">1</td>
                  <td className="p-2">0.25rem</td>
                  <td className="p-2">4px</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">2</td>
                  <td className="p-2">0.5rem</td>
                  <td className="p-2">8px</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">3</td>
                  <td className="p-2">0.75rem</td>
                  <td className="p-2">12px</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">4</td>
                  <td className="p-2">1rem</td>
                  <td className="p-2">16px</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">6</td>
                  <td className="p-2">1.5rem</td>
                  <td className="p-2">24px</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">8</td>
                  <td className="p-2">2rem</td>
                  <td className="p-2">32px</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">12</td>
                  <td className="p-2">3rem</td>
                  <td className="p-2">48px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="What Triggers Errors">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="TAILWIND PALETTE COLORS">
            <pre className="bg-muted overflow-x-auto rounded p-4 text-xs">
              <code>{`// ERROR - these will be flagged
<div className="text-red-500">
<div className="bg-blue-600">
<div className="border-gray-200">

// FIX - use semantic tokens
<div className="text-destructive">
<div className="bg-primary">
<div className="border-border">`}</code>
            </pre>
          </DocsCard>

          <DocsCard title="HARDCODED VALUES">
            <pre className="bg-muted overflow-x-auto rounded p-4 text-xs">
              <code>{`// ERROR - hex colors
<div style={{ color: '#ff0000' }}>
<div className="text-[#10b981]">

// ERROR - arbitrary spacing
<div className="p-[13px]">
<div className="rounded-[10px]">

// FIX
<div className="text-destructive">
<div className="p-3">`}</code>
            </pre>
          </DocsCard>
        </div>
      </DocsSection>

      <DocsCallout variant="info" title="Exemptions">
        Some files are exempt: color pickers, theme components, charts (Recharts uses color
        strings), and email templates. Add exemptions in eslint.config.mjs.
      </DocsCallout>
    </FeatureGuideTemplate>
  );
}
