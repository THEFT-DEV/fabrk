---
title: '62+ components, One Design Language: Building a Component Library at Scale'
status: 'published'
author:
  name: 'Jason Poindexter'
slug: 'component-library-at-scale'
description: 'How I built a component library that stays consistent at scale using composition, templates, and strict file size limits.'
publishedAt: '2025-02-02T12:00:00.000Z'
---

**TL;DR:** How I built Fabrk - a component library that stays consistent at scale - using composition, templates, and strict file size limits.

---

## The Problem With Component Libraries

Most component libraries start clean and end messy. You create a Button. Then a ButtonWithIcon. Then a ButtonGroup. Then ButtonGroupWithIconAndLoading. Suddenly you have 47 button variants and none of them quite work together.

I took a different approach: **composition over variants**.

---

## The Fabrk Foundation

Fabrk is built on top of Radix UI primitives - headless, accessible components that handle the hard parts:

- Dialog
- Dropdown Menu
- Tabs
- Accordion
- Popover

Radix handles accessibility, keyboard navigation, and focus management. I just add styling.

No custom focus trap logic. No keyboard handling. Just design tokens on top of battle-tested primitives.

---

## The 150-Line Rule

Every component file has a hard limit: **150 lines max**.

If a component grows beyond 150 lines, it's a signal:
- Extract sub-components
- Create a custom hook
- Simplify the API

The rule forces good architecture. Big components get broken up. Small components stay focused.

---

## The Template Pattern

Pages don't start from scratch. They start from templates. Every directory page uses the same template - same layout, same spacing, same responsive behavior. Zero repeated code.

---

## Component Categories

The 62+ components fall into clear categories:

### UI Primitives (src/components/ui/)
Low-level building blocks: Button, Input, Select, Card, Badge, Avatar, Table, Tabs, Dialog, Toast, Tooltip, Popover

### Templates (src/components/templates/)
Page-level layouts: DirectoryListingTemplate, DetailPageTemplate, AuthPageTemplate, SettingsPageTemplate

### Directory Components (src/components/directory/)
Domain-specific: RuleCard, MCPCard, ToolCard, SearchHero, FilterBar, SubmitForm, DetailView

### Shared (src/components/shared/)
Cross-cutting: Navigation, Footer, LoadingState, ErrorBoundary, SEO, Analytics

---

## The Card Anatomy

Cards are everywhere in a directory site. I use a base card with slots (header, body, footer), then specific cards compose this base.

---

## Enforcing the Pattern

New components in Fabrk must:

1. **Import from design-system** - `mode` for all tokens
2. **Use cn() for classNames** - composable styling
3. **Stay under 150 lines** - no exceptions
4. **Use existing Fabrk primitives** - don't rebuild Dialog
5. **Follow the slot pattern** - header/body/footer for cards

PR reviews catch violations. Pre-commit hooks enforce the design token usage. Over time, the patterns become automatic.

---

## The Result

After 3 months of building:

| Metric | Count |
|--------|-------|
| Total components | 209 |
| Avg lines per component | 67 |
| Components over 150 lines | 3 (tables, with exceptions) |
| Duplicated layout code | 0 |

Every page looks consistent because every page uses the same templates. Every card looks consistent because every card uses the same base. The system scales because the patterns scale.

---

## Your Takeaway

You don't need 62+ components to benefit from this:

1. **Pick a primitive library** (Radix, Headless UI, etc.)
2. **Create 3-4 templates** for your common page types
3. **Set a line limit** and enforce it
4. **Use composition** instead of variants

Start strict. Stay strict. Your future self will thank you.

---

**Live site:** [indx.sh](https://indx.sh)

Browse the rules, MCP, and tools directories - all built on these patterns.

---

*Part 4 of the "Building indx.sh in Public" series.*
