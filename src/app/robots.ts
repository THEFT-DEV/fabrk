import { MetadataRoute } from 'next';

/**
 * Robots.txt Configuration
 * Includes rules for traditional crawlers AND AI crawlers
 *
 * AI Crawlers Supported:
 * - GPTBot (ChatGPT)
 * - Google-Extended (Gemini/Bard)
 * - Anthropic-AI (Claude)
 * - PerplexityBot
 * - CCBot (Common Crawl)
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://fabrk.dev';

  return {
    rules: [
      // Traditional search engines
      {
        userAgent: '*',
        allow: ['/', '/pricing', '/login', '/register', '/variations'],
        disallow: [
          '/dashboard',
          '/dashboard/*',
          '/settings',
          '/settings/*',
          '/admin',
          '/admin/*',
          '/api',
          '/api/*',
        ],
      },
      // OpenAI GPTBot (ChatGPT training)
      {
        userAgent: 'GPTBot',
        allow: ['/', '/pricing', '/docs', '/blog'],
        disallow: ['/dashboard', '/api', '/admin'],
      },
      // OpenAI ChatGPT browsing
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/pricing', '/docs', '/blog'],
        disallow: ['/dashboard', '/api', '/admin'],
      },
      // Google Extended (Gemini/Bard training)
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/pricing', '/docs', '/blog'],
        disallow: ['/dashboard', '/api', '/admin'],
      },
      // Anthropic Claude AI
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/pricing', '/docs', '/blog'],
        disallow: ['/dashboard', '/api', '/admin'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/pricing', '/docs', '/blog'],
        disallow: ['/dashboard', '/api', '/admin'],
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/pricing', '/docs', '/blog'],
        disallow: ['/dashboard', '/api', '/admin'],
      },
      // Common Crawl (used by many AI companies)
      {
        userAgent: 'CCBot',
        allow: ['/', '/pricing', '/docs', '/blog'],
        disallow: ['/dashboard', '/api', '/admin'],
      },
      // Block certain AI scrapers (optional - uncomment if needed)
      // {
      //   userAgent: "FacebookBot",
      //   disallow: ["/"],
      // },
      // {
      //   userAgent: "Bytespider", // TikTok/ByteDance
      //   disallow: ["/"],
      // },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
