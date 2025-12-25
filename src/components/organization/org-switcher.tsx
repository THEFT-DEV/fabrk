/**
 * ✅ FABRK COMPONENT
 * Organization Switcher Component
 * Production-ready multi-tenancy switcher for navbar
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronsUpDown, Plus, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mode } from '@/design-system';

interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  role: string;
}

interface OrgSwitcherProps {
  className?: string;
}

export function OrgSwitcher({ className }: OrgSwitcherProps) {
  const router = useRouter();
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [currentOrg, setCurrentOrg] = React.useState<Organization | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('/api/organizations');
        if (!response.ok) throw new Error('Failed to fetch organizations');

        const data = await response.json();
        setOrganizations(data.organizations || []);

        // Set current org from first org or active org from API response
        if (data.activeOrganizationId) {
          const active = data.organizations.find(
            (org: Organization) => org.id === data.activeOrganizationId
          );
          setCurrentOrg(active || data.organizations[0] || null);
        } else {
          setCurrentOrg(data.organizations[0] || null);
        }
      } catch {
        setOrganizations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSwitchOrg = async (orgId: string) => {
    try {
      const response = await fetch('/api/organizations/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: orgId }),
      });

      if (!response.ok) throw new Error('Failed to switch organization');

      const selected = organizations.find((org) => org.id === orgId);
      setCurrentOrg(selected || null);
      setOpen(false);

      // Refresh the page to update context
      router.refresh();
    } catch {
      // Silently handle errors
    }
  };

  const handleCreateOrg = () => {
    setOpen(false);
    router.push('/organizations/new');
  };

  if (loading) {
    return (
      <div
        className={cn(
          'border-border bg-card flex items-center gap-2 border px-4 py-2',
          mode.radius
        )}
      >
        <Building2 className="text-muted-foreground h-4 w-4" />
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    );
  }

  // Show personal workspace if no orgs
  if (organizations.length === 0) {
    return (
      <Button variant="outline" onClick={handleCreateOrg} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Organization
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select organization"
          className={cn(
            'border-border w-[200px] justify-between gap-2 border transition-all',
            mode.radius,
            className
          )}
        >
          {currentOrg?.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={currentOrg.logo} alt={currentOrg.name} className="h-5 w-5 rounded" />
          ) : (
            <Building2 className="text-muted-foreground h-4 w-4" />
          )}
          <span className="flex-1 truncate text-left text-sm font-medium">
            {currentOrg?.name || 'Select organization'}
          </span>
          <ChevronsUpDown className={cn('h-4 w-4 shrink-0', mode.state.muted.opacity)} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={cn('border-border w-[200px] border', mode.radius)}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Your Organizations
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onSelect={() => handleSwitchOrg(org.id)}
            className="cursor-pointer font-semibold"
          >
            <div className="flex w-full items-center gap-2">
              {org.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={org.logo} alt={org.name} className="h-5 w-5 rounded" />
              ) : (
                <Building2 className="text-muted-foreground h-4 w-4" />
              )}
              <span className="flex-1 truncate text-sm">{org.name}</span>
              {currentOrg?.id === org.id && <Check className="text-primary h-4 w-4" />}
            </div>
            {org.role && <span className="text-muted-foreground ml-auto text-xs">{org.role}</span>}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleCreateOrg}
          className="text-primary cursor-pointer font-semibold"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="text-sm">Create Organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
