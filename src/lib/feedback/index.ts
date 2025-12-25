/**
 * User Feedback System
 * Collect, categorize, and analyze user feedback
 */

export interface Feedback {
  id: string;
  userId?: string;
  email?: string;
  type: FeedbackType;
  category: FeedbackCategory;
  message: string;
  rating?: number; // 1-5
  metadata?: Record<string, unknown>;
  status: FeedbackStatus;
  createdAt: Date;
  respondedAt?: Date;
  tags?: string[];
}

export type FeedbackType =
  | 'bug'
  | 'feature_request'
  | 'improvement'
  | 'question'
  | 'praise'
  | 'complaint';

export type FeedbackCategory =
  | 'ui_ux'
  | 'performance'
  | 'functionality'
  | 'documentation'
  | 'billing'
  | 'support'
  | 'other';

export type FeedbackStatus = 'new' | 'acknowledged' | 'in_progress' | 'resolved' | 'closed';

/**
 * Analyze feedback sentiment (simple heuristic)
 */
export function analyzeSentiment(message: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = [
    'great',
    'excellent',
    'love',
    'awesome',
    'perfect',
    'amazing',
    'helpful',
    'fast',
  ];
  const negativeWords = [
    'bad',
    'terrible',
    'hate',
    'slow',
    'broken',
    'bug',
    'issue',
    'problem',
    'frustrated',
  ];

  const lowerMessage = message.toLowerCase();

  const positiveCount = positiveWords.filter((word) => lowerMessage.includes(word)).length;
  const negativeCount = negativeWords.filter((word) => lowerMessage.includes(word)).length;

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

/**
 * Categorize feedback automatically based on keywords
 */
export function categorizeFeedback(message: string): FeedbackCategory {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.match(/(slow|lag|performance|speed|loading)/)) {
    return 'performance';
  }
  if (lowerMessage.match(/(ui|ux|design|layout|button|color|theme)/)) {
    return 'ui_ux';
  }
  if (lowerMessage.match(/(billing|payment|charge|subscription|refund|price)/)) {
    return 'billing';
  }
  if (lowerMessage.match(/(doc|documentation|guide|tutorial|help)/)) {
    return 'documentation';
  }
  if (lowerMessage.match(/(support|contact|email|response|reply)/)) {
    return 'support';
  }
  if (lowerMessage.match(/(feature|function|work|integrate|export)/)) {
    return 'functionality';
  }

  return 'other';
}

/**
 * Extract feature request tags
 */
export function extractTags(message: string): string[] {
  const tags: string[] = [];

  const patterns: Record<string, RegExp[]> = {
    'dark-mode': [/dark mode/i, /dark theme/i],
    'mobile-app': [/mobile app/i, /ios app/i, /android app/i],
    api: [/\bapi\b/i, /integration/i],
    export: [/export/i, /download/i, /csv/i, /pdf/i],
    notifications: [/notification/i, /alert/i, /email notification/i],
    collaboration: [/team/i, /collaborate/i, /share/i],
    automation: [/automate/i, /automatic/i, /schedule/i],
    analytics: [/analytics/i, /report/i, /dashboard/i],
  };

  Object.entries(patterns).forEach(([tag, regexes]) => {
    if (regexes.some((regex) => regex.test(message))) {
      tags.push(tag);
    }
  });

  return tags;
}

/**
 * Prioritize feedback based on multiple factors
 */
export function prioritizeFeedback(feedback: Feedback[]): Feedback[] {
  return feedback.sort((a, b) => {
    // Priority scoring
    const scoreA = calculatePriorityScore(a);
    const scoreB = calculatePriorityScore(b);
    return scoreB - scoreA;
  });
}

function calculatePriorityScore(feedback: Feedback): number {
  let score = 0;

  // Type priority
  if (feedback.type === 'bug') score += 10;
  if (feedback.type === 'complaint') score += 8;
  if (feedback.type === 'feature_request') score += 5;

  // Status priority
  if (feedback.status === 'new') score += 5;

  // Category priority
  if (feedback.category === 'billing') score += 8;
  if (feedback.category === 'performance') score += 7;

  // Sentiment penalty (negative feedback needs attention)
  if (feedback.message) {
    const sentiment = analyzeSentiment(feedback.message);
    if (sentiment === 'negative') score += 6;
  }

  // Rating-based priority
  if (feedback.rating !== undefined) {
    if (feedback.rating <= 2) score += 7; // Low ratings need attention
  }

  // Recency (more recent = higher priority)
  const daysSinceCreated = Math.floor(
    (Date.now() - feedback.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSinceCreated === 0) score += 5;
  if (daysSinceCreated <= 1) score += 3;

  return score;
}

/**
 * Group feedback by category
 */
export function groupFeedbackByCategory(
  feedback: Feedback[]
): Record<FeedbackCategory, Feedback[]> {
  const grouped: Record<FeedbackCategory, Feedback[]> = {
    ui_ux: [],
    performance: [],
    functionality: [],
    documentation: [],
    billing: [],
    support: [],
    other: [],
  };

  feedback.forEach((item) => {
    grouped[item.category].push(item);
  });

  return grouped;
}

/**
 * Get feedback statistics
 */
export function getFeedbackStats(feedback: Feedback[]): {
  total: number;
  byType: Record<FeedbackType, number>;
  byStatus: Record<FeedbackStatus, number>;
  avgRating: number;
  sentimentBreakdown: { positive: number; neutral: number; negative: number };
} {
  const stats = {
    total: feedback.length,
    byType: {
      bug: 0,
      feature_request: 0,
      improvement: 0,
      question: 0,
      praise: 0,
      complaint: 0,
    } as Record<FeedbackType, number>,
    byStatus: {
      new: 0,
      acknowledged: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0,
    } as Record<FeedbackStatus, number>,
    avgRating: 0,
    sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
  };

  let totalRating = 0;
  let ratingCount = 0;

  feedback.forEach((item) => {
    stats.byType[item.type]++;
    stats.byStatus[item.status]++;

    if (item.rating !== undefined) {
      totalRating += item.rating;
      ratingCount++;
    }

    const sentiment = analyzeSentiment(item.message);
    stats.sentimentBreakdown[sentiment]++;
  });

  stats.avgRating = ratingCount > 0 ? totalRating / ratingCount : 0;

  return stats;
}

/**
 * Generate feedback report
 */
export function generateFeedbackReport(feedback: Feedback[]): string {
  const stats = getFeedbackStats(feedback);

  let report = '# Feedback Report\n\n';

  report += `## Summary\n`;
  report += `- Total Feedback: ${stats.total}\n`;
  report += `- Average Rating: ${stats.avgRating.toFixed(1)}/5\n`;
  report += `- Response Rate: ${Math.round((stats.byStatus.resolved / stats.total) * 100)}%\n\n`;

  report += `## By Type\n`;
  Object.entries(stats.byType).forEach(([type, count]) => {
    if (count > 0) {
      report += `- ${type}: ${count}\n`;
    }
  });
  report += `\n`;

  report += `## Sentiment Analysis\n`;
  report += `- Positive: ${stats.sentimentBreakdown.positive} (${Math.round((stats.sentimentBreakdown.positive / stats.total) * 100)}%)\n`;
  report += `- Neutral: ${stats.sentimentBreakdown.neutral} (${Math.round((stats.sentimentBreakdown.neutral / stats.total) * 100)}%)\n`;
  report += `- Negative: ${stats.sentimentBreakdown.negative} (${Math.round((stats.sentimentBreakdown.negative / stats.total) * 100)}%)\n\n`;

  return report;
}

// Export all from NPS module
export * from './nps';
