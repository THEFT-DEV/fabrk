# Webhooks System

Complete outgoing webhooks system with HMAC signing, retry logic, and management UI for the Fabrk SaaS boilerplate.

## Overview

Webhooks allow your application to send real-time HTTP notifications to external services when events occur in your organization. This implementation includes:

- HMAC-SHA256 payload signing for security
- Automatic retry logic with exponential backoff
- Per-organization webhook management
- Comprehensive delivery tracking
- Admin-only management with RBAC

## Quick Start

### 1. Database Setup

Run Prisma migration to create webhook tables:

```bash
npm run db:push
```

This creates two tables:
- `Webhook` - Stores webhook configurations
- `WebhookDelivery` - Tracks delivery attempts and results

### 2. Create a Webhook

Navigate to your organization's webhook settings:

```
/organizations/[slug]/webhooks
```

Click "Create Webhook" and configure:
1. Enter your webhook endpoint URL (must be HTTPS in production)
2. Select events to subscribe to
3. Save to receive your signing secret

### 3. Verify Signatures

All webhook payloads include an `X-Webhook-Signature` header with HMAC-SHA256 signature:

```javascript
const crypto = require('crypto');

// Extract signature from header
const signature = req.headers['x-webhook-signature'];

// Get raw payload
const payload = JSON.stringify(req.body);

// Your webhook secret (from creation)
const secret = process.env.WEBHOOK_SECRET;

// Calculate expected signature
const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

// Verify
if (signature === expectedSignature) {
  // Valid webhook - process it
  console.log('Valid webhook received');
} else {
  // Invalid signature - reject
  return res.status(401).json({ error: 'Invalid signature' });
}
```

## Event Reference

### Organization Events

**`org.member.invited`**
Fired when a user is invited to join an organization.

```json
{
  "event": "org.member.invited",
  "data": {
    "email": "user@example.com",
    "role": "MEMBER",
    "invitedBy": {
      "id": "user_123",
      "email": "admin@example.com",
      "name": "Admin User"
    },
    "inviteId": "invite_abc",
    "expiresAt": "2024-01-15T12:00:00Z"
  },
  "organizationId": "org_xyz",
  "timestamp": "2024-01-08T10:30:00Z"
}
```

**`org.member.added`**
Fired when a user accepts an invitation and joins.

**`org.member.removed`**
Fired when a member is removed from organization.

```json
{
  "event": "org.member.removed",
  "data": {
    "userId": "user_123",
    "userEmail": "user@example.com",
    "userName": "John Doe",
    "removedBy": {
      "id": "admin_456",
      "email": "admin@example.com",
      "name": "Admin User"
    }
  },
  "organizationId": "org_xyz",
  "timestamp": "2024-01-08T10:30:00Z"
}
```

**`org.member.role_changed`**
Fired when a member's role is updated.

```json
{
  "event": "org.member.role_changed",
  "data": {
    "userId": "user_123",
    "userEmail": "user@example.com",
    "userName": "John Doe",
    "newRole": "ADMIN",
    "changedBy": {
      "id": "owner_789",
      "email": "owner@example.com",
      "name": "Owner"
    }
  },
  "organizationId": "org_xyz",
  "timestamp": "2024-01-08T10:30:00Z"
}
```

**`org.created`** - Organization created
**`org.updated`** - Organization settings updated
**`org.deleted`** - Organization deleted

### Payment Events

**`payment.succeeded`** - Payment completed successfully
**`payment.failed`** - Payment failed

### Subscription Events

**`subscription.created`** - New subscription started
**`subscription.updated`** - Subscription plan changed
**`subscription.cancelled`** - Subscription cancelled
**`subscription.expired`** - Subscription expired

### API Key Events

**`api_key.created`** - API key generated
**`api_key.revoked`** - API key revoked

### Security Events

**`security.2fa_enabled`** - Two-factor auth enabled
**`security.2fa_disabled`** - Two-factor auth disabled
**`security.password_changed`** - User password changed

## Webhook Headers

Every webhook request includes these headers:

| Header | Description |
|--------|-------------|
| `Content-Type` | Always `application/json` |
| `X-Webhook-Signature` | HMAC-SHA256 signature of payload |
| `X-Webhook-Event` | Event type (e.g., `org.member.added`) |
| `X-Webhook-Delivery-ID` | Unique delivery identifier |
| `User-Agent` | `Fabrk-Webhooks/1.0` |
| `X-Webhook-Retry` | Attempt number (only on retries) |

## Payload Structure

All webhooks follow this structure:

```typescript
{
  event: string;           // Event type (e.g., "org.member.added")
  data: object;           // Event-specific data
  organizationId: string; // Organization that triggered event
  timestamp: string;      // ISO 8601 timestamp
}
```

## Retry Logic

Failed deliveries are automatically retried with exponential backoff:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 15 minutes |
| 5 | 1 hour |
| 6 | 6 hours |

After 5 failed attempts, deliveries are marked as permanently failed.

**Failure Conditions:**
- HTTP status code >= 400
- Network timeout (10 seconds)
- Connection refused
- DNS resolution failure

## Signature Verification Examples

### Node.js (Express)

```javascript
const crypto = require('crypto');

function verifyWebhook(req, res, next) {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  const secret = process.env.WEBHOOK_SECRET;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )) {
    next(); // Valid
  } else {
    res.status(401).json({ error: 'Invalid signature' });
  }
}

app.post('/webhooks/fabrk', verifyWebhook, (req, res) => {
  const { event, data, organizationId } = req.body;

  console.log(`Received ${event} for org ${organizationId}`);

  // Process event

  res.status(200).json({ received: true });
});
```

### Python (Flask)

```python
import hmac
import hashlib
from flask import Flask, request, jsonify

app = Flask(__name__)

def verify_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected)

@app.route('/webhooks/fabrk', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Webhook-Signature')
    payload = request.data.decode('utf-8')
    secret = os.environ['WEBHOOK_SECRET']

    if not verify_signature(payload, signature, secret):
        return jsonify({'error': 'Invalid signature'}), 401

    event_data = request.json
    event = event_data['event']
    data = event_data['data']

    print(f"Received {event}")

    # Process event

    return jsonify({'received': True}), 200
```

### Ruby (Sinatra)

```ruby
require 'sinatra'
require 'json'
require 'openssl'

post '/webhooks/fabrk' do
  signature = request.env['HTTP_X_WEBHOOK_SIGNATURE']
  payload = request.body.read
  secret = ENV['WEBHOOK_SECRET']

  expected_signature = OpenSSL::HMAC.hexdigest(
    OpenSSL::Digest.new('sha256'),
    secret,
    payload
  )

  halt 401, 'Invalid signature' unless Rack::Utils.secure_compare(
    signature,
    expected_signature
  )

  event_data = JSON.parse(payload)
  event = event_data['event']
  data = event_data['data']

  puts "Received #{event}"

  # Process event

  content_type :json
  { received: true }.to_json
end
```

## Testing Webhooks

### Using webhook.site

1. Go to [webhook.site](https://webhook.site)
2. Copy your unique URL
3. Create a webhook in Fabrk with this URL
4. Click "Test" to send a test payload
5. View the request in webhook.site

### Local Testing with ngrok

```bash
# Start your local server
npm run dev

# In another terminal, start ngrok
ngrok http 3000

# Use the ngrok HTTPS URL as your webhook endpoint
https://abc123.ngrok.io/api/webhooks/fabrk
```

## Management UI

### List Webhooks

Navigate to `/organizations/[slug]/webhooks` to:
- View all configured webhooks
- See delivery statistics
- Enable/disable webhooks
- Delete webhooks
- Send test deliveries

### Create Webhook

Click "Create Webhook" to:
1. Enter endpoint URL
2. Select events to subscribe to
3. Receive signing secret (shown only once)

### Webhook Details

Click on a webhook to:
- View full configuration
- See signing secret
- Review delivery history (last 50)
- Retry failed deliveries
- View payload and response for each delivery

## API Reference

### Create Webhook

```
POST /api/webhooks
```

**Body:**
```json
{
  "organizationId": "org_123",
  "url": "https://example.com/webhooks",
  "events": ["org.member.added", "org.member.removed"]
}
```

**Response:**
```json
{
  "id": "webhook_abc",
  "url": "https://example.com/webhooks",
  "events": ["org.member.added", "org.member.removed"],
  "secret": "whsec_xyz123...",
  "enabled": true,
  "createdAt": "2024-01-08T10:00:00Z"
}
```

### List Webhooks

```
GET /api/webhooks?organizationId=org_123
```

### Get Webhook

```
GET /api/webhooks/:id
```

### Update Webhook

```
PATCH /api/webhooks/:id
```

**Body:**
```json
{
  "url": "https://new-url.com/webhooks",
  "events": ["org.member.added"],
  "enabled": false
}
```

### Delete Webhook

```
DELETE /api/webhooks/:id
```

### Test Webhook

```
POST /api/webhooks/:id/test
```

### List Deliveries

```
GET /api/webhooks/:id/deliveries?page=1&limit=50
```

### Retry Delivery

```
POST /api/webhooks/deliveries/:deliveryId/retry
```

## Background Worker

Start the retry worker to automatically retry failed deliveries:

```typescript
// server.ts or instrumentation.ts
import { startWebhookRetryWorker } from '@/lib/webhooks';

// Start retry worker (polls every 1 minute)
startWebhookRetryWorker({
  interval: 60000 // 1 minute (default)
});
```

## Security Best Practices

1. **Always verify signatures** - Never process webhooks without signature verification
2. **Use HTTPS** - Webhook URLs must use HTTPS in production
3. **Validate event types** - Only process expected event types
4. **Idempotency** - Use delivery IDs to prevent duplicate processing
5. **Rate limiting** - Implement rate limiting on your webhook endpoint
6. **Logging** - Log all webhook deliveries for audit purposes
7. **Timeout handling** - Respond within 10 seconds to avoid retries

## Limits

- **Maximum webhooks per organization:** 5
- **Delivery timeout:** 10 seconds
- **Maximum retry attempts:** 5
- **Delivery history retention:** 30 days (configurable)
- **Payload size:** No hard limit, but keep under 1MB

## Troubleshooting

### Webhook not firing

1. Check webhook is enabled
2. Verify event is subscribed
3. Check organization ID matches
4. Review application logs for errors

### Signature verification failing

1. Ensure you're using the raw request body
2. Verify secret matches (copy from webhook details)
3. Check HMAC algorithm is SHA-256
4. Use timing-safe comparison function

### Deliveries failing

1. Check endpoint is reachable (HTTPS, valid SSL)
2. Verify endpoint responds within 10 seconds
3. Return HTTP 200 status code
4. Check endpoint logs for errors

### Too many retries

1. Fix endpoint errors
2. Return 200 status code quickly
3. Process webhooks asynchronously
4. Implement proper error handling

## Programmatic Integration

### Trigger Webhook Manually

```typescript
import { triggerWebhook, WEBHOOK_EVENTS } from '@/lib/webhooks';

// In your API route or service
await triggerWebhook(organizationId, WEBHOOK_EVENTS.ORG_MEMBER_ADDED, {
  userId: 'user_123',
  userEmail: 'user@example.com',
  userName: 'John Doe',
  role: 'MEMBER',
});
```

### Get Webhook Statistics

```typescript
import { getWebhookStats } from '@/lib/webhooks';

const stats = await getWebhookStats(organizationId);

console.log(stats);
// {
//   totalWebhooks: 3,
//   activeWebhooks: 2,
//   totalDeliveries: 150,
//   successfulDeliveries: 145,
//   failedDeliveries: 5,
//   successRate: 97
// }
```

### Clean Up Old Deliveries

```typescript
import { cleanupOldDeliveries } from '@/lib/webhooks';

// Delete deliveries older than 30 days
const deleted = await cleanupOldDeliveries(30);
console.log(`Deleted ${deleted} old delivery records`);
```

## Advanced Configuration

### Custom Retry Schedule

Edit `src/lib/webhooks/server.ts`:

```typescript
export function calculateNextRetry(attempts: number): Date {
  const delays = [
    30 * 1000,      // 30 seconds
    2 * 60 * 1000,  // 2 minutes
    10 * 60 * 1000, // 10 minutes
    30 * 60 * 1000, // 30 minutes
    2 * 60 * 60 * 1000, // 2 hours
  ];

  const delayIndex = Math.min(attempts - 1, delays.length - 1);
  const delay = delays[delayIndex];

  return new Date(Date.now() + delay);
}
```

### Custom Timeout

Edit `src/lib/webhooks/server.ts`:

```typescript
const response = await fetch(webhook.url, {
  method: "POST",
  headers: { /* ... */ },
  body: payloadString,
  signal: AbortSignal.timeout(30000), // 30 seconds
});
```

## Production Checklist

- [ ] Database migrations applied
- [ ] Webhook retry worker started
- [ ] HTTPS enforced on webhook URLs
- [ ] Signature verification implemented
- [ ] Error handling in place
- [ ] Monitoring and alerting configured
- [ ] Delivery cleanup scheduled
- [ ] Rate limiting implemented
- [ ] Documentation shared with integrators
- [ ] Test webhooks sent successfully

## Support

For issues or questions:
1. Check delivery logs in webhook details page
2. Review application logs for errors
3. Test with webhook.site to verify endpoint
4. Verify signature verification code
5. Contact support with delivery ID and webhook ID
