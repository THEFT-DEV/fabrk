/**
 * Blog Listing Page
 * Terminal-styled blog with categories and featured posts
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts, getCategories, formatDate, formatReadTime } from '@/lib/blog';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | Fabrk',
  description: 'Latest articles, tutorials, and updates from Fabrk',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category;

  const [posts, categories] = await Promise.all([
    getPublishedPosts({ categorySlug, limit: 20 }),
    getCategories(),
  ]);

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="border-border bg-card mb-12 border">
          <div className="border-border border-b px-6 py-2">
            <span className="text-muted-foreground font-mono text-xs">[ BLOG ]</span>
          </div>
          <div className="p-6">
            <h1 className="text-foreground mb-2 font-mono text-4xl font-semibold">
              &gt; LATEST POSTS
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              Articles, tutorials, and updates
            </p>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`border px-4 py-1 font-mono text-xs transition-colors ${
                  !categorySlug
                    ? 'border-primary bg-primary text-primary-foreground'
                    : cn('border-border bg-card text-muted-foreground hover:text-foreground', mode.state.hover.card)
                }`}
              >
                ALL ({posts.length})
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className={`border px-4 py-1 font-mono text-xs transition-colors ${
                    categorySlug === cat.slug
                      ? 'border-primary bg-primary text-primary-foreground'
                      : cn('border-border bg-card text-muted-foreground hover:text-foreground', mode.state.hover.card)
                  }`}
                >
                  {cat.name.toUpperCase()} ({cat._count.posts})
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && !categorySlug && (
          <div className="mb-12">
            <h2 className="text-muted-foreground mb-4 font-mono text-xs">[ FEATURED ]</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={cn('group border-border bg-card border transition-all', mode.state.hover.card)}
                >
                  {post.featuredImage && (
                    <div className="border-border relative aspect-video overflow-hidden border-b">
                      <Image
                        src={post.featuredImage}
                        alt={`Featured image for ${post.title}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-muted-foreground mb-2 flex items-center gap-2 font-mono text-xs">
                      {post.category && (
                        <span className="text-primary">[{post.category.name.toUpperCase()}]</span>
                      )}
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      <span>•</span>
                      <span>{formatReadTime(post.readTime || 1)}</span>
                    </div>
                    <h3 className="text-foreground group-hover:text-primary mb-2 font-mono text-sm font-semibold">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-muted-foreground font-mono text-sm">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        {regularPosts.length > 0 ? (
          <div>
            <h2 className="text-muted-foreground mb-4 font-mono text-xs">[ ALL POSTS ]</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={cn('group border-border bg-card border p-4 transition-all', mode.state.hover.card)}
                >
                  <div className="text-muted-foreground mb-2 flex items-center gap-2 font-mono text-xs">
                    {post.category && (
                      <span className="text-primary">[{post.category.name.toUpperCase()}]</span>
                    )}
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-2 font-mono text-sm font-semibold">
                    {post.title}
                  </h3>
                  <div className="text-muted-foreground font-mono text-xs">
                    {formatReadTime(post.readTime || 1)} • {post.author.name || 'Anonymous'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-border bg-card border p-12 text-center">
            <p className="text-muted-foreground font-mono">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
