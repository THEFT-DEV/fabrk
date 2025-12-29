import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';
import Link from 'next/link';
import { FileText, Tag, Search, Eye, Calendar, Edit, Code } from 'lucide-react';

export const metadata = {
  title: 'Blog System - Fabrk Docs',
  description: 'Database-driven blog with categories, SEO optimization, and admin management.',
};

export default function BlogPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Features"
      title="Blog System"
      description="Database-driven blog with full admin control and SEO optimization."
      overview="The blog system stores posts in your database using Prisma, giving you full control over content. No external CMS needed - manage everything from your admin dashboard. Features include categories, featured posts, view tracking, SEO metadata, and automatic read time calculation."
      features={[
        {
          icon: FileText,
          title: 'Database Storage',
          description: 'Posts stored in PostgreSQL via Prisma - full control, no vendor lock-in.',
        },
        {
          icon: Code,
          title: 'MDX Support',
          description: 'Use React components in posts - callouts, code blocks, embeds, and more.',
        },
        {
          icon: Tag,
          title: 'Categories',
          description: 'Organize posts with categories for easy navigation and filtering.',
        },
        {
          icon: Search,
          title: 'SEO Optimized',
          description: 'Custom meta titles, descriptions, and OpenGraph for each post.',
        },
        {
          icon: Eye,
          title: 'View Tracking',
          description: 'Automatic view count tracking for analytics and popular posts.',
        },
        {
          icon: Calendar,
          title: 'Draft & Publish',
          description: 'Save drafts, schedule publishing, or publish immediately.',
        },
        {
          icon: Edit,
          title: 'Admin Dashboard',
          description: 'Create, edit, and manage posts from your admin panel.',
        },
      ]}
      setup={[
        {
          title: 'Database Schema',
          description: 'Blog models are included in your Prisma schema',
          code: `// prisma/schema.prisma
model BlogPost {
  id          String    @id @default(cuid())
  slug        String    @unique
  title       String
  excerpt     String?
  content     String    @db.Text
  featured    Boolean   @default(false)
  published   Boolean   @default(false)

  authorId    String
  author      User      @relation(fields: [authorId], references: [id])

  categoryId  String?
  category    BlogCategory? @relation(fields: [categoryId], references: [id])

  featuredImage String?
  readTime    Int?       // Minutes to read

  seoTitle       String?
  seoDescription String?

  viewCount   Int       @default(0)
  createdAt   DateTime  @default(now())
  publishedAt DateTime?
  updatedAt   DateTime  @updatedAt
}

model BlogCategory {
  id          String @id @default(cuid())
  name        String @unique
  slug        String @unique
  description String?
  posts       BlogPost[]
}`,
          language: 'prisma',
        },
        {
          title: 'Run Database Migration',
          description: 'Push the schema to your database',
          code: `npm run db:push`,
          language: 'bash',
          tip: 'The blog models are included by default. Just run the migration.',
        },
      ]}
      usage={[
        {
          title: 'Fetch Published Posts',
          description: 'Get all published posts for your blog page',
          code: `// src/lib/blog/queries.ts
import { prisma } from "@/lib/db";

export async function getPublishedPosts(options?: {
  limit?: number;
  categorySlug?: string;
  featured?: boolean;
}) {
  const { limit, categorySlug, featured } = options || {};

  return prisma.blogPost.findMany({
    where: {
      published: true,
      ...(categorySlug && { category: { slug: categorySlug } }),
      ...(featured !== undefined && { featured }),
    },
    include: {
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

// Get single post by slug
export async function getPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
    },
  });

  if (post) {
    // Increment view count
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });
  }

  return post;
}`,
          language: 'typescript',
        },
        {
          title: 'Blog Listing Page',
          description: 'Display posts on your public blog',
          code: `// src/app/blog/page.tsx
import { getPublishedPosts } from "@/lib/blog/queries";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="container py-12">
      <h1 className="font-mono text-2xl font-semibold mb-8">
        [ BLOG ]
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={\`/blog/\${post.slug}\`}>
            <article className="border border-border p-6 transition-colors">
              {post.category && (
                <span className="text-xs text-primary font-mono">
                  {post.category.name}
                </span>
              )}
              <h2 className="font-mono text-xs font-semibold mt-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-muted-foreground text-sm mt-2">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span>{post.readTime} min read</span>
                <span>{post.viewCount} views</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Create Post API',
          description: 'Admin API to create new blog posts',
          code: `// src/app/api/blog/posts/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createPost } from "@/lib/blog/queries";
import { generateSlug, calculateReadTime } from "@/lib/blog/utils";

export async function POST(req: Request) {
  const session = await auth();

  // Only admins can create posts
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, excerpt, categoryId, featured, published } = body;

  try {
    const post = await createPost({
      title,
      slug: generateSlug(title),
      content,
      excerpt: excerpt || content.slice(0, 160) + "...",
      categoryId,
      featured: featured || false,
      published: published || false,
      authorId: session.user.id,
      readTime: calculateReadTime(content),
      publishedAt: published ? new Date() : null,
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}`,
          language: 'typescript',
        },
        {
          title: 'Utility Functions',
          description: 'Helper functions for blog management',
          code: `// src/lib/blog/utils.ts

// Generate URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Calculate read time (average 200 words per minute)
export function calculateReadTime(content: string): number {
  const words = content.trim().split(/\\s+/).length;
  return Math.ceil(words / 200);
}

// Format date for display
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'SEO', href: '/docs/features/seo' }}
      next={{ title: 'i18n', href: '/docs/features/i18n' }}
    >
      {/* Blog Features */}
      <DocsSection title="Built-in Features">
        <DocsCard title="FEATURES">
          <ul className="space-y-1">
            <li>
              ├─ <strong>Slug Generation:</strong> Auto-generate URL slugs from titles
            </li>
            <li>
              ├─ <strong>Read Time:</strong> Automatic calculation based on word count
            </li>
            <li>
              ├─ <strong>View Tracking:</strong> Count page views per post
            </li>
            <li>
              ├─ <strong>Categories:</strong> Organize posts by topic
            </li>
            <li>
              ├─ <strong>Featured Posts:</strong> Highlight important content
            </li>
            <li>
              ├─ <strong>Draft Mode:</strong> Save unpublished drafts
            </li>
            <li>
              ├─ <strong>SEO Fields:</strong> Custom meta title and description
            </li>
            <li>
              └─ <strong>Author Attribution:</strong> Link posts to user accounts
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* MDX Components */}
      <DocsSection title="MDX Components">
        <DocsCallout variant="info" title="React in Your Content">
          Blog posts support MDX - write Markdown with embedded React components. Create rich,
          interactive content without leaving your editor.
        </DocsCallout>
        <DocsCard title="AVAILABLE COMPONENTS">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-semibold">Content</h4>
                <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                  <li>
                    • <code className="bg-muted px-1">Callout</code> - Info, warning, error, success
                  </li>
                  <li>
                    • <code className="bg-muted px-1">Terminal</code> - Command display
                  </li>
                  <li>
                    • <code className="bg-muted px-1">CodeBlock</code> - Syntax highlighting
                  </li>
                  <li>
                    • <code className="bg-muted px-1">Steps</code> - Step-by-step guides
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-semibold">Layout</h4>
                <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                  <li>
                    • <code className="bg-muted px-1">CardGrid</code> - Feature grids
                  </li>
                  <li>
                    • <code className="bg-muted px-1">ComparisonTable</code> - Feature tables
                  </li>
                  <li>
                    • <code className="bg-muted px-1">YouTube</code> - Video embeds
                  </li>
                  <li>
                    • <code className="bg-muted px-1">Kbd</code> - Keyboard shortcuts
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-border border-t pt-4">
              <h4 className="mb-2 font-mono text-xs font-semibold">Example Usage</h4>
              <pre className="bg-muted overflow-x-auto p-4 text-xs">
                {`<Callout type="warning" title="Important">
  This is a warning callout in your blog post.
</Callout>

<Terminal command="npm install" output="added 42 packages" />

<Steps>
  <Step number={1} title="Install">Run the install command</Step>
  <Step number={2} title="Configure">Update your settings</Step>
</Steps>`}
              </pre>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Why Database Blog */}
      <DocsSection title="Why Database Over CMS">
        <DocsCallout variant="info" title="Full Control">
          Unlike headless CMS solutions (Contentful, Sanity), a database-driven blog gives you
          complete control over your data, no API rate limits, and zero vendor dependencies. Perfect
          for SaaS products where content is part of your core offering.
        </DocsCallout>
        <DocsCard title="COMPARISON">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              Headless CMS
              <ul className="space-y-1">
                <li>• Monthly fees for advanced features</li>
                <li>• API rate limits</li>
                <li>• Vendor lock-in</li>
                <li>• Separate dashboard to manage</li>
              </ul>
            </div>
            <div className="space-y-2">
              Database Blog
              <ul className="space-y-1">
                <li>• No additional costs</li>
                <li>• Unlimited API calls</li>
                <li>• Full data ownership</li>
                <li>• Integrated admin dashboard</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* SEO Configuration */}
      <DocsSection title="SEO Configuration">
        <DocsCard title="SEO METADATA">
          <p className="mb-4">Each blog post can have custom SEO metadata:</p>
          <div className="space-y-2">
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">seoTitle</code>
              <span className="text-muted-foreground">
                Custom page title (defaults to post title)
              </span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">seoDescription</code>
              <span className="text-muted-foreground">Meta description (defaults to excerpt)</span>
            </div>
            <div className="border-border flex justify-between border-b pb-2">
              <code className="bg-muted px-1">featuredImage</code>
              <span className="text-muted-foreground">OpenGraph image URL</span>
            </div>
            <div className="flex justify-between">
              <code className="bg-muted px-1">slug</code>
              <span className="text-muted-foreground">URL path (/blog/your-slug)</span>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/seo">
            <DocsCard title="SEO SETUP" className="h-full transition-all">
              SEO Configuration
              <p className="mb-6">Learn how to optimize your blog posts for search engines.</p>
            </DocsCard>
          </Link>
          <Link href="/docs/tutorials/file-uploads">
            <DocsCard
              title="FILE UPLOADS"
              className="h-full transition-all"
            >
              File Uploads
              <p className="mb-6">Upload featured images and media for your blog posts.</p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
