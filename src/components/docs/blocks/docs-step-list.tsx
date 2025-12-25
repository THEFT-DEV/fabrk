/**
 * DocsStepList - List of numbered steps
 * Wraps multiple DocsStep components with consistent spacing
 */

import { DocsStep } from './docs-step';
import { docsSpacing } from '../spacing';

interface Step {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  tip?: string;
}

interface DocsStepListProps {
  /** Array of steps */
  steps: Step[];
  /** Variant: "card" wraps each step in a card, "inline" shows steps without cards */
  variant?: 'card' | 'inline';
}

export function DocsStepList({ steps, variant = 'card' }: DocsStepListProps) {
  if (variant === 'inline') {
    return (
      <div className={docsSpacing.stepList}>
        {steps.map((step, index) => (
          <DocsStep
            key={index}
            number={index + 1}
            title={step.title}
            description={step.description}
            code={step.code}
            language={step.language}
            tip={step.tip}
          />
        ))}
      </div>
    );
  }

  // Card variant - terminal style with [ [0xXX] TITLE ] format
  return (
    <div className={docsSpacing.stepList}>
      {steps.map((step, index) => {
        const hexCode = (index + 1).toString(16).toUpperCase().padStart(2, '0');
        const titleSlug = step.title.toUpperCase();
        return (
          <div key={index} className="border-border bg-card border">
            {/* Terminal header */}
            <div className="border-border border-b px-4 py-2">
              <span className="text-muted-foreground font-mono text-xs">
                [ [0x{hexCode}] {titleSlug} ]
              </span>
            </div>
            {/* Content */}
            <div className="p-4">
              {step.description && (
                <p className="text-muted-foreground mb-6 font-mono text-xs">
                  <span className="text-muted-foreground">DESC: </span>
                  <span className="text-foreground">{step.description}</span>
                </p>
              )}
              {step.code && (
                <DocsStep
                  number={index + 1}
                  title=""
                  code={step.code}
                  language={step.language}
                  tip={step.tip}
                />
              )}
              {!step.code && step.tip && (
                <p className="text-muted-foreground border-primary/50 border-l-2 pl-4 font-mono text-xs">
                  <span className="text-primary font-semibold uppercase">Tip:</span> {step.tip}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
