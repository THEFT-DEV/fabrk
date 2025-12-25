import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsLinkCard } from '@/components/docs';
import { Bot, Clock, Shield, Fingerprint } from 'lucide-react';

export const metadata = {
  title: 'Bot Protection - Fabrk Docs',
  description:
    'Block malicious bots and scrapers. Honeypot fields, CAPTCHA integration, and user-agent filtering.',
};

export default function BotProtectionPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Security"
      title="Bot Protection"
      description="Detect and block automated bot traffic with multiple protection strategies."
      overview="Bot protection prevents automated attacks on your forms and APIs. Use honeypot fields, timing validation, user-agent analysis, and CAPTCHA to block bots while keeping the experience smooth for real users."
      features={[
        {
          icon: Bot,
          title: 'Honeypot Fields',
          description: "Invisible fields that bots fill but humans don't.",
        },
        {
          icon: Clock,
          title: 'Time Validation',
          description: 'Reject submissions that are too fast or too slow.',
        },
        {
          icon: Fingerprint,
          title: 'User-Agent Analysis',
          description: 'Detect suspicious user agents and patterns.',
        },
        {
          icon: Shield,
          title: 'CAPTCHA Integration',
          description: 'Optional Cloudflare Turnstile for strong protection.',
        },
      ]}
      usage={[
        {
          title: 'Honeypot Fields',
          description: "Add invisible fields that bots will fill but humans won't",
          code: `// Client-side form component
"use client";

export function ContactForm() {
  return (
    <form action="/api/contact" method="POST">
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />

      {/* Honeypot - hidden from users, bots will fill it */}
      <input
        type="text"
        name="website"
        style={{
          position: "absolute",
          left: "-9999px",
          tabIndex: -1,
          autocomplete: "off",
        }}
        aria-hidden="true"
      />

      {/* Alternative CSS hiding */}
      <div className="hidden">
        <input type="text" name="phone_number" tabIndex={-1} />
      </div>

      <button type="submit">Send</button>
    </form>
  );
}

// Server-side validation
// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();

  // Check honeypot fields
  const honeypot1 = body.get("website");
  const honeypot2 = body.get("phone_number");

  if (honeypot1 || honeypot2) {
    // Log potential bot attempt
    console.log("Bot detected: honeypot filled");

    // Return success to not alert the bot
    return NextResponse.json({ success: true });
  }

  // Process legitimate submission
  const name = body.get("name");
  const email = body.get("email");

  // ...
}`,
          language: 'tsx',
        },
        {
          title: 'Time-based Validation',
          description: 'Reject submissions that are too fast (bots) or too slow (stale tokens)',
          code: `// Client-side: Add timestamp to form
"use client";

import { useEffect, useState } from "react";

export function ProtectedForm() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(Date.now().toString());
  }, []);

  return (
    <form action="/api/submit" method="POST">
      <input type="hidden" name="timestamp" value={timestamp} />
      <input type="text" name="data" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Server-side validation
// src/app/api/submit/route.ts

import { NextRequest, NextResponse } from "next/server";

const MIN_SUBMIT_TIME = 2000;  // 2 seconds minimum
const MAX_SUBMIT_TIME = 3600000; // 1 hour maximum

export async function POST(request: NextRequest) {
  const body = await request.json();

  const timestamp = parseInt(body.timestamp);
  const now = Date.now();
  const elapsed = now - timestamp;

  // Too fast = bot
  if (elapsed < MIN_SUBMIT_TIME) {
    console.log(\`Bot detected: submitted in \${elapsed}ms\`);
    return NextResponse.json(
      { error: "Please take your time filling the form" },
      { status: 400 }
    );
  }

  // Too slow = stale token
  if (elapsed > MAX_SUBMIT_TIME) {
    return NextResponse.json(
      { error: "Form expired. Please refresh and try again" },
      { status: 400 }
    );
  }

  // Process legitimate submission
}`,
          language: 'tsx',
        },
        {
          title: 'User-Agent Analysis',
          description: 'Detect suspicious user agents',
          code: `// src/lib/bot-detection.ts

const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /axios/i,
  /node-fetch/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
];

// Known good bots (search engines)
const GOOD_BOTS = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /duckduckbot/i,
  /slurp/i, // Yahoo
];

export function analyzeUserAgent(userAgent: string | null): {
  isBot: boolean;
  isGoodBot: boolean;
  confidence: number;
} {
  if (!userAgent) {
    return { isBot: true, isGoodBot: false, confidence: 0.9 };
  }

  // Check for good bots first
  for (const pattern of GOOD_BOTS) {
    if (pattern.test(userAgent)) {
      return { isBot: true, isGoodBot: true, confidence: 0.95 };
    }
  }

  // Check for bad bot patterns
  for (const pattern of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return { isBot: true, isGoodBot: false, confidence: 0.8 };
    }
  }

  // Suspicious: no version numbers
  if (!/\\d/.test(userAgent)) {
    return { isBot: true, isGoodBot: false, confidence: 0.6 };
  }

  return { isBot: false, isGoodBot: false, confidence: 0.1 };
}

// Usage in API route
export async function POST(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const { isBot, isGoodBot, confidence } = analyzeUserAgent(userAgent);

  if (isBot && !isGoodBot && confidence > 0.7) {
    return NextResponse.json(
      { error: "Access denied" },
      { status: 403 }
    );
  }

  // Continue processing
}`,
          language: 'typescript',
        },
        {
          title: 'Middleware Protection',
          description: 'Add bot detection at the network edge',
          code: `// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";

// Protected paths
const PROTECTED_PATHS = [
  "/api/contact",
  "/api/signup",
  "/api/login",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only check protected paths
  if (!PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for missing headers that browsers always send
  const userAgent = request.headers.get("user-agent");
  const acceptLanguage = request.headers.get("accept-language");
  const acceptEncoding = request.headers.get("accept-encoding");

  if (!userAgent || !acceptLanguage || !acceptEncoding) {
    return NextResponse.json(
      { error: "Access denied" },
      { status: 403 }
    );
  }

  // Check for suspicious patterns
  const suspiciousHeaders = [
    request.headers.get("x-forwarded-for")?.split(",").length > 5,
    /python|curl|wget/i.test(userAgent),
  ];

  if (suspiciousHeaders.some(Boolean)) {
    console.log("Suspicious request blocked:", {
      ip: request.ip,
      userAgent,
      path: pathname,
    });

    return NextResponse.json(
      { error: "Access denied" },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};`,
          language: 'typescript',
        },
        {
          title: 'Cloudflare Turnstile CAPTCHA',
          description: 'Add Cloudflare Turnstile for strong bot protection',
          code: `// npm install @marsidev/react-turnstile

"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export function ProtectedForm() {
  const [token, setToken] = useState<string>("");

  return (
    <form action="/api/submit" method="POST">
      <input type="text" name="data" />

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setToken(token)}
      />

      <input type="hidden" name="turnstileToken" value={token} />

      <button type="submit" disabled={!token}>
        Submit
      </button>
    </form>
  );
}

// Server-side verification
// src/app/api/submit/route.ts

async function verifyTurnstile(token: string): Promise<boolean> {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  );

  const data = await response.json();
  return data.success;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const isValid = await verifyTurnstile(body.turnstileToken);

  if (!isValid) {
    return NextResponse.json(
      { error: "CAPTCHA verification failed" },
      { status: 400 }
    );
  }

  // Process submission
}`,
          language: 'tsx',
        },
      ]}
      setup={[
        {
          title: 'Environment Variables',
          description: 'Configure Cloudflare Turnstile (optional)',
          code: `# .env.local

# Cloudflare Turnstile (optional)
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your-site-key"
TURNSTILE_SECRET_KEY="your-secret-key"`,
          language: 'bash',
        },
      ]}
      previous={{
        title: 'Schema Validation',
        href: '/docs/security/validation',
      }}
      next={{ title: 'Rate Limiting', href: '/docs/security/rate-limiting' }}
    >
      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/security/rate-limiting"
            title="Rate Limiting"
            description="Limit requests per IP or user"
          />
          <DocsLinkCard
            href="/docs/security/audit-logging"
            title="Audit Logging"
            description="Log bot detection events"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
