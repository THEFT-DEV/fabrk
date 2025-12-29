'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from '@/components/ui/pagination';

export default function PaginationPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.21]"
      category="Navigation"
      title="Pagination"
      description="Navigation for paginated content with numbered pages and next/previous controls."
      importCode={`import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"`}
      mainPreview={{
        code: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        preview: (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
      }}
      variants={[
        {
          title: 'With Ellipsis',
          description: 'Show ellipsis for large page ranges',
          code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
        {
          title: 'With First and Last',
          description: 'Include first and last page navigation buttons',
          code: `import { PaginationFirst, PaginationLast } from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationFirst href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLast href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationFirst href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
        {
          title: 'Minimal',
          description: 'Simple pagination with only previous and next buttons',
          code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <span className="text-sm text-muted-foreground px-4">
        Page 2 of 10
      </span>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-muted-foreground px-4 text-sm">Page 2 of 10</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
        {
          title: 'Compact (Icon Only)',
          description: 'Icon-only buttons for compact layouts',
          code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#" size="icon" aria-label="Page 1">
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon" isActive aria-label="Page 2, current page">
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon" aria-label="Page 3">
        3
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon" aria-label="Page 4">
        4
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon" aria-label="Page 5">
        5
      </PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" size="icon" aria-label="Page 1">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size="icon" isActive aria-label="Page 2, current page">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size="icon" aria-label="Page 3">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size="icon" aria-label="Page 4">
                    4
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size="icon" aria-label="Page 5">
                    5
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
      ]}
      props={[
        {
          name: 'isActive',
          type: 'boolean',
          description: 'For PaginationLink - marks the current active page',
          default: 'false',
        },
        {
          name: 'size',
          type: '"default" | "icon"',
          description: 'For PaginationLink - controls the button size',
          default: '"icon"',
        },
        {
          name: 'href',
          type: 'string',
          description: 'The URL to navigate to when the link is clicked',
        },
      ]}
      accessibility={[
        "Uses semantic nav element with aria-label='pagination'",
        "Active page is marked with aria-current='page'",
        'Previous/Next buttons have descriptive aria-labels',
        'First/Last buttons have descriptive aria-labels',
        'Ellipsis is hidden from screen readers with aria-hidden',
        'Keyboard navigable with Tab key',
      ]}
      previous={{
        title: 'Breadcrumb',
        href: '/docs/components/breadcrumb',
      }}
      next={{
        title: 'Components',
        href: '/docs/components',
      }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Pagination when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Large data sets with 50+ items (search results, product catalogs, user lists)
                </li>
                <li className="text-xs">
                  • User needs to browse through multiple pages of content systematically
                </li>
                <li className="text-xs">
                  • Table or grid with many rows that would cause excessive scrolling
                </li>
                <li className="text-xs">
                  • Performance benefits from loading data in chunks (API pagination)
                </li>
                <li className="text-xs">
                  • User needs to reference specific page numbers or bookmark pages
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Less than 50 items total (just show all or use &quot;Load More&quot; button)
                </li>
                <li className="text-xs">
                  • Infinite scroll is more appropriate (social media feeds, timelines)
                </li>
                <li className="text-xs">
                  • Real-time data that constantly updates (use live updating list instead)
                </li>
                <li className="text-xs">• Single page of content (no pagination needed)</li>
                <li className="text-xs">
                  • User experience benefits from continuous scrolling over page breaks
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">
                  • Show total item count (&quot;Showing 1-20 of 150 results&quot;)
                </li>
                <li className="text-xs">
                  • Previous/Next buttons always visible (disable when on first/last page)
                </li>
                <li className="text-xs">
                  • Use ellipsis (...) for long page ranges, showing 5-7 visible page numbers
                </li>
                <li className="text-xs">
                  • Consider mobile-friendly compact version (just Prev/Next + current page)
                </li>
                <li className="text-xs">• Highlight current page clearly with isActive prop</li>
                <li className="text-xs">
                  • Preserve filters/search when navigating between pages (URL query params)
                </li>
                <li className="text-xs">
                  • Add First/Last buttons for very long lists (100+ pages)
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
