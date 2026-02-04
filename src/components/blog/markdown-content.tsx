'use client';

import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '@/components/ui/code-block';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        // Code blocks use the design system CodeBlock component
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match;

          if (isInline) {
            // Inline code
            return (
              <code
                className={cn(
                  'border border-border px-1.5 py-0.5 font-mono text-xs',
                  mode.color.bg.muted,
                  mode.color.text.primary
                )}
                {...props}
              >
                {children}
              </code>
            );
          }

          // Code block
          const codeString = String(children).replace(/\n$/, '');
          return (
            <CodeBlock
              code={codeString}
              language={match[1]}
              showLineNumbers={false}
            />
          );
        },

        // Pre wrapper - CodeBlock handles its own wrapper
        pre({ children }) {
          return <div className="my-4">{children}</div>;
        },

        // Headings
        h1({ children }) {
          return (
            <h1 className={cn('mt-8 mb-4 font-mono text-2xl font-semibold', mode.color.text.primary)}>
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h2 className={cn('mt-8 mb-4 font-mono text-xl font-semibold', mode.color.text.primary)}>
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 className={cn('mt-6 mb-3 font-mono text-lg font-medium', mode.color.text.primary)}>
              {children}
            </h3>
          );
        },

        // Paragraphs
        p({ children }) {
          return (
            <p className={cn('my-4 font-mono text-sm leading-relaxed', mode.color.text.primary)}>
              {children}
            </p>
          );
        },

        // Links
        a({ href, children }) {
          return (
            <a
              href={href}
              className={cn('underline underline-offset-2', mode.color.text.accent, 'hover:opacity-80')}
            >
              {children}
            </a>
          );
        },

        // Lists
        ul({ children }) {
          return (
            <ul className={cn('my-4 ml-6 list-disc space-y-2 font-mono text-sm', mode.color.text.primary)}>
              {children}
            </ul>
          );
        },
        ol({ children }) {
          return (
            <ol className={cn('my-4 ml-6 list-decimal space-y-2 font-mono text-sm', mode.color.text.primary)}>
              {children}
            </ol>
          );
        },
        li({ children }) {
          return <li className="leading-relaxed">{children}</li>;
        },

        // Blockquotes
        blockquote({ children }) {
          return (
            <blockquote
              className={cn(
                'my-4 border-l-2 pl-4',
                mode.color.border.accent,
                mode.color.text.muted
              )}
            >
              {children}
            </blockquote>
          );
        },

        // Horizontal rule
        hr() {
          return <hr className={cn('my-8 border-t', mode.color.border.default)} />;
        },

        // Strong/Bold
        strong({ children }) {
          return <strong className="font-semibold">{children}</strong>;
        },

        // Emphasis/Italic
        em({ children }) {
          return <em className="italic">{children}</em>;
        },

        // Tables
        table({ children }) {
          return (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse font-mono text-sm">
                {children}
              </table>
            </div>
          );
        },
        thead({ children }) {
          return <thead className={mode.color.bg.muted}>{children}</thead>;
        },
        th({ children }) {
          return (
            <th
              className={cn(
                'border px-3 py-2 text-left text-xs font-semibold uppercase',
                mode.color.border.default
              )}
            >
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className={cn('border px-3 py-2', mode.color.border.default)}>
              {children}
            </td>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
