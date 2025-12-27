/**
 * Homepage Template
 *
 * This is a starter template for your landing page.
 * Replace with your own content and customize as needed.
 *
 * Available components:
 * - src/components/landing/ - Hero, features, pricing sections
 * - src/components/ui/ - 78+ UI primitives
 * - src/components/shared/ - Logo, footer, etc.
 */

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, FeatureCard } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { Terminal, Zap, Shield, Palette, Code, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-border border-b py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6">
              [YOUR PRODUCT NAME]
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              YOUR HEADLINE HERE
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Describe your product in one or two sentences. What problem does it solve?
              Why should users care?
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">&gt; GET STARTED</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">&gt; VIEW PRICING</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="border-border border-b py-24">
        <Container>
          <SectionHeader
            badge="[FEATURES]"
            code="FEAT"
            title="WHY CHOOSE US"
            description="Highlight your key features and benefits"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Terminal className="h-6 w-6" />}
              title="01"
              headline="FEATURE ONE"
              description="Describe your first key feature and how it benefits users."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="02"
              headline="FEATURE TWO"
              description="Describe your second key feature and the value it provides."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="03"
              headline="FEATURE THREE"
              description="Describe your third key feature and why it matters."
            />
            <FeatureCard
              icon={<Palette className="h-6 w-6" />}
              title="04"
              headline="FEATURE FOUR"
              description="Add more features as needed for your product."
            />
            <FeatureCard
              icon={<Code className="h-6 w-6" />}
              title="05"
              headline="FEATURE FIVE"
              description="Customize these cards with your own content."
            />
            <FeatureCard
              icon={<Rocket className="h-6 w-6" />}
              title="06"
              headline="FEATURE SIX"
              description="Replace icons and text to match your brand."
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">READY TO GET STARTED?</h2>
              <p className="text-primary-foreground/80 mb-8">
                Join thousands of users who are already using our product.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">&gt; START FREE TRIAL</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
