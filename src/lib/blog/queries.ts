/**
 * Blog Database Queries
 * CRUD operations for blog posts and categories
 */

import { prisma } from '@/lib/prisma';
import type { BlogPost, BlogCategory, Prisma } from '@/generated/prisma/client';

export type BlogPostWithAuthor = BlogPost & {
  author: { name: string | null; email: string; image: string | null };
  category: BlogCategory | null;
};

/**
 * Get all published posts
 */
export async function getPublishedPosts(options?: {
  limit?: number;
  offset?: number;
  categorySlug?: string;
  featured?: boolean;
}): Promise<BlogPostWithAuthor[]> {
  const where: Prisma.BlogPostWhereInput = {
    published: true,
    ...(options?.categorySlug && {
      category: { slug: options.categorySlug },
    }),
    ...(options?.featured !== undefined && { featured: options.featured }),
  };

  return prisma.blogPost.findMany({
    where,
    include: {
      author: { select: { name: true, email: true, image: true } },
      category: true,
    },
    orderBy: { publishedAt: 'desc' },
    take: options?.limit,
    skip: options?.offset,
  });
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(
  slug: string,
  includeUnpublished = false
): Promise<BlogPostWithAuthor | null> {
  return prisma.blogPost.findFirst({
    where: {
      slug,
      ...(includeUnpublished ? {} : { published: true }),
    },
    include: {
      author: { select: { name: true, email: true, image: true } },
      category: true,
    },
  });
}

/**
 * Get a single post by ID (for admin)
 */
export async function getPostById(id: string): Promise<BlogPostWithAuthor | null> {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, email: true, image: true } },
      category: true,
    },
  });
}

/**
 * Get all posts (for admin)
 */
export async function getAllPosts(options?: {
  limit?: number;
  offset?: number;
  authorId?: string;
}): Promise<BlogPostWithAuthor[]> {
  return prisma.blogPost.findMany({
    where: options?.authorId ? { authorId: options.authorId } : undefined,
    include: {
      author: { select: { name: true, email: true, image: true } },
      category: true,
    },
    orderBy: { createdAt: 'desc' },
    take: options?.limit,
    skip: options?.offset,
  });
}

/**
 * Create a new post
 */
export async function createPost(data: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  authorId: string;
  categoryId?: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
  featured?: boolean;
}): Promise<BlogPost> {
  const readTime = calculateReadTime(data.content);

  return prisma.blogPost.create({
    data: {
      ...data,
      readTime,
      publishedAt: data.published ? new Date() : null,
    },
  });
}

/**
 * Update a post
 */
export async function updatePost(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    categoryId: string | null;
    featuredImage: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    published: boolean;
    featured: boolean;
  }>
): Promise<BlogPost> {
  const updateData: Prisma.BlogPostUpdateInput = { ...data };

  // Recalculate read time if content changed
  if (data.content) {
    updateData.readTime = calculateReadTime(data.content);
  }

  // Set publishedAt when publishing for the first time
  if (data.published) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (existing && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  return prisma.blogPost.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<void> {
  await prisma.blogPost.delete({ where: { id } });
}

/**
 * Increment view count
 */
export async function incrementViewCount(id: string): Promise<void> {
  await prisma.blogPost.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<(BlogCategory & { _count: { posts: number } })[]> {
  return prisma.blogCategory.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: 'asc' },
  });
}

/**
 * Create a category
 */
export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
}): Promise<BlogCategory> {
  return prisma.blogCategory.create({ data });
}

/**
 * Delete a category
 */
export async function deleteCategory(id: string): Promise<void> {
  await prisma.blogCategory.delete({ where: { id } });
}

/**
 * Calculate read time based on content
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
