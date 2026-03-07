/**
 * Edge Bot Detection
 *
 * Lightweight bot detection for the proxy layer.
 * Checks user-agent patterns and missing browser headers
 * to block automated auth route abuse.
 */

import type { NextRequest } from 'next/server';

const BAD_BOT_PATTERNS = [
  /curl/i,
  /wget/i,
  /python-requests/i,
  /scrapy/i,
  /httpclient/i,
  /java\//i,
  /libwww/i,
  /lwp-/i,
  /^$/,
];

const GOOD_BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,
  /gptbot/i,
  /claude-web/i,
  /anthropic/i,
];

const MIN_USER_AGENT_LENGTH = 10;

export interface BotCheckResult {
  isMalicious: boolean;
  reason: string;
}

/**
 * Determine if a request appears to come from a malicious bot.
 * Good bots (search crawlers, social previews) are allowed through.
 */
export function isMaliciousBot(request: NextRequest): BotCheckResult {
  const userAgent = request.headers.get('user-agent') ?? '';

  if (GOOD_BOT_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return { isMalicious: false, reason: '' };
  }

  if (BAD_BOT_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return { isMalicious: true, reason: 'Known bad bot pattern' };
  }

  if (!userAgent || userAgent.length < MIN_USER_AGENT_LENGTH) {
    return { isMalicious: true, reason: 'Missing or short user agent' };
  }

  if (!request.headers.get('accept') && request.method === 'GET') {
    return { isMalicious: true, reason: 'Missing accept header on GET' };
  }

  return { isMalicious: false, reason: '' };
}
