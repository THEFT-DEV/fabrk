'use client';

/**
 * Form Preview Component
 * Renders a live preview of the generated form
 */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import type { GeneratedForm, FormField } from '@/lib/ai/schemas';

interface FormPreviewProps {
  form: GeneratedForm;
  className?: string;
}

function FormFieldPreview({ field }: { field: FormField }) {
  const { name, label, type, placeholder, required, options } = field;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            id={name}
            placeholder={placeholder}
            className={cn('text-sm', mode.radius, mode.font)}
            rows={4}
          />
        );

      case 'select':
        return (
          <Select>
            <SelectTrigger className={cn('text-sm', mode.radius, mode.font)}>
              <SelectValue placeholder={placeholder || `Select ${label}...`} />
            </SelectTrigger>
            <SelectContent className={mode.radius}>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={name} className={mode.radius} />
            <Label htmlFor={name} className={cn('text-sm', mode.font)}>
              {label}
            </Label>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  className="size-4"
                />
                <Label htmlFor={`${name}-${option.value}`} className={cn('text-sm', mode.font)}>
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'date':
        return <Input id={name} type="date" className={cn('text-sm', mode.radius, mode.font)} />;

      case 'time':
        return <Input id={name} type="time" className={cn('text-sm', mode.radius, mode.font)} />;

      case 'datetime':
        return (
          <Input
            id={name}
            type="datetime-local"
            className={cn('text-sm', mode.radius, mode.font)}
          />
        );

      case 'file':
        return <Input id={name} type="file" className={cn('text-sm', mode.radius, mode.font)} />;

      case 'number':
        return (
          <Input
            id={name}
            type="number"
            placeholder={placeholder}
            className={cn('text-sm', mode.radius, mode.font)}
          />
        );

      case 'email':
        return (
          <Input
            id={name}
            type="email"
            placeholder={placeholder}
            className={cn('text-sm', mode.radius, mode.font)}
          />
        );

      case 'password':
        return (
          <Input
            id={name}
            type="password"
            placeholder={placeholder}
            className={cn('text-sm', mode.radius, mode.font)}
          />
        );

      case 'tel':
        return (
          <Input
            id={name}
            type="tel"
            placeholder={placeholder}
            className={cn('text-sm', mode.radius, mode.font)}
          />
        );

      case 'url':
        return (
          <Input
            id={name}
            type="url"
            placeholder={placeholder}
            className={cn('text-sm', mode.radius, mode.font)}
          />
        );

      default:
        return (
          <Input
            id={name}
            type="text"
            placeholder={placeholder}
            className={cn('text-sm', mode.radius, mode.font)}
          />
        );
    }
  };

  // Checkbox renders its own label
  if (type === 'checkbox') {
    return <div className="space-y-2">{renderInput()}</div>;
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={cn('text-xs', mode.font)}>
        [{label.toUpperCase()}]:
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderInput()}
    </div>
  );
}

export function FormPreview({ form, className }: FormPreviewProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Preview only - no actual submission
  };

  return (
    <div className={cn('border-border bg-card border', mode.radius, className)}>
      {/* Form Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className={cn('text-sm font-semibold', mode.font)}>{form.name}</h3>
          <p className={cn('text-muted-foreground text-xs', mode.font)}>{form.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {form.fields.map((field) => (
            <FormFieldPreview key={field.name} field={field} />
          ))}

          <Button type="submit" className={cn('w-full text-xs', mode.radius, mode.font)}>
            &gt; {form.submitLabel.toUpperCase()}
          </Button>
        </form>
      </div>
    </div>
  );
}
