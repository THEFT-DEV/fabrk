# Tabs Component Specification

> Canonical implementation for all tabbed interfaces in Fabrk.

---

## Overview

**Tabs** is a molecule-level component for organizing content into tabbed panels. It follows terminal aesthetic with sharp corners, mono font, and clear active states.

---

## Canonical Implementation

### Import

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
```

### Basic Usage

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for Tab 1</TabsContent>
  <TabsContent value="tab2">Content for Tab 2</TabsContent>
  <TabsContent value="tab3">Content for Tab 3</TabsContent>
</Tabs>
```

---

## Token Mappings

| Property                    | Token                         | Value (Terminal Theme)             |
| --------------------------- | ----------------------------- | ---------------------------------- |
| List Background             | `color.bg.muted`              | `bg-muted`                         |
| List Border                 | `color.border.default`        | `border` (1px)                     |
| List Border Radius          | `radius.semantic.tabs`        | `rounded-none` (via `mode.radius`) |
| Trigger Background (active) | `color.bg.background`         | `bg-background`                    |
| Trigger Text                | `color.text.muted-foreground` | `text-muted-foreground`            |
| Trigger Text (active)       | `color.text.foreground`       | `text-foreground`                  |
| Font Family                 | `font.family.mono`            | `font-mono` (via `mode.font`)      |
| Font Size                   | `font.size.xs`                | `text-xs` (12px)                   |
| List Height                 | `size.component.tabs`         | `h-10` (40px)                      |
| Padding                     | `space.component.padding`     | `px-4 py-2`                        |

---

## Subcomponents

### Tabs (Container)

```tsx
<Tabs className="w-full" defaultValue="tab1" />
```

### TabsList

```tsx
<TabsList
  className={cn(
    'bg-muted text-foreground inline-flex h-10 items-center justify-center border p-2',
    mode.radius
  )}
/>
```

### TabsTrigger

```tsx
<TabsTrigger
  className={cn(
    'text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium',
    mode.radius,
    mode.font
  )}
/>
```

### TabsContent

```tsx
<TabsContent className="focus-visible:ring-primary mt-4 focus-visible:ring-2" />
```

---

## Props

### Tabs

| Prop            | Type       | Default        | Description               |
| --------------- | ---------- | -------------- | ------------------------- |
| `defaultValue`  | `string`   | -              | Default active tab        |
| `value`         | `string`   | -              | Controlled active tab     |
| `onValueChange` | `function` | -              | Callback when tab changes |
| `orientation`   | `string`   | `"horizontal"` | Tab orientation           |

### TabsTrigger

| Prop       | Type      | Default      | Description    |
| ---------- | --------- | ------------ | -------------- |
| `value`    | `string`  | **REQUIRED** | Tab identifier |
| `disabled` | `boolean` | `false`      | Disable tab    |

### TabsContent

| Prop    | Type     | Default      | Description          |
| ------- | -------- | ------------ | -------------------- |
| `value` | `string` | **REQUIRED** | Associated tab value |

---

## Common Patterns

### Full Width Tabs

```tsx
<Tabs defaultValue="overview" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="overview" className="flex-1">
      Overview
    </TabsTrigger>
    <TabsTrigger value="analytics" className="flex-1">
      Analytics
    </TabsTrigger>
    <TabsTrigger value="settings" className="flex-1">
      Settings
    </TabsTrigger>
  </TabsList>
  ...
</Tabs>
```

### With Icons

```tsx
<TabsTrigger value="code">
  <Code className="h-4 w-4" />
  Code
</TabsTrigger>
```

### Controlled Tabs

```tsx
const [activeTab, setActiveTab] = useState('tab1');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  ...
</Tabs>;
```

---

## Anti-Patterns (Do Not Do)

### ❌ Hardcoding radius

```tsx
// WRONG - hardcoded radius
<TabsList className="rounded-lg">

// CORRECT - let mode.radius apply
<TabsList>
```

### ❌ Mismatched values

```tsx
// WRONG - trigger and content values don't match
<TabsTrigger value="tab1">Tab 1</TabsTrigger>
<TabsContent value="panel1">Content</TabsContent>

// CORRECT - matching values
<TabsTrigger value="tab1">Tab 1</TabsTrigger>
<TabsContent value="tab1">Content</TabsContent>
```

---

## Accessibility

- Full keyboard navigation (Arrow keys, Home, End)
- `role="tablist"`, `role="tab"`, `role="tabpanel"` automatically applied
- Focus ring on active trigger
- ARIA attributes managed by Radix

---

## Files

- **Component:** `src/components/ui/tabs.tsx`
- **Spec:** `design-system/spec/components-tabs.md`
- **Usage Examples:** `src/app/docs/components/tabs/page.tsx`

---

_Tabs Component Specification v1.0.0_
