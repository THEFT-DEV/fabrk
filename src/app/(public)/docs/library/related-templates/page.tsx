import { ComponentShowcaseTemplate } from '@/components/docs';
import { RelatedTemplates } from '@/components/library';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata = {
  title: 'Related Templates - Fabrk',
  description: 'Intelligent template recommendation component with scoring algorithm',
};

const importCode = `import { RelatedTemplates } from '@/components/library';`;

const usageCode = `<RelatedTemplates currentTemplateId="user-management" limit={3} />`;

const algorithmCode = `// Scoring algorithm (from /lib/search.ts)
const scored = allTemplates
  .filter((t) => t.id !== template.id)
  .map((t) => {
    let score = 0;

    // Same category = +3 points
    if (t.category === template.category) {
      score += 3;
    }

    // Shared features (each = +1 point)
    const sharedFeatures = t.features.filter((f) =>
      template.features.some((tf) => tf.toLowerCase() === f.toLowerCase())
    );
    score += sharedFeatures.length;

    // Same badge = +1 point
    if (t.badge && t.badge === template.badge) {
      score += 1;
    }

    return { template: t, score };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, limit);`;

export default function RelatedTemplatesPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LIB.02]"
      title="Related Templates"
      description="Shows contextually similar templates using intelligent scoring algorithm"
      importCode={importCode}
      mainPreview={{
        preview: (
          <div className="bg-background p-6">
            <RelatedTemplates currentTemplateId="analytics-dashboard" limit={3} />
          </div>
        ),
        code: usageCode,
      }}
      props={[
        {
          name: 'currentTemplateId',
          type: 'string',
          required: true,
          description: 'ID of current template (e.g., "user-management")',
        },
        {
          name: 'limit',
          type: 'number',
          default: '3',
          description: 'Maximum number of related templates to show',
        },
      ]}
      accessibility={[
        'Uses intelligent scoring algorithm based on category, features, and badges',
        'Automatically filters out the current template',
        'Returns null if no related templates found',
        'Templates shown in 3-column grid on desktop, responsive on mobile',
        'Each card shows template name, description, features, and badge',
        'Scoring: Same category (+3), Shared features (+1 each), Same badge (+1)',
      ]}
      previous={{ title: 'Library Navigation', href: '/docs/components/library-navigation' }}
      next={{ title: 'Advanced Filters', href: '/docs/components/advanced-filters' }}
    >
      <Card>
        <CardHeader code="0xA1" title="SCORING_ALGORITHM" />
        <CardContent>
          <CodeBlock code={algorithmCode} language="typescript" maxHeight="400px" />
        </CardContent>
      </Card>
    </ComponentShowcaseTemplate>
  );
}
