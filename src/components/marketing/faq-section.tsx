/**
 * ✅ FABRK COMPONENT
 * FAQ Section - Terminal console [KNOWLEDGE BASE] style
 * Production-ready ✓
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/landing/section-header';
import { FAQ_QUESTIONS } from '@/data/landing';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card size="auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={cn('flex w-full items-center justify-between p-4 text-left transition-colors', mode.state.hover.card)}
        >
          <span className={cn('text-sm', mode.font)}>
            <span className="text-primary">├─</span>
            <span className="text-muted-foreground ml-2">[QUERY]:</span>
            <span className="text-foreground ml-2">{question}</span>
          </span>
          <ChevronDown
            className={cn(
              'text-muted-foreground size-4 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <CardContent className="border-border bg-muted/30 border-t">
                <span className={cn('text-muted-foreground text-xs', mode.font)}>
                  └─ [RESPONSE]:{' '}
                </span>
                <span className={cn('text-foreground text-xs', mode.font)}>{answer}</span>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="border-border scroll-mt-16 border-t py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            badge="KNOWLEDGE BASE"
            code="0x70"
            title="FREQUENTLY ASKED QUESTIONS"
            description="Got questions? We've got answers. Find everything you need to know about Fabrk."
            align="center"
          />

          {/* FAQ List */}
          <div className="space-y-2">
            {FAQ_QUESTIONS.map((faq, index) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
