import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Upload, Image, Shield, FileCheck } from 'lucide-react';

export const metadata = {
  title: 'File Uploads - Fabrk Docs',
  description:
    'Implement file uploads with drag-and-drop. Validation, progress indicators, and cloud storage integration.',
};

export default function FileUploadsTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Tutorials"
      title="File Uploads"
      description="Implement secure file uploads with dropzone components, validation, and cloud storage integration."
      overview="Drag-and-drop file upload components with image preview, file validation (size, type, count), progress indicators, error handling, multiple file support, and cloud storage integration."
      features={[
        {
          icon: Upload,
          title: 'Drag & Drop',
          description: 'Dropzone components for easy uploads.',
        },
        {
          icon: Image,
          title: 'Image Preview',
          description: 'Preview images before upload.',
        },
        {
          icon: Shield,
          title: 'Validation',
          description: 'File size, type, and count limits.',
        },
        {
          icon: FileCheck,
          title: 'Progress',
          description: 'Track upload progress in real-time.',
        },
      ]}
      setup={[
        {
          title: 'Install Dependencies',
          description: 'Install the required packages for uploads and S3/R2 storage',
          code: `npm install react-dropzone @aws-sdk/client-s3`,
          language: 'bash',
        },
        {
          title: 'Configure Environment Variables',
          description: 'Add cloud storage credentials to your .env.local',
          code: `# For AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
S3_BUCKET="your-bucket-name"
S3_PUBLIC_URL="https://your-bucket.s3.amazonaws.com"

# For Cloudflare R2 (S3-compatible)
AWS_REGION="auto"
S3_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"
AWS_ACCESS_KEY_ID="your-r2-access-key"
AWS_SECRET_ACCESS_KEY="your-r2-secret-key"
S3_BUCKET="your-bucket-name"
S3_PUBLIC_URL="https://pub-xxx.r2.dev"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Upload API Route',
          description: 'Create an API route to handle file uploads with validation',
          code: `// src/app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Allowed MIME types
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];

// Max file size (5MB)
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, PDF" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Convert to buffer for processing
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = \`\${session.user.id}-\${timestamp}.\${extension}\`;

    // Upload to S3/R2 (using AWS SDK v3)
    const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

    const s3 = new S3Client({
      region: process.env.AWS_REGION || "auto",
      endpoint: process.env.S3_ENDPOINT, // For R2: https://<account>.r2.cloudflarestorage.com
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    await s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: \`uploads/\${filename}\`,
      Body: buffer,
      ContentType: file.type,
    }));

    const fileUrl = \`\${process.env.S3_PUBLIC_URL}/uploads/\${filename}\`;

    return NextResponse.json({
      success: true,
      file: {
        name: filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
      },
    });
  } catch (_) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}`,
          language: 'typescript',
        },
        {
          title: 'Client-Side Upload Handler',
          description: 'Handle the upload in your component with progress tracking',
          code: `"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

export function FileUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setError(null);
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        setProgress(((i + 1) / files.length) * 100);
      }

      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn('border-2 border-dashed p-6 text-center cursor-pointer transition-colors', mode.state.hover.card)}
      >
        <input {...getInputProps()} />
        <p className="font-mono text-sm text-muted-foreground">
          {isDragActive ? "Drop files here..." : "Drag & drop files or click to browse"}
        </p>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="h-2 bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: \`\${progress}%\` }}
            />
          </div>
          <p className="font-mono text-sm text-muted-foreground text-center">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}

      {error && (
        <p className="font-mono text-xs text-destructive">{error}</p>
      )}

      <Button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="w-full"
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </Button>
    </div>
  );
}`,
          language: 'tsx',
        },
        {
          title: 'Validation Options',
          description: 'Common validation configurations for different use cases',
          code: `// Profile Avatar
<Dropzone
  maxFiles={1}
  maxSize={2 * 1024 * 1024}  // 2MB
  accept={{
    "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  }}
/>

// Document Upload
<Dropzone
  maxFiles={10}
  maxSize={10 * 1024 * 1024}  // 10MB
  accept={{
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  }}
/>

// Image Gallery
<Dropzone
  maxFiles={20}
  maxSize={5 * 1024 * 1024}  // 5MB
  accept={{
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  }}
/>`,
          language: 'tsx',
        },
      ]}
      previous={{ title: 'API Routes', href: '/docs/tutorials/api-routes' }}
      next={{
        title: 'Protected Pages',
        href: '/docs/tutorials/protected-pages',
      }}
    >
      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard title="COMMON ERRORS">
          <div className="space-y-4">
            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: File too large (413 Payload Too Large)
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Adjust maxSize in dropzone config and API validation
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`// Client (react-dropzone)
maxSize: 10 * 1024 * 1024  // 10MB

// API route validation
const MAX_SIZE = 10 * 1024 * 1024;
if (file.size > MAX_SIZE) {
  return NextResponse.json({ error: "File too large" }, { status: 400 });
}`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Invalid file type rejected
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Verify accept prop matches server-side validation
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`// Client and server must match
// Client
accept={{ "image/*": [".png", ".jpg"] }}

// Server
const ALLOWED_TYPES = ["image/png", "image/jpeg"];
if (!ALLOWED_TYPES.includes(file.type)) { /* reject */ }`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: Upload fails silently (no error message)
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Check S3/R2 credentials and bucket configuration
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`# Verify credentials in .env.local
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
S3_BUCKET="your-bucket"

# Test bucket access
# Check bucket is public or has correct CORS policy`}
                </code>
              </div>
            </div>

            <div>
              <p className="text-primary mb-1 font-mono text-xs font-semibold">
                [ERROR]: CORS error when uploading to S3
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> Add CORS policy to your S3/R2 bucket
              </p>
              <div className="border-border bg-card rounded-none border p-4">
                <code className="font-mono text-xs">
                  {`// S3 Bucket CORS Configuration
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "AllowedMethods": ["GET", "POST", "PUT"],
    "AllowedHeaders": ["*"]
  }
]`}
                </code>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/api-routes"
            title="API Routes"
            description="Learn more about building API endpoints"
          />
          <DocsLinkCard
            href="/docs/tutorials/protected-pages"
            title="Protected Pages"
            description="Protect upload routes with authentication"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
