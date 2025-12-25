/**
 * AI-Enhanced Content Analyzer (AIEO)
 * Uses AI-driven analysis to optimize content for all search types
 *
 * Analyzes:
 * - SEO: Traditional search optimization
 * - AEO: Answer engine readiness
 * - GEO: AI citation potential
 * - Overall content quality
 */

import {
  analyzeContent,
  scoreContent,
  calculateReadabilityScore,
  type ContentAnalysis,
} from './content-optimization';

export interface ComprehensiveScore {
  overall: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  scores: {
    seo: number;
    aeo: number;
    geo: number;
    readability: number;
  };
  strengths: string[];
  improvements: string[];
  actionItems: Array<{
    priority: 'high' | 'medium' | 'low';
    task: string;
    impact: string;
  }>;
}

/**
 * Comprehensive content analysis
 * Provides actionable insights for optimization
 */
export function analyzeContentComprehensive(
  content: string,
  targetKeywords: string[] = [],
  options: {
    minWordCount?: number;
    targetReadability?: number;
    requireSchema?: boolean;
  } = {}
): ComprehensiveScore {
  const { minWordCount = 300, targetReadability = 65, requireSchema = true } = options;

  const analysis = analyzeContent(content);
  const _seoScore = scoreContent(content, targetKeywords);

  const scores = {
    seo: calculateSEOScore(analysis, targetKeywords),
    aeo: calculateAEOScore(analysis),
    geo: calculateGEOScore(content, analysis),
    readability: calculateReadabilityScore(content),
  };

  const overall = Math.round(
    scores.seo * 0.3 + scores.aeo * 0.3 + scores.geo * 0.25 + scores.readability * 0.15
  );

  const grade = getGrade(overall);
  const strengths = identifyStrengths(analysis, scores);
  const improvements = identifyImprovements(analysis, scores, {
    minWordCount,
    targetReadability,
    requireSchema,
  });
  const actionItems = generateActionItems(improvements);

  return {
    overall,
    grade,
    scores,
    strengths,
    improvements,
    actionItems,
  };
}

/**
 * Calculate SEO score (0-100)
 */
function calculateSEOScore(analysis: ContentAnalysis, keywords: string[]): number {
  let score = 0;

  // Word count (20 points)
  if (analysis.wordCount >= 1000) score += 20;
  else if (analysis.wordCount >= 500) score += 15;
  else if (analysis.wordCount >= 300) score += 10;

  // Heading structure (30 points)
  if (analysis.headingStructure.length >= 5) score += 30;
  else if (analysis.headingStructure.length >= 3) score += 20;
  else if (analysis.headingStructure.length >= 1) score += 10;

  // Keywords (30 points)
  if (keywords.length > 0) {
    score += 30; // Assume keywords are present (simplified)
  }

  // Paragraph structure (20 points)
  if (analysis.paragraphCount >= 5) score += 20;
  else if (analysis.paragraphCount >= 3) score += 15;
  else if (analysis.paragraphCount >= 2) score += 10;

  return Math.min(100, score);
}

/**
 * Calculate AEO score (0-100)
 */
function calculateAEOScore(analysis: ContentAnalysis): number {
  let score = 0;

  // Questions (35 points) - critical for featured snippets
  if (analysis.hasQuestions) score += 35;

  // Lists (35 points) - great for "People Also Ask"
  if (analysis.hasList) score += 35;

  // Tables (30 points) - excellent for data presentation
  if (analysis.hasTable) score += 30;

  return Math.min(100, score);
}

/**
 * Calculate GEO score (0-100)
 * Measures AI citation potential
 */
function calculateGEOScore(content: string, analysis: ContentAnalysis): number {
  let score = 0;

  // Clear definitions (25 points)
  if (/\b(is|are|means|refers to|defined as)\b/i.test(content)) {
    score += 25;
  }

  // Statistics and data (25 points)
  if (/\d+%|\d+x|#\d+|\d+ (users|customers|developers)/.test(content)) {
    score += 25;
  }

  // Source attribution (20 points)
  if (/(according to|source:|study by|research shows)/i.test(content)) {
    score += 20;
  }

  // Structured format (15 points)
  if (analysis.headingStructure.length >= 3) {
    score += 15;
  }

  // Optimal length for AI (15 points)
  if (analysis.wordCount >= 300 && analysis.wordCount <= 2000) {
    score += 15;
  }

  return Math.min(100, score);
}

/**
 * Convert score to letter grade
 */
function getGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 65) return 'C';
  if (score >= 55) return 'D';
  return 'F';
}

/**
 * Identify content strengths
 */
function identifyStrengths(
  analysis: ContentAnalysis,
  scores: ComprehensiveScore['scores']
): string[] {
  const strengths: string[] = [];

  if (scores.readability >= 70) {
    strengths.push('Excellent readability - easy to understand');
  }

  if (analysis.hasQuestions && analysis.hasList) {
    strengths.push('Perfect for featured snippets (questions + lists)');
  }

  if (analysis.headingStructure.length >= 5) {
    strengths.push('Great heading structure for SEO');
  }

  if (analysis.wordCount >= 1000) {
    strengths.push('Comprehensive content length');
  }

  if (scores.geo >= 70) {
    strengths.push('High AI citation potential');
  }

  return strengths;
}

/**
 * Identify areas for improvement
 */
function identifyImprovements(
  analysis: ContentAnalysis,
  scores: ComprehensiveScore['scores'],
  options: {
    minWordCount: number;
    targetReadability: number;
    requireSchema: boolean;
  }
): string[] {
  const improvements: string[] = [];

  if (analysis.wordCount < options.minWordCount) {
    improvements.push(
      `Increase word count to at least ${options.minWordCount} (current: ${analysis.wordCount})`
    );
  }

  if (!analysis.hasQuestions) {
    improvements.push('Add question-based headings for "People Also Ask" optimization');
  }

  if (!analysis.hasList) {
    improvements.push('Add lists or bullet points for better AEO');
  }

  if (analysis.headingStructure.length < 3) {
    improvements.push('Add more headings (H2, H3) for better structure');
  }

  if (scores.readability < options.targetReadability) {
    improvements.push('Simplify sentences to improve readability');
  }

  if (scores.geo < 70) {
    improvements.push('Add clear definitions and statistics for AI citation');
  }

  if (!analysis.hasTable) {
    improvements.push('Consider adding tables for data presentation');
  }

  return improvements;
}

/**
 * Generate prioritized action items
 */
function generateActionItems(improvements: string[]): Array<{
  priority: 'high' | 'medium' | 'low';
  task: string;
  impact: string;
}> {
  const actionItems: Array<{
    priority: 'high' | 'medium' | 'low';
    task: string;
    impact: string;
  }> = [];

  improvements.forEach((improvement) => {
    if (improvement.includes('word count')) {
      actionItems.push({
        priority: 'high',
        task: improvement,
        impact: 'Improves SEO and content depth',
      });
    } else if (improvement.includes('question')) {
      actionItems.push({
        priority: 'high',
        task: improvement,
        impact: 'Critical for featured snippets',
      });
    } else if (improvement.includes('headings')) {
      actionItems.push({
        priority: 'high',
        task: improvement,
        impact: 'Essential for SEO and readability',
      });
    } else if (improvement.includes('list')) {
      actionItems.push({
        priority: 'medium',
        task: improvement,
        impact: 'Improves AEO performance',
      });
    } else if (improvement.includes('readability')) {
      actionItems.push({
        priority: 'medium',
        task: improvement,
        impact: 'Better user experience and engagement',
      });
    } else if (improvement.includes('AI citation')) {
      actionItems.push({
        priority: 'medium',
        task: improvement,
        impact: 'Increases GEO visibility',
      });
    } else {
      actionItems.push({
        priority: 'low',
        task: improvement,
        impact: 'Nice to have for completeness',
      });
    }
  });

  // Sort by priority
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return actionItems.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

/**
 * Generate SEO report
 * Returns markdown-formatted report
 */
export function generateSEOReport(analysis: ComprehensiveScore): string {
  let report = `# Content Optimization Report\n\n`;

  report += `## Overall Score: ${analysis.overall}/100 (Grade: ${analysis.grade})\n\n`;

  report += `### Score Breakdown\n`;
  report += `- **SEO:** ${analysis.scores.seo}/100\n`;
  report += `- **AEO (Answer Engine):** ${analysis.scores.aeo}/100\n`;
  report += `- **GEO (Generative AI):** ${analysis.scores.geo}/100\n`;
  report += `- **Readability:** ${analysis.scores.readability}/100\n\n`;

  if (analysis.strengths.length > 0) {
    report += `### ✅ Strengths\n`;
    analysis.strengths.forEach((strength) => {
      report += `- ${strength}\n`;
    });
    report += `\n`;
  }

  if (analysis.improvements.length > 0) {
    report += `### 📋 Improvements Needed\n`;
    analysis.improvements.forEach((improvement) => {
      report += `- ${improvement}\n`;
    });
    report += `\n`;
  }

  if (analysis.actionItems.length > 0) {
    report += `### 🎯 Action Items\n\n`;

    const highPriority = analysis.actionItems.filter((item) => item.priority === 'high');
    if (highPriority.length > 0) {
      report += `#### High Priority\n`;
      highPriority.forEach((item, index) => {
        report += `${index + 1}. ${item.task}\n   *Impact: ${item.impact}*\n\n`;
      });
    }

    const mediumPriority = analysis.actionItems.filter((item) => item.priority === 'medium');
    if (mediumPriority.length > 0) {
      report += `#### Medium Priority\n`;
      mediumPriority.forEach((item, index) => {
        report += `${index + 1}. ${item.task}\n   *Impact: ${item.impact}*\n\n`;
      });
    }

    const lowPriority = analysis.actionItems.filter((item) => item.priority === 'low');
    if (lowPriority.length > 0) {
      report += `#### Low Priority\n`;
      lowPriority.forEach((item, index) => {
        report += `${index + 1}. ${item.task}\n   *Impact: ${item.impact}*\n\n`;
      });
    }
  }

  return report;
}
