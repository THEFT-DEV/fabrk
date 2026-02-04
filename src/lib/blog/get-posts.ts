/**
 * Get blog posts from filesystem
 * Reads markdown files with YAML frontmatter from outstatic/content/posts
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; image: string | null };
  category: { name: string; slug: string } | null;
  publishedAt: Date;
  featured: boolean;
  readTime: number;
  featuredImage?: string | null;
  createdAt?: Date;
}

export function getPublishedPosts(): BlogPost[] {
  try {
    const postsDir = path.join(process.cwd(), 'outstatic/content/posts');

    if (!fs.existsSync(postsDir)) {
      return [];
    }

    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

    return files.map(file => {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      // Parse frontmatter using gray-matter
      const { data, content } = matter(fileContent);

      // Skip draft posts
      if (data.status === 'draft') {
        return null;
      }

      // Build category object from string or existing object
      const category =
        data.category && typeof data.category === 'string'
          ? { name: data.category, slug: data.category.toLowerCase().replace(/\s+/g, '-') }
          : data.category || null;

      const post: BlogPost = {
        id: data.slug || file.replace('.md', ''),
        slug: data.slug || file.replace('.md', ''),
        title: data.title || '',
        excerpt: data.description || '',
        content,
        author: {
          name: data.author?.name || 'Fabrk Team',
          image: data.author?.picture || null,
        },
        category,
        publishedAt: new Date(data.publishedAt || new Date()),
        featured: Boolean(data.featured && (data.featured === true || data.featured === 'true')),
        readTime: data.readTime || Math.ceil(content.split(/\s+/).length / 200),
        featuredImage: data.coverImage || null,
        createdAt: new Date(data.createdAt || data.publishedAt || new Date()),
      };

      return post;
    }).filter((post): post is BlogPost => {
      return post !== null && !!post.title && !!post.slug;
    }).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = getPublishedPosts();
  return posts.find(post => post.slug === slug) || null;
}
