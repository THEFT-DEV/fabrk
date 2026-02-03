# Next.js for AI Developers: Complete Framework Design

> The only framework built for developers who code with AI. Type-safe, cost-aware, design-consistent.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [The Problem](#the-problem)
3. [The Solution](#the-solution)
4. [Architecture Overview](#architecture-overview)
5. [Cost Tracking System](#cost-tracking-system)
6. [Code Validation & Linting](#code-validation--linting)
7. [Type Safety for AI](#type-safety-for-ai)
8. [Monitoring Dashboard](#monitoring-dashboard)
9. [AI-Focused Testing](#ai-focused-testing)
10. [Prompt Templates & Context](#prompt-templates--context)
11. [Integrations](#integrations)
12. [Deployment Safety](#deployment-safety)
13. [Implementation Roadmap](#implementation-roadmap)
14. [Revenue Model](#revenue-model)
15. [Marketing & Positioning](#marketing--positioning)

---

## Executive Summary

### Problem
Developers using Claude Code, ChatGPT, and Cursor to build applications face:
- **Design inconsistency** - AI ignores design systems
- **Hidden costs** - No tracking of AI API spending
- **Type safety issues** - Generated code has runtime errors
- **No validation** - Can't verify AI-generated code quality
- **Testing gaps** - Generated functions lack proper tests
- **Security blind spots** - AI might generate vulnerable code

### Solution
A Next.js framework purpose-built for AI-assisted development.

**Core pillars:**
1. Design system enforcement (AI-native)
2. Cost awareness & tracking
3. Code quality validation
4. Type safety guarantees
5. Testing utilities for AI output
6. Monitoring & observability
7. Curated integrations
8. Production-safe defaults

### Target User
- Solo founders building SaaS with AI assistance
- Small teams (2-5 devs) using Claude Code daily
- Developers who want to ship fast but not sacrifice quality
- People building multiple products quickly (like you)

### Why It Works
- **Figma is dying** → devs need alternatives
- **AI coding is exploding** → tools for this workflow don't exist
- **Cost opacity** → developers want visibility
- **Quality concerns** → generated code needs validation
- **Design systems matter** → AI breaks them

### Revenue Potential
- **Free tier:** Boilerplate + design system guide
- **Pro ($99/month):** Monitoring dashboard, cost analysis, team collaboration
- **Enterprise:** Custom integrations, dedicated support, on-premise option

---

## The Problem

### Current AI Development Workflow (Broken)

```
Developer: "Add a user settings page"
     ↓
Claude Code: Generates code
     ↓
Developer: Spends 2 hours fixing:
  - Colors (hardcoded hex instead of tokens)
  - Spacing (arbitrary values instead of scale)
  - Components (custom divs instead of system components)
  - Types (missing interfaces, any types)
  - Tests (none)
  - Cost (no idea how much this cost)
```

### Pain Points

**1. Design Inconsistency**
- AI uses `text-green-500` instead of `text-primary`
- AI hardcodes `#10b981` instead of CSS variables
- AI builds custom buttons when Button component exists
- Result: UI looks broken, takes hours to fix

**2. Hidden Costs**
- No tracking of API calls to Claude/OpenAI
- Developer builds 5 features, no idea if spent $5 or $500
- Can't compare: "Which prompt costs more?"
- No visibility into: "Is this feature worth the API cost?"

**3. Type Safety Issues**
- AI generates `const data: any = response`
- AI forgets to handle null/undefined
- Functions missing return types
- No error types defined
- Runtime errors in production

**4. No Code Quality Validation**
- No way to catch AI mistakes before commit
- No linting specific to AI patterns
- Can't verify components are used correctly
- Security vulnerabilities slip through

**5. Missing Tests**
- AI generates code, forgets to test it
- Generated functions untested → production bugs
- No framework for testing AI output
- Manual testing = slow iteration

**6. No Monitoring**
- Code fails in production, no observability
- Can't see which generated functions error most
- No way to trace back to the prompt that created it
- Silent failures

---

## The Solution

### Framework Pillars

#### 1. AI-Native Design System
Already covered in previous guide. Key addition: **enforcement**.

```typescript
// Config that prevents AI from breaking rules
// tailwind.config.ts
export default {
  theme: {
    colors: {
      // ONLY these colors exist
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      muted: 'var(--muted)',
      // NO access to Tailwind's built-in colors
    },
    spacing: {
      // ONLY these spacing values
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      // etc - no arbitrary values possible
    },
  },
  safelist: [],
  // Prevent arbitrary values entirely
  corePlugins: {
    arbitraryValues: false,
  },
}
```

#### 2. Cost Tracking System
Every API call tracked, categorized, and reported.

#### 3. Code Validation Pipeline
Linting, type checking, security scanning for AI output.

#### 4. Type Safety Guarantees
Strict TypeScript + runtime validation.

#### 5. AI Testing Framework
Utilities designed for testing generated code.

#### 6. Monitoring Dashboard
Real-time visibility into:
- Cost per feature
- Error rates
- Code quality metrics
- AI generation success rate

#### 7. Prompt Templates
Ready-to-use, battle-tested prompts.

#### 8. Production Safety
Deployment gates, cost budgets, performance thresholds.

---

## Architecture Overview

### Folder Structure

```
next-js-for-ai-devs/
├── .ai/                          # AI context & documentation
│   ├── CONTEXT.md                # Master file (copy into AI)
│   ├── tokens.md                 # Design tokens
│   ├── components.md             # Component inventory
│   ├── rules.md                  # Hard constraints
│   ├── patterns.md               # UI patterns
│   ├── prompts/                  # Prompt templates
│   │   ├── new-feature.md
│   │   ├── new-page.md
│   │   ├── fix-bug.md
│   │   ├── add-integration.md
│   │   └── optimize-performance.md
│   └── examples/                 # Before/after code
│
├── lib/                          # Framework utilities
│   ├── ai/
│   │   ├── cost.ts               # Cost tracking
│   │   ├── validation.ts         # Code validation
│   │   ├── types.ts              # Type utilities
│   │   └── monitor.ts            # Monitoring
│   ├── integrations/             # Pre-configured integrations
│   │   ├── stripe.ts
│   │   ├── supabase.ts
│   │   ├── openai.ts
│   │   └── resend.ts
│   └── utils.ts
│
├── hooks/                        # React hooks
│   ├── use-ai-mutation.ts        # For AI API calls
│   ├── use-cost-tracking.ts      # Track costs in component
│   └── use-validation.ts         # Validation hooks
│
├── scripts/
│   ├── ai-lint.js                # Linting
│   ├── ai-validate.js            # Type validation
│   ├── ai-test.js                # Test utilities
│   ├── ai-cost-report.js         # Cost analysis
│   └── ai-security-scan.js       # Security checking
│
├── instrumentation.ts            # Global monitoring setup
├── middleware.ts                 # Request tracking
├── next.config.js                # Optimized for AI
│
├── components/
│   ├── ui/                       # System components
│   ├── monitoring/               # Dashboard components
│   │   ├── CostChart.tsx
│   │   ├── ErrorRate.tsx
│   │   ├── PromptAnalytics.tsx
│   │   └── Dashboard.tsx
│   └── ...
│
├── app/
│   ├── (dashboard)/              # Admin dashboard
│   │   ├── monitoring/page.tsx
│   │   ├── costs/page.tsx
│   │   ├── validation/page.tsx
│   │   └── settings/page.tsx
│   └── ...
│
├── types/
│   ├── ai.ts                     # AI-related types
│   ├── cost.ts                   # Cost tracking types
│   └── monitoring.ts             # Monitoring types
│
└── docs/
    ├── design-system.md          # AI design system guide
    ├── cost-tracking.md
    ├── testing.md
    ├── integrations.md
    └── deployment.md
```

---

## Cost Tracking System

### Why This Matters

Developers using Claude to code have NO visibility into API costs:
- Built 5 features this week: $15 or $150?
- Which feature costs the most?
- Is this feature worth the AI cost?
- How to optimize spending?

**Solution:** Automatic, comprehensive cost tracking.

### Implementation

### 1. Tracking Layer (`lib/ai/cost.ts`)

```typescript
import { Anthropic } from '@anthropic-ai/sdk'

export interface AICostEvent {
  id: string
  timestamp: Date
  model: string
  promptTokens: number
  completionTokens: number
  totalTokens: number
  costUSD: number
  feature: string
  prompt: string
  truncated?: boolean
  success: boolean
  errorMessage?: string
  duration: number // milliseconds
  userId?: string
  metadata?: Record<string, any>
}

// Pricing (update as rates change)
const PRICING = {
  'claude-3-5-sonnet-20241022': {
    input: 0.003 / 1000,    // $0.003 per 1K tokens
    output: 0.015 / 1000,   // $0.015 per 1K tokens
  },
  'claude-3-opus-20250219': {
    input: 0.015 / 1000,
    output: 0.075 / 1000,
  },
  'gpt-4': {
    input: 0.03 / 1000,
    output: 0.06 / 1000,
  },
  'gpt-4o': {
    input: 0.005 / 1000,
    output: 0.015 / 1000,
  },
}

// Storage backend (you'll implement one)
export interface CostStore {
  save(event: AICostEvent): Promise<void>
  query(filters: {
    feature?: string
    startDate?: Date
    endDate?: Date
    userId?: string
  }): Promise<AICostEvent[]>
  aggregate(period: 'daily' | 'weekly' | 'monthly'): Promise<{
    date: string
    totalCost: number
    totalTokens: number
    requestCount: number
  }[]>
}

export class AICostTracker {
  private store: CostStore

  constructor(store: CostStore) {
    this.store = store
  }

  /**
   * Track a Claude API call
   * Usage:
   *   const tracker = new AICostTracker(store)
   *   const result = await tracker.trackClaudeCall({
   *     model: 'claude-3-5-sonnet-20241022',
   *     feature: 'generate-user-page',
   *     prompt: 'Create a user settings page...',
   *     fn: async (client) => {
   *       return client.messages.create({ ... })
   *     }
   *   })
   */
  async trackClaudeCall<T>({
    model,
    feature,
    prompt,
    fn,
    userId,
    metadata,
  }: {
    model: string
    feature: string
    prompt: string
    fn: (client: Anthropic) => Promise<Anthropic.Messages.Message>
    userId?: string
    metadata?: Record<string, any>
  }): Promise<T> {
    const startTime = Date.now()
    const client = new Anthropic()

    try {
      const response = await fn(client)

      // Calculate cost
      const pricing = PRICING[model as keyof typeof PRICING]
      if (!pricing) {
        throw new Error(`Unknown model: ${model}`)
      }

      const promptTokens = response.usage.input_tokens
      const completionTokens = response.usage.output_tokens
      const totalTokens = promptTokens + completionTokens

      const costUSD =
        promptTokens * pricing.input + completionTokens * pricing.output

      // Save event
      const event: AICostEvent = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        model,
        promptTokens,
        completionTokens,
        totalTokens,
        costUSD,
        feature,
        prompt: prompt.substring(0, 500), // Truncate for storage
        success: true,
        duration: Date.now() - startTime,
        userId,
        metadata,
      }

      await this.store.save(event)

      return response.content[0].type === 'text'
        ? (response.content[0].text as T)
        : (response as T)
    } catch (error) {
      const duration = Date.now() - startTime

      const event: AICostEvent = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        model,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        costUSD: 0,
        feature,
        prompt: prompt.substring(0, 500),
        success: false,
        errorMessage: error instanceof Error ? error.message : String(error),
        duration,
        userId,
        metadata,
      }

      await this.store.save(event)
      throw error
    }
  }

  /**
   * Get cost summary
   */
  async getCostSummary(period: 'daily' | 'weekly' | 'monthly') {
    return this.store.aggregate(period)
  }

  /**
   * Get feature costs
   */
  async getFeatureCost(feature: string): Promise<{
    totalCost: number
    callCount: number
    avgCostPerCall: number
    tokenCount: number
  }> {
    const events = await this.store.query({ feature })
    const totalCost = events.reduce((sum, e) => sum + e.costUSD, 0)
    const tokenCount = events.reduce((sum, e) => sum + e.totalTokens, 0)

    return {
      totalCost,
      callCount: events.length,
      avgCostPerCall: totalCost / events.length,
      tokenCount,
    }
  }

  /**
   * Alert on cost threshold
   */
  async checkCostBudget(dailyBudget: number): Promise<{
    withinBudget: boolean
    todaysCost: number
    percentOfBudget: number
  }> {
    const today = new Date().toISOString().split('T')[0]
    const events = await this.store.query({
      startDate: new Date(today),
    })

    const todaysCost = events.reduce((sum, e) => sum + e.costUSD, 0)

    return {
      withinBudget: todaysCost <= dailyBudget,
      todaysCost,
      percentOfBudget: (todaysCost / dailyBudget) * 100,
    }
  }
}
```

### 2. Database Schema (Supabase example)

```sql
-- Cost tracking table
create table ai_cost_events (
  id text primary key,
  created_at timestamp default now(),
  model text not null,
  feature text not null,
  prompt_tokens integer not null,
  completion_tokens integer not null,
  cost_usd numeric not null,
  success boolean not null,
  error_message text,
  duration_ms integer,
  user_id uuid references auth.users,
  metadata jsonb,

  -- Indexes for fast queries
  index on (feature),
  index on (created_at),
  index on (user_id),
  index on (model)
);

-- Daily cost summary (materialized view)
create view daily_cost_summary as
select
  date_trunc('day', created_at)::date as date,
  feature,
  model,
  sum(cost_usd) as total_cost,
  count(*) as request_count,
  sum(prompt_tokens + completion_tokens) as total_tokens,
  avg(duration_ms) as avg_duration_ms,
  sum(case when success then 1 else 0 end)::float / count(*) as success_rate
from ai_cost_events
group by date, feature, model;

-- Cost alerts
create table cost_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  alert_type text not null, -- 'daily_budget', 'feature_cost', 'error_rate'
  threshold numeric not null,
  current_value numeric not null,
  triggered_at timestamp default now(),
  read boolean default false
);
```

### 3. React Hook for Components

```typescript
// hooks/use-cost-tracking.ts
import { useCallback, useEffect, useState } from 'react'

export function useCostTracking() {
  const [todaysCost, setTodaysCost] = useState(0)
  const [featureCosts, setFeatureCosts] = useState<Record<string, number>>({})
  const [budget, setBudget] = useState(50) // Daily budget in dollars

  const refreshCosts = useCallback(async () => {
    const response = await fetch('/api/costs/today')
    const data = await response.json()
    setTodaysCost(data.total)
    setFeatureCosts(data.byFeature)
  }, [])

  useEffect(() => {
    refreshCosts()
    // Poll every 5 minutes
    const interval = setInterval(refreshCosts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [refreshCosts])

  return {
    todaysCost,
    budget,
    percentOfBudget: (todaysCost / budget) * 100,
    featureCosts,
    withinBudget: todaysCost <= budget,
    overBudgetBy: Math.max(0, todaysCost - budget),
  }
}

// Usage in component
export function CostWidget() {
  const { todaysCost, budget, percentOfBudget, withinBudget } =
    useCostTracking()

  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">Today's AI Cost</div>
      <div className={cn(
        "text-2xl font-bold",
        withinBudget ? "text-primary" : "text-destructive"
      )}>
        ${todaysCost.toFixed(2)} / ${budget.toFixed(2)}
      </div>
      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all",
            percentOfBudget <= 70 ? "bg-primary" :
            percentOfBudget <= 90 ? "bg-yellow-500" :
            "bg-destructive"
          )}
          style={{ width: `${Math.min(percentOfBudget, 100)}%` }}
        />
      </div>
    </div>
  )
}
```

### 4. API Endpoint for Dashboard

```typescript
// app/api/costs/today/route.ts
import { AICostTracker } from '@/lib/ai/cost'
import { createCostStore } from '@/lib/ai/cost-store'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  const store = createCostStore() // Implement with your DB
  const tracker = new AICostTracker(store)

  // Get today's costs by feature
  const today = new Date().toISOString().split('T')[0]
  const events = await store.query({
    startDate: new Date(today),
    userId: userId || undefined,
  })

  const byFeature = events.reduce((acc, event) => {
    acc[event.feature] = (acc[event.feature] || 0) + event.costUSD
    return acc
  }, {} as Record<string, number>)

  const total = Object.values(byFeature).reduce((a, b) => a + b, 0)

  return Response.json({
    total,
    byFeature,
    count: events.length,
    lastUpdated: new Date(),
  })
}
```

---

## Code Validation & Linting

### The Problem

AI generates code that:
- Uses hardcoded colors instead of tokens
- Creates custom components instead of using system
- Has type errors
- Missing null checks
- Security issues

### Solution: Multi-Layer Validation

### 1. ESLint Plugin (`scripts/eslint-ai.js`)

```javascript
/**
 * Custom ESLint rules for AI-generated code
 * Catches common AI mistakes
 */

module.exports = {
  rules: {
    'no-hardcoded-colors': {
      meta: {
        type: 'error',
        docs: {
          description: 'Forbid hardcoded colors, use design tokens',
        },
        fixable: null,
      },
      create(context) {
        return {
          // Catch hex colors in className
          Property(node) {
            if (node.key.name === 'className') {
              const value = node.value.value
              if (typeof value === 'string') {
                // Check for hex colors in Tailwind
                const hexMatch = value.match(
                  /(text|bg|border|ring)-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+/
                )
                if (hexMatch) {
                  context.report({
                    node,
                    message: `Hardcoded Tailwind color ${hexMatch[0]}. Use semantic token like text-primary, bg-muted, etc.`,
                  })
                }
              }
            }
          },
          // Catch inline styles with colors
          ObjectExpression(node) {
            node.properties.forEach((prop) => {
              if (prop.key.name === 'color' || prop.key.name === 'backgroundColor') {
                const value = prop.value.value
                if (typeof value === 'string' && value.startsWith('#')) {
                  context.report({
                    node: prop,
                    message: `Hardcoded color ${value}. Use CSS variable or Tailwind class.`,
                  })
                }
              }
            })
          },
        }
      },
    },

    'no-arbitrary-tailwind': {
      meta: {
        type: 'error',
        docs: {
          description:
            'Forbid arbitrary Tailwind values like w-[200px]',
        },
      },
      create(context) {
        return {
          Property(node) {
            if (node.key.name === 'className') {
              const value = node.value.value
              if (typeof value === 'string') {
                const arbitraryMatch = value.match(/\w+-\[\d+[a-z%]+\]/g)
                if (arbitraryMatch) {
                  context.report({
                    node,
                    message: `Arbitrary value ${arbitraryMatch[0]}. Use design scale instead.`,
                  })
                }
              }
            }
          },
        }
      },
    },

    'use-component-not-html': {
      meta: {
        type: 'error',
        docs: {
          description:
            'Use system components (Button, Input) instead of HTML elements',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            // Catch custom button styling
            if (node.name.name === 'button') {
              const classNameAttr = node.attributes.find(
                (attr) => attr.name?.name === 'className'
              )
              if (classNameAttr && classNameAttr.value?.value) {
                // If it has styling, should use Button component
                context.report({
                  node,
                  message:
                    'Use <Button> component from @/components/ui/button instead of <button>',
                })
              }
            }

            // Catch custom inputs
            if (node.name.name === 'input') {
              context.report({
                node,
                message:
                  'Use <Input> component from @/components/ui/input instead of <input>',
              })
            }

            // Catch custom divs that look like cards
            if (node.name.name === 'div') {
              const classNameAttr = node.attributes.find(
                (attr) => attr.name?.name === 'className'
              )
              const classValue = classNameAttr?.value?.value || ''
              if (
                classValue.includes('rounded') &&
                classValue.includes('border') &&
                classValue.includes('p-')
              ) {
                context.report({
                  node,
                  message:
                    'Use <Card> component from @/components/ui/card instead of custom div',
                })
              }
            }
          },
        }
      },
    },

    'no-any-type': {
      meta: {
        type: 'error',
        docs: {
          description: 'Forbid "any" type, use specific types',
        },
      },
      create(context) {
        return {
          TSAnyKeyword(node) {
            context.report({
              node,
              message: 'Avoid "any" type. Use a specific type instead.',
            })
          },
        }
      },
    },

    'require-error-handling': {
      meta: {
        type: 'error',
        docs: {
          description: 'Require error handling in async functions',
        },
      },
      create(context) {
        return {
          ArrowFunctionExpression(node) {
            // Check if async function
            if (node.async) {
              // Check if has try-catch or .catch()
              const hasTryCatch =
                node.body.type === 'BlockStatement' &&
                node.body.body.some(
                  (stmt) => stmt.type === 'TryStatement'
                )

              if (!hasTryCatch) {
                context.report({
                  node,
                  message:
                    'Async functions should have error handling (try-catch or .catch())',
                })
              }
            }
          },
        }
      },
    },
  },
}
```

### 2. TypeScript Strict Mode

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
  }
}
```

### 3. Runtime Validation (`lib/ai/validation.ts`)

```typescript
import { z } from 'zod'

/**
 * Validate that generated code returns correct types
 * Usage:
 *   const validate = new CodeValidator()
 *   validate.functionReturns(myFunction, z.object({
 *     id: z.string(),
 *     name: z.string(),
 *   }))
 */
export class CodeValidator {
  /**
   * Validate function return type at runtime
   */
  validateFunctionReturns<T>(
    fn: (...args: any[]) => T,
    schema: z.ZodSchema<T>,
    testInputs: any[]
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    try {
      testInputs.forEach((input) => {
        try {
          const result = fn(input)
          const parsed = schema.safeParse(result)

          if (!parsed.success) {
            errors.push(`Invalid return for input ${input}: ${parsed.error}`)
          }
        } catch (e) {
          errors.push(`Function threw error: ${e}`)
        }
      })
    } catch (e) {
      errors.push(`Validation setup failed: ${e}`)
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Check for unsafe patterns in generated code
   */
  scanForSecurityIssues(code: string): string[] {
    const issues: string[] = []

    // Check for SQL injection patterns
    if (/query\s*\(\s*`.*\$\{/.test(code)) {
      issues.push(
        'Potential SQL injection: using template literals in query'
      )
    }

    // Check for hardcoded secrets
    if (
      /(password|token|secret|api_key)\s*[:=]\s*["'][^"']*["']/i.test(code)
    ) {
      issues.push('Potential hardcoded secret detected')
    }

    // Check for eval
    if (/eval\s*\(/.test(code)) {
      issues.push('Found eval() - security risk')
    }

    // Check for missing await on promises
    if (/const\s+\w+\s*=\s*(fetch|.*async)/.test(code)) {
      if (!/await\s+/.test(code)) {
        issues.push('Async function not awaited')
      }
    }

    return issues
  }

  /**
   * Check that component follows design system
   */
  validateComponentDesign(jsxCode: string): string[] {
    const issues: string[] = []

    // Check for hardcoded colors
    if (/#[0-9a-f]{3,6}/i.test(jsxCode)) {
      issues.push('Found hardcoded hex color')
    }

    if (/text-(red|blue|green|yellow|purple|pink)-\d+/.test(jsxCode)) {
      issues.push('Found Tailwind color instead of semantic token')
    }

    // Check for arbitrary values
    if (/\[[\d.]+[a-z%]+\]/.test(jsxCode)) {
      issues.push('Found arbitrary Tailwind value - use design scale')
    }

    // Check for custom button
    if (/<button\s+className=/.test(jsxCode)) {
      issues.push('Found custom button - use Button component')
    }

    // Check for custom inputs
    if (/<input\s+className=/.test(jsxCode)) {
      issues.push('Found custom input - use Input component')
    }

    return issues
  }
}
```

### 4. CLI Script (`scripts/ai-validate.js`)

```bash
#!/usr/bin/env node

/**
 * Validate AI-generated code before commit
 * Usage: npx ai-validate [file-path]
 */

const fs = require('fs')
const path = require('path')
const { CodeValidator } = require('@/lib/ai/validation')

const validator = new CodeValidator()

function main() {
  const filePath = process.argv[2] || '.'

  if (fs.statSync(filePath).isDirectory()) {
    // Validate directory
    const files = fs.readdirSync(filePath, { recursive: true })
    files
      .filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'))
      .forEach((file) => validateFile(path.join(filePath, file)))
  } else {
    // Validate single file
    validateFile(filePath)
  }
}

function validateFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8')

  console.log(`\nValidating ${filePath}...`)

  const securityIssues = validator.scanForSecurityIssues(code)
  const designIssues = validator.validateComponentDesign(code)

  if (securityIssues.length > 0) {
    console.error(`❌ Security issues:`)
    securityIssues.forEach((issue) => console.error(`   - ${issue}`))
  }

  if (designIssues.length > 0) {
    console.error(`❌ Design system violations:`)
    designIssues.forEach((issue) => console.error(`   - ${issue}`))
  }

  if (securityIssues.length === 0 && designIssues.length === 0) {
    console.log(`✅ Valid`)
  }

  process.exit(securityIssues.length + designIssues.length > 0 ? 1 : 0)
}

main()
```

---

## Type Safety for AI

### Problem

AI generates code with type issues:
- `const data: any = response`
- Missing null checks: `user.name.toUpperCase()` → crashes if user is null
- Functions without return types
- Props interface missing required fields

### Solution: Type Patterns AI Understands

### 1. Base Type Exports (`types/ai.ts`)

```typescript
/**
 * Type definitions AI-generated code should use
 *
 * When AI generates code, ensure it:
 * 1. Imports from @/types/ai
 * 2. Never uses "any"
 * 3. Always handles null/undefined
 * 4. Always defines return types
 */

// API Response wrapper (forces proper typing)
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, any>
  }
  meta?: {
    timestamp: string
    requestId: string
  }
}

// Async operation states
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// Form state
export interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isDirty: boolean
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasMore: boolean
}

// User (example domain type)
export interface User {
  id: string
  email: string
  name: string | null
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

// Error type (for consistent error handling)
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// Guards for type narrowing (AI loves these)
export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string'
  )
}

export function isAPIResponse<T>(
  obj: unknown,
  schema?: (val: unknown) => val is T
): obj is APIResponse<T> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'success' in obj &&
    typeof obj.success === 'boolean' &&
    (!schema || !('data' in obj) || schema(obj.data))
  )
}
```

### 2. Function Template for AI (`lib/ai/type-templates.ts`)

```typescript
/**
 * Type templates for AI to use as patterns
 * Copy these into prompts to guide AI code generation
 */

/**
 * TEMPLATE 1: Safe async function with proper error handling
 *
 * Copy this when asking AI to generate async functions:
 */
export const ASYNC_FUNCTION_TEMPLATE = `
import { APIResponse, AppError } from '@/types/ai'

export async function getUser(userId: string): Promise<APIResponse<User>> {
  try {
    // Validate input
    if (!userId || typeof userId !== 'string') {
      throw new AppError(
        'INVALID_INPUT',
        'User ID must be a non-empty string',
        400
      )
    }

    // Make request
    const response = await fetch(\`/api/users/\${userId}\`)

    // Handle non-2xx responses
    if (!response.ok) {
      const error = await response.json()
      throw new AppError(
        error.code || 'FETCH_ERROR',
        error.message || 'Failed to fetch user',
        response.status
      )
    }

    // Parse and validate
    const json = await response.json()
    if (!isUser(json)) {
      throw new AppError(
        'INVALID_RESPONSE',
        'Invalid user data from server',
        500
      )
    }

    return {
      success: true,
      data: json,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateId(),
      },
    }
  } catch (error) {
    // Always catch and format errors
    if (error instanceof AppError) {
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: generateId(),
        },
      }
    }

    throw error // Re-throw unknown errors
  }
}
`

/**
 * TEMPLATE 2: Safe React component with proper typing
 */
export const COMPONENT_TEMPLATE = `
import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AsyncState, User } from '@/types/ai'

interface UserProfileProps {
  userId: string
  onUserLoad?: (user: User) => void
}

export const UserProfile: FC<UserProfileProps> = ({
  userId,
  onUserLoad,
}) => {
  const [state, setState] = useState<AsyncState<User>>({ status: 'idle' })

  const loadUser = async () => {
    setState({ status: 'loading' })
    try {
      const response = await fetch(\`/api/users/\${userId}\`)
      if (!response.ok) throw new Error('Failed to load user')

      const data: User = await response.json()
      setState({ status: 'success', data })
      onUserLoad?.(data)
    } catch (error) {
      setState({
        status: 'error',
        error: error instanceof Error ? error : new Error('Unknown error'),
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state.status === 'loading' && <div>Loading...</div>}
        {state.status === 'success' && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Email</div>
            <div>{state.data.email}</div>
          </div>
        )}
        {state.status === 'error' && (
          <div className="text-destructive">{state.error.message}</div>
        )}
        <Button onClick={loadUser} disabled={state.status === 'loading'}>
          {state.status === 'loading' ? 'Loading...' : 'Load User'}
        </Button>
      </CardContent>
    </Card>
  )
}
`

/**
 * TEMPLATE 3: Form handling with validation
 */
export const FORM_TEMPLATE = `
import { FC, FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormState, AppError } from '@/types/ai'

interface CreateUserForm {
  email: string
  name: string
}

export const CreateUserForm: FC = () => {
  const [form, setForm] = useState<FormState<CreateUserForm>>({
    values: { email: '', name: '' },
    errors: {},
    touched: {},
    isSubmitting: false,
    isDirty: false,
  })

  const validate = (): Partial<Record<keyof CreateUserForm, string>> => {
    const errors: Partial<Record<keyof CreateUserForm, string>> = {}

    if (!form.values.email || !form.values.email.includes('@')) {
      errors.email = 'Valid email required'
    }

    if (!form.values.name || form.values.name.length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }

    return errors
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setForm((prev) => ({ ...prev, errors }))
      return
    }

    setForm((prev) => ({ ...prev, isSubmitting: true }))

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.values),
      })

      if (!response.ok) throw new Error('Failed to create user')

      // Success
      setForm({
        values: { email: '', name: '' },
        errors: {},
        touched: {},
        isSubmitting: false,
        isDirty: false,
      })
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          email: error instanceof Error ? error.message : 'Submit failed',
        },
      }))
    } finally {
      setForm((prev) => ({ ...prev, isSubmitting: false }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.values.email}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              values: { ...prev.values, email: e.target.value },
              isDirty: true,
            }))
          }
        />
        {form.errors.email && (
          <div className="text-sm text-destructive">{form.errors.email}</div>
        )}
      </div>

      <Button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  )
}
`
```

### 3. Type Guidelines for Prompts

When asking AI to generate code, include this:

```markdown
## Type Safety Rules

MUST follow these rules when generating code:

1. **Never use "any"** - Always define specific types
2. **Handle null/undefined** - Use optional chaining, nullish coalescing
3. **Define return types** - Every function must have explicit return type
4. **Validate inputs** - Check types before using values
5. **Use provided types** - Import from @/types/ai instead of defining your own
6. **Handle errors** - Wrap async operations in try-catch
7. **Props interface** - Every component must have typed props interface

Example of CORRECT:
```typescript
import { User, APIResponse, AppError } from '@/types/ai'

export async function fetchUser(id: string): Promise<APIResponse<User>> {
  if (!id) throw new AppError('INVALID_ID', 'ID required', 400)

  const response = await fetch(`/users/${id}`)
  if (!response.ok) throw new Error('Failed to fetch')

  const data = await response.json() as User
  return { success: true, data }
}
```

Example of WRONG:
```typescript
export async function fetchUser(id) {
  const response = await fetch(`/users/${id}`)
  const data = await response.json()
  return data
}
```
```

---

## Monitoring Dashboard

### Overview

Real-time visibility into:
- Cost per feature
- Error rates per function
- Generation success rates
- Slowest operations
- Top errors
- Cost trend

### 1. Dashboard Pages

```typescript
// app/(dashboard)/monitoring/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CostChart } from '@/components/monitoring/CostChart'
import { ErrorRateChart } from '@/components/monitoring/ErrorRateChart'
import { FeatureCosts } from '@/components/monitoring/FeatureCosts'
import { TopErrors } from '@/components/monitoring/TopErrors'

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Monitoring</h1>
        <p className="text-muted-foreground">
          Track cost, quality, and performance of AI-generated code
        </p>
      </div>

      {/* Cost metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.45</div>
            <p className="text-xs text-muted-foreground">
              +$2.10 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">
              2 errors in 110 calls
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">
              -0.3s from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>7-Day Cost Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <CostChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Rate by Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorRateChart />
          </CardContent>
        </Card>
      </div>

      {/* Feature breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost by Feature</CardTitle>
        </CardHeader>
        <CardContent>
          <FeatureCosts />
        </CardContent>
      </Card>

      {/* Recent errors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Errors</CardTitle>
        </CardHeader>
        <CardContent>
          <TopErrors />
        </CardContent>
      </Card>
    </div>
  )
}
```

### 2. Cost Analysis Page

```typescript
// app/(dashboard)/costs/page.tsx
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface FeatureCost {
  feature: string
  calls: number
  tokens: number
  cost: number
  avgCostPerCall: number
  lastUsed: string
}

export default function CostsPage() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>(
    'weekly'
  )

  // Mock data - replace with real API call
  const costs: FeatureCost[] = [
    {
      feature: 'generate-user-page',
      calls: 45,
      tokens: 125000,
      cost: 3.75,
      avgCostPerCall: 0.083,
      lastUsed: '2 min ago',
    },
    {
      feature: 'add-product-feature',
      calls: 23,
      tokens: 89000,
      cost: 2.67,
      avgCostPerCall: 0.116,
      lastUsed: '15 min ago',
    },
    {
      feature: 'fix-bug-component',
      calls: 12,
      tokens: 34000,
      cost: 1.02,
      avgCostPerCall: 0.085,
      lastUsed: '1 hour ago',
    },
  ]

  const totalCost = costs.reduce((sum, c) => sum + c.cost, 0)
  const totalCalls = costs.reduce((sum, c) => sum + c.calls, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cost Analysis</h1>
          <p className="text-muted-foreground">
            Break down of AI API spending by feature
          </p>
        </div>
        <div className="flex gap-2">
          {(['daily', 'weekly', 'monthly'] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              onClick={() => setPeriod(p)}
              className="capitalize"
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {period} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              {(totalCost / totalCalls).toFixed(4)} avg per call
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${costs[0].cost.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {costs[0].feature}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feature breakdown table */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead className="text-right">Calls</TableHead>
                <TableHead className="text-right">Tokens</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Avg/Call</TableHead>
                <TableHead>Last Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costs.map((cost) => (
                <TableRow key={cost.feature}>
                  <TableCell className="font-medium">{cost.feature}</TableCell>
                  <TableCell className="text-right">{cost.calls}</TableCell>
                  <TableCell className="text-right">
                    {(cost.tokens / 1000).toFixed(1)}k
                  </TableCell>
                  <TableCell className="text-right">
                    ${cost.cost.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${cost.avgCostPerCall.toFixed(3)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {cost.lastUsed}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## AI-Focused Testing

### Problem

AI generates functions without tests. Need utilities that make testing generated code easy.

### Solution: Testing Framework

```typescript
// lib/ai/testing.ts
import { expect } from 'vitest'
import { z } from 'zod'
import { AppError } from '@/types/ai'

/**
 * Testing utilities specifically for AI-generated code
 *
 * Usage:
 *   const test = new AITest()
 *   test.asyncFunction(myFunc)
 *     .shouldNotThrow()
 *     .shouldReturnType(userSchema)
 *     .shouldHandleNull()
 *     .verify()
 */
export class AITest<T> {
  private fn: (...args: any[]) => any
  private checks: (() => Promise<void>)[] = []

  constructor(fn: (...args: any[]) => any) {
    this.fn = fn
  }

  /**
   * Verify function is async
   */
  isAsync(): this {
    this.checks.push(async () => {
      expect(this.fn.constructor.name).toBe('AsyncFunction')
    })
    return this
  }

  /**
   * Verify function doesn't throw
   */
  shouldNotThrow(inputs: any[] = []): this {
    this.checks.push(async () => {
      try {
        await this.fn(...inputs)
      } catch (error) {
        expect.fail(`Function threw: ${error}`)
      }
    })
    return this
  }

  /**
   * Verify function returns correct type
   */
  shouldReturnType(
    schema: z.ZodSchema<T>,
    inputs: any[] = []
  ): this {
    this.checks.push(async () => {
      const result = await this.fn(...inputs)
      const parsed = schema.safeParse(result)

      if (!parsed.success) {
        expect.fail(
          `Return type mismatch: ${parsed.error.message}`
        )
      }
    })
    return this
  }

  /**
   * Verify function handles null inputs
   */
  shouldHandleNull(): this {
    this.checks.push(async () => {
      try {
        const result = await this.fn(null)
        expect(result).toBeDefined()
      } catch (error) {
        if (error instanceof AppError) {
          expect(error.code).toMatch(/INVALID|REQUIRED/)
        } else {
          expect.fail(`Function should handle null gracefully`)
        }
      }
    })
    return this
  }

  /**
   * Verify function handles undefined
   */
  shouldHandleUndefined(): this {
    this.checks.push(async () => {
      try {
        const result = await this.fn(undefined)
        expect(result).toBeDefined()
      } catch (error) {
        if (!(error instanceof AppError)) {
          expect.fail(`Function should handle undefined gracefully`)
        }
      }
    })
    return this
  }

  /**
   * Verify function handles empty string
   */
  shouldHandleEmpty(): this {
    this.checks.push(async () => {
      try {
        const result = await this.fn('')
        expect(result).toBeDefined()
      } catch (error) {
        if (!(error instanceof AppError)) {
          expect.fail(`Function should handle empty string gracefully`)
        }
      }
    })
    return this
  }

  /**
   * Verify error handling
   */
  shouldHandleErrors(): this {
    this.checks.push(async () => {
      try {
        await this.fn({ error: true })
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
    return this
  }

  /**
   * Verify performance
   */
  shouldCompleteInMs(maxMs: number, inputs: any[] = []): this {
    this.checks.push(async () => {
      const start = Date.now()
      await this.fn(...inputs)
      const duration = Date.now() - start

      expect(duration).toBeLessThan(maxMs)
    })
    return this
  }

  /**
   * Run all checks
   */
  async verify(): Promise<void> {
    for (const check of this.checks) {
      await check()
    }
  }
}

// Example usage:
/*
describe('generated getUserProfile function', () => {
  it('should handle all cases', async () => {
    await new AITest(getUserProfile)
      .isAsync()
      .shouldNotThrow(['user-123'])
      .shouldReturnType(userSchema, ['user-123'])
      .shouldHandleNull()
      .shouldHandleUndefined()
      .shouldHandleErrors()
      .shouldCompleteInMs(5000, ['user-123'])
      .verify()
  })
})
*/
```

---

## Prompt Templates & Context

### Master Context File (`.ai/CONTEXT.md` - Extended)

This replaces the design system context with a more complete one:

```markdown
# Framework for AI Developers - Master Context

> Copy this entire file into your AI conversation before asking for code.

## CRITICAL RULES

### Design System
- NEVER hardcode colors (no hex, no Tailwind colors)
- ALWAYS use design tokens: text-primary, bg-muted, etc.
- NEVER use arbitrary Tailwind values (p-[13px])
- ALWAYS use design scale: 4, 6, 8, 12, 16, 20, 24, 32
- NEVER create components when one exists
- ALWAYS import from @/components/ui/

### Type Safety
- NEVER use "any" type
- ALWAYS define function return types
- ALWAYS handle null/undefined with optional chaining (?.) or nullish coalescing (??)
- ALWAYS wrap async functions in try-catch
- ALWAYS validate inputs before using them
- ALWAYS import types from @/types/ai

### Code Quality
- ALWAYS use const/let, never var
- ALWAYS use async/await (no .then chains)
- ALWAYS handle errors explicitly
- NEVER use eval() or dynamic requires
- NEVER hardcode secrets or API keys
- ALWAYS validate API responses

## Components Available

[Include full component inventory from previous guide]

## Design Tokens

[Include design tokens from previous guide]

## Type Definitions

All responses must use these types from @/types/ai:

- APIResponse<T> - Standard API response wrapper
- AsyncState<T> - Async operation state (idle, loading, success, error)
- FormState<T> - Form state management
- PaginatedResponse<T> - Paginated responses
- AppError - Proper error type
- User - Standard user type

## Code Templates

When generating code, follow these exact patterns:

### Template 1: Async Function

[Include async function template]

### Template 2: React Component

[Include component template]

### Template 3: Form Handling

[Include form template]

## Cost Tracking

Always use the cost tracking:

```typescript
import { AICostTracker } from '@/lib/ai/cost'

const result = await tracker.trackClaudeCall({
  model: 'claude-3-5-sonnet-20241022',
  feature: 'your-feature-name',
  prompt: 'Your prompt here',
  fn: async (client) => {
    // Your Claude API call
  }
})
```

## Validation

Before submitting code, run:
- npm run ai:lint
- npm run ai:validate
- npm run ai:test

## Performance Budgets

- API responses: < 5 seconds
- Page loads: < 3 seconds
- Component renders: < 1 second
- Database queries: < 2 seconds

## Security

FORBIDDEN patterns:
- SQL injection: Template literals in queries
- XSS: Unescaped HTML in JSX
- Secrets: Hardcoded API keys, passwords
- Eval: Dynamic code execution
- CSRF: Missing CSRF tokens on forms

REQUIRED patterns:
- Input validation
- Error handling
- HTTPS only
- CORS properly configured
- Rate limiting on APIs
- SQL parameterization
```

### Feature Prompt Template

```markdown
# Prompt: Add New Feature to Next.js for AI Developers

[Copy master context from above first]

## Your Task

Add [feature description]

## Requirements

- [ ] Works without errors
- [ ] Follows all design system rules (no hardcoded colors, no arbitrary values)
- [ ] All functions have proper typing (no "any")
- [ ] Error handling implemented
- [ ] Cost tracking added
- [ ] Tests included

## File Locations

- Pages: /app/(dashboard)/[page-name]/page.tsx
- Components: /components/[feature-name]/
- Hooks: /hooks/use-[name].ts
- Types: /types/ai.ts (add new types here)
- APIs: /app/api/[route]/route.ts

## Testing

Generated functions must pass:
```typescript
await new AITest(yourFunction)
  .shouldNotThrow([testInputs])
  .shouldReturnType(schema)
  .shouldHandleNull()
  .shouldCompleteInMs(5000)
  .verify()
```

## Cost Tracking

Wrap API calls:
```typescript
const result = await tracker.trackClaudeCall({
  model: 'claude-3-5-sonnet-20241022',
  feature: '[feature-name]',
  prompt: 'Your prompt',
  fn: async (client) => { ... }
})
```

Now implement this feature following all rules.
```

---

## Integrations

### Pre-Configured Integrations

All integrations designed for AI to use correctly:

```typescript
// lib/integrations/stripe.ts
import Stripe from 'stripe'
import { trackAICost } from '@/lib/ai/cost'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

/**
 * Create subscription - AI can use this correctly
 */
export async function createSubscription({
  customerId,
  priceId,
}: {
  customerId: string
  priceId: string
}): Promise<Stripe.Subscription> {
  if (!customerId || !priceId) {
    throw new Error('customerId and priceId required')
  }

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    })

    return subscription
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      throw new Error(`Stripe error: ${error.message}`)
    }
    throw error
  }
}

/**
 * Get subscription - AI knows to handle errors
 */
export async function getSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription | null> {
  if (!subscriptionId) return null

  try {
    return await stripe.subscriptions.retrieve(subscriptionId)
  } catch (error) {
    if (
      error instanceof Stripe.errors.StripeError &&
      error.statusCode === 404
    ) {
      return null
    }
    throw error
  }
}

// Similar pattern for Supabase, OpenAI, Resend, etc.
```

---

## Deployment Safety

### Pre-Deploy Checks

```bash
#!/usr/bin/env bash

# scripts/pre-deploy.sh

echo "🔍 Running pre-deployment checks..."

# 1. Lint for design violations
npm run ai:lint || exit 1

# 2. Type check
npx tsc --noEmit || exit 1

# 3. Validate security
npm run ai:security-scan || exit 1

# 4. Run tests
npm test || exit 1

# 5. Check cost budget
npm run ai:cost-check || exit 1

echo "✅ All checks passed"
```

### Cost Budget

```typescript
// lib/ai/deployment.ts
import { AICostTracker } from './cost'

export async function checkDeploymentCost(
  maxDailyBudget: number = 100
): Promise<{ canDeploy: boolean; reason?: string }> {
  const tracker = new AICostTracker(store)
  const summary = await tracker.getCostSummary('daily')

  const todayCost = summary[0]?.total_cost || 0

  if (todayCost > maxDailyBudget) {
    return {
      canDeploy: false,
      reason: `Daily cost $${todayCost} exceeds budget $${maxDailyBudget}`,
    }
  }

  return { canDeploy: true }
}
```

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up boilerplate structure
- [ ] Implement cost tracking
- [ ] Add type definitions
- [ ] Create AI context files
- [ ] Set up dashboard scaffolding

### Phase 2: Validation (Weeks 3-4)
- [ ] Implement ESLint rules
- [ ] Build validation CLI
- [ ] Add security scanning
- [ ] Create testing utilities
- [ ] Build cost report generation

### Phase 3: Dashboard (Weeks 5-6)
- [ ] Implement cost charts
- [ ] Add error tracking
- [ ] Build feature breakdown table
- [ ] Create analytics pages
- [ ] Set up real-time updates

### Phase 4: Integrations (Weeks 7-8)
- [ ] Stripe integration
- [ ] Supabase integration
- [ ] OpenAI integration
- [ ] Resend email integration
- [ ] Documentation

### Phase 5: Polish (Weeks 9-10)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation
- [ ] Example apps
- [ ] Launch marketing

---

## Revenue Model

### Free Tier
- Boilerplate starter
- Design system guide
- Basic components
- Prompt templates
- `npm run ai:lint` tool

**Goal:** Get developers to use it, build habit

### Pro ($99/month)
- Monitoring dashboard
- Real-time cost tracking
- Advanced security scanning
- Priority support
- Integrations: Slack, Discord alerts
- Team collaboration
- Usage analytics

**Goal:** Pay from saved development time

### Enterprise (Custom)
- Self-hosted option
- Custom integrations
- Dedicated support
- White-label dashboard
- Volume discounts
- SLA guarantees

---

## Marketing & Positioning

### Landing Page Copy

**Headline:**
"Next.js for Developers Who Code with AI"

**Subheadline:**
"The framework where Claude, ChatGPT, and Cursor actually generate consistent, type-safe, cost-efficient code."

**Pain Points:**
- "Tired of fixing AI's hardcoded colors?"
- "No idea how much you're spending on API calls?"
- "Generated code breaks in production?"
- "Lost productivity fixing design inconsistencies?"

**Solution:**
"We built a framework specifically for AI-assisted development. Design system enforcement. Cost visibility. Code quality validation. Type safety."

### Key Features to Highlight

1. **AI-Native Design System** - AI actually follows your design rules
2. **Cost Tracking** - See exactly what each feature costs
3. **Type Safety** - No more runtime errors from AI code
4. **Automatic Validation** - Catch issues before commit
5. **Testing Built In** - Test AI-generated functions easily
6. **Monitoring Dashboard** - Real-time visibility

### Positioning Against Competitors

| | Fabrk | ShipFast | LaunchFast | Next.js | **This** |
|---|-------|----------|-----------|---------|----------|
| Components | ✓ | ✓ | ✓ | ✗ | ✓ |
| Auth/Payments | ✓ | ✓ | ✓ | ✗ | ✓ |
| AI-Native Design System | ✓ | ✗ | ✗ | ✗ | ✓✓ |
| Cost Tracking | ✗ | ✗ | ✗ | ✗ | ✓✓ |
| Code Validation | ✗ | ✗ | ✗ | ✗ | ✓✓ |
| Type Safety Utilities | ✗ | ✗ | ✗ | ✗ | ✓✓ |
| Monitoring Dashboard | ✗ | ✗ | ✗ | ✗ | ✓✓ |
| AI-Focused Testing | ✗ | ✗ | ✗ | ✗ | ✓✓ |

### Target Market

1. **Solo indie hackers** (like you) - shipping fast, multiple products
2. **Small dev teams** (2-5 people) - using Claude Code daily
3. **AI-native startups** - building exclusively with AI assistance
4. **Agencies** - selling AI-built code to clients

### Launch Strategy

1. **Open Source Foundation** - Release boilerplate + design system on GitHub
2. **Build In Public** - Share updates on Twitter/X, GitHub
3. **Creator Content** - Tutorials, guides, before/after videos
4. **Product Hunt** - Launch pro tier with "Now with monitoring"
5. **Community** - Discord/forum for users, creators
6. **Influencer Partners** - Reach out to Claude Code creators

---

## Final Notes

This isn't just a boilerplate. It's a **complete framework for AI development**:

- Design system that AI understands
- Cost awareness (invisible to developers until now)
- Type safety guarantees
- Quality validation
- Testing infrastructure
- Production monitoring

**The real value:** Developers can use Claude/ChatGPT/Cursor confidently, knowing:
- Code is on-brand (design system)
- Code is typed (no runtime errors)
- Code is tested (before production)
- They know the cost (before it surprises them)
- They can monitor it (if it breaks)

This solves a real problem for a growing market (developers using AI to code) with a product that has clear ROI (saved time, reduced bugs, cost transparency).

**Start with fabrk, add these features, and you have something nobody else is building.**
