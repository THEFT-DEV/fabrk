/**
 * Blog Listing Page
 * Terminal-styled blog with categories and featured posts
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | Fabrk',
  description: 'Latest articles, tutorials, and updates from Fabrk',
};

export const revalidate = 60; // Revalidate every 60 seconds

const allPosts = [
  {
    id: 'aeo-guide',
    slug: 'what-is-aeo-answer-engine-optimization',
    title: 'What is AEO? The Complete Guide to Answer Engine Optimization',
    excerpt: 'Answer Engine Optimization (AEO) is the practice of optimizing content for AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews. Learn how to get your content featured in AI responses.',
    author: { name: 'Fabrk Team', image: null },
    category: { name: 'SEO', slug: 'seo' },
    publishedAt: new Date('2026-02-01'),
    featured: true,
    readTime: 8,
  },
  {
    id: 'geo-guide',
    slug: 'what-is-geo-generative-engine-optimization',
    title: 'What is GEO? Generative Engine Optimization Explained',
    excerpt: 'GEO (Generative Engine Optimization) focuses on optimizing content for generative AI models. Learn the key differences from traditional SEO and AEO.',
    author: { name: 'Fabrk Team', image: null },
    category: { name: 'SEO', slug: 'seo' },
    publishedAt: new Date('2026-02-02'),
    featured: true,
    readTime: 6,
  },
  {
    id: 'seo-comparison',
    slug: 'seo-vs-aeo-vs-geo-comparison',
    title: 'SEO vs AEO vs GEO: Complete Comparison Guide',
    excerpt: 'Understanding the differences between SEO, AEO, and GEO and how to optimize for all three in your content strategy.',
    author: { name: 'Fabrk Team', image: null },
    category: { name: 'SEO', slug: 'seo' },
    publishedAt: new Date('2026-02-03'),
    featured: false,
    readTime: 10,
  },
  {
    id: 'seo-checklist',
    slug: 'technical-seo-checklist-2026',
    title: 'Technical SEO Checklist 2026: The Complete Guide',
    excerpt: 'A comprehensive technical SEO checklist covering all essential elements to ensure your website is properly optimized for search engines.',
    author: { name: 'Fabrk Team', image: null },
    category: { name: 'SEO', slug: 'seo' },
    publishedAt: new Date('2026-01-28'),
    featured: false,
    readTime: 12,
  },
  {
    id: 'ai-search-guide',
    slug: 'building-for-ai-search-practical-guide',
    title: 'Building for AI Search: A Practical Guide',
    excerpt: 'Practical strategies and implementation tips for optimizing your content and website for AI-powered search engines.',
    author: { name: 'Fabrk Team', image: null },
    category: { name: 'SEO', slug: 'seo' },
    publishedAt: new Date('2026-02-04'),
    featured: false,
    readTime: 9,
  },
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category;

  // Filter by category if provided
  const posts = categorySlug
    ? allPosts.filter(p => p.category?.slug === categorySlug)
    : allPosts;

  // Get categories from posts
  const categoryMap = new Map<string, number>();
  allPosts.forEach(post => {
    if (post.category) {
      categoryMap.set(post.category.slug, (categoryMap.get(post.category.slug) || 0) + 1);
    }
  });

  const categories = Array.from(categoryMap.entries()).map(([slug, count]) => ({
    id: slug,
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug,
    _count: { posts: count },
  }));

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  // Format helpers
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const formatReadTime = (minutes: number) => `${minutes} min read`;

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className={cn("border-border bg-card mb-12 border", mode.radius)}>
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
                className={cn(`border px-4 py-1 font-mono text-xs transition-colors ${
                  !categorySlug
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                }`, !categorySlug ? mode.radius : cn(mode.state.hover.card, mode.radius))}
              >
                ALL ({posts.length})
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className={cn(`border px-4 py-1 font-mono text-xs transition-colors ${
                    categorySlug === cat.slug
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground'
                  }`, categorySlug === cat.slug ? mode.radius : cn(mode.state.hover.card, mode.radius))}
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
                  className={cn('group border-border bg-card border transition-all', mode.state.hover.card, mode.radius)}
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
                      <span>{formatReadTime(post.readTime)}</span>
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
                  className={cn('group border-border bg-card border p-4 transition-all', mode.state.hover.card, mode.radius)}
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
          <div className={cn("border-border bg-card border p-12 text-center", mode.radius)}>
            <p className="text-muted-foreground font-mono">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
