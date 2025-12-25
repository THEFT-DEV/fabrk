# Component Best Practices

Best practices for using, customizing, and extending Fabrk components.

---

## Table of Contents

1. [Component Philosophy](#component-philosophy)
2. [Composition Patterns](#composition-patterns)
3. [Styling Guidelines](#styling-guidelines)
4. [Server vs Client Components](#server-vs-client-components)
5. [Performance Best Practices](#performance-best-practices)
6. [Accessibility Guidelines](#accessibility-guidelines)
7. [Common Patterns](#common-patterns)
8. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Component Philosophy

### Fabrk Component Principles

**1. Composition over Configuration**

```tsx
// ✅ Good: Composable
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Bad: Props for everything
<Card title="Title" content="Content" hasHeader={true} />
```

**2. Server Components by Default**

```tsx
// ✅ Good: Server Component (default)
export default async function ProductList() {
  const products = await prisma.product.findMany();
  return <div>{products.map(...)}</div>;
}

// ❌ Bad: Client Component unnecessarily
"use client";
export default async function ProductList() {
  // Don't use "use client" unless you need interactivity!
}
```

**3. TypeScript Strict**

```tsx
// ✅ Good: Fully typed
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  // ...
}

// ❌ Bad: Using `any`
export function Button(props: any) {
  // TypeScript can't help you here
}
```

**4. Accessible by Default**

All Radix UI components include ARIA attributes out of the box.

---

## Composition Patterns

### Pattern 1: Card Layouts

For card-specific patterns, animation recipes, and Pattern 1 (Animated) vs Pattern 2 (Static) decision making, see:
- **[Card Animation Guide](/docs/design-system/spec/card-animations.md)** - When to animate, performance implications, code recipes
- **[Card API Reference](/docs/design-system/spec/components-card.md)** - Complete component API, props, variants

General principle: Use composition over configuration.

```tsx
// ✅ Good: Composable card structure
<Card>
  <CardHeader code="0x01" title="SECTION">
    <Icon className="size-4" />
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

---

### Pattern 2: Form Layouts

**Simple Form:**

```tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        required
      />
    </div>

    <div>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="••••••••"
        required
      />
    </div>

    <Button type="submit" className="w-full">
      Sign In
    </Button>
  </div>
</form>
```

**Form with Validation:**

```tsx
"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be 8+ characters"),
});

export function SignInForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validation = schema.safeParse(data);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Submit form
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </div>
    </form>
  );
}
```

---

### Pattern 3: Modal Dialogs

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this item? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Pattern 4: Data Tables

```tsx
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Badge variant={user.verified ? "success" : "warning"}>
            {user.verified ? "Verified" : "Pending"}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Styling Guidelines

### Tailwind CSS Classes

**Class Order Convention:**

```tsx
// ✅ Good: Logical order
<div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">

// Order:
// 1. Layout (flex, grid, block)
// 2. Positioning (absolute, relative)
// 3. Sizing (w-full, h-screen)
// 4. Spacing (p-4, m-2, gap-4)
// 5. Typography (text-lg, font-bold)
// 6. Visual (bg-white, border, rounded)
// 7. States (hover:, focus:, active:)
```

**Responsive Classes:**

```tsx
// ✅ Good: Mobile-first responsive
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

// ❌ Bad: Desktop-first
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
```

---

### Custom Styles

**Use Tailwind when possible:**

```tsx
// ✅ Good: Tailwind utility classes
<button className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">

// ❌ Bad: Inline styles
<button style={{ borderRadius: '8px', background: '#9333EA', padding: '8px 16px' }}>
```

**For unique styles, use CSS modules:**

```tsx
// button.module.css
.customButton {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: pulse 2s infinite;
}

// Component
import styles from "./button.module.css";

<button className={styles.customButton}>Gradient Button</button>
```

---

### Dark Mode

```tsx
// ✅ Good: Dark mode classes
<div className="bg-white text-black dark:bg-gray-900 dark:text-white">

// ❌ Bad: Hard-coded colors
<div className="bg-white text-black">
```

**Enable dark mode in layout:**

```tsx
// src/app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Server vs Client Components

### When to Use Server Components

✅ **Fetching data from database**
✅ **Accessing backend resources directly**
✅ **Keeping sensitive data on server** (API keys)
✅ **Reducing client bundle size**
✅ **SEO-critical content**

```tsx
// ✅ Server Component (no "use client")
export default async function ProductList() {
  const products = await prisma.product.findMany();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

### When to Use Client Components

✅ **User interactions** (onClick, onChange)
✅ **State management** (useState, useReducer)
✅ **Effects** (useEffect)
✅ **Browser APIs** (localStorage, window)
✅ **Event listeners**

```tsx
// ✅ Client Component (needs "use client")
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

### Composition: Server + Client

**Pattern: Keep interactivity minimal**

```tsx
// ✅ Good: Server Component wraps Client Component
// src/app/products/page.tsx (Server Component)
import { ProductGrid } from "./product-grid"; // Client Component

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div>
      <h1>Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}

// src/app/products/product-grid.tsx (Client Component)
"use client";

export function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("");

  const filtered = products.filter((p) => p.name.includes(filter));

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter products..."
      />
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

---

## Performance Best Practices

### 1. Lazy Load Heavy Components

```tsx
import dynamic from "next/dynamic";

// ✅ Good: Lazy load chart
const HeavyChart = dynamic(() => import("@/components/charts/heavy-chart"), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Don't render on server
});

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart data={data} />
    </div>
  );
}
```

---

### 2. Optimize Images

```tsx
import Image from "next/image";

// ✅ Good: Next.js Image component
<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // Low-quality placeholder
/>

// ❌ Bad: Regular img tag
<img src="/hero.png" alt="Hero" />
```

---

### 3. Memoize Expensive Computations

```tsx
"use client";

import { useMemo } from "react";

export function ExpensiveList({ items }: { items: Item[] }) {
  // ✅ Good: Memoize expensive calculation
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.price - b.price);
  }, [items]);

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

### 4. Avoid Prop Drilling

```tsx
// ❌ Bad: Prop drilling
<Parent>
  <Child user={user}>
    <GrandChild user={user}>
      <GreatGrandChild user={user} />
    </GrandChild>
  </Child>
</Parent>

// ✅ Good: Context
import { createContext, useContext } from "react";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children, user }: { children: React.ReactNode; user: User }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  if (!user) throw new Error("useUser must be used within UserProvider");
  return user;
}

// Usage
<UserProvider user={user}>
  <Parent>
    <Child>
      <GrandChild>
        <GreatGrandChild /> {/* Accesses user via useUser() */}
      </GrandChild>
    </Child>
  </Parent>
</UserProvider>
```

---

## Accessibility Guidelines

### 1. Semantic HTML

```tsx
// ✅ Good: Semantic elements
<button onClick={handleClick}>Click me</button>
<nav>Navigation</nav>
<main>Content</main>

// ❌ Bad: Divs for everything
<div onClick={handleClick}>Click me</div>
<div>Navigation</div>
<div>Content</div>
```

---

### 2. Labels for Inputs

```tsx
// ✅ Good: Explicit label association
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />

// ❌ Bad: No label
<Input type="email" placeholder="Email" />
```

---

### 3. ARIA Attributes

Radix UI components include ARIA attributes automatically. But for custom components:

```tsx
// ✅ Good: ARIA attributes for custom components
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <XIcon />
</button>

// ❌ Bad: Icon button with no accessible name
<button onClick={handleClose}>
  <XIcon />
</button>
```

---

### 4. Keyboard Navigation

```tsx
// ✅ Good: Keyboard accessible
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  Clickable div
</div>

// ❌ Bad: Not keyboard accessible
<div onClick={handleClick}>Clickable div</div>
```

---

## Common Patterns

### Pattern: Loading States

```tsx
export function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton count={6} />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

### Pattern: Error Boundaries

```tsx
// src/components/error-boundary.tsx
"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h2 className="text-lg font-bold text-red-900">Something went wrong</h2>
            <p className="text-red-700">Please refresh the page</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <ProductList />
</ErrorBoundary>
```

---

### Pattern: Conditional Rendering

```tsx
// ✅ Good: Early return pattern
export function UserProfile({ user }: { user: User | null }) {
  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// ❌ Bad: Nested ternaries
export function UserProfile({ user }: { user: User | null }) {
  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>Please sign in</div>
      )}
    </div>
  );
}
```

---

## Anti-Patterns to Avoid

### ❌ Don't Overuse Client Components

```tsx
// ❌ Bad: Unnecessary "use client"
"use client";

export default function StaticPage() {
  return <div>This doesn't need interactivity!</div>;
}

// ✅ Good: Server Component by default
export default function StaticPage() {
  return <div>Static content</div>;
}
```

---

### ❌ Don't Inline Large Objects

```tsx
// ❌ Bad: Creates new object on every render
<Component
  style={{ padding: "16px", margin: "8px" }} // New object every render!
/>

// ✅ Good: Define outside component
const styles = { padding: "16px", margin: "8px" };

<Component style={styles} />

// ✅ Better: Use Tailwind classes
<Component className="p-4 m-2" />
```

---

### ❌ Don't Use Index as Key

```tsx
// ❌ Bad: Index as key
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// ✅ Good: Unique ID as key
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

---

### ❌ Don't Mutate State Directly

```tsx
// ❌ Bad: Mutates state
const [items, setItems] = useState([...]);
items.push(newItem); // Direct mutation!
setItems(items);

// ✅ Good: Create new array
const [items, setItems] = useState([...]);
setItems([...items, newItem]);
```

---

## Component Checklist

Before shipping a component, verify:

### Functionality
- [ ] Component works as expected
- [ ] All props are typed (TypeScript)
- [ ] Default props are set
- [ ] Edge cases handled (null, undefined, empty)

### Performance
- [ ] Server Component by default (unless interactivity needed)
- [ ] Heavy computations memoized
- [ ] Images optimized (next/image)
- [ ] Lazy loading for non-critical components

### Accessibility
- [ ] Semantic HTML elements
- [ ] Labels for all inputs
- [ ] ARIA attributes where needed
- [ ] Keyboard navigation works
- [ ] Focus states visible

### Styling
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Consistent with design system
- [ ] No layout shift (CLS)

### Code Quality
- [ ] No ESLint warnings
- [ ] No TypeScript errors
- [ ] Follows naming conventions
- [ ] Commented where necessary (why, not what)

---

**Follow these best practices and your components will be fast, accessible, and maintainable. 🚀**

**Questions? Email support@fabrk.dev.**
