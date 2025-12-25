'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { Card, CardHeader } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { generateZodCode, generateComponentCode } from '@/components/ai/code-viewer';
import type { GeneratedForm } from '@/lib/ai/schemas';

interface AiFormsPreviewProps {
  form: GeneratedForm;
}

export function AiFormsPreview({ form }: AiFormsPreviewProps) {
  const [activeTab, setActiveTab] = React.useState('preview');

  return (
    <StyledTabs
      code="0x01"
      title="GENERATED_OUTPUT"
      tabs={[
        { id: 'preview', label: '[PREVIEW]' },
        { id: 'schema', label: '[SCHEMA]' },
        { id: 'component', label: '[COMPONENT]' },
      ]}
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <StyledTabsContent value="preview">
        <Card>
          <CardHeader code="0x02" title="FORM_PREVIEW" />
          <div className="p-6">
            <div className="mb-6 pb-4 border-b border-dashed">
              <h3 className={cn('text-sm font-bold uppercase', mode.font)}>{form.name}</h3>
              <p className={cn('text-xs', mode.state.secondary.opacity, mode.font)}>{form.description}</p>
            </div>
            
            <form className="space-y-4 max-w-lg">
              {form.fields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className={cn('text-xs uppercase font-bold', mode.state.secondary.opacity, mode.font)}>
                    [{field.label}]
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <Textarea 
                      className={cn('bg-background', mode.radius, mode.font)} 
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className={cn(
                        'w-full border bg-background px-3 py-2 text-sm outline-none focus:border-primary',
                        mode.radius,
                        mode.font,
                        mode.color.border.default
                      )}
                    />
                  )}
                </div>
              ))}
              <Button className={cn('w-full mt-4', mode.radius, mode.font)}>
                &gt; {form.submitLabel.toUpperCase()}
              </Button>
            </form>
          </div>
        </Card>
      </StyledTabsContent>

      <StyledTabsContent value="schema">
        <Card>
          <CardHeader code="0x02" title="ZOD_SCHEMA" />
          <div className="p-4">
            <CodeBlock
              code={generateZodCode(form)}
              language="typescript"
              maxHeight="400px"
            />
          </div>
        </Card>
      </StyledTabsContent>

      <StyledTabsContent value="component">
        <Card>
          <CardHeader code="0x02" title="REACT_COMPONENT" />
          <div className="p-4">
            <CodeBlock
              code={generateComponentCode(form)}
              language="tsx"
              maxHeight="400px"
            />
          </div>
        </Card>
      </StyledTabsContent>
    </StyledTabs>
  );
}
