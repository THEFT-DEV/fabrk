/**
 * DocsPreview - Live component preview with code
 * Terminal-style card with single-line header
 */

import { CodeBlock } from '@/components/ui/code-block';
import { cn } from '@/lib/utils';

interface DocsPreviewProps {
  /** Preview title */
  title: string;
  /** Preview description (optional, not displayed in header) */
  description?: string;
  /** Live component to render */
  preview: React.ReactNode;
  /** Code string to display */
  code: string;
  /** Code language */
  language?: string;
  /** Hex code like "01", "0A" - defaults to "00" */
  hexCode?: string;
  /** Optional className */
  className?: string;
}

export function DocsPreview({
  title,
  preview,
  code,
  language = 'tsx',
  hexCode = '00',
  className,
}: DocsPreviewProps) {
  const headerTitle = title.toUpperCase();

  return (
    <div className={cn('border-border bg-card border', className)}>
      {/* Header - single line only */}
      <div className="border-border bg-card border-b px-4 py-2">
        <span className="text-muted-foreground font-mono text-xs">
          [ [0x{hexCode}] {headerTitle} ]
        </span>
      </div>

      {/* Live Preview */}
      <div className="terminal-preview bg-card flex min-h-[120px] items-center justify-center p-6">
        <div className="flex w-full items-center justify-center">{preview}</div>
      </div>

      {/* Code Block - CodeBlock has its own copy button */}
      <div className="border-border bg-card border-t p-4">
        <CodeBlock code={code} language={language} />
      </div>
    </div>
  );
}
