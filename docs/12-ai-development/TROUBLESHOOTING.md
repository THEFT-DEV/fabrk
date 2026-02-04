# Troubleshooting Guide

Common issues and solutions for AI development tools.

---

## Validation Issues

### "Module not found" Errors

**Problem:** Running `npm run ai:validate` fails with module errors.

**Solution:**
```bash
# Reinstall dependencies
npm install

# Generate Prisma client (if using cost tracking)
npx prisma generate

# Clear node_modules and reinstall
rm -rf node_modules && npm install
```

### False Positive: eval() in Validation Code

**Problem:** Validation flags its own pattern definitions as errors.

**Solution:** The validation script excludes its own files. If you see this:

```bash
# Verify exclusions in scripts/ai-validate.ts
# Should include:
# 'src/lib/ai/validation.ts',
# 'src/lib/eslint/**',
```

### False Positive: Hardcoded Colors in Theme Components

**Problem:** Color picker or theme components flagged for hardcoded colors.

**Solution:** Add exemption in `eslint.config.mjs`:

```javascript
{
  files: ["src/components/theme/your-component.tsx"],
  rules: {
    'design-system/no-hardcoded-colors': 'off',
  }
}
```

### Slow Validation

**Problem:** `ai:validate` takes too long on large codebase.

**Solution:** Validate only changed files:

```bash
# Validate changed files only
npm run ai:validate $(git diff --name-only HEAD~1 | grep -E '\.(ts|tsx)$' | tr '\n' ' ')

# Or validate specific directory
npm run ai:validate src/app/api/
```

---

## ESLint Issues

### "Parsing error: Cannot find module"

**Problem:** ESLint can't parse TypeScript files.

**Solution:**
```bash
# Ensure TypeScript ESLint is installed
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Verify tsconfig.json exists
ls tsconfig.json
```

### "Rule not found: ai/no-unsafe-eval"

**Problem:** Custom AI rules not loading.

**Solution:**
```bash
# Verify AI rules file exists
ls src/lib/eslint/ai-rules.js

# Check eslint.config.mjs imports
# Should have: import aiRules from "./src/lib/eslint/ai-rules.js";
```

### Conflicting ESLint Configs

**Problem:** Errors about duplicate plugins or configs.

**Solution:**
```javascript
// eslint.config.mjs - Use sanitization for Next.js config
const sanitizePlugin = (plugin) => {
  if (!plugin || typeof plugin !== "object") return plugin;
  const { configs, ...rest } = plugin;
  return { ...rest };
};
```

---

## TypeScript Issues

### "Cannot find module '@/...'"

**Problem:** Path aliases not resolving.

**Solution:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Stale .next Cache

**Problem:** TypeScript errors reference deleted files.

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### "Type 'any' is not assignable"

**Problem:** Strict TypeScript catching AI-generated `any` types.

**Solution:** Fix the code:
```typescript
// Before
const data: any = response;

// After
interface ResponseData {
  id: string;
  name: string;
}
const data: ResponseData = response;
```

---

## Cost Tracking Issues

### "Table ai_cost_events does not exist"

**Problem:** Cost tracking database not set up.

**Solution:**
```bash
# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

### Costs Not Recording

**Problem:** API calls not being tracked.

**Solution:**
1. Verify `trackAICost` is being called:
```typescript
// Correct usage
const result = await trackAICost({
  feature: 'my-feature',
  model: 'claude-3-5-sonnet-20241022',
  fn: async (client) => { ... }
});
```

2. Check database connection:
```bash
npm run db:studio
# Verify ai_cost_events table has records
```

### Incorrect Cost Calculations

**Problem:** Costs seem wrong.

**Solution:**
1. Verify model pricing in `src/lib/ai/cost.ts`
2. Check token counts in response
3. Verify model name matches pricing table exactly

---

## Build Issues

### "Build failed" After File Deletion

**Problem:** Build references deleted files.

**Solution:**
```bash
# Clear all caches
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
npm run build
```

### Pre-commit Hook Failing

**Problem:** Commits blocked by validation.

**Solution:**
```bash
# Run checks manually to see errors
npm run type-check
npm run lint

# Fix errors, then commit

# Emergency bypass (use sparingly)
git commit --no-verify
```

---

## Runtime Issues

### "AppError is not a constructor"

**Problem:** Error class not properly exported.

**Solution:**
```typescript
// Verify export in src/types/ai.ts
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}
```

### useCostTracking Returns Undefined

**Problem:** Hook not working correctly.

**Solution:**
1. Verify API endpoint exists: `/api/costs/today`
2. Check for network errors in console
3. Ensure component is client-side (`'use client'`)

---

## Common Error Messages

### "Hardcoded hex color detected"

**Fix:** Replace with design token:
```tsx
// Before
<div className="text-[#10b981]">

// After
<div className="text-primary">
```

### "Arbitrary Tailwind value"

**Fix:** Use scale value:
```tsx
// Before
<div className="p-[13px]">

// After
<div className="p-3">  // 12px
// or
<div className="p-4">  // 16px
```

### "eval() usage detected"

**Fix:** Remove eval:
```typescript
// Before
const result = eval(expression);

// After
const result = JSON.parse(jsonString);
// or use a safe expression parser
```

### "SQL injection risk"

**Fix:** Use parameterized query:
```typescript
// Before
const query = `SELECT * FROM users WHERE id = '${id}'`;

// After
const user = await prisma.user.findUnique({ where: { id } });
```

---

## Getting Help

### Debug Mode

Run validation with verbose output:
```bash
DEBUG=true npm run ai:validate
```

### Check Versions

```bash
node --version  # Should be 22.x
npm --version   # Should be 10.x
npx tsc --version
npx eslint --version
```

### Reset Everything

If nothing works:
```bash
# Nuclear option - reset all caches and reinstall
rm -rf node_modules
rm -rf .next
rm -rf package-lock.json
npm install
npx prisma generate
npm run build
```

---

## Reporting Issues

When reporting issues, include:

1. Command that failed
2. Full error message
3. Node/npm versions
4. Relevant file contents
5. Steps to reproduce

```bash
# Generate debug info
node --version
npm --version
npm run ai:validate 2>&1 | head -50
```
