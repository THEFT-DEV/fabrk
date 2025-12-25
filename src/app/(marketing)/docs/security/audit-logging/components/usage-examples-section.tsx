export function UsageExamplesSection() {
  return {
    title: 'Usage Examples',
    description: 'Log events throughout your application',
    code: `// Login event
// src/app/api/auth/login/route.ts

import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const user = await authenticateUser(body.email, body.password);

    await createAuditLog({
      action: "user.login",
      category: "auth",
      userId: user.id,
      metadata: { email: body.email },
      request,
    });

    return NextResponse.json({ success: true });
  } catch (_) {
    await createAuditLog({
      action: "user.login",
      category: "auth",
      severity: "warning",
      status: "failure",
      metadata: { email: body.email },
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      request,
    });

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}

// Payment event
// src/app/api/stripe/webhook/route.ts

await createAuditLog({
  action: "payment.created",
  category: "billing",
  userId: payment.userId,
  targetType: "payment",
  targetId: payment.id,
  metadata: {
    amount: payment.amount,
    currency: payment.currency,
    stripePaymentId: payment.stripeId,
  },
});

// Admin action
await createAuditLog({
  action: "admin.user_impersonated",
  category: "admin",
  severity: "warning",
  userId: adminUser.id,
  targetType: "user",
  targetId: impersonatedUser.id,
  metadata: {
    reason: "Customer support request",
  },
  request,
});`,
    language: 'typescript' as const,
  };
}
