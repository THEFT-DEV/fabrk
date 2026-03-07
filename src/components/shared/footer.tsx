import Link from 'next/link';
import { SimpleIcon } from '@/components/ui/simple-icon';
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siTypescript,
  siStripe,
  siResend,
} from 'simple-icons';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';

const NAV_LINK_CLASS = cn(
  'text-muted-foreground hover:text-foreground text-xs transition-colors',
  mode.font
);

const PRODUCT_LINKS = [
  { href: '/features', label: 'FEATURES' },
  { href: '/pricing', label: 'PRICING' },
  { href: '/docs', label: 'DOCS' },
  { href: '/changelog', label: 'CHANGELOG' },
  { href: '/roadmap', label: 'ROADMAP' },
  { href: '/blog', label: 'BLOG' },
  { href: '/feed.xml', label: 'RSS FEED' },
] as const;

const COMPANY_LINKS = [
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
] as const;

const LEGAL_LINKS = [
  { href: '/terms', label: 'TERMS' },
  { href: '/privacy', label: 'PRIVACY' },
  { href: '/cookies', label: 'COOKIES' },
  { href: '/refund', label: 'REFUND' },
] as const;

const techStack = [
  { name: 'NEXT.JS', path: siNextdotjs.path },
  { name: 'REACT', path: siReact.path },
  { name: 'TYPESCRIPT', path: siTypescript.path },
  { name: 'TAILWIND', path: siTailwindcss.path },
  { name: 'PRISMA', path: siPrisma.path },
  { name: 'STRIPE', path: siStripe.path },
  { name: 'RESEND', path: siResend.path },
];

function FooterNavColumn({
  title,
  ariaLabel,
  links,
}: {
  title: string;
  ariaLabel: string;
  links: ReadonlyArray<{ readonly href: string; readonly label: string }>;
}) {
  return (
    <div className="p-4">
      <div className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>[ {title} ]</div>
      <nav aria-label={ariaLabel} className="flex flex-col gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={NAV_LINK_CLASS}>
            &gt; {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-border bg-background border-t">
      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6">
        <div>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            {/* Left: Logo + Status + Powered By */}
            <div>
              <Badge code="0x71" label="SYSTEM INFO" className="mb-4" />
              <Link
                href="/"
                className={cn(
                  'mb-4 flex items-center gap-2 transition-opacity',
                  mode.state.hover.linkOpacity,
                  mode.font
                )}
              >
                <span className="text-primary text-sm">&gt;</span>
                <span className="text-xl font-semibold tracking-tight">FABRK</span>
              </Link>
              <div className="mt-4 flex items-center gap-2">
                <span className={cn('text-muted-foreground text-xs', mode.font)}>└─ [STATUS]:</span>
                <span className={cn('text-success text-xs', mode.font)}>■ OPERATIONAL</span>
              </div>

              {/* Powered By - Tech Stack Icons */}
              <div className="mt-6">
                <div className={cn('text-muted-foreground mb-3 text-xs', mode.font)}>
                  └─ [POWERED BY]:
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                      title={tech.name}
                    >
                      <SimpleIcon path={tech.path} className="size-3.5" />
                      <span className={cn('text-xs', mode.font)}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Hunt Badge */}
              <div className="mt-6">
                <a
                  href="https://www.producthunt.com/products/fabrk/launches/fabrk?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-fabrk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity inline-block"
                >
                  <img
                    alt="Fabrk - Terminal-aesthetic Next.js boilerplate. Stand out. Ship fast | Product Hunt"
                    width="140"
                    height="30"
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1053948&theme=neutral&t=1770398539306"
                  />
                </a>
              </div>
            </div>

            {/* Right: Nav Links in Terminal Box */}
            <Card>
              <CardHeader title="nav links.exe │ PID:1024" code="0x72" />
              <CardContent>
                <div className="divide-border grid grid-cols-3 divide-x">
                  <FooterNavColumn title="PRODUCT" ariaLabel="Product links" links={PRODUCT_LINKS} />
                  <FooterNavColumn title="COMPANY" ariaLabel="Company links" links={COMPANY_LINKS} />
                  <FooterNavColumn title="LEGAL" ariaLabel="Legal links" links={LEGAL_LINKS} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="border-border border-t px-4 py-6 sm:px-6">
        <div className={cn('text-muted-foreground text-xs', mode.font)}>
          <span>[ [0x7F] COPYRIGHT ] © {new Date().getFullYear()} Fabrk │ All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
