/**
 * RSS Feed Route
 * Generates RSS 2.0 feed from Outstatic blog posts
 */

import { getDocuments } from 'outstatic/server';
import { siteConfig } from '@/lib/metadata';

interface BlogPost {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  author: { name: string };
  status: string;
}

export async function GET() {
  const posts = getDocuments('posts', [
    'title',
    'slug',
    'description',
    'publishedAt',
    'author',
    'status',
  ]).filter((post) => post.status === 'published') as BlogPost[];

  // Sort by date descending
  posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.description || ''}]]></description>
      ${post.author?.name ? `<author>${post.author.name}</author>` : ''}
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>Latest articles, tutorials, and updates from ${siteConfig.name}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <generator>Next.js + Outstatic</generator>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
