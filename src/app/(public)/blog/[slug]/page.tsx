/**
 * Blog Post Detail Page
 * Uses react-markdown with design system components
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getDocumentBySlug, getDocumentSlugs } from 'outstatic/server';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { MarkdownContent } from '@/components/blog/markdown-content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/).length || 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function generateStaticParams() {
  const slugs = getDocumentSlugs('posts');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getDocumentBySlug('posts', slug, [
    'title',
    'description',
    'coverImage',
    'publishedAt',
    'author',
    'status',
  ]);

  if (!post || post.status === 'draft') {
    return { title: 'Post Not Found | Fabrk' };
  }

  return {
    title: `${post.title} | Fabrk Blog`,
    description: post.description || undefined,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author?.name || 'Fabrk'],
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getDocumentBySlug('posts', slug, [
    'title',
    'description',
    'content',
    'coverImage',
    'publishedAt',
    'author',
    'status',
  ]);

  if (!post || post.status === 'draft') {
    notFound();
  }

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
            <h1 className="text-foreground mb-4 font-mono text-2xl font-semibold md:text-4xl">
              {post.title}
            </h1>
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 font-mono text-xs">
              <span>{post.author?.name || 'Fabrk Team'}</span>
              <span>|</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>|</span>
              <span>{calculateReadingTime(post.content)}</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className={cn("border-border relative mb-8 aspect-video overflow-hidden border", mode.radius)}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className={cn("border-border bg-card border p-6 md:p-8", mode.radius)}>
          <MarkdownContent content={post.content} />
        </div>

        {/* Footer */}
        <div className={cn("border-border bg-card mt-8 flex items-center justify-between border p-4", mode.radius)}>
          <Link href="/blog" className="text-muted-foreground hover:text-primary font-mono text-xs">
            &lt;- ALL POSTS
          </Link>
          <div className="text-muted-foreground font-mono text-xs">
            Published: {formatDate(post.publishedAt)}
          </div>
        </div>
      </article>
    </div>
  );
}
