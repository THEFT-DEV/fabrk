# AI Credit System Implementation Guide

> **Handoff Document**: If the session ends, another AI can continue from this document.

## Overview

Implementing a **Token/Credit Billing System** for the Fabrk boilerplate - the #1 most requested feature for AI SaaS boilerplates according to market research.

## Current Status

- [x] **Step 1**: Prisma Schema - COMPLETED
- [x] **Step 2**: Credit Library Files - COMPLETED
- [x] **Step 3**: API Routes - COMPLETED
- [x] **Step 4**: Dashboard Page - COMPLETED
- [x] **Step 5**: Components - COMPLETED
- [x] **Step 6**: AI Route Integration - COMPLETED

### Implementation Complete!

All credit system components have been implemented. To use:

1. Run `npx prisma db push` to apply schema changes
2. Visit `/usage` in the platform to see the usage dashboard
3. AI form generation now tracks credits for authenticated users

---

## Step 1: Prisma Schema

Add to `prisma/schema.prisma` after the existing models:

```prisma
// ===========================
// AI CREDITS SYSTEM
// ===========================

model CreditBalance {
  id               String   @id @default(cuid())
  userId           String   @unique
  balance          Int      @default(0)
  monthlyAllowance Int      @default(100) // Based on tier
  lastRefill       DateTime @default(now())
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  user         User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions CreditTransaction[]

  @@index([userId])
}

model CreditTransaction {
  id          String                @id @default(cuid())
  balanceId   String
  amount      Int                   // Positive = add, Negative = deduct
  type        CreditTransactionType
  description String?
  endpoint    String?               // Which AI endpoint was called
  metadata    Json?
  createdAt   DateTime              @default(now())

  balance CreditBalance @relation(fields: [balanceId], references: [id], onDelete: Cascade)

  @@index([balanceId])
  @@index([createdAt])
  @@index([type])
}

enum CreditTransactionType {
  SUBSCRIPTION_REFILL
  PURCHASE
  USAGE
  REFUND
  BONUS
}
```

Also update the User model to add the relation:

```prisma
model User {
  // ... existing fields ...
  creditBalance CreditBalance?
}
```

After adding, run:
```bash
npx prisma generate
npx prisma db push
```

---

## Step 2: Credit Library Files

### `src/lib/credits/index.ts`

```typescript
export * from "./balance";
export * from "./transactions";
export * from "./pricing";
export * from "./refill";
```

### `src/lib/credits/pricing.ts`

```typescript
/**
 * Credit costs per AI feature
 */
export const CREDIT_COSTS = {
  FORM_GENERATION: 10,
  CHAT_MESSAGE: 1,
  CODE_GENERATION: 20,
  IMAGE_GENERATION: 50,
} as const;

/**
 * Monthly allowances by subscription tier
 */
export const TIER_ALLOWANCES = {
  free: 100,
  starter: 1000,
  pro: 10000,
  enterprise: Infinity,
} as const;

export type CreditCostKey = keyof typeof CREDIT_COSTS;
export type SubscriptionTier = keyof typeof TIER_ALLOWANCES;
```

### `src/lib/credits/balance.ts`

```typescript
import { prisma } from "@/lib/prisma";
import { TIER_ALLOWANCES, type SubscriptionTier } from "./pricing";

/**
 * Get or create a user's credit balance
 */
export async function getOrCreateBalance(userId: string) {
  let balance = await prisma.creditBalance.findUnique({
    where: { userId },
    include: { user: { select: { tier: true } } },
  });

  if (!balance) {
    // Get user's tier for initial allowance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { tier: true },
    });

    const tier = (user?.tier || "free") as SubscriptionTier;
    const allowance = TIER_ALLOWANCES[tier] === Infinity ? 999999 : TIER_ALLOWANCES[tier];

    balance = await prisma.creditBalance.create({
      data: {
        userId,
        balance: allowance,
        monthlyAllowance: allowance,
      },
      include: { user: { select: { tier: true } } },
    });
  }

  return balance;
}

/**
 * Check if user has enough credits
 */
export async function hasCredits(userId: string, amount: number): Promise<boolean> {
  const balance = await getOrCreateBalance(userId);
  return balance.balance >= amount;
}

/**
 * Get current balance
 */
export async function getBalance(userId: string): Promise<number> {
  const balance = await getOrCreateBalance(userId);
  return balance.balance;
}

/**
 * Deduct credits from user balance
 */
export async function deductCredits(
  userId: string,
  amount: number,
  options: {
    description?: string;
    endpoint?: string;
    metadata?: Record<string, unknown>;
  } = {}
): Promise<{ success: boolean; newBalance: number; error?: string }> {
  const balance = await getOrCreateBalance(userId);

  if (balance.balance < amount) {
    return {
      success: false,
      newBalance: balance.balance,
      error: "Insufficient credits",
    };
  }

  const updated = await prisma.creditBalance.update({
    where: { id: balance.id },
    data: {
      balance: { decrement: amount },
      transactions: {
        create: {
          amount: -amount,
          type: "USAGE",
          description: options.description,
          endpoint: options.endpoint,
          metadata: options.metadata,
        },
      },
    },
  });

  return {
    success: true,
    newBalance: updated.balance,
  };
}

/**
 * Add credits to user balance
 */
export async function addCredits(
  userId: string,
  amount: number,
  type: "SUBSCRIPTION_REFILL" | "PURCHASE" | "REFUND" | "BONUS",
  description?: string
): Promise<{ success: boolean; newBalance: number }> {
  const balance = await getOrCreateBalance(userId);

  const updated = await prisma.creditBalance.update({
    where: { id: balance.id },
    data: {
      balance: { increment: amount },
      transactions: {
        create: {
          amount,
          type,
          description,
        },
      },
    },
  });

  return {
    success: true,
    newBalance: updated.balance,
  };
}
```

### `src/lib/credits/transactions.ts`

```typescript
import { prisma } from "@/lib/prisma";
import { getOrCreateBalance } from "./balance";

export interface TransactionFilters {
  type?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * Get transaction history for a user
 */
export async function getTransactionHistory(userId: string, filters: TransactionFilters = {}) {
  const balance = await getOrCreateBalance(userId);

  const where: Record<string, unknown> = { balanceId: balance.id };

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) {
      (where.createdAt as Record<string, Date>).gte = filters.startDate;
    }
    if (filters.endDate) {
      (where.createdAt as Record<string, Date>).lte = filters.endDate;
    }
  }

  const transactions = await prisma.creditTransaction.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: filters.limit || 50,
    skip: filters.offset || 0,
  });

  return transactions;
}

/**
 * Get usage stats for the last N days
 */
export async function getUsageStats(userId: string, days: number = 30) {
  const balance = await getOrCreateBalance(userId);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const transactions = await prisma.creditTransaction.findMany({
    where: {
      balanceId: balance.id,
      type: "USAGE",
      createdAt: { gte: startDate },
    },
    orderBy: { createdAt: "asc" },
  });

  // Group by day
  const dailyUsage: Record<string, number> = {};
  transactions.forEach((tx) => {
    const day = tx.createdAt.toISOString().split("T")[0];
    dailyUsage[day] = (dailyUsage[day] || 0) + Math.abs(tx.amount);
  });

  // Fill in missing days with 0
  const result: { date: string; credits: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    result.push({
      date: dateStr,
      credits: dailyUsage[dateStr] || 0,
    });
  }

  return result;
}
```

### `src/lib/credits/refill.ts`

```typescript
import { prisma } from "@/lib/prisma";
import { TIER_ALLOWANCES, type SubscriptionTier } from "./pricing";

/**
 * Check if user is eligible for monthly refill
 */
export function isEligibleForRefill(lastRefill: Date): boolean {
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  return lastRefill <= oneMonthAgo;
}

/**
 * Refill a user's credits if eligible
 */
export async function refillCreditsIfEligible(userId: string): Promise<boolean> {
  const balance = await prisma.creditBalance.findUnique({
    where: { userId },
    include: { user: { select: { tier: true } } },
  });

  if (!balance) return false;

  if (!isEligibleForRefill(balance.lastRefill)) {
    return false;
  }

  const tier = (balance.user.tier || "free") as SubscriptionTier;
  const allowance = TIER_ALLOWANCES[tier] === Infinity ? 999999 : TIER_ALLOWANCES[tier];

  await prisma.creditBalance.update({
    where: { id: balance.id },
    data: {
      balance: allowance,
      monthlyAllowance: allowance,
      lastRefill: new Date(),
      transactions: {
        create: {
          amount: allowance,
          type: "SUBSCRIPTION_REFILL",
          description: `Monthly refill for ${tier} tier`,
        },
      },
    },
  });

  return true;
}
```

---

## Step 3: API Routes

### `src/app/api/credits/balance/route.ts`

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getOrCreateBalance, getBalance } from "@/lib/credits";
import { refillCreditsIfEligible } from "@/lib/credits/refill";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check for monthly refill
    await refillCreditsIfEligible(session.user.id);

    const balanceRecord = await getOrCreateBalance(session.user.id);
    const balance = await getBalance(session.user.id);

    return NextResponse.json({
      balance,
      monthlyAllowance: balanceRecord.monthlyAllowance,
      lastRefill: balanceRecord.lastRefill,
    });
  } catch (error) {
    console.error("Error fetching credit balance:", error);
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: 500 });
  }
}
```

### `src/app/api/credits/history/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getTransactionHistory, getUsageStats } from "@/lib/credits";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const includeStats = searchParams.get("stats") === "true";

    const transactions = await getTransactionHistory(session.user.id, {
      type,
      limit,
      offset,
    });

    const response: {
      transactions: typeof transactions;
      stats?: Awaited<ReturnType<typeof getUsageStats>>;
    } = { transactions };

    if (includeStats) {
      response.stats = await getUsageStats(session.user.id, 30);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
```

---

## Step 4: Dashboard Page

### `src/app/(dashboard)/usage/page.tsx`

Create a terminal-styled usage dashboard with:
- Current balance display (large number)
- Usage chart (last 30 days) using the existing chart components or a simple bar chart
- Transaction history table
- Credit tier info

Follow the terminal design system:
- `mode.font`, `mode.radius` from `@/design-system`
- `[SECTION_TITLE]` format for headers
- Terminal color tokens only

---

## Step 5: Components

### `src/components/credits/balance-display.tsx`

A compact component showing current credits, to be placed in the dashboard sidebar or header.

### `src/components/credits/usage-chart.tsx`

A bar chart showing daily credit usage over 30 days.

### `src/components/credits/transaction-table.tsx`

A table listing recent transactions with type, amount, description, and date.

---

## Step 6: AI Route Integration

Update `src/app/api/ai/generate-form/route.ts`:

```typescript
import { hasCredits, deductCredits, CREDIT_COSTS } from "@/lib/credits";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check credits before calling AI
  const cost = CREDIT_COSTS.FORM_GENERATION;
  if (!(await hasCredits(session.user.id, cost))) {
    return NextResponse.json(
      { error: "Insufficient credits", code: "INSUFFICIENT_CREDITS" },
      { status: 402 }
    );
  }

  // ... existing AI generation logic ...

  // Deduct credits after successful generation
  await deductCredits(session.user.id, cost, {
    description: "Form generation",
    endpoint: "/api/ai/generate-form",
  });

  return NextResponse.json(result);
}
```

---

## Credit Pricing Reference

| Feature | Credits |
|---------|---------|
| Form Generation | 10 |
| Chat Message (future) | 1 |
| Code Generation (future) | 20 |
| Image Generation (future) | 50 |

| Tier | Monthly Allowance |
|------|-------------------|
| Free | 100 |
| Starter | 1,000 |
| Pro | 10,000 |
| Enterprise | Unlimited |

---

## Testing Checklist

- [ ] User gets initial credits based on tier when first accessing AI features
- [ ] Credits are deducted after successful AI generation
- [ ] 402 error returned when credits exhausted
- [ ] Balance API returns correct balance
- [ ] History API returns transaction list
- [ ] Usage stats correctly aggregated by day
- [ ] Monthly refill works when eligible
- [ ] Dashboard displays balance and history correctly

---

## Files Summary

### New Files to Create
1. `src/lib/credits/index.ts`
2. `src/lib/credits/balance.ts`
3. `src/lib/credits/transactions.ts`
4. `src/lib/credits/pricing.ts`
5. `src/lib/credits/refill.ts`
6. `src/app/api/credits/balance/route.ts`
7. `src/app/api/credits/history/route.ts`
8. `src/app/(dashboard)/usage/page.tsx`
9. `src/components/credits/balance-display.tsx`
10. `src/components/credits/usage-chart.tsx`
11. `src/components/credits/transaction-table.tsx`

### Files to Modify
1. `prisma/schema.prisma` - Add CreditBalance, CreditTransaction models
2. `src/app/api/ai/generate-form/route.ts` - Add credit check/deduction
