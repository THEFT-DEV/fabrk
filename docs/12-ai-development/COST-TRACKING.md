# Cost Tracking Guide

Monitor and control AI API spending with built-in cost tracking.

---

## Overview

The cost tracking system provides:
- Real-time API cost monitoring
- Per-feature cost breakdown
- Daily/weekly/monthly budgets
- Budget alerts and thresholds
- Success rate tracking

---

## Quick Start

### 1. View Today's Costs

```bash
npm run ai:cost-report
```

### 2. Use Cost Widget in UI

```tsx
import { CostBadge, CostWidget } from '@/components/ai/cost-widget';

// Compact badge for headers
<CostBadge />

// Full widget for dashboards
<CostWidget showFeatures />
```

### 3. Track Costs in Code

```typescript
import { trackAICost } from '@/lib/ai/cost';

const result = await trackAICost({
  feature: 'generate-summary',
  model: 'claude-3-5-sonnet-20241022',
  fn: async () => {
    // Your AI API call
    return await anthropic.messages.create({...});
  }
});
```

---

## Cost Tracking Hook

### Basic Usage

```tsx
import { useCostTracking } from '@/hooks/use-cost-tracking';

function DashboardWidget() {
  const {
    todaysCost,
    budget,
    percentUsed,
    withinBudget,
    remaining,
    featureCosts,
    isLoading,
    error,
  } = useCostTracking();

  return (
    <div>
      <p>Today: ${todaysCost.toFixed(2)}</p>
      <p>Budget: ${budget.toFixed(2)}</p>
      <p>Remaining: ${remaining.toFixed(2)}</p>
    </div>
  );
}
```

### With Custom Options

```tsx
const costs = useCostTracking({
  autoRefresh: true,        // Auto-refresh data (default: true)
  refreshInterval: 60000,   // Refresh every 60s (default: 30s)
});
```

---

## Budget Hook

For simple budget status:

```tsx
import { useCostBudget } from '@/hooks/use-cost-tracking';

function BudgetIndicator() {
  const { percentUsed, status, isLoading } = useCostBudget();

  // status: 'normal' | 'warning' | 'danger'
  return (
    <Badge variant={status === 'danger' ? 'destructive' : 'secondary'}>
      {percentUsed.toFixed(0)}% used
    </Badge>
  );
}
```

---

## Pre-built Components

### CostBadge

Compact badge for headers/navigation:

```tsx
import { CostBadge } from '@/components/ai/cost-widget';

<nav>
  <CostBadge />
  <CostBadge showWarning={false} />  // No color changes
</nav>
```

### CostWidget

Full dashboard widget:

```tsx
import { CostWidget } from '@/components/ai/cost-widget';

<CostWidget />                    // Basic
<CostWidget showFeatures />       // With feature breakdown
```

### InlineCost

Simple inline display:

```tsx
import { InlineCost } from '@/components/ai/cost-widget';

<p>Today's cost: <InlineCost /></p>
<p>Cost: <InlineCost showIcon={false} /></p>
```

### BudgetAlert

Shows alert when approaching/exceeding budget:

```tsx
import { BudgetAlert } from '@/components/ai/cost-widget';

<BudgetAlert />                   // Shows at 70% (default)
<BudgetAlert threshold={80} />    // Shows at 80%
```

---

## Tracking Costs in API Routes

### Basic Tracking

```typescript
// app/api/ai/summarize/route.ts
import { trackAICost } from '@/lib/ai/cost';

export async function POST(request: Request) {
  const { text } = await request.json();

  const result = await trackAICost({
    feature: 'summarize-text',
    model: 'claude-3-5-sonnet-20241022',
    userId: session?.user?.id,
    metadata: { textLength: text.length },
    fn: async (client) => {
      return client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        messages: [{ role: 'user', content: `Summarize: ${text}` }],
      });
    }
  });

  return Response.json({ summary: result });
}
```

### With Budget Check

```typescript
import { checkBudget, trackAICost } from '@/lib/ai/cost';

export async function POST(request: Request) {
  // Check budget before expensive operation
  const budgetStatus = await checkBudget();

  if (!budgetStatus.withinBudget) {
    return Response.json(
      { error: 'Daily AI budget exceeded' },
      { status: 429 }
    );
  }

  // Proceed with AI call
  const result = await trackAICost({...});
}
```

---

## Cost Report CLI

### Generate Report

```bash
npm run ai:cost-report
```

### Output Example

```
AI Cost Report - Last 7 Days
═══════════════════════════════════════

Daily Breakdown
───────────────────────────────────────
  Mon 62/62: $12.45 (145 calls) ████████████
  Tue 62/62: $8.32  (98 calls)  ████████
  Wed 62/62: $15.67 (189 calls) ████████████████
  Thu 62/62: $9.21  (112 calls) █████████
  Fri 62/62: $11.89 (134 calls) ████████████
  Sat 62/62: $3.45  (42 calls)  ███
  Sun 62/62: $2.10  (25 calls)  ██

Total: $63.09
Average: $9.01/day

Top Features by Cost
───────────────────────────────────────
  1. generate-user-page    $18.45 (29%) ██████████
  2. ai-chat-completion    $15.32 (24%) ████████
  3. code-review           $12.89 (20%) ███████
  4. summarize-document    $9.43  (15%) █████
  5. other                 $7.00  (12%) ████

Performance
───────────────────────────────────────
  Total Requests: 745
  Success Rate: 98.2%
  Avg Response Time: 1.2s
  Avg Cost/Request: $0.085
```

---

## Database Schema

Cost tracking uses the `AICostEvent` table:

```sql
CREATE TABLE ai_cost_events (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  model TEXT NOT NULL,
  feature TEXT NOT NULL,
  prompt_tokens INTEGER NOT NULL,
  completion_tokens INTEGER NOT NULL,
  cost_usd DECIMAL(10,6) NOT NULL,
  success BOOLEAN NOT NULL,
  error_message TEXT,
  duration_ms INTEGER,
  user_id TEXT,
  metadata JSONB
);

CREATE INDEX idx_cost_feature ON ai_cost_events(feature);
CREATE INDEX idx_cost_created ON ai_cost_events(created_at);
CREATE INDEX idx_cost_user ON ai_cost_events(user_id);
```

---

## Model Pricing

Current pricing (update as rates change):

| Model | Input (per 1K) | Output (per 1K) |
|-------|----------------|-----------------|
| claude-3-5-sonnet | $0.003 | $0.015 |
| claude-3-opus | $0.015 | $0.075 |
| gpt-4o | $0.005 | $0.015 |
| gpt-4 | $0.030 | $0.060 |

Update pricing in `src/lib/ai/cost.ts`:

```typescript
const PRICING = {
  'claude-3-5-sonnet-20241022': {
    input: 0.003 / 1000,
    output: 0.015 / 1000,
  },
  // Add new models here
};
```

---

## Budget Configuration

### Set Daily Budget

In your environment:

```env
AI_DAILY_BUDGET=50.00
```

Or in code:

```typescript
const budgetStatus = await checkBudget({
  dailyBudget: 50.00,
});
```

### Budget Alerts

Configure alert thresholds:

```typescript
// Show warning at 70%, danger at 90%
<CostWidget
  warningThreshold={70}
  dangerThreshold={90}
/>
```

---

## Admin Dashboard

Access the cost dashboard at:

```
/admin/ai-costs
```

Features:
- Real-time cost display
- 7-day cost chart
- Feature breakdown table
- Budget status indicator
- Export to CSV

---

## Best Practices

### 1. Always Track Expensive Operations

```typescript
// Good - tracked
await trackAICost({ feature: 'generate-report', ... });

// Bad - untracked
await anthropic.messages.create({...});
```

### 2. Use Meaningful Feature Names

```typescript
// Good - specific
feature: 'user-profile-summary'
feature: 'code-review-pr-123'

// Bad - generic
feature: 'ai-call'
feature: 'misc'
```

### 3. Include User Context

```typescript
await trackAICost({
  feature: 'chat-response',
  userId: session.user.id,  // Track by user
  metadata: {
    conversationId: '...',
    messageCount: 5,
  }
});
```

### 4. Check Budget Before Expensive Operations

```typescript
const budget = await checkBudget();
if (budget.percentUsed > 80) {
  // Use cheaper model or cache
}
```

---

## Troubleshooting

### Costs Not Showing

1. Verify database connection
2. Check `ai_cost_events` table exists
3. Ensure `trackAICost` is being called

### Incorrect Costs

1. Verify model name matches pricing table
2. Check token counts are being captured
3. Review pricing configuration

### Budget Alerts Not Working

1. Check `AI_DAILY_BUDGET` environment variable
2. Verify `useCostBudget` hook is connected
3. Check component rendering conditions
