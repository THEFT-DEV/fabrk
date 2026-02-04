import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';

export const metadata = {
  title: 'Testing - AI Development | Fabrk Docs',
  description: 'Testing utilities and patterns for AI-generated code.',
};

export default function TestingPage() {
  return (
    <FeatureGuideTemplate
      code="[0xTST]"
      category="AI Development"
      title="Testing AI Code"
      description="Utilities and patterns for testing AI-generated code."
      overview="AI generates code but often forgets to write tests. These utilities make it easy to test AI-generated functions for edge cases, error handling, and type safety."
      setup={[
        {
          title: 'Run Tests',
          description: 'Test commands for the project.',
          code: `# Unit tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'AITest Utility',
          description: 'Fluent API for testing AI-generated functions.',
          code: `import { AITest } from '@/lib/ai/testing';
import { userSchema } from '@/types/schemas';

describe('getUserProfile', () => {
  it('should handle all cases', async () => {
    await new AITest(getUserProfile)
      .isAsync()
      .shouldNotThrow(['user-123'])
      .shouldReturnType(userSchema, ['user-123'])
      .shouldHandleNull()
      .shouldHandleUndefined()
      .shouldHandleEmpty()
      .shouldCompleteInMs(5000, ['user-123'])
      .verify();
  });
});`,
          language: 'typescript',
        },
        {
          title: 'Async Function Test',
          description: 'Testing async functions with error handling.',
          code: `import { describe, it, expect, vi } from 'vitest';
import { getUser } from '@/lib/api/users';

describe('getUser', () => {
  it('returns user on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '123', name: 'Test' }),
    });

    const result = await getUser('123');

    expect(result.success).toBe(true);
    expect(result.data?.name).toBe('Test');
  });

  it('handles not found', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' }),
    });

    const result = await getUser('invalid');

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('NOT_FOUND');
  });
});`,
          language: 'typescript',
        },
        {
          title: 'React Component Test',
          description: 'Testing components with async state.',
          code: `import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProfile } from '@/components/user-profile';

describe('UserProfile', () => {
  it('renders loading state', () => {
    render(<UserProfile userId="123" />);
    fireEvent.click(screen.getByText('Load User'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders user data on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '123', name: 'Test User' }),
    });

    render(<UserProfile userId="123" />);
    fireEvent.click(screen.getByText('Load User'));

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });
});`,
          language: 'typescript',
        },
        {
          title: 'Edge Case Testing',
          description: 'Test null, undefined, and empty inputs.',
          code: `describe('edge cases', () => {
  it('handles null input', async () => {
    const result = await processData(null);
    expect(result).toBeDefined();
  });

  it('handles undefined input', async () => {
    const result = await processData(undefined);
    expect(result).toBeDefined();
  });

  it('handles empty string', async () => {
    const result = await processData('');
    expect(result).toBeDefined();
  });

  it('handles empty array', async () => {
    const result = await processItems([]);
    expect(result).toEqual([]);
  });
});`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Security', href: '/docs/guides/ai-development/security' }}
      next={{ title: 'Troubleshooting', href: '/docs/guides/ai-development/troubleshooting' }}
    >
      <DocsSection title="AITest Methods">
        <DocsCard title="AVAILABLE ASSERTIONS">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Method</th>
                  <th className="p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">.isAsync()</td>
                  <td className="p-2">Verify function is async</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">.shouldNotThrow(inputs)</td>
                  <td className="p-2">Function doesn&apos;t throw</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">.shouldReturnType(schema, inputs)</td>
                  <td className="p-2">Return matches schema</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">.shouldHandleNull()</td>
                  <td className="p-2">Handles null gracefully</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">.shouldHandleUndefined()</td>
                  <td className="p-2">Handles undefined</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">.shouldHandleEmpty()</td>
                  <td className="p-2">Handles empty string</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">.shouldHandleErrors()</td>
                  <td className="p-2">Error handling works</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">.shouldCompleteInMs(ms, inputs)</td>
                  <td className="p-2">Completes within time</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">.verify()</td>
                  <td className="p-2">Run all assertions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Coverage Requirements">
        <DocsCard title="RECOMMENDED MINIMUMS">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Metric</th>
                  <th className="p-2 text-left">Target</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2">Statements</td>
                  <td className="p-2">80%</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2">Branches</td>
                  <td className="p-2">75%</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2">Functions</td>
                  <td className="p-2">80%</td>
                </tr>
                <tr>
                  <td className="p-2">Lines</td>
                  <td className="p-2">80%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Testing Checklist">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="EVERY FUNCTION">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>[ ] Happy path tested</li>
              <li>[ ] Error cases tested</li>
              <li>[ ] Null/undefined handled</li>
              <li>[ ] Edge cases covered</li>
            </ul>
          </DocsCard>

          <DocsCard title="EVERY COMPONENT">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>[ ] Renders without crash</li>
              <li>[ ] Loading state works</li>
              <li>[ ] Error state works</li>
              <li>[ ] User interactions work</li>
            </ul>
          </DocsCard>
        </div>
      </DocsSection>

      <DocsCallout variant="info" title="AI Testing Prompt">
        When asking AI to generate code, include: &quot;Generated code MUST include tests that cover
        happy path, error handling, null/undefined, and edge cases.&quot;
      </DocsCallout>
    </FeatureGuideTemplate>
  );
}
