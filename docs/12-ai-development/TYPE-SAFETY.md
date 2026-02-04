# Type Safety Guide

Patterns for type-safe AI-generated code.

---

## Overview

AI often generates code with type issues:
- `any` types everywhere
- Missing null checks
- No return type definitions
- Untyped API responses

This guide provides patterns AI should follow.

---

## Core Rules

### 1. Never Use `any`

```typescript
// WRONG
const data: any = response;
function process(input: any): any { }

// CORRECT
const data: User = response;
function process(input: UserInput): ProcessedResult { }

// If truly unknown, use unknown
const data: unknown = response;
if (isUser(data)) {
  // Now TypeScript knows it's a User
}
```

### 2. Always Define Return Types

```typescript
// WRONG
async function getUser(id: string) {
  return await fetch(`/api/users/${id}`);
}

// CORRECT
async function getUser(id: string): Promise<APIResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### 3. Handle Null/Undefined

```typescript
// WRONG - crashes if user is null
const name = user.name.toUpperCase();

// CORRECT - optional chaining
const name = user?.name?.toUpperCase() ?? 'Anonymous';

// CORRECT - explicit check
if (user && user.name) {
  const name = user.name.toUpperCase();
}
```

### 4. Validate External Data

```typescript
// WRONG - trusting external data
const user = await response.json() as User;

// CORRECT - validate with type guard
const data = await response.json();
if (!isUser(data)) {
  throw new AppError('INVALID_DATA', 'Invalid user response');
}
// Now TypeScript knows data is User
```

---

## Standard Types

Import from `@/types/ai`:

### APIResponse

Wrapper for all API responses:

```typescript
interface APIResponse<T> {
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
}
```

### AsyncState

For React state with async operations:

```typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Usage
const [state, setState] = useState<AsyncState<User>>({ status: 'idle' });

// Type-safe rendering
{state.status === 'loading' && <Spinner />}
{state.status === 'success' && <UserCard user={state.data} />}
{state.status === 'error' && <Error message={state.error.message} />}
```

### FormState

For form handling:

```typescript
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Usage
interface LoginForm {
  email: string;
  password: string;
}

const [form, setForm] = useState<FormState<LoginForm>>({
  values: { email: '', password: '' },
  errors: {},
  touched: {},
  isSubmitting: false,
  isDirty: false,
});
```

### PaginatedResponse

For paginated data:

```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// Usage
async function getUsers(page: number): Promise<PaginatedResponse<User>> {
  const pageSize = 20;
  const [users, total] = await Promise.all([
    db.user.findMany({ skip: (page - 1) * pageSize, take: pageSize }),
    db.user.count(),
  ]);

  return {
    data: users,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    hasMore: page * pageSize < total,
  };
}
```

### AppError

For consistent error handling:

```typescript
class AppError extends Error {
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
}
```

---

## Type Guards

### Basic Type Guard

```typescript
function isUser(obj: unknown): obj is User {
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
}
```

### API Response Guard

```typescript
function isAPIResponse<T>(
  obj: unknown,
  dataGuard?: (val: unknown) => val is T
): obj is APIResponse<T> {
  if (typeof obj !== 'object' || obj === null) return false;
  if (!('success' in obj) || typeof obj.success !== 'boolean') return false;
  if (dataGuard && 'data' in obj && !dataGuard(obj.data)) return false;
  return true;
}

// Usage
const response = await fetch('/api/user');
const data: unknown = await response.json();

if (isAPIResponse(data, isUser)) {
  if (data.success && data.data) {
    console.log(data.data.email);
  }
}
```

### Array Guard

```typescript
function isArrayOf<T>(
  arr: unknown,
  guard: (item: unknown) => item is T
): arr is T[] {
  return Array.isArray(arr) && arr.every(guard);
}

// Usage
if (isArrayOf(data, isUser)) {
  data.forEach(user => console.log(user.email));
}
```

---

## Function Templates

### Async Function with Error Handling

```typescript
import { APIResponse, AppError } from '@/types/ai';

export async function getUser(userId: string): Promise<APIResponse<User>> {
  // 1. Validate input
  if (!userId || typeof userId !== 'string') {
    throw new AppError('INVALID_INPUT', 'User ID must be a string', 400);
  }

  try {
    // 2. Make request
    const response = await fetch(`/api/users/${userId}`);

    // 3. Handle non-2xx
    if (!response.ok) {
      const error = await response.json();
      throw new AppError(
        error.code || 'FETCH_ERROR',
        error.message || 'Failed to fetch user',
        response.status
      );
    }

    // 4. Parse and validate
    const data = await response.json();
    if (!isUser(data)) {
      throw new AppError('INVALID_RESPONSE', 'Invalid user data', 500);
    }

    // 5. Return typed response
    return {
      success: true,
      data,
      meta: { timestamp: new Date().toISOString(), requestId: crypto.randomUUID() }
    };

  } catch (error) {
    // 6. Handle errors
    if (error instanceof AppError) {
      return {
        success: false,
        error: { code: error.code, message: error.message, details: error.details }
      };
    }
    throw error;
  }
}
```

### React Component with Props

```typescript
import { FC, useState } from 'react';
import { AsyncState, User } from '@/types/ai';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UserProfileProps {
  userId: string;
  onUserLoad?: (user: User) => void;
}

export const UserProfile: FC<UserProfileProps> = ({ userId, onUserLoad }) => {
  const [state, setState] = useState<AsyncState<User>>({ status: 'idle' });

  const loadUser = async () => {
    setState({ status: 'loading' });
    try {
      const response = await getUser(userId);
      if (response.success && response.data) {
        setState({ status: 'success', data: response.data });
        onUserLoad?.(response.data);
      } else {
        throw new Error(response.error?.message || 'Failed to load');
      }
    } catch (error) {
      setState({
        status: 'error',
        error: error instanceof Error ? error : new Error('Unknown error')
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        {state.status === 'idle' && (
          <Button onClick={loadUser}>Load User</Button>
        )}
        {state.status === 'loading' && <p>Loading...</p>}
        {state.status === 'success' && (
          <div>
            <p>{state.data.name}</p>
            <p className="text-muted-foreground">{state.data.email}</p>
          </div>
        )}
        {state.status === 'error' && (
          <p className="text-destructive">{state.error.message}</p>
        )}
      </CardContent>
    </Card>
  );
};
```

---

## TypeScript Config

Recommended strict settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## Validation Commands

```bash
# TypeScript check
npm run type-check

# AI validation (includes type checks)
npm run ai:validate
```

---

## Common Fixes

### any Type

```typescript
// Before
const data: any = await response.json();

// After
interface UserResponse {
  id: string;
  name: string;
  email: string;
}
const data: UserResponse = await response.json();
```

### Missing Return Type

```typescript
// Before
async function fetchData(id: string) {
  return await fetch(`/api/${id}`);
}

// After
async function fetchData(id: string): Promise<Response> {
  return await fetch(`/api/${id}`);
}
```

### Unsafe Property Access

```typescript
// Before
const name = user.profile.displayName;

// After
const name = user?.profile?.displayName ?? 'Unknown';
```

### Unvalidated External Data

```typescript
// Before
const users = await response.json() as User[];

// After
const data: unknown = await response.json();
if (!isArrayOf(data, isUser)) {
  throw new AppError('INVALID_DATA', 'Expected user array');
}
const users = data; // Now typed as User[]
```
