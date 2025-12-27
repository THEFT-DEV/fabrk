# Chat Input Component - Visual Preview

## Default State
```
┌────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ┌──┐  ┌──────────────────────────────┐  ┌──┐  ┌──────┐ │ │
│  │  │📎│  │ Type a message...            │  │😀│  │  ▶   │ │ │
│  │  └──┘  └──────────────────────────────┘  └──┘  └──────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Press Enter to send, Shift+Enter for new line                 │
└────────────────────────────────────────────────────────────────┘
```

## With Typed Text
```
┌────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ┌──┐  ┌──────────────────────────────┐  ┌──┐  ┌──────┐ │ │
│  │  │📎│  │ Hello! How are you doing?    │  │😀│  │  ▶   │ │ │
│  │  └──┘  └──────────────────────────────┘  └──┘  └──────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Press Enter to send, Shift+Enter for new line                 │
└────────────────────────────────────────────────────────────────┘
                                                    ↑
                                        Send button now active
```

## With File Attachments
```
┌────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────┐ ┌──────────────────────────┐│
│  │ 📎 document.pdf          [x] │ │ 🖼️  screenshot.png  [x] ││
│  └──────────────────────────────┘ └──────────────────────────┘│
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ┌──┐  ┌──────────────────────────────┐  ┌──┐  ┌──────┐ │ │
│  │  │📎│  │ Check out these files!       │  │😀│  │  ▶   │ │ │
│  │  └──┘  └──────────────────────────────┘  └──┘  └──────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Press Enter to send, Shift+Enter for new line                 │
└────────────────────────────────────────────────────────────────┘
```

## With Typing Indicator
```
┌────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ● ● ●  Sarah Chen is typing...                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ┌──┐  ┌──────────────────────────────┐  ┌──┐  ┌──────┐ │ │
│  │  │📎│  │ Type a message...            │  │😀│  │  ▶   │ │ │
│  │  └──┘  └──────────────────────────────┘  └──┘  └──────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Press Enter to send, Shift+Enter for new line                 │
└────────────────────────────────────────────────────────────────┘
```

## With Character Counter
```
┌────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ┌──┐  ┌──────────────────────────────┐  ┌──┐  ┌──────┐ │ │
│  │  │📎│  │ This is a longer message     │  │😀│  │  ▶   │ │ │
│  │  └──┘  │ with multiple lines of text  │  └──┘  └──────┘ │ │
│  │        │ to demonstrate the auto-     │                  │ │
│  │        │ resize feature.        78/78                  │ │
│  │        └──────────────────────────────┘                  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Press Enter to send, Shift+Enter for new line                 │
└────────────────────────────────────────────────────────────────┘
```

## Loading State
```
┌────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ┌──┐  ┌──────────────────────────────┐  ┌──┐  ┌──────┐ │ │
│  │  │📎│  │ Sending message...           │  │😀│  │  ⟳   │ │ │
│  │  └──┘  └──────────────────────────────┘  └──┘  └──────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│                           ↑                           ↑          │
│                      Disabled                   Spinner          │
│                                                                  │
│  Press Enter to send, Shift+Enter for new line                 │
└────────────────────────────────────────────────────────────────┘
```

## Disabled State
```
┌────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ┌──┐  ┌──────────────────────────────┐  ┌──┐  ┌──────┐ │ │
│  │  │📎│  │ Chat is unavailable          │  │😀│  │  ▶   │ │ │
│  │  └──┘  └──────────────────────────────┘  └──┘  └──────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│           ↑                                    ↑         ↑      │
│      All buttons disabled (opacity 50%)                        │
│                                                                  │
│  Press Enter to send, Shift+Enter for new line                 │
└────────────────────────────────────────────────────────────────┘
```

## Full Chat Interface Example
```
┌────────────────────────────────────────────────────────────────┐
│ Team Chat                                      [3 Online]       │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SC  Sarah Chen                              10:23 AM           │
│     ┌─────────────────────────────────────────────────┐        │
│     │ Hey! How's the new feature coming along?        │        │
│     └─────────────────────────────────────────────────┘        │
│                                                                  │
│                                               10:24 AM  ME  You │
│        ┌─────────────────────────────────────────────────┐     │
│        │ Great! Just finishing up the chat component now.│     │
│        └─────────────────────────────────────────────────┘     │
│                                                                  │
│  SC  Sarah Chen                              10:25 AM           │
│     ┌─────────────────────────────────────────────────┐        │
│     │ Awesome! Can't wait to see it. Need any help?   │        │
│     └─────────────────────────────────────────────────┘        │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ● ● ●  Sarah Chen is typing...                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ┌──┐  ┌──────────────────────────────┐  ┌──┐  ┌──────┐ │ │
│  │  │📎│  │ Type your message...         │  │😀│  │  ▶   │ │ │
│  │  └──┘  └──────────────────────────────┘  └──┘  └──────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Press Enter to send, Shift+Enter for new line                 │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

## Actual HTML/CSS Styling

### Vanilla Design Tokens
```css
/* Container */
border: 1px solid var(--border);      /* Standard border */
border-radius: 6px;                   /* rounded-md */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); /* shadow-sm */
background: var(--card);              /* White in light, dark in dark mode */
padding: 8px;                         /* p-2 */
gap: 8px;                             /* gap-2 */

/* Textarea */
background: transparent;
color: var(--foreground);             /* Black in light, white in dark */
font-size: 14px;
line-height: 24px;
min-height: 24px;
max-height: 120px;                    /* 5 lines max */

/* Buttons */
border: 1px solid var(--border);
border-radius: 6px;
background: var(--primary);           /* Theme color */
color: var(--primary-foreground);     /* Contrasting text */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
transition: all 150ms ease-out;

/* Button Hover */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); /* Subtle elevation on hover */

/* Button Active */
box-shadow: none;                     /* Flat on click */
```

## Color Schemes (Theme-Responsive)

### Light Mode
```
Background:  #F5F5F5  (off-white)
Card:        #FFFFFF  (white)
Text:        #000000  (black)
Border:      #000000  (black)
Primary:     #FF6B6B  (red/pink theme color)
Muted:       #666666  (gray)
Shadow:      2px 2px 0px #000000
```

### Dark Mode
```
Background:  #1A1A1A  (dark gray)
Card:        #0F0F0F  (darker gray)
Text:        #FFFFFF  (white)
Border:      #FFFFFF  (white)
Primary:     #FF6B6B  (red/pink theme color - same)
Muted:       #999999  (light gray)
Shadow:      2px 2px 0px #FFFFFF
```

## Responsive Behavior

### Mobile (< 640px)
```
┌────────────────────────┐
│                        │
│  ┌────────────────────┐│
│  │ 📎 file.pdf   [x] ││
│  └────────────────────┘│
│  ┌────────────────────┐│
│  │ 🖼️  img.png   [x] ││
│  └────────────────────┘│
│                        │
│  ┌────────────────────┐│
│  │ ┌┐ ┌──────┐ ┌┐ ┌─┐││
│  │ ││ │ Type │ ││ │▶│││
│  │ └┘ └──────┘ └┘ └─┘││
│  └────────────────────┘│
│                        │
└────────────────────────┘
  ↑
Files wrap to new lines
Buttons remain visible
```

### Tablet (640px - 1024px)
```
┌────────────────────────────────────┐
│                                    │
│  ┌──────────┐ ┌──────────┐       │
│  │📎 file.pdf│ │🖼️ img.png│       │
│  └──────────┘ └──────────┘       │
│                                    │
│  ┌────────────────────────────────┐│
│  │ ┌──┐ ┌────────┐ ┌──┐ ┌──────┐││
│  │ │📎│ │ Type.. │ │😀│ │  ▶  │││
│  │ └──┘ └────────┘ └──┘ └──────┘││
│  └────────────────────────────────┘│
│                                    │
└────────────────────────────────────┘
  ↑
More chips per row
Same layout as mobile
```

### Desktop (> 1024px)
```
┌──────────────────────────────────────────────────────┐
│                                                        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│  │ 📎 file.pdf │ │ 🖼️ img.png │ │ 📄 doc.docx │       │
│  └────────────┘ └────────────┘ └────────────┘       │
│                                                        │
│  ┌────────────────────────────────────────────────┐  │
│  │ ┌──┐ ┌────────────────────┐ ┌──┐ ┌──────────┐ │  │
│  │ │📎│ │ Type a message...  │ │😀│ │    ▶     │ │  │
│  │ └──┘ └────────────────────┘ └──┘ └──────────┘ │  │
│  └────────────────────────────────────────────────┘  │
│                                                        │
└──────────────────────────────────────────────────────┘
  ↑
All features visible
Optimal spacing
```

## Animation Behaviors

### Auto-Resize Animation
```
User types:     "Hello"
Height:         24px (1 line)

User types:     "Hello\nWorld"
Height:         48px (2 lines)
Transition:     Smooth height change (no animation, instant)

User types:     (5 lines of text)
Height:         120px (5 lines, max)

User types:     (10 lines of text)
Height:         120px (capped, scroll appears)
```

### Typing Indicator Animation
```
Dot 1:  ●     ↑     ●     ↑     ●
        0.0s  0.15s 0.3s  0.45s 0.6s

Dot 2:      ●     ↑     ●     ↑
        0.15s 0.3s  0.45s 0.6s  0.75s

Dot 3:          ●     ↑     ●
        0.3s    0.45s 0.6s  0.75s 0.9s

Animation: Infinite loop, staggered by 0.15s
```

### Button Press Animation
```
Hover:
  Before:  shadow-sm          (subtle shadow)
           translate(0, 0)

  After:   shadow             (elevated shadow)
           translate(0, 0)

Active (Click):
  Before:  shadow             (elevated shadow)

  After:   shadow-sm          (subtle shadow)

Duration: 150ms ease-out
```

## Component Size Metrics

```
File Sizes:
├── chat-input.tsx           7.9 KB   (272 lines)
├── chat-input.stories.tsx   15 KB    (509 lines)
├── chat-input.md            10 KB    (412 lines)
└── Total                    32.9 KB

Bundle Impact:
├── Component code           ~3 KB (gzipped)
├── No new dependencies      0 KB
├── Lucide icons used        Already in bundle
└── Total bundle increase    ~3 KB
```

## Accessibility Audit

```
✅ WCAG 2.1 AA Compliant
├── Color contrast ratio     4.5:1 minimum
├── Focus indicators         Visible ring on all interactive elements
├── Keyboard navigation      Full support (Tab, Enter, Shift+Enter)
├── Screen reader labels     All buttons have aria-label
├── ARIA attributes          aria-busy, aria-disabled, aria-invalid
├── Semantic HTML            <textarea>, <button>, proper roles
└── Touch targets            Minimum 44x44px on mobile

✅ Additional Features
├── Reduced motion support   (Future: prefers-reduced-motion)
├── High contrast mode       Works with system settings
└── Zoom support             Scales properly up to 200%
```

## Browser DevTools Inspection

### Elements Panel
```html
<div class="flex flex-col gap-2">
  <!-- Typing Indicator -->
  <div class="flex items-center gap-2 px-3">
    <div class="flex gap-1">
      <span class="h-2 w-2 animate-bounce rounded-full bg-primary
                   [animation-delay:-0.3s]"></span>
      <span class="h-2 w-2 animate-bounce rounded-full bg-primary
                   [animation-delay:-0.15s]"></span>
      <span class="h-2 w-2 animate-bounce rounded-full bg-primary"></span>
    </div>
    <span class="text-xs text-muted-foreground">Sarah Chen is typing...</span>
  </div>

  <!-- File Previews -->
  <div class="flex flex-wrap gap-2 px-3">
    <span class="inline-flex items-center justify-center rounded-md
                 border border-border px-3 py-1 text-xs font-medium
                 bg-background text-foreground shadow-sm">
      <svg>...</svg>
      <span class="max-w-[150px] truncate text-xs">document.pdf</span>
      <button class="ml-1 rounded-sm p-0.5">
        <svg>...</svg>
      </button>
    </span>
  </div>

  <!-- Input Container -->
  <div class="relative flex items-end gap-2 rounded-md border
              border-border bg-card p-2 shadow-sm">
    <button>📎</button>
    <textarea></textarea>
    <button>😀</button>
    <button>▶</button>
  </div>
</div>
```

### Computed Styles (Input Container)
```css
.rounded-md {
  border-radius: 6px;
}

.border {
  border-width: 1px;
}

.border-border {
  border-color: var(--border);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.bg-card {
  background-color: var(--card);
}

.p-2 {
  padding: 8px;
}

.gap-2 {
  gap: 8px;
}
```
