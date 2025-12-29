'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { ErrorPreview } from './error-preview';
import { errorTitles, type ErrorType } from '../data/error-configs';
import { templateCode } from '../data/template-code';

interface ErrorTabContentProps {
  errorType: ErrorType;
  activePreviewTab: string;
  onPreviewTabChange: (value: string) => void;
}

export function ErrorTabContent({
  errorType,
  activePreviewTab,
  onPreviewTabChange,
}: ErrorTabContentProps) {
  return (
    <StyledTabsContent value={errorType} className="w-full max-w-full space-y-6">
      <StyledTabs
        code="0x01"
        title={errorTitles[errorType]}
        tabs={[
          { id: 'preview', label: '[PREVIEW]' },
          { id: 'code', label: '[CODE]' },
        ]}
        value={activePreviewTab}
        onValueChange={onPreviewTabChange}
        className="w-full min-w-0 overflow-hidden"
      >
        <StyledTabsContent value="preview" className="w-full max-w-full">
          <Card className="overflow-hidden">
            <CardHeader code="0x02" title="LIVE_PREVIEW" />
            <ErrorPreview errorType={errorType} />
          </Card>
        </StyledTabsContent>
        <StyledTabsContent value="code" className="w-full max-w-full">
          <Card className="overflow-hidden">
            <CardHeader code="0x02" title="SOURCE_CODE" />
            <div className="w-full max-w-full overflow-x-auto p-4">
              <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
            </div>
          </Card>
        </StyledTabsContent>
      </StyledTabs>
    </StyledTabsContent>
  );
}
