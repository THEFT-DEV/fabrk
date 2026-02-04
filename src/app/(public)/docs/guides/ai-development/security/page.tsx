import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';

export const metadata = {
  title: 'Security Scanning - AI Development | Fabrk Docs',
  description: 'Security scanning and best practices for AI-generated code.',
};

export default function SecurityPage() {
  return (
    <FeatureGuideTemplate
      code="[0xSEC]"
      category="AI Development"
      title="Security Scanning"
      description="Detect and prevent security vulnerabilities in AI-generated code."
      overview="AI can generate code with SQL injection, XSS, hardcoded credentials, and other vulnerabilities. Security scanning catches these before production."
      setup={[
        {
          title: 'Run Security Scan',
          description: 'Dedicated security vulnerability scanning.',
          code: `npm run ai:security

# Output:
# src/app/api/users/route.ts
#   HIGH   SQL injection risk at :45
#   MEDIUM Missing input validation at :32
#
# Summary
#   HIGH: 1
#   MEDIUM: 1`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'SQL Injection',
          description: 'Use parameterized queries, never string concatenation.',
          code: `// DANGEROUS - SQL injection vulnerability
const query = \`SELECT * FROM users WHERE id = '\${userId}'\`;
await db.raw(query);

// SAFE - Prisma ORM
const user = await db.user.findUnique({
  where: { id: userId }
});

// SAFE - Parameterized query
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);`,
          language: 'typescript',
        },
        {
          title: 'XSS Prevention',
          description: 'Never use innerHTML with user input.',
          code: `// DANGEROUS - XSS vulnerability
element.innerHTML = userInput;

// DANGEROUS - React bypass
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// SAFE - React handles escaping
<div>{userInput}</div>

// SAFE - Sanitize if HTML needed
import DOMPurify from 'isomorphic-dompurify';
const sanitized = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: sanitized }} />`,
          language: 'tsx',
        },
        {
          title: 'Credentials',
          description: 'Never hardcode secrets in source code.',
          code: `// DANGEROUS - Credentials in code
const apiKey = 'sk-1234567890abcdef';
const password = 'admin123';

// SAFE - Environment variables
const apiKey = process.env.API_KEY;

// SAFER - Validated environment
import { env } from '@/lib/env';
const apiKey = env.API_KEY; // Typed and validated`,
          language: 'typescript',
        },
        {
          title: 'eval() Prevention',
          description: 'Never execute dynamic code.',
          code: `// DANGEROUS - Code injection
eval(userInput);
new Function(userInput)();
setTimeout(userInput, 1000);

// SAFE - Parse data
const data = JSON.parse(jsonString);

// SAFE - Allowlist approach
const allowedActions = { save: saveData, load: loadData };
const action = allowedActions[userInput];
if (action) action();`,
          language: 'typescript',
        },
        {
          title: 'Input Validation',
          description: 'Always validate user input with Zod.',
          code: `import { z } from 'zod';

const userInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150),
});

export async function POST(request: Request) {
  const body = await request.json();

  const result = userInputSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: { code: 'INVALID_INPUT', message: result.error.message } },
      { status: 400 }
    );
  }

  // Safe to use result.data
  const { email, name, age } = result.data;
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Type Safety', href: '/docs/guides/ai-development/type-safety' }}
      next={{ title: 'Testing', href: '/docs/guides/ai-development/testing' }}
    >
      <DocsSection title="What Gets Detected">
        <DocsCard title="VULNERABILITY TYPES">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Severity</th>
                  <th className="p-2 text-left">Vulnerability</th>
                  <th className="p-2 text-left">Pattern</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="text-destructive p-2 font-medium">HIGH</td>
                  <td className="p-2">SQL injection</td>
                  <td className="p-2">Template literals in queries</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="text-destructive p-2 font-medium">HIGH</td>
                  <td className="p-2">eval() usage</td>
                  <td className="p-2">Dynamic code execution</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="text-destructive p-2 font-medium">HIGH</td>
                  <td className="p-2">Hardcoded secrets</td>
                  <td className="p-2">API keys, passwords in code</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-medium text-warning">MEDIUM</td>
                  <td className="p-2">innerHTML</td>
                  <td className="p-2">XSS vulnerability</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-medium text-warning">MEDIUM</td>
                  <td className="p-2">Command injection</td>
                  <td className="p-2">User input in shell</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-medium text-warning">MEDIUM</td>
                  <td className="p-2">Unsafe redirect</td>
                  <td className="p-2">Open redirect</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium text-info">LOW</td>
                  <td className="p-2">Missing validation</td>
                  <td className="p-2">Unvalidated user input</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Security Checklist">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="BEFORE DEPLOYMENT">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>[ ] No hardcoded credentials</li>
              <li>[ ] No eval() or dynamic code</li>
              <li>[ ] All SQL parameterized</li>
              <li>[ ] User input validated</li>
              <li>[ ] HTML output sanitized</li>
              <li>[ ] Redirects validated</li>
            </ul>
          </DocsCard>

          <DocsCard title="PRODUCTION REQUIREMENTS">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>[ ] API routes check auth</li>
              <li>[ ] Sensitive data encrypted</li>
              <li>[ ] HTTPS enforced</li>
              <li>[ ] CORS configured</li>
              <li>[ ] Rate limiting enabled</li>
              <li>[ ] Error messages sanitized</li>
            </ul>
          </DocsCard>
        </div>
      </DocsSection>

      <DocsCallout variant="danger" title="High Severity Issues">
        The security scan exits with code 1 if HIGH severity issues are found. These must be fixed
        before deployment.
      </DocsCallout>
    </FeatureGuideTemplate>
  );
}
