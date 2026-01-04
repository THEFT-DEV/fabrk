/**
 * Feedback Widget Component
 * Floating feedback button with form
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageCircle, X, Star } from 'lucide-react';
import type { FeedbackType } from '@/lib/feedback';

import { mode } from '@/design-system';
import { formatLabel } from '@/design-system';
import { cn } from '@/lib/utils';
interface FeedbackWidgetProps {
  onSubmit: (feedback: { type: FeedbackType; message: string; rating?: number }) => void;
}

export function FeedbackWidget({ onSubmit }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>('feature_request');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      type,
      message,
      rating: rating > 0 ? rating : undefined,
    });

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setMessage('');
      setRating(0);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'bg-info text-info-foreground hover:bg-info/80 fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center transition-all hover:scale-110',
          mode.radius
        )}
        aria-label="Give feedback"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={cn('border-border bg-card fixed right-6 bottom-6 w-96 border', mode.radius)}>
      <div className="border-border flex items-center justify-between border-b p-4">
        <h3 className={cn('text-foreground font-semibold', mode.font)}>Send Feedback</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close feedback"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {submitted ? (
        <div className="p-6 text-center">
          <div className="mb-2 text-4xl">✅</div>
          <h4 className={cn('text-foreground mb-1 font-semibold', mode.font)}>Thanks for your feedback!</h4>
          <p className="text-muted-foreground text-sm">We appreciate your input.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <Label htmlFor="feedback-type">{formatLabel('Feedback Type')}</Label>
            <Select value={type} onValueChange={(v) => setType(v as FeedbackType)}>
              <SelectTrigger id="feedback-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feature_request">Feature Request</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="improvement">Improvement</SelectItem>
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="praise">Praise</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label htmlFor="feedback-message">{formatLabel('Your Feedback')}</Label>
            <Textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              required
              rows={4}
            />
          </div>

          <div className="mb-4">
            <Label>{formatLabel('Rating (optional)')}</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className="transition-transform hover:scale-110"
                  aria-label={`Rate ${num} stars`}
                >
                  <Star
                    className={`h-6 w-6 ${
                      num <= rating ? 'fill-warning text-warning' : 'text-muted-foreground/50'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className={cn('w-full', mode.font, 'text-xs')}>
            &gt; SUBMIT FEEDBACK
          </Button>
        </form>
      )}
    </div>
  );
}
