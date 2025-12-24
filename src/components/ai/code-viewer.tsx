'use client';

/**
 * Code Viewer Component
 * Generates and displays copyable React Hook Form + Zod code
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import type { GeneratedForm, FormField } from '@/lib/ai/schemas';

interface CodeViewerProps {
  form: GeneratedForm;
  className?: string;
}

// Generate Zod schema code
export function generateZodCode(form: GeneratedForm): string {
  const lines: string[] = [
    'import { z } from "zod";',
    '',
    `export const ${form.name.charAt(0).toLowerCase() + form.name.slice(1)}Schema = z.object({`,
  ];

  form.fields.forEach((field) => {
    const zodType = getZodType(field);
    lines.push(`  ${field.name}: ${zodType},`);
  });

  lines.push('});');
  lines.push('');
  lines.push(
    `export type ${form.name}Data = z.infer<typeof ${form.name.charAt(0).toLowerCase() + form.name.slice(1)}Schema>;`
  );

  return lines.join('\n');
}

function getZodType(field: FormField): string {
  const { type, required, validation } = field;
  let zodType = 'z.string()';

  switch (type) {
    case 'email':
      zodType = 'z.string().email("Invalid email address")';
      break;
    case 'number':
      zodType = 'z.number()';
      if (validation?.min !== undefined) {
        zodType += `.min(${validation.min})`;
      }
      if (validation?.max !== undefined) {
        zodType += `.max(${validation.max})`;
      }
      break;
    case 'checkbox':
      zodType = 'z.boolean()';
      break;
    case 'url':
      zodType = 'z.string().url("Invalid URL")';
      break;
    case 'date':
    case 'time':
    case 'datetime':
      zodType = 'z.string()';
      break;
    case 'select':
    case 'radio':
      if (field.options && field.options.length > 0) {
        const values = field.options.map((o) => `"${o.value}"`).join(', ');
        zodType = `z.enum([${values}])`;
      }
      break;
    case 'password':
      zodType = 'z.string().min(8, "Password must be at least 8 characters")';
      break;
    case 'tel':
      zodType = 'z.string()';
      break;
    default:
      zodType = 'z.string()';
      if (validation?.min !== undefined) {
        zodType += `.min(${validation.min}${validation.message ? `, "${validation.message}"` : ''})`;
      }
      if (validation?.max !== undefined) {
        zodType += `.max(${validation.max})`;
      }
      if (validation?.pattern) {
        zodType += `.regex(/${validation.pattern}/)`;
      }
  }

  if (!required && type !== 'checkbox') {
    zodType += '.optional()';
  }

  return zodType;
}

// Generate React component code
export function generateComponentCode(form: GeneratedForm): string {
  const schemaName = form.name.charAt(0).toLowerCase() + form.name.slice(1) + 'Schema';
  const typeName = form.name + 'Data';

  const lines: string[] = [
    '"use client";',
    '',
    'import { useForm } from "react-hook-form";',
    'import { zodResolver } from "@hookform/resolvers/zod";',
    `import { ${schemaName}, type ${typeName} } from \"./schema\";`,
    'import { Button } from "@/components/ui/button";',
    'import { Input } from "@/components/ui/input";',
    'import { Label } from "@/components/ui/label";',
  ];

  // Add imports based on field types
  const fieldTypes = new Set(form.fields.map((f) => f.type));
  if (fieldTypes.has('textarea')) {
    lines.push('import { Textarea } from "@/components/ui/textarea";');
  }
  if (fieldTypes.has('select')) {
    lines.push(
      'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";'
    );
  }
  if (fieldTypes.has('checkbox')) {
    lines.push('import { Checkbox } from "@/components/ui/checkbox";');
  }

  lines.push('');
  lines.push(`export function ${form.name}() {`);
  lines.push('  const {');
  lines.push('    register,');
  lines.push('    handleSubmit,');
  lines.push('    formState: { errors, isSubmitting },');
  lines.push(`  } = useForm<${typeName}>({`);
  lines.push(`    resolver: zodResolver(${schemaName}),`);
  lines.push('  });');
  lines.push('');
  lines.push(`  const onSubmit = async (data: ${typeName}) => {`);

  lines.push('    ' + 'console' + '.log(data);');
  lines.push('    // TODO: Handle form submission');
  lines.push('  };');
  lines.push('');
  lines.push('  return (');
  lines.push('    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">');

  form.fields.forEach((field) => {
    lines.push(...generateFieldCode(field));
  });

  lines.push('');
  lines.push('      <Button type="submit" disabled={isSubmitting} className="w-full">');
  lines.push(`        {isSubmitting ? "Submitting..." : "${form.submitLabel}"}`);
  lines.push('      </Button>');
  lines.push('    </form>');
  lines.push('  );');
  lines.push('}');

  return lines.join('\n');
}

function generateFieldCode(field: FormField): string[] {
  const { name, label, type, placeholder, required } = field;
  const lines: string[] = [''];
  lines.push('      <div className="space-y-2">');

  if (type !== 'checkbox') {
    lines.push(`        <Label htmlFor="${name}">`);
    lines.push(
      `          ${label}${required ? ' <span className="text-destructive">*</span>' : ''}`
    );
    lines.push('        </Label>');
  }

  switch (type) {
    case 'textarea':
      lines.push(`        <Textarea`);
      lines.push(`          id="${name}"`);
      lines.push(`          {...register("${name}")}`);
      if (placeholder) lines.push(`          placeholder="${placeholder}"`);
      lines.push('        />');
      break;
    case 'checkbox':
      lines.push('        <div className="flex items-center space-x-2">');
      lines.push(`          <Checkbox id="${name}" {...register("${name}")} />`);
      lines.push(`          <Label htmlFor="${name}">${label}</Label>`);
      lines.push('        </div>');
      break;
    case 'select':
      lines.push(`        <Select>`);
      lines.push(`          <SelectTrigger>`);
      lines.push(
        `            <SelectValue placeholder="${placeholder || `Select ${label}...`}" />`
      );
      lines.push('          </SelectTrigger>');
      lines.push('          <SelectContent>');
      field.options?.forEach((opt) => {
        lines.push(`            <SelectItem value="${opt.value}">${opt.label}</SelectItem>`);
      });
      lines.push('          </SelectContent>');
      lines.push('        </Select>');
      break;
    default:
      lines.push(`        <Input`);
      lines.push(`          id="${name}"`);
      lines.push(`          type="${type}"`);
      lines.push(
        `          {...register("${name}"${type === 'number' ? ', { valueAsNumber: true }' : ''})}`
      );
      if (placeholder) lines.push(`          placeholder="${placeholder}"`);
      lines.push('        />');
  }

  lines.push(`        {errors.${name} && (`);
  lines.push('          <p className="text-sm text-destructive">{errors.' + name + '.message}</p>');
  lines.push('        )}');
  lines.push('      </div>');

  return lines;
}

export function CodeViewer({ form, className }: CodeViewerProps) {
  const zodCode = generateZodCode(form);
  const componentCode = generateComponentCode(form);

  return (
    <div
      className={cn('border-border bg-card flex h-[600px] flex-col border', mode.radius, className)}
    >
      <Tabs defaultValue="schema" className="flex h-full flex-col">
        {/* Terminal Header */}
        <CardHeader code="0x02" title="GENERATED_CODE" />

        {/* Tab Navigation */}
        <TabsList>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="component">Component</TabsTrigger>
        </TabsList>

        {/* Schema Tab Content */}
        <TabsContent value="schema" className="mt-0 flex-1 overflow-hidden">
          <div className="h-full w-full max-w-full overflow-auto p-4">
            <CodeBlock code={zodCode} language="typescript" />
          </div>
        </TabsContent>

        {/* Component Tab Content */}
        <TabsContent value="component" className="mt-0 flex-1 overflow-hidden">
          <div className="h-full w-full max-w-full overflow-auto p-4">
            <CodeBlock code={componentCode} language="tsx" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
