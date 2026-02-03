/**
 * ✅ FABRK UTILITIES
 * Zod schemas for auth form validation
 *
 * @example
 * ```ts
 * const result = loginSchema.safeParse(data);
 * ```
 */

import { z } from 'zod';

/**
 * Password validation rules
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

/**
 * Email validation schema
 */
const emailSchema = z.string().email('Invalid email address').min(1, 'Email is required');

/**
 * Login form schema
 * Requires: email, password
 * Optional: rememberMe
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type LoginFormData = LoginInput; // Alias for backward compatibility

/**
 * Register form schema
 * Requires: email, password, confirmPassword, acceptTerms
 * Optional: name, subscribeNewsletter
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    name: z.string().optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
    subscribeNewsletter: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// Alias for backward compatibility
export const signupSchema = registerSchema;
export type SignupInput = RegisterInput;
export type SignupFormData = RegisterInput; // Alias for backward compatibility

/**
 * Forgot password form schema
 * Requires: email only
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordFormData = ForgotPasswordInput; // Alias for backward compatibility

/**
 * Reset password form schema
 * Requires: password, confirmPassword
 */
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordFormData = ResetPasswordInput; // Alias for backward compatibility

/**
 * Calculate password strength
 * Returns score (0-100) and label
 */
export function calculatePasswordStrength(password: string) {
  let score = 0;

  if (!password) return { score: 0, label: 'Too weak' };

  // Length scoring
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  // Character variety
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;

  // Label based on score
  let label = 'Too weak';
  if (score >= 75) label = 'Strong';
  else if (score >= 50) label = 'Fair';
  else if (score >= 25) label = 'Weak';

  return { score: Math.min(score, 100), label };
}
