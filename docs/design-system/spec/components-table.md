# Table Component Specification

> Canonical implementation for all data tables in Fabrk.

---

## Overview

**Table** is a molecule-level component for displaying tabular data. It follows terminal aesthetic with sharp borders, mono font, and clear header distinction.

---

## Canonical Implementation

### Import

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
```

### Basic Usage

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Token Mappings

| Property          | Token                         | Value (Terminal Theme)        |
| ----------------- | ----------------------------- | ----------------------------- |
| Header Background | `color.bg.muted`              | `bg-muted`                    |
| Header Text       | `color.text.muted-foreground` | `text-muted-foreground`       |
| Row Border        | `color.border.border`         | `border-border`               |
| Row Hover         | `color.bg.muted`              | `hover:bg-muted/50`           |
| Font Family       | `font.family.mono`            | `font-mono` (via `mode.font`) |
| Font Size         | `font.size.xs`                | `text-xs` (12px)              |
| Header Height     | `size.component.tableHead`    | `h-12` (48px)                 |
| Cell Padding      | `space.component.cell`        | `p-4` (16px)                  |

---

## Subcomponents

### Table (Container)

```tsx
<Table className={cn('w-full caption-bottom text-xs', mode.font)} />
```

Wrapped in scrollable container for responsive overflow.

### TableHeader

```tsx
<TableHeader className="[&_tr]:border-b" />
```

### TableHead

```tsx
<TableHead
  className={cn(
    'bg-muted text-muted-foreground h-12 px-4 text-left align-middle text-xs font-semibold',
    mode.font
  )}
/>
```

### TableBody

```tsx
<TableBody className="[&_tr:last-child]:border-0" />
```

### TableRow

```tsx
<TableRow className="border-border hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors" />
```

### TableCell

```tsx
<TableCell className="p-4 align-middle" />
```

### TableFooter

```tsx
<TableFooter className="bg-muted/50 border-t font-semibold [&>tr]:last:border-b-0" />
```

### TableCaption

```tsx
<TableCaption className={cn('text-muted-foreground mt-4 text-xs', mode.font)} />
```

---

## Props

### TableHead

| Prop        | Type     | Default | Description         |
| ----------- | -------- | ------- | ------------------- |
| `scope`     | `string` | `"col"` | Accessibility scope |
| `className` | `string` | -       | Additional styling  |

### TableRow

| Prop         | Type     | Default | Description                    |
| ------------ | -------- | ------- | ------------------------------ |
| `data-state` | `string` | -       | Selection state (`"selected"`) |

---

## Common Patterns

### With Sorting

```tsx
<TableHead>
  <Button variant="ghost" onClick={handleSort}>
    Name
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
</TableHead>
```

### With Selection

```tsx
<TableRow data-state={isSelected ? 'selected' : undefined}>
  <TableCell>
    <Checkbox checked={isSelected} onCheckedChange={setSelected} />
  </TableCell>
  <TableCell>John Doe</TableCell>
</TableRow>
```

### With Actions

```tsx
<TableCell>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>
```

### With Caption

```tsx
<Table>
  <TableCaption>A list of recent transactions.</TableCaption>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

---

## Anti-Patterns (Do Not Do)

### ❌ Using font-black on headers

```tsx
// WRONG - font-black not in design system
<TableHead className="font-black">Name</TableHead>

// CORRECT - use font-semibold (default)
<TableHead>Name</TableHead>
```

### ❌ Arbitrary padding

```tsx
// WRONG - non-standard padding
<TableCell className="p-2">Data</TableCell>

// CORRECT - use default padding
<TableCell>Data</TableCell>
```

### ❌ Missing scope on TableHead

```tsx
// WRONG - no scope
<th>Header</th>

// CORRECT - use TableHead with default scope
<TableHead>Header</TableHead>
```

---

## Responsive Behavior

Table component wraps content in `overflow-auto` container:

```tsx
<div className="relative w-full overflow-auto">
  <table>...</table>
</div>
```

For very wide tables, horizontal scroll is automatically enabled.

---

## Accessibility

- `scope="col"` applied to TableHead by default
- Selection state communicated via `data-state`
- Hover/focus states for keyboard navigation
- Caption provides table context for screen readers

---

## Files

- **Component:** `src/components/ui/table.tsx`
- **Spec:** `design-system/spec/components-table.md`
- **Usage Examples:** `src/app/docs/components/table/page.tsx`

---

_Table Component Specification v1.0.0_
