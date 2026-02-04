/**
 * Generic Blog Configuration Example
 *
 * Replace with your actual blog structure and metadata.
 * These are format examples showing the expected structure.
 */

export const BLOG_CATEGORIES_EXAMPLE = [
  {
    id: 'product',
    name: 'Product Updates',
    slug: 'product',
    description: 'Latest features and improvements',
    color: '#3b82f6', // blue
  },
  {
    id: 'engineering',
    name: 'Engineering',
    slug: 'engineering',
    description: 'Technical deep dives and tutorials',
    color: '#8b5cf6', // purple
  },
  {
    id: 'company',
    name: 'Company',
    slug: 'company',
    description: 'Company news and announcements',
    color: '#10b981', // green
  },
  {
    id: 'guides',
    name: 'Guides',
    slug: 'guides',
    description: 'How-to guides and best practices',
    color: '#f59e0b', // amber
  },
] as const;

export const BLOG_AUTHORS_EXAMPLE = [
  {
    id: 'john-doe',
    name: 'John Doe',
    role: 'Founder & CEO',
    avatar: '/avatars/john-doe.jpg',
    bio: 'Building tools for developers. Previously at BigTech.',
    social: {
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
  },
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    role: 'Head of Engineering',
    avatar: '/avatars/jane-smith.jpg',
    bio: '10+ years building scalable systems. Open source enthusiast.',
    social: {
      twitter: 'https://twitter.com/janesmith',
      github: 'https://github.com/janesmith',
    },
  },
] as const;

export const BLOG_TAGS_EXAMPLE = [
  'typescript',
  'react',
  'nextjs',
  'tailwind',
  'authentication',
  'payments',
  'database',
  'deployment',
  'performance',
  'security',
  'testing',
  'best-practices',
] as const;

// Example blog post structure
export const BLOG_POST_EXAMPLE = {
  id: 'example-post',
  title: 'How to Build a SaaS Application in 2024',
  slug: 'how-to-build-saas-2024',
  excerpt:
    'A comprehensive guide to building and launching a modern SaaS application using the latest technologies.',
  content: '# Full blog post content here...',
  author: 'john-doe',
  category: 'guides',
  tags: ['nextjs', 'typescript', 'best-practices'],
  publishedAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-16T14:30:00Z',
  coverImage: '/blog/saas-guide-2024.jpg',
  readTime: '8 min read',
  featured: true,
  seo: {
    title: 'How to Build a SaaS Application in 2024 - Complete Guide',
    description:
      'Learn how to build and launch a modern SaaS application. Complete guide covering tech stack, authentication, payments, and deployment.',
    ogImage: '/blog/og-saas-guide-2024.jpg',
  },
} as const;

// Blog config
export const BLOG_CONFIG_EXAMPLE = {
  name: 'Blog',
  description: 'Insights, guides, and updates from our team',
  postsPerPage: 12,
  enableComments: true,
  enableNewsletter: true,
  socialShare: {
    twitter: true,
    linkedin: true,
    facebook: false,
  },
  rss: {
    enabled: true,
    url: '/blog/rss.xml',
  },
  sitemap: {
    enabled: true,
    url: '/blog/sitemap.xml',
  },
} as const;
