# Chat Message Component - Quick Start Guide

## 🚀 Installation

The component is ready to use - no installation needed! All dependencies are already in the Fabrk boilerplate.

## 📦 Import

```tsx
import {
  ChatMessage,
  TypingIndicator,
  MessageThread,
} from "@/components/ui/chat-message";
```

## 🎯 Basic Usage

### Single Message

```tsx
<ChatMessage
  sender={{ name: "Sarah Johnson", avatar: "/avatar.jpg" }}
  content="Hey! How are you?"
  timestamp={new Date()}
/>
```

### Your Own Message

```tsx
<ChatMessage
  sender={{ name: "You" }}
  content="I'm doing great!"
  timestamp={new Date()}
  isOwn={true}
  status="read"
/>
```

### Message Thread (Auto-Grouping)

```tsx
<MessageThread
  messages={[
    {
      id: "1",
      sender: { name: "Sarah" },
      content: "First message",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: { name: "Sarah" },
      content: "Second message (will be grouped)",
      timestamp: new Date(),
    },
    {
      id: "3",
      sender: { name: "You" },
      content: "My reply",
      timestamp: new Date(),
      isOwn: true,
      status: "read",
    },
  ]}
/>
```

### Typing Indicator

```tsx
<TypingIndicator
  sender={{ name: "Sarah", avatar: "/avatar.jpg" }}
/>
```

## 🎨 Common Patterns

### With Reactions

```tsx
<ChatMessage
  sender={{ name: "Sarah" }}
  content="Great work! 🚀"
  timestamp={new Date()}
  reactions={[
    { emoji: "👍", count: 3, users: ["Alice", "Bob", "Charlie"] },
    { emoji: "❤️", count: 2, users: ["David", "Emma"] },
  ]}
  onReact={(emoji) => handleReaction(emoji)}
/>
```

### With Image Attachment

```tsx
<ChatMessage
  sender={{ name: "Sarah" }}
  content="Check out this screenshot!"
  timestamp={new Date()}
  attachments={[
    {
      type: "image",
      url: "https://example.com/image.png",
      name: "screenshot.png",
    },
  ]}
/>
```

### With File Attachment

```tsx
<ChatMessage
  sender={{ name: "Sarah" }}
  content="Here's the document"
  timestamp={new Date()}
  attachments={[
    {
      type: "file",
      url: "https://example.com/doc.pdf",
      name: "project-proposal.pdf",
    },
  ]}
/>
```

### With Edit/Delete Actions

```tsx
<ChatMessage
  sender={{ name: "You" }}
  content="This message can be edited or deleted"
  timestamp={new Date()}
  isOwn={true}
  status="delivered"
  onEdit={() => handleEdit(messageId)}
  onDelete={() => handleDelete(messageId)}
/>
```

## 🔧 Full Example - Live Chat

```tsx
"use client";

import { useState } from "react";
import { ChatMessage, TypingIndicator } from "@/components/ui/chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatExample() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: { name: "Sarah", avatar: "/sarah.jpg" },
      content: "Hey! How's it going?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: `msg-${Date.now()}`,
        sender: { name: "You" },
        content: newMessage,
        timestamp: new Date(),
        isOwn: true,
        status: "sending",
      },
    ]);
    setNewMessage("");

    // Simulate message sent
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, status: "read" } : m
        )
      );
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="h-[600px] overflow-y-auto mb-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
        {isTyping && <TypingIndicator sender={{ name: "Sarah" }} />}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
```

## 📊 Props Reference

### ChatMessage Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `sender` | `{ name: string; avatar?: string }` | ✅ | - | Message sender info |
| `content` | `string` | ✅ | - | Message text content |
| `timestamp` | `Date \| string` | ✅ | - | Message timestamp |
| `isOwn` | `boolean` | ❌ | `false` | Is current user's message |
| `status` | `"sending" \| "sent" \| "delivered" \| "read"` | ❌ | - | Delivery status |
| `reactions` | `Array<{ emoji, count, users }>` | ❌ | - | Emoji reactions |
| `attachments` | `Array<{ type, url, name }>` | ❌ | - | File/image attachments |
| `onEdit` | `() => void` | ❌ | - | Edit handler |
| `onDelete` | `() => void` | ❌ | - | Delete handler |
| `onReact` | `(emoji: string) => void` | ❌ | - | Reaction handler |
| `showAvatar` | `boolean` | ❌ | `true` | Show avatar |
| `isGrouped` | `boolean` | ❌ | `false` | Grouped state |

### MessageThread Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `messages` | `Array<ChatMessageProps & { id: string }>` | ✅ | Array of messages |

### TypingIndicator Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sender` | `{ name: string; avatar?: string }` | ✅ | User who is typing |

## 🎭 Status States

- **Sending** - Clock icon (message queued)
- **Sent** - Single checkmark (server received)
- **Delivered** - Double checkmark gray (recipient received)
- **Read** - Double checkmark primary color (recipient opened)

## 🎨 Theming

The component uses design tokens and works with all 20 color themes:
- Purple (default)
- Ocean Blue
- Forest Green
- Sunset Orange
- Hot Pink
- Ruby Red

All colors automatically adapt to the active theme!

## 📱 Responsive Design

- Desktop: Full width with max-width constraint
- Tablet: Optimized spacing
- Mobile: Stacked layout, touch-friendly buttons

## 🧪 Testing

### View Examples

```bash
#Component showcase at /components
```

Navigate to **UI > ChatMessage** to see 21 interactive examples.

### View Demo Page

```bash
npm run dev
```

Visit `http://localhost:3000/demo/chat` for a live demo.

## 📚 Learn More

- **Full Documentation:** `src/components/ui/chat-message.md`
- **Implementation Report:** `CHAT-MESSAGE-COMPONENT.md` (root)
- **Component Examples:** `src/components/ui/chat-message.stories.tsx`

## 🐛 Troubleshooting

### Messages not grouping?
Ensure consecutive messages have the same `sender.name` and `isOwn` values.

### Avatars not showing?
Check that avatar URLs are accessible and `showAvatar={true}`.

### Status icons not appearing?
Status indicators only show for own messages (`isOwn={true}`).

### Reactions tooltip not working?
Ensure `users` array is provided in the reaction object.

## 💡 Pro Tips

1. **Use MessageThread** for automatic grouping instead of manual ChatMessage components
2. **Implement optimistic updates** for instant feedback on message send
3. **Virtualize long chats** with `react-window` for 100+ messages
4. **Add debouncing** for typing indicators to reduce server load
5. **Compress images** before sending as attachments
6. **Use status transitions** (sending → sent → delivered → read) for better UX
7. **Cache avatars** to reduce network requests
8. **Lazy load images** in attachments for performance

## 🚀 Next Steps

1. Integrate with your backend API
2. Add WebSocket for real-time updates
3. Implement message persistence (database)
4. Add infinite scroll for message history
5. Customize reactions with emoji picker
6. Add link previews for URLs
7. Implement message search
8. Add voice message support

## 📞 Support

- Issues: Check `chat-message.md` for detailed troubleshooting
- Examples: See the component showcase or demo page
- Updates: Component follows semantic versioning

---

**Ready to build amazing chat experiences! 💬**
