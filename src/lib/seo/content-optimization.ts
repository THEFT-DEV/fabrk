/**
 * Content Optimization Utilities
 * Tools for optimizing content for SEO, AEO, and GEO
 *
 * Focuses on:
 * - Readability scoring
 * - Keyword density analysis
 * - Featured snippet optimization
 * - AI-friendly content formatting
 * - Voice search optimization
 */

export interface ContentAnalysis {
  wordCount: number;
  readingTime: number;
  readabilityScore: number;
  keywordDensity: Record<string, number>;
  headingStructure: { level: number; text: string }[];
  hasQuestions: boolean;
  hasList: boolean;
  hasTable: boolean;
  sentenceCount: number;
  averageWordsPerSentence: number;
  paragraphCount: number;
}

interface SEOScore {
  overall: number;
  breakdown: {
    readability: number;
    structure: number;
    keywords: number;
    aeoOptimization: number;
  };
  recommendations: string[];
}

/**
 * Calculate reading time in minutes
 * @param text - Content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Calculate word count
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * Calculate keyword density
 * Returns percentage of text that each keyword represents
 */
export function calculateKeywordDensity(text: string, keywords: string[]): Record<string, number> {
  const lowerText = text.toLowerCase();
  const totalWords = countWords(text);
  const density: Record<string, number> = {};

  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
    const matches = lowerText.match(regex);
    const count = matches ? matches.length : 0;
    density[keyword] = parseFloat(((count / totalWords) * 100).toFixed(2));
  });

  return density;
}

/**
 * Calculate Flesch Reading Ease score
 * Score 60-70 is ideal for web content
 * Higher score = easier to read
 */
export function calculateReadabilityScore(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.trim().split(/\s+/);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  // Flesch Reading Ease formula
  const score = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Count syllables in a word (approximation)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;

  const vowels = word.match(/[aeiouy]+/g);
  let count = vowels ? vowels.length : 0;

  // Subtract silent e
  if (word.endsWith('e')) count--;
  // Subtract silent endings
  if (word.endsWith('le') || word.endsWith('les')) count++;

  return Math.max(1, count);
}

/**
 * Extract heading structure from HTML or markdown
 * Critical for AEO - helps with featured snippet selection
 */
export function extractHeadings(html: string): { level: number; text: string }[] {
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>|^(#{1,6})\s+(.+)$/gim;
  const headings: { level: number; text: string }[] = [];

  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    if (match[1]) {
      // HTML heading - sanitize nested HTML tags properly
      let text = match[2];
      const htmlTagPattern = /<[^>]*>/g;
      while (htmlTagPattern.test(text)) {
        text = text.replace(htmlTagPattern, '');
      }
      headings.push({
        level: parseInt(match[1]),
        text: text.trim(),
      });
    } else if (match[3]) {
      // Markdown heading
      headings.push({
        level: match[3].length,
        text: match[4].trim(),
      });
    }
  }

  return headings;
}

/**
 * Check if content is optimized for featured snippets
 * Returns true if content has question-answer format
 */
export function isFeaturedSnippetOptimized(text: string): boolean {
  const hasQuestion = /\?/.test(text);
  const hasDefinition = /\b(is|are|means|refers to|defined as)\b/i.test(text);
  const hasList = /\d+\.|•|-\s/.test(text);
  const hasTable = /<table|^\|/.test(text);

  return hasQuestion || hasDefinition || hasList || hasTable;
}

/**
 * Analyze content comprehensively
 * Returns detailed metrics for optimization
 */
export function analyzeContent(text: string): ContentAnalysis {
  const wordCount = countWords(text);
  const readingTime = calculateReadingTime(text);
  const readabilityScore = calculateReadabilityScore(text);
  const headingStructure = extractHeadings(text);

  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);

  return {
    wordCount,
    readingTime,
    readabilityScore,
    keywordDensity: {},
    headingStructure,
    hasQuestions: /\?/.test(text),
    hasList: /\d+\.|•|-\s/.test(text),
    hasTable: /<table|^\|/.test(text),
    sentenceCount: sentences.length,
    averageWordsPerSentence: wordCount / Math.max(sentences.length, 1),
    paragraphCount: paragraphs.length,
  };
}

/**
 * Score content for SEO/AEO optimization
 * Returns 0-100 score with recommendations
 */
export function scoreContent(text: string, targetKeywords: string[] = []): SEOScore {
  const analysis = analyzeContent(text);
  const recommendations: string[] = [];
  let readabilityScore = 0;
  let structureScore = 0;
  let keywordsScore = 0;
  let aeoScore = 0;

  // Readability (30 points)
  if (analysis.readabilityScore >= 60 && analysis.readabilityScore <= 70) {
    readabilityScore = 30;
  } else if (analysis.readabilityScore >= 50 && analysis.readabilityScore <= 80) {
    readabilityScore = 20;
    recommendations.push('Improve readability to 60-70 range for optimal comprehension');
  } else {
    readabilityScore = 10;
    recommendations.push('Readability needs improvement - simplify sentences');
  }

  // Structure (30 points)
  if (analysis.headingStructure.length > 0) {
    structureScore += 10;
  } else {
    recommendations.push('Add headings (H2, H3) to improve structure');
  }

  if (analysis.wordCount >= 300) {
    structureScore += 10;
  } else {
    recommendations.push('Increase content length to at least 300 words');
  }

  if (analysis.paragraphCount >= 3) {
    structureScore += 10;
  } else {
    recommendations.push('Break content into more paragraphs for readability');
  }

  // Keywords (20 points)
  if (targetKeywords.length > 0) {
    const density = calculateKeywordDensity(text, targetKeywords);
    const avgDensity =
      Object.values(density).reduce((sum, d) => sum + d, 0) / targetKeywords.length;

    if (avgDensity >= 1 && avgDensity <= 3) {
      keywordsScore = 20;
    } else if (avgDensity > 0 && avgDensity < 1) {
      keywordsScore = 10;
      recommendations.push('Increase keyword usage (target 1-3% density)');
    } else if (avgDensity > 3) {
      keywordsScore = 10;
      recommendations.push('Reduce keyword density to avoid over-optimization');
    } else {
      recommendations.push('Add target keywords to content');
    }
  }

  // AEO Optimization (20 points)
  if (analysis.hasQuestions) {
    aeoScore += 7;
  } else {
    recommendations.push('Add question-based headings for featured snippets');
  }

  if (analysis.hasList) {
    aeoScore += 7;
  } else {
    recommendations.push('Add lists or numbered steps for better AEO');
  }

  if (analysis.hasTable) {
    aeoScore += 6;
  }

  const overall = readabilityScore + structureScore + keywordsScore + aeoScore;

  return {
    overall,
    breakdown: {
      readability: readabilityScore,
      structure: structureScore,
      keywords: keywordsScore,
      aeoOptimization: aeoScore,
    },
    recommendations,
  };
}

/**
 * Generate voice search optimized content suggestions
 * Helps with conversational queries
 */
export function generateVoiceSearchSuggestions(topic: string): string[] {
  return [
    `What is ${topic}?`,
    `How does ${topic} work?`,
    `Why is ${topic} important?`,
    `When should I use ${topic}?`,
    `Where can I find ${topic}?`,
    `Who needs ${topic}?`,
    `How to get started with ${topic}?`,
    `What are the benefits of ${topic}?`,
  ];
}

/**
 * Format content for AI citations (GEO optimization)
 * Ensures content is easily citable by AI models
 */
export function formatForAICitation(data: {
  title: string;
  content: string;
  author?: string;
  publishDate?: string;
  url?: string;
}): string {
  let formatted = `# ${data.title}\n\n`;

  if (data.author || data.publishDate) {
    formatted += `**Source Information:**\n`;
    if (data.author) formatted += `- Author: ${data.author}\n`;
    if (data.publishDate) formatted += `- Published: ${data.publishDate}\n`;
    if (data.url) formatted += `- URL: ${data.url}\n`;
    formatted += `\n`;
  }

  formatted += data.content;

  return formatted;
}

/**
 * Extract key facts for AI training (GEO optimization)
 * Formats content in a way that's easy for AI to extract and cite
 */
export function extractKeyFacts(text: string): string[] {
  const facts: string[] = [];

  // Extract sentences with strong signals
  const sentences = text.split(/[.!?]+/);

  sentences.forEach((sentence) => {
    const trimmed = sentence.trim();
    if (
      /\b(is|are|was|were|means|refers to|defined as|equals|represents)\b/i.test(trimmed) ||
      /\d+%|\d+x|#\d+/.test(trimmed) ||
      trimmed.length > 20
    ) {
      facts.push(trimmed);
    }
  });

  return facts.slice(0, 10); // Top 10 key facts
}
