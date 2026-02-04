import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import tailwindV4 from "eslint-plugin-tailwind-v4";

// Import custom design system rules
import noHardcodedColors from "./config/eslint-rules/no-hardcoded-colors.mjs";
import noInlineStyles from "./config/eslint-rules/no-inline-styles.mjs";

// Import AI development rules
import aiRules from "./src/lib/eslint/ai-rules.js";

// Create design-system plugin from custom rules
const designSystemPlugin = {
  rules: {
    "no-hardcoded-colors": noHardcodedColors,
    "no-inline-styles": noInlineStyles,
  },
};

// AI development plugin
const aiPlugin = {
  rules: aiRules.rules,
};


const sanitizePlugin = (plugin) => {
  if (!plugin || typeof plugin !== "object") return plugin;
  const { configs, ...rest } = plugin;
  return { ...rest };
};

const sanitizeCompatConfig = (config) => {
  if (!config?.plugins) return config;
  const sanitizedPlugins = Object.fromEntries(
    Object.entries(config.plugins).map(([name, plugin]) => [name, sanitizePlugin(plugin)])
  );
  return { ...config, plugins: sanitizedPlugins };
};

let nextFlatConfigs = [];
try {
  const nextConfigsModule = await import("eslint-config-next");
  const nextConfigArray = Array.isArray(nextConfigsModule.default ?? nextConfigsModule)
    ? nextConfigsModule.default ?? nextConfigsModule
    : [];
  nextFlatConfigs = nextConfigArray.map(sanitizeCompatConfig);
} catch (error) {
  console.warn("⚠️  eslint-config-next unavailable; skipping Next.js lint presets.");
}

const hasJsxA11yFromNext = nextFlatConfigs.some(
  (config) => config.plugins && Object.prototype.hasOwnProperty.call(config.plugins, "jsx-a11y")
);

const hasTypescriptEslintFromNext = nextFlatConfigs.some(
  (config) => config.plugins && Object.prototype.hasOwnProperty.call(config.plugins, "@typescript-eslint")
);

const eslintConfig = [{
  ignores: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "coverage/**",
    ".mcp/**",
    "scripts/**",
    "archive/**",
    "_archive/**",
    "next-env.d.ts",
    "**/*.config.js",
    "**/*.config.mjs",
    "**/*.config.ts",
    "playwright-report/**",
    "test-results/**",
    "logs/**",
    "*.generated.ts",
    "*.generated.js",
    "**/generated-sources.ts", // Auto-generated component sources
    // Experimental lab directories - intentionally use non-standard patterns
    "**/hero-lab/**",
  ],
}, ...nextFlatConfigs, {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tsparser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    ...(hasTypescriptEslintFromNext ? {} : { "@typescript-eslint": tseslint }),
    "tailwind-v4": tailwindV4,
    ...(hasJsxA11yFromNext ? {} : { "jsx-a11y": jsxA11y }),
    "design-system": designSystemPlugin,
    "ai": aiPlugin,
  },
  rules: {
    // Complexity rules (kept off for productivity)
    "max-lines": "off",
    "max-lines-per-function": "off",

    // TypeScript strictness (enabled as warnings to catch issues)
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/ban-ts-comment": "warn",

    // React strictness
    "react-hooks/exhaustive-deps": "warn",

    // Next.js strictness
    "@next/next/no-img-element": "warn",

    // Low-priority aesthetic/tooling rules (disabled for productivity)
    'react/no-unescaped-entities': 'off', // Aesthetic only, doesn't affect functionality
    'react/display-name': 'off', // Dev tooling only, doesn't affect production
    '@next/next/no-html-link-for-pages': 'off', // Minor performance optimization

    // Tailwind v4 rules
    // "tailwind-v4/no-undefined-classes": "error",

    // AI development rules (security)
    "ai/no-unsafe-eval": "error",
  },
}, {
  files: ["**/*.{js,jsx,ts,tsx}"],
  rules: {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "jsx-a11y/heading-has-content": "warn",
    "jsx-a11y/html-has-lang": "warn",
    "jsx-a11y/lang": "warn",
    "jsx-a11y/no-autofocus": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
  },
}, {
  files: ["**/*.test.ts", "**/*.test.tsx", "tests/**/*.ts", "tests/**/*.tsx"],
  rules: {
    "max-lines": "off",
    "max-lines-per-function": "off",
  },
// Design system enforcement - ENABLED
}, {
  // STRICT validation for production files
  files: [
    "src/components/**/*.{tsx,jsx}",
    "src/app/**/*.{tsx,jsx}",
  ],
  ignores: [
    "src/**/showcase/**",
    "src/**/examples/**",
    "src/**/*.demo.{tsx,jsx}",
    "src/**/*.stories.{tsx,jsx}",
    "src/**/component-previews/**"
  ],
  rules: {
    'design-system/no-hardcoded-colors': 'error',
    'design-system/no-inline-styles': 'error'
  }
}, {
  // RELAXED validation for demo/showcase files and marketing pages with SVG brand colors
  files: [
    "**/examples/**",
    "**/showcase/**",
    "**/*.stories.tsx",
    "**/*.demo.tsx",
    "**/*.backup.tsx",
    "**/component-previews/**",
    "**/demo/**",
    "**/demo-*/**",
    "**/variations/**",
    "**/landing/**",
    "**/home/tech-stack-section.tsx",
    "src/app/templates/profile/page.tsx" // Contains string literals flagged as colors
  ],
  rules: {
    'design-system/no-hardcoded-colors': 'off',
    'design-system/no-inline-styles': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/alt-text': 'off'
  }
}, {
  // Allow CSS variables in specific components (dynamic styles/animations)
  files: [
    "**/carousel.tsx",
    "**/progress.tsx",
    "**/slider.tsx",
    "**/tree-view.tsx",
    "**/gsap-progress.tsx",
    "**/parallax-card.tsx"
  ],
  rules: {
    'design-system/no-inline-styles': 'off'
  }
},
{
  // Pragmatic exception for color-picker and theme-switcher components which inherently deal with raw color values and inline styles for previews
  files: [
    "src/components/ui/color-picker.tsx",
    "src/components/theme/color-theme-switcher.tsx",
    "src/components/theme/theme-dropdown.tsx",
    "src/components/theme/theme-playground-panel.tsx", // Theme customization tool
    "src/app/docs/components/color-picker/page.tsx", // Docs page also shows raw colors
    "src/app/docs/extras/theming/page.tsx", // Docs page for theming examples
    "src/app/docs/features/google-oauth/page.tsx", // Google logo SVG has hardcoded brand colors
    "src/app/layout.tsx", // Contains metadata strings that are false positives for hardcoded colors
    "src/app/docs/tutorials/email-templates/page.tsx", // Email template examples require inline CSS/hardcoded colors
    "src/emails/**/*.ts" // Email templates (if any are separate files) require inline CSS/hardcoded colors
  ],
  rules: {
    'design-system/no-hardcoded-colors': 'off',
    'design-system/no-inline-styles': 'off',
  }
},
{
  // Pragmatic exception for Recharts components requiring inline styles for dynamic colors/fills
  files: [
    "src/components/analytics/**/*.{tsx,jsx}",
    "src/components/charts/**/*.{tsx,jsx}", // Chart components
    "src/components/ui/donut-chart.tsx",
    "src/components/ui/funnel-chart.tsx",
    "src/components/ui/gauge.tsx",
    "src/components/ui/heatmap.tsx",
    "src/components/ui/pie-chart.tsx",
    "src/components/ui/sparkline.tsx",
    "src/components/ui/mermaid.tsx", // Mermaid also uses inline styles for theming
    "src/app/templates/chart-library/page.tsx",
    "src/app/docs/components/donut-chart/page.tsx",
    "src/app/docs/components/gauge/page.tsx",
    "src/app/docs/components/heatmap/page.tsx",
    "src/app/docs/components/pie-chart/page.tsx",
    "src/app/docs/components/sparkline/page.tsx",
  ],
  rules: {
    'design-system/no-hardcoded-colors': 'off', // Recharts colors are passed as strings, not Tailwind classes
    'design-system/no-inline-styles': 'off' // Recharts and dynamic SVG require inline styles
  }
},
{
  // Pragmatic exception for sidebar component for dynamic paddingLeft calculation due to nested navigation
  files: [
    "src/components/ui/sidebar.tsx",
  ],
  rules: {
    'design-system/no-inline-styles': 'off'
  }
},
{
  // Components that legitimately need hardcoded colors (QR codes, canvas drawing, etc.)
  files: [
    "src/components/library/ai-qr-generator/index.tsx", // QR codes need #ffffff/#000000 for output
    "src/components/marketing/perspective-grid.tsx", // Canvas API requires rgba() strings
  ],
  rules: {
    'design-system/no-hardcoded-colors': 'off',
  }
},
{
  // Pages with dynamic images that need raw <img> tags (external URLs, data URLs)
  files: [
    "src/app/(public)/library/ai-image/page.tsx", // Demo shows dynamically generated images
  ],
  rules: {
    '@next/next/no-img-element': 'off',
  }
},
// AI development rules for API routes
{
  files: ["src/app/api/**/*.ts", "src/app/api/**/*.tsx"],
  rules: {
    "ai/no-unsafe-eval": "error",
    "ai/prefer-app-error": "warn",
    "ai/require-cost-tracking": "off", // Enable as 'warn' to enforce cost tracking
  },
},
// AI development rules for components (design system)
{
  files: ["src/components/**/*.tsx", "src/app/**/*.tsx"],
  ignores: [
    "src/**/showcase/**",
    "src/**/examples/**",
    "src/**/*.demo.tsx",
    "src/**/*.stories.tsx",
    "src/**/component-previews/**",
    "src/components/ui/**", // UI primitives are exempt
    "src/components/charts/**", // Chart components need flexibility
    "src/app/(auth)/**", // Auth pages have Google brand colors
    "src/app/(platform)/admin/ai-costs/**", // Dashboard uses warning colors for budget alerts
    "src/app/docs/**", // Docs pages need specific widths for demos
    "src/app/templates/**", // Template pages need flexibility
    "src/app/(public)/library/**", // Library pages are demos
  ],
  rules: {
    "ai/no-hardcoded-colors": "warn",
    "ai/no-arbitrary-tailwind": "warn",
    "ai/use-system-components": "off", // Enable as 'warn' to suggest system components
  },
}, {
  settings: {
    tailwindcss: {
      config: "src/app/globals.css",
      callees: ["cn", "cva"],
      classRegex: "^class(Name)?$"
    }
  }
}];

export default eslintConfig;