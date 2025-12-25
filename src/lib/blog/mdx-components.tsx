/**
 * MDX Components for Blog
 * Terminal-styled components for rich blog content
 */

import Link from 'next/link';
import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';

// Custom callout component for tips, warnings, etc.
function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: 'border-primary/50 bg-primary/5',
    warning: 'border-warning/50 bg-warning/5',
    error: 'border-destructive/50 bg-destructive/5',
    success: 'border-success/50 bg-success/5',
  };

  const icons = {
    info: '[i]',
    warning: '[!]',
    error: '[x]',
    success: '[✓]',
  };

  return (
    <div className={`my-6 border ${styles[type]} p-4`}>
      <div className="flex items-start gap-4">
        <span className="font-mono text-sm font-semibold">{icons[type]}</span>
        <div className="flex-1">
          {title && <p className="mb-2 font-mono text-sm font-semibold uppercase">{title}</p>}
          <div className="text-muted-foreground font-mono text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Code block with terminal styling
function CodeBlock({
  children,
  language: _language,
  filename,
}: {
  children: string;
  language?: string;
  filename?: string;
}) {
  return (
    <div className="border-border my-6 overflow-hidden border">
      {filename && (
        <div className="border-border bg-muted border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-xs">{filename}</span>
        </div>
      )}
      <pre className="bg-muted overflow-x-auto p-4">
        <code className="font-mono text-sm">{children}</code>
      </pre>
    </div>
  );
}

// Step-by-step guide component
function Steps({ children }: { children: React.ReactNode }) {
  return <div className="border-primary/30 my-6 space-y-4 border-l-2 pl-6">{children}</div>;
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="border-primary bg-background text-primary absolute -left-8 flex h-6 w-6 items-center justify-center border font-mono text-xs">
        {number}
      </div>
      <h4 className="mb-2 font-mono text-sm font-semibold uppercase">{title}</h4>
      <div className="text-muted-foreground font-mono text-sm">{children}</div>
    </div>
  );
}

// Feature comparison table
function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="border-border my-6 overflow-x-auto border">
      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="border-border bg-muted border-b">
            {headers.map((header, i) => (
              <th
                key={i}
                className="text-muted-foreground px-4 py-2 text-left text-xs font-semibold uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-border border-b last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// YouTube embed component
function YouTube({ id, title }: { id: string; title?: string }) {
  return (
    <div className="border-border my-6 aspect-video overflow-hidden border">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

// Tweet embed placeholder
function Tweet({ id }: { id: string }) {
  return (
    <div className="border-border my-6 border p-4">
      <a
        href={`https://twitter.com/i/status/${id}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-primary font-mono text-sm hover:underline"
      >
        View Tweet →
      </a>
    </div>
  );
}

// Card grid for showcasing features
function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-border bg-card border p-4">
      <h4 className="mb-2 font-mono text-sm font-semibold uppercase">{title}</h4>
      <div className="text-muted-foreground font-mono text-xs">{children}</div>
    </div>
  );
}

// Keyboard shortcut display
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-border bg-muted mx-0.5 inline-flex items-center justify-center border px-1.5 py-0.5 font-mono text-xs">
      {children}
    </kbd>
  );
}

// Terminal command display
function Terminal({ command, output }: { command: string; output?: string }) {
  return (
    <div className="border-border bg-muted my-6 overflow-hidden border">
      <div className="border-border bg-card border-b px-4 py-2">
        <span className="text-muted-foreground font-mono text-xs">[ TERMINAL ]</span>
      </div>
      <div className="p-4 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="text-primary">$</span>
          <span>{command}</span>
        </div>
        {output && <div className="text-muted-foreground mt-2">{output}</div>}
      </div>
    </div>
  );
}

// Base MDX component overrides
export const mdxComponents: MDXComponents = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-foreground mt-8 mb-6 font-mono text-4xl font-semibold uppercase first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="border-border text-foreground mt-8 mb-4 border-b pb-2 font-mono text-2xl font-semibold tracking-tight uppercase">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-foreground mt-6 mb-4 font-mono text-xl font-semibold uppercase">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-foreground mt-4 mb-2 font-mono text-sm font-semibold uppercase">
      {children}
    </h4>
  ),

  // Paragraphs and text
  p: ({ children }) => (
    <p className="text-foreground mb-4 font-mono text-sm leading-relaxed">{children}</p>
  ),
  strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,

  // Lists
  ul: ({ children }) => (
    <ul className="text-foreground mb-4 list-inside list-disc space-y-1 font-mono text-sm">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-foreground mb-4 list-inside list-decimal space-y-1 font-mono text-sm">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="ml-4">{children}</li>,

  // Links
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-primary hover:text-primary/80 underline underline-offset-2"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || '#'}
        className="text-primary hover:text-primary/80 underline underline-offset-2"
      >
        {children}
      </Link>
    );
  },

  // Code
  code: ({ children }) => (
    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="border-border bg-muted my-6 overflow-x-auto border p-4">{children}</pre>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-primary/50 bg-primary/5 my-6 border-l-4 py-2 pr-4 pl-4 font-mono text-sm italic">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <hr className="border-border my-8 border-t" />,

  // Images
  img: ({ src, alt }) => (
    <figure className="my-6">
      <div className="border-border overflow-hidden border">
        {src && (
          <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={400}
            className="w-full object-cover"
          />
        )}
      </div>
      {alt && (
        <figcaption className="text-muted-foreground mt-2 text-center font-mono text-xs">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Tables
  table: ({ children }) => (
    <div className="border-border my-6 overflow-x-auto border">
      <table className="w-full font-mono text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-border bg-muted border-b">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-border border-b last:border-0">{children}</tr>,
  th: ({ children }) => (
    <th className="text-muted-foreground px-4 py-2 text-left text-xs font-semibold uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="px-4 py-2">{children}</td>,

  // Custom components
  Callout,
  CodeBlock,
  Steps,
  Step,
  ComparisonTable,
  YouTube,
  Tweet,
  CardGrid,
  Card,
  Kbd,
  Terminal,
};
