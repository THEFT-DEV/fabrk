# CommentThread Component

A fully-featured, nested comment system with likes, replies, editing, and deletion. Built with vanilla styling and optimistic UI updates.

## Features

- **Nested Replies** - Unlimited depth with configurable maximum (default: 3 levels)
- **Likes/Upvotes** - Optimistic UI updates with heart icon
- **Reply System** - Inline reply form with textarea
- **Edit/Delete** - Owner-only actions with confirmation
- **Sorting** - Sort by newest, oldest, or top (most liked)
- **Avatar Support** - User avatars with fallback initials
- **Relative Timestamps** - "5 minutes ago" formatting using date-fns
- **Show/Hide Replies** - Collapsible nested threads
- **Empty State** - Friendly message when no comments exist
- **Keyboard Accessible** - Full keyboard navigation support
- **Vanilla Design** - Matches Fabrk's design system

## Installation

The component is already included in the Fabrk boilerplate. All dependencies are pre-installed:

- `date-fns` - Timestamp formatting
- `lucide-react` - Icons (Heart, MessageSquare, MoreVertical, Edit2, Trash2)
- `@radix-ui/react-avatar` - Avatar component
- `@radix-ui/react-dropdown-menu` - Edit/delete menu

## Usage

### Basic Example

```tsx
import { CommentThread } from "@/components/ui/comment-thread";
import type { Comment } from "@/components/ui/comment-thread";

const comments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "https://example.com/sarah.jpg",
    },
    content: "This is a great post!",
    timestamp: new Date(),
    likes: 24,
    isLiked: false,
    isOwn: false,
  },
];

export default function BlogPost() {
  return (
    <CommentThread
      comments={comments}
      onLike={(commentId) => console.log("Liked:", commentId)}
      onReply={(commentId, content) => console.log("Reply:", commentId, content)}
    />
  );
}
```

### With Nested Replies

```tsx
const nestedComments: Comment[] = [
  {
    id: "1",
    author: { name: "Emma Wilson" },
    content: "Has anyone tried this approach?",
    timestamp: new Date(),
    likes: 15,
    replies: [
      {
        id: "1-1",
        author: { name: "David Park" },
        content: "Yes! It works perfectly.",
        timestamp: new Date(),
        likes: 8,
        replies: [
          {
            id: "1-1-1",
            author: { name: "Emma Wilson" },
            content: "Awesome, thanks!",
            timestamp: new Date(),
            likes: 3,
          },
        ],
      },
    ],
  },
];

<CommentThread
  comments={nestedComments}
  maxDepth={3}
  onLike={handleLike}
  onReply={handleReply}
/>
```

### With All Callbacks

```tsx
function CommentSection() {
  const handleLike = async (commentId: string) => {
    // Toggle like in database
    await fetch(`/api/comments/${commentId}/like`, { method: "POST" });
  };

  const handleReply = async (commentId: string, content: string) => {
    // Create reply in database
    await fetch(`/api/comments/${commentId}/replies`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  };

  const handleEdit = async (commentId: string, content: string) => {
    // Update comment in database
    await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
  };

  const handleDelete = async (commentId: string) => {
    // Delete comment from database
    await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
  };

  return (
    <CommentThread
      comments={comments}
      onLike={handleLike}
      onReply={handleReply}
      onEdit={handleEdit}
      onDelete={handleDelete}
      maxDepth={5}
      sortBy="top"
    />
  );
}
```

## Props

### CommentThreadProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `comments` | `Comment[]` | **required** | Array of top-level comments |
| `onLike` | `(commentId: string) => void` | `undefined` | Callback when like button is clicked |
| `onReply` | `(commentId: string, content: string) => void` | `undefined` | Callback when reply is submitted |
| `onEdit` | `(commentId: string, content: string) => void` | `undefined` | Callback when edit is submitted |
| `onDelete` | `(commentId: string) => void` | `undefined` | Callback when delete is confirmed |
| `maxDepth` | `number` | `3` | Maximum nesting depth (0-indexed) |
| `sortBy` | `"newest" \| "oldest" \| "top"` | `"newest"` | Initial sort order |
| `className` | `string` | `undefined` | Additional CSS classes |

### Comment Interface

```typescript
interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string; // Optional avatar URL
  };
  content: string;
  timestamp: Date | string; // Date object or ISO string
  likes: number;
  isLiked?: boolean; // Is this comment liked by current user?
  isOwn?: boolean; // Is this comment owned by current user?
  replies?: Comment[]; // Nested replies
}
```

## Behavior

### Like System

- **Optimistic UI** - Like count updates immediately without waiting for server response
- **Toggle Logic** - Clicking again unlikes the comment
- **Visual Feedback** - Filled heart icon when liked, outlined when not liked
- **Color Change** - Liked comments show red heart (destructive color)

### Reply System

- **Inline Form** - Reply form appears below the comment when "Reply" is clicked
- **Cancel Option** - Form can be cancelled, resetting the textarea
- **Validation** - Empty replies are not submitted
- **Depth Limiting** - Reply button disappears when `maxDepth` is reached

### Edit/Delete System

- **Owner-Only** - Only visible when `comment.isOwn === true`
- **Dropdown Menu** - Appears on hover in top-right corner
- **Edit Mode** - Replaces content with textarea, shows Save/Cancel buttons
- **Delete Confirmation** - Browser confirm dialog before deletion
- **Optimistic Reset** - Edit form cancellation restores original content

### Sorting

- **Newest** - Sorts by timestamp descending (most recent first)
- **Oldest** - Sorts by timestamp ascending (oldest first)
- **Top** - Sorts by like count descending (most liked first)
- **Recursive** - Sorting applies to nested replies as well

### Show/Hide Replies

- **Auto-Visible** - Replies are visible by default
- **Toggle Button** - Shows "Hide X replies" or "Show X replies"
- **Preserves State** - Collapsed state is maintained when parent re-renders

## Styling

The component uses Fabrk's vanilla design system:

- **Borders** - Standard borders (`border border-border`)
- **Shadows** - Subtle shadows (`shadow-sm`, `shadow`)
- **Rounded Corners** - `rounded-md` class
- **Colors** - Uses design tokens (`text-primary`, `bg-card`, etc.)
- **Indentation** - 32px (`ml-8`) per nesting level

### Custom Styling

```tsx
<CommentThread
  comments={comments}
  className="max-w-4xl mx-auto" // Custom wrapper styles
/>
```

Individual elements can be styled by targeting these classes:
- `.group` - Comment wrapper (hover target)
- `.border-border` - Comment card
- `.shadow-sm` - Shadow effect

## Empty State

When `comments={[]}`, displays:

```
┌───────────────────────────┐
│    💬 (MessageSquare)     │
│   No comments yet         │
│ Be the first to share     │
│   your thoughts!          │
└───────────────────────────┘
```

## Accessibility

- **Keyboard Navigation** - All interactive elements are keyboard accessible
- **ARIA Labels** - Buttons have descriptive labels
- **Focus States** - Clear focus indicators on all interactive elements
- **Screen Reader Support** - Avatar fallbacks use accessible text
- **Semantic HTML** - Uses proper heading hierarchy and button elements

## Real-World Integration

### Blog Comments Example

```tsx
"use client";

import { useState, useEffect } from "react";
import { CommentThread } from "@/components/ui/comment-thread";
import type { Comment } from "@/components/ui/comment-thread";

export default function BlogComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then(setComments)
      .finally(() => setIsLoading(false));
  }, [postId]);

  const handleLike = async (commentId: string) => {
    // Optimistic update
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked }
          : c
      )
    );

    // Server request
    await fetch(`/api/comments/${commentId}/like`, { method: "POST" });
  };

  const handleReply = async (commentId: string, content: string) => {
    const response = await fetch(`/api/comments/${commentId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const newReply = await response.json();

    // Update local state
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return { ...c, replies: [...(c.replies || []), newReply] };
        }
        return c;
      })
    );
  };

  if (isLoading) return <div>Loading comments...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <CommentThread
        comments={comments}
        onLike={handleLike}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        maxDepth={4}
      />
    </div>
  );
}
```

### API Route Example

```typescript
// app/api/comments/[id]/like/route.ts
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const userId = session.user.id;

  // Check if already liked
  const existingLike = await prisma.commentLike.findUnique({
    where: {
      userId_commentId: { userId, commentId: id },
    },
  });

  if (existingLike) {
    // Unlike
    await prisma.commentLike.delete({
      where: { id: existingLike.id },
    });
    await prisma.comment.update({
      where: { id },
      data: { likes: { decrement: 1 } },
    });
  } else {
    // Like
    await prisma.commentLike.create({
      data: { userId, commentId: id },
    });
    await prisma.comment.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
  }

  return NextResponse.json({ success: true });
}
```

## Database Schema Example

```prisma
model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  likes     Int      @default(0)

  authorId String
  author   User   @relation(fields: [authorId], references: [id])

  postId String
  post   Post   @relation(fields: [postId], references: [id])

  parentId String?
  parent   Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies  Comment[] @relation("CommentReplies")

  commentLikes CommentLike[]
}

model CommentLike {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  userId String
  user   User   @relation(fields: [userId], references: [id])

  commentId String
  comment   Comment @relation(fields: [commentId], references: [id])

  @@unique([userId, commentId])
}
```

## Performance Considerations

- **Optimistic Updates** - Likes update immediately without server roundtrip
- **Lazy Loading** - Implement "Load more comments" pagination for large threads
- **Virtual Scrolling** - For 100+ comments, consider react-window or react-virtuoso
- **Memoization** - Use React.memo on SingleComment for deep threads

## Component Examples

The component includes 10+ component examples:

1. **Default** - Flat comment list
2. **WithReplies** - 2-level nesting
3. **DeepNesting** - 5-level nesting demonstration
4. **WithSorting** - Sort toggle demonstration
5. **WithLikes** - Like interaction showcase
6. **EmptyState** - No comments view
7. **InteractiveThread** - Full interactive demo
8. **BlogComments** - Real-world blog example
9. **LimitedDepth** - maxDepth demonstration
10. **SingleThread** - Focused discussion thread

View the component showcase to explore all examples:

```bash
#Component showcase at /components
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { Comment, CommentThreadProps } from "@/components/ui/comment-thread";
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Part of the Fabrk Boilerplate. See LICENSE file for details.
