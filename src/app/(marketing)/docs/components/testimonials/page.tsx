'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Simplified Testimonials Demo - EXAMPLE_PLACEHOLDER data
function TestimonialsDemo() {
  const testimonials = [
    {
      quote: '[EXAMPLE] Your customer quote here with specific results.',
      author: 'CUSTOMER_NAME',
      role: 'Role, Company',
      initials: 'CN',
    },
    {
      quote: '[EXAMPLE] Another testimonial highlighting benefits.',
      author: 'CUSTOMER_NAME',
      role: 'Role, Company',
      initials: 'CN',
    },
    {
      quote: '[EXAMPLE] Include metrics when possible.',
      author: 'CUSTOMER_NAME',
      role: 'Role, Company',
      initials: 'CN',
    },
  ];

  return (
    <section className="w-full font-mono">
      <div className="mb-6 text-center">
        <span className="text-muted-foreground text-xs">[0x40]</span>
        <h2 className="mt-2 text-xl font-semibold">LOVED BY DEVELOPERS</h2>
        <p className="text-muted-foreground mt-1 text-xs">&gt; Early access customer feedback</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={cn('border-border bg-card border p-4 transition-all', mode.state.hover.card)}
          >
            <div className="text-muted-foreground mb-2 text-xs">[0x0{i + 1}]</div>
            <p className="text-muted-foreground mb-4 text-xs">&quot;{t.quote}&quot;</p>
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {t.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="block text-xs font-semibold">{t.author}</span>
                <span className="text-muted-foreground block text-xs">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Single Testimonial Card - EXAMPLE_PLACEHOLDER data
function TestimonialCardDemo() {
  return (
    <div className="w-full max-w-md font-mono">
      <div className="text-muted-foreground mb-2 text-xs">[0x01]</div>
      <p className="text-muted-foreground mb-6 text-sm">
        &quot;[EXAMPLE] Your customer quote here. Include specific results or metrics.&quot;
      </p>
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary">CN</AvatarFallback>
        </Avatar>
        <div>
          <span className="block text-xs font-semibold">CUSTOMER NAME</span>
          <span className="text-muted-foreground block text-xs">Role @ Company</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.05]"
      title="Testimonials Section"
      description="Social proof components with customer quotes, avatars, and grid layouts."
      mainPreview={{
        preview: <TestimonialsDemo />,
        code: `import { TestimonialsSection } from "@/components/marketing/testimonials-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      {/* Other sections */}
    </main>
  );
}`,
      }}
      variants={[
        {
          title: 'Single Testimonial Card',
          description: 'Individual testimonial with avatar',
          preview: <TestimonialCardDemo />,
          code: `<Card className="p-6">
  <p className="text-muted-foreground mb-4">
    "Great product, highly recommend!"
  </p>
  <div className="flex items-center gap-4">
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">John Doe</p>
      <p className="text-sm text-muted-foreground">CEO @ Company</p>
    </div>
  </div>
</Card>`,
        },
        {
          title: 'Avatar Group',
          description: 'Stacked avatars for social proof',
          preview: (
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['SC', 'MJ', 'ER', 'DK'].map((initials, i) => (
                  <Avatar key={i} className="border-background h-8 w-8 border-2">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <div className="border-background bg-muted flex h-8 w-8 items-center justify-center border-2 font-mono text-xs">
                  +99
                </div>
              </div>
              <span className="text-muted-foreground font-mono text-xs">
                Trusted by 500+ developers
              </span>
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <div className="flex -space-x-2">
    {users.map((user) => (
      <Avatar key={user.id} className="border-2 border-background">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
    ))}
    <div className="flex items-center justify-center bg-muted">
      +{remainingCount}
    </div>
  </div>
  <span>Trusted by 500+ developers</span>
</div>`,
        },
      ]}
      props={[
        {
          name: 'testimonials',
          type: '{ quote: string; author: string; role: string; avatar?: string }[]',
          description: 'Array of testimonials to display',
        },
        {
          name: 'columns',
          type: '2 | 3',
          description: 'Number of columns in the grid',
          default: '3',
        },
      ]}
      accessibility={[
        'Quotes are properly attributed with cite elements',
        'Avatar images have alt text fallbacks',
        'Cards are not focusable unless interactive',
        'Color contrast meets WCAG AA standards',
      ]}
      previous={{ title: 'Pricing', href: '/docs/components/pricing' }}
      next={{ title: 'FAQ', href: '/docs/components/faq' }}
    />
  );
}
