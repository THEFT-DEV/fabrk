/**
 * Blog Listing Page
 * Copied from indx - uses getDocuments from outstatic/server
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getDocuments } from 'outstatic/server';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | Fabrk',
  description: 'Latest articles, tutorials, and updates from Fabrk',
};

interface BlogPost {
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  author: { name: string };
  coverImage?: string;
  status: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/).length || 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogPage() {
  const posts = getDocuments('posts', [
    'title',
    'slug',
    'description',
    'content',
    'publishedAt',
    'author',
    'coverImage',
    'status',
  ]).filter((post) => post.status === 'published') as BlogPost[];

  // Sort by date descending
  posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

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

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={cn('group border-border bg-card border p-4 transition-all', mode.state.hover.card, mode.radius)}
              >
                <div className="text-muted-foreground mb-2 font-mono text-xs">
                  {formatDate(post.publishedAt)}
                </div>
                <h3 className="text-foreground group-hover:text-primary mb-2 font-mono text-sm font-semibold">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-muted-foreground mb-3 font-mono text-xs line-clamp-2">
                    {post.description}
                  </p>
                )}
                <div className="text-muted-foreground font-mono text-xs">
                  {calculateReadingTime(post.content)} • {post.author?.name || 'Fabrk Team'}
                </div>
              </Link>
            ))}
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
