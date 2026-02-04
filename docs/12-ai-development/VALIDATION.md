# Validation Commands Reference

Complete reference for all AI code validation commands.

---

## Command Overview

| Command | Description | Exit Code |
|---------|-------------|-----------|
| `npm run ai:validate` | Security, design, type checks | 1 on errors |
| `npm run ai:lint` | AI best practices | 1 on errors |
| `npm run ai:security` | Vulnerability scanning | 1 on errors |
| `npm run ai:cost-report` | Cost analysis | Always 0 |
| `npm run ai:pre-deploy` | All checks combined | 1 on errors |

---

## ai:validate

The primary validation command. Checks for common AI-generated code issues.

### Usage

```bash
# Validate entire src directory
npm run ai:validate

# Validate specific path
npm run ai:validate src/components/

# Validate single file
npm run ai:validate src/app/api/users/route.ts
```

### What It Checks

#### Security Issues (Errors)

| Pattern | Description | Severity |
|---------|-------------|----------|
| `eval()` | Dynamic code execution | Error |
| `innerHTML` | XSS vulnerability | Error |
| `document.write` | DOM manipulation risk | Error |
| Hardcoded secrets | API keys, passwords in code | Error |

#### Design System (Errors)

| Pattern | Description | Severity |
|---------|-------------|----------|
| Hex colors (`#fff`) | Hardcoded colors | Error |
| RGB/HSL colors | Hardcoded colors | Error |
| Tailwind colors (`text-red-500`) | Non-semantic colors | Error |

#### Type Safety (Warnings)

| Pattern | Description | Severity |
|---------|-------------|----------|
| `any` type | Untyped code | Warning |
| `@ts-ignore` | Suppressed errors | Warning |
| Non-null assertion (`!`) | Unsafe assumption | Warning |

### Output Format

```
src/components/example.tsx
  ERROR [security] Found eval() - security risk (no-unsafe-eval):42
  WARN  [type-safety] Avoid using "any" type (no-explicit-any):15

─────────────────────────────────────
Summary
Files scanned: 1250
Files with issues: 2
  Errors: 1
  Warnings: 1
  Info: 0

✖ Validation failed with errors
```

### Exclusions

The following are excluded from validation:

```typescript
// Test files
'src/**/*.test.ts',
'src/**/*.test.tsx',
'src/**/*.spec.ts',
'src/**/*.spec.tsx',

// Type definitions
'src/**/*.d.ts',

// Validation tools (to avoid false positives)
'src/lib/ai/validation.ts',
'src/lib/eslint/**',
```

---

## ai:lint

Checks for AI-specific best practices.

### Usage

```bash
npm run ai:lint
```

### What It Checks

| Rule | Description |
|------|-------------|
| Cost tracking | AI API calls should track costs |
| API response types | Responses should be typed |
| AppError usage | Use AppError for error handling |
| Budget checks | Check budget before expensive calls |
| Feature names | AI features should have names |

### Configuration

Enable/disable rules in `eslint.config.mjs`:

```javascript
{
  files: ["src/app/api/**/*.ts"],
  rules: {
    "ai/no-unsafe-eval": "error",
    "ai/prefer-app-error": "warn",
    "ai/require-cost-tracking": "off", // Enable with "warn"
  },
},
```

---

## ai:security

Dedicated security vulnerability scanning.

### Usage

```bash
npm run ai:security
```

### What It Checks

| Vulnerability | Description |
|--------------|-------------|
| SQL injection | Template literals in queries |
| XSS | Unescaped user input in HTML |
| Command injection | User input in shell commands |
| Path traversal | User input in file paths |
| Hardcoded credentials | Secrets in source code |
| Unsafe redirects | Open redirect vulnerabilities |
| Missing input validation | Unvalidated user input |

### Output

```
Security Scan Results
─────────────────────────────────────

src/app/api/users/route.ts
  HIGH   SQL injection risk - template literal in query :45
  MEDIUM Missing input validation on userId :32

src/lib/utils.ts
  LOW    Consider using parameterized query :78

─────────────────────────────────────
Summary
  HIGH: 1
  MEDIUM: 1
  LOW: 1

✖ Security scan found high-severity issues
```

---

## ai:cost-report

Generates cost analysis report for AI API usage.

### Usage

```bash
npm run ai:cost-report
```

### Requirements

- Database connection (reads from `ai_cost_events` table)
- Cost tracking must be implemented in your API calls

### Output

```
AI Cost Report - Last 7 Days
─────────────────────────────────────

Daily Breakdown
  Mon: $12.45 (145 calls)
  Tue: $8.32 (98 calls)
  Wed: $15.67 (189 calls)
  Thu: $9.21 (112 calls)
  Fri: $11.89 (134 calls)
  Sat: $3.45 (42 calls)
  Sun: $2.10 (25 calls)

Total: $63.09

Top Features by Cost
  1. generate-user-page    $18.45 (29%)
  2. ai-chat-completion    $15.32 (24%)
  3. code-review           $12.89 (20%)
  4. summarize-document    $9.43 (15%)
  5. other                 $7.00 (12%)

Success Rate: 98.2%
Avg Response Time: 1.2s
```

---

## ai:pre-deploy

Runs all validation checks in sequence. Use before deployment.

### Usage

```bash
npm run ai:pre-deploy
```

### What It Runs

1. `npm run type-check` - TypeScript compilation
2. `npm run lint` - ESLint validation
3. `npm run ai:validate` - AI code validation
4. `npm run ai:security` - Security scanning

### Exit Behavior

Exits with code 1 if ANY check fails. All checks run even if earlier ones fail.

### CI/CD Integration

```yaml
# GitHub Actions
- name: Pre-deploy Validation
  run: npm run ai:pre-deploy

# Vercel
{
  "buildCommand": "npm run ai:pre-deploy && next build"
}
```

---

## design:lint

Design system validation (supplementary to ESLint).

### Usage

```bash
# Full scan
npm run design:lint

# Specific path
npm run design:lint src/components/

# JSON output (for CI)
npm run design:lint:ci
```

### What It Checks

| Pattern | Description |
|---------|-------------|
| Hex colors | `#fff`, `#ffffff` |
| Tailwind palette colors | `text-red-500`, `bg-blue-600` |
| Arbitrary spacing | `p-[13px]`, `m-[20px]` |
| Arbitrary radius | `rounded-[10px]` |

### Exclusions

Automatically excludes:
- Theme/color picker components
- Chart components (Recharts uses color strings)
- Email templates (require inline styles)
- Documentation examples

---

## Common Workflows

### Fix All Errors

```bash
# 1. Run validation
npm run ai:validate

# 2. Fix errors shown in output

# 3. Re-run to verify
npm run ai:validate
```

### Validate New Code

```bash
# After AI generates code
npm run ai:validate src/path/to/new/code/

# Fix any issues, then run full validation
npm run ai:pre-deploy
```

### Pre-Commit Check

```bash
npm run type-check && npm run lint
```

### Pre-PR Check

```bash
npm run ai:pre-deploy
```

---

## Troubleshooting

### False Positives

If validation flags legitimate code:

1. Check if file should be excluded (chart components, theme tools)
2. Add to exclusion list in `eslint.config.mjs` or `scripts/ai-validate.ts`
3. Use inline disable comment as last resort:

```typescript
// eslint-disable-next-line ai/no-hardcoded-colors
const brandColor = '#ff0000'; // Brand requirement
```

### Slow Validation

For large codebases:

```bash
# Validate only changed files
npm run ai:validate $(git diff --name-only HEAD~1 | grep -E '\.(ts|tsx)$')
```

### Missing Dependencies

If commands fail with module errors:

```bash
npm install
npx prisma generate  # If using cost tracking
```
