# API Keys System

Complete guide to the API Keys management system in Fabrk Boilerplate.

## Overview

The API Keys system provides secure programmatic access to your organization's resources through cryptographically generated API keys with granular permissions.

**Key Features:**
- Cryptographically secure key generation (256-bit)
- SHA-256 hashing for secure storage
- Granular permissions (read, write, admin)
- Key expiration support
- Usage tracking (lastUsedAt timestamps)
- Audit logging for all operations
- Max 10 keys per organization
- One-time key display (shown only on creation)

## Architecture

### Database Schema

```prisma
model ApiKey {
  id             String    @id @default(cuid())
  organizationId String
  userId         String    // Creator
  name           String
  keyPrefix      String    @unique // First 12 chars (e.g., "sk_live_YOUR_KEY_HERE")
  keyHash        String    @unique // SHA-256 hash of full key
  permissions    String[]  // Array of permissions (read, write, admin)
  lastUsedAt     DateTime?
  expiresAt      DateTime?
  createdAt      DateTime  @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### API Key Format

**Live Keys:** `sk_live_YOUR_KEY_HERE<43-character-base64url-string>`
**Test Keys:** `sk_test_<43-character-base64url-string>`

Example: `sk_live_YOUR_KEY_HERE`

**Display Prefix:** First 12 characters (e.g., `sk_live_YOUR_KEY_HERE`)

### Security Implementation

1. **Key Generation** (`lib/api-keys/generator.ts`):
   - Uses `crypto.randomBytes(32)` for 256-bit entropy
   - Converts to base64url (URL-safe)
   - Prefixes with `sk_live_YOUR_KEY_HERE` or `sk_test_`

2. **Key Hashing** (`lib/api-keys/hasher.ts`):
   - SHA-256 hash stored in database
   - Original key never stored
   - Constant-time comparison to prevent timing attacks

3. **Authentication** (`lib/api-keys/auth.ts`):
   - Validates key format
   - Hashes and looks up in database
   - Checks expiration
   - Tracks usage asynchronously

## Setup

### 1. Database Migration

Run the Prisma migration to add the ApiKey model:

```bash
npm run db:push
```

This adds the ApiKey table and updates Organization/User relations.

### 2. Environment Variables

No additional environment variables required. The system uses existing database and auth configuration.

### 3. Organization Context

The API key page requires an organization ID. Update the constant in the page:

```typescript
// src/app/(dashboard)/developer/api-keys/page.tsx
const ORGANIZATION_ID = "org_demo"; // Replace with actual organization context
```

**TODO:** Integrate with organization context/provider when available.

## Usage

### Creating API Keys

**UI:** Navigate to `/developer/api-keys` and click "Create API Key"

**API:**
```typescript
POST /api/api-keys
Content-Type: application/json

{
  "organizationId": "org_123",
  "name": "Production API",
  "permissions": ["read", "write"],
  "expiresAt": "2025-12-31T23:59:59Z" // Optional
}
```

**Response:**
```json
{
  "id": "key_abc123",
  "name": "Production API",
  "keyPrefix": "sk_live_YOUR_KEY_HERE",
  "permissions": ["read", "write"],
  "expiresAt": "2025-12-31T23:59:59.000Z",
  "createdAt": "2024-11-14T10:00:00.000Z",
  "key": "sk_live_YOUR_KEY_HERE"
}
```

**IMPORTANT:** The `key` field is only returned on creation. Save it immediately!

### Listing API Keys

```typescript
GET /api/api-keys?organizationId=org_123
```

**Response:**
```json
[
  {
    "id": "key_abc123",
    "name": "Production API",
    "keyPrefix": "sk_live_YOUR_KEY_HERE",
    "permissions": ["read", "write"],
    "lastUsedAt": "2024-11-14T12:30:00.000Z",
    "expiresAt": null,
    "createdAt": "2024-11-14T10:00:00.000Z",
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

Note: Full key is never returned (only prefix).

### Revoking API Keys

```typescript
DELETE /api/api-keys/key_abc123
```

**Permissions Required:**
- ADMIN or OWNER role in organization, OR
- Being the key creator

### Updating API Keys

```typescript
PATCH /api/api-keys/key_abc123
Content-Type: application/json

{
  "name": "Updated Production API",
  "permissions": ["read", "write", "admin"]
}
```

**Permissions Required:** ADMIN or OWNER role

**Note:** Cannot change the key itself - must revoke and create new.

## Authentication

### Using API Keys

Include the API key in the `Authorization` header with `Bearer` prefix:

```bash
curl https://yourdomain.com/api/v1/organizations/org_123 \
  -H "Authorization: Bearer sk_live_YOUR_KEY_HERE"
```

### JavaScript Example

```javascript
const response = await fetch('https://yourdomain.com/api/v1/members', {
  headers: {
    'Authorization': 'Bearer sk_live_YOUR_KEY_HERE',
    'Content-Type': 'application/json'
  }
});

const members = await response.json();
```

### Python Example

```python
import requests

headers = {
    'Authorization': 'Bearer sk_live_YOUR_KEY_HERE',
    'Content-Type': 'application/json'
}

response = requests.get('https://yourdomain.com/api/v1/members', headers=headers)
members = response.json()
```

## Permissions System

### Permission Types

1. **read** - View organization data
   - List members
   - Get organization details
   - View resources (read-only)

2. **write** - Create and update resources
   - Invite members
   - Create/update resources
   - All `read` permissions included

3. **admin** - Full administrative access
   - Delete resources
   - Manage settings
   - All `read` and `write` permissions included
   - **DANGEROUS** - Use sparingly

### Permission Checks

**In API Routes:**

```typescript
import { requirePermission } from "@/middleware/api-auth";

// Require 'read' permission
export const GET = requirePermission("read", async (req, apiKey) => {
  // apiKey is validated and contains permissions
  // Access organization via apiKey.organizationId
  return NextResponse.json({ data: "..." });
});

// Require 'write' permission
export const POST = requirePermission("write", async (req, apiKey) => {
  // Handle create/update logic
  return NextResponse.json({ success: true });
});
```

**Manual Permission Check:**

```typescript
import { authenticateApiKey } from "@/middleware/api-auth";

export async function GET(req: NextRequest) {
  const apiKey = await authenticateApiKey(req);

  if (!apiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!apiKey.permissions.includes("read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Your logic here
}
```

## Public API Endpoints

### GET /api/v1/organizations/[id]

Get organization details.

**Permissions:** `read`

**Example:**
```bash
curl https://yourdomain.com/api/v1/organizations/org_123 \
  -H "Authorization: Bearer sk_live_YOUR_KEY_HERE..."
```

**Response:**
```json
{
  "id": "org_123",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "description": "Leading software company",
  "logo": "https://...",
  "plan": "PRO",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-11-01T00:00:00.000Z",
  "_count": {
    "members": 15
  }
}
```

### GET /api/v1/members

List organization members.

**Permissions:** `read`

**Example:**
```bash
curl https://yourdomain.com/api/v1/members \
  -H "Authorization: Bearer sk_live_YOUR_KEY_HERE..."
```

**Response:**
```json
[
  {
    "id": "mem_abc123",
    "organizationId": "org_123",
    "userId": "user_xyz789",
    "role": "ADMIN",
    "joinedAt": "2024-01-15T10:00:00.000Z",
    "user": {
      "id": "user_xyz789",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "image": "https://..."
    }
  }
]
```

### POST /api/v1/members/invite

Invite a new member to the organization.

**Permissions:** `write`

**Example:**
```bash
curl -X POST https://yourdomain.com/api/v1/members/invite \
  -H "Authorization: Bearer sk_live_YOUR_KEY_HERE..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "role": "MEMBER"
  }'
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "role": "MEMBER" // OWNER, ADMIN, MEMBER, or GUEST
}
```

**Response:**
```json
{
  "id": "inv_abc123",
  "email": "newuser@example.com",
  "role": "MEMBER",
  "expiresAt": "2024-11-21T10:00:00.000Z",
  "inviteUrl": "https://yourdomain.com/invite/abc123xyz789..."
}
```

## Security Best Practices

### 1. Key Storage

**DO:**
- Store keys in environment variables
- Use secret management services (AWS Secrets Manager, Vault)
- Encrypt keys at rest if stored in database

**DON'T:**
- Commit keys to version control
- Hard-code keys in source code
- Share keys via email or chat

### 2. Key Rotation

Rotate API keys regularly:

1. Create new API key
2. Update applications to use new key
3. Verify new key works
4. Revoke old key

**Recommended:** Rotate every 90 days.

### 3. Principle of Least Privilege

Only grant necessary permissions:
- Use `read` for viewing data
- Use `write` only when creating/updating
- Use `admin` sparingly (only for trusted systems)

### 4. Monitoring

Track API key usage:
- Monitor `lastUsedAt` timestamps
- Set up alerts for unusual activity
- Review audit logs regularly
- Revoke unused keys immediately

### 5. Expiration

Set expiration dates for temporary keys:
```json
{
  "name": "Temporary Integration",
  "permissions": ["read"],
  "expiresAt": "2024-12-31T23:59:59Z"
}
```

Expired keys are automatically rejected.

## Audit Logging

All API key operations are logged to the `AuditLog` table:

**Events Logged:**
- `api_key.created` - New key created
- `api_key.revoked` - Key deleted
- `api_key.updated` - Key name/permissions changed

**Audit Log Structure:**
```json
{
  "userId": "user_abc123",
  "action": "api_key.created",
  "resource": "api_key",
  "resourceId": "key_xyz789",
  "metadata": {
    "organizationId": "org_123",
    "name": "Production API",
    "permissions": ["read", "write"]
  },
  "createdAt": "2024-11-14T10:00:00.000Z"
}
```

## Rate Limiting

**TODO:** Implement per-key rate limiting using Upstash Redis.

**Suggested Limits:**
- Read operations: 1000 requests/hour
- Write operations: 100 requests/hour
- Admin operations: 10 requests/hour

## Error Responses

### 401 Unauthorized

Invalid or missing API key:
```json
{
  "error": "Invalid or missing API key"
}
```

### 403 Forbidden

Missing required permission:
```json
{
  "error": "Missing required permission: write"
}
```

API key doesn't belong to organization:
```json
{
  "error": "Forbidden. API key does not belong to this organization."
}
```

### 404 Not Found

API key not found:
```json
{
  "error": "API key not found"
}
```

### 400 Bad Request

Max keys reached:
```json
{
  "error": "Maximum of 10 API keys per organization"
}
```

Invalid permissions:
```json
{
  "error": "Invalid permissions. Must be array of: read, write, admin"
}
```

## Testing

### Manual Testing

1. **Create Organization:**
   - Create a test organization in your database
   - Note the organization ID

2. **Create API Key:**
   - Navigate to `/developer/api-keys`
   - Create a key with `read` permission
   - Copy the full key (shown once)

3. **Test API Endpoint:**
   ```bash
   curl http://localhost:3000/api/v1/members \
     -H "Authorization: Bearer sk_live_YOUR_KEY_HERE..."
   ```

4. **Test Invalid Key:**
   ```bash
   curl http://localhost:3000/api/v1/members \
     -H "Authorization: Bearer invalid_key"
   # Should return 401
   ```

5. **Test Missing Permission:**
   - Create key with only `read` permission
   - Try to call POST endpoint
   ```bash
   curl -X POST http://localhost:3000/api/v1/members/invite \
     -H "Authorization: Bearer sk_live_YOUR_KEY_HERE..." \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "role": "MEMBER"}'
   # Should return 403
   ```

### Automated Testing

**TODO:** Add test suite using Vitest or Jest.

**Test Cases:**
- Key generation produces valid format
- Key hashing is deterministic
- Key verification works correctly
- Permission checks enforce access control
- Expired keys are rejected
- Max keys limit is enforced
- Audit logs are created

## Troubleshooting

### Keys Not Working

1. **Check key format:**
   - Must start with `sk_live_YOUR_KEY_HERE` or `sk_test_`
   - Must be ~50+ characters
   - Base64url encoded (no special chars)

2. **Check expiration:**
   ```sql
   SELECT id, name, expiresAt FROM ApiKey WHERE id = 'key_abc123';
   ```

3. **Check permissions:**
   ```sql
   SELECT permissions FROM ApiKey WHERE id = 'key_abc123';
   ```

4. **Check audit logs:**
   ```sql
   SELECT * FROM AuditLog WHERE resourceId = 'key_abc123' ORDER BY createdAt DESC;
   ```

### Organization Context Missing

If you see "Organization ID is required" errors:

1. Update `ORGANIZATION_ID` constant in the page
2. OR integrate with organization context provider
3. OR pass organizationId via query params

### Permission Denied

If you get 403 errors:

1. Check role in organization (must be ADMIN or OWNER to create keys)
2. Verify key has required permission
3. Check if key belongs to correct organization

## Future Enhancements

### Rate Limiting

Implement per-key rate limits using Upstash Redis:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 h"),
  prefix: "api_key",
});

export async function checkRateLimit(keyId: string) {
  const { success } = await ratelimit.limit(keyId);
  return success;
}
```

### API Key Scopes

Add fine-grained scopes beyond read/write/admin:

```typescript
permissions: [
  "organizations:read",
  "members:read",
  "members:write",
  "billing:read"
]
```

### Usage Analytics

Track detailed API key usage:
- Request count per endpoint
- Response times
- Error rates
- Geographic distribution

### IP Whitelisting

Restrict API keys to specific IP addresses:

```prisma
model ApiKey {
  // ...
  allowedIps String[] // ["192.168.1.1", "10.0.0.0/24"]
}
```

### Webhook Signatures

Use API keys to sign webhooks for verification.

## Summary

The API Keys system provides secure, scalable programmatic access to your SaaS application with:

- Enterprise-grade security (SHA-256, constant-time comparison)
- Granular permissions (read, write, admin)
- Comprehensive audit logging
- Developer-friendly UI
- Well-documented public API

**Next Steps:**
1. Push database schema
2. Create organization in database
3. Test key creation flow
4. Integrate with your organization context
5. Add rate limiting (production)
6. Set up monitoring and alerts
