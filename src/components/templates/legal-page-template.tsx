/**
 * Legal Page Template
 *
 * Reusable template for legal pages (Terms of Service, Privacy Policy, etc.).
 * Provides consistent layout with title, last updated date, and optional TOC.
 *
 * @example
 * ```tsx
 * <LegalPageTemplate
 *   title="Privacy Policy"
 *   lastUpdated="December 5, 2025"
 *   tableOfContents
 *   printButton
 * >
 *   <LegalSection id="introduction" title="1. Introduction">
 *     <p>This privacy policy explains how we collect...</p>
 *   </LegalSection>
 *   <LegalSection id="data-collection" title="2. Data Collection">
 *     <p>We collect the following types of data...</p>
 *   </LegalSection>
 * </LegalPageTemplate>
 * ```
 */

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Printer } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export interface LegalPageTemplateProps {
  // Required
  /** Page title */
  title: string;
  /** Last updated date string */
  lastUpdated: string;
  /** Page content (LegalSection components or prose) */
  children: React.ReactNode;

  // Optional features
  /** Show table of contents sidebar */
  tableOfContents?: boolean;
  /** Show print button */
  printButton?: boolean;
  /** TOC items (auto-generated from children if not provided) */
  tocItems?: Array<{ id: string; title: string }>;

  // Customization
  /** Additional className for the outer container */
  className?: string;
}

// =============================================================================
// TABLE OF CONTENTS COMPONENT
// =============================================================================

interface TableOfContentsProps {
  items: Array<{ id: string; title: string }>;
}

function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <aside
      className={cn(
        'border-border bg-card sticky top-6 hidden h-fit w-64 shrink-0 border p-4 lg:block',
        mode.radius
      )}
    >
      <div className="border-border mb-4 border-b pb-2">
        <span className={cn('text-muted-foreground text-xs', mode.font)}>
          [ [0x00] TABLE_OF_CONTENTS ]
        </span>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'text-muted-foreground hover:text-foreground block text-sm transition-colors',
              mode.font
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

// =============================================================================
// COMPONENT
// =============================================================================

export function LegalPageTemplate({
  title,
  lastUpdated,
  children,
  tableOfContents = false,
  printButton = false,
  tocItems = [],
  className,
}: LegalPageTemplateProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={cn('mx-auto max-w-4xl space-y-6 px-4 py-8', className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          {/* Badge */}
          <div className={cn('border-border inline-block border px-4 py-1', mode.radius)}>
            <span className={cn('text-muted-foreground text-xs', mode.font)}>
              [LEGAL]: {title.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h1 className={cn('text-4xl font-semibold tracking-tight', mode.font)}>{title}</h1>

          {/* Last Updated */}
          <p className={cn('text-muted-foreground text-sm', mode.font)}>
            [LAST_UPDATED]: {lastUpdated}
          </p>
        </div>

        {/* Print Button */}
        {printButton && (
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            &gt; PRINT
          </Button>
        )}
      </div>

      {/* Main Content + TOC */}
      <div className="flex gap-6">
        {/* Content Area */}
        <article
          className={cn(
            'prose prose-sm max-w-none min-w-0 flex-1',
            'prose-headings:font-semibold prose-headings:tracking-tight',
            'prose-p:text-muted-foreground prose-li:text-muted-foreground',
            mode.font
          )}
        >
          {children}
        </article>

        {/* Table of Contents Sidebar */}
        {tableOfContents && tocItems.length > 0 && <TableOfContents items={tocItems} />}
      </div>
    </div>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

/**
 * Legal section wrapper with terminal-style numbering
 */
export interface LegalSectionProps {
  /** Section ID (used for anchor links) */
  id: string;
  /** Section title (e.g., "1. Introduction") */
  title: string;
  /** Section content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function LegalSection({ id, title, children, className }: LegalSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-6', className)}>
      <h2 className={cn('mb-4 text-2xl font-semibold tracking-tight', mode.font)}>{title}</h2>
      <div className={cn('space-y-4 text-sm', mode.font)}>{children}</div>
    </section>
  );
}

export default LegalPageTemplate;
