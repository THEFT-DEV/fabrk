/**
 * Fabrk Design System Tokens
 * Baked-in knowledge about the terminal aesthetic design system
 */

export const designTokens = {
  // Core mode configuration
  mode: {
    radius: 'rounded-none',
    font: 'font-mono',
    shadow: 'shadow-sm',
    buttonPrefix: '> ',
    labelFormat: 'brackets', // [LABEL]:
    cardHeader: 'bracketed', // [ [0xXX] TITLE ]
    textTransform: 'uppercase',
    inputStyle: 'rounded-none font-mono border-border',
    borderWidth: 'border',
  },

  // Color tokens (use these class names, not hex values)
  colors: {
    backgrounds: {
      base: 'bg-background',
      surface: 'bg-card',
      elevated: 'bg-popover',
      accent: 'bg-accent',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      muted: 'bg-muted',
      danger: 'bg-destructive',
    },
    text: {
      primary: 'text-foreground',
      secondary: 'text-card-foreground',
      muted: 'text-muted-foreground',
      inverse: 'text-primary-foreground',
      accent: 'text-accent-foreground',
      danger: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
    },
    borders: {
      default: 'border-border',
      focus: 'border-ring',
      primary: 'border-primary',
      danger: 'border-destructive',
    },
  },

  // Spacing (8-point grid)
  spacing: {
    button: {
      sm: 'px-2 py-1',
      md: 'px-4 py-2',
      lg: 'px-6 py-4',
    },
    input: 'px-4 py-2',
    card: 'p-4',
    section: 'py-16',
    container: 'px-4 md:px-6 lg:px-8',
  },

  // Typography
  typography: {
    button: 'text-xs font-medium',
    body: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
    },
    heading: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
    },
    caption: 'text-xs text-muted-foreground',
    label: 'text-sm font-medium',
  },

  // Design system rules (AI must follow these)
  rules: [
    'NEVER use rounded-sm, rounded-md, rounded-lg, rounded-xl - always use rounded-none',
    'NEVER use hardcoded colors like bg-white, text-gray-500, #hexvalues - use design tokens only',
    'Button text format: "> UPPERCASE_TEXT" (prefix with > and uppercase)',
    'Label format: "[LABEL]:" (brackets around label name)',
    'Card header format: "[ [0xXX] TITLE ]" (hex code prefix, uppercase title)',
    'All text must use font-mono (JetBrains Mono is applied globally)',
    'Headlines should be UPPERCASE for terminal aesthetic',
    'Use 8-point grid for spacing (p-2, p-4, p-6, p-8)',
    'Shadow should be shadow-sm only (no shadow-md, shadow-lg)',
    'Status badges use format: [STATUS] in uppercase',
  ],

  // Common patterns
  patterns: {
    cardWithHeader: `
<div className="border border-border bg-card rounded-none">
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] SECTION_TITLE ]
    </span>
  </div>
  <div className="p-4">
    {/* Content */}
  </div>
</div>`,
    button: `<Button className="rounded-none font-mono text-xs">> CLICK_ME</Button>`,
    label: `<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>`,
    statusBadge: `<Badge variant="outline" className="rounded-none font-mono text-xs">[STATUS]</Badge>`,
  },

  // Import statements
  imports: {
    button: "import { Button } from '@/components/ui/button'",
    card: "import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'",
    input: "import { Input } from '@/components/ui/input'",
    badge: "import { Badge } from '@/components/ui/badge'",
    mode: "import { mode } from '@/design-system'",
    cn: "import { cn } from '@/lib/utils'",
  },
};
