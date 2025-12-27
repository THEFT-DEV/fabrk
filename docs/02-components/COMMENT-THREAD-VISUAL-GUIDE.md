# Comment Thread - Visual Component Guide

## Component Structure

```
CommentThread (Main Container)
├── Sorting Controls
│   ├── [newest] Button
│   ├── [oldest] Button
│   └── [top] Button
│
└── Comments List
    └── SingleComment (Recursive)
        ├── Avatar
        ├── Comment Card
        │   ├── Header
        │   │   ├── Author Name
        │   │   ├── Timestamp
        │   │   └── Actions Menu (owner-only, on hover)
        │   │       ├── Edit
        │   │       └── Delete
        │   │
        │   └── Content
        │       ├── Text Display (default)
        │       └── Edit Form (when editing)
        │
        ├── Action Buttons
        │   ├── Like Button (heart icon + count)
        │   ├── Reply Button
        │   └── Show/Hide Replies Button (if has replies)
        │
        ├── Reply Form (when replying)
        │   ├── Textarea
        │   ├── Submit Button
        │   └── Cancel Button
        │
        └── Nested Replies (recursive SingleComment)
```

## Visual Layout

### Single Comment (No Nesting)
```
┌─────────────────────────────────────────────────────────┐
│ 👤  Sarah Johnson                          ⋮ (hover)    │
│     2 hours ago                                          │
│                                                          │
│     This is a comment with some content that could      │
│     span multiple lines. It uses neobrutalism design    │
│     with bold borders and hard shadows.                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
    ❤ 24    💬 Reply    🔽 Hide 3 replies
```

### Nested Comment Thread
```
┌─────────────────────────────────────────────────────────┐
│ 👤  Emma Wilson                                          │
│     3 hours ago                                          │
│                                                          │
│     Has anyone integrated this with a backend yet?      │
│                                                          │
└─────────────────────────────────────────────────────────┘
    ❤ 15    💬 Reply    🔽 Hide 2 replies

    ┌─────────────────────────────────────────────────────┐  (32px indent)
    │ 👤  David Park                                      │
    │     2.5 hours ago                                   │
    │                                                     │
    │     Yes! I'm using Prisma with self-referential... │
    │                                                     │
    └─────────────────────────────────────────────────────┘
        ❤ 8    💬 Reply

        ┌─────────────────────────────────────────────────┐  (64px indent)
        │ 👤  Emma Wilson                        ⋮        │
        │     2 hours ago                                 │
        │                                                 │
        │     That's exactly what I needed!              │
        │                                                 │
        └─────────────────────────────────────────────────┘
            ❤ 3    💬 Reply
```

### Owner Comment (Edit/Delete Options)
```
┌─────────────────────────────────────────────────────────┐
│ 👤  You (Current User)                       ⋮          │ <- Hover to see menu
│     30 minutes ago                           │          │
│                                              ├─────────┐│
│     This is my own comment.                 │ ✏️ Edit  ││
│     I can edit or delete it!                │ 🗑️ Delete││
│                                              └─────────┘│
└─────────────────────────────────────────────────────────┘
    ❤️ 5 (filled heart)    💬 Reply
```

### Reply Form (Active)
```
┌─────────────────────────────────────────────────────────┐
│ 👤  Sarah Johnson                                        │
│     2 hours ago                                          │
│                                                          │
│     This is a comment you want to reply to.             │
│                                                          │
└─────────────────────────────────────────────────────────┘
    ❤ 24    💬 Reply (active)

    ┌─────────────────────────────────────────────────────┐
    │                                                     │
    │  ┌───────────────────────────────────────────────┐ │
    │  │ Write a reply...                              │ │
    │  │                                               │ │
    │  │                                               │ │
    │  └───────────────────────────────────────────────┘ │
    │                                                     │
    │  [Reply]  [Cancel]                                 │
    │                                                     │
    └─────────────────────────────────────────────────────┘
```

### Edit Mode
```
┌─────────────────────────────────────────────────────────┐
│ 👤  You (Current User)                                   │
│     30 minutes ago                                       │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ This is my edited comment content...              │  │
│  │                                                   │  │
│  │                                                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  [Save]  [Cancel]                                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│                         💬                              │
│                                                          │
│                  No comments yet                        │
│          Be the first to share your thoughts!          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Color Scheme (Neobrutalism)

```css
/* Comment Card */
background: var(--card)                /* White */
border: 2px solid var(--border)        /* Black */
shadow: 2px 2px 0px 0px var(--border)  /* Hard shadow */

/* Avatar */
border: 2px solid var(--border)
shadow: 2px 2px 0px 0px var(--border)
background: var(--secondary)           /* Light purple */

/* Like Button (default) */
color: var(--foreground)               /* Dark gray */

/* Like Button (liked) */
color: var(--destructive)              /* Red */
fill: var(--destructive)               /* Filled heart */

/* Reply/Edit Buttons */
background: var(--primary)             /* Purple */
color: var(--primary-foreground)       /* White */
border: 2px solid var(--border)
shadow: 2px 2px 0px 0px var(--border)

/* Dropdown Menu */
background: var(--card)
border: 2px solid var(--border)
shadow: 2px 2px 0px 0px var(--border)

/* Textarea (Reply/Edit) */
border: 2px solid var(--border)
background: var(--background)
rounded: var(--radius-brutal)          /* 8px */
```

## Interaction States

### Like Animation
```
Before Click:        After Click:
   ♡ 24      →         ❤️ 25
  (outline)           (filled, red)
```

### Reply Flow
```
1. Initial State          2. Click "Reply"         3. Submit Reply
   ───────────              ───────────              ───────────
   [Comment]                [Comment]                [Comment]
   ❤ 24 💬 Reply           ❤ 24 💬 Reply            ❤ 24 🔽 1 reply
                           ┌──────────┐
                           │ Textarea │              ┌─────────┐
                           │ [Reply]  │         →    │ New     │
                           └──────────┘              │ Reply   │
                                                     └─────────┘
```

### Sorting Flow
```
Sort Buttons: [newest*] [oldest] [top]
                  ↓
Click [top]:  [newest] [oldest] [top*]
                  ↓
Comments reorder by like count (highest first)
Nested replies also reorder within their parent
```

## Responsive Behavior

### Desktop (>768px)
- Full indentation (32px per level)
- Avatar 40px × 40px
- Dropdown menu appears on hover
- All features visible

### Mobile (<768px)
- Reduced indentation (16px per level)
- Avatar 32px × 32px
- Dropdown menu always visible (tap to open)
- Compact action buttons

## Accessibility Features

### Keyboard Navigation
```
Tab       → Move between comments
Enter     → Activate focused button (like, reply, etc.)
Esc       → Close reply/edit form
Space     → Toggle checkboxes/buttons
Arrow Up  → Navigate dropdown menu items
Arrow Down→ Navigate dropdown menu items
```

### Screen Reader Announcements
```
Comment card        → "Comment by [Author], [Timestamp]"
Like button         → "Like button, [count] likes, [liked/not liked]"
Reply button        → "Reply to [Author]'s comment"
Edit button         → "Edit your comment"
Delete button       → "Delete your comment"
Nested replies      → "[count] replies, show/hide toggle"
```

## Theme Integration

The component uses Fabrk's design token system:

```typescript
// Text colors
text-foreground          // Main text (author name, content)
text-muted-foreground    // Secondary text (timestamp)
text-primary             // Accent color
text-destructive         // Like button (when liked)

// Background colors
bg-card                  // Comment card background
bg-primary               // Button background
bg-accent                // Hover states

// Border colors
border-brutal            // All borders (2px solid)

// Shadows
shadow-brutal            // Hard shadow (2px 2px 0px)

// Border radius
rounded-brutal           // 8px rounded corners
```

## Animation Timing

```css
/* Like button color change */
transition: color 0.2s ease

/* Shadow on hover (buttons) */
transition: box-shadow 0.2s ease

/* Form appearance */
transition: opacity 0.15s ease

/* Dropdown menu */
transition: opacity 0.1s ease
```

## Z-Index Hierarchy

```
Base comment card:         z-index: 1
Action buttons:            z-index: 2
Dropdown menu trigger:     z-index: 3
Dropdown menu content:     z-index: 50 (Radix default)
Reply/edit forms:          z-index: 2
```

## Performance Optimization Points

1. **Optimistic Updates** - Likes update immediately (no API wait)
2. **Lazy Rendering** - Only render visible nested replies
3. **Memoization** - SingleComment could use React.memo
4. **Virtual Scrolling** - For 100+ comments (not implemented)
5. **Debouncing** - Edit/reply submissions (not implemented)

## Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ iOS Safari 14+
✅ Chrome Mobile 90+

## Component Size

- **Component code**: ~465 lines
- **Bundle size**: ~12KB (uncompressed)
- **Dependencies**: date-fns, lucide-react, Radix primitives
- **No external CSS** - All styling via Tailwind classes

---

**Visual Guide Complete** - This document provides a comprehensive visual reference for the Comment Thread component's structure, layout, states, and interactions.
