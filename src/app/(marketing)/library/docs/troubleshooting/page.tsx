/**
 * ✅ FABRK COMPONENT
 * Troubleshooting Guide
 * Common issues, errors, and solutions for library templates
 * Uses LibraryGuideTemplate for consistent structure
 */
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Terminal, Code } from 'lucide-react';
import { LibraryGuideTemplate, LibraryCodeBlock } from '@/components/library';

export default function TroubleshootingPage() {
  return (
    <LibraryGuideTemplate
      breadcrumbs={[{ label: 'Docs', href: '/library/docs' }, { label: 'Troubleshooting' }]}
      icon={AlertTriangle}
      badge="TROUBLESHOOTING"
      title="Troubleshooting"
      description="Common issues, error messages, debugging tips, and solutions for library templates."
      steps={[
        {
          code: '0x00',
          title: 'IMPORT ERRORS',
          content: (
            <>
              <div className="border-border border p-4">
                <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  [ERROR]: Cannot find module '@/design-system'
                </p>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium">Cause:</span> Design system module not set up or
                  path alias not configured.
                </p>
                <p className="text-primary mb-2 font-medium">[FIX]:</p>
                <LibraryCodeBlock
                  code={`// 1. Verify tsconfig.json has path alias
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// 2. Create design-system.ts if missing
// src/design-system.ts
export const mode = {
  font: "font-mono",
  radius: "rounded-none",
  color: {
    text: {
      muted: "text-muted-foreground",
      primary: "text-primary",
    }
  }
};`}
                  language="typescript"
                  maxHeight="300px"
                />
              </div>

              <div className="border-border border p-4">
                <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  [ERROR]: Module not found: Can't resolve '@/components/ui/...'
                </p>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium">Cause:</span> Component not installed or wrong path.
                </p>
                <p className="text-primary mb-2 font-medium">[FIX]:</p>
                <div className="text-muted-foreground space-y-2">
                  <p>
                    1. Check component exists:{' '}
                    <code className="bg-muted px-1">ls src/components/ui/</code>
                  </p>
                  <p>
                    2. Install missing component from{' '}
                    <Link href="/docs" className="text-primary hover:underline">
                      components documentation
                    </Link>
                  </p>
                  <p>3. Verify import path matches file location</p>
                </div>
              </div>
            </>
          ),
        },
        {
          code: '0x01',
          title: 'TYPESCRIPT ERRORS',
          content: (
            <>
              <div className="border-border border p-4">
                <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  [ERROR]: Property 'mode' does not exist on type '{}'
                </p>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium">Cause:</span> Design system types not exported
                  properly.
                </p>
                <p className="text-primary mb-2 font-medium">[FIX]:</p>
                <LibraryCodeBlock
                  code={`// src/design-system.ts
export const mode = {
  font: "font-mono",
  radius: "rounded-none",
  // ... rest of design system
} as const;

// Regenerate types
npm run type-check`}
                  language="typescript"
                  maxHeight="200px"
                />
              </div>

              <div className="border-border border p-4">
                <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  [ERROR]: Type 'Promise' is not assignable to type 'ReactNode'
                </p>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium">Cause:</span> Next.js 15 async params not awaited.
                </p>
                <p className="text-primary mb-2 font-medium">[FIX]:</p>
                <LibraryCodeBlock
                  code={`// ✗ Wrong
export default function Page({ params }) {
  const { id } = params; // params is Promise

// ✓ Correct
export default async function Page({ params }) {
  const { id } = await params; // Must await`}
                  language="typescript"
                  maxHeight="180px"
                />
              </div>
            </>
          ),
        },
        {
          code: '0x02',
          title: 'STYLING ISSUES',
          content: (
            <>
              <div className="border-border border p-4">
                <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  [ISSUE]: Tailwind classes not applying
                </p>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium">Cause:</span> Template path not in Tailwind config
                  content array.
                </p>
                <p className="text-primary mb-2 font-medium">[FIX]:</p>
                <LibraryCodeBlock
                  code={`// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{ts,tsx}",  // Include all template files
    "./app/**/*.{ts,tsx}",
  ],
  // ... rest of config
};

// Restart dev server
npm run dev`}
                  language="typescript"
                  maxHeight="200px"
                />
              </div>

              <div className="border-border border p-4">
                <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  [ISSUE]: Terminal aesthetic not working
                </p>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium">Cause:</span> Missing font-mono on body tag or
                  design system not imported.
                </p>
                <p className="text-primary mb-2 font-medium">[FIX]:</p>
                <LibraryCodeBlock
                  code={`// app/layout.tsx
<body className="font-mono antialiased">
  {children}
</body>

// Or in component
import { mode } from "@/design-system";

<div className={mode.font}>Content</div>`}
                  language="tsx"
                  maxHeight="200px"
                />
              </div>
            </>
          ),
        },
        {
          code: '0x03',
          title: 'RUNTIME ERRORS',
          content: (
            <>
              <div className="border-border border p-4">
                <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  [ERROR]: Hydration mismatch
                </p>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium">Cause:</span> Server and client rendering differ
                  (common with date/time or random values).
                </p>
                <p className="text-primary mb-2 font-medium">[FIX]:</p>
                <LibraryCodeBlock
                  code={`// Use suppressHydrationWarning for dynamic content
<div suppressHydrationWarning>
  {new Date().toLocaleString()}
</div>

// Or use useEffect for client-only rendering
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

if (!mounted) return null;`}
                  language="tsx"
                  maxHeight="250px"
                />
              </div>

              <div className="border-border border p-4">
                <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  [ERROR]: Too many re-renders
                </p>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium">Cause:</span> State update in render function
                  causing infinite loop.
                </p>
                <p className="text-primary mb-2 font-medium">[FIX]:</p>
                <LibraryCodeBlock
                  code={`// ✗ Wrong - causes infinite loop
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // DON'T do this

// ✓ Correct - update in effect or event handler
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []); // Run once on mount`}
                  language="tsx"
                  maxHeight="280px"
                />
              </div>
            </>
          ),
        },
        {
          code: '0x04',
          title: 'PERFORMANCE ISSUES',
          content: (
            <div className="border-border border p-4">
              <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4" />
                [ISSUE]: Template loads slowly
              </p>
              <p className="text-muted-foreground mb-4">
                <span className="font-medium">Solutions:</span>
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                <li>Use React.lazy() for heavy components</li>
                <li>Add loading states with Suspense</li>
                <li>Optimize images with next/image</li>
                <li>Reduce bundle size by removing unused imports</li>
              </ul>
            </div>
          ),
        },
        {
          code: '0x05',
          title: 'QUICK FIXES',
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium">
                  <CheckCircle className="text-success h-4 w-4" />
                  Template not showing after paste:
                </p>
                <p className="text-muted-foreground pl-6">
                  Verify route matches file location. Check for typos in directory names.
                </p>
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium">
                  <CheckCircle className="text-success h-4 w-4" />
                  Mock data still showing:
                </p>
                <p className="text-muted-foreground pl-6">
                  Replace mock data imports with real API calls or database queries.
                </p>
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium">
                  <CheckCircle className="text-success h-4 w-4" />
                  Icons not rendering:
                </p>
                <p className="text-muted-foreground pl-6">
                  Install lucide-react:{' '}
                  <code className="bg-muted px-1">npm install lucide-react</code>
                </p>
              </div>

              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium">
                  <CheckCircle className="text-success h-4 w-4" />
                  Build failing in production:
                </p>
                <p className="text-muted-foreground pl-6">
                  Run <code className="bg-muted px-1">npm run type-check</code> and fix TypeScript
                  errors before deploying.
                </p>
              </div>
            </div>
          ),
        },
        {
          code: '0x06',
          title: 'STILL STUCK?',
          content: (
            <>
              <p>If you're still experiencing issues:</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-border border p-4">
                  <Terminal className="text-primary mb-2 h-5 w-5" />
                  <p className="mb-1 font-medium">Check Console</p>
                  <p className="text-muted-foreground">
                    Open browser DevTools (F12) and check Console tab for error messages.
                  </p>
                </div>

                <div className="border-border border p-4">
                  <Code className="text-primary mb-2 h-5 w-5" />
                  <p className="mb-1 font-medium">Review Logs</p>
                  <p className="text-muted-foreground">
                    Check terminal output where dev server is running for build errors.
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 border-border border p-4">
                <p className="mb-2 font-medium">Useful debugging commands:</p>
                <LibraryCodeBlock
                  code={`# Clear cache and restart
rm -rf .next && npm run dev

# Check TypeScript errors
npm run type-check

# Verify all dependencies installed
npm install

# Check for missing peer dependencies
npm ls`}
                  language="bash"
                  maxHeight="180px"
                />
              </div>
            </>
          ),
        },
      ]}
      relatedLinks={[
        {
          label: 'Getting started guide',
          href: '/library/docs/getting-started',
          description: 'for initial setup',
        },
        {
          label: 'Customization guide',
          href: '/library/docs/customization',
          description: 'for design system changes',
        },
      ]}
    />
  );
}
