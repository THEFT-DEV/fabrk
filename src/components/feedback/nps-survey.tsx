/**
 * NPS Survey Component
 * Beautiful, accessible NPS survey widget
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
interface NPSSurveyProps {
  onSubmit: (score: number, comment?: string) => void;
  onDismiss?: () => void;
}

export function NPSSurvey({ onSubmit, onDismiss }: NPSSurveyProps) {
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [step, setStep] = useState<'score' | 'comment' | 'thanks'>('score');

  const handleScoreSelect = (selectedScore: number) => {
    setScore(selectedScore);
    setStep('comment');
    trackEvent('nps_score_submitted', { score: selectedScore });
  };

  const handleSubmit = () => {
    if (score !== null) {
      onSubmit(score, comment || undefined);
      setStep('thanks');

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        onDismiss?.();
      }, 3000);
    }
  };

  if (step === 'thanks') {
    return (
      <div className={cn('border-success/30 bg-success/10 border p-6 text-center', mode.radius)}>
        <h3 className={cn('text-success-foreground mb-2 text-sm font-semibold', mode.font)}>Thank you!</h3>
        <p className="text-success text-sm">Your feedback helps us improve our product.</p>
      </div>
    );
  }

  if (step === 'comment') {
    return (
      <div className={cn('border-border bg-card border p-6', mode.radius)}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className={cn('text-foreground text-sm font-semibold', mode.font)}>
            Thanks for your rating! Want to tell us more?
          </h3>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Dismiss survey"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What's the main reason for your score? (optional)"
          className="mb-4"
          rows={4}
        />

        <div className="flex gap-4">
          <Button onClick={handleSubmit} className={cn('flex-1', mode.font, 'text-xs')}>
            &gt; SUBMIT FEEDBACK
          </Button>
          <Button
            onClick={() => onDismiss?.()}
            variant="outline"
            className={cn(mode.font, 'text-xs')}
          >
            &gt; SKIP
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('border-border bg-card border p-6', mode.radius)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={cn('text-foreground text-sm font-semibold', mode.font)}>
          How likely are you to recommend us to a friend?
        </h3>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Dismiss survey"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mb-4 flex justify-between gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => handleScoreSelect(num)}
            className={cn(
              'flex h-12 w-12 items-center justify-center border font-semibold transition-all hover:scale-105',
              mode.radius,
              num <= 6
                ? 'border-destructive/30 bg-destructive/10 hover:border-destructive/50 hover:bg-destructive/20'
                : num <= 8
                  ? 'border-warning/30 bg-warning/10 hover:border-warning/50 hover:bg-warning/20'
                  : 'border-success/30 bg-success/10 hover:border-success/50 hover:bg-success/20'
            )}
            aria-label={`Score ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="text-muted-foreground flex justify-between text-xs">
        <span>Not likely</span>
        <span>Very likely</span>
      </div>
    </div>
  );
}
