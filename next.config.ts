import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Security headers for production
const securityHeaders = [
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
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // CSP is now set in proxy.ts with dynamic nonce generation
  // Keeping this comment as reference for the CSP policy structure
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      // Alias optional AI/storage dependencies to empty module (loaded dynamically at runtime)
      'openai': './src/lib/noop.ts',
      '@anthropic-ai/sdk': './src/lib/noop.ts',
      '@aws-sdk/client-s3': './src/lib/noop.ts',
      '@aws-sdk/s3-request-presigner': './src/lib/noop.ts',
    },
  },

  // Instrumentation is automatically enabled in Next.js 15

  // Webpack configuration to exclude @react-email from server-side bundling
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      // Exclude @react-email packages from server-side bundling to prevent CSS loading issues
      config.externals = config.externals || [];
      config.externals.push('@react-email/components', '@react-email/render');

      // Mark optional AI and storage dependencies as external (not bundled)
      // These are loaded dynamically with try/catch and are optional
      config.externals.push(
        'openai',
        '@anthropic-ai/sdk',
        '@aws-sdk/client-s3',
        '@aws-sdk/s3-request-presigner'
      );
    }

    // Ignore optional AI/storage dependencies to prevent build warnings
    // These packages are only loaded at runtime when features are enabled
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(openai|@anthropic-ai\/sdk|@aws-sdk\/client-s3|@aws-sdk\/s3-request-presigner)$/,
      })
    );

    return config;
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // Output configuration
  output: "standalone",

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },

  async redirects() {
    return [
      // Docs category index redirects
      {
        source: "/docs/tutorials",
        destination: "/docs/tutorials/quick-start",
        permanent: true,
      },
      {
        source: "/docs/features",
        destination: "/docs/features/payments",
        permanent: true,
      },
      {
        source: "/docs/deployment",
        destination: "/docs/deployment/environment",
        permanent: true,
      },
      {
        source: "/docs/security",
        destination: "/docs/security/rate-limiting",
        permanent: true,
      },
      {
        source: "/docs/extras",
        destination: "/docs/extras/theming",
        permanent: true,
      },
      {
        source: "/docs/launch",
        destination: "/docs/launch/checklist",
        permanent: true,
      },
      // Dashboard redirects
      {
        source: "/developer",
        destination: "/developer/api-keys",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

