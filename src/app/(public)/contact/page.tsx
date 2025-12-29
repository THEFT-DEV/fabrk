'use client';

/**
 * Contact Page
 * Contact form for sales, support, and general inquiries - Terminal Console Style
 */

import { PageHeader } from './components/page-header';
import { ContactForm } from './components/contact-form';
import { ContactSidebar } from './components/contact-sidebar';
import { FaqSection } from './components/faq-section';

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
      <PageHeader />
      <ContactContent />
    </>
  );
}
