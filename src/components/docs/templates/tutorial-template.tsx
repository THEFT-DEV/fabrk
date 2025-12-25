/**
 * TutorialTemplate - Template for step-by-step tutorial pages
 * Used by: /docs/tutorials/* (guide-style content)
 */

import { DocsHeader } from '../blocks/docs-header';
import { DocsSection } from '../blocks/docs-section';
import { DocsCard } from '../blocks/docs-card';
import { DocsStepList } from '../blocks/docs-step-list';
import { DocsCallout } from '../blocks/docs-callout';
import { DocsNavFooter } from '../blocks/docs-nav-footer';
import { CodeBlock } from '@/components/ui/code-block';
import { docsSpacing } from '../spacing';

interface Prerequisite {
  title: string;
  description?: string;
}

interface TutorialStep {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  tip?: string;
}

interface NavLink {
  title: string;
  href: string;
}

interface TutorialTemplateProps {
  /** Terminal code badge e.g. "[0x50]" */
  code: string;
  /** Category e.g. "Tutorial" */
  category?: string;
  /** Tutorial title */
  title: string;
  /** Tutorial description */
  description: string;
  /** Difficulty level */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** Estimated time to complete */
  timeEstimate?: string;
  /** What you'll learn */
  learningObjectives?: string[];
  /** Prerequisites before starting */
  prerequisites?: Prerequisite[];
  /** Tutorial steps */
  steps: TutorialStep[];
  /** Final result code (optional) */
  resultCode?: string;
  /** Result code language */
  resultLanguage?: string;
  /** Result description */
  resultDescription?: string;
  /** Next steps or related tutorials */
  nextSteps?: string[];
  /** Warning callout (optional) */
  warning?: string;
  /** Previous page link */
  previous?: NavLink;
  /** Next page link */
  next?: NavLink;
  /** Additional sections */
  children?: React.ReactNode;
}

const difficultyColors = {
  beginner: 'text-success',
  intermediate: 'text-warning',
  advanced: 'text-destructive',
};

export function TutorialTemplate({
  code,
  category = 'Tutorial',
  title,
  description,
  difficulty = 'beginner',
  timeEstimate,
  learningObjectives,
  prerequisites,
  steps,
  resultCode,
  resultLanguage = 'typescript',
  resultDescription,
  nextSteps,
  warning,
  previous,
  next,
  children,
}: TutorialTemplateProps) {
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

      {/* Tutorial Meta */}
      <DocsCard code={code} title="TUTORIAL INFO">
        <div className="flex flex-wrap gap-6">
          {difficulty && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Difficulty:</span>
              <span className={`font-mono text-sm uppercase ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
            </div>
          )}
          {timeEstimate && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Time:</span>
              <span className="text-primary">{timeEstimate}</span>
            </div>
          )}
        </div>
      </DocsCard>

      {/* Learning Objectives */}
      {learningObjectives && learningObjectives.length > 0 && (
        <DocsSection title="What You'll Learn">
          <DocsCard title="OBJECTIVES">
            <ul className="space-y-2">
              {learningObjectives.map((objective, index) => (
                <li key={index}>
                  <span className="text-primary">├─</span> {objective}
                </li>
              ))}
            </ul>
          </DocsCard>
        </DocsSection>
      )}

      {/* Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <DocsSection title="Prerequisites">
          <DocsCard title="REQUIREMENTS">
            <ul className="space-y-2">
              {prerequisites.map((prereq, index) => (
                <li key={index}>
                  <span className="text-primary">├─</span>{' '}
                  <span className="text-foreground">{prereq.title}</span>
                  {prereq.description && <span> - {prereq.description}</span>}
                </li>
              ))}
            </ul>
          </DocsCard>
        </DocsSection>
      )}

      {/* Tutorial Steps */}
      <DocsSection title="Steps">
        <DocsStepList steps={steps} variant="card" />
      </DocsSection>

      {/* Final Result */}
      {resultCode && (
        <DocsSection title="Final Result">
          <DocsCard title="OUTPUT">
            {resultDescription && <p className="mb-4">{resultDescription}</p>}
            <CodeBlock code={resultCode} language={resultLanguage} />
          </DocsCard>
        </DocsSection>
      )}

      {/* Next Steps */}
      {nextSteps && nextSteps.length > 0 && (
        <DocsSection title="Next Steps">
          <DocsCard title="CONTINUE">
            <ul className="space-y-2">
              {nextSteps.map((step, index) => (
                <li key={index}>
                  <span className="text-primary">├─</span> {step}
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
