/**
 * Single Blog Post Page
 * Terminal-styled article with MDX support
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  getPostBySlug,
  incrementViewCount,
  formatDate,
  formatReadTime,
  mdxComponents,
} from '@/lib/blog';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.seoTitle || `${post.title} | Fabrk Blog`,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name || 'Fabrk'],
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementViewCount(post.id).catch(() => {});

  return (
    <div className="bg-background min-h-screen">
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/blog" className="text-muted-foreground hover:text-primary font-mono text-xs">
            &lt;- BACK TO BLOG
          </Link>
        </div>

        {/* Header */}
        <header className={cn("border-border bg-card mb-8 border", mode.radius)}>
          <div className="border-border border-b px-6 py-2">
            <span className="text-muted-foreground font-mono text-xs">[ ARTICLE ]</span>
          </div>
          <div className="p-6">
            {/* Category */}
            {post.category && (
              <Link
                href={`/blog?category=${post.category.slug}`}
                className={cn("border-primary text-primary hover:bg-primary hover:text-primary-foreground mb-4 inline-block border px-2 py-1 font-mono text-xs", mode.radius)}
              >
                {post.category.name.toUpperCase()}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-foreground mb-4 font-mono text-2xl font-semibold md:text-4xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={post.author.image}
                    alt={`${post.author.name || 'Author'} avatar`}
                    width={24}
                    height={24}
                    className={cn('h-6 w-6', mode.radius)}
                  />
                )}
                <span>{post.author.name || 'Anonymous'}</span>
              </div>
              <span>|</span>
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              <span>|</span>
              <span>{formatReadTime(post.readTime || 1)}</span>
              <span>|</span>
              <span>{post.viewCount} views</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className={cn("border-border relative mb-8 aspect-video overflow-hidden border", mode.radius)}>
            <Image
              src={post.featuredImage}
              alt={`Featured image for ${post.title}`}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content - MDX Rendered */}
        <div className={cn("border-border bg-card border p-6 md:p-8", mode.radius)}>
          <div className="max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>

        {/* Footer */}
        <div className={cn("border-border bg-card mt-8 flex items-center justify-between border p-4", mode.radius)}>
          <Link href="/blog" className="text-muted-foreground hover:text-primary font-mono text-xs">
            &lt;- ALL POSTS
          </Link>
          <div className="text-muted-foreground font-mono text-xs">
            Published: {formatDate(post.publishedAt || post.createdAt)}
          </div>
        </div>
      </article>
    </div>
  );
}
