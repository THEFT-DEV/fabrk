# Chat Input - Quick Start Guide

## 5-Minute Integration

### Step 1: Copy the component (Already done!)
```
✅ src/components/ui/chat-input.tsx
✅ src/components/ui/chat-input.stories.tsx
✅ src/components/ui/chat-input.md
```

### Step 2: Basic Usage
```tsx
"use client";

import { useState } from "react";
import { ChatInput } from "@/components/ui/chat-input";

export default function MyChat() {
  const [message, setMessage] = useState("");

  const handleSend = (value: string) => {
    console.log("Sending:", value);
    // TODO: Send to your backend
    setMessage(""); // Clear input
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
    />
  );
}
```

### Step 3: View Examples
```bash
# Visit the example page
http://localhost:3000/examples/chat-input

# Or view component examples
#Component showcase at /components
# Navigate to Components → ChatInput
```

## Common Use Cases

### 1. Simple Chat (2 minutes)
```tsx
"use client";

import { useState } from "react";
import { ChatInput } from "@/components/ui/chat-input";
import { Card, CardContent } from "@/components/ui/card";

export default function SimpleChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (value: string) => {
    setMessages([...messages, value]);
    setMessage("");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-0">
        {/* Messages */}
        <div className="h-[400px] space-y-2 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div key={i} className="rounded-md border border-border bg-primary p-3 text-primary-foreground shadow-sm">
              {msg}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <ChatInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
          />
        </div>
      </CardContent>
    </Card>
  );
}
```

### 2. With API Integration (5 minutes)
```tsx
"use client";

import { useState } from "react";
import { ChatInput } from "@/components/ui/chat-input";

export default function ApiChat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (value: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });

      if (response.ok) {
        setMessage("");
      }
    } catch (_) {
      console.error("Failed to send:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
      loading={loading}
    />
  );
}
```

### 3. With File Upload (3 minutes)
```tsx
"use client";

import { useState } from "react";
import { ChatInput } from "@/components/ui/chat-input";

export default function FileChat() {
  const [message, setMessage] = useState("");

  const handleSend = (value: string) => {
    console.log("Message:", value);
    setMessage("");
  };

  const handleFileAttach = async (files: File[]) => {
    console.log("Files attached:", files);

    // Upload files to your backend
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    }
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
      onFileAttach={handleFileAttach}
    />
  );
}
```

### 4. With Character Limit (1 minute)
```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  showCharCount={true}
  maxLength={200}
  placeholder="Type a short message (max 200 chars)..."
/>
```

### 5. With Typing Indicator (3 minutes)
```tsx
"use client";

import { useState, useEffect } from "react";
import { ChatInput } from "@/components/ui/chat-input";

export default function TypingChat() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    // Simulate receiving typing events from backend
    const timer = setTimeout(() => {
      setIsTyping(true);
      setTypingUser("Sarah Chen");

      setTimeout(() => setIsTyping(false), 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={(msg) => console.log(msg)}
      showTypingIndicator={isTyping}
      typingUser={typingUser}
    />
  );
}
```

## API Endpoint Examples

### Next.js API Route (HTTP)
```typescript
// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Your chat logic here
    console.log("Received message:", message);

    // Save to database
    // await prisma.message.create({ data: { text: message } });

    return NextResponse.json({ success: true });
  } catch (_) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
```

### WebSocket Integration (Real-time)
```typescript
"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatInput } from "@/components/ui/chat-input";

export default function RealtimeChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.on("message", (msg) => {
      console.log("Received:", msg);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSend = (value: string) => {
    if (socket) {
      socket.emit("message", value);
      setMessage("");
    }
  };

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={handleSend}
    />
  );
}
```

## Styling Customization

### Change Container Width
```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  className="max-w-4xl mx-auto" // Custom width
/>
```

### Disable Hints Row
```tsx
// Edit the component file and comment out:
// <div className="flex justify-between px-3 text-xs text-muted-foreground">
//   <span>Press Enter to send, Shift+Enter for new line</span>
// </div>
```

### Change Button Icons
```tsx
// In chat-input.tsx, replace:
import { Send, Paperclip, Smile } from "lucide-react";

// With your preferred icons:
import { ArrowUp, Link, Laugh } from "lucide-react";
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Send message (if not empty) |
| `Shift + Enter` | Insert new line |
| `Tab` | Navigate to next button |
| `Shift + Tab` | Navigate to previous button |

## Props Cheat Sheet

```typescript
// Required props
value={message}           // Current text
onChange={setMessage}     // Update handler
onSend={handleSend}       // Send handler

// Optional props
placeholder="Type..."     // Custom placeholder
disabled={true}           // Disable input
loading={isSending}       // Show spinner
showCharCount={true}      // Display counter
maxLength={500}           // Max characters
showTypingIndicator={isTyping} // Show typing dots
typingUser="John Doe"     // Who is typing
onFileAttach={handleFiles} // File upload handler
className="max-w-2xl"     // Custom styles
```

## Troubleshooting

### Send button not working?
- Ensure `value.trim()` has content
- Check `onSend` callback is defined
- Verify `disabled` and `loading` props are false

### Auto-resize not working?
- Check parent container has defined width
- Ensure no `overflow: hidden` on parent
- Verify component is client-side ("use client")

### File attachments not showing?
- Provide `onFileAttach` callback
- Check browser console for errors
- Verify file input is not hidden by parent

### Typing indicator not appearing?
- Set `showTypingIndicator={true}`
- Provide `typingUser` string
- Check conditional rendering logic

## Next Steps

1. **Add emoji picker** - Install `emoji-picker-react`
2. **Add voice recording** - Use MediaRecorder API
3. **Add mentions** - Implement @username autocomplete
4. **Add markdown** - Parse and format text
5. **Add reactions** - Allow emoji reactions on messages

## Resources

- **Documentation:** `src/components/ui/chat-input.md`
- **Examples:** `/examples/chat-input`
- **Examples:** `#Component showcase at /components`
- **Architecture:** `CHAT-INPUT-ARCHITECTURE.md`
- **Preview:** `CHAT-INPUT-PREVIEW.md`

## Support

For questions or issues:
1. Check the full documentation (`chat-input.md`)
2. View example page (`/examples/chat-input`)
3. Inspect component examples
4. Review architecture diagram
5. Check common issues section

**Happy coding!** 🚀
