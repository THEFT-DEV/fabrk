/**
 * ESLint Rule: Standardize Card Headers
 *
 * Detects and auto-fixes card standardization issues:
 * 1. Hardcoded `font-mono` → `mode.font`
 * 2. Custom header divs → `CardHeader` component
 * 3. Non-standard spacing → 8-point grid
 *
 * Part of card standardization initiative (2025-12-15)
 * See: /docs/design-system/spec/card-animations.md
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce card standardization patterns',
      category: 'Design System',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      hardcodedFontMono: 'Replace hardcoded "font-mono" with mode.font design token',
      customHeaderDiv: 'Replace custom header div with CardHeader component',
      nonStandardSpacing: 'Use 8-point grid spacing (gap-4, gap-6, not gap-3)',
      missingModeFont: 'Add mode.font to text element for terminal aesthetic',
    },
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    /**
     * Check if file is in security, organization, or platform directory
     * (These are the directories that need fixes)
     */
    function isTargetDirectory(filename) {
      return (
        filename.includes('/components/security/') ||
        filename.includes('/components/organization/') ||
        filename.includes('/components/ai/') ||
        filename.includes('/app/(platform)/')
      );
    }

    /**
     * Pattern 1: Hardcoded font-mono
     * Find: className="font-mono text-xs"
     * Replace: className={cn(mode.font, 'text-xs')}
     */
    function checkHardcodedFontMono(node) {
      if (!isTargetDirectory(context.getFilename())) return;

      // Check JSXAttribute with className
      if (node.type === 'JSXAttribute' && node.name.name === 'className') {
        const value = node.value;

        // Check for string literal with "font-mono"
        if (value && value.type === 'Literal' && typeof value.value === 'string') {
          if (value.value.includes('font-mono')) {
            context.report({
              node,
              messageId: 'hardcodedFontMono',
              fix(fixer) {
                // Extract classes, replace font-mono with mode.font
                const classes = value.value
                  .split(' ')
                  .filter(cls => cls !== 'font-mono')
                  .map(cls => `'${cls}'`)
                  .join(', ');

                return fixer.replaceText(
                  node,
                  `className={cn(mode.font, ${classes})}`
                );
              },
            });
          }
        }
      }
    }

    /**
     * Pattern 2: Custom header divs
     * Find: <div className="border-b">...</div> with [ [0xXX] TITLE ] pattern
     * Replace: <CardHeader code="0xXX" title="TITLE" />
     *
     * Note: This is a structural change that requires manual review,
     * so we only warn (not auto-fix)
     */
    function checkCustomHeaderDiv(node) {
      if (!isTargetDirectory(context.getFilename())) return;

      if (node.type === 'JSXElement' && node.openingElement.name.name === 'div') {
        const className = node.openingElement.attributes.find(
          attr => attr.name && attr.name.name === 'className'
        );

        if (
          className &&
          className.value &&
          className.value.value &&
          className.value.value.includes('border-b')
        ) {
          // Check if children contain the [ [0xXX] TITLE ] pattern
          const hasTerminalHeader = node.children.some(child => {
            if (child.type === 'JSXElement' && child.children.length > 0) {
              const text = sourceCode.getText(child);
              return /\[\s*\[0x\w+\]\s*\w+\s*\]/.test(text);
            }
            return false;
          });

          if (hasTerminalHeader) {
            context.report({
              node,
              messageId: 'customHeaderDiv',
              // No auto-fix - requires structural changes
            });
          }
        }
      }
    }

    /**
     * Pattern 3: Non-standard spacing (gap-3, space-y-3, etc.)
     * Find: gap-3, space-y-3, px-3, py-3
     * Replace: gap-4, space-y-4, px-4, py-4 (8-point grid)
     */
    function checkNonStandardSpacing(node) {
      if (node.type === 'JSXAttribute' && node.name.name === 'className') {
        const value = node.value;

        if (value && value.type === 'Literal' && typeof value.value === 'string') {
          const nonStandardPattern = /\b(gap|space-[xy]|p[xy]?)-3\b/;

          if (nonStandardPattern.test(value.value)) {
            context.report({
              node,
              messageId: 'nonStandardSpacing',
              fix(fixer) {
                const fixed = value.value.replace(
                  /\b(gap|space-[xy]|p[xy]?)-3\b/g,
                  '$1-4'
                );
                return fixer.replaceText(value, `"${fixed}"`);
              },
            });
          }
        }
      }
    }

    /**
     * Pattern 4: Missing mode.font in cn() calls
     * Find: cn('text-xs', mode.color.text.muted)
     * Replace: cn(mode.font, 'text-xs', mode.color.text.muted)
     */
    function checkMissingModeFont(node) {
      if (!isTargetDirectory(context.getFilename())) return;

      // Check for cn() calls
      if (
        node.type === 'CallExpression' &&
        node.callee.name === 'cn' &&
        node.arguments.length > 0
      ) {
        // Check if mode.font is already present
        const hasModeFont = node.arguments.some(arg => {
          if (arg.type === 'MemberExpression') {
            return sourceCode.getText(arg) === 'mode.font';
          }
          return false;
        });

        // Check if there are text classes (text-xs, text-sm, etc.)
        const hasTextClass = node.arguments.some(arg => {
          if (arg.type === 'Literal' && typeof arg.value === 'string') {
            return /\btext-(xs|sm|base|lg)\b/.test(arg.value);
          }
          return false;
        });

        if (hasTextClass && !hasModeFont) {
          context.report({
            node,
            messageId: 'missingModeFont',
            fix(fixer) {
              // Add mode.font as first argument
              const firstArg = node.arguments[0];
              return fixer.insertTextBefore(firstArg, 'mode.font, ');
            },
          });
        }
      }
    }

    return {
      JSXAttribute: checkHardcodedFontMono,
      JSXElement: checkCustomHeaderDiv,
      JSXAttribute: checkNonStandardSpacing,
      CallExpression: checkMissingModeFont,
    };
  },
};
