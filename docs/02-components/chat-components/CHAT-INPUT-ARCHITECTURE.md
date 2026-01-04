# Chat Input Component Architecture

## Component Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         ChatInput Component                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Typing Indicator (Conditional)                          │    │
│  │ • Sarah Chen is typing...                               │    │
│  │ • Animated dots (staggered bounce)                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ File Attachment Preview (Conditional)                   │    │
│  │ ┌────────┐ ┌────────┐ ┌────────┐                       │    │
│  │ │📎 file1│ │📎 file2│ │📎 file3│                       │    │
│  │ └────────┘ └────────┘ └────────┘                       │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Main Input Container (1px border, shadow-sm)            │    │
│  │                                                          │    │
│  │  ┌──┐  ┌────────────────────────────────┐  ┌──┐ ┌──┐  │    │
│  │  │📎│  │  Auto-growing Textarea         │  │😀│ │▶ │  │    │
│  │  │  │  │  (1-5 lines, 24px-120px)       │  │  │ │  │  │    │
│  │  └──┘  │  Type a message...             │  └──┘ └──┘  │    │
│  │         └────────────────────────────────┘              │    │
│  │        Attach      Textarea         Emoji  Send         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Hints Row                                               │    │
│  │ • Press Enter to send, Shift+Enter for new line         │    │
│  │ • Character counter: 78/78 (conditional)              │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Tree

```
ChatInput
├── Typing Indicator (conditional)
│   ├── Animated Dots (3x span with staggered delay)
│   └── User Name Text
│
├── File Attachment Previews (conditional)
│   └── Badge[] (map over attachedFiles)
│       ├── File Icon (Image or Document)
│       ├── File Name (truncated)
│       └── Remove Button (X icon)
│
├── Input Container (Card-like with border-border)
│   ├── Attach Button (icon-sm)
│   │   └── Paperclip Icon
│   │
│   ├── Hidden File Input
│   │   └── onChange handler
│   │
│   ├── Textarea (auto-resize)
│   │   ├── value (controlled)
│   │   ├── onChange handler
│   │   ├── onKeyDown handler (Enter/Shift+Enter)
│   │   └── Character Counter (conditional, absolute position)
│   │
│   ├── Emoji Button (icon-sm, placeholder)
│   │   └── Smile Icon
│   │
│   └── Send Button (icon-sm)
│       └── Send Icon OR Loader2 Icon (loading state)
│
└── Hints Row
    ├── Keyboard Shortcut Text
    └── Character Counter (conditional)
```

## State Management

```typescript
Component State:
├── attachedFiles: File[]        // Local file attachments
├── fileInputRef: Ref            // Hidden input reference
└── textareaRef: Ref             // Textarea reference (for auto-resize)

Props (Controlled):
├── value: string                // Message text (parent state)
├── onChange: (value) => void    // Update parent state
├── onSend: (value) => void      // Send handler
├── onFileAttach?: (files) => void // File upload handler
├── disabled: boolean            // Disable interactions
├── loading: boolean             // Show spinner
├── showCharCount: boolean       // Display counter
├── maxLength: number            // Max characters
├── showTypingIndicator: boolean // Show typing dots
└── typingUser?: string          // Typing user name
```

## Data Flow

```
User Types
    ↓
onChange(e.target.value)
    ↓
Parent updates state
    ↓
value prop changes
    ↓
Textarea updates + auto-resize
    ↓
Character counter updates


User Presses Enter
    ↓
handleKeyDown detects Enter (no Shift)
    ↓
handleSend() called
    ↓
onSend(value) callback
    ↓
Parent processes message
    ↓
Parent clears value
    ↓
Component resets


User Attaches File
    ↓
Click paperclip → fileInputRef.click()
    ↓
File dialog opens
    ↓
User selects files
    ↓
handleFileSelect(files)
    ↓
setAttachedFiles([...prev, ...files])
    ↓
onFileAttach(files) callback
    ↓
Preview chips render
    ↓
User can remove files
    ↓
Files cleared on send
```

## Auto-Resize Logic

```typescript
useEffect Hook:
    ↓
Watch value changes
    ↓
Set height to "auto" (collapse)
    ↓
Read scrollHeight (content height)
    ↓
Calculate maxHeight (24px × 5 lines = 120px)
    ↓
Set height to min(scrollHeight, maxHeight)
    ↓
Textarea expands or caps at 5 lines
```

## Keyboard Shortcuts

```
┌─────────────────────┬──────────────────────────────┐
│ Key Combination     │ Action                        │
├─────────────────────┼──────────────────────────────┤
│ Enter               │ Send message (if not empty)   │
│ Shift + Enter       │ Insert new line               │
│ Tab                 │ Navigate to next button       │
│ Shift + Tab         │ Navigate to previous button   │
│ Escape (future)     │ Clear input / Close emoji     │
└─────────────────────┴──────────────────────────────┘
```

## CSS Architecture

```css
Design Tokens Used:
├── Colors
│   ├── bg-card                  (Input background)
│   ├── bg-primary               (Send button)
│   ├── text-foreground          (Text)
│   ├── text-muted-foreground    (Placeholder, hints)
│   ├── text-primary-foreground  (Send button text)
│   └── border-border            (Border color)
│
├── Borders
│   ├── border                   (1px thickness)
│   ├── border-border            (Color token)
│   └── rounded-md               (standard radius)
│
├── Shadows
│   ├── shadow-sm                (subtle shadow)
│   └── shadow                   (hover shadow)
│
└── Spacing
    ├── p-2                      (Container padding)
    ├── gap-2                    (Element spacing)
    └── px-3, py-3               (Textarea padding)
```

## Responsive Behavior

```
Mobile (< 640px):
├── Full width container
├── Buttons remain visible
├── File chips wrap to new lines
└── Character counter stays visible

Tablet (640px - 1024px):
├── Same as mobile
├── More chips per row
└── No layout changes

Desktop (> 1024px):
├── Respects max-width from parent
├── All features visible
└── Optimal spacing
```

## Integration Points

```
Parent Component
    ↓
┌───────────────────────────────────────┐
│ State Management                       │
│ • message: string                      │
│ • setMessage: (value) => void          │
│ • handleSend: async (value) => void    │
│ • handleFileUpload: (files) => void    │
└───────────────────────────────────────┘
    ↓
┌───────────────────────────────────────┐
│ ChatInput Component                    │
│ • Controlled by parent state           │
│ • Callbacks for user actions           │
│ • Local state for files/refs           │
└───────────────────────────────────────┘
    ↓
┌───────────────────────────────────────┐
│ Backend Integration                    │
│ • WebSocket: socket.emit("message")    │
│ • HTTP: POST /api/messages             │
│ • File Upload: POST /api/upload        │
└───────────────────────────────────────┘
```

## File Attachment Flow

```
User clicks paperclip
    ↓
fileInputRef.current.click()
    ↓
Browser file dialog opens
    ↓
User selects 3 files
    ↓
handleFileSelect(e.target.files)
    ↓
Convert FileList to File[]
    ↓
setAttachedFiles([...prev, ...newFiles])
    ↓
onFileAttach(newFiles) → Parent handles upload
    ↓
Preview chips render (map over files)
    ↓
User clicks X on file #2
    ↓
removeFile(1) → filter by index
    ↓
setAttachedFiles(prev.filter((_, i) => i !== 1))
    ↓
Preview updates (file #2 removed)
    ↓
User sends message
    ↓
setAttachedFiles([]) → Clear all files
```

## Performance Optimizations

```
1. Controlled Component Pattern
   • Single source of truth (parent state)
   • Predictable updates
   • No internal state duplication

2. Auto-Resize Efficiency
   • useEffect with [value] dependency
   • Only runs on text changes
   • No expensive DOM queries

3. File Previews
   • Stored in component state only
   • Not uploaded until parent handles
   • Lazy rendering (conditional)

4. Typing Indicator
   • Pure CSS animations
   • No JavaScript intervals
   • GPU-accelerated (transform)

5. Character Counter
   • Conditionally rendered
   • Simple string.length (O(1))
   • No complex calculations
```

## Accessibility Tree

```
<div> (container)
    ↓
├── <div> Typing indicator (aria-live="polite" implicit)
│   └── <span> User is typing...
│
├── <div> File previews
│   └── <span role="status"> Files attached (implicit)
│       ├── <Badge> file1.pdf
│       │   └── <button aria-label="Remove file1.pdf">
│       └── <Badge> file2.png
│           └── <button aria-label="Remove file2.png">
│
├── <div> Input container
│   ├── <Button aria-label="Attach file">
│   │   └── <Paperclip />
│   │
│   ├── <input type="file" hidden>
│   │
│   ├── <textarea
│   │     aria-label="Type a message"
│   │     aria-invalid={false}
│   │     aria-describedby="char-count">
│   │
│   ├── <Button aria-label="Add emoji">
│   │   └── <Smile />
│   │
│   └── <Button aria-label="Send message" disabled={!canSend}>
│       └── <Send /> or <Loader2 aria-busy="true" />
│
└── <div> Hints
    └── <span id="char-count">78/78</span>
```

## Testing Strategy

```
Unit Tests (Recommended):
├── Auto-resize logic
│   ✓ Expands from 1 to 5 lines
│   ✓ Caps at 120px height
│   ✓ Collapses when text deleted
│
├── Keyboard shortcuts
│   ✓ Enter sends message
│   ✓ Shift+Enter adds new line
│   ✓ Empty message doesn't send
│
├── File attachments
│   ✓ Files added to preview
│   ✓ Files removed individually
│   ✓ Files cleared on send
│   ✓ onFileAttach callback fires
│
└── Character counter
    ✓ Displays correctly
    ✓ Updates on input
    ✓ Prevents overflow

Integration Tests (Recommended):
├── Full chat flow
│   ✓ Type → Send → Clear
│   ✓ Attach file → Send → Upload
│   ✓ Loading state during send
│
└── Typing indicator
    ✓ Shows when prop true
    ✓ Hides when prop false
    ✓ Displays correct user name
```

## Browser Compatibility Matrix

```
Feature              Chrome  Firefox  Safari  Edge
─────────────────────────────────────────────────
Auto-resize          ✅      ✅       ✅      ✅
File upload          ✅      ✅       ✅      ✅
Keyboard shortcuts   ✅      ✅       ✅      ✅
CSS animations       ✅      ✅       ✅      ✅
Flexbox layout       ✅      ✅       ✅      ✅
Design tokens        ✅      ✅       ✅      ✅
Dark mode            ✅      ✅       ✅      ✅
```

## Future Enhancement Roadmap

```
Phase 1 (Immediate):
├── ✅ Basic input with send
├── ✅ Auto-resize textarea
├── ✅ File attachments
├── ✅ Typing indicator
└── ✅ Character counter

Phase 2 (Optional):
├── 🔲 Emoji picker integration
├── 🔲 Voice recording
├── 🔲 GIF search
└── 🔲 Sticker support

Phase 3 (Advanced):
├── 🔲 @mentions with autocomplete
├── 🔲 Markdown formatting
├── 🔲 Code block syntax highlighting
└── 🔲 Draft auto-save

Phase 4 (Enterprise):
├── 🔲 End-to-end encryption
├── 🔲 Message threading
├── 🔲 Reactions/emojis on messages
└── 🔲 Read receipts
```
