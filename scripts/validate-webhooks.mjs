#!/usr/bin/env node

/**
 * Validate webhook configuration and implementation
 * Checks: endpoints exist, secrets configured, signature verification
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkWebhookEndpoints() {
  log('\n[ CHECKING WEBHOOK ENDPOINTS ]', 'blue');

  const endpoints = [
    'src/app/api/stripe/webhook/route.ts',
    'src/app/api/lemonsqueezy/webhook/route.ts',
  ];

  let allExist = true;

  endpoints.forEach((endpoint) => {
    const fullPath = join(projectRoot, endpoint);
    const exists = existsSync(fullPath);

    if (exists) {
      log(`✓ ${endpoint}`, 'green');
    } else {
      log(`✗ ${endpoint} (missing)`, 'red');
      allExist = false;
    }
  });

  return allExist;
}

function checkWebhookSecrets() {
  log('\n[ CHECKING WEBHOOK SECRETS ]', 'blue');

  const envPath = join(projectRoot, '.env.example');
  if (!existsSync(envPath)) {
    log('✗ .env.example not found', 'red');
    return false;
  }

  const envContent = readFileSync(envPath, 'utf-8');

  const requiredSecrets = [
    'STRIPE_WEBHOOK_SECRET',
    'POLAR_WEBHOOK_SECRET',
    'LEMONSQUEEZY_WEBHOOK_SECRET',
  ];

  let allConfigured = true;

  requiredSecrets.forEach((secret) => {
    if (envContent.includes(secret)) {
      log(`✓ ${secret} (documented)`, 'green');
    } else {
      log(`✗ ${secret} (missing from .env.example)`, 'red');
      allConfigured = false;
    }
  });

  return allConfigured;
}

function checkSignatureVerification() {
  log('\n[ CHECKING SIGNATURE VERIFICATION ]', 'blue');

  const endpoints = [
    { path: 'src/app/api/stripe/webhook/route.ts', keyword: 'constructEvent' },
    { path: 'src/app/api/lemonsqueezy/webhook/route.ts', keyword: 'verifyWebhookSignature' },
  ];

  let allVerified = true;

  endpoints.forEach(({ path, keyword }) => {
    const fullPath = join(projectRoot, path);

    if (!existsSync(fullPath)) {
      log(`⚠ ${path} (skipped - file missing)`, 'yellow');
      return;
    }

    const content = readFileSync(fullPath, 'utf-8');

    if (content.includes(keyword)) {
      log(`✓ ${path.split('/').pop()} - signature verification found`, 'green');
    } else {
      log(`✗ ${path.split('/').pop()} - no signature verification (keyword: ${keyword})`, 'red');
      allVerified = false;
    }
  });

  return allVerified;
}

function checkWebhookRouteHandlers() {
  log('\n[ CHECKING ROUTE HANDLERS ]', 'blue');

  const endpoints = [
    'src/app/api/stripe/webhook/route.ts',
    'src/app/api/lemonsqueezy/webhook/route.ts',
  ];

  let allValid = true;

  endpoints.forEach((endpoint) => {
    const fullPath = join(projectRoot, endpoint);

    if (!existsSync(fullPath)) {
      log(`⚠ ${endpoint} (skipped)`, 'yellow');
      return;
    }

    const content = readFileSync(fullPath, 'utf-8');

    // Check for export async function POST
    if (content.includes('export async function POST')) {
      log(`✓ ${endpoint.split('/').pop()} - POST handler exported`, 'green');
    } else {
      log(`✗ ${endpoint.split('/').pop()} - no POST handler found`, 'red');
      allValid = false;
    }

    // Check for error handling
    if (content.includes('try') && content.includes('catch')) {
      log(`  ├─ Error handling: ✓`, 'green');
    } else {
      log(`  ├─ Error handling: ✗ (missing try/catch)`, 'yellow');
    }

    // Check for database operations (Payment creation)
    if (content.includes('prisma.payment.create') || content.includes('db.payment.create')) {
      log(`  └─ Payment creation: ✓`, 'green');
    } else {
      log(`  └─ Payment creation: ⚠ (not found)`, 'yellow');
    }
  });

  return allValid;
}

function printSummary(results) {
  log('\n[ VALIDATION SUMMARY ]', 'blue');

  const allPassed = Object.values(results).every((r) => r);

  if (allPassed) {
    log('✓ All webhook validations passed!', 'green');
    log('  Webhooks are properly configured and ready for production.', 'green');
    process.exit(0);
  } else {
    log('✗ Some webhook validations failed', 'red');
    log('  Review the errors above before deploying.', 'red');
    log('\nQuick fixes:', 'yellow');
    log('  1. Ensure all webhook endpoints exist in src/app/api/webhooks/', 'yellow');
    log('  2. Add missing secrets to .env.example', 'yellow');
    log('  3. Implement signature verification in all webhook handlers', 'yellow');
    log('  4. Add POST route handlers with error handling', 'yellow');
    process.exit(1);
  }
}

// Main execution
log('='.repeat(60), 'blue');
log('WEBHOOK VALIDATION SCRIPT', 'blue');
log('='.repeat(60), 'blue');

const results = {
  endpoints: checkWebhookEndpoints(),
  secrets: checkWebhookSecrets(),
  signatures: checkSignatureVerification(),
  handlers: checkWebhookRouteHandlers(),
};

printSummary(results);
