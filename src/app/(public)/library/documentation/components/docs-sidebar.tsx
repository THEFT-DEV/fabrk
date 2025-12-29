/**
 * ✅ FABRK COMPONENT
 * Documentation Sidebar Navigation
 * Production-ready ✓
 */

import { Badge } from '@/components/ui/badge';
import { docsStructure, docContent } from './docs-data';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface DocsSidebarProps {
  activeDoc: string;
  onDocChange: (docId: string) => void;
}

export function DocsSidebar({ activeDoc, onDocChange }: DocsSidebarProps) {
  return (
    <aside className="border-border bg-card w-64 border-r border-b">
      <nav className="space-y-6 p-4">
        {docsStructure.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx}>
              <div className="mb-4 flex items-center gap-2">
                <Icon className="text-primary h-4 w-4" />
                <h3 className={cn(mode.font, 'text-xs font-semibold')}>
                  [{section.section.toUpperCase()}]:
                </h3>
              </div>
              <ul className="space-y-1">
                {section.pages.map((page) => {
                  const hasContent = page.id in docContent;
                  return (
                    <li key={page.id}>
                      <button
                        onClick={() => hasContent && onDocChange(page.id)}
                        disabled={!hasContent}
                        className={`flex w-full items-center justify-between px-4 py-2 text-left font-mono text-xs transition-colors ${
                          activeDoc === page.id
                            ? 'bg-primary text-primary-foreground'
                            : hasContent
                              ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              : 'text-muted-foreground/50 cursor-not-allowed'
                        }`}
                      >
                        <span>{page.title}</span>
                        {page.badge && (
                          <Badge
                            variant={activeDoc === page.id ? 'secondary' : 'outline'}
                            className={cn(mode.radius, 'h-5 py-0 text-xs')}
                          >
                            {page.badge}
                          </Badge>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
