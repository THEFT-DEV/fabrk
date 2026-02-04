/**
 * Blog Posts Data
 * Direct data source for blog posts (fallback when Outstatic is unavailable)
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    image: string | null;
  };
  category: {
    name: string;
    slug: string;
  } | null;
  publishedAt: Date;
  featured: boolean;
  readTime: number;
  featuredImage?: string | null;
  createdAt?: Date;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'aeo-guide',
    slug: 'what-is-aeo-answer-engine-optimization',
    title: 'What is AEO? The Complete Guide to Answer Engine Optimization',
    excerpt: 'Answer Engine Optimization (AEO) is the practice of optimizing content for AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews. Learn how to get your content featured in AI responses.',
    content: `# What is AEO? The Complete Guide to Answer Engine Optimization

The search landscape is shifting. Traditional SEO focused on ranking in blue links. But AI-powered search engines like ChatGPT, Perplexity, Claude, and Google's AI Overviews are changing how users find information.

**Answer Engine Optimization (AEO)** is the practice of optimizing your content to be cited and featured in AI-generated responses.

## Why AEO Matters

When someone asks ChatGPT a question, it doesn't show a list of links. It provides a direct answer, sometimes citing sources. If your content isn't structured for AI consumption, you're invisible to a growing segment of search users.

### The Numbers

- 30%+ of searches now include AI-generated content
- Perplexity processes millions of queries daily
- Google AI Overviews appear in 64% of US searches`,
    author: {
      name: 'Fabrk Team',
      image: null,
    },
    category: {
      name: 'SEO',
      slug: 'seo',
    },
    publishedAt: new Date('2026-02-01'),
    featured: true,
    readTime: 8,
  },
  {
    id: 'geo-guide',
    slug: 'what-is-geo-generative-engine-optimization',
    title: 'What is GEO? Generative Engine Optimization Explained',
    excerpt: 'GEO (Generative Engine Optimization) focuses on optimizing content for generative AI models. Learn the key differences from traditional SEO and AEO.',
    content: `# What is GEO? Generative Engine Optimization Explained

Generative Engine Optimization (GEO) is a new discipline focused on making content discoverable and useful within generative AI systems.

## Key Principles of GEO

1. **Structured Information**: Use clear formatting and schema markup
2. **Direct Answers**: Provide clear, concise answers to common questions
3. **Context**: Give sufficient context without unnecessary fluff
4. **Source Attribution**: Make it easy for AI to cite your content

## GEO vs SEO vs AEO

Each optimization strategy targets different platforms and user behaviors.`,
    author: {
      name: 'Fabrk Team',
      image: null,
    },
    category: {
      name: 'SEO',
      slug: 'seo',
    },
    publishedAt: new Date('2026-02-02'),
    featured: true,
    readTime: 6,
  },
  {
    id: 'seo-comparison',
    slug: 'seo-vs-aeo-vs-geo-comparison',
    title: 'SEO vs AEO vs GEO: Complete Comparison Guide',
    excerpt: 'Understanding the differences between SEO, AEO, and GEO and how to optimize for all three in your content strategy.',
    content: `# SEO vs AEO vs GEO: Complete Comparison Guide

The optimization landscape has three distinct strategies, each targeting different discovery mechanisms.

## SEO (Search Engine Optimization)
- **Target**: Google, Bing, DuckDuckGo blue links
- **Focus**: Keywords, backlinks, technical optimization
- **Goal**: Top 10 rankings

## AEO (Answer Engine Optimization)
- **Target**: ChatGPT, Perplexity, Claude, Google AI Overviews
- **Focus**: Direct answers, FAQ format, cited sources
- **Goal**: Being cited in AI responses

## GEO (Generative Engine Optimization)
- **Target**: Generative AI systems, LLMs
- **Focus**: Structured data, context, clarity
- **Goal**: Machine-readable, useful content

## Quick Comparison Table

| Factor | SEO | AEO | GEO |
|--------|-----|-----|-----|
| Primary Focus | Rankings | Citations | Integration |
| Content Format | Long-form + Keywords | Direct Answers | Structured Data |
| Backlinks | Critical | Important | Optional |
| FAQ Sections | Helpful | Essential | Helpful |
| Update Frequency | Weekly+ | Daily+ | Real-time |`,
    author: {
      name: 'Fabrk Team',
      image: null,
    },
    category: {
      name: 'SEO',
      slug: 'seo',
    },
    publishedAt: new Date('2026-02-03'),
    featured: false,
    readTime: 10,
  },
  {
    id: 'seo-checklist',
    slug: 'technical-seo-checklist-2026',
    title: 'Technical SEO Checklist 2026: The Complete Guide',
    excerpt: 'A comprehensive technical SEO checklist covering all essential elements to ensure your website is properly optimized for search engines.',
    content: `# Technical SEO Checklist 2026: The Complete Guide

## Core Web Vitals
- [ ] Largest Contentful Paint (LCP) < 2.5 seconds
- [ ] First Input Delay (FID) < 100 milliseconds
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Interaction to Next Paint (INP) < 200 milliseconds

## Site Structure
- [ ] Logical URL structure
- [ ] Clear internal linking
- [ ] Mobile-first design
- [ ] XML sitemaps
- [ ] robots.txt properly configured

## Performance
- [ ] Image optimization
- [ ] Lazy loading implemented
- [ ] Minified CSS/JS
- [ ] GZIP compression enabled
- [ ] CDN implementation

## Security
- [ ] HTTPS/SSL certificate
- [ ] Security headers configured
- [ ] Regular security audits

## Indexing
- [ ] Search console connected
- [ ] No noindex tags on important pages
- [ ] Proper robots.txt rules
- [ ] Canonical tags implemented`,
    author: {
      name: 'Fabrk Team',
      image: null,
    },
    category: {
      name: 'SEO',
      slug: 'seo',
    },
    publishedAt: new Date('2026-01-28'),
    featured: false,
    readTime: 12,
  },
  {
    id: 'ai-search-guide',
    slug: 'building-for-ai-search-practical-guide',
    title: 'Building for AI Search: A Practical Guide',
    excerpt: 'Practical strategies and implementation tips for optimizing your content and website for AI-powered search engines.',
    content: `# Building for AI Search: A Practical Guide

## Step 1: Audit Your Content
- Identify high-value topics
- Check current AI mentions
- Find content gaps
- Analyze competitor content

## Step 2: Optimize for AI Consumption
- Use clear heading hierarchies
- Add FAQ sections
- Include bulleted summaries
- Use structured data markup
- Add code examples where relevant

## Step 3: Technical Implementation

### Schema Markup
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Your Article Title",
  "description": "Article description",
  "datePublished": "2026-02-04",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  }
}
\`\`\`

## Step 4: Monitor Performance
- Track AI citations
- Monitor rankings
- Measure traffic impact
- Adjust strategy based on results

## Step 5: Build Authority
- Create comprehensive guides
- Answer specific questions
- Build internal linking
- Earn citations from other sites`,
    author: {
      name: 'Fabrk Team',
      image: null,
    },
    category: {
      name: 'SEO',
      slug: 'seo',
    },
    publishedAt: new Date('2026-02-04'),
    featured: false,
    readTime: 9,
  },
];

export function getPublishedBlogPosts() {
  return blogPosts.sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}

export function getFeaturedBlogPosts() {
  return blogPosts.filter(post => post.featured).sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}
