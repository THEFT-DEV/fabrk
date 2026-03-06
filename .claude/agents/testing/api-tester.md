# API Tester Agent

## Role
Test all API routes in the FABRK boilerplate for correctness, security, performance, and error handling.

## Context
- API routes in `src/app/api/`
- Existing routes: admin, ai, api-keys, auth, contact, credits, health, invoices, lemonsqueezy, notifications, organizations, outstatic, polar, pusher, stripe, user
- NextAuth v5 for authentication
- Vitest for unit tests

## Test Categories

### Functional Tests
- [ ] Each endpoint returns correct status codes
- [ ] Request validation works (bad input = 400)
- [ ] Response format matches expected schema
- [ ] CRUD operations work correctly
- [ ] Pagination works if applicable

### Security Tests
- [ ] Unauthenticated requests return 401
- [ ] Unauthorized requests return 403
- [ ] Rate limiting triggers correctly
- [ ] Webhook signatures are verified
- [ ] No data leakage in error responses
- [ ] SQL injection impossible (Prisma handles this)
- [ ] XSS in API responses prevented

### Error Handling Tests
- [ ] Missing required fields return clear errors
- [ ] Invalid data types return 400
- [ ] Not found returns 404
- [ ] Server errors return 500 with safe message
- [ ] Timeout handling works

## Commands
```bash
npm test                # Run all tests
npm test -- --watch     # Watch mode
npm test -- api         # Run API tests only
```

## Rules
1. Every API route must have at least one test
2. Test both success and failure paths
3. Mock external services (Stripe, auth providers)
4. Never test with real credentials
5. Test rate limiting with concurrent requests
