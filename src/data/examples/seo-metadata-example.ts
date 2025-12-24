/**
 * Generic SEO Metadata Example
 *
 * Replace with your actual SEO metadata for each page.
 * These are format examples showing the expected structure.
 */

import type { Metadata } from 'next';

// Base metadata used across the site
export const BASE_METADATA_EXAMPLE = {
  metadataBase: new URL('https://yourproduct.com'),
  title: {
    default: 'YourProduct - Ship Your SaaS Faster',
    template: '%s | YourProduct',
  },
  description:
    'Production-ready SaaS boilerplate with authentication, payments, and more. Launch in days, not months.',
  keywords: [
    'saas boilerplate',
    'nextjs',
    'typescript',
    'react',
    'tailwind',
    'authentication',
    'payments',
  ],
  authors: [{ name: 'YourCompany' }],
  creator: 'YourCompany',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourproduct.com',
    siteName: 'YourProduct',
    title: 'YourProduct - Ship Your SaaS Faster',
    description:
      'Production-ready SaaS boilerplate with authentication, payments, and more. Launch in days, not months.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YourProduct',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourproduct',
    creator: '@yourproduct',
    title: 'YourProduct - Ship Your SaaS Faster',
    description:
      'Production-ready SaaS boilerplate with authentication, payments, and more.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
} as const satisfies Metadata;

// Page-specific metadata examples
export const PAGE_METADATA_EXAMPLES = {
  home: {
    title: 'Home',
    description:
      'Ship your SaaS product faster with our production-ready boilerplate. Authentication, payments, database, and more.',
    openGraph: {
      title: 'YourProduct - Ship Your SaaS Faster',
      description:
        'Ship your SaaS product faster with our production-ready boilerplate.',
      url: '/',
      images: ['/og-home.jpg'],
    },
  } as const satisfies Metadata,

  pricing: {
    title: 'Pricing',
    description:
      'Simple, transparent pricing. One-time payment for lifetime access. No recurring fees or revenue sharing.',
    openGraph: {
      title: 'Pricing - YourProduct',
      description: 'Simple, transparent pricing. One-time payment.',
      url: '/pricing',
      images: ['/og-pricing.jpg'],
    },
  } as const satisfies Metadata,

  features: {
    title: 'Features',
    description:
      'Everything you need to build and launch your SaaS. Authentication, payments, admin dashboard, and more.',
    openGraph: {
      title: 'Features - YourProduct',
      description:
        'Everything you need to build and launch your SaaS product.',
      url: '/features',
      images: ['/og-features.jpg'],
    },
  } as const satisfies Metadata,

  docs: {
    title: 'Documentation',
    description:
      'Comprehensive guides and API documentation to help you get started quickly.',
    openGraph: {
      title: 'Documentation - YourProduct',
      description: 'Comprehensive guides and API documentation.',
      url: '/docs',
      images: ['/og-docs.jpg'],
    },
  } as const satisfies Metadata,

  blog: {
    title: 'Blog',
    description:
      'Insights, guides, and updates from our team. Learn best practices for building SaaS products.',
    openGraph: {
      title: 'Blog - YourProduct',
      description: 'Insights, guides, and updates from our team.',
      url: '/blog',
      images: ['/og-blog.jpg'],
    },
  } as const satisfies Metadata,

  login: {
    title: 'Login',
    description: 'Sign in to your account to access your dashboard.',
    robots: {
      index: false, // Don't index auth pages
      follow: false,
    },
  } as const satisfies Metadata,

  signup: {
    title: 'Sign Up',
    description: 'Create your account and start building your SaaS today.',
    robots: {
      index: false, // Don't index auth pages
      follow: false,
    },
  } as const satisfies Metadata,
} as const;

// Dynamic metadata generator helper
export function generatePostMetadata(post: {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
}): Metadata {
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

// JSON-LD structured data examples
export const JSON_LD_EXAMPLES = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YourProduct',
    url: 'https://yourproduct.com',
    logo: 'https://yourproduct.com/logo.png',
    description:
      'Production-ready SaaS boilerplate for developers and founders.',
    sameAs: [
      'https://twitter.com/yourproduct',
      'https://github.com/yourcompany/yourproduct',
      'https://linkedin.com/company/yourcompany',
    ],
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YourProduct',
    url: 'https://yourproduct.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://yourproduct.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },

  product: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YourProduct',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '199',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
  },

  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://yourproduct.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Docs',
        item: 'https://yourproduct.com/docs',
      },
    ],
  },
} as const;
