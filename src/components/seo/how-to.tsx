/**
 * HowTo Component
 * AEO-optimized tutorial/guide component
 * Appears in featured snippets and voice search results
 */

import { Check } from 'lucide-react';
import { generateHowToSchema } from '@/lib/seo/structured-data';
import { SchemaScript } from './schema-script';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToProps {
  title: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
  className?: string;
}

/**
 * AEO-optimized how-to guide component
 * Perfect for tutorials and step-by-step guides
 *
 * @example
 * <HowTo
 *   title="How to Deploy Your SaaS"
 *   description="Step-by-step guide to deploying on Vercel"
 *   totalTime="PT15M"
 *   steps={[
 *     { name: "Step 1", text: "Connect your repository..." },
 *     { name: "Step 2", text: "Configure environment variables..." }
 *   ]}
 * />
 */
export function HowTo({
  title,
  description,
  steps,
  totalTime,
  estimatedCost,
  className,
}: HowToProps) {
  const schema = generateHowToSchema({
    name: title,
    description,
    steps,
    totalTime,
    estimatedCost,
  });

  return (
    <>
      <SchemaScript schema={schema} />

      <div className={className}>
        <h2 className={cn('text-foreground mb-2 text-4xl font-semibold', mode.font)}>{title}</h2>
        <p className="text-muted-foreground mb-8 text-sm">{description}</p>

        {(totalTime || estimatedCost) && (
          <div className="text-muted-foreground mb-8 flex gap-6 text-sm">
            {totalTime && (
              <div>
                <span className="font-semibold">Total Time:</span> {totalTime}
              </div>
            )}
            {estimatedCost && (
              <div>
                <span className="font-semibold">Cost:</span> {estimatedCost}
              </div>
            )}
          </div>
        )}

        <ol className="space-y-6">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <div
                className={cn(
                  'bg-info text-info-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center font-semibold',
                  mode.radius
                )}
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <h3 className={cn('text-foreground mb-2 text-sm font-semibold', mode.font)}>{step.name}</h3>
                <p className="text-muted-foreground">{step.text}</p>

                {step.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={step.image}
                    alt={step.name}
                    className={cn('border-border mt-4 border', mode.radius)}
                  />
                )}
              </div>

              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                <Check className="text-success h-5 w-5" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
