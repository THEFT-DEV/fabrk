/**
 * DocsStep - Single numbered step component
 * Consistent step badge styling across all docs
 */

import { docsTypography } from '../typography';
import { CodeBlock } from '@/components/ui/code-block';

interface DocsStepProps {
  /** Step number (1, 2, 3...) */
  number: number;
  /** Step title */
  title: string;
  /** Step description */
  description?: string;
  /** Optional code snippet */
  code?: string;
  /** Code language for syntax highlighting */
  language?: string;
  /** Optional tip/note */
  tip?: string;
  /** Children for additional content */
  children?: React.ReactNode;
}

export function DocsStep({
  number: _number,
  title,
  description,
  code,
  language = 'bash',
  tip,
  children,
}: DocsStepProps) {
  return (
    <div className="space-y-4">
      {/* Step title */}
      <h3 className={`uppercase ${docsTypography.h3}`}>{title}</h3>

      {/* Description */}
      {description && <p className={docsTypography.body}>{description}</p>}

      {/* Code block */}
      {code && <CodeBlock code={code} language={language} />}

      {/* Tip */}
      {tip && (
        <p className={`border-primary/50 border-l-2 pl-4 ${docsTypography.caption}`}>
          <span className="text-primary font-semibold uppercase">Tip:</span> {tip}
        </p>
      )}

      {/* Additional children */}
      {children}
    </div>
  );
}
