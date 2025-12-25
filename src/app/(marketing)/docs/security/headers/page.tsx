import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Shield, Lock, Globe, FileCode } from 'lucide-react';

export const metadata = {
  title: 'Security Headers - Fabrk Docs',
  description:
    'Configure HSTS, CSP, X-Frame-Options, and other security headers. Production-ready defaults included.',
};

export default function SecurityHeadersPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Security"
      title="Security Headers"
      description="Configure HTTP security headers including HSTS, CSP, X-Frame-Options, and more."
      overview="Security headers protect your application from common web vulnerabilities like XSS, clickjacking, and man-in-the-middle attacks. Fabrk includes production-ready defaults you can customize."
      features={[
        {
          icon: Lock,
          title: 'HSTS',
          description: 'Strict-Transport-Security enforces HTTPS connections.',
        },
        {
          icon: Shield,
          title: 'CSP',
          description: 'Content-Security-Policy prevents XSS attacks.',
        },
        {
          icon: Globe,
          title: 'X-Frame-Options',
          description: 'Prevents clickjacking by controlling iframe embedding.',
        },
        {
          icon: FileCode,
          title: 'Permissions Policy',
          description: 'Control browser feature access like camera and mic.',
        },
      ]}
      usage={[
        {
          title: 'Next.js Configuration',
          description: 'Add security headers in next.config.js',
          code: `// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`,
          language: 'javascript',
        },
        {
          title: 'Content Security Policy',
          description: 'Configure a strict CSP to prevent XSS attacks',
          code: `// next.config.js

const ContentSecurityPolicy = \`
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https: blob:;
  connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com;
  frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
\`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\\s{2,}/g, " ").trim(),
          },
          // ... other headers
        ],
      },
    ];
  },
};`,
          language: 'javascript',
        },
        {
          title: 'Nonce-based CSP',
          description: 'Use nonces for stricter CSP without unsafe-inline',
          code: `// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Generate nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Create CSP with nonce
  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-\${nonce}';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  \`;

  // Set headers
  const response = NextResponse.next();
  response.headers.set(
    "Content-Security-Policy",
    cspHeader.replace(/\\s{2,}/g, " ").trim()
  );
  response.headers.set("x-nonce", nonce);

  return response;
}

// Access nonce in pages
// src/app/layout.tsx

import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") || "";

  return (
    <html lang="en">
      <body>
        <script nonce={nonce}>
          {/* Inline scripts with nonce */}
        </script>
        {children}
      </body>
    </html>
  );
}`,
          language: 'typescript',
        },
        {
          title: 'HSTS Configuration',
          description: 'Enforce HTTPS with Strict-Transport-Security',
          code: `// HSTS Header Options

// Standard (2 years)
"max-age=63072000; includeSubDomains"

// With preload (submit to hstspreload.org)
"max-age=63072000; includeSubDomains; preload"

// During testing (5 minutes)
"max-age=300"

// Parameters:
// - max-age: Time in seconds browser remembers HTTPS
// - includeSubDomains: Apply to all subdomains
// - preload: Allow browser vendors to hardcode`,
          language: 'bash',
        },
        {
          title: 'Permissions Policy',
          description: 'Control browser feature access',
          code: `// Common Permissions Policy configurations

// Minimal (most secure)
{
  key: "Permissions-Policy",
  value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
}

// Allow specific features for same origin
{
  key: "Permissions-Policy",
  value: "camera=(self), microphone=(self), geolocation=(self)"
}

// Allow for specific domains
{
  key: "Permissions-Policy",
  value: "camera=(self 'https://trusted.example.com')"
}

// Full list of directives:
// accelerometer, autoplay, camera, cross-origin-isolated,
// display-capture, encrypted-media, fullscreen, geolocation,
// gyroscope, keyboard-map, magnetometer, microphone, midi,
// payment, picture-in-picture, publickey-credentials-get,
// screen-wake-lock, sync-xhr, usb, web-share, xr-spatial-tracking`,
          language: 'javascript',
        },
        {
          title: 'Vercel Configuration',
          description: 'Alternative: Configure headers in vercel.json',
          code: `// vercel.json

{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ]
}`,
          language: 'json',
        },
        {
          title: 'Testing Headers',
          description: 'Verify your security headers are working',
          code: `# Test with curl
curl -I https://yoursite.com

# Online tools
# - https://securityheaders.com
# - https://observatory.mozilla.org
# - https://csp-evaluator.withgoogle.com

# Browser DevTools
# Network tab → Select request → Headers tab`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'CSRF Protection', href: '/docs/security/csrf' }}
      next={{ title: 'Schema Validation', href: '/docs/security/validation' }}
    >
      {/* HSTS Warning */}
      <DocsSection title="Important Notes">
        <DocsCard title="WARNING" className="bg-muted/50">
          <p className="mb-4">
            Only use the HSTS preload directive once you&apos;re certain all subdomains support
            HTTPS. It&apos;s difficult to remove from the preload list once submitted.
          </p>
        </DocsCard>
      </DocsSection>

      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/security/validation"
            title="Schema Validation"
            description="Validate all inputs with Zod schemas"
          />
          <DocsLinkCard
            href="/docs/deployment/vercel"
            title="Deploy to Vercel"
            description="Deploy with production security settings"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
