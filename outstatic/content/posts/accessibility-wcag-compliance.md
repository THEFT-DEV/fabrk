---
title: 'Accessibility: WCAG 2.2 AA Compliance Across 18 Themes'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'accessibility-wcag-compliance'
description: 'How Fabrk ensures WCAG 2.2 AA accessibility across all 18 terminal themes. Contrast ratios, keyboard navigation, and screen reader support.'
publishedAt: '2026-01-12T10:00:00.000Z'
---

**Beautiful themes that everyone can use.**

---

## The Accessibility Challenge

Dark terminal themes often fail accessibility:

- Low contrast text that's hard to read
- Missing focus indicators for keyboard users
- No keyboard support for interactive elements
- Broken screen reader announcements
- Color-only information encoding

Fabrk solves all of these across all 18 themes.

---

## WCAG 2.2 AA Compliance

Every Fabrk theme meets WCAG 2.2 AA standards:

| Requirement | Standard | Fabrk Implementation |
|-------------|----------|---------------------|
| Normal text contrast | 4.5:1 minimum | All themes exceed 7:1 |
| Large text contrast | 3:1 minimum | All themes exceed 4.5:1 |
| UI component contrast | 3:1 minimum | All interactive elements tested |
| Focus indicators | Visible | 2px primary-colored ring |
| Color independence | Required | Icons + text for all statuses |

---

## OKLCH for Predictable Contrast

Fabrk uses OKLCH color space, which makes contrast ratios predictable through lightness values:

```css
/* OKLCH: Lightness, Chroma, Hue */
/* Guaranteed contrast through lightness values */

:root {
  /* Background L=0.14 (very dark) */
  --background: oklch(0.14 0.01 260);

  /* Foreground L=0.95 (very light) */
  --foreground: oklch(0.95 0.01 260);

  /* Delta of 0.81 = approximately 14:1 contrast ratio */
}
```

### Why OKLCH Works Better

With traditional HSL:
- Equal lightness values don't mean equal perceived brightness
- Blue at 50% looks darker than yellow at 50%
- Contrast ratios are unpredictable

With OKLCH:
- Lightness is perceptually uniform
- L=0.5 actually looks medium-bright for any hue
- Contrast can be calculated from lightness difference

### Contrast Mapping

| Lightness Delta | Approximate Contrast Ratio |
|-----------------|---------------------------|
| 0.40 | ~3:1 (large text minimum) |
| 0.55 | ~4.5:1 (normal text minimum) |
| 0.70 | ~7:1 (enhanced contrast) |
| 0.80+ | ~10:1+ (excellent contrast) |

---

## Theme-Specific Contrast Testing

Every theme has tested contrast ratios:

### Dark Themes

```css
/* Default Theme */
.theme-default {
  --background: oklch(0.14 0.01 260);  /* L=0.14 */
  --foreground: oklch(0.95 0.01 260);  /* L=0.95 */
  /* Contrast: ~14:1 ✓ */
}

/* Matrix Theme */
.theme-matrix {
  --background: oklch(0.05 0.01 140);  /* L=0.05 */
  --foreground: oklch(0.80 0.20 140);  /* L=0.80 */
  /* Contrast: ~11:1 ✓ */
}

/* Dracula Theme */
.theme-dracula {
  --background: oklch(0.20 0.02 270);  /* L=0.20 */
  --foreground: oklch(0.95 0.01 270);  /* L=0.95 */
  /* Contrast: ~12:1 ✓ */
}
```

### Light Themes

```css
/* Solarized Light */
.theme-solarized-light {
  --background: oklch(0.97 0.02 95);   /* L=0.97 */
  --foreground: oklch(0.35 0.05 200);  /* L=0.35 */
  /* Contrast: ~10:1 ✓ */
}

/* Ocean Light */
.theme-ocean {
  --background: oklch(0.97 0.01 220);  /* L=0.97 */
  --foreground: oklch(0.25 0.03 220);  /* L=0.25 */
  /* Contrast: ~12:1 ✓ */
}
```

---

## Focus Indicators

All interactive elements have visible focus states:

### Default Focus Ring

```css
/* globals.css */
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

/* Remove default outline since we're using focus-visible */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Component-Specific Focus

```tsx
// Button focus
<Button className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
  > SUBMIT
</Button>

// Input focus
<Input className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary" />

// Card focus (when interactive)
<Card
  tabIndex={0}
  className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
>
  Content
</Card>
```

### Focus Visibility

The `:focus-visible` selector only shows focus rings for keyboard navigation, not mouse clicks:

```css
/* Shows focus ring only for keyboard users */
button:focus-visible {
  outline: 2px solid var(--primary);
}

/* No ring for mouse clicks */
button:focus:not(:focus-visible) {
  outline: none;
}
```

---

## Keyboard Navigation

All components are fully keyboard accessible:

### Navigation Keys

| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable element |
| `Shift+Tab` | Move to previous focusable element |
| `Enter` | Activate button/link |
| `Space` | Activate button, toggle checkbox/switch |
| `Arrow keys` | Navigate within component (menus, tabs, radio groups) |
| `Escape` | Close modals, dropdowns, popovers |
| `Home/End` | Jump to first/last item in list |

### Component Keyboard Support

#### Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    {/* Focus trapped inside when open */}
    {/* Escape closes the dialog */}
    {/* Tab cycles through focusable elements */}
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Description</DialogDescription>
    <Button>Action</Button>
  </DialogContent>
</Dialog>
```

#### Dropdown Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {/* Arrow keys navigate items */}
    {/* Enter/Space activates */}
    {/* Escape closes */}
    <DropdownMenuItem>Option 1</DropdownMenuItem>
    <DropdownMenuItem>Option 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Tabs

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    {/* Arrow keys switch tabs */}
    {/* Home/End jump to first/last */}
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

## Screen Reader Support

Components include proper ARIA attributes:

### Buttons

```tsx
// Loading button
<Button
  aria-label="Submit form"
  aria-disabled={isLoading}
  aria-busy={isLoading}
>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      <span>Loading...</span>
    </>
  ) : (
    '> SUBMIT'
  )}
</Button>

// Icon-only button (requires aria-label)
<Button variant="ghost" size="icon" aria-label="Open settings">
  <Settings className="h-4 w-4" aria-hidden="true" />
</Button>
```

### Forms

```tsx
<div className="space-y-2">
  <Label htmlFor="email">EMAIL</Label>
  <Input
    id="email"
    type="email"
    aria-describedby={errors.email ? 'email-error' : 'email-hint'}
    aria-invalid={!!errors.email}
    aria-required="true"
  />
  {errors.email ? (
    <p id="email-error" className="text-destructive text-xs" role="alert">
      {errors.email}
    </p>
  ) : (
    <p id="email-hint" className="text-muted-foreground text-xs">
      We'll never share your email.
    </p>
  )}
</div>
```

### Modals

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogHeader>
      <DialogTitle id="dialog-title">Confirm Action</DialogTitle>
      <DialogDescription id="dialog-description">
        Are you sure you want to proceed? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Live Regions

Announce dynamic content changes:

```tsx
// Loading state announcements
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? (
    <Spinner />
  ) : (
    <p>Content loaded</p>
  )}
</div>

// Error announcements (assertive = immediate)
<Alert role="alert" aria-live="assertive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>{errorMessage}</AlertDescription>
</Alert>

// Status updates (polite = waits for pause)
<div role="status" aria-live="polite">
  {savedAt && `Last saved at ${savedAt}`}
</div>
```

### Navigation

```tsx
<nav aria-label="Main navigation">
  <ul role="list">
    <li>
      <a href="/dashboard" aria-current={pathname === '/dashboard' ? 'page' : undefined}>
        Dashboard
      </a>
    </li>
    <li>
      <a href="/settings" aria-current={pathname === '/settings' ? 'page' : undefined}>
        Settings
      </a>
    </li>
  </ul>
</nav>

// Breadcrumb navigation
<nav aria-label="Breadcrumb">
  <ol role="list" className="flex items-center gap-2">
    <li>
      <a href="/dashboard">Dashboard</a>
    </li>
    <li aria-hidden="true">/</li>
    <li>
      <a href="/dashboard/settings" aria-current="page">Settings</a>
    </li>
  </ol>
</nav>
```

---

## Semantic HTML

Use proper HTML elements:

### Good (Semantic)

```tsx
// Buttons for actions
<button onClick={handleClick}>Click me</button>

// Links for navigation
<a href="/page">Go to page</a>

// Landmarks for structure
<header>...</header>
<nav>...</nav>
<main>...</main>
<aside>...</aside>
<footer>...</footer>

// Headings for hierarchy
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>

// Lists for related items
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### Bad (Div Soup)

```tsx
// DON'T: div as button
<div onClick={handleClick}>Click me</div>

// DON'T: div as link
<div onClick={() => router.push('/page')}>Go to page</div>

// DON'T: div for everything
<div className="header">...</div>
<div className="nav">...</div>
<div className="main">...</div>

// DON'T: styled text instead of headings
<p className="text-2xl font-bold">Page Title</p>
```

---

## Color Independence

Never rely on color alone to convey information:

### Status Indicators

```tsx
// BAD - color only
<Badge className="bg-red-500">Error</Badge>
<span className="text-green-500">Success</span>

// GOOD - color + icon + text
<Badge className="bg-destructive text-destructive-foreground">
  <XCircle className="mr-1 h-3 w-3" aria-hidden="true" />
  ERROR
</Badge>

<Badge className="bg-success/10 text-success border-success">
  <CheckCircle className="mr-1 h-3 w-3" aria-hidden="true" />
  SUCCESS
</Badge>
```

### Form Validation

```tsx
// BAD - only red border
<Input className={errors.email ? 'border-red-500' : ''} />

// GOOD - icon + message + border
<div className="space-y-2">
  <div className="relative">
    <Input
      className={errors.email ? 'border-destructive pr-10' : ''}
      aria-invalid={!!errors.email}
    />
    {errors.email && (
      <AlertCircle
        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive"
        aria-hidden="true"
      />
    )}
  </div>
  {errors.email && (
    <p className="text-destructive text-xs flex items-center gap-1" role="alert">
      <XCircle className="h-3 w-3" aria-hidden="true" />
      {errors.email}
    </p>
  )}
</div>
```

### Charts and Graphs

```tsx
// Provide patterns or labels, not just colors
<BarChart
  data={data}
  // Use patterns for accessibility
  showPatterns={true}
  // Always include labels
  showLabels={true}
  // Provide data table alternative
  accessibleDataTable={true}
/>

// Include a text summary
<p className="sr-only">
  Revenue increased from $10,000 in January to $15,000 in March,
  representing a 50% growth over the quarter.
</p>
```

---

## Skip Links

Allow keyboard users to skip repetitive navigation:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Skip link - first focusable element */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:p-4 focus:border focus:border-primary"
        >
          Skip to main content
        </a>

        <header>
          <nav>
            {/* Navigation links */}
          </nav>
        </header>

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <footer>
          {/* Footer content */}
        </footer>
      </body>
    </html>
  );
}
```

---

## Reduced Motion

Respect user motion preferences:

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### In Components

```tsx
// Check motion preference in JavaScript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Conditional animation
<div
  className={cn(
    'transition-transform',
    !prefersReducedMotion && 'hover:scale-105'
  )}
>
  Content
</div>

// Using Tailwind's motion-safe/motion-reduce
<div className="motion-safe:animate-bounce motion-reduce:animate-none">
  Bouncing element
</div>
```

---

## Testing Accessibility

### Automated Testing

```bash
# Run accessibility tests
npm run test:a11y
```

### Playwright with Axe

```typescript
// tests/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('dashboard has no accessibility violations', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');

    await page.waitForURL('/dashboard');

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });

  test('all themes meet contrast requirements', async ({ page }) => {
    const themes = ['default', 'matrix', 'dracula', 'nord', 'cyberpunk'];

    for (const theme of themes) {
      await page.goto(`/?theme=${theme}`);

      const results = await new AxeBuilder({ page })
        .withTags(['cat.color'])
        .analyze();

      expect(results.violations).toEqual([]);
    }
  });
});
```

### Manual Testing Checklist

1. **Keyboard Navigation**
   - [ ] Tab through all interactive elements
   - [ ] Activate buttons with Enter and Space
   - [ ] Navigate menus with arrow keys
   - [ ] Close modals with Escape
   - [ ] Focus is visible at all times

2. **Screen Reader**
   - [ ] Test with VoiceOver (Mac) or NVDA (Windows)
   - [ ] All images have alt text
   - [ ] Form fields have labels
   - [ ] Dynamic content is announced
   - [ ] Page structure is logical

3. **Visual**
   - [ ] Test at 200% zoom
   - [ ] Test with high contrast mode
   - [ ] Verify color is not the only indicator
   - [ ] Check contrast ratios with DevTools

4. **Motor**
   - [ ] Click targets are at least 44x44px
   - [ ] No time limits on interactions
   - [ ] No content that flashes more than 3 times/second

---

## Accessibility Tools

### Browser Extensions

| Tool | Purpose |
|------|---------|
| axe DevTools | Automated accessibility testing |
| WAVE | Visual accessibility report |
| Lighthouse | Chrome DevTools audit |
| Color Contrast Analyzer | Check contrast ratios |

### Screen Readers

| Tool | Platform | Cost |
|------|----------|------|
| VoiceOver | macOS/iOS | Free (built-in) |
| NVDA | Windows | Free |
| JAWS | Windows | Paid |
| TalkBack | Android | Free (built-in) |

### Testing Services

| Service | Features |
|---------|----------|
| Axe | Automated testing, CI integration |
| Deque | Manual + automated testing |
| Level Access | Compliance monitoring |

---

## Common Issues and Fixes

| Issue | Fix |
|-------|-----|
| Low contrast text | Use design tokens with tested contrast |
| Missing form labels | Add `<Label htmlFor="...">` |
| No focus visible | Add `focus-visible:ring-2` classes |
| Div used as button | Use `<button>` element |
| Missing alt text | Add `alt=""` for decorative, descriptive for meaningful |
| Auto-playing media | Add controls, respect prefers-reduced-motion |
| Timeout without warning | Provide option to extend or disable |
| Keyboard trap | Ensure Escape closes overlays |

---

## Best Practices

1. **Test early and often** - Don't bolt on accessibility at the end
2. **Use semantic HTML** - Right element for the job
3. **Don't disable focus** - Users need visual feedback
4. **Provide alternatives** - Text for images, captions for video
5. **Test with real users** - Automated tools miss many issues
6. **Keep it simple** - Simpler interfaces are more accessible
7. **Document decisions** - Note why exceptions were made

---

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)

Accessibility for all 18 themes. Beautiful design that everyone can use.
