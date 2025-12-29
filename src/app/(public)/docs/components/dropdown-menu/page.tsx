'use client';

import { ComponentShowcaseTemplate, DocsSection, DocsCard } from '@/components/docs';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Settings,
  User,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  UserPlus,
  Keyboard,
} from 'lucide-react';
import { useState } from 'react';

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [position, setPosition] = useState('bottom');

  return (
    <ComponentShowcaseTemplate
      code="[UI.18]"
      category="Navigation"
      title="Dropdown Menu"
      description="Displays a menu to the user—such as a set of actions or functions—triggered by a button."
      importCode={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"`}
      mainPreview={{
        code: `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">&gt; OPEN MENU</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="font-semibold">
      <User className="mr-2 h-4 w-4" />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold">
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive font-semibold">
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
        preview: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">&gt; OPEN MENU</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-semibold">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive font-semibold">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }}
      variants={[
        {
          title: 'With Checkboxes',
          description: 'Menu items that can be toggled on and off',
          code: `const [showStatusBar, setShowStatusBar] = useState(true);
const [showActivityBar, setShowActivityBar] = useState(false);

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">&gt; VIEW OPTIONS</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={showStatusBar}
      onCheckedChange={setShowStatusBar}
    >
      Status Bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={showActivityBar}
      onCheckedChange={setShowActivityBar}
    >
      Activity Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`,
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">&gt; VIEW OPTIONS</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                >
                  Activity Bar
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
        {
          title: 'With Radio Group',
          description: 'Menu items for selecting one option from a group',
          code: `const [position, setPosition] = useState("bottom");

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">&gt; POSITION: {position}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">&gt; POSITION: {position}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
        {
          title: 'With Submenu',
          description: 'Nested menu items for hierarchical navigation',
          code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">&gt; ACTIONS</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem className="font-semibold">
      <Mail className="mr-2 h-4 w-4" />
      Email
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold">
      <MessageSquare className="mr-2 h-4 w-4" />
      Message
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="font-semibold">
        <UserPlus className="mr-2 h-4 w-4" />
        Invite users
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem className="font-semibold">
          <Mail className="mr-2 h-4 w-4" />
          Email
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold">
          <PlusCircle className="mr-2 h-4 w-4" />
          More...
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`,
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">&gt; ACTIONS</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem className="font-semibold">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-semibold">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite users
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className="font-semibold">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-semibold">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      More...
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
        {
          title: 'With Shortcuts',
          description: 'Display keyboard shortcuts alongside menu items',
          code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">&gt; KEYBOARD SHORTCUTS</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Commands</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="font-semibold">
      <User className="mr-2 h-4 w-4" />
      Profile
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold">
      <Settings className="mr-2 h-4 w-4" />
      Settings
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold">
      <Keyboard className="mr-2 h-4 w-4" />
      Keyboard shortcuts
      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">&gt; KEYBOARD SHORTCUTS</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Commands</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-semibold">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold">
                  <Keyboard className="mr-2 h-4 w-4" />
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ]}
      props={[
        {
          name: 'align',
          type: '"start" | "center" | "end"',
          description:
            "Horizontal alignment of the dropdown menu relative to the trigger. Use 'end' for right-aligned (table actions, navbar), 'start' for left-aligned (sidebar menus).",
          default: '"center"',
        },
        {
          name: 'sideOffset',
          type: 'number',
          description: 'Distance in pixels between the trigger and the dropdown content',
          default: '4',
        },
        {
          name: 'inset',
          type: 'boolean',
          description:
            'Adds left padding for alignment with items that have indicators (checkboxes, radio buttons)',
          default: 'false',
        },
        {
          name: 'checked',
          type: 'boolean',
          description: 'For DropdownMenuCheckboxItem - the controlled checked state',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'For DropdownMenuCheckboxItem - callback when checked state changes',
        },
        {
          name: 'value',
          type: 'string',
          description: 'For DropdownMenuRadioGroup - the value of the selected item',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'For DropdownMenuRadioGroup - callback when the selected value changes',
        },
      ]}
      accessibility={[
        'Supports keyboard navigation with arrow keys',
        'Can be opened and closed with Enter or Space when focused',
        'Escape key closes the menu',
        'Automatically manages focus when opening and closing',
        'Supports typeahead - type to focus menu items',
        'Screen readers announce menu state and selected items',
      ]}
      previous={{
        title: 'Tabs',
        href: '/docs/components/tabs',
      }}
      next={{
        title: 'Breadcrumb',
        href: '/docs/components/breadcrumb',
      }}
    >
      {/* When to Use */}
      <DocsSection title="When to Use">
        <DocsCard title="USAGE GUIDANCE">
          <div className="space-y-6">
            <div>
              <p className="text-success mb-4 text-xs font-semibold">✓ Use Dropdown Menu when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Actions menu with 3-7 related items (edit, delete, duplicate, share)
                </li>
                <li className="text-xs">• User profile menu (account, settings, logout)</li>
                <li className="text-xs">
                  • Context menu triggered by click (more options, kebab menu)
                </li>
                <li className="text-xs">
                  • Settings or view preferences (checkboxes, radio groups)
                </li>
                <li className="text-xs">
                  • Quick actions attached to specific UI elements (row actions, card actions)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-destructive mb-4 text-xs font-semibold">✗ Don&apos;t use when:</p>
              <ul className="space-y-2">
                <li className="text-xs">
                  • Primary site navigation (use Navigation component or header nav)
                </li>
                <li className="text-xs">• Less than 3 items (use individual Buttons instead)</li>
                <li className="text-xs">
                  • Complex forms or inputs needed (use Dialog or Popover)
                </li>
                <li className="text-xs">
                  • Content should always be visible (use Tabs or sections)
                </li>
                <li className="text-xs">
                  • More than 10 items (consider categorizing with separators or use Select)
                </li>
              </ul>
            </div>
            <div className="border-border border-t pt-4">
              <p className="mb-2 text-xs font-semibold">Best Practices:</p>
              <ul className="space-y-1">
                <li className="text-xs">• Group related actions with DropdownMenuSeparator</li>
                <li className="text-xs">
                  • Place destructive actions (delete, remove) at the bottom after separator
                </li>
                <li className="text-xs">
                  • Use DropdownMenuLabel for section headers (&quot;Account&quot;,
                  &quot;Settings&quot;)
                </li>
                <li className="text-xs">
                  • Add icons to menu items for quick recognition (edit icon, delete icon)
                </li>
                <li className="text-xs">
                  • Show keyboard shortcuts with DropdownMenuShortcut (⌘K, ⌘S)
                </li>
                <li className="text-xs">
                  • Use DropdownMenuCheckboxItem for toggleable options (show/hide features)
                </li>
                <li className="text-xs">
                  • Keep menu width consistent (w-56 is standard, adjust with className)
                </li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
