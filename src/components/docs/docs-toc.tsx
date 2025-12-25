/**
 * DocsToc - Table of Contents right sidebar
 * Extracts h2 headings from page content with scroll spy
 */
'use client';

import { useState, useEffect, RefObject } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface TocHeading {
  id: string;
  text: string;
}

interface DocsTocProps {
  mainRef: RefObject<HTMLElement | null>;
  className?: string;
}

export function DocsToc({ mainRef, className }: DocsTocProps) {
  const pathname = usePathname();
  const [tocHeadings, setTocHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from page content
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mainRef.current) {
        const headings = mainRef.current.querySelectorAll('h2');
        const items = Array.from(headings).map((heading) => {
          const text = heading.textContent || '';
          const id =
            heading.id ||
            text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
          if (!heading.id) {
            heading.id = id;
          }
          return { id, text };
        });
        setTocHeadings(items);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, mainRef]);

  // Scroll spy - track active section
  useEffect(() => {
    if (tocHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    // Observe all h2 headings
    tocHeadings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocHeadings]);

  return (
    <aside
      className={cn(
        'border-border bg-background sticky top-16 isolate hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-l xl:block',
        className
      )}
      aria-label="Table of contents"
    >
      <div className="p-4">
        <div className={cn('text-muted-foreground mb-4 text-sm', mode.font)}>[ON THIS PAGE]:</div>
        {tocHeadings.length > 0 ? (
          <nav>
            <ul className={cn('space-y-1 text-xs', mode.font)}>
              {tocHeadings.map((heading) => {
                const isActive = activeId === heading.id;
                return (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={cn(
                        'flex items-start gap-1 px-2 py-2 transition-colors',
                        isActive
                          ? 'border-primary bg-primary/10 text-foreground border-l-2 font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <span className="shrink-0">&gt;</span>
                      <span className="break-words">{heading.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : (
          <p className={cn('text-muted-foreground/50 px-2 text-sm', mode.font)}>
            No sections found
          </p>
        )}
      </div>
    </aside>
  );
}
