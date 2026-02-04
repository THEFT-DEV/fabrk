/**
 * Custom ESLint Rules for AI-Generated Code
 *
 * These rules catch common mistakes made by AI code generators:
 * - Hardcoded colors instead of design tokens
 * - Arbitrary Tailwind values instead of design scale
 * - Raw HTML elements instead of system components
 * - Missing type safety patterns
 *
 * Usage in eslint.config.mjs:
 *   import aiRules from './src/lib/eslint/ai-rules.js';
 *   export default [
 *     ...aiRules.configs.recommended,
 *   ];
 */

/** @type {import('eslint').Rule.RuleModule} */
const noHardcodedColors = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid hardcoded Tailwind colors, use design tokens instead',
      category: 'Design System',
      recommended: true,
    },
    messages: {
      hardcodedColor:
        'Hardcoded Tailwind color "{{color}}". Use semantic tokens like text-primary, bg-muted, border-border instead.',
      hexColor: 'Hardcoded hex color "{{color}}". Use CSS variables or Tailwind design tokens.',
    },
    schema: [],
  },
  create(context) {
    // Tailwind color classes to flag
    const colorPattern =
      /(text|bg|border|ring|fill|stroke|outline|accent|caret|shadow)-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+/;

    // Hex color pattern
    const hexPattern = /#[0-9a-fA-F]{3,8}\b/;

    function checkStringLiteral(node, value) {
      // Check for Tailwind color classes
      const colorMatch = value.match(colorPattern);
      if (colorMatch) {
        context.report({
          node,
          messageId: 'hardcodedColor',
          data: { color: colorMatch[0] },
        });
      }

      // Check for hex colors
      const hexMatch = value.match(hexPattern);
      if (hexMatch) {
        context.report({
          node,
          messageId: 'hexColor',
          data: { color: hexMatch[0] },
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          checkStringLiteral(node, node.value);
        }
      },
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          if (quasi.value.raw) {
            checkStringLiteral(node, quasi.value.raw);
          }
        });
      },
    };
  },
};

/** @type {import('eslint').Rule.RuleModule} */
const noArbitraryTailwind = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid arbitrary Tailwind values like w-[200px], use design scale',
      category: 'Design System',
      recommended: true,
    },
    messages: {
      arbitraryValue:
        'Arbitrary Tailwind value "{{value}}". Use design scale values (4, 8, 12, 16, 20, 24, 32, etc.)',
    },
    schema: [],
  },
  create(context) {
    // Arbitrary value pattern: w-[200px], h-[50%], p-[13px], etc.
    const arbitraryPattern = /\b[a-z]+-\[\d+[a-z%]+\]/g;

    function checkStringLiteral(node, value) {
      const matches = value.match(arbitraryPattern);
      if (matches) {
        matches.forEach((match) => {
          context.report({
            node,
            messageId: 'arbitraryValue',
            data: { value: match },
          });
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          checkStringLiteral(node, node.value);
        }
      },
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          if (quasi.value.raw) {
            checkStringLiteral(node, quasi.value.raw);
          }
        });
      },
    };
  },
};

/** @type {import('eslint').Rule.RuleModule} */
const useSystemComponents = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer system components (Button, Input, Card) over raw HTML elements',
      category: 'Design System',
      recommended: true,
    },
    messages: {
      useButton: 'Use <Button> from @/components/ui/button instead of <button> with custom styling.',
      useInput: 'Use <Input> from @/components/ui/input instead of <input>.',
      useCard:
        'This div looks like a card (rounded + border + padding). Use <Card> from @/components/ui/card.',
    },
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const elementName = node.name.name;

        // Check for styled button elements
        if (elementName === 'button') {
          const hasClassName = node.attributes.some(
            (attr) => attr.type === 'JSXAttribute' && attr.name?.name === 'className'
          );
          if (hasClassName) {
            context.report({
              node,
              messageId: 'useButton',
            });
          }
        }

        // Check for input elements
        if (elementName === 'input') {
          const typeAttr = node.attributes.find(
            (attr) => attr.type === 'JSXAttribute' && attr.name?.name === 'type'
          );
          const inputType = typeAttr?.value?.value;

          // Allow hidden, checkbox, radio, file inputs
          const allowedTypes = ['hidden', 'checkbox', 'radio', 'file', 'submit', 'reset'];
          if (!inputType || !allowedTypes.includes(inputType)) {
            context.report({
              node,
              messageId: 'useInput',
            });
          }
        }

        // Check for div elements that look like cards
        if (elementName === 'div') {
          const classNameAttr = node.attributes.find(
            (attr) => attr.type === 'JSXAttribute' && attr.name?.name === 'className'
          );

          if (classNameAttr?.value?.type === 'Literal') {
            const classValue = classNameAttr.value.value || '';
            const hasRounded = /rounded|rounded-/.test(classValue);
            const hasBorder = /\bborder\b/.test(classValue);
            const hasPadding = /\bp-\d|\bpx-\d|\bpy-\d/.test(classValue);

            if (hasRounded && hasBorder && hasPadding) {
              context.report({
                node,
                messageId: 'useCard',
              });
            }
          }
        }
      },
    };
  },
};

/** @type {import('eslint').Rule.RuleModule} */
const requireCostTracking = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'AI API calls should use cost tracking',
      category: 'AI Development',
      recommended: false,
    },
    messages: {
      missingTracking:
        'Direct AI API call detected. Wrap with getCostTracker().trackClaudeCall() or trackOpenAICall() for cost visibility.',
    },
    schema: [],
  },
  create(context) {
    let hasCostTrackingImport = false;
    let hasDirectAICall = false;
    let aiCallNode = null;

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (source.includes('cost') || source.includes('getCostTracker')) {
          hasCostTrackingImport = true;
        }
      },
      CallExpression(node) {
        // Check for anthropic.messages.create or openai.chat.completions.create
        if (node.callee.type === 'MemberExpression') {
          const callChain = getMemberExpressionChain(node.callee);
          const chainStr = callChain.join('.');

          if (
            chainStr.includes('messages.create') ||
            chainStr.includes('chat.completions.create') ||
            chainStr.includes('completions.create')
          ) {
            hasDirectAICall = true;
            aiCallNode = node;
          }
        }
      },
      'Program:exit'() {
        if (hasDirectAICall && !hasCostTrackingImport && aiCallNode) {
          context.report({
            node: aiCallNode,
            messageId: 'missingTracking',
          });
        }
      },
    };
  },
};

/** @type {import('eslint').Rule.RuleModule} */
const noUnsafeEval = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid eval() and Function constructor - common AI security mistake',
      category: 'Security',
      recommended: true,
    },
    messages: {
      noEval: 'eval() is forbidden - security risk. Use JSON.parse() for JSON or a proper parser.',
      noFunctionConstructor:
        'new Function() is equivalent to eval() - security risk. Define functions statically.',
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        // Check for eval()
        if (node.callee.type === 'Identifier' && node.callee.name === 'eval') {
          context.report({
            node,
            messageId: 'noEval',
          });
        }
      },
      NewExpression(node) {
        // Check for new Function()
        if (node.callee.type === 'Identifier' && node.callee.name === 'Function') {
          context.report({
            node,
            messageId: 'noFunctionConstructor',
          });
        }
      },
    };
  },
};

/** @type {import('eslint').Rule.RuleModule} */
const preferAppError = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer AppError over generic Error for typed error handling',
      category: 'AI Development',
      recommended: false,
    },
    messages: {
      useAppError:
        'Use AppError from @/types/ai instead of generic Error for better error handling with codes and status.',
    },
    schema: [],
  },
  create(context) {
    // Only apply in API routes
    const filename = context.getFilename();
    if (!filename.includes('/api/')) {
      return {};
    }

    let hasAppErrorImport = false;

    return {
      ImportDeclaration(node) {
        if (node.source.value.includes('@/types/ai')) {
          const hasAppError = node.specifiers.some(
            (spec) => spec.imported?.name === 'AppError' || spec.local?.name === 'AppError'
          );
          if (hasAppError) {
            hasAppErrorImport = true;
          }
        }
      },
      ThrowStatement(node) {
        if (!hasAppErrorImport && node.argument?.type === 'NewExpression') {
          if (node.argument.callee?.name === 'Error') {
            context.report({
              node,
              messageId: 'useAppError',
            });
          }
        }
      },
    };
  },
};

// Helper function to get member expression chain
function getMemberExpressionChain(node) {
  const chain = [];
  let current = node;

  while (current) {
    if (current.type === 'MemberExpression') {
      if (current.property.type === 'Identifier') {
        chain.unshift(current.property.name);
      }
      current = current.object;
    } else if (current.type === 'Identifier') {
      chain.unshift(current.name);
      break;
    } else {
      break;
    }
  }

  return chain;
}

// Export plugin
const plugin = {
  meta: {
    name: 'eslint-plugin-ai',
    version: '1.0.0',
  },
  rules: {
    'no-hardcoded-colors': noHardcodedColors,
    'no-arbitrary-tailwind': noArbitraryTailwind,
    'use-system-components': useSystemComponents,
    'require-cost-tracking': requireCostTracking,
    'no-unsafe-eval': noUnsafeEval,
    'prefer-app-error': preferAppError,
  },
  configs: {
    recommended: {
      plugins: {
        ai: {
          rules: {
            'no-hardcoded-colors': noHardcodedColors,
            'no-arbitrary-tailwind': noArbitraryTailwind,
            'use-system-components': useSystemComponents,
            'require-cost-tracking': requireCostTracking,
            'no-unsafe-eval': noUnsafeEval,
            'prefer-app-error': preferAppError,
          },
        },
      },
      rules: {
        'ai/no-hardcoded-colors': 'warn',
        'ai/no-arbitrary-tailwind': 'warn',
        'ai/use-system-components': 'warn',
        'ai/no-unsafe-eval': 'error',
      },
    },
    strict: {
      plugins: {
        ai: {
          rules: {
            'no-hardcoded-colors': noHardcodedColors,
            'no-arbitrary-tailwind': noArbitraryTailwind,
            'use-system-components': useSystemComponents,
            'require-cost-tracking': requireCostTracking,
            'no-unsafe-eval': noUnsafeEval,
            'prefer-app-error': preferAppError,
          },
        },
      },
      rules: {
        'ai/no-hardcoded-colors': 'error',
        'ai/no-arbitrary-tailwind': 'error',
        'ai/use-system-components': 'error',
        'ai/require-cost-tracking': 'warn',
        'ai/no-unsafe-eval': 'error',
        'ai/prefer-app-error': 'warn',
      },
    },
  },
};

module.exports = plugin;
