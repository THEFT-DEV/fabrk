/**
 * Table columns definition for user management
 */

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Trash2, UserCog, UserX, Shield, User, Users } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from './data-table-column-header';
import type { User as UserType } from './types';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<UserType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className={mode.color.border.default}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className={mode.color.border.default}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    size: 250,
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <div
          className={cn(
            mode.font,
            'flex h-8 w-8 flex-shrink-0 items-center justify-center border text-xs font-medium',
            mode.color.border.default,
            mode.color.bg.accent,
            mode.color.text.accent
          )}
        >
          {row
            .getValue<string>('name')
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <span
          className={cn(
            mode.radius,
            mode.font,
            'max-w-[200px] truncate text-xs font-medium',
            mode.color.text.primary
          )}
        >
          {row.getValue('name')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    size: 280,
    cell: ({ row }) => (
      <span className={cn(mode.font, 'max-w-[250px] truncate text-xs', mode.color.text.muted)}>
        {row.getValue('email')}
      </span>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    size: 140,
    cell: ({ row }) => {
      const role = row.getValue<string>('role');
      const RoleIcon = role === 'ADMIN' ? Shield : role === 'USER' ? User : Users;
      const getRoleClasses = () => {
        if (role === 'ADMIN') return cn(mode.color.text.accent, mode.color.border.accent);
        if (role === 'USER') return cn(mode.color.text.primary, mode.color.border.default);
        return cn(mode.color.text.muted, mode.color.border.default);
      };
      return (
        <div className="flex">
          <span
            className={cn(
              'inline-flex w-24 items-center justify-center gap-1.5 border px-4 py-1 font-mono text-xs',
              getRoleClasses()
            )}
          >
            <RoleIcon className="h-3.5 w-3.5" />
            {role}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    size: 180,
    cell: ({ row }) => {
      const status = row.getValue<string>('status');
      const getStatusColor = () => {
        if (status === 'active') return mode.color.text.success;
        if (status === 'suspended') return mode.color.text.danger;
        return mode.color.text.muted;
      };
      return (
        <span className={cn(mode.radius, mode.font, 'text-xs font-medium', getStatusColor())}>
          {status.toUpperCase()}
        </span>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    size: 60,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                'flex h-8 w-8 items-center justify-center border',
                mode.color.border.default,
                mode.state.hover.bg
              )}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={cn(mode.radius, mode.font, 'border text-xs', mode.color.border.default)}
          >
            <DropdownMenuLabel className={mode.color.text.muted}>[ACTIONS]</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              &gt; COPY ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCog className="mr-2 h-3 w-3" />
              &gt; EDIT
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX className="mr-2 h-3 w-3" />
              &gt; SUSPEND
            </DropdownMenuItem>
            <DropdownMenuItem className={mode.color.text.danger}>
              <Trash2 className="mr-2 h-3 w-3" />
              &gt; DELETE
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
