'use client';

/**
 * Contact Page
 * Contact form for sales, support, and general inquiries - Terminal Console Style
 */

import { PageHeader } from './components/page-header';
import { ContactForm } from './components/contact-form';
import { ContactSidebar } from './components/contact-sidebar';
import { FaqSection } from './components/faq-section';
import { generateFAQSchema } from '@/lib/metadata';

// FAQ data for schema
const CONTACT_FAQ = [
  {
    question: 'Do you offer refunds?',
    answer:
      'No, all sales are final. Due to the nature of digital products, we do not offer refunds once you have access to the code.',
  },
  {
    question: 'Is technical support included?',
    answer:
      'Yes, we provide email support for all license holders. Response time is typically within 24 hours.',
  },
  {
    question: 'Can I use Fabrk for client projects?',
    answer:
      'Absolutely! Your license allows you to create unlimited projects for yourself or clients.',
  },
  {
    question: 'Do I get lifetime updates?',
    answer: 'Yes, all future updates and improvements are included at no additional cost.',
  },
];

const faqSchema = generateFAQSchema(CONTACT_FAQ);

function ContactContent() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact Information Sidebar */}
        <ContactSidebar />
      </div>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* AEO: FAQ schema for featured snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHeader />
      <ContactContent />
    </>
  );
}
