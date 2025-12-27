# Security Policy

**Last Updated:** November 19, 2025
**Supported Versions:** v1.0.0+

---

## 1. Reporting Security Vulnerabilities

### 1.1 Responsible Disclosure

If you discover a security vulnerability in Fabrk, please report it **responsibly and confidentially**:

**Email:** security@fabrk.dev

**Include in your report:**
- Detailed description of the vulnerability
- Steps to reproduce (if possible)
- Potential impact assessment
- Your contact information
- Proof of concept (optional, but helpful)

**Do NOT:**
- ❌ Publicly disclose the vulnerability before we patch it
- ❌ Report via GitHub Issues or public channels
- ❌ Exploit vulnerabilities or test on production systems
- ❌ Access data beyond what's needed to verify the issue

### 1.2 Response Timeline

- **Acknowledgment:** Within 24-48 hours
- **Initial Assessment:** Within 1 week
- **Fix Release:** Within 2-4 weeks (severity-dependent)
- **Notification:** Public disclosure at least 30 days after patch release

### 1.3 Rewards & Recognition

- **Public acknowledgment** in security advisory (with permission)
- **Bug bounty consideration** for critical vulnerabilities
- **Hall of fame** listing for responsible reporters

---

## 2. Security Best Practices

### 2.1 Environment Variables

**Critical - Protect These Secrets:**
- `NEXTAUTH_SECRET` - Min 32 characters
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY` - Never expose
- `STRIPE_WEBHOOK_SECRET` - Never expose
- `RESEND_API_KEY` - Never expose
- `PUSHER_SECRET` - Never expose
- `GOOGLE_CLIENT_SECRET` - Never expose

**How to protect:**
- ✅ Use `.env.local` (gitignored automatically)
- ✅ Use strong random values (openssl rand -base64 32)
- ✅ Rotate keys regularly
- ✅ Use different keys for dev/staging/production
- ✅ Never commit to git
- ✅ Never log in application output
- ✅ Use environment variable validation (src/lib/env.ts)

**DO NOT:**
- ❌ Commit `.env.local` to git
- ❌ Share keys via email or Slack
- ❌ Use placeholder values in production
- ❌ Log sensitive values
- ❌ Use same keys across environments

### 2.2 Database Security

**PostgreSQL:**
- ✅ Use strong passwords (20+ characters, mix of types)
- ✅ Enable SSL/TLS connections (`sslmode=require`)
- ✅ Use connection pooling (Prisma handles this)
- ✅ Regular backups (automated via GitHub Actions)
- ✅ Principle of least privilege (create read-only user for backups)
- ✅ Monitor for suspicious queries

**Prisma Specific:**
- ✅ Keep Prisma updated (npm update @prisma/client)
- ✅ Review schema changes before deploying
- ✅ Test migrations in staging first
- ✅ Use `db:push` carefully in production
- ✅ Maintain migration history

### 2.3 Authentication Security

**NextAuth Configuration:**
- ✅ Use HTTPS in production (`NEXTAUTH_URL=https://yourdomain.com`)
- ✅ Session expiration: 30 days (reasonable default)
- ✅ Session versioning: Increment `User.sessionVersion` to logout all sessions
- ✅ Password hashing: bcrypt with 12 rounds (built-in)
- ✅ CSRF protection: Enabled automatically via NextAuth

**OAuth Setup (Google):**
- ✅ Use official client libraries, not manual implementation
- ✅ Verify client secrets never exposed in frontend code
- ✅ Redirect URIs: Exactly match provider configuration
- ✅ Scope: Request minimal permissions needed
- ✅ Code exchange: Always use server-side, never client-side

**Magic Link (Email):**
- ✅ Links expire after 24 hours (configurable)
- ✅ Single-use tokens (can't reuse same link)
- ✅ Tokens stored as hashes (not plaintext)
- ✅ Email verification before account creation

### 2.4 API Security

**API Routes:**
- ✅ Validate all inputs with Zod schemas
- ✅ Check authentication before processing (const session = await auth())
- ✅ Check authorization (verify user owns resource)
- ✅ Rate limiting: Implement Upstash Redis (src/middleware/rate-limit.ts)
- ✅ Error messages: Never expose internal details

**API Keys (if using):**
- ✅ Store as SHA-256 hashes (never plaintext)
- ✅ Generate with crypto.randomBytes(32)
- ✅ Return full key only once at creation
- ✅ Prefix keys for easy identification (sk_live_, sk_test_)
- ✅ Implement key rotation/revocation
- ✅ Log all API key usage
- ✅ Support key expiration dates

### 2.5 Third-Party Integrations

**Stripe:**
- ✅ Verify webhook signatures (req.headers.get("stripe-signature"))
- ✅ Never trust client-side data about payments
- ✅ Use idempotency keys to prevent duplicate charges
- ✅ Store payment IDs, not credit card info
- ✅ Use Stripe's hosted checkout (never handle cards yourself)
- ✅ PCI DSS: Stripe compliance covers your app

**Resend (Email):**
- ✅ Validate email addresses before sending
- ✅ Implement unsubscribe links (legal requirement)
- ✅ Rate limit email sending (prevent spam)
- ✅ Monitor bounce/complaint rates
- ✅ Never send sensitive data in email body
- ✅ Use encrypted links for password resets

**Pusher (Real-time):**
- ✅ Verify authorization tokens in /api/pusher/auth
- ✅ Implement channel-level access control
- ✅ Never push sensitive user data via public channels
- ✅ Monitor for unusual activity

### 2.6 Frontend Security

**Content Security Policy:**
- ✅ Strict CSP enforced via nonces (src/lib/security/csp-nonce.ts)
- ✅ No 'unsafe-inline' scripts
- ✅ No eval() or dynamic code execution
- ✅ Limits script sources to whitelist

**Input Validation:**
- ✅ Sanitize all user input
- ✅ Escape output (React does this by default)
- ✅ Use DOMPurify for user-generated HTML
- ✅ Never use dangerouslySetInnerHTML unless absolutely necessary

**HTTPS/TLS:**
- ✅ Use HTTPS everywhere (enforced in middleware)
- ✅ Enable HSTS header (1 year expiration)
- ✅ Use secure cookies (Secure + HttpOnly flags)
- ✅ Enable HSTS preload submission

---

## 3. Known Security Issues & Mitigations

### 3.1 Open Issues (As of v1.0.0)

| Issue | Severity | Status | Mitigation |
|-------|----------|--------|-----------|
| None reported | - | ✅ Clean | - |

**Note:** If you discover issues, report via security@fabrk.dev

---

## 4. Security Testing & Validation

### 4.1 Automated Security Testing

The boilerplate includes:
- ✅ TypeScript strict mode (catches type errors)
- ✅ ESLint with security rules
- ✅ Environment validation (src/lib/env.ts) - fails on missing secrets
- ✅ Input validation with Zod (all API routes)
- ✅ CSRF protection (NextAuth built-in)

### 4.2 Manual Security Review Checklist

Before production deployment, verify:

```
Authentication & Authorization:
  [ ] Environment variables configured securely
  [ ] Database URL uses SSL (sslmode=require)
  [ ] NEXTAUTH_URL set to HTTPS domain
  [ ] OAuth client secrets not exposed in frontend
  [ ] Session expiration reasonable (30 days?)
  [ ] Rate limiting enabled on sensitive endpoints
  [ ] RBAC roles properly enforced

API Security:
  [ ] All inputs validated with Zod
  [ ] All sensitive actions require authentication
  [ ] API keys properly hashed and stored
  [ ] Webhooks verify signatures
  [ ] Error messages don't expose internals
  [ ] Logging doesn't include sensitive data

Data Protection:
  [ ] Database backups automated
  [ ] Backups stored securely (not in git)
  [ ] Sensitive data encrypted at rest
  [ ] PII handled according to GDPR/CCPA
  [ ] Data retention policy documented

Frontend Security:
  [ ] HTTPS enforced
  [ ] CSP headers properly configured
  [ ] No hardcoded secrets in code
  [ ] Dependencies updated (npm audit)
  [ ] No eval() or dangerous functions
  [ ] Input/output properly sanitized

Third-Party Services:
  [ ] API keys stored in environment (not code)
  [ ] Webhook endpoints secured
  [ ] Service status monitoring enabled
  [ ] Incidents/outages documented
  [ ] SLAs reviewed and acceptable
```

### 4.3 Dependency Security

- ✅ Use `npm audit` regularly:
  ```bash
  npm audit
  npm audit --fix
  ```
- ✅ Dependabot enabled (auto-creates PRs for updates)
- ✅ Regular dependency updates (weekly)
- ✅ Review breaking changes before major updates
- ✅ Keep Node.js updated (LTS versions recommended)

---

## 5. Compliance & Standards

### 5.1 Standards Implemented

- ✅ **OWASP Top 10** - Protected against most common vulnerabilities
- ✅ **WCAG 2.1 Level AA** - Accessibility compliance
- ✅ **GDPR Ready** - Privacy by design, data subject rights
- ✅ **CCPA Ready** - Privacy policies, opt-out mechanisms
- ✅ **CSP Nonce** - Modern CSP implementation
- ✅ **HSTS** - HTTP Strict Transport Security

### 5.2 What's NOT Included

- ❌ **SOC 2 Type II** - Requires professional audit (6+ months)
- ❌ **HIPAA** - Requires additional controls (use CloudSQL with HIPAA compliance)
- ❌ **PCI DSS** - Stripe handles payment security
- ❌ **FIPS 140-2** - Requires certified encryption modules

**For enterprise compliance:** Contact enterprise@fabrk.dev

### 5.3 Your Responsibility

As the product owner, you must:
- ✅ Implement privacy policies (templates provided)
- ✅ Create terms of service
- ✅ Implement data deletion flows
- ✅ Handle data subject requests (GDPR)
- ✅ Document your security controls
- ✅ Conduct security audits
- ✅ Implement incident response plan

---

## 6. Security Release Cycle

### 6.1 Patch Releases (v1.0.x)

**Criteria for patch release:**
- Security vulnerabilities (any severity)
- Critical bugs affecting security
- Missing security validations

**Timeline:**
- Critical: Released within 48 hours
- High: Released within 1 week
- Medium/Low: Bundled in next regular release

### 6.2 Update Process

When a security patch is released:
1. **Advisory published:** SECURITY-ADVISORIES.md updated
2. **Notification sent:** To all known deployments (if possible)
3. **Patch release:** v1.0.x tag on GitHub
4. **npm update:** `npm update fabrk-boilerplate`
5. **Deploy:** Follow your deployment process
6. **Verify:** Confirm vulnerability is patched

**Recommended:** Subscribe to GitHub releases for security notifications

---

## 7. Incident Response

### 7.1 Security Incident Process

If a security incident is confirmed:
1. **Immediate containment** - Vulnerability patched within 48 hours
2. **Notification** - Users informed via email + GitHub advisory
3. **Detailed report** - Root cause analysis documented
4. **Post-incident review** - Process improvements identified

### 7.2 Your Incident Response

If you discover a breach using Fabrk:
- Contact security@fabrk.dev with details
- We'll help assess if issue is in Fabrk or your deployment
- Coordinate public disclosure timeline
- Support incident investigation

---

## 8. Secure Deployment

### 8.1 Pre-Deployment Checklist

```bash
# Run these before deploying to production
npm run lint          # Check for code issues
npm run type-check    # TypeScript validation
npm audit            # Security vulnerabilities
npm run test:all     # Run full test suite
npm run build        # Production build
```

### 8.2 Environment Setup

**Production environment variables must include:**
```env
NEXTAUTH_URL=https://yourdomain.com       # HTTPS only
NEXTAUTH_SECRET=<32+ random characters>   # Generated securely
DATABASE_URL=<PostgreSQL with SSL>        # sslmode=require
STRIPE_SECRET_KEY=sk_live_xxxxx           # Live keys only
# ... other production keys
```

### 8.3 Post-Deployment Verification

- ✅ HTTPS working (test in browser)
- ✅ Security headers present (check in DevTools)
- ✅ Login flow works
- ✅ Payment flow works
- ✅ Emails sending
- ✅ Database accessible
- ✅ Logs being collected

---

## 9. Security Contacts

| Issue | Contact | Response Time |
|-------|---------|---|
| **Security Vulnerability** | security@fabrk.dev | 24-48 hours |
| **License/Legal Question** | legal@fabrk.dev | 48 hours |
| **Support Issue** | support@fabrk.dev | 24 hours |
| **Enterprise Compliance** | enterprise@fabrk.dev | 24 hours |

---

## 10. Additional Resources

### 10.1 Security Documentation
- **OWASP Security Cheat Sheet** - https://cheatsheetseries.owasp.org/
- **MDN Web Security** - https://developer.mozilla.org/docs/Web/Security
- **NextAuth.js Security** - https://next-auth.js.org/getting-started/deployment

### 10.2 Tools
- **npm audit** - Scan for known vulnerabilities
- **Snyk** - Continuous vulnerability scanning
- **OWASP ZAP** - Security testing tool
- **Burp Suite Community** - Web security testing

### 10.3 Community & Updates
- **GitHub Security Advisories** - https://github.com/jpoindexter/fabrk-dev/security
- **Email Notifications** - security@fabrk.dev

---

## Acknowledgments

Security best practices informed by:
- OWASP Top 10 & ASVS
- Next.js Security Handbook
- Node.js Security Best Practices
- Industry-standard SaaS security

---

**Fabrk Security Policy © 2025**
**Last Updated:** November 19, 2025
**Version:** 1.0

For questions: security@fabrk.dev
