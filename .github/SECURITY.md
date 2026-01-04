# Security Policy

## Reporting Security Vulnerabilities

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **security@fabrk.dev**

Include the following information:
- Type of vulnerability
- Full paths of source files related to the vulnerability
- Location of affected code (tag/branch/commit or URL)
- Step-by-step instructions to reproduce
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability

You should receive a response within 48 hours. If the issue is confirmed, we will release a patch as soon as possible.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Features

### Code Scanning
- **CodeQL**: Automated vulnerability scanning on every push
- **Weekly Scans**: Scheduled security analysis every Sunday
- **Pull Request Checks**: Security scans required before merge

### Dependency Management
- **Dependabot**: Automated dependency updates
- **npm audit**: Regular vulnerability checks
- **Lock Files**: Package versions locked for reproducibility

### Input Validation & Sanitization
- Zod schema validation on all API endpoints
- XSS protection via sanitization functions
- SQL injection protection (Prisma ORM)
- Path traversal prevention
- File upload validation

### Authentication & Authorization
- NextAuth v5 with JWT sessions
- Secure password hashing (bcrypt, 12 rounds)
- CSRF protection
- Rate limiting (Upstash Redis)
- Session expiration (30 days)

### Secure Headers
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Environment Security
- Environment variable validation at startup
- Secrets never committed to repository
- Production-only checks for sensitive operations

### Workflow Security
- Minimal permissions on all GitHub Actions
- No secrets in workflow logs
- Dependency pinning with checksums

## Best Practices for Users

### Environment Variables
1. Never commit `.env` or `.env.local` files
2. Use strong secrets (min 32 characters)
3. Rotate secrets regularly
4. Use different secrets for dev/staging/production

### Database
1. Use connection pooling
2. Enable SSL for database connections in production
3. Regular backups
4. Row-level security policies

### Deployment
1. Always use HTTPS in production
2. Enable HSTS headers
3. Use secure cookies (httpOnly, secure, sameSite)
4. Implement rate limiting

### Dependencies
1. Run `npm audit` before deploying
2. Keep dependencies up to date
3. Review security advisories
4. Use exact versions in production

## Security Contacts

- Security Team: security@fabrk.dev
- General Support: support@fabrk.dev

## Acknowledgments

We appreciate the security research community and will acknowledge researchers who report valid vulnerabilities (with permission).
