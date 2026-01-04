# Contributing to Fabrk

Thank you for your interest in contributing to Fabrk! This document provides guidelines and instructions for contributing.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect all community members to:

- Be respectful and considerate
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy toward other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory language
- Personal attacks or insults
- Publishing others' private information
- Spam or off-topic discussions
- Any conduct that could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL (or Supabase/Railway account)
- Git installed
- Code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/fabrk.git
   cd fabrk
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/original/fabrk.git
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

6. **Initialize database:**
   ```bash
   npx prisma db push
   ```

7. **Start development server:**
   ```bash
   npm run dev
   ```

---

## Development Workflow

### Creating a New Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `style/` - UI/UX improvements
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### Making Changes

1. Make your changes in your branch
2. Test your changes thoroughly
3. Commit with clear, descriptive messages

**Good commit messages:**
```bash
git commit -m "feat: add calendar component with date picker"
git commit -m "fix: resolve data table pagination bug"
git commit -m "docs: update QUICK-START guide with troubleshooting"
```

**Follow Conventional Commits:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, missing semi colons, etc.
- `refactor:` - Refactoring code
- `test:` - Adding tests
- `chore:` - Updating build tasks, package manager configs, etc.

### Testing Your Changes

Before submitting a PR:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build check
npm run build

# Manual testing
npm run dev
```

**Test checklist:**
- [ ] All TypeScript errors resolved
- [ ] No ESLint warnings
- [ ] Build succeeds
- [ ] Changes work locally
- [ ] Changes work on mobile (if UI component)
- [ ] No console errors

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## Coding Standards

### TypeScript

- **Strict mode:** All code must be TypeScript strict mode compliant
- **No `any` types:** Use proper types or `unknown` when necessary
- **Export interfaces:** Export prop interfaces for all public components
- **Type imports:** Use `import type` for type-only imports

**Good:**
```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export function Button({ children, variant = "primary", onClick }: ButtonProps) {
  // ...
}
```

**Bad:**
```tsx
export function Button(props: any) {
  // ...
}
```

### React & Next.js

- **Server Components by default:** Use `"use client"` only when necessary
- **Async Server Components:** Leverage async/await in Server Components
- **Client Components:** Only for interactivity (useState, useEffect, etc.)
- **Props destructuring:** Destructure props in function signature

### Styling (Tailwind CSS)

- **Utility-first:** Use Tailwind utilities
- **Consistent spacing:** Use Tailwind spacing scale (p-4, m-6, etc.)
- **Responsive:** Mobile-first responsive design
- **Neobrutalism:** Landing pages follow neobrutalism design (4px borders, brutal shadows)

**Example:**
```tsx
<div className="rounded-lg border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
  {/* Content */}
</div>
```

### File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (grouped)
│   ├── (dashboard)/       # Dashboard pages (grouped)
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # UI primitives
│   ├── landing/           # Landing page sections
│   ├── dashboard/         # Dashboard components
│   └── settings/          # Settings components
├── lib/                   # Utilities, helpers
└── emails/                # Email templates
```

### Naming Conventions

- **Components:** PascalCase (`HeroSection.tsx`, `DataTable.tsx`)
- **Files:** kebab-case for non-components (`email-service.ts`)
- **Functions:** camelCase (`generateEmail`, `formatDate`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRIES`)

---

## Component Guidelines

### Creating a New Component

1. **Plan the component:**
   - What problem does it solve?
   - Does it fit Fabrk's "anti-bloat" philosophy?
   - Is it reusable or specific?

2. **Choose the right location:**
   - UI primitive → `src/components/ui/`
   - Landing page section → `src/components/landing/`
   - Dashboard component → `src/components/dashboard/`

3. **Create the component file:**
   ```tsx
   /**
    * ✅ FABRK COMPONENT
    * ComponentName - Brief description
    * Production-ready ✓
    */

   import { type ReactNode } from "react";

   interface ComponentNameProps {
     children: ReactNode;
     variant?: "default" | "primary";
     // Add more props...
   }

   export function ComponentName({ children, variant = "default" }: ComponentNameProps) {
     return (
       <div>
         {children}
       </div>
     );
   }
   ```

4. **Export from barrel file (if applicable):**
   ```tsx
   // In src/components/landing/index.ts
   export { ComponentName } from "./component-name";
   ```

### Component Requirements

- [ ] **TypeScript:** Fully typed with exported interface
- [ ] **Mobile Responsive:** Works on all screen sizes
- [ ] **Accessible:** ARIA labels, keyboard navigation
- [ ] **Documented:** JSDoc comments explaining props
- [ ] **Example Usage:** Show how to use in comments or docs
- [ ] **No External Dependencies:** Unless absolutely necessary

### Design System Compliance

**For landing page components:**
- 4px black borders
- 4px brutal shadows: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- Purple primary color: `#007AFF`
- Bold typography
- Generous spacing

**For dashboard components:**
- Clean, minimal design
- Consistent with existing dashboard
- Dark mode support (if applicable)

---

## Documentation

### Code Documentation

**Use JSDoc for components:**
```tsx
/**
 * Button component with neobrutalism styling
 *
 * @param children - Button text or content
 * @param variant - Visual style variant
 * @param onClick - Click handler function
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => alert('Clicked')}>
 *   Click Me
 * </Button>
 * ```
 */
export function Button({ children, variant, onClick }: ButtonProps) {
  // ...
}
```

### README & Guides

When adding features that need explanation:

- Update `README.md` if it's a major feature
- Add to relevant guide in `/docs` directory
- Update `COMPONENT-SHOWCASE.md` if it's a new component
- Add to `CHANGELOG.md` under `[Unreleased]`

---

## Pull Request Process

### Before Submitting

1. **Self-review your code:**
   - Read through your changes
   - Check for typos, console.logs, commented code
   - Ensure formatting is consistent

2. **Test thoroughly:**
   - [ ] `npm run type-check` passes
   - [ ] `npm run lint` passes
   - [ ] `npm run build` succeeds
   - [ ] Manual testing completed
   - [ ] Mobile responsive (if UI change)

3. **Update documentation:**
   - Update README if needed
   - Add JSDoc comments
   - Update CHANGELOG under `[Unreleased]`

### Submitting Your PR

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub:**
   - Use the PR template provided
   - Fill out all sections
   - Link related issues

3. **PR Title Format:**
   ```
   feat: add calendar component
   fix: resolve data table pagination bug
   docs: update deployment guide
   ```

4. **PR Description:**
   - Clear explanation of changes
   - Screenshots (if UI changes)
   - Breaking changes (if any)
   - Test results

### PR Review Process

1. **Automated Checks:**
   - TypeScript type checking
   - ESLint
   - Build verification

2. **Maintainer Review:**
   - Code quality
   - Design consistency
   - Documentation completeness
   - Test coverage

3. **Feedback & Iteration:**
   - Address feedback promptly
   - Make requested changes
   - Re-request review when ready

4. **Merge:**
   - Maintainer will merge when approved
   - PR may be squashed into single commit

---

## Issue Guidelines

### Before Creating an Issue

- **Search existing issues** - Your issue may already exist
- **Check documentation** - The answer might be in `/docs`
- **Try the latest version** - Bug might be fixed
- **Reproduce the issue** - Ensure it's consistent

### Creating a Good Issue

**For Bug Reports:**
- Clear title: `[BUG] Data table pagination resets on filter`
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Code snippets if applicable

**For Feature Requests:**
- Clear title: `[FEATURE] Add calendar component`
- Problem it solves
- Proposed solution
- Use cases
- Mockups/references (if applicable)

**For Questions:**
- Clear title: `[QUESTION] How to customize hero background?`
- What you've tried
- What you're trying to accomplish
- Code snippets

---

## Community

### Communication Channels

- **GitHub Issues** - Bug reports, feature requests
- **GitHub Discussions** - General questions, ideas
- **Email** - support@fabrk.dev
- **Email** - support@fabrk.dev for private matters

### Getting Help

1. **Documentation first:** Check `/docs` directory
2. **COMPONENT-SHOWCASE.md:** Component usage reference
3. **CLAUDE.md:** Architecture details
4. **GitHub Issues:** Search existing issues
5. **Discord:** Ask the community
6. **Email:** Last resort for private matters

### Recognition

Contributors are recognized in:
- GitHub contributors graph
- CHANGELOG.md (for significant contributions)
- README.md credits section (for major features)

---

## License

By contributing to Fabrk, you agree that your contributions will be licensed under the same license as the project.

---

## Questions?

If you have questions about contributing:

- Email: support@fabrk.dev
- Check [GitHub Discussions](https://github.com/yourusername/fabrk/discussions)

---

**Thank you for contributing to Fabrk! 🚀**
