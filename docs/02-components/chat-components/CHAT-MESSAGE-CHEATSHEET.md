# Chat Message Component - Cheat Sheet

## 🎯 Quick Reference

### Import
```tsx
import { ChatMessage, TypingIndicator, MessageThread } from "@/components/ui/chat-message";
```

---

## 📝 Basic Examples

### Simple Message
```tsx
<ChatMessage
  sender={{ name: "Sarah" }}
  content="Hello!"
  timestamp={new Date()}
/>
```

### Your Message
```tsx
<ChatMessage
  sender={{ name: "You" }}
  content="Hi back!"
  timestamp={new Date()}
  isOwn={true}
  status="read"
/>
```

### With Avatar
```tsx
<ChatMessage
  sender={{ name: "Sarah", avatar: "/sarah.jpg" }}
  content="Check my avatar!"
  timestamp={new Date()}
/>
```

---

## 🎨 Status Indicators

```tsx
status="sending"    // 🕒 Clock
status="sent"       // ✓ Single check
status="delivered"  // ✓✓ Double check (gray)
status="read"       // ✓✓ Double check (primary)
```

**Example:**
```tsx
<ChatMessage
  sender={{ name: "You" }}
  content="Message with status"
  timestamp={new Date()}
  isOwn={true}
  status="read"
/>
```

---

## 😀 Reactions

```tsx
<ChatMessage
  sender={{ name: "Sarah" }}
  content="Great work!"
  timestamp={new Date()}
  reactions={[
    { emoji: "👍", count: 3, users: ["Alice", "Bob", "Charlie"] },
    { emoji: "❤️", count: 1, users: ["David"] }
  ]}
  onReact={(emoji) => console.log(emoji)}
/>
```

---

## 📎 Attachments

### Image
```tsx
<ChatMessage
  sender={{ name: "Sarah" }}
  content="Check this out!"
  timestamp={new Date()}
  attachments={[
    { type: "image", url: "/photo.jpg", name: "photo.jpg" }
  ]}
/>
```

### File
```tsx
<ChatMessage
  sender={{ name: "Sarah" }}
  content="Here's the doc"
  timestamp={new Date()}
  attachments={[
    { type: "file", url: "/doc.pdf", name: "proposal.pdf" }
  ]}
/>
```

### Multiple
```tsx
attachments={[
  { type: "image", url: "/photo.jpg" },
  { type: "file", url: "/doc.pdf" }
]}
```

---

## ✏️ Actions

```tsx
<ChatMessage
  sender={{ name: "You" }}
  content="Editable message"
  timestamp={new Date()}
  isOwn={true}
  onEdit={() => handleEdit()}
  onDelete={() => handleDelete()}
/>
```

---

## 💬 Typing Indicator

```tsx
<TypingIndicator
  sender={{ name: "Sarah", avatar: "/sarah.jpg" }}
/>
```

---

## 🧵 Message Thread

```tsx
<MessageThread
  messages={[
    {
      id: "1",
      sender: { name: "Sarah" },
      content: "First",
      timestamp: new Date()
    },
    {
      id: "2",
      sender: { name: "Sarah" },
      content: "Second (grouped)",
      timestamp: new Date()
    },
    {
      id: "3",
      sender: { name: "You" },
      content: "Reply",
      timestamp: new Date(),
      isOwn: true
    }
  ]}
/>
```

---

## 🎭 Complete Example

```tsx
<ChatMessage
  sender={{ name: "Sarah", avatar: "/sarah.jpg" }}
  content="Here's everything together!"
  timestamp={new Date()}
  reactions={[
    { emoji: "🎉", count: 2, users: ["Alice", "Bob"] }
  ]}
  attachments={[
    { type: "image", url: "/demo.png" }
  ]}
  onReact={(emoji) => console.log(emoji)}
/>
```

---

## 📊 Props Quick Ref

| Prop | Type | Required | Example |
|------|------|----------|---------|
| `sender` | `{ name, avatar? }` | ✅ | `{ name: "Sarah" }` |
| `content` | `string` | ✅ | `"Hello!"` |
| `timestamp` | `Date \| string` | ✅ | `new Date()` |
| `isOwn` | `boolean` | ❌ | `true` |
| `status` | Status | ❌ | `"read"` |
| `reactions` | `Array<Reaction>` | ❌ | `[{emoji, count, users}]` |
| `attachments` | `Array<File>` | ❌ | `[{type, url, name}]` |
| `onEdit` | `() => void` | ❌ | `() => edit()` |
| `onDelete` | `() => void` | ❌ | `() => delete()` |
| `onReact` | `(emoji) => void` | ❌ | `(e) => react(e)` |

---

## 🎨 Styling

### Colors (Design Tokens)
```css
/* Other user */
bg-card
text-card-foreground

/* Own message */
bg-primary
text-primary-foreground

/* Accents */
text-muted-foreground  /* timestamps */
text-primary           /* read status */
border-border          /* borders */
```

### Classes
```css
rounded-md             /* standard radius */
border border-border   /* 1px border */
shadow-sm              /* subtle shadow */
shadow                 /* shadow (hover) */
```

---

## 🚀 Common Patterns

### Live Chat
```tsx
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");

const send = () => {
  setMessages([...messages, {
    id: Date.now(),
    sender: { name: "You" },
    content: input,
    timestamp: new Date(),
    isOwn: true,
    status: "sending"
  }]);
  setInput("");
};

return (
  <>
    <MessageThread messages={messages} />
    <Input value={input} onChange={e => setInput(e.target.value)} />
    <Button onClick={send}>Send</Button>
  </>
);
```

### Status Transitions
```tsx
// 1. Add with "sending"
setMessages([...messages, { ...msg, status: "sending" }]);

// 2. Update to "sent"
setTimeout(() => {
  setMessages(prev => prev.map(m =>
    m.id === msgId ? { ...m, status: "sent" } : m
  ));
}, 500);

// 3. Update to "delivered"
setTimeout(() => {
  setMessages(prev => prev.map(m =>
    m.id === msgId ? { ...m, status: "delivered" } : m
  ));
}, 1000);

// 4. Update to "read"
setTimeout(() => {
  setMessages(prev => prev.map(m =>
    m.id === msgId ? { ...m, status: "read" } : m
  ));
}, 1500);
```

### Toggle Typing
```tsx
const [isTyping, setIsTyping] = useState(false);

// Show typing
setIsTyping(true);

// Hide and show message
setTimeout(() => {
  setIsTyping(false);
  setMessages([...messages, newMessage]);
}, 2000);

return (
  <>
    <MessageThread messages={messages} />
    {isTyping && <TypingIndicator sender={{ name: "Sarah" }} />}
  </>
);
```

---

## 🐛 Troubleshooting

### Messages Not Grouping?
✅ Same `sender.name` and `isOwn` value required

### Avatar Not Showing?
✅ Use `showAvatar={true}` and valid URL

### Status Not Appearing?
✅ Status only shows when `isOwn={true}`

### Tooltip Not Working?
✅ Add `users` array to reaction object

---

## 📚 Resources

- **Full Docs:** `chat-message.md`
- **Quick Start:** `CHAT-MESSAGE-QUICK-START.md`
- **Examples:** `#Component showcase at /components` → UI > ChatMessage
- **Demo:** `/demo/chat` page

---

## 💡 Pro Tips

1. Use `MessageThread` for auto-grouping
2. Implement optimistic updates for UX
3. Virtualize with `react-window` for 100+ msgs
4. Debounce typing indicators
5. Compress images before upload
6. Use transitions for smooth status changes
7. Cache avatars to reduce requests

---

**Ready to chat! 💬**
