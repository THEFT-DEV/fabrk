'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useState } from 'react';
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';

export default function CommandPage() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentShowcaseTemplate
      code="[UI.36]"
      category="Navigation"
      title="Command"
      description="A fast, composable command menu for your application with keyboard shortcuts support."
      importCode={`import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"`}
      mainPreview={{
        preview: (
          <Command className="border-border max-w-md border">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        ),
        code: `<Command className="border border-border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar className="mr-2 h-4 w-4" />
        <span>Calendar</span>
      </CommandItem>
      <CommandItem>
        <Smile className="mr-2 h-4 w-4" />
        <span>Search Emoji</span>
      </CommandItem>
      <CommandItem>
        <Calculator className="mr-2 h-4 w-4" />
        <span>Calculator</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Billing</span>
        <CommandShortcut>⌘B</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
      }}
      variants={[
        {
          title: 'Command Dialog',
          description: 'Command menu as a modal dialog triggered by keyboard shortcut.',
          preview: (
            <div>
              <p className="text-muted-foreground mb-4 text-sm">
                Press{' '}
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-100 select-none">
                  <span className="text-xs">⌘</span>K
                </kbd>{' '}
                or click the button to open
              </p>
              <button
                onClick={() => setOpen(true)}
                className="border-border bg-background hover:bg-primary hover:text-primary-foreground inline-flex h-10 items-center justify-center border px-4 py-2 font-mono text-sm font-medium"
              >
                Open Command Menu
              </button>
              <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <Smile className="mr-2 h-4 w-4" />
                      <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                      <Calculator className="mr-2 h-4 w-4" />
                      <span>Calculator</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          ),
          code: `const [open, setOpen] = useState(false);

// Listen for keyboard shortcut
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }
  };
  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);

return (
  <>
    <button onClick={() => setOpen(true)}>
      Open Command Menu
    </button>
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </>
);`,
        },
        {
          title: 'With Multiple Groups',
          description: 'Command menu with multiple organized groups.',
          preview: (
            <Command className="border-border max-w-md border">
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Quick Actions">
                  <CommandItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>New Event</span>
                  </CommandItem>
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>New Contact</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Navigation">
                  <CommandItem>
                    <span>Dashboard</span>
                  </CommandItem>
                  <CommandItem>
                    <span>Projects</span>
                  </CommandItem>
                  <CommandItem>
                    <span>Team</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Tools">
                  <CommandItem>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculator</span>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: `<Command className="border border-border">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Quick Actions">
      <CommandItem>
        <Calendar className="mr-2 h-4 w-4" />
        <span>New Event</span>
      </CommandItem>
      <CommandItem>
        <User className="mr-2 h-4 w-4" />
        <span>New Contact</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Navigation">
      <CommandItem><span>Dashboard</span></CommandItem>
      <CommandItem><span>Projects</span></CommandItem>
      <CommandItem><span>Team</span></CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Tools">
      <CommandItem>
        <Calculator className="mr-2 h-4 w-4" />
        <span>Calculator</span>
      </CommandItem>
      <CommandItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
        },
        {
          title: 'Simple Search',
          description: 'Minimal command menu for basic search functionality.',
          preview: (
            <Command className="border-border max-w-md border">
              <CommandInput placeholder="Search files..." />
              <CommandList>
                <CommandEmpty>No files found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem>document.pdf</CommandItem>
                  <CommandItem>image.png</CommandItem>
                  <CommandItem>presentation.pptx</CommandItem>
                  <CommandItem>spreadsheet.xlsx</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
          code: `<Command className="border border-border">
  <CommandInput placeholder="Search files..." />
  <CommandList>
    <CommandEmpty>No files found.</CommandEmpty>
    <CommandGroup>
      <CommandItem>document.pdf</CommandItem>
      <CommandItem>image.png</CommandItem>
      <CommandItem>presentation.pptx</CommandItem>
      <CommandItem>spreadsheet.xlsx</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
        },
      ]}
      props={[
        {
          name: 'label',
          type: 'string',
          description: 'Accessible label for the command menu.',
        },
        {
          name: 'shouldFilter',
          type: 'boolean',
          default: 'true',
          description: 'Whether to filter items based on search input.',
        },
        {
          name: 'filter',
          type: '(value: string, search: string) => number',
          description: 'Custom filter function for items.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'The controlled selected value.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback when selected value changes.',
        },
      ]}
      usageExamples={[
        {
          title: 'Keyboard Shortcut Setup',
          description: 'Add a keyboard shortcut to open the command dialog.',
          code: `import { useEffect, useState } from "react";
import { CommandDialog } from "@/components/ui/command";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return <CommandDialog open={open} onOpenChange={setOpen}>{/* ... */}</CommandDialog>;
}`,
        },
      ]}
      accessibility={[
        'Full keyboard navigation with arrow keys',
        'Type-ahead search for quick item selection',
        'Escape key closes the command menu',
        'Proper ARIA labels and roles for screen readers',
        'Focus trap when used as a dialog',
        'Search results announced to screen readers',
      ]}
      previous={{ title: 'Sidebar', href: '/docs/components/sidebar' }}
      next={{ title: 'Toast', href: '/docs/components/toast' }}
    />
  );
}
