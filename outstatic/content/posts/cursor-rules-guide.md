---
title: 'How to Write Better Cursor Rules (With Examples)'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'cursor-rules-guide'
description: 'Turn Cursor from good to great with the right system prompts. A practical guide to writing effective cursor rules.'
publishedAt: '2025-02-10T12:00:00.000Z'
---

**Turn Cursor from good to great with the right system prompts.**

---

## What Are Cursor Rules?

Cursor rules are system prompts that shape how the AI assistant behaves in your project. They live in `.cursor/rules` or `.cursorrules` and tell Cursor:

- What frameworks and libraries you use
- Your coding conventions
- What to avoid
- How to structure responses

Good rules make Cursor feel like a senior developer who knows your codebase.

## Why Most Cursor Rules Suck

The default rules are generic. "Write clean code" tells the AI nothing useful.

Effective rules are:
- **Specific** - "Use Tailwind, not inline styles"
- **Contextual** - "This is a Next.js 14 app with App Router"
- **Opinionated** - "Prefer server components unless interactivity is required"

## The Anatomy of a Great Cursor Rule

```markdown
# Project Context
This is a Next.js 14 application using:
- TypeScript (strict mode)
- Tailwind CSS v4
- Prisma ORM
- NextAuth v5

# Code Style
- Use functional components with hooks
- Prefer named exports
- Use `cn()` for conditional classes
- All components must be typed with interfaces, not `type`

# What to Avoid
- Never use `any` type
- No inline styles
- Don't suggest class components
- Avoid barrel exports in large directories

# Response Format
- Keep explanations brief
- Show code first, explain after
- Use TypeScript for all examples
```

## Rules for Common Stacks

### React + TypeScript
```markdown
# Stack
React 19, TypeScript 5.x, Vite

# Conventions
- Use functional components exclusively
- Prefer `useState` and `useReducer` over external state
- Destructure props in function parameters
- Use `interface` for component props, `type` for unions/utilities

# Testing
- Write tests with Vitest and Testing Library
- Test behavior, not implementation
- Mock at the network boundary with MSW
```

### Python Backend
```markdown
# Stack
Python 3.12, FastAPI, SQLAlchemy 2.0, Pydantic v2

# Conventions
- Use type hints everywhere
- Async by default for I/O operations
- Dependency injection via FastAPI's Depends
- Pydantic models for all request/response schemas

# Structure
- Route handlers in `routers/`
- Business logic in `services/`
- Database models in `models/`
- Keep handlers thin, services fat
```

### Go Service
```markdown
# Stack
Go 1.22, Chi router, sqlc, pgx

# Conventions
- Accept interfaces, return structs
- Errors are values - check them explicitly
- Context as first parameter
- Table-driven tests

# Project Layout
Follow golang-standards/project-layout
- `/cmd` - Main applications
- `/internal` - Private application code
- `/pkg` - Public libraries
```

## Where to Find More Rules

We've collected 140+ battle-tested rules at **[indx.sh/rules](https://indx.sh/rules)**:

- Filter by language (TypeScript, Python, Go, Rust)
- Filter by framework (Next.js, React, FastAPI, Django)
- One-click copy to clipboard
- Community ratings

## Pro Tips

1. **Start small** - One focused rule beats a 500-line manifest
2. **Iterate** - Add rules when Cursor makes repeated mistakes
3. **Be explicit about what NOT to do** - Negative constraints help
4. **Include examples** - Show the exact format you want

## Beyond .cursorrules

Cursor also supports:
- **Project-level rules** in `.cursor/rules/`
- **Global rules** in settings
- **Per-file rules** using comments

Layer them: global defaults → project rules → file-specific overrides.

---

**Browse 140+ Cursor rules:** [indx.sh/rules](https://indx.sh/rules)
**Submit your own:** [indx.sh/rules/submit](https://indx.sh/rules/submit)
