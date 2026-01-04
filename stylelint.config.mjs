/**
 * Stylelint Configuration for Design System Enforcement
 *
 * Enforces design tokens and prevents arbitrary values that break consistency.
 *
 * Run: npm run lint:css
 * Auto-fix: npm run lint:css:fix
 */

export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    // ========================================================================
    // DESIGN TOKEN ENFORCEMENT
    // ========================================================================

    // Disallow hardcoded colors - must use CSS variables
    'color-named': 'never',
    'color-no-hex': true,

    // Disallow arbitrary values - use design scale
    'declaration-property-value-disallowed-list': {
      // Border radius - must use design tokens
      'border-radius': [
        '/^\\d+px$/', // No arbitrary px values
        '/^\\d+rem$/',
        '/^\\d+em$/',
      ],
    },

    // ========================================================================
    // SELECTOR COMPLEXITY LIMITS
    // ========================================================================

    // Prevent specificity wars
    'selector-max-id': 0,
    'selector-max-compound-selectors': 4,
    'selector-max-specificity': '0,4,0',

    // ========================================================================
    // CODE STYLE
    // ========================================================================

    // Consistent ordering
    'order/properties-alphabetical-order': null, // Disabled - use logical grouping instead

    // Allow Tailwind directives
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'config',
          'variants',
          'responsive',
          'screen',
          'theme',
          'plugin',
        ],
      },
    ],

    // Allow CSS variables
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'oklch', 'hsl', 'hsla', 'rgb', 'rgba', 'var', 'calc', 'min', 'max', 'clamp'],
      },
    ],

    // Allow custom properties
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['container-type', 'view-transition-name'],
      },
    ],

    // ========================================================================
    // ACCESSIBILITY
    // ========================================================================

    // Prevent !important (causes specificity issues)
    'declaration-no-important': true,

    // ========================================================================
    // DISABLED RULES (handled by other tools or not applicable)
    // ========================================================================

    // Tailwind handles these
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    'import-notation': null,
    'media-feature-range-notation': null,

    // CSS modules / Tailwind arbitrary values
    'value-keyword-case': null,
    'function-name-case': null,
  },

  overrides: [
    {
      // Global CSS file has different rules
      files: ['**/globals.css'],
      rules: {
        // Allow hex colors in the design system source file
        'color-no-hex': null,
        // Allow important for base resets
        'declaration-no-important': null,
      },
    },
    {
      // Email templates need inline styles
      files: ['**/email*.ts', '**/email*.tsx', '**/emails/**/*'],
      rules: {
        'color-no-hex': null,
      },
    },
  ],

  ignoreFiles: [
    'node_modules/**',
    '.next/**',
    'dist/**',
    'build/**',
    '**/*.min.css',
    '**/vendor/**',
  ],
};
