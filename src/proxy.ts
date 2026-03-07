/**
 * Next.js 16 Proxy (middleware entry point)
 *
 * Orchestrates security checks per request:
 * rate limiting, bot blocking, admin auth, CSP nonce, CSRF, and locale cookies.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';
import { extractClientIp } from '@/lib/proxy/client-ip';
import { isMaliciousBot } from '@/lib/proxy/bot-detection';
import { shouldSkip, isAuthRoute, isAdminRoute, isAiRoute, classifyRoute } from '@/lib/proxy/routes';
import { enforceRateLimit } from '@/lib/proxy/rate-limit';
import { buildCspHeader } from '@/lib/proxy/csp';
import { resolveLocale, LOCALE_COOKIE } from '@/lib/proxy/locale';
import { generateEdgeCsrfToken, hasCsrfCookie, CSRF_COOKIE_NAME } from '@/lib/proxy/csrf';

function blockBotOnAuthRoute(request: NextRequest, clientIp: string): NextResponse | null {
  if (!isAuthRoute(request.nextUrl.pathname)) return null;

  const { isMalicious, reason } = isMaliciousBot(request);
  if (!isMalicious) return null;

  console.log(`[SECURITY] Bot blocked on auth route: ${request.nextUrl.pathname}`, {
    ip: clientIp,
    reason,
  });
  return NextResponse.json({ error: 'Access denied' }, { status: 403 });
}

function blockExceededRateLimit(pathname: string, clientIp: string): NextResponse | null {
  if (!pathname.startsWith('/api/')) return null;

  const tier = classifyRoute(pathname);
  const result = enforceRateLimit(clientIp, tier);
  if (result.allowed) return null;

  console.log(`[SECURITY] Rate limit exceeded: ${pathname}`, { ip: clientIp, tier });
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': result.maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'Retry-After': Math.ceil(result.resetInMs / 1000).toString(),
      },
    }
  );
}

function blockDisabledAiRoute(pathname: string): NextResponse | null {
  if (!isAiRoute(pathname)) return null;

  return NextResponse.json(
    { error: 'Service not available', message: 'AI features are not enabled on this site.' },
    { status: 503 }
  );
}

async function blockUnauthorizedAdmin(
  pathname: string,
  request: NextRequest
): Promise<NextResponse | null> {
  if (!isAdminRoute(pathname)) return null;

  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (token.role !== 'ADMIN') {
    console.log(`[SECURITY] Non-admin attempted admin route: ${pathname}`, { userId: token.sub });
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return null;
}

function buildResponse(request: NextRequest, nonce: string): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(getNonceHeaderName(), nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', buildCspHeader(nonce));
  return response;
}

function setLocaleCookie(request: NextRequest, response: NextResponse): void {
  if (request.cookies.has(LOCALE_COOKIE)) return;

  response.cookies.set(LOCALE_COOKIE, resolveLocale(request), {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    sameSite: 'lax',
  });
}

function setCsrfCookie(request: NextRequest, response: NextResponse): void {
  if (hasCsrfCookie(request.cookies.get(CSRF_COOKIE_NAME)?.value)) return;

  response.cookies.set(CSRF_COOKIE_NAME, generateEdgeCsrfToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
}

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (shouldSkip(pathname)) return NextResponse.next();

  const clientIp = extractClientIp(req);

  const botBlock = blockBotOnAuthRoute(req, clientIp);
  if (botBlock) return botBlock;

  const rateLimitBlock = blockExceededRateLimit(pathname, clientIp);
  if (rateLimitBlock) return rateLimitBlock;

  const aiBlock = blockDisabledAiRoute(pathname);
  if (aiBlock) return aiBlock;

  const adminBlock = await blockUnauthorizedAdmin(pathname, req);
  if (adminBlock) return adminBlock;

  const nonce = generateNonce();
  const response = buildResponse(req, nonce);

  setLocaleCookie(req, response);
  setCsrfCookie(req, response);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
