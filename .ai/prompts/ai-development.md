# AI Development Prompt

Use this when building features that integrate with AI APIs (Claude, OpenAI).

## Type Utilities

Always use the type utilities from `@/types/ai`:

```typescript
import {
  APIResponse,
  AsyncState,
  AppError,
  successResponse,
  errorResponse,
  isSuccess,
  isError
} from '@/types/ai';

// Return consistent API responses
async function handler(): Promise<APIResponse<User>> {
  try {
    const user = await getUser(id);
    return successResponse(user);
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(error.code, error.message);
    }
    return errorResponse('UNKNOWN_ERROR', 'An unexpected error occurred');
  }
}

// Throw typed errors
throw new AppError('USER_NOT_FOUND', 'User does not exist', 404);
```

## Cost Tracking

Track AI API costs for budgeting and analytics:

```typescript
import { getCostTracker } from '@/lib/ai/cost';

const tracker = getCostTracker();

// Track Claude API calls
const result = await tracker.trackClaudeCall({
  model: 'claude-sonnet-4-20250514',
  feature: 'form-generation',
  prompt: userPrompt,
  userId: session.user.id,
  fn: async () => {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      messages: [{ role: 'user', content: userPrompt }],
      max_tokens: 1024,
    });
    return response;
  },
});

// Track OpenAI calls
const openaiResult = await tracker.trackOpenAICall({
  model: 'gpt-4o',
  feature: 'chat-completion',
  userId: session.user.id,
  fn: async () => {
    return await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });
  },
});

// Check budget before expensive operations
const budget = await tracker.checkBudget(userId);
if (!budget.withinBudget) {
  throw new AppError('BUDGET_EXCEEDED', 'Daily AI budget exceeded', 429);
}
```

## Code Validation

Validate AI-generated code before execution:

```typescript
import { validateCode, isCodeSafe, getSecurityIssues } from '@/lib/ai/validation';

// Full validation
const result = validateCode(generatedCode);
if (!result.valid) {
  console.error('Validation failed:', result.issues);
}

// Quick security check
if (!isCodeSafe(code)) {
  throw new AppError('UNSAFE_CODE', 'Generated code contains security issues');
}

// Get specific issues
const securityIssues = getSecurityIssues(code);
const designIssues = getDesignViolations(code);
```

## AI Testing

Test AI-generated functions with the fluent API:

```typescript
import { AITest, commonSchemas } from '@/lib/ai/testing';

// Test in your test file
describe('AI-generated function', () => {
  it('should meet all requirements', async () => {
    await new AITest(generatedFunction)
      .isAsync()
      .shouldNotThrow(['valid-input'])
      .shouldReturnType(expectedSchema, ['valid-input'])
      .shouldHandleNull()
      .shouldHandleUndefined()
      .shouldCompleteInMs(5000, ['valid-input'])
      .verifyOrThrow();
  });
});

// Quick checks
const isSafe = await testDoesNotThrow(fn, 'input');
const isValidType = await testReturnsType(fn, schema, 'input');
const isFast = await testCompletesInMs(fn, 1000, 'input');
```

## React Hooks for Cost Display

Show costs in your UI:

```typescript
import { useCostTracking, useCostBudget } from '@/hooks/use-cost-tracking';
import { CostBadge, CostWidget, BudgetAlert } from '@/components/ai';

// Full tracking data
function Dashboard() {
  const { todaysCost, budget, percentUsed, withinBudget, featureCosts } = useCostTracking();

  return (
    <div>
      <p>Today: ${todaysCost.toFixed(2)} / ${budget}</p>
      {!withinBudget && <p className="text-destructive">Over budget!</p>}
    </div>
  );
}

// Simple budget status
function Header() {
  const { status, percentUsed } = useCostBudget();
  return <CostBadge />; // Shows percentage with color-coded status
}

// Budget alerts
function Page() {
  return <BudgetAlert threshold={70} />; // Shows when > 70% used
}
```

## Checklist

When building AI features:

- [ ] Use `APIResponse<T>` for all API returns
- [ ] Throw `AppError` with specific codes
- [ ] Track costs with `getCostTracker()`
- [ ] Validate generated code before execution
- [ ] Add feature name to cost tracking for analytics
- [ ] Check budget before expensive operations
- [ ] Test generated code with `AITest`
- [ ] Display costs to users with cost widgets
