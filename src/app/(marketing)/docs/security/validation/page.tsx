import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsLinkCard } from '@/components/docs';
import { Shield, FileCheck, Code, Settings } from 'lucide-react';

export const metadata = {
  title: 'Schema Validation - Fabrk Docs',
  description:
    'Validate API inputs with Zod schemas. Type-safe validation for forms, API routes, and environment variables.',
};

export default function SchemaValidationPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Security"
      title="Schema Validation"
      description="Validate all inputs with Zod schemas for type-safe, secure data handling."
      overview="Schema validation ensures all data entering your application is properly validated and typed. Zod provides runtime validation with automatic TypeScript type inference."
      features={[
        {
          icon: Shield,
          title: 'Type-Safe',
          description: 'Full TypeScript inference from your schemas.',
        },
        {
          icon: FileCheck,
          title: 'API Validation',
          description: 'Validate request and response bodies.',
        },
        {
          icon: Code,
          title: 'Form Validation',
          description: 'Works with react-hook-form out of the box.',
        },
        {
          icon: Settings,
          title: 'Env Validation',
          description: 'Validate environment variables at startup.',
        },
      ]}
      usage={[
        {
          title: 'Basic Zod Schema',
          description: 'Define schemas to validate data',
          code: `// src/lib/validations/user.ts

import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
});

// Infer TypeScript type from schema
export type UserInput = z.infer<typeof userSchema>;`,
          language: 'typescript',
        },
        {
          title: 'API Route Validation',
          description: 'Validate request bodies in API routes',
          code: `// src/app/api/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["user", "admin"]).default("user"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = createUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // result.data is fully typed
    const { email, name, role } = result.data;

    // Create user with validated data
    // ...

    return NextResponse.json({ success: true });
  } catch (_) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}`,
          language: 'typescript',
        },
        {
          title: 'Common Validation Patterns',
          description: 'Reusable validation patterns for common fields',
          code: `// src/lib/validations/common.ts

import { z } from "zod";

// Email validation
export const emailSchema = z
  .string()
  .email("Invalid email")
  .toLowerCase()
  .trim();

// Password with strength requirements
export const passwordSchema = z
  .string()
  .min(8, "Minimum 8 characters")
  .max(128, "Maximum 128 characters")
  .regex(/[a-z]/, "Must contain lowercase letter")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[^a-zA-Z0-9]/, "Must contain special character");

// UUID validation
export const uuidSchema = z.string().uuid("Invalid ID format");

// URL validation
export const urlSchema = z.string().url("Invalid URL").optional();

// Phone number (basic)
export const phoneSchema = z
  .string()
  .regex(/^\\+?[1-9]\\d{1,14}$/, "Invalid phone number");

// Date validation
export const dateSchema = z.coerce.date();

// Pagination
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Sort order
export const sortSchema = z.object({
  sortBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
});`,
          language: 'typescript',
        },
        {
          title: 'Form Validation',
          description: 'Use schemas with react-hook-form',
          code: `"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    // data is fully validated and typed
    // Process validated data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("name")} placeholder="Name" />
        {errors.name && (
          <p className="text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea {...register("message")} placeholder="Message" />
        {errors.message && (
          <p className="text-destructive">{errors.message.message}</p>
        )}
      </div>

      <button type="submit">Send</button>
    </form>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Query Parameter Validation',
          description: 'Validate URL search params',
          code: `// src/app/api/items/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  status: z.enum(["active", "inactive", "all"]).default("all"),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Convert searchParams to object
  const params = Object.fromEntries(searchParams.entries());

  // Validate
  const result = querySchema.safeParse(params);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
  }

  const { page, limit, search, status } = result.data;

  // Use validated params for database query
  // ...
}`,
          language: 'typescript',
        },
        {
          title: 'Environment Variable Validation',
          description: 'Validate environment variables at startup',
          code: `// src/lib/env.ts

import { z } from "zod";

const envSchema = z.object({
  // Required
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),

  // Optional with defaults
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Conditional (required in production)
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_").optional(),
});

// Validate at build/startup time
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;`,
          language: 'typescript',
        },
        {
          title: 'Custom Transformations',
          description: 'Transform and sanitize data during validation',
          code: `import { z } from "zod";

const userInputSchema = z.object({
  // Trim and lowercase email
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase().trim()),

  // Sanitize name
  name: z
    .string()
    .transform((val) => val.trim().replace(/\\s+/g, " ")),

  // Parse JSON string
  metadata: z
    .string()
    .transform((val, ctx) => {
      try {
        return JSON.parse(val);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid JSON",
        });
        return z.NEVER;
      }
    }),

  // Convert string to array
  tags: z
    .string()
    .transform((val) => val.split(",").map((s) => s.trim())),
});`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Security Headers', href: '/docs/security/headers' }}
      next={{ title: 'Bot Protection', href: '/docs/security/bot-protection' }}
    >
      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/security/audit-logging"
            title="Audit Logging"
            description="Track all security-relevant events"
          />
          <DocsLinkCard
            href="/docs/tutorials/api-routes"
            title="API Routes"
            description="Build secure API endpoints"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
