# Fabrk Component Library - NPM Package Publishing Guide

**Comprehensive guide for publishing the Fabrk component library to npm**

## Table of Contents

1. [Package Overview](#package-overview)
2. [Package.json Configuration](#packagejson-configuration)
3. [Build Setup](#build-setup)
4. [Export Structure](#export-structure)
5. [Dependency Management](#dependency-management)
6. [Documentation](#documentation)
7. [Ignore Configuration](#ignore-configuration)
8. [Versioning Strategy](#versioning-strategy)
9. [Publishing Checklist](#publishing-checklist)
10. [Post-Publish Verification](#post-publish-verification)

---

## Package Overview

**Fabrk UI** is a production-ready React component library with:

- **78+ components** - Comprehensive UI component set
- **TypeScript** - Full type safety with exported type definitions
- **Radix UI** - Accessible primitives for complex components
- **Tailwind CSS** - Utility-first styling with OKLCH colors
- **100% Test Coverage** - Vitest unit tests + Playwright E2E
- **12 Theme Variations** - Green, Amber, Blue, Red, Purple + Retro: Game Boy, C64, GB Pocket, VIC-20, Atari, Spectrum, B&W
- **Component Showcase** - Interactive documentation at /components
- **Accessibility** - WCAG 2.1 AA compliant with axe-core testing

---

## Package.json Configuration

### 1. Create Package-Specific package.json

Create `packages/fabrk-ui/package.json`:

```json
{
  "name": "@fabrk/ui",
  "version": "1.0.0",
  "description": "Production-ready React component library with Radix UI, Tailwind CSS, and OKLCH theming",
  "author": "Fabrk <hello@fabrk.io>",
  "license": "MIT",
  "homepage": "https://fabrk.io",
  "repository": {
    "type": "git",
    "url": "https://github.com/fabrk/ui.git"
  },
  "bugs": {
    "url": "https://github.com/fabrk/ui/issues"
  },
  "keywords": [
    "react",
    "react-components",
    "ui",
    "design-system",
    "radix-ui",
    "tailwind",
    "tailwindcss",
    "typescript",
    "oklch",
    "theming",
    "accessibility",
    "a11y",
    "component-library"
  ],
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./components/*": {
      "types": "./dist/components/*.d.ts",
      "import": "./dist/components/*.mjs",
      "require": "./dist/components/*.js"
    },
    "./styles.css": "./dist/styles.css",
    "./themes": {
      "types": "./dist/themes/index.d.ts",
      "import": "./dist/themes/index.mjs",
      "require": "./dist/themes/index.js"
    },
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "sideEffects": [
    "*.css"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src",
    "test": "vitest run",
    "test:watch": "vitest watch",
    "prepublishOnly": "npm run build && npm run typecheck && npm run test"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "tailwindcss": "^4.0.0"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-icons": "^1.3.2",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.553.0",
    "react-colorful": "^5.6.1",
    "react-day-picker": "^9.11.1",
    "react-hook-form": "^7.65.0",
    "recharts": "^3.4.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.3",
    "@types/react-dom": "^19.2.3",
    "@typescript-eslint/eslint-plugin": "^8.46.3",
    "@typescript-eslint/parser": "^8.46.3",
    "@vitejs/plugin-react": "^5.1.1",
    "@vitest/coverage-v8": "^4.0.8",
    "autoprefixer": "^10.4.22",
    "eslint": "^9.39.1",
    "jsdom": "^27.2.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^4.0.9",
    "tsup": "^8.3.5",
    "typescript": "^5.7.2",
    "vitest": "^4.0.8"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 2. Key Configuration Decisions

**Package Scope**: `@fabrk/ui`
- Scoped packages are namespaced under your organization
- Prevents name collisions
- Professional branding

**Dual Format Export**: CJS + ESM
- `main`: CommonJS for Node.js compatibility
- `module`: ES Modules for tree-shaking
- `types`: TypeScript definitions

**Conditional Exports**:
```json
"exports": {
  ".": "./dist/index.js",              // Default import
  "./components/*": "./dist/components/*.js",  // Individual components
  "./styles.css": "./dist/styles.css", // CSS import
  "./themes": "./dist/themes/index.js" // Theme utilities
}
```

**Side Effects**:
```json
"sideEffects": ["*.css"]
```
- Tells bundlers CSS files have side effects (don't tree-shake them)
- All JS files are pure (safe to tree-shake)

---

## Build Setup

### 1. Install tsup (Recommended Bundler)

tsup is a zero-config TypeScript bundler powered by esbuild:

```bash
npm install -D tsup
```

**Why tsup?**
- Fast (esbuild-powered)
- Zero config for most use cases
- Dual format output (CJS + ESM)
- Automatic type definition generation
- CSS bundling support

### 2. Create tsup.config.ts

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  // Entry points
  entry: {
    index: "src/components/ui/index.ts",
    themes: "src/lib/themes/index.ts",
  },

  // Output formats
  format: ["cjs", "esm"],

  // Generate TypeScript definitions
  dts: true,

  // Code splitting for better tree-shaking
  splitting: true,

  // Source maps for debugging
  sourcemap: true,

  // Clean dist before build
  clean: true,

  // Minify production builds
  minify: false, // Set to true for production

  // External dependencies (don't bundle)
  external: [
    "react",
    "react-dom",
    "tailwindcss",
    "@radix-ui/*",
  ],

  // Copy CSS files
  loader: {
    ".css": "copy",
  },

  // esbuild options
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";', // Mark as React Client Components
    };
  },

  // Output settings
  outDir: "dist",
  target: "es2020",
  platform: "browser",

  // Tree-shaking
  treeshake: true,

  // Watch mode
  watch: process.env.NODE_ENV === "development",
});
```

### 3. Alternative: Rollup Configuration

If you prefer Rollup (more granular control):

```bash
npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-postcss rollup-plugin-peer-deps-external
```

Create `rollup.config.mjs`:

```javascript
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/components/ui/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      banner: '"use client";',
    },
    {
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
      banner: '"use client";',
    },
  ],
  plugins: [
    peerDepsExternal(), // Externalize peer dependencies
    resolve(), // Resolve node_modules
    commonjs(), // Convert CJS to ESM
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "./dist",
    }),
    postcss({
      extract: "styles.css",
      minimize: true,
      modules: false,
    }),
  ],
  external: [
    "react",
    "react-dom",
    "tailwindcss",
    /^@radix-ui\//,
  ],
});
```

### 4. Create tsconfig.build.json

Separate TypeScript config for building:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": false,
    "noEmit": false,
    "incremental": false,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  },
  "include": [
    "src/components/ui/**/*",
    "src/lib/utils.ts",
    "src/lib/themes/**/*"
  ],
  "exclude": [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "node_modules",
    "dist"
  ]
}
```

### 5. Build Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "build": "npm run build:clean && npm run build:bundle && npm run build:css",
    "build:clean": "rm -rf dist",
    "build:bundle": "tsup",
    "build:css": "npm run build:css:compile && npm run build:css:optimize",
    "build:css:compile": "postcss src/app/globals.css -o dist/styles.css",
    "build:css:optimize": "postcss dist/styles.css -o dist/styles.css --no-map",
    "dev": "tsup --watch",
    "prepublishOnly": "npm run build && npm run typecheck && npm run test"
  }
}
```

### 6. PostCSS Configuration

Create `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
```

---

## Export Structure

### 1. Create Main Entry Point

Create `src/components/ui/index.ts`:

```typescript
// Layout Components
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
export { Alert, AlertTitle, AlertDescription } from "./alert";
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
export { AspectRatio } from "./aspect-ratio";
export { Avatar, AvatarImage, AvatarFallback } from "./avatar";

// Form Components
export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";
export { Checkbox } from "./checkbox";
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "./form";
export { Input } from "./input";
export type { InputProps } from "./input";
export { Label } from "./label";
export { RadioGroup, RadioGroupItem } from "./radio-group";
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "./select";
export { Switch } from "./switch";
export { Textarea } from "./textarea";

// Navigation Components
export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "./command";
export { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "./context-menu";
export { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./dropdown-menu";
export { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "./menubar";
export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./navigation-menu";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

// Feedback Components
export { Badge, badgeVariants } from "./badge";
export type { BadgeProps } from "./badge";
export { Progress } from "./progress";
export { Skeleton } from "./skeleton";
export { Spinner } from "./spinner";
export { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast";
export { Toaster } from "./toaster";
export { useToast, toast } from "./use-toast";

// Overlay Components
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
export { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
export { Popover, PopoverContent, PopoverTrigger } from "./popover";
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

// Data Display Components
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
export { ScrollArea, ScrollBar } from "./scroll-area";
export { Separator } from "./separator";
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./table";

// Utility Components
export { Calendar } from "./calendar";
export { DatePicker } from "./date-picker";
export { DateRangePicker } from "./date-range-picker";
export { Slider } from "./slider";
export { Combobox } from "./combobox";
export { MultiSelect } from "./multi-select";
export { ColorPicker } from "./color-picker";
export { ImageUploader } from "./image-uploader";
export { OTPInput } from "./otp-input";
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";
export { Rating } from "./rating";
export { Stepper, Step } from "./stepper";

// Chart Components
export { DonutChart } from "./donut-chart";
export { FunnelChart } from "./funnel-chart";
export { Gauge } from "./gauge";
export { Heatmap } from "./heatmap";
export { PieChart } from "./pie-chart";
export { Sparkline } from "./sparkline";

// Complex Components
export { ActivityTimeline, TimelineItem } from "./activity-timeline";
export { Banner } from "./banner";
export { ChatInput } from "./chat-input";
export { ChatMessage } from "./chat-message";
export { CheckoutForm } from "./checkout-form";
export { CommentThread } from "./comment-thread";
export { EmptyState } from "./empty-state";
export { InviteForm } from "./invite-form";
export { KanbanBoard, KanbanColumn, KanbanCard } from "./kanban-board";
export { Lightbox } from "./lightbox";
export { MarkdownEditor } from "./markdown-editor";
export { MemberCard } from "./member-card";
export { NotificationBadge } from "./notification-badge";
export { NotificationCenter } from "./notification-center";
export { PageWrapper } from "./page-wrapper";
export { ProductCard } from "./product-card";
export { ResizablePanel } from "./resizable-panel";
export { RichTextEditor } from "./rich-text-editor";
export { RoleSelector } from "./role-selector";
export { ShoppingCart, CartItem } from "./shopping-cart";
export { Sidebar, SidebarItem, SidebarSection } from "./sidebar";
export { SimpleIcon } from "./simple-icon";
export { SplitView } from "./split-view";
export { StatusIndicator } from "./status-indicator";
export { TreeView, TreeNode } from "./tree-view";
export { VideoPlayer } from "./video-player";
export { VirtualList } from "./virtual-list";

// Utilities
export { cn } from "../../lib/utils";
```

### 2. Create Theme Exports

Create `src/lib/themes/index.ts`:

```typescript
/**
 * Fabrk UI Theme System
 * OKLCH-based color themes with design tokens
 */

export type ThemeName = "purple" | "ocean" | "forest" | "sunset" | "pink" | "ruby";

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
}

export const themes: Record<ThemeName, Theme> = {
  purple: {
    name: "purple",
    displayName: "Purple",
    colors: {
      light: {
        background: "oklch(95.16% 0.0242 343.23)",
        foreground: "oklch(0% 0 0)",
        primary: "oklch(71.5% 0.197 354.23)",
        primaryForeground: "oklch(0% 0 0)",
        secondary: "oklch(95% 0.02 270)",
        secondaryForeground: "oklch(20% 0 0)",
        accent: "oklch(85% 0.15 120)",
        accentForeground: "oklch(20% 0 0)",
        destructive: "oklch(60% 0.22 25)",
        destructiveForeground: "oklch(100% 0 0)",
        muted: "oklch(92% 0.01 270)",
        mutedForeground: "oklch(45% 0.01 270)",
        border: "oklch(0% 0 0)",
        ring: "oklch(0% 0 0)",
      },
      dark: {
        background: "oklch(26.3% 0.054 358.23)",
        foreground: "oklch(92.49% 0 0)",
        primary: "oklch(65.98% 0.2407 358.64)",
        primaryForeground: "oklch(0% 0 0)",
        secondary: "oklch(30% 0.02 270)",
        secondaryForeground: "oklch(90% 0 0)",
        accent: "oklch(75% 0.15 120)",
        accentForeground: "oklch(20% 0 0)",
        destructive: "oklch(60% 0.22 25)",
        destructiveForeground: "oklch(100% 0 0)",
        muted: "oklch(35% 0.01 270)",
        mutedForeground: "oklch(65% 0.01 270)",
        border: "oklch(100% 0 0)",
        ring: "oklch(100% 0 0)",
      },
    },
  },
  // Add other themes...
};

/**
 * Apply theme to root element
 */
export function applyTheme(themeName: ThemeName, mode: "light" | "dark" = "light") {
  const theme = themes[themeName];
  if (!theme) {
    console.error(`Theme "${themeName}" not found`);
    return;
  }

  const root = document.documentElement;
  const colors = theme.colors[mode];

  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
}

/**
 * Get theme colors for a specific theme and mode
 */
export function getThemeColors(themeName: ThemeName, mode: "light" | "dark" = "light"): ThemeColors {
  return themes[themeName].colors[mode];
}

/**
 * Get all available themes
 */
export function getAvailableThemes(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}

export default themes;
```

### 3. Individual Component Exports

Each component should export both the component and its types:

```typescript
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground...",
        // ...
      },
      size: {
        default: "h-10 px-4 py-2",
        // ...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

---

## Dependency Management

### Peer Dependencies vs Dependencies

Understanding the difference is critical for component libraries:

#### Peer Dependencies (Don't Bundle)

These packages should be installed by the consumer:

```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "tailwindcss": "^4.0.0"
}
```

**Why?**
- **Singleton requirement**: React must be a single instance
- **Version conflicts**: Consumer controls React version
- **Bundle size**: Don't ship React with your library
- **Styling framework**: Tailwind must be configured by consumer

#### Regular Dependencies (Bundle)

These packages are bundled with your library:

```json
"dependencies": {
  "@radix-ui/react-accordion": "^1.2.12",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "lucide-react": "^0.553.0",
  "tailwind-merge": "^3.4.0",
  "date-fns": "^4.1.0",
  "framer-motion": "^12.23.24",
  "recharts": "^3.4.1",
  "sonner": "^2.0.7",
  "zod": "^4.1.12"
}
```

**Why?**
- **Library-specific**: Only your library uses these
- **API surface**: Part of your component API
- **Version control**: You control compatibility
- **Convenience**: Consumers don't install separately

#### Dev Dependencies (Build-Time Only)

These are only needed during development/build:

```json
"devDependencies": {
  "@types/node": "^24.10.1",
  "@types/react": "^19.2.3",
  "typescript": "^5.7.2",
  "tsup": "^8.3.5",
  "vitest": "^4.0.8",
  "eslint": "^9.39.1",
  "autoprefixer": "^10.4.22",
  "postcss": "^8.4.49"
}
```

### Dependency Decision Matrix

| Package Type | Where to Put It | Why |
|--------------|-----------------|-----|
| React core | peerDependencies | Singleton requirement |
| Tailwind CSS | peerDependencies | Must be configured by consumer |
| Radix UI primitives | dependencies | Part of component API |
| Utility libraries (clsx, cn) | dependencies | Internal implementation |
| Animation libraries (framer-motion) | dependencies | Component features |
| Type definitions (@types/*) | devDependencies | Build-time only |
| Build tools (tsup, rollup) | devDependencies | Build-time only |
| Testing tools (vitest, playwright) | devDependencies | Development only |

### Optional Dependencies

For features that aren't required:

```json
"optionalDependencies": {
  "recharts": "^3.4.1"
}
```

Document in README:
```markdown
## Optional Features

Some components require additional dependencies:

- **Charts** (DonutChart, Sparkline, etc.): `npm install recharts`
- **Rich Text Editor**: `npm install @tiptap/react`
```

---

## Documentation

### 1. Create NPM README.md

Create `packages/fabrk-ui/README.md`:

```markdown
# @fabrk/ui

Production-ready React component library with 83 accessible components, Radix UI primitives, and OKLCH theming.

## Features

- 🎨 **78+ components** - Comprehensive UI component library
- ♿ **Accessible** - WCAG 2.1 AA compliant with Radix UI
- 🎭 **18 Themes** - Green, Amber, Blue, Red, Purple, Game Boy, C64, GB Pocket, VIC-20, Atari, Spectrum, B&W
- 🎯 **TypeScript** - Full type safety with exported definitions
- 🌳 **Tree-shakeable** - Optimized bundle size with ESM
- 📱 **Responsive** - Mobile-first design
- 🎨 **Customizable** - Tailwind CSS with OKLCH colors
- 🧪 **Tested** - 100% test coverage with Vitest

## Installation

```bash
npm install @fabrk/ui
```

### Peer Dependencies

Install required peer dependencies:

```bash
npm install react react-dom tailwindcss
```

## Quick Start

### 1. Import CSS

Add to your main CSS file:

```css
@import "@fabrk/ui/styles.css";
```

### 2. Configure Tailwind

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@fabrk/ui/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 3. Use Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@fabrk/ui";

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello Fabrk</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Component Categories

### Layout
- Accordion, Alert, Card, Separator, Tabs, Sheet

### Forms
- Button, Input, Textarea, Select, Checkbox, Radio, Switch, Form

### Navigation
- Breadcrumb, Command, Dropdown Menu, Navigation Menu, Tabs

### Feedback
- Badge, Toast, Progress, Skeleton, Alert Dialog

### Data Display
- Table, Avatar, Calendar, Date Picker, Slider

### Charts
- Donut Chart, Pie Chart, Sparkline, Gauge, Heatmap, Funnel Chart

### Complex
- Shopping Cart, Kanban Board, Rich Text Editor, Video Player

## Theming

Apply a theme programmatically:

```tsx
import { applyTheme } from "@fabrk/ui/themes";

// Apply theme
applyTheme("ocean", "light");

// Switch to dark mode
applyTheme("ocean", "dark");
```

Available themes:
- `purple` (default)
- `ocean`
- `forest`
- `sunset`
- `pink`
- `ruby`

## TypeScript

All components are fully typed:

```tsx
import { Button, type ButtonProps } from "@fabrk/ui";

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="destructive" size="lg" {...props} />;
};
```

## Tree Shaking

Import only what you need:

```tsx
// ✅ Tree-shakeable - only Button is bundled
import { Button } from "@fabrk/ui";

// ❌ Not recommended - imports entire library
import * as FabrkUI from "@fabrk/ui";
```

## Accessibility

All components follow WCAG 2.1 AA standards:
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes
- Color contrast

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT © Fabrk

## Links

- [Documentation](https://fabrk.io/docs)
- [Component Showcase](https://fabrk.io/components)
- [GitHub](https://github.com/fabrk/ui)
- [NPM](https://www.npmjs.com/package/@fabrk/ui)
```

### 2. Create CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-14

### Added
- Initial release of @fabrk/ui
- 78 production-ready components
- 6 OKLCH color themes
- Full TypeScript support
- Tree-shakeable ESM/CJS builds
- Comprehensive component documentation
- 100% test coverage
- Accessibility testing with axe-core

### Components
- Layout: Accordion, Alert, Card, Separator, Tabs, Sheet
- Forms: Button, Input, Select, Checkbox, Radio, Switch, Form
- Navigation: Breadcrumb, Command, Dropdown Menu, Navigation Menu
- Feedback: Badge, Toast, Progress, Skeleton, Alert Dialog
- Data Display: Table, Avatar, Calendar, Date Picker, Slider
- Charts: Donut, Pie, Sparkline, Gauge, Heatmap, Funnel
- Complex: Shopping Cart, Kanban Board, Rich Text Editor

[1.0.0]: https://github.com/fabrk/ui/releases/tag/v1.0.0
```

### 3. Create LICENSE

```
MIT License

Copyright (c) 2025 Fabrk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Ignore Configuration

### 1. Create .npmignore

`.npmignore` controls which files are published to npm:

```
# Source files (only ship dist)
src/
tests/
**/*.test.ts
**/*.test.tsx
**/*.spec.ts
**/*.spec.tsx
**/*.stories.tsx

# Build artifacts
.next/
.turbo/
node_modules/
coverage/
.nyc_output/

# Config files
.env
.env.*
!.env.example
.eslintrc.*
.prettierrc
.prettierignore
tsconfig.json
tsconfig.build.json
tsup.config.ts
rollup.config.mjs
vitest.config.ts
playwright.config.ts

# Development files
.vscode/
.idea/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store

# Documentation (keep README.md, LICENSE, CHANGELOG.md)
docs/

# CI/CD
.github/
.gitlab-ci.yml
.circleci/
.travis.yml

# Git
.git/
.gitignore
.gitattributes

# Misc
*.tgz
archive/
backups/
scripts/
```

### 2. Verify Package Contents

Before publishing, check what will be included:

```bash
npm pack --dry-run
```

Expected output:
```
npm notice package: @fabrk/ui@1.0.0
npm notice === Tarball Contents ===
npm notice 1.2kB  package.json
npm notice 3.4kB  README.md
npm notice 1.1kB  LICENSE
npm notice 892B   CHANGELOG.md
npm notice 142kB  dist/index.js
npm notice 138kB  dist/index.mjs
npm notice 12kB   dist/index.d.ts
npm notice 45kB   dist/styles.css
npm notice 2.3kB  dist/themes/index.js
npm notice === Tarball Details ===
npm notice name:          @fabrk/ui
npm notice version:       1.0.0
npm notice filename:      fabrk-ui-1.0.0.tgz
npm notice package size:  89.4 kB
npm notice unpacked size: 346.2 kB
npm notice total files:   42
```

---

## Versioning Strategy

### Semantic Versioning (SemVer)

Follow [Semantic Versioning 2.0.0](https://semver.org/):

**Format**: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes (backward compatible)

### Version Examples

#### Patch Release (1.0.0 → 1.0.1)
- Bug fixes
- Documentation updates
- Internal refactoring (no API changes)
- Performance improvements

```bash
npm version patch
# 1.0.0 → 1.0.1
```

#### Minor Release (1.0.0 → 1.1.0)
- New components added
- New component variants
- New props (with defaults)
- New features (backward compatible)

```bash
npm version minor
# 1.0.0 → 1.1.0
```

#### Major Release (1.0.0 → 2.0.0)
- Removing components
- Removing props
- Changing prop types
- Renaming exports
- Breaking API changes

```bash
npm version major
# 1.0.0 → 2.0.0
```

### Pre-release Versions

For testing before official release:

```bash
# Alpha (early testing)
npm version 1.1.0-alpha.0
npm publish --tag alpha

# Beta (feature complete, testing)
npm version 1.1.0-beta.0
npm publish --tag beta

# Release Candidate (final testing)
npm version 1.1.0-rc.0
npm publish --tag rc

# Stable release
npm version 1.1.0
npm publish --tag latest
```

### Version Commit Messages

`npm version` automatically creates git commits:

```bash
npm version patch -m "chore: release v%s"
# Commit message: "chore: release v1.0.1"

npm version minor -m "feat: release v%s"
# Commit message: "feat: release v1.1.0"

npm version major -m "feat!: release v%s (BREAKING CHANGE)"
# Commit message: "feat!: release v2.0.0 (BREAKING CHANGE)"
```

### Automated Versioning with Changesets

For monorepos or complex versioning:

```bash
npm install -D @changesets/cli
npx changeset init
```

Create `.changeset/config.json`:

```json
{
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

Workflow:
```bash
# 1. Create changeset
npx changeset
# Follow prompts to document changes

# 2. Version packages
npx changeset version
# Updates version + CHANGELOG.md

# 3. Publish
npx changeset publish
```

---

## Publishing Checklist

### Pre-Publish Checklist

- [ ] **1. Version Bump**
  ```bash
  npm version [major|minor|patch]
  ```

- [ ] **2. Run Tests**
  ```bash
  npm run test
  npm run test:e2e
  npm run test:a11y
  ```

- [ ] **3. Type Check**
  ```bash
  npm run typecheck
  ```

- [ ] **4. Lint**
  ```bash
  npm run lint
  ```

- [ ] **5. Build**
  ```bash
  npm run build
  ```

- [ ] **6. Verify Build Output**
  ```bash
  ls -la dist/
  # Check for: index.js, index.mjs, index.d.ts, styles.css
  ```

- [ ] **7. Test Package Locally**
  ```bash
  npm pack
  # Creates fabrk-ui-1.0.0.tgz

  # Test in another project
  cd /path/to/test-project
  npm install /path/to/fabrk-ui-1.0.0.tgz
  ```

- [ ] **8. Verify Package Contents**
  ```bash
  npm pack --dry-run
  # Review file list
  ```

- [ ] **9. Update Documentation**
  - [ ] README.md updated
  - [ ] CHANGELOG.md has release notes
  - [ ] Migration guide for breaking changes (if MAJOR)

- [ ] **10. Git Status Clean**
  ```bash
  git status
  # No uncommitted changes
  ```

- [ ] **11. Create Git Tag**
  ```bash
  git tag -a v1.0.0 -m "Release v1.0.0"
  git push origin main --tags
  ```

### Publishing Commands

#### First Time Setup

```bash
# 1. Login to npm
npm login

# 2. Verify account
npm whoami

# 3. Set registry (if using private registry)
npm config set registry https://registry.npmjs.org/
```

#### Publish to NPM

```bash
# 1. Dry run (simulates publish)
npm publish --dry-run

# 2. Publish (public scoped package)
npm publish --access public

# 3. Publish with tag
npm publish --tag beta
```

#### Publishing Script

Add to `package.json`:

```json
{
  "scripts": {
    "prepublishOnly": "npm run build && npm run typecheck && npm run test",
    "postpublish": "git push && git push --tags",
    "release": "npm run build && npm version patch && npm publish --access public",
    "release:minor": "npm run build && npm version minor && npm publish --access public",
    "release:major": "npm run build && npm version major && npm publish --access public"
  }
}
```

Usage:
```bash
npm run release        # Patch release
npm run release:minor  # Minor release
npm run release:major  # Major release
```

### Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

Setup:
1. Create NPM token: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Add to GitHub Secrets: Settings → Secrets → Actions → New repository secret
   - Name: `NPM_TOKEN`
   - Value: `npm_xxx...`

---

## Post-Publish Verification

### 1. Verify on NPM Registry

Visit: `https://www.npmjs.com/package/@fabrk/ui`

Check:
- [ ] Package page loads
- [ ] Version number is correct
- [ ] README displays correctly
- [ ] All files are listed

### 2. Install in Test Project

```bash
# Create test project
npx create-next-app@latest test-fabrk-ui
cd test-fabrk-ui

# Install published package
npm install @fabrk/ui

# Verify installation
npm list @fabrk/ui
```

### 3. Test Imports

Create `app/test-page.tsx`:

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@fabrk/ui";
import "@fabrk/ui/styles.css";

export default function TestPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test @fabrk/ui</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

Run dev server:
```bash
npm run dev
```

Verify:
- [ ] No import errors
- [ ] Components render correctly
- [ ] Styles are applied
- [ ] TypeScript types work
- [ ] No console errors

### 4. Test Tree Shaking

Check bundle size:

```bash
npm run build
# Check .next/static/chunks for bundle size
```

### 5. Test TypeScript Types

Create `test-types.ts`:

```typescript
import { Button, type ButtonProps } from "@fabrk/ui";

const props: ButtonProps = {
  variant: "default",
  size: "lg",
  onClick: () => console.log("clicked"),
};

// Should show autocomplete for variants
const button = <Button variant="destructive" size="sm" />;
```

Verify:
- [ ] TypeScript autocomplete works
- [ ] Type errors show for invalid props
- [ ] Exported types are available

### 6. Check Package Unpacked

```bash
npm pack
tar -xvzf fabrk-ui-1.0.0.tgz
cd package
ls -la

# Verify structure:
# package/
# ├── dist/
# │   ├── index.js
# │   ├── index.mjs
# │   ├── index.d.ts
# │   └── styles.css
# ├── package.json
# ├── README.md
# ├── LICENSE
# └── CHANGELOG.md
```

### 7. Test CDN Access

Packages on npm are automatically available via CDN:

```html
<!-- unpkg -->
<link rel="stylesheet" href="https://unpkg.com/@fabrk/ui@1.0.0/dist/styles.css">

<!-- jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fabrk/ui@1.0.0/dist/styles.css">
```

### 8. Monitor Download Stats

Check download stats:
```bash
npm info @fabrk/ui

# Or visit:
# https://npm-stat.com/charts.html?package=@fabrk/ui
```

### 9. Update Documentation

After successful publish:

- [ ] Update homepage with new version
- [ ] Update component showcase
- [ ] Update GitHub README badges
- [ ] Announce on social media
- [ ] Update internal documentation

### 10. Create GitHub Release

```bash
# Create release notes
gh release create v1.0.0 \
  --title "v1.0.0 - Initial Release" \
  --notes "See CHANGELOG.md for details"
```

Or manually:
1. Go to GitHub → Releases → Draft a new release
2. Choose tag: `v1.0.0`
3. Title: `v1.0.0 - Initial Release`
4. Description: Copy from CHANGELOG.md
5. Publish release

---

## Troubleshooting

### Common Issues

#### 1. "You do not have permission to publish"

**Cause**: Not logged in or wrong account

**Solution**:
```bash
npm logout
npm login
npm whoami  # Verify correct account
```

#### 2. "Package name already exists"

**Cause**: Name collision

**Solution**:
- Use scoped package: `@your-org/ui`
- Choose different name
- Check if package is abandoned (contact npm support)

#### 3. "Missing required files"

**Cause**: `.npmignore` too aggressive

**Solution**:
```bash
npm pack --dry-run  # Check what's included
# Update .npmignore to include dist/
```

#### 4. "Types not working"

**Cause**: Missing type declarations

**Solution**:
```json
// package.json
{
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts"
    }
  }
}
```

#### 5. "CSS not loading"

**Cause**: CSS not exported correctly

**Solution**:
```json
// package.json
{
  "exports": {
    "./styles.css": "./dist/styles.css"
  },
  "sideEffects": ["*.css"]
}
```

#### 6. "Peer dependency warnings"

**Cause**: Version mismatch

**Solution**:
```json
// Use flexible version ranges
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0"
}
```

#### 7. "Bundle too large"

**Cause**: Dependencies bundled incorrectly

**Solution**:
```javascript
// tsup.config.ts
export default defineConfig({
  external: [
    "react",
    "react-dom",
    "@radix-ui/*",
  ],
});
```

---

## Maintenance

### Regular Updates

**Monthly**:
- [ ] Update dependencies
- [ ] Check security vulnerabilities
- [ ] Review GitHub issues
- [ ] Update documentation

**Quarterly**:
- [ ] Major dependency updates
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] Bundle size analysis

### Deprecation Policy

When deprecating features:

1. **Mark as deprecated** (1 major version)
   ```typescript
   /**
    * @deprecated Use NewButton instead. Will be removed in v3.0.0
    */
   export const OldButton = () => { ... };
   ```

2. **Add console warning**
   ```typescript
   if (process.env.NODE_ENV === "development") {
     console.warn("OldButton is deprecated. Use NewButton instead.");
   }
   ```

3. **Update CHANGELOG**
   ```markdown
   ## [2.0.0] - 2025-06-01

   ### Deprecated
   - `OldButton` - Use `NewButton` instead. Will be removed in v3.0.0
   ```

4. **Remove** (next major version)
   ```markdown
   ## [3.0.0] - 2025-12-01

   ### BREAKING CHANGES
   - Removed `OldButton` (deprecated in v2.0.0)
   ```

---

## Best Practices

### 1. Semantic Versioning
- Follow SemVer strictly
- Document breaking changes
- Provide migration guides

### 2. Bundle Size
- Keep bundle under 100KB (gzipped)
- Use tree-shaking
- Externalize peer dependencies
- Monitor with bundlephobia

### 3. TypeScript
- Export all types
- Use strict mode
- Provide JSDoc comments
- Generate type declarations

### 4. Testing
- Maintain 100% coverage
- Test all exports
- E2E tests for complex components
- Accessibility testing

### 5. Documentation
- Comprehensive README
- Migration guides for MAJOR versions
- Component showcase for visual docs
- API documentation (TypeDoc)

### 6. Performance
- Lazy load heavy components
- Optimize bundle size
- Use React.memo where appropriate
- Monitor Core Web Vitals

### 7. Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus management

### 8. Versioning
- Use conventional commits
- Automate changelog generation
- Tag releases in git
- Use pre-release versions for testing

---

## Resources

### Official Documentation
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Radix UI Documentation](https://www.radix-ui.com/)

### Tools
- [tsup](https://tsup.egoist.dev/) - TypeScript bundler
- [Rollup](https://rollupjs.org/) - Module bundler
- [Changesets](https://github.com/changesets/changesets) - Version management
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) - Dependency updates

### Package Analysis
- [bundlephobia](https://bundlephobia.com/) - Bundle size analysis
- [npm trends](https://npmtrends.com/) - Download statistics
- [npm graph](https://npmgraph.js.org/) - Dependency visualization

### Community
- [npm Community Forum](https://github.com/npm/feedback)
- [React Component Library Best Practices](https://blog.logrocket.com/building-react-component-library-best-practices/)

---

## Summary

Publishing the Fabrk component library to npm requires:

1. **Package Configuration** - Scoped name, dual format exports, proper dependencies
2. **Build Setup** - tsup or Rollup for bundling, TypeScript definitions
3. **Export Structure** - Named exports, tree-shakeable, type-safe
4. **Dependency Management** - Peer deps for React/Tailwind, bundle Radix UI
5. **Documentation** - Comprehensive README, changelog, license
6. **Ignore Configuration** - Exclude source files, ship only dist/
7. **Versioning** - Semantic versioning with git tags
8. **Publishing** - Automated with GitHub Actions, manual fallback
9. **Verification** - Test installation, imports, types, bundle size
10. **Maintenance** - Regular updates, deprecation policy, monitoring

**Ready to publish?** Follow the checklist and your library will be live on npm! 🚀
