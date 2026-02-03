/**
 * Structured Data (JSON-LD) Generators
 * Comprehensive schema.org markup for SEO, AEO, and GEO
 *
 * These schemas help with:
 * - SEO: Traditional search ranking
 * - AEO: Featured snippets, voice search, "People Also Ask"
 * - GEO: AI citations in ChatGPT, Gemini, Google AI Overview
 */

import { siteConfig } from '@/lib/metadata';

interface Organization {
  name: string;
  description: string;
  url: string;
  logo?: string;
  foundingDate?: string;
  founders?: string[];
  sameAs?: string[];
  contactPoint?: {
    contactType: string;
    email: string;
    availableLanguage: string[];
  };
}

interface Product {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  image?: string;
  brand?: string;
  sku?: string;
  offers?: {
    price: string;
    availability: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
  };
}

interface Article {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  articleSection?: string;
  wordCount?: number;
}

interface FAQ {
  question: string;
  answer: string;
  acceptedAnswerType?: 'text' | 'html';
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface Review {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: {
    ratingValue: number;
    bestRating?: number;
  };
}

/**
 * Generate Organization schema (for company/brand)
 * Critical for GEO - helps AI understand your brand
 */
export function generateOrganizationSchema(data?: Partial<Organization>) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: data?.name || siteConfig.name,
    description: data?.description || siteConfig.description,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: data?.logo || `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    foundingDate: data?.foundingDate,
    founders: data?.founders?.map((name) => ({
      '@type': 'Person',
      name,
    })),
    sameAs: data?.sameAs || [siteConfig.links.github],
    contactPoint: data?.contactPoint || {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@fabrk.dev',
      availableLanguage: ['English'],
    },
  };
}

/**
 * Generate SoftwareApplication schema (for SaaS products)
 * Essential for product-based SEO and AEO
 */
export function generateSoftwareApplicationSchema(data?: Partial<Product>) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${baseUrl}#software`,
    name: data?.name || siteConfig.name,
    description: data?.description || siteConfig.description,
    url: baseUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, macOS, Windows, Linux',
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: data?.price || '79',
      priceCurrency: data?.priceCurrency || 'USD',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/pricing`,
      validFrom: new Date().toISOString(),
    },
    aggregateRating: data?.aggregateRating && {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
      bestRating: data.aggregateRating.bestRating || '5',
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };
}

/**
 * Generate Article schema (for blog posts and content pages)
 * Critical for AEO - helps content appear in featured snippets
 */
export function generateArticleSchema(data: Article) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    image: data.image || `${baseUrl}/og-image.png`,
    articleSection: data.articleSection,
    wordCount: data.wordCount,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': baseUrl,
    },
  };
}

/**
 * Generate FAQ schema (for featured snippets)
 * CRITICAL for AEO - directly appears in "People Also Ask"
 */
export function generateFAQSchema(faqs: FAQ[]) {
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
 * Generate HowTo schema (for tutorial content)
 * Excellent for AEO and voice search optimization
 */
export function generateHowToSchema(data: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    totalTime: data.totalTime,
    estimatedCost: data.estimatedCost && {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: data.estimatedCost,
    },
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
    })),
  };
}

/**
 * Generate Breadcrumb schema (for navigation)
 * Helps with site structure understanding (SEO + GEO)
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate Review schema (for testimonials)
 * Enhances trust signals for SEO and GEO
 */
export function generateReviewSchema(reviews: Review[], productName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName || siteConfig.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (
        reviews.reduce((sum, r) => sum + r.reviewRating.ratingValue, 0) / reviews.length
      ).toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.reviewRating.ratingValue,
        bestRating: review.reviewRating.bestRating || 5,
      },
    })),
  };
}

/**
 * Generate WebSite schema with search action
 * Enables site search in search results
 */
export function generateWebSiteSchema() {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate VideoObject schema (for video content)
 * Critical for video SEO and rich snippets
 */
export function generateVideoSchema(data: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: data.name,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    uploadDate: data.uploadDate,
    duration: data.duration,
    contentUrl: data.contentUrl,
    embedUrl: data.contentUrl,
  };
}

/**
 * Generate Course schema (for educational content)
 * Great for educational SaaS products
 */
export function generateCourseSchema(data: {
  name: string;
  description: string;
  provider: string;
}) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: data.provider,
      sameAs: baseUrl,
    },
  };
}
