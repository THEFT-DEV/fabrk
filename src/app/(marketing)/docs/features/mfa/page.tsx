import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Shield, Key, Smartphone, Lock } from 'lucide-react';

export const metadata = {
  title: 'Multi-Factor Authentication - Fabrk Docs',
  description:
    'Add 2FA to your SaaS with TOTP authenticator apps. Includes QR code setup, backup codes, and security best practices.',
};

export default function MFAPage() {
  return (
    <FeatureGuideTemplate
      code="[0x20]"
      category="Features"
      title="Multi Factor Authentication"
      description="Add an extra layer of security with authenticator apps and backup codes."
      overview="Two-factor authentication (2FA) adds an extra step to logging in. After entering your password, you also need to provide a code from your phone. Even if someone steals your password, they can't access your account without your phone. Think of it like a bank vault with two locks - you need both keys to get in."
      features={[
        {
          icon: Smartphone,
          title: 'QR Code Setup',
          description:
            'Users scan a QR code with their authenticator app. Works with Google Authenticator, Authy, 1Password, and more.',
        },
        {
          icon: Key,
          title: '6-Digit TOTP Codes',
          description: 'Standard TOTP codes that change every 30 seconds. RFC 6238 compliant.',
        },
        {
          icon: Shield,
          title: '10 Backup Codes',
          description:
            'One-time use codes (XXXX-XXXX format) for account recovery if phone is lost.',
        },
        {
          icon: Lock,
          title: 'Enable/Disable Toggle',
          description:
            'Users can turn 2FA on or off from security settings with proper verification.',
        },
      ]}
      setup={[
        {
          title: 'Configure MFA Issuer Name',
          description: 'Customize the issuer name (shown in authenticator apps) in src/config.js',
          code: `// src/config.js

export const config = {
  auth: {
    // This name appears in authenticator apps like:
    // "YourApp (user@example.com)"
    mfaIssuer: "YourApp",
  },
};`,
          language: 'javascript',
        },
      ]}
      usage={[
        {
          title: 'Using the MFA Library',
          description: 'The MFA functions are available in src/lib/auth/mfa.ts',
          code: `import {
  generateTOTPSecret,
  verifyTOTP,
  generateBackupCodes,
  verifyBackupCode,
  hashBackupCode
} from "@/lib/auth/mfa";

// Generate a new TOTP secret for user setup
const { secret, qrCodeUrl, otpAuthUrl } = await generateTOTPSecret(
  "user@example.com",
  "YourApp" // issuer name
);

// Verify a 6-digit code from authenticator app
const isValid = verifyTOTP(userCode, secret);

// Generate 10 backup codes (XXXX-XXXX format)
const backupCodes = generateBackupCodes(10);

// Hash backup codes before storing in database
const hashedCodes = await Promise.all(
  backupCodes.map(code => hashBackupCode(code))
);

// Verify a backup code (also handles marking it as used)
const { valid, remainingCodes } = await verifyBackupCode(
  submittedCode,
  user.mfaBackupCodes
);`,
          language: 'typescript',
        },
        {
          title: 'Check if User Has 2FA Enabled',
          description: 'In your API routes',
          code: `// Check if user has 2FA enabled
const user = await prisma.user.findUnique({
  where: { id: session.user.id },
  select: {
    mfaEnabled: true,
    mfaSecret: true,
  },
});

if (user.mfaEnabled) {
  // User has 2FA enabled
  // Require verification before sensitive actions
}

// For sensitive operations, you might want to require
// re-verification even for logged-in users:
export async function deleteAccount(userId: string, mfaCode: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user.mfaEnabled) {
    const isValid = verifyTOTP(mfaCode, decrypt(user.mfaSecret));
    if (!isValid) {
      throw new Error("Invalid 2FA code");
    }
  }

  // Proceed with deletion
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Magic Links', href: '/docs/features/magic-links' }}
      next={{ title: 'API Keys', href: '/docs/features/api-keys' }}
    >
      {/* Why Offer 2FA Section */}
      <DocsSection title="Why Offer 2FA">
        <DocsCard title="WHY 2FA">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              Security Benefits
              <ul className="space-y-1">
                <li>• Protects against password theft</li>
                <li>• Stops credential stuffing attacks</li>
                <li>• Required for many compliance standards</li>
                <li>• Builds trust with security-conscious users</li>
              </ul>
            </div>
            <div className="space-y-2">
              Business Benefits
              <ul className="space-y-1">
                <li>• Enterprise customers often require it</li>
                <li>• Reduces account takeover support tickets</li>
                <li>• Differentiates you from competitors</li>
                <li>• Shows you take security seriously</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* How 2FA Works Section */}
      <DocsSection title="How 2FA Works">
        <div className="space-y-4">
          <DocsCard title="SETUP 2FA">
            Setting Up 2FA
            <ol className="list-inside list-decimal space-y-1">
              <li>User goes to Settings → Security</li>
              <li>Clicks &quot;Enable Two-Factor Authentication&quot;</li>
              <li>Scans QR code with authenticator app (or enters secret manually)</li>
              <li>Enters the 6-digit code from their app to verify setup</li>
              <li>Receives 10 backup codes to save somewhere safe</li>
              <li>2FA is now enabled on their account</li>
            </ol>
          </DocsCard>

          <DocsCard title="LOGIN WITH 2FA">
            Logging In With 2FA
            <ol className="list-inside list-decimal space-y-1">
              <li>User enters email and password as normal</li>
              <li>If 2FA is enabled, they&apos;re asked for a verification code</li>
              <li>User opens authenticator app and enters the current code</li>
              <li>If code is correct, they&apos;re logged in</li>
            </ol>
          </DocsCard>

          <DocsCard title="BACKUP CODES">
            Lost Phone? Use Backup Code
            <ol className="list-inside list-decimal space-y-1">
              <li>On the verification screen, click &quot;Use backup code&quot;</li>
              <li>Enter one of the 10 backup codes (format: XXXX-XXXX)</li>
              <li>That code is now used up and won&apos;t work again</li>
              <li>After logging in, set up a new authenticator and generate new backup codes</li>
            </ol>
          </DocsCard>
        </div>
      </DocsSection>

      {/* About Backup Codes Section */}
      <DocsSection title="About Backup Codes">
        <DocsCard title="BACKUP INFO" className="bg-muted/50">
          <p className="mb-4">
            Backup codes are essential for account recovery. They let users log in even if they lose
            access to their authenticator app (lost phone, new device, etc.).
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              Format
              <ul className="space-y-1">
                <li>• 10 codes per user</li>
                <li>• Format: XXXX-XXXX (8 characters)</li>
                <li>• Each code works once only</li>
                <li>• Shown only at setup time</li>
              </ul>
            </div>
            <div className="space-y-2">
              Security
              <ul className="space-y-1">
                <li>• Codes are hashed before storage</li>
                <li>• Timing-safe comparison</li>
                <li>• Used codes are removed</li>
                <li>• Users should store securely</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Common Questions Section */}
      <DocsSection title="Common Questions">
        <div className="space-y-4">
          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Which authenticator apps work?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">
                Any app that supports TOTP (RFC 6238) works. Popular options include:
              </p>
              <ul className="mt-2 space-y-1">
                <li>• Google Authenticator</li>
                <li>• Authy</li>
                <li>• 1Password</li>
                <li>• Microsoft Authenticator</li>
                <li>• Bitwarden</li>
              </ul>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              What if user loses phone?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">
                They can use one of their 10 backup codes to log in. After logging in, they should:
              </p>
              <ol className="mt-2 list-inside list-decimal">
                <li>Disable 2FA</li>
                <li>Set up a new authenticator on their new phone</li>
                <li>Re-enable 2FA (this generates new backup codes)</li>
              </ol>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              What if user loses phone AND backup codes?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">This is a worst-case scenario. You have a few options:</p>
              <ul className="mt-2 space-y-1">
                <li>• Require identity verification (ID upload, video call)</li>
                <li>• Disable 2FA from admin panel after verification</li>
                <li>• Implement an account recovery flow with security questions</li>
              </ul>
              <p className="mt-2">
                This is why it&apos;s important to tell users to save their backup codes securely!
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Can I require 2FA for all users?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">
                2FA is opt-in by default. To require it, you&apos;d add middleware that checks if{' '}
                <code className="bg-muted px-1 font-mono">user.mfaEnabled</code> is true and
                redirects users to set it up if not. This is common for enterprise/admin users.
              </p>
            </div>
          </details>

          <details className="border-border bg-card border">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              How are secrets stored?
            </summary>
            <div className="text-muted-foreground border-t p-4 text-sm">
              <p className="mb-6">
                TOTP secrets are encrypted before storage using your{' '}
                <code className="bg-muted px-1 font-mono">NEXTAUTH SECRET</code>. Backup codes are
                hashed with SHA-256. Even if your database is compromised, attackers can&apos;t use
                the raw values.
              </p>
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Future Enhancements Section */}
      <DocsSection title="Future Enhancements">
        <p className="mb-4">
          The current implementation covers TOTP (authenticator apps). Future versions may include:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="SMS VERIFICATION">
            SMS Verification
            <p className="mb-6">
              Text message codes as an alternative (requires Twilio integration).
            </p>
          </DocsCard>
          <DocsCard title="WEBAUTHN PASSKEYS">
            WebAuthn/Passkeys
            <p className="mb-6">
              Hardware security keys and biometric authentication (Touch ID, Face ID).
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/authentication"
            title="Authentication Basics"
            description="Learn about the core authentication system 2FA builds on."
          />
          <DocsLinkCard
            href="/docs/security/headers"
            title="Security Headers"
            description="Learn about security headers and CSRF protection."
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
