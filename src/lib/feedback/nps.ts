/**
 * Net Promoter Score (NPS) System
 * Collect and analyze customer satisfaction data
 *
 * NPS Scale:
 * - Detractors: 0-6
 * - Passives: 7-8
 * - Promoters: 9-10
 */

export interface NPSResponse {
  score: number; // 0-10
  comment?: string;
  userId?: string;
  email?: string;
  createdAt: Date;
  followUpQuestions?: Record<string, string>;
}

export type NPSCategory = 'detractor' | 'passive' | 'promoter';

/**
 * Categorize NPS score
 */
export function categorizeNPSScore(score: number): NPSCategory {
  if (score <= 6) return 'detractor';
  if (score <= 8) return 'passive';
  return 'promoter';
}

/**
 * Calculate NPS from responses
 * Formula: (% Promoters - % Detractors)
 * Returns: -100 to +100
 */
export function calculateNPS(responses: NPSResponse[]): number {
  if (responses.length === 0) return 0;

  const categories = responses.map((r) => categorizeNPSScore(r.score));

  const promoters = categories.filter((c) => c === 'promoter').length;
  const detractors = categories.filter((c) => c === 'detractor').length;
  const total = responses.length;

  const promoterPercentage = (promoters / total) * 100;
  const detractorPercentage = (detractors / total) * 100;

  return Math.round(promoterPercentage - detractorPercentage);
}

/**
 * Get NPS distribution
 */
export function getNPSDistribution(responses: NPSResponse[]): {
  promoters: number;
  passives: number;
  detractors: number;
  total: number;
} {
  const categories = responses.map((r) => categorizeNPSScore(r.score));

  return {
    promoters: categories.filter((c) => c === 'promoter').length,
    passives: categories.filter((c) => c === 'passive').length,
    detractors: categories.filter((c) => c === 'detractor').length,
    total: responses.length,
  };
}

/**
 * Get NPS interpretation
 */
export function interpretNPS(score: number): {
  label: string;
  description: string;
  emoji: string;
} {
  if (score >= 70) {
    return {
      label: 'Excellent',
      description: 'World-class customer satisfaction',
      emoji: '🌟',
    };
  }
  if (score >= 50) {
    return {
      label: 'Great',
      description: 'Strong customer loyalty',
      emoji: '😊',
    };
  }
  if (score >= 30) {
    return {
      label: 'Good',
      description: 'Above average satisfaction',
      emoji: '👍',
    };
  }
  if (score >= 0) {
    return {
      label: 'Needs Improvement',
      description: 'Room for enhancement',
      emoji: '😐',
    };
  }
  return {
    label: 'Poor',
    description: 'Requires immediate attention',
    emoji: '😞',
  };
}

/**
 * NPS follow-up questions based on score
 */
export function getFollowUpQuestions(score: number): string[] {
  const category = categorizeNPSScore(score);

  switch (category) {
    case 'promoter':
      return [
        'What do you love most about our product?',
        'Would you be willing to write a testimonial?',
        'Do you know anyone else who might benefit from our product?',
      ];

    case 'passive':
      return [
        'What would make you more likely to recommend us?',
        'What features would you like to see improved?',
        'Is there anything preventing you from using us more often?',
      ];

    case 'detractor':
      return [
        'What disappointed you about your experience?',
        'What would we need to change for you to recommend us?',
        'Can we schedule a call to discuss your concerns?',
      ];
  }
}

/**
 * Suggest when to show NPS survey
 */
export function shouldShowNPSSurvey(user: {
  signupDate: Date;
  lastNPSDate?: Date;
  engagementLevel: 'low' | 'medium' | 'high';
}): boolean {
  const now = new Date();

  // Don't show in first 7 days
  const daysSinceSignup = Math.floor(
    (now.getTime() - user.signupDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSinceSignup < 7) return false;

  // If never shown, show after 14 days for engaged users
  if (!user.lastNPSDate && daysSinceSignup >= 14 && user.engagementLevel !== 'low') {
    return true;
  }

  // Don't show if shown recently
  if (user.lastNPSDate) {
    const daysSinceLastNPS = Math.floor(
      (now.getTime() - user.lastNPSDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Wait at least 90 days between surveys
    if (daysSinceLastNPS < 90) return false;

    // For highly engaged users, can show every 90 days
    if (user.engagementLevel === 'high' && daysSinceLastNPS >= 90) return true;

    // For medium engagement, wait 180 days
    if (user.engagementLevel === 'medium' && daysSinceLastNPS >= 180) return true;
  }

  return false;
}

/**
 * Format NPS score for display
 */
export function formatNPS(score: number): string {
  return score > 0 ? `+${score}` : score.toString();
}

/**
 * Get NPS trend
 */
export function getNPSTrend(
  current: number,
  previous: number
): { direction: 'up' | 'down' | 'stable'; change: number } {
  const change = current - previous;

  if (Math.abs(change) < 5) {
    return { direction: 'stable', change };
  }

  return {
    direction: change > 0 ? 'up' : 'down',
    change: Math.abs(change),
  };
}

/**
 * Segment NPS by user properties
 */
export function segmentNPS(
  responses: NPSResponse[],
  segmentBy: (response: NPSResponse) => string
): Record<string, number> {
  const segments: Record<string, NPSResponse[]> = {};

  responses.forEach((response) => {
    const segment = segmentBy(response);
    if (!segments[segment]) {
      segments[segment] = [];
    }
    segments[segment].push(response);
  });

  const npsScores: Record<string, number> = {};
  Object.entries(segments).forEach(([segment, segmentResponses]) => {
    npsScores[segment] = calculateNPS(segmentResponses);
  });

  return npsScores;
}
