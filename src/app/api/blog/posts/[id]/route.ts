import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getPostById, updatePost, deletePost } from '@/lib/blog';
import { withCsrfProtection } from '@/lib/security/csrf';
import { logger } from '@/lib/logger';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/blog/posts/[id]
 * Get a single blog post by ID (admin only)
 */
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await context.params;
    const post = await getPostById(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    logger.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

/**
 * PUT /api/blog/posts/[id]
 * Update a blog post (admin only)
 */
export const PUT = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await req.json();

    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const updated = await updatePost(id, {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      categoryId: body.categoryId,
      featuredImage: body.featuredImage,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      published: body.published,
      featured: body.featured,
    });

    logger.info('Blog post updated', { postId: id });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
    }

    logger.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
});

/**
 * DELETE /api/blog/posts/[id]
 * Delete a blog post (admin only)
 */
export const DELETE = withCsrfProtection(async (req: NextRequest, context: RouteContext) => {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await context.params;

    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await deletePost(id);

    logger.info('Blog post deleted', { postId: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
});
