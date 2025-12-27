/**
 * List Page Template
 *
 * Reusable template for data table pages (users, orders, products, etc.).
 * Provides consistent layout with header, toolbar, table, and pagination.
 *
 * @example
 * ```tsx
 * <ListPageTemplate
 *   title="Users"
 *   columns={userColumns}
 *   data={users}
 *   searchKey="email"
 *   searchPlaceholder="Search by email..."
 *   createAction={{ label: "Add User", onClick: () => {} }}
 *   emptyState={{
 *     icon: <Users className="h-12 w-12" />,
 *     title: "No users yet",
 *     description: "Get started by creating your first user.",
 *     action: { label: "Add User", onClick: () => {} },
 *   }}
 * />
 * ```
 */

'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { DataTable } from '@/components/ui/data-table/data-table';
import { TerminalSpinner } from '@/components/ui/terminal-spinner';
import { Plus, Inbox } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export interface ListPageEmptyState {
  /** Icon displayed in the empty state */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description: string;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ListPageTemplateProps<TData, TValue = unknown> {
  // Required
  /** Page title displayed in the header */
  title: string;
  /** TanStack Table column definitions */
  columns: ColumnDef<TData, TValue>[];
  /** Table data array */
  data: TData[];

  // Toolbar
  /** Key of the column to search on */
  searchKey?: string;
  /** Placeholder text for search input */
  searchPlaceholder?: string;

  // Actions
  /** Create/Add new item action button */
  createAction?: {
    label: string;
    onClick: () => void;
  };

  // Row interaction
  /** Callback when a row is clicked */
  onRowClick?: (row: TData) => void;

  // Empty state
  /** Custom empty state configuration */
  emptyState?: ListPageEmptyState;

  // Loading
  /** Whether data is loading */
  loading?: boolean;

  // Description
  /** Optional description below the title */
  description?: string;

  // Customization
  /** Additional className for the outer container */
  className?: string;
}

// =============================================================================
// EMPTY STATE COMPONENT
// =============================================================================

interface EmptyStateProps {
  emptyState?: ListPageEmptyState;
  createAction?: {
    label: string;
    onClick: () => void;
  };
}

function EmptyState({ emptyState, createAction }: EmptyStateProps) {
  const icon = emptyState?.icon || <Inbox className="text-muted-foreground h-12 w-12" />;
  const title = emptyState?.title || 'No data';
  const description = emptyState?.description || 'No items found.';
  const action = emptyState?.action || createAction;

  return (
    <div
      className={cn(
        'border-border bg-card flex flex-col items-center justify-center border py-16',
        mode.radius
      )}
    >
      <div className="text-muted-foreground mb-4">{icon}</div>
      <h2 className={cn('mb-2 text-2xl font-semibold tracking-tight', mode.font)}>
        [{title.toUpperCase()}]
      </h2>
      <p className={cn('text-muted-foreground mb-6 max-w-sm text-center text-sm', mode.font)}>
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick}>
          <Plus className="mr-2 h-4 w-4" />
          &gt; {action.label.toUpperCase()}
        </Button>
      )}
    </div>
  );
}

// =============================================================================
// LOADING STATE COMPONENT
// =============================================================================

function LoadingState() {
  return (
    <div
      className={cn(
        'border-border bg-card flex flex-col items-center justify-center border py-16',
        mode.radius
      )}
    >
      <TerminalSpinner label="[LOADING]..." className="mb-4" />
    </div>
  );
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ListPageTemplate<TData, TValue = unknown>({
  title,
  columns,
  data,
  searchKey,
  searchPlaceholder,
  createAction,
  onRowClick,
  emptyState,
  loading = false,
  description,
  className,
}: ListPageTemplateProps<TData, TValue>) {
  const hasData = data.length > 0;

  return (
    <div className={cn('mx-auto max-w-6xl space-y-6', className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className={cn('text-4xl font-semibold tracking-tight', mode.font)}>{title}</h1>
          {description && (
            <p className={cn('text-muted-foreground text-sm', mode.font)}>{description}</p>
          )}
        </div>

        {createAction && (
          <Button onClick={createAction.onClick}>
            <Plus className="mr-2 h-4 w-4" />
            &gt; {createAction.label.toUpperCase()}
          </Button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <LoadingState />
      ) : hasData ? (
        <DataTable
          columns={columns}
          data={data}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          onRowClick={onRowClick}
        />
      ) : (
        <EmptyState emptyState={emptyState} createAction={createAction} />
      )}
    </div>
  );
}

export default ListPageTemplate;
