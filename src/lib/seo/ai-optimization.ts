/**
 * AI Optimization (GEO + AIEO)
 * Optimizing for generative AI platforms and AI-enhanced search
 *
 * Targets:
 * - ChatGPT (OpenAI GPTBot)
 * - Google Gemini (Google-Extended)
 * - Claude (Anthropic-AI)
 * - Bing AI (Bing Chat)
 * - Perplexity AI
 * - Google AI Overview (SGE)
 */

export interface AIBotConfig {
  name: string;
  userAgent: string;
  purpose: string;
  allowCrawling: boolean;
  crawlDelay?: number;
}

/**
 * Known AI crawlers and their configurations
 */
export const AI_CRAWLERS: AIBotConfig[] = [
  {
    name: 'GPTBot',
    userAgent: 'GPTBot',
    purpose: "OpenAI's web crawler for ChatGPT training",
    allowCrawling: true,
  },
  {
    name: 'ChatGPT-User',
    userAgent: 'ChatGPT-User',
    purpose: 'ChatGPT browsing mode',
    allowCrawling: true,
  },
  {
    name: 'Google-Extended',
    userAgent: 'Google-Extended',
    purpose: "Google's AI training (Bard/Gemini)",
    allowCrawling: true,
  },
  {
    name: 'Anthropic-AI',
    userAgent: 'anthropic-ai',
    purpose: "Anthropic's Claude AI crawler",
    allowCrawling: true,
  },
  {
    name: 'Claude-Web',
    userAgent: 'Claude-Web',
    purpose: 'Claude browsing capabilities',
    allowCrawling: true,
  },
  {
    name: 'PerplexityBot',
    userAgent: 'PerplexityBot',
    purpose: 'Perplexity AI search engine',
    allowCrawling: true,
  },
  {
    name: 'Diffbot',
    userAgent: 'Diffbot',
    purpose: 'AI-powered web data extraction',
    allowCrawling: true,
  },
  {
    name: 'FacebookBot',
    userAgent: 'FacebookBot',
    purpose: 'Meta AI training',
    allowCrawling: false, // More restrictive by default
  },
  {
    name: 'Bytespider',
    userAgent: 'Bytespider',
    purpose: 'ByteDance (TikTok) AI crawler',
    allowCrawling: false, // More restrictive by default
  },
  {
    name: 'CCBot',
    userAgent: 'CCBot',
    purpose: 'Common Crawl (used by many AI companies)',
    allowCrawling: true,
  },
];

/**
 * Generate robots.txt rules for AI crawlers
 */
export function generateAIRobotRules(allowedBots: string[] = []): string {
  const rules: string[] = [];

  AI_CRAWLERS.forEach((bot) => {
    if (allowedBots.length > 0 && !allowedBots.includes(bot.name)) {
      return;
    }

    rules.push(`# ${bot.purpose}`);
    rules.push(`User-agent: ${bot.userAgent}`);

    if (bot.allowCrawling) {
      rules.push('Allow: /');
      rules.push('Disallow: /api/');
      rules.push('Disallow: /dashboard/');
      rules.push('Disallow: /admin/');
      if (bot.crawlDelay) {
        rules.push(`Crawl-delay: ${bot.crawlDelay}`);
      }
    } else {
      rules.push('Disallow: /');
    }

    rules.push('');
  });

  return rules.join('\n');
}

/**
 * Detect if request is from an AI crawler
 */
export function isAICrawler(userAgent: string): boolean {
  const lowerUA = userAgent.toLowerCase();
  return AI_CRAWLERS.some((bot) => lowerUA.includes(bot.userAgent.toLowerCase()));
}

/**
 * Get AI crawler info from user agent
 */
export function getAICrawlerInfo(userAgent: string): AIBotConfig | null {
  const lowerUA = userAgent.toLowerCase();
  return AI_CRAWLERS.find((bot) => lowerUA.includes(bot.userAgent.toLowerCase())) || null;
}

/**
 * Format content for AI citation (GEO best practice)
 * Makes content easy for AI to cite and reference
 */
export interface CitableContent {
  title: string;
  summary: string;
  keyPoints: string[];
  facts: Array<{ claim: string; source?: string }>;
  author?: string;
  publishDate?: string;
  lastUpdated?: string;
  url?: string;
}

export function generateCitableFormat(content: CitableContent): string {
  let formatted = `# ${content.title}\n\n`;

  // Metadata block for AI context
  formatted += `---\n`;
  if (content.author) formatted += `Author: ${content.author}\n`;
  if (content.publishDate) formatted += `Published: ${content.publishDate}\n`;
  if (content.lastUpdated) formatted += `Updated: ${content.lastUpdated}\n`;
  if (content.url) formatted += `URL: ${content.url}\n`;
  formatted += `---\n\n`;

  // Summary (critical for AI understanding)
  formatted += `## Summary\n${content.summary}\n\n`;

  // Key points (easy for AI to extract)
  if (content.keyPoints.length > 0) {
    formatted += `## Key Points\n`;
    content.keyPoints.forEach((point, i) => {
      formatted += `${i + 1}. ${point}\n`;
    });
    formatted += `\n`;
  }

  // Facts (citation-ready)
  if (content.facts.length > 0) {
    formatted += `## Facts\n`;
    content.facts.forEach((fact) => {
      formatted += `- ${fact.claim}`;
      if (fact.source) formatted += ` (Source: ${fact.source})`;
      formatted += `\n`;
    });
    formatted += `\n`;
  }

  return formatted;
}

/**
 * Generate AI-friendly metadata
 * Optimizes meta tags for AI understanding
 */
export function generateAIMetadata(data: {
  title: string;
  description: string;
  keywords: string[];
  category?: string;
  expertise?: 'beginner' | 'intermediate' | 'advanced';
  readingTime?: number;
}) {
  return {
    // Standard meta
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),

    // AI-specific meta
    'ai:topic': data.category,
    'ai:expertise_level': data.expertise,
    'ai:reading_time': data.readingTime,
    'ai:content_type': 'article',

    // OpenGraph for AI context
    'og:type': 'article',
    'og:title': data.title,
    'og:description': data.description,

    // Twitter for AI context
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
  };
}

/**
 * Structure content for "People Also Ask" optimization (AEO)
 * Formats Q&A pairs for maximum visibility
 */
export function formatPeopleAlsoAsk(questions: Array<{ q: string; a: string }>) {
  return questions.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  }));
}

/**
 * Generate entity markup for AI understanding
 * Helps AI understand key entities in your content
 */
export function generateEntityMarkup(
  entities: Array<{
    name: string;
    type: 'Person' | 'Organization' | 'Product' | 'Place' | 'Event';
    description?: string;
    url?: string;
  }>
) {
  return entities.map((entity) => ({
    '@context': 'https://schema.org',
    '@type': entity.type,
    name: entity.name,
    description: entity.description,
    url: entity.url,
  }));
}

/**
 * Optimize for Google AI Overview (SGE)
 * Formats content to maximize chances of appearing in AI-generated summaries
 */
export function optimizeForAIOverview(content: {
  topic: string;
  definition: string;
  benefits: string[];
  howItWorks: string;
  useCases: string[];
}) {
  return {
    // Direct answer format (critical for AI Overview)
    mainEntity: {
      '@type': 'Thing',
      name: content.topic,
      description: content.definition,
    },

    // Structured benefits (easy for AI to extract)
    benefits: content.benefits,

    // How it works (step-by-step format AI prefers)
    methodology: content.howItWorks,

    // Use cases (contextual understanding)
    applicationArea: content.useCases,
  };
}

/**
 * Calculate AI citation score
 * Estimates how likely content is to be cited by AI
 */
export function calculateAICitationScore(content: {
  hasStructuredData: boolean;
  hasClearDefinitions: boolean;
  hasStatistics: boolean;
  hasSourceAttribution: boolean;
  wordCount: number;
  hasHeadings: boolean;
  hasLists: boolean;
}): {
  score: number;
  factors: Record<string, boolean>;
  recommendations: string[];
} {
  let score = 0;
  const recommendations: string[] = [];

  if (content.hasStructuredData) {
    score += 20;
  } else {
    recommendations.push('Add JSON-LD structured data');
  }

  if (content.hasClearDefinitions) {
    score += 20;
  } else {
    recommendations.push('Include clear definitions of key terms');
  }

  if (content.hasStatistics) {
    score += 15;
  } else {
    recommendations.push('Add statistics and data points');
  }

  if (content.hasSourceAttribution) {
    score += 15;
  } else {
    recommendations.push('Cite sources and references');
  }

  if (content.wordCount >= 300 && content.wordCount <= 2000) {
    score += 10;
  } else {
    recommendations.push('Target 300-2000 words for optimal AI understanding');
  }

  if (content.hasHeadings) {
    score += 10;
  } else {
    recommendations.push('Use clear heading hierarchy');
  }

  if (content.hasLists) {
    score += 10;
  } else {
    recommendations.push('Use lists for better AI parsing');
  }

  return {
    score,
    factors: {
      hasStructuredData: content.hasStructuredData,
      hasClearDefinitions: content.hasClearDefinitions,
      hasStatistics: content.hasStatistics,
      hasSourceAttribution: content.hasSourceAttribution,
      optimalLength: content.wordCount >= 300 && content.wordCount <= 2000,
      hasHeadings: content.hasHeadings,
      hasLists: content.hasLists,
    },
    recommendations,
  };
}

/**
 * Monitor AI crawler activity
 * Track which AI bots are crawling your site
 */
export interface CrawlerLog {
  timestamp: Date;
  botName: string;
  userAgent: string;
  path: string;
  ip: string;
}

export function logAICrawler(userAgent: string, path: string, ip: string): CrawlerLog | null {
  const botInfo = getAICrawlerInfo(userAgent);

  if (!botInfo) return null;

  return {
    timestamp: new Date(),
    botName: botInfo.name,
    userAgent,
    path,
    ip,
  };
}
