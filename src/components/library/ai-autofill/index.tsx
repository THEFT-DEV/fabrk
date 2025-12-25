'use client';

import * as React from 'react';
import { Sparkles, Loader2, Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface AutofillFormData {
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  description: string;
  targetAudience: string;
  challenges: string;
}

export interface AiAutofillProps {
  onAutofill?: (context: string) => Promise<Partial<AutofillFormData>>;
  className?: string;
}

const INDUSTRY_OPTIONS = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

const SIZE_OPTIONS = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' },
];

// Demo autofill data based on company name
const DEMO_AUTOFILL: Record<string, Partial<AutofillFormData>> = {
  default: {
    industry: 'technology',
    companySize: '11-50',
    website: 'https://example.com',
    description: 'A innovative company focused on delivering exceptional products and services to customers worldwide.',
    targetAudience: 'B2B technology companies, startups, and enterprise clients looking for modern solutions.',
    challenges: 'Scaling operations efficiently, maintaining product quality, and staying competitive in a rapidly evolving market.',
  },
  tech: {
    industry: 'technology',
    companySize: '51-200',
    website: 'https://techstartup.io',
    description: 'A cutting-edge technology company building the future of software development with AI-powered tools.',
    targetAudience: 'Software developers, tech teams, and CTOs at growth-stage companies.',
    challenges: 'Reducing development time, improving code quality, and enabling remote collaboration at scale.',
  },
};

export function AiAutofill({ onAutofill, className }: AiAutofillProps) {
  const [formData, setFormData] = React.useState<AutofillFormData>({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    description: '',
    targetAudience: '',
    challenges: '',
  });
  const [isAutofilling, setIsAutofilling] = React.useState(false);
  const [autofilledFields, setAutofilledFields] = React.useState<Set<string>>(new Set());

  const handleInputChange = (field: keyof AutofillFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Remove from autofilled if user edits
    setAutofilledFields((prev) => {
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  };

  const handleAutofill = async () => {
    if (!formData.companyName.trim()) return;

    setIsAutofilling(true);

    try {
      let autofillData: Partial<AutofillFormData>;

      if (onAutofill) {
        autofillData = await onAutofill(formData.companyName);
      } else {
        // Demo mode
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const name = formData.companyName.toLowerCase();
        if (name.includes('tech') || name.includes('ai') || name.includes('software')) {
          autofillData = DEMO_AUTOFILL.tech;
        } else {
          autofillData = DEMO_AUTOFILL.default;
        }
      }

      // Apply autofill data
      const newAutofilledFields = new Set<string>();
      const newFormData = { ...formData };

      (Object.keys(autofillData) as (keyof AutofillFormData)[]).forEach((key) => {
        if (autofillData[key] && !formData[key]) {
          newFormData[key] = autofillData[key] as string;
          newAutofilledFields.add(key);
        }
      });

      setFormData(newFormData);
      setAutofilledFields(newAutofilledFields);
    } finally {
      setIsAutofilling(false);
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      industry: '',
      companySize: '',
      website: '',
      description: '',
      targetAudience: '',
      challenges: '',
    });
    setAutofilledFields(new Set());
  };

  const isFieldAutofilled = (field: string) => autofilledFields.has(field);

  return (
    <Card className={cn('', className)}>
      <CardHeader
        code="0xAF"
        title="AI_AUTOFILL_FORM"
        meta={
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className={cn('h-6 px-2 text-xs', mode.radius, mode.font)}
          >
            <RotateCcw className="mr-1 size-3" />
            RESET
          </Button>
        }
      />

      <CardContent padding="md" className="space-y-4">
        {/* Company Name + Autofill Button */}
        <div className="space-y-2">
          <Label className={cn('text-xs uppercase', mode.font)}>
            [COMPANY_NAME]: <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Enter company name to autofill..."
              className={cn('flex-1 text-sm', mode.radius, mode.font)}
            />
            <Button
              size="sm"
              onClick={handleAutofill}
              disabled={!formData.companyName.trim() || isAutofilling}
              className={cn('px-4 text-xs', mode.radius, mode.font)}
            >
              {isAutofilling ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  FILLING...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  AUTOFILL
                </>
              )}
            </Button>
          </div>
          <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
            Enter a company name and click AUTOFILL to populate the form with AI
          </p>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label
            className={cn(
              'flex items-center gap-2 text-xs uppercase',
              mode.font,
              isFieldAutofilled('industry') && 'text-success'
            )}
          >
            [INDUSTRY]:
            {isFieldAutofilled('industry') && <Check className="size-3" />}
          </Label>
          <Select
            value={formData.industry}
            onValueChange={(v) => handleInputChange('industry', v)}
          >
            <SelectTrigger
              className={cn(
                'text-sm',
                mode.radius,
                mode.font,
                isFieldAutofilled('industry') && 'border-success'
              )}
            >
              <SelectValue placeholder="Select industry..." />
            </SelectTrigger>
            <SelectContent className={mode.radius}>
              {INDUSTRY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Company Size */}
        <div className="space-y-2">
          <Label
            className={cn(
              'flex items-center gap-2 text-xs uppercase',
              mode.font,
              isFieldAutofilled('companySize') && 'text-success'
            )}
          >
            [COMPANY_SIZE]:
            {isFieldAutofilled('companySize') && <Check className="size-3" />}
          </Label>
          <Select
            value={formData.companySize}
            onValueChange={(v) => handleInputChange('companySize', v)}
          >
            <SelectTrigger
              className={cn(
                'text-sm',
                mode.radius,
                mode.font,
                isFieldAutofilled('companySize') && 'border-success'
              )}
            >
              <SelectValue placeholder="Select company size..." />
            </SelectTrigger>
            <SelectContent className={mode.radius}>
              {SIZE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label
            className={cn(
              'flex items-center gap-2 text-xs uppercase',
              mode.font,
              isFieldAutofilled('website') && 'text-success'
            )}
          >
            [WEBSITE]:
            {isFieldAutofilled('website') && <Check className="size-3" />}
          </Label>
          <Input
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://..."
            className={cn(
              'text-sm',
              mode.radius,
              mode.font,
              isFieldAutofilled('website') && 'border-success'
            )}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label
            className={cn(
              'flex items-center gap-2 text-xs uppercase',
              mode.font,
              isFieldAutofilled('description') && 'text-success'
            )}
          >
            [DESCRIPTION]:
            {isFieldAutofilled('description') && <Check className="size-3" />}
          </Label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your company..."
            rows={3}
            className={cn(
              'text-sm',
              mode.radius,
              mode.font,
              isFieldAutofilled('description') && 'border-success'
            )}
          />
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <Label
            className={cn(
              'flex items-center gap-2 text-xs uppercase',
              mode.font,
              isFieldAutofilled('targetAudience') && 'text-success'
            )}
          >
            [TARGET_AUDIENCE]:
            {isFieldAutofilled('targetAudience') && <Check className="size-3" />}
          </Label>
          <Textarea
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            placeholder="Who are your customers?"
            rows={2}
            className={cn(
              'text-sm',
              mode.radius,
              mode.font,
              isFieldAutofilled('targetAudience') && 'border-success'
            )}
          />
        </div>

        {/* Challenges */}
        <div className="space-y-2">
          <Label
            className={cn(
              'flex items-center gap-2 text-xs uppercase',
              mode.font,
              isFieldAutofilled('challenges') && 'text-success'
            )}
          >
            [CHALLENGES]:
            {isFieldAutofilled('challenges') && <Check className="size-3" />}
          </Label>
          <Textarea
            value={formData.challenges}
            onChange={(e) => handleInputChange('challenges', e.target.value)}
            placeholder="What challenges does your company face?"
            rows={2}
            className={cn(
              'text-sm',
              mode.radius,
              mode.font,
              isFieldAutofilled('challenges') && 'border-success'
            )}
          />
        </div>

        {/* Submit Button */}
        <Button className={cn('w-full text-xs', mode.radius, mode.font)}>
          &gt; SUBMIT FORM
        </Button>

        {/* Status */}
        {autofilledFields.size > 0 && (
          <p className={cn('text-center text-xs', mode.font, 'text-success')}>
            [AI] {autofilledFields.size} field(s) autofilled successfully
          </p>
        )}
      </CardContent>
    </Card>
  );
}
