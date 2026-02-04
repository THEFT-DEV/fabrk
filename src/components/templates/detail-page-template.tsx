/**
 * Detail Page Template
 *
 * Reusable template for entity detail pages (user profile, order details, etc.).
 * Provides consistent layout with breadcrumbs, header, tabs, content, and metadata sidebar.
 *
 * @example
 * ```tsx
 * <DetailPageTemplate
 *   title="Order #12345"
 *   breadcrumbs={[
 *     { label: "Dashboard", href: "/dashboard" },
 *     { label: "Orders", href: "/orders" },
 *     { label: "#12345" },
 *   ]}
 *   actions={[
 *     { label: "Edit", onClick: () => {} },
 *     { label: "Delete", onClick: () => {}, variant: "destructive" },
 *   ]}
 *   metadata={[
 *     { label: "Status", value: <Badge>Active</Badge> },
 *     { label: "Created", value: "Dec 5, 2025" },
 *     { label: "Last Updated", value: "Dec 5, 2025" },
 *   ]}
 *   tabs={[
 *     { value: "details", label: "Details", content: <OrderDetails /> },
 *     { value: "history", label: "History", content: <OrderHistory /> },
 *   ]}
 * />
 * ```
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ChevronRight } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export interface DetailBreadcrumb {
  /** Display label */
  label: string;
  /** Optional href (not clickable if omitted) */
  href?: string;
}

export interface DetailAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'destructive';
}

export interface DetailTab {
  /** Tab value (used for state) */
  value: string;
  /** Display label */
  label: string;
  /** Tab content */
  content: React.ReactNode;
}

export interface DetailMetadata {
  /** Label text */
  label: string;
  /** Value (can be string or React node like Badge) */
  value: React.ReactNode;
}

export interface DetailPageTemplateProps {
  // Required
  /** Page title displayed in the header */
  title: string;

  // Header
  /** Breadcrumb navigation */
  breadcrumbs?: DetailBreadcrumb[];
  /** Action buttons */
  actions?: DetailAction[];

  // Content
  /** Tabbed content */
  tabs?: DetailTab[];
  /** Direct content (used when no tabs) */
  children?: React.ReactNode;

  // Sidebar
  /** Metadata items for sidebar */
  metadata?: DetailMetadata[];

  // Customization
  /** Additional className for the outer container */
  className?: string;
}

// =============================================================================
// BREADCRUMBS COMPONENT
// =============================================================================

interface BreadcrumbsProps {
  items: DetailBreadcrumb[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="text-muted-foreground h-4 w-4" />}
          {item.href ? (
            <Link
              href={item.href}
              className={cn(
                'text-muted-foreground hover:text-foreground text-sm transition-colors',
                mode.font
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn('text-foreground text-sm', mode.font)}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// =============================================================================
// METADATA SIDEBAR COMPONENT
// =============================================================================

interface MetadataSidebarProps {
  items: DetailMetadata[];
}

function MetadataSidebar({ items }: MetadataSidebarProps) {
  return (
    <aside
      className={cn(
        'border-border bg-card sticky top-6 h-fit w-80 shrink-0 space-y-4 border p-4',
        mode.radius
      )}
    >
      <div className="border-border border-b pb-2">
        <span className={cn('text-muted-foreground text-xs', mode.font)}>[ [0x00] METADATA ]</span>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-1">
            <span className={cn('text-muted-foreground text-xs', mode.font)}>
              [{item.label.toUpperCase()}]:
            </span>
            <div className={cn('text-sm', mode.font)}>{item.value}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

// =============================================================================
// TABS COMPONENT
// =============================================================================

interface TabsProps {
  tabs: DetailTab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

function TabNavigation({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-border flex gap-0 border-b">
      {tabs.map((tab, index) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'border-border -mb-px border-b-2 px-4 py-2 text-xs transition-colors',
            mode.font,
            activeTab === tab.value
              ? 'border-primary text-foreground'
              : 'text-muted-foreground hover:text-foreground border-transparent'
          )}
        >
          [ [{String(index).padStart(2, '0')}] {tab.label.toUpperCase()} ]
        </button>
      ))}
    </div>
  );
}

// =============================================================================
// COMPONENT
// =============================================================================

export function DetailPageTemplate({
  title,
  breadcrumbs,
  actions,
  tabs,
  children,
  metadata,
  className,
}: DetailPageTemplateProps) {
  const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.value ?? '');

  const activeTabContent = tabs?.find((tab) => tab.value === activeTab)?.content;
  const content = tabs ? activeTabContent : children;

  return (
    <div className={cn('mx-auto max-w-6xl space-y-6', className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

      {/* Header */}
      <div className="flex items-start justify-between">
        <h1 className={cn('text-4xl font-semibold tracking-tight', mode.font)}>{title}</h1>

        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={
                  action.variant === 'destructive'
                    ? 'destructive'
                    : action.variant === 'secondary'
                      ? 'outline'
                      : 'default'
                }
                onClick={action.onClick}
              >
                &gt; {action.label.toUpperCase()}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content + Sidebar */}
      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="min-w-0 flex-1">
          {/* Tabs */}
          {tabs && tabs.length > 0 && (
            <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          )}

          {/* Content */}
          <div className={cn(tabs ? 'pt-6' : '')}>{content}</div>
        </div>

        {/* Metadata Sidebar */}
        {metadata && metadata.length > 0 && <MetadataSidebar items={metadata} />}
      </div>
    </div>
  );
}

export default DetailPageTemplate;
