import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsCallout } from '@/components/docs';

export const metadata = {
  title: 'Type Safety - AI Development | Fabrk Docs',
  description: 'Type patterns for AI-generated code.',
};

export default function TypeSafetyPage() {
  return (
    <FeatureGuideTemplate
      code="[0xTYP]"
      category="AI Development"
      title="Type Safety"
      description="Patterns for type-safe AI-generated code."
      overview="AI often generates code with any types, missing null checks, and untyped returns. These patterns ensure type safety."
      setup={[
        {
          title: 'Never Use any',
          description: 'Always define specific types.',
          code: `// WRONG
const data: any = response;
function process(input: any): any { }

// CORRECT
const data: User = response;
function process(input: UserInput): ProcessedResult { }

// If truly unknown
const data: unknown = response;
if (isUser(data)) {
  // TypeScript knows it's User
}`,
          language: 'typescript',
        },
        {
          title: 'Always Define Return Types',
          description: 'Explicit return types catch errors.',
          code: `// WRONG
async function getUser(id: string) {
  return await fetch(\`/api/users/\${id}\`);
}

// CORRECT
async function getUser(id: string): Promise<APIResponse<User>> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`,
          language: 'typescript',
        },
        {
          title: 'Handle Null/Undefined',
          description: 'Use optional chaining and nullish coalescing.',
          code: `// WRONG - crashes if user is null
const name = user.name.toUpperCase();

// CORRECT - optional chaining
const name = user?.name?.toUpperCase() ?? 'Anonymous';

// CORRECT - explicit check
if (user && user.name) {
  const name = user.name.toUpperCase();
}`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'APIResponse Type',
          description: 'Standard wrapper for all API responses.',
          code: `interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

// Usage
async function getUsers(): Promise<APIResponse<User[]>> {
  try {
    const users = await db.user.findMany();
    return { success: true, data: users };
  } catch (error) {
    return {
      success: false,
      error: { code: 'DB_ERROR', message: 'Failed to fetch users' }
    };
  }
}`,
          language: 'typescript',
        },
        {
          title: 'AsyncState Type',
          description: 'For React state with async operations.',
          code: `type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Usage
const [state, setState] = useState<AsyncState<User>>({ status: 'idle' });

// Type-safe rendering
{state.status === 'loading' && <Spinner />}
{state.status === 'success' && <UserCard user={state.data} />}
{state.status === 'error' && <Error message={state.error.message} />}`,
          language: 'typescript',
        },
        {
          title: 'Type Guards',
          description: 'Validate external data at runtime.',
          code: `function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    typeof (obj as User).id === 'string' &&
    typeof (obj as User).email === 'string'
  );
}

// Usage
const data: unknown = await response.json();
if (isUser(data)) {
  console.log(data.email); // TypeScript knows this is string
}`,
          language: 'typescript',
        },
        {
          title: 'AppError Class',
          description: 'Consistent error handling.',
          code: `class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Usage
if (!userId) {
  throw new AppError('INVALID_INPUT', 'User ID required', 400);
}

// In API routes
try {
  // ... operation
} catch (error) {
  if (error instanceof AppError) {
    return Response.json(
      { error: { code: error.code, message: error.message } },
      { status: error.statusCode }
    );
  }
  throw error;
}`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Design System', href: '/docs/guides/ai-development/design-system' }}
      next={{ title: 'Security', href: '/docs/guides/ai-development/security' }}
    >
      <DocsSection title="Core Rules">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="MUST DO">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Define specific types (never any)</li>
              <li>• Add explicit return types</li>
              <li>• Handle null/undefined</li>
              <li>• Validate external data</li>
              <li>• Use type guards</li>
            </ul>
          </DocsCard>

          <DocsCard title="AVOID">
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• any type</li>
              <li>• @ts-ignore comments</li>
              <li>• Non-null assertions (!)</li>
              <li>• Trusting API responses</li>
              <li>• Implicit any returns</li>
            </ul>
          </DocsCard>
        </div>
      </DocsSection>

      <DocsSection title="Standard Types">
        <DocsCard title="IMPORT FROM @/types/ai">
          <pre className="bg-muted overflow-x-auto rounded p-4 text-xs">
            <code>{`import {
  APIResponse,     // API response wrapper
  AsyncState,      // Async operation state
  FormState,       // Form state management
  PaginatedResponse, // Paginated data
  AppError,        // Error class
  User,            // User type
} from '@/types/ai';`}</code>
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsCallout variant="warning" title="Validation Warning">
        The ai:validate command checks for any types and @ts-ignore comments. These are flagged as
        warnings but should be fixed for production code.
      </DocsCallout>
    </FeatureGuideTemplate>
  );
}
