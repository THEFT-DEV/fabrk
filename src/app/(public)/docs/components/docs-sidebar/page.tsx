'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSidebar, type NavSection } from '@/components/docs/docs-sidebar';
import { BookOpen, Rocket, Shield } from 'lucide-react';

const exampleNavigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', href: '#overview', icon: BookOpen },
      { title: 'Quick Start', href: '#quick-start', icon: Rocket },
    ],
  },
  {
    title: 'Core Features',
    items: [
      { title: 'Authentication', href: '#authentication', icon: Shield },
    ],
  },
];

const exampleFormatSectionTitle = (title: string, index: number) => {
  const num = String(index + 1).padStart(2, '0');
  return `[${num}] ${title.toUpperCase()}`;
};

const exampleFormatItemTitle = (
  title: string,
  itemIndex: number,
  sectionIndex: number,
  subSectionIndex?: number
) => {
  if (subSectionIndex !== undefined) return title.toUpperCase(); // For nested items, no numbering

  const secNum = String(sectionIndex + 1).padStart(2, '0');
  const itemNum = itemIndex + 1;
  return `[${secNum}.${itemNum}] ${title.toUpperCase()}`;
};

export default function DocsSidebarPage() {
  return (
    <ComponentShowcaseTemplate
      code="[DOCS.SIDEBAR]"
      category="Navigation"
      title="Docs Sidebar"
      description="The intelligent, collapsible sidebar used for navigating the Fabrk documentation. Features auto-numbering, search, and collapsible sections."
      importCode={`import { DocsSidebar, type NavSection, type NavItem } from '@/components/docs/docs-sidebar';`}
      mainPreview={{
        preview: (
          <div className="border-border flex h-96 overflow-hidden border">
            <DocsSidebar
              navigation={exampleNavigation}
              formatSectionTitle={exampleFormatSectionTitle}
              formatItemTitle={exampleFormatItemTitle}
              className="static md:block" // Force visibility for preview
            />
            <div className="bg-muted/20 flex-1 p-6">
              <p className="text-muted-foreground text-sm">Main content area for docs</p>
            </div>
          </div>
        ),
        code: `// In your layout.tsx or page.tsx
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { docsNavigation } from './docs-nav-data'; // Your navigation data

// Optional: Auto-numbering formatters
const formatSectionTitle = (title, index) =>
  \`[\${String(index + 1).padStart(2, '0')}] \${title}\`;
const formatItemTitle = (title, itemIndex, sectionIndex, subSectionIndex) => {
  if (subSectionIndex !== undefined) return title;
  const secNum = String(sectionIndex + 1).padStart(2, '0');
  const itemNum = itemIndex + 1;
  return \`[\${secNum}.\${itemNum}] \${title}\`;
};

function MyDocsLayout({ children }) {
  return (
    <div className="flex">
      <DocsSidebar
        navigation={docsNavigation}
        formatSectionTitle={formatSectionTitle}
        formatItemTitle={formatItemTitle}
      />
      <main>{children}</main>
    </div>
  );
}`,
      }}
      props={[
        {
          name: 'navigation',
          type: 'NavSection[]',
          required: true,
          description: 'An array defining the structure and content of the sidebar. Each NavSection represents a collapsible group, and can contain NavItems or nested SubSections.',
        },
        {
          name: 'formatSectionTitle',
          type: '(title: string, index: number) => string',
          description: 'Optional. A function to customize the display format of section titles. Receives the raw title and its 0-based index.',
        },
        {
          name: 'formatItemTitle',
          type: '(title: string, itemIndex: number, sectionIndex: number, subSectionIndex?: number) => string',
          description: 'Optional. A function to customize the display format of item titles. Receives the raw title, its 0-based index within its parent (section or sub-section), its parent section index, and an optional sub-section index.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the sidebar container.',
        },
      ]}
      usageExamples={[
        {
          title: 'NavSection Interface',
          description: 'Structure for top-level navigation sections.',
          code: `export interface NavSection {
  title: string;          // Display title
  id?: string;            // Optional unique ID
  href?: string;          // Optional link for the section header
  icon?: LucideIcon;      // Optional icon for the section header
  items: NavItem[];       // Array of direct items within this section
  subSections?: NavSubSection[]; // Optional array of nested sub-sections
}`,
          language: 'typescript',
        },
        {
          title: 'NavItem Interface',
          description: 'Structure for individual navigation links.',
          code: `export interface NavItem {
  title: string;          // Display title
  href: string;           // Target URL
  icon: LucideIcon;       // Lucide icon component
  external?: boolean;     // True if it's an external link
}`,
          language: 'typescript',
        },
        {
          title: 'NavSubSection Interface',
          description: 'Structure for nested collapsible groups within a section.',
          code: `export interface NavSubSection {
  title: string;          // Display title for the sub-section header
  items: NavItem[];       // Array of items within this sub-section
}`,
          language: 'typescript',
        },
      ]}
      accessibility={[
        'Full keyboard navigation support (Tab, Arrows)',
        'ARIA attributes for collapsible sections and links',
        'Visible focus states on all interactive elements',
        'Optimized for screen readers',
      ]}
      previous={{ title: 'Sidebar (UI)', href: '/docs/components/sidebar' }}
      next={{ title: 'Styled Tabs', href: '/docs/components/styled-tabs' }}
    />
  );
}
