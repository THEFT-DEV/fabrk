/**
 * Outstatic Blog Queries
 * Git-based content fetching for blog posts
 */

import { getDocuments, getDocumentBySlug, load } from 'outstatic/server';

// Type for Outstatic post document
export type OutstaticPost = {
  title: string;
  slug: string;
  publishedAt: string;
  description: string;
  content: string;
  coverImage?: string;
  author?: {
    name: string;
    picture?: string;
  };
  category?: string;
  featured?: boolean;
  status: 'published' | 'draft';
};

// Type matching the old BlogPostWithAuthor for compatibility
export type BlogPostWithAuthor = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured: boolean;
  published: boolean;
  featuredImage: string | null;
  readTime: number | null;
  publishedAt: Date | null;
  createdAt: Date;
  author: {
    name: string | null;
    image: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  viewCount: number;
};

/**
 * Calculate read time from content
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Convert Outstatic document to BlogPostWithAuthor format
 */
function toPostFormat(doc: OutstaticPost): BlogPostWithAuthor {
  return {
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.description || null,
    content: doc.content,
    featured: doc.featured || false,
    published: doc.status === 'published',
    featuredImage: doc.coverImage || null,
    readTime: calculateReadTime(doc.content),
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : null,
    createdAt: doc.publishedAt ? new Date(doc.publishedAt) : new Date(),
    author: {
      name: doc.author?.name || 'Fabrk Team',
      image: doc.author?.picture || null,
    },
    category: doc.category
      ? {
          id: doc.category.toLowerCase().replace(/\s+/g, '-'),
          name: doc.category,
          slug: doc.category.toLowerCase().replace(/\s+/g, '-'),
        }
      : null,
    viewCount: 0, // Not tracked in Git-based CMS
  };
}

/**
 * Get published posts with optional filtering
 */
export async function getPublishedPosts(options?: {
  categorySlug?: string;
  limit?: number;
  featured?: boolean;
}): Promise<BlogPostWithAuthor[]> {
  try {
    const allDocs = getDocuments('posts', [
      'title',
      'slug',
      'publishedAt',
      'description',
      'content',
      'coverImage',
      'author',
      'category',
      'featured',
      'status',
    ]) as OutstaticPost[];

    let posts = allDocs
      .filter((doc) => doc.status === 'published')
      .map(toPostFormat)
      .sort((a, b) => {
        const dateA = a.publishedAt?.getTime() || 0;
        const dateB = b.publishedAt?.getTime() || 0;
        return dateB - dateA;
      });

    // Filter by category
    if (options?.categorySlug) {
      posts = posts.filter(
        (post) => post.category?.slug === options.categorySlug
      );
    }

    // Filter featured only
    if (options?.featured) {
      posts = posts.filter((post) => post.featured);
    }

    // Apply limit
    if (options?.limit) {
      posts = posts.slice(0, options.limit);
    }

    return posts;
  } catch {
    // Return empty array if no posts collection exists yet
    return [];
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPostWithAuthor | null> {
  try {
    const doc = getDocumentBySlug('posts', slug, [
      'title',
      'slug',
      'publishedAt',
      'description',
      'content',
      'coverImage',
      'author',
      'category',
      'featured',
      'status',
    ]) as OutstaticPost | null;

    if (!doc || doc.status !== 'published') {
      return null;
    }

    return toPostFormat(doc);
  } catch {
    return null;
  }
}

/**
 * Get all unique categories from posts
 */
export async function getCategories(): Promise<
  { id: string; name: string; slug: string; _count: { posts: number } }[]
> {
  try {
    const posts = await getPublishedPosts();
    const categoryMap = new Map<string, number>();

    posts.forEach((post) => {
      if (post.category) {
        const count = categoryMap.get(post.category.slug) || 0;
        categoryMap.set(post.category.slug, count + 1);
      }
    });

    return Array.from(categoryMap.entries()).map(([slug, count]) => ({
      id: slug,
      name: slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      slug,
      _count: { posts: count },
    }));
  } catch {
    return [];
  }
}

/**
 * Get all posts for RSS feed (published only)
 */
export async function getAllPostsForFeed(): Promise<BlogPostWithAuthor[]> {
  return getPublishedPosts({ limit: 50 });
}

// Stub functions for admin operations (handled by Outstatic dashboard)
export async function getPostById(_id: string): Promise<BlogPostWithAuthor | null> {
  return null; // Use Outstatic dashboard instead
}

export async function getAllPosts(): Promise<BlogPostWithAuthor[]> {
  return getPublishedPosts();
}

export async function createPost(): Promise<BlogPostWithAuthor> {
  throw new Error('Use Outstatic dashboard to create posts');
}

export async function updatePost(): Promise<BlogPostWithAuthor> {
  throw new Error('Use Outstatic dashboard to update posts');
}

export async function deletePost(): Promise<void> {
  throw new Error('Use Outstatic dashboard to delete posts');
}

export async function incrementViewCount(_id: string): Promise<void> {
  // No-op: view counts not tracked in Git-based CMS
}

export async function createCategory(): Promise<{ id: string; name: string; slug: string }> {
  throw new Error('Categories are managed via post metadata in Outstatic');
}

export async function deleteCategory(): Promise<void> {
  throw new Error('Categories are managed via post metadata in Outstatic');
}
