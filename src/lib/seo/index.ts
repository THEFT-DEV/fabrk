/**
 * SEO Library Index
 * Complete SEO, AEO, GEO, and AIEO toolkit
 *
 * Usage:
 * import {
 *   generateFAQSchema,
 *   analyzeContent,
 *   isAICrawler,
 *   analyzeContentComprehensive
 * } from "@/lib/seo";
 */

// Structured Data (JSON-LD)
export {
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  generateWebSiteSchema,
  generateVideoSchema,
  generateCourseSchema,
} from './structured-data';

// Content Optimization
export {
  calculateReadingTime,
  countWords,
  calculateKeywordDensity,
  calculateReadabilityScore,
  extractHeadings,
  isFeaturedSnippetOptimized,
  analyzeContent,
  scoreContent,
  generateVoiceSearchSuggestions,
  formatForAICitation,
  extractKeyFacts,
} from './content-optimization';

// AI Optimization (GEO + AIEO)
export {
  AI_CRAWLERS,
  generateAIRobotRules,
  isAICrawler,
  getAICrawlerInfo,
  generateCitableFormat,
  generateAIMetadata,
  formatPeopleAlsoAsk,
  generateEntityMarkup,
  optimizeForAIOverview,
  calculateAICitationScore,
  logAICrawler,
  type AIBotConfig,
  type CitableContent,
  type CrawlerLog,
} from './ai-optimization';

// AI Content Analyzer
export {
  analyzeContentComprehensive,
  generateSEOReport,
  type ComprehensiveScore,
} from './ai-content-analyzer';
