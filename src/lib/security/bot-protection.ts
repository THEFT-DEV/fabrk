/**
 * Bot Protection & Detection
 * Protect against malicious bots, scrapers, and automated attacks
 *
 * Features:
 * - User agent analysis
 * - Behavioral detection
 * - Honeypot fields
 * - CAPTCHA integration helpers
 * - Rate limiting integration
 */

import { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';

export type BotType = 'good' | 'bad' | 'unknown';

export interface BotDetectionResult {
  isBot: boolean;
  botType: BotType;
  botName?: string;
  confidence: number; // 0-100
  reasons: string[];
}

/**
 * Known good bots (search engines, AI crawlers)
 * These are allowed through without rate limiting
 */
const GOOD_BOTS = [
  // Search engines (always allow)
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Slurp', // Yahoo

  // Social media crawlers
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'TelegramBot',
  'Discordbot',

  // AI crawlers
  'GPTBot',
  'ChatGPT-User',
  'Google-Extended',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'CCBot',

  // Monitoring services
  'UptimeRobot',
  'Pingdom',
  'StatusCake',
];

/**
 * Known bad bots (scrapers, spam bots, aggressive crawlers)
 * These are blocked or heavily rate-limited
 */
const BAD_BOTS = [
  // Aggressive SEO crawlers (block - use their official APIs instead)
  'SemrushBot',
  'AhrefsBot',
  'MJ12bot', // Majestic
  'DotBot', // Moz - aggressive
  'SeznamBot',
  'linkdexbot',
  'AspiegelBot',
  'BLEXBot',
  'DataForSeoBot',
  'Barkrowler',
  'SeekportBot',

  // Scrapers
  'HTTrack',
  'WebCopier',
  'WebZIP',
  'wget',
  'curl',
  'python-requests',
  'scrapy',
  'httpclient',
  'java/',
  'libwww',
  'lwp-',

  // Spam bots
  'EmailCollector',
  'EmailSiphon',
  'EmailWolf',
];

/**
 * Detect if request is from a bot
 */
export function detectBot(req: NextRequest): BotDetectionResult {
  const userAgent = req.headers.get('user-agent') || '';
  const reasons: string[] = [];
  let confidence = 0;
  let botName: string | undefined;
  let botType: BotType = 'unknown';

  // Check for empty user agent
  if (!userAgent) {
    reasons.push('Empty user agent');
    confidence += 50;
    return { isBot: true, botType: 'bad', confidence, reasons };
  }

  // Check good bots first
  for (const bot of GOOD_BOTS) {
    if (userAgent.includes(bot)) {
      botName = bot;
      botType = 'good';
      confidence = 95;
      reasons.push(`Identified as ${bot}`);
      return { isBot: true, botType, botName, confidence, reasons };
    }
  }

  // Check bad bots
  for (const bot of BAD_BOTS) {
    if (userAgent.toLowerCase().includes(bot.toLowerCase())) {
      botName = bot;
      botType = 'bad';
      confidence = 90;
      reasons.push(`Identified as ${bot}`);
      return { isBot: true, botType, botName, confidence, reasons };
    }
  }

  // Check for bot-like patterns
  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /scraper/i,
    /headless/i,
    /phantom/i,
    /selenium/i,
    /puppeteer/i,
    /playwright/i,
  ];

  for (const pattern of botPatterns) {
    if (pattern.test(userAgent)) {
      reasons.push(`Matches bot pattern: ${pattern}`);
      confidence += 30;
      botType = 'unknown';
    }
  }

  // Check for suspicious characteristics
  if (userAgent.length < 20) {
    reasons.push('Suspiciously short user agent');
    confidence += 20;
  }

  if (!/Mozilla|Chrome|Safari|Firefox|Edge|Opera/.test(userAgent)) {
    reasons.push('No common browser signature');
    confidence += 25;
  }

  // Check for missing common headers (bots often don't send these)
  if (!req.headers.get('accept-language')) {
    reasons.push('Missing Accept-Language header');
    confidence += 15;
  }

  if (!req.headers.get('accept')) {
    reasons.push('Missing Accept header');
    confidence += 15;
  }

  // SECURITY: Raised threshold to 75% for stricter bot detection
  const isBot = confidence >= 75;
  if (isBot && botType === 'unknown') {
    botType = confidence >= 85 ? 'bad' : 'unknown';
  }

  return {
    isBot,
    botType,
    botName,
    confidence,
    reasons,
  };
}

/**
 * Check if bot should be allowed
 */
export function shouldAllowBot(detection: BotDetectionResult): boolean {
  // Always allow good bots
  if (detection.botType === 'good') return true;

  // Block bad bots
  if (detection.botType === 'bad') return false;

  // For unknown, use confidence threshold
  return detection.confidence < 70;
}

/**
 * Honeypot field verification
 * Add hidden fields to forms - bots will fill them, humans won't
 */
export function verifyHoneypot(honeypotValue: string | null | undefined): boolean {
  // Honeypot should be empty
  return !honeypotValue || honeypotValue.trim() === '';
}

/**
 * Time-based bot detection
 * Forms submitted too quickly are likely bots
 */
export function verifySubmissionTiming(
  formLoadTime: number,
  minSeconds: number = 2
): { valid: boolean; reason?: string } {
  const elapsed = (Date.now() - formLoadTime) / 1000;

  if (elapsed < minSeconds) {
    return {
      valid: false,
      reason: `Form submitted too quickly (${elapsed.toFixed(1)}s < ${minSeconds}s)`,
    };
  }

  // Also suspicious if too long (possible bot delay)
  if (elapsed > 3600) {
    // 1 hour
    return {
      valid: false,
      reason: `Form submission timeout (${elapsed.toFixed(0)}s > 3600s)`,
    };
  }

  return { valid: true };
}

/**
 * CAPTCHA verification helper (works with multiple providers)
 */
export interface CaptchaVerification {
  success: boolean;
  score?: number; // 0-1 for reCAPTCHA v3, hCaptcha Enterprise
  challengeTs?: string;
  hostname?: string;
  errorCodes?: string[];
}

/**
 * Verify hCaptcha response
 */
export async function verifyHCaptcha(token: string): Promise<CaptchaVerification> {
  const secret = process.env.HCAPTCHA_SECRET_KEY;

  if (!secret) {
    logger.error('[Bot Protection] hCaptcha secret not configured');
    return { success: false, errorCodes: ['missing-secret'] };
  }

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `response=${token}&secret=${secret}`,
    });

    const data = await response.json();

    return {
      success: data.success,
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    };
  } catch (error: unknown) {
    logger.error('[Bot Protection] hCaptcha verification error', error);
    return { success: false, errorCodes: ['verification-failed'] };
  }
}

/**
 * Verify reCAPTCHA v3 response
 */
export async function verifyRecaptcha(
  token: string,
  _action: string
): Promise<CaptchaVerification> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    logger.error('[Bot Protection] reCAPTCHA secret not configured');
    return { success: false, errorCodes: ['missing-secret'] };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();

    return {
      success: data.success && data.score >= 0.5, // Threshold 0.5
      score: data.score,
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    };
  } catch (error: unknown) {
    logger.error('[Bot Protection] reCAPTCHA verification error', error);
    return { success: false, errorCodes: ['verification-failed'] };
  }
}

/**
 * Verify Cloudflare Turnstile response
 */
export async function verifyTurnstile(token: string): Promise<CaptchaVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    logger.error('[Bot Protection] Turnstile secret not configured');
    return { success: false, errorCodes: ['missing-secret'] };
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    });

    const data = await response.json();

    return {
      success: data.success,
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    };
  } catch (error: unknown) {
    logger.error('[Bot Protection] Turnstile verification error', error);
    return { success: false, errorCodes: ['verification-failed'] };
  }
}

/**
 * Generate device fingerprint (client-side)
 * Returns a simple hash based on browser properties
 */
export function generateDeviceFingerprint(): string {
  if (typeof window === 'undefined') return '';

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
  ];

  return btoa(components.join('|'));
}
