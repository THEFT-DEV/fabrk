/**
 * FAQ Section Component
 * Optimized for AEO - appears in "People Also Ask"
 *
 * Features:
 * - Automatic JSON-LD schema generation
 * - Accessible accordion UI
 * - SEO-friendly markup
 */

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateFAQSchema } from '@/lib/seo/structured-data';
import { ClientSchemaScript } from '@/components/security/client-schema-script';

import { mode } from '@/design-system';
export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
  className?: string;
}

/**
 * AEO-optimized FAQ component
 * Automatically includes JSON-LD schema for featured snippets
 *
 * @example
 * <FAQSection
 *   title="Frequently Asked Questions"
 *   faqs={[
 *     { question: "What is Fabrk?", answer: "A Next.js SaaS boilerplate..." }
 *   ]}
 * />
 */
export function FAQSection({ faqs, title, description, className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = generateFAQSchema(faqs);

  return (
    <>
      <ClientSchemaScript schema={schema} />

      <section className={cn('mx-auto max-w-3xl', className)}>
        {title && <h2 className={cn('text-foreground mb-2 text-4xl font-semibold', mode.font)}>{title}</h2>}
        {description && <p className="text-muted-foreground mb-8 text-sm">{description}</p>}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={cn('border-border bg-card border', mode.radius)}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <h3 className={cn('text-foreground pr-4 text-sm font-semibold', mode.font)}>{faq.question}</h3>
                <ChevronDown
                  className={cn(
                    'text-muted-foreground h-5 w-5 flex-shrink-0 transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>

              {openIndex === index && (
                <div className="border-border border-t p-6 pt-4">
                  <p className="text-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
