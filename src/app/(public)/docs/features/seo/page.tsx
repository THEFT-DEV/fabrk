import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Search, Share2, FileText, Globe } from 'lucide-react';

export const metadata = {
  title: 'SEO Metadata - Fabrk Docs',
  description:
    'Comprehensive SEO configuration including meta tags, OpenGraph, Twitter cards, and structured data for optimal search engine visibility.',
};

export default function SEOPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Features"
      title="SEO Metadata"
      description="Comprehensive SEO configuration including meta tags, OpenGraph, Twitter cards, and structured data for optimal search engine visibility."
      overview="Fabrk includes a complete SEO system built on Next.js 15's metadata API. The system provides automatic meta tag generation from centralized configuration, OpenGraph and Twitter card support for social sharing, JSON-LD structured data for rich search results, dynamic sitemap and robots.txt generation, and canonical URL management."
      features={[
        {
          icon: Search,
          title: 'Auto Meta Tags',
          description:
            'Automatic meta tag generation from centralized configuration in src/config.js.',
        },
        {
          icon: Share2,
          title: 'Social Cards',
          description: 'OpenGraph and Twitter card support for beautiful social sharing previews.',
        },
        {
          icon: FileText,
          title: 'Structured Data',
          description: 'JSON-LD structured data for rich search results and knowledge panels.',
        },
        {
          icon: Globe,
          title: 'Dynamic Sitemap',
          description:
            'Automatic sitemap.xml and robots.txt generation for search engine crawling.',
        },
      ]}
      setup={[
        {
          title: 'Update Central Config',
          description: 'Edit src/config.js with your site details',
          code: `export const config = {
  app: {
    name: "Your SaaS Name",
    description: "Your compelling product description",
    url: "https://yourdomain.com",
    ogImage: "/og-image.png",
    twitterHandle: "@yourusername",
  },
  // ...
};`,
          language: 'typescript',
        },
        {
          title: 'Root Layout Metadata',
          description: 'The root layout exports metadata automatically',
          code: `// src/app/layout.tsx
import { config } from "@/config";

export const metadata = {
  title: {
    default: config.app.name,
    template: \`%s | \${config.app.name}\`,
  },
  description: config.app.description,
  openGraph: {
    title: config.app.name,
    description: config.app.description,
    url: config.app.url,
    siteName: config.app.name,
    images: [{ url: config.app.ogImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.app.name,
    description: config.app.description,
    creator: config.app.twitterHandle,
  },
};`,
          language: 'typescript',
        },
        {
          title: 'Page-Specific Metadata',
          description: 'Override metadata for individual pages',
          code: `// src/app/pricing/page.tsx
export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for teams of all sizes",
  openGraph: {
    title: "Pricing | Your SaaS",
    description: "Simple, transparent pricing for teams of all sizes",
  },
};

export default function PricingPage() {
  return <div>...</div>;
}`,
          language: 'tsx',
        },
      ]}
      usage={[
        {
          title: 'Dynamic Metadata',
          description: 'Generate metadata based on dynamic content',
          code: `// src/app/blog/[slug]/page.tsx
import { prisma } from "@/lib/db";

export async function generateMetadata({ params }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.createdAt,
    },
  };
}`,
          language: 'typescript',
        },
        {
          title: 'JSON-LD Structured Data',
          description: 'Add structured data for rich search results',
          code: `// src/lib/seo/structured-data.ts
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.app.name,
    url: config.app.url,
    logo: \`\${config.app.url}/logo.png\`,
    sameAs: [
      "https://twitter.com/yourusername",
      "https://linkedin.com/company/yourcompany",
    ],
  };
}

// In your layout or page:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateOrganizationSchema()),
  }}
/>`,
          language: 'typescript',
        },
        {
          title: 'Sitemap Generation',
          description: 'Automatic sitemap at /sitemap.xml',
          code: `// src/app/sitemap.ts
import { config } from "@/config";

export default async function sitemap() {
  const staticPages = [
    { url: config.app.url, lastModified: new Date() },
    { url: \`\${config.app.url}/pricing\`, lastModified: new Date() },
    { url: \`\${config.app.url}/features\`, lastModified: new Date() },
  ];

  // Add dynamic pages (blog posts, etc.)
  const posts = await prisma.post.findMany({
    select: { slug: true, updatedAt: true },
  });

  const postPages = posts.map((post) => ({
    url: \`\${config.app.url}/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
  }));

  return [...staticPages, ...postPages];
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'API Keys', href: '/docs/features/api-keys' }}
      next={{ title: 'Cookie Consent', href: '/docs/features/cookie-consent' }}
    >
      {/* Common Use Cases Section */}
      <DocsSection title="Common Use Cases">
        <div className="grid gap-4">
          <DocsCard title="LANDING PAGE SEO">
            Landing Page SEO
            <p className="mb-6">
              Configure meta tags for your homepage with compelling title and description that
              matches your value proposition. Include OpenGraph image (1200x630px recommended).
            </p>
          </DocsCard>

          <DocsCard title="BLOG POST SEO">
            Blog Post Optimization
            <p className="mb-6">
              Use dynamic metadata generation to automatically pull title, description, and featured
              image from your CMS or database for each blog post.
            </p>
          </DocsCard>

          <DocsCard title="PRODUCT PAGES">
            Product Pages
            <p className="mb-6">
              Add Product schema structured data for e-commerce features, including price,
              availability, and reviews for rich snippets in search results.
            </p>
          </DocsCard>

          <DocsCard title="LOCALIZED CONTENT">
            Localized Content
            <p className="mb-6">
              Use hreflang tags and locale-specific metadata for international SEO. Fabrk's i18n
              system automatically handles alternate language links.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="SEO BEST PRACTICES">
          <ul className="space-y-1">
            <li>├─ Keep titles under 60 characters for full display in search results</li>
            <li>├─ Write descriptions between 120-160 characters</li>
            <li>├─ Use unique titles and descriptions for every page</li>
            <li>├─ Include primary keyword near the beginning of titles</li>
            <li>├─ Ensure OpenGraph images are at least 1200x630px</li>
            <li>├─ Test structured data with Google's Rich Results Test</li>
            <li>└─ Submit sitemap to Google Search Console</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
