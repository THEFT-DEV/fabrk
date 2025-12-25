/**
 * Blog Preview Component
 * Live preview of the blog template
 */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, User } from 'lucide-react';
import { InputSearch } from '@/components/ui/input-search';
import Link from 'next/link';
import { TemplatePreviewWrapper } from '@/components/library';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

import { categories, mockPosts } from '../data/blog-data';

export function BlogPreview() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = mockPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <TemplatePreviewWrapper minHeight="800px">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Featured Post */}
        {featuredPost && (
          <div className="border-border bg-card border">
            <div className="border-border border-b px-4 py-2">
              <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                [ [0x00] FEATURED POST ]
              </span>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border-border bg-muted/30 flex aspect-video items-center justify-center border">
                  <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                    [FEATURED IMAGE]
                  </span>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className={cn(mode.radius, mode.font, 'text-xs')}>
                      FEATURED
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(mode.radius, mode.font, 'border-border text-xs')}
                    >
                      {featuredPost.category.toUpperCase()}
                    </Badge>
                  </div>
                  <h2 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>
                    {featuredPost.title}
                  </h2>
                  <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
                    {featuredPost.excerpt}
                  </p>
                  <div
                    className={cn(
                      mode.font,
                      'text-muted-foreground flex items-center gap-4 text-xs'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className={cn(mode.radius, 'border-border h-6 w-6 border')}>
                        <AvatarImage src={featuredPost.author.avatar || undefined} />
                        <AvatarFallback className={cn(mode.radius, 'text-xs')}>
                          {featuredPost.author.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
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
                  <Button asChild className={cn(mode.radius, mode.font, 'w-fit text-xs')}>
                    <Link href="/templates/blog/post">
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
                className={`px-4 py-2 font-mono text-xs transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
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
              className={cn(mode.radius, mode.font, 'text-xs')}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.slice(0, 3).map((post) => (
            <Link key={post.id} href="/templates/blog/post">
              <div className={cn('border-border group bg-card border transition-colors', mode.state.hover.card)}>
                <div className="border-border border-b px-4 py-2">
                  <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                    [ [0x0{post.id}] POST_{post.id} ]
                  </span>
                </div>
                <div className="border-border bg-muted/30 flex aspect-video items-center justify-center border-b">
                  <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                    [THUMBNAIL]
                  </span>
                </div>
                <div className="flex h-[180px] flex-col p-4">
                  <Badge
                    variant="outline"
                    className={cn(mode.radius, mode.font, 'border-border mb-2 w-fit text-xs')}
                  >
                    {post.category.toUpperCase()}
                  </Badge>
                  <h3
                    className={cn(
                      mode.font,
                      'group-hover:text-primary mb-2 line-clamp-2 text-sm font-semibold transition-colors'
                    )}
                  >
                    {post.title}
                  </h3>
                  <p className={cn(mode.font, 'text-muted-foreground mb-4 line-clamp-2 text-xs')}>
                    {post.excerpt}
                  </p>
                  <div className="border-border mt-auto flex items-center justify-between border-t pt-3">
                    <div
                      className={cn(
                        mode.font,
                        'text-muted-foreground flex items-center gap-2 text-xs'
                      )}
                    >
                      <User className="h-3 w-3" />
                      {post.author.name}
                    </div>
                    <div
                      className={cn(
                        mode.font,
                        'text-muted-foreground flex items-center gap-2 text-xs'
                      )}
                    >
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="border-border bg-card border">
          <div className="border-border border-b px-4 py-2">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [ [0x0A] PAGINATION ]
            </span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [PAGE]: {currentPage} OF 3 | SHOWING {regularPosts.length} POSTS
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={cn(mode.radius, mode.font, 'h-8 text-xs')}
              >
                <ChevronLeft className="mr-1 h-3 w-3" />
                PREV
              </Button>
              <div className="flex gap-1">
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={cn(mode.radius, mode.font, 'h-8 w-8 p-0 text-xs')}
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
                className={cn(mode.radius, mode.font, 'h-8 text-xs')}
              >
                NEXT
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TemplatePreviewWrapper>
  );
}
