/**
 * FABRK COMPONENT
 * Blog Template - Terminal console style
 * Production-ready
 */

'use client';

import { TemplateShowcasePage } from '@/components/library';

// Extracted components
import { BlogPreview } from './components';

const templateCode = `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, User } from "lucide-react";
import { InputSearch } from "@/components/ui/input-search";
import Link from "next/link";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All", count: 12 },
  { id: "engineering", name: "Engineering", count: 5 },
  { id: "product", name: "Product", count: 3 },
  { id: "design", name: "Design", count: 2 },
  { id: "company", name: "Company", count: 2 },
];

const mockPosts = [
  {
    id: "1",
    title: "Building Scalable APIs with Next.js 15",
    excerpt: "Learn how to build production-ready APIs...",
    category: "engineering",
    author: { name: "Alex Chen", avatar: null },
    date: "Dec 1, 2024",
    readTime: "8 min read",
    featured: true,
  },
  // ... more posts
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = mockPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Featured Post */}
      {featuredPost && (
        <div className="border border-border">
          <div className="border-b border-border px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">
              [ [0x00] FEATURED POST ]
            </span>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-border bg-muted/30 flex aspect-video items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground">[FEATURED IMAGE]</span>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={cn(mode.radius, mode.font, "text-xs")}>FEATURED</Badge>
                  <Badge variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
                    {featuredPost.category.toUpperCase()}
                  </Badge>
                </div>
                <h2 className={cn(mode.font, "text-2xl font-semibold tracking-tight")}>{featuredPost.title}</h2>
                <p className={cn(mode.font, "text-sm text-muted-foreground")}>{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className={cn(mode.radius, "h-6 w-6 border border-border")}>
                      <AvatarFallback className={cn(mode.radius, "text-xs")}>
                        {featuredPost.author.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {featuredPost.author.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button asChild className={cn(mode.radius, mode.font, "w-fit text-xs")}>
                  <Link href="/blog/post-1">
                    &gt; READ ARTICLE <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filters + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={\`px-4 py-2 font-mono text-xs transition-all \${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }\`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-64">
          <InputSearch
            placeholder="Search articles..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className={cn(mode.radius, mode.font, "text-xs")}
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {regularPosts.map((post) => (
          <Link key={post.id} href={\`/blog/\${post.id}\`}>
            <div className={cn('group border border-border transition-colors', mode.state.hover.card)}>
              <div className="border-b border-border px-4 py-2">
                <span className="font-mono text-xs text-muted-foreground">
                  [ [0x0{post.id}] POST_{post.id} ]
                </span>
              </div>
              <div className="border-b border-border bg-muted/30 flex aspect-video items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground">[THUMBNAIL]</span>
              </div>
              <div className="flex h-[180px] flex-col p-4">
                <Badge variant="outline" className={cn(mode.radius, mode.font, "mb-2 w-fit text-xs")}>
                  {post.category.toUpperCase()}
                </Badge>
                <h3 className={cn(mode.font, "mb-2 line-clamp-2 text-sm font-semibold group-hover:text-primary transition-colors")}>
                  {post.title}
                </h3>
                <p className={cn(mode.font, "mb-4 line-clamp-2 text-xs text-muted-foreground")}>
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    {post.author.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="border border-border">
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">[ [0x0A] PAGINATION ]</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="font-mono text-xs text-muted-foreground">
            [PAGE]: {currentPage} OF 3 | SHOWING {regularPosts.length} POSTS
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(mode.radius, mode.font, "h-8 text-xs")}
            >
              <ChevronLeft className="mr-1 h-3 w-3" />
              PREV
            </Button>
            <div className="flex gap-1">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={cn(mode.radius, mode.font, "h-8 w-8 p-0 text-xs")}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              disabled={currentPage === 3}
              className={cn(mode.radius, mode.font, "h-8 text-xs")}
            >
              NEXT
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}`;

export default function BlogTemplate() {
  return (
    <TemplateShowcasePage
      badge="BLOG"
      title="Blog"
      description="Articles, tutorials, and updates from the team"
      templateId="blog"
      category={{ name: 'Marketing', href: '/library/marketing' }}
      preview={<BlogPreview />}
      code={templateCode}
      fileStructure="app/blog/page.tsx"
      features={[
        'Featured post hero section',
        'Category filtering with counts',
        'Search functionality',
        'Responsive blog grid',
        'Post cards with author, date, read time',
        'Pagination controls',
        'Terminal-styled card headers',
      ]}
    />
  );
}
