/**
 * ✅ FABRK COMPONENT
 * Email Templates - Barrel Export
 * All transactional email templates
 */

// Welcome & Onboarding
export { generateWelcomeEmailHTML, type WelcomeEmailProps } from './welcome-html';

// Authentication
export { generateVerifyEmailHTML, type VerifyEmailProps } from './verify-email';

export { generateResetPasswordHTML, type ResetPasswordProps } from './reset-password';

// Payments & Subscriptions
export {
  generatePurchaseConfirmationHTML,
  type PurchaseConfirmationProps,
} from './purchase-confirmation';

export {
  generateSubscriptionUpdateHTML,
  type SubscriptionUpdateProps,
} from './subscription-update';
