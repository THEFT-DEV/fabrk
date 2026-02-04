# Getting Started with AI Development Tools

This guide walks you through setting up and using the AI development validation tools.

---

## Prerequisites

- Node.js 22+
- npm 10+
- TypeScript project with `tsx` installed

---

## Installation

The AI development tools are included in the boilerplate. No additional installation required.

Verify the tools are available:

```bash
npm run ai:validate --help
```

---

## First Run

### 1. Run Full Validation

Start by running the complete validation suite:

```bash
npm run ai:pre-deploy
```

This runs all checks in sequence:
1. TypeScript compilation
2. ESLint validation
3. AI code validation
4. Security scanning

### 2. Review Output

The output shows:
- **Errors** (red) - Must fix before deployment
- **Warnings** (yellow) - Should fix, but not blocking
- **Info** (blue) - Recommendations

Example output:

```
src/components/example.tsx
  ERROR [security] Found eval() - security risk (no-unsafe-eval):42
  WARN  [type-safety] Avoid using "any" type (no-explicit-any):15
  INFO  [design] Consider using design token (design-token):28

─────────────────────────────────────
Summary
Files scanned: 1250
Files with issues: 12
  Errors: 3
  Warnings: 45
  Info: 120
```

### 3. Fix Errors

Errors must be fixed. Common fixes:

| Error | Fix |
|-------|-----|
| `eval()` usage | Remove eval, use safe alternatives |
| Hardcoded hex color | Use design token (`text-primary`) |
| `innerHTML` assignment | Use React's `dangerouslySetInnerHTML` with sanitization |
| Hardcoded API key | Move to environment variable |

### 4. Address Warnings

Warnings indicate code quality issues:

| Warning | Fix |
|---------|-----|
| `any` type | Define specific type or use `unknown` |
| Missing return type | Add explicit return type |
| Arbitrary Tailwind value | Use design scale (`p-4` not `p-[13px]`) |

---

## Daily Workflow

### Before Committing

```bash
npm run type-check && npm run lint
```

### Before Creating PR

```bash
npm run ai:pre-deploy
```

### After Major AI Generation

When AI generates significant code:

```bash
npm run ai:validate src/path/to/new/code/
```

---

## Configuration

### ESLint Integration

AI rules are integrated into ESLint. See `eslint.config.mjs`:

```javascript
// AI development rules
{
  files: ["src/app/api/**/*.ts"],
  rules: {
    "ai/no-unsafe-eval": "error",
    "ai/prefer-app-error": "warn",
    "ai/require-cost-tracking": "off",
  },
},
```

### Validation Exclusions

Some files are excluded from validation by design:

- Test files (`*.test.ts`, `*.spec.ts`)
- Generated files (`*.generated.ts`)
- Configuration files (`*.config.ts`)
- Validation tools themselves

See `scripts/ai-validate.ts` for the full exclusion list.

---

## IDE Integration

### VS Code

The ESLint extension automatically shows AI rule violations inline.

Recommended settings (`.vscode/settings.json`):

```json
{
  "eslint.validate": ["typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Cursor

AI rules work automatically with Cursor's built-in ESLint support.

---

## Next Steps

- [Validation Commands](./VALIDATION.md) - Learn all validation options
- [Cost Tracking](./COST-TRACKING.md) - Set up cost monitoring
- [Design System](./DESIGN-SYSTEM.md) - Understand design rules
