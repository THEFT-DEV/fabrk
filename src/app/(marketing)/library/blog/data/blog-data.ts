/**
 * Blog Template - Mock Data
 * Sample blog posts and categories
 */

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: { name: string; avatar: string | null };
  date: string;
  readTime: string;
  featured: boolean;
}

export const categories = [
  { id: 'all', name: 'All', count: 12 },
  { id: 'engineering', name: 'Engineering', count: 5 },
  { id: 'product', name: 'Product', count: 3 },
  { id: 'design', name: 'Design', count: 2 },
  { id: 'company', name: 'Company', count: 2 },
];

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable APIs with Next.js 15',
    excerpt:
      'Learn how to build production-ready APIs using Next.js 15 App Router with type-safe endpoints and middleware.',
    category: 'engineering',
    author: { name: 'Alex Chen', avatar: null },
    date: 'Dec 1, 2024',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: '2',
    title: 'Introducing Our New Design System',
    excerpt:
      "We've rebuilt our design system from the ground up with accessibility and developer experience in mind.",
    category: 'design',
    author: { name: 'Sarah Kim', avatar: null },
    date: 'Nov 28, 2024',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: '3',
    title: 'How We Reduced Build Times by 70%',
    excerpt:
      'A deep dive into our build optimization journey, from incremental builds to smart caching strategies.',
    category: 'engineering',
    author: { name: 'Mike Johnson', avatar: null },
    date: 'Nov 25, 2024',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: '4',
    title: 'Product Roadmap Q1 2025',
    excerpt:
      "A look at what we're building next quarter, including new features, integrations, and improvements.",
    category: 'product',
    author: { name: 'Emily Davis', avatar: null },
    date: 'Nov 22, 2024',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: '5',
    title: 'Joining the Fabrk Team',
    excerpt: "We're growing! Learn about our culture, values, and what it's like to work at Fabrk.",
    category: 'company',
    author: { name: 'HR Team', avatar: null },
    date: 'Nov 18, 2024',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: '6',
    title: 'Type-Safe Database Queries with Prisma',
    excerpt:
      'Exploring advanced Prisma patterns for building robust, type-safe database interactions.',
    category: 'engineering',
    author: { name: 'Alex Chen', avatar: null },
    date: 'Nov 15, 2024',
    readTime: '10 min read',
    featured: false,
  },
];
