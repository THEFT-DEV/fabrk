/**
 * Changelog RSS Feed
 * Provides an RSS 2.0 feed of all changelog entries
 *
 * URL: /changelog/rss
 */

import { CHANGELOG } from '@/data/changelog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabrk.dev';
const SITE_NAME = 'Fabrk';
const SITE_DESCRIPTION = 'Terminal-first SaaS boilerplate. Ship fast. Look sharp.';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRssItem(entry: (typeof CHANGELOG)[0]): string {
  const changesHtml = entry.changes
    .map((c) => `<li><strong>[${c.type.toUpperCase()}]</strong> ${escapeXml(c.description)}</li>`)
    .join('\n');

  const description = `
    <h2>${escapeXml(entry.title)}</h2>
    <ul>
      ${changesHtml}
    </ul>
  `;

  return `
    <item>
      <title>v${escapeXml(entry.version)} - ${escapeXml(entry.title)}</title>
      <link>${entry.url || `${SITE_URL}/changelog#v${entry.version}`}</link>
      <guid isPermaLink="false">fabrk-changelog-${entry.version}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>
  `;
}

function generateRssFeed(): string {
  const items = CHANGELOG.map(generateRssItem).join('\n');
  const lastBuildDate = CHANGELOG[0]?.date
    ? new Date(CHANGELOG[0].date).toUTCString()
    : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} Changelog</title>
    <link>${SITE_URL}/changelog</link>
    <description>${escapeXml(SITE_DESCRIPTION)} - Version history and release notes.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/changelog/rss" rel="self" type="application/rss+xml"/>
    <ttl>60</ttl>
    ${items}
  </channel>
</rss>`;
}

export async function GET() {
  const feed = generateRssFeed();

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
