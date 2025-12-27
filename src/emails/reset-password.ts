 
/**
 * Password Reset Template
 * Simple, clean design for email client compatibility
 */

export interface ResetPasswordProps {
  name: string;
  resetUrl: string;
}

export function generateResetPasswordHTML({ name, resetUrl }: ResetPasswordProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #000000;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Fabrk</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 600;">
                Reset Your Password
              </h2>
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.5;">
                Hi ${name}, we received a request to reset your password. Click the button below to create a new password.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="${resetUrl}" style="display: inline-block; background-color: #007AFF; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">Reset Password</a>
                  </td>
                </tr>
              </table>

              <!-- Alternative Link -->
              <p style="margin: 0 0 24px 0; color: #737373; font-size: 14px; line-height: 1.5;">
                Or copy and paste this link into your browser:<br/>
                <a href="${resetUrl}" style="color: #007AFF; word-break: break-all;">${resetUrl}</a>
              </p>

              <!-- Expiry Notice -->
              <div style="background-color: #FFF3CD; border: 1px solid #FFC107; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>⏱️ This link expires in 1 hour.</strong>
                </p>
              </div>

              <!-- Security Notice -->
              <div style="background-color: #F8D7DA; border: 1px solid #F5C2C7; border-radius: 6px; padding: 16px;">
                <p style="margin: 0; color: #842029; font-size: 14px; line-height: 1.5;">
                  <strong>🔒 Security Notice:</strong><br/>
                  If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; text-align: center;">
              <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.5;">
                © 2025 Fabrk. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateResetPasswordText({ name, resetUrl }: ResetPasswordProps): string {
  return `
Reset Your Password

Hi ${name}, we received a request to reset your password. Click the link below to create a new password.

Reset your password: ${resetUrl}

⏱️ This link expires in 1 hour.

🔒 Security Notice:
If you didn't request a password reset, please ignore this email. Your password will remain unchanged.

© 2025 Fabrk. All rights reserved.
  `.trim();
}
