/**
 * Add Dashboard Feature Prompt
 * Guided workflow for adding features to dashboards
 */

interface PromptResult {
  messages: Array<{
    role: 'user' | 'assistant';
    content: { type: 'text'; text: string };
  }>;
}

export function addFeaturePrompt(args: Record<string, string>): PromptResult {
  const featureName = args.featureName || 'NewFeature';
  const featureType = args.featureType || 'card';

  const prompt = `You are adding a new dashboard feature "${featureName}" to a Fabrk boilerplate project.

## Fabrk Design System Rules (MUST FOLLOW)

1. **Terminal Aesthetic**
   - \`rounded-none\` on all elements
   - \`font-mono\` for all text
   - Card header format: \`[ [0xXX] ${featureName.toUpperCase()} ]\`
   - Button text: \`> ACTION_NAME\`

2. **Color Tokens Only**
   - bg-background, bg-card, bg-muted
   - text-foreground, text-muted-foreground
   - border-border
   - NEVER hardcode colors

3. **Required Imports**
   \`\`\`typescript
   import { cn } from '@/lib/utils';
   import { mode } from '@/design-system';
   import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
   import { Button } from '@/components/ui/button';
   \`\`\`

## Feature Type: ${featureType}

${
  featureType === 'analytics'
    ? `### Analytics Card Pattern
\`\`\`tsx
<Card className={cn('border border-border', mode.radius)}>
  <CardHeader code="0x10" title="${featureName.toUpperCase()}" />
  <CardContent>
    <div className="flex items-baseline gap-2">
      <span className={cn('text-3xl font-bold', mode.font)}>1,234</span>
      <Badge variant="outline" className={cn(mode.radius, 'text-xs')}>
        [+12%]
      </Badge>
    </div>
    <p className={cn('text-muted-foreground mt-2', mode.font, 'text-xs')}>
      Compared to last period
    </p>
  </CardContent>
</Card>
\`\`\``
    : featureType === 'data-table'
      ? `### Data Table Pattern
\`\`\`tsx
<Card className={cn('border border-border', mode.radius)}>
  <CardHeader code="0x20" title="${featureName.toUpperCase()}" />
  <CardContent>
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
    />
  </CardContent>
</Card>
\`\`\``
      : featureType === 'form'
        ? `### Form Card Pattern
\`\`\`tsx
<Card className={cn('border border-border', mode.radius)}>
  <CardHeader code="0x30" title="${featureName.toUpperCase()}" />
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label className={cn(mode.font, 'text-sm')}>[FIELD_NAME]:</Label>
      <Input className={cn(mode.radius, mode.font)} />
    </div>
  </CardContent>
  <CardFooter>
    <Button className={cn(mode.radius, mode.font, 'text-xs')}>
      > SAVE_CHANGES
    </Button>
  </CardFooter>
</Card>
\`\`\``
        : `### Generic Card Pattern
\`\`\`tsx
<Card className={cn('border border-border', mode.radius)}>
  <CardHeader code="0x00" title="${featureName.toUpperCase()}" />
  <CardContent>
    <p className={cn('text-muted-foreground', mode.font, 'text-sm')}>
      Feature content here
    </p>
  </CardContent>
</Card>
\`\`\``
}

## Your Task

Create a complete, production-ready ${featureType} component for "${featureName}". Include:
1. Proper TypeScript types/interfaces
2. Terminal-styled UI following the pattern above
3. Appropriate state management if needed
4. Accessibility considerations

Generate the component now.`;

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
