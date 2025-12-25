/**
 * ReferenceTemplate - Template for API reference and configuration pages
 * Used by: /docs/reference/*, /docs/api/*, configuration docs
 */

import { DocsHeader } from '../blocks/docs-header';
import { DocsSection } from '../blocks/docs-section';
import { DocsCard } from '../blocks/docs-card';
import { DocsPropsTable } from '../blocks/docs-props-table';
import { DocsCallout } from '../blocks/docs-callout';
import { DocsNavFooter } from '../blocks/docs-nav-footer';
import { CodeBlock } from '@/components/ui/code-block';
import { docsTypography } from '../typography';
import { docsSpacing } from '../spacing';

interface Parameter {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface Method {
  name: string;
  description: string;
  signature: string;
  parameters?: Parameter[];
  returns?: string;
  example?: string;
}

interface EnvVariable {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface CodeExample {
  title: string;
  description?: string;
  code: string;
  language?: string;
}

interface NavLink {
  title: string;
  href: string;
}

interface ReferenceTemplateProps {
  /** Terminal code badge e.g. "[REF.01]" */
  code: string;
  /** Category e.g. "Reference" */
  category?: string;
  /** Reference title */
  title: string;
  /** Reference description */
  description: string;
  /** Overview text */
  overview?: string;
  /** Type definition (TypeScript interface) */
  typeDefinition?: string;
  /** Methods/functions */
  methods?: Method[];
  /** Parameters/props */
  parameters?: Parameter[];
  /** Environment variables */
  envVariables?: EnvVariable[];
  /** Code examples */
  examples?: CodeExample[];
  /** Related links */
  relatedLinks?: { title: string; href: string; description?: string }[];
  /** Warning callout (optional) */
  warning?: string;
  /** Previous page link */
  previous?: NavLink;
  /** Next page link */
  next?: NavLink;
  /** Additional sections */
  children?: React.ReactNode;
}

export function ReferenceTemplate({
  code,
  category = 'Reference',
  title,
  description,
  overview,
  typeDefinition,
  methods,
  parameters,
  envVariables,
  examples,
  relatedLinks,
  warning,
  previous,
  next,
  children,
}: ReferenceTemplateProps) {
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
      {overview && (
        <DocsSection title="Overview">
          <DocsCard code={code} title="STATUS">
            <p className={docsTypography.body}>{overview}</p>
          </DocsCard>
        </DocsSection>
      )}

      {/* Type Definition */}
      {typeDefinition && (
        <DocsSection title="Type Definition">
          <DocsCard title="TYPE DEF">
            <CodeBlock code={typeDefinition} language="typescript" />
          </DocsCard>
        </DocsSection>
      )}

      {/* Parameters */}
      {parameters && parameters.length > 0 && (
        <DocsSection title="Parameters">
          <DocsPropsTable props={parameters} />
        </DocsSection>
      )}

      {/* Methods */}
      {methods && methods.length > 0 && (
        <DocsSection title="Methods">
          <div className={docsSpacing.sectionItems}>
            {methods.map((method, index) => (
              <DocsCard key={index} title={`METHOD ${(index + 1).toString().padStart(2, '0')}`}>
                <h3 className={`font-mono ${docsTypography.h4}`}>{method.name}</h3>
                <p className={docsTypography.body}>{method.description}</p>
                <div className="mt-4">
                  <p className={`uppercase ${docsTypography.caption} mb-2`}>Signature</p>
                  <CodeBlock code={method.signature} language="typescript" />
                </div>
                {method.parameters && method.parameters.length > 0 && (
                  <div className="mt-4">
                    <p className={`uppercase ${docsTypography.caption} mb-2`}>Parameters</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-border border-b">
                            <th className={`pb-2 text-left uppercase ${docsTypography.caption}`}>
                              Name
                            </th>
                            <th className={`pb-2 text-left uppercase ${docsTypography.caption}`}>
                              Type
                            </th>
                            <th className={`pb-2 text-left uppercase ${docsTypography.caption}`}>
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {method.parameters.map((param, pIndex) => (
                            <tr key={pIndex} className="border-border border-b last:border-0">
                              <td className="py-2 font-mono">{param.name}</td>
                              <td className="py-2">
                                <code className={docsTypography.code}>{param.type}</code>
                              </td>
                              <td className={`py-2 ${docsTypography.caption}`}>
                                {param.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {method.returns && (
                  <div className="mt-4">
                    <p className={`uppercase ${docsTypography.caption} mb-2`}>Returns</p>
                    <code className={docsTypography.code}>{method.returns}</code>
                  </div>
                )}
                {method.example && (
                  <div className="mt-4">
                    <p className={`uppercase ${docsTypography.caption} mb-2`}>Example</p>
                    <CodeBlock code={method.example} language="typescript" />
                  </div>
                )}
              </DocsCard>
            ))}
          </div>
        </DocsSection>
      )}

      {/* Environment Variables */}
      {envVariables && envVariables.length > 0 && (
        <DocsSection title="Environment Variables">
          <DocsPropsTable props={envVariables} />
        </DocsSection>
      )}

      {/* Examples */}
      {examples && examples.length > 0 && (
        <DocsSection title="Examples">
          <div className={docsSpacing.sectionItems}>
            {examples.map((example, index) => (
              <DocsCard key={index} title={example.title.toUpperCase()}>
                {example.description && (
                  <p className={docsTypography.body}>{example.description}</p>
                )}
                <CodeBlock code={example.code} language={example.language || 'typescript'} />
              </DocsCard>
            ))}
          </div>
        </DocsSection>
      )}

      {/* Related Links */}
      {relatedLinks && relatedLinks.length > 0 && (
        <DocsSection title="Related">
          <DocsCard title="RELATED LINKS">
            <ul className="space-y-4">
              {relatedLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-primary font-mono text-sm hover:underline">
                    {link.title}
                  </a>
                  {link.description && (
                    <p className={`mt-1 ${docsTypography.caption}`}>{link.description}</p>
                  )}
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
