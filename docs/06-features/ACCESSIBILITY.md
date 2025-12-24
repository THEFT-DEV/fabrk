# Accessibility Guidelines

This document outlines the accessibility standards and best practices for the Fabrk boilerplate. All components are tested against WCAG 2.1 Level AA standards using automated tools and manual testing.

## Table of Contents

- [Standards Compliance](#standards-compliance)
- [Testing Infrastructure](#testing-infrastructure)
- [Component Requirements](#component-requirements)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Color and Contrast](#color-and-contrast)
- [Focus Management](#focus-management)
- [ARIA Best Practices](#aria-best-practices)
- [Testing Guide](#testing-guide)
- [Common Issues and Fixes](#common-issues-and-fixes)

## Standards Compliance

We test against the following accessibility standards:

- **WCAG 2.1 Level A** - Minimum compliance (all A criteria must pass)
- **WCAG 2.1 Level AA** - Target compliance (all AA criteria must pass)
- **Best Practices** - Additional accessibility recommendations

### Automated Testing Tools

- **axe-core** - Industry-standard accessibility testing engine
- **axe-playwright** - Automated testing during CI/CD
- **Lighthouse** - Google's accessibility audit tool

### Manual Testing Requirements

Automated tools catch ~57% of accessibility issues. Manual testing is required for:

1. **Keyboard navigation** - Can all interactive elements be accessed?
2. **Screen reader testing** - Does VoiceOver/NVDA announce correctly?
3. **Focus visible** - Is keyboard focus always visible?
4. **Content structure** - Are headings hierarchical and meaningful?
5. **Alt text quality** - Are image descriptions meaningful?

## Testing Infrastructure

### Running Accessibility Tests

```bash
# Run all accessibility tests
npm run test:e2e -- tests/accessibility/components.a11y.spec.ts

# Run in UI mode (interactive)
npm run test:e2e:ui -- tests/accessibility/components.a11y.spec.ts

# Run in headed mode (see browser)
npm run test:e2e:headed -- tests/accessibility/components.a11y.spec.ts

# Generate reports only
npm run test:e2e -- tests/accessibility/components.a11y.spec.ts --reporter=html
```

### CI/CD Integration

Accessibility tests run automatically on:

- **Pull Requests** - Every PR to main/develop
- **Push to main/develop** - After merge
- **Manual trigger** - Via GitHub Actions

Critical violations will fail the build and block merges.

### Viewing Reports

Reports are generated in `tests/accessibility/reports/`:

```bash
# Open all reports
open tests/accessibility/reports/

# View specific component report
open tests/accessibility/reports/button.html
```

## Component Requirements

All UI components must meet these minimum requirements:

### Form Controls

#### Inputs, Textareas, Selects

```tsx
// ✅ GOOD - Associated label
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ GOOD - aria-label
<input type="email" aria-label="Email address" />

// ✅ GOOD - aria-labelledby
<span id="email-label">Email</span>
<input type="email" aria-labelledby="email-label" />

// ❌ BAD - No accessible name
<input type="email" placeholder="Email" />
```

**Requirements:**
- Every input must have an associated label (via `htmlFor`, `aria-label`, or `aria-labelledby`)
- Required fields must indicate this (via `required` attribute or `aria-required="true"`)
- Error messages must be associated via `aria-describedby`
- Autocomplete attribute should be set for common fields (email, name, address, etc.)

#### Buttons

```tsx
// ✅ GOOD - Visible text
<button>Submit</button>

// ✅ GOOD - aria-label for icon buttons
<button aria-label="Close dialog">
  <XIcon />
</button>

// ✅ GOOD - visually-hidden text
<button>
  <XIcon />
  <span className="sr-only">Close dialog</span>
</button>

// ❌ BAD - Icon only, no accessible name
<button>
  <XIcon />
</button>
```

**Requirements:**
- Every button must have an accessible name (visible text, `aria-label`, or sr-only text)
- Icon buttons must describe the action, not the icon ("Close dialog" not "X icon")
- Disabled buttons should use `disabled` attribute, not just styling
- Loading states should announce to screen readers via `aria-busy` or live regions

#### Checkboxes & Radio Buttons

```tsx
// ✅ GOOD - Checkbox with label
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">I accept the terms</label>
</div>

// ✅ GOOD - Radio group
<RadioGroup aria-label="Shipping method">
  <div>
    <RadioGroupItem value="standard" id="standard" />
    <label htmlFor="standard">Standard shipping</label>
  </div>
  <div>
    <RadioGroupItem value="express" id="express" />
    <label htmlFor="express">Express shipping</label>
  </div>
</RadioGroup>

// ❌ BAD - No label association
<Checkbox />
<span>I accept the terms</span>
```

**Requirements:**
- Radio groups must have `role="radiogroup"` and `aria-label` or label
- Each radio/checkbox must have an associated label
- Current state must be indicated via `aria-checked`
- Arrow keys must navigate radio groups, Space must toggle checkboxes

### Navigation Components

#### Tabs

```tsx
// ✅ GOOD - Proper ARIA structure
<Tabs defaultValue="account">
  <TabsList role="tablist" aria-label="Account settings">
    <TabsTrigger value="account" role="tab">Account</TabsTrigger>
    <TabsTrigger value="security" role="tab">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="account" role="tabpanel">
    Account settings content
  </TabsContent>
</Tabs>

// ❌ BAD - Missing roles
<div>
  <div>
    <button>Account</button>
    <button>Security</button>
  </div>
</div>
```

**Requirements:**
- Tab list must have `role="tablist"`
- Each tab must have `role="tab"`
- Each panel must have `role="tabpanel"`
- Arrow keys must navigate between tabs
- Active tab must have `aria-selected="true"`
- Each panel must have `aria-labelledby` pointing to its tab

#### Accordion

```tsx
// ✅ GOOD - Proper structure
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is accessibility?</AccordionTrigger>
    <AccordionContent>
      Accessibility ensures everyone can use your product...
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Requirements met by Radix UI:
// - Trigger has aria-expanded
// - Trigger has aria-controls
// - Content has proper id
// - Enter/Space toggles panel
```

**Requirements:**
- Triggers must be buttons or have `role="button"`
- Triggers must have `aria-expanded` (true/false)
- Triggers should have `aria-controls` pointing to content
- Enter or Space must toggle the panel
- Multiple panels can be open (unless single mode)

### Overlay Components

#### Dialogs & Modals

```tsx
// ✅ GOOD - Proper dialog structure
<Dialog>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogContent>
    <DialogTitle>Dialog title</DialogTitle>
    <DialogDescription>
      This dialog contains important information.
    </DialogDescription>
    <button onClick={handleSave}>Save</button>
    <button onClick={handleCancel}>Cancel</button>
  </DialogContent>
</Dialog>

// Requirements met by Radix UI:
// - role="dialog" or role="alertdialog"
// - aria-labelledby (points to title)
// - aria-describedby (points to description)
// - Focus trap (Tab cycles within dialog)
// - Esc closes dialog
// - Focus returns to trigger on close
```

**Requirements:**
- Dialogs must have `role="dialog"` or `role="alertdialog"`
- Must have `aria-labelledby` pointing to title
- Should have `aria-describedby` pointing to description
- Focus must be trapped inside dialog
- Esc key must close dialog
- Focus must return to trigger element on close
- Background content must be inert (not tabbable)

#### Tooltips

```tsx
// ✅ GOOD - Tooltip with proper timing
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Additional information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Requirements:
// - Must appear on both hover AND focus
// - Must have role="tooltip"
// - Trigger must have aria-describedby
// - Should not contain interactive content
// - Should dismiss on Esc key
```

**Requirements:**
- Tooltips must appear on both hover AND focus
- Must have `role="tooltip"`
- Trigger must have `aria-describedby` pointing to tooltip
- Should not contain interactive content (use Popover instead)
- Must dismiss on Esc key press
- Should have slight delay before appearing (to avoid clutter)

## Keyboard Navigation

All interactive elements must be keyboard accessible. Users should be able to navigate the entire application using only the keyboard.

### Quick Reference: Keyboard Shortcuts by Component

| Component | Open/Activate | Navigate | Select | Close |
|-----------|---------------|----------|--------|-------|
| **Button** | `Enter` / `Space` | `Tab` | N/A | N/A |
| **Link** | `Enter` | `Tab` | N/A | N/A |
| **Dialog/Modal** | Trigger action | `Tab` cycle | `Enter` | `Esc` |
| **Dropdown** | `Enter` / `Space` / `↓` | `↑` `↓` | `Enter` | `Esc` |
| **Tabs** | N/A | `←` `→` | Auto-select | N/A |
| **Accordion** | `Enter` / `Space` | `Tab` / `↑` `↓` | Toggle | N/A |
| **Menu** | `Enter` / `Space` | `↑` `↓` | `Enter` | `Esc` |
| **Combobox** | `Enter` / `↓` | `↑` `↓` | `Enter` | `Esc` |
| **Checkbox** | `Space` | `Tab` | Toggle | N/A |
| **Radio Group** | N/A | `↑` `↓` / `←` `→` | Auto-select | N/A |
| **Slider** | N/A | `←` `→` / `↑` `↓` | N/A | N/A |
| **Toast** | N/A | N/A | N/A | `Esc` / Auto |
| **Tooltip** | Focus trigger | N/A | N/A | `Esc` / Blur |

### Standard Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Move to next focusable element |
| **Shift+Tab** | Move to previous focusable element |
| **Enter** | Activate button, link, or submit form |
| **Space** | Toggle checkbox, activate button |
| **Esc** | Close dialog, dropdown, or popover |
| **Arrow Keys** | Navigate menus, tabs, radio groups, sliders |
| **Home/End** | Jump to first/last item in a list |
| **Page Up/Down** | Scroll page or list |

### Component-Specific Navigation

#### Select / Combobox

- **Space/Enter** - Open dropdown
- **Arrow Up/Down** - Navigate options
- **Home/End** - Jump to first/last option
- **Type to search** - Filter options by typing
- **Esc** - Close dropdown

#### Slider

- **Arrow Left/Right** - Decrease/increase by small step
- **Arrow Up/Down** - Increase/decrease by small step
- **Home** - Jump to minimum value
- **End** - Jump to maximum value
- **Page Up/Down** - Increase/decrease by large step

#### Tabs

- **Arrow Left/Right** - Navigate between tabs (horizontal)
- **Arrow Up/Down** - Navigate between tabs (vertical)
- **Home** - Jump to first tab
- **End** - Jump to last tab
- **Tab** - Move to active panel content

#### Menu / Dropdown

- **Arrow Up/Down** - Navigate menu items
- **Arrow Right** - Open submenu
- **Arrow Left** - Close submenu
- **Home/End** - Jump to first/last item
- **Type to search** - Jump to item starting with letter
- **Esc** - Close menu

### Focus Indicators

All focusable elements must have a visible focus indicator:

```css
/* ✅ GOOD - Visible focus ring */
.button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* ❌ BAD - No focus indicator */
.button:focus {
  outline: none;
}
```

**Requirements:**
- Focus indicators must have **3:1 contrast ratio** against background
- Focus indicators must be **visible on all interactive elements**
- Use `:focus-visible` to show focus only for keyboard users
- Never use `outline: none` without a replacement

## Screen Reader Support

Screen readers rely on semantic HTML, ARIA attributes, and proper document structure.

### Semantic HTML

Use semantic HTML elements instead of divs with roles:

```tsx
// ✅ GOOD - Semantic HTML
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</main>

<footer>
  <p>&copy; 2024 Company</p>
</footer>

// ❌ BAD - Divs everywhere
<div className="nav">
  <div>
    <div><a href="/">Home</a></div>
    <div><a href="/about">About</a></div>
  </div>
</div>

<div className="main">
  <div className="article">
    <div className="title">Article Title</div>
    <div>Article content...</div>
  </div>
</div>
```

### Heading Hierarchy

Headings must be hierarchical (no skipping levels):

```tsx
// ✅ GOOD - Proper hierarchy
<h1>Page Title</h1>
<h2>Section 1</h2>
<h3>Subsection 1.1</h3>
<h3>Subsection 1.2</h3>
<h2>Section 2</h2>

// ❌ BAD - Skipped h2, used h3 directly
<h1>Page Title</h1>
<h3>Section 1</h3>
```

**Requirements:**
- Every page must have exactly one `<h1>`
- Headings must be hierarchical (h1 → h2 → h3, never h1 → h3)
- Don't choose headings based on visual size (use CSS for that)
- Screen reader users navigate by headings - make them descriptive

### Live Regions

Announce dynamic content changes to screen readers:

```tsx
// ✅ GOOD - Toast with live region
<div role="status" aria-live="polite" aria-atomic="true">
  <Toast>
    <ToastTitle>Success!</ToastTitle>
    <ToastDescription>Your changes have been saved.</ToastDescription>
  </Toast>
</div>

// ✅ GOOD - Error announcement
<div role="alert" aria-live="assertive">
  Form submission failed. Please check your inputs.
</div>

// ❌ BAD - No live region
<div>
  <Toast>Success!</Toast>
</div>
```

**aria-live values:**
- `polite` - Wait until user is idle to announce (success messages, status updates)
- `assertive` - Interrupt user immediately (errors, critical alerts)
- `off` - Don't announce (default)

**aria-atomic:**
- `true` - Announce entire region
- `false` - Announce only changed content

### Visually Hidden Content

Content that's visually hidden but announced to screen readers:

```tsx
// ✅ GOOD - sr-only utility
<button>
  <XIcon />
  <span className="sr-only">Close dialog</span>
</button>

// CSS for sr-only:
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Color and Contrast

### Contrast Ratios (WCAG 2.1 AA)

- **Normal text** (< 18px regular, < 14px bold): **4.5:1 minimum**
- **Large text** (≥ 18px regular, ≥ 14px bold): **3:1 minimum**
- **UI components** (borders, icons, focus indicators): **3:1 minimum**

### Testing Contrast

Use these tools to verify contrast:

- **Browser DevTools** - Chrome/Edge have built-in contrast checker
- **WebAIM Contrast Checker** - https://webaim.org/resources/contrastchecker/
- **Axe DevTools** - Browser extension with automated checks

### Don't Rely on Color Alone

```tsx
// ❌ BAD - Color only
<div className="text-red-500">Error</div>
<div className="text-green-500">Success</div>

// ✅ GOOD - Color + icon + text
<div className="text-red-500">
  <AlertCircle className="h-4 w-4" />
  <span>Error: Form submission failed</span>
</div>

<div className="text-green-500">
  <CheckCircle className="h-4 w-4" />
  <span>Success: Changes saved</span>
</div>
```

**Requirements:**
- Never use color as the only visual indicator
- Always pair color with icons, text, or patterns
- Ensure sufficient contrast for colorblind users

## Focus Management

### Focus Trap in Modals

When a modal opens, focus must be trapped inside:

```tsx
// ✅ GOOD - Radix Dialog handles this automatically
<Dialog open={isOpen}>
  <DialogContent>
    {/* Focus is trapped here */}
    <input autoFocus />
    <button>Save</button>
    <button onClick={() => setIsOpen(false)}>Cancel</button>
  </DialogContent>
</Dialog>
```

**Requirements:**
- Tab cycles through focusable elements inside modal only
- Shift+Tab cycles backwards
- Background content is inert (not focusable)
- Esc closes modal and returns focus
- Focus returns to trigger element on close

### Focus Order

Focus order must match visual order:

```tsx
// ✅ GOOD - Visual and DOM order match
<form>
  <input name="email" />      {/* Tab stop 1 */}
  <input name="password" />   {/* Tab stop 2 */}
  <button type="submit">     {/* Tab stop 3 */}
    Login
  </button>
</form>

// ❌ BAD - tabIndex disrupts order
<form>
  <input name="email" tabIndex={3} />
  <input name="password" tabIndex={1} />
  <button type="submit" tabIndex={2}>Login</button>
</form>
```

**Requirements:**
- Don't use positive `tabIndex` values (1, 2, 3...)
- Only use `tabIndex={0}` to make non-interactive elements focusable
- Only use `tabIndex={-1}` to remove from tab order (programmatic focus only)

### Auto-Focus Best Practices

```tsx
// ✅ GOOD - Auto-focus first input in modal
<Dialog open={isOpen}>
  <DialogContent>
    <input autoFocus name="title" />
  </DialogContent>
</Dialog>

// ⚠️ CAUTION - Auto-focus on page load (use sparingly)
<input autoFocus name="search" />

// ❌ BAD - Auto-focus on non-form elements
<div autoFocus>Content</div>
```

**When to use autofocus:**
- ✅ First input in a modal/dialog
- ✅ Search input on search page
- ⚠️ First input on a form page (optional)
- ❌ Never on non-form elements
- ❌ Never on multiple elements per page

## ARIA Best Practices

### ARIA Roles

Use ARIA roles only when semantic HTML isn't available:

```tsx
// ✅ GOOD - Semantic HTML (no ARIA needed)
<button>Click me</button>
<nav>...</nav>
<main>...</main>

// ✅ ACCEPTABLE - ARIA when semantic HTML unavailable
<div role="button" tabIndex={0}>Click me</div>
<div role="navigation">...</div>

// ❌ BAD - Redundant ARIA
<button role="button">Click me</button>
<nav role="navigation">...</nav>
```

### ARIA States & Properties

#### aria-expanded

Indicates whether an element is expanded or collapsed:

```tsx
<button aria-expanded={isOpen}>
  Menu
</button>
```

#### aria-selected

Indicates the selected state in tabs, options, etc.:

```tsx
<button role="tab" aria-selected={isActive}>
  Account
</button>
```

#### aria-checked

Indicates the checked state of checkboxes, radios, switches:

```tsx
<button role="checkbox" aria-checked={isChecked}>
  Accept terms
</button>
```

#### aria-disabled vs disabled

```tsx
// ✅ GOOD - Native disabled for buttons
<button disabled>Submit</button>

// ✅ ACCEPTABLE - aria-disabled when you need click events
<button aria-disabled="true" onClick={handleDisabledClick}>
  Submit
</button>

// ❌ BAD - Visual only, still focusable
<button className="opacity-50">Submit</button>
```

#### aria-label vs aria-labelledby

```tsx
// ✅ aria-label - For simple labels
<button aria-label="Close dialog">
  <XIcon />
</button>

// ✅ aria-labelledby - For existing text
<h2 id="dialog-title">Confirm deletion</h2>
<div role="dialog" aria-labelledby="dialog-title">
  ...
</div>

// ✅ Both - Combine for richer context
<button aria-label="Delete user John Doe" aria-describedby="delete-warning">
  Delete
</button>
<p id="delete-warning">This action cannot be undone</p>
```

#### aria-describedby

Provides additional description for an element:

```tsx
// ✅ Error message association
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && (
  <p id="email-error" role="alert">
    Please enter a valid email address
  </p>
)}

// ✅ Help text association
<input
  id="password"
  type="password"
  aria-describedby="password-requirements"
/>
<p id="password-requirements">
  Must be at least 8 characters with 1 number and 1 special character
</p>
```

### ARIA Live Regions

Announce dynamic updates to screen readers:

```tsx
// ✅ Status update (polite)
<div role="status" aria-live="polite">
  {itemsCount} items in cart
</div>

// ✅ Error announcement (assertive)
<div role="alert" aria-live="assertive">
  Payment failed. Please try again.
</div>

// ✅ Loading state
<div role="status" aria-live="polite" aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Data loaded'}
</div>
```

## Testing Guide

### Manual Testing Checklist

#### Keyboard Navigation

- [ ] Tab through entire page - all interactive elements reachable?
- [ ] Tab order matches visual order?
- [ ] Focus visible on all elements?
- [ ] Can activate all buttons/links with Enter/Space?
- [ ] Can dismiss modals with Esc?
- [ ] Can navigate menus with arrow keys?
- [ ] Can use all form controls with keyboard only?

#### Screen Reader Testing

**VoiceOver (macOS):**
```bash
# Start VoiceOver
Cmd + F5

# Navigate
Ctrl + Option + Right/Left Arrow

# Interact with element
Ctrl + Option + Space

# Read all
Ctrl + Option + A
```

**NVDA (Windows):**
```bash
# Start NVDA
Ctrl + Alt + N

# Navigate
Arrow Keys

# Interact
Enter / Space

# Read all
Insert + Down Arrow
```

**Testing checklist:**
- [ ] All images have alt text?
- [ ] Form labels announced correctly?
- [ ] Button purposes clear from announcement?
- [ ] Error messages announced when they appear?
- [ ] Loading states announced?
- [ ] Success messages announced?
- [ ] Headings hierarchical and descriptive?

#### Visual Testing

- [ ] Text readable at 200% zoom?
- [ ] Sufficient color contrast (4.5:1 for text, 3:1 for UI)?
- [ ] Focus indicators visible (3:1 contrast)?
- [ ] Information not conveyed by color alone?
- [ ] Touch targets at least 44x44px on mobile?

### Automated Testing

Run the full accessibility test suite:

```bash
# All components
npm run test:e2e -- tests/accessibility/components.a11y.spec.ts

# Specific component
npm run test:e2e -- tests/accessibility/components.a11y.spec.ts -g "Button"

# Watch mode (re-run on changes)
npm run test:e2e -- tests/accessibility/components.a11y.spec.ts --watch

# Generate HTML reports
npm run test:e2e -- tests/accessibility/components.a11y.spec.ts --reporter=html
```

### Browser DevTools

#### Chrome/Edge Accessibility Inspector

1. Open DevTools (F12)
2. Elements tab → Right panel → Accessibility
3. View accessibility tree for selected element
4. See computed properties (role, name, description)

#### Lighthouse Audit

1. Open DevTools (F12)
2. Lighthouse tab
3. Select "Accessibility" category
4. Run audit
5. Review failing audits and suggestions

## Common Issues and Fixes

### Issue: Button has no accessible name

**Problem:**
```tsx
<button>
  <Icon />
</button>
```

**Fix:**
```tsx
// Option 1: Add aria-label
<button aria-label="Close dialog">
  <XIcon />
</button>

// Option 2: Add sr-only text
<button>
  <XIcon />
  <span className="sr-only">Close dialog</span>
</button>

// Option 3: Add visible text
<button>
  <XIcon />
  <span>Close</span>
</button>
```

### Issue: Form input has no label

**Problem:**
```tsx
<input type="email" placeholder="Email" />
```

**Fix:**
```tsx
// Option 1: Label with htmlFor
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Option 2: Wrapping label
<label>
  Email
  <input type="email" />
</label>

// Option 3: aria-label
<input type="email" aria-label="Email address" />
```

### Issue: Missing heading structure

**Problem:**
```tsx
<h1>Page Title</h1>
<h3>Section Title</h3>  {/* Skipped h2! */}
```

**Fix:**
```tsx
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

### Issue: Color contrast too low

**Problem:**
```tsx
<p className="text-gray-400">Important text</p>  {/* May fail contrast */}
```

**Fix:**
```tsx
// Use darker text for better contrast
<p className="text-gray-700">Important text</p>

// Or test with contrast checker
// Light mode: text-gray-600 or darker
// Dark mode: text-gray-300 or lighter
```

### Issue: Image missing alt text

**Problem:**
```tsx
<img src="/photo.jpg" />
```

**Fix:**
```tsx
// Meaningful alt text
<img src="/photo.jpg" alt="Team meeting in conference room" />

// Decorative images (empty alt)
<img src="/decoration.svg" alt="" />

// Icons with context
<button>
  <img src="/close.svg" alt="" />
  <span>Close dialog</span>
</button>
```

### Issue: Modal doesn't trap focus

**Problem:**
```tsx
<div className="modal">
  <input />
  <button>Save</button>
</div>
```

**Fix:**
```tsx
// Use Radix Dialog (handles focus trap automatically)
<Dialog>
  <DialogContent>
    <input />
    <button>Save</button>
  </DialogContent>
</Dialog>

// Or implement focus trap manually
import { useFocusTrap } from '@/hooks/useFocusTrap';

function Modal({ children }) {
  const trapRef = useFocusTrap();
  return <div ref={trapRef}>{children}</div>;
}
```

### Issue: Tab order doesn't match visual order

**Problem:**
```tsx
<div className="grid grid-cols-2">
  <div>Item 3</div>  {/* Visually on right */}
  <div>Item 1</div>  {/* Visually on left */}
</div>
```

**Fix:**
```tsx
// Ensure DOM order matches visual order
<div className="grid grid-cols-2">
  <div className="order-1">Item 1</div>
  <div className="order-2">Item 2</div>
</div>

// Or restructure your HTML
<div className="flex flex-row-reverse">
  <div>Item 1</div>  {/* Will appear on right */}
  <div>Item 2</div>  {/* Will appear on left */}
</div>
```

## Resources

### Official Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Google's audit tool
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Screen Readers

- [VoiceOver](https://www.apple.com/accessibility/voiceover/) - macOS/iOS (free)
- [NVDA](https://www.nvaccess.org/) - Windows (free)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Windows (paid)
- [TalkBack](https://support.google.com/accessibility/android/answer/6283677) - Android (free)

### Learning Resources

- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [Smashing Magazine A11y](https://www.smashingmagazine.com/category/accessibility)

## Support

For accessibility questions or issues:

1. **Check the test reports** - `tests/accessibility/reports/`
2. **Review this documentation** - Common issues section
3. **Run automated tests** - `npm run test:e2e -- tests/accessibility/`
4. **Manual testing** - Use screen reader and keyboard
5. **Ask for help** - Create an issue on GitHub

Remember: Accessibility is not a one-time task. It's an ongoing commitment to ensure everyone can use your product. 🎯
