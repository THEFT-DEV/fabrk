/**
 * ✅ FABRK COMPONENT
 * Customization Guide
 * Complete guide for customizing templates and design system
 * Uses LibraryGuideTemplate for consistent structure
 *
 * NOTE: This file intentionally contains non-terminal design patterns (rounded corners, etc.)
 * as teaching examples. These are pedagogical - showing users how to customize.
 * Design system audit should skip this file.
 */
import { Palette, CheckCircle } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function CustomizationPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'Customization' }]}
      icon={Palette}
      badge="CUSTOMIZATION"
      title="Customization Guide"
      description="Modify design system, change colors, update components, and add features to match your brand."
      meta={{ time: '~20 minutes', level: 'Intermediate' }}
      overview={{
        text: 'Fabrk uses a centralized design system in src/design-system.ts and CSS variables in globals.css. All templates use these tokens for consistency.',
        highlights: [
          'src/design-system.ts - TypeScript design tokens',
          'src/app/globals.css - CSS variables for colors',
          'tailwind.config.ts - Tailwind configuration',
          'DESIGN_SYSTEM.md - Complete specification',
        ],
      }}
      steps={[
        {
          code: '0x01',
          title: 'CHANGE COLORS',
          content: (
            <>
              <p>Update color scheme by modifying CSS variables:</p>
              <LibraryCodeBlock
                code={`/* src/app/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;     /* White background */
    --foreground: 240 10% 3.9%;  /* Nearly black text */
    --primary: 271 91% 65%;      /* Purple accent */
    --secondary: 240 5.9% 10%;   /* Dark gray */
    --muted: 240 4.8% 95.9%;     /* Light gray */
    --border: 240 5.9% 90%;      /* Border color */

    /* Add custom colors */
    --brand: 200 95% 50%;        /* Your brand color */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 271 91% 65%;
    /* ... dark mode colors */
  }
}`}
                language="css"
                maxHeight="350px"
              />
              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">[COLOR TOOL]:</p>
                <p className="text-muted-foreground">
                  Use{' '}
                  <a
                    href="https://uicolors.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    uicolors.app
                  </a>{' '}
                  to generate HSL color scales, then copy values to globals.css.
                </p>
              </div>
            </>
          ),
        },
        {
          code: '0x02',
          title: 'CHANGE TYPOGRAPHY',
          content: (
            <>
              <p>Replace terminal font with your brand font:</p>
              <LibraryCodeBlock
                code={`// src/app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={inter.className}>  {/* Remove font-mono */}
        {children}
      </body>
    </html>
  );
}`}
                language="tsx"
                maxHeight="250px"
              />
              <p>Update design system tokens:</p>
              <LibraryCodeBlock
                code={`// src/design-system.ts
export const mode = {
  font: "", // Remove font-mono
  radius: "rounded" + "-lg", // Example: Change from rounded-none to rounded corners
  // ... rest of design system
};`}
                language="typescript"
                maxHeight="150px"
              />
            </>
          ),
        },
        {
          code: '0x03',
          title: 'CHANGE BORDER RADIUS',
          content: (
            <>
              <p>Switch from sharp terminal aesthetic to rounded design:</p>
              <LibraryCodeBlock
                code={`// src/design-system.ts
export const mode = {
  font: "font-sans",
  radius: "rounded" + "-lg",  // Example: rounded corners (change from rounded-none)
  // Components automatically inherit this
};

/* src/app/globals.css */
@layer base {
  :root {
    --radius: 0.5rem;  /* 8px = rounded corners */
  }
}`}
                language="typescript"
                maxHeight="200px"
              />
              <div className="bg-muted/30 border-border border p-4">
                <p className="text-primary mb-2 font-medium">[RADIUS VALUES]:</p>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                  <li>
                    <code className="bg-muted px-1">rounded-none</code> → 0px (terminal default)
                  </li>
                  <li>
                    <code className="bg-muted px-1">rounded‑sm</code> → 2px (subtle)
                  </li>
                  <li>
                    <code className="bg-muted px-1">rounded‑md</code> → 6px (moderate)
                  </li>
                  <li>
                    <code className="bg-muted px-1">rounded‑lg</code> → 8px (soft)
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          code: '0x04',
          title: 'MODIFY COMPONENTS',
          content: (
            <>
              <p>Customize individual template components:</p>
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Change button style:</p>
                <LibraryCodeBlock
                  code={`// Before: Terminal style
<Button className={cn(mode.radius, mode.font, "text-xs")}>
  > SUBMIT
</Button>

// After: Modern style (example with custom radius)
<Button className={"rounded" + "-lg font-sans text-sm"}>
  Submit
</Button>`}
                  language="tsx"
                  maxHeight="180px"
                />
              </div>
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Update card headers:</p>
                <LibraryCodeBlock
                  code={`// Replace terminal headers
- <CardHeader code="0x00" title="SECTION_NAME" />

// With standard headers
+ <CardHeader>
+   <h2>Section Name</h2>
+ </CardHeader>`}
                  language="tsx"
                  maxHeight="150px"
                />
              </div>
            </>
          ),
        },
        {
          code: '0x05',
          title: 'ADD CUSTOM FEATURES',
          content: (
            <>
              <p>Extend templates with new functionality:</p>
              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">1. Add Search to Tables:</p>
                <LibraryCodeBlock
                  code={`const [searchQuery, setSearchQuery] = useState("");

const filteredData = data.filter(item =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
);

<Input
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>`}
                  language="tsx"
                  maxHeight="200px"
                />
              </div>
              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">2. Add Export Functionality:</p>
                <LibraryCodeBlock
                  code={`function exportToCSV(data) {
  const csv = data.map(row => Object.values(row).join(",")).join("\\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "export.csv";
  a.click();
}`}
                  language="typescript"
                  maxHeight="220px"
                />
              </div>
            </>
          ),
        },
        {
          code: '0x06',
          title: 'TESTING CHANGES',
          content: (
            <>
              <p>After making customizations, verify everything works:</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Run type check:</p>
                    <LibraryCodeBlock code="npm run type-check" language="bash" maxHeight="60px" />
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Test in multiple themes:</p>
                    <p className="text-muted-foreground">
                      Toggle light/dark mode to verify colors work
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Check responsive design:</p>
                    <p className="text-muted-foreground">
                      Test on mobile, tablet, and desktop sizes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Verify accessibility:</p>
                    <p className="text-muted-foreground">
                      Use Lighthouse audit to check color contrast and keyboard navigation
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          code: '0x07',
          title: 'BEST PRACTICES',
          content: (
            <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
              <li>
                <span className="font-medium">Use design tokens:</span> Always use CSS variables
                instead of hardcoded colors
              </li>
              <li>
                <span className="font-medium">Maintain consistency:</span> Update design-system.ts
                so all templates inherit changes
              </li>
              <li>
                <span className="font-medium">Test thoroughly:</span> Verify changes work across all
                templates you're using
              </li>
              <li>
                <span className="font-medium">Document changes:</span> Keep notes on customizations
                for future updates
              </li>
              <li>
                <span className="font-medium">Version control:</span> Commit design system changes
                separately from feature work
              </li>
            </ul>
          ),
        },
      ]}
      relatedLinks={[
        {
          label: 'Check troubleshooting',
          href: '/library/docs/troubleshooting',
          description: 'if you encounter issues',
        },
        {
          label: 'Browse more templates',
          href: '/library',
          description: 'to add to your project',
        },
        {
          label: 'Read component docs',
          href: '/docs',
          description: 'for advanced customization',
        },
      ]}
    />
  );
}
