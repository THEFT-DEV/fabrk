/**
 * Build Landing Page Prompt
 * Guided workflow for creating terminal-styled landing pages
 */

interface PromptResult {
  messages: Array<{
    role: 'user' | 'assistant';
    content: { type: 'text'; text: string };
  }>;
}

export function buildLandingPrompt(args: Record<string, string>): PromptResult {
  const productName = args.productName || 'MyProduct';
  const sections = args.sections?.split(',').map((s) => s.trim()) || [
    'hero',
    'features',
    'pricing',
    'cta',
  ];

  const prompt = `You are helping build a landing page for "${productName}" using the Fabrk boilerplate design system.

## Fabrk Design System Rules (MUST FOLLOW)

1. **Terminal Aesthetic**
   - All corners must be sharp: use \`rounded-none\` or \`mode.radius\`
   - All text uses monospace font: \`font-mono\` or \`mode.font\`
   - Button text format: \`> UPPERCASE_TEXT\`
   - Label format: \`[LABEL]:\`
   - Card header format: \`[ [0xXX] TITLE ]\`

2. **Color Tokens Only**
   - Backgrounds: bg-background, bg-card, bg-muted, bg-primary
   - Text: text-foreground, text-muted-foreground, text-primary
   - Borders: border-border, border-primary
   - NEVER use: bg-white, bg-gray-500, #hexvalues

3. **Required Imports**
   \`\`\`typescript
   import { cn } from '@/lib/utils';
   import { mode } from '@/design-system';
   import { Button } from '@/components/ui/button';
   import { Card, CardHeader, CardContent } from '@/components/ui/card';
   import { Badge } from '@/components/ui/badge';
   \`\`\`

## Requested Sections
${sections.map((s, i) => `${i + 1}. ${s.charAt(0).toUpperCase() + s.slice(1)}`).join('\n')}

## Your Task

Create a complete landing page for "${productName}" with these sections. Follow these patterns:

### Hero Section Pattern
\`\`\`tsx
<section className="py-24 md:py-32">
  <div className="container mx-auto px-4 text-center">
    <Badge variant="outline" className={cn(mode.radius, mode.font, 'text-xs mb-4')}>
      [NOW_LIVE]
    </Badge>
    <h1 className={cn('text-4xl md:text-6xl font-bold mb-6', mode.font)}>
      ${productName.toUpperCase()}
    </h1>
    <p className={cn('text-muted-foreground text-lg max-w-2xl mx-auto mb-8', mode.font)}>
      Your compelling description here
    </p>
    <Button className={cn(mode.radius, mode.font, 'text-xs')}>
      > GET_STARTED
    </Button>
  </div>
</section>
\`\`\`

### Feature Card Pattern
\`\`\`tsx
<Card className={cn('border border-border', mode.radius)}>
  <CardHeader code="0x01" title="FEATURE_NAME" />
  <CardContent>
    <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
      Feature description
    </p>
  </CardContent>
</Card>
\`\`\`

Generate the complete landing page now. Make it production-ready.`;

  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: prompt,
        },
      },
    ],
  };
}
