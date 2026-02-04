import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';

export const metadata = {
  title: 'Cost Tracking - AI Development | Fabrk Docs',
  description: 'Monitor and control AI API spending with built-in cost tracking.',
};

export default function CostTrackingPage() {
  return (
    <FeatureGuideTemplate
      code="[0xCOST]"
      category="AI Development"
      title="Cost Tracking"
      description="Monitor and control AI API spending with built-in cost tracking."
      overview="Track AI API costs in real-time. Set daily budgets, get alerts when approaching limits, and see per-feature cost breakdowns. Never be surprised by API bills again."
      setup={[
        {
          title: 'View Cost Report',
          description: 'Generate a cost analysis report.',
          code: `npm run ai:cost-report

# Output:
# Daily Breakdown
#   Mon: $12.45 (145 calls)
#   Tue: $8.32 (98 calls)
#   ...
# Total: $63.09
# Top Features by Cost: ...`,
          language: 'bash',
        },
        {
          title: 'Set Daily Budget',
          description: 'Configure your spending limit.',
          code: `# .env.local
AI_DAILY_BUDGET=50.00`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Cost Tracking Hook',
          description: 'Display costs in your UI.',
          code: `import { useCostTracking } from '@/hooks/use-cost-tracking';

function CostDisplay() {
  const {
    todaysCost,
    budget,
    percentUsed,
    withinBudget,
    remaining,
    featureCosts,
    isLoading,
  } = useCostTracking();

  return (
    <div>
      <p>Today: \${todaysCost.toFixed(2)}</p>
      <p>Budget: \${budget.toFixed(2)}</p>
      <p>Remaining: \${remaining.toFixed(2)}</p>
      <Progress value={percentUsed} />
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Cost Widget Components',
          description: 'Pre-built components for displaying costs.',
          code: `import {
  CostBadge,
  CostWidget,
  InlineCost,
  BudgetAlert
} from '@/components/ai/cost-widget';

// Compact badge for headers
<CostBadge />

// Full dashboard widget
<CostWidget showFeatures />

// Inline cost display
<p>Today's cost: <InlineCost /></p>

// Alert when approaching budget
<BudgetAlert threshold={80} />`,
          language: 'tsx',
        },
        {
          title: 'Track API Calls',
          description: 'Wrap AI API calls with cost tracking.',
          code: `import { trackAICost } from '@/lib/ai/cost';

const result = await trackAICost({
  feature: 'generate-summary',
  model: 'claude-3-5-sonnet-20241022',
  userId: session?.user?.id,
  metadata: { textLength: text.length },
  fn: async (client) => {
    return client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      messages: [{ role: 'user', content: prompt }],
    });
  }
});`,
          language: 'typescript',
        },
        {
          title: 'Check Budget Before Expensive Operations',
          description: 'Prevent overspending.',
          code: `import { checkBudget, trackAICost } from '@/lib/ai/cost';

export async function POST(request: Request) {
  const budgetStatus = await checkBudget();

  if (!budgetStatus.withinBudget) {
    return Response.json(
      { error: 'Daily AI budget exceeded' },
      { status: 429 }
    );
  }

  // Proceed with AI call
  const result = await trackAICost({...});
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Validation', href: '/docs/guides/ai-development/validation' }}
      next={{ title: 'Design System', href: '/docs/guides/ai-development/design-system' }}
    >
      <DocsSection title="Model Pricing">
        <DocsCard title="CURRENT RATES">
          <p className="text-muted-foreground mb-4 text-sm">
            Default pricing per 1K tokens. Update in src/lib/ai/cost.ts:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Model</th>
                  <th className="p-2 text-left">Input</th>
                  <th className="p-2 text-left">Output</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">claude-3-5-sonnet</td>
                  <td className="p-2">$0.003</td>
                  <td className="p-2">$0.015</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">claude-3-opus</td>
                  <td className="p-2">$0.015</td>
                  <td className="p-2">$0.075</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">gpt-4o</td>
                  <td className="p-2">$0.005</td>
                  <td className="p-2">$0.015</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">gpt-4</td>
                  <td className="p-2">$0.030</td>
                  <td className="p-2">$0.060</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Budget Hook">
        <DocsCard title="SIMPLE BUDGET STATUS">
          <pre className="bg-muted overflow-x-auto rounded p-4 text-xs">
            <code>{`import { useCostBudget } from '@/hooks/use-cost-tracking';

function BudgetIndicator() {
  const { percentUsed, status, isLoading } = useCostBudget();

  // status: 'normal' | 'warning' | 'danger'
  return (
    <Badge variant={status === 'danger' ? 'destructive' : 'secondary'}>
      {percentUsed.toFixed(0)}% used
    </Badge>
  );
}`}</code>
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Database Schema">
        <DocsCard title="COST EVENTS TABLE">
          <pre className="bg-muted overflow-x-auto rounded p-4 text-xs">
            <code>{`CREATE TABLE ai_cost_events (
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
);`}</code>
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsCallout variant="info" title="Best Practices">
        Always use meaningful feature names when tracking costs. This makes it easy to identify
        which features are most expensive and where to optimize.
      </DocsCallout>
    </FeatureGuideTemplate>
  );
}
