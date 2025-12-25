/**
 * Validate Code Tool
 * Check code against Fabrk design system rules
 */

interface ValidateCodeArgs {
  code: string;
  strict?: boolean;
}

interface ValidationIssue {
  rule: string;
  message: string;
  line?: number;
  severity: 'error' | 'warning';
  suggestion?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  score: number; // 0-100
  summary: string;
}

export function validateCode(args: ValidateCodeArgs): ValidationResult {
  const { code, strict = false } = args;
  const lines = code.split('\n');

  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  // Rule 1: No hardcoded colors
  const colorPatterns = [
    { pattern: /bg-(white|black|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+/g, name: 'Tailwind color class' },
    { pattern: /#[0-9a-fA-F]{3,8}/g, name: 'Hex color' },
    { pattern: /rgb\s*\([^)]+\)/g, name: 'RGB color' },
    { pattern: /hsl\s*\([^)]+\)/g, name: 'HSL color' },
  ];

  lines.forEach((line, index) => {
    colorPatterns.forEach(({ pattern, name }) => {
      const matches = line.match(pattern);
      if (matches) {
        errors.push({
          rule: 'no-hardcoded-colors',
          message: `Found hardcoded ${name}: ${matches.join(', ')}`,
          line: index + 1,
          severity: 'error',
          suggestion: 'Use design tokens like bg-background, bg-card, text-foreground, text-muted-foreground',
        });
      }
    });
  });

  // Rule 2: No rounded-sm/md/lg/xl (use rounded-none)
  const roundedPattern = /rounded-(sm|md|lg|xl|2xl|3xl|full)/g;
  lines.forEach((line, index) => {
    // Skip avatar components (rounded-full is allowed for avatars)
    if (line.toLowerCase().includes('avatar')) return;

    const matches = line.match(roundedPattern);
    if (matches) {
      // rounded-full is a warning for non-avatar elements
      const severity = matches.some((m) => m === 'rounded-full') ? 'warning' : 'error';
      errors.push({
        rule: 'use-rounded-none',
        message: `Found ${matches.join(', ')} - terminal aesthetic requires sharp corners`,
        line: index + 1,
        severity,
        suggestion: 'Use rounded-none or mode.radius for terminal aesthetic',
      });
    }
  });

  // Rule 3: No shadow-md/lg/xl (use shadow-sm only)
  const shadowPattern = /shadow-(md|lg|xl|2xl|inner)/g;
  lines.forEach((line, index) => {
    const matches = line.match(shadowPattern);
    if (matches) {
      warnings.push({
        rule: 'use-shadow-sm',
        message: `Found ${matches.join(', ')} - terminal aesthetic uses minimal shadows`,
        line: index + 1,
        severity: 'warning',
        suggestion: 'Use shadow-sm or no shadow for terminal aesthetic',
      });
    }
  });

  // Rule 4: Button text should use > prefix and uppercase
  const buttonPattern = /<Button[^>]*>([^<]+)<\/Button>/g;
  let match;
  while ((match = buttonPattern.exec(code)) !== null) {
    const buttonText = match[1].trim();
    if (buttonText && !buttonText.startsWith('>') && !buttonText.includes('{')) {
      warnings.push({
        rule: 'button-text-format',
        message: `Button text "${buttonText}" should use terminal format`,
        severity: 'warning',
        suggestion: `Use format: > ${buttonText.toUpperCase().replace(/\s+/g, '_')}`,
      });
    }
  }

  // Rule 5: Check for font-mono usage
  const hasFontMono = code.includes('font-mono') || code.includes('mode.font');
  if (!hasFontMono && code.includes('className')) {
    warnings.push({
      rule: 'use-font-mono',
      message: 'No font-mono or mode.font detected - terminal aesthetic requires monospace',
      severity: 'warning',
      suggestion: 'Add font-mono class or use mode.font from design-system',
    });
  }

  // Rule 6: Check for mode import
  const hasModeImport = code.includes("from '@/design-system'") || code.includes('from "@/design-system"');
  const usesModeObject = code.includes('mode.');
  if (!hasModeImport && usesModeObject) {
    errors.push({
      rule: 'missing-mode-import',
      message: 'Using mode object but missing import',
      severity: 'error',
      suggestion: "Add: import { mode } from '@/design-system'",
    });
  }

  // Rule 7: Check for cn utility import
  const usesCn = code.includes('cn(');
  const hasCnImport = code.includes("from '@/lib/utils'") || code.includes('from "@/lib/utils"');
  if (usesCn && !hasCnImport) {
    errors.push({
      rule: 'missing-cn-import',
      message: 'Using cn() but missing import',
      severity: 'error',
      suggestion: "Add: import { cn } from '@/lib/utils'",
    });
  }

  // Rule 8: Card headers should use [ [0xXX] TITLE ] format
  if (code.includes('CardHeader') || code.includes('card-header')) {
    const hasTerminalFormat = /\[\s*\[0x[0-9a-fA-F]+\]/.test(code) || code.includes('code=');
    if (!hasTerminalFormat) {
      warnings.push({
        rule: 'card-header-format',
        message: 'Card header should use terminal format with hex code',
        severity: 'warning',
        suggestion: 'Use: <CardHeader code="0x00" title="SECTION_TITLE" /> or format: [ [0xXX] TITLE ]',
      });
    }
  }

  // Calculate score
  const totalIssues = errors.length + warnings.length;
  let score = 100;
  score -= errors.length * 10;
  score -= warnings.length * 5;
  score = Math.max(0, score);

  // Determine if valid
  const isValid = strict ? errors.length === 0 && warnings.length === 0 : errors.length === 0;

  // Generate summary
  let summary: string;
  if (score === 100) {
    summary = '[PASS] Code follows Fabrk design system perfectly';
  } else if (score >= 80) {
    summary = '[OK] Code mostly follows Fabrk design system with minor issues';
  } else if (score >= 50) {
    summary = '[WARN] Code has several design system violations';
  } else {
    summary = '[FAIL] Code has significant design system violations';
  }

  return {
    valid: isValid,
    errors,
    warnings,
    score,
    summary,
  };
}
