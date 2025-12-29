/**
 * FABRK COMPONENT
 * Blog Post Template - Clean, industry-standard layout
 * Based on Vercel/Next.js blog patterns
 */

'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CodeBlock } from '@/components/ui/code-block';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Mock article data
const mockArticle = {
  title: 'Building Scalable APIs with Next.js 15',
  excerpt:
    'Learn how to build production-ready APIs using Next.js 15 App Router with type-safe endpoints and middleware.',
  category: 'Engineering',
  author: {
    name: 'Alex Chen',
    avatar: null,
    role: 'Senior Engineer',
  },
  date: 'Dec 1, 2024',
  readTime: '8 min read',
  content: [
    {
      type: 'paragraph',
      content:
        "Next.js 15 introduces powerful new patterns for building APIs that scale. In this comprehensive guide, we'll explore the best practices for creating type-safe, performant API routes using the App Router.",
    },
    {
      type: 'heading',
      content: 'Getting Started',
    },
    {
      type: 'paragraph',
      content:
        'Before diving in, ensure you have Next.js 15 installed. The new App Router provides a file-system based approach to API routes that makes organization intuitive.',
    },
    {
      type: 'code',
      language: 'bash',
      content: 'npm create next-app@latest my-api --typescript',
    },
    {
      type: 'heading',
      content: 'Route Handlers',
    },
    {
      type: 'paragraph',
      content:
        'Route Handlers are defined in route.ts files and support all HTTP methods. They provide native Request and Response objects for maximum flexibility.',
    },
    {
      type: 'code',
      language: 'typescript',
      content: `// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}`,
    },
    {
      type: 'heading',
      content: 'Type Safety with Zod',
    },
    {
      type: 'paragraph',
      content:
        'Runtime validation is crucial for API reliability. Zod provides excellent TypeScript integration for validating incoming requests.',
    },
    {
      type: 'code',
      language: 'typescript',
      content: `import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "user"]).default("user"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = createUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues },
      { status: 400 }
    );
  }

  const user = await createUser(result.data);
  return NextResponse.json(user, { status: 201 });
}`,
    },
    {
      type: 'heading',
      content: 'Conclusion',
    },
    {
      type: 'paragraph',
      content:
        "Next.js 15's API routes provide a powerful foundation for building scalable backends. Combined with TypeScript and Zod, you can create APIs that are both type-safe and maintainable.",
    },
  ],
  tags: ['Next.js', 'API', 'TypeScript', 'Zod'],
};

const templateCode = `"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CodeBlock } from "@/components/ui/code-block";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const mockArticle = {
  title: "Building Scalable APIs with Next.js 15",
  category: "Engineering",
  author: {
    name: "Alex Chen",
    avatar: null,
    role: "Senior Engineer",
  },
  date: "Dec 1, 2024",
  readTime: "8 min read",
  content: [
    {
      type: "paragraph",
      content: "Next.js 15 introduces powerful new patterns for building APIs...",
    },
    {
      type: "heading",
      content: "Getting Started",
    },
    {
      type: "code",
      language: "typescript",
      content: "// Your code here",
    },
  ],
  tags: ["Next.js", "API", "TypeScript", "Zod"],
};

export default function BlogPostPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <Badge className={cn(mode.radius, mode.font, "mb-4 text-xs")}>
            {mockArticle.category}
          </Badge>
          <h1 className={cn(mode.font, "mb-6 text-3xl font-semibold md:text-4xl")}>
            {mockArticle.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className={cn(mode.radius, "h-10 w-10 border border-border")}>
                <AvatarFallback className={cn(mode.radius, mode.font, "text-xs")}>
                  {mockArticle.author.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className={cn(mode.font, "text-sm font-medium")}>
                  {mockArticle.author.name}
                </div>
                <div className={cn(mode.font, "text-xs text-muted-foreground")}>
                  {mockArticle.author.role}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {mockArticle.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {mockArticle.readTime}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image Placeholder */}
        <div className="border border-border bg-muted/30 mb-12 flex aspect-video items-center justify-center">
          <span className="font-mono text-sm text-muted-foreground">[FEATURED IMAGE]</span>
        </div>

        {/* Article Content */}
        <article className="mb-12 space-y-6">
          {mockArticle.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className={cn(
                    mode.font,
                    "border-b border-border mt-10 pb-2 text-xl font-semibold"
                  )}
                >
                  {block.content}
                </h2>
              );
            }

            if (block.type === "paragraph") {
              return (
                <p key={index} className={cn(mode.font, "text-sm text-muted-foreground")}>
                  {block.content}
                </p>
              );
            }

            if (block.type === "code") {
              return <CodeBlock key={index} code={block.content} language={block.language} />;
            }

            return null;
          })}
        </article>

        {/* Tags */}
        <div className="border-t border-border mb-12 pt-6">
          <div className="flex flex-wrap gap-2">
            {mockArticle.tags.map((tag) => (
              <Badge key={tag} variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Share + Actions */}
        <div className="border-t border-border flex items-center justify-between pt-6">
          <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, "text-xs")}>
            <Share2 className="mr-2 h-3 w-3" />
            Share
          </Button>
          <Link href="/blog">
            <Button variant="ghost" size="sm" className={cn(mode.radius, mode.font, "text-xs")}>
              View all posts →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}`;

function BlogPostPreview() {
  return (
    <TemplatePreviewWrapper minHeight="800px">
      <div className="bg-background mx-auto max-w-4xl space-y-6 p-6">
        {/* Back Link */}
        <Link
          href="/templates/blog"
          className={cn(
            mode.font,
            'text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors'
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <Badge className={cn(mode.radius, mode.font, 'mb-4 text-xs')}>
            {mockArticle.category}
          </Badge>
          <h1 className={cn(mode.font, 'mb-6 text-3xl leading-tight font-semibold md:text-4xl')}>
            {mockArticle.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className={cn(mode.radius, 'border-border h-10 w-10 border')}>
                <AvatarImage src={mockArticle.author.avatar || undefined} />
                <AvatarFallback className={cn(mode.radius, mode.font, 'text-xs')}>
                  {mockArticle.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className={cn(mode.font, 'text-sm font-medium')}>
                  {mockArticle.author.name}
                </div>
                <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  {mockArticle.author.role}
                </div>
              </div>
            </div>
            <div className={cn(mode.font, 'text-muted-foreground flex items-center gap-4 text-xs')}>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {mockArticle.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {mockArticle.readTime}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image Placeholder */}
        <div className="border-border bg-muted/30 mb-12 flex aspect-video items-center justify-center border">
          <span className={cn(mode.font, 'text-muted-foreground text-sm')}>[FEATURED IMAGE]</span>
        </div>

        {/* Article Content */}
        <article className="mb-12 space-y-6">
          {mockArticle.content.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={index}
                  className={cn(
                    mode.font,
                    'border-border mt-10 border-b pb-2 text-xl font-semibold'
                  )}
                >
                  {block.content}
                </h2>
              );
            }

            if (block.type === 'paragraph') {
              return (
                <p
                  key={index}
                  className={cn(mode.font, 'text-muted-foreground text-sm leading-relaxed')}
                >
                  {block.content}
                </p>
              );
            }

            if (block.type === 'code') {
              return <CodeBlock key={index} code={block.content} language={block.language} />;
            }

            return null;
          })}
        </article>

        {/* Tags */}
        <div className="border-border mb-12 border-t pt-6">
          <div className="flex flex-wrap gap-2">
            {mockArticle.tags.map((tag) => (
              <Badge key={tag} variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Share + Actions */}
        <div className="border-border flex items-center justify-between border-t pt-6">
          <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
            <Share2 className="mr-2 h-3 w-3" />
            Share
          </Button>
          <Link href="/templates/blog">
            <Button variant="ghost" size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
              View all posts →
            </Button>
          </Link>
        </div>
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function BlogPostTemplate() {
  return (
    <TemplateShowcasePage
      badge="BLOG POST"
      title="Blog Post"
      description="Individual blog post page with author, content, and share actions"
      templateId="blog-post"
      category={{ name: 'Marketing', href: '/library/marketing' }}
      preview={<BlogPostPreview />}
      code={templateCode}
      fileStructure="app/blog/[slug]/page.tsx"
      features={[
        'Clean, centered single-column layout',
        'Author + date + read time header',
        'Code blocks with copy functionality',
        'Tags and share actions',
        'Industry-standard Vercel/Next.js pattern',
      ]}
    />
  );
}
