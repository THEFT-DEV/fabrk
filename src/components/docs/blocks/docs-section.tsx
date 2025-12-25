/**
 * DocsSection - Section wrapper with h2 title
 * Ensures h2 is ALWAYS outside Card components
 */

import { docsTypography } from '../typography';
import { docsSpacing } from '../spacing';

interface DocsSectionProps {
  /** Section title (displayed as h2) */
  title: string;
  /** Section content */
  children: React.ReactNode;
  /** Optional className for custom styling */
  className?: string;
}

export function DocsSection({ title, children, className }: DocsSectionProps) {
  return (
    <section className={`${docsSpacing.sectionItems} ${className || ''}`}>
      <h2 className={`uppercase ${docsTypography.h2}`}>{title}</h2>
      {children}
    </section>
  );
}
