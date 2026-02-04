# Security Guide

Security scanning and best practices for AI-generated code.

---

## Overview

AI can generate code with security vulnerabilities:
- SQL injection
- XSS (Cross-Site Scripting)
- Hardcoded credentials
- Command injection
- Unsafe redirects

This guide covers detection and prevention.

---

## Security Scanning

### Run Security Scan

```bash
npm run ai:security
```

### What It Detects

| Severity | Vulnerability | Pattern |
|----------|--------------|---------|
| HIGH | SQL injection | Template literals in queries |
| HIGH | eval() usage | Dynamic code execution |
| HIGH | Hardcoded secrets | API keys, passwords in code |
| MEDIUM | innerHTML | XSS vulnerability |
| MEDIUM | Command injection | User input in shell commands |
| MEDIUM | Unsafe redirect | Open redirect vulnerability |
| LOW | Missing validation | Unvalidated user input |
| LOW | document.write | DOM manipulation risk |

### Output Example

```
Security Scan Results
═══════════════════════════════════════

src/app/api/users/route.ts
  HIGH   SQL injection risk at :45
         Template literal used in database query
         Fix: Use parameterized queries

  MEDIUM Missing input validation at :32
         userId parameter not validated
         Fix: Validate before use

src/lib/utils.ts
  LOW    Consider sanitizing user input at :78

═══════════════════════════════════════
Summary
  HIGH: 1
  MEDIUM: 1
  LOW: 1

✖ Security scan found high-severity issues
```

---

## SQL Injection

### The Problem

```typescript
// DANGEROUS - SQL injection vulnerability
const query = `SELECT * FROM users WHERE id = '${userId}'`;
await db.raw(query);

// User could input: ' OR '1'='1
// Resulting query: SELECT * FROM users WHERE id = '' OR '1'='1'
```

### The Fix

```typescript
// SAFE - Parameterized query
const user = await db.user.findUnique({
  where: { id: userId }
});

// SAFE - Prisma with parameters
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE id = ${userId}
`;

// SAFE - Explicit parameterization
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);
```

### Detection Pattern

```typescript
// ai:security detects:
// - Template literals in .query(), .raw(), .execute()
// - String concatenation in SQL contexts
// - ${ } inside SQL strings
```

---

## XSS (Cross-Site Scripting)

### The Problem

```typescript
// DANGEROUS - XSS vulnerability
element.innerHTML = userInput;

// DANGEROUS - React bypass
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// User could input: <script>stealCookies()</script>
```

### The Fix

```typescript
// SAFE - React handles escaping
<div>{userInput}</div>

// SAFE - Sanitize if HTML needed
import DOMPurify from 'isomorphic-dompurify';

const sanitized = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: sanitized }} />

// SAFE - Text content only
element.textContent = userInput;
```

### Detection Pattern

```typescript
// ai:security detects:
// - .innerHTML assignments
// - dangerouslySetInnerHTML without sanitization
// - document.write()
```

---

## Hardcoded Credentials

### The Problem

```typescript
// DANGEROUS - Credentials in source code
const apiKey = 'sk-1234567890abcdef';
const password = 'admin123';
const dbUrl = 'postgres://user:password@host/db';
```

### The Fix

```typescript
// SAFE - Environment variables
const apiKey = process.env.API_KEY;

// SAFER - Validated environment
import { env } from '@/lib/env';
const apiKey = env.API_KEY; // Typed and validated

// For local development
// .env.local (gitignored)
API_KEY=sk-1234567890abcdef
```

### Detection Pattern

```typescript
// ai:security detects:
// - Variables named password, secret, apiKey, token
// - Strings matching API key patterns (sk-, pk-, etc.)
// - Connection strings with credentials
```

---

## eval() and Dynamic Code

### The Problem

```typescript
// DANGEROUS - Code injection
eval(userInput);

// DANGEROUS - Function constructor
new Function(userInput)();

// DANGEROUS - setTimeout with string
setTimeout(userInput, 1000);
```

### The Fix

```typescript
// SAFE - Parse data, don't execute
const data = JSON.parse(userInput);

// SAFE - Use a parser for expressions
import { evaluate } from 'mathjs';
const result = evaluate(userInput); // Safe math expressions only

// SAFE - Allowlist approach
const allowedActions = { save: saveData, load: loadData };
const action = allowedActions[userInput];
if (action) action();
```

### Detection Pattern

```typescript
// ai:security detects:
// - eval()
// - new Function()
// - setTimeout/setInterval with string argument
```

---

## Command Injection

### The Problem

```typescript
// DANGEROUS - Command injection
import { exec } from 'child_process';
exec(`git clone ${userUrl}`);

// User could input: ; rm -rf /
// Resulting command: git clone ; rm -rf /
```

### The Fix

```typescript
// SAFE - Use execFile with arguments array
import { execFile } from 'child_process';
execFile('git', ['clone', userUrl]);

// SAFE - Validate input
const urlPattern = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\.git$/;
if (!urlPattern.test(userUrl)) {
  throw new AppError('INVALID_URL', 'Invalid repository URL');
}

// SAFE - Use libraries instead of shell
import simpleGit from 'simple-git';
await simpleGit().clone(userUrl);
```

---

## Unsafe Redirects

### The Problem

```typescript
// DANGEROUS - Open redirect
const returnUrl = request.query.returnUrl;
redirect(returnUrl);

// Attacker could use: ?returnUrl=https://evil.com
```

### The Fix

```typescript
// SAFE - Validate against allowlist
const allowedHosts = ['example.com', 'app.example.com'];
const url = new URL(returnUrl, 'https://example.com');

if (!allowedHosts.includes(url.host)) {
  redirect('/'); // Default to home
}
redirect(url.toString());

// SAFE - Only allow relative paths
if (returnUrl.startsWith('/') && !returnUrl.startsWith('//')) {
  redirect(returnUrl);
} else {
  redirect('/');
}
```

---

## Input Validation

### Always Validate User Input

```typescript
import { z } from 'zod';

// Define schema
const userInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150),
});

// Validate
export async function POST(request: Request) {
  const body = await request.json();

  const result = userInputSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: { code: 'INVALID_INPUT', message: result.error.message } },
      { status: 400 }
    );
  }

  // Now safe to use result.data
  const { email, name, age } = result.data;
}
```

### Common Validation Patterns

```typescript
// Email
const email = z.string().email();

// URL
const url = z.string().url();

// UUID
const id = z.string().uuid();

// Enum
const status = z.enum(['active', 'inactive', 'pending']);

// Number range
const page = z.number().int().min(1).max(1000);

// String length
const name = z.string().min(1).max(255);

// Optional with default
const limit = z.number().optional().default(20);
```

---

## ESLint Security Rules

Enabled in `eslint.config.mjs`:

```javascript
{
  rules: {
    "ai/no-unsafe-eval": "error",
    // Additional security rules from ESLint plugins
  }
}
```

---

## Security Checklist

Before deployment, verify:

- [ ] No hardcoded credentials
- [ ] No eval() or dynamic code execution
- [ ] All SQL uses parameterized queries
- [ ] User input is validated
- [ ] HTML output is sanitized
- [ ] Redirects are validated
- [ ] API routes check authentication
- [ ] Sensitive data is encrypted
- [ ] HTTPS is enforced
- [ ] CORS is properly configured

---

## Validation Commands

```bash
# Security-focused scan
npm run ai:security

# Full validation (includes security)
npm run ai:validate

# Pre-deployment (includes all checks)
npm run ai:pre-deploy
```

---

## Reporting Vulnerabilities

If you discover a security vulnerability:

1. Do not open a public issue
2. Email security@yourdomain.com
3. Include reproduction steps
4. Allow time for fix before disclosure
