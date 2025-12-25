import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Cloud, HardDrive, Shield, Zap } from 'lucide-react';

export const metadata = {
  title: 'Cloud Storage - Fabrk Docs',
  description:
    'Store files with Cloudflare R2, AWS S3, or local storage. Automatic provider detection and signed URL generation.',
};

export default function CloudStoragePage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Features"
      title="Cloud Storage"
      description="Upload and store files securely with automatic provider detection."
      overview="Cloud storage lets you save files (images, documents, videos) on remote servers instead of your own. This is essential when users need to upload profile pictures, documents, or any other files. Think of it like Google Drive or Dropbox for your app - files are stored securely in the cloud and can be accessed from anywhere."
      features={[
        {
          icon: Cloud,
          title: 'Multi-Provider',
          description: 'Works with Cloudflare R2, AWS S3, or local storage automatically.',
        },
        {
          icon: Zap,
          title: 'Zero Egress Fees',
          description: 'R2 recommended for huge savings on bandwidth costs.',
        },
        {
          icon: HardDrive,
          title: 'Unlimited Storage',
          description: 'Virtually unlimited storage with cloud providers.',
        },
        {
          icon: Shield,
          title: 'Secure Uploads',
          description: 'File validation, signed URLs, and access control built-in.',
        },
      ]}
      setup={[
        {
          title: 'Setup Cloudflare R2 (Recommended)',
          description: 'R2 is the recommended provider due to zero egress fees',
          code: `# .env.local

# Cloudflare R2 Configuration
CLOUDFLARE_R2_ACCESS_KEY_ID="your-access-key-id"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-secret-access-key"
CLOUDFLARE_R2_BUCKET="my-saas-uploads"
CLOUDFLARE_R2_ENDPOINT="https://your-account-id.r2.cloudflarestorage.com"

# Optional: Public URL for the bucket
CLOUDFLARE_R2_PUBLIC_URL="https://uploads.yourdomain.com"`,
          language: 'bash',
        },
        {
          title: 'Setup AWS S3 (Alternative)',
          description: 'If you prefer S3 or already use AWS',
          code: `# .env.local

# AWS S3 Configuration
AWS_S3_ACCESS_KEY_ID="your-access-key-id"
AWS_S3_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_S3_BUCKET="my-saas-uploads"
AWS_S3_REGION="us-east-1"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Upload a File',
          description: 'Use the upload utility to store files',
          code: `import { uploadFile, getStorageProvider } from "@/lib/storage/uploads";

// Check which provider is being used
const provider = getStorageProvider();


// Upload a file
const result = await uploadFile(file, {
  folder: "avatars",           // Optional: organize by folder
  organizationId: org.id,      // Optional: for access control
  allowedTypes: ["image/jpeg", "image/png"], // Optional: restrict types
  maxSize: 5 * 1024 * 1024,    // Optional: 5MB limit
});

if (result.success) {


} else {

}`,
          language: 'typescript',
        },
        {
          title: 'File Validation',
          description: 'Validate files before uploading',
          code: `import { validateFile } from "@/lib/storage/uploads";

// Validate file size and type
const validation = validateFile(file, {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ],
});

if (!validation.valid) {
  // Handle validation errors
  console.error(validation.error);
  // "File too large. Maximum size is 10MB"
  // "File type not allowed. Allowed: image/jpeg, image/png..."
}`,
          language: 'typescript',
        },
        {
          title: 'API Route Example',
          description: 'Handle file uploads in your API',
          code: `// src/app/api/upload/route.ts

import { auth } from "@/lib/auth";
import { uploadFile } from "@/lib/storage/uploads";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get file from form data
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Upload to storage
  const result = await uploadFile(file, {
    folder: \`users/\${session.user.id}\`,
    allowedTypes: ["image/jpeg", "image/png"],
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // Save URL to database if needed
  await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarUrl: result.url },
  });

  return NextResponse.json({
    url: result.url,
    message: "File uploaded successfully",
  });
}`,
          language: 'typescript',
        },
        {
          title: 'Client-Side Upload Component',
          description: 'React component for file uploads',
          code: `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FileUploader() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      alert("Uploaded! URL: " + data.url);
    } catch (_) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
        accept="image/jpeg,image/png"
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}`,
          language: 'tsx',
        },
      ]}
      previous={{
        title: 'Feature Flags',
        href: '/docs/features/feature-flags',
      }}
      next={{ title: 'Authentication', href: '/docs/tutorials/authentication' }}
    >
      {/* Provider Priority Section */}
      <DocsSection title="Provider Priority">
        <DocsCard title="PROVIDER PRIORITY">
          <p className="mb-4">
            Fabrk automatically detects which storage provider you have configured and uses it. This
            means you can start with local storage during development and switch to cloud in
            production without changing your code.
          </p>
          <div className="space-y-2">
            <div className="border-border flex items-center gap-4 border p-4">
              <span className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center font-mono text-xs font-semibold">
                1
              </span>
              <div>
                <p className="font-medium">Cloudflare R2</p>
                <p>Used if R2 environment variables are set</p>
              </div>
            </div>
            <div className="border-border flex items-center gap-4 border p-4">
              <span className="bg-primary/70 text-primary-foreground flex h-6 w-6 items-center justify-center font-mono text-xs font-semibold">
                2
              </span>
              <div>
                <p className="font-medium">AWS S3</p>
                <p>Used if only S3 environment variables are set</p>
              </div>
            </div>
            <div className="border-border flex items-center gap-4 border p-4">
              <span className="bg-muted flex h-6 w-6 items-center justify-center font-mono text-xs font-semibold">
                3
              </span>
              <div>
                <p className="font-medium">Local Storage</p>
                <p>Fallback when no cloud provider is configured</p>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Provider Comparison Section */}
      <DocsSection title="Choosing a Provider">
        <div className="grid gap-4 sm:grid-cols-3">
          <DocsCard title="CLOUDFLARE R2">
            <p className="mb-2">Recommended</p>
            <ul className="space-y-1">
              <li>• No egress fees (huge savings)</li>
              <li>• S3-compatible API</li>
              <li>• Global edge network</li>
              <li>• Generous free tier</li>
            </ul>
          </DocsCard>
          <DocsCard title="AWS S3">
            <p className="mb-2">Industry Standard</p>
            <ul className="space-y-1">
              <li>• Most mature platform</li>
              <li>• Extensive documentation</li>
              <li>• Pay-per-use pricing</li>
              <li>• Egress fees apply</li>
            </ul>
          </DocsCard>
          <DocsCard title="LOCAL STORAGE">
            <p className="mb-2">Development Only</p>
            <ul className="space-y-1">
              <li>• No setup required</li>
              <li>• Good for testing</li>
              <li>• Files in /uploads folder</li>
              <li>• Not for production</li>
            </ul>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Security Considerations Section */}
      <DocsSection title="Security Considerations">
        <DocsCard title="SECURITY" className="bg-muted/50">
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center font-mono text-xs font-semibold">
                1
              </span>
              <span>
                <strong>Validate file types:</strong> Never trust the file extension. Check MIME
                type server-side to prevent malicious uploads.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center font-mono text-xs font-semibold">
                2
              </span>
              <span>
                <strong>Limit file sizes:</strong> Set reasonable limits to prevent storage abuse
                and server crashes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center font-mono text-xs font-semibold">
                3
              </span>
              <span>
                <strong>Use signed URLs:</strong> For private files, generate time-limited signed
                URLs instead of public links.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center font-mono text-xs font-semibold">
                4
              </span>
              <span>
                <strong>Organize by user/org:</strong> Store files in user or organization folders
                to enable access control.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center font-mono text-xs font-semibold">
                5
              </span>
              <span>
                <strong>Scan for malware:</strong> Consider adding virus scanning for user-uploaded
                files in production.
              </span>
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      {/* Common Questions Section */}
      <DocsSection title="Common Questions">
        <div className="space-y-4">
          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              How much does cloud storage cost?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <p>
                <strong>Cloudflare R2:</strong> $0.015/GB/month for storage, zero egress fees. First
                10GB free.
              </p>
              <p className="mt-2">
                <strong>AWS S3:</strong> ~$0.023/GB/month storage + $0.09/GB egress. Egress fees can
                add up quickly.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              What&apos;s the maximum file size?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <p>
                By default, Fabrk validates files up to 10MB. You can change this in your upload
                options. For larger files (videos, etc.), consider using direct-to-storage uploads
                with presigned URLs.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Can I use both R2 and S3?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <p>
                Fabrk uses one provider at a time based on which env vars are set. R2 takes priority
                if both are configured. If you need multi-provider support, you&apos;d need to
                customize the storage module.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              How do I delete files?
            </summary>
            <div className="border-border text-muted-foreground border-t p-4 text-sm">
              <p>
                Use the <code className="bg-muted px-1">deleteFile(key)</code> function from the
                storage module. The key is returned when you upload a file. Make sure to also remove
                the file reference from your database.
              </p>
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/authentication"
            title="Authentication"
            description="Secure file uploads with user authentication."
          />
          <DocsLinkCard
            href="/docs/features/organizations"
            title="Organizations"
            description="Organize files by team with multi-tenancy."
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
