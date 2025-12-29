import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Server, Shield, Database, AlertTriangle } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'API Routes - Fabrk Docs',
  description:
    'Build API endpoints with Next.js App Router. Learn patterns for authentication, validation, and error handling.',
};

export default function ApiRoutesTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Tutorials"
      title="API Routes"
      description="Create API endpoints with Next.js App Router and learn Fabrk's patterns."
      overview="Fabrk uses Next.js 15 App Router for API routes. All routes are in src/app/api/."
      features={[
        {
          icon: Server,
          title: 'App Router',
          description: 'Next.js 15 API routes.',
        },
        {
          icon: Shield,
          title: 'Auth',
          description: 'Protected endpoints with sessions.',
        },
        {
          icon: Database,
          title: 'Prisma',
          description: 'Database access patterns.',
        },
        {
          icon: AlertTriangle,
          title: 'Errors',
          description: 'Consistent error handling.',
        },
      ]}
      usage={[
        {
          title: 'Basic Route',
          description: 'Create a new file at src/app/api/hello/route.ts',
          code: `import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}`,
          language: 'typescript',
        },
        {
          title: 'Protected API Route',
          description: 'Add authentication to your route',
          code: `import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Access user data
  const userId = session.user.id;
  const email = session.user.email;

  return NextResponse.json({
    userId,
    email,
    message: "You are authenticated!"
  });
}`,
          language: 'typescript',
        },
        {
          title: 'Input Validation with Zod',
          description: 'Always validate input with Zod schemas',
          code: `import { NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createUserSchema.parse(body);

    // Use validated data
    return NextResponse.json({ user: validated });

  } catch (_) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}`,
          language: 'typescript',
        },
        {
          title: 'Database Access',
          description: 'Use Prisma to interact with your database',
          code: `import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ user });
}`,
          language: 'typescript',
        },
        {
          title: 'Error Handling Pattern',
          description: 'Use this consistent error handling pattern',
          code: `import { logger } from "@/lib/logger";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Your logic here
    const result = await someOperation();
    return NextResponse.json({ data: result });

  } catch (_) {
    logger.error("Operation failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Quick Start', href: '/docs/tutorials/quick-start' }}
      next={{ title: 'File Uploads', href: '/docs/tutorials/file-uploads' }}
    >
      {/* HTTP Status Codes */}
      <DocsSection title="HTTP Status Codes">
        <DocsCard title="HTTP STATUS CODES">
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">200</code> - Success
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">201</code> - Created
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">400</code> - Bad request (invalid
              input)
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">401</code> - Unauthorized (not
              logged in)
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">403</code> - Forbidden (no
              permission)
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">404</code> - Not found
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">422</code> - Validation error
            </div>
            <div>
              └─ <code className="bg-muted px-1 font-mono text-xs">500</code> - Server error
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard title="COMMON ERRORS">
          <div className="space-y-4">
            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: CORS error in browser console
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Add CORS headers in middleware or API route
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// In route.ts
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};
return NextResponse.json({ data }, { headers });`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: 405 Method Not Allowed
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify export name matches HTTP method
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// Must be named GET, POST, PUT, DELETE (uppercase)
export async function GET() { }  // Correct
export async function get() { }  // Wrong - won't work`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Request timeout
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Optimize database queries and add timeouts
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// Add index to frequent query fields in schema.prisma
model User {
  email String @unique // Indexed automatically
  name  String @db.Index // Add index for searches
}`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Cannot read properties of undefined
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Always validate request data with Zod
              </p>
              <div className={cn('border-border bg-card border p-4', mode.radius)}>
                <code className="font-mono text-xs">
                  {`// Always validate before accessing
const body = await request.json();
const validated = schema.parse(body); // Throws if invalid
const value = validated.field; // Safe to access`}
                </code>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
