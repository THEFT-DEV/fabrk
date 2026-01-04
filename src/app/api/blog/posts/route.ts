import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getPublishedPosts, getAllPosts, createPost } from '@/lib/blog';
import { generateSlug, generateExcerpt, isValidSlug } from '@/lib/blog';
import { withCsrfProtection } from '@/lib/security/csrf';
import { logger } from '@/lib/logger';

/**
 * GET /api/blog/posts
 * Get blog posts (public: published only, admin: all)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category') || undefined;
    const featured = searchParams.get('featured');
    const all = searchParams.get('all') === 'true';

    // Check if admin requesting all posts
    if (all) {
      const session = await auth();
      if (session?.user?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const posts = await getAllPosts({ limit, offset });
      return NextResponse.json(posts);
    }

    // Public: only published posts
    const posts = await getPublishedPosts({
      limit,
      offset,
      categorySlug: category,
      featured: featured === 'true' ? true : undefined,
    });

    return NextResponse.json(posts);
  } catch (error) {
    logger.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

/**
 * POST /api/blog/posts
 * Create a new blog post (admin only)
 */
export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can create posts
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      content,
      excerpt,
      categoryId,
      featuredImage,
      seoTitle,
      seoDescription,
      published,
      featured,
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Generate slug from title
    let slug = body.slug || generateSlug(title);

    // Validate slug format
    if (!isValidSlug(slug)) {
      slug = generateSlug(title);
    }

    // Generate excerpt if not provided
    const postExcerpt = excerpt || generateExcerpt(content);

    const post = await createPost({
      title,
      slug,
      content,
      excerpt: postExcerpt,
      authorId: session.user.id,
      categoryId: categoryId || undefined,
      featuredImage,
      seoTitle,
      seoDescription,
      published: published || false,
      featured: featured || false,
    });

    logger.info('Blog post created', { postId: post.id, title });

    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    // Handle unique constraint violation (duplicate slug)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
    }

    logger.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
});
