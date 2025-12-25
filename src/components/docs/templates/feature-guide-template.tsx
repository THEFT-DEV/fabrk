/**
 * FeatureGuideTemplate - Template for feature documentation pages
 * Used by: /docs/features/* (18 pages)
 */

import { LucideIcon } from 'lucide-react';
import { DocsHeader } from '../blocks/docs-header';
import { DocsSection } from '../blocks/docs-section';
import { DocsCard } from '../blocks/docs-card';
import { DocsStepList } from '../blocks/docs-step-list';
import { DocsFeatureList } from '../blocks/docs-feature-list';
import { DocsCallout } from '../blocks/docs-callout';
import { DocsNavFooter } from '../blocks/docs-nav-footer';
import { CodeBlock } from '@/components/ui/code-block';
import { docsTypography } from '../typography';
import { docsSpacing } from '../spacing';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional module code like "AUTH", "BILLING" */
  module?: string;
  /** Optional status like "SECURE", "ACTIVE" */
  status?: string;
}

interface Step {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  tip?: string;
}

interface UsageExample {
  title: string;
  description?: string;
  code: string;
  language?: string;
}

interface ConfigOption {
  name: string;
  type: string;
  description: string;
  default?: string;
}

interface Troubleshooting {
  problem: string;
  solution: string;
}

interface NavLink {
  title: string;
  href: string;
}

interface FeatureGuideTemplateProps {
  /** Terminal code badge e.g. "[0x40]" */
  code: string;
  /** Category e.g. "Features" */
  category?: string;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Overview text */
  overview: string;
  /** Feature highlights (optional) */
  features?: Feature[];
  /** Setup steps (optional) */
  setup?: Step[];
  /** Usage examples (optional) */
  usage?: UsageExample[];
  /** Configuration options (optional) */
  configuration?: ConfigOption[];
  /** Troubleshooting tips (optional) */
  troubleshooting?: Troubleshooting[];
  /** Warning callout (optional) */
  warning?: string;
  /** Previous page link */
  previous?: NavLink;
  /** Next page link */
  next?: NavLink;
  /** Additional sections */
  children?: React.ReactNode;
}

export function FeatureGuideTemplate({
  code,
  category = 'Features',
  title,
  description,
  overview,
  features,
  setup,
  usage,
  configuration,
  troubleshooting,
  warning,
  previous,
  next,
  children,
}: FeatureGuideTemplateProps) {
  return (
    <div className={docsSpacing.pageSections}>
      {/* Header */}
      <DocsHeader code={code} category={category} title={title} description={description} />

      {/* Warning (if any) */}
      {warning && (
        <DocsCallout variant="warning" title="Important">
          {warning}
        </DocsCallout>
      )}

      {/* Overview */}
      <DocsSection title="Overview">
        <DocsCard code={code} title="STATUS">
          <p>{overview}</p>
        </DocsCard>
      </DocsSection>

      {/* Features Grid */}
      {features && features.length > 0 && (
        <DocsSection title="Features">
          <DocsFeatureList features={features} />
        </DocsSection>
      )}

      {/* Setup Steps */}
      {setup && setup.length > 0 && (
        <DocsSection title="Setup">
          <DocsStepList steps={setup} variant="card" />
        </DocsSection>
      )}

      {/* Usage Examples */}
      {usage && usage.length > 0 && (
        <DocsSection title="Usage">
          <div className={docsSpacing.sectionItems}>
            {usage.map((example, index) => (
              <DocsCard key={index} title={example.title.toUpperCase()}>
                {example.description && <p className="mb-6">{example.description}</p>}
                <CodeBlock code={example.code} language={example.language || 'typescript'} />
              </DocsCard>
            ))}
          </div>
        </DocsSection>
      )}

      {/* Configuration */}
      {configuration && configuration.length > 0 && (
        <DocsSection title="Configuration">
          <DocsCard title="CONFIG OPTIONS">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b">
                    <th className={`w-[15%] pb-2 pr-4 text-left uppercase ${docsTypography.caption}`}>Option</th>
                    <th className={`w-[30%] pb-2 pr-4 text-left uppercase ${docsTypography.caption}`}>Type</th>
                    <th className={`w-[20%] pb-2 pr-4 text-left uppercase ${docsTypography.caption}`}>
                      Default
                    </th>
                    <th className={`w-[35%] pb-2 text-left uppercase ${docsTypography.caption}`}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {configuration.map((option, index) => (
                    <tr key={index} className="border-border border-b last:border-0">
                      <td className="py-3 pr-4 align-top font-mono">{option.name}</td>
                      <td className="py-3 pr-4 align-top">
                        <code className={docsTypography.code}>{option.type}</code>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        {option.default ? (
                          <code className={docsTypography.code}>{option.default}</code>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className={`py-3 align-top ${docsTypography.caption}`}>{option.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DocsCard>
        </DocsSection>
      )}

      {/* Troubleshooting */}
      {troubleshooting && troubleshooting.length > 0 && (
        <DocsSection title="Troubleshooting">
          <div className={docsSpacing.sectionItems}>
            {troubleshooting.map((item, index) => (
              <DocsCard key={index} title={`ERROR ${(index + 1).toString().padStart(2, '0')}`}>
                <p className="text-foreground mb-2 font-semibold">{item.problem}</p>
                <p>{item.solution}</p>
              </DocsCard>
            ))}
          </div>
        </DocsSection>
      )}

      {/* Additional Content */}
      {children}

      {/* Navigation Footer */}
      <DocsNavFooter previous={previous} next={next} />
    </div>
  );
}
