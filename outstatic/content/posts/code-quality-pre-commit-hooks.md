---
title: 'Code Quality: Pre-Commit Hooks and Automated Linting'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'code-quality-pre-commit-hooks'
description: 'Fabrk enforces code quality automatically with Husky pre-commit hooks, ESLint, Prettier, and TypeScript checks.'
publishedAt: '2026-01-22T10:00:00.000Z'
---

**Quality gates that run automatically.**

---

## The Quality Problem

Code quality degrades without enforcement:

- Inconsistent formatting across the codebase
- Linting errors pile up until they're overwhelming
- Type errors slip through to production
- Code reviews catch preventable issues
- Technical debt accumulates silently

Fabrk prevents this with automated checks that run on every commit.

---

## The Pre-Commit Stack

Every commit automatically runs:

| Check | Tool | Purpose |
|-------|------|---------|
| Type checking | TypeScript | Catch type errors before commit |
| Linting | ESLint | Enforce code patterns, auto-fix issues |
| Formatting | Prettier | Consistent code style |

If any check fails, the commit is blocked until fixed.

---

## How It Works

Fabrk uses **Husky** for git hooks and **lint-staged** for efficient checking:

```
git commit -m "Add feature"
        │
        ▼
┌──────────────────────┐
│   Husky Pre-Commit   │
│        Hook          │
└──────────────────────┘
        │
        ▼
┌──────────────────────┐
│   TypeScript Check   │◄── Checks entire project
│   (npm run type-check)│
└──────────────────────┘
        │
        ▼
┌──────────────────────┐
│     lint-staged      │◄── Only staged files
│  ESLint + Prettier   │
└──────────────────────┘
        │
        ▼
    Commit succeeds
    or fails with errors
```

---

## Configuration Files

### Husky Setup

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run TypeScript type checking
npm run type-check

# Run lint-staged on staged files
npx lint-staged
```

### lint-staged Configuration

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix --max-warnings=0",
      "prettier --write"
    ],
    "*.{js,jsx,mjs,cjs}": [
      "eslint --fix --max-warnings=0",
      "prettier --write"
    ],
    "*.{json,md,mdx,yml,yaml}": [
      "prettier --write"
    ],
    "*.css": [
      "prettier --write"
    ]
  }
}
```

Only staged files are checked, keeping commits fast even in large codebases.

---

## TypeScript Checking

Every commit verifies the entire project's types:

```bash
# Runs automatically on commit
npm run type-check
```

### What It Catches

```typescript
// Missing types
const user = getUser(id); // Error: 'id' is not defined

// Type mismatches
function greet(name: string) {
  return `Hello, ${name}`;
}
greet(123); // Error: Argument of type 'number' is not assignable

// Missing return types
function getData() { // Warning: Missing return type
  return fetch('/api/data');
}

// Unused variables
const unused = 'value'; // Warning: 'unused' is declared but never used

// Import errors
import { NonExistent } from './module'; // Error: Module has no exported member
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

---

## ESLint Configuration

Fabrk uses ESLint flat config (the modern approach):

```javascript
// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
    },
    rules: {
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript specific
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',

      // Import organization
      'import/order': ['error', {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      }],

      // General best practices
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    // Test files have relaxed rules
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    // Ignore patterns
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'coverage/**',
    ],
  }
);
```

### Custom Rules for Design System

```javascript
// Additional rules to enforce design system
{
  rules: {
    // Ban hardcoded colors
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/bg-white|bg-black|bg-gray-|text-gray-|text-white|text-black/]',
        message: 'Use design tokens instead of hardcoded colors (e.g., bg-background, text-foreground)',
      },
      {
        selector: 'Literal[value=/#[0-9a-fA-F]{3,8}/]',
        message: 'Use CSS variables instead of hex colors',
      },
    ],
  },
}
```

---

## Prettier Configuration

Consistent formatting across the entire codebase:

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Prettier Ignore

```gitignore
# .prettierignore
node_modules
.next
dist
coverage
pnpm-lock.yaml
package-lock.json
*.min.js
```

### Tailwind Class Sorting

The `prettier-plugin-tailwindcss` plugin automatically sorts Tailwind classes:

```tsx
// Before Prettier
<div className="p-4 flex bg-card items-center border rounded-lg gap-2 text-sm" />

// After Prettier (sorted by Tailwind conventions)
<div className="flex items-center gap-2 rounded-lg border bg-card p-4 text-sm" />
```

---

## Running Checks Manually

```bash
# Run all linting
npm run lint

# Run linting with auto-fix
npm run lint -- --fix

# Run formatting check
npm run format:check

# Run formatting with write
npm run format

# Run TypeScript check
npm run type-check

# Run all validation (like pre-commit does)
npm run validate
```

### Package.json Scripts

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings=0",
    "lint:fix": "eslint . --fix --max-warnings=0",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "validate": "npm run type-check && npm run lint && npm run format:check"
  }
}
```

---

## Bypassing Hooks

For emergencies only:

```bash
git commit --no-verify -m "Emergency fix"
```

**When to use `--no-verify`:**
- Hotfix that needs to go out immediately
- Temporary WIP commit on a feature branch
- Build system is broken and you need to push a fix

**When NOT to use it:**
- "I'll fix the errors later" (you won't)
- "It's just a small change" (small changes can break things)
- "The linter is wrong" (configure the rule instead)

Skipped checks mean skipped quality. Use sparingly.

---

## CI Integration

The same checks run in CI, ensuring nothing bypassed locally reaches main:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Format check
        run: npm run format:check

      - name: Build
        run: npm run build

  test:
    runs-on: ubuntu-latest
    needs: quality

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - run: npm ci
      - run: npm test
```

### Branch Protection

Configure GitHub branch protection:

1. Go to Settings > Branches > Add rule
2. Branch name pattern: `main`
3. Enable:
   - Require status checks to pass
   - Require branches to be up to date
   - Select: `quality`, `test`

Now PRs can't be merged without passing all checks.

---

## VS Code Integration

Fabrk includes VS Code settings for real-time feedback:

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### Recommended Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma"
  ]
}
```

With these settings, files are formatted and linted on save, catching issues before you even try to commit.

---

## Design System Linting

Fabrk includes a custom lint script for design system compliance:

```bash
npm run design:lint
```

### What It Checks

```typescript
// scripts/design-lint.ts

const VIOLATIONS = {
  // Hardcoded colors
  hardcodedColors: [
    'bg-white', 'bg-black', 'text-white', 'text-black',
    'bg-gray-', 'text-gray-', 'border-gray-',
    'bg-red-', 'bg-green-', 'bg-blue-',
  ],

  // Missing mode.radius on bordered elements
  missingRadius: /className="[^"]*border[^"]*"(?![^"]*mode\.radius)/,

  // Arbitrary values instead of design tokens
  arbitraryValues: [
    'p-[', 'm-[', 'w-[', 'h-[', 'gap-[',
    'text-[#', 'bg-[#', 'border-[#',
  ],
};

// Reports violations with file and line number
// Exits with error code if violations found
```

### Running the Linter

```bash
# Check entire src directory
npm run design:lint

# Check specific directory
npm run design:lint src/app/

# Check specific file
npm run design:lint src/components/dashboard/stats-card.tsx
```

---

## The Commit Flow

Here's exactly what happens when you commit:

1. **Stage changes**
   ```bash
   git add src/components/new-feature.tsx
   ```

2. **Commit**
   ```bash
   git commit -m "Add new feature component"
   ```

3. **Husky triggers** pre-commit hook

4. **TypeScript check** runs on entire project
   ```
   ✓ Type checking passed (2.3s)
   ```

5. **lint-staged runs** on staged files:
   ```
   ✔ Preparing lint-staged...
   ✔ Running tasks for staged files...
     ✔ src/components/new-feature.tsx — 1 file
       ✔ eslint --fix --max-warnings=0
       ✔ prettier --write
   ✔ Applying modifications from tasks...
   ✔ Cleaning up temporary files...
   ```

6. **If all pass** → commit succeeds
   ```
   [main abc1234] Add new feature component
    1 file changed, 45 insertions(+)
    create mode 100644 src/components/new-feature.tsx
   ```

7. **If any fail** → commit blocked with errors
   ```
   ✖ eslint --fix --max-warnings=0:
     /src/components/new-feature.tsx
       12:5  error  'unused' is defined but never used  @typescript-eslint/no-unused-vars

   husky - pre-commit hook exited with code 1 (error)
   ```

---

## Error Recovery

When a commit fails, here's how to fix it:

### See What Failed

```bash
# Run the same checks manually
npm run lint
npm run type-check
```

### Auto-Fix What Can Be Fixed

```bash
# ESLint auto-fix
npm run lint -- --fix

# Prettier auto-fix
npm run format
```

### Fix Remaining Issues Manually

```typescript
// Before: unused variable
const unused = 'value';

// After: remove it
// (or prefix with _ if intentionally unused)
const _intentionallyUnused = 'value';
```

### Commit Again

```bash
git add .
git commit -m "Add new feature component"
```

---

## Performance

lint-staged only checks staged files, keeping commits fast:

```
✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ src/app/page.tsx — 1 file
    ✔ eslint --fix (892ms)
    ✔ prettier --write (234ms)
✔ Applying modifications from tasks...

Total time: 1.4s
```

Compare to checking the entire codebase:
- Full lint: ~15-30 seconds
- Full type-check: ~5-10 seconds
- **lint-staged: ~1-3 seconds**

---

## Adding Custom Rules

### ESLint Custom Rule

```javascript
// eslint.config.mjs
{
  rules: {
    // Enforce import order
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal'],
      'newlines-between': 'always',
    }],

    // Ban console.log in production code
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Require explicit return types on functions
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowHigherOrderFunctions: true,
    }],

    // Enforce naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'interface', format: ['PascalCase'] },
      { selector: 'typeAlias', format: ['PascalCase'] },
      { selector: 'enum', format: ['PascalCase'] },
    ],
  },
}
```

### Creating a Custom ESLint Plugin

```javascript
// eslint-plugins/design-system.js
module.exports = {
  rules: {
    'no-hardcoded-colors': {
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              if (/bg-white|text-gray-/.test(node.value)) {
                context.report({
                  node,
                  message: 'Use design tokens instead of hardcoded colors',
                });
              }
            }
          },
        };
      },
    },
  },
};
```

---

## Best Practices

1. **Never skip hooks** - Fix the issue, don't bypass
2. **Run checks locally** - Before pushing, run `npm run validate`
3. **Keep rules consistent** - Same in dev, CI, and production
4. **Auto-fix when possible** - ESLint and Prettier handle most issues
5. **Document exceptions** - If you disable a rule, explain why with a comment
6. **Review new rules carefully** - Add them gradually to avoid overwhelming the team
7. **Keep the feedback loop fast** - If checks take too long, people will bypass them

---

## Troubleshooting

### Hooks Not Running

```bash
# Reinstall husky
npx husky install

# Make hooks executable
chmod +x .husky/pre-commit
```

### ESLint Cache Issues

```bash
# Clear ESLint cache
rm -rf node_modules/.cache/eslint

# Run lint with no cache
npm run lint -- --no-cache
```

### TypeScript Errors After Update

```bash
# Regenerate Prisma types
npx prisma generate

# Clear TypeScript cache
rm -rf node_modules/.cache/typescript

# Restart TS server in VS Code
Cmd+Shift+P > "TypeScript: Restart TS Server"
```

---

## Getting Started

Hooks are set up automatically when you run `npm install`.

If hooks aren't running after a fresh clone:

```bash
npm run prepare
# or
npx husky install
```

Quality enforcement, built in.
