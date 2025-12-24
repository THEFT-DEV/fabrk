# Enterprise Features Setup Guide

Complete guide to setting up and using the 5 unique enterprise features in Fabrk.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Multi-Factor Authentication (MFA)](#multi-factor-authentication-mfa)
4. [Background Job System](#background-job-system)
5. [Team/Organization Management](#teamorganization-management)
6. [File Upload System](#file-upload-system)
7. [AI Integration Kit](#ai-integration-kit)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

**Required:**
- Node.js 18+ installed
- PostgreSQL database running
- Basic environment variables configured (DATABASE_URL, NEXTAUTH_SECRET)

**Optional (for specific features):**
- AWS S3 / Cloudflare R2 / MinIO (for file uploads)
- OpenAI API key (for AI features)
- Anthropic API key (for Claude AI)

---

## Database Setup

### 1. Run Prisma Migration

The new features require 8 additional database tables. Run the migration:

```bash
# Push schema to database
npx prisma db push

# Or create a migration
npx prisma migrate dev --name add_enterprise_features

# Generate Prisma Client
npx prisma generate
```

### 2. Verify Tables

Check that these tables were created:
- `MFADevice` - TOTP devices
- `BackupCode` - MFA recovery codes
- `Organization` - Teams/companies
- `OrganizationMember` - Team members
- `OrganizationInvite` - Pending invites
- `Upload` - File metadata
- `Job` - Background jobs

```bash
# Open Prisma Studio to verify
npx prisma studio
```

---

## Multi-Factor Authentication (MFA)

### Setup

MFA works out of the box once the database is migrated. No additional configuration needed!

### Usage

**Enable MFA:**
1. User navigates to `/settings/security`
2. Clicks "Enable Two-Factor Auth"
3. Scans QR code with authenticator app (Google Authenticator, Authy, 1Password)
4. Enters 6-digit code to verify
5. Saves 10 backup codes securely

**Login with MFA:**
1. User enters email and password
2. System detects MFA is enabled
3. User enters 6-digit TOTP code
4. Or uses a one-time backup code for recovery

**API Endpoints:**
- `POST /api/auth/mfa/enable` - Enable MFA
- `POST /api/auth/mfa/verify` - Verify device
- `POST /api/auth/mfa/disable` - Disable MFA
- `POST /api/auth/mfa/regenerate-codes` - Generate new backup codes

**Programmatic Usage:**

```typescript
import {
  enableMFA,
  verifyMFAToken,
  hasMFAEnabled,
  disableMFA,
} from "@/lib/auth/mfa";

// Check if user has MFA enabled
const mfaEnabled = await hasMFAEnabled(userId);

// Enable MFA
const { qrCodeUri, backupCodes } = await enableMFA(userId, email);

// Verify during login
const valid = await verifyMFAToken(userId, email, "123456");
```

---

## Background Job System

### Setup

**1. Configure environment variables:**

```env
JOB_WORKER_CONCURRENCY=5   # Number of concurrent workers
JOB_WORKER_INTERVAL=1000   # Poll interval in milliseconds
```

**2. Start the job worker:**

```bash
# Development
npm run jobs:dev

# Production
npm run jobs:worker
```

**3. In production, run as a separate process:**

Use PM2, Docker, or systemd to keep the worker running:

```bash
# PM2 example
pm2 start npm --name "job-worker" -- run jobs:worker
pm2 save
```

### Usage

**Enqueue Jobs:**

```typescript
import { enqueueJob } from "@/lib/jobs/queue";

// Send email
await enqueueJob({
  type: "email.send",
  payload: {
    to: "user@example.com",
    subject: "Welcome!",
    html: "<h1>Welcome to Fabrk!</h1>",
  },
  priority: "high",
});

// Send webhook
await enqueueJob({
  type: "webhook.send",
  payload: {
    url: "https://example.com/webhook",
    payload: { event: "user.created", userId: "123" },
  },
});

// Delayed job (schedule for later)
await enqueueJob({
  type: "report.generate",
  payload: { userId, reportType: "monthly" },
  scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
});
```

**Create Custom Job Handlers:**

```typescript
import { registerJobHandler } from "@/lib/jobs/queue";

registerJobHandler("report.generate", async (data, jobId) => {
  try {
    // Generate report
    const report = await generateReport(data);

    // Return success
    return {
      success: true,
      data: { reportId: report.id },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});
```

**Monitor Jobs:**

```typescript
import { getJobStats, getJobStatus } from "@/lib/jobs/queue";

// Get statistics
const stats = await getJobStats();
// { pending: 5, processing: 2, completed: 100, failed: 3 }

// Get job status
const status = await getJobStatus(jobId);
```

---

## Team/Organization Management

### Setup

No additional configuration needed! Works once database is migrated.

### Usage

**Create Organization:**

```typescript
import { createOrganization } from "@/lib/teams/organizations";

const org = await createOrganization({
  name: "Acme Inc",
  slug: "acme",         // Unique slug
  description: "Enterprise customer",
  ownerId: userId,
});
```

**Invite Team Members:**

```typescript
import { inviteToOrganization } from "@/lib/teams/organizations";

await inviteToOrganization({
  organizationId: org.id,
  email: "teammate@acme.com",
  role: "ADMIN",        // OWNER, ADMIN, MEMBER, GUEST
  invitedBy: userId,
});

// Email is automatically sent with invite link
```

**Accept Invite:**

```typescript
import { acceptInvite } from "@/lib/teams/organizations";

// User clicks invite link with token
await acceptInvite(token, userId);
```

**Check Permissions:**

```typescript
import { hasOrganizationRole } from "@/lib/teams/organizations";

// Check if user can perform admin actions
const canManage = await hasOrganizationRole(userId, orgId, ["OWNER", "ADMIN"]);

if (canManage) {
  // Allow action
}
```

**Permission Levels:**
- `OWNER` - Full control, can delete org, transfer ownership
- `ADMIN` - Can invite/remove members, manage settings
- `MEMBER` - Regular team member access
- `GUEST` - Limited read-only access

---

## File Upload System

### Setup

**1. Configure S3-compatible storage:**

Choose one:
- AWS S3
- Cloudflare R2 (recommended, cheaper)
- DigitalOcean Spaces
- MinIO (self-hosted)

**2. Set environment variables:**

```env
# For Cloudflare R2
S3_ENDPOINT="https://[account-id].r2.cloudflarestorage.com"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"
S3_BUCKET_NAME="fabrk-uploads"
AWS_REGION="auto"

# For AWS S3
# S3_ENDPOINT=""  # Leave blank
# AWS_REGION="us-east-1"
```

**3. Create S3 bucket:**

```bash
# For Cloudflare R2
# Create bucket in R2 dashboard

# For AWS S3
aws s3 mb s3://fabrk-uploads --region us-east-1
```

**4. Optional: Install Sharp for image optimization:**

```bash
npm install sharp
```

### Usage

**Upload File:**

```typescript
import { uploadFile } from "@/lib/storage/uploads";

const result = await uploadFile({
  userId,
  organizationId, // Optional
  file: uploadedFile,  // File or Buffer
  filename: "invoice.pdf",
  mimeType: "application/pdf",
  visibility: "private",  // or "public"
  metadata: {
    description: "Q1 2024 Invoice",
  },
});

// result.id, result.url, result.key
```

**Get Signed URL (for private files):**

```typescript
import { getSignedFileUrl } from "@/lib/storage/uploads";

// Expires in 1 hour
const url = await getSignedFileUrl(fileId, userId, 3600);
```

**Image Optimization:**

```typescript
import { optimizeImage, uploadFile } from "@/lib/storage/uploads";

// Optimize before upload
const optimized = await optimizeImage(buffer, {
  width: 800,
  quality: 80,
  format: "webp",
});

await uploadFile({
  userId,
  file: optimized,
  filename: "optimized-image.webp",
  mimeType: "image/webp",
});
```

**Check Storage Usage:**

```typescript
import { getStorageUsage } from "@/lib/storage/uploads";

const usage = await getStorageUsage(userId);
// { totalBytes: 15728640, fileCount: 42 }
```

---

## AI Integration Kit

### Setup

**1. Get API keys:**

- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/

**2. Install dependencies:**

```bash
npm install openai @anthropic-ai/sdk
```

**3. Set environment variables:**

```env
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
```

### Usage

**Chat with GPT-4:**

```typescript
import { chatWithOpenAI } from "@/lib/ai";

const response = await chatWithOpenAI({
  messages: [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: "Explain quantum computing" },
  ],
  model: "gpt-4-turbo",
});

console.log(response.content);
console.log(`Cost: $${response.cost.toFixed(4)}`);
```

**Chat with Claude (Streaming):**

```typescript
import { chatWithClaude } from "@/lib/ai";

const stream = await chatWithClaude({
  messages: [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: "Write a poem" },
  ],
  model: "claude-3-opus-20240229",
  stream: true,
});

// Stream to client
for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

**Generate Images (DALL-E):**

```typescript
import { generateImage } from "@/lib/ai";

const urls = await generateImage({
  prompt: "A futuristic city at sunset",
  model: "dall-e-3",
  quality: "hd",
  size: "1024x1024",
});
```

**Text-to-Speech:**

```typescript
import { textToSpeech } from "@/lib/ai";

const audio = await textToSpeech({
  text: "Hello, welcome to Fabrk!",
  voice: "nova",
  model: "tts-1-hd",
});

// Save to file or stream to client
fs.writeFileSync("output.mp3", audio);
```

**Content Moderation:**

```typescript
import { moderateContent } from "@/lib/ai";

const moderation = await moderateContent(userInput);

if (moderation.flagged) {
  console.log("Flagged categories:", moderation.categories);
  // Handle unsafe content
}
```

**Generate Embeddings (for vector search):**

```typescript
import { generateEmbeddings } from "@/lib/ai";

const embeddings = await generateEmbeddings([
  "First text to embed",
  "Second text to embed",
]);

// embeddings[0] is array of 1536 numbers
```

**Example API Route with Streaming:**

```typescript
// app/api/chat/route.ts
import { chatWithOpenAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { message } = await req.json();

  const stream = await chatWithOpenAI({
    messages: [
      { role: "system", content: "You are helpful" },
      { role: "user", content: message },
    ],
    stream: true,
  });

  // Return streaming response
  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
      },
    }),
    {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    }
  );
}
```

---

## Troubleshooting

### MFA Not Working

**Issue:** QR code doesn't load
- Check that database migration ran successfully
- Verify `MFADevice` table exists

**Issue:** Verification code rejected
- Ensure device time is synchronized (TOTP requires accurate time)
- Try adjacent time windows (codes change every 30 seconds)

### Job Worker Issues

**Issue:** Jobs not processing
- Verify worker is running: `pm2 list` or check process
- Check database connection
- Look for errors in worker logs

**Issue:** Jobs failing repeatedly
- Check `Job` table for error messages
- Verify job handlers are registered
- Check network connectivity for webhooks/API calls

### File Upload Errors

**Issue:** S3 connection failed
- Verify S3_ENDPOINT is correct
- Check access key ID and secret
- Ensure bucket exists and is accessible

**Issue:** Files not uploading
- Check file size limits (default 10MB)
- Verify MIME type is allowed
- Check S3 bucket permissions

### AI Integration Issues

**Issue:** API key errors
- Verify API keys are correct and active
- Check account has credits/billing set up
- Ensure keys are in environment variables

**Issue:** Rate limiting
- Implement retry logic with exponential backoff
- Consider caching responses
- Use queue system for batch operations

---

## Next Steps

1. ✅ **Run database migration:** `npx prisma db push`
2. ✅ **Set environment variables:** Copy from `.env.example`
3. ✅ **Start job worker:** `npm run jobs:worker`
4. ✅ **Enable MFA:** Visit `/settings/security`
5. ✅ **Test file uploads:** Create upload component
6. ✅ **Try AI features:** Create a chat endpoint
7. ✅ **Create organization:** Use API or build UI

---

## Additional Resources

- **MFA Library:** `src/lib/auth/mfa.ts`
- **Job Queue:** `src/lib/jobs/queue.ts`
- **Teams:** `src/lib/teams/organizations.ts`
- **File Storage:** `src/lib/storage/uploads.ts`
- **AI Integration:** `src/lib/ai/index.ts`

**Need help?** Open an issue or check the documentation in `/docs`

---

**Your app now has enterprise-grade features!** 🚀
