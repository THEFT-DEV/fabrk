/**
 * Metadata Configuration
 * SEO and social media metadata for the application
 */

import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Fabrk Boilerplate',
  description: 'Production-ready Next.js SaaS boilerplate with authentication, payments, and more',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/yourusername/fabrk-boilerplate',
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'SaaS',
    'Boilerplate',
    'Authentication',
    'Stripe',
    'Prisma',
  ],
  authors: [
    {
      name: 'Your Name',
      url: 'https://yourwebsite.com',
    },
  ],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

/**
 * Metadata Utilities
 * Helper functions for generating consistent metadata across pages
 */

interface GenerateMetadataProps {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  path?: string;
}

/**
 * Generate consistent metadata for pages
 * @example
 * export const metadata = generateMetadata({
 *   title: "Dashboard",
 *   description: "Manage your account",
 *   noIndex: true
 * });
 */
export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  path = '',
}: GenerateMetadataProps): Metadata {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const metaDescription = description || siteConfig.description;
  const ogImage = image || siteConfig.ogImage;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: metaDescription,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 * Critical for GEO - helps AI understand your brand
 */
export function generateOrganizationSchema(data?: {
  name?: string;
  description?: string;
  foundingDate?: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: data?.name || siteConfig.name,
    description: data?.description || siteConfig.description,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },
    foundingDate: data?.foundingDate,
    sameAs: data?.sameAs || [siteConfig.links.github],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@fabrk.dev',
      availableLanguage: ['English'],
    },
  };
}

/**
 * Generate JSON-LD structured data for product/software
 * Essential for GEO - product info for AI citations
 */
export function generateProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '79',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
    },
  };
}

/**
 * Generate SoftwareApplication schema with custom data
 * For GEO optimization with AI search engines
 */
export function generateSoftwareApplicationSchema(data?: {
  name?: string;
  description?: string;
  price?: string;
  priceCurrency?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteConfig.url}#software`,
    name: data?.name || siteConfig.name,
    description: data?.description || siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, macOS, Windows, Linux',
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: data?.price || '199',
      priceCurrency: data?.priceCurrency || 'USD',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/pricing`,
      validFrom: new Date().toISOString(),
    },
    author: {
      '@type': 'Organization',
      name: 'Fabrk',
    },
    featureList: [
      '62+ UI Components',
      'Authentication with NextAuth v5',
      'Multi-provider Payments (Stripe, Polar, Lemonsqueezy)',
      'Multi-tenancy Support',
      '18 Terminal Themes',
      'TypeScript Support',
      'Prisma ORM',
    ],
  };
}

/**
 * Generate breadcrumb JSON-LD structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generate FAQ JSON-LD structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BlogPosting JSON-LD structured data
 */
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: { name: string; url?: string };
  image?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Fabrk Team',
      url: post.author?.url || siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    image: post.image || `${siteConfig.url}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
  };
}

/**
 * Generate Article JSON-LD for documentation pages
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  path: string;
  updatedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    url: `${siteConfig.url}${article.path}`,
    dateModified: article.updatedAt || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}

/**
 * Generate WebSite schema with SearchAction for sitelinks search box
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/docs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
