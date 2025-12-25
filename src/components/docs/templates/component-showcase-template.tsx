/**
 * ComponentShowcaseTemplate - Template for component documentation pages
 * Used by: /docs/components/* (shadcn/ui style with live previews)
 */

'use client';

import { DocsHeader } from '../blocks/docs-header';
import { DocsSection } from '../blocks/docs-section';
import { DocsCard } from '../blocks/docs-card';
import { DocsPreview } from '../blocks/docs-preview';
import { DocsPropsTable } from '../blocks/docs-props-table';
import { DocsCallout } from '../blocks/docs-callout';
import { DocsNavFooter } from '../blocks/docs-nav-footer';
import { CodeBlock } from '@/components/ui/code-block';
import { docsTypography } from '../typography';
import { docsSpacing } from '../spacing';

interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface Variant {
  title: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
}

interface UsageExample {
  title: string;
  description?: string;
  code: string;
  language?: string;
}

interface NavLink {
  title: string;
  href: string;
}

interface ComponentShowcaseTemplateProps {
  /** Terminal code badge e.g. "[UI.01]" */
  code: string;
  /** Category e.g. "Components" */
  category?: string;
  /** Component name */
  title: string;
  /** Component description */
  description: string;
  /** Installation command */
  installCommand?: string;
  /** Import statement */
  importCode?: string;
  /** Main component preview */
  mainPreview?: {
    preview: React.ReactNode;
    code: string;
  };
  /** Component variants/examples with live previews */
  variants?: Variant[];
  /** Component props API */
  props?: Prop[];
  /** Usage examples (code only, no preview) */
  usageExamples?: UsageExample[];
  /** Accessibility notes */
  accessibility?: string[];
  /** Warning callout (optional) */
  warning?: string;
  /** Previous page link */
  previous?: NavLink;
  /** Next page link */
  next?: NavLink;
  /** Additional sections */
  children?: React.ReactNode;
}

export function ComponentShowcaseTemplate({
  code,
  category = 'Components',
  title,
  description,
  installCommand,
  importCode,
  mainPreview,
  variants,
  props,
  usageExamples,
  accessibility,
  warning,
  previous,
  next,
  children,
}: ComponentShowcaseTemplateProps) {
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

      {/* Installation */}
      {installCommand && (
        <DocsSection title="Installation">
          <DocsCard title="INSTALL">
            <CodeBlock code={installCommand} language="bash" />
          </DocsCard>
        </DocsSection>
      )}

      {/* Import */}
      {importCode && (
        <DocsSection title="Import">
          <DocsCard title="IMPORT">
            <CodeBlock code={importCode} language="typescript" />
          </DocsCard>
        </DocsSection>
      )}

      {/* Main Preview */}
      {mainPreview && (
        <DocsSection title="Preview">
          <DocsPreview
            title={title}
            description="Default component appearance"
            preview={mainPreview.preview}
            code={mainPreview.code}
          />
        </DocsSection>
      )}

      {/* Variants */}
      {variants && variants.length > 0 && (
        <DocsSection title="Variants">
          <div className={docsSpacing.sectionItems}>
            {variants.map((variant, index) => (
              <DocsPreview
                key={index}
                title={variant.title}
                description={variant.description}
                preview={variant.preview}
                code={variant.code}
              />
            ))}
          </div>
        </DocsSection>
      )}

      {/* Props API */}
      {props && props.length > 0 && (
        <DocsSection title="API Reference">
          <DocsPropsTable props={props} />
        </DocsSection>
      )}

      {/* Usage Examples */}
      {usageExamples && usageExamples.length > 0 && (
        <DocsSection title="Usage">
          <div className={docsSpacing.sectionItems}>
            {usageExamples.map((example, index) => (
              <DocsCard key={index} title={example.title.toUpperCase()}>
                {example.description && (
                  <p className={docsTypography.body}>{example.description}</p>
                )}
                <CodeBlock code={example.code} language={example.language || 'tsx'} />
              </DocsCard>
            ))}
          </div>
        </DocsSection>
      )}

      {/* Accessibility */}
      {accessibility && accessibility.length > 0 && (
        <DocsSection title="Accessibility">
          <DocsCard title="A11Y">
            <ul className="list-inside list-disc space-y-2">
              {accessibility.map((note, index) => (
                <li key={index} className={docsTypography.body}>
                  {note}
                </li>
              ))}
            </ul>
          </DocsCard>
        </DocsSection>
      )}

      {/* Additional Content */}
      {children}

      {/* Navigation Footer */}
      <DocsNavFooter previous={previous} next={next} />
    </div>
  );
}
