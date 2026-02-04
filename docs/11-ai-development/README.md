# AI Development Framework

> Build with AI confidently. Type-safe, cost-aware, design-consistent code generation.

---

## Overview

This framework provides tools specifically designed for developers who use AI assistants (Claude Code, Cursor, ChatGPT) to write code. It solves common problems with AI-generated code:

| Problem | Solution |
|---------|----------|
| Design inconsistency | Automated design system enforcement |
| Hidden API costs | Real-time cost tracking and budgets |
| Type safety issues | Strict validation and type checking |
| Security vulnerabilities | Automated security scanning |
| No code quality checks | Pre-commit validation pipeline |

---

## Quick Start

```bash
# Run all validations
npm run ai:pre-deploy

# Individual checks
npm run ai:validate      # Security, design, types
npm run ai:lint          # AI best practices
npm run ai:security      # Vulnerability scanning
npm run ai:cost-report   # API cost analysis
```

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](./GETTING-STARTED.md) | Initial setup and configuration |
| [Validation Commands](./VALIDATION.md) | All validation tools explained |
| [Cost Tracking](./COST-TRACKING.md) | Monitor and budget AI API costs |
| [Design System](./DESIGN-SYSTEM.md) | Rules AI must follow |
| [Type Safety](./TYPE-SAFETY.md) | Type patterns for AI code |
| [Security](./SECURITY.md) | Security scanning and best practices |
| [Testing](./TESTING.md) | Testing AI-generated code |
| [Troubleshooting](./TROUBLESHOOTING.md) | Common issues and fixes |

---

## Architecture

```
src/
├── lib/ai/                    # Core AI utilities
│   ├── cost.ts                # Cost tracking
│   ├── validation.ts          # Code validation
│   ├── integrations.ts        # Pre-configured integrations
│   └── types.ts               # Type definitions
│
├── hooks/                     # React hooks
│   └── use-cost-tracking.ts   # Cost tracking hook
│
├── components/ai/             # AI-related components
│   └── cost-widget.tsx        # Cost display widgets
│
└── app/(platform)/admin/ai-costs/  # Admin dashboard
    └── page.tsx               # Cost monitoring page

scripts/
├── ai-validate.ts             # Main validation script
├── ai-lint.ts                 # Best practices linting
├── ai-security-scan.ts        # Security scanning
├── ai-cost-report.ts          # Cost reporting
└── ai-pre-deploy.ts           # Pre-deployment checks
```

---

## Key Features

### 1. Code Validation

Catches common AI mistakes before they reach production:

- Hardcoded colors and arbitrary values
- Missing type definitions
- Security vulnerabilities
- Unsafe patterns (eval, innerHTML)

```bash
npm run ai:validate
```

### 2. Cost Tracking

Monitor API spending in real-time:

- Daily/weekly/monthly cost reports
- Per-feature cost breakdown
- Budget alerts and thresholds
- Success rate tracking

```bash
npm run ai:cost-report
```

### 3. Design System Enforcement

Ensure AI follows your design rules:

- Semantic color tokens only
- 8-point spacing grid
- System components required
- No arbitrary Tailwind values

```bash
npm run design:lint
```

### 4. Security Scanning

Automated vulnerability detection:

- SQL injection patterns
- XSS vulnerabilities
- Hardcoded credentials
- Unsafe redirects

```bash
npm run ai:security
```

---

## Validation Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success (or warnings only) |
| 1 | Errors found |

All validation commands exit with code 1 if errors are found, enabling CI/CD integration.

---

## Integration with CI/CD

Add to your GitHub Actions workflow:

```yaml
- name: AI Code Validation
  run: npm run ai:pre-deploy
```

Or in your Vercel build command:

```json
{
  "buildCommand": "npm run ai:pre-deploy && next build"
}
```

---

## Support

- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [GitHub Issues](https://github.com/your-repo/issues)
