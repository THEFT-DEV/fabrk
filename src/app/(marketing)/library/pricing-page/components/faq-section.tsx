/**
 * FABRK COMPONENT
 * FAQ Section - Expandable frequently asked questions
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <Card tone="neutral">
      <CardHeader code="0x00" title="FAQ" />

      <CardContent padding="md">
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [FREQUENTLY ASKED QUESTIONS]:
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-border border">
              <AccordionTrigger className="hover:bg-muted/30 [&>svg]:text-muted-foreground px-4 py-4 font-normal hover:no-underline">
                <div className="flex items-center gap-2">
                  <HelpCircle className="text-primary h-4 w-4" />
                  <span className={cn(mode.font, 'text-xs')}>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-0 pb-4">
                <p className={cn(mode.font, 'text-muted-foreground pl-6 text-xs')}>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
