import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import { Coins, Activity, TrendingDown, Calendar, Zap, Shield } from 'lucide-react';

export const metadata = {
  title: 'AI Credits System - Fabrk Docs',
  description:
    'Token-based billing for AI features. Track usage, manage balances, and implement tiered pricing for AI operations.',
};

export default function AICreditsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Features"
      title="AI Credits"
      description="Token-based billing system for AI features."
      overview="The AI Credits system lets you monetize AI features with a token-based model. Users get a monthly credit allowance based on their subscription tier. Each AI operation (form generation, chat, code generation) costs a set number of credits. The system tracks usage, handles refills, and blocks operations when credits run out - all automatically."
      features={[
        {
          icon: Coins,
          title: 'Credit Balance',
          description:
            'Track user credits in real-time. Automatic balance updates after each AI operation.',
        },
        {
          icon: Activity,
          title: 'Usage Tracking',
          description: 'Full transaction history with daily/monthly analytics and usage charts.',
        },
        {
          icon: TrendingDown,
          title: 'Cost Per Feature',
          description:
            'Different credit costs for different AI operations. Form gen: 10, Chat: 1, Code: 20.',
        },
        {
          icon: Calendar,
          title: 'Monthly Refills',
          description: 'Automatic monthly credit refresh based on subscription tier.',
        },
        {
          icon: Zap,
          title: 'Tiered Allowances',
          description: 'Free: 100, Starter: 1,000, Pro: 10,000, Enterprise: Unlimited.',
        },
        {
          icon: Shield,
          title: 'Insufficient Credit Handling',
          description: 'Graceful 402 errors when credits run out. User-friendly messaging.',
        },
      ]}
      setup={[
        {
          title: 'Run Database Migration',
          description:
            'The schema includes CreditBalance and CreditTransaction models. Push the schema to your database.',
          code: `npx prisma db push`,
          language: 'bash',
        },
        {
          title: 'Configure Credit Costs',
          description: 'Adjust credit costs per AI feature in src/lib/credits/pricing.ts',
          code: `// src/lib/credits/pricing.ts
export const CREDIT_COSTS = {
  FORM_GENERATION: 10,
  CHAT_MESSAGE: 1,
  CODE_GENERATION: 20,
  IMAGE_GENERATION: 50,
} as const;`,
          language: 'typescript',
        },
        {
          title: 'Configure Tier Allowances',
          description: 'Set monthly credit allowances per subscription level',
          code: `// src/lib/credits/pricing.ts
export const TIER_ALLOWANCES = {
  free: 100,
  starter: 1000,
  pro: 10000,
  enterprise: Infinity,
} as const;`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Check Credits Before AI Call',
          description: 'Always verify the user has enough credits before calling the AI',
          code: `import { hasCredits, CREDIT_COSTS } from "@/lib/credits";

const creditCost = CREDIT_COSTS.FORM_GENERATION;

const hasEnoughCredits = await hasCredits(userId, creditCost);
if (!hasEnoughCredits) {
  return NextResponse.json(
    { error: "Insufficient credits", code: "INSUFFICIENT CREDITS" },
    { status: 402 }
  );
}`,
          language: 'typescript',
        },
        {
          title: 'Deduct Credits After Success',
          description: 'Only deduct credits after the AI operation succeeds',
          code: `import { deductCredits, CREDIT_COSTS } from "@/lib/credits";

// After successful AI operation...
await deductCredits(userId, CREDIT_COSTS.FORM_GENERATION, {
  description: "Form generation",
  endpoint: "/api/ai/generate-form",
  metadata: { prompt: prompt.slice(0, 100) },
});`,
          language: 'typescript',
        },
        {
          title: 'Get Current Balance',
          description: "Fetch the user's current credit balance",
          code: `import { getBalance, getOrCreateBalance } from "@/lib/credits";

// Simple balance check
const balance = await getBalance(userId);

// Or get full balance object (creates if doesn't exist)
const balanceRecord = await getOrCreateBalance(userId);
// balanceRecord.balance, balanceRecord.monthlyAllowance`,
          language: 'typescript',
        },
        {
          title: 'Add Credits (Purchase/Bonus)',
          description: 'Add credits from purchases, referrals, or bonuses',
          code: `import { addCredits } from "@/lib/credits";
import { CreditTransactionType } from "@/generated/prisma/client";

// After successful purchase
await addCredits(
  userId,
  500, // amount
  CreditTransactionType.PURCHASE,
  "Purchased 500 credit pack"
);

// Bonus credits
await addCredits(
  userId,
  50,
  CreditTransactionType.BONUS,
  "Referral bonus"
);`,
          language: 'typescript',
        },
      ]}
      configuration={[
        {
          name: 'FORM GENERATION',
          type: 'number',
          default: '10',
          description: 'Credits per form generation',
        },
        {
          name: 'CHAT MESSAGE',
          type: 'number',
          default: '1',
          description: 'Credits per chat message',
        },
        {
          name: 'CODE GENERATION',
          type: 'number',
          default: '20',
          description: 'Credits per code generation',
        },
        {
          name: 'IMAGE GENERATION',
          type: 'number',
          default: '50',
          description: 'Credits per image generation',
        },
      ]}
      troubleshooting={[
        {
          problem: '402 Insufficient Credits Error',
          solution:
            'User has run out of credits. Direct them to the /usage page to see their balance, or upgrade their plan for more credits.',
        },
        {
          problem: 'Balance not updating after purchase',
          solution:
            "Ensure you're calling addCredits() with CreditTransactionType.PURCHASE after successful payment webhook.",
        },
        {
          problem: 'Credits not refilling monthly',
          solution:
            'The refillCreditsIfEligible() function checks lastRefill date. Call it on user login or via a cron job.',
        },
      ]}
      previous={{ title: 'Payments', href: '/docs/features/payments' }}
      next={{ title: 'Google OAuth', href: '/docs/features/google-oauth' }}
    >
      {/* Database Schema */}
      <DocsSection title="Database Schema">
        <DocsCard title="PRISMA SCHEMA">
          <p className="mb-6">
            The credit system uses two Prisma models: CreditBalance (one per user) and
            CreditTransaction (history of all credit changes).
          </p>
          <pre className="bg-muted overflow-x-auto p-4 text-xs">
            {`model CreditBalance {
  id               String   @id @default(cuid())
  userId           String   @unique
  balance          Int      @default(0)
  monthlyAllowance Int      @default(100)
  lastRefill       DateTime @default(now())

  user         User                @relation(...)
  transactions CreditTransaction[]
}

model CreditTransaction {
  id          String                @id @default(cuid())
  balanceId   String
  amount      Int      // Positive = add, Negative = deduct
  type        CreditTransactionType
  description String?
  endpoint    String?
  metadata    Json?
  createdAt   DateTime @default(now())
}

enum CreditTransactionType {
  SUBSCRIPTION_REFILL
  PURCHASE
  USAGE
  REFUND
  BONUS
}`}
          </pre>
        </DocsCard>
      </DocsSection>

      {/* API Routes */}
      <DocsSection title="API Routes">
        <DocsCard title="AVAILABLE ENDPOINTS">
          <div className="space-y-4">
            <div className="border-border border-b pb-4">
              <code className="bg-muted px-2 py-1">GET /api/credits/balance</code>
              <p className="text-muted-foreground mt-2">
                Returns current balance, monthly allowance, and tier for the authenticated user.
              </p>
            </div>
            <div>
              <code className="bg-muted px-2 py-1">GET /api/credits/history</code>
              <p className="text-muted-foreground mt-2">
                Returns transaction history with optional type and date filters.
              </p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Usage Dashboard */}
      <DocsSection title="Usage Dashboard">
        <DocsCallout variant="info" title="Built-in Dashboard">
          The /usage page is pre-built with balance display, usage charts, and transaction history.
          Users can see their credit consumption at a glance.
        </DocsCallout>
        <DocsCard title="DASHBOARD FEATURES">
          <ul className="space-y-2">
            <li>Current balance with progress bar</li>
            <li>30-day usage chart showing daily consumption</li>
            <li>Subscription tier and monthly allowance</li>
            <li>Days until next credit refill</li>
            <li>Recent transaction history table</li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Integration Example */}
      <DocsSection title="Full Integration Example">
        <DocsCard title="AI ROUTE PATTERN">
          <p className="mb-6">
            Here&apos;s the complete pattern for integrating credits into an AI route:
          </p>
          <pre className="bg-muted overflow-x-auto p-4 text-xs">
            {`// src/app/api/ai/your-feature/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { hasCredits, deductCredits, CREDIT_COSTS } from "@/lib/credits";

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  // 1. Check credits (if authenticated)
  const creditCost = CREDIT_COSTS.CODE_GENERATION;
  if (userId) {
    const hasEnough = await hasCredits(userId, creditCost);
    if (!hasEnough) {
      return NextResponse.json(
        { error: "Insufficient credits", code: "INSUFFICIENT CREDITS" },
        { status: 402 }
      );
    }
  }

  // 2. Do the AI operation
  const result = await callYourAIService();

  // 3. Deduct credits on success
  if (userId) {
    await deductCredits(userId, creditCost, {
      description: "Code generation",
      endpoint: "/api/ai/your-feature",
    });
  }

  return NextResponse.json(result);
}`}
          </pre>
        </DocsCard>
      </DocsSection>

      {/* UI Components */}
      <DocsSection title="UI Components">
        <DocsCallout variant="info" title="Pre-Built Components">
          Five production-ready components for displaying credits, usage, and billing. All integrate
          with the credit APIs automatically.
        </DocsCallout>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/docs/components/balance-display">
            <DocsCard title="BALANCE" className="h-full transition-all">
              <p className="text-muted-foreground text-sm">
                Current credit balance with color-coded progress bar. Auto-fetches from API.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/components/usage-meter">
            <DocsCard title="METER" className="h-full transition-all">
              <p className="text-muted-foreground text-sm">
                Progress bar for resource usage. Warnings at 75%/90% thresholds.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/components/plan-selector">
            <DocsCard title="PLANS" className="h-full transition-all">
              <p className="text-muted-foreground text-sm">
                Pricing cards for upgrade flows. Popular badge and current plan indicator.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/components/credit-usage-chart">
            <DocsCard title="CHART" className="h-full transition-all">
              <p className="text-muted-foreground text-sm">
                14-day bar chart of daily consumption. Hover tooltips show exact values.
              </p>
            </DocsCard>
          </Link>

          <Link href="/docs/components/credit-transaction-table">
            <DocsCard title="HISTORY" className="h-full transition-all">
              <p className="text-muted-foreground text-sm">
                Complete transaction history with type icons, amounts, and timestamps.
              </p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/payments">
            <DocsCard
              title="STRIPE INTEGRATION"
              className="h-full transition-all"
            >
              Stripe Payments
              <p className="mb-6">Sell credit packs or subscriptions with different allowances.</p>
            </DocsCard>
          </Link>
          <Link href="/docs/features/analytics">
            <DocsCard
              title="USAGE ANALYTICS"
              className="h-full transition-all"
            >
              Analytics
              <p className="mb-6">Track which AI features users consume most.</p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
