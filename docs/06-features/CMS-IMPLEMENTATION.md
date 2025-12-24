# Sanity CMS Implementation

Complete documentation for the optional Sanity CMS integration in Fabrk Boilerplate.

---

## What Was Built

The Sanity CMS integration provides a full-featured headless CMS for blog posts and documentation:

- **Sanity Studio** at `/studio` - Admin interface for content management
- **4 Content Types** - Blog posts, documentation pages, authors, categories
- **GROQ Queries** - Helpers for fetching content in your app
- **Portable Text** - Rich text with images, code blocks, and custom components
- **Image Optimization** - URL builder for responsive images
- **Feature Flag** - Optional, works without Sanity credentials configured
- **TypeScript Support** - Fully typed schemas and query results

**Sanity CMS provides:**
- Structured content modeling with schemas
- Real-time collaboration
- Content versioning and history
- Live preview capabilities
- Asset management (images, PDFs, etc.)
- Powerful GROQ query language
- Free tier: unlimited API requests, 3 users
- Scales to millions of documents

---

## Setup Instructions

### 1. Create Sanity Project

Sign up at [sanity.io](https://www.sanity.io) and create a new project:

```bash
# Get Project ID from: https://www.sanity.io/manage
# Dataset: Use "production" (or create custom dataset)
# API Token: Generate in Settings → API → Tokens (Editor role)
```

### 2. Configure Environment Variables

Add to `.env.local`:

```env
# Sanity CMS (Optional)
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"  # Server-side only, for write operations
```

**Without these variables**, the CMS features are disabled and the app works normally without any CMS functionality.

### 3. Deploy Sanity Studio

The Studio is already configured at `/studio`. To deploy:

```bash
# 1. Install Sanity CLI
npm install -g @sanity/cli

# 2. Login to Sanity
sanity login

# 3. Deploy Studio (optional - it's already accessible at /studio in your app)
# You can deploy separately if you want a standalone Studio URL
sanity deploy
```

**Local development:** Just visit `http://localhost:3000/studio` after setting env vars.

### 4. Start Creating Content

Navigate to `/studio` and create:
1. **Authors** - Add author profiles first
2. **Categories** - Create content categories
3. **Blog Posts** - Write blog posts with rich content
4. **Documentation** - Add documentation pages

---

## Content Types

### Blog Post (`blogPost`)

Full-featured blog post with SEO metadata:

**Fields:**
- `title` (string, required) - Post title
- `slug` (slug, required) - URL-friendly identifier
- `excerpt` (text) - Short description for listings
- `mainImage` (image) - Featured image with hotspot cropping
- `author` (reference) - Link to author document
- `categories` (array of references) - Post categories
- `publishedAt` (datetime) - Publication date
- `body` (Portable Text) - Rich content with images, code blocks, custom components

**Usage:**
```typescript
import { fetchBlogPosts, fetchBlogPostBySlug } from '@/lib/sanity/client';

// List all published posts
const posts = await fetchBlogPosts();

// Get specific post
const post = await fetchBlogPostBySlug('your-post-slug');
```

### Documentation Page (`docPage`)

Technical documentation with categorization:

**Fields:**
- `title` (string, required) - Page title
- `slug` (slug, required) - URL-friendly identifier
- `category` (select) - Pre-defined categories (Getting Started, Components, Templates, API, Deployment, Advanced)
- `order` (number) - Sort order within category
- `excerpt` (text) - Short description
- `content` (Portable Text) - Page content

**Usage:**
```typescript
import { fetchDocPages, fetchDocPageBySlug } from '@/lib/sanity/client';

// Get all docs grouped by category
const docs = await fetchDocPages();

// Get specific page
const page = await fetchDocPageBySlug('introduction');
```

### Author (`author`)

Author profiles for blog attribution:

**Fields:**
- `name` (string, required)
- `slug` (slug, required)
- `image` (image) - Profile photo
- `bio` (Portable Text) - Author bio
- `email` (email) - Contact email
- `twitter` (string) - Twitter handle (without @)
- `github` (string) - GitHub username

### Category (`category`)

Content categories for organization:

**Fields:**
- `title` (string, required)
- `slug` (slug, required)
- `description` (text) - Category description

---

## Using in Components

### Fetching Content

```typescript
import { fetchBlogPosts, fetchBlogPostBySlug } from '@/lib/sanity/client';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/lib/sanity/client';

// Blog listing page
export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <div>
      {posts.map(post => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          {post.mainImage && (
            <img src={urlForImage(post.mainImage).width(800).url()} alt={post.title} />
          )}
        </article>
      ))}
    </div>
  );
}

// Blog post page
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPostBySlug(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <PortableText value={post.body} />
    </article>
  );
}
```

### Image Optimization

```typescript
import { urlForImage } from '@/lib/sanity/client';

// Responsive image URLs
const imageUrl = urlForImage(sanityImage)
  .width(800)
  .height(600)
  .fit('crop')
  .url();

// With blur placeholder
const blurUrl = urlForImage(sanityImage)
  .width(20)
  .blur(50)
  .url();
```

### Custom GROQ Queries

```typescript
import { client } from '@/lib/sanity/client';

// Custom query
const query = `*[_type == "blogPost" && "tech" in categories[]->slug.current] {
  title,
  slug,
  publishedAt,
  "author": author->name,
  "categories": categories[]->title
} | order(publishedAt desc)`;

const techPosts = await client.fetch(query);
```

---

## File Structure

```
├── sanity.config.ts                    # Sanity Studio configuration
├── src/lib/sanity/
│   ├── client.ts                      # Client, queries, image builder
│   └── schemas/
│       ├── index.ts                   # Export all schemas
│       ├── blog-post.ts              # Blog post schema
│       ├── doc-page.ts               # Documentation schema
│       ├── author.ts                 # Author schema
│       └── category.ts               # Category schema
└── src/app/studio/[[...index]]/
    └── page.tsx                       # Studio route
```

---

## Configuration

All CMS settings are centralized in `src/config.js`:

```javascript
cms: {
  enabled: !!(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET),
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiToken: process.env.SANITY_API_TOKEN,
  studio: {
    basePath: '/studio',
  },
},

features: {
  sanityCMS: !!(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET),
  // ... other features
}
```

**Check if CMS is configured:**
```typescript
import { isSanityConfigured } from '@/lib/sanity/client';

if (isSanityConfigured()) {
  // Fetch and display content
} else {
  // Show placeholder or hide CMS features
}
```

---

## Adding Custom Content Types

To add a new content type (e.g., "Case Study"):

### 1. Create Schema

`src/lib/sanity/schemas/case-study.ts`:
```typescript
import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
    },
  },
});
```

### 2. Export Schema

`src/lib/sanity/schemas/index.ts`:
```typescript
import { caseStudy } from './case-study';

export const schemaTypes = [
  blogPost,
  docPage,
  author,
  category,
  caseStudy, // Add new schema
];
```

### 3. Add Query Helper

`src/lib/sanity/client.ts`:
```typescript
export async function fetchCaseStudies() {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    results,
    content
  }`;

  return await client.fetch(query);
}
```

### 4. Use in Components

```typescript
import { fetchCaseStudies } from '@/lib/sanity/client';

export default async function CaseStudiesPage() {
  const caseStudies = await fetchCaseStudies();
  // ... render case studies
}
```

---

## Advanced Features

### Live Preview (Real-Time Updates)

Enable live preview in Studio:

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';

export default defineConfig({
  // ... existing config
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],
});
```

### Custom Portable Text Components

Render custom blocks in Portable Text:

```typescript
import { PortableText } from '@portabletext/react';

const components = {
  types: {
    image: ({ value }: any) => (
      <img
        src={urlForImage(value).width(800).url()}
        alt={value.alt || ''}
        loading="lazy"
      />
    ),
    code: ({ value }: any) => (
      <pre className="bg-gray-100 p-4 rounded">
        <code className={`language-${value.language}`}>
          {value.code}
        </code>
      </pre>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-primary underline">
        {children}
      </a>
    ),
  },
};

<PortableText value={post.body} components={components} />
```

### Webhook Integration

Set up webhooks in Sanity Dashboard → API → Webhooks to:
- Trigger rebuilds on content changes
- Invalidate cache
- Send notifications

Example webhook handler:

```typescript
// src/app/api/webhooks/sanity/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Verify webhook signature
  const signature = req.headers.get('sanity-webhook-signature');
  // ... verify signature

  // Revalidate affected paths
  if (body._type === 'blogPost') {
    revalidatePath('/blog');
    revalidatePath(`/blog/${body.slug.current}`);
  }

  return NextResponse.json({ revalidated: true });
}
```

---

## Testing Checklist

### Without Sanity Configured
- [ ] App builds successfully
- [ ] No errors in console
- [ ] CMS features hidden/disabled gracefully
- [ ] `isSanityConfigured()` returns `false`

### With Sanity Configured
- [ ] Studio loads at `/studio`
- [ ] Can create/edit/delete content
- [ ] Content appears in queries
- [ ] Images render correctly
- [ ] Portable Text renders rich content
- [ ] GROQ queries return expected results

### Content Management
- [ ] Create blog post with image
- [ ] Link author to post
- [ ] Add categories to post
- [ ] Create documentation page
- [ ] Order docs by `order` field
- [ ] Edit content and see changes
- [ ] Delete content safely

### Performance
- [ ] Images are optimized (WebP, correct sizes)
- [ ] Content is cached appropriately
- [ ] GROQ queries are efficient
- [ ] Studio loads quickly

---

## Troubleshooting

### Studio Not Loading
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set
- Check project ID in [Sanity Dashboard](https://www.sanity.io/manage)
- Ensure dataset exists (create in Sanity Dashboard)

### Content Not Appearing
- Check content is published (not draft)
- Verify GROQ query syntax
- Check dataset name matches environment variable
- Use Vision tool in Studio to test queries

### Images Not Loading
- Verify project ID is correct
- Check image URL in browser network tab
- Ensure image is uploaded to Sanity
- Try different image widths/formats

### TypeScript Errors
- Run `npm run type-check` to see specific errors
- Ensure schemas are properly typed
- Check GROQ query return types

---

## Why Sanity?

**Advantages over alternatives:**
- **Portable Text** - Structured rich text (better than HTML/Markdown)
- **Real-time collaboration** - Multiple editors simultaneously
- **Content lake** - All content in one place, use anywhere
- **Scalability** - Handles millions of documents
- **Developer experience** - Powerful GROQ query language
- **Free tier** - Unlimited API requests for small projects

**Compared to:**
- **Contentful** - Sanity has better DX, no entry limits on free tier
- **Strapi** - Sanity is serverless, no hosting required
- **WordPress** - Sanity is headless-first, better performance
- **MDX files** - Sanity has GUI for non-technical editors

---

## Next Steps

1. **Create sample content** - Add 3-5 blog posts and documentation pages
2. **Build blog pages** - Create `/blog` and `/blog/[slug]` routes
3. **Build docs site** - Create `/docs/[category]/[slug]` routes
4. **Add sitemap** - Include CMS content in sitemap.xml
5. **Set up webhooks** - Auto-revalidate on content changes
6. **Add search** - Index Sanity content in Algolia
7. **Create RSS feed** - Generate from blog posts

---

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Portable Text Guide](https://www.sanity.io/docs/presenting-block-text)
- [Next.js + Sanity](https://www.sanity.io/plugins/next-sanity)
- [Image Optimization](https://www.sanity.io/docs/image-url)

---

**CMS is optional** - The boilerplate works perfectly without Sanity configured. Enable it when you need content management capabilities for blogs, documentation, or marketing content.
