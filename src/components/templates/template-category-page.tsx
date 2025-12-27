/**
 * FABRK COMPONENT
 * Template Category Page - Standard wrapper for category listing pages
 * Provides consistent layout for template category grids
 */

'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import {
  PageBadge,
  Card,
  CardHeader,
  CardContent,
  FeatureList,
  FeatureItem,
  StyledLabel,
} from '@/components/ui/card';
interface Template {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  href: string;
  features: string[];
}

interface TemplateCategoryPageProps {
  /** Category code for display (e.g., "DASHBOARDS", "AUTHENTICATION") */
  categoryCode: string;
  /** Display title of the category */
  title: string;
  /** Category icon component */
  icon?: LucideIcon;
  /** List of templates in this category */
  templates: Template[];
  /** Features to display in the bottom card */
  features: string[];
  /** Feature card title (e.g., "[DASHBOARD TEMPLATES]:") */
  featureCardTitle: string;
}

export function TemplateCategoryPage({
  categoryCode,
  title,
  icon: CategoryIcon,
  templates,
  features,
  featureCardTitle,
}: TemplateCategoryPageProps) {
  return (
    <div>
      <main className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
        {/* Category Header */}
        <section className="space-y-4">
          <PageBadge prefix="CATEGORY">{categoryCode}</PageBadge>
          <div className="flex items-center gap-4">
            {CategoryIcon && <CategoryIcon className="text-primary h-6 w-6" />}
            <h1 className={cn('text-4xl font-semibold', mode.font)}>{title}</h1>
            <span
              className={cn('border-border border px-2 py-0.5 text-xs', mode.font, mode.radius)}
            >
              COUNT: {templates.length}
            </span>
          </div>
        </section>

        {/* Templates Section */}
        <section className="space-y-6">
          <h2 className={cn('text-2xl font-semibold tracking-tight', mode.font)}>
            Available Templates
          </h2>

          {/* Templates Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <Link key={template.id} href={template.href}>
                <Card interactive size="full">
                  <CardHeader
                    code="0x00"
                    title={template.id.toUpperCase()}
                    icon={<template.icon className="text-muted-foreground size-4" />}
                  />

                  <CardContent>
                    {/* Status & Badge */}
                    <div
                      className={cn('mb-4 flex items-center justify-between text-xs', mode.font)}
                    >
                      <div>
                        <span className="text-muted-foreground">STATUS: </span>
                        <span className="text-success">READY</span>
                      </div>
                      {template.badge && (
                        <div
                          className={cn(
                            'border-primary/50 text-primary border px-2 py-0.5',
                            mode.radius
                          )}
                        >
                          {template.badge.toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={cn('mb-2 text-sm font-semibold', mode.font)}>{template.name}</h3>

                    {/* Description */}
                    <div className={cn('mb-4 text-xs', mode.font)}>
                      <span className="text-muted-foreground">DESC: </span>
                      <span className="text-foreground">{template.description}</span>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <StyledLabel className="mb-2">FEATURES</StyledLabel>
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature) => (
                          <span
                            key={feature}
                            className={cn(
                              'border-border border px-2 py-0.5 text-xs',
                              mode.font,
                              mode.radius
                            )}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'text-primary group-hover:text-primary/80 text-xs transition-colors',
                          mode.font
                        )}
                      >
                        &gt; VIEW TEMPLATE
                      </span>
                      <span
                        className={cn(
                          'text-muted-foreground text-xs transition-transform group-hover:translate-x-1',
                          mode.font
                        )}
                      >
                        →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Template Features Card */}
        <Card size="auto">
          <CardHeader code="0x01" title="features.md" />
          <CardContent padding="lg">
            <StyledLabel className="mb-4">
              {featureCardTitle.replace(/[\[\]:]/g, '').trim()}
            </StyledLabel>
            <FeatureList>
              {features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeatureList>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
