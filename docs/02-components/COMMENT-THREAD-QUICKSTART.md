# Comment Thread - Quick Start Guide

Get the Comment Thread component running in your Fabrk project in under 5 minutes.

## Prerequisites

- Fabrk boilerplate installed and running
- Database configured (Prisma + PostgreSQL/Supabase)
- Node.js 18+ and npm installed

## Step 1: Add Database Schema (2 minutes)

Add these models to your `prisma/schema.prisma`:

```prisma
model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  likes     Int      @default(0)

  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  // Self-referential relation for nested comments
  parentId String?
  parent   Comment?  @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
  replies  Comment[] @relation("CommentReplies")

  // Link to your content (e.g., blog post, product, etc.)
  postId String?
  post   Post?  @relation(fields: [postId], references: [id], onDelete: Cascade)

  likes CommentLike[]

  @@index([postId])
  @@index([authorId])
  @@index([parentId])
}

model CommentLike {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  commentId String
  comment   Comment @relation(fields: [commentId], references: [id], onDelete: Cascade)

  @@unique([userId, commentId])
  @@index([commentId])
  @@index([userId])
}

// Add to existing User model
model User {
  // ... existing fields
  comments     Comment[]
  commentLikes CommentLike[]
}

// Example content model (adjust to your needs)
model Post {
  id        String    @id @default(cuid())
  title     String
  content   String
  createdAt DateTime  @default(now())
  comments  Comment[]
}
```

Push the schema:

```bash
npm run db:push
```

## Step 2: Create API Routes (3 minutes)

### Get Comments for a Post

Create `src/app/api/posts/[postId]/comments/route.ts`:

```typescript
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Helper to build nested comment tree
function buildCommentTree(comments: any[], currentUserId?: string) {
  const commentMap = new Map();
  const rootComments: any[] = [];

  // Create map of all comments
  comments.forEach((comment) => {
    commentMap.set(comment.id, {
      id: comment.id,
      author: {
        name: comment.author.name || "Anonymous",
        avatar: comment.author.image,
      },
      content: comment.content,
      timestamp: comment.createdAt,
      likes: comment.likes,
      isLiked: comment.commentLikes?.some((like: any) => like.userId === currentUserId),
      isOwn: comment.authorId === currentUserId,
      replies: [],
    });
  });

  // Build tree structure
  comments.forEach((comment) => {
    const node = commentMap.get(comment.id);
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies.push(node);
      }
    } else {
      rootComments.push(node);
    }
  });

  return rootComments;
}

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await auth();
    const { postId } = params;

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        commentLikes: session?.user
          ? {
              where: { userId: session.user.id },
            }
          : false,
      },
      orderBy: { createdAt: "desc" },
    });

    const tree = buildCommentTree(comments, session?.user?.id);

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
```

### Like a Comment

Create `src/app/api/comments/[id]/like/route.ts`:

```typescript
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const userId = session.user.id;

    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: { userId, commentId: id },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.$transaction([
        prisma.commentLike.delete({
          where: { id: existingLike.id },
        }),
        prisma.comment.update({
          where: { id },
          data: { likes: { decrement: 1 } },
        }),
      ]);
    } else {
      // Like
      await prisma.$transaction([
        prisma.commentLike.create({
          data: { userId, commentId: id },
        }),
        prisma.comment.update({
          where: { id },
          data: { likes: { increment: 1 } },
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
```

### Reply to Comment

Create `src/app/api/comments/[id]/replies/route.ts`:

```typescript
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    const { id: parentId } = params;

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const reply = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorId: session.user.id,
        parentId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: reply.id,
      author: {
        name: reply.author.name || "Anonymous",
        avatar: reply.author.image,
      },
      content: reply.content,
      timestamp: reply.createdAt,
      likes: 0,
      isLiked: false,
      isOwn: true,
      replies: [],
    });
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json({ error: "Failed to create reply" }, { status: 500 });
  }
}
```

### Edit Comment

Create `src/app/api/comments/[id]/route.ts`:

```typescript
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    const { id } = params;

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Verify ownership
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.update({
      where: { id },
      data: { content: content.trim() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Verify ownership
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
```

## Step 3: Use in Your Page (1 minute)

Create a blog post page with comments at `src/app/blog/[slug]/page.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { CommentThread } from "@/components/ui/comment-thread";
import type { Comment } from "@/components/ui/comment-thread";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${params.slug}/comments`)
      .then((res) => res.json())
      .then(setComments)
      .finally(() => setIsLoading(false));
  }, [params.slug]);

  const handleLike = async (commentId: string) => {
    await fetch(`/api/comments/${commentId}/like`, { method: "POST" });
  };

  const handleReply = async (commentId: string, content: string) => {
    const response = await fetch(`/api/comments/${commentId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const newReply = await response.json();
    // Refresh comments or update local state
    location.reload(); // Simple approach
  };

  const handleEdit = async (commentId: string, content: string) => {
    await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
  };

  const handleDelete = async (commentId: string) => {
    await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (isLoading) return <div>Loading comments...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog Post Title</h1>

      {/* Your blog post content */}
      <article className="prose mb-12">
        <p>Your blog post content here...</p>
      </article>

      {/* Comments */}
      <div className="border-t-2 border-brutal pt-8">
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
    </div>
  );
}
```

## Testing

### View the Demo Page

```bash
npm run dev
```

Visit: `http://localhost:3000/examples/comment-thread-demo`

### View Examples

```bash
#Component showcase at /components
```

Navigate to: `UI/CommentThread`

### Run Unit Tests

```bash
npm run test comment-thread
```

## Common Customizations

### Change Maximum Nesting Depth

```tsx
<CommentThread maxDepth={5} comments={comments} />
```

### Change Default Sort Order

```tsx
<CommentThread sortBy="top" comments={comments} />
```

### Custom Styling

```tsx
<CommentThread className="max-w-6xl" comments={comments} />
```

### Disable Features

```tsx
// Disable replies
<CommentThread comments={comments} onLike={handleLike} />

// Disable editing (remove onEdit and onDelete)
<CommentThread comments={comments} onLike={handleLike} onReply={handleReply} />
```

## Troubleshooting

### Comments not loading
- Check API route returns correct format (see examples above)
- Verify database schema is pushed: `npm run db:push`
- Check browser console for errors

### Likes not working
- Ensure user is authenticated (check `await auth()`)
- Verify `CommentLike` model exists in schema
- Check API route returns 200 status

### Replies not appearing
- Check `parentId` field is set correctly
- Verify recursive tree building logic in API
- Ensure `replies` array is included in response

### TypeScript errors
- Run `npm run type-check` to see errors
- Ensure all Comment fields are included
- Check imports from `@/components/ui/comment-thread`

## Next Steps

- ✅ Add rate limiting to prevent spam
- ✅ Implement pagination for large comment threads
- ✅ Add markdown support with react-markdown
- ✅ Enable mentions with @username autocomplete
- ✅ Add moderation features (flag, pin, hide)
- ✅ Implement real-time updates with WebSockets

## Documentation

- **Full README**: `src/components/ui/COMMENT-THREAD-README.md`
- **Visual Guide**: `COMMENT-THREAD-VISUAL-GUIDE.md`
- **Summary**: `COMMENT-THREAD-SUMMARY.md`
- **This Quick Start**: `COMMENT-THREAD-QUICKSTART.md`

## Support

Check the component examples for interactive examples and the comprehensive README for detailed API documentation.

---

**You're done!** The Comment Thread component is now integrated into your Fabrk project.
